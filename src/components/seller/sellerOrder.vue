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
          <div class="r" v-for="(order, index) in Orders" :key="'r'+index">
            <span>{{ order.orderId }}</span>
         
            <el-button @click="confirm(order.orderId)">确认订单</el-button>
         
          </div>
          <div v-for="(shopping, inde) in shoppings" :key="inde">
            <div v-for="(shop, ind) in shopping" :key="ind">
              <el-image
                style="width: 100px; height: 80px"
                :src="shop.commodityImg"
              ></el-image>
              <span>{{ shop.commodityName }}</span>
              <span>{{ shop.commodityPrice }}*</span>
              <span>{{ shop.commodityNumber }}</span>
            </div>
            <br><br>
          </div>
          <div class="info" v-for="(buyer, key) in buyers" :key="'info-' + key">
            <span>{{ buyer.buyerAccountName }}</span>
            <span>{{ buyer.buyerName }}</span>
            <span>{{ buyer.buyerSex }}</span>
            <span>{{ buyer.buyerAddress }}</span>
            <span>{{ buyer.buyerTel }}</span>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
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
      Orders: [],
      buyers: [],
      shoppings: [],
    };
  },
  methods: {
    confirm(order){
      let a = {
        orderId : order,
        orderState : '1' 
      }
      api
      .updateState(a)
      .then((res)=>{
        if (res.data.result == 1 ) {
          Message.success("修改成功");
          
        }else{
          Message.error("修改失败")
        }
        this.sellerSelectOrderById();
      })
    },
    sellerSelectOrderById() {
      api
        .getLimit()
        .then((response) => {
          let a = {
            accountUserId: response.data.result.accountUserId,
          };
          api.sellerSelectOrderById(a).then((res) => {
            this.Orders = res.data.result.Orders;
            this.buyers = res.data.result.buyers;
            this.shoppings = res.data.result.shoppings;
          });
        })
        .catch((err) => {
          console.log(err);
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