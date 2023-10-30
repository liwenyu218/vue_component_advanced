<!--
 * @Author: Liwenyu
 * @Date: 2023-10-27 14:05:03
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-10-30 10:38:47
 * @FilePath: \vue_component_advanced\src\components\checkbox\Checkbox.vue
 * @Description:
 *
-->
<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change"
      />
      <!-- v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值
        而总是将 Vue 实例的数据作为数据来源。
        就是说v-model对于checkbox会实现 :checked="model" 和@change="model = value"
        model会保存当前选中框的值的数组, 如以此进行双向绑定. 即数组有对应的value值, 则为选中状态.

        value 属性对于 <input type="checkbox"> 和 <input type="radio"> 是必需的。
        定义与input元素相关的值
         -->
      <input
        v-else
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change"
      />
      <!-- checked 属性规定被选定的 input 元素 -->
    </span>
    <slot>{{ label }}</slot>
  </label>
</template>

<script>
import Emitter from "../../mixins/emitter";
import { findComponentUpward } from "../../utils/assist";

export default {
  name: "ICheckbox",
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String, Number, Boolean],
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
      model: [],
      group: false,
      parent: null,
    };
  },
  mounted() {
    this.parent = findComponentUpward(this, "ICheckboxGroup");

    if (this.parent) this.group = true;

    if (this.group) {
      this.parent.updateModel(true);
    } else {
      this.updateModel();
    }
  },
  watch: {
    /**
     * * 只有立即执行才能从这里抛出异常
     * * 因为通过change事件改变这里value的逻辑是:
     * * 从该组件将value设置为tureValue或者falseValue, 然后emit给父组件,父组件再通过v-bind:value传回
     * * 这里监听到value的变化, 进而更新当前组件的currentValue
     */
    value: {
      handler(val) {
        // 只有立即执行时, 才有可能抛出异常
        if (val === this.trueValue || val === this.falseValue) {
          this.updateModel();
        } else {
          throw "value should be trueValue or falseValue";
        }
      },
      immediate: true,
    },
    // 只是点击这个单组件的单选框, 该组件的内部逻辑, 也会触发model的变化.
    // model() {
    //   console.log("model in checkbox :>> ");
    // },
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }

      const checked = event.target.checked;

      this.currentValue = checked; // 更新当前input是否为选中的状态

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit("input", value); // 配合直接在checkbox上使用v-model的实现

      if (this.group) {
        // 调用父组件的更新方法, 去更新v-model绑定的值, 并且进行校验
        this.parent.change(this.model);
      } else {
        // 暴露给外部的on-change事件
        this.$emit("on-change", value);
        // 在formitem中监听这里的改变, 从而实现表单校验
        this.dispatch("IFormItem", "on-form-change", value);
      }
    },

    updateModel() {
      // 因为currentValue是组件自己使用的 所以仍然为Boolean值
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>

<style scoped></style>
