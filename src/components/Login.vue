<template>
  <div class="login">
    <!-- 头部 -->
    <mt-header title="用户登录">
      <mt-button slot="right">
        <router-link :to="{name:'loginPwdLink'}" tag="span">密码登录</router-link>
      </mt-button>
    </mt-header>
    <div class="loginBox">
      <div class="logoImg">
        <img src="../assets/logo.png" alt>
      </div>
      <form action class="loginForm">
        <section class="loginItem">
          <input type="tel" v-model="userPhone" placeholder="手机号">
          <button
            :class="{'getCode':/^1[3456789]\d{9}$/.test(userPhone) && userPhone.length == 11}"
            :disabled="!/^1[3456789]\d{9}$/.test(userPhone) && userPhone.length < 11"
            @click.prevent="getCode"
            ref="getNum"
          >获取验证码</button>
        </section>
        <p class="pointCode" v-show="codeFlag">验证码15分钟内有效</p>
        <section class="loginItem">
          <input type="tel" v-model="code" placeholder="验证码">
        </section>
        <section class="msg">温馨提示：未注册账号的手机，登录时将自动注册。</section>
        <a class="loginBtn" @click.stop.prevent="userLogin">登录</a>
      </form>
      <router-link class="aboutUs" :to="{name:'index'}">返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
let timer;
const $a = "index";
const $c = "shangbiao666";

let checkPhone = /^1[3456789]\d{9}$/;
var onoff = true;

export default {
  data() {
    return {
      userPhone: "",
      code: "",
      codeFlag: false
    };
  },
  created() {
    this.$nextTick(() => {
      Indicator.close();
    });
  },
  methods: {
    //获取验证码
    getCode() {
      if (!onoff) {
        return false;
      }
      onoff = false;

      let $b = "sendsms";
      if (this.userPhone.length < 11 || !checkPhone.test(this.userPhone)) {
        Toast("手机号不正确");
        onoff = true;
        return false;
      } else {
        this.$axios
          .post("/api/sendSms", {
            phone: this.userPhone,
            sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c)))
          })
          .then(res => {
            if (res.data.code === 200) {
              let num = 60;
              timer = setInterval(() => {
                num--;
                if (num >= 1) {
                  this.$refs.getNum.innerHTML = "已发送(" + num + "s)";
                  this.codeFlag = true;
                } else {
                  this.$refs.getNum.innerHTML = "重新获取";
                  clearInterval(timer);
                  this.codeFlag = false;
                  onoff = true;
                }
              }, 1000);
            } else {
              Toast(res.data.msg);
              onoff = true;
              return false;
            }
          })
          .catch(error => {
            Toast(error);
          });
      }
    },

    //用户登录
    userLogin() {
      let $b = "login";
      if (this.code === "") {
        Toast("请填写验证码");
        return false;
      }
      if (this.userPhone.length == 11 && checkPhone.test(this.userPhone)) {
        Indicator.open({
          text: "登录中...",
          spinnerType: "fading-circle"
        });
        this.$axios
          .post("/api/loginIn", {
            sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
            phone: this.userPhone,
            type: 1,
            code: this.code
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            Indicator.close();
            if (data.code === 200 && "content" in data) {
              clearInterval(timer);
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
              Toast("未知错误,请重试");
              return false;
            }
          })
          .catch(error => {
            Toast(error);
            return false;
          });
      } else {
        Toast("手机号不正确");
        return false;
      }
    }
  }
};
</script>

<style scoped lang="less">
@rem: 750/16rem;
.login {
  .loginBox {
    width: 13rem;
    margin: 20% auto 0;
    .logoImg {
      text-align: center;
      padding-bottom: 40 / @rem;
      img {
        width: 2rem;
      }
    }
    .loginForm {
      .pointCode {
        font-size: 24 / @rem;
        color: red;
        padding-bottom: 20 / @rem;
        text-indent: 10 / @rem;
      }
      .loginItem {
        position: relative;
        margin-bottom: 32 / @rem;
        height: 80 / @rem;
        font-size: 28 / @rem;
        input {
          width: 100%;
          height: 80 / @rem;
          position: absolute;
          left: 0;
          top: 0;
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
        button {
          position: absolute;
          height: 60 / @rem;
          right: 10 / @rem;
          top: 20 / @rem;
          background: transparent;
          text-align: center;
          border: 0;
          color: #ccc;
          &.getCode {
            color: #666;
          }
        }
      }
      .msg {
        margin-top: 20 / @rem;
        color: #999;
        font-size: 28 / @rem;
        line-height: 44 / @rem;
        a {
          color: #ef9f00;
          text-decoration: none;
        }
      }
      .loginBtn {
        display: block;
        width: 100%;
        height: 42px;
        margin-top: 30px;
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
    .aboutUs {
      display: block;
      margin-top: 44 / @rem;
      text-align: center;
      color: #999;
      font-size: 26 / @rem;
      text-decoration: none;
    }
  }
}
</style>
