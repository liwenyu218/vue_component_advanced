<!--
 * @Author: Liwenyu
 * @Date: 2023-11-02 16:42:48
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-11-07 14:49:46
 * @FilePath: \vue_component_advanced\src\components\TableRender\Table4.vue
 * @Description:
 *
-->
<template>
  <table>
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(col, colIndex) in columns" :key="colIndex">
          <template v-if="'render' in col">
            <Render
              :row="row"
              :column="col"
              :index="rowIndex"
              :render="col.render"
            ></Render>
          </template>
          <template v-else-if="'slot' in col">
            <slot-scope :row="row" :column="col" :index="rowIndex"></slot-scope>
          </template>
          <template v-else> {{ row[col.key] }} </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from "./render.js";
import SlotScope from "./slot.js";

export default {
  components: { Render, SlotScope },
  provide() {
    return {
      tableRoot: this,
    };
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table th,
table td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>
