<template ref="tempAli">
  <div>
    <mt-header title="购买VIP">
      <router-link slot="left" :to="{name:'userLink'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="buyBox">
      <div class="weixin" @click.prevent="wxPay" :class="{active:borderFlag}">
        <p class="method">微信</p>
        <span class="iconfont icon-gongzhonghao"></span>
      </div>
      <div class="zhifubao" @click.prevent="zfbPay" :class="{active:!borderFlag}">
        <p class="method">支付宝</p>
        <span class="iconfont icon--zhifubao"></span>
      </div>
    </div>
    <div class="mask" v-show="maskFlag"></div>
    <div class="payNow" v-show="goPay">
      <div class="box">
        <p class="tip">温馨提示:</p>
        <p class="confirm">确认支付99元？</p>
        <div class="yesOrno">
          <span class="no" @click.stop.prevent="cancelPay">取消</span>
          <span class="yes">
            <a @click="nowpay( borderFlag == true ? 'wxpay' : 'alipay')">确认</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import $ from "jquery";
import axios from "axios";

const $a = "index";
const $c = "shangbiao666";

export default {
  data() {
    return {
      user: {},
      goPay: false,
      maskFlag: false,
      borderFlag: true,
      requestUrl: "",
      res: {}
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user_msg"));
  },
  methods: {
    cancelPay() {
      this.maskFlag = false;
      this.goPay = false;
    },
    // 微信支付
    wxPay() {
      this.borderFlag = true;
      if (this.user) {
        if (!this.user.current_is_vip) {
          let $b = "wechatpay";

          if (this.is_weixin()) {
            this.$axios
              .post("/api/wechatJspay", {
                sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
                uid: this.user.current_id,
                token_login: this.user.current_token
              })
              .then(res => {
                return res.data;
              })
              .then(data => {
                if (data.code === 200) {
                  // this.res = data.content;
                  this.maskFlag = true;
                  this.goPay = true;
                } else {
                  // Toast(data.msg);
                  localStorage.clear();
                  this.$router.push({ name: "loginLink" });
                  return false;
                }
              });
          } else {
            this.$axios
              .post(`/api/wechatPay`, {
                sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
                uid: this.user.current_id,
                token_login: this.user.current_token
              })
              .then(res => {
                return res.data;
              })
              .then(data => {
                if (data.code === 200) {
                  this.maskFlag = true;
                  this.goPay = true;
                  this.requestUrl = data.content;
                } else {
                  Toast(data.msg);
                  localStorage.clear();
                  this.$router.push({ name: "loginLink" });
                  return false;
                }
              });
          }
        } else {
          let instance = Toast("亲爱的VIP,即将为您跳转...");
          setTimeout(() => {
            instance.close();
            this.$router.push({ name: "userLink" });
          }, 3000);
        }
      } else {
        Toast("请先登录");
        localStorage.clear();
        this.$router.push({ name: "loginLink" });
      }
    },

    // 支付宝支付
    zfbPay() {
      this.borderFlag = false;
      if (this.user) {
        if (!this.user.current_is_vip) {
          let $b = "alipay";
          this.$axios
            .post("/api/alipay", {
              sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
              uid: this.user.current_id,
              token_login: this.user.current_token
            })
            .then(res => {
              return res.data;
            })
            .then(data => {
              if (data.code === 200) {
                if (data.content.is_vip) {
                  this.user.current_is_vip = 1;
                  localStorage.setItem("user_msg", JSON.stringify(this.user));
                  let instance = Toast("亲爱的VIP,即将为您跳转...");
                  setTimeout(() => {
                    instance.close();
                    this.$router.push({ name: "userLink" });
                  }, 3000);
                } else {
                  this.requestUrl = data.content;
                  this.maskFlag = true;
                  this.goPay = true;
                }
              } else {
                Toast(data.msg);
                localStorage.clear();
                this.$router.push({ name: "loginLink" });
                return false;
              }
            });
        } else {
          let instance = Toast("亲爱的VIP,即将为您跳转...");
          setTimeout(() => {
            instance.close();
            this.$router.push({ name: "userLink" });
          }, 3000);
        }
      } else {
        Toast("请先登录");
        localStorage.clear();
        this.$router.push({ name: "loginLink" });
      }
    },
    nowpay(method) {
      if (method === "wxpay") {
        if (this.is_weixin()) {
          if (typeof WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
              document.addEventListener(
                "WeixinJSBridgeReady",
                onBridgeReady,
                false
              );
            } else if (document.attachEvent) {
              document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
              document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
            }
          } else {
            this.onBridgeReady();
          }
        } else {
          window.location.href = this.requestUrl;
        }
      } else if (method === "alipay") {
        $("body").append(this.requestUrl);
        $("form").attr("target", "_blank");
      }
    },

    // 判断微信浏览器
    is_weixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i)) {
        return true;
      } else {
        return false;
      }
    },
    onBridgeReady() {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: res.appid, //公众号名称，由商户传入
          timeStamp: res.timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: res.nonceStr, //随机串
          package: "prepay_id=" + res.prepay_id,
          signType: "MD5", //微信签名方式：
          paySign: res.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            this.$router.push({ name: "confirm" });
          }
        }
      );
    }
  }
};
</script>

<style scoped lang="less">
@rem: 750/16rem;
.buyBox {
  display: flex;
  display: -webkit-flex;
  padding: 40px 1.5rem 0;
  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 0 14px;
    padding: 10px 0;
    &.active {
      border: 1px solid #ef9f00;
    }
    .method {
      font-size: 36 / @rem;
      line-height: 80 / @rem;
      color: #333;
    }
    .iconfont {
      font-size: 120 / @rem;
    }
    &.weixin {
      .iconfont {
        color: #00d205;
      }
    }
    &.zhifubao {
      .iconfont {
        color: #00a0e8;
      }
    }
  }
}
.mask {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.payNow {
  width: 500 / @rem;
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -250 / @rem;
  margin-top: -80px;
  z-index: 2;
  border-radius: 8px;
  .box {
    padding: 10px 12px;
    .tip {
      line-height: 60 / @rem;
      font-size: 30 / @rem;
      color: #888;
    }
    .confirm {
      line-height: 140 / @rem;
      text-align: center;
      color: #333;
    }
    .yesOrno {
      display: flex;
      display: -webkit-flex;
      span {
        display: block;
        flex: 1;
        margin: 20 / @rem;
        text-align: center;
        height: 60 / @rem;
        line-height: 60 / @rem;
        font-size: 32 / @rem;
        border-radius: 6px;
        &.no {
          background: #ccc;
          color: #666;
        }
        &.yes {
          background: #ef9f00;
          a {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
