<template>
  <div>
    <mt-header title="设置登录密码">
      <router-link slot="left" :to="{name:'userLink'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="loginPwd">
      <p class="msg">
        验证码已发送至
        <span>{{userPhone | filterNumber}}</span>
      </p>
      <form class="loginPwdForm" action>
        <section class="loginPwdItem">
          <input type="number" placeholder="验证码" v-model="code">
          <span class="text" ref="text" v-show="flag"></span>
        </section>
        <section class="loginPwdItem">
          <input type="password" placeholder="请输入登录密码" v-model="userPassword1">
        </section>
        <p
          v-show="!/^(?=.*[a-zA-Z\d])[!-~]{8,16}$/.test(userPassword1)"
          class="check_password"
        >注意：密码是由数字、字母、特殊字符组成，长度8-16！</p>
        <section class="loginPwdItem">
          <input type="password" placeholder="请再输入一次" v-model="userPassword2">
        </section>
        <p v-show="!(userPassword1==userPassword2)" class="check_p">两次密码输入不一致</p>
        <a class="loginPwdBtn" @click.stop.prevent="setLoginPwd">确认提交</a>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";

let checkPwd = /^(?=.*[a-zA-Z\d])[!-~]{8,16}$/;
let timer;

const $a = "index";
const $c = "shangbiao666";

export default {
  data() {
    return {
      code: "",
      userPassword1: "",
      userPassword2: "",
      user: {},
      flag: false,
      userPhone: ""
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user_msg"));

    if (this.user) {
      let $b = "memberinfo";
      axios
        .post("/api/memberInfo", {
          sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
          uid: this.user.current_id,
          token_login: this.user.current_token
        })
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.code == 200) {
            this.userPhone = data.content.phone;
            let $b = "sendsms";
            axios
              .post("/api/sendSms", {
                phone: this.userPhone,
                sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c)))
              })
              .then(res => {
                if (res.data.code === 200) {
                  this.flag = true;
                  let num = 60;
                  timer = setInterval(() => {
                    num--;
                    if (num >= 1) {
                      this.$refs.text.innerHTML = "已发送(" + num + "s)";
                    } else {
                      this.flag = false;
                      clearInterval(timer);
                    }
                  }, 1000);
                } else {
                  Toast(res.data.msg);
                  return false;
                }
              });
          } else {
            Toast(data.msg);
            localStorage.clear();
            this.$router.push({ name: "loginLink" });
          }
        });
    } else {
      Toast("登录过期");
      localStorage.clear();
      this.$router.push({ name: "loginLink" });
    }
  },
  methods: {
    // 设置登录密码
    setLoginPwd() {
      let $b = "updatepass";
      if (this.code === "") {
        Toast("请填写验证码");
        return false;
      }
      if (
        checkPwd.test(this.userPassword1) &&
        checkPwd.test(this.userPassword2) &&
        this.userPassword1 == this.userPassword2
      ) {
        this.$axios
          .post("/api/updatePass", {
            sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
            phone: this.userPhone,
            code: this.code,
            first_pwd: this.userPassword1,
            second_pwd: this.userPassword2
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            if (data.code === 200) {
              clearInterval(timer);
              this.user.current_is_pwd = 1;
              localStorage.setItem("user_msg", JSON.stringify(this.user));
              Toast(data.msg);
              this.$router.push({ name: "userLink" });
            } else {
              Toast(data.msg);
              return false;
            }
          });
      }
    }
  },
  filters: {
    filterNumber(value) {
      if (!value) return "";
      return value.substr(0, 3) + "****" + value.substr(7);
    }
  }
};
</script>

<style scoped lang="less">
@rem: 750/16rem;
.loginPwd {
  width: 13rem;
  margin: 20% auto 0;
  .msg {
    color: #888;
    font-size: 24 / @rem;
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
      position: relative;
      .text {
        width: 150 / @rem;
        height: 60 / @rem;
        line-height: 60 / @rem;
        position: absolute;
        right: 10 / @rem;
        top: 10 / @rem;
        font-size: 24 / @rem;
        color: #888;
      }
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
    .check_p {
      color: red;
      font-size: 24 / @rem;
    }
    .check_password {
      color: red;
      font-size: 22 / @rem;
      padding-bottom: 30 / @rem;
    }
    .loginPwdBtn {
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
}
</style>
