<template>
  <!--
    <div class="login">
      <h1>&nbsp;&nbsp;{{ msg }}</h1>
      <br />
      <el-input v-model="accountName" placeholder="用户名" />
      <br />
      <el-input
        type="password"
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
    </div> -->

  <div class="login">

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="3">

        <h2>Welcome</h2>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">

        <el-input clearable v-model="accountName" placeholder="用户名"
        />
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <el-input clearable show-password placeholder="密码" v-model="accountPassword"
        />
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="4">
        <el-link @click="register" type="primary">注册账户</el-link>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="2">
        <el-button @click="logindo" type="success">confirm</el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="reset" type="primary">reset</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  const axios = require('axios')
  import api from '@/api/api'
  import {Message} from 'element-ui'

  export default {
    name: 'Login',
    data () {
      return {
        accountName: '',
        accountPassword: '',
        nameMsg: '',
        passwordMsg: '',
      }
    },
    methods: {
      reset () {
        this.accountName = ''
        this.accountPassword = ''
      },
      logindo: function () {
        if (this.accountName.length == '0') {
          Message.warning('请输入用户名')
        } else {
          if (this.accountPassword.length == '0') {
            Message.warning('请输入密码')
          } else {
            axios({
              methods: 'post',
              url: 'http://localhost:8087/Login/login.do',
              params: {
                accountName: this.accountName,
                accountPassword: this.accountPassword,
              },
            }).then((response) => {

              var theCode = response.data.code
              if (theCode == '200') {
                sessionStorage['token'] = response.data.result.token
                api
                  .getLimit()
                  .then((response) => {
                    switch (response.data.result.accountLimit) {
                      case 1:
                        this.$router.push({path: '/buyer/Helloword'})
                        break
                      case 2:
                        Message.error('页面尚未完成')
                        break
                      case 3:
                        this.$router.push({path: '/seller/sellerIndex'})
                        break
                      case 4:
                        this.$router.push({path: '/root/accountIndex'})

                        break
                    }
                  })
                  .catch((err) => console.log(err))
              } else if (theCode == '403') {
                Message.warning('该账户被禁用')
              } else {
                Message.error('用户名或者账户错误')
              }
            })
          }
        }
      },
      register: function () {
        this.$router.push({path: '/register'})
      },
      chat () {
        this.$router.push({path: '/chat'})
      },
    },
  }
</script>
<style>
  .login {
    margin-top: 10%;
  }
</style>
