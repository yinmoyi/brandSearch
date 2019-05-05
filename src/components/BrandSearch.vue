<template>
  <div class="search">
    <mt-header title="商标搜索">
      <router-link slot="left" :to="{name:'index'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <!-- 搜索 -->
    <div class="search-box">
      <!-- 选择列表 -->
      <div class="select-box" @click="toggleCover">
        <p class="select-txt" ref="selectTxt">近似</p>
        <span class="iconfont icon-xialajiantou"></span>
      </div>
      <form @submit.prevent="formSearch(type,keyword)">
        <div class="mint-searchbar">
          <div class="mint-searchbar-inner">
            <i class="mintui mintui-search"></i>
            <input
              type="search"
              placeholder="请输入商标名称、申请人或申请号"
              class="mint-searchbar-core"
              v-model="keyword"
            >
          </div>
        </div>
      </form>
    </div>

    <!-- 热门搜索 -->
    <div class="searchHot" v-show="myKeyword">
      <p class="hot">
        热门搜索
        <span></span>
      </p>
      <ul class="hotList">
        <li v-for="(item,index) in hotList" :key="index" @click="hotSearch(item)">{{item}}</li>
      </ul>
    </div>

    <!-- 无搜索记录时显示 -->
    <div class="noData" v-show="noData">
      <img src="../assets/noData.jpg" alt>
    </div>

    <!-- 商标列表 -->
    <div class="brandList" v-show="dataList.length > 0" ref="brandScroll">
      <div>
        <p class="drop-down" v-if="dropDown" ref="dropDown">松手刷新数据...</p>
        <dl v-for="(item,index) in dataList" :key="index" @click="getInfo(item.regNo,item.tmName)">
          <dt>
            <img :src="item.tmImg_middle" v-show="item.tmImg_middle">
            <span v-show="!item.tmImg_middle">无图片</span>
          </dt>
          <dd>
            <h4 class="title">
              {{item.tmName}}
              <span class="category">{{item.intCls}} 国际分类</span>
            </h4>
            <p class="status">{{item.currentStatus}}</p>
            <p class="applicant">
              申请人：
              <span>{{item.applicantCn}}</span>
            </p>
            <p class="applicantNumber">
              申请号：
              <span>{{item.regNo}}</span>
            </p>
          </dd>
        </dl>
        <div class="noInner" ref="noMore">加载更多...</div>
      </div>
    </div>

    <!-- 蒙版 -->
    <div class="mask" v-show="maskFlag" @touchmove.prevent @click.prevent="closeMask"></div>

    <!-- 选择列表 -->
    <div class="select-list" v-show="selectListFlag">
      <ul>
        <li
          v-for="(item,index) in list"
          :key="index"
          @click="selectKeyWord(item.kid,index)"
        >{{item.value}}</li>
      </ul>
    </div>

    <!-- 商品详情 -->
    <brand-info v-show="infoFlag" ref="child" :brandDetail="brandDetail" :brandName="brandName"></brand-info>
  </div>
</template>

<script>
import { Toast, Indicator } from "mint-ui";
import BScroll from "better-scroll";
import BrandInfo from "../components/BrandInfo";

let localData;
const $a = "index";
const $c = "shangbiao666";

export default {
  data() {
    return {
      selectListFlag: false,
      maskFlag: false,
      infoFlag: false,
      list: [
        {
          value: "近似",
          kid: 1
        },
        {
          value: "申请人",
          kid: 3
        },
        {
          value: "申请号",
          kid: 4
        }
      ],
      type: 1,
      keyword: "",
      pageNo: 1,
      dataList: [],
      brandDetail: {},
      hotList: ["阿里巴巴", "糟老头子", "淘宝", "墨刀", "京东", "亚马逊"],
      dropDown: false,
      brandName: "",
      more: true,
      noData: false
    };
  },
  mounted() {
    this.scrollFn();
  },
  methods: {
    //搜索商标 公用方法
    search(type, keyword) {
      this.noData = false;
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      localData = JSON.parse(localStorage.getItem("user_msg"));
      if (localData) {
        let $b = "selectbrand";
        this.$axios
          .post("/api/selectBrand", {
            sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
            uid: localData.current_id,
            token_login: localData.current_token,
            type: type,
            keyword: keyword,
            pageNo: this.pageNo,
            applicantCn: this.keyword
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            if (data) {
              Indicator.close();
              if (data.code === 200) {
                if (data.content.res.length > 0) {
                  this.dataList = this.dataList.concat(data.content.res);
                } else {
                  this.more = false;
                  this.$refs.noMore.innerHTML = "已经到底了...";
                  return false;
                }
              } else if (data.code === 412) {
                Toast("服务器维护中...");
                return false;
              } else if (data.code === 410 || data.code === 411) {
                Toast("登录过期");
                this.$router.push({ name: "loginLink" });
              } else if (data.code === 414) {
                Toast("您还不是VIP，请先购买！");
                this.$router.push({ name: "buyVip" });
              } else if (data.code === 430) {
                // 无搜索记录的图片展示
                this.noData = true;
                return false;
              } else {
                Toast(data.msg);
                return false;
              }
            } else {
              Indicator.close();
              Toast("未知错误,请重试");
              return false;
            }
          })
          .catch(error => {
            Indicator.close();
            Toast("服务器维护中...");
            return false;
          });
      } else {
        Toast("请先登录");
        // Indicator.close();
        localStorage.clear();
        this.$router.push({ name: "loginLink" });
      }
    },

    //form搜索
    formSearch(type, keyword) {
      this.dataList = [];
      this.search(this.type, this.keyword);
    },

    //条件选择 打开遮罩
    toggleCover() {
      Indicator.close();
      this.selectListFlag = true;
      this.maskFlag = true;
    },

    //条件选择 关闭遮罩
    selectKeyWord(kid, index) {
      if (!this.keyword) {
        Toast("请先输入商标名称、申请人或申请号！");
        return false;
      } else {
        this.type = this.list[index].kid;
        this.selectListFlag = false;
        this.maskFlag = false;
        this.$refs.selectTxt.innerHTML = this.list[index].value;
        this.dataList = [];
        this.search(this.type, this.keyword);
      }
    },

    // 滚动 下来加载 上拉刷新
    scrollFn() {
      this.$nextTick(() => {
        if (!this.brandScroll) {
          this.brandScroll = new BScroll(this.$refs.brandScroll, {
            probeType: 3,
            click: true,
            scrollY: true
          });
        } else {
          this.brandScroll.refresh();
        }
        this.brandScroll.on("scroll", pos => {
          //如果下拉超过50px 就显示下拉刷新的文字
          if (pos.y > 50) {
            this.dropDown = true;
          } else {
            this.dropDown = false;
          }
        });

        this.brandScroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 50) {
            this.$refs.dropDown.innerHTML = "下拉刷新成功";
            this.dropDown = false;
          }

          // 上拉加载
          if (this.brandScroll.maxScrollY > pos.y + 10) {
            if (this.more) {
              this.pageNo++;
            } else {
              return false;
            }
            this.search(this.type, this.keyword);
          }
        });
      });
    },

    //获取商标详情
    getInfo(regNum, name) {
      this.infoFlag = true;
      this.maskFlag = true;
      this.brandDetail = {};
      this.$refs.child.initScroll();
      let $b = "selectbrand";
      this.$axios
        .post("/api/selectBrand", {
          sign: Base64.encode(this.$sha1(this.$md5($a + $b + $c))),
          uid: localData.current_id,
          token_login: localData.current_token,
          type: 4,
          regNo: regNum
        })
        .then(res => {
          return res.data;
        })
        .then(data => {
          if (data.code === 200) {
            this.brandDetail = data.content;
            this.brandName = name;
          } else {
            Toast(data.msg);
            return false;
          }
        });
    },

    //关闭蒙版
    closeMask() {
      this.infoFlag = false;
      this.maskFlag = false;
      this.selectListFlag = false;
    },

    //热门搜索查询
    hotSearch(keyword) {
      this.keyword = keyword;
      this.type = 1;
      this.$refs.selectTxt.innerHTML = "近似";
      this.search(1, keyword);
    }
  },
  computed: {
    myKeyword() {
      if (this.keyword.length > 0) {
        return false;
      } else {
        if (this.noData) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  components: {
    "brand-info": BrandInfo
  }
};
</script>

<style scoped lang="less">
@rem: 750/16rem;
.search-box {
  position: relative;
  .select-box {
    position: absolute;
    z-index: 99;
    width: 20%;
    height: 50px;
    line-height: 50px;
    .select-txt {
      text-align: right;
      font-size: 26 / @rem;
      padding-right: 14px;
    }
    .iconfont {
      position: absolute;
      top: 0;
      right: -4px;
    }
  }
}
.search {
  .mint-searchbar {
    height: 50px;
    width: 74%;
    margin-top: 4px;
    margin-left: 24%;
    padding: 0;
    background: #fff;
    .mint-searchbar-inner {
      background: #e4e4e4;
      border-radius: 4px;
      input {
        background: #e4e4e4;
      }
    }
  }
  .searchHot {
    border-top: 1px solid #f5f5f5;
    padding: 20 / @rem 20 / @rem 0 20 / @rem;
    .hot {
      font-size: 28 / @rem;
      color: #333;
    }
    .hotList {
      padding: 20 / @rem 0;
      overflow: hidden;
      li {
        font-size: 24 / @rem;
        float: left;
        padding: 10 / @rem 30 / @rem;
        background-color: #e8e8e8;
        color: #888;
        margin: 0 20 / @rem 20 / @rem 0;
      }
    }
  }
  .brandList {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    top: 100px;
    overflow: hidden;
    dl {
      padding: 20 / @rem;
      overflow: hidden;
      margin-bottom: 28 / @rem;
      padding-bottom: 28 / @rem;
      border-bottom: 1px solid #f5f5f5;
      dt {
        width: 132 / @rem;
        height: 132 / @rem;
        text-align: center;
        font-size: 30 / @rem;
        color: #999;
        line-height: 132 / @rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      dd {
        float: right;
        // padding-left: 20/@rem;
        width: 11.8rem;
        .title {
          font-size: 28 / @rem;
          font-weight: bold;
          padding-bottom: 16 / @rem;
          .category {
            float: right;
            font-size: 20 / @rem;
            background-color: #fef3dc;
            padding: 10 / @rem 20 / @rem;
            color: #ef9f00;
            font-weight: normal;
          }
        }
        .status {
          color: #ef9f00;
        }
        .status,
        .applicant,
        .applicantNumber {
          font-size: 22 / @rem;
          line-height: 34 / @rem;
        }
        .applicant,
        .applicantNumber {
          color: #666;
        }
      }
    }
    .noInner {
      text-align: center;
      font-size: 26 / @rem;
      columns: #999;
      line-height: 34 / @rem;
    }
  }
}
.noData {
  position: absolute;
  width: 148px;
  height: 156px;
  top: 50%;
  left: 50%;
  margin-left: -74px;
  margin-top: -78px;
  img {
    width: 100%;
  }
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
}
.select-list {
  position: absolute;
  top: 40%;
  left: 15%;
  z-index: 100;
  border-radius: 8px;
  width: 70%;
  background: #fff;
  ul {
    li {
      padding: 0 14px;
      font-size: 34 / @rem;
      line-height: 100 / @rem;
      border-bottom: 1px solid #f3f3f3;
      &:nth-last-of-type(1) {
        border-bottom: 0;
      }
    }
  }
}

.drop-down {
  text-align: center;
  line-height: 30px;
  font-size: 26 / @rem;
  color: #ccc;
}
</style>
