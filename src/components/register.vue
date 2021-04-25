<template>
  <div class="register">
    <h2>商家注册</h2>
    <input
      v-model="accountName"
      class="form-control"
      @blur="checkName"
      placeholder="用户名"
    />
    <p>(只能为数字或者英文长度为4-9)</p>
    <p v-if="nameMsg == '用户名可用'" style="color: green">{{ nameMsg }}</p>
    <p v-else style="color: red">{{ nameMsg }}</p>
    <input
      type="password"
      class="form-control"
      placeholder="密码"
      v-model="accountPassword"
      @blur="checkPassword"
    />
    <p v-if="passwordMsg == '密码符合要求'" style="color: green">
      {{ passwordMsg }}
    </p>
    <p v-else style="color: red">{{ passwordMsg }}</p>
    <p>(密码长度要求为4-10)</p>
    <input
      type="password"
      class="form-control"
      placeholder="确认密码"
      @blur="checkSecPassword"
      v-model="accountPassword2"
    />
    <p v-if="passwordMsg1 == '重复密码符合要求'" style="color: green">
      {{ passwordMsg1 }}
    </p>
    <p v-else style="color: red">{{ passwordMsg1 }}</p>
    <p>(确认密码和密码一致)</p>
    <!-- <select v-model="accountLimit" class="form-control">
      <option value="1">普通用户</option>
      <option value="2">骑手</option>
      <option value="3">商家</option></select
    > -->
    <br/>
    <button v-on:click="register" class="btn btn-success">注册</button>
    <button v-on:click="back" class="btn btn-default">返回</button>
  </div>
</template>

<script>
  import api from '@/api/api'

  const axios = require('axios')
  import {Message} from 'element-ui'

  export default {
    name: 'register',
    data () {
      return {
        accountName: '',
        accountPassword: '',
        accountPassword2: '',
        accountLimit: '3',
        accountBan: false,
        nameMsg: '',
        passwordMsg: '',
        passwordMsg1: '',
      }
    },
    methods: {
      register: function () {
        if (!this.accountName) {
          Message.error('请输入用户名')
          return false
        }
        if (!this.accountPassword) {
          Message.error('请输入密码')
          return false
        }
        if (!this.accountPassword2) {
          Message.error('请输入重复密码')
          return false
        }
        if (
          this.nameMsg == '用户名可用' &&
          this.passwordMsg == '密码符合要求' &&
          this.passwordMsg1 == '重复密码符合要求'
        ) {
          let a = {
            accountName: this.accountName,
            accountPassword: this.accountPassword,
            accountLimit: this.accountLimit,
            accountBan: this.accountBan,
          }
          api.register(a)
            .then((response) => {
              console.log(response)
              var theCode = response.data.code
              if (theCode == '200') {
                sessionStorage['token'] = response.data.result
                sessionStorage['userName'] = this.accountName
                Message.success('注册成功,正在跳转首页...')

                this.timer = setTimeout(() => {
                  this.$router.push({path: '/seller/sellerIndex'})
                }, 500)
              } else {
                Message.error('注册失败')
              }
            })
        } else {
          Message.error('注册失败')
          return false
        }
      },
      back: function () {
        this.$router.push({path: '/'})
      },
      checkName: function () {
        var username1 = this.accountName
        this.nameMsg1 = ''
        var reg = /^[0-9a-zA-Z]{4,9}$/
        if (!reg.test(username1)) {
          this.nameMsg = '用户名不符合规则'
        } else {
          this.nameMsg = ''
          axios({
            methods: 'get',
            url: 'http://localhost:8087/Login/queryById.do',
            params: {
              accountName: this.accountName,
            },
          }).then((response) => {
            if (response.data.code == -1) {
              this.nameMsg = '用户名重复'
            } else {
              this.nameMsg = '用户名可用'
            }
          })
        }
      },
      checkPassword: function () {
        var password = this.accountPassword
        var password2 = this.accountPassword2
        this.passwordMsg1 = ''
        var reg = /^[,./!@#$%&0-9a-zA-Z]{4,9}$/
        if (!reg.test(password)) {
          this.passwordMsg = '密码不符合要求'
        } else {
          this.passwordMsg = '密码符合要求'
        }
      },
      checkSecPassword: function () {
        var password2 = this.accountPassword2
        var password = this.accountPassword
        var reg = /^[,./!@#$%&0-9a-zA-Z]{4,9}$/
        if (!reg.test(password2)) {
          this.passwordMsg1 = '重复密码不符合要求'
        } else {
          if (password2 == password) {
            this.passwordMsg1 = '重复密码符合要求'
          } else {
            this.passwordMsg1 = '两次密码不一致'
          }
        }
      },
    },
  }
</script>

<style>
  .register {
    padding-left: 10%;
    padding-right: 70%;
  }
</style>
