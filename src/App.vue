<template>
  <div id="app">
    <router-view></router-view>
    <vuefooter v-show="$route.meta.showFooter"></vuefooter>
  </div>
</template>

<script>
import VueFooter from "./components/VueFooter";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    vuefooter: VueFooter
  },
  methods: {}
};
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
