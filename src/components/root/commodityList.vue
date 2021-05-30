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
          <el-input
            clearable
            v-model="searchText"
            placeholder="输入编号或商品名"
            style="width: 20%"
          />

          <el-table :data="commodityList" border>
            <el-table-column fixed prop="commodityId" label="编号" width="100">
            </el-table-column>
            <el-table-column label="商品图" width="120">
              <template slot-scope="scope">
                <img
                  style="width: 100px; height: 75px"
                  :src="scope.row.commodityImg"
                />
                　　</template
              >
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名" width="140">
            </el-table-column>
            <el-table-column prop="commodityPrice" label="商品价格" width="140">
            </el-table-column>
            <el-table-column
              prop="commodityNumber"
              label="商品库存"
              width="140"
            >
            </el-table-column>
            <el-table-column prop="shopMenuName" label="种类" width="140">
            </el-table-column>
             <el-table-column prop="shopName" label="所属店铺" width="140">
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
                  <el-button slot="reference"   type="danger" size="mini"
                  >删除</el-button
                  >
                </el-popover>
              </template>
            </el-table-column>
          </el-table>

          <br />
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[4, 8, 12, 16]"
              :page-size="4"
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
import api from "@/api/api";
import Aside from "./aside.vue";
import Header from "./header.vue";
export default {
  components: { Aside, Header },
  data() {
    return {
      searchText: "",
      accountUserId: "",
      commodityList: [],
      size: "",
      current: "",
      total: 0,
    };
  },
  watch: {
    searchText(value) {
      this.selectCommodity(this.size, this.current, value);
    },
  },
  methods: {

    handleSizeChange(val) {
      this.selectCommodity(val, this.current, this.searchText);
    },
    handleCurrentChange(val) {
      this.selectCommodity(this.size, val, this.searchText);
    },  
    delectCommodity(row) {
      let params = {
        commodityId: row.commodityId,
      };
      api.delectCommodity(params).catch((err) => console.log(err));
      location.reload();
    },
    selectCommodity(size, current, search) {
      this.size = size;
      this.current = current; 
          api
            .queryAllCommodity()
            .then((res) => {
              console.log(res);
              if (res.data.result) {
                var commodityList = res.data.result;
                if (search) {
                  var commodity = [];
                  var reg = /^[0-9]*$/;
                  if (reg.test(search)) {
                    //输入的内容为纯数字
                    commodityList.forEach((element) => {
                      if (element.commodityId.toString().includes(search)) {
                        commodity.push(element);
                      }
                    });
                  } else {
                    //输入的内容不为纯数字
                    commodityList.forEach((element) => {
                      if (element.commodityName.includes(search)) {
                        commodity.push(element);
                      }
                    });
                  }
                }else{
                  var commodity = commodityList;
                }
                var newSize = size;
                var commoditys = [];
                var number = (current - 1) * size;
                commodity.forEach((element) => {
                  if ((number -= 1) < 0) {
                    if ((newSize -= 1) >= 0) {
                      commoditys.push(element);
                    }
                  }
                });
                this.total = commodity.length;
                this.commodityList = commoditys;
              } else {
                Message.error("请添加店铺信息");
              }
            })
            .catch((err) => console.log(err)); 
    },
  }, 
  mounted() {
    this.selectCommodity(4, 1, this.searchText);
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
