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
            <a style="font-size:20px" @click="toShop(shop)">{{ shop }}</a>
          </div>
          <div
            class="info"
            v-for="(order, index) in order"
            :key="'info-' + index"
          >
            订单号：{{ order.orderId }} 订单时间：{{ order.orderBuyerTime }}
 <!-- <el-timeline :reverse="reverse">
 
 <el-timeline-item
      v-for="(orderBuyerTime, index) in 5"
      :key="index"
     :timestamp="order.orderBuyerTime"
 >
      {{orderBuyerTime}}
    </el-timeline-item>
 </el-timeline> -->


            <p v-if="order.orderState == -1">订单状态：已取消</p>
            <p v-else-if="order.orderState == 0">订单状态：正在等待商家确认</p>
            <p v-else-if="order.orderState == 1">订单状态：商家已确认订单</p>
            <p v-else-if="order.orderState == 2">订单状态：骑手已取到订单</p>
            <p v-else-if="order.orderState == 3">订单状态：骑手已送达</p>
            <p v-else-if="order.orderState == 4">订单状态：买家已确认收货</p>
            <p v-else>订单状态：未知状态</p>
          </div>
          <div v-for="(orderDetail, key) in orderDetail" :key="key">
            <div>
              商品名: {{ orderDetail[key].commodityName }} 
               商品图：
                <img
                  style="width: 110px; height: 110px"
                  :src=" orderDetail[key].commodityImg"
                 
                >
              商品数量：
              {{ orderDetail[key].commodityNumber }}
           商品价格：
              {{ orderDetail[key].commodityPrice }} 
            </div>
        
          </div>
    订单总计：{{ totalMoney }} <br>
          <el-button @click="deleteOrder" size="mini" :disabled="!failState"
            >删除订单</el-button
          >
          <el-popover title="确定要取消订单吗" v-model="visi">
            <el-button @click="visi = false" size="mini">取消</el-button>
            <el-button size="mini" @click="fail()" type="primary"
              >确定</el-button
            >
            <el-button
              size="mini"
              :disabled="failState"
              @click="!visi"
              slot="reference"
              >取消订单</el-button
            >
          </el-popover>
          <el-popover title="确定收到商品了吗" v-model="visible">
            <el-button @click="visible = false" size="mini">取消</el-button>
            <el-button size="mini" @click="success(orderDetail)" type="primary"
              >确定</el-button
            >
            <el-button
              size="mini"
              @click="!visible"
              slot="reference"
              type="success"
              :disabled="state"
              >确认收货</el-button
            >
          </el-popover>
          <div v-if="evaluate">
               <el-rate v-model="shopScore" show-text> </el-rate>
              <el-button size="mini">评价</el-button>
          </div>
       
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import api from "@/api/api";
import topfile from "../topfile.vue";
export default {
  components: { topfile },
  data() {
    return {
      evaluate:false,
      shopScore: '',
      failState: false,
      state: true,
      visi: false,
      visible: false,
      activeIndex: "",
      orders: [],
      orderDetails: [],
      order: [],
      orderDetail: [],
      shops: new Map(),
      shop: [],
      money: "",
    };
  },
  watch: {
    order(value) {
      this.failState = false;
      this.state = true;
      if (value[0].orderState == 3) {
        this.state = false;
      }
      if (value[0].orderState == -1) {
        this.failState = true;
      }
      if (value[0].orderState == 4) {
        this.failState = true;
       
      }
    },
  },
  methods: {
    deleteOrder() {
      console.log(this.order[0].orderId);
      let a = {
        orderId: this.order[0].orderId,
      };
      this.$confirm("此操作将永久删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.deleteOrder(a).then((response) => {
            console.log(response);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.selectOrder();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    success(orderId) {
      let a = {
        orderId: orderId[0][0].shoppingOrderId,
        orderState: 4,
      };
      api
        .updateState(a)
        .then((response) => {
          if (response.data.result == 1) {
            Message.success("收货成功");
            this.selectOrder();
          }
        })
        .catch((error) => console.log(error));
      this.visible = false;
    },
    fail() {
      console.log(this.orderDetail);
      let a = {
        shopping: this.orderDetail[0],
        orderId: this.order[0].orderId,
        orderState: -1,
      };
      api
        .updateState(a)
        .then((response) => {
          console.log(response);
          if (response.data.result == 1) {
            Message.success("取消订单成功");
            this.selectOrder();
          }
        })
        .catch((error) => console.log(error));
      this.visi = false;
    },
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
          for (let i = 0; i < this.orderDetails[index].length; i++) {
            this.orderDetail.push(this.orderDetails[index]);
          }
        }
      }
    },
    goBack() {
      history.back();
    },
    toShop(shop) {
      console.log(shop);
      console.log(this.shops);
      for (const key in this.shops) {
        if (this.shops[key] == shop) {
          console.log(key);
          this.$router.push({ path: "/buyer/shop?shopId=" + key });
          break;
        }
      }
    },
    selectOrder() {
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
          this.activeIndex = this.orders[
            this.orders.length - 1
          ].orderId.toString();
          this.select(this.activeIndex);
        });
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
    this.selectOrder();
  },
};
</script>

<style>
</style>