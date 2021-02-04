<template>
  <div>
  <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <sellerAside></sellerAside>
      </el-aside>
      <el-container>
         <el-header style="text-align:right; font-size: 12px">
             <sellerHeader ></sellerHeader>
         </el-header>
        <el-main>
          欢迎登录
     </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from "@/api/api";
import sellerAside from './sellerAside';
import sellerHeader from './sellerHeader';
export default {

  methods:{
     
  },
   components: {sellerAside, sellerHeader},

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