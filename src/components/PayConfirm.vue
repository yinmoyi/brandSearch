<template>
  <div class="confirm">
    <div class="child" v-show="requestApi">
      <p>请确认支付是否完成</p>
      <p @click.stop.prevent="alreadyPay">支付已完成</p>
      <p @click.stop.prevent="noPay">支付失败，重新购买</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast, Indicator } from "mint-ui";
const $a = "index";
const $c = "shangbiao666";
export default {
  data() {
    return {
      user: {},
      requestApi: false
    };
  },
  created() {
    Indicator.open({
      text: "支付校验中...",
      spinnerType: "fading-circle"
    });
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem("user_msg"));
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
          if (data.code == 200 && data.content) {
            if (data.content.is_vip) {
              this.user.current_is_vip = 1;
            } else {
              this.user.current_is_vip = 0;
            }
            localStorage.setItem("user_msg", JSON.stringify(this.user));
            Indicator.close();
            this.requestApi = true;
          } else {
            Indicator.close();
            Toast(data.msg + ",请重新登录");
            localStorage.clear();
            this.$router.push({ name: "loginLink" });
          }
        });
    }, 3000);
  },
  methods: {
    alreadyPay() {
      console.log(this.user);
      if (this.user.current_is_vip) {
        this.$router.push({ name: "userLink" });
      } else {
        Toast("您还未购买Vip");
        return false;
      }
    },
    noPay() {
      if (this.user.current_is_vip) {
        Toast("您已完成支付！");
        return false;
      } else {
        this.$router.push({ name: "buyVip" });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@rem: 750/16rem;
.confirm {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  .child {
    width: 10rem;
    background: #fff;
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -5rem;
    text-align: center;
    border-radius: 12px;
    p {
      height: 50px;
      line-height: 50px;
      font-size: 30 / @rem;
      color: #666;
      border-bottom: 1px solid #e4e4e4;
      &:nth-of-type(1) {
        font-size: 32 / @rem;
        color: #333;
        height: 70px;
        line-height: 70px;
      }
      &:nth-of-type(2) {
        color: #fc0205;
      }
      &:nth-of-type(3) {
        border-bottom: 0;
      }
    }
  }
}
</style>
