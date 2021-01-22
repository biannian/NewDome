<template>
  <div class="login">
    <h1>&nbsp;&nbsp;{{ msg }}</h1>
    <br />
    <input v-model="accountName" class="form-control" placeholder="用户名" />
    <br />
    <input
      type="password"
      class="form-control"
      placeholder="密码"
      v-model="accountPassword"
    />
    <p style="color: red">{{ nameMsg }}{{ passwordMsg }}</p>
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;<button
      v-on:click="logindo"
      class="btn btn-success"
    >
      登录</button
    >&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<button
      v-on:click="register"
      class="btn btn-default"
    >
      注册
    </button>
 
    
    
  </div>
</template>

<script>
const axios = require("axios");
import api from "@/api/api";
import { Message } from "element-ui";
export default {
  name: "Login",
  data() {
    return {
      msg: "欢迎登录",
      accountName: "",
      accountPassword: "",
      nameMsg: "",
      passwordMsg: "",
    };
  },
  methods: {
    logindo: function () {
      var username = this.accountName;
      if (username.length == "0") {
        this.nameMsg = "请输入用户名";
        this.passwordMsg = "";
      } else {
        this.nameMsg = "";
        var password = this.accountPassword;
        if (password.length == "0") {
          this.passwordMsg = "请输入密码";
        } else {
          this.passwordMsg = "";
          axios({
            methods: "post",
            url: "http://localhost:8087/Login/login.do",
            params: {
              accountName: this.accountName,
              accountPassword: this.accountPassword,
            },
          }).then((response) => {
            var token = response.data.result;
            var theCode = response.data.code;
            // sessionStorage["token"]=JSON.stringify(token);
            sessionStorage["token"] = token;
           
            console.log(response);
            if (theCode == "200") {
              api
                .getLimit()
                .then((response) => {
                  console.log(response.data.result.accountLimit);
                  switch (response.data.result.accountLimit) {
                    case 1:
                      this.$router.push({ path: "/buyer/Helloword" });
                      break;
                    case 2:
                       this.$router.push({ path: "/seller/shopList" });
                      break;
                    case 3:
                      Message.error("页面尚未完成");
                      break;
                    case 4:
                    this.$router.push({ path: "/root/accountIndex"});
                    sessionStorage["userName"] = response.data.result.accountName;
                      break;
                  }
                })
                .catch((err) => console.log(err));
            } else if (theCode == "403") {
              this.passwordMsg = "该账户被禁用";
            } else {
              this.passwordMsg = "用户名或者账户错误";
            }
          });
        }
      }
    },
    register: function () {
      this.$router.push({ path: "/register" });
    },
    chat(){
         this.$router.push({ path: "/chat" });
    }
  },
};
</script>
<style>
.login {
  margin-top: 150px;
  margin-left: 550px;
  margin-right: 550px;
}
</style>