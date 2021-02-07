<template>
  <div>
    <el-container style="height: 650px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <seller-aside></seller-aside>
      </el-aside>
      <el-container>
        <el-header>
          <seller-header></seller-header>
           </el-header>

        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-top: 20px; margin-left: 20px"
        >
          <el-breadcrumb-item :to="{ path: '/seller/sellerIndex' }"
            >首页</el-breadcrumb-item
          > 
          <el-breadcrumb-item>账户修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
  
  <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账户" prop="accountName">
            <el-col :span="3">
              <el-input
                :disabled="true"
                v-model.number="ruleForm.accountName"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="新密码" prop="accountPassword">
            <el-col :span="6">
              <el-input
                show-password
                type="password"
                v-model="ruleForm.accountPassword"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-col :span="6">
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                autocomplete="off"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { Message } from "element-ui";
import api from "@/api/api";
import SellerAside from './sellerAside.vue';
import SellerHeader from './sellerHeader.vue';
export default {
  components: {SellerAside, SellerHeader  },
  methods: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.accountPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        accountName: "",
        checkPass: "",
        accountPassword: "",
      },
      rules: {
        accountPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClick(row) {
      // let params = row;
      // this.$router.push({ path: "/root/accountEdit", params });
    },
     submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let a ={
            accountName: this.ruleForm.accountName,
            accountPassword:this.ruleForm.accountPassword
          }
             api
            .updatePassword(a)
            .then((response) => {
              if (response.data.result == 1) {
                Message.success("修改成功！");
                 
              } else {
                Message.error("修改失败！");
              }
            })
            .catch((error) => console.log(error));
        } else {
         Message.error("修改失败！");
          return false;
        }
      });
    },
  },

  mounted() {
    api
        .getLimit()
        .then((response) => {
        let a ={
      accountName: response.data.result.accountName
    }
     api
      .queryByName(a)
      .then((response) => {
         this.ruleForm.accountName = response.data.result.accountName;
      })
      .catch((error) => console.log(error));
      }).catch((err)=>{console.log(err);})
  },
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