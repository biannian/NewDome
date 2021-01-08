<template>
  <div>
    <topfile></topfile>
    <div style="float: right;margin-top:10px">
      <el-autocomplete
        placeholder="请输入内容"
      >
      </el-autocomplete>
            <el-button icon="el-icon-search" circle></el-button>
    </div>
  <div class="run">
      <el-carousel height="100px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <index></index>
  </div>
</template>

<script>
import topfile from "./topfile";
import index from "./index";
const axios = require("axios");
export default {
  name: "Helloword",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
   
    },
  
  components: {
    topfile,
    index,
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.run{
  padding-top: 80px;
}


</style>