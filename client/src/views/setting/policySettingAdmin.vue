<template>
<div class="contents">
    <div class="breadcrumb-container">
      <breadcrumb id="breadcrumb-container" />
    </div>

    <div class="blockbase block-rounded">
        <div class="block-content">

          <el-table :data="pagedTableData" style="width: 100%">
            <el-table-column label="#">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
              </template>
            </el-table-column>
                  <el-table-column label="제한명칭">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.limit }}</span>
                </template>
            </el-table-column>
            <el-table-column label="아이디">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.companyId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="이름">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.userName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="부서">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.depart }}</span>
                </template>
            </el-table-column>
            <el-table-column label="직책">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.position }}</span>
                </template>
            </el-table-column>
            <el-table-column label="권한해지">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="adminDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="pd10">
            <el-button type="primary" size="small" @click="adminDialogVisible = true">관리자 설정하기</el-button>
          </div>

          <el-pagination class="mt-4" layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
          </el-pagination>


          <el-dialog
            title="관리자 추가하기"
            :visible.sync="adminDialogVisible"
            width="50%">

          <el-row v-if="step === 1" :gutter="10">

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
                <el-input placeholder="검색" @keyup.enter.native="adminSearch" v-model="userSearchString" size="small" class="input-with-select">
                  <el-button slot="append" @click="adminSearch">검색</el-button>
                </el-input>
              </div>

              <el-table 
                :data="userData"
                ref="userData"
                size="small"
                >
                <el-table-column type="selection" label="#" prop="userSeq" v-model="selectAdmin" width="60"></el-table-column>
                <el-table-column label="사번" prop="USER_COMPANY_ID"></el-table-column>
                <el-table-column label="이름" prop="USER_NAME"></el-table-column>
                <el-table-column label="부서" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
                <el-table-column label="직책" prop="POSITION_INFO.CODE_NAME"></el-table-column>
              </el-table>
              </el-col>
          </el-row>

          <el-row v-if="step === 2">

            <el-col>
              <el-row class="pd20">
                <div class="PolicyAdminBoard">
                  <table class="customTable01">
                    <colgroup>
                      <col width="20%">
                      <col width="80%">
                    </colgroup>
                    <tbody>
                      <tr>
                        <th>제한정책</th>
                        <td>
                          <el-select placeholder="Select" v-model="policySettingInfo.limit">
                            <el-option
                              v-for="item in policyLimits"
                              :key="item.LIMIT_SEQ"
                              :label="item.LIMIT_TITLE"
                              :value="item.LIMIT_SEQ">
                              <span style="float: left">{{ item.LIMIT_TITLE }}</span>
                              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.LIMIT_TITLE }}</span>
                            </el-option>
                          </el-select>
                        </td>
                      </tr>
                      <tr>
                        <th>날짜</th>
                        <td>
                          <el-date-picker
                            v-model="policySettingInfo.date"
                            type="daterange"
                            range-separator="To"
                            start-placeholder="Start date"
                            end-placeholder="End date">
                          </el-date-picker>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

              </el-row>  
            </el-col>
          </el-row>

            <span slot="footer" class="dialog-footer">
              <el-button v-if="step === 1" size="small" @click="adminDialogVisible = false">취소</el-button>
              <el-button v-if="step === 1" type="primary" size="small" @click="adminAdd">다음</el-button>
              <el-button v-if="step === 2" size="small" @click="step = 1">이전</el-button>
              <el-button v-if="step === 2" type="primary" size="small" @click="saveAll">저장</el-button>
            </span>
          </el-dialog>


        </div>
    </div>
</div>
</template>

<style>
  .el-dialog__body {
    padding-top:20px;
  }

</style>




<script>
  import * as settingApi from '@/api/setting';
  import * as companyApi from '@/api/company';
  import Department from '../../components/Department'
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        step: 1,
        selectAdmin: [],
        userSearchString: "",
        userData: [],
        adminDialogVisible: false,
        items: [],
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
        policySettingInfo:{
          admin: [],
          limit: "",
          date: ""
        },
        policyLimits: []
      }
    },
    components: {
      Department,
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.items.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
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
      adminAdd(){
        let adminUser = this.$refs.userData.selection;
        if(adminUser.length > 0){
          this.step = 2;
          this.$refs.userData.selection.forEach(element =>{
            this.policySettingInfo.admin.push(element);
          })
        }
        else {
          alert("관리자로 등록할 사용자를 선택해주세요.")
        }
      },
      adminSearch(){
        let data = {
          searchString : this.userSearchString
        }
        this.userData = [];
        companyApi.searchAdmin(data)
        .then(res => {
          this.userData = res.data
        })
        .catch(error =>{
          console.log(error);
        })
      },
      adminDelete(index, row){
        this.$confirm("해당 정책권한을 삭제하시겠습니까", "Warning", {
          confirmButtonText: "삭제",
          cancelButtonText: '취소',
          confirmButtonClass:'el-button--danger',
          type: 'warning',
          callback: action =>{
            if(action == "confirm"){
              settingApi.deletePolicyAdmin(row)
              .then(res => {
                console.log(res);
                this.getDataLoad();
                this.$message({
                type: 'success',
                message: `정책권한이 삭제되었습니다.`
              })
              .catch(err => {
                this.$message({
                type: 'error',
                message: err
              })
              })
            });
              } else {
              this.$message({
                type: 'info',
                message: `삭제가 취소되었습니다.`
              })
            }
          }   
        })
      },
      saveAll(){
        console.log(this.policySettingInfo);
        settingApi.insertPolicyAdmin(this.policySettingInfo)
        .then(res =>{
          console.log(res);
          this.getDataLoad();
        })
        .catch(err =>{
          console.log(err);
        })
      },
      setPage (val) {
        this.page = val
      },
      getDataLoad() {
        this.adminDialogVisible = false;
        this.items = []
        settingApi.getPolicyAdminList()
          .then(res => {
            console.log(res);
            res.data.forEach(element =>{
              let data = {
                seq: element.SEQ,
                limit: element.LIMIT?.LIMIT_TITLE,
                companyId: element.USER_INFO?.USER_COMPANY_ID,
                userName: element.USER_INFO?.USER_NAME,
                depart: element.USER_INFO?.DEPART_INFO?.DEPARTMENT,
                position: element.USER_INFO?.POSITION_INFO?.CODE_NAME
              }
              this.items.push(data);
            })
            })
          .catch(err => {
            console.log(err);
          })
        
        settingApi.getPolicyLimits()
          .then(res => {
            res.data.forEach(element => {
              this.policyLimits.push(element);
            });
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