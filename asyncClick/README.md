## 异步点击事件指令

使用v-asyncClick指令，执行异步点击事件，防止异步事件多次执行

```
//main.js
注册指令：
import vueAsyncClick from "vue-async-click";
vueAsyncClick.install(Vue);

//login.vue
要求传入一个对象：
{
	event, // 事件
	params // 事件需要传入的参数数组（顺序传入），没有则不传
}

<el-button v-asyncClick="{event:handleLogin,params:[]}">
  登录
</el-button>
```