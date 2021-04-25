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
          >首页
          </el-breadcrumb-item
          >
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="orderList" border>
            <el-table-column fixed="left" width="150" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="toDetail(scope.row)"
                >查看
                </el-button
                >
                <el-button size="mini" @click="openOrderMsg(scope.row)"
                >进度
                </el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="orderId" label="编号" width="50">
            </el-table-column>
            <el-table-column prop="orderTips" label="订单备注" width="260">
            </el-table-column>
            <el-table-column prop="tableware" label="餐具" width="100">
            </el-table-column>
            <el-table-column label="订单状态" width="130">
              <template slot-scope="scope">
                <span v-if="scope.row.orderState === -2">
                  <p style="color: red">正在退款中</p>
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
                  <p>订单完成</p>
                </span>
              </template>
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
            <!-- <el-table-column prop="orderBuyerTime" label="下单时间" width="151">
            </el-table-column>

            <el-table-column
              prop="orderSellerTime"
              label="卖家确认订单时间"
              width="200"
            >
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
            </el-table-column> -->
            <el-table-column
              prop="buyerAddress.buyerAddress"
              label="收货地址"
              width="420"
            >
            </el-table-column>
            <!-- <el-table-column prop="riderName" label="骑手姓名" width="80">
            </el-table-column>

            <el-table-column prop="riderTel" label="骑手手机号" width="110">
            </el-table-column> -->
          </el-table>
          <br/>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="5"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>

          <el-dialog title="订单追踪" :visible.sync="isOrderMsg" width="30%">
            <div style="height: 300px">
              <el-steps direction="vertical" :active="order.orderState + 1">
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
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import api from '@/api/api'
  import SellerAside from './sellerAside.vue'
  import SellerHeader from './sellerHeader.vue'

  export default {
    components: {SellerAside, SellerHeader},
    data () {
      return {
        isOrderMsg: false,
        size: '',
        current: '',
        total: 0,
        commodityWidth: '',
        orderList: [],
        order: {},
      }
    },

    methods: {
      openOrderMsg (val) {
        this.order = val
        this.isOrderMsg = true
      },
      toDetail (val) {
        var order = JSON.stringify(val)
        this.$router.push({
          path: '/seller/sellerOrderDetail',
          query: {order: order},
        })
      },
      handleSizeChange (val) {
        this.sellerOrder(val, this.current)
      },
      handleCurrentChange (val) {
        this.sellerOrder(this.size, val)
      },
      sellerOrder (size, current) {
        this.size = size
        this.current = current
        let param = {
          shopId: sessionStorage['shopId'],
          orderState: '-3',
        }
        api.queryOrder(param).then((res) => {
          if (res.data.result) {
            var order = res.data.result.reverse()
            var max = 0
            var newSize = size
            var orders = []
            var number = (current - 1) * size
            order.forEach((element) => {
              if ((number -= 1) < 0) {
                if ((newSize -= 1) >= 0) {
                  orders.push(element)
                }
              }
            })
            orders.forEach((element) => {
              if (element.shopping.length > max) {
                max = element.shopping.length
              }
            })
            this.total = order.length
            this.commodityWidth = max
            this.orderList = orders
          }
        })
      },
    },

    mounted () {
      this.sellerOrder(5, 1)
    },
  }
</script>

<style lang="scss">
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .order_list_container {
    margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;

    .order_box {
      margin-bottom: 20px;
      display: block;
      background: #fff;

      &:hover {
        background: rgba(227, 232, 238, 0.33);
      }
    }

    .thead {
      color: #3a3a3a;
      height: 36px;
      line-height: 36px;
      padding: 0 50px;
      border-bottom: 1px #e3e8ee solid;
      font-size: 14px;

      .export_order_btn {
        margin-top: 4px;
        margin-left: 30px;
      }

      .fr {
        margin-left: 20px;
      }

      .i-edit {
        margin-top: 2px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: #0142a1;
        border-radius: 50%;
        text-align: center;
        border: 1px #0142a1 solid;
        font-size: 20px;
        cursor: pointer;
      }
    }

    .order_note {
      margin-top: 10px;
      padding-left: 2%;
      width: 98%;
      color: #666;
      font-size: 14px;
      line-height: 18px;
    }

    .img_list {
      margin: 0;
      width: 100%;
      height: 100px;
      cursor: pointer;

      li {
        display: inline-block;
        width: 130px;
        height: 100px;
        margin-right: 10px;
        background-size: contain;
        overflow: hidden;
      }
    }
  }

  .page_list {
    text-align: center;
    margin: 20px auto;
  }
</style>
