<template>
  <el-header style="text-align: right; font-size: 21px">
    <span> {{ this.$data.userName }}|</span>
    <span @click="exit">注销</span>
  </el-header>
</template>

<script>
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
    this.userName = sessionStorage["userName"];
  },
};
</script>

<style>
</style>