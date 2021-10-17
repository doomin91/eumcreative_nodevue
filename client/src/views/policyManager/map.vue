<template>
  <div class="content">


      <div ref="map"></div>
      <!-- <img src="./firewall.png"> -->



<div id="MapSideWrap">
  <el-tabs type="card" @tab-click="handleClick">
    <el-tab-pane label="정책검색" class="tabwrap">      

      <el-input placeholder="검색" v-model="input"></el-input>

    </el-tab-pane>
    <el-tab-pane label="경로검색">


    </el-tab-pane>
  </el-tabs>

</div>









  </div>
</template>

<script>

  import ForceGraph3D from '3d-force-graph'; 
  import * as THREE from 'three'; // eslint-disable-line no-unused-vars
  import SpriteText from 'three-spritetext'; // eslint-disable-line no-unused-vars
  import * as collectApi from '@/api/collect';



  export default {
    data() {
      return {
        myGraph: ForceGraph3D(),

        mapData: [],
        nodes: [],
        links: [],

        highlightNodes: new Set(),
	      highlightLinks: new Set(),

        selectedNode: "",
        selectedLink: "",

        linkKeys: [],
        nodeKeys: [],

        activeName: 'first',
        input:'',

      }
    },
    computed: {
     
    },
    components: {
        
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      updateHighlight(){
        this.myGraph
					.linkColor(this.myGraph.linkColor())
					.linkWidth(this.myGraph.linkWidth())
					.linkDirectionalParticles(this.myGraph.linkDirectionalParticles())
					// .onNodeClick(this.myGraph.onNodeClick())
					// .onLinkClick(this.myGraph.onLinkClick())
					.linkThreeObjectExtend(true)
					.linkThreeObject(this.myGraph.linkThreeObject())
					.linkPositionUpdate(this.myGraph.linkPositionUpdate())
					this.myGraph.d3Force('charge').strength(-1000);
      },

      clearHighlight(){
        this.myGraph
					.linkColor(this.myGraph.linkColor())
					.linkWidth(this.myGraph.linkWidth())
          .linkDirectionalParticles(this.myGraph.linkDirectionalParticles())
          .linkThreeObject(this.myGraph.linkThreeObject())
      },

      getDataLoad() {
        const el = this.$refs.map;

        const gData = {
          nodes: this.nodes,
          links: this.links
        };
        gData.links.forEach(link => {
          const a = gData.nodes[link.source];
          const b = gData.nodes[link.target];

          a.neighbors.indexOf(b) == -1 ? a.neighbors.push(b) : "";
          b.neighbors.indexOf(a) == -1 ? b.neighbors.push(a) : "";
          // a.neighbors.push(b);
          // b.neighbors.push(a);

          a.links.push(link);
          b.links.push(link);
        });

        gData.nodes.forEach(node => {
          this.highlightNodes.add(node);
        });
        gData.links.forEach(link => {
          this.highlightLinks.add(link);
        });
        
        console.log(gData);

        // gData.links.forEach((val) =>{
        //   console.log(val.source_ip+"-"+val.target_ip);
        // })
        
        this.myGraph(el)
            .width(el.getBoundingClientRect().width)
            .height(el.getBoundingClientRect().height)
            .nodeThreeObject(({ img }) => {
              const imgTexture = new THREE.TextureLoader().load(`./${img}`);
              const material = new THREE.SpriteMaterial({ map: imgTexture});
              material.alphaTest = 0.2;
              // console.log(imgTexture);
              // console.log(material);
              const sprite = new THREE.Sprite(material);
              // sprite.material.depthWrite = false;
              sprite.scale.set(12, 12);
              return sprite;
            })
            // link 색
            .linkColor(link => {
              if(this.highlightLinks.has(link)){
                // 선택했을 때 색
                return 'rgb(255,0,0,1)';
              }else{
                // 선택 안했을 떄 색
                return 'grey';
              }
            })
            // link width  this.highlightLinks.has(link) ? 선택했을 떄 : 안했을 때
            .linkWidth(link => this.highlightLinks.has(link) ? 4 : 1)
            .linkThreeObjectExtend(true)
            .linkThreeObject(link => {
              // console.log(link);
              if(this.highlightLinks.has(link) ){
                // console.log(link);
                // console.log(this.nodeKeys);
                // console.log(this.nodeKeys[link.source])
                // console.log(typeof(link.source));
                // extend link with text sprite
                let sprite;
                if(typeof(link.source) == "object"){
                  sprite = new SpriteText(`\n ${gData.nodes[link.source.id].name} <==> ${gData.nodes[link.target.id].name} \n`);
                }else{
                  sprite = new SpriteText(`\n ${gData.nodes[link.source].name} <==> ${gData.nodes[link.target].name} \n`);
                }
                sprite.textHeight = 2;
                return sprite;
              }
            })
            .linkDirectionalParticleWidth(2)
            .linkDirectionalParticles(link => this.highlightLinks.has(link) ? 3 : 0)
            .linkPositionUpdate((sprite, { start, end }) => {
              if(sprite){
                const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                  [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                })));

                // Position sprite
                Object.assign(sprite.position, middlePos);
              }
            })
            .onLinkClick(link => {
              if ((!link && !this.selectedLink === link)) return;

              this.highlightNodes.clear();
              this.highlightLinks.clear();

              if (link) {
                this.selectedLink = link;
                this.highlightLinks.add(link)
                this.highlightNodes.add(link.source.id);
                this.highlightNodes.add(link.target.id);
                console.log(this.highlightNodes);
                console.log(this.highlightLinks);
              }

              this.updateHighlight();
            })
            .onBackgroundClick( (event) => {
              console.log(event);
              this.highlightNodes.clear();
              this.highlightLinks.clear();
              this.clearHighlight();
            })
            .onNodeClick(node => {
            // Aim at node from outside it
              const distance = 100;
              const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);

              this.myGraph.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                node, // lookAt ({ x, y, z })
                3000  // ms transition duration
              );

              if ((!node && !this.selectedNode === node)) return;
              
              this.highlightNodes.clear();
              this.highlightLinks.clear();
              if (node) {
                this.selectedNode = node;
                this.highlightNodes.add(node);
                node.neighbors.forEach(neighbor => this.highlightNodes.add(neighbor));
                node.links.forEach(link => this.highlightLinks.add(link));
                console.log(this.highlightNodes);
                console.log(this.highlightLinks);
              }

              this.updateHighlight();
            })
            .onNodeDragEnd(node => {
              node.fx = node.x;
              node.fy = node.y;
              node.fz = node.z;
            })
            .graphData(gData);

            this.myGraph.d3Force('charge').strength(-500);
      }
    },
    mounted() {
      console.log(this.$refs);
    },
    created() {
      // public폴더가 현재 폴더
      const imgs = ['firewall.png', 'switch.png'];
      let Id = 0;
      collectApi.getMapData()
          .then(res => {
            if(res.data.code == 200){
              
              console.log(res);
              this.mapData = res.data.data.objects;

              this.mapData.forEach((val) =>{
                if(!this.nodeKeys[val.src_ip]){
                  const Node = {
                    id: Id,
                    img: imgs[0],
                    name: val.src_name,
                    neighbors: [],
                    links: [],
                  }
                  this.nodeKeys[val.src_ip] = Id++;
                  this.nodes.push(Node);
                }
                if(!this.nodeKeys[val.dst_ip]){
                  const Node = {
                    id: Id,
                    img: imgs[0],
                    name: val.dst_name,
                    neighbors: [],
                    links: [],
                  }
                  this.nodeKeys[val.dst_ip] = Id++;
                  this.nodes.push(Node);
                }
                const LinkKey = val.src_ip+"-"+val.dst_ip;
                const LineKey2 = val.dst_ip+"-"+val.src_ip;
                if(!this.linkKeys[LinkKey] && !this.linkKeys[LineKey2]){
                  const Link = {
                    source: this.nodeKeys[val.src_ip],
                    target: this.nodeKeys[val.dst_ip],
                    source_ip: val.src_ip,
                    target_ip: val.dst_ip,
                  };
                  this.linkKeys[LinkKey] = true;
                  this.linkKeys[LineKey2] = true;
                  this.links.push(Link);
                }
              })
              // const imgTexture = new THREE.TextureLoader().load("./firewall.png");
              // const material = new THREE.SpriteMaterial({ map: imgTexture});
              // console.log(imgTexture);
              // console.log(material);
              this.getDataLoad();

            }
          })
    }

  }
</script>