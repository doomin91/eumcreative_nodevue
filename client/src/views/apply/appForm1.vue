<template>

  <div class="content">

    <div class="blockbase block-rounded">
      <div class="block-content">

        <!-- 상단 스텝바 -->
        <AppHeader :active="1" />
      </div>
    </div>

    <div class="blockbase block-rounded">
        <div class="block-header">
          <h3 class="block-title">신청서 작성</h3>
        </div>
        <div class="block-content">

          <table class="confirmTable">
          <colgroup>
            <col width="15%">
            <col width="35%">
            <col width="15%">
            <col width="35%">
          </colgroup>
          <tbody>
            <tr>
              <th>결재자</th>
              <td colspan="3">
                <div class="pt20 pl10"><el-button type="primary" @click="organisationDialogVisible(1)" size="small">결재자 등록</el-button></div>
                <div class="pt20 pb20"><app-confirm-line ref="appConfirm" :title="confirmTitle" :line="confirmLine"></app-confirm-line></div>
              </td>
            </tr>
            <tr>
              <th>참조자</th>
              <td colspan="3">
                <div class="pt20 pl10"><el-button type="primary" @click="organisationDialogVisible(2)" size="small">참조자 등록</el-button></div>
                <div class="pt20 pb20"><app-confirm-line ref="appCc" :title="ccTitle" :line="ccLine"></app-confirm-line></div>
              </td>
            </tr>
            <tr>
              <th>신청번호</th>
              <td>
                <el-input type="text" :value="this.apply.APPLY_NUMBER" readonly size="small" class="pl10" style="width:80%"></el-input>
                <el-button type="" @click="myAppliesDialogVisible" size="small" class="ml10">불러오기</el-button>
              </td>
              <th>신청일</th>
              <td><el-input type="text" :value="this.apply.APPLY_REG_DATE" readonly size="small"></el-input></td>
            </tr>

            <tr>
              <th>신청자</th>
              <td>
                <el-input type="text" :value="this.apply.APPLY_USER_NAME" readonly size="small" class="pl10"></el-input>
              </td>
              <th>신청부서</th>
              <td><el-input type="text" :value="this.apply.APPLY_USER_DEPARTMENT" readonly size="small"></el-input></td>
            </tr>

            <tr>
              <th>사유</th>
              <td colspan="3">
                <div class="apply_textarea pl10">
                  <el-input type="textarea" ref="applyTitle" v-model="apply.APPLY_TITLE" size="small"></el-input>
                </div>
              </td>
            </tr>

            <tr>
              <th>첨부파일</th>
              <td colspan="3">
                <el-upload
                  class="upload-demo pl10"
                  ref="upload"
                  action="#"
                  :on-change="handleChangeApplyFile"
                  :on-remove="handleRemoveApplyFile"
                  :auto-upload="false"
                  multiple
                  :file-list="applyFileList">
                  <el-button slot="trigger" size="small" type="">파일찾기</el-button>
                  <div class="el-upload__tip" slot="tip">정책신청에 필요한 관련 문서를 첨부하세요.</div>
                </el-upload>

              </td>
            </tr>

          </tbody>
        </table>


      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30">
          <!-- <el-button variant="primary" v-el-modal.delete-modal>삭제</el-button> -->
          <el-button type="success" @click="toAppForm2" size="small">다음</el-button>
        </el-col>
      </el-row>


        </div>
    </div>


    <el-dialog
      title="결재라인 추가"
      :visible.sync="organisationDialogVisibleFlag"
      width="50%" class="apply_dialogwrap">
    
      <el-row :gutter="10">

          <el-col :lg="10">
              <div class="AdminListDepartment">
                <el-scrollbar class="sidebar-scroll">
                  <Department 
                      ref="departComponent"
                      v-on:handleNodeClick="handleNodeClick" 
                    />
                </el-scrollbar>
              </div>
          </el-col>

          <el-col :lg="14">
            <div>
              <el-input placeholder="결재자 검색을 위한 검색 키워드를 입력하세요" @keyup.enter.native="dialogUserSearch" v-model="dialogUserSearchString" size="small" class="input-with-select">
                <el-button slot="append" @click="dialogUserSearch">검색</el-button>
              </el-input>
            </div>

              <el-table 
                :data="dialogUserData"
                ref="dialogUserData"
                size="small"
                style="width: 100%; cursor:pointer;"
                height="470"
                v-on:cell-click="userSelect($event)"
                >
                  <el-table-column label="사번" align="center" prop="USER_COMPANY_ID"></el-table-column>
                  <el-table-column label="이름" align="center" prop="USER_NAME"></el-table-column>
                  <el-table-column label="부서" align="center" prop="DEPART_INFO.DEPARTMENT"></el-table-column>
                  <el-table-column label="직책" align="center" prop="POSITION_INFO.CODE_NAME"></el-table-column>
              </el-table>
            
          </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
            <div class="mt20">
              <h4>결재자 라인</h4>
              <div class="confirmLine_cont">
                <ul ref="confirmLine">
                    <li v-for="user in confirmAndCcLineInModal" :key="user.CONFIRM_USER_SEQ">
                      <div class="confirmLine_box">
                        <div>{{user.CONFIRM_USER_NAME}}</div>
                        <div>{{user.CONFIRM_USER_DEPARTMENT}}</div>
                        <div>{{user.CONFIRM_USER_POSITION}}</div>
                        <el-button type="danger" icon="el-icon-close" circle @click="userDelete(user.CONFIRM_USER_SEQ)" class="pd0 confirmbox_del"></el-button>
                      </div>
                    </li>
                </ul>            
              </div>
            </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="organisationDialogVisible" size="small">취소</el-button>
        <el-button type="primary" @click="saveConfirmLine" size="small">저장</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="신청서 불러오기"
      :visible.sync="myAppliesDialogVisibleFlag"
      width="50%">
      <div slot="title" class="n_dialog_title">신청서 불러오기
        <p class="n_dialog_title_tip">본인이 작성한 완료된 신청서를 다시 불러와 동일한 내용으로 작성이 가능 합니다.</p>
      </div>
      <el-row>
        <el-col :span="24">

          <div>
            <el-input placeholder="완료된 신청서 검색을 위한 검색 키워드를 입력하세요" @keyup.enter.native="myAppliesSearch" v-model="myAppliesSearchString" size="small" class="input-with-select">
              <el-button slot="append" @click="myAppliesSearch">검색</el-button>
            </el-input>
          </div>

          <el-table 
            :data="pagedMyAppliesTableData"
            ref="myApplies"
            style="width: 100%"
            v-on:cell-click="applySelect($event)"
            >


            <el-table-column label="신청번호" width="200" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.APPLY_NUMBER }}</span>
              </template>
            </el-table-column>

            <el-table-column label="사유" align="center">

              <template slot-scope="scope">
                <el-popover
                  placement="bottom"
                  width="1000"
                  min-height="500"
                  trigger="hover">
                  <div id="ApplyPopDetailFrame">
                    <div v-if="scope.row.RULES.length > 0">
                      <div class="ApplyPopDetailFrame_Header"><h2>정책 상세보기</h2></div>
                      <table class="ApplyPopDetail">
                        <colgroup>
                          <col width="30%">
                          <col width="30%">
                          <col width="20%">
                          <col width="20%">
                        </colgroup>
                        <thead>
                          <tr>
                            <th>도착지</th>
                            <th>출발지</th>
                            <th>서비스</th>
                            <th>설명</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="rule in scope.row.RULES" :key="rule.RULE_SEQ">
                            <td>{{rule.SOURCE}}</td>
                            <td>{{rule.DESTINATION}}</td>
                            <td>{{rule.SERVICE}}</td>
                            <td>{{rule.DESCRIPTION}}</td>
                          </tr>
                        </tbody>
                      </table>  
                    </div>

                    <div v-if="scope.row.NAT_RULES.length > 0">
                      <div class="ApplyPopDetailFrame_Header"><h2>NAT 정책 상세보기</h2></div>
                      <table class="ApplyPopDetail">
                        <colgroup>
                          <col width="18%">
                          <col width="18%">
                          <col width="10%">
                          <col width="18%">
                          <col width="18%">
                          <col width="18%">
                        </colgroup>
                        <thead>
                          <tr>
                            <th colspan="3">변경 전</th>
                            <th colspan="4">변경 후</th>
                          </tr>
                          <tr>
                            <th>출발지</th>
                            <th>도착지</th>
                            <th>서비스</th>
                            <th>출발지</th>
                            <th>도착지</th>
                            <th>설명</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="nat_rule in scope.row.NAT_RULES" :key="nat_rule.RULE_SEQ">
                            <td>{{nat_rule.SOURCE}}</td>
                            <td>{{nat_rule.DESTINATION}}</td>
                            <td>{{nat_rule.SERVICE}}</td>
                            <td>{{nat_rule.T_SOURCE}}</td>
                            <td>{{nat_rule.T_DESTINATION}}</td>
                            <td>{{nat_rule.DESCRIPTION}}</td>
                          </tr>
                        </tbody>
                      </table>  
                    </div>
                    
                  </div>
                  <span slot="reference">{{ getWordCount(scope.row.APPLY_TITLE, 30, "...") }}</span>
                </el-popover>
                <span></span>
              </template>
            </el-table-column>

            <el-table-column label="신청자" width="180" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.APPLY_USER_NAME }} {{ scope.row.APPLY_USER_POSITION }}</span>
              </template>
            </el-table-column>
            <el-table-column label="신청일" width="120" align="center">
              <template slot-scope="scope">
                <span>{{ getWordCount(scope.row.APPLY_REG_DATE, 10, "") }}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination class="mt20" layout="prev, pager, next" :total="this.myApplies.length" @current-change="setPage" align="center" >
          </el-pagination>

        </el-col>

      </el-row>
      <!--
      <span slot="footer" class="dialog-footer">
        <el-button @click="myAppliesDialogVisible" size="small">취소</el-button>
      </span>
    -->

    </el-dialog>

  </div>
</template>

<style>
  #ApplyPopDetailFrame{
    width: 100%;
  }

  .ApplyPopDetail {
    width: 100%;
    border: solid 1px;
  }

  .ApplyPopDetail thead tr th{
    text-align: center;
  }

  .ApplyPopDetail tbody td{
    border: solid 1px;
  }

</style>

<script>
import AppHeader from "/src/views/apply/components/ApplyHedaer.vue";
import AppConfirmLine from "/src/views/apply/components/ApplyConfirmLine.vue";
import Department from '../../components/Department' // eslint-disable-line no-unused-vars
import * as applyApi from "@/api/apply"; // eslint-disable-line no-unused-vars
import * as companyApi from "@/api/company"; // eslint-disable-line no-unused-vars
import {getCurrentDate} from "@/lib/common";
import {getWordCount} from "@/lib/apply";

export default {
    data() {
      return {
        title: "신청서 작성",
        value: 33,

        confirmTitle: "결재자",
        confirmLine: [],
        ccTitle: "참조자",
        ccLine: [],

        apply: {
          USER_SEQ: "",
          COPY_APPLY_SEQ: "",
          APPLY_NUMBER: "",
          APPLY_TITLE: "",
          APPLY_STATUS: 0,
          APPLY_REG_DATE: "",
          APPLY_USER_NAME: "",
          APPLY_USER_POSITION: "",
          APPLY_USER_POSITION_SEQ: "",
          APPLY_USER_DEPARTMENT: "",
          APPLY_USER_DEPARTMENT_SEQ: "",
        },

        applyFormData: new FormData(),
        applyFileList: [],

        organisationDialogVisibleFlag: false,
        dialogUserSearchString: "",
        dialogUserData: [],
        confirmAndCcLineInModal: [],
        organisationDialogFlag: 0,

        myAppliesDialogVisibleFlag: false,
        myApplies: [],
        myAppliesSearchString: "",
        /* paging start */
        pageSize: 10,
        page: 1,
        /* paging end */


      
      };
    },
    methods: {
      handleChangeApplyFile(file, fileList){
        const IsExist = fileList.filter((_file) => _file.name == file.name);
        if(IsExist.length > 1){
            this.$message.warning('파일이 이미 존재합니다.');
            console.log(fileList);
            const FileLastIndex = fileList.length-1;
            fileList.splice(FileLastIndex, 1);
            console.log(fileList);
            this.applyFileList = fileList;
        }else{
            const IsLt2M = file.size / 1024 / 1024 < 10;

            if (!IsLt2M) {
                this.$message.error('파일 사이즈는 10메가를 넘을 수 없습니다.');
                const FileLastIndex = fileList.length-1;
                fileList.splice(FileLastIndex, 1);
                this.applyFileList = fileList;
            }else{
                this.applyFileList = fileList;
                this.applyFormData.append(file.name, file.raw);
            }
        }

    //     console.log(file);
        console.log(this.applyFileList);

      },
      handleRemoveApplyFile(file){
        // const FileIndex = this.applyFileList.findIndex( (_file) => _file.name == file.name);
        // console.log(FileIndex);
        this.applyFormData.delete(file.name);
      },
      getWordCount(str, wordCout, dot){
          return getWordCount(str,wordCout, dot);
      },
      setPage (val) {
        this.page = val
      },
      myAppliesDialogVisible(){
        if(this.myAppliesDialogVisibleFlag == false){
          this.myAppliesDialogVisibleFlag = true;
          this.getMyApp("");
          // this.confirmLine.forEach((val) =>{
          //   this.confirmLineInModal.push(val);
          // })
        }else{
          this.myAppliesDialogVisibleFlag = false;
        }
      },
      applySelect(e){
        console.log(e);
        const SelectedApplySEQ = e.APPLY_SEQ;

        // const CopyData = { "APPLY_SEQ": SelectedApplySEQ};

        applyApi.getApplyCopyData(SelectedApplySEQ)
                                    .then(res => {
                                      console.log(res);
                                      const CopyApply = res.data;
                                      this.apply.COPY_APPLY_SEQ = CopyApply.APPLY_SEQ;
                                      this.apply.APPLY_TITLE = CopyApply.APPLY_TITLE;
                                      this.confirmLine = CopyApply.CONFIRMS;
                                      console.log(this.apply);
                                      console.log(this.confirmLine);
                                      this.myAppliesDialogVisible();
                                    })
                                    .catch(error =>{
                                      console.log(error);
                                    })
      },
      myAppliesSearch(){
        this.myApplies = [];

        const SearchOptions = {
          searchString: this.myAppliesSearchString
        }

        this.getMyApp(SearchOptions);
        
      },
      organisationDialogVisible(flag){
        this.organisationDialogFlag = flag;
        this.confirmAndCcLineInModal = [];
        if(this.organisationDialogVisibleFlag == false){
          this.organisationDialogVisibleFlag = true;
          console.log(this.confirmLine);

          if(flag === 1){
            this.confirmLine.forEach((val) =>{
              this.confirmAndCcLineInModal.push(val);
            })
          }else{
            this.ccLine.forEach((val) =>{
              this.confirmAndCcLineInModal.push(val);
            })
          }
          
        }else{
          this.organisationDialogVisibleFlag = false;
        }
        
      },
      userSelect(e){
        if(this.userCheck(e)){
          alert("이미 결재라인에 포함되어 있습니다.");
          return false;
        }
        if(this.confirmAndCcLineInModal.length == 5){
          alert("결재자는 5명까지 가능합니다.");
          return false;
        }
        
        const Confirm = {
          "CONFIRM_USER_SEQ": e.USER_SEQ,
          "CONFIRM_USER_NAME": e.USER_NAME,
          "CONFIRM_USER_DEPARTMENT": e.DEPART_INFO.DEPARTMENT,
          "CONFIRM_USER_DEPARTMENT_SEQ": e.DEPART_INFO.DEPARTMENT_SEQ,
          "CONFIRM_USER_POSITION": e.POSITION_INFO.CODE_NAME,
          "CONFIRM_USER_POSITION_SEQ": e.POSITION_INFO.CODE_SEQ,
        };
        this.confirmAndCcLineInModal.push(Confirm);
        console.log(this.confirmAndCcLineInModal);
      },
      userDelete(userSeq){
        console.log(userSeq);
        const NewConfirmLineInModal = this.confirmAndCcLineInModal.filter((line) => line.CONFIRM_USER_SEQ != userSeq );
        console.log(NewConfirmLineInModal);
        this.confirmAndCcLineInModal = NewConfirmLineInModal;
      },
      userCheck(user){
        const Result = this.confirmAndCcLineInModal.reduce((acc, cur) =>{
          acc.push(cur.CONFIRM_USER_SEQ);
          return acc;
        }, []).includes(user.USER_SEQ);

        return Result;
      },
      saveConfirmLine(){
        if(this.organisationDialogFlag === 1){
          this.confirmLine = [];
          this.confirmAndCcLineInModal.forEach((val) =>{
            this.confirmLine.push(val);
          })
        }else{
          this.ccLine = [];
          this.confirmAndCcLineInModal.forEach((val) =>{
            this.ccLine.push(val);
          })
        }
        
        this.organisationDialogVisible();
      },
      handleNodeClick(item){
        console.log(item);
        let data = {
          departSeq : item.id
        }
        companyApi.getUsersInDepart(data)
        .then(res => {
          this.dialogUserData = res.data
        })
        .catch(error => {
          console.log(error);
        });
      },
      dialogUserSearch(){
        let data = {
          searchString : this.dialogUserSearchString
        }
        this.dialogUserData = [];
        companyApi.searchAdmin(data)
              .then(res => {
                this.dialogUserData = res.data
              })
              .catch(error =>{
                console.log(error);
              })
      },
      
      checkValidation(){
        if(this.$refs.applyTitle.value === ""){
          return false;
        }

        return true;
      },
      getMyApp(searchOptions) {
        this.myApplies = [];
        let SearchOptions;
        if(searchOptions === ""){
          SearchOptions = {};
        }else{
          SearchOptions = searchOptions;
        }

        console.log(SearchOptions);

        applyApi.getMyApplies(SearchOptions).then((res) => {
          this.myApplies = [];
          if (res.status == 200) {
            console.log(res);
            const MyApplies = res.data;
            MyApplies.forEach((val) => {
              this.myApplies.push(val);
            });

          } else {
              alert(
              "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
              );
          }
        });
      },
      toAppForm2(){
        if(!this.checkValidation()){
          alert("사유를 입력해주세요.");
          return false;
        }
        const ConfirmLine = this.getCurrentConfirmLine();
        console.log(ConfirmLine);
        const CcLine = this.getCurrentCcLine();
        console.log(CcLine);
        this.apply.APPLY_TITLE = this.$refs.applyTitle.value;
        this.apply.APPLY_REG_DATE = getCurrentDate("Y-m-d H:i:s");
        
        this.applyFormData.append("ConfirmLine", JSON.stringify(ConfirmLine));
        this.applyFormData.append("CcLine", JSON.stringify(CcLine));
        this.applyFormData.append("Apply", JSON.stringify(this.apply));
        
        applyApi.saveAppForm(this.applyFormData).then( (res) =>{
          console.log(res);
          if(res.status == 200){
            const ApplySeq = res.data.raw.insertId;
            console.log(ApplySeq);
            location.href = `/app2/${ApplySeq}`;
          }
        }).catch((err) =>{
          console.log(err);
        });
        
      },
      getCurrentConfirmLine(){
        return this.$refs.appConfirm.getLine();
      },
      getCurrentCcLine(){
        return this.$refs.appCc.getLine();
      },
      uploadApplyFile(){
        console.log("TEST");
        if( 0 < this.$refs.selectedFile.files.length){
          const Files = this.$refs.selectedFile.files;
          // console.log(Files);
          [...Files].forEach( (file, index) => {
            // console.log(file);
            // const path = process.cwd() + "/install.txt";

            // let fileExt = file.name.substring(
            //   file.name.lastIndexOf(".") + 1
            // )
            // if(["jpeg", "png", "gif", "bmp"].includes(fileExt)){
            //   // 확장자 체크
            // }
            if(file.size <= 10485760){
              // 1메가 넘는지 체크
              // const Reader = new FileReader();
              // Reader.onload = e => {
              //   console.log(e);
              //   // this.appFiles.push(e.target.result);

              // }
              // Reader.readAsDataURL(file);
              // this.appFileNames.push(file.name);
              this.applyFormData.append("AppFile"+index, file);
              this.appFileNames.push(file.name);
            }else{
              alert("파일이 10메가를 넘을 수 없습니다.");
            }
          })
          console.log(this.applyFormData);
        }else{
          // 파일은 선택 X

        }
      }
    },
    components: {
      AppHeader,
      AppConfirmLine,
      Department,
    },
    computed: {
        getApplyNumber() {
            return "APPLY" + getCurrentDate("YmdHis");
        },
        getApplyDate() {
            return getCurrentDate("yyyymmdd");
        },
        pagedMyAppliesTableData() {
            return this.myApplies.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
        }
    },
    created() {
        this.apply.APPLY_NUMBER = this.getApplyNumber;
        this.apply.APPLY_REG_DATE = this.getApplyDate;

        applyApi.getCurrentUserInfo().then((res) => {
          console.log(res);
          console.log(res);
          if (res.status == 200) {
              const User = res.data;
              const Depart = res.data.DEPART_INFO;
              const Position = res.data.POSITION_INFO;
              this.apply.USER_SEQ = User.USER_SEQ;
              this.apply.APPLY_USER_NAME = User.USER_NAME;
              this.apply.APPLY_USER_DEPARTMENT = Depart.DEPARTMENT;
              this.apply.APPLY_USER_DEPARTMENT_SEQ = Depart.DEPARTMENT_SEQ;
              this.apply.APPLY_USER_POSITION = Position.CODE_NAME;
              this.apply.APPLY_USER_POSITION_SEQ = Position.CODE_SEQ;
              // console.log(res);
              // console.log("TELKJLKSDFJKLSJDA");
          } else {
              alert(
              "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
              );
          }
        });

        applyApi.getLatestConfirmLine(1).then((res) => {
          console.log(res);
          if (res.status == 200) {
            if(Object.keys(res.data).length != 0){
              const Confirms = res.data;
              Confirms.reduce((acc, cur, i) => {
                const Line = {
                  "CONFIRM_FLAG": 1,
                  "CONFIRM_ORDER": i+1,
                  "CONFIRM_STATUS": "W",
                  "CONFIRM_USER_SEQ": cur.CONFIRM_USER_SEQ,
                  "CONFIRM_USER_NAME": cur.CONFIRM_USER_NAME,
                  "CONFIRM_USER_POSITION": cur.CONFIRM_USER_POSITION,
                  "CONFIRM_USER_POSITION_SEQ": cur.CONFIRM_USER_POSITION_SEQ,
                  "CONFIRM_USER_DEPARTMENT": cur.CONFIRM_USER_DEPARTMENT,
                  "CONFIRM_USER_DEPARTMENT_SEQ": cur.CONFIRM_USER_DEPARTMENT_SEQ,
                }
                acc.push(Line);
                return acc;
              }, this.confirmLine)
              console.log("Confirm Line : ");
              console.log(this.confirmLine);
            }
          } else {
            alert(
            "서버와 통신하는 도중 문제가 발생했습니다. \n 관리자에게 문의해주세요."
            );
          }
        });
    },
};
</script>
