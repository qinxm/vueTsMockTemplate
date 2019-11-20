<template>
  <div class="register-container register-container">
    <div style="width:100%; height:100%; overflow:auto; ">
      <div class="register-content">
        <div class="logo-tip-container">
          <img :src="logoTip">
        </div>
        <div style="position: relative; height: 600px;">
          <el-card class="register-card">
            <h1 class="text-center register-title">
              <img :src="logoSrc" class="logo-img">
              后台管理平台
            </h1>
            <h3>找回密码</h3>
            <el-form
              ref="registerForm"
              :model="registerForm"
              :rules="loginRules"
              class="register-form"
              autocomplete="on"
              label-position="left"
            >
              <el-form-item prop="loginName">
                <el-input
                  ref="loginName"
                  v-model.trim="registerForm.loginName"
                  placeholder="登录名"
                  name="loginName"
                  type="text"
                  autocomplete="on"
                />
              </el-form-item>

              <el-form-item prop="mobile">
                <el-input
                  ref="mobile"
                  v-model.trim="registerForm.mobile"
                  placeholder="11位手机号"
                  name="mobile"
                  type="text"
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item prop="captcha" class="no-border">
                <el-input
                  ref="captcha"
                  v-model.trim="registerForm.captcha"
                  placeholder="图形验证码"
                  name="captcha"
                  type="text"
                  autocomplete="on"
                />
                <img :src="codeSrc" @click="changeCaptcha" style="cursor:pointer; width: 100px;">
                <el-button type="text" @click="changeCaptcha">看不清</el-button>
              </el-form-item>
              <el-form-item prop="smsCaptcha" class="no-border">
                <el-input
                  ref="smsCaptcha"
                  v-model.trim="registerForm.smsCaptcha"
                  placeholder="短信验证码"
                  name="smsCaptcha"
                  type="text"
                  autocomplete="on"
                  style="width: 240px;"
                />
                <el-button
                  v-if="showGetSMSCaptcha"
                  type="text"
                  @click="handleGetSmsCaptcha"
                  style="flex: 1"
                >获取短信验证码</el-button>
                <el-button v-else type="text" style="flex: 1">{{countdownTime}}s</el-button>
              </el-form-item>

              <el-form-item prop="newPwd">
                <el-input
                  ref="newPwd"
                  v-model.trim="registerForm.newPwd"
                  placeholder="新密码"
                  name="newPwd"
                  type="password"
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item prop="reNewPwd">
                <el-input
                  ref="reNewPwd"
                  v-model.trim="registerForm.reNewPwd"
                  placeholder="确认密码"
                  name="reNewPwd"
                  type="password"
                  autocomplete="on"
                />
              </el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleRegister"
              >提 交</el-button>
              <div style="text-align: center;">
                <el-button type="text" @click="toLogin">去登录</el-button>
              </div>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
    <srm-footer/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import {
  isValidUsername,
  isValidPassword,
  isValidMobile
} from "@/utils/validate";
import { Form as ElForm, Input } from "element-ui";
import { UserModule } from "@/store/modules/user";
import { getUserInfo, getSmsCaptcha, findPwd } from "@/config/service/user";

@Component({
  name: "FindPwd"
})
export default class extends Vue {
  private showGetSMSCaptcha = true;
  private countdownTime = 60; // 60s倒计时
  private countdownInterval;
  private timeSpan = new Date().getTime();
  private logoTip = require("../assets/logo_tip.png");
  private logoSrc = require("../assets/logo.png");

  // 验证码图片地址
  get codeSrc() {
    return `${process.env.VUE_APP_API_ROOT}/srm/auth/captcha/${this.timeSpan}`;
  }

  private validateloginName = (rule: any, value: string, callback: any) => {
    if (!isValidUsername(value)) {
      callback(new Error("2-16位以字母开头，可包含字母、数字、下划线"));
    } else {
      callback();
    }
  };
  private validateReNewPwd = (rule, value, callback) => {
    if (value === "") {
      callback(new Error("请输入确认密码"));
    } else if (value !== this.registerForm.newPwd) {
      callback(new Error("两次输入密码不一致"));
    } else if (!isValidPassword(value)) {
      callback(new Error("8-16位且包含字母、数字、特殊字符（&除外）"));
    } else {
      callback();
    }
  };
  private validateNewPwd = (
    rule: any,
    value: string,
    callback: (error?: any) => void
  ) => {
    if (value === "") {
      callback(new Error("请输入新密码"));
    } else if (!isValidPassword(value)) {
      callback(new Error("8-16位且包含字母、数字、特殊字符（&除外）"));
    } else if (this.registerForm.reNewPwd) {
      (this.$refs["registerForm"] as ElForm).validateField(
        "reNewPwd",
        errorMsg => {}
      );
      callback();
    } else {
      callback();
    }
  };
  private validateMobile = (
    rule: any,
    value: string,
    callback: (error?: any) => void
  ) => {
    if (value === "") {
      callback(new Error("请输入11位手机号"));
    } else if (!isValidMobile(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  };
  private validateCaptcha = (
    rule: any,
    value: string,
    callback: (error?: any) => void
  ) => {
    if (!value) {
      callback(new Error("请输入图片验证码"));
    } else {
      callback();
    }
  };
  private validateSMSCode = (
    rule: any,
    value: string,
    callback: (error?: any) => void
  ) => {
    if (!value) {
      callback(new Error("请输入短信验证码"));
    } else {
      callback();
    }
  };
  private registerForm = {
    loginName: "",
    newPwd: "",
    reNewPwd: "",
    mobile: "",
    captcha: "",
    smsCaptcha: ""
  };
  private loginRules = {
    loginName: [{ validator: this.validateloginName, trigger: "blur" }],
    newPwd: [{ validator: this.validateNewPwd, trigger: "blur" }],
    reNewPwd: [{ validator: this.validateReNewPwd, trigger: "blur" }],
    mobile: [{ validator: this.validateMobile, trigger: "blur" }],
    captcha: [{ validator: this.validateCaptcha, trigger: "blur" }],
    smsCaptcha: [
      { required: true, message: "请输入短信验证码", trigger: "blur" }
    ]
  };
  private loading = false;

  mounted() {
    if (this.registerForm.loginName === "") {
      (this.$refs.loginName as Input).focus();
    } else if (this.registerForm.newPwd === "") {
      (this.$refs.newPwd as Input).focus();
    }
  }
  beforeDestroy() {
    this.countdownInterval = null;
  }
  private changeCaptcha() {
    this.timeSpan = new Date().getTime();
  }
  private handleRegister() {
    (this.$refs.registerForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        const params = { ...this.registerForm, randomStr: this.timeSpan };
        const data = await findPwd(params);
        if (data.code == 200) {
          this.$alert("重置密码成功，去登录", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$router.replace({
                name: "Login"
              });
            }
          });
        } else {
          this.$message.error(data.message);
        }
      } else {
        return false;
      }
    });
  }
  private setTimeInterval() {
    this.countdownTime = 59;
    this.showGetSMSCaptcha = false;
    this.countdownInterval = null;
    this.countdownInterval = window.setInterval(() => {
      if (this.countdownTime > 1) {
        this.countdownTime--;
      } else {
        this.countdownInterval = null;
        this.countdownTime = 59;
        this.showGetSMSCaptcha = true;
      }
    }, 1000);
  }
  private async handleGetSmsCaptcha() {
    let { loginName, mobile, captcha } = this.registerForm;
    (this.$refs.registerForm as ElForm).validateField(
      "loginName",
      async ValidLoginName => {
        (this.$refs.registerForm as ElForm).validateField(
          "captcha",
          async validCaptcha => {
            (this.$refs.registerForm as ElForm).validateField(
              "mobile",
              async validMobile => {
                if (!ValidLoginName && !validCaptcha && !validMobile) {
                  let data = await getSmsCaptcha({
                    captcha,
                    mobile,
                    loginName,
                    randomStr: this.timeSpan.toString()
                  });
                  if (data.code == 200) {
                    this.showGetSMSCaptcha = false;
                    this.$message.success(data.result);
                    this.setTimeInterval();
                  } else {
                    this.$message.error(data.message);
                  }
                }
              }
            );
          }
        );
      }
    );
  }
  private toLogin() {
    this.$router.push({
      name: "Login"
    });
  }
}
</script>
<style lang="scss" scoped>
.register-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #181214 url(../assets/login_bg.png) no-repeat 50% 50%;
  background-attachment: fixed;
  .register-content {
    width: 420px;
    margin: 0px auto;
    .logo-tip-container {
      text-align: center;
    }
    .register-card {
      position: absolute;
      width: 420px;
      top: -20px;

      .register-title {
        font-size: 28px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 32px;
          margin-right: 9px;
        }
      }
    }
    /deep/ .el-form-item {
      border: 1px solid #ebebeb;
      background: #fff;
      border-radius: 5px;
      color: #454545;
      .el-input__inner {
        border: none;
      }
      &.no-border {
        border: none;

        .el-form-item__content {
          display: flex;
          .el-input__inner {
            border: 1px solid #ebebeb;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
</style>
