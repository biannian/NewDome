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
          <el-breadcrumb-item>店铺信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-form
            :model="Form"
            ref="Form"
            label-width="130px"
            class="demo-ruleForm"
          >
            <el-form-item label="店铺编号" prop="shopId">
              <el-col :span="3">
                <el-input :disabled="true" v-model="Form.shopId"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item
              label="店铺名"
              prop="shopName"
              :rules="[{ required: true, message: '店铺名不能为空' }]"
            >
              <el-col :span="8">
                <el-input type="text" v-model="Form.shopName"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="店铺图"
              prop="shopImg"
              :rules="[{ required: true, message: '店铺图不能为空' }]"
            >
              <img width="150px" :src="Form.shopImg" />
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
              label="店铺地址"
              prop="shopAddress"
              :rules="[{ required: true, message: '店铺地址不能为空' }]"
            >
              <el-col :span="12">
                <el-input type="textarea" v-model="Form.shopAddress"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item
              label="店铺起送价格"
              prop="shopStartPrice"
              :rules="[{ required: true, message: '店铺起送价格不能为空' }]"
            >
              <el-col :span="5">
                <el-input type="text" v-model="Form.shopStartPrice"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item
              label="店铺运费"
              prop="shopSendPrice"
              :rules="[{ required: true, message: '店铺运费不能为空' }]"
            >
              <el-col :span="5">
                <el-input type="text" v-model="Form.shopSendPrice"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item
              label="店铺介绍"
              prop="shopInfo"
              :rules="[{ required: true, message: '店铺介绍不能为空' }]"
            >
              <el-col :span="12">
                <el-input type="textarea" v-model="Form.shopInfo"></el-input>
              </el-col>
            </el-form-item>

            <el-form-item
              label="店铺种类"
              prop="shopTypeId"
              :rules="[{ required: true, message: '店铺种类不能为空' }]"
            >
              <el-col :span="5">
                <el-select
                  style="float: left"
                  v-model="Form.shopTypeId"
                  placeholder="请选择"
                  filterable
                >
                  <el-option
                    v-for="item in menus"
                    :key="item.shopTypeId"
                    :label="item.shopType"
                    :value="item.shopTypeId"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </el-form-item>

            <el-form-item
              label="营业时间"
              prop="shopOpenTime"
              :rules="[{ required: true, message: '营业时间不能为空' }]"
            >
              <el-col :span="5">
                <el-time-select
                  v-model="Form.shopOpenTime"
                  :picker-options="{
                    start: '06:30',
                    step: '00:15',
                 end: '23:30',
                  }"
                  placeholder="开始时间"
                >
                </el-time-select>
                 </el-col>
                    <el-col :span="2">至</el-col>
                   <el-col :span="5">
                   <el-time-select
                  v-model="Form.shopCloseTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                     end: '23:30',
                  }"
                  placeholder="结束时间"
                >
                </el-time-select>
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
import api from "@/api/api";

import { Message } from "element-ui";
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
export default {
  components: { SellerAside, SellerHeader },
  methods: {},
  data() {
    return {
      menus: [],
      dialogVisible: false,
      url: "",
      Form: {
        shopId: "",
        shopName: "",
        shopSellerId: "",
        shopImg: "",
        shopAddress: "",
        shopStartPrice: "",
        shopSendPrice: "",
        shopTypeId: "",
        shopInfo: "",
        shopOpenTime: "",
        shopCloseTime: "",
      },
    };
  },
  methods: {
    selectMenu() {
      api
        .selectShopType()
        .then((res) => {
          this.menus = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    upload() {
      Message.info("等待图片上传");
      let formData = new FormData();
      formData.append("picture", this.pictrue.raw);
      api
        .pictureAdd(formData)
        .then((res) => {
          console.log(res);
          this.Form.shopImg = res.data.result;
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
          api.updateShopInformation(this.Form).then((res) => {
            
            if (res.data.result == 1) {
              Message.success("成功");
                  this.timer = setTimeout(() => {
                   location.reload();
                  },500);
           
            } else {
              Message.error("修改失败！");
            }
          });
        } else {
          Message.error("修改失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectShop() {
      api
        .getLimit()
        .then((response) => {
          this.Form.shopSellerId = response.data.result.accountUserId;
          let a = {
            sellerId: response.data.result.accountUserId,
          };
          api
            .selectShopInformation(a)
            .then((response) => {
              console.log(response);
              if (response.data.result) {
                this.Form = response.data.result;
              }
            })
            .catch((error) => console.log(error));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.selectMenu();
    this.selectShop();
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