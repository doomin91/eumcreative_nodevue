<template>
    <div class="content">

<el-row>
    <el-col>
        <div class="blockbase block-rounded">
            <div class="block-content">

                <!-- 상단 스텝바 -->
                <AppHeader :active="3" />
            </div>
        </div>
    </el-col>
</el-row>


<el-row>
    <el-col>

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
                                    <td>{{this.apply.APPLY_REG_DATE}}</td>
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

            </div>
        </div>

        <div class="blockbase block-rounded" v-if="rules.length > 0">
            <div class="block-header">
            <h3 class="block-title">정책 리스트</h3>
            </div>
            <div class="block-content">

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

            </div>
        </div>

        <div class="blockbase block-rounded" v-if="natRules.length > 0">
            <div class="block-header">
            <h3 class="block-title">NAT 정책 리스트</h3>
            </div>
            <div class="block-content">

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


                <el-row class="mt30 pw20">
                    <el-col align="right" class="pd10">
                        <el-button type="danger" size="small" @click="deleteApp">삭제</el-button>
                        <el-button type="default" size="small"><router-link :to="{ name: 'app2Edit', params: { id: this.apply.APPLY_SEQ }}" tag="div">이전</router-link></el-button>
                        <el-button type="primary" @click="saveApply" size="small">완료</el-button>
                    </el-col>
                </el-row>



            </div>
        </div>



    </el-col>
</el-row>








    </div>

</template>


<script>
    // import AppHeader from '/src/views/apply/components/ApplyHedaer.vue'
    import * as applyApi from '@/api/apply'; // eslint-disable-line no-unused-vars
    import AppHeader from "/src/views/apply/components/ApplyHedaer.vue";
    import {getWordCount, sendMail, replaceStr } from "@/lib/apply"; // eslint-disable-line no-unused-vars
    
    export default {
        data(){
            return {
                apply: "",
                rules: [],
                natRules: [],
                confirms: [],
                cCs: [],

                test: true,
            }
        },
        methods:{
            replaceStr(str, from, to){
                return replaceStr(str, from, to);
            },
            saveApply(){
                const _this = this;
                // sendMail(this.apply);
                const UpdateFormData = new FormData();
                const ApplySeq = this.$route.params.id;
                UpdateFormData.append("ApplySeq", ApplySeq);
                

                applyApi.saveApply(UpdateFormData).then( (res) =>{
                    console.log("save");
                    console.log(res);
                    if(res.status == 200){
                        // const ApplySeq = res.data[0][0].raw.insertId;
                        // console.log(ApplySeq);
                        sendMail(_this.apply);
                        alert("신청서 작성을 완료했습니다.");
                        location.href = `/inbox/inProg`;
                    }
                }).catch((err) =>{
                    console.log(err);
                });
            },
            deleteApp(){
                const ApplySeq = this.$route.params.id;
                if(confirm("정말 삭제하시겠습니까?")){
                    applyApi.deleteApplyInWriting(ApplySeq).then( (res) =>{
                        if(res.status == 200){
                            alert("삭제되었습니다");
                            location.href = `/`;
                        }
                    }).catch((err) =>{
                        console.log(err);
                    });
                }
            },
        },
        components: {
            AppHeader
        },
        computed: {
            
        },
        mounted(){
            console.log(this.natRules);
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

                }
            }).catch((err) =>{
                console.log(err);
            });
            
        }
    }
</script>