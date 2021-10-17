<template>
    <div class="content">

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
                                    <td>{{ getWordCount(this.apply.APPLY_REG_DATE, 10, "") }}</td>
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
                                    <td colspan="3" class="tal">
                                        <div class="add_confirm_line01 ml20 mr20" v-for="(confirm) in confirms" :key="confirm.CONFIRM_SEQ">
                                            <div class="confirm_position01">{{confirm.CONFIRM_USER_NAME}} {{confirm.CONFIRM_USER_POSITION}}</div>
                                            <div class="confirm_checked" v-if="confirm.CONFIRM_STATUS==='W'">
                                                <p class="checked_icon"></p>
                                                <p class="checked_time"></p>
                                            </div>
                                            <div class="confirm_checked" v-else-if="confirm.CONFIRM_STATUS==='C'">
                                                <p class="checked_icon"><i class="el-icon-check"></i></p>
                                                <p class="checked_time">{{iSoToDate(confirm.CONFIRM_DATE)}}</p>
                                            </div>
                                            <div class="confirm_checked" v-else-if="confirm.CONFIRM_STATUS==='R'">
                                                <p class="checked_icon"><i class="el-icon-close"></i></p>
                                                <p class="checked_time">{{iSoToDate(confirm.CONFIRM_DATE)}}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr >
                                    <th>참조자</th>
                                    <td colspan="3" class="tal">
                                        <div class="add_confirm_line01 ml20 mr20" v-for="(cC) in cCs" :key="cC.CONFIRM_SEQ">
                                            <div class="confirm_position">{{cC.CONFIRM_USER_NAME}} {{cC.CONFIRM_USER_POSITION}}</div>
                                            <div class="confirm_checked" v-if="cC.CONFIRM_STATUS==='W'">
                                                <p class="checked_icon"></p>
                                                <p class="checked_time"></p>
                                            </div>
                                            <div class="confirm_checked" v-else-if="cC.CONFIRM_STATUS==='V'">
                                                <p class="checked_icon"><i class="el-icon-check"></i></p>
                                                <p class="checked_time">{{iSoToDate(cC.CONFIRM_DATE)}}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <th>작업 결재자</th>
                                    <td colspan="3" class="tal">
                                        <div class="add_confirm_line01 ml20 mr20" v-for="(confirm) in workConfirms" :key="confirm.CONFIRM_SEQ">
                                            <div class="confirm_position">{{confirm.CONFIRM_USER_NAME}} {{confirm.CONFIRM_USER_POSITION}}</div>
                                            <div class="confirm_checked" v-if="confirm.CONFIRM_STATUS==='W'">
                                                <p class="checked_icon"></p>
                                                <p class="checked_time"></p>
                                            </div>
                                            <div class="confirm_checked" v-else-if="confirm.CONFIRM_STATUS==='C'">
                                                <p class="checked_icon"><i class="el-icon-check"></i></p>
                                                <p class="checked_time">{{iSoToDate(confirm.CONFIRM_DATE)}}</p>
                                            </div>
                                            <div class="confirm_checked" v-else-if="confirm.CONFIRM_STATUS==='R'">
                                                <p class="checked_icon"><i class="el-icon-close"></i></p>
                                                <p class="checked_time">{{iSoToDate(confirm.CONFIRM_DATE)}}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr >
                                    <th>작업 참조자</th>
                                    <td colspan="3" class="tal">
                                        <div class="add_confirm_line01 ml20 mr20" v-for="(cC) in workCCs" :key="cC.CONFIRM_SEQ">
                                            <div class="confirm_position">{{cC.CONFIRM_USER_NAME}} {{cC.CONFIRM_USER_POSITION}}</div>
                                            <div class="confirm_checked" v-if="cC.CONFIRM_STATUS==='W'">
                                                <p class="checked_icon"></p>
                                                <p class="checked_time"></p>
                                            </div>
                                            <div class="confirm_checked" v-else-if="cC.CONFIRM_STATUS==='V'">
                                                <p class="checked_icon"><i class="el-icon-check"></i></p>
                                                <p class="checked_time">{{iSoToDate(cC.CONFIRM_DATE)}}</p>
                                            </div>
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
                        <el-col>
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
                        <el-col>
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

                <el-row class="mb20 pw20" v-if="appStatusToUser === 1" >
                    <el-col align="left" class="pd10 pr30">
                        <el-button type="primary" size="small" @click="confirmDialogVisible">승인</el-button>
                        <el-button type="danger" size="small" @click="rejectDialogVisible">반려</el-button>
                    </el-col>
                </el-row> 

                <el-row class="mb20 pw20" v-if="appStatusToUser === 3">
                    <el-col align="left" class="pd10 pr30">
                        <el-button type="primary" size="small" @click="confirmDialogVisible">작업결재 승인</el-button>
                        <el-button type="danger"  size="small" @click="rejectDialogVisible">작업결재 반려</el-button>
                    </el-col>
                </el-row>

                <el-row class="mb20 pw20" v-if="this.apply.APPLY_STATUS === 4">
                    <el-col align="left" class="pd10 pr30">
                        <el-button type="primary" size="small"><router-link :to="{ name: 'appWork', params: { id: this.apply.APPLY_SEQ }}" tag="div">작업결재 신청</router-link></el-button>
                        <!-- <el-button type="primary" size="small">작업결재 신청</el-button> -->
                    </el-col>
                </el-row>

                <el-row class="pw20 mt30" >
                    <el-col align="right" class="pd10">
                        <el-button type="default" size="small" @click="back">목록가기</el-button>
                    </el-col>
                </el-row>




            </div>
        </div>











        <el-dialog
            title="결재승인"
            :visible.sync="confirmDialogVisibleFlag"
            width="20%"
            custom-class="ConfirmDialog">
            
            <el-row>
                <el-col :span="24">
                    <el-input
                        type="textarea"
                        placeholder="결재 메모를 남겨주세요"
                        :rows="15"
                        v-model="approvalMemo"
                        maxlength="100"
                        show-word-limit
                        >
                    </el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="confirmDialogVisible">취소</el-button>
                <el-button @click="confirmApprove()" type="primary">승인</el-button>
            </span>
        </el-dialog>
        
        <el-dialog
            title="결재반려"
            :visible.sync="rejectDialogVisibleFlag"
            width="20%"
            custom-class="ConfirmDialog">
            
            <el-row>
                <el-col :span="24">
                    <el-input
                        type="textarea"
                        placeholder="결재 메모를 남겨주세요"
                        :rows="15"
                        v-model="rejectMemo"
                        maxlength="100"
                        show-word-limit
                        >
                    </el-input>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rejectDialogVisible">취소</el-button>
                <el-button @click="confirmReject()" type="danger">반려</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<style>
    .ConfirmDialog.el-dialog__body{
        height: 300px !important; 
    }
</style>


<script>
    // import AppHeader from '/src/views/apply/components/ApplyHedaer.vue'
    import * as applyApi from '@/api/apply'; // eslint-disable-line no-unused-vars
    import {getWordCount, iSoToDate, replaceStr} from "@/lib/apply";

    export default {
        data(){
            return {
                apply: "",
                rules: [],
                natRules: [],
                confirms: [],
                cCs: [],
                workConfirms: [],
                workCCs: [],
                userInfo: "",

                appStatusToUser: false, // 1: 일반 결재, 2: 작업 결재
                currentConfirmFlag: 0,  //

                approvalMemo: "",
                rejectMemo: "",

                myConfirmSeq: 0,
                myConfirmOrder: 0,

                confirmDialogVisibleFlag: false,
                rejectDialogVisibleFlag: false,
            }
        },
        methods:{
            replaceStr(str, from, to){
                return replaceStr(str, from, to);
            },
            getWordCount(str, wordCout, dot){
                return getWordCount(str,wordCout, dot);
            },
            iSoToDate(date){
                return iSoToDate(date);
            },
            confirmApprove(){
                const ConfirmData = {
                    "APPLY_SEQ": this.apply.APPLY_SEQ,
                    "CONFIRM_SEQ": this.myConfirmSeq,
                    "CONFIRM_MEMO": this.approvalMemo,
                    "CONFIRM_ORDER": this.myConfirmOrder,
                    "CONFIRM_FLAG": this.currentConfirmFlag,
                };
                if(this.currentConfirmFlag == 1){
                    ConfirmData.APPLY_CONFIRM_COUNT = this.confirms.length;
                }else if( this.currentConfirmFlag == 3){
                    ConfirmData.APPLY_CONFIRM_COUNT = this.workConfirms.length;
                }
                console.log(ConfirmData);
                applyApi.confirmApprove(ConfirmData).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        console.log(res);
                        alert("승인 처리되었습니다.");
                        location.reload();
                    } else {
                        alert(
                        "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
                        );
                    }
                });

            },
            confirmReject(){
                const ConfirmData = {
                    "APPLY_SEQ": this.apply.APPLY_SEQ,
                    "CONFIRM_SEQ": this.myConfirmSeq,
                    "CONFIRM_MEMO": this.rejectMemo,
                    "CONFIRM_ORDER": this.myConfirmOrder,
                    "CONFIRM_FLAG": this.currentConfirmFlag,
                };

                console.log(ConfirmData);
                applyApi.confirmReject(ConfirmData).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        console.log(res);
                        alert("반려 처리되었습니다.");
                        location.reload();
                    } else {
                        alert(
                        "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
                        );
                    }
                });
            },
            confirmDialogVisible(){
                if(this.confirmDialogVisibleFlag == false){
                    this.confirmDialogVisibleFlag = true;
                }else{
                    this.confirmDialogVisibleFlag = false;
                }
            },
            rejectDialogVisible(){
                if(this.rejectDialogVisibleFlag == false){
                    this.rejectDialogVisibleFlag = true;
                }else{
                    this.rejectDialogVisibleFlag = false;
                }
            },
            // 신청상태값 
            // -1: 일반 결재 반려, -2: 작업 결재 반려
            // 0 : 신청서 처음 제출, 1 : 정책까지 제출, 2 : 신청서 제출, 3 : 1명이라고 결재 해서 결재중, 4 : 결재 완료 및 작업 결재 대기
            // 5 : 작업 결재 신청 제출, 6 : 작업 결재 1명이라도 해서 결재 중, 7 : 작업 결재 완료 및 작업 대기, 8 : 작업 완료
            checkAppStatus(){
                const ApplyStatus = this.apply.APPLY_STATUS;
                const ConfirmOrder = this.apply.APPLY_CONFIRM_ORDER;
                const WorkConfirmOrder = this.apply.RECEPTION_CONFIRM_ORDER;
                const ApplyConfirm = this.confirms.filter((confirm) =>{
                    return confirm.CONFIRM_FLAG == 1 && confirm.CONFIRM_USER_SEQ == this.userInfo.USER_SEQ;
                })
                const ApplyWorkConfirm = this.workConfirms.filter((confirm) =>{
                    return confirm.CONFIRM_FLAG == 3 && confirm.CONFIRM_USER_SEQ == this.userInfo.USER_SEQ;
                })
                // console.log(ApplyStatus);
                // console.log(WorkConfirmOrder);
                // console.log(this.apply.CONFIRMS);
                // console.log(ApplyConfirm);
                
                if(ApplyConfirm.length > 0){
                    if((ApplyStatus === 2 || ApplyStatus === 3) && (ConfirmOrder == ApplyConfirm[0].CONFIRM_ORDER) && ApplyConfirm[0].CONFIRM_STATUS === 'W'){
                        this.myConfirmSeq = ApplyConfirm[0].CONFIRM_SEQ;
                        this.appStatusToUser = 1;
                        this.currentConfirmFlag = 1;
                        this.myConfirmOrder = ApplyConfirm[0].CONFIRM_ORDER;
                    }
                }

                if(ApplyWorkConfirm.length > 0){
                    if((ApplyStatus === 5 || ApplyStatus === 6) && (WorkConfirmOrder == ApplyWorkConfirm[0].CONFIRM_ORDER) && ApplyWorkConfirm[0].CONFIRM_STATUS === 'W'){
                        this.myConfirmSeq = ApplyWorkConfirm[0].CONFIRM_SEQ;
                        this.appStatusToUser = 3;
                        this.currentConfirmFlag = 3;
                        this.myConfirmOrder = ApplyConfirm[0].CONFIRM_ORDER;
                    }
                }
                // console.log(this.appStatusToUser);
            },

            back() {
            this.$router.push({path:'/myApp'});
            },
            
            
        },
        components: {
            
        },
        computed: {
            
        },
        created(){
            const ApplySeq = this.$route.params.id;
            applyApi.getApply(ApplySeq).then( (res) =>{
                console.log(res);
                if(res.status == 200){
                    this.apply = res.data;
                    this.rules = res.data.RULES;
                    this.natRules = res.data.NAT_RULES;
                    this.confirms = res.data.CONFIRMS.filter((val) => val.CONFIRM_FLAG == 1);
                    this.cCs = res.data.CONFIRMS.filter((val) => val.CONFIRM_FLAG == 2);
                    this.workConfirms = res.data.CONFIRMS.filter((val) => val.CONFIRM_FLAG == 3);
                    this.workCCs = res.data.CONFIRMS.filter((val) => val.CONFIRM_FLAG == 4);

                    console.log(this.workConfirms);
                }

                
                applyApi.getCurrentUserInfo().then((res) => {
                // console.log(res);
                    if (res.status == 200) {
                        this.userInfo = res.data;
                        this.checkAppStatus();
                    } else {
                        alert(
                        "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
                        );
                    }
                });
            }).catch((err) =>{
                console.log(err);
            });
        },

    }
</script>
