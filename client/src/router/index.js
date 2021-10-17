import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'
import Vuelidate from 'vuelidate';
import store from '../store';

import * as applyApi from "@/api/apply"; // eslint-disable-line no-unused-vars

/* layout component*/
import Login from '../views/login/Login';


import ExamList from '../views/exam/examList'
import ExamCheckList from '../views/exam/examCheckList'

/* 정책 관리 */
import PolicyStatus from '../views/policyManager/policyStatus';
import PolicyStatusView from '../views/policyManager/policyStatusView';

import PolicyUnusedStatus from '../views/policyManager/policyUnusedStatus';
import PolicyUnusedStatusView from '../views/policyManager/policyUnusedStatusView';

import PolicyDown from '../views/policyManager/policyDown';
import NatPolicy from '../views/policyManager/natPolicy';
import NetworkObject from '../views/policyManager/networkObject';
import ServiceObject from '../views/policyManager/serviceObject';
import UserObject from '../views/policyManager/userObject';
import AppObject from '../views/policyManager/appObject';
import Routes from '../views/policyManager/routes';
import Zone from '../views/policyManager/zone';
import Map from '../views/policyManager/map';
import FlowChart from '../views/policyManager/flowChart';

/* 정책 모니터링 */
import InterestPolicyWrite from '../views/monitoring/interestPolicyWrite';
import InterestPolicy from '../views/monitoring/interestPolicy';
import InterestPolicyView from '../views/monitoring/interestPolicyView';
import VulnerabilityPolicy from '../views/monitoring/vulnerabilityPolicy';

/* 설정 */
import DepartList from '../views/setting/departList';

/* 사용자 관리 */
import UserList from '../views/setting/userList';
import UserDetail from '../views/setting/userDetail';
import UserRegist from '../views/setting/userRegist';

/* 관리자 관리 */
import AdminList from '../views/setting/adminList';

/* 정책이관관리 */
import TakeOverList from '../views/setting/takeOverList';
import TakeOverView from '../views/setting/takeOverView';

/* 정책제한관리 */
import policySettingAdmin from '../views/setting/policySettingAdmin';
import policySetting from '../views/setting/policySetting';

/* 시스템 관리 */
import serverList from '../views/setting/serverList';
import deviceList from '../views/setting/deviceList';
import deviceView from '../views/setting/deviceView';
import smtpSetting from '../views/setting/smtpSetting';
import mailformList from '../views/setting/mailformList';
import mailformView from '../views/setting/mailformView';
import myInfo from '../views/setting/myInfo';
import confirmLine from '../views/setting/confirmLine';
import changeApplyUser from '../views/setting/changeApplyUser';

/* component test */
import VueChartJS from '../views/pages/VueChartJS';

import NotFound from '../views/pages/404';
import Forbidden from '../views/pages/403';
import ready from '../views/pages/ready';

/* Dashbaord */
import Dashboard from '../views/dashboard/index';

Vue.use(VueRouter);
Vue.use(Vuelidate);

const router = new VueRouter({
    mode: "history",
    linkActiveClass: 'active',
    routes:[
        {
            path:"/Login", //경로
            name:"Login", //해당 경로의 이름 
            component:Login, //이동할 컴포넌트
            meta: { layout : 'BlankLayout'}
        },
        {
            path:"/ExamList", //경로
            name:"ExamList", //해당 경로의 이름 
            component:ExamList, //이동할 컴포넌트
            meta: { authRequired: true, active: "/examList"}
        },
        {
            path:"/ExamCheckList", //경로
            name:"ExamCheckList", //해당 경로의 이름 
            component:ExamCheckList, //이동할 컴포넌트
            meta: { authRequired: true, active: "/examCheckList"}
        },
        {
            path:"/policyStatus",
            name:"policyStatus",
            component:PolicyStatus,
            meta: { authRequired: true, active: "/policyStatus"}
        },
        {
            path:"/policyStatusView",
            name:"policyStatusView",
            component:PolicyStatusView,
            meta: { authRequired: true, active: "/policyStatus"}
        },
        {
            path:"/policyUnusedStatus",
            name:"policyUnusedStatus",
            component:PolicyUnusedStatus,
            meta: { authRequired: true, active: "/policyUnusedStatus"}
        },
        {
            path:"/policyUnusedStatusView",
            name:"policyUnusedStatusView",
            component:PolicyUnusedStatusView,
            meta: { authRequired: true, active: "/policyUnusedStatus"}
        },
        {
            path:"/policyDown",
            name:"policyDown",
            component:PolicyDown,
            meta: { authRequired: true, active: "/policyDown"}
        },
        {
            path:"/natPolicy",
            name:"natPolicy",
            component:NatPolicy,
            meta: { authRequired: true, active: "/natPolicy"}
        },
        {
            path:"/networkObject",
            name:"networkObject",
            component:NetworkObject,
            meta: { authRequired: true, active: "/networkObject"}
        },
        {
            path:"/serviceObject",
            name:"serviceObject",
            component:ServiceObject,
            meta: { authRequired: true, active: "/serviceObject"}
        },
        {
            path:"/userObject",
            name:"userObject",
            component:UserObject,
            meta: { authRequired: true, active: "/userObject"}
        },
        {
            path:"/appObject",
            name:"appObject",
            component:AppObject,
            meta: { authRequired: true, active: "/appObject"}
        },
        {
            path:"/routes",
            name:"routes",
            component:Routes,
            meta: { authRequired: true, active: "/routes"}
        },
        {
            path:"/zone",
            name:"zone",
            component:Zone,
            meta: { authRequired: true, active: "/zone"}
        },
        {
            path:"/map",
            name:"map",
            component:Map,
            meta: { authRequired: true, active: "/map"}
        },
        {
            path:"/flowChart", //경로
            name:"FlowChart", //해당 경로의 이름 
            component: FlowChart, //이동할 컴포넌트
            meta: { authRequired: true, active: "/flowChart" }
        },
        
        /************************ 정책모니터링 ************************/

        {
            path:"/interestPolicyWrite",
            name:"interestPolicyWrite",
            component:InterestPolicyWrite,
            meta: { authRequired : true, active: "/interestPolicyWrite" }
        },
        {
            path:"/interestPolicy",
            name:"interestPolicy",
            component:InterestPolicy,
            meta: { authRequired : true, active: "/interestPolicy" }
        },
        {
            path:"/interestPolicyView",
            name:"interestPolicyView",
            component:InterestPolicyView,
            meta: { authRequired : true, active: "/interestPolicyView" }
        },
        {
            path:"/vulnerabilityPolicy",
            name:"vulnerabilityPolicy",
            component:VulnerabilityPolicy,
            meta: { authRequired : true, active: "/vulnerabilityPolicy" }
        },

        /************************ 설정 ************************/

        {
            path:"/departList", //경로
            name:"departList", //해당 경로의 이름 
            component:DepartList, //이동할 컴포넌트
            meta: { authRequired : true, active: "/departList" }
        },
        {
            path:"/userList", //경로
            name:"userList", //해당 경로의 이름 
            component:UserList, //이동할 컴포넌트
            meta: { authRequired : true, active: "/userList" }

        },
        {
            path:"/userDetail", //경로
            name:"userDetail", //해당 경로의 이름 
            component:UserDetail, //이동할 컴포넌트
            meta: { authRequired : true, active: "/userList" }

        },
        {
            path:"/userRegist", //경로
            name:"userRegist", //해당 경로의 이름 
            component:UserRegist, //이동할 컴포넌트
            meta: { authRequired : true, active: "/userList" }

        },
        {
            path:"/adminList",
            name:"adminList",
            component:AdminList,
            meta: { authRequired : true, active: "/adminList" }
        },
        {
            path:"/takeOverList",
            name:"takeOverList",
            component:TakeOverList,
            meta: { authRequired : true, active: "/takeOverList" }
        },
        {
            path:"/takeOverView",
            name:"takeOverView",
            component:TakeOverView,
            meta: { authRequired : true, active: "/takeOverList" }
        },
        {
            path:"/policySettingAdmin",
            name:"policySettingAdmin",
            component:policySettingAdmin,
            meta: { authRequired : true, active: "/policySettingAdmin" }
        },
        {
            path:"/policySetting",
            name:"policySetting",
            component:policySetting,
            meta: { authRequired : true, active: "/policySetting" }
        },
        {
            path:"/serverList",
            name:"serverList",
            component:serverList,
            meta: { authRequired : true, active: "/serverList" }
        },
        {
            path:"/deviceList",
            name:"deviceList",
            component:deviceList,
            meta: { authRequired : true, active: "/deviceList" }
        },
        {
            path:"/deviceView",
            name:"deviceView",
            component:deviceView,
            meta: { authRequired : true, active: "/deviceList"  }
        },
        {
            path:"/smtpSetting",
            name:"smtpSetting",
            component:smtpSetting,
            meta: { authRequired : true, active: "/smtpSetting" }
        },
        {
            path:"/mailformList",
            name:"mailformList",
            component:mailformList,
            meta: { authRequired : true, active: "/mailformList" }
        },
        {
            path:"/mailformView",
            name:"mailformView",
            component:mailformView,
            meta: { authRequired : true, active: "/mailformList" }
        },
        {
            path:"/myInfo",
            name:"myInfo",
            component:myInfo,
            meta: { authRequired : true, active: "/myInfo" }
        },
        {
            path:"/confirmLine",
            name:"confirmLine",
            component:confirmLine,
            meta: { authRequired : true, active: "/confirmLine" }
        },
        {
            path:"/changeApplyUser",
            name:"changeApplyUser",
            component:changeApplyUser,
            meta: { authRequired : true, active: "/ChangeApplyUser"}
        },

        /************************ component test ************************/
        {
            path:"/VueChartJS",
            name:"VueChartJS",
            component:VueChartJS,
        },
        {
            path:"/404",
            name:"404",
            component:NotFound,
            meta: { layout : 'BlankLayout'}
        },
        {
            path:"/403",
            name:"403",
            component:Forbidden,
            meta: { layout : 'BlankLayout'}
        },
        {
            path:"/ready",
            name:"ready",
            component:ready,
            meta: { layout : 'BlankLayout'}
        },


        /************************ Dashboard ************************/
        {
            path:"/DashBoard",
            name:"Dashboard",
            component:Dashboard,
            meta: { authRequired : true, active : "/DashBoard" }
        },
    ],
    
    scrollBehavior: (to, from ,savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return { selector: to.hash };
      }
      return { x: 0, y: 0 };
    }
});
    router.beforeEach((to, from, next) => {

    // Vuex를 통한 Layout 관리에 필요한 부분
    // key를 통해 컴퍼넌트 리렌더링을 진행한다.
    // View/App.vue 와 연동된 부분
    store.state.layout = to.meta.layout || "DefaultLayout";

    // 라우팅 이동할 때마다 AccessToken을 갱신한다.
    const savedToken = VueCookies.get('accessToken')
    if(to.path.toLowerCase() != "/login"){
        if (VueCookies.get('accessToken')) {
            store.dispatch('signinByToken', savedToken).then(res =>{
                if(res==false){
                    Vue.$cookies.keys().forEach(cookie => Vue.$cookies.remove(cookie));
                    location.href="/Login";
                }
            })
        } else {
            location.href="/Login";
            return
        }
    // 로그인 되어 있는 경우 로그인창 접근 불가
    }else if(to.path.toLowerCase() == "/login" && VueCookies.get("accessToken")){
        next({
            path: '/DashBoard'
        })
    }

    if(to.meta.possessionAuthRequired){
        // console.log(from.meta.isOwned)
        const Seq = to.params.id;
        if(from.meta.isOwned === "private"){
            next();
        }else{
            applyApi.getApply(Seq)
                    .then((res) => {
                        const UserSeq = res.data.USER_SEQ;
                        // const Status = res.data.APPLY_STATUS;
                        const IsDel = res.data.APPLY_DEL_YN;
                        console.log(res);

                        if(to.name == "appView"){
                            if(VueCookies.get("USER_AUTH") == 'Y' || VueCookies.get("USER_SEQ") == UserSeq){
                                if(IsDel === 'Y'){
                                    alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                    next({ path: `${from.path}` });
                                }else{
                                    next();
                                }
                            }else{
                                alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                next({ path: `${from.path}` }); 
                            }
                        }else if (to.name == "inboxView"){
                            if(to.params.type == "unChked"){
                                console.log("unChked")
                                const IsIncludes = res.data.CONFIRMS.filter( (confirm) => [1,3,5].includes(confirm.CONFIRM_FLAG)).find((confirm) => confirm.CONFIRM_USER_SEQ == VueCookies.get("USER_SEQ") && confirm.CONFIRM_STATUS == 'W' );
                                if(VueCookies.get("USER_AUTH") == 'Y'){
                                    
                                    if(res.data.APPLY_STATUS == 4 || IsIncludes){
                                        if(IsDel === 'Y'){
                                            alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                            next({ path: `${from.path}` });
                                        }else{
                                            next();
                                        }
                                    }else{
                                        alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` }); 
                                    }
                                }else{
                                    if(IsIncludes){
                                        if(IsDel === 'Y'){
                                            alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                            next({ path: `${from.path}` });
                                        }else{
                                            next();
                                        }
                                    }else{
                                        alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` }); 
                                    }
                                }
                                
                            }else if(to.params.type == "inProg"){
                                console.log("inProg")
                                if(VueCookies.get("USER_AUTH") == 'Y'){
                                    if([2,3,5,6].includes(res.data.APPLY_STATUS)){
                                        const IsMine = res.data.USER_SEQ == VueCookies.get("USER_SEQ");
                                        const IsIncludes = res.data.CONFIRMS.filter( (confirm) => [1,3,5].includes(confirm.CONFIRM_FLAG)).find((confirm) => confirm.CONFIRM_USER_SEQ == VueCookies.get("USER_SEQ") && confirm.CONFIRM_STATUS == 'C' );
                                        console.log(IsMine);
                                        console.log(IsIncludes);
                                        if(IsMine || IsIncludes){
                                            if(IsDel === 'Y'){
                                                alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                                next({ path: `${from.path}` });
                                            }else{
                                                next();
                                            }
                                        }else{
                                            alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                            next({ path: `${from.path}` }); 
                                        }
                                    }else{
                                        alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` }); 
                                    }
                                }else{
                                    if(1 < res.data.APPLY_STATUS < 8 ){
                                        const IsMine = res.data.USER_SEQ == VueCookies.get("USER_SEQ");
                                        const IsIncludes = res.data.CONFIRMS.filter( (confirm) => [1,3,5].includes(confirm.CONFIRM_FLAG)).find((confirm) => confirm.CONFIRM_USER_SEQ == VueCookies.get("USER_SEQ") && confirm.CONFIRM_STATUS == 'C' );
    
                                        if(IsMine || IsIncludes){
                                            if(IsDel === 'Y'){
                                                alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                                next({ path: `${from.path}` });
                                            }else{
                                                next();
                                            }
                                        }else{
                                            alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                            next({ path: `${from.path}` }); 
                                        }
                                    }else{
                                        alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` }); 
                                    }
                                }
                                
                            }else if(to.params.type == "comple"){
                                console.log("comple")
                                if(res.data.APPLY_STATUS == 8){
                                    const IsMine = res.data.USER_SEQ == VueCookies.get("USER_SEQ");
                                    const IsIncludes = res.data.CONFIRMS.filter( (confirm) => [1,3,5].includes(confirm.CONFIRM_FLAG)).find((confirm) => confirm.CONFIRM_USER_SEQ == VueCookies.get("USER_SEQ"));

                                    if(IsMine || IsIncludes){
                                        if(IsDel === 'Y'){
                                            alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                            next({ path: `${from.path}` });
                                        }else{
                                            next();
                                        }
                                    }else{
                                        alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` }); 
                                    }
                                }else{
                                    alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                    next({ path: `${from.path}` }); 
                                }
                            }else if(to.params.type == "wrk"){
                                console.log("wrk")
                                if(VueCookies.get("USER_AUTH") == 'Y' && res.data.APPLY_STATUS == 7){
                                    if(IsDel === 'Y'){
                                        alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` });
                                    }else{
                                        next();
                                    }
                                }else{
                                    console.log("3");
                                    alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                    next({ path: `${from.path}` }); 
                                }
                            }else if(to.params.type == "complWrk"){
                                console.log("complWrk")
                                if(VueCookies.get("USER_AUTH") == 'Y' && res.data.APPLY_STATUS == 8){
                                    if(IsDel === 'Y'){
                                        alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` });
                                    }else{
                                        next();
                                    }
                                }else{
                                    console.log("3");
                                    alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                    next({ path: `${from.path}` }); 
                                }
                            }else if(to.params.type == "compleDept"){
                                console.log("compleDept")
                                const FLAG = res.data.APPLY_USER_DEPARTMENT_SEQ == VueCookies.get("USER_DEPARTMENT_SEQ");
                                if(FLAG){
                                    if(IsDel === 'Y'){
                                        alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` });
                                    }else{
                                        next();
                                    }
                                }else{
                                    console.log("3");
                                    alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                    next({ path: `${from.path}` }); 
                                }
                            }else if(to.params.type == "cC"){
                                console.log("cC");
                                const FLAG = res.data.CONFIRMS.filter( (confirm) => [2,4,6].includes(confirm.CONFIRM_FLAG)).find((confirm) => confirm.CONFIRM_USER_SEQ == VueCookies.get("USER_SEQ"));
                                if(FLAG){
                                    if(IsDel === 'Y'){
                                        alert("이미 삭제됐거나, 접근할 수 없는 상태입니다.");
                                        next({ path: `${from.path}` });
                                    }else{
                                        next();
                                    }
                                }else{
                                    console.log("3");
                                    alert("잘못된 접근이거나, 접근할 수 없는 상태입니다.");
                                    next({ path: `${from.path}` }); 
                                }
                            }
                        }

                        

                        
                    });
        }

       
        
    }

    // 로그인이 필요한 페이지
    if(to.meta.authRequired) {
        if (VueCookies.get("accessToken") == '' || !VueCookies.isKey("accessToken")) {
            location.href="/Login";
            return
        } else {
            next()
        }

    // 접근 권한이 필요한 페이지 접근 시
    }else if(to.meta.adminRequired){
        if(VueCookies.get("accessToken") == '' || !VueCookies.isKey("accessToken") || VueCookies.get("USER_AUTH") === 'N'){
            next({
                path: '/403'
            })
            // alert("접근 권한이 없습니다.");
            // next({
            //     path: `${from.fullPath}`,
            // })
        }else{
            next();
        }
    }else if(to.path == "/"){
        // 루트 링크로 접근 시 세션에 따른 분기점 Login , DashBoard
        if(VueCookies.get("accessToken") == '' || !VueCookies.isKey("accessToken")){
            location.href="/Login";
        } else {
            next({
                path: '/DashBoard'
            })
        }
    //라우팅에 등록되어 있지 않는 링크로 접속 시
    }else if(to.name == "" || to.name == null){
        next({
            path: "/404",
        })
    }else{
        next()
    }
  })



export default router;
