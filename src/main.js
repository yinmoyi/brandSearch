// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import { routes } from "./router";
import "./common/reset.css";
import "./common/common.js";

import md5 from "js-md5";
let Base64 = require("js-base64").Base64;
let sha1 = require("js-sha1");
Vue.prototype.$md5 = md5;
Vue.prototype.$sha1 = sha1;

Vue.use(VueRouter);

// 引入iconfont字体图标相关文件
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont/iconfont.ttf";
import "./assets/iconfont/iconfont.eot";
import "./assets/iconfont/iconfont.svg";
import "./assets/iconfont/iconfont.woff";

// 引入mint-ui
import Mint from "mint-ui";
import "mint-ui/lib/style.css";
import "mint-ui/lib/index.js";
import "./common/update.css";
Vue.use(Mint);

import axios from "axios";
Vue.prototype.$axios = axios;
Vue.prototype.baseURL = process.env.BASE_API;
Vue.config.productionTip = false;

const router = new VueRouter({
  routes
  // mode: "history"
});

// 全局守卫
router.beforeEach((to, from, next) => {
  const user_data = localStorage.getItem("user_msg");
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (user_data) {
      next();
    } else {
      localStorage.clear();
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
