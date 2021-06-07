<template>
  <el-menu
    unique-opened
    router
    :default-active="$route.path"
    active-text-color="#ffd04b"
  >
      <el-submenu index="2">
      <template slot="title">订单管理</template>
      <el-menu-item index="/seller/sellerOrder">订单确定</el-menu-item>
         <el-menu-item index="/seller/cancelEdit">退款管理</el-menu-item>
      <el-menu-item index="/seller/sellerOrderList">订单管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">商品管理</template>
      <el-menu-item index="/seller/sellerCommodityAdd">商品新增</el-menu-item>
      <el-menu-item index="/seller/sellerCommodityList">商品管理</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">店铺管理</template>
    <el-menu-item  index="/seller/chatList">评价管理</el-menu-item>
      <el-menu-item index="/seller/sellerShopEdit">店铺信息</el-menu-item>
  
    </el-submenu>

        <el-submenu index="5">
           <template slot="title">个人管理</template>
     <el-menu-item index="/seller/sellerInformation">个人信息</el-menu-item>
     <el-menu-item index="/seller/sellerAccountEdit">账户管理</el-menu-item>
        </el-submenu>

    
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },
  methods: {
   
  },
};
</script>

<style>
</style>