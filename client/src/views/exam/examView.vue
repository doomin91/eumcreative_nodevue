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
          class="mg10">
          <el-table-column
            prop="No"
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
        </el-table>

          <el-button type="info" size="mini" @click="goBack()">목록</el-button>
          <el-button type="success" size="mini">+ 문항추가</el-button>
          <el-button type="warning" size="mini">등록완료 ></el-button>

          <el-table
          :data="tableData2"
          :row-click="viewDetail"
          class="mg10">
          <el-table-column
            prop="No"
            label="No"
            width="180">
          </el-table-column>
          <el-table-column
            prop="order"
            label="문항"
            width="180">
          </el-table-column>
          <el-table-column
            prop="order"
            label="문항이름"
            width="180">
          </el-table-column>
          <el-table-column
            prop="examName"
            label="종류">
          </el-table-column>
          <el-table-column
            prop="examDate"
            label="배점">
          </el-table-column>
          <el-table-column
            label="서브문항추가/삭제/문항수정">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="viewDetail(scope.row)">추가</el-button>
              <el-button type="primary" size="mini" @click="viewDetail(scope.row)">삭제</el-button>
              <el-button type="primary" size="mini" @click="viewDetail(scope.row)">수정</el-button>
            </template>
          </el-table-column>
        </el-table>

          </div>
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
  import * as collectApi from '@/api/collect';
  import * as settingApi from '@/api/setting';

  export default {
    data() {
      return {
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
      ],
      tableData2:[
        { 
          seq:1,
          no:5,
          order:2,
          grade:1, /* 1: 초급 2: 중급 3: 고급 */
          examName:'초급 세종 한국어평가 모의시험 답안지',
          examDate:'2020-10-28',
          status:1
        },
      ],
        page: 1,
        pageSize: 10,
      }
    },
   components: {
      Breadcrumb
   },
    methods: {
      goBack(){
        this.$router.push({path:"/ExamList"})
      },
      viewDetail(item){
        console.log(item);
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
      getDeviceLoad() {
          settingApi.getDeviceList()
          .then(res =>{
            // console.log(res);
            if(res.status == 200){
              const devices = res.data;
              devices.forEach(element => {
                let data = {
                  label: element.DEVICE_NAME,
                  value: element.DEVICE_SEQ
                }
                this.devices.push(data);
              })
            }else{
              this.$message({ 
                type:"error",
                message:"방화벽 정보를 불러오는데 실패했습니다."
              })
            }
          })
      },
      getDataLoad() {
        this.polices = [];
        collectApi.getAllPolicy(this.searchForm)
          .then(res => {
            if(res.data.data.policy){
              const polices = res.data.data.policy;
              polices.forEach(element => {
                let device_label;
                this.devices.forEach(item => {
                  if(item.value == element.device_id){
                    device_label = item.label;
                  }
                });
                console.log(element);
                let data = {
                  device_id: element.device_id,
                  device_label: device_label,
                  policy_number: element.policy_number,
                  from: element.from,
                  to: element.to,
                  source: element.source,
                  service: element.service,
                  destination: element.destination,
                }
                this.polices.push(data);
              })
            }else{
              this.$message({
                type:"error",
                message:"데이터를 불러 올 수 없습니다."
              })
            }
          })
      }
    },
    created() {
      this.getDeviceLoad();
      this.getDataLoad();
    }

  }
</script>