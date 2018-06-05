<template>
  <div class="moreAnn">
      <cn-header :topTitle="topTitle"></cn-header>
    <div class="content">
        <!-- 公告类型 -->
        <div class="type">
            <p><span>公告类型:</span><i>{{typeNum}}/20</i></p>
            <input type="text" v-model="type" @change="changeType">
        </div>
       <!-- 标题 -->
        <div class="title">
            <p><span>标题:</span><i>{{titleNum}}/120</i></p>
            <input type="text" v-model="title" @change="changeTitle">
        </div>
        <div  class="mainBody">
            <p><span>正文:</span></p>
            <div>
                <div id="editor"></div>
            </div>
        </div>
        <div class="button">
            <Button type="primary" size="small" @click="interval()">发布</Button>
        </div>
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
            topTitle:"新建公告",
            titleNum:0,
            typeNum:0,
            type:'',
            title:'',
            editor:'',
            id : ''
        }
    },
    methods:{
        goto(path){
            this.$router.push({path})
        },
        interval(){
           let description = this.editor.getContent(); //正文文本
           let title = this.title || ''
           let type = this.type || ''
           let id = this.id
            if(!type){
                this.$Message.info("请输入公告类型！！！");
                return;
            }
            if(!title){
                this.$Message.info("请输入标题！！！");
                return;
            }
           let data = {
               description,title,type,id
           }
            this.$api.post('omweb/newsNotice/save',data,r=>{
                this.$router.push('/app/')
            })
        },
        getNewsNotice(id){
            this.$api.get("omweb/newsNotice/get/" +id,null,r=>{
                this.type = r.data.type
                this.title = r.data.title
                this.id = r.data.id
                var that = this
                this.editor.ready(function() {
                    that.editor.setContent(r.data.description);
                });
            })
        },
        changeType() {
            let length = this.type.length;
            if (length > 20) {
                this.type = this.type.substr(0, 20);
            }
            this.typeNum = this.type.length;
        },
        changeTitle() {
            let length = this.title.length;
            if (length > 120) {
                this.title = this.title.substr(0, 120);
            }
            this.titleNum = this.title.length;
        },

    },
    mounted(){
        this.editor = UE.getEditor("editor"); // 实例化editor编辑器
        if(this.$route.params.id){
            this.getNewsNotice(this.$route.params.id)
        }
    },
    updated(){
        this.changeType()
        this.changeTitle()
    },
    destroyed() {
        this.editor.destroy(); // 将editor进行销毁
    }
}
</script>
<style lang="scss" scoped>
    .moreAnn{
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .content{
            padding:16px;
            > div {
                > p {
                    margin-bottom: 10px;
                span {
                    color: #949494;
                }
                i {
                    color: #dddddd;
                    font-size: 10px;
                }
                }
            }
            .title {
                margin-bottom: 18px;
                input {
                width: 480px;
                border: 1px solid #888888;
                border-radius: 4px;
                height: 24px;
                }
            }
            .type{
                margin-bottom: 18px;
                input {
                    width: 160px;
                    border: 1px solid #888888;
                    border-radius: 4px;
                    height: 24px;
                }
            }
            .button{
                margin: 40px 0 160px;
                position: relative;
                button{
                    width: 80px;
                    border-color: #cc0001;
                    background-color: #cc0001;
                    color: #e4eefa;
                }
            }
        }
    }
     #editor{
        width: 800px;
    }
</style>
