<template>
    <div class="content">

        <div class="breadcrumb-container">
            <breadcrumb id="breadcrumb-container" />
        </div>

        <el-form ref="form" :model="searchForm" label-width="120px" label-padding-right="20px">
        <div class="blockbase block-rounded">
            <div class="block-header">
                <h2 class="block-title">정책신청관리</h2>
            </div>
            <div class="block-content">
                <el-form-item label="등록일" size="small">
                  <el-col :span="3">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="시작날짜" v-model="searchForm.startDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="1" align="center">-</el-col>
                  <el-col :span="3">
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="종료날짜" v-model="searchForm.endDate" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
              
                <el-form-item label="단어검색" size="small">
                  <el-input @keyup.enter.native="search" placeholder="검색" v-model="searchForm.searchString" class="input-with-select" style="width:80%;">
                    <el-select v-model="searchForm.searchField" slot="prepend" placeholder="Select">
                      <el-option v-for="item in searchFields" :key="item.value" :label="item.text" :value="item.value" :disabled="item.disabled"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search" size="small"></el-button>
                  </el-input>
                </el-form-item>

            </div>
        </div>
      </el-form>

      <div class="blockbase block-rounded">
          <div class="block-content">

            <el-table :data="pagedTableData" width="100%">
              <el-table-column label="신청번호" width="200" >
                <template slot-scope="scope">
                  <span>{{ scope.row.APPLY_NUMBER }}</span>
                </template>
              </el-table-column>
              <el-table-column label="사유">
                  <template slot-scope="scope">
                    <span>{{ getWordCount(scope.row.APPLY_TITLE, 30, "...") }}</span>
                  </template>
              </el-table-column>
              <el-table-column
               label="상태"
                width="150"
                :filters="applyStatusFilters"
                :filter-method="filterApplyStatus">
                  <template slot-scope="scope">
                    <el-tag size="mini" effect="dark" :type="getApplyStatusType(scope.row.APPLY_STATUS)">{{  getApplyStatus(scope.row.APPLY_STATUS) }}</el-tag>
                  </template>
              </el-table-column>
              <el-table-column 
                label="작업구분" 
                width="150"
                :filters="workTypeFilters"
                :filter-method="filterWorkTypes">
                  <template slot-scope="scope">
                  <span>{{ getApplyWorkType(scope.row.APPLY_WORK_TYPE) }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="신청자" width="150">
                  <template slot-scope="scope">
                  <span>{{ scope.row.APPLY_USER_NAME }} {{ scope.row.APPLY_USER_POSITION }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="신청부서" width="250">
                  <template slot-scope="scope">
                  <span>{{ scope.row.APPLY_USER_DEPARTMENT }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="신청일" width="150">
                  <template slot-scope="scope">
                  <span>{{ getWordCount(scope.row.APPLY_REG_DATE, 10, "") }}</span>
                  </template>
              </el-table-column>
              <el-table-column label="상세보기" width="150">
                  <template slot-scope="scope">
                    <span>
                        <el-button type="primary" size="mini"  @click="goViewPage(scope.row.APPLY_SEQ)">상세보기</el-button>
                    </span>
                  </template>
              </el-table-column>
            </el-table>

            <el-pagination class="mt20" layout="prev, pager, next" :total="this.applies.length" @current-change="setPage" align="center">
            </el-pagination>

          </div>
      </div>

    </div>

</template>


<script>
    // import AppHeader from '/src/views/apply/components/ApplyHedaer.vue'

    import Breadcrumb from '../../components/Breadcrumb/index'
    import * as applyApi from '@/api/apply'; // eslint-disable-line no-unused-vars
    import {getApplyStatus, getApplyStatusType, getWordCount, getApplyWorkType} from "@/lib/apply";
    
    export default {
        data(){
            return {
                applies: [],

                searchForm: {
                    startDate: "",
                    endDate: "",
                    searchField: "all",
                    searchString: ""
                },

                /* paging start */
                pageSize: 10,
                page: 1,
                /* paging end */

                searchFields: [{
                        value: "all",
                        text: '전체'
                    },
                    {
                        value: "APPLY_NUMBER",
                        text: '신청번호'
                    },
                    {
                        value: "APPLY_USER_NAME",
                        text: '신청자명'
                    },
                    {
                        value: "APPLY_TITLE",
                        text: '사유'
                    },
                    {
                        value: "tag",
                        text: '태그'
                    },
                    {
                        value: "SOURCE",
                        text: '출발지'
                    },
                    {
                        value: "DESTINATION",
                        text: '도착지'
                    },
                    {
                        value: "SERVICE",
                        text: '서비스'
                    },
                ],
                
                workTypeFilters: [
                    { text: '사용자 서버간 통신', value: 1 }, 
                    { text: '서버간 통신', value: 2 },
                    { text: '대외계', value: 3 },
                    { text: '대고객', value: 4 },
                ],
                applyStatusFilters: [
                    { text: '작성중', value: '0,1'}, 
                    { text: '작성전', value: '2'}, 
                    { text: '결재중', value: '3' },
                    { text: '결재완료', value: '4' },
                    { text: '작업결재전', value: '5' },
                    { text: '작업결재중', value: '6' },
                    { text: '작업중', value: '7' },
                    { text: '작업완료', value: '8' },
                ]
            }
        },
        methods:{
            filterApplyStatus(value, row){
                // console.log(value.split(',').includes(String(row.APPLY_STATUS)));
                return value.split(',').includes(String(row.APPLY_STATUS));
            },
            filterWorkTypes(value, row){
                return row.APPLY_WORK_TYPE === value;
            },
            getApplyStatus(flag){
                return getApplyStatus(flag);
            },
            getApplyStatusType(flag){
                return getApplyStatusType(flag);
            },
            getWordCount(str, wordCout, dot){
                return getWordCount(str,wordCout, dot);
            },
            getApplyWorkType(flag){
                return getApplyWorkType(flag);
            },
            search() {
                this.applies = [];
                console.log(this.$route.name);
                const SearchOptions = {
                    flag: this.$route.name,
                    startDate: this.searchForm.startDate,
                    endDate: this.searchForm.endDate,
                    searchField: this.searchForm.searchField,
                    searchString: this.searchForm.searchString
                }
                applyApi.getApplies(SearchOptions)
                    .then((res) => {
                        console.log(res);
                        this.applies = res.data;
                    })
            },
            setPage (val) {
                this.page = val
            },
            viewDetail(item){
                this.$router.push({path:'/userDetail', query:{ userSeq: item.USER_SEQ }});
            },
            loadData() {
                this.applies = [];
                
                const SearchOptions = {
                    flag: this.$route.name
                }

                applyApi.getApplies(SearchOptions)
                    .then((res) => {
                        console.log(res);
                        this.applies = res.data;
                    })
                    
            },
            goViewPage(seq){
                this.$route.meta.isOwned = "private";
                this.$router.push({path: "/appView/"+seq })
            }
        },
        components: {
            Breadcrumb
        },
        computed: {
            pagedTableData() {
                return this.applies.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
            }
        },
        created(){
            console.log(this.$route.name);
            this.loadData();
            
        }
    }
</script>
