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
                                    <th>사유 수정</th>
                                    <td colspan="3">
                                        <div class="apply_textarea pl10">
                                        <el-input type="textarea" ref="applyTitle" v-model="apply.APPLY_TITLE" size="small"></el-input>
                                        </div>
                                    </td>
                                    <!-- <td colspan="3" class="tal">{{this.apply.APPLY_TITLE}}</td> -->
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </div>
        </div>

        <div class="blockbase block-rounded">
            
            <div class="block-header">
                <h3 class="block-title">정책 상세 내용</h3>
            </div>

            <el-row>
                <el-col>
                    <h4>
                        <span v-on:click="showRuleForm(1)" style="cursor: pointer;">
                            <i v-show="!isRuleForm" class="el-icon-arrow-up ml10" style="font-size:16px; font-weight:700;"></i>
                            <i v-show="isRuleForm" class="el-icon-arrow-down ml10" style="font-size:16px; font-weight:700;"></i>
                            정책 신청하기
                        </span>
                        <div class="rulepop" @click="questionapplydialog = true">
                            <i class="el-icon-warning-outline"></i>
                        </div>
                    </h4>
                </el-col>
            </el-row>

            <el-row v-show="isRuleForm"> 
                <el-col ref="ruleForm">
                    <table class="ApplyTable01">
                        <colgroup>
                            <col width="6%">
                            <col width="17.4%">
                            <col width="17.4%">
                            <col width="17.4%">
                            <col width="17.4%">
                            <col width="17.4%">
                            <col width="7%">
                        </colgroup>
                        <thead>
                            <tr>
                                <th>양방향</th>
                                <th>출발지</th>
                                <th>도착지</th>
                                <th>서비스(Port)</th>
                                <th>정책종료일</th>
                                <th>설명</th>
                                <th ><el-button type="primary" size="mini" icon="el-icon-plus" @click="addRule"></el-button></th>
                            </tr>
                        </thead>
                        <tbody>                 
                            <tr v-for="(rule, index) in rules" :key="rule.RULE_SEQ">
                                <td><el-checkbox :true-label=1 :false-label=0 v-model="rule.REVERSE_FLAG"></el-checkbox></td>
                                <td v-bind:class="{apperror: ruleValidation['SOURCE'+index]}" :ref="'SOURCE'+index">
                                    <el-input type="text" v-model="rule.SOURCE" @change="checkInputState([$event, 'SOURCE'+index])"></el-input>
                                </td>
                                <td v-bind:class="{apperror: ruleValidation['DESTINATION'+index]}" :ref="'DESTINATION'+index">
                                    <el-input type="text" v-model="rule.DESTINATION" @change="checkInputState([$event, 'DESTINATION'+index])"></el-input>
                                </td>
                                <td v-bind:class="{apperror: ruleValidation['SERVICE'+index]}" :ref="'SERVICE'+index">
                                    <el-input type="text" v-model="rule.SERVICE" @change="checkInputState([$event, 'SERVICE'+index])"></el-input>
                                </td>
                                <td v-bind:class="{apperror: ruleValidation['EXPIRATION_DATE'+index]}" :ref="'EXPIRATION_DATE'+index">
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="rule.EXPIRATION_DATE" style="width: 100%;" @change="checkInputState([$event, 'EXPIRATION_DATE'+index])"></el-date-picker>
                                </td>
                                <td><el-input type="text" v-model="rule.DESCRIPTION"></el-input></td>
                                <td><el-button type="danger" size="mini" icon="el-icon-close" value="X" @click="deleteRule(index)"></el-button></td>
                            </tr>
                        </tbody>
                    </table>
                </el-col>
            </el-row>


            <el-row>
                <el-col>
                    <h4>
                        <span v-on:click="showRuleForm(2)" style="cursor: pointer;">
                            <i v-show="isRuleForm" class="el-icon-arrow-up ml10" style="font-size:16px; font-weight:700;"></i>
                            <i v-show="!isRuleForm" class="el-icon-arrow-down ml10" style="font-size:16px; font-weight:700;"></i>
                            NAT 정책 신청하기
                        </span> 
                        <div class="rulepop" @click="questionapplydialog = true">
                            <i class="el-icon-warning-outline"></i>
                        </div>
                    </h4>
                </el-col>
            </el-row>

            <el-row v-show="!isRuleForm">
                <el-col ref="natRuleForm">
                    <table class="ApplyTable01">
                        <colgroup>
                            <col width="6%">
                            <col width="12.42%">
                            <col width="12.42%">
                            <col width="12.42%">
                            <col width="12.42%">
                            <col width="12.42%">
                            <col width="12.42%">
                            <col width="12.42%">
                            <col width="7%">
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
                                <th><el-button type="primary" size="mini" icon="el-icon-plus" @click="addNatRule"></el-button></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(natRule, index) in natRules" :key="natRule.RULE_SEQ">
                                <td><el-checkbox :true-label=1 :false-label=0 v-model="natRule.REVERSE_FLAG"></el-checkbox></td>
                                <td v-bind:class="{apperror: natRuleValidation['SOURCE'+index]}" :ref="'N_SOURCE'+index">
                                    <el-input type="text" v-model="natRule.SOURCE" @change="checkInputState([$event, 'N_SOURCE'+index])"></el-input>
                                </td>
                                <td v-bind:class="{apperror: natRuleValidation['DESTINATION'+index]}" :ref="'N_DESTINATION'+index">
                                    <el-input type="text" v-model="natRule.DESTINATION" @change="checkInputState([$event, 'N_DESTINATION'+index])"></el-input>
                                </td>
                                <td v-bind:class="{apperror: natRuleValidation['SERVICE'+index]}" :ref="'N_SERVICE'+index">
                                    <el-input type="text" v-model="natRule.SERVICE" @change="checkInputState([$event, 'N_SERVICE'+index])"></el-input>
                                </td>
                                <td v-bind:class="{apperror: natRuleValidation['T_SOURCE'+index]}" :ref="'T_SOURCE'+index">
                                    <el-input type="text" v-model="natRule.T_SOURCE"></el-input>
                                </td>
                                <td v-bind:class="{apperror: natRuleValidation['T_DESTINATION'+index]}" :ref="'T_DESTINATION'+index">
                                    <el-input type="text" v-model="natRule.T_DESTINATION"></el-input>
                                </td>
                                <td v-bind:class="{apperror: natRuleValidation['EXPIRATION_DATE'+index]}" :ref="'N_EXPIRATION_DATE'+index">
                                    <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="natRule.EXPIRATION_DATE" style="width: 100%;" @change="checkInputState([$event, 'N_EXPIRATION_DATE'+index])"></el-date-picker>
                                    <!-- <el-input type="text" v-model="rule.EXPIRATION_DATE"></el-input> -->
                                </td>
                                <td><el-input type="text" v-model="natRule.DESCRIPTION"></el-input></td>
                                <td><el-button type="danger" size="mini" icon="el-icon-close" value="X" @click="deleteNatRule(index)"></el-button></td>
                            </tr>
                        </tbody>
                    </table>


                </el-col>
            </el-row>

            <el-row class="mb20 pw20">
                <el-col align="right" class="pd10 pr30">
                    <el-button type="primary" size="small" @click="editApplyAtWork">수정</el-button>
                    <el-button type="default" size="small"><router-link :to="{ name: 'appWork', params: { id: this.apply.APPLY_SEQ }}" tag="div">취소</router-link></el-button>
                </el-col>
            </el-row>
        </div>



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
import * as applyApi from "@/api/apply"; // eslint-disable-line no-unused-vars
import * as companyApi from "@/api/company"; // eslint-disable-line no-unused-vars
// import {getCurrentDate} from "@/lib/common";
import {getWordCount , checkRuleForm, checkNatRuleForm} from "@/lib/apply";

export default {
    data() {
      return {
        title: "신청서 작성",
        value: 33,

        apply: {},

        rules: [],
        natRules: [],
        applyFormData: new FormData(),

        isRuleForm: true,

        ruleValidation: {},
        natRuleValidation: {}

      };
    },
    methods: {
        checkInputState(value){
            console.log(value);
            console.log(this.$refs[value[1]][0].classList);
            
            if(value === null || value !== ""){
                if(this.$refs[value[1]][0].classList.contains("apperror")){
                    this.$refs[value[1]][0].classList.remove("apperror");
                }
            }
        },
        getWordCount(str, wordCout, dot){
            return getWordCount(str,wordCout, dot);
        },
        showRuleForm(flag){
            if(flag === 1){
                if(!this.isRuleForm){
                    this.isRuleForm = !this.isRuleForm;
                }
            }else{
                if(this.isRuleForm){
                    this.isRuleForm = !this.isRuleForm;
                }
            }

        },
        addRule(){
            const ApplySeq = this.$route.params.id;
            this.rules.push({
                "APPLY_SEQ": ApplySeq,
                "REVERSE_FLAG": false,
                "SOURCE" : "",
                "DESTINATION" : "",
                "SERVICE" : "",
                "EXPIRATION_DATE" : "",
                "DESCRIPTION" : "",
            })
        },
        deleteRule(index){
            console.log(index);
            if(this.rules.length == 1){
                this.rules.splice(index, 1);
                this.addRule();
            }else{
                this.rules.splice(index, 1);
            }
        },
        addNatRule(){
            const ApplySeq = this.$route.params.id;
            this.natRules.push({
                "APPLY_SEQ": ApplySeq,
                "REVERSE_FLAG": false,
                "SOURCE" : "",
                "DESTINATION" : "",
                "SERVICE" : "",
                "T_SOURCE" : "",
                "T_DESTINATION" : "",
                "EXPIRATION_DATE" : "",
                "DESCRIPTION" : "",
            })
        },
        deleteNatRule(index){
            console.log(index);
            if(this.natRules.length == 1){
                this.natRules.splice(index, 1);
                this.addNatRule();
            }else{
                this.natRules.splice(index, 1);
            }
        },

        checkValidation(){
            if(this.isRuleForm){
                this.ruleValidation = checkRuleForm(this.rules);
            
                console.log(Object.values(this.ruleValidation));

                if(Object.values(this.ruleValidation).includes(true)){ // true가 빈 값
                    this.$message({
                        type: "warning",
                        message: "정책 입력을 완성해주세요."
                    });

                    return [false, false];
                }else{
                    this.natRuleValidation = checkNatRuleForm(this.natRules);

                    if(Object.values(this.natRuleValidation).includes(true)){
                        if(Object.values(this.natRuleValidation).includes(false)){
                            this.$message({
                                type: "warning",
                                message: "NAT 정책 입력을 완성해주세요."
                            });

                            return [false, false];
                        }else{
                            // 일반 정책만
                            console.log("일반 정책만");
                            return [true, false];
                        }
                    }else{
                        // 빈 값이 없고 다 채워져 있으면 NAT도 같이 신청
                        console.log("일반, NAT 정책 둘 다");
                        return [true, true];
                    }
                }

                
            }

            if(!this.isRuleForm){
                this.natRuleValidation = checkNatRuleForm(this.natRules);

                    console.log(Object.keys(this.natRuleValidation));

                if(Object.values(this.natRuleValidation).includes(true)){
                    this.$message({
                        type: "warning",
                        message: "NAT 정책 입력을 완성해주세요."
                    });

                    return [false, false];
                }else{
                    this.ruleValidation = checkRuleForm(this.rules);

                    if(Object.values(this.ruleValidation).includes(true)){
                        if(Object.values(this.ruleValidation).includes(false)){
                            this.$message({
                                type: "warning",
                                message: "정책 입력을 완성해주세요."
                            });

                            return [false, false];
                        }else{
                            // NAT 정책만
                            console.log("NAT 정책만");
                            return [true, false];
                        }
                    }else{
                        // 빈 값이 없고 다 채워져 있으면 NAT도 같이 신청
                        console.log("일반, NAT 정책 둘 다");
                        return [true, true];
                    }
                }
            }
            
        },

        editApplyAtWork(){
            const Validation = this.checkValidation();
            console.log(Validation);
            if(!Validation.includes(true)){
                return false;
            }

            const ApplySeq = this.$route.params.id;
            const RuleFormData = new FormData();
            RuleFormData.append("ApplySeq", ApplySeq);
            RuleFormData.append("ApplyTitle", this.$refs.applyTitle);
            if(Validation[0]){
                RuleFormData.append("Rules", JSON.stringify(this.rules));
            }
            if(Validation[1]){
                RuleFormData.append("NatRules", JSON.stringify(this.natRules));
            }

            applyApi.editApplyAtWork(RuleFormData).then( (res) =>{
                // console.log(res);
                if(res.data.code == 200){
                    console.log(res);
                    alert("수정 되었습니다");

                    this.$router.push(`/appWork/${ApplySeq}`);

                }
            }).catch((err) =>{
                console.log(err);
            });

        }
    },
    components: {
      AppHeader,
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

                if(this.rules.length == 0){
                    this.addRule();    
                    this.isRuleForm = false;               
                }else{
                    this.isRuleForm = true;
                }

                if(this.natRules.length == 0){
                    this.addNatRule();
                    this.isRuleForm = true;
                }else{
                    this.isRuleForm = false;
                }

            }
        }).catch((err) =>{
            console.log(err);
        });
        
    },
};
</script>
