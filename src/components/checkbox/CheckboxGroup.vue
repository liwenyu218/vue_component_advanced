<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { findComponentsDownward } from "../../utils/assist";
import Emitter from "../../mixins/emitter";

export default {
  name: "ICheckboxGroup",
  mixins: [Emitter],
  props: {
    // 接受v-model传来的value
    value: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    };
  },
  watch: {
    // 有新的value传来时, 要去更新子组件中value的状态
    value() {
      this.updateModel(true);
    },
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    /**
     * * describe: 这个方法的作用就是在 CheckboxGroup 里通过 findComponentsDownward 方法找到所有的 Checkbox，
     * * 然后把 CheckboxGroup 的 value，赋值给 Checkbox 的 model，
     * * 并根据 Checkbox 的 label，设置一次当前 Checkbox 的选中状态。
     * * 这样无论是由内而外选择，或由外向内修改数据，都是双向绑定的，而且支持动态增加 Checkbox 的数量。
     * @param {Boolean} update
     */
    updateModel(update) {
      this.childrens = findComponentsDownward(this, "ICheckbox");
      if (this.childrens) {
        const { value } = this;
        this.childrens.forEach((child) => {
          /**
           * // 更新子组件的value, 实现子组件单选框的变化
           * ! 更新子组件的value, 保留当前的状态.
           * * 不写这个也能完成单选框的点击, 但是这样数组中每次都只会有当次点击元素对应的value
           */
          child.model = value;

          if (update) {
            // 如果在当前的value中.能找到自己的label,就把currentValue置为true
            // 但是这里好像只是象征意义 因为子组件中没有用到这个属性 不写也能实现功能
            child.currentValue = value.indexOf(child.label) >= 0;
            // 下面不写也可以 因为子组件会自己对这个属性进行处理
            child.group = true;
          }
        });
      }
    },

    change(data) {
      this.currentValue = data;
      // 完成父组件v-model逻辑
      this.$emit("input", data);
      // 往父组件发送on-change的事件
      this.$emit("on-change", data);
      // 往ifromitem发送检验事件
      this.dispatch("IFormItem", "on-form-change", data);
    },
  },
};
</script>

<style scoped></style>
