<!-- form-item.vue -->
<template>
  <div class="from-item">
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{
      label
    }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from "async-validator";
import Emitter from "@/mixins/emitter";

export default {
  name: "IFormItem",
  mixins: [Emitter],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false, //是否为必填
      validateState: "", // 校验状态
      validateMessage: "", // 校验不通过时的提示信息
    };
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        // 函数的返回值不为ture时,函数会结束执行,所以这里其实只会检查rules的第一项元素
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }
      // 监听blur和change事件, 并进行校验
      this.$on("on-form-blur", this.onFiledBlur);
      this.$on("on-form-change", this.onFiledChange);
    },

    // 从 Form 的 rules 属性中，通过prop属性,获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.form.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },

    // 重置数据
    resetField() {
      this.validateState = "";
      this.validateMessage = "";

      this.form.model[this.prop] = this.initialValue;
    },

    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      // rules.trigger没有的话就要校验,反之就继续检查rule.trigger是否符合传入的trigger
      return rules.filter(
        (rule) => !rules.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },

    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 不必须则不校验
      if (!rules[0].required) {
        callback();
        return true;
      }

      // 设置状态为校验中
      this.validateState = "validating";

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (error) => {
        this.validateState = !error ? "success" : "error";
        this.validateMessage = error ? error[0].message : "";

        callback(this.validateMessage);
      });
    },

    onFiledBlur() {
      this.validate("blur");
    },

    onFiledChange() {
      this.validate("change");
    },
  },
  mounted() {
    if (this.prop) {
      // 将当前组件实例派发到Form组件中保存
      this.dispatch("IForm", "on-form-item-add", this);

      // 设置初始值，以便在重置时恢复默认值;这个值不需要响应式,所以不用在data中定义
      this.initialValue = this.fieldValue;

      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("IForm", "on-form-item-remove", this);
  },
};
</script>

<style>
/* .from-item {
  display: flex;
} */
.i-form-item-label-required::before {
  content: "*";
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
