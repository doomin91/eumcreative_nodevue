<template>
<div class="contents">

<div class="breadcrumb-container">
    <breadcrumb id="breadcrumb-container" />
</div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">정책설계 
            <el-button type="primary" size="mini" @click="flowChartFlag = true">export / import</el-button>
          </h3>
        </div>

        <div class="block-content">
          <FlowChart />
        </div>
    </div>

    <el-dialog 
        title="FLOWCHART UPLOAD"
        :visible.sync="flowChartFlag"
        width="40%"
        >
      <el-form v-model="flowChartForm">
        <el-form-item label="JSON 형식" :label-width="formLabelWidth">
            <el-button type="success" class="ml15" @click="exportFlowChart">백업파일 다운로드</el-button>

        </el-form-item>
        <el-form-item label="첨부파일" :label-width="formLabelWidth">
            <div class="apply_filebox">
                <el-button icon="el-icon-document-copy" type="primary" size="small" class="ml15" @click="checkFile">파일첨부</el-button>
                <span class="ml15">{{fileName}}</span>
                <input type="file" id="fileinput" style="display:none;" @change="checkFileSure" />
                <p class="ml15">* 백업받은 .json 파일 형식을 업로드해주세요.</p>
            </div>
        </el-form-item>
    </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="flowChartFlag = false">취소</el-button>
            <el-button type="primary" @click="importFlowChart()">적용하기</el-button>
        </span>
    </el-dialog>




</div>
</template>

<script>

  import FlowChart from '../../components/FlowChart'
  import Breadcrumb from '../../components/Breadcrumb/index'
  import * as policyManagerApi from "@/api/policy_manager";
  import * as common from "@/lib/common";

  export default {
    data() {
      return{
        flowChartFlag: false,
        file: "",
        flowChartForm: [],
        formLabelWidth: '100px',
        fileName:'',

      }
    },
    components: {
      FlowChart,
      Breadcrumb
    },
    methods: {
      exportFlowChart(){
        policyManagerApi.exportFlowChart()
          .then(res => {
            const now = common.getCurrentDate("YmdHis");
            const newName = 'withflow_backup_' + now;
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
              const blob = res.data 
              window.navigator.msSaveOrOpenBlob(blob, newName)
            } else {
            const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] })) 
            const link = document.createElement('a') 
            link.href = url 
            link.setAttribute('download', newName);
            document.body.appendChild(link) 
            link.click();
            }
          })
      },
      importFlowChart(){
          const file = document.querySelector('#fileinput').files[0];
          if(file.type != "application/json"){
            this.$message({
              type:"error",
              message:"잘못된 파일형식입니다."
            })
            return false;
          }
          
          const reader = new FileReader();
          reader.onload = (progressEvent) => {
            policyManagerApi.importFlowChart(progressEvent.target.result)
                .then(res => {
                  console.log(res.data);
                  if(res.data.code == 200){
                    alert(res.data.msg);
                    this.flowChartFlag = false;
                    location.reload();
                  } else {
                    alert(res.data.msg);
                  }
                })
          }
          reader.readAsText(file);
      },
      checkFile () {
          document.querySelector('#fileinput').click()
      },
      checkFileSure () {
          console.log(document.querySelector('#fileinput').files[0])
          this.fileName = document.querySelector('#fileinput').files[0].name
      },
      getDataLoad() {
      },
    },
    created() {
      this.getDataLoad();
    }
    
  }
</script>