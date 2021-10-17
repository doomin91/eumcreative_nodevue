<template>
  <div class="content">

    <div class="breadcrumb-container">
        <breadcrumb id="breadcrumb-container" />
    </div>

    <div class="blockbase block-rounded">
        <div class="block-content">
          <el-form ref="form" :model="searchForm" label-width="120px">
            <el-form-item label="신청일" size="small" class="pb5">
              <el-col :span="3">
                <el-date-picker type="date" placeholder="시작날짜" v-model="searchForm.startDate" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="1" align="center">-</el-col>
              <el-col :span="3">
                <el-date-picker type="date" placeholder="종료날짜" v-model="searchForm.endDate" style="width: 100%;"></el-date-picker>
              </el-col>
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
          <h3 class="block-title">이관신청 리스트</h3>
        </div>
        <div class="block-content">
          <el-table :data="pagedTableData" style="width: 100%; cursor:pointer;"
            @row-click="viewDetail">
            <el-table-column label="#">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
              </template>
            </el-table-column>
            <el-table-column label="신청자명">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.FROM.USER_NAME }}</span>
                </template>
            </el-table-column>
            <el-table-column label="인계자명">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.TO.USER_NAME }}</span>
                </template>
            </el-table-column>
            <el-table-column label="신청일">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.REG_DATE ? makeDateForm(scope.row.REG_DATE) : '' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="인수 신청서수">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ JSON.parse(scope.row.APPLY_SEQ).length }}</span>
                </template>
            </el-table-column>
            <el-table-column label="승인여부">
                <template slot-scope="scope">
                <span style="margin-left: 10px">
                  <el-tag effect="dark" type="success" size="mini" v-if="scope.row.APPROVAL_FLAG == 'Y'">승인</el-tag>
                  <el-tag effect="dark" type="info" size="mini" v-if="scope.row.APPROVAL_FLAG == 'N'">승인대기</el-tag>
                </span>
                </template>
            </el-table-column>
            <el-table-column label="승인일정">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.APPROVAL_DATE ? makeDateForm(scope.row.APPROVAL_DATE) : '' }}</span>
                </template>
            </el-table-column>
          </el-table>

          <el-pagination class="mt-4 mt20" layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
          </el-pagination>

        </div>
    </div>
  </div>
</template>

<script>
  import * as companyApi from '@/api/company';
  import * as settingApi from '@/api/setting';
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
            text: '신청자명'
          },
          {
            value: "name",
            text: '인계자명'
          }
        ],
      }
    },
    components: {
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
      viewDetail(item){
        this.$router.push({path:'/takeOverView', query:{ seq: item.SEQ }});
      },
      setPage (val) {
        this.page = val
      },
      search() {
        this.items = [];
        const data = {
          startDate: this.searchForm.startDate,
          endDate: this.searchForm.endDate,
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
                "POSITION": element.CODE_NAME,
              }

              if(element.DEPART_INFO != null){
                userData["DEPARTMENT"] = element.DEPART_INFO.DEPARTMENT;
              }

              this.items.push(userData);

            })
          })
      },
      getDataLoad() {
        this.items = [];

        settingApi.getTakeOver()
          .then(res => {
            console.log(res);
            res.data.forEach(element => {
              this.items.push(element);
            })
          })
            
      }
    },
    created() {
      this.getDataLoad();
    }

  }
</script>