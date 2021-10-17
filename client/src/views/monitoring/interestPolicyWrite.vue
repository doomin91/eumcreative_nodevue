
<template>
<div class="contents">
  
  <div class="breadcrumb-container">
    <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
      <div class="block-header">
        <h3 class="block-title">정책등록</h3>
      </div>
      <div class="block-content">
      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30"  :span="4">관심정책 제목</el-col>
        <el-col :span="20"><el-input v-model="interestPolicyForm.IP_TITLE" type="text" size="small"></el-input></el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30"  :span="4">장비</el-col>
        <el-col :span="20"><el-select v-model="interestPolicyForm.DEVICE_ID" v-on:change="changeEvent($event)" size="small">
                            <el-option v-for="item in devices" :label="item.label" :value="item.value" :key="item.value"></el-option>
                          </el-select></el-col>
      </el-row>
      
      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30" :span="4">정책</el-col>
        <el-col :span="20">
          <el-button type="primary" size="small" @click="showPolices">선택</el-button>
          <el-table 
            v-if="selectedPolicy.length > 0"
            :data="selectedPolicy"
            @row-click="unselectPolicy"
            max-height="300">
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
        <el-col align="right" class="pd10 pr30" :span="4">정보 수집기간</el-col>
        <el-col :span="8">
          <el-date-picker type="date" v-model="interestPolicyForm.START_DATETIME" placeholder="시작날짜"></el-date-picker> ~ 
          <el-date-picker type="date" v-model="interestPolicyForm.END_DATETIME" placeholder="종료날짜"></el-date-picker>
        </el-col>
        <el-col align="right"  class="pd10 pr30" :span="4">수신 메일</el-col>
        <el-col :span="8"><el-input v-model="interestPolicyForm.ALERT_MAIL"></el-input></el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30" :span="4">신청내용</el-col>
        <el-col :span="20"><el-input v-model="interestPolicyForm.IP_CONTENT" type="textarea" class="interesttextarea"></el-input></el-col>
      </el-row>

      <el-row class="mb20 pw20">
          <el-col align="right">
            <el-button type="primary" size="small" @click="saveInterestPolicy">저장</el-button>
          </el-col>
      </el-row>

      </div>

      <el-dialog
          :visible.sync ="viewPolicyModal"
          title="등록된 정책선택">
          <el-table
            :data="polices"
            @row-click="selectPolicy"
            max-height="500">
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
          <span slot="footer" class="dialog-footer">
            <el-button @click="viewPolicyModal = false">취소</el-button>
          </span>
        </el-dialog>

  </div>
</div>
</template>

<script>
  import * as settingApi from '@/api/setting';
  import * as collectApi from '@/api/collect';
import Breadcrumb from '../../components/Breadcrumb/index'


  export default {
    data() {
      return {
        devices: [],
        polices: [],
        selectedPolicy: [],
        viewPolicyModal: false,
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
      showPolices(){
        if(this.interestPolicyForm.DEVICE_ID){
          this.polices = []
          let deviceId = this.interestPolicyForm.DEVICE_ID;
          collectApi.getPolices(deviceId)
            .then(res => {
              const policy = res.data.data.policy;
              policy.forEach(element => {
                this.polices.push(element);
                // console.log(element);
              })
              this.viewPolicyModal = true;
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          this.$message({
            type:"warning",
            message:"장비를 선택해주세요."
          })
        }
      },
      saveInterestPolicy(){
        collectApi.setInterestPolicy(this.interestPolicyForm)
          .then(res => {
              this.$router.push({path:"/interestPolicyView", query:{policySeq: res.data.raw.insertId}})
          })
          .catch(err => {
            console.log(err);
          })
      },
      changeEvent(event){
        this.selectedPolicy = [];
        this.interestPolicyForm.POLICY_DATA = [];
        console.log(event);
      },
      selectPolicy(item){
        let overLapCheck = false;
        this.selectedPolicy.forEach(element => {
          if(element.policy_number == item.policy_number){
            overLapCheck = true
          }
        })
        if(overLapCheck){
          this.$message({
            type:"warning",
            message:"이미 선택된 정책입니다."
          });
          return false;
        }

        this.interestPolicyForm.POLICY_DATA.push(item);
        this.selectedPolicy.push(item);
        this.viewPolicyModal = false;
      },
      unselectPolicy(item){
        console.log(item);
      },
      getDeviceLoad() {
          settingApi.getDeviceList()
          .then(res =>{
            console.log(res);
            if(res.status == 200){
              const devices = res.data;
              devices.forEach(element => {
                let data = {
                  label: element.DEVICE_NAME,
                  value: element.DEVICE_SEQ
                }
                this.devices.push(data);
              })
            }else{
              this.$message({ 
                type:"error",
                message:"방화벽 정보를 불러오는데 실패했습니다."
              })
            }
          })
      },
      getDataLoad(){
        settingApi.getDeviceList()
        .then(res => {
          console.log(res);
          res.data.forEach(element => {
            this.devices.push(element);
          })
        })
      }

    },
    created() {  
      this.getDeviceLoad();    
      // this.getDataLoad();
    }
  }
</script>