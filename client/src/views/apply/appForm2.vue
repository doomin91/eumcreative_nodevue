<template>

    <div class="content">

<el-row>
    <el-col>
        <div class="blockbase block-rounded">
            <div class="block-content">

                <!-- 상단 스텝바 -->
                <AppHeader :active="2" />
            </div>
        </div>
    </el-col>
</el-row>

<el-row>
    <el-col>

        <div class="blockbase block-rounded">
            <div class="block-content">
                <el-row>
                    <el-col>
                        <h4>
                            <span v-on:click="showRuleForm(1)" style="cursor: pointer;">
                                <i v-show="!isRuleForm" class="el-icon-arrow-up mr10" style="font-size:16px; font-weight:700;"></i>
                                <i v-show="isRuleForm" class="el-icon-arrow-down mr10" style="font-size:16px; font-weight:700;"></i>
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
                                    <td><el-checkbox v-model="rule.REVERSE_FLAG"></el-checkbox></td>
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

                <!-- 정책 일괄 신청 -->
                <el-row class="mt20" v-show="isRuleForm">
                    <el-col>
                        <el-button type="primary" @click="ruleDialogFormVisible = true" size="small">정책 엑셀 일괄 적용하기</el-button>

                        <el-dialog 
                            title="정책 엑섹로 등록하기" 
                            :visible.sync="ruleDialogFormVisible"
                            width="40%"
                            >
                        <!-- <el-form :model="form"> -->
                        <el-form>
                            <el-form-item label="엑셀 형식" :label-width="formLabelWidth">
                                <el-button type="success" class="ml15" size="small">엑셀 다운로드</el-button>
                                <el-button type="primary" size="small">엑셀 메뉴얼 다운로드</el-button>
                            </el-form-item>
                            <el-form-item label="첨부파일" :label-width="formLabelWidth">
                                <div class="apply_filebox">
                                    <el-button icon="el-icon-document-copy" type="primary" size="small" class="ml15" @click="checkFile(1)">파일첨부</el-button>
                                    <span class="ml15">{{ruleExcelFileName}}</span>
                                    <input type="file" id="ruleFileInput" style="display:none;" @change="checkFileSure(1)" />
                                    <p class="ml15">첨부파일 엑셀 형식은 Excel97-2003 통합문서 형식으로 저장해 주세요.</p>
                                </div>
                            </el-form-item>
                        </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="ruleDialogFormVisible = false" size="small">취소</el-button>
                                <el-button type="primary" @click="setParsedExcelData(1)" size="small">적용하기</el-button>
                            </span>
                        </el-dialog>

                    </el-col>
                </el-row>


                <el-row>
                    <el-col>
                        <h4>
                            <span v-on:click="showRuleForm(2)" style="cursor: pointer;">
                                <i v-show="isRuleForm" class="el-icon-arrow-up mr10" style="font-size:16px; font-weight:700;"></i>
                                <i v-show="!isRuleForm" class="el-icon-arrow-down mr10" style="font-size:16px; font-weight:700;"></i>
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
                                    <td><el-checkbox v-model="natRule.REVERSE_FLAG"></el-checkbox></td>

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


                <!-- 정책 일괄 신청 -->
                <el-row class="mt20" v-show="!isRuleForm">
                    <el-col>
                        <el-button type="primary" @click="natRuleDialogFormVisible = true" size="small">NAT 정책 엑셀 일괄 적용하기</el-button>

                        <el-dialog 
                            title="NAT 정책 엑섹로 등록하기" 
                            :visible.sync="natRuleDialogFormVisible"
                            width="40%"
                            >
                        <!-- <el-form :model="form"> -->
                        <el-form>
                            <el-form-item label="엑셀 형식" :label-width="formLabelWidth">
                                <el-button type="success" class="ml15" size="small">엑셀 다운로드</el-button>
                                <el-button type="primary" size="small">엑셀 메뉴얼 다운로드</el-button>
                            </el-form-item>
                            <el-form-item label="첨부파일" :label-width="formLabelWidth">
                                <div class="apply_filebox">
                                    <el-button icon="el-icon-document-copy" type="primary" size="small" class="ml15" @click="checkFile(2)">파일첨부</el-button>
                                    <span class="ml15">{{natRuleExcelFileName}}</span>
                                    <input type="file" id="natRuleFileInput" style="display:none;" @change="checkFileSure(2)" />
                                    <p class="ml15">첨부파일 엑셀 형식은 Excel97-2003 통합문서 형식으로 저장해 주세요.</p>
                                </div>
                            </el-form-item>
                        </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="natRuleDialogFormVisible = false" size="small">취소</el-button>
                                <el-button type="primary" @click="setParsedExcelData(2)" size="small">적용하기</el-button>
                            </span>
                        </el-dialog>

                    </el-col>
                </el-row>


                <el-row class="mb20 pw20">
                    <el-col align="right" class="pd10 pr30">
                    <el-button type="danger" size="small" @click="deleteApp">삭제</el-button>
                    <el-button type="default" size="small"><router-link :to="{ name: 'appEdit', params: { id: this.apply.APPLY_SEQ }}" tag="div">이전</router-link></el-button>
                    <el-button type="primary" @click="toAppForm3" size="small">다음</el-button>
                    </el-col>
                </el-row>

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

                <el-row class="mb20 pw20">
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
                                    <th>신청서 번호</th>
                                    <td>{{this.apply.APPLY_NUMBER}}</td>
                                    <th>신청일</th>
                                    <td>{{ getWordCount(this.apply.APPLY_REG_DATE, 10, "") }}</td>
                                </tr>

                                <tr >
                                    <th>신청부서</th>
                                    <td>{{this.apply.APPLY_USER_DEPARTMENT}}</td>
                                    <th>신청자</th>
                                    <td>{{this.apply.APPLY_USER_NAME}} {{this.apply.APPLY_USER_POSITION}}</td>
                                </tr>
                                <tr >
                                    <th>사유</th>
                                    <td colspan="3" class="tal">{{this.apply.APPLY_TITLE}}</td>
                                </tr>
                                <tr >
                                    <th>첨부파일</th>
                                    <td colspan="3">
                                        <li v-for="(attach) in this.apply.ATTACHES" :key="attach.SEQ" @click="getApplyAttach(attach.SEQ, attach.FILE_NAME)">
                                            {{attach.FILE_NAME}}
                                        </li>
                                    </td>
                                </tr>
                                <tr >
                                    <th>결재자</th>
                                    <td colspan="3" class="tal">
                                        <div v-for="(confirm) in this.confirms" :key="confirm.CONFIRM_SEQ" class="add_confirm_line ml20 mr20">
                                            <div class="confirm_position">{{confirm.CONFIRM_USER_POSITION}}</div>
                                            <div class="confirm_name">{{confirm.CONFIRM_USER_NAME}}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr >
                                    <th>참조자</th>
                                    <td colspan="3">
                                        <div v-for="(cc) in this.cCs" :key="cc.CONFIRM_SEQ" class="add_confirm_line ml20 mr20">
                                            <div class="confirm_position">{{cc.CONFIRM_USER_POSITION}}</div>
                                            <div class="confirm_name">{{cc.CONFIRM_USER_NAME}}</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>

            </div>
        </div>
    </el-col>
</el-row>

<el-dialog title="정책신청 작성방법" :visible.sync="questionapplydialog">
<table class="ApplyTable02">
    <colgroup>
        <col width="20%">
        <col width="80%">
    </colgroup>
    <tbody>
        <tr>
            <th>양방향 정책</th>
            <td>양방향 정책 체크시 저장될때 출발지와 도착지가 바뀐 정책 하나가 추가 됩니다.</td>
        </tr>
        <tr>
            <th>출발지</th>
            <td>출발지 입력시 ,로 구분하여 입력하셔야 합니다.<br/>한글,영문,숫자,띄어쓰기,()/_-* 만 입력가능합니다.</td>
        </tr>
        <tr>
            <th>도착지</th>
            <td>도착지 입력시 ,로 구분하여 입력하셔야 합니다.<br/>한글,영문,숫자,띄어쓰기,()/_-* 만 입력가능합니다.</td>
        </tr>    
        <tr>
            <th>서비스(PORT)</th>
            <td>출발지 입력시 ,로 구분하여 입력하셔야 합니다.<br/>한글,영문,숫자,띄어쓰기,()/_-* 만 입력가능합니다.</td>
        </tr>
    </tbody>
</table>
</el-dialog>



    </div>

</template>



<script>
import * as applyApi from '@/api/apply'; // eslint-disable-line no-unused-vars
import AppHeader from "/src/views/apply/components/ApplyHedaer.vue";
import {getWordCount, checkExcelSignatrue, isValidatedDate, checkRuleForm, checkNatRuleForm} from "@/lib/apply"; // eslint-disable-line no-unused-vars

    export default {
        data(){
            return {
                rules: [],
                natRules: [],
                questionapplydialog: false,
                ruleDialogFormVisible: false,
                natRuleDialogFormVisible: false,
                formLabelWidth: '100px',
                isRuleForm: true,

                apply: {},

                confirms: [],
                cCs: [],

                ruleExcelData: [],
                natRuleExcelData: [],
                ruleExcelFileName: "",
                natRuleExcelFileName: "",
                
                ruleValidation: {},
                natRuleValidation: {}
            }
        },

        methods:{
            getWordCount(str, wordCout, dot){
                return getWordCount(str, wordCout, dot);
            },
            getApplyAttach(seq, name){
                applyApi.getApplyAttach(seq).then( (res) =>{
                    if(res.status == 200){
                        // const ApplySeq = res.data[0][0].raw.insertId;
                        // console.log(ApplySeq);
                        // console.log(res);
                        const parsed = JSON.parse(res.data);
                        // console.log(parsed);
                        // const json = JSON.stringify({ blob: res.toString("base64") });
                        // console.log(json);
                        const BufferData = Buffer.from(parsed.blob, "base64");
                        this.forceFileDownload(BufferData, name);
                    }
                }).catch((err) =>{
                    console.log(err);
                });
            },
            forceFileDownload(data, name){
                // console.log(response);
                const url = window.URL.createObjectURL(new Blob([data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name); //or any other extension
                document.body.appendChild(link);
                link.click();
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
            checkInputState(value){
                console.log(value);
                console.log(this.$refs[value[1]][0].classList);
                
                if(value === null || value !== ""){
                    if(this.$refs[value[1]][0].classList.contains("apperror")){
                        this.$refs[value[1]][0].classList.remove("apperror");
                    }
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
            toAppForm3(){
                const Validation = this.checkValidation();
                console.log(Validation);
                if(!Validation.includes(true)){
                    return false;
                }

                const ApplySeq = this.$route.params.id;
                const RuleFormData = new FormData();
                RuleFormData.append("ApplySeq", ApplySeq);
                if(Validation[0]){
                    RuleFormData.append("Rules", JSON.stringify(this.rules));
                }
                if(Validation[1]){
                    RuleFormData.append("NatRules", JSON.stringify(this.natRules));
                }

                applyApi.saveAppForm2(RuleFormData).then( (res) =>{
                    console.log(res);
                    if(res.status == 200){
                        // const ApplySeq = res.data[0][0].raw.insertId;
                        // console.log(ApplySeq);
                        location.href = `/app3/${ApplySeq}`;
                    }
                }).catch((err) =>{
                    console.log(err);
                });
            },
            checkCopyData(){
                const ApplySeq = this.$route.params.id
                applyApi.checkCopyData(ApplySeq).then( (res) => {
                    console.log(res);
                    if(res.data[1].length == 0){
                        this.addRule();    
                        this.isRuleForm = false;               
                    }else{
                        // 정책 값이 있으면
                        this.rules = res.data[1];
                        this.isRuleForm = true;
                    }

                    if(res.data[2].length == 0){
                        this.addNatRule();
                        this.isRuleForm = true;
                    }else{
                        // 나트 정책 값이 있으면
                        this.natRules = res.data[2];
                        this.isRuleForm = false;
                    }
                    this.apply = res.data[0];
                    this.confirms =res.data[0].CONFIRMS.filter((val) => val.CONFIRM_FLAG == 1);
                    this.cCs = res.data[0].CONFIRMS.filter((val) => val.CONFIRM_FLAG == 2);
                    
                }).catch( (err) =>{
                    console.log(err);
                });
            },
            checkFile (flag) {
                const Selector = flag == 1 ? document.querySelector('#ruleFileInput') : document.querySelector('#natRuleFileInput');
                Selector.click()
            },
            /**
             * flag 1: rule, 2: natRule
             */
            checkFileSure (flag) {
                const File = flag == 1 ? document.querySelector('#ruleFileInput').files[0] : document.querySelector('#natRuleFileInput').files[0];
                console.log(flag);
                const _this = this;
                // const Fd = new FormData;
                // Fd.append("Flag", flag);
                // Fd.append("File", File);
                // let fileData = new Blob([File]);
                // console.log(fileData);
                const Rules = [];
                const natRules = [];
                let FormFlag = true;

                checkExcelSignatrue(File, (result) => {
                    console.log(result);
                    const Signature = ['504b030414000600', 'D0CF11E0A1B11AE1'];
                    if(Signature.includes(result)){
                        const Excel = require('exceljs');
                        const Workbook = new Excel.Workbook();
                        Workbook.xlsx.load(File)
                            .then(function() {
                                const WorkSheet = Workbook.getWorksheet("Sheet1");
                                if(flag == 1){
                                    //rowNumber: 1부터 시작합니다.
                                    WorkSheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                                        // const CurrRow = WorkSheet.getRow(rowNumber);
                                        console.log(rowNumber);
                                        if(FormFlag){
                                            if(row.values.length != 8){
                                                alert("정확한 폼이 아니거나 빈 값이 있습니다.");
                                                FormFlag = false;
                                            }
                                        }if(FormFlag && rowNumber > 1){
                                            const RowValue = row.values;
                                            console.log(RowValue);
                                            // [null,1,"단방향","클라우드 운영\n(운영외부)\n( LB ) 172.90.27.112 ~ 113","클라우드 운영\n(운영외부)\n( LB ) 172.90.27.112 ~ 113","TCP : 22, 80, 443","영구","운영 플랫폼 관리 \nTCP 80, 443 MDM 접속 대외 서비스 "]
                                            const Service = [];
                                            RowValue[5].split("\n").reduce((acc, val) => {
                                                if(val.includes(':')){
                                                    const Splited = val.split(":");
                                                    const Prefix = Splited[0].trim();
                                                    const Ports = Splited[1].split(",");
                                                    Ports.forEach((value) => {
                                                        const Combined = Prefix+"_"+value.trim();
                                                        acc.push(Combined);
                                                    });
                                                }else{
                                                    const Ports = val.split(",");
                                                    Ports.forEach((value) => {
                                                        acc.push(value.trim());
                                                    });
                                                    
                                                }
                                                return acc;
                                            }, Service);
                                            const Rule = {
                                                        APPLY_SEQ: _this.$route.params.id,
                                                        REVERSE_FLAG: RowValue[2] == "양방향" ? 1 : 0,
                                                        SOURCE: RowValue[3].split("\n").join(','),
                                                        DESTINATION: RowValue[4].split("\n").join(','),
                                                        SERVICE: Service.join(','),
                                                        EXPIRATION_DATE: isValidatedDate(RowValue[6]) ? RowValue[6] : "",
                                                        DESCRIPTION: RowValue[7]
                                                    }

                                            Rules.push(Rule);
                                        }
            
                                    });
                                    console.log(Rules);
                                    if(FormFlag){
                                        _this.ruleExcelFileName = File.name;
                                        _this.ruleExcelData = Rules;
                                    }
                                }else{
                                    WorkSheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
                                        // const CurrRow = WorkSheet.getRow(rowNumber);
                                        console.log(row.values);
                                        // console.log(rowNumber);
                                        if(FormFlag && rowNumber > 1){
                                            if(row.values.length != 10){
                                                alert("정확한 폼이 아니거나 빈 값이 있습니다.");
                                                FormFlag = false;
                                            }
                                        }
                                        if(FormFlag && rowNumber > 2){
                                            const RowValue = row.values;
                                            console.log(RowValue);
                                            // [empty, 1, '단방향', '10.191.1.1\n10.191.1.2\n10.191.1.3\n10.191.1.4', '클라우드 운영\n(운영외부)\n( LB ) 172.90.27.112 ~ 113', 'TCP : 22, 80, 443', '10.191.1.5', '클라우드 운영\n(운영외부)\n( LB ) 172.90.27.112 ~ 113', '2020-11-11', '운영 플랫폼 관리 \nTCP 80, 443 MDM 접속 대외 서비스 ']
                                            const Service = [];
                                            RowValue[5].split("\n").reduce((acc, val) => {
                                                if(val.includes(':')){
                                                    const Splited = val.split(":");
                                                    const Prefix = Splited[0].trim();
                                                    const Ports = Splited[1].split(",");
                                                    Ports.forEach((value) => {
                                                        const Combined = Prefix+"_"+value.trim();
                                                        acc.push(Combined);
                                                    });
                                                }else{
                                                    const Ports = val.split(",");
                                                    Ports.forEach((value) => {
                                                        acc.push(value.trim());
                                                    });
                                                }

                                                return acc;
                                            }, Service);
                                            const natRule = { 
                                                        APPLY_SEQ: _this.$route.params.id,
                                                        REVERSE_FLAG: RowValue[2] == "양방향" ? 1 : 0,
                                                        SOURCE: RowValue[3].split("\n").join(','),
                                                        DESTINATION: RowValue[4].split("\n").join(','),
                                                        T_SOURCE: RowValue[6].split("\n").join(','),
                                                        T_DESTINATION: RowValue[7].split("\n").join(','),
                                                        SERVICE: Service.join(','),
                                                        EXPIRATION_DATE: isValidatedDate(RowValue[8]) ? RowValue[8] : "",
                                                        DESCRIPTION: RowValue[9]
                                                    }
                                            natRules.push(natRule);
                                        }
                                    });
                                    if(FormFlag){
                                        _this.natRuleExcelFileName = File.name;
                                        _this.natRuleExcelData = natRules;
                                    }
                                }
                                
                            });
                    }else{
                        alert("엑셀만 업로드 가능합니다( '.xls' or '.xlsx').");
                    }
                    
                })


                // applyApi.checkFileSignatureAndParse(Fd).then( (res) => {
                //     console.log(res);
                //     if(res.data){
                //         if(flag == 1){
                //             this.ruleExcelFileName = document.querySelector('#fileinput').files[0].name;
                //             this.ruleExcelFile.append(this.ruleExcelFileName, File);
                //         }else{
                //             this.natRuleExcelFileName = document.querySelector('#fileinput').files[0].name;
                //             this.natRuleExcelFile.append(this.natRuleExcelFileName, File);
                //         }
                        

                //     }else{
                //         alert("엑셀파일만 허용됩니다( '.xls' or '.xlsx').");
                //     }
                    
                // }).catch( (err) =>{
                //     console.log(err);
                // });

                console.log(File);
            },
            /**
             * flag 1: rule, 2: natRule
             */
            setParsedExcelData(flag){
                console.log(flag);
                const Data = flag == 1 ? this.ruleExcelData : this.natRuleExcelData;
                
                if(Data.length > 0){
                    if(flag == 1){
                        this.rules = Data;
                        this.ruleDialogFormVisible = false;
                    }else{
                        this.natRules = Data;
                        this.natRuleDialogFormVisible = false;
                    }
                }
                
            }
        },
        components: {
            AppHeader
        },
        computed: {
            
        },
        created(){
            this.checkCopyData();
        }
    }
</script>
