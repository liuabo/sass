<template>
  <div class="s-header">
        <h1 class="logo"><a title="中信云管理平台"><img :src="smallLogo" alt=""><span>管理平台</span></a></h1>
        <ul class="tab">
            <!-- <router-link  tag="li" :to="item.path" v-for="item in apps" :key="item.id"><img :src="item.img" alt=""><span>{{item.name}}</span></router-link> -->
            <li :class=" active == item.id ? 'act' : ''" v-for="item in apps" :key="item.id" @click="goto(item.id,item.path)"><img :src="item.img" alt=""><span>{{item.name}}</span></li>
        </ul>

        <div class="user">
            <img :src="user.img" alt="" class="head_">
            <span>{{user.name}}</span>
            <img :src="icon" alt="" :class="{'active': isShow}" @click="()=>{this.isShow = !this.isShow}">
            <ul v-show="isShow">
                <span class="triangle"></span><span class="smallTG"></span>
                <!-- <li @click="()=>{this.$router.push({path:'/cms/changePassword'});this.isShow = !this.isShow}">修改密码</li> -->
                <!-- <router-link  tag="li" to="/">退出后台</router-link> -->
                <li @click="text()">退出后台</li>
            </ul>
        </div>
        <div v-show="isShow" class="mask" @click="()=>{this.isShow = !this.isShow}"></div>
  </div>
</template>
<script>
import smallLogo  from "../../assets/images/smallLogo.png";
import imgIndex  from "../../assets/images/index.png";
import imgAddRessBook  from "../../assets/images/addressBook.png";
import head  from "../../assets/images/head.png";
import statisticsQuery  from "../../assets/images/statisticsQuery.png";
import infoInit  from "../../assets/images/infoInit.png";
import  icon from "../../assets/images/icon1.png";

export default {
  name: "s-header",
  props:['active','goto'],
  data() {
    return {
        smallLogo,
        icon,
        apps:[
            {id:1,name:'首页',path:"/app",img:imgIndex},
            {id:2,name:'通讯录',path:"/app/addressBook",img:imgAddRessBook},
            {id:3,name:'统计查询',path:"/app/statisticsQuery",img:statisticsQuery},
            {id:4,name:'信息初始化',path:"/app/InfoInit",img:infoInit}
        ],
        user:{img:head,name:''},
        isShow:false,
    }
  },
  methods:{
      getUrlParam () {
            var name,value;
            var str=location.href; //取得整个地址栏
            var path = str
            var num=str.indexOf("?");
            if(num>0){
                this.path = str.substr(0,num);
            }
            str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
            var arr=str.split("&"); //各个参数放到数组里
            let json = {}
            for(var i=0;i < arr.length;i++){
                num=arr[i].indexOf("=");
                if(num>0){
                    name=arr[i].substring(0,num);
                    value=arr[i].substr(num+1);
                    json[name]=value;
                }
            }
            if(arr.length == 1){
                return
            }
            
            sessionStorage["token"] = json.token
            sessionStorage['userName'] = json.username
            sessionStorage["index"] = 1   
            sessionStorage['headPortrait'] = json.avatar

        } ,
        text(){
            location.href='/om'
            sessionStorage["token"] = ''
            sessionStorage['userName'] = ''
            sessionStorage["index"] = 1
            sessionStorage['corpId'] = ''
        },
  },
  mounted(){
        this.getUrlParam()
        this.user.name = decodeURI( sessionStorage['userName'])
        this.user.img = decodeURIComponent( sessionStorage['headPortrait'])
  }
};
</script>
<style lang="scss" scoped>
.mask{
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 9999;
    background-color: rgba($color: #000000, $alpha: 0)
}
.s-header {
    height:100%;
    width: 100%;
    background-color: #444444;
    font-size: 14px;
    .logo{
        padding-left:16px;
        width: 160px;
        margin-top: 20px;
        height: 28px;;
        float: left;
        font-weight: 600;
        img{
            height: 100%;
            float: left;
        }
        span{
            float: left;
            line-height: 28px;
            padding-left: 8px;
            color: #fff;
            font-size: 14px;
        }
    }   
    .tab{
        float: left;
        color: #fff;
        height: 100%;
        li{
            width: 120px;
            height: 100%;
            float: left;
            line-height: 1em;
            padding-top: 20px;
            text-align: center;
            cursor: pointer;
            img{
                vertical-align: top;
                margin-right: 8px;
            }
            span{
                vertical-align: top;
                display: inline-block;
                height: 24px;
                line-height: 24px;
                margin-bottom: 10px;
            }
            &:hover{
                background: #666;
            }
        }
        // .router-link-exact-active{
        //      background: #cc0001 !important;
        // }
        .act{
             background: #cc0001 !important;
        }
    }
    .user{
        height: 100%;
        float: right;
        line-height: 1em;
        padding-right: 16px;
        position: relative;
        .head_{
            margin-top: 16px;
            height: 32px;
            border-radius: 50%;
        }
        >span{
            vertical-align: top;
            margin: 26px 8px 0;
        color: #fff;
            line-height: 64px;
        }
        img{
            vertical-align: top;
            &:nth-of-type(2){
                margin-top: 24px;
                transition: all 0.5s;
                cursor: pointer;
            }
        }
        .active{
            transform: rotate(180deg)
        }
        ul {
          position: absolute;
          top: 58px;
          right: 24px;
          width: 96px;
          border: 1px solid #dadada;
          line-height: 30px;
          background: #fff;
          box-shadow: 0px 0px 50px 2px #aaa;
          z-index: 10000;
          li {
            height: 42px;
            text-align: center;
            line-height: 42px;
            cursor: pointer;
            &:hover {
              background: #cc0001;
              border: 1px solid #f1f1f1;
              color: #fff;
            }
          }
          .triangle {
            width: 0;
            height: 0;
            border-bottom: 16px solid #fff;
            border-left: 16px solid transparent;
            position: absolute;
            top: -16px;
            right: 0;
            z-index: 1;
          }
          .smallTG {
            position: absolute;
            top: -18px;
            right: -1px;
            width: 0;
            height: 0;
            border-bottom: 18px solid #dadada;
            border-left: 18px solid transparent;
          }
        }
    }
}
</style>

