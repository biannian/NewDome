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
          <el-breadcrumb-item>商品新增</el-breadcrumb-item>
        </el-breadcrumb>
        <el-main>
          <el-form
            :model="Form"
            ref="Form"
            label-width="100px"
            class="demo-ruleForm"
          >
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
                <img width="100%" :src="url" alt="" />
              </el-dialog>
              <p style="font-size: 13px">只能上传jpg/png文件，且不超过1张</p>
            </el-form-item>

            <el-form-item
              label="商品种类"
              prop="commodityMenuId"
              :rules="[{ required: true, message: '商品种类不能为空' }]"
            >
              <el-col :span="7">
                <el-select
                  style="float: left"
                  v-model="Form.commodityMenuId"
                  placeholder="请选择"
                  filterable
                >
                  <el-option
                    v-for="item in menus"
                    :key="item.shopMenuId"
                    :label="item.shopMenuName"
                    :value="item.shopMenuId"
                  >
                  </el-option>
                </el-select>
                <el-button
                  style="float: right"
                  type="primary"
                  @click="addMenu"
                  icon="el-icon-plus"
                  circle
                ></el-button
                ><br />
                <p>(没有的商品种类可以点击添加)</p>
              </el-col>
            </el-form-item>

            <el-form-item
              label="商品库存"
              prop="commodityNumber"
              :rules="[
                { required: true, message: '商品库存不能为空' },
                { type: 'number', message: '商品库存必须为数字值' },
              ]"
            >
              <el-col :span="5">
                <el-input
                  type="text"
                  v-model.number="Form.commodityNumber"
                ></el-input>
              </el-col>
            </el-form-item>

            <el-form-item
              label="商品价格"
              prop="commodityPrice"
              :rules="[
                { required: true, message: '商品价格不能为空' },
                { type: 'number', message: '商品价格必须为数字值' },
              ]"
            >
              <el-col :span="5">
                <el-input
                  type="text"
                  v-model.number="Form.commodityPrice"
                ></el-input>
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
import SellerAside from "./sellerAside.vue";
import { Message } from "element-ui";
import SellerHeader from "./sellerHeader.vue";
export default {
  components: { SellerAside, SellerHeader },

  data() {
    return {
      dialogVisible: false,
      url: "",
      pictrue: "",
      menus: [],
      Form: {
        accountUserId:"",
        commodityImg: "",
        commodityMenuId: "",
        commodityName: "",
        commodityNumber: "",
        commodityShopId: "",
        commodityPrice: "",
      },
    };
  },
  methods: {
    addMenu() {
      this.selectMenu();
      let _this = this;
      this.$prompt("请输入要添加的种类名称", "添加商品种类", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValidator: function (v) {
          if (v) {
            for (let i = 0; i < _this.menus.length; i++) {
              if (_this.menus[i].shopMenuName == v) {
                return false;
              }
            }
          } else {
            return false;
          }
        },
        inputErrorMessage: "商品种类不能为空且不可重复",
      })
        .then(({ value }) => {
          for (let i = 0; i < this.menus.length; i++) {
            if (this.menus[i].shopMenuName == value) {
              this.addMenu();
              Message.warning("输入的种类名称重复！");
              return false;
            }
          }
          let a = {
            shopMenuName: value,
          };
          api.addMenu(a).then((res) => {
            if (res.data.result == 1) {
              this.selectMenu();
              Message.success("添加成功");
            } else {
              Message.success("添加失败");
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    upload() {
      Message.info("等待图片上传");
      let formData = new FormData();
      formData.append("picture", this.pictrue.raw);
      api
        .pictureAdd(formData)
        .then((res) => {
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
        console.log(res);
        if (res.data.code == 200) {
          Message.success("删除成功");
          this.Form.commodityImg = "";
        } else {
          Message.success("删除失败，请重试");
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
          api
            .getLimit()
            .then((response) => {
              this.Form.accountUserId = response.data.result.accountUserId;
              api.commodityAdd(this.Form).then((res) => {
                if (res.data.result == 1) {
                  Message.success("成功");
                  location.reload();
                } else {
                  Message.error("新增失败！");
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Message.error("新增失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    selectMenu() {
      api
        .selectMenu()
        .then((res) => {
          this.menus = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
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