
<template>
<div class="content">
  <div class="breadcrumb-container">
      <breadcrumb id="breadcrumb-container" />
  </div>

  <div class="blockbase block-rounded">
      <div class="block-header">
        <h3 class="block-title">사용자 관리 수정</h3>
      </div>
      <div class="block-content">
      <el-row class="mb20 pw20 pb20 line_h32">
          <el-col :span="12">
            <el-row>
              <el-col :span="3">아이디</el-col>
              <el-col :span="20">
                <el-input v-model="$v.form.id.$model" ref="id" clearable readonly size="small"></el-input>
                  <p v-if="!$v.form.id.required && $v.form.id.$dirty" class="bs-danger bs-op07">아이디를 입력해주세요.</p>
                  <p v-if="!$v.form.id.alphaNum" class="bs-danger bs-op07">아이디는 숫자 또는 알파벳으로 구성되어야 합니다.</p>
                  <p v-if="!$v.form.id.minLength" class="bs-danger bs-op07">아이디는 최소 {{ $v.form.id.$params.minLength.min }} 글자로 구성되어야 합니다.</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
            <el-col :span="3">이름</el-col> 
            <el-col :span="20">
              <el-input v-model="$v.form.name.$model" ref="name" clearable size="small"></el-input>
              <p v-if="!$v.form.name.required && $v.form.name.$dirty" class="bs-danger bs-op07">이름을 입력해주세요.</p>
              <p v-if="!$v.form.name.minLength" class="bs-danger bs-op07">이름은 최소 {{ $v.form.name.$params.minLength.min }} 글자로 구성되어야 합니다.</p>
            </el-col>
            </el-row>
          </el-col>
      </el-row>


      <el-row class="mb20 pw20 pb20 line_h32">
          <el-col :span="12">
            <el-row>
              <el-col :span="3">비밀번호</el-col>
              <el-col :span="20">
                <el-input v-model="$v.form.password.$model" ref="password" show-password size="small"></el-input>
                <p v-if="!$v.form.password.required && $v.form.password.$dirty" class="bs-danger bs-op07">비밀번호를 입력해주세요.</p>
                <p v-if="!$v.form.password.minLength" class="bs-danger bs-op07">비밀번호는 최소 {{ $v.form.password.$params.minLength.min }} 글자로 구성되어야 합니다.</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
            <el-col :span="3">비밀번호 확인</el-col> 
            <el-col :span="20">
              <el-input v-model="$v.form.repeatPassword.$model" ref="repeatPassword" show-password size="small"></el-input>
              <p v-if="!$v.form.repeatPassword.required && $v.form.repeatPassword.$dirty" class="bs-danger bs-op07">비밀번호 확인을 입력해주세요.</p>
              <p v-if="!$v.form.repeatPassword.sameAsPassword && $v.form.repeatPassword.$dirty && $v.form.repeatPassword.required" class="bs-danger bs-op07">비밀번호가 다릅니다.</p>
            </el-col>
            </el-row>
          </el-col>
      </el-row>


      <el-row class="mb20 pw20 pb20 line_h32">
          <el-col :span="12">
            <el-row>
              <el-col :span="3">연락처</el-col>
              <el-col :span="20">
                <el-input v-model="$v.form.phone.$model" ref="phone" clearable size="small"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
            <el-col :span="3">이메일</el-col> 
            <el-col :span="20">
              <el-input v-model="$v.form.email.$model" ref="email" clearable size="small"></el-input>
              <p v-if="!$v.form.email.required && $v.form.email.$dirty" class="bs-danger bs-op07 ">이메일을 입력해주세요.</p>
              <p v-if="!$v.form.email.email && $v.form.email.$dirty" class="bs-danger bs-op07">이메일 형식이 아닙니다.</p>
            </el-col>
            </el-row>
          </el-col>
      </el-row>

      <el-row class="mb20 pw20 pb20 line_h32">
          <el-col :span="12">
            <el-row>
              <el-col :span="3">부서</el-col>
              <el-col :span="20" class="UserListForm">
                <el-select v-model="$v.form.department.$model" ref="department" size="small">
                  <el-option v-for="item in departments"
                              :key="item.value"
                              :label="item.text"
                              :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row> 
              <el-col :span="3">직책</el-col> 
              <el-col :span="20">
                <el-select v-model="$v.form.position.$model" ref="position" size="small">
                  <el-option v-for="item in positions"
                            :key="item.value"
                            :label="item.text"
                            :value="item.value"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
      </el-row>

      <el-row class="mb20 pw20">
        <el-col align="right" class="pd10 pr30">
          <!-- <el-button variant="primary" v-el-modal.delete-modal>삭제</el-button> -->
          <el-button type="success" size="small" @click="user_save">저장</el-button>
        </el-col>
      </el-row>


      </div>
  </div>
</div>

</template>

<style>
  .UserListForm .el-input {
    width:220px !important;
  }
</style>

<script>
  import md5 from 'js-md5';
  import * as companyApi from '@/api/company';
  import Breadcrumb from '../../components/Breadcrumb/index'
  import {
    validationMixin
  } from "vuelidate";
  import {
    required,
    minLength,
    sameAs,
    alphaNum,
    email
  } from "vuelidate/lib/validators";

  export default {
    mixins: [validationMixin],
    data() {
      return {
        userSeq: this.$cookies.get('USER_SEQ'),
        departments: [],
        positions: [],
        status: [
          { value: 0, text: "재직중" },
          { value: 1, text: "휴직중" },
          { value: 2, text: "퇴직" }
        ],
        form: {
          id: null,
          name: null,
          password: null,
          repeatPassword: null,
          email: null,
          phone: null,
          department: null,
          position: null,
          status: null,
          companyId: null,
          ruleAuth: null
        },
      }
    },
    /**
     * Vuelidate Form config
     */
    validations: {
      form: {
        id: {
          required,
          alphaNum,
          minLength: minLength(3)
        },
        name: {
          required,
          minLength: minLength(2)
        },
        password: {
          required,
          minLength: minLength(8)
        },
        repeatPassword: {
          required,
          sameAsPassword: sameAs('password')
        },
        phone: {
        },
        email: {
          required,
          email
        },
        department: {
          required
        },
        position: {
          required
        },
        status: {
          required
        },
        companyId: {
          required
        },
        ruleAuth: {
          required
        }
      },
    },
    components: {
      Breadcrumb
    },
    /**
     * config end
     */
    methods: {
      validateState(name) {
        const {
          $dirty,
          $error
        } = this.$v.form[name];
        return $dirty ? !$error : null;
      },
      back() {
        this.$router.go(-1);
        // this.$router.push({path:'/userList'});
      },
      user_delete(){
          const data = {
              "USER_SEQ" : this.userSeq
          }
          companyApi.deleteUser(data)
          .then ( res => {
            console.log(res);
            this.$router.go(-1);
          })
      },
      validate(){
        if (this.$v.$invalid) {
          // 1. Loop the keys
          for (let key in Object.keys(this.$v.form)) {
            // 2. Extract the input
            const input = Object.keys(this.$v.form)[key];
            this.$v.form[input].$touch();
            // 3. Remove special properties
            if (input.includes("$")) return false;
            // 4. Check for errors
            if (this.$v.form[input].$error) {
              // 5. Focus the input with the error
              this.$refs[input].focus();
              // 6. Break out of the loop
              break;
            }
          }
          return false;
        } else {
          return true;
        }
      }, 
      user_save(){
        if(!this.validate()){
          return false;
        }

        const data = {
            "USER_PASS" : md5(this.form.password),
            "USER_NAME" : this.form.name,
            "USER_PHONE" : this.form.phone,
            "USER_EMAIL" : this.form.email,
            "USER_DEPARTMENT" : this.form.department ,
            "USER_POSITION" : this.form.position,
            "USER_COMPANY_ID" : this.form.companyId,
            "USER_STATUS" : this.form.status,
            "USER_RULE_AUTH" : this.form.ruleAuth,
            "USER_SEQ" : this.userSeq
        }
        companyApi.modifyUser(data)
        .then( res => {
          console.log(res);
          this.$message({
            type:"success",
            message:"수정되었습니다."
          })
          // this.dismissCountDown = this.dismissSecs
        })
        .catch( error => {
          console.log(error);
        });
      },
      getDataLoad() {
        var userSeq = this.userSeq;

        /**
         * 부서정보 호출
         */
        companyApi.getDepartList()
          .then(res => {
            console.log(res.data);
            res.data.forEach(element => {
              const departData = {
                value: element.DEPARTMENT_SEQ,
                text: element.DEPARTMENT,
              }
              this.departments.push(departData);
            });
          });

        /**
         * 직책정보 호출
         */
        companyApi.getPositionList()
          .then(res => {
            res.data.forEach(element => {
              const positionData = {
                value: element.CODE_SEQ,
                text: element.CODE_NAME
              }
              this.positions.push(positionData);
            });
          });

        companyApi.getUser(userSeq)
        .then(res => {
          console.log(res.data);
          this.form.id = res.data[0].USER_ID;
          this.form.name = res.data[0].USER_NAME;
          this.form.email = res.data[0].USER_EMAIL;
          this.form.phone = res.data[0].USER_PHONE;
          this.form.companyId = res.data[0].USER_COMPANY_ID;
          this.form.ruleAuth = res.data[0].USER_RULE_AUTH;
          this.form.department = res.data[0].DEPARTMENT_SEQ;
          this.form.position = res.data[0].CODE_SEQ;
          this.form.status = res.data[0].USER_STATUS;
        });

      }
    },
    created() {      
      this.getDataLoad();
    }
  }
</script>