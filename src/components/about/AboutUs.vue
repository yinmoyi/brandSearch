<template>
  <div class="aboutUs">
    <mt-header title="集团简介">
      <router-link slot="left" :to="{name:'userLink'}">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="introBox" ref="introScroll">
      <div>
        <div class="aboutBox">
          <h4>
            <span></span>集团介绍
          </h4>
          <p>华甯科技集团，专注于提供金融行业软件私人定制开发及解决方案，拥有一支专业化的服务队伍和国际先进技术。隶属于上海华裴集团，在集团的帮助下，与金融企业长期的交流合作，能够真正了解金融业务的需求，提供专业的开发及顾问服务，为金融企业裁剪出一套适合自身业务需要的解决方案。</p>
          <p>雄厚的技术实力和优质的客户服务，赢得了大量客户的广泛信任与支持。华甯科技以一流IT企业为目标，本着“为客户创造价值”、“为社会创造进步”的经营理念，致力于为广大客户提供及时、周到、专业、优质的服务，打造一流的产品和技术。</p>
          <p>公司重视提供整体解决方案，重视和客户建立长期互赢合作，追求精益求精，始终把100%满足客户要求作为公司竭力实现的目标。</p>
        </div>
        <div class="aboutBox">
          <h4>
            <span></span>发展历程
          </h4>
          <ul class="development">
            <li>
              <p class="date">2017年11月</p>
              <p class="txt">上海华甯信息科技公司成立</p>
            </li>
            <li>
              <p class="date">2018年04月</p>
              <p class="txt">网络借贷平台开发成功、并获得软件著作证书</p>
            </li>
            <li>
              <p class="date">2018年05月</p>
              <p class="txt">金融理财平台、车对账系统、贷后风险管理系统、线上商超系统开发成功，获得软件著作证书</p>
            </li>
            <li>
              <p class="date">2018年06月</p>
              <p class="txt">信贷决策支持系统、Android客户端软件、车贷互联网金融系统征信数据服务系统开发成功</p>
            </li>
            <li>
              <p class="date">2018年08月</p>
              <p class="txt">二手车交易服务软件、小程序软件开发成功，获得软件著作证书</p>
            </li>
            <li>
              <p class="date">2018年09月</p>
              <p class="txt">综合支付商户信息管理系统软件，并获得软件著作证书，机器人研究中心成立</p>
            </li>
            <li>
              <p class="date">2018年10月</p>
              <p class="txt">升级为上海华甯科技(集团)有限公司</p>
            </li>
            <li>
              <p class="date">2019年01月</p>
              <p class="txt">上股交挂牌成功(股票代码211116)</p>
            </li>
          </ul>
        </div>
        <div class="aboutBox">
          <h4>
            <span></span>组织架构
          </h4>
          <div class="zuzhiImg">
            <img src="../about/img/zuzhi.png">
          </div>
        </div>
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
      new BScroll(this.$refs.introScroll, { click: true, scrollY: true });
    }
  }
};
</script>

<style scoped lang="less">
@rem: 750/16rem;
.introBox {
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.aboutBox {
  padding: 0 14px;
  &:nth-of-type(1) {
    padding-top: 10px;
  }
  h4 {
    line-height: 80 / @rem;
    font-size: 32 / @rem;
    color: #ef9f00;
    span {
      display: inline-block;
      width: 4px;
      height: 32 / @rem;
      vertical-align: middle;
      background-color: #ef9f00;
      margin-right: 6px;
    }
  }
  p {
    font-size: 28 / @rem;
    color: #666;
    text-indent: 2em;
    line-height: 40 / @rem;
    margin-bottom: 14px;
  }
  ul {
    li {
      p {
        margin-bottom: 0;
        text-indent: 0;
      }
      .date {
        color: #333;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }
  .zuzhiImg {
    img {
      width: 100%;
    }
  }
}
</style>
