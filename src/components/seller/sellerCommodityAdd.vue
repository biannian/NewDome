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
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{ file }">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url"
                    alt=""
                  />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
        
            
            
            </el-form-item>


            <el-form-item
              label="商品种类"
              prop="commodityMenuId"
              :rules="[{ required: true, message: '手机号不能为空' }]"
            >
              <el-col :span="6">
                <el-select v-model="Form.commodityMenuId" placeholder="请选择">
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
import api from "@/api/api";
import SellerAside from "./sellerAside.vue";
import SellerHeader from "./sellerHeader.vue";
export default {
  components: { SellerAside, SellerHeader },
  methods: {},
  data() {
    return {
      menus: [],
      Form: {
        commodityImg: "",
        commodityMenuId: "",
        commodityName: "",
        commodityNumber: "",
        commodityPrice: "",
      },
    };
  },
  methods: {
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
    handleClick(row) {
      // let params = row;
      // this.$router.push({ path: "/root/accountEdit", params });
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