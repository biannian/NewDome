
<template>
  <div>
    <el-container>
      <el-header>
        <div style="width: 20%; float: left; margin-top: 50px">
          <el-page-header @back="goBack" content="收货地址修改" />
        </div>
        <div style="margin-right: 20px">
          <topfile></topfile>
        </div>
      </el-header>
    </el-container>
    <el-container>
      <el-main style="margin-top:2%;margin-left:3%">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="姓名"
            prop="buyerName"
            :rules="[
              { required: true, message: '姓名不能为空' },
              { max: 10, message: '姓名为10个字符以内' },
            ]"
          >
          <el-col :span="3">
            <el-input v-model="ruleForm.buyerName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label="性别"
            prop="buyerSex"
            :rules="[{ required: true, message: '性别不能为空' }]"
          >
            <el-radio-group v-model="ruleForm.buyerSex">
              <el-radio :label="true">男</el-radio>
              <el-radio :label="false">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="buyerTel"
            :rules="[
              { required: true, message: '手机号不能为空' },
              { type: 'number', message: '手机号必须为数字值' },
            ]"
          >
             <el-col :span="6">
            <el-input
              v-model.number="ruleForm.buyerTel"
              autocomplete="off"
            ></el-input>
             </el-col>
          </el-form-item>
          <el-form-item
            label="收货地址"
            prop="buyerAddress"
            :rules="[
              { required: true, message: '收货地址不能为空' },
              { min: 6, max: 25, message: '收货地址至少为6个汉字' },
            ]"
          >   <el-col :span="8">
            <el-input
              type="textarea"
              v-model="ruleForm.buyerAddress"
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
  </div>
</template>
<script>
import { Message } from "element-ui";
import api from "@/api/api";
import topfile from "../topfile.vue";
export default {
  components: { topfile },
  data() {
    return {
      ruleForm: {
        buyerAccountName: "",
        buyerName: "",
        buyerSex: "",
        buyerAddress: "",
        buyerTel: "",
      },
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          api
            .updateAddress(this.ruleForm)
            .then((response) => {
            
              if (response.data.result == 1) {
                Message.success("提交成功！正在跳转上个页面...");
                 this.timer = setTimeout(() => {
                  history.back();
            }, 1000);
              } else {
                Message.error("提交失败！");
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
    this.ruleForm.buyerAccountName = sessionStorage["userName"];
    let accountName = {
      accountName: sessionStorage["userName"],
    };
    api
      .getBuyerAddress(accountName)
      .then((response) => {
       
        if (response.data.result) {
             this.ruleForm = response.data.result;
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>