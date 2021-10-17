<template>
  <div class="content">


      <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
      </div>
      <el-form ref="form" v-model="searchForm" label-width="120px" label-padding-right="20px">
        <div class="blockbase block-rounded">
          <div class="block-header">
            <h3 class="block-title">정책내려받기</h3>
          </div>
            <div class="block-content">
                <el-row class="mb20 pw20">
                    <el-col>
                        <el-row>
                          <el-col align="right" class="pd10 pr30" :span="2">
                            장비검색
                          </el-col>
                          <el-col :span="2">
                            <el-select v-model="searchForm.searchField" ref="searchField">
                                <el-option label="선택" value=""></el-option>
                                <el-option label="장비명" value="deviceId"></el-option>
                                <el-option label="장비IP" value="deviceIp"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="20">
                            <el-row :gutter="10">
                              <el-col>
                                <el-input type="text" v-model="searchForm.searchString" ref="searchString"></el-input>
                                </el-col>
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

            <el-table :data="pagedTableData" style="width: 100%">
              <el-table-column label="#">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ devices.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="장비등록번호" prop="DEVICE_ID"></el-table-column>
              <el-table-column label="장비명" prop="DEVICE_NAME"></el-table-column>
              <el-table-column label="장비제조사" prop="DEVICE_VENDOR"></el-table-column>
              <el-table-column label="장비IP" prop="DEVICE_IP"></el-table-column>
              <el-table-column label="등록일자" prop="REG_DATE">
                <template slot-scope="scope">
                  {{ makeDateForm(scope.row.REG_DATE) }}
                </template>
              </el-table-column>
              <el-table-column label="정책내려받기" prop="REG_DATE">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" icon="el-icon-download" @click="downloadJson(scope.row)">JSON</el-button>
                  <el-button type="success" size="mini" icon="el-icon-download" @click="downloadExcel(scope.row)">EXCEL</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-row class="pd10">
              <el-col>
                <el-pagination class="mt-4" layout="prev, pager, next" :total="this.devices.length" @current-change="setPage" align="center">
                </el-pagination>
              </el-col>
            </el-row>

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
  import * as settingApi from '@/api/setting';
  import * as collectApi from '@/api/collect';
  import { makeDateForm, getCurrentDate, createExcel } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        loading: true,
        devices: [],
        searchForm: {
          searchField: "",
          searchString: ""
        },
        vendor: [
          {
            value: 'paloalto',
            label: 'Paloalto'
          },
          {
            value: 'fortinet',
            label: 'Fortinet'
          },
          {
            value: 'secui',
            label: 'Secui'
          },
          {
            value: 'anlab',
            label: 'Anlab'
          },
          {
            value: 'axgate',
            label: 'Axgate'
          },
        ],

        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
      }
    },
    computed: {
     pagedTableData() {
       return this.devices.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
   components: {
      Breadcrumb
   },
    methods: {
      makeDateForm(date){
        return makeDateForm(date);
      },
      setPage (val) {
        this.page = val
      },
      search(){
        let data = []
        const searchField = this.searchForm.searchField;
        const searchString = this.searchForm.searchString;
        if(searchField == ""){
          this.$refs.searchField.focus();
          this.$message({
            type:"warning",
            message:"타입을 지정해주세요."
          })
          return false;
        }

        data[searchField] = searchString

        // 장비 검색 기능 추가되면 추가 작성

      },
      downloadJson(item){
        const deviceId = item.DEVICE_ID
        if(deviceId){
          collectApi.getPolices(deviceId)
          .then(res => {
            if(res.data.code == 200){
              const data = res.data.data.policy
              console.log(data);
              const json = JSON.stringify(data)
              const file = json.toString('utf8');

              const now = getCurrentDate("YmdHis");
              const newName = item.DEVICE_NAME + "_" + item.DEVICE_IP + "_" + now + ".json";
              if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
                const blob = res.data 
                window.navigator.msSaveOrOpenBlob(blob, newName)
              } else {
              const url = window.URL.createObjectURL(new Blob([file], { type: res.headers['content-type'] })) 
              const link = document.createElement('a') 
              link.href = url 
              link.setAttribute('download', newName);
              document.body.appendChild(link) 
              link.click();
              }
            }else{
              this.$message({
                type:"error",
                message:"다운로드 실패"
              })
            }
          })
        }
      },
      downloadExcel(item){
        const deviceId = item.DEVICE_ID
        if(deviceId){
          collectApi.getPolices(deviceId)
          .then(async res => {
            console.log(res);
            if(res.data.code == 200){
              const data = res.data.data.policy;
              const file = await createExcel(data);
              console.log(data);
              // const now = getCurrentDate("YmdHis");
              const newName = 'newName';
              if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
                const blob = res.data 
                window.navigator.msSaveOrOpenBlob(blob, newName)
              } else {
              const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
              const url = window.URL.createObjectURL(new Blob([file], mimeType)) 
              const link = document.createElement('a') 
              link.href = url 
              link.setAttribute('download', newName);
              document.body.appendChild(link) 
              link.click();
              }
            }else{
              this.$message({
                type:"error",
                message:"다운로드 실패"
              })
            }
          })
          .catch(error => {
            console.log(error);
          })
        }
      },
      getDataLoad() {
        this.devices = [];
        this.device = {
          deviceName: null,
          deviceIp: null,
          deviceVendor: null,
          userId: null,
          password: null,
          port: null,
          protocol: null,
        }
        settingApi.getDeviceList()
          .then(res => {
            res.data.forEach(element => {
              this.devices.push(element);
            })
          })
      }
    },
    created() {
      this.getDataLoad();
    }

  }
</script>