<template>
  <el-header style="text-align: right; font-size: 21px">
    <span> {{ this.$data.userName }}|</span>
    <span @click="exit">注销</span>
  </el-header>
</template>

<script>

import api from "@/api/api";
export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    exit() {
      sessionStorage.clear();
      this.$router.push({ path: "/" });
    },
  },

  mounted() {
        api
      .getLimit()
      .then((response) => {
                this.userName =response.data.result.accountName
  
      })
      .catch((err) => {
        console.log(err);
      });

    this.userName = sessionStorage["userName"];
  },
};
</script>

<style>
</style>