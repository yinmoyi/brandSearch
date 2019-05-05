<template>
  <div>
    <mt-header title="重置登录密码">
      <router-link slot="left" :to="{name:'loginPwdLink'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="loginPwd">
      <form class="loginPwdForm" action>
        <section class="loginItem">
          <input type="tel" v-model="userPhone" placeholder="手机号">
          <button
            :class="{'getCode':/^1[3456789]\d{9}$/.test(userPhone) && userPhone.length == 11}"
            :disabled="!/^1[3456789]\d{9}$/.test(userPhone) && userPhone.length < 11"
            @click.prevent="getCode"
            ref="getNum"
          >获取验证码</button>
        </section>
        <p class="pointCode" v-if="codeFlag">验证码15分钟内有效</p>
        <section class="loginItem">
          <input type="tel" v-model="code" placeholder="验证码">
        </section>
        <section class="loginPwdItem">
          <input type="password" placeholder="请输入新密码" v-model="onePwd">
        </section>
        <p
          v-show="!/^(?=.*[a-zA-Z\d])[!-~]{8,16}$/.test(onePwd)"
          class="check_password"
        >注意：密码是由数字、字母、特殊字符组成，长度8-16！</p>
        <section class="loginPwdItem">
          <input type="password" placeholder="请再输入一次" v-model="twoPwd">
        </section>
        <p v-show="!(onePwd==twoPwd)" class="check_p">两次密码输入不一致</p>
        <a class="loginPwdBtn" @click.stop.prevent="updatePwd">确认修改</a>
      </form>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
let timer;
const $a = "index";
const $c = "shangbiao666";

let checkPhone = /^1[3456789]\d{9}$/;
let chechPwd = /^(?=.*[a-zA-Z\d])[!-~]{8,16}$/;
var onoff = true;

export default {
  data() {
    return {
      userPhone: "",
      code: "",
      codeFlag: false,
      onePwd: "",
      twoPwd: ""
    };
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
              Toast(this.data.msg);
              onoff = true;
              return false;
            }
          })
          .catch(error => {
            Toast(error);
          });
      }
    },

    //修改登录密码
    updatePwd() {
      let $b = "updatepass";
      if (this.userPhone.length !== 11 && !checkPhone.test(this.userPhone)) {
        Toast("手机号不正确");
        return false;
      }
      if (this.code === "") {
        Toast("请填写验证码");
        return false;
      }
      if (
        chechPwd.test(this.onePwd) &&
        chechPwd.test(this.twoPwd) &&
        this.onePwd == this.twoPwd
      ) {
        this.$axios
          .post("/api/updatePass", {
            sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
            phone: this.userPhone,
            code: this.code,
            first_pwd: this.onePwd,
            second_pwd: this.twoPwd
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            if (data.code == 200) {
              clearInterval(timer);
              Toast(data.msg + ",请重新登录！");
              this.$router.push({ name: "loginPwdLink" });
            } else {
              Toast(data.msg);
              return false;
            }
          });
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
  .msg {
    color: #333;
    font-size: 26 / @rem;
    line-height: 60 / @rem;
    span {
      padding-left: 6 / @rem;
    }
  }
  .loginPwdForm {
    .pointCode {
      font-size: 24 / @rem;
      color: red;
      padding-bottom: 20 / @rem;
      text-indent: 10 / @rem;
    }
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
    .check_password {
      color: red;
      font-size: 22 / @rem;
      padding-bottom: 30 / @rem;
    }
    .check_p {
      color: red;
      font-size: 24 / @rem;
    }
  }
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
</style>
