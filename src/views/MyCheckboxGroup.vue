<template>
  <div>
    <i-form
      ref="checkboxForm"
      :model="checkboxValidate"
      :rules="checkboxRuleValidate"
    >
      <i-form-item label="单选" prop="checkbox">
        <div>单选框</div>
        <i-checkbox v-model="checkboxValidate.checkbox"> 同意 </i-checkbox>
        <span>数据: {{ checkboxValidate.checkbox.toString() }}</span>
      </i-form-item>
      <i-form-item label="多选" prop="checkList">
        <div>多选框</div>
        <i-checkbox-group v-model="checkboxValidate.checkList">
          <i-checkbox label="apple" disabled></i-checkbox>
          <i-checkbox label="xiaomi"></i-checkbox>
          <i-checkbox label="huawei"></i-checkbox>
        </i-checkbox-group>
        <span>数据: {{ checkboxValidate.checkList }}</span>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import IForm from "../components/Form/Form";
import IFormItem from "../components/Form/FormItem";
import ICheckboxGroup from "../components/checkbox/CheckboxGroup";
import ICheckbox from "../components/checkbox/Checkbox";

export default {
  components: {
    ICheckboxGroup,
    ICheckbox,
    IForm,
    IFormItem,
  },
  data() {
    return {
      checkboxValidate: {
        checkbox: false,
        checkList: ["apple"],
      },
      checkboxRuleValidate: {
        checkbox: [
          {
            type: "enum",
            enum: [true],
            required: true,
            message: "不能不同意",
            trigger: "change",
          },
        ],
        checkList: [
          {
            type: "array",
            required: true,
            len: 3,
            message: "必须全选",
            trigger: "change",
          },
        ],
      },
    };
  },
  watch: {
    "checkboxValidate.checkList": {
      handler(val) {
        console.log("val :>> ", val);
      },
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.checkboxForm.validate((valid) => {
        if (valid) {
          window.alert("提交成功");
        } else {
          window.alert("表单校验失败");
        }
      });
    },

    handleReset() {
      this.$refs.checkboxForm.resetFields();
    },
  },
};
</script>

<style scoped></style>
