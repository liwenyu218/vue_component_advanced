<template>
  <div>
    <button @click="handleOpen1">成功</button>
    <button @click="handleOpen2">警告</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen1() {
      this.$Alert.info({
        content: "成功!",
        type: "success",
        showClose: true,
      });
    },

    handleOpen2() {
      this.$Alert.info({
        content: "警告!",
        type: "warning",
      });
    },
  },
};
</script>

<style scoped></style>
