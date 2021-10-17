"use strict";

import * as settingApi from '@/api/setting'; // eslint-disable-line no-unused-vars

/**
 * 신청서 상태 반환
 * @param {int} flag  -1: 반려, 0: 신청서 처음 제출, 1: 정책까지 제출, 2: 신청서 제출, 3: 1명이라고 결재 해서 결재중, 4: 결재 완료 및 작업 결재 대기, 5: 작업 결재 신청 제출, 6: 작업 결재 1명이라도 해서 결재 중, 7: 작업 결재 완료 및 작업 대기, 8: 작업 완료
 * @returns 
 */
 export function getApplyStatus (flag){
    let Status;
    
    if(flag == 0 || flag == 1){
        Status = "작성중";
    }else if (flag == 2){
        Status = "결재전";
    }else if (flag == 3){
        Status = "결재중";
    }else if (flag == 4){
        Status = "결재완료";
    }else if (flag == 5){
        Status = "작업결재전";
    }else if (flag == 6){
        Status = "작업결재중";
    }else if (flag == 7){
        Status = "작업중";
    }else if (flag == 8){
        Status = "작업완료";
    }else if (flag == -1){
        Status = "반려";
    }

    return Status;
}

/**
 * 신청서 상태 반환
 * @param {int} flag  -1: 반려, 0: 신청서 처음 제출, 1: 정책까지 제출, 2: 신청서 제출, 3: 1명이라고 결재 해서 결재중, 4: 결재 완료 및 작업 결재 대기, 5: 작업 결재 신청 제출, 6: 작업 결재 1명이라도 해서 결재 중, 7: 작업 결재 완료 및 작업 대기, 8: 작업 완료
 * @returns 
 */
 export function getApplyStatusType (flag){
    let Type;
    
    if(flag == 0 || flag == 1){
        Type = "success";
    }else if (flag == 2){
        Type = "primary2";
    }else if (flag == 3){
        Type = "success";
    }else if (flag == 4){
        Type = "primary";
    }else if (flag == 5){
        Type = "info";
    }else if (flag == 6){
        Type = "info";
    }else if (flag == 7){
        Type = "danger";
    }else if (flag == 8){
        Type = "primary";
    }else if (flag == -1){
        Type = "danger2";
    }

    return Type;
}

/**
 * 신청서 작업 구분
 * @param {int} flag
 * @returns 
 */
 export function getApplyWorkType (flag){
    let Status = "";
    if(flag == 1){
        Status = "사용자 서버간 통신";
    }else if (flag == 2){
        Status = "서버간 통신";
    }else if (flag == 3){
        Status = "대외계";
    }else if (flag == 4){
        Status = "대고객";
    }
    return Status;
}

/**
 * 신청서 타이틀 자르기
 * @param {String} str      :   글
 * @param {int} wordCount   :   원하는 글자 수
 * @param {String} dot    :   끝에 .
 * @returns 
 */
export function getWordCount (str, wordCount, dot){
    // console.log(str);
    if(str){
        if(str.length <= wordCount){
            return str;
        }else{
            return str.substring(0, wordCount)+dot;
        }
    }
    
    
}

/**
 * 
 * @param {String} date (2021-09-16T11:26:48.000Z) format
 */
export function iSoToDate(date){
    if(date){
        const Splited = date.split("T");
        return Splited[0]+" "+Splited[1].split(".")[0];
    }
}

/**
 * 스트링 replace
 * @param {String} str 스트링에서
 * @param {String} from 무엇을
 * @param {String} to 이걸로 바꾼다
 */
export function replaceStr(str, from, to){
    return str.replaceAll(from, to);
}

/**
 * 
 * @param {File} file 
 * @param {Function} callback 
 */
export function checkExcelSignatrue(file, callback){
    const FReader  = new FileReader();

    FReader.onload = ((e) => {
        const FileArray = new Int8Array(e.target.result);
        console.log(FileArray);
        let Signature = numHex(FileArray[0])+numHex(FileArray[1])+numHex(FileArray[2])+numHex(FileArray[3])
                        +numHex(FileArray[4])+numHex(FileArray[5])+numHex(FileArray[6])+numHex(FileArray[7]);
        callback(Signature);
    });

    if (file) {
        FReader.readAsArrayBuffer(file);
    }
}

/**
 * 
 * @param {String} $service 
 * @returns 
 */
export function isValidatedDate(date){
    const datePattern = /[1-2][0-9]{3}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])/;

    if(date.match(datePattern)){
        return true;
    }else{
        return false;
    }
}

function numHex(num){
    let hex = num.toString(16);
    if ((hex.length % 2) > 0) {
        hex = "0" + hex;
    }
    return hex;
}

/**
 * 
 * @param {Object} apply_info 신청서 정보
 */
export function sendMail(apply_info){ // eslint-disable-line no-unused-vars
    let SmtpInfo;
    console.log(apply_info);

    try{
        settingApi.getSmtpInfo()
            .then(res => {
                // console.log("SMPT");
                // console.log(res);
            
                SmtpInfo = {
                    apply_info: apply_info,
                    // status: apply_info.APPLY_STATUS,
                    enable: res.data.SMTP_USER_FLAG,
                    authenticate: res.data.SMTP_AUTH_FLAG,
                    tls: res.data.SMTP_TLS_FLAG,
                    host: res.data.SMTP_HOST,
                    port: res.data.SMTP_PORT,
                    user: res.data.SMTP_USER,
                    password: res.data.SMTP_PASS,
                    protocol: res.data.SMTP_PROTOCOL,
                    receiver: res.data.SMTP_MAIL_ADDR
                };
                console.log(SmtpInfo);

                settingApi.sendMail(SmtpInfo)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
        
        }).catch(err => {
            console.log(err);
            return err;
        })
    }catch(err){
        console.log(err);
        return err;
    }
}

/**
 * 
 * @param {Array} rules (object array)
 * object : { SOURCE, DESTINATION, SERVICE, EXPIRATION_DATE, DESCRIPTION }
 */
export function checkRuleForm(rules){
    const validation = {};
    const ruleKeys =  [["SOURCE", "출발지"], ["DESTINATION", "도착지"], ["SERVICE", "서비스"], ["EXPIRATION_DATE", "정책종료일"]];
    rules.forEach( (rule, rowIndex) => {
        ruleKeys.forEach( (val) => {
            // console.log("------------");
            // console.log(rule[val[0]]);
            // console.log("------------");
            if((rule[val[0]] === null || rule[val[0]].trim() === "")){
                validation[val[0]+rowIndex] = true;
                // push([rowIndex, val]);
            }else{
                validation[val[0]+rowIndex] = false;
            }
        })
    })

    console.log(validation);

    return validation;
    
}

/**
 * 
 * @param {Array} natRules (object array)
 * object : { SOURCE, DESTINATION, SERVICE, T_SOURCE, T_DESTINATION, EXPIRATION_DATE, DESCRIPTION }
 */
 export function checkNatRuleForm(natRules){
    const validation = {};
    const natRuleKeys =  [["SOURCE", "변경 전 출발지"], ["DESTINATION", "변경 전 도착지"], ["SERVICE", "서비스"], ["T_SOURCE", "변경 후 출발지"], ["T_DESTINATION", "변경 후 도착지"], ["EXPIRATION_DATE", "정책종료일"]];
    natRules.forEach( (natRule, rowIndex) => {
        natRuleKeys.forEach( (val) => {
            if((natRule[val[0]] === null || natRule[val[0]].trim() === "")){
                validation[val[0]+rowIndex] = true;
                // push([rowIndex, val]);
            }else{
                validation[val[0]+rowIndex] = false;
            }
        })
    })

    return validation;
}