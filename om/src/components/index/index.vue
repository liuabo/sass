<template>
  <div class="home">
    <div class="content">
        <p class="title">系统公告<router-link tag="span" to="/app/more">更多 》</router-link> <Button type="primary" size="small" @click="goto('addAnn',0)">新建公告</Button></p>
       
        <ul class="notic">
            <li v-for="item in list" :key="item.id">
                <span class="itemLeft"><i><b>【</b><b class="type">{{item.type}}</b><b>】</b></i></span>
                <p class="description ellipsis">{{item.title}}</p>
                <span class="itemRight">{{item.modifiedTime | timeFilter(false)}}</span>
                <p class="operation">
                    <span>
                        <Poptip
                            confirm
                            title="确定要删除么？"
                            placement='bottom'
                            @on-ok="del(item.id)"
                            ok-text="是"
                            cancel-text="否">
                            <i>删除</i>
                        </Poptip>
                    </span>
                    <span @click="goto('addAnn',item.id)">编辑</span>
                </p>
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
            list:[],
            limit:6,
            page:0,
            title:'',
        }
    },
    methods:{
        getList(){//获取公告
            let data = {
                limit:this.limit,
                offset:this.limit * this.page,
                title:this.title
            }
            this.$util.hintShow(this);
            this.$api.post("omweb/newsNotice/list",data,r=>{
                this.list = r.data.rows
                this.$util.hintHide(this);
            })
        },
        goto(path,id){
            this.$router.push({ name: path, params: { id,_id:0}})
        },
        del(id){
            let data = {
                id
            }
            this.$util.hintShow(this);
            this.$api.post("omweb/newsNotice/delete",data,r=>{
                this.getList()
            })
        }
    },
    mounted(){
        this.getList()
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
            .title{
                font-size: 18px;
                color: #616161;
                span{
                    font-size: 12px;
                    margin-left: 24px;
                    color: #659ee1;
                    cursor: pointer;
                }
            }
            button{
                margin-left: 20px;
                background: #cc0001;
                border-color: #cc0001;  
                color: #f6cfd0;
            }
            ul{
                margin-top: 16px;
                width: 640px;
                li{
                    padding: 0 24px;
                    height: 38px;
                    line-height: 38px;
                    border-bottom: 1px solid #cccccc;
                    color: #969696;
                    font-size: 12px;
                    display: flex;
                    cursor: pointer;
                    transition: all 0.5s;
                    &:hover{
                        background-color: #cc0001;
                        color: #f9e4e3;
                        i{
                            color: #f9e4e3 !important;
                        }
                        .operation{
                            color: #f9e4e3;
                            span{
                                &:nth-of-type(1){
                                    background: url(../../assets/images/del_.png) no-repeat left;
                                }
                                &:nth-of-type(2){
                                    background: url(../../assets/images/edit.png) no-repeat left;
                                }
                            }
                        }
                    }
                    .itemLeft{
                        width: 80px;
                        i{
                            color: #659ee1;
                            b{
                                 display: inline-block;
                                 vertical-align: top;
                                 font-weight: 100;
                            }
                            .type{
                                max-width: 52px;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space:nowrap
                            }
                        }
                    }
                    .description{
                        flex: 1;
                    }
                    .itemRight{
                        width: 70px;
                        text-align: right;
                    }
                    .operation{
                        margin-left: 16px;
                        width: 96px;
                        color: #0060d0;
                        span{
                            padding-left: 14px;
                            &:nth-of-type(1){
                                background: url(../../assets/images/del.png) no-repeat left;
                                margin-right: 16px;
                                div{
                                    color: #0060d0;
                                }
                            }
                            &:nth-of-type(2){
                                background: url(../../assets/images/editor.png) no-repeat left;
                            }
                        }
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
