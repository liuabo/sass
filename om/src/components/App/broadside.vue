<template>
  <div class="broadside">
    <div class="company"><input type="text" placeholder="请输入公司名" @focus="getFindCorpInfoList" v-model="corpName"><Icon size=18 type="search"></Icon></div>
    <ul v-if='isShow' class="corpList">
        <span class="triangle"></span><span class="smallTG"></span>
        <li class="corpItem" v-if="loading">
          <Spin fix>
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
          </Spin>
        </li>
        <li class="corpItem ellipsis" v-for="(item,i) in list" :key="i" @click="isCorp(item)">
          <span>{{item.corpName}}</span>
        </li>
    </ul>
    <ul v-else class="app_list">
        <!-- <router-link tag="li" :to="app.path" :class="{active : active == app.path}" v-for="app in apps" :key="app.id" >{{app.name}}</router-link> -->
      <li @click="goto(app.id,app.path)" :class="{act : active == app.id}" v-for="app in apps" :key="app.id" >{{app.name}}</li>
    </ul>
  </div>
</template>
<script>
import SHeader from "./header";
export default {
  name: "broadside",
  props: ["active", "goto", "changeKey"],
  data() {
    return {
      isShow: false,
      corpName: sessionStorage["corpName"],
      list: [],
      apps: [
        { id: 111, name: "新闻动态", path: "/app/newsIndex" }
        // {id:112,name:'协同办公',path:"/app/coopetactiveWork"},
      ],
      loading:false,
    }
  },
  methods: {
    getFindCorpInfoList() {
      this.list = [];
      this.isShow = true;
      let data = {
        corpName:this.corpName,
        pageNum:1,
        pageSize:10
      }
      this.loading = true
      this.$api.post('omweb/news/findCorpInfoList',data,r=>{
          this.list = r.data.list
          this.loading = false
      })
    },
    isCorp(item) {
      this.isShow = false;
      if (sessionStorage["corpId"] == item.corpid) {
        return;
      }
      this.corpName = item.corpName;
      sessionStorage["corpId"] = item.corpid;
      sessionStorage["corpName"] = item.corpName;
      this.changeKey();
    }
  },
  watch: {
    corpName(n, m) {
      if (n.length != m.length) {
        if (this.isShow) {
          this.getFindCorpInfoList();
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.broadside {
  background-color: #888888;
  height: 100%;
  width: 100%;
  position: relative;
  .company {
    height: 48px;
    width: 100%;
    background: #666666;
    position: relative;
    input {
      height: 24px;
      width: 125px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 12px;
      line-height: 24px;
      padding-left: 24px;
      font-size: 12px;
    }
    i {
      position: absolute;
      top: 14px;
      left: 25px;
      color: #757575;
    }
  }
  .corpList {
    width: 100%;
    position: absolute;
    top: 58px;
    left: 24px;
    width: 160px;
    background: #fff;
    padding: 1px;
    box-shadow: 0px 0px 50px 2px rgba(0, 0, 0, 0.5);
    z-index: 9999;
    .corpItem {
      width: 100%;
      height: 32px;
      font-size: 16px;
      font-weight: 400;
      border-bottom: 1px solid #eeeeee;
      line-height: 32px;
      color: #b6b6b6;
      padding-left: 18px;
      &:hover {
        background: #cc0001;
        color: #ffd8d2;
      }
    }
    .triangle {
      width: 0;
      height: 0;
      border-bottom: 16px solid #fff;
      border-right: 16px solid transparent;
      position: absolute;
      top: -16px;
      left: 0;
      z-index: 1;
    }
  }
  .app_list {
    width: 100%;
    li {
      width: 100%;
      height: 63px;
      font-size: 16px;
      font-weight: 400;
      border-bottom: 1px solid #808080;
      text-align: center;
      line-height: 64px;
      color: #fff;
      &:hover {
        background: #666;
      }
    }
    .router-link-exact-active {
      background-color: #cc0001 !important;
    }
    .act {
      background-color: #cc0001 !important;
    }
  }
}
li {
  cursor: pointer;
}
</style>
