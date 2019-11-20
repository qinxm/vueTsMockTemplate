<template>
  <div class="login-container " >
    <div style="width:100%; height:100%; overflow:auto; ">
      <div class="login-content">
        <div class="logo-tip-container">
          <img :src="logoTip">
        </div>
        <div style="position: relative; height: 400px;">
          <el-card class="login-card">
            <h1 class="text-center login-title">
              <img :src="logoSrc" class="logo-img">
              后台管理平台
            </h1>
            <el-form
              ref="loginForm"
              size="normal"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              autocomplete="on"
              label-position="left"
            >
              <el-form-item prop="username">
                <span class="svg-container">
                  <i class="el-icon-user"></i>
                </span>
                <el-input
                  ref="username"
                  v-model.trim="loginForm.username"
                  placeholder="账户"
                  name="username"
                  type="text"
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <i class="el-icon-lock"></i>
                </span>
                <el-input
                  ref="password"
                  v-model.trim="loginForm.password"
                  placeholder="密码"
                  name="password"
                  type="password"
                  autocomplete="on"
                />
              </el-form-item>
              <el-form-item prop="code" class="no-border">
                <el-input
                  ref="code"
                  v-model.trim="loginForm.code"
                  placeholder="图形验证码"
                  name="code"
                  type="text"
                  autocomplete="on"
                />
                <img :src="codeSrc" @click="changeCaptcha" style="cursor:pointer;width: 100px;">
                <el-button type="text" @click="changeCaptcha">看不清</el-button>
              </el-form-item>
              <div style="text-align: right;margin-top:-20px;">
                <el-button type="text" @click="toFindPwd">忘记密码</el-button>
              </div>
              <el-button
                :loading="loading"
                size="normal"
                type="primary"
                style="width:100%;"
                native-type="submit"
                @click.native.prevent="handleLogin"
              >登 录</el-button>
              <div style="text-align: center;">
                <el-button type="text" @click="toRegister">注册成为后台管理</el-button>
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
} from "@/utils/validate";
import {
  validResponse
} from "@/utils/index";
import { Form as ElForm, Input } from "element-ui";
import { UserModule } from "@/store/modules/user";
import { login, getUserInfo } from "@/config/service/user";

@Component({
  name: "Login"
})
export default class extends Vue {
  private redirect?: string;
  // private codeSrc = '/srm/auth/captcha/'
  private timeSpan = new Date().getTime();
  private logoTip = require("../assets/logo_tip.png");
  private logoSrc = require("../assets/logo.png");

  // 验证码图片地址
  get codeSrc() {
    return `${process.env.VUE_APP_API_ROOT}/srm/auth/captcha/${this.timeSpan}`;
  }

  private validateUsername = (rule: any, value: string, callback: any) => {
    if (!isValidUsername(value)) {
      callback(new Error("2-16位以字母开头，可包含字母、数字、下划线"));
    } else {
      callback();
    }
  };
  private validatePassword = (
    rule: any,
    value: string,
    callback: (error?: any) => void
  ) => {
    if (!isValidPassword(value)) {
      callback(new Error("8-16位且包含字母、数字、特殊字符（&除外）"));
    } else {
      callback();
    }
  };
  private validateCode = (
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
  private loginForm = {
    username: "",
    password: "",
    code: ""
  };
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: "blur" }],
    password: [{ validator: this.validatePassword, trigger: "blur" }],
    code: [{ validator: this.validateCode, trigger: "blur" }]
  };
  private loading = false;

  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    const query = route.query as any;
    if (query) {
      this.redirect = query.redirect;
    }
  }
  created() {
    UserModule.ResetTokenCookie();
  }
  mounted() {
    if (this.loginForm.username === "") {
      (this.$refs.username as Input).focus();
    } else if (this.loginForm.password === "") {
      (this.$refs.password as Input).focus();
    }
  }
  private changeCaptcha() {
    this.timeSpan = new Date().getTime();
  }
  private handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        try {
          const data = await login({
            ...this.loginForm,
            randomStr: this.timeSpan
          });
          if (!validResponse(data)){
            this.timeSpan = new Date().getTime();
            this.loading = false;
            return;
          }

          UserModule.SetUserToken({
            accessToken: data.result.token,
            expires: data.result.expires_in
          });

          this.getUser();
        } catch (err) {
          this.timeSpan = new Date().getTime();
        }
        setTimeout(() => {
          this.loading = false;
        }, 0.5 * 1000);
      } else {
        return false;
      }
    });
  }
  private async getUser() {
    let data = await getUserInfo();
    if (!validResponse(data)) return;
    // vendorStatus: 0-未填写 1-未完善 2-已完善;
    // vendorAuditStatus: 0-未审核 1-终审通过 2-终审驳回 3-初审通过 4-初审驳回
    // vendorID 如果第一次终审通过，则vendorID有值；否则，为null
    if (data.result) {
      const { vendorStatus, vendorID } = data.result;
      UserModule.SetVendorStatusToken({
        vendorStatus,
        vendorID
      });
      if (vendorStatus === 2) {
        if (vendorID === null) {
          this.$router.replace({
            name: "SupplierAuditResult"
          });
        } else {
          UserModule.SetUserInfo(data.result);
          this.$router.replace({
            path: "/"
          });
        }
      } else {
        this.$router.replace({
          name: "SupplierConfig"
        });
      }
    }
  }
  private toRegister() {
    this.$router.push({
      name: "Register"
    });
  }
  private toFindPwd() {
    this.$router.push({
      name: "FindPwd"
    });
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #181214 url(../assets/login_bg.png) no-repeat 50% 50%;
  background-attachment: fixed;
  .login-content {
    width: 420px;
    margin: 50px auto;
    .logo-tip-container {
      text-align: center;
    }
    .login-card {
      position: absolute;
      width: 420px;
      top: -20px;

      .login-title {
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
       .el-form-item__content {
          display: flex;
        .el-input__inner {
          border: none;
          padding-left: 0;
        }
        .svg-container {
          padding: 0 14px;
        }
       }
      &.no-border {
        border: none;

        .el-form-item__content {
          display: flex;
          .el-input__inner {
            border: 1px solid #ebebeb;
            border-radius: 5px;
            padding-left: 42px;
          }
        }
      }
    }
  }
}

</style>
