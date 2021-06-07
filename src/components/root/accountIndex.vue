<template>
  <div>
  <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <Aside></Aside>
      </el-aside>
      <el-container>
         <el-header style="text-align:right; font-size: 12px">
             <Header ></Header>
         </el-header>
        <el-main>
         <p  style="font-size: 20px">欢迎管理员登录</p> 
     </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from "@/api/api";
import Aside from './aside.vue';
import Header from './header.vue';
export default {

  methods:{
     
  },
   components: {Aside, Header},

  data() {return{
  }},
 
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