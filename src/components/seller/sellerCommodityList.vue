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
          <el-button @click="out">导出全部商品表格</el-button>
          &nbsp; &nbsp; &nbsp;
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
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">

                <el-button size="mini" @click="edit(scope.row)"
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
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
import { Message } from "element-ui";
export default {
  components: { SellerAside, SellerHeader },
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
    out() {
      let a = {
        accountUserId: this.accountUserId,
      };
      api.exportExcel(a).then((res) => {
        const url = window.URL.createObjectURL(res.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = "商品表.xls";
        document.body.appendChild(a);
        a.click();
      });
    },
    edit(commodity) {
      this.$router.push({
        path: "/seller/sellerCommodityEdit",
        query: commodity,
      });
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
        .getLimit()
        .then((response) => {
          this.accountUserId = response.data.result.accountUserId;
          let a = {
            accountUserId: response.data.result.accountUserId,
          };
          api
            .queryAllCommodity(a)
            .then((res) => {
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
        })
        .catch((err) => {
          console.log(err);
        });
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
