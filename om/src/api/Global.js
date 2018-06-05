import Vue from 'vue';
let url = '/weixin-user-server';
let newsUrl = '/work-weixin-cms-server';
export default {
    install() {
        // Vue.prototype.$url_ = url;
        Vue.prototype.$newsUrl = newsUrl;
    }
}