<template>
  <div class="brandSearch">
    <div class="searchBox">
      <h2>
        <span>华甯</span>查商标
      </h2>
      <p>30万用户的选择，超3200万精准数据实时更新</p>
      <div class="searchInput">
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner" @click="goSearch">
            <i class="mintui mintui-search"></i>
            <input
              type="search"
              placeholder="请输入商标名称、申请人或申请号"
              class="mint-searchbar-core"
              readonly="readonly"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="moreService">
      <div class="text">
        <span class="line leftLine"></span>更多服务,可咨询
        <a href="tel:400-0000-000">400-0000-000</a>
        <span class="line rightLine"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "brandSearch",
  data() {
    return {
      user: {}
    };
  },
  methods: {
    goSearch() {
      this.user = JSON.parse(localStorage.getItem("user_msg"));
      this.$router.push({ name: "searchLink" });
    }
  }
};
</script>

<style lang="less" scoped>
@rem: 750/16rem;
#container {
  min-width: 600px;
  min-height: 767px;
}
.brandSearch {
  .searchBox {
    padding-top: 30%;
    text-align: center;
    h2 {
      font-size: 70 / @rem;
      font-weight: 500;
      span {
        color: #ef9f00;
      }
    }
    p {
      font-size: 26 / @rem;
      line-height: 120 / @rem;
      color: #818080;
    }
    .searchInput {
      padding: 0 60 / @rem;
      padding-top: 40 / @rem;
      .mint-searchbar {
        box-shadow: 0 1px 8px #dce5f1;
        padding: 0;
        .mint-searchbar-inner {
          height: 74 / @rem;
        }
      }
    }
    .goodsFl {
      padding-top: 120 / @rem;
      a {
        color: #ef9f00;
        font-size: 28 / @rem;
      }
    }
  }
  .moreService {
    position: absolute;
    bottom: 80px;
    left: 50%;
    margin-left: -6rem;
    color: #cbcbcb;
    font-size: 26 / @rem;
    height: 50 / @rem;
    line-height: 50 / @rem;
    width: 12rem;
    .text {
      width: 9rem;
      margin: 0 auto;
      text-align: center;
      position: relative;
      a {
        text-decoration: none;
        color: #f0ac24;
        padding-left: 6 / @rem;
      }
      .line {
        display: block;
        width: 50 / @rem;
        height: 1px;
        background-color: #d6d6d6;
        position: absolute;
        &.leftLine {
          left: -20px;
          top: 25 / @rem;
        }
        &.rightLine {
          right: -20px;
          top: 25 / @rem;
        }
      }
    }
  }
}
</style>
