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
      <el-row>
        <el-col>
          <el-table :data="pagedTableData" @row-click="viewMailForm" style="width:100%; cursor:pointer;">
            <el-table-column label="메일폼 제목" prop="MAIL_TITLE" width="1000"></el-table-column>
            <el-table-column label="최종수정 사용자" prop="LAST_REG_USER"></el-table-column>
            <el-table-column label="최종수정 날짜" prop="LAST_REG_DATE" width="300"></el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <el-row class="pt10">
        <el-col>
          <el-pagination class="mt-4" layout="prev, pager, next" :total="this.mailForms.length" @current-change="setPage" align="center">
          </el-pagination>

        </el-col>
      </el-row>

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
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        mailForms: [],
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
      }
    },
    components: {
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.mailForms.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     }
   },
    methods: {
      setPage (val) {
        this.page = val
      },
      viewMailForm(row){
        this.$router.push({path:'/mailFormView', query:{ seq: row.SEQ }});
      },
      registMailForm(){
        console.log("메일 등록");
      },
      getDataLoad() {
        this.mailForms = [];
        settingApi.getMailFormList()
          .then(res => {
            console.log(res);
            res.data.forEach(element => {
              this.mailForms.push(element);
            })
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