<template>
  <Sidebar :menuList="menuList" :collapse="isCollapse" />
</template>

<script>
import Sidebar from "../layout/SideBar.vue";
import VueCookies from 'vue-cookies'

export default {
  name: "DashboardSide",
  components: {
    Sidebar,
  },
  data() {
    return {
      isCollapse: false,
      menuList: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    checkUserAuth(){
      const Auth = VueCookies.get("USER_AUTH");
      
      if(Auth === 'Y'){
        
        this.menuList = 
                  [
                    {
                      path: "/DashBoard",
                      title: "DashBoard",
                      children: [],
                    },
                    {
                      path: "",
                      title: "시험 관리",
                      children: [
                            {
                            path: "/ExamList",
                            title: "1. 시험등록 / 문제등록",
                            children: [],
                            },
                            {
                            path: "/ExamCheckList",
                            title: "2. 답안지등록 / 채점자 배정",
                            children: [],
                            },
                      ],
                    },
                    {
                      path: "/adminList",
                      title: "채점자 관리",
                      children: [],
                    },
                    {
                      path: "/userList",
                      title: "학생 관리",
                      children: [],
                    },
                    {
                      path: "/report",
                      title: "보고서",
                      children: [],
                    },
                  ]
      }else{
        this.menuList = [
                          {
                            path: "/DashBoard",
                            title: "DashBoard",
                            children: [],
                          },
                          {
                            path: "/app",
                            title: "방화벽 정책 신청",
                            children: [
                              {
                                path: "/app",
                                title: "정책 신청",
                                children: [],
                              },
                              {
                                path: "/myApp",
                                title: "정책신청관리",
                                children: [],
                              },
                              {
                                path: "/inbox",
                                title: "결재함",
                                children: [
                                  {
                                    path: "/inbox/unChked",
                                    title: "미결함",
                                    children: [],
                                  },
                                  {
                                    path: "/inbox/inProg",
                                    title: "진행함",
                                    children: [],
                                  },
                                  {
                                    path: "/inbox/comple",
                                    title: "완료함",
                                    children: [],
                                  },
                                ],
                              },
                              {
                                path: "/inbox/compleDept",
                                title: "부서완료함",
                                children: [],
                              },
                              {
                                path: "/inbox/cC",
                                title: "참조함",
                                children: [],
                              },
                            ],
                          },
                          {
                            path: "3",
                            title: "정책관리",
                            children: [
                              {
                                path: "3-1",
                                title: "정책현황",
                                children: [],
                              },
                              {
                                path: "3-2",
                                title: "장기미사용 정책현황",
                                children: [],
                              },
                              {
                                path: "3-3",
                                title: "정책내려받기",
                                children: [],
                              },
                              {
                                path: "3-4",
                                title: "NAT정책",
                                children: [],
                              },
                              {
                                path: "3-5",
                                title: "네트워크 객체",
                                children: [],
                              },
                              {
                                path: "3-6",
                                title: "사용자 객체",
                                children: [],
                              },
                              {
                                path: "3-7",
                                title: "어플리케이션 객체",
                                children: [],
                              },
                              {
                                path: "3-8",
                                title: "라우트",
                                children: [],
                              },
                              {
                                path: "3-9",
                                title: "ZONE",
                                children: [],
                              },
                              {
                                path: "3-10",
                                title: "MAP",
                                children: [],
                              },
                              {
                                path: "/flowChart",
                                title: "정책설계",
                                children: [],
                              },
                            ],
                          },
                          {
                            path: "4",
                            title: "정책모니터링",
                            children: [
                              {
                                path: "/interestPolicyWrite",
                                title: "관심 정책 등록",
                                children: [],
                              },
                              {
                                path: "/interestPolicy",
                                title: "관심 정책",
                                childrenDisplay : false,
                                children: [                                  
                                  {
                                    path: "/interestPolicyView",
                                    title: "관심정책 정보"
                                  }
                                  ],
                              },
                              {
                                path: "/vulnerabilityPolicy",
                                title: "취약 정책 관리",
                                children: [],
                              },
                            ],
                          },
                          {
                            path: "",
                            title: "설정",
                            children: [
                              {
                                path: "/user",
                                title: "사용자",
                                children: [
                                  {
                                    path: "/departList",
                                    title: "조직도 관리",
                                    children: [],
                                  },
                                  {
                                    path: "/userList",
                                    title: "사용자 관리",
                                    children: [],
                                  },
                                  {
                                    path: "/adminList",
                                    title: "관리자 관리",
                                    children: [],
                                  },
                                  {
                                    path: "/takeOverList",
                                    title: "이관신청 관리",
                                    children: [],
                                  },
                                ],
                              },
                              {
                                path: "5-2",
                                title: "정책제한 관리",
                                children: [
                                  {
                                    path: "/policySettingAdmin",
                                    title: "정책제한 사용자 관리",
                                    children: [],
                                  },
                                  {
                                    path: "/policySetting",
                                    title: "정책제한 설정",
                                    children: [],
                                  },
                                ],
                              },
                              {
                                path: "5-3",
                                title: "시스템 관리",
                                children: [
                                  {
                                    path: "/deviceList",
                                    title: "장비관리",
                                    children: [],
                                  },
                                  {
                                    path: "/smtpSetting",
                                    title: "SMTP 정보",
                                    children: [],
                                  },
                                  {
                                    path: "/mailformList",
                                    title: "메일폼 관리",
                                    children: [],
                                  },
                                ],
                              },
                              {
                                path: "5-4",
                                title: "개인 설정",
                                children: [
                                  {
                                    path: "/myInfo",
                                    title: "정보수정",
                                    children: [],
                                  },
                                  {
                                    path: "/confirmLine",
                                    title: "결재라인관리",
                                    children: [],
                                  },
                                  {
                                    path: "/ChangeApplyUser",
                                    title: "정책사용자 변경",
                                    children: [],
                                  },
                                ],
                              },
                            ],
                          },
                        ]
      }
      this.sendMenuVuex()
    },
    // 전체 메뉴 이름을 검색하기 위해 Store에 보관하는 함수
    sendMenuVuex(){
      this.$store.dispatch("setMenuList", this.menuList);
    },
    // 하위 메뉴까지 전체 탐색
  },
  created() {
    this.checkUserAuth()
  }
};
</script>

<style></style>
