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
          <el-breadcrumb-item :to="{ path: '/seller/sellerCommodityList' }"
            >商品管理</el-breadcrumb-item
          >
          <el-breadcrumb-item>商品修改</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-form
            :model="Form"
            ref="Form"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="商品编号" prop="commodityId">
              <el-col :span="3">
                <el-input
                  :disabled="true"
                  v-model="Form.commodityId"
                ></el-input>
              </el-col>
            </el-form-item>
               <el-form-item
              label="商品名"
              prop="commodityName"
              :rules="[{ required: true, message: '商品名不能为空' }]"
            >
              <el-col :span="8">
                <el-input type="text" v-model="Form.commodityName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="商品图"
              prop="commodityImg"
              :rules="[{ required: true, message: '商品图不能为空' }]"
            >
             <img width="150px" :src="Form.commodityImg" />
              <el-upload
              
                action
                ref="upload"
                list-type="picture-card"
                :on-change="handleChange"
                :on-preview="handlePictureCardPreview"
                :auto-upload="false"
                :limit="1"
                :before-remove="handleRemove"
                :http-request="upload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="url" />
              </el-dialog>
              <p style="font-size: 13px">只能上传jpg/png文件，且不超过1张</p>


            </el-form-item>
            <el-form-item
              label="商品种类"
              prop="commodityMenuId"
              :rules="[{ required: true, message: '商品种类不能为空' }]"
            >
              <el-col :span="6">
                <el-select v-model="Form.shopMenuName" placeholder="请选择" filterable>
                  <el-option
                    v-for="item in menus"
                    :key="item.shopMenuId"
                    :label="item.shopMenuName"
                    :value="item.shopMenuId"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>
         

            <el-form-item
              label="商品库存"
              prop="commodityNumber"
              :rules="[{ required: true, message: '商品库存不能为空' }]"
            >
              <el-col :span="5">
                <el-input type="text" v-model="Form.commodityNumber"></el-input>
              </el-col>
            </el-form-item>

              <el-form-item
              label="商品价格"
              prop="commodityPrice"
              :rules="[{ required: true, message: '商品价格不能为空' }]"
            >
              <el-col :span="5">
                <el-input type="text" v-model="Form.commodityPrice"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('Form')"
                >提交</el-button
              >
              <el-button @click="resetForm('Form')">重置</el-button>
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
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
export default {
  components: { SellerAside, SellerHeader },
  methods: {},
  data() {
    return {
      dialogVisible: false,
      url: "",
      menus:[],
      Form: {
        commodityId: "",
        commodityImg: "",
        commodityMenuId: "",
        commodityName: "",
        commodityNumber: "",
        commodityPrice: "",
      },
    };
  },
  methods: {
    upload() {
      Message.info("等待图片上传");
      let formData = new FormData();
      formData.append("picture", this.pictrue.raw);
      api
        .pictureAdd(formData)
        .then((res) => {
          console.log(res);
          this.Form.commodityImg = res.data.result;
          Message.success("图片上传成功");
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleChange(file) {
      this.pictrue = file;
      this.$refs.upload.submit();
    },
    handleRemove() {
      let a = {
        path: this.Form.commodityImg,
      };
      api.pictureDelete(a).then((res) => {
        if (res.data.code == 200) {
          Message.success("删除成功");
          this.Form.commodityImg = "";
        } else {
          Message.error("删除失败，请重试");
        }
      });
    },
    handlePictureCardPreview(file) {
      this.url = file.url;
      this.dialogVisible = true;
    },

     submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
     console.log(this.Form);
     api
     .commodityEdit(this.Form)
     .then((res)=>{
       if (res.data.result == 1) {
              Message.success("成功");
             history.back();
       }
     })
        } else {
         Message.error("修改失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

      selectMenu(){
        api
        .selectMenu()
        .then((res)=>{
           this.menus = res.data.result;
        })
        .catch((err)=>{console.log(err);})
      }
  },

  mounted() {
 
   // this.Form.commodityMenuId = this.$route.query.shopMenuName;
     this.Form = this.$route.query;
    this.selectMenu();
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