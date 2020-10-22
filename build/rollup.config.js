import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs"; // 将CommonJS模块转换为 ES2015 供 Rollup 处理
import babel from 'rollup-plugin-babel'  // rollup 的 babel 插件，ES6转ES5

export default {
  input: "src/vue/index.js",
  output: {
    file: "asyncClick/index.js",
    format: "es"
  },
  plugins: [resolve(), commonjs(), babel()]
};
