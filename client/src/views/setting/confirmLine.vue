<template>

  <div class="content">

  <div class="breadcrumb-container">
      <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
    <div class="block-header">
      <h3 class="block-title">결제라인관리</h3>
    </div>
    <div class="block-content">

    <el-table :data="pagedTableData" style="width: 100%">
      <el-table-column label="#" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ confirmLines.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
        </template>
      </el-table-column>
      <el-table-column width="220" label="결재라인 명" prop="LINE_TITLE"></el-table-column>
      <el-table-column  label="결재라인">
        <template slot-scope="scope">
                <div class="add_confirm_line ml20 mr20 confirmlineuser" v-for="(item) in scope.row.CONFIRM_LINE_DATA" 
                v-bind:key="item[1]">
                    <div class="confirm_position">{{item[5]}}</div>
                    <div class="confirm_name">{{item[1]}}&nbsp;{{item[3]}}</div>
                </div>                
        </template>
      </el-table-column>
      <el-table-column width="150" label="삭제">
        <template slot-scope="scope">
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="confirmLineDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col class="tal pt10">
        <el-button type="primary" size="small" @click="confirmLineAddForm = true">결재라인 생성</el-button>
      </el-col>
    </el-row>

    <el-pagination class="mt-4" layout="prev, pager, next" :total="this.confirmLines.length" @current-change="setPage" align="center">
    </el-pagination>

    </div>
  </div>
        <el-dialog
          title="결재라인 생성"
          :visible.sync="confirmLineAddForm" class="confirmlinebox">

        <el-row :gutter="10">
          
          <el-col :lg="10">
              <div class="AdminListDepartment">
                <el-scrollbar class="sidebar-scroll">
                  <Department 
                      ref="departComponent"
                      v-on:handleNodeClick="handleNodeClick" 
                    />
                </el-scrollbar>
              </div>
             
          </el-col>

          <el-col :lg="14">
            <div>
              <el-input placeholder="검색" @keyup.enter.native="userSearch" v-model="userSearchString" size="small" class="input-with-select">
                <el-button slot="append">검색</el-button>
              </el-input>
            </div>
            
            <div class="ConfirmLineBoxTable">
            <el-scrollbar class="sidebar-scroll">
            <el-table 
              :data="userData"
              ref="userData"
              size="small"
              @row-click="userAdd"
              style="cursor:pointer;"
              >
              <el-table-column label="사번" prop="USER_COMPANY_ID"></el-table-column>
              <el-table-column label="이름" prop="USER_NAME"></el-table-column>
              <el-table-column label="부서" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
              <el-table-column label="직책" prop="POSITION_INFO.CODE_NAME"></el-table-column>
            </el-table>

            <el-table 
              :data="userAddedData"
              size="small"
              @row-click="userDelete"
              class="mt30"
              style="cursor:pointer;">
              <el-table-column label="" type="index"></el-table-column>
              <el-table-column label="사번" prop="USER_COMPANY_ID"></el-table-column>
              <el-table-column label="이름" prop="USER_NAME"></el-table-column>
              <el-table-column label="부서" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
              <el-table-column label="직책" prop="POSITION_INFO.CODE_NAME"></el-table-column>
            </el-table>
            </el-scrollbar>
            </div>
            </el-col>
        </el-row>


        <el-row class="mt20">
          <el-col>
            <h4>결재라인명</h4>
            <el-input type="text" size="mini" v-model="confirmTitle" placeholder="결재라인명을 입력해주세요."></el-input>
          </el-col>
        </el-row>

          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="confirmLineAddForm = false">취소</el-button>
            <el-button type="success" size="small" @click="confirmLineAdd">적용하기</el-button>
          </span>
        </el-dialog>

  </div>
</template>

<style>

  .confirmlinebox .el-dialog {
    margin-top:11vh !important;
  }
  .ConfirmLineBoxTable {
    width:100%;
    height:470px;
  }
</style>


<script>
  // import * as companyApi from '@/api/company';
  import * as settingApi from '@/api/setting';
  import * as companyApi from '@/api/company';
  import Department from '../../components/Department';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        userSeq: this.$cookies.get("USER_SEQ"),
        confirmTitle: "",
        confirmLines: [],
        confirmLineAddForm: false,
        selectAdmin: [],
        userSearchString: "",
        userData: [],
        userAddedData: [],
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
      }
    },
    components: {
      Department,
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.confirmLines.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     }
   },
    methods: {
       handleNodeClick(item){
        console.log(item);
        let data = {
          departSeq : item.id
        }
        companyApi.getUsersInDepart(data)
        .then(res => {
          this.userData = res.data
        })
        .catch(error => {
          console.log(error);
        });
      },
      userSearch(){
        let data = {
          searchString : this.userSearchString
        }
        this.userData = [];
        companyApi.searchAdmin(data)
        .then(res => {
          console.log(res);
          this.userData = res.data
        })
        .catch(error =>{
          console.log(error);
        })
      },
      userAdd(item){
        console.log(item.USER_SEQ);
        // const check = this.userAddedData.find(element => element.USER_SEQ);
        let check = false;
        this.userAddedData.forEach(element => {
          if(element.USER_SEQ === item.USER_SEQ){
            check = true;
          }
        })
        if(!check){
          this.userAddedData.push(item);
        }
      },
      userDelete(item){
        console.log(item.USER_SEQ);
        this.userAddedData.forEach( (element, index) => {
          if(element.USER_SEQ === item.USER_SEQ){
            this.userAddedData.splice(index, 1);
          }
        })
        // this.userAddedData.splice(index, 1);
        // console.log(this.userAddedData);
      },
      confirmLineAdd(){
        if(this.confirmTitle == ''){
          alert("결재라인을 입력해주세요.");
          return false;
        }

        if(this.userAddedData.length == 0){
          alert("결재자를 추가해주세요.");
          return false;
        } else if(this.userAddedData.length < 2){
          alert("결재자는 2명 이상 지정해야 합니다.");
          return false;
        } else if(this.userAddedData.length > 5){
          alert("결재자가 너무 많습니다. 5명 이하로 지정해주세요.")
          return false;
        }
      

        let contentsArray = [];
        this.userAddedData.forEach(element => {
          console.log(element);
          let data = [element.USER_SEQ, element.USER_NAME, element.POSITION_INFO.CODE_SEQ, element.POSITION_INFO.CODE_NAME, element.DEPART_INFO.DEPARTMENT_SEQ, element.DEPART_INFO.DEPARTMENT, element.POSITION_INFO.CODE_ORDER]
          contentsArray.push(data);
        })

        let data = {
          userSeq : this.userSeq,
          confirmTitle : this.confirmTitle,
          confirmLineData : contentsArray
        }
        settingApi.newConfirmLine(data)
        .then(res => {
          console.log(res);
          this.getDataLoad();
          this.$message({
          type: 'success',
          message: `결재라인이 생성되었습니다.`
          })
          this.confirmLineAddForm = false;
          this.userData = [];
          this.userAddedData = [];
        })
        .catch(err => {
          console.log(err);
        })
      },
      confirmLineDelete(index, row){
       this.$confirm("해당 결재라인을 삭제하시겠습니까?", {
          confirmButtonText: "삭제",
          cancelButtonText: '취소',
          confirmButtonClass:'el-button--danger',
          type: 'warning',
          callback: action =>{
            if(action == "confirm"){
              let data = {
                SEQ : row.SEQ
              }
              settingApi.deleteConfirmLine( data)
              .then(res => {
                console.log(res);
                this.getDataLoad();
                this.$message({
                type: 'success',
                message: `결재라인이 삭제되었습니다.`
                })
              })
              .catch(err => {
                console.log(err);
              })

              } else {
              this.$message({
                type: 'info',
                message: `삭제가 취소되었습니다.`
              })
            }
          }   
        })
      },
      setPage (val) {
        this.page = val
      },
      getDataLoad() {
        this.confirmLines = [];
        settingApi.getConfirmLineList()
          .then(res => {
            res.data.forEach(element => {
              let data = {
                SEQ : element.SEQ,
                LINE_TITLE : element.LINE_TITLE,
                CONFIRM_LINE_DATA : JSON.parse(element.CONFIRM_LINE_DATA)
              }

              this.confirmLines.push(data);
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