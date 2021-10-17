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
                                <el-select v-model="searchForm.device_id" filterable placeholder="Select" style="width:120px">
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
                                <el-select v-model="searchForm.service_condition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                                </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.service" @keyup.enter.native="search"></el-input></el-col>
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
                                <el-select v-model="searchForm.source_zone_condition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.source_zone" @keyup.enter.native="search"></el-input></el-col>
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
                                <el-select v-model="searchForm.destination_zone_condition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.destination_zone" @keyup.enter.native="search"></el-input></el-col>
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
                                <el-select v-model="searchForm.source_condition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.source" @keyup.enter.native="search"></el-input></el-col>
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
                                <el-select v-model="searchForm.destination_condition">
                                  <el-option 
                                    v-for="item in condition" 
                                    :key="item.value" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" v-model="searchForm.destination" @keyup.enter.native="search"></el-input></el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                
                <el-row class="mb20 pw20">
                    <el-col align="right" :span="24">
                        <el-button type="primary" @click="search()">검색</el-button>
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
                  <span>{{ polices.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="방화벽">
                  <template slot-scope="scope">
                  <span>{{ scope.row.device_id }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="정책순서">
              </el-table-column>
              <el-table-column label="정책번호">
                  <template slot-scope="scope">
                  <span>{{ scope.row.policy_number }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="출발지 Zone">
                  <template slot-scope="scope">
                  <span>{{ scope.row.from }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="목적지 Zone">
                  <template slot-scope="scope">
                  <span>{{ scope.row.to }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="출발지">
                  <template slot-scope="scope">
                  <p v-for="item in scope.row.source" :key="item.address" :title="item.ip">{{ item.address ? item.address : item.ip }}</p>                  
                  </template>
              </el-table-column>
              <el-table-column label="목적지">
                  <template slot-scope="scope">
                  <p v-for="item in scope.row.destination" :key="item.address" :title="item.ip">{{ item.address ? item.address : item.ip }}</p>
                  </template>
              </el-table-column>
              <el-table-column label="서비스">
                  <template slot-scope="scope">
                  <p v-for="(item, index) in scope.row.service" :key="`service-${index}`">
                    {{ item }}
                  </p>
                  </template>
              </el-table-column>
              <!-- <el-table-column label="관련신청서">
              </el-table-column>
              <el-table-column label="관련정책">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" icon="el-icon-s-data" @click="viewRelativePolicy(scope.row)"></el-button>
                </template>
              </el-table-column> -->
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


      <el-dialog
          :visible.sync ="viewPolicyModal"
          title="관련 정책">
          <el-table
            :data="polices"
            max-height="500">
            <el-table-column label="정책번호" prop="policy_number"></el-table-column>
            <el-table-column label="정책이름" prop="policy_name"></el-table-column>
            <el-table-column label="출발지 Interface" prop="from"></el-table-column>
            <el-table-column label="출발지">
              <template slot-scope="scope">
                <span v-for="item in scope.row.source" :key="item.source">{{item}}</span>
              </template>
            </el-table-column>
            <el-table-column label="목적지 Interface" prop="to"></el-table-column>
            <el-table-column label="목적지">
              <template slot-scope="scope">
                <span v-for="item in scope.row.destination" :key="item.destination">{{item}}</span>
              </template>
            </el-table-column>
            <el-table-column label="서비스">
              <template slot-scope="scope">
                {{scope.row.service}}
                <span v-for="item in scope.row.service" :key="item.service">
                  {{item}}
                </span>
              </template>
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="viewPolicyModal = false">취소</el-button>
          </span>
        </el-dialog>


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