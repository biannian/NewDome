<template>
  <div class="block">
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
    >
      <el-menu-item index="/buyer/Helloword">首页</el-menu-item>
      <el-menu-item @click="drawer = true">
        <el-badge :value="msgCount" class="item"
          >消息中心</el-badge
        ></el-menu-item
      >
      <el-menu-item index="/buyer/order" >
          <el-badge :value="orderCount" @click="orderCount = '0'"  class="item">订单管理</el-badge>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">个人中心</template>
        <el-menu-item index="5-1">会员中心</el-menu-item>
        <el-menu-item index="/buyer/personalAddress">管理收货地址</el-menu-item>
        <el-menu-item v-on:click="remove">注销</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-drawer
      title="在线列表"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#C0C4CC"
        text-color="#303133"
      >
        <el-menu-item @click="sendToAll">
          <p @click="innerDrawer = true">群聊（{{ OnlineCount }}）</p>
        </el-menu-item>
        <!-- <el-menu-item
          v-for="(item, index) in userNames"
          :key="index"
          @click="sendTo(item)"
        >
          {{ item }}
        </el-menu-item> -->
      </el-menu>
      <div>
        <el-drawer
          title="聊天室"
          :append-to-body="true"
          :before-close="handleClose"
          size="50%"
          :visible.sync="innerDrawer"
        >
          <div
            style="
              overflow: auto;
              width: 90%;
              margin-left: 3%;
              margin-top: 1%;
              height: 60%;
              border: 1px solid #eee;
            "
          >
            <div class="info"  v-for="(item, index) in message" :key="'info-'+ index">
              {{ item.date }} <br />
              {{ item.userName }} :{{ item.msg }}
            </div>
            <div style="margin-left:70%"  class="info1" v-for="(item, index) in myMsg" :key="'info1-'+ index">
              {{ item.date }} <br/>
              {{ item.userName }} :{{ item.msg }}
            </div>
          </div>
          <div style="margin-left: 3%"></div>
          <textarea
            placeholder="输入聊天内容"
            rows="3"
            style="width: 80%; float: left; margin-left: 4%"
            class="form-control"
            v-model="sendData"
          ></textarea>
          <el-button
            style="margin-left: 1%"
            type="success"
            @click="websocketsend"
            plain
            >发送</el-button
          >
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      orderCount:"",
      msgCount: "0",
      OnlineCount: "",
      userName: "",
      message: [],
      myMsg:[],
      AllMsg: new Map(),
      userName: "",
      toWho: "",
      userNames: [],
      sendData: "",
      innerDrawer: false,
      drawer: false,
      direction: "rtl",
      select: "",
      handleSelect: "",
    };
  },
  watch: {
    drawer() {
        this.msgCount ='';
    },
  },
  methods: {
    sendTo(item) {
      this.innerDrawer = true;
      this.toWho = item;
    },
    sendToAll() {
      this.toWho = "All";
    },
    remove: function () {
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
    handleClose(done) {
      done();
    },
    initWebSocket: function () {
      this.userName = sessionStorage["userName"];
      this.websock = new WebSocket(
        "ws://localhost:8087/websocket/" + this.userName
      );
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
      ++this.msgCount;
      let json = JSON.parse(e.data);
        this.OnlineCount = json.onLineCount;
      if (json.userNames) {
        this.userNames = json.userNames;
      }
      //to当作map的key值
      this.AllMsg.set(json.to, json);
      if (this.toWho ) {
          let msg = this.AllMsg.get(this.toWho);
          this.message.push(msg);
      }
    },
    websocketclose: function (e) {
      // console.log("connection closed (" + e.code + ")");
    },
    websocketsend() {
      let date = new Date();
      let date1 =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      let a = {
        userName: this.userName,
        msg: this.sendData,
        date: date1,
        to: this.toWho,
      };
      let data = JSON.stringify(a);
      this.websock.send(data);
      console.log(this.myMsg);
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