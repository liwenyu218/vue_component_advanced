<!--
 * @Author: Liwenyu
 * @Date: 2023-10-24 11:58:42
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-11-02 16:57:20
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
          <router-link to="/findComponents">demo1：findComponents</router-link>
        </li>
        <li>
          <router-link to="/checkbox">
            实战 2：组合多选框组件 —— CheckboxGroup & Checkbox
          </router-link>
        </li>
        <li>
          <router-link to="/radio">
            作业 1：组合单选框组件 —— Radio & RadioGroup
          </router-link>
        </li>
        <li>
          <router-link to="/display">
            实战 3：动态渲染 .vue 文件的组件 —— Display
          </router-link>
        </li>
        <li>
          <router-link to="/alert">
            实战 4：全局提示组件 —— $Alert
          </router-link>
        </li>
        <li>
          <router-link to="/render"> demo2：Render Function </router-link>
        </li>
        <li>
          <router-link to="/tableRender">
            实战 5：表格组件 —— Table
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
