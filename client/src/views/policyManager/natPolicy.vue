<template>
  <div class="content">

      <div class="breadcrumb-container">
        <breadcrumb id="breadcrumb-container" />
      </div>

      <el-form ref="form" :model="searchForm" label-width="120px" label-padding-right="20px">
        <div class="blockbase block-rounded">
          <div class="block-header">
            <h3 class="block-title">정책현황</h3>
          </div>
            <div class="block-content">
              
                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            방화벽
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col>
                                <el-select v-model="searchForm.deviceId" filterable placeholder="Select" style="width:120px">
                                  <el-option
                                  v-for="item in devices"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            서비스
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6">
                                <el-select v-model="searchForm.serviceCondition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                                </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.service"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            출발지 Zone
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6">
                                <el-select v-model="searchForm.sourceZoneCondition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.sourceZone"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            목적지 Zone
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6">
                                <el-select v-model="searchForm.destinationZoneCondition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.destinationZone"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                
                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            출발지 
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6">
                                <el-select v-model="searchForm.sourceCondition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.source"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            목적지 
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6">
                                <el-select v-model="searchForm.destinationCondition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.destination"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                
                <el-row class="mb20 pw20">
                    <el-col align="right" :span="24">
                        <el-button type="primary">검색</el-button>
                    </el-col>
                </el-row>


            </div>
        </div>
      </el-form>

      <div class="blockbase block-rounded">
          <div class="block-content">

            <el-table :data="pagedTableData" >
              <el-table-column label="#" >
                <template slot-scope="scope">
                  <span>{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="방화벽">
                  <template slot-scope="scope">
                  <span>{{ scope.row.device_id }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="정책이름">
                  <template slot-scope="scope">
                  <span>{{ scope.row.nat_name }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="기존">
                <el-table-column label="출발지">
                    <template slot-scope="scope">
                    <span>{{ scope.row.source }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="도착지">
                    <template slot-scope="scope">
                    <span>{{ scope.row.destination }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="서비스">
                    <template slot-scope="scope">
                    <span>{{ scope.row.service }}</span>
                    </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="전송">
                <el-table-column label="출발지">
                    <template slot-scope="scope">
                    <span>{{ scope.row.source_translation }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="도착지">
                    <template slot-scope="scope">
                    <span>{{ scope.row.destination }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="서비스">
                    <template slot-scope="scope">
                    <span>{{ scope.row.service_translation }}</span>
                    </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            
            <el-pagination class="mt-4" layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
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

  import * as collectApi from '@/api/collect';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        devices: [
          {
            label: "전체",
            value: ""
          }
        ],
        items: [],
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
        searchForm: {
          deviceId: "",
          serviceCondition : "Equals",
          service: "",
          sourceZoneCondition: "Equals",
          sourceZone: "",
          destinationZoneCondition: "Equals",
          destinationZone: "",
          sourceCondition: "Equals",
          source: "",
          destinationCondition: "Equals",
          destination: "",
        },
        condition: [
          {
            label:"Equals",
            value:"equals"
          },
          {
            label:"Like",
            value:"like"
          },
        ]
      }
    },
    components: {
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.items.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
    methods: {
      setPage (val) {
        this.page = val
      },
      viewDetail (item) {
        console.log(item)
      },
      search(){
        collectApi.getNatPolices(this.searchForm)
          .then(res =>{
            console.log(res.data.data.nat);
            if(res.data.code == 200){
              this.items = res.data.data.nat
            }else{
              this.$message({
                type:"error",
                message:"NAT 정책 데이터를 불러오는데 실패했습니다."
              })
              console.log(res.data.msg);
            }
          })
      },
      getDataLoad() {
        // 방화벽 전체 가져오기
        collectApi.getDevice()
          .then(res =>{
            console.log(res)
            if(res.data.code == 200){
              const devices = res.data.data.devices;
              devices.forEach(element => {
                let data = {
                  label: element.device_name,
                  value: element.device_id
                }
                this.devices.push(data);
              })
            }else{
              this.$message({
                type:"error",
                message:"방화벽 정보를 불러오는데 실패했습니다."
              })
              console.log(res.data.msg);
            }
          })

        // Nat 정책 가져오기
        collectApi.getNatPolices(this.searchForm)
          .then(res =>{
            console.log(res.data.data.nat);
            if(res.data.code == 200){
              this.items = res.data.data.nat
            }else{
              this.$message({
                type:"error",
                message:"NAT 정책 데이터를 불러오는데 실패했습니다."
              })
              console.log(res.data.msg);
            }
          })
      }
    },
    created() {
      this.getDataLoad();
    }

  }
</script>