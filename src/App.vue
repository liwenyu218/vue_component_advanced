<!--
 * @Author: Liwenyu
 * @Date: 2023-10-24 11:58:42
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-10-31 10:04:56
 * @FilePath: \vue_component_advanced\src\App.vue
 * @Description:
 *
-->
<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li>
          <router-link to="/form">
            实战 1：具有数据校验功能的表单组件 —— Form
          </router-link>
        </li>
        <li>
          <router-link to="/findComponents">demo2: findComponents</router-link>
        </li>
        <li>
          <router-link to="/checkbox">
            实战 2：组合多选框组件——CheckboxGroup & Checkbox
          </router-link>
        </li>
        <li>
          <router-link to="/radio">
            作业 1：组合单选框组件——Radio & RadioGroup
          </router-link>
        </li>
        <li>
          <router-link to="/display">
            实战 3：动态渲染 .vue 文件的组件—— Display
          </router-link>
        </li>
      </ul>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
