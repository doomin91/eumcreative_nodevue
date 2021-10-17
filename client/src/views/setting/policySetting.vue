<template>
<div class="contents">

<div class="breadcrumb-container">
    <breadcrumb id="breadcrumb-container" />
</div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">정책제한 설정</h3>
        </div>

        <div class="block-content">
          <el-table :data="pagedTableData" style="width: 100%">
            <el-table-column label="#" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ items.length - scope.$index - ( page * pageSize ) + pageSize }}</span>
              </template>
            </el-table-column>
            <el-table-column label="제한명칭">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.LIMIT_TITLE }}</span>
                </template>
            </el-table-column>
            <el-table-column label="기본설정">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.LIMIT_DEFAULT_FLAG }}</span>
                </template>
            </el-table-column>
            <el-table-column label="신청수제한">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.LIMIT_APPLY }}</span>
                </template>
            </el-table-column>
            <el-table-column label="정책제한">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.LIMIT_APPLY_RULE }}</span>
                </template>
            </el-table-column>
            <el-table-column label="총 정책제한">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.LIMIT_RULE }}</span>
                </template>
            </el-table-column>
            <el-table-column label="제한기간">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.LIMIT_PERIOD_FLAG }}</span>
                </template>
            </el-table-column>
            <el-table-column label="등록일">
                <template slot-scope="scope">
                <span style="margin-left: 10px">{{ makeDateForm(scope.row.LIMIT_REG_DATE) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="수정/삭제">
              <template slot-scope="scope">
                <el-button size="mini" type="success" icon="el-icon-edit" @click="limitPolicyModifyView(scope.$index, scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="limitPolicyDelete(scope.$index, scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>


          <div class="pd10" align="left">
            <el-button type="primary" size="mini" @click="limitPolicyRegistView">정책등록하기</el-button>
          </div>

          <el-pagination class="mt-4" layout="prev, pager, next" :total="this.items.length" @current-change="setPage" align="center">
          </el-pagination>


          <el-dialog
            title="정책제한 추가"
            :visible.sync="limitDialogVisible"
            width="600px">
          <el-form name="limitPolicyForm">

            <table class="customTable01">
              <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
              </colgroup>
              <tbody>
                <tr>
                  <th>기본정책제한</th>
                  <td colspan="3" class="f_left"><el-checkbox v-model="limitPolicyForm.defaultLimit" label="기본 정책제한 설정" class="ts-font02"></el-checkbox></td>
                </tr>
                <tr>
                  <th>제한명칭</th>
                  <td colspan="3"><el-input v-model="limitPolicyForm.limitTitle" size="small"></el-input></td>
                </tr>
                <tr>
                  <th>기본정책제한</th>
                  <td class="tac"><el-input-number v-model="limitPolicyForm.defultNum" :min="1" :max="100" size="mini"></el-input-number></td>
                  <th>기본정책제한</th>
                  <td class="tac"><el-input-number v-model="limitPolicyForm.applyNum" :min="1" :max="100" size="mini"></el-input-number></td>                  
                </tr>
                <tr>
                  <th>총 정책제한</th>
                  <td class="tac"><el-input-number v-model="limitPolicyForm.accountNum" :min="1" :max="100" size="mini"></el-input-number></td>
                  <th>제한기간</th>
                  <td class="tac">
                    <el-select v-model="limitPolicyForm.limitPeriod" size="small">
                      <el-option label="일별" value="D"></el-option>
                      <el-option label="월별" value="M"></el-option>
                    </el-select>
                  </td>                  
                </tr>                
              </tbody>
            </table>

          </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="limitDialogVisible = false">취소</el-button>
              <el-button v-if="toggleRegistModify" type="primary" size="small" @click="limitPolicyAdd">제한정책 등록</el-button>
              <el-button v-if="!toggleRegistModify" type="success" size="small" @click="limitPolicyModify">제한정책 수정</el-button>
            </span>
          </el-dialog>


        </div>
    </div>
</div>
</template>

<script>
  import * as settingApi from '@/api/setting';
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        limitDialogVisible: false,
        items: [],
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */
        /* true : 등록, false : 수정 */
        toggleRegistModify: true,
        limitPolicyForm:{
          limitSeq : "",
          defaultLimit : true,
          limitTitle : "",
          defultNum : 1,
          applyNum : 1,
          accountNum : 1,
          limitPeriod : "D",
        }
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
        makeDateForm(date){
            return makeDateForm(date);
        },
        limitPolicyAdd(){
          if(this.limitPolicyForm.limitTitle == ""){
            alert("제한명칭을 입력해주세요.")
            return false;
          }

          settingApi.insertPolicyLimit(this.limitPolicyForm)
            .then(res => {
              if(res.data.generatedMaps){
                console.log(res);
                this.getDataLoad();
              }

            })
            .catch(err => {
              console.log(err);
            }
            )
      },
      limitPolicyModify(){
        settingApi.updatePolicyLimit(this.limitPolicyForm)
        .then(res => {
          console.log(res);
          this.getDataLoad();
        })
        .catch(err => {
          console.log(err);
        })
      },
      limitPolicyDelete(index, row){
        this.$confirm("해당 정책제한을 삭제하시겠습니까", "Warning", {
          confirmButtonText: "삭제",
          cancelButtonText: '취소',
          confirmButtonClass:'el-button--danger',
          type: 'warning',
          callback: action =>{
            if(action == "confirm"){
              let data = {
                LIMIT_SEQ : row.LIMIT_SEQ
              }
              settingApi.deletePolicyLimit(data)
              .then(res => {
                console.log(res);
                this.getDataLoad();
                this.$message({
                type: 'success',
                message: `정책제안이 삭제되었습니다.`
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
      limitPolicyRegistView(){
        this.limitPolicyForm = {
          limitSeq : "",
          defaultLimit : false,
          limitTitle : "",
          defultNum : 1,
          applyNum : 1,
          accountNum : 1,
          limitPeriod : "D"
        }
        this.limitDialogVisible = true;
        this.toggleRegistModify = true;
      },
      limitPolicyModifyView(index, row){
        this.toggleRegistModify = false;
        this.limitDialogVisible = true;
        this.limitPolicyForm = {
          limitSeq : row.LIMIT_SEQ,
          defaultLimit : row.LIMIT_DEFAULT_FLAG,
          limitTitle : row.LIMIT_TITLE,
          defultNum : row.LIMIT_APPLY,
          applyNum : row.LIMIT_APPLY_RULE,
          accountNum : row.LIMIT_RULE,
          limitPeriod : row.LIMIT_PERIOD_FLAG
        }
      },
      setPage (val) {
        this.page = val
      },
      getDataLoad() {
        this.limitDialogVisible = false;
        this.items = [];
        settingApi.getPolicyLimits()
          .then(res => {
            // this.items.push(res.data);
            console.log(res.data);
            res.data.forEach(element => {
              this.items.push(element);
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