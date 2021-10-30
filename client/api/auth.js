"use strict";
import http from './http';
// import VueCookies from 'vue-cookies'

export async function login(userid, userpwd){
  return http.post('/token/login/', {userid, userpwd})
    .then(res =>{
      console.log(res);
    })
}


// export async function login(userid, userpwd){
//   return http.post('/auth/Login', {userid, userpwd}).then( async function(returnData){
//         // console.log(returnData);
//         if(returnData.data.code == "200"){
//             VueCookies.set("AccessKey", returnData.data.result.access_token);
//             return getUserInfo().then( async function(returnData){
//               // console.log("USER_ID : "+returnData.data.data.USER_ID);
//               // console.log("USER_NAME : "+returnData.data.data.USER_NAME);
//               VueCookies.set("USER_SEQ", returnData.data.data.USERSEQ);
//               VueCookies.set("USER_ID", returnData.data.data.USER_ID);
//               VueCookies.set("USER_NAME", returnData.data.data.USER_NAME);
//               VueCookies.set("USER_DEPARTMENT_SEQ", returnData.data.data.USER_DEPARTMENT);
//               return returnData;
//             });
//         }else{
//             return returnData.data
//         }

        
//     })
// }

// const getUserInfo = function (){
//       const headers = {
//         'Content-Type': 'application/json;charset=utf-8'
//       };
    
//       if(VueCookies.get("AccessKey") !== '') {
//         headers['access-token'] = VueCookies.get("AccessKey");
//       }

//       const data ="";
//       return http.post("/auth/getUserInfo", data, {headers}).then(function(returnData){
      
//       return returnData;
//     });

// }