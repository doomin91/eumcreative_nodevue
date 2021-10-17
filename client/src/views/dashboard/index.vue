<template>
    <div class="content">
      <div>
        <div class="breadcrumb-container">
            <breadcrumb id="breadcrumb-container" />
        </div>
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
            label="진행상태">
            <template slot-scope="scope">
            <el-progress :percentage="scope.row.percent" v-if="scope.row.percent == 100" status="success"></el-progress>
            <el-progress :percentage="scope.row.percent" v-if="scope.row.percent < 100 && scope.row.percent > 20" status="warning"></el-progress>
            <el-progress :percentage="scope.row.percent" v-if="scope.row.percent < 20 && scope.row.percent >= 0" status="exception"></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            label="상세보기">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="viewDetail(scope.row)">보기</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>

            <el-dialog
            title="결재승인"
            :visible.sync="viewDialogFlag"
            width="20%"
            custom-class="ConfirmDialog">
            <el-row>
            </el-dialog>
        <!-- content end -->
    </div>

</template>


<script>

export default {
    components: {

    },
    data() {
    return {
      viewDialogFlag: false,
      tableData:[
        { 
          seq:1,
          no:5,
          order:2,
          grade:1, /* 1: 초급 2: 중급 3: 고급 */
          examName:'초급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          percent:60
        },
        { 
          seq:2,
          no:4,
          order:2,
          grade:2, /* 1: 초급 2: 중급 3: 고급 */
          examName:'중급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          percent:100
        },
        { 
          seq:3,
          no:3,
          order:2,
          grade:3, /* 1: 초급 2: 중급 3: 고급 */
          examName:'고급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          percent:10
        },
      ]
    }
  },
  methods: {
      viewDetail(item){
        console.log(item);
        this.viewDialogFlag=true
      }
  },
  created() {
  },
}

</script>
;