<template>
<div class="contents">

    <div class="breadcrumb-container">
        <breadcrumb id="breadcrumb-container" />
    </div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">관심정책</h3>
        </div>

        <div class="block-content">
          <el-table :data="pagedTableData" style="width: 100%" @row-click="viewPage">
            <el-table-column label="#">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ polices.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
              </template>
            </el-table-column>
            <el-table-column label="제목">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.IP_CONTENT }}</span>
                </template>
            </el-table-column>
            <el-table-column label="장비">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.DEIVCE_ID }}</span>
                </template>
            </el-table-column>
            <el-table-column label="정책">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.POLICY_NAME }}</span>
                </template>
            </el-table-column>
            <el-table-column label="수집일">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ makeDateForm(scope.row.START_DATETIME) }} - {{ makeDateForm(scope.row.END_DATETIME) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="수신메일">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.ALERT_MAIL }}</span>
                </template>
            </el-table-column>
            <el-table-column label="상태">
                <template slot-scope="scope">
                  <el-tag effect="dark" type="success" size="mini" v-if="scope.row.IP_STATUS == 'Y'">수집중</el-tag>
                  <el-tag effect="dark" type="danger" size="mini"  v-if="scope.row.IP_STATUS == 'N'">정지</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="등록일자">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ makeDateForm(scope.row.CREATE_DATE) }}</span>
                </template>
            </el-table-column>
          </el-table>


          <!-- <div class="pd10" align="right">
            <el-button type="primary" size="small">갱신</el-button>
          </div> -->

          <el-pagination class="mt-4" layout="prev, pager, next" :total="this.polices.length" @current-change="setPage" align="center">
          </el-pagination>

        </div>
    </div>



</div>
</template>

<script>
  import Breadcrumb from '../../components/Breadcrumb/index'
  import * as collectApi from '@/api/collect';
  import { makeDateForm } from '@/lib/common';

  export default {
    data() {
      return {
        polices: [],
        /* paging start */
        pageSize: 10,
        page: 1,
      }
    },
    components: {
      Breadcrumb
    },
    computed: {
     pagedTableData() {
       return this.polices.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     }
   },
    methods: {
      makeDateForm(date){
        return makeDateForm(date);
      },
      setPage (val) {
        this.page = val
      },
      viewPage (item){
        this.$router.push({path:"/interestPolicyView", query:{ policySeq: item.IP_SEQ }})
      },
      getDataLoad() {
        this.polices = [];
        collectApi.getInterestPolicies()
          .then(res => {
            res.data.forEach(element => {
              console.log(element);
              this.polices.push(element);
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