<template>
  <div class="content">


      <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
      </div>

      <div class="blockbase block-rounded">
          <div class="block-content">

            <el-table :data="pagedTableData" >
              <el-table-column label="#" >
                <template slot-scope="scope">
                  <span>{{ polices.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="방화벽">
                  <template slot-scope="scope">
                  <span>{{ scope.row.device_id }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="상세보기" width="150">
                  <template slot-scope="scope">
                    <span>
                        <el-button type="primary" size="mini"  @click="goViewPage(scope.row)">상세보기</el-button>
                    </span>
                  </template>
              </el-table-column>
            </el-table>
            
            <el-pagination class="mt-4" layout="prev, pager, next" :total="this.polices.length" @current-change="setPage" align="center">
            </el-pagination>

          </div>
      </div>
  </div>
</template>

<style>
  .UserListForm .el-input {
    width:220px !important;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-table th>.cell {
    text-align:center;
  }
.el-table__row .cell {
  text-align:center;
}
</style>



<script>

  import Breadcrumb from '../../components/Breadcrumb/index';
  import * as collectApi from '@/api/collect';
  import * as settingApi from '@/api/setting';

  export default {
    data() {
      return {
        polices: [],
        devices: [
          {
            label: "전체",
            value: ""
          }
        ],
        page: 1,
        pageSize: 10,
        searchForm: {
          device_id : "",
          service_condition : "like",
          service : "",
          source_zone_condition : "like",
          source_zone : "",
          destination_zone_condition : "like",
          destination_zone : "",
          source_condition : "like",
          source : "",
          destination_condition : "like",
          destination : "",
        },
        condition: [
          {
            label : "Equals",
            value : "equals"
          },
          {
            label : "Like",
            value : "like"
          }
        ],
        viewPolicyModal: false

      }
    },
    computed: {
     pagedTableData() {
       return this.polices.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
   components: {
      Breadcrumb
   },
    methods: {
      goViewPage(item){
        this.$router.push({path:"/policyStatusView", query:{deviceId:item.device_id, policyNumber:item.policy_number}});
      },
      setPage (val) {
        this.page = val
      },
      viewRelativePolicy(item){
        console.log(item.source);
        // this.viewPolicyModal = true;
      },
      search(){
        this.getDataLoad();
      },
      getDeviceLoad() {
          settingApi.getDeviceList()
          .then(res =>{
            // console.log(res);
            if(res.status == 200){
              const devices = res.data;
              devices.forEach(element => {
                let data = {
                  label: element.DEVICE_NAME,
                  value: element.DEVICE_SEQ
                }
                this.devices.push(data);
              })
            }else{
              this.$message({ 
                type:"error",
                message:"방화벽 정보를 불러오는데 실패했습니다."
              })
            }
          })
      },
      getDataLoad() {
        this.polices = [];
        collectApi.getAllPolicy(this.searchForm)
          .then(res => {
            if(res.data.data.policy){
              const polices = res.data.data.policy;
              polices.forEach(element => {
                let device_label;
                this.devices.forEach(item => {
                  if(item.value == element.device_id){
                    device_label = item.label;
                  }
                });
                console.log(element);
                let data = {
                  device_id: element.device_id,
                  device_label: device_label,
                  policy_number: element.policy_number,
                  from: element.from,
                  to: element.to,
                  source: element.source,
                  service: element.service,
                  destination: element.destination,
                }
                this.polices.push(data);
              })
            }else{
              this.$message({
                type:"error",
                message:"데이터를 불러 올 수 없습니다."
              })
            }
          })
      }
    },
    created() {
      this.getDeviceLoad();
      this.getDataLoad();
    }

  }
</script>