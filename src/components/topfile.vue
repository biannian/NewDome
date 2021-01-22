<template>
  <div class="block">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
    >
      <el-menu-item index="">处理中心</el-menu-item>
      <el-menu-item @click="drawer = true">
        <el-badge :value="12" class="item">消息中心</el-badge></el-menu-item
      >
      <el-menu-item index="4"
        ><a href="" target="_blank"
          ><el-badge :value="3" class="item">订单管理</el-badge></a
        >
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">个人中心</template>
        <el-menu-item index="5-1">会员中心</el-menu-item>
        <el-menu-item index="/buyer/personalAddress">管理收货地址</el-menu-item>
        <el-menu-item v-on:click="remove">注销</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-drawer
      title="消息列表"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
      <span>我来啦!</span>
      <div>
        <el-button @click="innerDrawer = true">打开里面的!</el-button>
        <el-drawer
          title="我是里面的"
          :append-to-body="true"
          :before-close="handleClose"
          size="50%"
          :visible.sync="innerDrawer"
        >
        <div style="overflow:auto;width:90%;margin-left:3%;margin-top:1%;height:60%;border: 1px solid #eee">
         <el-card class="box-card" v-for="(item,index) in msg_data" :key="index">
           <p style="float:right"> {{item}}</p>
          </el-card>
         </div>
        <div style="margin-left:3%">
   <el-button icon="el-icon-picture-outline-round" circle></el-button>
        </div>
       
        <textarea
            placeholder="输入聊天内容"
            rows="3"
            style="width:80%;float:left;margin-left:4%"
            class="form-control"
            v-model="sendData"
          ></textarea>
           <el-button style="margin-left:1%" type="success"  @click="websocketsend" plain>发送</el-button>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
       userName: "匿名",
       msg_data: [],
      sendData: "",
      innerDrawer: false,
      drawer: false,
      direction: "rtl",
      select: "",
      handleSelect: "",
    };
  },
  methods: {
    remove: function () {
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
    handleClose(done) {
      done();
    },
     initWebSocket: function () {
      this.websock = new WebSocket("ws://localhost:8090/websocket");
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage: function (e) {
      var da = e.data;
      
      console.log(da);
      this.msg_data.unshift(da);
    },
    websocketclose: function (e) {
      console.log("connection closed (" + e.code + ")");
    },
    websocketsend() {
      let date = new Date();
      let date1 =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.websock.send(date1 + this.userName + ":" + this.sendData);
      this.sendData = "";
    },
  },
   created() {
    this.initWebSocket();
  },
   destroyed: function () {
    this.websocketclose();
  },
};
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

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.block {
  float: right;
  padding-top: 10px;
}
</style>