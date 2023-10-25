<template>
  <div id="app">
    <button @click="AppCLick">AppButton</button>
    <hello-world msg="hello world" />
  </div>
</template>

<script>
import Emitter from "./emitter.js";
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  mixins: [Emitter],
  components: {
    HelloWorld,
  },
  mounted() {
    this.$on("btnClick", (text) => {
      console.log(text);
    });
  },
  methods: {
    AppCLick() {
      this.broadcast("IButton", "appClick", "world");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
