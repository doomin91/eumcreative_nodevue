<template>
  <div class="content">


      <div class="breadcrumb-container">
          <breadcrumb id="breadcrumb-container" />
      </div>

      <div class="blockbase block-rounded">
          <div class="block-content">
          <el-table
          :data="tableData"
          :row-click="viewDetail"
          style="width: 100%">
          <el-table-column
            prop="No"
            label="No"
            width="180">
          </el-table-column>
          <el-table-column
            prop="order"
            label="회차"
            width="180">
          </el-table-column>
          <el-table-column
            prop="grade"
            label="등급">
            <template slot-scope="scope">
              <el-tag type="info" v-if="scope.row.grade == 1">초급</el-tag>
              <el-tag type="warning" v-if="scope.row.grade == 2">중급</el-tag>
              <el-tag type="error" v-if="scope.row.grade == 3">고급</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="examName"
            label="시험명">
          </el-table-column>
          <el-table-column
            prop="examDate"
            label="시험일">
          </el-table-column>
          <el-table-column
            label="상태">
            <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1">문항등록 필요</el-tag>
            <el-tag v-if="scope.row.status == 2">등록완료</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="상세보기">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="goViewPage(scope.row)">보기</el-button>
            </template>
          </el-table-column>
        </el-table>
            
            <el-pagination class="mt-4" layout="prev, pager, next" :total="this.tableData.length" @current-change="setPage" align="center">
            </el-pagination>

          <el-button type="primary" size="mini" @click="examCreateModal=true">시험 등록</el-button>
          </div>


        <el-dialog
            title="시험 등록"
            :visible.sync="examCreateModal"
            width="50%">
            
            <el-form>
            <el-row>
                <el-col :span="24">
                  <el-row class="mg10">
                    <el-col :span="8">회차</el-col>
                    <el-col :span="16"><el-input type="text"></el-input></el-col>
                  </el-row>
                  <el-row class="mg10">
                    <el-col :span="8">시험명</el-col>
                    <el-col :span="16"><el-input type="text"></el-input></el-col>
                  </el-row>
                  <el-row class="mg10">
                    <el-col :span="8">답안지 이미지 장수</el-col>
                    <el-col :span="16"><el-input type="text"></el-input></el-col>
                  </el-row>
                  <el-row class="mg10">
                    <el-col :span="8">시험 레벨</el-col>
                    <el-col :span="16"><el-input type="text"></el-input></el-col>
                  </el-row>
                  <el-row class="mg10">
                    <el-col :span="8">시험일</el-col>
                    <el-col :span="16"><el-input type="date"></el-input></el-col>
                  </el-row>
                  <el-row class="mg10">
                    <el-col :span="8">시험상세</el-col>
                    <el-col :span="16"><el-input type="textarea" :row="3"></el-input></el-col>
                  </el-row>
                </el-col>
            </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="examCreateModal = false">닫기</el-button>
                <el-button @click="examCreateModal = false" type="primary">저장하기</el-button>
            </span>
        </el-dialog>
      </div>

  </div>
</template>

<style>
  .UserListForm .el-input {
    width:220px !important;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-table th>.cell {
    text-align:center;
  }
.el-table__row .cell {
  text-align:center;
}
</style>



<script>

  import Breadcrumb from '../../components/Breadcrumb/index';

  export default {
    data() {
      return {
        examCreateModal: false,
        tableData:[
        { 
          seq:1,
          no:5,
          order:2,
          grade:1, /* 1: 초급 2: 중급 3: 고급 */
          examName:'초급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          status:1
        },
        { 
          seq:2,
          no:4,
          order:2,
          grade:2, /* 1: 초급 2: 중급 3: 고급 */
          examName:'중급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          status:2
        },
        { 
          seq:3,
          no:3,
          order:2,
          grade:3, /* 1: 초급 2: 중급 3: 고급 */
          examName:'고급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          status:3
        },
      ],
        page: 1,
        pageSize: 10,
      }
    },
    computed: {
     pagedTableData() {
       return this.tableData.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
     },
   },
   components: {
      Breadcrumb
   },
    methods: {
      goViewPage(item){
        console.log(item);
        this.$router.push({path:"/ExamView"});
      },
      setPage (val) {
        this.page = val
      },
      viewRelativePolicy(item){
        console.log(item.source);
        // this.viewPolicyModal = true;
      },
      search(){
        this.getDataLoad();
      },
    },
    created() {
      this.getDataLoad();
    }

  }
</script>