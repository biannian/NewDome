<template>
  <el-menu
    router
    :default-active="$route.path"
    unique-opened
 
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">账户管理</template>
      <el-menu-item index="/root/accountList">
      账户一览 </el-menu-item
      >
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">商品管理</template> 
      <el-menu-item index="/root/commodityList">商品管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">店铺管理</template>
     
      <el-menu-item index="/root/shopList">店铺管理</el-menu-item>
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