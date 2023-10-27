<template>
  <input
    type="text"
    :value="currentValue"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import Emitter from "@/mixins/emitter";

export default {
  name: "IInput",
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    handleInput(event) {
      // 输入时实时改变current的值
      const value = event.target.value;
      this.currentValue = value;
      // 将改变的值同步到绑定到i-input的v-model上
      this.$emit("input", value);
      // 将value的改变派发到i-form-item组件中
      this.dispatch("IFormItem", "on-form-change", value);
    },
    handleBlur() {
      this.dispatch("IFormItem", "on-form-blur", this.currentValue);
    },
  },
};
</script>
