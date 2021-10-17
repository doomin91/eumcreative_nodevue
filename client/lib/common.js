"use strict";
import * as common from '@/lib/common'
import { Date } from 'core-js';
/* eslint-disable no-unused-vars */


export  function makeDateForm (strDate, sap="-"){
    strDate = new Date(strDate)
    var year = strDate.getFullYear();              //yyyy
    var month = (1 + strDate.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = strDate.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + sap + month + sap + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능

}

export function getCurrentDate(form){
    const Now = new Date();
    const Y = Now.getFullYear();
    const MO = Now.getMonth() + 1;
    const OMO = MO >= 10 ? MO : "0" + MO;
    const D = Now.getDate();
    const OD = D >= 10 ? D : "0" + D;
    const H = Now.getHours();
    const M = Now.getMinutes();
    const S = Now.getSeconds();
    let date;
    if (form == "YmdHis") {
        date = Y + OMO + OD + H + M + S;
    } else if (form == "yyyymmdd") {
        date = Y + "-" + OMO + "-" + OD;
    } else if (form == "Y-m-d H:i:s"){
        date = Y + "-" + OMO + "-" + OD + " " + H + ":" + M + ":" + S;
    }
    return date;
}

export function getExtension(fileName){
    const fileLength = fileName.length;
    const lastDot = fileName.lastIndexOf('.');
    const fileExtension = fileName.substring(lastDot+1, fileLength);

    return fileExtension;
}

export function updateArrayDate (arrayData, DataKeyName){
    for(var i=0; i <arrayData .length; i++ )
    {
        arrayData[i].NOTE_REG_DATE = common.makeDateForm(arrayData[i].NOTE_REG_DATE, ".");
        arrayData[i].NOTE_WORK_DATE = common.makeDateForm(arrayData[i].NOTE_WORK_DATE, ".");
    }

    var data = arrayData;
    return data;
}

export function createExcel (data){
    console.log(data);
    const Excel = require('exceljs');
    const Workbook = new Excel.Workbook();
    const worksheet = Workbook.addWorksheet('sheet', {
        pageSetup:{paperSize: 9, orientation:'landscape'}
    });
    worksheet.columns = [
        {
            header:"순서",
            key:"order",
            width:10
        },
        {
            header:"출발지(IP)",
            key:"source",
            width:10
        },
        {
            header:"사용포트",
            key:"port",
            width:10
        },
        {
            header:"구분",
            key:"category",
            width:10
        },
        {
            header:"도착지(IP)",
            key:"destination",
            width:10
        },
        {
            header:"서비스내용",
            key:"serviceName",
            width:10
        },
        {
            header:"적용기간",
            key:"period",
            width:10
        },
        {
            header:"운영개발",
            key:"operation",
            width:10
        },
        {
            header:"비고",
            key:"etc",
            width:10
        }
    ]

    data.forEach(element => {
        worksheet.addRow({
            order: '',
            source: element.source,
            port: element.service,
            category: element.policy_name,
            destination: element.destination,
            serviceName: '',
            period: '',
            operation: '',
            etc: ''
        })
    })
    
    const buffer = Workbook.xlsx.writeBuffer();
    return buffer;
}