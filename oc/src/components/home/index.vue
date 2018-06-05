<template>
  <div class="home">
    <div class="content">
        <!-- <p>系统公告<span>更多 》</span></p> -->
        <p>系统公告</p>
        <ul class="notic">
            <li v-for="item in list" :key="item.id">
                <span class="itemLeft"><i>{{item.title}}</i>{{item.name}}</span>
                <span class="itemRight">{{item.time}}</span>
            </li>
        </ul>
    </div>
    <div class="imgBox">
        <img class="Img" :src="Img" alt="">
    </div>
  </div>
</template>
<script>
import Img from '../../assets/images/home.png'
export default {
    name:'home',
    data(){
        return{
            Img,
            list:[
                // {id:1,title:'【优化公告】',name:"20180208功能优化",time:"2018.02.04"},
                // {id:2,title:'【优化公告】',name:"20180208功能优化",time:"2018.02.04"},
                // {id:3,title:'【优化公告】',name:"20180208功能优化",time:"2018.02.04"},
                // {id:4,title:'【优化公告】',name:"20180208功能优化",time:"2018.02.04"},
                ]
        }
    }
}
</script>
<style lang="scss" scoped>
    .home{
        height: 100%;
        display: flex;
        flex-direction: column;
        .content{
            height: 340px;
        padding: 26px 24px;

             P{
                font-size: 18px;
                color: #616161;
                span{
                    font-size: 12px;
                    margin-left: 24px;
                    color: #659ee1;
                    cursor: pointer;
                }
            }
            ul{
                margin-top: 28px;
                width: 640px;
                li{
                    padding: 0 24px;
                    height: 38px;
                    line-height: 38px;
                    border-bottom: 1px solid #cccccc;
                    color: #969696;
                    font-size: 12px;
                    &:hover{
                        background-color: #cc0001;
                        color: #f9e4e3;
                        i{
                            color: #f9e4e3 !important;
                        }
                    }
                    .itemLeft{
                        float: left;
                        i{
                            color: #659ee1;
                        }
                    }
                    .itemRight{
                        float: right;
                    }
                }
            }
        }
        .imgBox{
            flex: 1;
            position: relative;
        }
        .Img{
            height: 100%;
            width: 100%;
            position: absolute;
        }
    }
</style>
