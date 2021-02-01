
<template>
  <div>
    <el-container>
      <el-header>
        <div style="width: 20%; float: left; margin-top: 50px">
          <el-page-header @back="goBack" content="账户信息修改" />
        </div>
        <div style="margin-right: 20px">
          <topfile></topfile>
        </div>
      </el-header>
    </el-container>
    <el-container>
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
          <el-form-item label="密码" prop="accountPassword">
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
  </div>
</template>
<script>
import topfile from "../topfile.vue";
export default {
  components: { topfile },
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
      } else if (value !== this.ruleForm.pass) {
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
    goBack() {
      history.back();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>
