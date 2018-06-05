<template>
  <div class="news">
    <div v-if="isShowSetList" @click="tabManage()" class="mask"></div>
    <div class="newsCentent">
      <!-- header -->
        <div class="NC_top">
            中信聚焦
            <!-- <span class=number>共 {{dynamics.length}} 条</span> -->
            <div class="set" @click="tabManage()">
                <span>设置</span>
                <ul v-if="isShowSetList" class="setList">
                  <span class="triangle"></span><span class="smallTG"></span>
                    <li @click="tabManage(setItem.path)" v-for="setItem in setItems" :key="setItem.id">{{setItem.name}}</li>
                </ul>
            </div>
            
        </div>
      <!--centent  -->
      <div class="NC_center">
        <!-- 操作栏 -->
        <ul class="h_list clearfix">         
          <li class="addDynamic" @click="change()"><Button size='small'  type="primary">新建动态</Button></li>
          <li class="batchRemove">
            <Button type="primary" size='small'>
            <Poptip
                placement='bottom'
                confirm 
                transfer
                title="确定要删除么？"
                @on-ok="batchRemove()"
                ok-text="是"
                cancel-text="否">
                <span>批量删除</span>
            </Poptip>
            </Button>
          </li>
          <li class="select">
              <Select  size="small" style="width:112px" not-found-text clearable filterable v-model="categoryId" placeholder='请选择类型' icon=''>
                  <Option v-for="item in types" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select> 
          </li>
          <li class="timeHorizon">
              <span>时间范围：</span> 
              <DatePicker format="yyyy.MM.dd" v-model="startTime"  size='small' type="date" style="width: 112px"></DatePicker>
              <span>至</span> 
              <DatePicker format="yyyy.MM.dd" v-model="endTime"  size='small' type="date"  style="width: 112px"></DatePicker>
          </li>
          <li class="input"><input v-model="demandTitle" type="text" ><Button @click="getNews()"  type="primary"  size='small' shape="circle">查询</Button></li>
          <li class="groupPush" @click="()=>{this.isListPush = !this.isListPush;}"><Button type="primary" size='small'>组合推送</Button></li>
          <li class="deriveList"><Button size='small'  type="primary" @click="exportNewsInfo()">导出此列表</Button></li>
          <li class="listStyle">
              <span  :class="{'active':!isList}" @click="()=>{this.isList = false;this.isListPush = false}"><Icon type="grid" size=16></Icon></span>
              <span :class="{'active':isList}" @click="()=>{this.isList = true;this.isListPush = false}"><Icon type="navicon" size=16></Icon></span>
          </li>
        </ul>
        <!-- 内容 -->
        <div ref="content" class="center_" @scroll="dropDown()">
          <!-- 列表样式 -->
          <table  v-if="isList"  :class="{'active':isListPush}">
            <thead>
              <tr>
                <td class="title">
                  <input type="checkbox" class="checkbox1" id="checkbox" :class="[checkAll ? 'checkbox2':'']" v-model="checkAll" @click="handleCheckAll">
                  <label for="checkbox" >标题</label>
                </td>
                <td class="createBy">作者</td>
                <td class="createTime">发布时间</td>
                <td class="categoryName">类别</td>
                <td class="statusName" :class="{'statusName_a':isListPush}">状态</td>
                <td v-show="!isListPush" class="contentCount">评论（条）</td>
                <td v-show="!isListPush" class="readCount">已读数/推送数</td>
                <td v-show="!isListPush" class="operation">操作</td>
              </tr>
            </thead>
            <tbody >
              <tr style="display:none"></tr>
              <tr  draggable="true" @dragenter="dragenter($event)" @dragend="dragend(dynamic.id)"  :id="[dynamic.id]" v-for="(dynamic,i) of dynamics" :key="dynamic.id"  @click="push(dynamic.id,$event)">
                <td draggable="false" class="ellipsis title">
                  <input type="checkbox" class="checkbox1" :class="[checkArr1[i]? 'checkbox2':'']" :id="['checkbox' + i]" :value="dynamic.id" v-model="checkArr">
                  <label :for="['checkbox' + i]"><span>{{dynamic.title | spliceLength(13)}}</span></label>
                </td>
                <td class="ellipsis checkbox">{{dynamic.createBy  | spliceLength(3)}}</td>
                <td v-if="dynamic.publishTime" class="ellipsis createTime">{{dynamic.publishTime  | timeFilter}}</td>
                <td v-else class="ellipsis createTime" style="padding-left:30px;">-</td>
                <td class="categoryName"><span class="ellipsis1 ">{{dynamic.categoryName}}</span></td>
                <td class="ellipsis statusName">{{dynamic.statusName}}</td>
                <td v-show="!isListPush"><router-link  tag="span" :to="{name:'comment',params:{id:dynamic.id}}">{{dynamic.contentCount}}</router-link></td>            
                <td v-show="!isListPush" ><router-link tag="span" :to="{name:'pageview',params:{id:dynamic.id}}">{{dynamic.readCount}}/{{dynamic.totalPeople}}</router-link></td>
                <td v-show="!isListPush" class='cl'>
                  <span @click="toTop(dynamic.id)" class="toTop">置顶</span>
                  <span @click="change(dynamic,dynamic.id)">编辑</span>
                  <span >
                      <Poptip
                          placement='bottom'  
                          confirm
                          title="确定要删除么？"
                          @on-ok="remove(dynamic.id)"
                          ok-text="是"
                          cancel-text="否">
                          <i>删除</i>
                      </Poptip>
                  </span>
                  <span>移动</span>   
                </td>
               </tr>
            </tbody>
           
          </table>
          <!-- 卡片样式 -->
          <ul v-else class="card clearfix"  :class="{'active':isListPush}">
              <li class="crdItem" v-for="dynamic of dynamics" :key="dynamic.id"  @click="lookPpreview(dynamic.id,$event)">
                  <dl>
                    <dt><p class="ellipsis">{{dynamic.title}}</p></dt>
                    <dd>
                      <div class="img"><img :src="dynamic.coverImage" alt=""></div>
                      <p class="ellipsis2">{{dynamic.description}}</p>
                      <div class="time clearfix">
                        {{dynamic.createTime | timeFilter}}
                        <div class="cl">
                            <Poptip
                               confirm
                                title="确定要删除么？"
                                @on-ok="remove(dynamic.id)"
                                ok-text="是"
                                cancel-text="否">
                                <span>删除</span>
                            </Poptip>
                            <span @click="change(dynamic,dynamic.id)">编辑</span>
                        </div>
                      </div>
                    </dd>
                  </dl>
              </li>
          </ul>
          <!-- 新闻总条数 -->
          <!-- <p class="Num_"><span class=number>共 {{dynamics.length}} 条</span></p> -->
          <div class="push" v-show="isListPush">
              <combine-to-push   :toPush='toPush' :clearToPush='clearToPush'></combine-to-push>
          </div>
        </div>
      </div>
    </div>
      <preview v-show="isLookPpreview" :view='view' :lookPpreview='lookPpreview' ></preview>    
  </div>
</template>
<script>
import preview from "../preview";
import CombineToPush from "../CombineToPush";
import axios from "axios";
export default {
  name: "news",
  components: { CombineToPush, preview },
  data() {
    return {
      view: { content: "", id: "", outlink: "" },
      targetId: "",
      isLookPpreview: false,
      checkAll: false,
      checkArr: [],
      checkArr1: [],
      setItems: [
        { id: 1, name: "分类管理", path: "/app/newsIndex/classifyManage" },
        { id: 2, name: "皮肤管理", path: "/app/newsIndex/dermaManage" },
        { id: 3, name: "内容模板", path: "/app/newsIndex/contentTemplate" },
        { id: 4, name: "标签管理", path: "/app/newsIndex/labelManagement" },
        { id: 5, name: "信息来源", path: "/app/newsIndex/informationSource" },
        { id: 6, name: "定时发布", path: "/app/newsIndex/timeInterva" }
      ],
      isShowSetList: false,
      types: [],
      dynamics: [],
      isList: true,
      isListPush: false,
      //查询
      categoryId: "",
      startTime: "",
      endTime: "",
      demandTitle: "",
      toPush: [], //组合推送
      page: 0,
      limit: 15,
      onOff: true,
      off: true
    };
  },
  methods: {
    lookPpreview(id,evt) {
         let isOff = false
          evt.path.forEach(item => {
              if(item.className == 'cl'){
                  isOff = true
                  return
              }
              return
          });
        if(isOff){
          return 
        }
        if(id == 0){
            this.isLookPpreview = !this.isLookPpreview;
            return 
        }        
        if(this.isListPush){
          this.push(id,evt)
          return 
        }
        this.$api.get("omweb/news/get/" + id, null, r => {
          this.view.title = r.data.title;
          this.view.content = r.data.content;
          this.view.outlink = r.data.outlink;
          this.isLookPpreview = !this.isLookPpreview;
        });

    },
    push(id,evt) {//列表推送
      let isOff = false
      evt.path.forEach(item => {
          if(item.className == 'cl'){
              isOff = true
              return
          }
          return
      });
      if(isOff){
        return 
      }
      this.dynamics.forEach((r, i) => {
        if (r.id == id) {
          if (this.checkArr1[i]) {
            this.checkArr1[i] = false;
          } else {
            this.checkArr1[i] = true;
          }
        }
      });
      this.checkAll = this.checkArr1.every(r => {
        if (!r) {
          return false;
        } else {
          return true;
        }
      });
      let isHas = this.toPush.some((item, index) => {
        if (item.id == id) {
          this.toPush.splice(index, 1);
          return true;
        } else {
          return false;
        }
      });
      if (!isHas) {
        if (this.toPush.length >= 8) {
          this.$Message.info("组合推送信息已超额,只能少于等于8条！！！！");
          return;
        }
        this.dynamics.forEach(item => {
          if (item.id == id) {
            this.toPush.push(item);
          }
        });
      }
    },
    clearToPush() {
      this.toPush = [];
      this.$forceUpdate(); 
      this.isListPush = !this.isListPush
      this.checkArr1.fill(false)
    },
    tabManage(path) {//设置
      if (path) {
        this.$router.push(path);
      }
      this.isShowSetList = !this.isShowSetList;
    },
    getCategory() {//获取分类类型
      this.$api.post("omweb/newsCategory/getLists", null, r => {
        this.types = r.data;
      });
    },
    //获取新闻
    getNews() {
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        categoryId: this.categoryId,
        startDate: this.timeFiler(this.startTime),
        endDate: this.timeFiler(this.endTime),
        title: this.demandTitle
      };
      this.$util.hintShow(this, "正在加载中,请稍等...");

      this.$api.post("omweb/news/list", data, r => {
        this.$util.hintHide(this);
        this.dynamics = r.data.rows;
        this.checkArr1.length = this.dynamics.length;
        this.checkArr1.fill(false);
      });
    },
    //删除新闻
    remove(id) {
      let data = { id };
      this.$api.post("omweb/news/remove", data, r => {
          this.dynamics.forEach((item, index) => {
            if (item.id == id) {
              this.dynamics.splice(index, 1);
            }
          });
      });
    },
    batchRemove() {
      //批量删除
      let str = "";

      this.checkArr1.forEach((r, i) => {
        if (r) {
          str += this.dynamics[i].id + ",";
        }
      });
      str = str.substr(0, str.length - 1);

      if (!str.length) {
        this.$Message.info("请选择要删除的内容");
        return;
      }
      let arr = str.split(",");
      let data = { ids: str };
      this.$api.post("omweb/news/batchRemove", data, r => {
          var temp = [];
          var temparray = [];
          for (var i = 0; i < arr.length; i++) {
            temp[arr[i]] = true;
          }
          for (var i = 0; i < this.dynamics.length; i++) {
            if (!temp[this.dynamics[i].id]) {
                temparray.push(this.dynamics[i]);
            }
            
          }
          this.checkArr1.fill(false)
          this.checkAll = false
          this.dynamics = temparray;
      });
    },
    //新闻置顶
    toTop(id) {
      let data = { id };
      this.$api.post("omweb/news/toTop", data, r => {
          this.dynamics = [];
          this.getNews();
      });
    },
    dropDown() {
      //下拉加载
      let scrollTop = this.$refs.content.scrollTop;
      let scrollHeight = this.$refs.content.scrollHeight;
      let clientHeight = this.$refs.content.clientHeight;
      if (scrollHeight - clientHeight - scrollTop <= 45) {
        if (this.onOff) {
          if (this.off) {
            this.off = false;
            this.page++;
            let data = {
              limit: this.limit,
              offset: this.page * this.limit,
              categoryId: this.categoryId,
              startDate: this.timeFiler(this.startTime),
              endDate: this.timeFiler(this.endTime),
              title: this.demandTitle
            };
            let arr = [];
            this.$api.post("omweb/news/list", data, r => {
              arr = r.data.rows;
              this.off = true;
              this.dynamics.push(...arr);
              let arrcheck = []
              arrcheck.length = arr.length;
              arrcheck.fill(false)
              this.checkArr1.push(...arrcheck);
              this.checkAll = false
              arr.length == 0 ? (this.onOff = false) : (this.onOff = true);
            });
          }
        }
      }
    },
    handleCheckAll() {
      //多选
      if (this.isListPush) {
        if (this.dynamics.length <= 8) {
          if (!this.checkAll) {
            this.dynamics.forEach(item => {
              this.toPush.push(item);
            });
          } else {
            this.toPush = [];
          }
        } else {
          this.$Message.info("组合推送信息已超额,只能少于等于8条！！！！");
          return;
        }
      }
      if (!this.checkAll) {
        this.dynamics.forEach((r, i) => {
          this.checkArr1[i] = true;
        });
      } else {
        this.dynamics.forEach((r, i) => {
          this.checkArr1[i] = false;
        });
      }
    },
    change(item, id) {
      item = item || {};
      id = id || 0;
      this.$router.push({ name: "addDynamic", params: { id, _id: 0 } });
    },
    exportNewsInfo() {
      //导出
      var categoryId = this.categoryId || "";
      var startDate = this.timeFiler(this.startTime);
      var endDate = this.timeFiler(this.endTime);
      var title = this.demandTitle || "";
      var corpId = sessionStorage['corpId']
      var str =
        "categoryId=" +
        categoryId +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&title=" +
        title +
        "&corpId=" +
        corpId;
      let config = {
        headers: { Authorization: sessionStorage["token"] },
         responseType: "blob"
      };
      this.$util.hintShow(this, "正在导出,请稍等...");
      axios.post( this.$newsUrl + "/omweb/news/exportNewsInfo" , str , config)
        .then(res => {
          let fileName = decodeURI(
            res.headers["content-disposition"].split("filename=")[1]
          );
          if (fileName == "noData") {
            this.$Message.info("没有要导出的数据！！");
          } else {
            let blob = res.data;
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = e => {
              let a = document.createElement("a");
              a.download = fileName;
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          }
          this.$util.hintHide(this);
        })
        .catch(r => {
          console.log(r)
          this.$util.hintHide(this);
           this.$Message.info("导出失败！！！");
        });
    },
    toMove(currentId, targetId, index1, index2) {
      let data = {
        currentId,
        targetId
      };
      this.$util.hintShow(this);
      this.$api.post("omweb/news/moveNewsOrder", data, r => {
          this.$util.hintHide(this);
          let json = this.dynamics[index1];
          this.dynamics[index1] = this.dynamics[index2];
          this.dynamics[index2] = json;
          this.$forceUpdate();
      });
    },
    timeFiler(date) {
      //时间
      if (date) {
        return (
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()
        );
      } else {
        return "";
      }
    },
    dragenter(event) {
      event.path.forEach((item, index) => {
        if (item.tagName == "TR") {
          this.targetId = event.path[index].id;
        }
      });
    },
    dragend(id) {
      let data = {
        currentId: id,
        targetId: this.targetId
      };
      if (this.targetId == id) {
        return;
      }
      var currentIndex, targetIndex;
      this.$util.hintShow(this);
      this.$api.post("omweb/news/moveNewsOrder", data, r => {
        this.dynamics.forEach((item, index) => {
          if (item.id == id) {
            currentIndex = index;
          }
          if (this.targetId == item.id) {
            targetIndex = index;
          }
        });
        var json = this.dynamics[targetIndex];
        var i = this.checkArr1[targetIndex];

        this.dynamics[targetIndex] = this.dynamics[currentIndex];
        this.checkArr1[targetIndex] = this.checkArr1[currentIndex];

        this.dynamics[currentIndex] = json;
        this.checkArr1[currentIndex] = i;
        this.$forceUpdate();
        this.$util.hintHide(this);
      });
    }
  },
  mounted() {
    this.getNews();
    this.getCategory();
  }
};
</script>
<style lang="scss" scoped>
.push {
  width: 384px;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  padding-top: 16px;
}
.mask {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba($color: #000000, $alpha: 0);
  z-index: 999;
}
.checkbox1 {
  height: 15px;
  width: 15px;
  -webkit-appearance: none;
  vertical-align: middle;
  outline: none;
  border: none;
  background: url(../../../assets/images/check.png) no-repeat;
}
.checkbox2 {
  background: url(../../../assets/images/check.png) no-repeat left -19px;
}
.news {
  height: 100%;
  background: #fff;
  .newsCentent {
    height: 100%;
    display: flex;
    flex-direction: column;
    .number {
      font-size: 12px;
      margin-left: 12px;
      color: #9e9e9e;
    }
    .Num_ {
      margin: 22px 0 0 16px;
    }
    .NC_top {
      width: 100%;
      height: 48px;
      line-height: 48px;
      background-color: #eeeeee;
      padding: 0 18px;
      color: #5e5e5e;

      .set {
        width: 50px;
        height: 100%;
        line-height: 48px;
        float: right;
        background-image: url(../../../assets/images/set.png);
        background-repeat: no-repeat;
        background-position: right center;
        cursor: pointer;
        position: relative;
        z-index: 1000;
        ul {
          position: absolute;
          top: 45px;
          right: 0;
          width: 96px;
          border: 1px solid #dadada;
          line-height: 30px;
          background: #fff;
          box-shadow: 0px 0px 50px 2px #bbb;
          li {
            height: 42px;
            text-align: center;
            line-height: 42px;
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
    .NC_center {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-top: 16px;
      background: #fff;
      .h_list {
        width: 100%;
        padding-left: 16px;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        li {
          button {
            color: #f6cfd0;
            background-color: #cc0001;
            border-color: #cc0001;
          }
        }
        .select {
          .ivu-select-dropdown-list {
            li {
              margin: 0px;
              text-align: center;
              width: 100%;
              color: #666;
            }
          }
          .triangle {
            position: absolute;
            top: 1px;
            right: 1px;
            height: 22px;
            width: 24px;
            border-radius: 4px;
            background: #fff;
            span {
              position: absolute;
              top: 6px;
              left: 6px;
              width: 0;
              height: 0;
              border: 6px solid transparent;
              border-top-color: #cc0001;
            }
          }
        }
        .timeHorizon {
          margin: 0 25px 0 9px;
          span {
            color: #cc0001;
          }
        }
        .input {
          position: relative;
          margin-right: 25px;
          input {
            height: 24px;
            width: 144px;
            border: 1px solid #cc0001;
            line-height: 24px;
            border-radius: 15px;
            outline: none;
            padding-left: 10px;
            padding-right: 56px;
          }
          button {
            width: 56px;
            height: 100%;
            position: absolute;
            right: 0px;
          }
        }
        .listStyle {
          margin: 0 0 0 16px;
          span {
            display: block;
            float: left;
            text-align: center;
            height: 24px;
            width: 24px;
            padding: 3px;
            background: #fff;
            color: #cc0001;
            border: 1px solid #cc0001;
            margin-right: 8px;
            border-radius: 4px;
            cursor: pointer;
            &:nth-of-type(2) {
              margin: 0;
              padding: 2px;
            }
          }
          .active {
            background: #cc0001;
            color: #fff;
          }
        }
      }
      .center_ {
        position: relative;
        background: #fff;
        flex: 1;
        overflow-x: hidden;
        overflow-y: auto;
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 16px;
          thead {
            tr {
              color: #c1c1c1;
            }
          }
          tr {
            color: #4e4e4e;
            &:nth-of-type(n + 2) {
              td {
                &:nth-of-type(5) {
                  color: #81c173;
                }
                &:nth-of-type(n + 6) {
                  color: #4c8fde;
                  span {
                    cursor: pointer;
                  }
                }
                &:nth-of-type(6),
                &:nth-of-type(7) {
                  text-decoration: underline;
                  text-decoration-color: blue;
                }
                &:nth-last-of-type(1) {
                  > div {
                    float: left;
                  }
                  span {
                    display: block;
                    float: left;
                    width: 64px;
                    padding-left: 16px;
                    // background-image:url(../../../assets/images/del.png);
                    background-repeat: no-repeat;
                    background-position: left 3px;

                    &:nth-of-type(1) {
                      background-image: url(../../../assets/images/toTop.png);
                    }
                    &:nth-of-type(2) {
                      background-image: url(../../../assets/images/editor.png);
                    }
                    &:nth-of-type(3) {
                      background-image: url(../../../assets/images/del.png);
                    }
                    &:nth-of-type(4) {
                      background-image: url(../../../assets/images/move.png);
                      width: auto;
                    }
                  }
                }
              }
            }
            td {
              height: 48px;
              border-bottom: 1px solid #eeeeee;
              box-sizing: border-box;
              input {
                float: left;
                margin: 2px 10px 0;
              }
            }
            .title {
              width: 256px;
            }
            .createBy {
              width: 64px;
            }
            .createTime {
              width: 120px;
            }
            .categoryName {
              width: 88px;
            }
            .statusName {
              width: 95px;
            }
            .statusName_a {
              width: 72px;
            }
            .contentCount {
              width: 90px;
            }
            .readCount {
              width: 128px;
            }
          }
        }
        .card {
          width: 100%;
          li {
            width: 320px;
            float: left;
            margin: 16px;
            padding: 13px 16px 18px;
            box-shadow: 0px 0px 20px -2px #888;
            border-radius: 5px;
            font-size: 12px;
            color: #646464;
            dl {
              dt {
                p {
                  line-height: 14px;
                }
              }
              dd {
                .img {
                  width: 288px;
                  height: 169px;
                  margin: 14px 0 18px;
                  img {
                    height: 100%;
                    width: 100%;
                  }
                }
                p {
                  height: 24px;
                }
                .time {
                  margin-top: 20px;
                  > div {
                    float: right;
                  }
                  span {
                    float: right;
                    color: #4c8fde;
                    margin-left: 16px;
                    padding-left: 16px;
                    cursor: pointer;
                    background-image: url(../../../assets/images/del.png);
                    background-repeat: no-repeat;
                    background-position: left 2px;
                    &:nth-child(2) {
                      background-image: url(../../../assets/images/editor.png);
                    }
                  }
                }
              }
            }
          }
        }
      }
      .card.active {
        width: 720px;
      }
      table.active {
        width: 600px;
      }
    }
  }
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>

