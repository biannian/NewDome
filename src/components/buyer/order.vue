<template>
<div>
 <el-container>
      <el-header>
         
        <div style="width: 15%; float: left; margin-top: 50px">
          <el-page-header @back="goBack" content="订单详情" ></el-page-header>
        </div>
     
        <div style="width: 50%; float: right">
         <topfile></topfile>
        </div>
      </el-header>
   </el-container>

         <div style="margin-top: 20px">
      <hr />
     
        <el-container style="height: 550px; border: 1px solid #eee">
    <el-aside width="25%">
            <el-menu :default-active="curActive" @select="handleSelect">
              <p style="font-size: 20px; margin-left: 100px; margin-top: 10px">
                订单
              </p>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(orderMenus, indexId) in orderMenu"
                  @click="goAssignBlock('block' + indexId, 50)"
                  :key="indexId"
                  :index="'' + indexId"
                >
                  {{ orderMenus }}
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-aside>
          <el-main>
            
          </el-main>
    </el-container>
      </div>
</div>
  
</template>

<script>
import api from "@/api/api";
import topfile from '../topfile.vue'
export default {
  
  components: { topfile },
data() {
    return {}
},
methods:{
    goBack(){
        history.back();
    }
},
mounted(){
      let params = {
      orderBuyerId:sessionStorage["userName"]
        };
      console.log(params);
      api
      .selectOrder(params)
       .then((response) => {
          console.log(response);
       }).catch((error) => console.log(error));
}
}
</script>

<style>

</style>