<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
    </p>
    <i-button size="default">button</i-button>
  </div>
</template>

<script>
import IButton from "./IButton";
export default {
  name: "HelloWorld",
  components: {
    IButton,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
