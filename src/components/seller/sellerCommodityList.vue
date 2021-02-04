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
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="commodityList" border>
            <el-table-column fixed prop="commodityId" label="编号" width="100">
            </el-table-column>
            <el-table-column prop="commodityImg" label="商品图" width="200">
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名" width="140">
            </el-table-column>
            <el-table-column prop="commodityPrice" label="商品价格" width="140">
            </el-table-column>
            <el-table-column prop="commodityNumber" label="商品库存" width="140">
            </el-table-column>
            <el-table-column prop="shopMenuName" label="种类" width="140">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="medium" @click="edit(scope.row)"
                  >修改
                </el-button>
                <el-popover placement="top" width="160">
                  <p>确定要删除此商品吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="delectCommodity(scope.row)"
                      >确定</el-button
                    >
                  </div>
                  <el-button slot="reference" type="text" size="medium"
                    >删除</el-button
                  >
                </el-popover>
              </template>
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
import { Message } from "element-ui";
export default {
  components: { SellerAside, SellerHeader },
  methods: {},
  data() {
    return {
      commodityList: [],
    };
  },
  methods: {
    edit(commodity) {
      this.$router.push({ path: "/seller/sellerCommodityEdit", query: commodity });
    },
    selectCommodity() {
      if (
        sessionStorage["accountUserId"] == null ||
        sessionStorage["accountUserId"] == ""
      ) {
        Message.warning("获取数据失败，请重新登录");
        return false;
      }
      let a = {
        commodityShopId: sessionStorage["accountUserId"],
      };
      api
        .queryAllCommodity(a)
        .then((res) => {
          console.log(res);
          this.commodityList = res.data.result;
        })
        .catch((err) => console.log(err));
    },
  },

  mounted() {
    this.selectCommodity();
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