<!--
 * @Author: Liwenyu
 * @Date: 2023-11-02 16:55:27
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-11-07 15:01:13
 * @FilePath: \vue_component_advanced\src\views\MyTable4.vue
 * @Description:
 *
-->
<template>
  <div>
    <table-slot :columns="columns" :data="data">
      <!-- vue2.6之后新写法, vue3中仅支持该写法 -->
      <template v-slot:name="{ row, index }">
        <input type="text" v-model="editName" v-if="editIndex === index" />
        <span v-else>{{ row.name }}</span>
      </template>
      <!--#age 等价于v-slot:age -->
      <template #age="{ row, index }">
        <input type="text" v-model="editAge" v-if="editIndex === index" />
        <span v-else>{{ row.age }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="birthday">
        <input type="text" v-model="editBirthday" v-if="editIndex === index" />
        <span v-else>{{ parseTimeStamp(row.birthday) }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="address">
        <input type="text" v-model="editAddress" v-if="editIndex === index" />
        <span v-else>{{ row.address }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <button @click="handleSave(index)">保存</button>
          <button @click="editIndex = -1">取消</button>
        </div>
        <div v-else>
          <button @click="handleEdit(row, index)">操作</button>
        </div>
      </template>
    </table-slot>
  </div>
</template>
<script>
import TableSlot from "@/components/TableRender/Table4.vue";

export default {
  components: { TableSlot },
  data() {
    return {
      editName: "",
      editAge: "",
      editBirthday: "",
      editAddress: "",
      editIndex: -1,

      columns: [
        {
          title: "姓名",
          slot: "name",
        },
        {
          title: "年龄",
          slot: "age",
        },
        {
          title: "出生日期",
          slot: "birthday",
        },
        {
          title: "地址",
          slot: "address",
        },
        {
          title: "操作",
          slot: "action",
        },
      ],
      data: [
        {
          name: "王小明",
          age: 18,
          birthday: "919526400000",
          address: "北京市朝阳区芍药居",
        },
        {
          name: "张小刚",
          age: 25,
          birthday: "696096000000",
          address: "北京市海淀区西二旗",
        },
        {
          name: "李小红",
          age: 30,
          birthday: "563472000000",
          address: "上海市浦东新区世纪大道",
        },
        {
          name: "周小伟",
          age: 26,
          birthday: "687024000000",
          address: "深圳市南山区深南大道",
        },
      ],
    };
  },
  methods: {
    handleSave(index) {
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].birthday = Date.parse(
        new Date(this.editBirthday).toString()
      );
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    },

    handleEdit(row, index) {
      this.editName = row.name;
      this.editAge = row.age;
      this.editBirthday = this.parseTimeStamp(row.birthday);
      this.editAddress = row.address;
      this.editIndex = index;
    },

    parseTimeStamp(time) {
      const date = new Date(parseInt(time));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${month}-${day}`;
    },
  },
};
</script>
