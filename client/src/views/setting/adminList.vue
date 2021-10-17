<template>
  <div class="content">

        <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
        </div>

        <div class="blockbase block-rounded">
            <div class="block-content">

              <el-form ref="form" :model="searchForm" label-width="120px">
                <el-form-item label="등록일" class="pb5" size="small">
                  <el-col :span="3">
                    <el-date-picker type="date" placeholder="시작날짜" v-model="searchForm.startDate" style="width:100%"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="1" align="center">-</el-col>
                  <el-col :span="3">
                    <el-date-picker type="date" placeholder="종료날짜" v-model="searchForm.endDate" style="width:100%"></el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="부서" class="AdminListForm pb5" size="small">
                  <el-col :span="4">
                    <el-select v-model="searchForm.department" placeholder="please select your zone">
                      <el-option v-for="item in departments" :key="item.value" :label="item.text" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                
                <el-form-item label="직책" class="AdminListForm pb5" size="small">
                  <el-select v-model="searchForm.position" placeholder="please select your zone">
                    <el-option v-for="item in positions" :key="item.value" :label="item.text" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-form-item>
              
                <el-form-item label="단어검색" size="small">
                  <el-input @keyup.enter.native="search" placeholder="검색" v-model="searchForm.searchString" class="input-with-select" style="width:80%;">
                    <el-select v-model="searchForm.searchField" slot="prepend" placeholder="Select">
                      <el-option v-for="item in searchFields" :key="item.value" :label="item.text" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                  </el-input>
                </el-form-item>
              </el-form>

            </div>
        </div>

        <div class="blockbase block-rounded">
            <div class="block-header">
              <h3 class="block-title">관리자 리스트</h3>
            </div>
            <div class="block-content">

              <el-table :data="pagedTableData" style="width: 100%">
                <el-table-column label="#" width="80">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="아이디">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.USER_ID }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="이름">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.USER_NAME }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="연락처">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.USER_PHONE }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="이메일" width="240">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.USER_EMAIL }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="사번">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.USER_COMPANY_ID }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="검증 권한">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.USER_RULE_AUTH }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="등록일자">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ makeDateForm(scope.row.USER_REG_DATE) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="부서">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.DEPARTMENT }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="직책">
                    <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.POSITION }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="권한해지" width="140">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="adminDelete(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-button @click="adminDialogVisible = true" class="mt20" size="mini" type="primary">관리자 등록하기</el-button>

              <el-pagination class="mt-4"  layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
              </el-pagination>

            </div>
        </div>


        <el-dialog
          title="관리자 추가하기"
          :visible.sync="adminDialogVisible"
          class="adminlistcont">

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
              <el-input placeholder="검색" @keyup.enter.native="adminSearch" v-model="userSearchString" size="small" class="input-with-select">
                <el-button slot="append">검색</el-button>
              </el-input>
            </div>

            <el-table 
              :data="userData"
              ref="userData"
              size="small"
              >
              <el-table-column type="selection" label="#" prop="userSeq" v-model="selectAdmin" width="80"></el-table-column>
              <el-table-column label="사번" prop="USER_COMPANY_ID"></el-table-column>
              <el-table-column label="이름" prop="USER_NAME"></el-table-column>
              <el-table-column label="부서" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
              <el-table-column label="직책" prop="POSITION_INFO.CODE_NAME"></el-table-column>
            </el-table>
            </el-col>

        </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="adminDialogVisible = false">취소</el-button>
            <el-button size="small" type="primary" @click="adminAdd">관리자 등록</el-button>
          </span>
        </el-dialog>


  </div>
</template>

<style>

  .el-dialog {
    width:50%;
  }
.adminlistcont .el-dialog__body {
    height:500px;
}
 .AdminListDepartment {
   width:100%;
   height:500px;
   overflow-y:auto;
 }


</style>

<script>
  import * as companyApi from '@/api/company';
  import Department from '../../components/Department'
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        selectAdmin: [],
        userSearchString: "",
        userData: [],
        adminDialogVisible: false,
        items: [],
        searchForm: {
          startDate: null,
          endDate: null,
          department: null,
          position: null,
          searchField: null,
          searchString: ''
        },
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
        departments: [{
          value: null,
          text: '전체'
        }],
        positions: [{
          value: null,
          text: '전체'
        }, ],
        searchFields: [{
            value: null,
            text: '전체'
          },
          {
            value: "id",
            text: '아이디'
          },
          {
            value: "name",
            text: '이름'
          },
          {
            value: "compnay_id",
            text: '사번'
          },
          {
            value: "email",
            text: '이메일'
          },
        ],
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
      makeDateForm(timestamp){
        const date = makeDateForm(timestamp, "-");
        return date;
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
      adminAdd(){
        let adminUser = this.$refs.userData.selection;
        const data = [];
        if(adminUser.length > 0){
          this.$refs.userData.selection.forEach(element =>{
            data.push(element);
        })
        companyApi.addAdminUser(data)
        .then(() => {
          this.getDataLoad();
          this.adminDialogVisible = false;
          this.userData = [];
        })
        .catch(error =>{
          console.log(error);
        })
        } else {
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
        if(confirm("권한을 해지하시겠습니까?")){
          const data = {
              "USER_SEQ" : row.USER_SEQ,
              "USER_AUTH" : 'N'
          };

          companyApi.modifyAuth(data)
          .then(res => {
            if(res){
              this.$router.push("/adminList")}
              alert("해지되었습니다.");
              this.getDataLoad();
            });
          }
      },
      setPage (val) {
        this.page = val
      },
      registAdmin() {
        this.$router.push({
          path: '/userRegist'
        });
      },
      viewDetail(item) {
        this.$router.push({
          path: '/userDetail',
          query: {
            userSeq: item.USER_SEQ
          }
        });
      },
      search() {
        this.items = [];
        const data = {
          startDate: this.searchForm.startDate,
          endDate: this.searchForm.endDate,
          department: this.searchForm.department, 
          position: this.searchForm.position,
          searchField: this.searchForm.searchField,
          searchString: this.searchForm.searchString
        }

        companyApi.getAdminList(data)
          .then(res => {
            // console.log(res);
            this.itemLength = res.data.length;
            res.data.forEach(element => {
              const userData = {
                "USER_SEQ": element.USER_SEQ,
                "USER_ID": element.USER_ID,
                "USER_NAME": element.USER_NAME,
                "USER_PHONE": element.USER_PHONE,
                "USER_EMAIL": element.USER_EMAIL,
                "USER_COMPANY_ID": element.USER_COMPANY_ID,
                "USER_REG_DATE": element.USER_REG_DATE,
              }

              if(element.DEPART_INFO != null){
                userData["DEPARTMENT"] = element.DEPART_INFO.DEPARTMENT;
              }

              if(element.POSITION_INFO != null){
                userData["POSITION"] = element.POSITION_INFO.CODE_NAME;
              }

              this.items.push(userData);

            })
          })
      },
      getDataLoad() {
        this.items = [];
        this.departments = [{
          value: null,
          text: '전체'
        }],
        this.positions = [{
          value: null,
          text: '전체'
        }, ],
        companyApi.getDepartList()
          .then(res => {
            res.data.forEach(element => {
              const departData = {
                value: element.DEPARTMENT_SEQ,
                text: element.DEPARTMENT,
              }
              this.departments.push(departData);
            });
          })
        companyApi.getPositionList()
          .then(res => {
            res.data.forEach(element => {
              const positionData = {
                value: element.CODE_SEQ,
                text: element.CODE_NAME
              }
              this.positions.push(positionData);
            })
          })

        const data = {
          startDate: this.searchForm.startDate,
          endDate: this.searchForm.endDate,
          department: this.searchForm.department,
          position: this.searchForm.position,
          searchField: this.searchForm.searchField,
          searchString: this.searchForm.searchString
        }

        companyApi.getAdminList(data)
          .then(res => {
            // console.log(res);
            res.data.forEach(element => {
              const userData = {
                "USER_SEQ": element.USER_SEQ,
                "USER_ID": element.USER_ID,
                "USER_NAME": element.USER_NAME,
                "USER_PHONE": element.USER_PHONE,
                "USER_EMAIL": element.USER_EMAIL,
                "USER_COMPANY_ID": element.USER_COMPANY_ID,
                "USER_REG_DATE": element.USER_REG_DATE,
              }

              if(element.DEPART_INFO != null){
                userData["DEPARTMENT"] = element.DEPART_INFO.DEPARTMENT;
              }

              if(element.POSITION_INFO != null){
                userData["POSITION"] = element.POSITION_INFO.CODE_NAME;
              }

              this.items.push(userData);
            })
          })
            
      }
    },
    created() {
      this.getDataLoad();
    }

  }
</script>