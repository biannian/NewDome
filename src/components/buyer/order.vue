<template>
  <div>
    <el-container>
      <el-header>
        <div style="width: 15%; float: left; margin-top: 50px">
          <el-page-header @back="goBack" content="订单详情"></el-page-header>
        </div>
        <div style="width: 50%; float: right">
          <topfile></topfile>
        </div>
      </el-header>
    </el-container>
    <div style="margin-top: 20px">
      <hr />
      <el-container style="height: 550px; border: 1px solid #eee">
        <el-aside width="20%">
          <el-menu @select="select" :default-active="activeIndex">
            <p style="font-size: 20px; margin-left: 100px; margin-top: 10px">
              订单编号
            </p>
            <el-menu-item-group>
              <el-menu-item
                v-for="(orders, indexId) in orders"
                :key="indexId"
                :index="orders.orderId.toString()"
              >
                <p style="margin-left: 50px">{{ orders.orderId }}</p>
              </el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="inf" v-for="(shop, index) in shop" :key="'inf-' + index">
            <p @click="toShop(shop)">{{ shop }}</p>
          </div>
          <div class="info" v-for="(order, index) in order" :key="index">
            订单号：{{ order.orderId }} 订单时间：{{
              order.orderBuyerTime
            }}
            订单状态：{{ order.orderState }}
          </div>
          <div
            class="info2"
            v-for="(orderDetail, key) in orderDetail"
            :key="'info2-' + key"
          >
            商品名: {{ orderDetail[0].commodityName }} 商品数量：
            {{ orderDetail[0].commodityNumber }} 商品图：
            {{ orderDetail[0].commodityImg }} 商品价格：
            {{ orderDetail[0].commodityPrice }} 订单总计：{{ totalMoney }}
          </div>
          <!-- <div :v-if=""> -->
          <el-button size="mini">取消订单</el-button>
          <el-button size="mini" type="success">确认收货</el-button>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
import topfile from "../topfile.vue";
export default {
  components: { topfile },
  data() {
    return {
      activeIndex:"",
      orders: [],
      orderDetails: [],
      order: [],
      orderDetail: [],
      shops: new Map(),
      shop: [],
      money: "",
    };
  },
  methods: {
    select(orderId) {
      this.shop = [];
      this.order = [];
      this.orderDetail = [];
      for (let index = 0; index < this.orders.length; index++) {
        //当订单信息里的订单编号和点击的订单号相同时把订单信息放到集合里
        if (this.orders[index].orderId == orderId) {
          this.order.push(this.orders[index]);
          this.shop.push(this.shops[this.orders[index].shopId]);
        }
        //当订单商品里的订单编号和点击的订单号相同时把商品放到集合里
        if (this.orderDetails[index][0].shoppingOrderId == orderId) {
          this.orderDetail.push(this.orderDetails[index]);
        }
      }
    },
    goBack() {
      history.back();
    },
    toShop(shop) {
      for (const key in this.shops) {
        if ((this.shops[key] = shop)) {
          this.$router.push({ path: "/buyer/shop?shopId=" + key });
          break;
        }
      }
    },
  },
  computed: {
    totalMoney() {
      let sum = 0;
      for (let i = 0; i < this.orderDetail.length; i++) {
        sum +=
          this.orderDetail[0][i].commodityNumber *
          this.orderDetail[0][i].commodityPrice;
      }
      return sum;
    },
  },
  mounted() {
    let params = {
      orderBuyerId: sessionStorage["userName"],
    };
    api
      .selectOrder(params)
      .then((response) => {
        this.orders = response.data.result.orders;
        this.shops = response.data.result.shops;
        this.orderDetails = response.data.result.shoppings;
      })
      .catch((error) => console.log(error))
      .finally(() => {
       this.activeIndex =this.orders[this.orders.length-1].orderId.toString();
        this.select(this.activeIndex);
      })
       
  },
};
</script>

<style>
</style>