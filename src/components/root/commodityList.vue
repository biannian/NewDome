<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-top: 20px; margin-left: 20px"
        >
          <el-breadcrumb-item :to="{ path: '/root/accountIndex' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="commodityList" border>
            <el-table-column fixed prop="commodityId" label="编号" width="100">
            </el-table-column>
            <el-table-column label="商品图" width="200">
                   <template slot-scope="scope">
                <img
                  style="width: 110px; height: 110px"
                  :src="scope.row.commodityImg"
                 
                >
                　　</template
              >
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名" width="120">
            </el-table-column>
                <el-table-column prop="shopName" label="所属店铺" width="120">
            </el-table-column>
            <el-table-column prop="shopMenuName" label="种类" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
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
import Aside from "./aside.vue";
import Header from "./header.vue";
export default {
  components: { Aside, Header },
  data() {
    return {
      commodityList: [],
    };
  },
  mounted() {
    api
      .queryAllCommodity()
      .then((res) => {
        console.log(res);
        this.commodityList = res.data.result;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    delectCommodity(row) {
      let params = {
        commodityId: row.commodityId,
      };
      api
        .delectCommodity(params)
        .catch((err) => console.log(err));
      location.reload();
    },
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