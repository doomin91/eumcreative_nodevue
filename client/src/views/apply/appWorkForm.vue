<template>

  <div class="content">

    <div class="blockbase block-rounded">
      <div class="block-content">

        <!-- 상단 스텝바 -->
        <AppHeader :active="1" />
      </div>
    </div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">신청서 작성</h3>
        </div>
        <div class="block-content">

            <table class="confirmTable">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <tbody>
                    <tr>
                    <th>결재자</th>
                    <td colspan="3">
                        <div class="pt20 pl10"><el-button type="primary" @click="organisationDialogVisible(1)" size="small">결재자 등록</el-button></div>
                        <div class="pt20 pb20"><app-confirm-line ref="appConfirm" :title="confirmTitle" :line="confirmLine"></app-confirm-line></div>
                    </td>
                    </tr>
                    <tr>
                        <th>참조자</th>
                        <td colspan="3">
                            <div class="pt20 pl10"><el-button type="primary" @click="organisationDialogVisible(2)" size="small">참조자 등록</el-button></div>
                            <div class="pt20 pb20"><app-confirm-line ref="appCc" :title="ccTitle" :line="ccLine"></app-confirm-line></div>
                        </td>
                    </tr>
                    <tr>
                        <th>작업구분</th>
                        <td colspan="3">
                            <el-select v-model="workType" slot="prepend" placeholder="작업구분" size="small">
                                <el-option v-for="item in workTypes" :key="item.value" :label="item.text" :value="item.value" :disabled="item.disabled"></el-option>
                            </el-select>
                        </td>
                    </tr>

                    <tr>
                        <th>태그</th>
                        <td colspan="2">
                            <el-input type="text" v-model="tags" placeholder="스페이스바 기준으로 나뉩니다." size="small" @input="handleTagList"></el-input>
                            <div>
                                <el-tag v-for="(tag, index) in tagList" :key="index" size="small" style="margin: 5px">{{tag}}</el-tag>
                            </div>
                        </td>
                    </tr>

                    <tr>
                    <th>결재자 의견</th>
                    <td colspan="3">
                        <div class="apply_textarea pl10">
                        <el-input type="textarea" ref="applyWorkTitle" v-model="workTitle" size="small"></el-input>
                        </div>
                    </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>

    <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30">
            <el-button type="primary" size="small" @click="applyWork">결재신청</el-button>
            <el-button v-if="!isModify" type="default" size="small"><router-link :to="{ name: 'appWorkEdit', params: { id: this.apply.APPLY_SEQ }}" tag="div">수정하기</router-link></el-button>
            <el-button v-if="isModify" type="success" size="small" @click="editApplyAtWorkCancel">수정 취소하기</el-button>
            <el-button type="danger" size="small"><router-link :to="{ name: 'inboxView', params: { type: 'unChked', id: this.apply.APPLY_SEQ }}" tag="div">취소</router-link></el-button>
        </el-col>
    </el-row>
    
    <div class="blockbase block-rounded">
        <div class="block-header">
            <h3 class="block-title">신청서 상세내용</h3>
        </div>
        <div class="block-content">

            <el-row class="mb20 pw20" ref="ruleForm">
                <el-col :span="24">
                    <table class="ApplyTable02">
                        <colgroup>
                            <col width="15%">
                            <col width="35%">
                            <col width="15%">
                            <col width="35%">
                        </colgroup>
                        <tbody>
                            <tr >
                                <th>신청번호</th>
                                <td>{{this.apply.APPLY_NUMBER}}</td>
                                <th>신청일</th>
                                <td>{{getWordCount(this.apply.APPLY_REG_DATE, 10, "")}}</td>
                            </tr>

                            <tr >
                                <th>신청부서</th>
                                <td>{{this.apply.APPLY_USER_DEPARTMENT}}</td>
                                <th>신청자</th>
                                <td>{{this.apply.APPLY_USER_NAME}}</td>
                            </tr>

                            <tr >
                                <th>사유</th>
                                <td colspan="3" class="tal">{{this.apply.APPLY_TITLE}}</td>
                            </tr>

                            <tr >
                                <th>결재자</th>
                                <td colspan="3" class="tal" >
                                    <div class="add_confirm_line ml20 mr20" v-for="(confirm) in confirms" :key="confirm.CONFIRM_SEQ">
                                        <div class="confirm_position">{{confirm.CONFIRM_USER_NAME}}</div>
                                        <div class="confirm_name">{{confirm.CONFIRM_USER_POSITION}}</div>
                                    </div>
                                </td>
                            </tr>

                            <tr >
                                <th>참조자</th>
                                <td colspan="3">
                                    <div class="add_confirm_line ml20 mr20" v-for="(cC) in cCs" :key="cC.CONFIRM_SEQ">
                                        <div class="confirm_position">{{cC.CONFIRM_USER_NAME}}</div>
                                        <div class="confirm_name">{{cC.CONFIRM_USER_POSITION}}</div>
                                    </div>                                        
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-row>

            <el-row v-if="rules.length > 0">

                <el-row>
                    <el-col>
                        <h4>정책 리스트</h4>
                    </el-col>
                </el-row>

                <el-row> 
                    <el-col ref="ruleForm">
                        <table class="ApplyTable01">
                            <colgroup>
                                <col width="10%">
                                <col width="17%">
                                <col width="17%">
                                <col width="17%">
                                <col width="17%">
                                <col width="22%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>양방향</th>
                                    <th>출발지</th>
                                    <th>도착지</th>
                                    <th>서비스(Port)</th>
                                    <th>정책종료일</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ref="ruleForm" v-for="(rule) in rules" :key="rule.RULE_SEQ">
                                    <td><el-checkbox :true-label=1 :false-label=0 v-model="rule.REVERSE_FLAG" disabled></el-checkbox></td>
                                    <td><div v-html="replaceStr(rule.SOURCE, ',', '<br>')"> </div></td>
                                    <td><div v-html="replaceStr(rule.DESTINATION, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(rule.SERVICE, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(rule.EXPIRATION_DATE, null, '영구')"></div></td>
                                    <td><div v-html="replaceStr(rule.DESCRIPTION, '\n', '<br>')"></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-row>

            <el-row v-if="natRules.length > 0">

                <el-row>
                    <el-col>
                        <h4>NAT 정책 리스트</h4>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col ref="natRuleForm">
                        <table class="ApplyTable01">
                            <colgroup>
                                <col width="12.5%">
                                <col width="12.5%">
                                <col width="12.5%">
                                <col width="12.5%">
                                <col width="12.5%">
                                <col width="12.5%">
                                <col width="12.5%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th colspan="3">변경전</th>
                                    <th colspan="4">변경후</th>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th>양방향</th>
                                    <th>출발지</th>
                                    <th>도착지</th>
                                    <th>서비스(Port)</th>
                                    <th>출발지</th>
                                    <th>도착지</th>
                                    <th>정책종료일</th>
                                    <th>설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ref="natRuleForm" v-for="(natRule) in natRules" :key="natRule.RULE_SEQ">
                                    <td><el-checkbox :true-label=1 :false-label=0 v-model="natRule.REVERSE_FLAG" disabled></el-checkbox></td>
                                    <td><div v-html="replaceStr(natRule.SOURCE, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(natRule.DESTINATION, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(natRule.SERVICE, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(natRule.T_SOURCE, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(natRule.T_DESTINATION, ',', '<br>')"></div></td>
                                    <td><div v-html="replaceStr(natRule.EXPIRATION_DATE, null, '영구')"></div></td>
                                    <td><div v-html="replaceStr(natRule.SOURCE, '\n', '<br>')"></div></td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-row>

        </div>
    </div>


    <el-dialog
      title="결재라인 추가"
      :visible.sync="organisationDialogVisibleFlag"
      width="50%" class="apply_dialogwrap">
    
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
              <el-input placeholder="Please input" @keyup.enter.native="dialogUserSearch" v-model="dialogUserSearchString" size="small" class="input-with-select">
                <el-button slot="append" @click="dialogUserSearch">검색</el-button>
              </el-input>
            </div>
            
              <el-table 
                :data="dialogUserData"
                ref="dialogUserData"
                size="small"
                style="width: 100%"
                height="470"
                v-on:cell-click="userSelect($event)"
                >
                  <el-table-column width="5" align="center" prop="USER_SEQ"></el-table-column>
                  <el-table-column label="사번" align="center" prop="USER_COMPANY_ID"></el-table-column>
                  <el-table-column label="이름" align="center" prop="USER_NAME"></el-table-column>
                  <el-table-column label="부서" align="center" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
                  <el-table-column label="직책" align="center" prop="POSITION_INFO.CODE_NAME"></el-table-column>
              </el-table>
            
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
            <div class="mb40 mt20">
              <h4>결재자 라인</h4>
              <div class="confirmLine_cont">
                <ul ref="confirmLine">
                    <li v-for="user in confirmAndCcLineInModal" :key="user.CONFIRM_USER_SEQ">
                      <div class="confirmLine_box">
                        <div>{{user.CONFIRM_USER_NAME}}</div>
                        <div>{{user.CONFIRM_USER_DEPARTMENT}}</div>
                        <div>{{user.CONFIRM_USER_POSITION}}</div>
                        <el-button type="danger" icon="el-icon-close" circle @click="userDelete(user.CONFIRM_USER_SEQ)" class="pd0"></el-button>
                      </div>
                    </li>
                </ul>            
              </div>
            </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="organisationDialogVisible">취소</el-button>
        <el-button type="primary" @click="saveConfirmLine">저장</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<style>
  #ApplyPopDetailFrame{
    width: 100%;
  }

  .ApplyPopDetail {
    width: 100%;
    border: solid 1px;
  }

  .ApplyPopDetail thead tr th{
    text-align: center;
  }

  .ApplyPopDetail tbody td{
    border: solid 1px;
  }

</style>

<script>
import AppHeader from "/src/views/apply/components/ApplyHedaer.vue";
import AppConfirmLine from "/src/views/apply/components/ApplyConfirmLine.vue";
import Department from '../../components/Department' // eslint-disable-line no-unused-vars
import * as applyApi from "@/api/apply"; // eslint-disable-line no-unused-vars
import * as companyApi from "@/api/company"; // eslint-disable-line no-unused-vars
import {getCurrentDate} from "@/lib/common";
import {getWordCount, replaceStr} from "@/lib/apply";

export default {
    data() {
      return {
        title: "신청서 작성",
        value: 33,

        confirmTitle: "결재자",
        confirmLine: [],
        ccTitle: "참조자",
        ccLine: [],

        apply: {},
        isModify: false,

        rules: [],
        natRules: [],
        confirms: [],
        cCs: [],

        tags: "",
        tagList: [],

        updateData: {},

        organisationDialogVisibleFlag: false,
        dialogUserSearchString: "",
        dialogUserData: [],
        confirmAndCcLineInModal: [],
        organisationDialogFlag: 0,

        workTypes: [
            { text: '사용자 서버간 통신', value: 1 }, 
            { text: '서버간 통신', value: 2 },
            { text: '대외계', value: 3 },
            { text: '대고객', value: 4 },
        ],

        workType: "",

        workTitle: ""


      
      };
    },
    methods: {
        replaceStr(str, from, to){
            return replaceStr(str, from, to);
        },
        handleTagList(){
            // alert(); 
            // this.$refs.tagList.innerHTML = "";
            this.tagList = this.tags.split(" ");
            // let TagEl = ""
            // SplitedTags.forEach((tag) => {
            //     TagEl += "<span>"+tag+"<span>";
            // })
        },
      
        getWordCount(str, wordCout, dot){
            return getWordCount(str,wordCout, dot);
        },
        organisationDialogVisible(flag){
            this.organisationDialogFlag = flag;
            this.confirmAndCcLineInModal = [];
            if(this.organisationDialogVisibleFlag == false){
            this.organisationDialogVisibleFlag = true;
            console.log(this.confirmLine);

            if(flag === 1){
                this.confirmLine.forEach((val) =>{
                this.confirmAndCcLineInModal.push(val);
                })
            }else{
                this.ccLine.forEach((val) =>{
                this.confirmAndCcLineInModal.push(val);
                })
            }
            
            }else{
            this.organisationDialogVisibleFlag = false;
            }
            
        },
        userSelect(e){
            if(this.userCheck(e)){
                alert("이미 결재라인에 포함되어 있습니다.");
                return false;
            }
            if(this.confirmAndCcLineInModal.length == 5){
                alert("결재자는 5명까지 가능합니다.");
                return false;
            }
            
            const Confirm = {
                "CONFIRM_USER_SEQ": e.USER_SEQ,
                "CONFIRM_USER_NAME": e.USER_NAME,
                "CONFIRM_USER_DEPARTMENT": e.DEPART_INFO.DEPARTMENT,
                "CONFIRM_USER_DEPARTMENT_SEQ": e.DEPART_INFO.DEPARTMENT_SEQ,
                "CONFIRM_USER_POSITION": e.POSITION_INFO.CODE_NAME,
                "CONFIRM_USER_POSITION_SEQ": e.POSITION_INFO.CODE_SEQ,
            };
            this.confirmAndCcLineInModal.push(Confirm);
            console.log(this.confirmAndCcLineInModal);
        },
        userDelete(userSeq){
            console.log(userSeq);
            const NewConfirmLineInModal = this.confirmAndCcLineInModal.filter((line) => line.CONFIRM_USER_SEQ != userSeq );
            console.log(NewConfirmLineInModal);
            this.confirmAndCcLineInModal = NewConfirmLineInModal;
        },
        userCheck(user){
            const Result = this.confirmAndCcLineInModal.reduce((acc, cur) =>{
                acc.push(cur.CONFIRM_USER_SEQ);
                return acc;
            }, []).includes(user.USER_SEQ);

            return Result;
        },
        saveConfirmLine(){
            if(this.organisationDialogFlag === 1){
            this.confirmLine = [];
            this.confirmAndCcLineInModal.forEach((val) =>{
                this.confirmLine.push(val);
            })
            }else{
            this.ccLine = [];
            this.confirmAndCcLineInModal.forEach((val) =>{
                this.ccLine.push(val);
            })
            }
        
            this.organisationDialogVisible();
        },
        handleNodeClick(item){
            console.log(item);
            let data = {
            departSeq : item.id
            }
            companyApi.getUsersInDepart(data)
            .then(res => {
            this.dialogUserData = res.data
            })
            .catch(error => {
            console.log(error);
            });
        },
        dialogUserSearch(){
            let data = {
            searchString : this.dialogUserSearchString
            }
            this.dialogUserData = [];
            companyApi.searchAdmin(data)
                .then(res => {
                    this.dialogUserData = res.data
                })
                .catch(error =>{
                    console.log(error);
                })
        },      
        getCurrentConfirmLine(){
            return this.$refs.appConfirm.getLine();
        },
        getCurrentCcLine(){
            return this.$refs.appCc.getLine();
        },
        applyWork(){
            if(this.confirmLine.length == 0){
                this.$message({
                    type:"warning",
                    message:"결재 라인을 등록해주세요."
                })
            }

            const ApplySeq = this.$route.params.id;
            const Data = new FormData();
            // console.log(this.workType);
            this.updateData.APPLY_RECEPT_REG_DATE = getCurrentDate("Y-m-d H:i:s");
            this.updateData.APPLY_RECEPT_MEMO = this.workTitle;
            this.updateData.APPLY_WORK_TYPE = this.workType;

            this.confirmLine.forEach((val, index) =>{
                val.APPLY_SEQ = ApplySeq;
                val.CONFIRM_FLAG = 3;
                val.CONFIRM_ORDER = index+1;
                val.CONFIRM_STATUS = 'W';
                // console.log(index);
            })

            this.ccLine.forEach((val, index) =>{
                val.APPLY_SEQ = ApplySeq;
                val.CONFIRM_FLAG = 4;
                val.CONFIRM_ORDER = index+1;
                val.CONFIRM_STATUS = 'W';
            })
            const TagData = []
            this.tagList.forEach((val) =>{
                TagData.push({
                    APPLY_SEQ: ApplySeq,
                    TAG: val
                })
            })
            
            
            Data.append("ApplySeq", ApplySeq);
            Data.append("Confirms", JSON.stringify(this.confirmLine));
            Data.append("CCs", JSON.stringify(this.ccLine));
            Data.append("Tags", JSON.stringify(TagData));
            Data.append("UpdateData", JSON.stringify(this.updateData));

            console.log(Data);

            applyApi.applyWork(Data).then( (res) =>{
                console.log(res);
                if(res.data.code == 200){
                    alert("작업 결재 신청되었습니다.");
                    this.$router.push(`/inbox/unChked`);
                }
            }).catch((err) =>{
                console.log(err);
            });
            console.log(this.confirmLine);
            console.log(this.cCs);
        },
        editApplyAtWorkCancel(){
            const UpdateDate = {
                ApplySeq: this.$route.params.id
            };

            applyApi.editApplyAtWorkCancel(UpdateDate).then( (res) =>{
                console.log(res);
                if(res.data.code == 200){
                    alert("수정 취소 되었습니다.");

                }else{
                    alert("수정 중 문제가 생겼습니다. 관리자에게 문의해주세요.");
                }
                
            }).catch((err) =>{
                console.log(err);
            });
        }
    },
    components: {
      AppHeader,
      AppConfirmLine,
      Department,
    },
    computed: {
        pagedMyAppliesTableData() {
            return this.myApplies.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    created() {
        const ApplySeq = this.$route.params.id;
        applyApi.getApply(ApplySeq).then( (res) =>{
            // console.log(res);
            if(res.status == 200){
                this.apply = res.data;
                this.rules = res.data.RULES;
                this.natRules = res.data.NAT_RULES;
                this.confirms = res.data.CONFIRMS.filter((val) => val.CONFIRM_FLAG == 1);
                this.cCs = res.data.CONFIRMS.filter((val) => val.CONFIRM_FLAG == 2);
                this.isModify = this.apply.ADMIN_MODIFY_FLAG === 'Y'?  true : false;

                console.log(this.isModify);

            }
        }).catch((err) =>{
            console.log(err);
        });

        applyApi.getCurrentUserInfo().then((res) => {
          console.log(res);
          console.log(res);
          if (res.status == 200) {
              const User = res.data;
              const Depart = res.data.DEPART_INFO;
              const Position = res.data.POSITION_INFO;
              this.updateData.APPLY_RECEPT_USER_SEQ = User.USER_SEQ;
              this.updateData.APPLY_RECEPT_USER_NAME = User.USER_NAME;
              this.updateData.APPLY_RECEPT_USER_POSITION = Depart.DEPARTMENT;
              this.updateData.APPLY_RECEPT_USER_POSITION_SEQ = Depart.DEPARTMENT_SEQ;
              this.updateData.APPLY_RECEPT_USER_DEPARTMENT = Position.CODE_NAME;
              this.updateData.APPLY_RECEPT_USER_DEPARTMENT_SEQ = Position.CODE_SEQ;
              // console.log(res);
              // console.log("TELKJLKSDFJKLSJDA");
          } else {
              alert(
              "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
              );
          }
        });
        
        applyApi.getLatestConfirmLine(3).then((res) => {
          console.log(res);
          if (res.status == 200) {
            if(Object.keys(res.data).length != 0){
              const Confirms = res.data;
              Confirms.reduce((acc, cur, i) => {
                const Line = {
                  "CONFIRM_FLAG": 3,
                  "CONFIRM_ORDER": i+1,
                  "CONFIRM_STATUS": "W",
                  "CONFIRM_USER_SEQ": cur.CONFIRM_USER_SEQ,
                  "CONFIRM_USER_NAME": cur.CONFIRM_USER_NAME,
                  "CONFIRM_USER_POSITION": cur.CONFIRM_USER_POSITION,
                  "CONFIRM_USER_POSITION_SEQ": cur.CONFIRM_USER_POSITION_SEQ,
                  "CONFIRM_USER_DEPARTMENT": cur.CONFIRM_USER_DEPARTMENT,
                  "CONFIRM_USER_DEPARTMENT_SEQ": cur.CONFIRM_USER_DEPARTMENT_SEQ,
                }
                acc.push(Line);
                return acc;
              }, this.confirmLine)
              console.log("Confirm Line : ");
              console.log(this.confirmLine);
            }
          } else {
            alert(
            "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
            );
          }
        });
    },
};
</script>
