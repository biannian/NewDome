<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <sellerAside></sellerAside>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <sellerHeader></sellerHeader>
        </el-header>
        <el-main>
          <p  style="font-size:20px">    欢迎登录</p>
          <p style="font-size:20px">{{ shopName }}</p>
      
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import api from "@/api/api";
import sellerAside from "./sellerAside";
import sellerHeader from "./sellerHeader";
export default {
  methods: {},
  components: { sellerAside, sellerHeader },

  data() {
    return {
      userName:"",
      shopName: "",
    };
  },
  mounted() {
  
  api
      .getLimit()
      .then((response) => {
    let a ={
      sellerId: response.data.result.accountUserId 
    }
   
       api.queryShopName(a).then((res) => {
         if (res.data.result !=null) {
            this.shopName = res.data.result.shopName;
         }else{
           this.$confirm('您还尚未添加店铺信息,功能不可用,请点击确认添加店铺信息(点击取消会返回登录页面)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: "/seller/sellerShopEdit" });
        }).catch(() => {
          sessionStorage.clear();
          this.$router.push({ path: "/" });
        });
         }
    });
      })
      .catch((err) => {
        console.log(err);
      });
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