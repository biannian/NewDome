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
          <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
   <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="姓名"
            prop="sellerName"
            :rules="[
              { required: true, message: '姓名不能为空' },
              { max: 10, message: '姓名为10个字符以内' },
            ]"
          >
          <el-col :span="3">
            <el-input v-model="ruleForm.sellerName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label="性别"
            prop="sellerSex"
            :rules="[{ required: true, message: '性别不能为空' }]"
          >
            <el-radio-group v-model="ruleForm.sellerSex">
              <el-radio :label="true">男</el-radio>
              <el-radio :label="false">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="sellerTel"
            :rules="[
              { required: true, message: '手机号不能为空' },
              { type: 'number', message: '手机号必须为数字值' },
            ]"
          >
             <el-col :span="6">
            <el-input
              v-model.number="ruleForm.sellerTel"
              autocomplete="off"
            ></el-input>
             </el-col>
          </el-form-item>
          <el-form-item
            label="个人住址"
            prop="sellerAddress"
            :rules="[
              { required: true, message: '个人住址不能为空' },
              { min: 6, message: '个人住址至少为6个汉字' },
            ]"
          >   <el-col :span="8">
            <el-input
              type="textarea"
              v-model="ruleForm.sellerAddress"
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
import api from "@/api/api";
import SellerAside from './sellerAside.vue';
import SellerHeader from './sellerHeader.vue';
import { Message } from "element-ui";
export default {
  components: {SellerAside, SellerHeader  },
  methods: {},
  data() {
    return {
     ruleForm: {
        sellerAccountName: "",
        sellerName: "",
        sellerSex: "",
        sellerAddress: "",
        sellerTel: "",
      },
    };
  },
  methods: {
      submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log("验证通过");
          console.log(this.ruleForm);
          api
            .updateSellerAddress(this.ruleForm)
            .then((response) => {
              if (response.data.result == 1) {
                Message.success("修改成功！");
               
              } else {
                Message.error("修改失败！");
              }
            })
            .catch((error) => console.log(error));
        } else {
          Message.error("提交失败！");
          return false;
        }
      });
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
  },
  mounted() {
      api
      .getLimit()
      .then((response) => {
        this.ruleForm.sellerAccountName = response.data.result.accountName;
        let a = {
          accountName: response.data.result.accountName,
        };
        api
          .getSellerAddress(a)
          .then((response) => {
            if (response.data.result) {
              this.ruleForm = response.data.result;
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => {
        console.log(err);
      });
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