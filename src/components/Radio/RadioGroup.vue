<template>
  <div class="radio-group">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from "../../utils/assist";
import Emitter from "../../mixins/emitter";

export default {
  name: "IRadioGroup",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  watch: {
    value() {
      this.updateModel(true);
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    updateModel(update) {
      console.log("update :>> ", update);
      let children = findComponentsDownward(this, "IRadio");
      let { value } = this;

      if (children.length) {
        children.forEach((child) => {
          child.model = value;

          if (update) {
            child.currentValue = value;
            child.group = true;
          }
        });
      }
    },

    change(data) {
      this.currentValue = data;

      this.$emit("input", data);
      this.$emit("on-change", data);
      this.dispatch("IFormItem", "on-form-change", data);
    },
  },
};
</script>

<style scoped></style>
