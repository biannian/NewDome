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
      <el-menu-item index="2-1">商品审核</el-menu-item>
      <el-menu-item index="/root/commodityList">商品管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">店铺管理</template>
      <el-menu-item index="3-1">店铺审核</el-menu-item>
      <el-menu-item index="3-2">店铺管理</el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">骑手管理</template>
      <el-menu-item index="4-1">骑手审核</el-menu-item>
      <el-menu-item index="4-2">骑手管理</el-menu-item>
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
    handleSelect(key, keyPath) {
      switch(key){
        case "1-1" : this.$router.push({ path: "/root/accountList"});
        break;
        case "2-2" : this.$router.push({ path: "/root/commodityList"});
         break;
      }
        
    },
  },
};
</script>

<style>
</style>