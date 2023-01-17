import { createApp } from 'vue'
// 状态管理器 替代vuex
import { createPinia } from "pinia";

import App from './App.vue'
import router from './router'
import i18n from './i18n'

// vite svg
import SvgIcon from './components/icons/SvgIcon.vue'
import 'virtual:svg-icons-register'

// 避免main.ts 臃肿，把第三方的组件统一放入plugins中
import plugins from './plugins';


import { Base64 } from "js-base64";
import md5 from "js-md5";

// Element plus 全局引入图标。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 切换暗夜模式
import "./theme/index.scss";

import './assets/css/main.scss'

import CheckOperateTime from "./util/CheckOperateTime";
// import axios from 'axios'
import Http from "./util/axios/axios-util";
import { wxmAlert } from "./util/commFn";


// 自定义指令
import type { Directive } from 'vue'
import * as directive from './directives'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(CheckOperateTime)
app.component('svg-icon', SvgIcon)
app.use(plugins);

// Element plus 图标注册。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

Object.keys(directive).forEach(key => {  //Object.keys() 返回一个数组，值是所有可遍历属性的key名
  const directiveKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()  // 驼峰转中划线
  app.directive(directiveKey, (directive as { [key: string]: Directive })[key])  //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
})

// app.config.globalProperties.$md5 = md5;
// app.config.globalProperties.$Base64 = Base64;
// app.config.globalProperties.$Http = Http;
// 全局挂在md5 , 调用 const $md5=inject('$md5)
app.provide("$md5", md5);
app.provide("$Base64", Base64);
app.provide("$Http", Http);
app.provide("$wxmAlert", wxmAlert);




// 分环境处理


app.mount('#app')
