<!--
 * @Author: Liwenyu
 * @Date: 2023-10-30 17:10:38
 * @LastEditors: Liwenyu
 * @LastEditTime: 2023-10-31 11:10:06
 * @FilePath: \vue_component_advanced\src\components\Display\Display.vue
 * @Description:
 *
-->
<template>
  <div ref="display"></div>
</template>

<script>
import randomStr from "@/utils/random_str";
import Vue from "vue";

export default {
  props: {
    code: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      html: "",
      js: "",
      css: "",

      component: null,
      id: randomStr(),
    };
  },
  watch: {
    code() {
      this.destroyCode();
      this.renderCode();
    },
  },
  methods: {
    getSource(source, type) {
      // 创建一个正则表达式对象, 匹配一个尖括号 <，然后是标签类型。
      // [^>]*：匹配零个或多个不是右尖括号 > 的字符。
      const regex = new RegExp(`<${type}[^>]*>`);
      // 使用 match 方法在字符串 source 中查找与 regex 匹配的内容，
      // 并将结果存储在变量 openingTag 中。这将提取第一个匹配的标签。
      let openingTag = source.match(regex);
      // 如果没有找到，则返回一个空字符串
      if (!openingTag) return "";
      // 如果找到了匹配的标签，这行代码将 openingTag 设置为匹配的标签内容，通常是完整的标签字符串。
      else openingTag = openingTag[0];

      // 截去掉开头和结尾标签, 保留中间的部分
      return source.slice(
        source.indexOf(openingTag) + openingTag.length,
        source.lastIndexOf(`</${type}>`)
      );
    },

    splitCode() {
      const script = this.getSource(this.code, "script").replace(
        /export default/,
        "return "
      );
      const style = this.getSource(this.code, "style");
      const template =
        "<div id='app'>" + this.getSource(this.code, "template") + "</div>";

      this.js = script;
      this.css = style;
      this.html = template;
    },

    renderCode() {
      this.splitCode();

      if (this.html !== "" && this.js !== "") {
        // 讲js转换为函数, 并执行它, 返回一个data()函数
        const parseStrToFunc = new Function(this.js)();

        parseStrToFunc.template = this.html;
        // Vue.extend 的作用，就是基于 Vue 构造器，创建一个“子类”, 但此时还未渲染和挂载
        const Component = Vue.extend(parseStrToFunc);
        // 调用了 $mount 方法对组件进行了手动渲染，但它仅仅是被渲染好了，并没有挂载到节点上
        // 此时的 component 已经是一个标准的 Vue 组件实例，因此它的 $el 属性也可以被访问：
        this.component = new Component().$mount();
        // extend 构造的实例通过 $mount 渲染后，挂载到了组件唯一的一个节点 <div ref="display"> 上。
        this.$refs.display.appendChild(this.component.$el);

        // 加载css: 创建style标签, 往里面塞入css, 最后放到head中
        // 为了便于后面在 this.code 变化或组件销毁时, 给每个style加上一个随机id
        if (this.css !== "") {
          const style = document.createElement("style");
          style.type = "text/css";
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName("head")[0].appendChild(style);
        }
      }
    },

    destroyCode() {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
  },
  mounted() {
    this.renderCode();
  },
  beforeDestroy() {
    this.destroyCode();
  },
};
</script>

<style scoped></style>
