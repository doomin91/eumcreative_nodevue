<template>
  <div class="contents">


    <el-row>
      <el-col>

        <div class="ErrorContent pt50">
          <div class="ErrorBox">
            <h3>{{startDate}} - {{endDate}}</h3>
            <h2>서비스 점검 중입니다.</h2>
            <el-button type="primary" size="lage" @click="dashboard">DashBoard</el-button>
        
          </div>

        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  name: "ready",
  data() {
    return {
      startDate:"2021-08-09",
      endDate:"2021-09-09"
    };
  }
};
</script>

