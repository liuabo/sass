<template>
    <div class="labelManagement">
        <cn-header :topTitle='topTitle'></cn-header>
        <div class="content">
            <div  class="class_centent">
                <Button type="primary" size='small' @click="isShowchild(0)">新建标签</Button>
                <div class="box">
                    <ul class="table clearfix">
                        <li class="name">名称</li>
                        <li class="hendle">操作</li>
                    </ul>
                    <ul class="firstTable clearfix">
                        <li draggable="true" @dragenter="dragenter($event)" @dragend="dragend(item.id)" :id='item.id' class="ft clearfix" v-for="item in list" :key="item.id">
                            <div  @click="()=>{item.off = !item.off}" class="_name"><div class="tri" :class="[item.off ? 'avt' : '']"></div>{{item.tagName}}</div>
                            <div class="_hendle">
                                <span @click="isShowchild(1,item)">编辑</span>
                                <span class="center">
                                    <Poptip
                                        confirm
                                        title="确定要删除么？"
                                        @on-ok="del(item.id)"
                                        ok-text="是"
                                        cancel-text="否">
                                        <i>删除</i>
                                    </Poptip>
                                </span>
                                <span>移动</span>
                                <span class="move" @click="isShowchild(2,item)">添加子标签</span>
                            </div>
                            <ul v-if="item.off" class="secTable clearfix" v-for="it in item.child" :key="it.id">
                                <li v-show="false"></li>
                                <li draggable="true" @dragenter.self="dragenter($event)" @dragend.self="dragend(item.id)" :id='item.id' class="st clearfix">
                                    <div class="_name">{{it.tagName}}</div>
                                    <div class="_hendle">
                                        <span @click="isShowchild(1,it)">编辑</span>
                                        <span class="center">
                                            <Poptip
                                                confirm
                                                title="确定要删除么？"
                                                @on-ok="del(it.id)"
                                                ok-text="是"
                                                cancel-text="否">
                                                <i>删除</i>
                                            </Poptip>
                                        </span>
                                        <span class="move">移动</span>
                                    </div>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
                <popup v-show="isPopup" :label='label' :isShowchild="isShowchild" :save='save'></popup>
            </div>
        </div>
    </div>
</template>
<script>
import cnHeader from '../../news/public/cnHeader'
import popup from './popup'
export default {
    name:'labelManagement',
    components:{cnHeader,popup},
    props:[ 'labTitle','listUrl', 'saveUrl', 'delUrl', 'moveUrl'],
    data() {
            return {
                topTitle:'标签管理',
                list:[],
                label:{id:'',tagName:'',parentId:''},
                num:-1,
                isPopup:false,
                targetId:'',
            }
        },
        methods:{
            getList(){
                this.$util.hintShow(this,'正在加载中，请稍等...')
                this.$api.post( this.listUrl || '/omweb/newsTags/list',null,r=>{
                    this.list = r.data
                    this.$util.hintHide(this)
                    
                }) 
            },
            isShowchild(num,item){
                var item = item || {}
                this.label = {id:'',tagName:'',parentId:''}
                this.num = num
                    this.isPopup = !this.isPopup
                if(num == 0){
                    return
                }else if(num == 1){
                    this.label.id = item.id
                    this.label.tagName = item.tagName
                     this.label.parentId = item.parentId 
                }else if(num == 2){
                     this.label.parentId = item.id
                }
            },
            del(id){
                let data = {id}
                this.$api.post(this.delUrl ||  '/omweb/newsTags/delete',data,r=>{
                    this.getList()
                }) 
            },
            save(){
                 this.$api.post(this.saveUrl ||  '/omweb/newsTags/save',this.label,r=>{
                    this.getList()
                }) 
                this.isPopup = !this.isPopup
            },
            dragenter(event){
                event.path.forEach((item,index)=>{
                    if(item.className == 'ft clearfix'){
                        this.targetId = event.path[index].id
                    }

                })
            },
            dragend(id){
                let data = {
                    currentId:id,targetId:this.targetId
                }
                var  currentIndex,targetIndex
                this.$api.post(this.moveUrl ||  '/omweb/newsTags/moveNewsTagsOrder', data, r => {
                    this.list.forEach((item,index)=>{
                    if(item.id == id){
                        currentIndex = index
                    }
                    if(this.targetId  == item.id){
                        targetIndex = index
                    }
                    })
                    var json = this.list[targetIndex]
                    this.list[targetIndex] = this.list[currentIndex]
                    this.list[currentIndex] = json
                    this.$forceUpdate()
                    this.$util.hintHide(this)
                })
            }
        },
        mounted(){
            if(this.labTitle){
                this.topTitle = this.labTitle
            }
            this.getList()
        }
    
}
</script>
<style lang="scss" scoped>
    .labelManagement{
        height: 100%;
        width: 100%;
        background-color: #fff;
        font-size: 12px;
        display:flex;
        flex-direction: column;
        .content{
            padding: 16px;
            flex:1;
            overflow-y:auto;
            button{
            background-color: #cc0001;
            border-color: #cc0001;
            color: #f4d0d0;
            }
            .box{
                .table{
                    width:  615px;
                    li{
                        float: left;
                        line-height: 48px;
                        color:#e4e4e4;
                        border-bottom: 1px solid #eeeeee;    
                    }
                    .name{
                        width: 370px;
                    }
                    .hendle{
                        width: 245px;
                    }
                }
                .firstTable{
                    width:  615px;
                    li{
                        width: 100%;
                        line-height: 48px;
                        >div{
                        border-bottom: 1px solid #eeeeee;   
                        line-height: 48px;
                        height: 48px;
                    }
                    }
                    
                    ._name{
                        width: 370px;
                        float: left;
                        padding-left: 16px;
                    }
                    ._hendle{
                        color: #4c8fde;
                        float: left;
                        span{
                            cursor: pointer;
                            display: block;
                            float: left;
                            padding-left: 16px;
                            margin-right: 16px;
                            background-image:url(../../../assets/images/editor.png);
                            background-repeat: no-repeat;
                            background-position: left center;
                            &:nth-of-type(2){
                                background-image:url(../../../assets/images/del.png);
                            }
                            &:nth-of-type(3){
                                background-image:url(../../../assets/images/move.png);
                            }
                            &:nth-of-type(4){
                                background-image:url(../../../assets/images/add.png);
                                margin: 0;
                            }
                        }
                    }
                    .ft{
                        position: relative;
                        .tri{
                            height: 0;
                            width: 0;
                            height: 0;
                            border-top: 4px solid transparent;
                            border-left: 4px solid #000;
                            border-bottom: 4px solid transparent;
                            position: absolute;
                            top: 20px;
                            left: 8px;
                            transition: all 0.5s
                        }
                        .avt{
                            transform: rotate(90deg);
                        }
                    }
                    .st{
                        ._name{
                            width: 462px;
                            padding-left: 32px;
                            background-image:url(../../../assets/images/child.png);
                            background-repeat: no-repeat;
                            background-position: 16px center;
                        }
                        ._hendle{
                            
                            span{
                                &:nth-last-of-type(1){
                                    margin: 0;
                                }
                            }
                        }
                    }
                }
            }
        }
    
        
    }
</style>
