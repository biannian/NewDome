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
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="orderList" border>
                <el-table-column fixed="left" width="60" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="medium" @click="edit(scope.row)"
                  >详情
                </el-button>
              </template>
            </el-table-column>
            <el-table-column  prop="orderId" label="编号" width="50">
            </el-table-column>
            <el-table-column label="订单状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.orderState === -1">
                  <p>订单已取消</p>
                </span>
                <span v-if="scope.row.orderState === 0">
                  <p>买家已下单</p>
                </span>
                <span v-if="scope.row.orderState === 1">
                  <p>商家已确认订单</p>
                </span>
                <span v-if="scope.row.orderState === 2">
                  <p>骑手已取到外卖</p>
                </span>
                <span v-if="scope.row.orderState === 3">
                  <p>骑手已送达</p>
                </span>
                <span v-if="scope.row.orderState === 4">
                  <p>买家已确认收货</p>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="orderBuyerTime" label="下单时间" width="151">
            </el-table-column>

            <el-table-column
              prop="orderSellerTime"
              label="卖家确认订单时间"
              width="200"
            >
            </el-table-column>

            <el-table-column prop="orderRiderId" label="骑手ID" width="100">
            </el-table-column>
            <el-table-column
              prop="orderRiderTime"
              label="骑手取货时间"
              width="151"
            >
            </el-table-column>

            <el-table-column
              prop="orderRiderTime1"
              label="骑手送达时间"
              width="151"
            >
            </el-table-column>
            <el-table-column
              prop="orderBuyerTime1"
              label="买家确认收货时间"
              width="151"
            >
            </el-table-column>
        
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import api from "@/api/api";
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
export default {
  components: { SellerAside, SellerHeader },
  methods: {},
  data() {
    return {
      orderList: [],
    };
  },
  methods: {
    sellerOrder() {
      api
        .getLimit()
        .then((response) => {
          let a = {
            accountUserId: response.data.result.accountUserId,
          };
          api
            .sellerSelectOrder(a)
            .then((res) => {
              this.orderList = res.data.result;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.sellerOrder();
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