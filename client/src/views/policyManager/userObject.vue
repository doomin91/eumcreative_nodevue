<template>
  <div class="content">


      <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
      </div>
      <el-form ref="form" :model="searchForm" label-width="120px" label-padding-right="20px">
        <div class="blockbase block-rounded">
          <div class="block-header">
            <h3 class="block-title">사용자 객체</h3>
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
                                  v-for="(item, index) in devices"
                                  :key="`device+${index}`"
                                  :label="item.label"
                                  :value="item.value">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                    </el-col>
                </el-row>

                <el-row class="mb20 pw20">
                    <el-col :span="12">
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="6">
                            단어검색
                          </el-col>
                          <el-col :span="18">
                            <el-row :gutter="10">
                              <el-col :span="6">
                                <el-select v-model="searchForm.searchField">
                                  <el-option 
                                    v-for="(item, index) in searchField" 
                                    :key="`search-${index}`" 
                                    :value="item.value" 
                                    :label="item.label"></el-option>
                                </el-select>
                              </el-col>
                              <el-col :span="18"><el-input type="text" @keyup.enter.native="search" v-model="searchForm.searchString" :disabled="searchForm.searchField == ''"></el-input></el-col>
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
                  <span>{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="장비명">
                  <template slot-scope="scope">
                  <span>{{ scope.row.device_id }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="사용자명">
                  <template slot-scope="scope">
                  <span>{{ scope.row.object_name }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="소속그룹명">
                  <template slot-scope="scope">
                  <p v-for="(group, index) in scope.row.parent_group" :key="`group-${index}`">{{group}}</p>
                  </template>
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

  import Breadcrumb from '../../components/Breadcrumb/index'
  import * as collectApi from '@/api/collect';
  import * as settingApi from '@/api/setting';

  export default {
    data() {
      return {
        items: [],
        devices: [
          {
            label: "전체",
            value: ""
          },
        ],
        pageSize: 10,
        page: 1,
        /* paging end */
        searchForm: {
          deviceId: "",
          searchField: "",
          searchString: ""
        },
        searchField: [
          {
            label: "선택",
            value: ""
          },
          {
            label: "사용자명",
            value: "object_name"
          },
          {
            label: "그룹명",
            value: "group_name"
          }
        ]
      }
    },
    computed: {
     pagedTableData() {
       return this.items.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
   components: {
      Breadcrumb
   },
    methods: {
      search(){
        this.getDataLoad();
      },
      setPage (val) {
        this.page = val
      },
      getDeviceLoad() {
          settingApi.getDeviceList()
          .then(res =>{
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
        this.items = [];
        let data;
        switch(this.searchForm.searchField){
          case "object_name":
            data = {
              device_id : this.searchForm.deviceId,
              object_name : this.searchForm.searchString,
            }
            break;
          case "group_name":
            data = {
              device_id : this.searchForm.deviceId,
              group_name : this.searchForm.searchString,
            }
            break;
          default: 
            data = {
              device_id : this.searchForm.deviceId,
              object_name : "",
              group_name : ""
          }
        }

        collectApi.getUser(data)
          .then(res => {
            if(res.data.code == 200){
              const objects = res.data.data.objects
              objects.forEach(element => {
                let device_label;
                this.devices.forEach(item => {
                  if(item.value == element.device_id){
                    device_label = item.label;
                  }
                });
                let data = {
                  device_id: device_label,
                  object_name: element.object_name,
                  parent_group: element.parent_group
                }
                this.items.push(data);
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