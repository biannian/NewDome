<template>
  <div>
    <el-container>
      <el-header>
        <div style="width: 15%; float: left; margin-top: 50px">
          <el-page-header @back="goBack" content="店铺详情" ></el-page-header>
        </div>
        <div style="width: 30%; color:#409EFF; margin-top:3%;float: left; font-size: 25px;">   
        {{shopName}}
        </div>
        <div style="width: 50%; float: right">
          <Topfile></Topfile>
        </div>
      </el-header>
    </el-container>
    <div style="margin-top: 20px">
      <hr />
      <div style="width: 65%; float: left; margin-left: 10px">
        <el-container style="height: 550px; border: 1px solid #eee">
          <el-aside width="25%">
            <el-menu :default-active="curActive" @select="handleSelect">
              <p style="font-size: 20px; margin-left: 30px; margin-top: 10px">
                菜单
              </p>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(shopMenus, indexId) in shopMenu"
                  @click="goAssignBlock('block' + indexId, 50)"
                  :key="indexId"
                  :index="'' + indexId"
                >
                  {{ shopMenus }}
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-aside>
          <el-main ref="dishes">
            <el-row>
              <el-col
                style="float: left"
                :span="8"
                v-for="(commodity, index) in commoditys"
                :key="index"
                class="block"
                :ref="'block' + commodity.commodityMenuId"
              >
                <el-card :body-style="{ padding: '10px' }" shadow="hover">
                  <img
                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                    class="image"
                    style="border-radius: 5px"
                  />
                  <div style="font-size: 20px">
                    <span>{{ commodity.commodityName }} </span>
                  </div>
                  <div style="font-size: 12px">
                    <span>库存{{ commodity.commodityNumber }} </span>
                  </div>
                  <div
                    style="
                      font-size: 26px;
                      color: red;
                      margin-top: 20px;
                      margin-left: 9px;
                      width: 50%;
                      float: left;
                    "
                  >
                    <span>¥{{ commodity.commodityPrice }}</span>
                  </div>
                  <div style="margin-top: 20px">
                    <el-button
                      :disabled="
                        !(commodity.commodityNumber > 0 && commodity.numberOn)
                      "
                      icon="el-icon-plus"
                      circle
                      type="warning"
                      class="button"
                      @click="add(commodity)"
                    ></el-button>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
      </div>
      <div style="width: 34%; height: 550px; float: right; overflow-y: scroll">
        <p style="padding-left: 40%; color: #e6a23c; font-size: 20px">购物车</p>

        <div v-for="(commodity, index) in shopping" :key="index">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div style="float: left">
              <img
                style="width: 70px"
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
            </div>
            <div>
              <h4>
                <span
                  style="
                    color: black;
                    font-weight: 400;
                    float: left;
                    margin-left: 20px;
                  "
                  >{{ commodity.commodityName }}</span
                >
              </h4>
              <br />
            </div>
            <div
              style="
                color: red;
                font-size: 16px;
                margin-top: 15px;
                margin-left: 100px;
              "
            >
              ¥{{ commodity.commodityPrice }}
            </div>
            <div style="float: right; margin-top: -40px; margin-right: 50px">
              <el-button
                circle
                icon="el-icon-minus"
                size="mini"
                @click="buttonDelete(commodity, index)"
              ></el-button>
              {{ commodity.a }}
              <el-button
                circle
                icon="el-icon-plus"
                size="mini"
                @click="buttonAdd(commodity)"
                :disabled="
                  !(commodity.commodityNumber > 0 && commodity.numberOn)
                "
              ></el-button>
            </div>
          </el-card>
        </div>
        <div
          style="position: absolute; right: 81px; bottom: 32px; z-index: 100"
        >
          <el-button round @click="pay" type="success">支付</el-button>
        </div>
        <el-card class="box-card" style="border-radius: 30px">
          <p style="position: absolute; top: 6px">
            合计: &nbsp;&nbsp;&nbsp; ¥{{ totalMoney }}
          </p></el-card
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import dateFormat from "../../utils/time";
import Topfile from "../topfile.vue";
import api from "@/api/api";
import Index from "./index.vue";
export default {
  components: { Topfile, Index },
  data() {
    return {
      shopName:"",
      shopMenu: "",
      curActive: "",
      indexId: "",
      orderBuyerId: "",
      shopInfo: "",
      commoditys: [],
      shopId: "",
      shopping: [],
      src:
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=33737620,2959296915&fm=26&gp=0.jpg",
      obj: {},
    };
  },
  computed: {
    totalMoney() {
      let sum = 0;
      for (let index = 0; index < this.shopping.length; index++) {
        sum +=
          parseFloat(this.shopping[index].a) *
          parseFloat(this.shopping[index].commodityPrice);
      }
      return sum;
    },
  },

  methods: {
    pay() {
      let t = new Date();
      let time = dateFormat("YYYY-mm-dd HH:MM:SS", t);
      console.log(time);
          let shop = {
            orderBuyerId: sessionStorage["userName"],
            shopId: this.$route.query.shopId,
            orderState: 0,
            orderBuyerTime: time,
            shopping:this.shopping
          };
      api
        .addOrder(shop)
        .then((response) => {
         if(response.data.code == '200')
         {
             Message.success("支付成功");
             
               this.timer = setTimeout(() => {
              //设置延迟执行
              this.$router.push({ path: "/buyer/order" });
            }, 800);
         }else{
             Message.error("购买失败");
         }
        })
        .catch((error) => console.log(error));
      console.log(shop);
    },
    handleSelect() {},

    buttonAdd(commodity) {
      if (++commodity.a >= commodity.commodityNumber) {
        commodity.numberOn = false;
      }
      this.shopping.push({});
      this.shopping.splice(this.shopping.length - 1, 1);
    },
    buttonDelete(commodity, index) {
      if (commodity.a <= "1") {
        this.shopping.splice(index, 1);
        commodity.a = 0;
      } else {
        --commodity.a;
        commodity.numberOn = true;
      }
      this.shopping.push({});
      this.shopping.splice(this.shopping.length - 1, 1);
    },

    add(commodity) {
      if (++commodity.a >= commodity.commodityNumber) {
        commodity.numberOn = false;
      }
      let fl = false;
      for (let i = 0; i < this.shopping.length; i++) {
        if (this.shopping[i].commodityId == commodity.commodityId) {
          fl = true;
          break;
        }
      }
      if (!fl) {
        this.shopping.push(commodity);
      }

      this.shopping.push({});
      this.shopping.splice(this.shopping.length - 1, 1);
      // let map = new Map()
      // map.set(commodity.commodityId,commodity)
      // map.get(commodity.commodityId)
    },
    goBack() {
      this.$router.push({ path: "/buyer/Helloword" });
    },

    //el 标签  speed 滚动速率 此处是50px 值越大滚动的越快
    goAssignBlock(el, speed) {
      // let windowH = window.innerHeight; //浏览器窗口高度
      // let h = this.$refs[el][0].$el.offsetHeight; //模块内容高度
      let t = this.$refs[el][0].$el.offsetTop; //模块相对于内容顶部的距离
      console.log(t);
      //let top = t - (windowH - h) / 2; //需要滚动到的位置，若改为 t 则滚动到模块顶部位置，此处是滚动到模块相对于窗口垂直居中的位置
      let top = t; //需要滚动到的位置，若改为 t 则滚动到模块顶部位置，此处是滚动到模块相对于窗口垂直居中的位置
      let scrollTop = this.$refs.dishes.$el.scrollTop; //滚动条距离顶部高度
      let currentTop = scrollTop; //默认滚动位置为当前滚动条位置，若改为0，则每次都会从顶部滚动到指定位置
      let requestId;
      //采用requestAnimationFrame，平滑动画
      let step = () => {
        //判断让滚动条向上滚还是向下滚
        if (scrollTop < top) {
          if (currentTop <= top) {
            //   window.scrollTo(x,y) y为上下滚动位置
            this.$refs.dishes.$el.scrollTo(0, currentTop);
            requestId = requestAnimationFrame(step);
          } else {
            cancelAnimationFrame(requestId);
          }
          //向下滚动
          currentTop += speed;
        } else {
          if (top <= currentTop) {
            //注：此处 - speed 是解决居中时存在的问题，可自行设置或去掉
            this.$refs.dishes.$el.scrollTo(0, currentTop - speed);
            requestId = requestAnimationFrame(step);
          } else {
            cancelAnimationFrame(requestId);
          }
          //向上滚动
          currentTop -= speed;
        }
      };
      requestAnimationFrame(step);
    },
  },
  mounted() {
    let shops = {
      shopId: this.$route.query.shopId,
    };
    api.shopQueryById(shops).then((res) => {
      console.log(res);
      this.shopInfo = res.data.result.shop;
      this.commoditys = res.data.result.shop.commodity;
      for (const iterator of this.commoditys) {
        iterator.numberOn = true;
        iterator.a = 0;
      }
      this.shopMenu = res.data.result.shopMenu;

      this.shopName = res.data.result.shop.shopName;
    });
  },
};
</script>


<style>
.shopInfo {
  clear: both;
  width: 0px;
  height: 0px;
  overflow: hidden;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 0px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.box-card {
  background-color: #409eff;
  width: 300px;
  height: 42px;
  font-size: 20px;
  color: aliceblue;
  position: absolute;
  right: 80px;
  bottom: 31px;
}
</style>