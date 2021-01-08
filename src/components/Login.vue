<template>
  <div class="login">
    <h1> &nbsp;&nbsp;{{ msg }}</h1>
    <br />
    <input v-model="accountName" class="form-control" placeholder="用户名" />
    <br />
    <input
      type="password"
      class="form-control"
      placeholder="密码"
      v-model="accountPassword"
    /><p style="color:red">{{ nameMsg }}{{ passwordMsg }}</p>
    <br />  
     &nbsp;&nbsp;&nbsp;&nbsp;<button v-on:click="logindo" class="btn btn-success">登录</button>&nbsp;
     &nbsp;&nbsp;&nbsp;&nbsp;<button v-on:click="register" class="btn btn-default">注册</button>
  </div>
</template>

<script>
const axios = require("axios");
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
            var theCode = response.data.code;
            var token = response.data.result;
           // sessionStorage["token"]=JSON.stringify(token);
            sessionStorage["token"]=token;
            console.log(JSON.stringify(token));
            console.log(theCode);
            if (theCode == "200") {
              this.$router.push({ path: "/Helloword" });
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