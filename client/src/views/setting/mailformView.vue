<template>
  <div class="content">

  <div class="breadcrumb-container">
      <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
    <div class="block-header">
      <h3 class="block-title">메일폼관리</h3>
    </div>
    <div class="block-content">
    <Tiptap ref="tiptap" />
    <div class="blockbase block-rounded pd10 mt10" align="right">
          <span slot="footer" class="dialog-footer 10">
            <el-button @click="mailFormSave" type="primary" size="small">저장</el-button>
            <el-button @click="mailFormReset" size="small">취소</el-button>
            <el-button @click="goMailFormList" size="small">목록보기</el-button>
          </span>
    </div>
    </div>
  </div>

  </div>
</template>

<style>
  .el-select .el-input {
    width: 110px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>

<script>
  // import * as companyApi from '@/api/company';
  import * as settingApi from '@/api/setting';
  import Tiptap from '../../components/Tiptap';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        seq : this.$route.query.seq
      }
    },
    components: {
      Tiptap,
      Breadcrumb
    },
    methods: {
      mailFormSave() {
        console.log(this.content);
        let data = {
          seq: this.seq,
          contents: this.$refs.tiptap.content
        }
        console.log(data);
        settingApi.updateMailForm(data)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          })
      },
      mailFormReset() {
        this.$refs.tiptap.content = "";

      },
      goMailFormList() {
        this.$router.push({path:'/mailFormList'});
      },
      getDataLoad() {
        this.mailForm = [];
        let data = {
          seq :  this.$route.query.seq
        }
        settingApi.getMailForm(data)
          .then(res => {
            this.$refs.tiptap.content = res.data.MAIL_CONTENTS;
          })
          
      }
    },
    mounted() {
      this.getDataLoad()
        
    }

  }
</script>

