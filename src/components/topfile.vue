<template>
  <div class="block">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">处理中心</el-menu-item>
  <el-submenu index="2">
    <template slot="title">我的工作台</template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
  </el-submenu>
  <el-menu-item index="3" disabled>消息中心</el-menu-item>
  <el-menu-item index="4"><a href="" target="_blank">订单管理</a>
  </el-menu-item>

   <el-submenu index="5">
      <template slot="title">个人中心</template>
      <el-menu-item index="5-1">选项1</el-menu-item>
      <el-menu-item index="5-2">选项2</el-menu-item>
      <el-menu-item index="5-3" v-on:click="remove">注销</el-menu-item>
    </el-submenu>

</el-menu>
  </div>
</template>

<script>
export default {
 data(){
   return{

   }
 },
  methods:{
 remove:function(){
      sessionStorage.clear();
      location.reload();
    },
  },
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .block{
    float: right;
  }

</style>