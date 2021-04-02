<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <seller-aside></seller-aside>
      </el-aside>
      <el-container>
        <el-header>
          <seller-header></seller-header>
        </el-header>

        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-top: 20px; margin-left: 20px"
        >
          <el-breadcrumb-item :to="{ path: '/seller/sellerIndex' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>订单确认</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="Orders" border>
            <el-table-column fixed="left" width="110" label="操作">
              <template slot-scope="scope">
               <span> <el-button size="mini" @click="confirm(scope.row)" type="success"
                  >确认订单</el-button
                ></span>
              
                 <span> <el-button  size="mini" @click="confirm(scope.row)"  type="danger"
                  >取消订单</el-button
                ></span>
               
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="编号" width="50">
            </el-table-column>
            <el-table-column prop="orderBuyerTime" label="下单时间" width="160">
            </el-table-column>
            <el-table-column
              prop="buyerAddress.buyerAddress"
              label="收货地址"
              width="200"
            >
            </el-table-column>
            <el-table-column label="商品" :width="commodityWidh* 145">
              <template slot-scope="scope">
                <span
                  v-for="(shopping, index) in scope.row.shopping"
                  :key="index"
                >
                  <img
                    width="70px"
                    height="70px"
                    :src="shopping.commodityImg"
                  />
                  {{ shopping.commodityName }}*{{ shopping.commodityNumber }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import dateFormat from "../../utils/time";
import api from "@/api/api";
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
import Index from "../buyer/index.vue";
import { Message } from "element-ui";
export default {
  components: { SellerAside, SellerHeader, Index },
  methods: {},
  data() {
    return {
      commodityWidh: "",
      Orders: [],
    };
  },

  methods: {
    confirm(order) { 
      let t = new Date();
      let time = dateFormat("YYYY-mm-dd HH:MM:SS", t);
      let a = {
        orderSellerTime: time,
        orderId: order.orderId,
        orderState: "1",
      };
      api.updateState(a).then((res) => {
        if (res.data.result == 1) {
          Message.success("确认订单成功");
        } else {
          Message.error("确认失败");
        }
        this.sellerSelectOrderById();
      });
    },
    sellerSelectOrderById() {
      let param = {
        shopId: sessionStorage["shopId"],
      };
      api.queryOrder(param).then((res) => {
 
        if (res.data.result) {
          this.Orders = res.data.result;
          var order = res.data.result;
            var max = 0;
          order.forEach((element) => { 
            if (element.shopping.length > max) {
              max = element.shopping.length;
            } 
          });
          this.commodityWidh = max;
         
        }
      });
    },
  },
  mounted() {
    this.sellerSelectOrderById();
  },
};
</script> 
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>