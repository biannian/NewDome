<template>
  <el-menu
    unique-opened
    @select="handleSelect"
    active-text-color="#ffd04b"
  >
    <el-submenu index="1">
      <template slot="title">店铺管理</template>
      <el-menu-item index="1-1">
      账户一览 </el-menu-item
      >
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">商品管理</template>
      <el-menu-item index="2-1">商品新增</el-menu-item>
      <el-menu-item index="2-2">商品管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">个人管理</template>
      <el-menu-item index="3-1">个人信息</el-menu-item>
      <el-menu-item index="3-2">营业信息</el-menu-item>
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