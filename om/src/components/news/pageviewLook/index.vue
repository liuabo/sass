<template>
    <div class="pageview">
        <cn-header :topTitle='topTitle'></cn-header>
        <div class="PV_content">
            <ul class="PV_tab">
                <li @click="showClass(item.id)" :class="{active:shouClasses === item.id }" v-for="item in personClass" :key="item.id">{{item.name}}</li>
            </ul>
            <div class="PV_list" v-if="list.length" ref="content" @scroll="dropDown()">
                <Button class="derive" type="primary" size="small" @click="derivedTable()">导出此列表</Button>
                <Button v-if="shouClasses===2" class="remind" type="primary" size="small" @click="remindUnReadUser()">未读用户提醒</Button>
                <table>
                    <tr>
                        <td class="name">姓名</td>
                        <td class="depattment">部门</td>
                        <td class="time">{{ shouClasses == 1 ? '阅读' :  shouClasses == 2 ? '阅读' : '点赞'}}时间<span></span></td>
                    </tr>
                    <tr v-for="item in list" :key="item.id" >
                        <td>{{item.userName}}</td>
                        <td>{{item.deptName }}</td>
                        <td v-if="shouClasses != 2">{{item.createTime | timeFilter(true)}}</td>
                        <td v-if="shouClasses == 2" class="_time">-</td>
                    </tr>
                </table>
                <div class="aggregate">共{{listLength}}人</div>
            </div>
            <div class="kong" v-else>
                <img :src="imgSrc" alt="">
                <p>暂无{{ shouClasses == 1 ? '阅读' :  shouClasses == 2 ? '未读' : '点赞'}}人员</p>
            </div>
        </div>
    </div>
</template>
<script>
import cnHeader from "../public/cnHeader";
import imgSrc from "../../../assets/images/nodata.png";
import axios from "axios";
export default {
  name: "pageview",
  components: { cnHeader },
  data() {
    return {
      imgSrc,
      topTitle: "阅读数据",
      Loading: false,
      personClass: [
        { id: 1, name: "阅读人员" },
        { id: 2, name: "未读人员" },
        { id: 3, name: "点赞人员" }
      ],
      list: [],
      shouClasses: 1, //当前显示什么类型
      limit: 15,
      page: 0,
      listLength: "",
      newsId: "",
      onOff: true,
      off: true
    };
  },
  methods: {
    getReadList() {
      //已读
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        newsId: this.newsId
      };
      this.$util.hintShow(this, "加载中...");
      this.$api.post("omweb/newsRead/readList", data, r => {
        this.list = r.data.rows;
        this.listLength = r.data.total;
        this.$util.hintHide(this);
      });
    },
    getUnreadList() {
      //未读
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        newsId: this.newsId
      };
      this.$util.hintShow(this, "加载中...");
      this.$api.post("omweb/newsRead/unreadList", data, r => {
        this.list = r.data.rows;
        this.listLength = r.data.total;
        this.$util.hintHide(this);
      });
    },
    getList() {
      //点赞
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        newsId: this.newsId
      };
      this.$util.hintShow(this, "加载中...");
      this.$api.post("omweb/newsLike/list", data, r => {
        this.list = r.data.rows;
        this.listLength = r.data.total;
        this.$util.hintHide(this);
      });
    },
    showClass(id) {
      //切换
      this.list = [];
      this.shouClasses = id;
      this.page = 0;
      if (this.shouClasses == 1) {
        this.getReadList();
      } else if (this.shouClasses == 2) {
        this.getUnreadList();
      } else if (this.shouClasses == 3) {
        this.getList();
      }
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
            let url = "";
            if (this.shouClasses == 1) {
              url = "omweb/newsRead/readList";
            } else if (this.shouClasses == 2) {
              url = "omweb/newsRead/unreadList";
            } else if (this.shouClasses == 3) {
              url = "omweb/newsLike/list";
            }
            let data = {
              limit: this.limit,
              offset: this.page * this.limit,
              newsId: this.newsId
            };
            this.$api.post(url, data, r => {
              this.list.push(...r.data.rows);
              this.off = true;
              if (r.data.rows.length < this.limit) {
                this.onOff = false;
              }
            });
          }
        }
      }
    },
    derivedTable() {
      //导出
      let url = "";
      if (this.shouClasses == 1) {
        url = "/omweb/newsRead/exportReadUserInfo";
      } else if (this.shouClasses == 2) {
        url = "/omweb/newsRead/exportUnReadUserInfo";
      } else if (this.shouClasses == 3) {
        url = "/omweb/newsLike/exportNewsLikeInfo";
      }
      let config = {
        headers: { Authorization: sessionStorage["token"] },
        responseType: "blob"
      };
      this.$util.hintShow(this, "正在导出,请稍等...");
      axios
        .post(this.$newsUrl + url, "newsId=" + this.newsId + '&corpId='+ sessionStorage['corpId'], config)
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
          this.$util.hintHide(this);
          this.$Message.info("导出失败！！！");
        });
    },
    remindUnReadUser() {
      //未读人员提醒
      let data = {
        newsId: this.newsId
      };
      this.$util.hintShow(this);
      this.$api.post("omweb/newsRead/remindUnReadUser", data, r => {
        setTimeout(() => {
          this.$util.hintHide(this);
        }, 500);
      });
    }
  },
  mounted() {
    this.newsId = this.$route.params.id;
    this.getReadList();
  }
};
</script>
<style lang="scss" scoped>
.kong {
  text-align: center;
  padding-top: 96px;
  img {
    height: 120px;
    width: 120px;
  }
  p {
    margin-top: 16px;
    line-height: 32px;
    font-size: 16px;
    color: #aaa;
  }
}
.pageview {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  font-size: 12px;
  .PV_content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .PV_tab {
      height: 32px;
      width: 100%;
      background: #eeeeee;
      li {
        float: left;
        width: 79px;
        line-height: 32px;
        text-align: center;
        margin-left: 1px;
        color: #f5f5f5;
        background: #cccccc;
        cursor: pointer;
      }
      .active {
        background: #fff;
        color: #cc0001;
      }
    }
    .PV_list {
      flex: 1;
      padding: 16px;
      overflow: auto;
     .derive{
        width: 80px;
        background: #cc0001;
        border-color: #cc0001;
        margin-right: 16px;
        color:#f6cfd0
      }
      .remind{
          color:#e0e1ff;
          width: 96px;
          background: #0060d0;
          border-color: #0060d0;
      }
      table {
        width: 544px;
        border-collapse: collapse;
        margin-bottom: 48px;
        tr {
          color: #9a9a9a;
          &:nth-of-type(1) {
            color: #e0e0e0;
          }
          td {
            height: 39px;
            border-bottom: 1px solid #eeeeee;
          }
          .name {
            width: 145px;
          }
          .depattment {
            width: 216px;
          }
          .time {
            position: relative;
            span {
              position: absolute;
              top: 43%;
              left: 55px;
              height: 0;
              width: 0;
              border: 5px solid;
              border-color: transparent;
              border-top-color: #e0e0e0;
            }
          }
          ._time {
            padding-left: 50px;
          }
        }
      }
      .aggregate {
        height: 48px;
        color: #dfdfdf;
      }
    }
  }
}
</style>

