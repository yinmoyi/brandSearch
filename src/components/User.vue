<template>
  <div class="user">
    <ul class="list">
      <li>
        <div class="phone">
          Hi,
          <span>{{user.current_phone | filterNumber}}</span>
          <i class="vipImg" v-if="user.current_is_vip">
            <img src="../assets/vip.png">
          </i>
        </div>
        <div class="signOut" @click="signOut">
          <span class="iconfont icon-tuichu"></span>退出登录
        </div>
      </li>
      <li class="buyVip" v-if="!user.current_is_vip">
        <router-link :to="{name:'buyVip'}" tag="div">
          <div class="innerImg">
            <img src="../assets/buy_vip.png">
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'brandReg'}" tag="div">
          <div class="text">
            <span class="iconfont icon-shangbiao sb_color"></span>商标注册
          </div>
          <div class="signOut">
            <span class="iconfont icon-jiantou-you"></span>
          </div>
        </router-link>
      </li>
      <li v-if="!user.current_is_pwd">
        <router-link :to="{name:'setLoginPwd'}" tag="div">
          <div class="text">
            <span class="iconfont icon-denglumima ma_color"></span>登录密码
          </div>
          <div class="signOut">
            设置
            <span class="iconfont icon-jiantou-you"></span>
          </div>
        </router-link>
      </li>
      <li>
        <router-link :to="{name:'aboutUs'}" tag="div">
          <div class="text">
            <span class="iconfont icon-guanyuwomen our_color"></span>关于我们
          </div>
          <div class="signOut">
            <span class="iconfont icon-jiantou-you"></span>
          </div>
        </router-link>
      </li>
      <li>
        <div class="text">
          <span class="iconfont icon-kefu kf_color"></span>
          <a href="tel:400-0000-000" class="contactUs">联系客服</a>
        </div>
        <div class="signOut">
          <span class="iconfont icon-jiantou-you"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import axios from "axios";
const $a = "index";
const $c = "shangbiao666";

export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
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
          console.log(data);
          return;
        } else {
          Toast("登录过期");
          localStorage.clear();
          this.$router.push({ name: "loginLink" });
        }
      });
  },
  methods: {
    //退出登录
    signOut() {
      let $b = "loginout";
      this.$axios
        .post("/api/loginOut", {
          sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
          uid: this.user.current_id
        })
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.code == 200) {
            localStorage.clear();
            if (!localStorage.getItem("user_msg")) {
              Toast("退出成功");
              this.$router.push({ name: "index" });
            }
          } else {
            Toast(data.msg);
            return false;
          }
        });
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
.user {
  .list {
    background-color: #f5f5f5;
    li {
      background-color: #fff;
      padding: 0 28 / @rem;
      height: 100 / @rem;
      line-height: 100 / @rem;
      position: relative;
      &:nth-of-type(1) {
        margin-bottom: 20 / @rem;
      }
      &:not(:nth-of-type(1)) {
        border-bottom: 1px solid #f5f5f5;
      }
      &.buyVip {
        height: auto;
        line-height: 0;
        padding: 10px 0;
        .innerImg {
          width: 15rem;
          margin: 0 auto;
          img {
            width: 15rem;
            border-radius: 8px;
          }
        }
      }
      .phone {
        font-size: 45 / @rem;
        .vipImg {
          display: inline-block;
          vertical-align: middle;
          width: 50px;
          img {
            width: 100%;
          }
        }
      }
      .signOut {
        position: absolute;
        right: 20 / @rem;
        top: 0;
        color: #888;
        font-size: 26 / @rem;
        span {
          padding-right: 6 / @rem;
          font-size: 24 / @rem;
        }
      }
      .text {
        font-size: 32 / @rem;
        color: #333;
        i {
          font-style: italic;
          padding-right: 8 / @rem;
          font-weight: bold;
        }
        .smallTxt {
          font-size: 26 / @rem;
          color: #ef9f00;
          padding-left: 10 / @rem;
        }
        .iconfont {
          font-size: 38 / @rem;
          vertical-align: middle;
          padding-right: 6px;
          &.sb_color {
            color: #54a0fe;
          }
          &.ma_color {
            color: #efb62b;
          }
          &.kf_color {
            color: #338dee;
          }
          &.our_color {
            color: #14c792;
          }
        }
        .contactUs {
          color: #333;
          display: inline-block;
          width: 88%;
        }
      }
    }
  }
}
</style>
