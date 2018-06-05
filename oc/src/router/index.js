import Vue from 'vue'
import Router from 'vue-router'

// import App from '@/components/App'
// import NewsIndex from '@/components/new'
// import Home from '@/components/home'
// import Login from '@/components/login/login'
// import News from '@/components/new/home'
// import AddDynamic from '@/components/new/addDynamic'
// import PageviewLook from '@/components/new/pageviewLook'
// import Comment from '@/components/new/commentLook'
// import ClassifyManage from '@/components/classifyManage'
// import DermaManage from '@/components/dermaManage'
// import ContentTemplate from '@/components/contentTemplate'
// import AddClassify from '@/components/contentTemplate/add.vue'
// import LabelManagement from '@/components/labelManagement'
// import InformationSource from '@/components/informationSource'
// import TimeInterva from '@/components/timeInterva'

// import Depage from "@/components/addressBook/depage"
// import AddressBook from '@/components/addressBook'
// import AddMembers from '@/components/addressBook/addMembers'
// import LoLead from '@/components/addressBook/toLead'
// import Derive from '@/components/addressBook/derive'
// import Detail from '@/components/addressBook/detail'
// import Edit from "@/components/addressBook/edit"
// import Nodata from "@/components/addressBook/nodata"
// import LabUser from "@/components/addressBook/labUser"


const App = () =>
    import ('@/components/App')
const NewsIndex = () =>
    import ('@/components/new')
const Home = () =>
    import ('@/components/home')
const Login = () =>
    import ('@/components/login/login')
const News = () =>
    import ('@/components/new/home')
const AddDynamic = () =>
    import ('@/components/new/addDynamic')
const PageviewLook = () =>
    import ('@/components/new/pageviewLook')
const Comment = () =>
    import ('@/components/new/commentLook')
const ClassifyManage = () =>
    import ('@/components/classifyManage')
const DermaManage = () =>
    import ('@/components/dermaManage')
const ContentTemplate = () =>
    import ('@/components/contentTemplate')
const AddClassify = () =>
    import ('@/components/contentTemplate/add.vue')
const LabelManagement = () =>
    import ('@/components/labelManagement')
const InformationSource = () =>
    import ('@/components/informationSource')
const TimeInterva = () =>
    import ('@/components/timeInterva')

const Depage = () =>
    import ("@/components/addressBook/depage")
const AddressBook = () =>
    import ('@/components/addressBook')
const AddMembers = () =>
    import ('@/components/addressBook/addMembers')
const LoLead = () =>
    import ('@/components/addressBook/toLead')
const Derive = () =>
    import ('@/components/addressBook/derive')
const Detail = () =>
    import ('@/components/addressBook/detail')
const Edit = () =>
    import ("@/components/addressBook/edit")
const Nodata = () =>
    import ("@/components/addressBook/nodata")
const LabUser = () =>
    import ("@/components/addressBook/labUser")

Vue.use(Router)
const routes = [
    { path: "", redirect: "/login" }, //直接重定向到login路由
    { path: "/login", name: "login", component: Login },
    {
        path: "/app",
        component: App,
        children: [
            { path: "/", name: "home", component: Home }, //首页
            {
                path: "newsIndex",
                component: NewsIndex, //新闻
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
            },
            {
                path: "addressBook",
                component: AddressBook, //通讯录
                children: [
                    { path: "/", name: "dpage", component: Depage }, //默认页
                    { path: "addMembers", name: "addMembers", component: AddMembers }, //添加成员
                    { path: "toLead", name: "toLead", component: LoLead }, //批量导入
                    { path: "derive", name: "derive", component: Derive }, //批量导出
                    { path: "detail/:fid", name: "detail", component: Detail }, //成员详情
                    { path: "edit/:fid", name: "edit", component: Edit }, //成员编辑
                    { path: "nodata", name: "nodata", component: Nodata }, //无数据页面
                    { path: "labUser/:fid", name: "labUser", component: LabUser } //无数据页面
                ]
            }
        ]
    }
    // { path: "**", redirect: "/app" },//输入错误  重定向到app
];
const router = new Router({
    routes,
    base: '/oc/',
    mode: 'history' //取消哈希值
})
export default router