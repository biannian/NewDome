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
            <el-table-column prop="orderId" label="编号" width="50">
            </el-table-column>
            <el-table-column label="订单状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.orderState === -2">
                  <p>正在退款</p>
                </span>
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
                <span v-if="scope.row.orderState === 5">
                  <p>买家已评论</p>
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

            <el-table-column prop="orderRiderId" label="骑手" width="100">
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
            <el-table-column
              prop="buyerAddress.buyerAddress"
              label="收货地址"
              width="200"
            >
            </el-table-column>
            <el-table-column label="商品" :width="commodityWidh * 145">
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
<br/>
         <div class="block">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[4, 8]"
      :page-size="4"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
export default {
  components: { SellerAside, SellerHeader },
  methods: {},
  data() {
    return {
      total:'',
      orderList: [],
    };
  },
  methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    sellerOrder(size,current) {
      let param = {
        shopId: sessionStorage["shopId"],
        orderState: "1",
      };
      api.queryOrder(param).then((res) => {
        if (res.data.result) {
    
          var order = res.data.result;
          var max = 0;
          var total = 0;
          var orders = [];
          order.forEach((element) => {
            if((size -= 1) >= 0){
    orders.push(element);
    console.log(size);
            }
         
            total += 1;
            if (element.shopping.length > max) {
              max = element.shopping.length;
            }
          });
          this.total =total;
          this.commodityWidh = max;
            this.orderList=orders;
        }
      });
    },
  },

  mounted() {
    this.sellerOrder(4,4);
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