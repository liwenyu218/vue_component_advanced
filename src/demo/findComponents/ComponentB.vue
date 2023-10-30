<!--
 * @Author: Liwenyu
 * @Date: 2023-10-27 11:23:44
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-10-27 14:01:39
 * @FilePath: \vue_component_advanced\src\demo\findComponents\ComponentB.vue
 * @Description:
 *
-->
<template>
  <div>组件B</div>
</template>

<script>
import { findBrothersComponents } from "../../utils/assist.js";
export default {
  name: "ComponentB",
  data() {
    return {
      name: "liwenyu",
    };
  },
  mounted() {
    const comsB = findBrothersComponents(this, "ComponentB", false);
    console.log("comsB :>> ", comsB);
  },
  methods: {
    sayhello() {
      console.log("🌈 ~ sayhello:");
    },
  },
};
</script>

<style scoped></style>
