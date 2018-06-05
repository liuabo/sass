<template>
  <div class="moreAnn" ref="content" @scroll="dropDown()">
      <cn-header :topTitle='topTitle'></cn-header>
    <div class="content">
        <Button type="primary" size="small" @click="goto('addAnn')">新建公告</Button>
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
  </div>
</template>
<script>
import cnHeader from '../news/public/cnHeader'
export default {
    name:'moreAnn',
    components:{cnHeader},
    data(){
        return{
            topTitle:"系统公告",
            list:[],
            limit:15,
            page:0,
            title:'',
            onOff:true,
            off:true,
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
            if(id<0){
                 this.$router.push({path})
            }else{
                this.$router.push({ name: path, params: { id,_id:0}})
            }
        },
        del(id){
            let data = {
                id
            }
            this.$util.hintShow(this);
            this.$api.post("omweb/newsNotice/delete",data,r=>{
                this.getList()
            })
        },
        dropDown(){//下拉加载
            let scrollTop = this.$refs.content.scrollTop
            let scrollHeight = this.$refs.content.scrollHeight
            let clientHeight =this.$refs.content.clientHeight
            if(scrollHeight-clientHeight - scrollTop <=  45){
                if(this.onOff){
                if(this.off){
                    this.off = false
                    this.page++
                    let data = {
                        limit:this.limit,
                        offset:this.page * this.limit,
                        title:this.title
                    };
                    let arr = []
                    this.$api.post("omweb/newsNotice/list", data, r => {
                        arr = r.data.rows 
                        this.off = true
                        this.list.push(...arr)
                        if(arr.length < this.limit){
                            this.off = false
                        }
                    });
                }
                    
                }
            }
        },
    },
    mounted(){
        this.getList()
    }
}
</script>
<style lang="scss" scoped>
    .moreAnn{
        height: 100%;
        overflow-y: auto;
        .content{
            padding: 16px;
            button{
                background: #cc0001;
                border-color: #cc0001;  
                color: #f6cfd0;
            }
            ul{
                margin-top: 16px;
                width: 640px;
                overflow: auto;
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
      
    }
</style>
