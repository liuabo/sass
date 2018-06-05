<template>
  <div class="classify">
    <cn-header :topTitle='topTitle'></cn-header>
    <div  class="class_centent">
        <Button type="primary" size='small' @click="changeOverlay(1)">{{new_}}</Button>
        <table v-show="list.length">
            <thead>
                <tr>
                    <td class="name">名称</td>
                    <td class="handle">操作</td>
                </tr>
            </thead>
            <tbody id="classFoo">
                <tr draggable="true" @dragenter="dragenter($event)" @dragend="dragend(item.id)" class="move" :id='item.id' v-cloak v-for="item of list" :key="item.id" >
                    <td class="_name">{{item.name}}</td>
                    <td class="_handle">
                    <span @click="changeOverlay(2,item)">编辑</span>
                    <span class="center">
                         <Poptip
                            confirm
                            title="确定要删除么？"
                            @on-ok="del(item.id)"
                            ok-text="是"
                            cancel-text="否">
                            <i>删除</i>
                        </Poptip></span>
                    <span class="move">移动</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <popup :changeOverlay='changeOverlay' :title="title" :classify="classify" :save='save' v-show="isActive"  v-cloak  @change="changeOverlay"></popup>
    </div>
  </div>
</template>

<script>
import popup from "./popup";
import cnHeader from '../new/common/cnHeader'

export default {
  name: "classify_module",
  props:["new_",'listUrl','saveUrl','delUrl','moveUrl',"topTitle"],
  components:{popup,cnHeader},
  data() {
    return {
        list: [],
        isActive: false,
        title:1,//1新建,2修改
        classify:{id:'',name:''},
        targetId:''
    };
  },
  methods: {
    //添加分类的弹窗的显示隐藏
    changeOverlay(num,item) {
        var item = item || ''
        if(num){
            this.title = num
            if(num === 1){
                 this.classify.id = ''
                this.classify.name =  ''
            }
        }
        if(item){
            this.classify.id = item.id
            this.classify.name = item.name
        }
        this.isActive = !this.isActive;
    },
    // 获取分类类表
    getClassify(){
        this.$util.hintShow(this,'正在加载中，请稍等...')
        this.$api.post(this.listUrl, null, r => {
            this.list = r.data
            this.$util.hintHide(this)
        })
    },
    //保存
    save({id,name}){
        let data
        if(this.title === 1){
            data = {name}
        }else{
            data = {
                id,
                name,
            }
        }
        if(!data.name.length){
            this.$Message.warning('请填写分类名！！！');
            return 
        }
        this.$api.post(this.saveUrl, data, () => {
            this.getClassify()
        })
        this.changeOverlay()
    },
    //删除
    del(id){
        let data = {id}
        this.$api.post(this.delUrl, data, () => {
            this.getClassify()
        })
    },
    //排序
    dragenter(event){
      event.path.forEach((item,index)=>{
        if(item.tagName == "TR"){
            this.targetId = event.path[index].id
        }
      })
    },
    dragend(id){
        let data = {
            currentId:id,targetId:this.targetId
        }
        var  currentIndex,targetIndex
        this.$api.post(this.moveUrl, data, r => {
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
        this.getClassify()
        let that = this
  }
};
</script>

<style lang="scss" scoped>
.classify{
    height: 100%;
    width: 100%;
    background-color: #fff;
    font-size: 12px;
    display:flex;
    flex-direction: column;
    .class_centent{
        flex:1;
        overflow-y:auto;
        padding: 16px;
        button{
          background-color: #cc0001;
          border-color: #cc0001;
          color: #f4d0d0;
        }
    }
    table{
      width: 550px;
            border-collapse:collapse;
      tr{
          color: #6d6d6d;
          td{
            height: 47px;
            border-bottom: 1px solid #eeeeee;         
          }
          .name{
              width: 370px;
              color: #e4e4e4;
          }
          .handle{
              color: #e4e4e4;
          }
          ._handle{
            color: blue;
            .center{
              margin: 0 24px;
            }
            span{
                cursor: pointer;
                display: block;
                float: left;
                padding-left: 16px;
                background-image:url(../../assets/images/editor.png);
                background-repeat: no-repeat;
                background-position: left 3px;
                &:nth-of-type(2){
                    background-image:url(../../assets/images/del.png);
                }
                &:nth-of-type(3){
                    background-image:url(../../assets/images/move.png);
                    margin: 0;
                }
            }
            
          }
      }
    }
}
</style>
