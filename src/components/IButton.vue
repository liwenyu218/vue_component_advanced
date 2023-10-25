<template>
  <button
    :class="'i-button-size-' + size"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
<script>
import Emitter from "../emitter.js";
// 判断参数是否是其中之一
function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

export default {
  name: "IButton",
  inheritAttrs: false,
  mixins: [Emitter],
  mounted() {
    this.$on("appClick", (text) => {
      console.log("text :>> ", text);
    });
  },
  props: {
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"]);
      },
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.dispatch("App", "btnClick", "hello");
    },
  },
};
</script>

<style>
.i-button-size-small {
  width: 40px;
  height: 20px;
}

.i-button-size-default {
  width: 50px;
  height: 30px;
}

.i-button-size-large {
  width: 60px;
  height: 40px;
}
</style>
