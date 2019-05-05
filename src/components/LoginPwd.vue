<template>
  <div class="login">
    <mt-header title="账号密码登录">
      <router-link slot="left" :to="{name:'loginLink'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="loginPwd">
      <div class="logoImg">
        <img src="../assets/logo.png" alt>
      </div>
      <form class="loginPwdForm" action>
        <section class="loginPwdItem">
          <input type="tel" placeholder="手机号" v-model="userPhone">
        </section>
        <section class="loginPwdItem">
          <input type="password" placeholder="登录密码" v-model="userPassword">
        </section>
        <p class="forgetPwd">
          <router-link :to="{name:'forgetPwd'}">忘记密码？</router-link>
        </p>
        <button class="loginPwdBtn" @click.prevent="nowLogin">立即登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
const $a = "index";
const $b = "login";
const $c = "shangbiao666";

let checkPhone = /^1[3456789]\d{9}$/;
let chechPwd = /^(?=.*[a-zA-Z\d])[!-~]{8,16}$/;

export default {
  data() {
    return {
      userPhone: "",
      userPassword: ""
    };
  },
  methods: {
    nowLogin() {
      if (
        this.userPhone &&
        chechPwd.test(this.userPassword) &&
        checkPhone.test(this.userPhone)
      ) {
        Indicator.open({
          text: "登录中...",
          spinnerType: "fading-circle"
        });
        this.$axios
          .post("/api/loginIn", {
            sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
            phone: this.userPhone,
            pwd: this.userPassword,
            type: 2
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            Indicator.close();
            if (data.code === 200 && "content" in data) {
              if (localStorage.getItem("user_msg")) {
                localStorage.clear();
              }
              let _token = data.content.token_login;
              if (_token != "") {
                let userMsg = {
                  current_id: data.content.id,
                  current_is_pwd: data.content.is_pwd,
                  current_is_vip: data.content.is_vip,
                  current_token: data.content.token_login,
                  current_phone: data.content.phone
                };
                localStorage.setItem("user_msg", JSON.stringify(userMsg));
              }
              Toast(data.msg);
              this.$router.push({ name: "userLink" });
            } else {
              Toast(data.msg);
              return false;
            }
          });
      } else {
        Toast("手机号或密码不正确");
        return false;
      }
    }
  }
};
</script>

<style scoped lang="less">
@rem: 750/16rem;
.loginPwd {
  width: 13rem;
  margin: 20% auto 0;
  .logoImg {
    text-align: center;
    padding-bottom: 40 / @rem;
    img {
      width: 2rem;
    }
  }
  .msg {
    color: #333;
    font-size: 26 / @rem;
    line-height: 60 / @rem;
    span {
      padding-left: 6 / @rem;
    }
  }
  .loginPwdForm {
    .loginPwdItem {
      margin-bottom: 32 / @rem;
      height: 80 / @rem;
      font-size: 28 / @rem;
      input {
        width: 100%;
        height: 80 / @rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        color: #333;
        -webkit-appearance: none;
        text-indent: 10px;
        outline: none;
        &::-webkit-input-placeholder {
          color: #888;
        }
      }
    }
    .forgetPwd {
      line-height: 30 / @rem;
      text-align: right;
      a {
        color: #888;
        font-size: 26 / @rem;
      }
    }
    .loginPwdBtn {
      display: block;
      width: 100%;
      height: 42px;
      margin-top: 40 / @rem;
      border-radius: 4px;
      background: #ef9f00;
      color: #fff;
      cursor: pointer;
      text-align: center;
      font-size: 16px;
      line-height: 42px;
      border: 0;
    }
  }
}
</style>
