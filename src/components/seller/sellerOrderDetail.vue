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
          <el-breadcrumb-item :to="{ path: '/seller/sellerOrderList' }"
            >订单列表</el-breadcrumb-item
          >
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <div  class="detail-container">
            <div>
              <el-steps :active="order.orderState + 1">
                <el-step
                  title="买家已下单"
                  :description="order.orderBuyerTime"
                ></el-step>
                <el-step
                  title="商家已确认订单"
                  :description="order.orderSellerTime"
                ></el-step>
                <el-step
                  title="骑手已取到外卖"
                  :description="order.orderRiderTime"
                ></el-step>
                <el-step
                  title="骑手已送达"
                  :description="order.orderRiderTime1"
                ></el-step>
                <el-step
                  title="买家已确认收货"
                  :description="order.orderBuyerTime1"
                ></el-step>
                <el-step title="订单完成"></el-step>
              </el-steps>
            </div>
            <el-card shadow="never" style="margin-top: 15px">
              <div class="operate-container">
                <i
                  class="el-icon-warning color-danger"
                  style="margin-left: 20px"
                ></i>
                <span class="color-danger"
                  >当前订单状态：{{ order.orderState | formatStatus }}</span
                >
              </div>

              <div style="margin-top: 20px">
                <i icon-class="marker" style="color: #606266"></i>
                <span class="font-small">基本信息</span>
              </div>
              <div class="table-layout">
                <el-row>
                  <el-col :span="4" class="table-cell-title">订单编号</el-col>
                  <el-col :span="6" class="table-cell-title">用户账号</el-col>
                  <el-col :span="8" class="table-cell-title">订单备注</el-col>
                  <el-col :span="6" class="table-cell-title">餐具数量</el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" class="table-cell">{{
                    order.orderId
                  }}</el-col>
                  <el-col :span="6" class="table-cell">{{
                    order.orderBuyerAccount
                  }}</el-col>
                  <el-col :span="8" class="table-cell">
                    <el-popover
                      placement="top-start"
                      title="订单备注"
                      width="250"
                      trigger="hover"
                      :content="order.orderTips"
                    >
                      <span slot="reference">{{ order.orderTips }}</span>
                    </el-popover>
                  </el-col>
                  <el-col :span="6" class="table-cell">{{
                    order.tableware
                  }}</el-col>
                </el-row>
              </div>

              <div style="margin-top: 20px">
                <i icon-class="marker" style="color: #606266"></i>
                <span class="font-small">收货人信息</span>
              </div>
              <div class="table-layout">
                <el-row>
                  <el-col :span="6" class="table-cell-title">收货人</el-col>
                  <el-col :span="6" class="table-cell-title">手机号码</el-col>
                  <el-col :span="12" class="table-cell-title">收货地址</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="table-cell">{{
                    order.buyerAddress.buyerName
                  }}</el-col>
                  <el-col :span="6" class="table-cell">{{
                    order.buyerAddress.buyerTel
                  }}</el-col>
                  <el-col :span="12" class="table-cell">
                       <el-popover
                      placement="top-start"
                      title="收货地址"
                      width="280"
                      trigger="hover"
                      :content="  order.buyerAddress.buyerAddress"
                    >
                      <span slot="reference"> {{
                    order.buyerAddress.buyerAddress
                  }}</span>
                    </el-popover>
                   </el-col>
                </el-row>
              </div>

              <div style="margin-top: 20px">
                <i icon-class="marker" style="color: #606266"></i>
                <span class="font-small">商品信息</span>
              </div>
              <el-table
                ref="orderItemTable"
                :data="order.shopping"
                style="width: 100%; margin-top: 20px"
                border
              >
              
                <el-table-column label="商品图片" width="160" align="center">
                  <template slot-scope="scope">
                    <img :src="scope.row.commodityImg" style="height: 80px" />
                  </template>
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                  <template slot-scope="scope">
                    <p>{{ scope.row.commodityName }}</p>
                  </template>
                </el-table-column>
                <el-table-column label="价格/货号" width="120" align="center">
                  <template slot-scope="scope">
                    价格：￥{{ scope.row.commodityPrice }}
                  </template>
                </el-table-column>

                <el-table-column label="数量" width="120" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.commodityNumber }}
                  </template>
                </el-table-column>
                <el-table-column label="小计" width="120" align="center">
                  <template slot-scope="scope">
                    ￥{{ scope.row.commodityPrice * scope.row.commodityNumber }}
                  </template>
                </el-table-column>
              </el-table>
              <div style="float: right; margin: 20px">
                合计：<span class="color-danger">￥{{ totalMoney }}</span>
              </div>

              <div style="margin-top: 60px">
                <i icon-class="marker" style="color: #606266"></i>
                <span class="font-small">费用信息</span>
              </div>
              <div class="table-layout">
                <el-row>
                  <el-col :span="6" class="table-cell-title">商品合计</el-col>
                  <el-col :span="6" class="table-cell-title">运费</el-col>
                  <el-col :span="6" class="table-cell-title">优惠券</el-col>
                  <el-col :span="6" class="table-cell-title">付款金额</el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="table-cell"
                    >￥{{ totalMoney }}</el-col
                  >
                  <el-col :span="6" class="table-cell"
                    >￥{{ order.shopSendPrice }}</el-col
                  >
                  <el-col :span="6" class="table-cell"
                    >￥{{ order.couponAmount }}</el-col
                  >
                  <el-col :span="6" class="table-cell"
                    >￥{{ totalMoney + order.shopSendPrice}}</el-col
                  >
                </el-row>
              </div>
            </el-card>
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
import commodityListVue from "../root/commodityList.vue";
import { Loading } from 'element-ui';
export default {
  components: { SellerAside, SellerHeader },
  data() {
    return {
      order: {},
      totalMoney: 0,
    };
  },
  created() {
    
    var order = JSON.parse(this.$route.query.order);
    this.order = order;  
    order.shopping.forEach((commodity) => {
      this.totalMoney += commodity.commodityNumber * commodity.commodityPrice;
    });
  },
  filters: {
    formatStatus(value) {
 
      if (value == 0) {
        return "买家已下单";
      } else if (value == 1) {
        return "商家已确认订单";
      } else if (value == 2) {
        return "骑手已取到外卖";
      } else if (value == 3) {
        return "骑手已送达";
      } else if (value == 4) {
        return "买家已确认收货";
      } else if (value == 5) {
        return "订单完成";
      } else if (value == -2) {
        return "正在退款中";
      } else if (value == -1) {
        return "订单已取消";
      }
    },
  },
  methods: {},
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

.detail-container {
  width: 90%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}
.color-danger {
  color: red;
  font-size: 16px;
}
.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>

