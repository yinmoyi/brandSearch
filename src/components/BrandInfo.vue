<template>
  <transition name="move">
    <div class="brandInfo">
      <!-- 商标详情 -->
      <div class="brandInfo" ref="brandInfoScroll">
        <div class="infoLIst">
          <div class="tmImage">
            <img :src="brandDetail.tmImg_middle" alt>
          </div>
          <div class="tableMsg">
            <p class="title">{{brandName}}</p>
            <table>
              <tr>
                <td>
                  国际分类：
                  <span>{{brandDetail.intCls}}</span>
                </td>
                <td>申请号：{{brandDetail.regNo}}</td>
              </tr>
            </table>
          </div>
          <div class="otherMsg">
            <div class="zhuti">
              <p class="title">申请主体</p>
              <ul>
                <li>
                  <p class="tit">申请人名称</p>
                  <p class="txt">{{brandDetail.applicantCn}}</p>
                </li>
                <li>
                  <p class="tit">申请人名称(英文)</p>
                  <p class="txt">{{brandDetail.applicantEn}}</p>
                </li>
                <li>
                  <p class="tit">申请人地址</p>
                  <p class="txt">{{brandDetail.addressCn}}</p>
                </li>
                <li>
                  <p class="tit">申请人地址(英文)</p>
                  <p class="txt">{{brandDetail.addressEn}}</p>
                </li>
                <li>
                  <p class="tit">代理机构</p>
                  <p class="txt">{{brandDetail.agent}}</p>
                </li>
              </ul>
            </div>
            <div class="goods">
              <p class="title">商品信息</p>
              <table>
                <tr>
                  <th>群组号</th>
                  <th>名称</th>
                  <th>是否已删除</th>
                </tr>
                <tr v-for="(item,index) in brandDetail.goods" :key="index">
                  <td>{{item.goodsCode}}</td>
                  <td>{{item.goodsName}}</td>
                  <td>{{item.beDeleted == "true" ? "是":"否" }}</td>
                </tr>
              </table>
            </div>
            <div class="fljd">
              <p class="title">法律节点</p>
              <table>
                <tr>
                  <td>申请日期</td>
                  <td>初审日期</td>
                </tr>
                <tr>
                  <td class="date">{{brandDetail.appDate}}</td>
                  <td class="date">{{brandDetail.announcementDate}}</td>
                </tr>
                <tr>
                  <td>专用权期限</td>
                  <td>注册公告日期</td>
                </tr>
                <tr>
                  <td class="date">{{brandDetail.privateDate}}</td>
                  <td class="date">{{brandDetail.regDate}}</td>
                </tr>
              </table>
            </div>
            <div class="status">
              <p class="title">商标状态流程</p>
              <ul>
                <li v-for="(item,index) in brandDetail.flow" :key="index">
                  <i></i>
                  {{item.flowName}}
                  <span>{{item.flowDate}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";
import { Toast } from "mint-ui";
export default {
  name: "brandInfo",
  props: {
    brandDetail: {
      type: Object,
      default: {}
    },
    brandName: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    initScroll() {
      this.brandScroll = new BScroll(this.$refs.brandInfoScroll, {
        mouseWheel: true,
        click: true,
        tap: true
      });
    }
  }
};
</script>

<style lang="less" scoped>
@rem: 750/16rem;
.brandInfo {
  width: 100%;
  height: 100%;
  max-height: 360px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  z-index: 100;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.2);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  .infoLIst {
    padding-top: 10px;
    .tmImage {
      width: 130 / @rem;
      height: 130 / @rem;
      margin: 0 auto;
      display: flex;
      display: -webkit-flex;
      align-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .tableMsg {
      padding: 0 14px;
      .title {
        font-size: 32 / @rem;
        line-height: 80 / @rem;
        text-align: center;
      }
      table {
        font-size: 26 / @rem;
        width: 100%;
        tr {
          height: 60 / @rem;
          td {
            height: 60 / @rem;
            line-height: 60 / @rem;
            text-align: center;
            border: 1px solid #e8e8e8;
            color: #888;
          }
        }
      }
    }
    .otherMsg {
      padding: 14px;
      .zhuti {
        .title {
          font-size: 32 / @rem;
          font-weight: bold;
          padding: 16px 0 10px;
        }
        ul {
          li {
            .tit {
              font-size: 28 / @rem;
              color: #444;
              padding-top: 6px;
            }
            .txt {
              font-size: 26 / @rem;
              color: #888;
              padding: 6px 0;
            }
          }
        }
      }
      .goods {
        .title {
          font-size: 32 / @rem;
          font-weight: bold;
          padding: 16px 0 10px;
        }
        table {
          font-size: 26 / @rem;
          width: 100%;
          tr {
            height: 60 / @rem;
            th {
              height: 60 / @rem;
              line-height: 60 / @rem;
              text-align: center;
              border: 1px solid #e8e8e8;
            }
            td {
              height: 60 / @rem;
              line-height: 60 / @rem;
              text-align: center;
              border: 1px solid #e8e8e8;
            }
          }
        }
      }
      .fljd {
        .title {
          font-size: 32 / @rem;
          font-weight: bold;
          padding: 10px 0;
        }
        table {
          font-size: 26 / @rem;
          width: 100%;
          tr {
            height: 60 / @rem;
            td {
              height: 60 / @rem;
              line-height: 60 / @rem;
              text-align: center;
              border: 1px solid #e8e8e8;
              &.date {
                color: #888;
              }
            }
          }
        }
      }
      .status {
        .title {
          font-size: 32 / @rem;
          font-weight: bold;
          padding: 16px 0 10px;
        }
        ul {
          li {
            font-size: 26 / @rem;
            color: #666;
            line-height: 60 / @rem;
            i {
              display: inline-block;
              height: 28 / @rem;
              width: 4px;
              background: #888;
              vertical-align: middle;
              margin-right: 4px;
            }
            &:nth-last-child(1) {
              color: #ef9f00;
              i {
                color: #ef9f00;
              }
            }
          }
        }
      }
    }
  }
}

.move-enter-active,
.move-leave-active {
  transition: all linear 0.5s;
}
.move-enter,
.move-leave-to {
  transform: translateY(50%);
}
</style>
