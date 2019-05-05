import { Toast } from "mint-ui";

import IndexPage from "./components/Index";
import Login from "./components/Login";
import LoginPwd from "./components/LoginPwd";
import User from "./components/User";
import SetPwd from "./components/SetPwd";
import BuyVip from "./components/BuyVip";
import BrandSearch from "./components/BrandSearch";
import ForgetPwd from "./components/ForgetPwd";
import AboutUs from "./components/about/AboutUs";
import BrandReg from "./components/brandReg/BrandReg";
import PayConfirm from "./components/PayConfirm";

export const routes = [
  {
    path: "/",
    name: "index",
    component: IndexPage,
    meta: {
      //路由层级，数值越大层级越深，以此决定转场动画的前进和后退
      index: 0,
      showFooter: true
    }
  },
  {
    path: "/search",
    name: "searchLink",
    component: BrandSearch,
    meta: {
      index: 1,
      showFooter: false
    }
  },
  {
    path: "/user",
    name: "userLink",
    component: User,
    meta: {
      index: 0,
      showFooter: true,
      requireAuth: true
    }
  },
  {
    path: "/login",
    name: "loginLink",
    component: Login,
    meta: {
      index: 1,
      showFooter: false
    }
  },
  {
    path: "/login1",
    name: "loginPwdLink",
    component: LoginPwd,
    meta: {
      index: 2,
      showFooter: false
    }
  },
  {
    path: "/set",
    name: "setLoginPwd",
    component: SetPwd,
    meta: {
      index: 1,
      showFooter: false
    }
  },
  {
    path: "/buy",
    name: "buyVip",
    component: BuyVip,
    meta: {
      index: 2,
      showFooter: false
    }
  },
  {
    path: "/about",
    name: "aboutUs",
    component: AboutUs,
    meta: {
      index: 2,
      showFooter: false
    }
  },
  {
    path: "/brandreg",
    name: "brandReg",
    component: BrandReg,
    meta: {
      index: 2,
      showFooter: false
    }
  },
  {
    path: "/forget",
    name: "forgetPwd",
    component: ForgetPwd,
    meta: {
      index: 3,
      showFooter: false
    }
  },
  {
    path: "/confirm",
    name: "confirm",
    component: PayConfirm,
    meta: {
      index: 1,
      showFooter: false
    }
  },
  {
    path: "*",
    redirect: "/"
  }
];
