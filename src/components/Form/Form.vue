<!-- form.vue -->
<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "IForm",
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  provide() {
    return {
      form: this,
    };
  },
  data() {
    return {
      fields: [],
    };
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach((field) => {
        field.resetField();
      });
    },

    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      // debugger;
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate("", (errors) => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === "function") {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
  created() {
    this.$on("on-form-item-add", (item) => {
      if (item) this.fields.push(item);
    });

    this.$on("on-form-item-remove", (item) => {
      // 如果没有prop属性,就不移除实例嘛?
      if (item.prop) this.fields.splice(this.fields.indexOf(item), 1);
    });
  },
};
</script>
