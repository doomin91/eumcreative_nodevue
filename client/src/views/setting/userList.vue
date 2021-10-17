<template>
  <div class="content">

<div class="breadcrumb-container">
    <breadcrumb id="breadcrumb-container" />
</div>

      <el-form ref="form" :model="searchForm" label-width="120px" label-padding-right="20px">
        <div class="blockbase block-rounded">
            <div class="block-content">

                <el-form-item label="등록일" class="pb5 " size="small">
                  <el-col :span="3">
                    <el-date-picker type="date" placeholder="시작날짜" v-model="searchForm.startDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="1" align="center">-</el-col>
                  <el-col :span="3">
                    <el-date-picker type="date" placeholder="종료날짜" v-model="searchForm.endDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>

                <el-form-item label="부서" class="AdminListForm pb5" size="small">
                  <el-select v-model="searchForm.department" placeholder="please select your zone" >
                    <el-option v-for="item in departments" :key="item.value" :label="item.text" :value="item.value" :disabled="item.disabled"></el-option>
                  </el-select>
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

            </div>
        </div>
      </el-form>

      <div class="blockbase block-rounded">
          <div class="block-header">
            <h3 class="block-title">사용자 관리</h3>
          </div>
          <div class="block-content">
            <div class="customTable">
            <el-table :data="pagedTableData" >
              <el-table-column label="#" width="80" >
                <template slot-scope="scope">
                  <span>{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
                </template>
              </el-table-column>
              <el-table-column label="아이디">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="이름">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_NAME }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="연락처">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_PHONE }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="이메일" width="240">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_EMAIL }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="사번">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_COMPANY_ID }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="검증 권한">
                  <template slot-scope="scope">
                  <span>{{ scope.row.USER_RULE_AUTH }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="등록일자">
                  <template slot-scope="scope">
                  <span>{{ makeDateForm(scope.row.USER_REG_DATE) }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="부서">
                  <template slot-scope="scope">
                  <span>{{ scope.row.DEPARTMENT }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="직책">
                  <template slot-scope="scope">
                  <span>{{ scope.row.POSITION }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="수정/삭제" width="180">
                <template slot-scope="scope">
                  <el-button size="mini" type="success" icon="el-icon-edit" @click="viewDetail(scope.row)"></el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="userDelete(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            </div>

            <el-button @click="registUser()" type="primary" size="mini" class="mt20">사용자 등록</el-button>


            <el-pagination class="mt-4" layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
            </el-pagination>



          </div>
      </div>

  </div>
</template>

<style>
  .UserListForm .el-input {
    width:220px !important;
  }

</style>



<script>
  import * as companyApi from '@/api/company';
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
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
        }],
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
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.items.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
    methods: {
      makeDateForm(timestamp){
        const date = makeDateForm(timestamp, "-");
        return date;
      },
      userDelete(row){
        if(confirm("삭제하시겠습니까? 복구 할 수 없습니다.")){
          const data = {
              "USER_SEQ" : row.USER_SEQ,
              "USER_DEL_YN" : 'Y'
          };

          companyApi.modifyAuth(data)
          .then(res => {
            if(res){
              alert("삭제 완료");
              // location.reload();
              this.getDataLoad()
              }
            });
          }
      },
      setPage (val) {
        this.page = val
      },
      registUser(){
        this.$router.push({path:'/userRegist'});
      },
      viewDetail(item){
        this.$router.push({path:'/userDetail', query:{ userSeq: item.USER_SEQ }});
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

        companyApi.getUserList(data)
          .then(res => {
            console.log(res);
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
                console.log(element.POSITION_INFO);
                userData["POSITION"] = element.POSITION_INFO.CODE_NAME;
              }

              this.items.push(userData);

            })
          })
      },
      getDataLoad() {
        this.items = [];
        this.departments = [{ value: null, text: '전체' }]
        this.positions = [{ value: null, text: '전체' }]
        companyApi.getDepartList()
          .then(res => {
            console.log(res.data);
            res.data.forEach(element => {
              const departData = {
                value: element.DEPARTMENT_SEQ,
                text: element.DEPARTMENT,
              }
              this.departments.push(departData);
            });
          })
          .catch(error => {
            console.log(error);
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

        companyApi.getUserList(data)
          .then(res => {
            res.data.forEach(element => {
              const userData = {
                "USER_SEQ": element.USER_SEQ,
                "USER_ID": element.USER_ID,
                "USER_NAME": element.USER_NAME,
                "USER_PHONE": element.USER_PHONE,
                "USER_EMAIL": element.USER_EMAIL,
                "USER_COMPANY_ID": element.USER_COMPANY_ID,
                "USER_REG_DATE": element.USER_REG_DATE,
                "POSITION": element.CODE_NAME,
              }

              if(element.DEPART_INFO != null){
                userData["DEPARTMENT"] = element.DEPART_INFO.DEPARTMENT;
              }

              if(element.POSITION_INFO != null){
                console.log(element.POSITION_INFO);
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