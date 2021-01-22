<template>
  <div>
        <el-container>
              <el-header>
       <div style="width: 20%; float: left; margin-top: 50px">
          <el-page-header @back="goBack" content="管理收货地址" />
        </div>
        <div style="margin-right:20px">
          <Topfile></Topfile>
          </div>
              </el-header>
        </el-container>
  </div>
</template>

<script>
import Topfile from "../topfile.vue";
export default {
  components: { Topfile },
 data(){
     return{}
 },
 methods:{
     goBack() {
       window.history.back();
    },
 }
};

</script>

<style>
</style>