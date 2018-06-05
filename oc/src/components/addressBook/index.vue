<template>
  <div class="menu">
    <div class="lay iconfont">
      <div class="menu_head">
        <div class="menu_head_top">
          <div style="display:flex;">
            <div class="search">
              <i class="icon">
                <Icon type="ios-search-strong"></Icon>
              </i>
              <input v-model='search' placeholder="搜索部门、成员、标签" />
            </div>
            <i @click="add" v-if="showde" class="add">
              <Icon type="ios-plus-outline"></Icon>
            </i>
            <i @click="addLa" v-if="!showde" class="add">
              <Icon type="ios-plus-outline"></Icon>
            </i>
          </div>

          <div class="tabs">
            <div class="Active" :class="{'active_04':Index === index}" @click="changeBgc(index)" v-for="(item, index) in list" :key="index">{{item}}</div>
          </div>
        </div>
        <div v-show="showde" class="tabs_content">

          <div id="menu_list">
            <treeMenu/>
          </div>
        </div>
        <div v-show="labe" class="label">
          <ul>
            <li :class="{active_03:index== activeIndex}" @click="showlabel(index,item.tagId,item.tagName)" v-for="(item, index) in label" :key="index">
              <span><img style="position:relative;top:7px;" :src="pic.labPic" /> {{item.tagName}}</span>
              <font-awesome-icon @click="GoLabPop" id="ic" :icon="['fas','bars']" />
            </li>
          </ul>
          <Modal id="label" v-model="modal5" width="100">
            <div id="poper" style="text-align:center">
              <a @click="ModifyTag" style="display:block;" href="javascript:;">修改名称</a>
              <a @click="delLabel" style="display:block;" href="javascript:;">删除</a>
            </div>
            <div slot="footer">
              <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
            </div>
            <!-- 修改弹窗 -->
          </Modal>
          <!-- 添加标签弹窗 -->
          <Modal id="labeG" v-model="modal8" width="100">
            <div style="text-align:center">
              <input placeholder="请输入标签名称" ref="laValue" id="laValue" style="width: 208px;height:32px;background:#fff; margin-top:24px;" />
            </div>
            <div slot="footer">
              <Button type="error" size="small" @click="modal8 = false">取消</Button>
              <Button type="error" size="small" @click="addLabel">确定</Button>
            </div>
          </Modal>
          <Modal id="labeG" v-model="modal7" width="100">
            <div style="text-align:center">
              <Input v-model="tagName" style="width: 208px;height:32px;background:#fff; margin-top:20px;" />
            </div>
            <div slot="footer">
              <Button type="error" size="small" @click="modal7 = false">取消</Button>
              <Button type="error" size="small" @click="affirmTag">确定</Button>
            </div>
          </Modal>
          <Modal id="ivu" v-model="modal6" width="400" height='100px'>
            <div style="text-align:center">
              <p style="font-size:20px;margin-top:20px;">你确定要删除该标签 吗?</p>
            </div>
            <div slot="footer">
              <Button type="error" size="small" @click="modal6 = false">取消</Button>
              <Button type="error" size="small" @click="sureDelLabel">确定</Button>
            </div>
          </Modal>
        </div>
        <Modal id="ivu" v-model="modal4" width="400" height='100px'>
          <div style="text-align:center">
            <Input v-model="Value" style="width: 300px" />
          </div>
          <div slot="footer">
            <Button type="error" size="small" @click="modal4 = false">取消</Button>
            <Button type="error" size="small" @click="showOverlay">确定</Button>
          </div>
        </Modal>
        <Modal id="ivu-modal" v-model="modal2" width="360">
          <div style="text-align:center">
            <input type="text" style="margin:20px 0" placeholder="输入部门名称" ref="ipt_01" id="append">
          </div>
          <div slot="footer">
            <Button type="error" @click="modal2 = false" size="small">取消</Button>
            <Button type="error" size="small" @click="addChild">确定</Button>
          </div>
        </Modal>
        <Modal id="modal1" v-model="modal1" width="360">
          <div style="text-align:center">
            <input type="text" style="margin:20px 0" ref="secName" placeholder="输入部门名称" id="append">
            <Row class="secList">
              <Col span="12">
              <input class="addSecPop" :value='secName' @click="isOpFlag = true" />
              <Icon class="down" style="position:absolute;top:12px;right:6px;" type="arrow-down-b"></Icon>
              <treeMenu_ class="popp" v-if="isOpFlag" :receive='receive' />
              </Col>
            </Row>
          </div>
          <div slot="footer">
            <Button type="error" @click="modal1 = false" size="small">取消</Button>
            <Button type="error" size="small" @click="addChildHead">确定</Button>
          </div>
        </Modal>
      </div>
      <Layout>
        <Content :style="{boxSizing: 'border-box', background:'#fff'}">
          <div style="height:100%;background:#fff;overflow:hidden">
            <router-view/>
          </div>
        </Content>
      </Layout>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import commHead from "./commHead";
import depage from "./depage";
import derive from "./derive";
import labUser from "./labUser";
import Bus from '../../assets/js/bus';
import labPic from '../../assets/images/labPic.png'
import treeMenu from './TreeControl'
import treeMenu_ from './addSec'

export default {
  name: "treeExpand_module",
  components: { commHead, derive, depage, labUser, treeMenu, treeMenu_ },
  data() {
    return {
      pic: { labPic },
      testFlag: false,
      secName: '',
      config: '',
      UserNum: 0,
      tagId: '',
      taId: '',
      moveIndex: '',
      Value: '',
      tagName: '',
      alter: 'dd',
      parentID: '',
      text: '',
      topTitle: '',
      tagId: '',
      search: '',
      isOpFlag: false,
      checked: false,
      isOpen: false,
      addFlag: true,
      showsele: true,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      modal7: false,
      modal8: false,
      modal9: false,
      modal10: true,
      showalter: true,
      showH: false,
      showde: true,
      labe: false,
      isActive: false,
      isAction: '',
      activeIndex: '',
      no: false,
      hasChildren: -1,
      open: false,
      toFlag: false,
      Index: 0,
      Ind: "",
      Inde: "",
      listData: '',
      event: '',//事件源
      data1: [],
      list: ["部门", "标签"],
      label: [],
      section: [],
      secPopList: [],//修改部门弹窗
      cityList: [],
      model11: '',
      model12: []
    };
  },
  methods: {
    updata(id, name) {
      console.log(name);

      let data = {
        departmentId: id,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('/department/member/list', data, res => {
        console.log(this.section.text);
        this.topTitle = this.section.text
        Bus.$emit('UserList', res, name, id)
        this.UserNum = res.data.data.length
        Bus.$emit('UserNum', this.UserNum, this.section.text)
      })
    },
    changeBgc(index) {
      if (index === 0) {
        this.showde = true;
        this.labe = false;
        this.$router.history.push({ path: '/app/addressBook/' })
        let data = {
          departmentId: 0,
          pageNum: 1,
          pageSize: 10
        }
        this.$axiosApi.get('department/list_one_level', data, res => {
          this.section = res.data.data
          this.topTitle = res.data.data[0].name
          // console.log(res.data.data[0].name);

          Bus.$emit('UserName', this.topTitle)
        })
      } else if (index == 1) {
        this.showde = false;
        this.labe = true;
        this.$router.history.push({ name: 'labUser', params: { fid: 7 } })
      }
      this.Index = index;
    },
    show_hover(index) {
      this.label[index].isActive = !this.isActive;
      console.log(this.label[index].isActive);
    },
    addSection() {
      this.modal9 = false
      this.modal2 = true;
      this.showsele = true;
    },
    amendSection() {
      this.showsele = false;
      this.modal4 = true;
      this.modal9 = false;
    },
    delSection() {
      this.modal3 = true;
      this.modal9 = false;
    },
    changeClass(index) {
      this.isAction = index;
      this.showH = !this.showH;
      this.modal9 = false
      console.log(name);
      if (index == 1) {
        this.showsele = false;
        this.modal4 = true;
      } else if (index == 0) {
        console.log("aaa");
        this.modal2 = true;
        this.showsele = true;
      } else if (index == 2) {
        this.modal3 = true;
      }
    },
    add() {
      this.modal1 = true;
      console.log(this.modal1);

    },
    showlabel(index, id, name) {
      console.log(222222222);
      this.taId = index
      this.tagId = id;
      this.tagName = name;
      this.activeIndex = index;
      Bus.$emit("gogo", id, name)
      this.$router.history.push({ name: 'labUser', params: { fid: id } })

    },
    //添加部门
    addChild() {
      let param = {
        name: this.$refs.ipt_01.value || this.$refs.secName.value,
        parentId: this.parentID
      }
      this.modal2 = false;
      var token = sessionStorage['token']
      let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }
      axios.post(this.$url_ + '/department/add', param, config).then(r => {
        this.callback()
      });
    },
    //删除数据
    affirm() {
      this.modal3 = false

      let data = {
        departmentId: this.parentID,
      }
      this.$axiosApi.post('/department/remove', data, res => {
        this.callback()
      })
    },
    // 修改数据
    showOverlay() {
      this.modal4 = false

      let data = {
        name: this.Value,
        departmentId: this.parentID
      }
      this.$axiosApi.post('/department/modify', data, res => {
        this.callback();
      })
    },
    callback() {
      let data = {
        departmentId: 0,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('department/list_one_level', data, res => {
        this.section = res.data.data
        this.topTitle = res.data.data[0].name
        // console.log(res.data.data[0].name);

        Bus.$emit('UserName', this.topTitle)
      })
    },

    getlabel() {
      let data = {
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('/tags/list', data, res => {
        this.label = res.data.data
      })
    },
    //标签操作
    delLabel(id) {
      this.modal5 = false
      this.modal6 = true
    },
    //删除便签
    sureDelLabel() {
      this.modal6 = false
      console.log(this.tagId);

      let data = {
        tagId: this.tagId,
      }
      console.log(data);

      this.$axiosApi.post('/tags/remove', data, res => {
        this.getlabel()
      })
    },
    //修改标签名称
    ModifyTag() {
      this.modal5 = false
      this.modal7 = true

    },//修改弹窗
    addLa() {
      this.modal5 = false
      this.modal8 = true
    },
    //添加标签
    addLabel() {
      this.modal5 = false
      this.modal8 = false
      let data = {
        tagName: this.$refs.laValue.value,
      }
      var token = sessionStorage['token']
      let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }
      axios.post(this.$url_ + '/tags/add', data, config).then(res => {
        console.log(res);
        this.getlabel()
      });
    },
    //确认修改标签
    affirmTag() {
      this.modal7 = false
      let data = {
        tagId: this.tagId,
        tagName: this.tagName
      }
      setTimeout(() => {
        this.$axiosApi.post('/tags/modify', data, res => {
          this.getlabel()
        })

      }, 3000);
    },
    GoLabPop() {
      this.modal5 = true
      let oDiv_01 = document.getElementById('poper')
      oDiv_01.style.top = event.pageY - 100 + 'px'
    },
    addChildHead() {
      this.modal1 = false;
      this.addChild()
    },
    selectChange(value) {
      this.parentID = value
    },
    receive(id, name) {
      console.log(4567890);
      console.log(id);

      this.parentID = id
      this.isOpFlag = false
      this.secName = name
    },
    alert() {
      console.log('ghjkl;');

    }
  },
  computed: {

  },
  mounted() {
    this.callback()
    this.getlabel()
    Bus.$on('secName', (id, name) => {
      this.secName = name
    })
  }
};
</script>
<style lang="scss">
.popp {
  width: 208px;
  height: 300px;
  position: absolute;
  top: 38px;
  background: #fff;
  padding: 16px;
  overflow-y: auto;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  div {
    line-height: 20px;
  }
  cursor: pointer;
  color: #000;
  li {
    text-align: left;
  }
  .icon {
    display: none;
  }
}
//头部添加部门下拉样式
.secList {
  .ivu-select-dropdown {
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(247, 244, 244, 0.1);
    }
  }
}
//添加部门弹窗
.addSecPop {
  width: 208px;
  height: 32px;
  border-radius: 4px;
  padding-left: 6px;
  .down {
    position: absolute;
    top: 0;
  }
}
#deHea {
  height: 48px;
  background: #eee;
  display: flex;
  align-items: center;
}
.ivu-layout-header {
  padding-left: 24px !important;
  span {
    line-height: 48px;
  }
}
//添加部门弹窗样式
.ivu-col-span-12 {
  width: 100%;
}
//添加弹窗文本域
#addsel {
  width: 208px;
  height: 32px;
  border: 1px solid #d00;
  position: absolute;
  top: 20px;
  .sj {
    font-size: 16px;
    line-height: 32px;
    position: absolute;
    right: 8px;
  }
}

//部门弹窗
#secPop {
  .ivu-modal-content {
    background: rgba(0, 0, 0, 0);
  }
  .ivu-modal-footer {
    border: none;
  }

  .ivu-modal-close {
    display: none;
  }
  .ivu-modal {
    position: static;
  }
}
#poper {
  width: 98px;
  height: 56px;
  border-radius: 4px;
  background: #fff;
  position: absolute;
  left: 386px;
  top: 100px;
  a {
    color: #000;
    padding: 10px 10px;
    &:hover {
      background: #cc0000;
    }
  }
}
//标签修改弹窗
#labeG {
  .ivu-modal-content {
    width: 240px;
    height: 160px;
    background: #eee;
    margin: 0 auto;
  }
  .ivu-modal-close {
    display: none;
  }
  .ivu-modal-footer {
    position: relative;
    top: -10px;
    .ivu-btn-error {
      width: 96px;
      height: 32px;
      &:first-child {
        background: #ccc;
        border: 1px solid #ccc;
      }
    }
  }
}
//标签弹窗
#label {
  .ivu-modal {
    background: rgba(0, 0, 0, 0);
  }
  .ivu-modal-content {
    width: 98px;
    height: 56px;
    // position: absolute;
    // left: 386px;
    // top: 78px;
    background: rgba(0, 0, 0, 0);
  }
  .ivu-modal-footer {
    display: none;
  }
  .ivu-modal-close {
    display: none;
  }
  .ivu-modal-body {
    padding: 0;
    a {
      padding: 5px 0;
    }
  }
}
//删除部门弹窗
#ivu .ivu-modal .ivu-modal-content {
  width: 400px !important;
  height: 148px !important;
}
#ivu .ivu-modal-body {
  line-height: 50px;
}
#ivu {
  p {
    margin-top: 20px;
  }
  .ivu-modal-content {
    height: 100px !important;
  }
}
.active_03 {
  background: #cc0000;
  color: #fff;
}
.active11 {
  background: #cc0000;
  color: #fff;
}
//修改部门弹窗
#append {
  display: block;
  border: 1px solid #a0aab4;
  width: 208px;
  height: 32px;
  border: none;
  border-radius: 4px;
  padding-left: 8px;
  &::-webkit-input-placeholder {
    color: #ddd;
    padding-left: 5px;
  }
  &:-moz-placeholder {
    color: #ddd;
    padding-left: 5px;
  }
  &::-moz-placeholder {
    color: #ddd;
    padding-left: 5px;
  }
  &:-ms-input-placeholder {
    color: #ddd;
    padding-left: 5px;
  }
  // margin-top: 40px;
}
#sele {
  width: 208px;
  height: 32px;
  border: 1px solid #a0aab4;
  margin-top: 16px;
}
#ivu-modal {
  .ivu-modal-close {
    display: none;
  }
  .ivu-modal {
    width: 240px;
    height: 210px;
    .ivu-modal-content {
      width: 240px;
      height: 152px;
      background: #eee;
      border: none;
    }
    .ivu-modal-footer {
      width: 100%;
    }
  }
  .ivu-btn-text {
    background: #ccc;
  }
  .ivu-btn-primary {
    background: #cc0000;
    margin-left: 80px;
  }
}

#modal1 {
  .ivu-modal-close {
    display: none;
  }
  .ivu-modal {
    width: 240px;
    height: 210px;
    .ivu-modal-content {
      width: 240px;
      height: 184px;
      background: #eee;
      border: none;
    }
    .ivu-modal-footer {
      width: 100%;
    }
  }
  .ivu-btn-text {
    background: #ccc;
  }
  .ivu-btn-primary {
    background: #cc0000;
    margin-left: 80px;
  }
}
//操作部门弹窗
#handle {
  width: 98px;
  background: #fff;
  position: fixed;
  z-index: 99999;
  // top: 100px;
  left: 272px;
  .tril {
    width: 0;
    height: 0;
    border-width: 24px;
    border-style: solid;
    border-color: transparent #fff transparent transparent;
    position: absolute;
    top: -24px;
    right: 0;
    z-index: -1;
  }
  ul {
    li {
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      border-bottom: 2px solid #f6f6f6;
      box-sizing: border-box;
      margin: 0 1px;
      &:li {
        background-color: red;
      }
      &:hover {
        background: #cc0000;
        color: #fff;
      }
    }
  }
}

.active_01 {
  background: #ccc;
}
// .active_02 {
//   background: #cc0000;
//   color: #fff!important;
// }
.active_04 {
  background: #cc0000;
  color: #fff !important;
}

.flagS {
  display: block;
  // margin-left: 24px;
  padding-left: 20px;
}

.menu {
  height: 100%;
  display: flex;
  box-sizing: border-box;
  color: #4c4c4c;
  // position: relative;
  .menu_head {
    width: 240px;
    padding: 16px 0;
    background-color: #eee;
    border-right: 1px dotted #dce1e6;
    box-sizing: border-box;
    padding: 0 16px;
    .label {
      position: relative;
      #ic {
        position: absolute;
        right: 18px;
        margin-top: 8px;
        margin-right: 4px;
      }
      li {
        cursor: pointer;
        line-height: 30px;
        font-size: 14px;
        img {
          transform: scale(0.7);
        }
        span {
          padding-left: 10px;
        }
        &:hover {
          background: rgba(235, 49, 49, 0.1);
        }
      }
    }
    .menu_head_top {
      width: 208px;
      height: 81px;
      margin-top: 16px;

      .tabs {
        display: flex;
        width: 208px;
        margin: 0 auto;
        margin-top: 10px;
        border: 1px solid #b4bec8;
        border-radius: 4px;
        & > div:first-child {
          border-right: 1px solid #b4bec8;
          // background: #cc0000;
        }
        & > div {
          font-size: 12px;
          width: 104px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          color: #b4bec8;
        }
      }
    }
    .search {
      width: 176px;
      height: 24px;
      background: #fff;
      border-radius: 4px;
      color: #ddd;
      .icon {
        display: inline-block;
        width: 12px;
        height: 12px;
        padding: 0 4px;
      }
      input {
        width: 130px;
        height: 24px;
        font-size: 12px;
        border: none;
        // line-height: 24px;
        border-radius: 4px;
      }
      input::-webkit-input-placeholder {
        color: #ddd;
      }
      input:-moz-placeholder {
        color: #ddd;
      }
      input::-moz-placeholder {
        color: #ddd;
      }
      input:-ms-input-placeholder {
        color: #ddd;
      }
    }
    .add {
      display: inline-block;
      width: 25px;
      height: 25px;
      font-weight: 900;
      margin-left: 8px;
      text-align: center;
      color: #000;
      .ivu-icon {
        font-size: 24px;
        font-weight: 900;
        color: #fff;
      }
    }
    .tabs_content {
      height: 80%;
      overflow: auto;
      font-size: 14px;
      position: relative;
      cursor: pointer;
      -moz-user-select: none;
      -o-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
      transition: all 2s;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(247, 244, 244, 0.1);
      }
      #menu_list {
        .icon {
          display: inline-block;
          width: 27px;
          // height:24px;
          font-size: 12px;
          position: absolute;
          right: 6px;
          margin-top: 2px;
          .svg-inline--fa {
            position: relative;
            left: 8px;
          }
        }
        div {
          height: 24px;
        }
      }
      .aStyle {
        display: inline-block;
        width: 150px;
        text-align: left;
      }
      .tab {
        font-weight: 100;
        color: #464646;
        border-radius: 4px;
      }
      li {
        line-height: 30px;
      }
    }
  }
}
.ivu-layout-sider {
  width: 240px !important;
  min-width: 240px !important;
  max-width: 240px !important;
}
.ivu-layout-sider {
  background: #ddd;
}

.lay {
  height: 100%;
  width: 100%;
  background: #fff;
  display: flex;
  border-radius: 4px;
  .ivu-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    .ivu-layout-content {
      overflow-x: hidden;
    }
  }
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
</style>
