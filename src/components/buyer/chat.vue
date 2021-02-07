<template></template>

<script>
export default {
  mounted() {
    api
      .getLimit()
      .then((response) => {
              let a ={
      accountName: response.data.result.accountName
    }
      })
      .catch((err) => {
        console.log(err);
      });


      
  },
};
</script>

<style>
</style>