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
    <el-aside width="20%">
            <el-menu @select="select">
              <p style="font-size: 20px; margin-left: 100px; margin-top: 10px">
                订单编号
              </p>
              <el-menu-item-group>
                <el-menu-item
                  v-for="(orders, indexId) in orders"
                  :key="indexId"
                  :index="orders.orderId.toString()"
                >
                <p style="margin-left:50px"> {{ orders.orderId}}</p> 
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-aside>
          <el-main>
              <div  v-for="(order, index) in order"
                  :key="index">
              {{order}}
            </div>
            <div   v-for="(orderDetail, index) in orderDetail"
                  :key="index">
     {{orderDetail}}
                  {{orderDetail.commodityName}}
                   {{orderDetail.shoppingNumber}}
                       {{orderDetail.commodityImg}}
                          {{orderDetail.commodityPrice}}
            </div>
            
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
    return {
      orders:[],
      orderDetails:[],
      order:[],
      orderDetail:[],
    }
},
methods:{
  select(orderId){
    console.log(orderId);
    this.order = [];
    this.orderDetail= [];
    for (let index = 0; index < this.orders.length; index++) {
          if(this.orders[index].orderId == orderId) {
              this.order.push(this.orders[index])
          }
    }
    for (let i = 0; i < this.orders.length; i++) {
          if(this.orderDetails[i][0].shoppingOrderId == orderId) {
              this.orderDetail.push(this.orderDetails[i])
          }
    }
  
    console.log(this.orderDetail);

    console.log(this.order);
  },
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
          this.orders = response.data.result.orders;
          this.orderDetails = response.data.result.shoppings;
       }).catch((error) => console.log(error));
}
}
</script>

<style>

</style>