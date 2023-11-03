<template>
  <div>
    <my-component :render="render"></my-component>
  </div>
</template>

<script>
import MyComponent from "../demo/renderFunction/MyComponent.vue";

export default {
  components: { MyComponent },
  data() {
    return {
      render: (h) => {
        return h(
          "div",
          {
            style: {
              color: "red",
            },
          },
          "自定义内容"
        );
      },
    };
  },
};
</script>

<style scoped></style>
