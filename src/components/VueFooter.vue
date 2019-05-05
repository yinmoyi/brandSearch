<template>
  <div>
    <mt-tabbar>
      <mt-tab-item id="商标搜索">
        <router-link to="/" tag="div">
          <div class="mint-tab-item-icon">
            <span class="iconfont icon-sousuo"></span>
          </div>
          <div class="mint-tab-item-label">商标搜索</div>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="我的">
        <router-link :to="{name: 'userLink'}" tag="div">
          <div class="mint-tab-item-icon">
            <span class="iconfont icon-tubiaolunkuo-"></span>
          </div>
          <div class="mint-tab-item-label">我的</div>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@rem: 750/16rem;
@media only screen and (-webkit-device-pixel-ratio: 2) {
  .mint-tabbar {
    transform: boder-top scaleY(0.5);
  }
}
@media only screen and (-webkit-device-pixel-ratio: 3) {
  .mint-tabbar {
    transform: boder-top scaleY(0.3333333333);
  }
}
.mint-tabbar {
  z-index: 0;
  border-top: 1px solid #e1e1e1;
  .mint-tab-item {
    box-sizing: border-box;
    .mint-tab-item-icon {
      span {
        font-size: 43 / @rem;
      }
    }
    .mint-tab-item-label {
      font-size: 28 / @rem;
      color: #666;
    }
  }
}
.router-link-exact-active.router-link-active {
  .mint-tab-item-icon {
    span {
      color: #ef9f00;
    }
  }
  .mint-tab-item-label {
    color: #ef9f00;
  }
}
</style>
