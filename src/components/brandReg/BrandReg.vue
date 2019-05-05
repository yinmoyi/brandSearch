<template>
  <div>
    <mt-header title="商标注册">
      <router-link slot="left" :to="{name:'userLink'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="brandReg" ref="imgScroll">
      <div>
        <img src="../brandReg/img/1.jpg" alt>
        <img src="../brandReg/img/2.jpg" alt>
        <img src="../brandReg/img/3.jpg" alt>
        <img src="../brandReg/img/4.jpg" alt>
        <img src="../brandReg/img/5.jpg" alt>
        <img src="../brandReg/img/6.jpg" alt>
        <img src="../brandReg/img/7.jpg" alt>
        <img src="../brandReg/img/8.jpg" alt>
        <img src="../brandReg/img/9.jpg" alt>
        <img src="../brandReg/img/10.jpg" alt>
        <img src="../brandReg/img/11.jpg" alt>
        <img src="../brandReg/img/12.jpg" alt>
        <img src="../brandReg/img/13.jpg" alt>
        <img src="../brandReg/img/14.jpg" alt>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  created() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  methods: {
    initScroll() {
      new BScroll(this.$refs.imgScroll, { click: true, scrollY: true });
    }
  }
};
</script>

<style scoped lang="less">
.brandReg {
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  div {
    min-height: 600px;
  }
  img {
    width: 100%;
    display: block;
  }
}
</style>
