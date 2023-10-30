<!--
 * @Author: Liwenyu
 * @Date: 2023-10-27 11:23:31
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-10-27 14:00:43
 * @FilePath: \vue_component_advanced\src\demo\findComponents\ComponentA.vue
 * @Description:
 *
-->
<template>
  <div>
    <span>组件A</span>
    <component-b />
    <component-b />
  </div>
</template>

<script>
import ComponentB from "./ComponentB.vue";
import { findComponentDownward } from "../../utils/assist";

export default {
  name: "ComponentA",
  components: {
    ComponentB,
  },
  data() {
    return {
      name: "liwenyu",
    };
  },
  mounted() {
    const comB = findComponentDownward(this, "ComponentB");
    if (comB) {
      console.log("comB.name :>> ", comB.name);
      comB.sayhello();
    }
  },
};
</script>

<style scoped></style>
