
<template>
<div class="contents">

  <div class="breadcrumb-container">
    <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
      <div class="block-header">
        <h3 class="block-title">정책사용자 변경</h3>
      </div>
      <div class="block-content">

      <el-row class="mb30 pw20" >
        <el-col :span="12">
          <el-row>
            <el-col class="pr10 TableLeftName ft14 line_h43" :span="4">인계자</el-col>
            <el-col :span="20" style="padding:5px 0;">
              <el-button type="primary" @click="userDialogVisible = true" size="small">인계자 선택</el-button>
              <span class="ml20 TabletitleName">{{ selectedUserStr }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="mb20 pw20">
          <el-col class="pr30 TableLeftName ft14" :span="24">신청리스트</el-col>
          <el-col :span="24">
              <el-table :data="applies" ref="applyTable">
                <el-table-column type="selection" width="80"></el-table-column>
                <el-table-column label="신청번호" width="300">
                  <template slot-scope="scope">
                    <span>{{ scope.row.APPLY_NUMBER }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="사유" width="600">
                    <template slot-scope="scope">
                    <span>{{ getWordCount(scope.row.APPLY_TITLE, 20, "...") }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="신청일">
                    <template slot-scope="scope">
                    <span>{{ getWordCount(scope.row.APPLY_REG_DATE, 10, "") }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="상태" width="240">
                    <template slot-scope="scope">
                    <el-tag size="mini" effect="dark" type="success">{{  getApplyStatus(scope.row.APPLY_STATUS) }}</el-tag>
                    </template>
                </el-table-column>
            </el-table>

          </el-col>
      </el-row>

      <el-row class="mb20 pw20">
          <el-col align="left">
            <el-button type="primary" size="small" @click="moveApplies">이관신청</el-button>
          </el-col>
      </el-row>

      </div>

      <el-dialog
          title="인계자 선택하기"
          :visible.sync="userDialogVisible">

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

            <el-table 
              :data="userData"
              ref="userData"
              size="small"
              @row-click="userChoice"
              style="cursor:pointer;"
              >
              <el-table-column label="사번" prop="USER_COMPANY_ID"></el-table-column>
              <el-table-column label="이름" prop="USER_NAME"></el-table-column>
              <el-table-column label="부서" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
              <el-table-column label="직책" prop="POSITION_INFO.CODE_NAME"></el-table-column>
            </el-table>
            </el-col>

        </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="userDialogVisible = false">취소</el-button>
          </span>
        </el-dialog>

  </div>
</div>
</template>

<script>
  import * as companyApi from '@/api/company';
  import * as applyApi from '@/api/apply';
  import * as settingApi from '@/api/setting';
  import {getApplyStatus, getWordCount, getApplyWorkType} from "@/lib/apply";
  import Department from '../../components/Department'
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        applies: [],
        selectedUser: "",
        selectedUserStr: "",
        userSearchString: "",
        userData: [],
        userDialogVisible: false,
        
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
    methods: {
      getApplyStatus(flag){
          return getApplyStatus(flag);
      },
      getWordCount(str, wordCout, dot){
          return getWordCount(str,wordCout, dot);
      },
      getApplyWorkType(flag){
          return getApplyWorkType(flag);
      },
      handleNodeClick(item){
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
      setPage (val) {
          this.page = val
      },
      userChoice(item){
        let str = "";
        if(item.DEPART_INFO.DEPARTMENT){
          str += item.DEPART_INFO.DEPARTMENT;
          str += " ";
        }

        if(item.USER_NAME){
          str += item.USER_NAME;
          str += " ";
        }

        if(item.POSITION_INFO.CODE_NAME){
          str += item.POSITION_INFO.CODE_NAME;
        }

        this.selectedUser = item;
        this.selectedUserStr = str;
        this.userDialogVisible = false;
      },
      moveApplies(){
        if(!this.selectedUser || this.selectedUser == ""){
          this.$message({
                type: 'warning',
                message: `인계자를 선택해주세요.`
              })
          return false;
        }
        
        let selection = this.$refs.applyTable.selection;
        if(selection.length == 0){
          this.$message({
                type: 'warning',
                message: `이관할 신청서를 선택하세요.`
              })
          return false;
        }
        
        let selectionSeqs = [];
        selection.forEach(element => {
          selectionSeqs.push(element.APPLY_SEQ);
        })

        let data = {
          fromUser: this.$cookies.get('USER_SEQ'),
          toUser: this.selectedUser.USER_SEQ,
          selection: selectionSeqs
        }
        settingApi.moveApplies(data)
          .then(res => {
            console.log(res);
            alert("이관 신청완료되었습니다.");
            this.$router.go(this.$router.currentRoute)
          })
          .catch(err => {
            console.log(err);
          })
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
      getDataLoad() {
        const SearchOptions = {
          flag: "changeApply"
        }
        applyApi.getApplies(SearchOptions)
          .then((res) => {
            // console.log(res.data);
            res.data.forEach(element => {
              this.applies.push(element);
            })
            console.log(this.applies);
          })
      }
    },
    computed: {
      pagedTableData() {
        return this.applies.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
    },
    created() {      
      this.getDataLoad();
    }
  }
</script>