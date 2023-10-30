<template>
  <div class="radio">
    <i-form ref="form" :model="radioForm" :rules="radioRules">
      <i-form-item label="单选框" prop="radio">
        <i-radio v-model="radioForm.radio" :label="1">1</i-radio>
        <i-radio v-model="radioForm.radio" :label="2">2</i-radio>
        <i-radio v-model="radioForm.radio" :label="3" disabled>3</i-radio>
      </i-form-item>
      <i-form-item label="组合单选框" prop="radioGroup">
        <i-radio-group v-model="radioForm.radioGroup">
          <i-radio :label="4">4</i-radio>
          <i-radio :label="5">5</i-radio>
          <i-radio :label="6" disabled>6</i-radio>
        </i-radio-group>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import IRadioGroup from "../components/Radio/RadioGroup";
import IRadio from "../components/Radio/Radio";
import IForm from "../components/Form/Form.vue";
import IFormItem from "../components/Form/FormItem.vue";

export default {
  components: {
    IRadioGroup,
    IRadio,
    IForm,
    IFormItem,
  },
  data() {
    return {
      radioForm: {
        radio: 3,
        radioGroup: 6,
      },

      radioRules: {
        radio: [
          { type: "enum", required: true, enum: [2], message: "只能选中间" },
        ],
        radioGroup: [
          { type: "enum", required: true, enum: [5], message: "只能选中间" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });
    },

    handleReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped></style>
