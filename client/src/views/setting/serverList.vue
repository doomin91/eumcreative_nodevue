<template>
<div class="contents">
    <div class="breadcrumb-container">
        <breadcrumb id="breadcrumb-container" />
    </div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">서버관리</h3>
        </div>

        <div class="block-content">

          <el-table :data="pagedTableData" @row-click="viewDevice" style="width: 100%">
            <el-table-column label="#">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ devices.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
              </template>
            </el-table-column>
            <el-table-column label="장비등록번호" prop="DEVICE_SEQ"></el-table-column>
            <el-table-column label="도메인 아이디" prop="DOMAIN_ID"></el-table-column>
            <el-table-column label="장비명" prop="DEVICE_NAME"></el-table-column>
            <el-table-column label="장비제조사" prop="DEVICE_VENDOR"></el-table-column>
            <el-table-column label="장비IP" prop="DEVICE_IP"></el-table-column>
            <el-table-column label="등록일자" prop="REG_DATE">
              <template slot-scope="scope">
                {{ makeDateForm(scope.row.REG_DATE) }}
              </template>
            </el-table-column>
          </el-table>

          <el-row class="pd10">
            <el-col>
              <div align="left">
                <el-button type="primary" size="small" @click="viewRegistForm = true">장비 등록</el-button>
              </div>
              <el-pagination class="mt-4" layout="prev, pager, next" :total="this.devices.length" @current-change="setPage" align="center">
              </el-pagination>
            </el-col>
          </el-row>

        </div>


          <el-dialog
            title="신규 장비등록"
            :visible.sync="viewRegistForm"
            width="600px"
            v-loading="loading"
            >
          <el-form ref="deivceRegistForm">


              <table class="customTable01">
              <colgroup>
                <col width="30%">
                <col width="70%">
              </colgroup>
              <tbody>
                <tr>
                  <th>Vendor</th>
                  <td>
                    <el-select v-model="device.deviceVendor" class="f_left" size="small">
                      <el-option v-for="item in vendor" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    </td>
                </tr>
                <tr>
                    <th>장비명</th>
                    <td>
                      <el-input v-model="device.deviceName" size="small"></el-input>
                    </td>
                </tr>
                <tr>
                  <th>IP</th>
                  <td class="tac"><el-input v-model="device.deviceIp" size="small"></el-input></td>
                </tr>
                <tr>
                  <th>PORT</th>
                  <td class="tac"><el-input v-model="device.port" size="small"></el-input></td>                  
                </tr>
                <tr>
                  <th>ID</th>
                  <td class="tac"><el-input v-model="device.userId" size="small"></el-input></td>
                </tr>
                <tr>
                  <th>PASSWORD</th>
                  <td class="tac"><el-input type="password" v-model="device.password" size="small" show-password></el-input></td>                  
                </tr>                
              </tbody>
            </table>

          </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="viewRegistForm = false">취소</el-button>
              <el-button size="small" type="primary" @click="registDevice">등록</el-button>
            </span>
          </el-dialog>



    </div>
</div>
</template>

<script>
  // import * as companyApi from '@/api/company';
  import * as settingApi from '@/api/setting';
  import * as collectApi from '@/api/collect';
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  import {
    validationMixin
  } from "vuelidate";
  import {
    required
  } from "vuelidate/lib/validators";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        loading: true,
        devices: [],
        device: {
          deviceName: null,
          deviceIp: null,
          deviceVendor: null,
          userId: null,
          password: null,
          port: null,
          protocol: null,
        },
        viewRegistForm: false,
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
    validations: {
        device: {
          deviceName: {
            required
          },
          deviceIp: {
            required
          },
          deviceVendor: {
            required
          },
          userId: {
            required
          },
          password: {
            required
          },
          port: {
            required
          }
        },
    },
    components: {
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.devices.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     }
   },
    methods: {
      validateState(name) {
        const { $dirty, $error } = this.$v.device[name];
        return $dirty ? !$error : null;
      },
      makeDateForm(date){
        return makeDateForm(date);
      },
      setPage (val) {
        this.page = val
      },
      viewDevice(item){
        this.$router.push({path:'/deviceView', query:{ deviceSeq: item.DEVICE_SEQ }});
      },
      registDevice(){
        this.$v.device.$touch();
        if (this.$v.device.$anyError || this.$v.device.$invalid) {
              this.$message({
                type:"warning",
                message:"값을 입력해주세요."
              })
          return false;
        }

        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        collectApi.newDeviceInfo(this.device)
          .then(res => {
            console.log(res);
            if(res.data.code == 200) {
              this.$message({
              type:"success",
              message:"등록되었습니다."
            })
            this.getDataLoad();
            this.viewRegistForm = false;
            } else {
              this.$message({
                type:"error",
                message:res.data.msg
              })
            }
          })
          .then(() => {
            loading.close();
          })
          .catch(err => {
            console.log(err);
          })
      },
      reloadDevices(){
        console.log("수집서버 Request");
        collectApi.getDeviceFromCollector()
          .then(res => {
            console.log(res.data.data.devices);
          })
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