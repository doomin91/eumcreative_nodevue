<template>
<div class="contents">
  <div class="breadcrumb-container">
    <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
      <div class="block-header">
        <h3 class="block-title">장비 상세보기</h3>
      </div>
      <div class="block-content">
          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              장비 ID
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              {{ device.deviceSeq }}
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              도메인 ID
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              {{ device.domainSeq }}
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              등록일자
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              {{ makeDateForm(device.regDate) }}
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              수정사항
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              {{ device.deviceChangeLog }}
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              접속정보
            </el-col>
            <el-col class="pd10 pl40" :span="21">

            <table class="customTable01">
              <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
              </colgroup>
              <tbody>
                <tr>
                  <th>Vendor</th>
                  <td class="f_left">
                    <el-select v-model="device.deviceVendor">
                      <el-option v-for="item in vendor" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    </td>
                    <th>장비명</th>
                    <td>
                      <el-input v-model="device.deviceName" readonly></el-input>
                    </td>
                </tr>
                <tr>
                  <th>IP</th>
                  <td class="tac"><el-input v-model="device.deviceIp"></el-input></td>
                  <th>PORT</th>
                  <td class="tac"><el-input v-model="device.port"></el-input></td>                  
                </tr>
                <tr>
                  <th>ID</th>
                  <td class="tac"><el-input v-model="device.userId"></el-input></td>
                  <th>PASSWORD</th>
                  <td class="tac"><el-input type="password" v-model="device.password" show-password></el-input></td>                  
                </tr>                
              </tbody>
            </table>

            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              접속상태
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <table class="customTable01">
              <colgroup>
                <col width="33%">
                <col width="33%">
                <col width="33%">
              </colgroup>
              <tbody>
                <tr>
                  <th>Retrieval</th>
                  <th>Change</th>
                  <th>Log</th>
                </tr>
                <tr>
                  <td class="tac">
                    <el-tag v-if="device.retrievalFlag == `Y`" effect="dark" size="mini" type="success">Online</el-tag>
                    <el-tag v-if="device.retrievalFlag == `N`" effect="dark" size="mini" type="danger">Offline</el-tag>
                    </td>
                  <td class="tac">
                    <el-tag v-if="device.changeFlag == `Y`" effect="dark" size="mini" type="success">Online</el-tag>
                    <el-tag v-if="device.changeFlag == `N`" effect="dark" size="mini" type="danger">Offline</el-tag>
                    </td>
                  <td class="tac">
                    <el-tag v-if="device.logFlag == `Y`" effect="dark" size="mini" type="success">Online</el-tag>
                    <el-tag v-if="device.logFlag == `N`" effect="dark" size="mini" type="danger">Offline</el-tag>
                    </td>
                </tr>
              </tbody>
            </table>
            </el-col>
          </el-row>



      <el-row class="mb20 pw20">
          <el-col align="right">
            <el-button type="default" @click="goBack()">뒤로가기</el-button>
            <el-button type="danger" @click="deleteDevice()">삭제</el-button>

            <!-- <el-button type="primary" @click="goBack()">접속테스트</el-button> -->
            <el-button type="primary" @click="saveDeviceInfo()">저장</el-button>
          </el-col>
      </el-row>

      </div>

  </div>
</div>
</template>

<script>
  import * as collectApi from '@/api/collect';
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'


  export default {
    data() {
      return {
        deviceSeq: this.$route.query.deviceSeq,
        device: "",
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
    },
    components: {
      Breadcrumb
    },
    methods: {
      makeDateForm(date){
        return makeDateForm(date);
      },
      goBack(){
        this.$router.go(-1);
      },
      saveDeviceInfo(){
        collectApi.setDeviceInfo(this.device)
          .then(res => {
            if(res.data.code == 200){
              this.$message({
                type:"success",
                message:res.data.msg
              })
            } else {
              this.$message({
                type:"warning",
                message:res.data.msg
              })
            }
          })
          .catch(err => {
            this.$message({
              type:"danger",
              message: err
            })
          })
      },
      deleteDevice(){
        this.$confirm("해당 장비설정을 삭제하시겠습니까?", "장비설정 삭제", {
          confirmButtonText: "삭제",
          type:"warning",
          callback: action =>{
            if(action == "confirm"){
              collectApi.deleteDevice(this.deviceSeq)
                .then(res =>{
                  console.log(res);
                  if(res.data.code == 200){
                    this.$message({
                      type:"success",
                      message:"삭제 완료"
                    })
                    this.$router.push({path:"/deviceList"})
                  }else{
                    this.$message({
                      type:"error",
                      message:"삭제 실패"
                    })
                  }
                })
                .catch(err => {
                  console.log(err);
                })
            }else  {
              console.log(action);
            }
          }
        })
      },
      getDataLoad() {
        collectApi.getDeviceInfo(this.deviceSeq)
          .then(res => {
            console.log(res);
            this.device = {
              deviceSeq: res.data?.DEVICE_SEQ,
              domainSeq: res.data?.DOMAIN_SEQ,
              regDate: res.data?.REG_DATE,
              deviceChangeLog: res.data?.LOG_FLAG,
              deviceName: res.data?.DEVICE_NAME,
              deviceIp: res.data?.DEVICE_IP,
              deviceVendor: res.data?.DEVICE_VENDOR,
              userId: res.data?.USER_ID,
              password: res.data?.PASSWORD,
              port: res.data?.PORT,
              protocol: res.data?.PROTOCOL,
              retrievalFlag: res.data?.RETRIEVAL_FLAG,
              changeFlag: res.data?.CHANGE_FLAG,
              logFlag: res.data?.LOG_FLAG
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
    created() {      
      this.getDataLoad();
    }
  }
</script>