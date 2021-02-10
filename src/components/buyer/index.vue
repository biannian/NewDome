<template>
  <div>
    <el-row>
      <el-col :span="6" v-for="(shop, index) in shopList" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <img
            style="float: left; width: 150px;height:150px"
            :src="shop.shopImg"
            class="image"
          />

          <div class="card" @click="selectShop(shop.shopId)">
            <h4>
              <span style="color: black; font-weight: 500">{{
                shop.shopName
              }}</span>
            </h4>
            <el-rate
              v-model="shop.shopScore"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>
            <span style="font-size: 10px">月售{{ shop.shopSalesVolume }}</span
            >&nbsp;

            <span style="font-size: 10px">配送¥{{ shop.shopSendPrice }}</span
            >&nbsp;

            <span style="font-size: 10px">起送¥{{ shop.shopStartPrice }}</span>
            &nbsp;<br />
            <span style="font-size: 10px">距离</span>
          </div>
          <div class="bottom clearfix">
            <el-button
              type="text"
              @click="selectShop(shop.shopId)"
              style="padding: 0; float: left"
              >进入店铺</el-button
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="margin-top: 30px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="indexPage"
        :page-sizes="[8, 12, 16, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  name: "index",
  props: {
    IshopName: String,
  },
  data() {
    return {
      shopList: "",
      indexPage: 0,
      pageSize: 8,
      count: 0,
      queryByNameOff: false,
    };
  },
  mounted() {
    let page = {
      pageNum: this.indexPage,
      pageSize: this.pageSize,
    };
    api
      .queryAll(page)
      .then((res) => {
        this.shopList = res.data.result.list;
        this.count = res.data.result.total;
      })
      .catch((err) => console.log(err));
   
  },
  methods: {
    selectShop(shopId) {
      this.$router.push({ path: "/buyer/shop?shopId=" + shopId });
      location.reload();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.queryByNameOff) {
        let page = {
          shopName: this.IshopName,
          pageNum: this.indexPage,
          pageSize: val,
        };
        api
          .selectShop(page)
          .then((res) => {
            this.shopList = res.data.result.list;
            this.count = res.data.result.total;
          })
          .catch((err) => console.log(err));
      } else {
        let page = {
          pageNum: this.indexPage,
          pageSize: val,
        };
        api
          .queryAll(page)
          .then((res) => {
            this.shopList = res.data.result.list;
            this.count = res.data.result.total;
          })
          .catch((err) => console.log(err));
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      if (this.queryByNameOff) {
        let page = {
          shopName: this.IshopName,
          pageNum: val,
          pageSize: this.pageSize,
        };
        api
          .selectShop(page)
          .then((res) => {
            this.shopList = res.data.result.list;
            this.count = res.data.result.total;
          })
          .catch((err) => console.log(err));
      } else {
        let page = {
          pageNum: val,
          pageSize: this.pageSize,
        };
        api
          .queryAll(page)
          .then((res) => {
            this.shopList = res.data.result.list;
            this.count = res.data.result.total;
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 30px;
  padding-left: 55%;
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card {
  padding-left: 48%;
}
</style>