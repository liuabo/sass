import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import Login from '@/components/login/login'
import index from '@/components/index'
import MoreAnn from '@/components/index/moreAnn.vue'
import AddAnn from '@/components/index/addAnn.vue'
import News from '@/components/news/home'
import NewsIndex from '@/components/news'
import AddDynamic from '@/components/news/addDynamic'
import PageviewLook from '@/components/news/pageviewLook'
import Comment from '@/components/news/commentLook'

import ClassifyManage from '@/components/set/classifyManage'
import DermaManage from '@/components/set/dermaManage'
import ContentTemplate from '@/components/set/contentTemplate'
import AddClassify from '@/components/set/contentTemplate/add.vue'
import LabelManagement from '@/components/set/labelManagement'
import InformationSource from '@/components/set/informationSource'
import TimeInterva from '@/components/set/timeInterva'



import statisticsQuery from "@/components/statisticsQuery";
import sqdpage from "@/components/statisticsQuery/sqdpage";
// import prograManage from "@/components/statisticsQuery/prograManage";
import lableManage from "@/components/statisticsQuery/lableManage";
import contentManage from "@/components/statisticsQuery/contentManage/index";

import InfoInit from "@/components/infoInit";
import Infoclassify from "@/components/infoInit/infoclassify";
import ClassifyInit from "@/components/infoInit/classifyInit";
import LabelInit from "@/components/infoInit/labelInit";
import ConTemInit from "@/components/infoInit/conTemInit";
import addConTemInit from "@/components/infoInit/conTemInit/add.vue";
import DermaInit from "@/components/infoInit/dermaInit";
import InfomanInit from "@/components/infoInit/infomanInit";

Vue.use(Router)
const routes = [
    { path: "", redirect: "/login" }, //直接重定向到app路由
    { path: "/login", name: "login", component: Login },
    {
        path: "/app",
        component: App,
        children: [
            { path: "/", component: index }, //首页
            { path: "more", name: "moreAnn", component: MoreAnn },//更多数据
            { path: "addAnn/:id", name: "addAnn", component: AddAnn },//添加修改公告
            {
                path: "newsIndex",
                component: NewsIndex,
                children: [
                    { path: "/", name: "news", component: News },
                    { path: "addDynamic/:id/:_id", name: "addDynamic", component: AddDynamic }, //新建动态
                    { path: "pageview/:id", name: "pageview", component: PageviewLook }, //阅读数查看
                    { path: "comment/:id", name: "comment", component: Comment }, //评论查看
                    { path: "classifyManage", name: "classifyManage", component: ClassifyManage }, //分类管理
                    { path: "dermaManage", name: "dermaManage", component: DermaManage }, //皮肤管理
                    { path: "contentTemplate", name: "contentTemplate", component: ContentTemplate }, //内容模板
                    { path: "addClassify/:id", name: "addClassify", component: AddClassify }, //新建内容模板
                    { path: "labelManagement", name: "labelManagement", component: LabelManagement }, //标签管理
                    { path: "informationSource", name: "informationSource", component: InformationSource }, //信息来源
                    { path: "timeInterva", name: "timeInterva", component: TimeInterva } //定时发布
                ]
            }, //新闻
            {//统计查询
                path: "statisticsQuery",
                component: statisticsQuery,
                children: [
                    { path: "/", name: "sqdpage", component: sqdpage }, //默认页
                    // { path: "prograManage", name: "prograManage", component: prograManage }, //栏目管理
                    { path: "lableManage", name: "lableManage", component: lableManage }, //标签管理
                    { path: "contentManage", name: "contentManage", component: contentManage }, //内容管理
                ]
            },
            {//信息初始化
                path: "infoInit",
                component: InfoInit,
                children: [
                    { path: "/", name: "infoclassify", component: Infoclassify }, //默认页
                    { path: "classifyInit", name: "classifyInit", component: ClassifyInit }, //初始化分类
                    { path: "labelInit", name: "labelInit", component: LabelInit }, //初始化标签
                    { path: "conTemInit", name: "conTemInit", component: ConTemInit }, //初始化模板
                    { path: "addConTemInit/:id", name: "addConTemInit", component: addConTemInit }, //新增初始化模板
                    { path: "dermaInit", name: "dermaInit", component: DermaInit }, //初始化皮肤
                    { path: "infomanInit", name: "infomanInit", component: InfomanInit }, //初始化信息来源
                ]
            },
        ]
    }
    // { path: "**", redirect: "/app" },//输入错误  重定向到app
];
const router = new Router({
    routes,
    base:'/om/',
    mode: 'history' //取消哈希值
})
export default router