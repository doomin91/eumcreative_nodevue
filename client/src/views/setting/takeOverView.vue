
<template>
  <div class="content">

        <div class="breadcrumb-container">
            <breadcrumb id="breadcrumb-container" />
        </div>

        <div class="blockbase block-rounded">
            <div class="block-header">
              <h3 class="block-title">이관신청 관리</h3>
            </div>
            <div class="block-content">


              <el-row class="mb20 pw20">
                <el-col class="pd10" :span="3" align="left">
                  <div class="TableLeftName ft13">인수자</div>
                </el-col>
                <el-col class="pd10 pl40" :span="21">
                  {{ applyInfo.supplier }}
                </el-col>
              </el-row>

              <el-row class="mb20 pw20">
                <el-col class="pd10" :span="3" align="left">
                  <div class="TableLeftName ft13">인계자</div>
                </el-col>
                <el-col class="pd10 pl40" :span="21">
                  {{ applyInfo.receiver }}
                </el-col>
              </el-row>

              <el-row class="mb20 pw20">
                <el-col class="pd10" :span="3" align="left">
                  <div class="TableLeftName ft13">신청리스트</div>
                </el-col>
                <el-col class="pd10 pl40" :span="21">
                  <el-table :data="pagedTableData" ref="applyTable" style="cursor:pointer;">
                    <el-table-column label="신청번호">
                      <template slot-scope="scope">
                        <span>{{ scope.row.APPLY_NUMBER }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="사유">
                        <template slot-scope="scope">
                        <span>{{ getWordCount(scope.row.APPLY_TITLE, 20, "...") }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="신청일">
                        <template slot-scope="scope">
                        <span>{{ getWordCount(scope.row.APPLY_REG_DATE, 10, "") }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="상태">
                        <template slot-scope="scope">
                          <el-tag size="mini">{{  getApplyStatus(scope.row.APPLY_STATUS) }}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
                </el-col>
              </el-row>

              <el-row class="mb20 pw20">
                <el-col class="pd10" :span="3" align="left">
                  <div class="TableLeftName ft13">신청일</div>
                </el-col>
                <el-col class="pd10 pl40" :span="21">
                  {{ applyInfo.regDate }}
                </el-col>
              </el-row>

              <el-row class="mb20 pw20">
                <el-col class="pd10" :span="3" align="left">
                  <div class="TableLeftName ft13">승인여부</div>
                </el-col>
                <el-col class="pd10 pl40" :span="21">
                  <el-tag effect="dark" type="success" v-if="applyInfo.approvalStatus == 'Y'">승인</el-tag>
                  <el-tag effect="info" type="info" v-if="applyInfo.approvalStatus == 'N'">승인대기</el-tag>
                </el-col>
              </el-row>


              <el-row class="mb20 pw20">
                <el-col align="right" class="pd10 pr30">
                  <el-button variant="" size="small" v-if="applyInfo.approvalStatus == 'N'" type="primary" @click="approvalTakeOver">승인하기</el-button>
                  <el-button variant="" size="small" @click="back">목록보기</el-button>
                </el-col>
              </el-row>

            </div>
          </div>


  </div>
</template>

<script>
  import * as settingApi from '@/api/setting';
  import {getApplyStatus, getWordCount, getApplyWorkType} from "@/lib/apply";
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        seq: this.$route.query.seq,
        applyInfo : {
          supplier: "",
          receiver: "",
          regDate: "",
          approvalStatus: "",
          applyList: []
        },
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
      }
    },
    components: {
      Breadcrumb
    },
    computed: {
      pagedTableData() {
        return this.applyInfo.applyList.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
      }
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
      setPage (val) {
          this.page = val
      },
      approvalTakeOver(){
          this.$confirm("승인하시겠습니까?", "이관신청 승인", {
          confirmButtonText: "승인",
          cancelButtonText: '취소',
          type: 'warning',
          callback: action =>{
            if(action == "confirm"){
              let data = {
                seq: this.$route.query.seq
              }
              settingApi.approvalTakeOver(data)
                .then(res => {
                  console.log(res);
                  this.$message({
                    type: 'warning',
                    message: `이관 완료되었습니다.`
                  })
                  this.applyInfo.approvalStatus = 'Y';
                })
                .catch(err => {
                  console.log(err);
                })

              } else {
              this.$message({
                type: 'info',
                message: `취소되었습니다.`
              })
            }
          }   
        })





      },
      back() {
        this.$router.push({path:'/takeOverList'});
      },
      getDataLoad() {
        let data = {
          seq : this.seq
        }
        settingApi.getTakeOverOne(data)
        .then(res => {
          console.log(res);
          this.applyInfo = {
            supplier: res.data.FROM.USER_NAME,
            receiver: res.data.TO.USER_NAME,
            regDate: res.data.REG_DATE,
            approvalStatus: res.data.APPROVAL_FLAG,
            applyList: res.data.APPLY
          }

          if(res.data.APPROVAL_FLAG == 'Y'){
            this.approvalStatus = false;
          } else {
            this.approvalStatus = true;
          }

        })
        .catch(error => {
          console.log(error);
        })
      }
    },
    created() {
      this.getDataLoad();
    }
  }
</script>