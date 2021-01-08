<template>
  <div></div>
</template>

<script>
import api from "@/api/api";
export default {
  data() {
    return {};
  },
  mounted() {
    api
      .queryAll()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
</style>