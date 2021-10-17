
<template>
<div class="contents">
  <div class="breadcrumb-container">
      <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
      <div class="block-header">
        <h3 class="block-title">정책 상세보기</h3>
      </div>
      <div class="block-content">

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">장비</el-col>
        {{device}}
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">정책</el-col>
        <el-col :span="20">
          <el-table :data="policy">
            <el-table-column label="출발지 Interface" prop="from"></el-table-column>
            <el-table-column label="목적지 Interface" prop="to"></el-table-column>
            <el-table-column label="출발지" prop="source"></el-table-column>
            <el-table-column label="목적지" prop="destination"></el-table-column>
            <el-table-column label="서비스" prop="service"></el-table-column>
          </el-table>
          </el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30 TableLeftName" :span="4">로그 수집 상태</el-col>
        <el-col :span="20">
        </el-col>
      </el-row>

      <el-row class="mb20 pw20">
          <el-col align="right">
            <el-button @click="goBack()" size="small">뒤로가기</el-button>
          </el-col>
      </el-row>
      </div>

  </div>

<div class="blockbase block-rounded">
    <div class="block-header">
        <h3 class="block-title">관련 정책 </h3> 
      </div>
      <div class="block-content">
            
        internal -> external

        <el-table>
            <el-table-column label="정책번호" prop="policy_number"></el-table-column>
            <el-table-column label="정책이름" prop="policy_name"></el-table-column>
            <el-table-column label="출발지">
            </el-table-column>
            <el-table-column label="목적지">
            </el-table-column>
            <el-table-column label="서비스">
            </el-table-column>
        </el-table>
    </div>
  </div>

</div>
</template>


<script>
  import * as collectApi from '@/api/collect';
  import * as settingApi from '@/api/setting';
  import { makeDateForm } from '@/lib/common';
  import Breadcrumb from '../../components/Breadcrumb/index'

  export default {
    data() {
      return {
        policy: [],
        devices: [],
        device: ""
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
        getDeviceLoad() {
          settingApi.getDeviceList()
          .then(res =>{
            // console.log(res);
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

          this.devices.forEach(item => {
          if(item.value == this.$route.query.deviceId){
            this.device = item;
          }
        })
      },
      getDataLoad(){
        collectApi.getPolicy(this.$route.query.deviceId, this.$route.query.policyNumber)
            .then(res => {
                if(res.data.code == 200){
                    const policy = res.data.data.policy;
                    this.policy = policy;
                }
            })
      }
    },
    created() {
        this.getDeviceLoad();
        this.getDataLoad();
    }
  }
</script>
