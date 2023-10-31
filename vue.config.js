const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true, // 使用包含运行时编译器的 Vue 构建版本
});
