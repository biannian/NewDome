<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <el-header> <Header></Header></el-header>

        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-top: 20px; margin-left: 20px"
        >
          <el-breadcrumb-item :to="{ path: '/root/accountIndex' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>店铺一览</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-table :data="accountList" border>
            <el-table-column fixed prop="shopId" label="编号" width="100">
            </el-table-column>
            
               <el-table-column label="店铺图" width="120">
              <template slot-scope="scope">
                <img
                  style="width: 100px; height: 75px"
                  :src="scope.row.shopImg"
                />
                　　</template
              > 
            </el-table-column>
            <el-table-column prop="shopName" label="店铺名" width="120">
            </el-table-column>
            <el-table-column  prop="shopAddress" label="地址" width="300"> 
            </el-table-column>
            
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-popover placement="top" width="160">
                  <p>确定要删除此账户吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="delect(scope.row)"
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
  methods: {},
  data() {
    return {
      accountList: [],
      value: true,
    };
  },
 
  methods: {
    
    delect(row) {
      let params = {
        accountId: row.accountId,
      };
      api.accountDelete(params).catch((err) => console.log(err));
      location.reload();
    },
  },

  mounted() {
    api
      .queryAll()
      .then((res) => {
        console.log(res);
        this.accountList = res.data.result;
      })
      .catch((err) => console.log(err));
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