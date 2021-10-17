<template>

  <div class="content">

        <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
        </div>

    <el-row :gutter="10">
      <el-col :lg="15">
        <div class="blockbase block-rounded">
            <div class="block-header">
              <h3 class="block-title">조직도</h3>
            </div>
            <div class="block-content">
              <Department 
                        ref="departComponent"
                        v-on:handleNodeClick="handleNodeClick" 
                      />
            </div>
        </div>
      </el-col>

      <el-col :lg="9" >
        <el-form ref="form" id="departForm" name="departForm">
          <div class="blockbase block-rounded">
            <div class="block-header">
              <h3 class="block-title">부서정보</h3>
            </div>
            <div class="block-content">
                <el-form-item class="mb-20">
                  <el-row>
                    <el-col class="mg-10 pr20 TableLeftName" :span="4" align="right">
                      부서코드
                    </el-col>
                    <el-col class="mg-10 pr20" :span="20">
                      <el-input v-model="departInfo.departCode" size="small"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item class="mb-20">
                  <el-row>
                    <el-col class="mg-10 pr20 TableLeftName" :span="4" align="right">
                      대표명
                    </el-col>
                    <el-col class="mg-10 pr20" :span="20">
                      <el-input v-model="departInfo.departName" size="small"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item class="mb-20">
                  <el-row>
                    <el-col class="mg-10 pr20 TableLeftName" :span="4" align="right">
                      대표번호
                    </el-col>
                    <el-col class="mg-10 pr20" :span="20">
                      <el-input v-model="departInfo.departTel" size="small"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>

                <el-form-item class="mb-20">
                  <el-row>
                    <el-col class="mg-10 pr20" :span="8" align="right">
                    </el-col>
                    <el-col :span="24" align="center">
                      <el-button size="small" type="" v-on:click="saveDepart()">부서저장</el-button>
                      <el-button size="small" type="danger" v-on:click="deleteDepart()">삭제</el-button>
                      <el-button size="small" type="success" v-on:click="showChildren()">하위부서 추가</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
            </div>
          </div>
        </el-form>
        <el-form ref="form" id="childrenAddForm" name="childrenAddForm" v-show="childrenState">
          <div class="blockbase block-rounded">
              <div class="block-header">
                <h3 class="block-title">하위부서 추가</h3>
              </div>
              <div class="block-content">

                  <el-form-item class="mb-20">
                    <el-row>
                      <el-col class="mg-10 pr20 TableLeftName" :span="4" align="right">
                        부서코드
                      </el-col>
                      <el-col class="mg-10 pr20" :span="20">
                        <el-input v-model="childInfo.departCode" size="small"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  <el-form-item class="mb-20">
                    <el-row>
                      <el-col class="mg-10 pr20 TableLeftName" :span="4" align="right">
                        대표명
                      </el-col>
                      <el-col class="mg-10 pr20" :span="20">
                        <el-input v-model="childInfo.departName" size="small"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  <el-form-item class="mb-20">
                    <el-row>
                      <el-col class="mg-10 pr20 TableLeftName" :span="4" align="right">
                        대표번호
                      </el-col>
                      <el-col class="mg-10 pr20" :span="20">
                        <el-input v-model="childInfo.departTel" size="small"></el-input>
                      </el-col>
                    </el-row>
                  </el-form-item>

                  <el-form-item class="mb-20">
                    <el-row>
                      <el-col class="mg-10 pr20" :span="8" align="right">
                      </el-col>
                      <el-col :span="24" align="center">
                        <el-button size="small" type="" v-on:click="saveChildren()">부서저장</el-button>
                        <el-button size="small" type="danger" v-on:click="showChildren()">취소</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>

              </div>
          </div>
        </el-form>



      </el-col>
    </el-row>

  </div>

</template>


<script>
  import * as companyApi from '@/api/company';
  import Department from '../../components/Department'
  import Breadcrumb from '../../components/Breadcrumb/index'

  // let stack = [];

  export default {    
    data() {
      return {
        departInfo: {
          departSeq : "",
          departCode : "",
          departName : "",
          departTel : "",
          departDepth : "",
          departRef : ""
        },
        childrenState: false,
        childInfo: {
          departCode : "",
          departName : "",
          departTel : "",
          departParent : "",
          departDepth : "",
          departRef : ""
        }
      };
    },
    components: {
      Department,
      Breadcrumb
    },
    methods: {
      handleNodeClick(item) {
        this.childrenState = false;
        this.departInfo = {
          departSeq : item.id,
          departCode : item.code,
          departName : item.label,
          departTel : item.tel,
          departDepth : item.depth,
          departRef : item.ref
        }
        this.childInfo.departParent = item.id;
        this.childInfo.departDepth = item.depth + 1;
        this.childInfo.departRef = item.ref;
      },
      showAlert(){
        alert("부서를 선택해주세요.");
      },
      saveDepart(){
        if(this.departInfo.departSeq){
          let data = this.departInfo;
          companyApi.updateDepart(data)
          .then(res => {
            console.log(res);
            this.reloadDepart();
          })
          .catch(error => {
            alert(error);
          })
        } else {
          this.showAlert();
          return false;
        }

      },
      deleteDepart(){
        if(confirm("해당 부서를 삭제하시겠습니까? 속한 부서도 전부 삭제되며 복구가 불가능합니다.")){
            if(this.departInfo.departSeq){
              let data = {
                departSeq : this.departInfo.departSeq
            }
            companyApi.deleteDepart(data)
            .then(res => {
              console.log(res)
              alert("삭제되었습니다.");
              this.reloadDepart();
            })
            .catch(error => {
              console.log(error)
            })
          } else {
            this.showAlert();
            return false;
          }
        }
      },
      showChildren(){
        if(this.departInfo.departSeq){
          this.childrenState = !this.childrenState;
          console.log(this.departInfo);
        } else {
          this.showAlert();
        }
      },
      saveChildren(){
        let data = this.childInfo;
        companyApi.insertChildren(data)
        .then(res => {
          console.log(res);
          this.reloadDepart();
          
          this.departInfo = {
            departSeq : "",
            departCode : "",
            departName : "",
            departTel : "",
            departDepth : "",
            departRef : ""
          }

          this.childInfo = {
            departCode : "",
            departName : "",
            departTel : "",
        }
          this.childrenState = false;
        })
        .catch(error => {
          console.log(error)
        })
      },
      reloadDepart(){
        this.$refs.departComponent.getDataLoad();
      }
      // getDataLoad() {
      //   console.log("department relaod");
      //   /** INIT */
      //   stack = [];
      //   let maxDepth = 0;
      //   this.departs = [];
      //   let allData = [];
      //   companyApi.getDepartChart()
      //     .then(res => {
      //       res.data.forEach(element => {
      //         let data = {
      //           id : element.DEPARTMENT_SEQ,
      //           tel : element.DEPARTMENT_TEL,
      //           code : element.DEPARTMENT_CODE,
      //           label : element.DEPARTMENT,
      //           depth : element.DEPTH,
      //           ref : element.REF,
      //           parent : element.PARENT_DEPARTMENT_SEQ,
      //           children : []
      //         }
      //         /** maxdetph 추출 */
      //         if(maxDepth < element.DEPTH){
      //           maxDepth = element.DEPTH;
      //         }
      //         allData.push(data);
      //       });

      //       for(let i=0; i < maxDepth; i++){
      //         stack.push([]);
      //       }

      //       allData.forEach(function(element){
      //         stack[element.depth - 1].push(element);
      //       });

      //       this.pushChildrenData(stack);
            
            

      //   })
      // }, pushChildrenData(stack) {
      //   let nowObject = [];
      //   let nextObject = [];
      //   while(stack.length != 1){
      //     nowObject = stack.pop();
      //     nextObject = stack[stack.length-1];
          
      //     for(let i=0; i < nowObject.length; i++){
      //       for(let j=0; j < nextObject.length; j++){
      //         if(nextObject[j].id == nowObject[i].parent){
      //           nextObject[j].children.push(nowObject[i]);
      //         }
      //       }
      //     }
      //   }
      //   // console.log(nextObject);
      //   this.departs = nextObject;
      // }
    },
    created() {
    }
  };



</script>


