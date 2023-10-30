<template>
  <label>
    <span>
      <input
        v-if="group"
        type="radio"
        v-model="model"
        :value="label"
        :disabled="disabled"
        @change="change"
      />
      <input
        v-else
        type="radio"
        :checked="currentValue"
        :disabled="disabled"
        @change="change"
      />
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { findComponentUpward } from "../../utils/assist";

export default {
  name: "IRadio",
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String, Number, Boolean],
      required: true,
    },
  },
  data() {
    return {
      currentValue: this.value,
      group: false,
      model: null,
      parent: null,
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "IRadioGroup");

    if (this.parent) {
      this.group = true;
    }

    if (this.group) {
      this.parent.updateModel(this.model);
    } else {
      this.updateModel();
    }
  },
  watch: {
    value() {
      this.updateModel();
    },
  },
  methods: {
    change(event) {
      //   debugger;
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;

      this.currentValue = checked;

      const value = checked ? this.label : null;
      this.$emit("input", value);

      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit("on-change", value);
        this.dispatch("IFormItem", "on-form-change", value);
      }
    },

    updateModel() {
      this.currentValue = this.value === this.label;
    },
  },
};
</script>

<style scoped></style>
