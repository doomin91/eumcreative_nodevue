
<template>
<div class="contents">
  <div class="breadcrumb-container">
      <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
      <div class="block-header">
        <h3 class="block-title">관심정책 정보</h3>
      </div>
      <div class="block-content">
      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName"  :span="4">관심정책</el-col>
        <el-col :span="20">{{ interestPolicyForm.IP_TITLE }}</el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName"  :span="4">장비</el-col>
        <el-col :span="20"> {{ interestPolicyForm.DEVICE_ID }}</el-col>
      </el-row>
      
      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">정책</el-col>
        <el-col :span="20">
          <el-table :data="polices">
            <el-table-column label="정책번호" prop="policy_number"></el-table-column>
            <el-table-column label="정책이름" prop="policy_name"></el-table-column>
            <el-table-column label="출발지 Interface" prop="from"></el-table-column>
            <el-table-column label="출발지">
              <template slot-scope="scope">
                <p v-for="item in scope.row.source" :key="item.source">{{item.address}}</p>
              </template>
            </el-table-column>
            <el-table-column label="목적지 Interface" prop="to"></el-table-column>
            <el-table-column label="목적지">
              <template slot-scope="scope">
                <p v-for="item in scope.row.destination" :key="item.destination">{{item.address}}</p>
              </template>
            </el-table-column>
            <el-table-column label="서비스">
              <template slot-scope="scope">
                <p v-for="item in scope.row.service" :key="item.service">{{item}}</p>
              </template>
            </el-table-column>
          </el-table>
          </el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">상태</el-col>
        <el-col :span="20">
          <el-tag effect="dark" type="success" size="mini" v-if="interestPolicyForm.IP_STATUS == 'Y'">수집중</el-tag>
          <el-tag effect="dark" type="danger" size="mini"  v-if="interestPolicyForm.IP_STATUS == 'N'">정지</el-tag>
        </el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">정보 수집기간</el-col>
        <el-col :span="8">{{makeDateForm(interestPolicyForm.START_DATETIME)}} - {{makeDateForm(interestPolicyForm.END_DATETIME)}}
        </el-col>
        <el-col align="right"  class="pd10 pr30 TableLeftName" :span="4">수신 메일</el-col>
        <el-col :span="8">{{interestPolicyForm.ALERT_MAIL}}</el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">신청내용</el-col>
        <el-col :span="20">{{interestPolicyForm.IP_CONTENT}}</el-col>
      </el-row>

      <el-row class="mb20 pw20">
          <el-col align="right">
            <el-button @click="goBack()" size="small">뒤로가기</el-button>
            <el-button type="danger" @click="deleteInterestPolicy" size="small">삭제</el-button>
            <el-button type="primary" v-if="interestPolicyForm.IP_STATUS == 'Y'" @click="stopCollecting" size="small">수집정지</el-button>
            <el-button type="primary" v-if="interestPolicyForm.IP_STATUS == 'N'" @click="restartCollecting" size="small">수집재시작</el-button>
          </el-col>
      </el-row>
      </div>

  </div>

<div class="blockbase block-rounded">
      <div class="block-content">
        <el-table :data="policySummary">
          <el-table-column label="날짜"></el-table-column>
          <el-table-column label="정책번호"></el-table-column>
          <el-table-column label="allowCount"></el-table-column>
          <el-table-column label="sendByte"></el-table-column>
          <el-table-column label="recvByte"></el-table-column>
          <el-table-column label="denyCount"></el-table-column>
          <el-table-column label="sendByte"></el-table-column>
          <el-table-column label="recvByte"></el-table-column>
        </el-table>

      </div>
  </div>

</div>
</template>


<script>
  import * as collectApi from '@/api/collect';
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        ipSeq: this.$route.query.policySeq,
        devices: [],
        polices: [],
        policySummary: [],
        interestPolicyForm: {
          IP_TITLE: "",
          IP_CONTENT: "",
          DEVICE_ID: "",
          POLICY_DATA: [],
          START_DATETIME: "",
          END_DATETIME: "",
          ALERT_MAIL: ""
        }
      }
    },
    components: {
      Breadcrumb
    },
    methods: {
      makeDateForm(date){
        return makeDateForm(date);
      },
      goBack(){
        this.$router.go(-1);
      },
      deleteInterestPolicy(){
        console.log("delete");
      },
      stopCollecting(){
        console.log(this.interestPolicyForm);
      },
      restartCollecting(){
      },
      getDataLoad(){
        collectApi.getInterestPolicy(this.ipSeq)
        .then(res => {
          const policy = JSON.parse(res.data.POLICY_DATA);
          console.log(policy);
          policy.forEach(element => {
            this.polices.push(element);
          })
          this.interestPolicyForm = res.data;
        })
      }

    },
    created() {      
      this.getDataLoad();
    }
  }
</script>