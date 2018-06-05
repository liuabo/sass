<template>
    <div class="addClassify">
        <cn-header :topTitle='topTitle'></cn-header>
        <div class="content">
            <div class="category">
                <p><span>类型:</span></p>
                <Select  size="small" v-model="news.categoryId" placeholder='请选择类型' style="width:112px">
                    <Option  v-for="item in categoryList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <!-- 标题 -->
            <div class="title">
                <p><span>标题:</span><i>{{titleNum}}/120</i></p>
                <input type="text" v-model="news.title" @change="changeTitle()">
            </div>
            <!-- 信息来源 -->
            <div  class="sources">
                <p><span>信息来源:</span></p>
                <Select size="small" placeholder='其他' v-model="news.sources"  style="width:112px">
                    <Option  v-for="item in sourcesList" :value="item.name" :key="item.id">{{item.name}}</Option>
                </Select>
            </div>
            <!-- 封面图片 -->
            <div class="cover">
                <p><span>封面图片:</span><i>建议使用900*500像素的图片</i></p>
                <div class="img">
                  <img :src="imgSrc" alt="">
                  <input class="addImg" @change='add_img'  type="file"  accept="image/png,image/gif,image/jpeg">
                </div>
                <div><i-switch   v-model="news.allowDisplayInText"></i-switch> 封面图片显示在正文中</div>
            </div>
            <!-- 摘要 -->
            <div class="description">
                <p><span>摘要:</span><i>{{descriptionNum}}/120</i></p>
                <textarea type="text" v-model="news.description"></textarea>
            </div>
             <!-- 正文 -->
            <div  class="mainBody">
                <p><span>正文:</span></p>
                <div>
                  <div id="editor_"></div>
                </div>
            </div>
            <!--  附件 -->
            <div class="accessory mt24 clearfix">
              <p><span>附件:</span></p>
              <div>
                <input class="AddAcc" type="file" @change="getFile($event)">
                <Button type="primary" size="small">添加附件</Button>  {{filesName}}
              </div>
            </div>
            <div class="button">
                <Button type="primary" size="small" @click="lookPpreview">预览</Button>
                <Button type="primary" size="small" @click="interval(false)">保存草稿</Button>
                <Button type="primary" size="small" @click="interval(true)">发布</Button>
            </div>
        </div>
        <preview v-show="isLookPpreview" :view='view' :lookPpreview='lookPpreview'></preview>
        
    </div>
</template>
<script>
import cnHeader from '../new/common/cnHeader'
import preview from '../new/preview'
import imgSrc from'./../../assets/images/img_03.png'
import axios from 'axios'
export default {
    name:'addClassify',
    components:{cnHeader,preview},
    
    data(){
        return{
             view:{content:'',id:'',outlink:''},
            isLookPpreview:false,
            topTitle:'新建模板',
            editor: null,
            news:{
                categoryId:'',//分类id
                title:'',//标题
                file:'',
                sources:'',//信息来源
                allowDisplayInText:'0',//封图显示正文0不1显
                description:'',//摘要
                content:'',//正文
                status:0,//状态
            },
            categoryList:'',   
            titleNum: 0, //标题长度
            descriptionNum: 0, //摘要长度
            sourcesList:'',
            imgSrc,
            filesName:'',
            param:''
        }
    },
    methods:{
        lookPpreview(id){
            if(id == 0){
                this.isLookPpreview = !this.isLookPpreview
                return 
            }
            this.view.title = this.news.title
            this.view.content =this.editor.getContent()
            this.view.outlink = ''
            this.isLookPpreview = !this.isLookPpreview
        },
        interval(boo){ //发布
            var token = sessionStorage["token"]
            let config = {headers:{'Content-Type':'multipart/form-data',"Authorization":token}}
            this.news.content = this.editor.getContent()//正文文本
            if(boo){
                this.news.status = 1
            }   
            if(!this.news.categoryId){
                this.$Message.info('请输入分类')
                return
            }
            if(!this.news.title){
                this.$Message.info('请输入标题')
                return
            }
            if(!this.news.sources){
                this.$Message.info('请选择信息来源')
                return
            } 
            Object.keys(this.news).forEach((key)=>{
                this.param.append(key,this.news[key])
            });
            this.param.set("allowDisplayInText", "1");
           
            let url = this.$newsUrl + '/web/newsTemplate/save'
            let id = this.$route.params.id
            if(id!=0){
                url = this.$newsUrl + '/web/newsTemplate/update'
                this.param.delete("createTime")
                this.param.delete("createdTime")
                this.param.delete("modifiedTime")
            }
            
            this.$util.hintShow(this)
            axios.post(url,this.param ,config)
                .then((r)=>{
                    if(boo){
                        this.$router.push('/app/newsIndex/contentTemplate')
                    }else{
                        this.$util.hintHide(this)
                        if(!r.data.code){
                            this.$Message.info("保存草稿成功！！！");
                            this.$router.push("/app/newsIndex/addClassify/" + r.data.msg );
                            this.news.id = r.data.msg
                        }else{
                            this.$Message.info(r.data.msg);
                        }
                    }
                    this.param = new FormData()
                })
        },
        getFile(event) {//附件
            this.news.file = event.target.files[0]
            this.filesName = this.news.file.name
            if(this.news.file.size > 1024*1024){
                this.$Message.info('附件文件大小超过1M,请重新选择文件！！！')
                this.news.file = ''
                return
            }
        },
        getCategory(){//获取分类类型
            this.$api.post('web/newsCategory/getLists', null, r => {
            // console.log(r)
                this.categoryList = r.data
            })
        },
        getNewsSource(){//获取信息来源
            this.$api.post('web/newsSource/getLists', null, r => {
                this.sourcesList = r.data
            })
        },
        add_img(event){//图片
            var reader =new FileReader();
            let imgFile = event.target.files[0];           
            if(imgFile  .size > 1024*1024){
                this.$Message.info('封面图片文件大小超过1M,请重新选择文件！！！')
                this.imgSrc =''
                return
            } 
            
            reader.readAsDataURL(imgFile);
            var that=this;
            reader.onloadend=function(){
                that.imgSrc = reader.result
            }  
            this.param.append('imgFile',imgFile)//通过append向form对象添加数据
        },
        changeTitle() {//标题长度
            let length = this.news.title.length;
            if (length > 120) {
                this.news.title = this.news.title.substr(0, 120);
            }
            this.titleNum = this.news.title.length;
        },
        changeDescription() {//摘要长度
            let length = this.news.description.length;
            if (length > 120) {
                this.news.description = this.news.description.substr(0, 120);
            }
            this.descriptionNum = this.news.description.length;
        },
        isNewOrEditor(){
            let id = this.$route.params.id
            if(id!=0){
                this.$api.get('web/newsTemplate/get/' + id , null, r => {
                    // console.log(r)
                    this.news = r.data

                    this.news.allowDisplayInText = this.news.allowDisplayInText == 1 ? true : false
                    this.imgSrc = this.news.coverImage

                    this.filesName =   this.news.filesName
                    let that = this;
                    this.editor.ready(function(){
                        that.editor.setContent(that.news.content);
                    });
                })
            }
        }
    },
    mounted(){
        this.editor = UE.getEditor('editor_');// 实例化editor编辑器
        this.param = new FormData(); //创建form对象
        
        this.getCategory()
        this.getNewsSource()
        this.isNewOrEditor()
    },
    updated() {
        this.changeTitle();
        this.changeDescription();
    },
    destroyed() {
    　　this.editor.destroy();// 将editor进行销毁
    }
}
</script>
<style lang="scss" scoped>
#editor_{
    width: 800px;
}
    .addClassify{
        height:100%;
        overflow:auto;
        .content{
            padding: 16px;
            font-size: 12px;
            >div{
            >p{
                margin-bottom: 10px;            
                span{
                color: #949494;
                }
                i{
                color: #dddddd;
                font-size:10px;
                }
            }
            .gap{
                display: inline-block;
                height: 1px;
                width: 24px;
            }
            

            }
        .con_select {
            width: 120px;
            background-color: #cc0001; 
            border-color: #cc0001;
            color: #eda7a9;
            margin-bottom: 18px;
        }
        .category{
            margin-bottom: 18px;
        }
        .title { 
            margin-bottom: 18px;
            input {
            width: 468px;
            border: 1px solid #888888;
            border-radius: 4px;
            height: 24px;
            }
        }
        .sources {
            margin-bottom: 18px;      
            clear: both;
        }
        .cover{
            position: relative;
            margin-bottom: 20px;  
            .img{
                border: 1px solid #888888;
                height: 150px;
                width: 270px;
                background: #EEE;
                margin: 0;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;  
                img{
                max-width: 270px;
                max-height: 150px;
                }
                .addImg{
                position: absolute;
                top: 30px;
                left: 0px;
                height: 150px;
                width: 270px;
                z-index: 1;
                opacity: 0; 
                }
            }
            div{
            margin-top: 10px;
            }
        }
        .description {
            margin-bottom: 18px;
            textarea {
            width: 480px;
            height: 62px;
            border:1px solid #888;
            border-radius: 4px;
            resize: none;
            }
        }
        .externalLinks{
            margin-bottom: 18px;
            input {
                width: 468px;
                border: 1px solid #888888;
                border-radius: 4px;
                height: 24px;
            }
        }
        .mt24{
            margin-top: 24px;
            p{
                float: left;
                margin: 0;
                line-height: 24px;
            }
            >div{
                float: left;
                margin-left: 10px;
            }
        }
        .accessory{
            position: relative;
            .AddAcc{
                position: absolute;
                top: 0px;
                opacity: 0;
            }
        }
        .button{
            margin: 40px 0 160px; 
            position: relative;
            >button{
                width: 80px;
                margin-right: 24px;
                color: #e4eefa;
                &:nth-of-type(1){
                    background-color: #ff9505;
                    border-color: #ff9505;
                }
                &:nth-of-type(2){
                    border-color: #0060d0;
                    background-color: #0060d0;
                }
                &:nth-of-type(3){
                    border-color: #cc0001;
                    background-color: #cc0001;
                }
            }
        }
        }
    }
</style>
