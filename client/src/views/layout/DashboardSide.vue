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
                            childrenDisplay: false,
                            children: [
                              {
                              path: "/ExamView",
                              title: "상세보기",
                              children: [],
                              },
                            ],
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
