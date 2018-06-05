import './assets/styles/reset.css' //重置样式
import './assets/styles/public.css' //公共样式
//ueditor富文本编辑
import './assets/ueditor/ueditor.config.js'
import './assets/ueditor/ueditor.all.min.js'
import './assets/ueditor/lang/zh-cn/zh-cn.js'
import './assets/ueditor/ueditor.parse.min.js'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import fontawesome from "@fortawesome/fontawesome";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";
fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// 引用API文件
import api from './api/index.js'
import axiosApi from './api/axiosApi.js'

// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$axiosApi = axiosApi

// 提示信息
import util from './util/index'
Vue.prototype.$util = util
    //注册全局过滤器
import vFilter from './filters'
for (let key in vFilter) {
    Vue.filter(key, vFilter[key])
}
Vue.config.productionTip = false
    //全局url变量
import G from './api/Global'
Vue.use(G);
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})