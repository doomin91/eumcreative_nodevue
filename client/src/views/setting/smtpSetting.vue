<template>
<div class="contents">
    <div class="breadcrumb-container">
        <breadcrumb id="breadcrumb-container" />
    </div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">SMTP 정보관리</h3>
        </div>
        <div class="block-content">
          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP 사용유무
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-radio v-model="smtp.enable" label=true>사용</el-radio>
              <el-radio v-model="smtp.enable" label=false>미사용</el-radio>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP 인증 사용유무
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              
              <el-radio v-model="smtp.authenticate" label=true>사용</el-radio>
              <el-radio v-model="smtp.authenticate" label=false>미사용</el-radio>

            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP TLS 사용유무
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              
              <el-radio v-model="smtp.tls" label=true>사용</el-radio>
              <el-radio v-model="smtp.tls" label=false>미사용</el-radio>

            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP HOST
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-input
                placeholder="Please input"
                v-model="smtp.host"
                clearable size="small">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP PORT
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-input
                placeholder="Please input"
                v-model="smtp.port"
                clearable size="small">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP USER
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-input
                placeholder="Please input"
                v-model="smtp.user"
                clearable size="small">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP PASSWORD
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-input
                placeholder="Please input"
                v-model="smtp.password"
                show-password size="small">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              SMTP PROTOCOL
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-input
                placeholder="Please input"
                v-model="smtp.protocol"
                clearable size="small">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col class="pd10" :span="3" align="left">
              보내는 메일주소
            </el-col>
            <el-col class="pd10 pl40" :span="21">
              <el-input
                placeholder="Please input"
                v-model="smtp.receiver"
                clearable size="small">
              </el-input>
            </el-col>
          </el-row>

          <el-row class="mb20 pw20">
            <el-col align="right" class="pd10 pr30">
              <el-button type="primary" variant="" size="small" @click="saveSmtpSetting()">저장</el-button>
              <el-button type="info" size="small" @click="testSmtp()">메일서버 테스트</el-button>
            </el-col>
          </el-row>
        </div>
    </div>
</div>
</template>

<script>

  import * as settingApi from '@/api/setting';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        smtp : {
          enable: "",
          authenticate: "",
          tls: "",
          host: "",
          port: "",
          user: "",
          password: "",
          protocol: "",
          receiver: ""
        }
      }
    },
    components: {
      Breadcrumb
    },
    methods: {
      saveSmtpSetting(){
        // console.log(this.smtp);
        settingApi.saveSmtpSetting(this.smtp)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      },
      testSmtp(){
        settingApi.sendTestEmail(this.smtp)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      },
      getDataLoad() {
        settingApi.getSmtpInfo()
        .then(res => {
          console.log(res);
          
          this.smtp = {
          enable: res.data.SMTP_USER_FLAG,
          authenticate: res.data.SMTP_AUTH_FLAG,
          tls: res.data.SMTP_TLS_FLAG,
          host: res.data.SMTP_HOST,
          port: res.data.SMTP_PORT,
          user: res.data.SMTP_USER,
          password: res.data.SMTP_PASS,
          protocol: res.data.SMTP_PROTOCOL,
          receiver: res.data.SMTP_MAIL_ADDR
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