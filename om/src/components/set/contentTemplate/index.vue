<template>
    <div class="contentTemplate">
        <cn-header :topTitle='topTitle'></cn-header>
        <div  class="content" ref="content" @scroll="dropDown()">
            <Button type="primary" size="small" @click="changeRoute(0)">新建模板</Button>
            <ul class="con_list" v-if="template.length">
                <li class="con_item con_item1  clearfix">
                    <span class="item_name" >名称</span>
                    <span class="item_classify">分类</span>
                    <span class="item_use">使用次数</span>
                    <span class="item_collect">收藏次数</span>
                    <span class="item_operate">操作</span>
                </li>
                <li  class="con_item con_items clearfix" v-for="item in template" :key="item.id">
                    <span class="item_name">{{item.title}}</span>
                    <span class="item_classify">{{item.categoryName}}</span>
                    <span class="item_use">{{item.useCount}}</span>
                    <span class="item_collect">{{item.storeCount}}</span>
                    <span class="item_operate">
                        <span @click="lookPpreview(item.id)">查看</span>
                        <span @click="changeRoute(item.id)">编辑</span>
                        <span v-show="!path" @click="user(item.id)">使用</span>
                         <span>
                             <Poptip
                                placement='bottom'  
                                confirm
                                title="确定要删除么？"
                                @on-ok="removeNewsTemplate(item.id)"
                                ok-text="是"
                                cancel-text="否">
                                <i>删除</i>
                            </Poptip>
                        </span>
                    </span>
                </li>
            </ul>
        </div>
        <preview v-show="isLookPpreview" :view='view' :lookPpreview='lookPpreview'></preview>
    </div>
</template>
<script>
import cnHeader from '../../news/public/cnHeader'
import preview from '../../news/preview'
export default {
    name:'contentTemplate',
    props:['coTitle' ,'listUrl'  ,'delUrl' ,'getUrl','path'],
    components:{cnHeader,preview},
    data(){
        return{
            view:{content:'',id:'',outlink:''},
            isLookPpreview:false,
            topTitle:'内容模板',
            template:[],
            Loading:false,
            isStart:'加载中...',
            limit:15,
            page:0,
            onOff:true,
            off:true,
        }
    },
    methods:{
        lookPpreview(id){
            if(id == 0){
                this.isLookPpreview = !this.isLookPpreview
                return 
            }
            this.$api.get(this.getUrl ? this.getUrl + id : "omweb/newsTemplate/get/" + id, null, r => {
                this.view.title = r.data.title
                this.view.content = r.data.content
                this.view.outlink = r.data.outlink
                this.isLookPpreview = !this.isLookPpreview
            })
        },
        getNewsTemplate(){
            let data={
                limit: this.limit,
                offset:this.page * this.limit
            }
            this.$util.hintShow(this,'正在加载中，请稍等...')
            this.$api.post(this.listUrl ? this.listUrl : '/omweb/newsTemplate/list', data, r => {
                    this.template = r.data.rows
                    this.$util.hintHide(this)
            })
        },
        removeNewsTemplate(id){
            let data={
                id
            }
            this.$api.post(this.delUrl ? this.delUrl : 'omweb/newsTemplate/remove', data, r => {
                    let arr =[]
                   this.template.forEach((item)=>{
                       if(item.id!=id){
                           arr.push(item)
                       }
                   })
                   this.template = arr
          })
        },
        user(_id){
            this.$router.push({ name: 'addDynamic', params: {id:0, _id}})
        },
        changeRoute(id){
            this.$router.push({ name:this.path ? this.path : 'addClassify', params: {id}})
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
                        offset:this.page * this.limit
                        };
                        let arr = []
                        this.$api.post(this.listUrl ? this.listUrl : "/omweb/newsTemplate/list", data, r => {
                            arr = r.data.rows 
                            this.off = true
                            this.template.push(...arr)
                            arr.length == 0 ? this.onOff = false :  this.onOff = true
                        });
                    }
                    
                }
            }
        },
    },
    mounted(){
        if(this.coTitle){
            this.topTitle = this.coTitle
        }
        this.getNewsTemplate()
    }
    
}
</script>
<style lang="scss" scoped>
    .contentTemplate{
        height: 100%;
        background: #fff;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .content{
            padding: 16px;
            background: #fff;
            flex: 1;
            overflow-x: hidden;
            overflow-y: auto;
            button{
                width: 80px;
                border-color: #cc0001;
                background: #cc0001;
                color: #f6cfd0;
            }
            .con_list{
                font-size: 12px;
                width: 906px;
                .con_item{
                    border-bottom: 1px solid #eeeeee;
                    color: #626262;
                    >span{
                        display: block;
                        float: left;
                        height: 48px;
                        line-height: 48px;
                    }
                    .item_name{
                        width: 232px;
                    }
                    .item_classify{
                        width: 168px;
                    }
                    .item_use{
                        width: 128px;;
                    }
                    .item_collect{
                        width: 144px;
                    }
                    .item_operate{
                        width: 233px;
                    }
                }
                .con_item1{
                    color: #dddddd !important;
                }
                .con_items{
                    .item_operate{
                        span{
                            color: #176ed5;
                            margin-right: 24px;
                            cursor: pointer;
                            display: block;
                            float: left;
                            padding-left: 16px;
                            background-image:url(../../../assets/images/look.png);
                            background-repeat: no-repeat;
                            background-position: left 17px; 
                            &:nth-of-type(2){
                                 background-image:url(../../../assets/images/editor.png);
                            }
                            &:nth-of-type(3){
                                 background-image:url(../../../assets/images/use.png);
                            }
                            &:nth-of-type(4){
                                background-image:url(../../../assets/images/del.png);
                                margin: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
