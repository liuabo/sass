<template>
	<div class="addDynamic">
			<cn-header :topTitle='topTitle'></cn-header>
			<div class="AD_buttom" :class="[lRange?'blur':'']">
				<div class="AD_nav">
					<span class="selfBuild" :class="{'isSelOrExt':isSelOrExt}" @click="()=>{this.isSelOrExt = true}">自建新闻</span>
					<span class="external" :class="{'isSelOrExt':!isSelOrExt}" @click="()=>{this.isSelOrExt = false}">外联新闻</span>
				</div>
				 <div class="AD_content" @click="hideshowLabel($event)">
						 <Button v-show="isSelOrExt" v-if="this.$route.params.id == 0" @click="()=>{this.$router.push('/app/newsIndex/contentTemplate');}" class="con_select" type="primary" size="small" >从内容模板选择</Button>
						<!-- 类型 -->
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
						<div v-show="isSelOrExt" class="sources">
								<p><span>信息来源:</span></p>
								<Select size="small" placeholder='其他' v-model="news.sources"  style="width:112px">
										<Option  v-for="item in sourcesList" :value="item.name" :key="item.id">{{ item.name }}</Option>
								</Select>
						</div>
						<!-- 封面图片 -->
						<div class="cover">
								<p><span>封面图片:</span><i>建议使用900*500像素的图片</i></p>
								<div class="img">
									<img :src="imgSrc" alt="">
									<input class="addImg" @change='add_img' alt=''  type="file"  accept="image/png,image/gif,image/jpeg">
								</div>
								<div class="offset off">
										<i-switch   v-model="news.allowDisplayInText">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
									 封面图片显示在正文中
								</div>
						</div>
						<!-- 摘要 -->
						<div class="description">
								<p><span>摘要:</span><i>{{descriptionNum}}/120</i></p>
								<textarea type="text" v-model="news.description"></textarea>
						</div>

						<!-- 外部链接 -->
						<div v-show="!isSelOrExt" class="externalLinks">
								<p><span>外部链接:</span></p>
								<input type="text" v-model="news.outlink">
						</div>
						<!-- 正文 -->
						<div v-show="isSelOrExt" class="mainBody">
								<p><span>正文:</span></p>
								<div>
									<div id="editor"></div>
								</div>
						</div>
						<!--  附件 -->
						<div v-show="isSelOrExt" class="accessory mt24 clearfix">
							<p><span>附件:</span></p>
							<div>
								<input class="AddAcc" type="file" @change="getFile($event)">
								<Button type="primary" size="small">添加附件</Button>  {{filesName}}
							</div>
							
						</div>
						<!-- 阅读人员显示 -->
						<div v-show="isSelOrExt" class="readCrewShow mt24 clearfix">
							<p><span>阅读人员显示:</span></p>
							<Select size="small" class="read" placeholder='不显示' v-model="news.allowReaderShow"  style="width:112px">
									<Option :value="1" >显示</Option>
									<Option :value="0" >不显示</Option>
							</Select>
						</div>
						<!-- 评论功能 -->
						<div v-show="isSelOrExt" class="commentFun mt24 clearfix">
							<p><span>评论功能:</span></p>
							<div class="off">
								 <label><i-switch   v-model="news.allowMemberComment">
                      <span slot="open">是</span>
                        <span slot="close">否</span>
                   </i-switch>允许成员评论 </label>
									<b class="gap"></b>
									 <label>
                     <i-switch   v-model="news.allowAnonymousComment">
                          <span slot="open">是</span>
                          <span slot="close">否</span>
                     </i-switch> 允许匿名评论</label>
							</div>
						</div>
						<!-- 分享功能 -->
						<div v-show="isSelOrExt" class="shareFun mt24 clearfix">
							<p><span>分享功能:</span></p>
							<div>
								 <RadioGroup v-model="news.allowShare">
											<Radio label="1"><span>允许内部分享</span></Radio>
											<b class="gap"></b>
											<Radio label="0"><span>添加水印</span></Radio>
									</RadioGroup>
							</div>
						</div>
						<!-- 标签 -->
						<!-- <div class="label mt24 clearfix">
							<p><span>一级标签:</span></p>
							<Select @on-change="getFirstTagName(labelId1)" size="small" class="read" v-model="labelId1"  style="width:112px">
									<Option  v-for="item in labelList1" :value="item.id" :key="item.id" >{{ item.tagName }}</Option>
							</Select>
							<b></b>
							<p><span>二级标签:</span></p>
							<Select @on-change="getSecondTagName(labelId2)"  size="small" class="read" v-model="labelId2"  style="width:112px">
									<Option  v-for="item in labelList2" :value="item.id" :key="item.id">{{ item.tagName }}</Option>
							</Select>
						</div> -->
            <!-- 标签 -->
						<div class="label mt24 clearfix">
							<p><span>标签:</span></p>
                <div  class="selecLabel" data-id='hidelabel'>
                  <div data-id='hidelabel' class="Labelbox " :style="showLabel ? 'border-color: #2d8cf0;' : ''"  @click.self="showLabel = !showLabel">
                    <div data-id='hidelabel' class="san" :class="showLabel ? 'act':''" @click.self="showLabel = !showLabel"></div>     
                    <!-- <input class="inp" type="text" @focus="showLabel = true" @blur="showLabel = true" id="input"> -->
                    <!-- <label for="input"> -->
                        <ul data-id='hidelabel' class="clearfix" @click.self="showLabel = !showLabel">
                            <li data-id='hidelabel' v-for="(item,index) in news.tags" :key="item.id" >
                              <span data-id='hidelabel'  style="margin-right:5px;" @click="delShowSelect(index)"><font-awesome-icon data-id='hidelabel'  style="color:#eee;" :icon="['fas','times']" /></span>
                              {{item.name}}
                            </li>
                        </ul>
                    <!-- </label> -->
                  </div>
                <div data-id='hidelabel' class="labelL" v-show="showLabel">
                     <ul data-id='hidelabel' class="labelListfirst" >
                          <li data-id='hidelabel' class="LabelitemFirst" @click="addTags(list.id,list.tagName,1)" @mouseover="showChild=list.child" v-for="list in labelList" :key="list.id"><span data-id='hidelabel' >{{list.tagName}}</span></li>
                      </ul>
                      <ul data-id='hidelabel' class="labelListSec" >
                        <li data-id='hidelabel' class="LabelitemSec" @click="addTags(item.id,item.tagName,2)"  v-for="item in showChild" :key="item.id"><span data-id='hidelabel' >{{item.tagName}}</span></li>
                      </ul>
                </div>
              </div>
						</div>
						<!-- 可见范围 -->
						<div class="visualRange mt24 clearfix">
							<Button  v-if="!news.rangeDetail.length"  @click="()=>{this.lRange = !this.lRange}" type="primary" size="small">选择发送范围</Button>
								<p v-if="news.rangeDetail.length"><span>可见范围:</span></p>
							<div v-if="news.rangeDetail.length" class="range"  >
								<ul class="clearfix">
									<li v-for="(item,index) in news.rangeDetail " :key="item.id">
                    <span style="margin-right:5px;" @click="delRangeDetail(index)"><font-awesome-icon style="color:#eee;" :icon="['fas','times']" /></span>
                    {{item.name}}
                  </li>
								</ul>
								<Button type="primary" size="small" @click="()=>{this.lRange = !this.lRange}">修改</Button>
							</div>
						</div>
						<!-- 推送消息 -->
						<div class="pushInfo mt24 clearfix">
							<p><span>推送消息:</span></p>
							 <div>
									<RadioGroup v-model="news.allowPushMessage">
											<Radio label="0"><span>推送微信提醒</span></Radio>
											<b class="gap"></b>
											<Radio label="1"><span>不推送仅发布</span></Radio>
									</RadioGroup>
							</div>
						</div>
						<!-- 三个按钮 -->
						<div class="button">
								<Button type="primary" size="small" @click="lookPpreview()">预览</Button>
								<Button type="primary" size="small" @click="interval(false,false)" >保存草稿</Button>
								<Button type="primary" size="small" @click="interval(false,true)">发布</Button>
								<Button type="primary" size="small" @click="()=>{this.timeInterval = !this.timeInterval}">定时发布</Button> 
								<div class="timeInterval" v-show="timeInterval">
										<p>定时发布</p>
										<DatePicker format="yyyy.MM.dd HH:mm:ss" :options="options" v-model="sendDate"  size='small' type="datetime"  style="width: 208px"></DatePicker>
										<div class="btn_">
											<Button type="primary" @click="()=>{this.timeInterval = !this.timeInterval}">取消</Button> 
											<Button type="primary" @click="interval(true,true)">确定</Button> 
										</div>
								</div>
						</div>
				 </div>
			</div>
      <preview v-if="isLookPpreview" :view='view' :lookPpreview='lookPpreview'></preview>
      <visual-range v-if="lRange" :lRange='lRange' :isRange='isRange' :rangeDetail="news.rangeDetail"></visual-range>
	</div>
</template>
<script>
import cnHeader from "../common/cnHeader";
import imgSrc from "../../../assets/images/img_03.png";
import preview from "../preview";
import visualRange from "../visualRange";
import axios from "axios";
export default {
  name: "addDynamic",
  components: { cnHeader, preview, visualRange },
  data() {
    return {
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      showLabel:false,
      view: {},
      isLookPpreview: false,
      lRange: false,
      timeInterval: false,
      editor: null,
      topTitle: "新建内容",
      isSelOrExt: true, //自建or外联
      categoryList: [], //类型
      category: "",
      imgSrc,
      titleNum: 0, //标题长度
      descriptionNum: 0, //摘要长度
      sources: "",
      sourcesList: [],
      readCrewShow: "",
      //标签
      // labelId1: "",
      // labelList1: [],
      // labelId2: "",
      // labelList2: [],
      labelList:[],
      showChild:[],
      news: {
        categoryId: "", //分类id
        title: "", //标题
        sources: "", //信息来源
        allowDisplayInText: 0, //封图显示正文0不1显
        description: "", //摘要
        content: "", //正文
        outlink: "", //外部链接
        file: "", //附件
        allowReaderShow: 0, //阅读显示0 1
        allowMemberComment: "0", //成员评论 0 1
        allowAnonymousComment: "0", //匿名评论 0 1
        allowShare: "0", //分享 0 1
        // firstTagName: "", //一级标题
        // firstTag: "",
        // secondTag: "",
        // secondTagName: "", //二级
        tags:[],
        visibleRange: { deptIds: "", userIds: "", tagIds: "" }, //可见 0 1 2 3
        rangeDetail: "", //详细范围
        allowPushMessage: "0", //推送 0 1
        allowTiming: "0", //定时发布  0 1
        status: 0 //状态
      },
      filesName: "", //附件名字
      param: {},
      sendDate: "" //定时发布时间
    };
  },
  methods: {
     hideshowLabel(event){
        event = event || window.event;
       var target = event.target || event.srcElement;
      if( event.target.dataset.id !='hidelabel'){
          this.showLabel = false
      }
    },
    addTags(id,name,level){
      let isHas = this.news.tags.some((item,index)=>{
          if(item.id==id){
            this.news.tags.splice(index,1)
            return true
          }else{
            return false
          }
      })
      if(!isHas){
        this.news.tags.push({id,name,level})
      }
    },
    delShowSelect(index){
         this.news.tags.splice(index,1)
    },
    isRange(data) {
      var data = data || [];
      this.news.rangeDetail = data;
      if (data.length) {
        this.range = !this.range;
      }
      this.lRange = !this.lRange;
      this.setVisibleRange(data)
    },
    setVisibleRange(data){
      this.news.visibleRange =  { deptIds: "", userIds: "", tagIds: "" },
       data.forEach(item => {
        if (item.num == 1) {
          this.news.visibleRange.deptIds += item._id + "|";
        }
        if (item.num == 2) {
          this.news.visibleRange.userIds += item._id + "|";
        }
        if (item.num == 3) {
          this.news.visibleRange.tagIds += item._id + "|";
        }
      });
    },
    delRangeDetail(index) {
      this.news.rangeDetail.splice(index, 1);
      this.setVisibleRange(this.news.rangeDetail)
    },
    lookPpreview() {
      this.view.title = this.news.title;
      this.view.content = this.editor.getContent();
      this.isLookPpreview = !this.isLookPpreview;
    },
    interval(boo, foo) {
      //发布
      var token = sessionStorage["token"];
      let config = {
        headers: { "Content-Type": "multipart/form-data", Authorization: token }
      };
      var boo = boo || "";
      this.news.content = this.editor.getContent(); //正文文本
      this.news.allowTiming = 0;
      //是否定时发布
      if (boo) {
        this.news.allowTiming = 1;
        var date = this.sendDate; //时间对象
        if (date.valueOf() <= Date.now()) {
          this.$Message.info("时间已过期,请选择正确时间！！！");
          return;
        }
        var str =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();
        this.param.append("sendDate", str);
      } else {
        this.news.sendDate = "";
      }
      // 发布or草稿
      if (foo) {
        this.news.status = 1;
      }
      if (!this.news.categoryId) {
        this.$Message.info("请输入分类！！！");
        return;
      }
      if (!this.news.title) {
        this.$Message.info("请输入标题！！！");
        return;
      }
      if (this.isSelOrExt) {
        if (!this.news.sources) {
          this.$Message.info("请选择信息来源！！！");
          return;
        }
      }
      if (!this.isSelOrExt) {
        if (!this.news.outlink) {
          this.$Message.info("请输入外部链接！！！");
          return;
        }
      }
      // if (!this.news.firstTag) {
      //   this.$Message.info("请选择一级标签！！！");
      //   return;
      // }
      // if (!this.news.secondTag) {
      //   if (this.labelList2.length) {
      //     this.$Message.info("请选择二级标签！！！");
      //     return;
      //   }
      // }
      let news_ = {};

      Object.keys(this.news).forEach(key => {
        news_[key] = this.news[key];
      });
      news_.visibleRange = JSON.stringify(news_.visibleRange);
      news_.tags = JSON.stringify(news_.tags);
      
      if (!news_.rangeDetail.length) {
        news_.rangeDetail = "";
      } else {
        news_.rangeDetail = JSON.stringify(news_.rangeDetail);
      }

      Object.keys(news_).forEach(key => {
        if (news_[key] === true || news_[key] === "true") {
          news_[key] = "1";
        } else if (news_[key] === false || news_[key] === "false") {
          news_[key] = "0";
        }
      });
      if (!this.isSelOrExt) {
        news_.content = "";
        news_.sources = "";
        news_.file = "";
        news_.allowReaderShow = 0; //阅读显示0 1
        news_.allowMemberComment = "0"; //成员评论 0 1
        news_.allowAnonymousComment = "0"; //匿名评论 0 1
        news_.allowShare = "0"; //分享 0 1
      }

      Object.keys(news_).forEach(key => {
        this.param.append(key, news_[key]);
      });

      let id = this.$route.params.id;
      let _id = this.$route.params._id;
      let url = this.$newsUrl +"/web/news/save";
      if (id != 0) {
        url = this.$newsUrl + "/web/news/update";
        this.param.delete("createTime");
        this.param.delete("createdTime")
        this.param.delete("modifiedTime");
      }
      this.$util.hintShow(this);
      if(news_.publishTime){
        this.param.delete("publishTime")
      }
      axios.post(url, this.param, config).then(r => {
        this.param = new FormData();
        if (foo) {
          this.$router.push("/app/newsIndex");
        } else {
          this.$util.hintHide(this);
          if(!r.data.code){
            this.$Message.info("保存草稿成功！！！");
            this.$router.push("/app/newsIndex/addDynamic/" + r.data.msg + "/0");
            this.news.id = r.data.msg
          }else{
             this.$Message.info(r.data.msg);
          }
        }
      });
    },
    getFile(event) {
      //附件
      this.news.file = event.target.files[0];
      this.filesName = this.news.file.name;
      if (this.news.file.size > 1024 * 1024) {
        this.$Message.info("附件文件大小超过1M,请重新选择文件！！！");
        this.news.file = "";
        return;
      }
    },
    getCategory() {
      //获取分类类型
      this.$api.post("web/newsCategory/getLists", null, r => {
        this.categoryList = r.data;
      });
    },
    // getFirstTagName(id) {
    //   //获取一级标题
    //   if (id) {
    //     this.news.firstTag = id;
    //     let data = {
    //       parentId: id
    //     };
    //     this.$api.post("web/newsTags/getSubTags", data, r => {
    //       this.labelList2 = r.data;
    //     });

    //     this.labelList1.forEach(item => {
    //       if (item.id == id) {
    //         this.news.firstTagName = item.tagName;
    //         return;
    //       }
    //     });
    //     return;
    //   }
    //   this.$api.post("web/newsTags/getFirstLevelTags", null, r => {
    //     this.labelList1 = r.data;
    //   });
    // },
    // getSecondTagName(id) {
    //   //获取二级
    //   this.news.secondTag = id;
    //   this.labelList2.forEach(item => {
    //     if (item.id == id) {
    //       this.news.secondTagName = item.tagName;
    //       return;
    //     }
    //   });
    // },
    add_img(event) {
      //图片
      var reader = new FileReader();
      let imgFile = event.target.files[0];
      if (imgFile.size > 1024 * 1024) {
        this.$Message.info("封面图片文件大小超过1M,请重新选择文件！！！");
        this.imgSrc = "";
        return;
      }
      reader.readAsDataURL(imgFile);
      var that = this;
      reader.onloadend = function() {
        that.imgSrc = reader.result;
      };

      this.param.append("imgFile", imgFile); //通过append向form对象添加数据
    },
    changeTitle() {
      let length = this.news.title.length;
      if (length > 120) {
        this.news.title = this.news.title.substr(0, 120);
      }
      this.titleNum = this.news.title.length;
    },
    changeDescription() {
      let length = this.news.description.length;
      if (length > 120) {
        this.news.description = this.news.description.substr(0, 120);
      }
      this.descriptionNum = this.news.description.length;
    },
    getNewsSource() {
      //获取信息来源
      this.$api.post("web/newsSource/getLists", null, r => {
        this.sourcesList = r.data;
      });
    },
    getLabelList(){
        this.$api.post('/web/newsTags/list',null,r=>{
            this.labelList = r.data
        })
    },
    change() {
      //修改或者使用模板
      let id = this.$route.params.id;
      let _id = this.$route.params._id;
      if (id != 0) {
        this.$api.get("web/news/get/" + id, null, r => {
          this.news = r.data;
          console.log(this.news)
          if(r.data.coverImage){
            this.imgSrc = r.data.coverImage;
          }
          this.filesName = r.data.filesName;
          this.news.allowDisplayInText =
            this.news.allowDisplayInText == 1 ? true : false;
          this.news.allowMemberComment =
            this.news.allowMemberComment == 1 ? true : false;
          this.news.allowAnonymousComment =
            this.news.allowAnonymousComment == 1 ? true : false;

          // this.labelId1 = r.data.firstTag;
          // this.getFirstTagName(this.labelId1);
          // this.labelId2 = r.data.secondTag;
          // this.getSecondTagName(this.labelId2);
          var that = this;
          if (this.news.outlink) {
            this.isSelOrExt = false;
          } else {
            this.editor.ready(function() {
              that.editor.setContent(that.news.content || '');
            });
          }
          if(this.news.rangeDetail.length){
              this.news.rangeDetail = JSON.parse(this.news.rangeDetail);
          }
          this.news.visibleRange = JSON.parse(this.news.visibleRange);
          this.news.tags = JSON.parse(this.news.tags);
           console.log(typeof this.news.tags)
        });
      } else {
        if (_id != 0) {
          this.$api.get("web/newsTemplate/get/" + _id, null, r => {
            this.news.categoryId = r.data.categoryId;
            this.news.title = r.data.title;
            this.news.sources = r.data.sources;
            this.news.allowDisplayInText = r.data.allowDisplayInText;
            this.news.allowDisplayInText =
              this.news.allowDisplayInText == 1 ? true : false;
            this.news.description = r.data.description;
            this.news.content = r.data.content;

            this.news.file = r.data.files;

             if( r.data.coverImage){
              this.news.coverImage = r.data.coverImage   
              this.imgSrc = r.data.coverImage;
            }

            r.data.coverImage ? this.news.coverImage = r.data.coverImage : '' ;
            r.data.files ? this.news.files = r.data.files : '';
            r.data.filesName ? this.news.filesName = r.data.filesName : '';

            this.news["templateId"] = _id;
            
            this.filesName = r.data.filesName
            var that = this;
            this.editor.ready(function() {
              that.editor.setContent(that.news.content || '');
            });

            Object.keys(this.news).forEach(key => {
              if (this.news[key] === "") {
                this.news[key] = "";
              }
            });
          });
        }
      }
    }

  },
  mounted() {
    this.editor = UE.getEditor("editor"); // 实例化editor编辑器
    this.param = new FormData(); //创建form对象
    this._id = this.$route.params.id;
    this.getCategory();
    this.getLabelList()
    // this.getFirstTagName();
    this.getNewsSource();
    this.change();
   


  },
  updated() {
    this.changeTitle();
    this.changeDescription();
  },
  destroyed() {
    this.editor.destroy(); // 将editor进行销毁
  }
};
</script>
<style lang="scss" scoped>

.selecLabel{
  // position: relative;
  .labelL{
    position: relative;
  }
    .labelListfirst{
        width: 108px;
        position: absolute;
        // top: 26px;
        background: #fff;
        overflow: auto;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        z-index: 100;;
        .LabelitemFirst{
            line-height: 24px;
            text-align: left;
            padding-left: 10px;
            height: 24px;
          cursor: pointer;
            width: 100%;
            &:hover{
              background: #ddd;
            }
        }
        
    }
    .labelListSec{
        width: 108px;
        position: absolute;
        left: 112px;
        background: #fff;
        overflow: auto;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        z-index: 100;
        .LabelitemSec{
          cursor: pointer;
            height: 24px;
            width: 100%;
            line-height: 24px;
            text-align: left;
            padding-left: 10px;
            &:hover{
              background: #ddd;
            }
        }
    }
}
.Labelbox{
    max-width:344px;
    min-width: 110px;
    min-height: 24px;
    border: 1px solid #dddee1;
    border-radius: 5px;
    padding-bottom: 8px;
    padding-right: 16px;
    position: relative;
    cursor: pointer;
    &:hover{
      border-color:#2d8cf0;
    }
    .inp{
      position: absolute;;
      height: 100%;
      width: 100%;
      border-radius: 5px;
      background: transparent;
    }
    li{
        float: left;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background: #888888;
        color: #f1f1f1;
        padding: 0 10px;
        margin: 7px 0px 0 8px;
        border-radius: 3px;
        cursor: pointer;
    }
    .san{
      height:0;
      width: 0;
      border-width: 5px;
      border-style: solid;
      border-color:#84808f transparent transparent  transparent ;
      position: absolute;
      right: 4px;
      top: 40%;
      transition: all 0.8s;
      z-index: 999;
    }
    .act{
       transform: rotate(-180deg);
        transform-origin: 4px 3px;
    }
}



#editor {
  width: 800px;
}
.menu {
  margin: 0.45rem;
  font-size: 12px;
  .scelect-box {
    width: 110px;
    height: 22px;
    border: solid 1px grey;
  }
  .one-menu {
    position: relative;
    width: 110px;
    height: auto;
    border-radius: 3px;
    box-shadow: 0 0 5px silver;
    background: white;
    p {
      width: 110px;
      height: 22px;   
    }
    .selectP {
      background-color: #dddddd;
    }
  }
  .tow-menu {
    position: absolute;
    left: 111px;
    top: 0;
    width: 110px;
    height: auto;
    border-radius: 3px;
    box-shadow: 0 0 3px silver;
    background-color: white;
    li {
      width: 100%;
      height: 22px;
    }
    li:hover {
      background-color: #dddddd;
    }
  }
}
.addDynamic {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-x: hidden;
  overflow-y: scroll;
  .AD_buttom {
    .AD_nav {
      width: 100%;
      height: 32px;
      background-color: #eeeeee;
      font-size: 12px;
      span {
        float: left;
        width: 80px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background-color: #cccccc;
        color: #fff;
        cursor: pointer;
      }
      .isSelOrExt {
        background-color: #fff;
        color: #d32f2e;
      }
    }
    .AD_content {
      padding: 16px;
      font-size: 12px;
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
        .gap {
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
      .category {
        margin-bottom: 18px;
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
      .sources {
        margin-bottom: 18px;
        clear: both;
      }
      .cover {
        position: relative;
        margin-bottom: 20px;
        .img {
          border: 1px solid #888888;
          height: 150px;
          width: 270px;
          background: #eee;
          margin: 0;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 270px;
            max-height: 150px;
          }
          .addImg {
            position: absolute;
            top: 30px;
            left: 0px;
            height: 150px;
            width: 270px;
            z-index: 1;
            opacity: 0;
          }
        }
        div {
          margin-top: 10px;
        }
        .offset {
          position: relative;
          input {
            // position: absolute;
            // z-index: 100;
            // top: 3px;
            height: 12px;
            width: 24px;
          }
        }
      }
      .description {
        margin-bottom: 18px;
        textarea {
          width: 480px;
          height: 62px;
          border: 1px solid #888;
          border-radius: 4px;
          resize: none;
        }
      }
      .externalLinks {
        margin-bottom: 18px;
        input {
          width: 480px;
          border: 1px solid #888888;
          border-radius: 4px;
          height: 24px;
        }
      }
      .mt24 {
        margin-top: 24px;
        p {
          float: left;
          margin: 0;
          line-height: 24px;
        }
        > div {
          float: left;
          margin-left: 10px;
        }
      }
      .label {
        b {
          float: left;
          width: 48px;
          height: 1px;
        }
      }
      .accessory {
        position: relative;
        .AddAcc {
          position: absolute;
          top: 0px;
          opacity: 0;
        }
      }
      .visualRange {
        position: relative;
        > div {
          button {
            margin-right: 16px;
          }
        }
        p {
          // height: 100%;
          position: absolute;
          top: 50%;
          margin-top: -12px;
        }
        .range {
          // float: left;
          position: relative;
          left: 51px;
          ul {
            width: 416px;
            border: 1px solid #888;
            border-radius: 5px;
            padding: 0px 0px 7px;
            float: left;
            li {
              float: left;
              height: 24px;
              line-height: 24px;
              text-align: center;
              background: #888888;
              color: #f1f1f1;
              padding: 0 10px;
              margin: 7px 0px 0 8px;
              border-radius: 3px;
              cursor: pointer;
            }
          }
          button {
            width: 80px;
            position: absolute;
            top: 50%;
            margin-top: -12px;
            margin-left: 16px;
          }
        }
      }
      .button {
        margin: 40px 0 160px;
        position: relative;
        > button {
          width: 80px;
          margin-right: 24px;
          color: #e4eefa;
          &:nth-of-type(1) {
            background-color: #ff9505;
            border-color: #ff9505;
          }
          &:nth-of-type(2) {
            border-color: #0060d0;
            background-color: #0060d0;
          }
          &:nth-of-type(3) {
            border-color: #cc0001;
            background-color: #cc0001;
          }
          &:nth-of-type(4) {
            border-color: #cc0001;
            background-color: #cc0001;
          }
        }
        .timeInterval {
          width: 240px;
          height: 144px;
          position: absolute;
          top: 0;
          left: 410px;
          background: #eeeeee;
          padding: 18px 0 0 16px;
          box-shadow: 0px 0px 60px -10px #666;
          p {
            line-height: 12px;
            font-size: 12px;
            margin-bottom: 10px;
            color: #737373;
          }
          .btn_ {
            margin-top: 16px;
            button {
              width: 96px;
              color: #fff;
              &:first-child {
                background: #cccccc;
                border-color: #ccc;
                margin-right: 16px;
              }
              &:last-child {
                background: #cc0001;
                border-color: #cc0001;
              }
            }
          }
        }
      }
    }
  }
}
</style>



