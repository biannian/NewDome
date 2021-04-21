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
          <el-breadcrumb-item>退款管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="Orders" border>
            <el-table-column fixed="left" width="150" label="操作">
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="toDetail(scope.row)"
                    
                    >查看</el-button
                  > 
                  <el-button
                    size="mini"
                    @click="confirm(scope.row)"
                    
                    >通过</el-button
                  > 
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="编号" width="50">
            </el-table-column>
              <el-table-column label="订单状态" width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.orderState === -2">
                  <p style="color:red">正在退款中</p>
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
            <el-table-column prop="orderTips" label="订单备注" width="180">
            </el-table-column>
            <el-table-column prop="tableware" label="餐具" width="70">
            </el-table-column>
            <el-table-column prop="orderBuyerTime" label="下单时间" width="160">
            </el-table-column>
            <el-table-column
              prop="buyerAddress.buyerAddress"
              label="收货地址"
              width="400"
            >
            </el-table-column>
            <!-- <el-table-column label="商品" :width="commodityWidth * 165">
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
            </el-table-column> -->
          </el-table>
          <br />
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[5, 10,15,20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
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
      size: "",
      current: "",
      total: 0,
      commodityWidth: "",
      Orders: [],
    };
  }, 
  methods: {
      toDetail(val) { 
      var order = JSON.stringify(val); 
      this.$router.push({
        path: "/seller/sellerOrderDetail",
        query: { order: order },
      });
    },
    handleSizeChange(val) {
      this.sellerSelectOrderById(val, this.current);
    },
    handleCurrentChange(val) {
      this.sellerSelectOrderById(this.size, val);
    }, 
    confirm(order) {
      let t = new Date();
      let time = dateFormat("YYYY-mm-dd HH:MM:SS", t);
      let a = {
        orderSellerTime: time,
        orderId: order.orderId,
        orderState: "-1",
      };
      api.updateState(a).then((res) => {
        if (res.data.result == 1) {
          Message.success("通过退款成功"); 
        } else {
          Message.error("通过退款失败");
        }
        this.sellerSelectOrderById(4, 1);
      });
    },
    sellerSelectOrderById(size, current) {
      this.size = size;
      this.current = current;
      let param = {
        shopId: sessionStorage["shopId"],
        orderState:-2 
      };
      api.queryOrder(param).then((res) => {
        if (res.data.result) {
          var order = res.data.result.reverse(); 
          var max = 0;
          var newSize = size;
          var orders = [];
          var number = (current - 1) * size;
          order.forEach((element) => {
            if ((number -= 1) < 0) {
              if ((newSize -= 1) >= 0) {
                orders.push(element);
              }
            }
          });
          orders.forEach((element) => {
            if (element.shopping.length > max) {
              max = element.shopping.length;
            }
          });
          this.total = order.length;
          this.commodityWidth = max;
          this.Orders = orders;
        }
      });
    },
  },
  mounted() {
    this.sellerSelectOrderById(5, 1);
  },
};
</script> 
<style>
.el-header {
  background-color: #b3c0d1;
  color: rgb(51, 51, 51);
  line-height: 60px;
}
.el-aside {
  color: #333;
}
</style>