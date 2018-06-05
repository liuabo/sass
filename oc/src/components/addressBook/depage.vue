<template>
  <div class="con">
    <Header id="deHea">
      <span>{{topTitle}}</span>
      <span>（{{UserNum}}）人</span>
    </Header>
    <nodata v-if="isNodata" />
    <div v-if="!isNodata" class="retract">
      <div class="btn">
        <router-link :to="{ name: 'addMembers' }">
          <Button @click="offDe = false" class="add_style ivu-btn_01">
            <Icon style="margin-right:4px;" type="plus-round"></Icon>添加成员</Button>
        </router-link>
        <router-link :to="{ name: 'toLead' }">
          <Button class="ivu-btn_02">批量导入/导出</Button>
        </router-link>
        <div style="display:inline-block;height:30px;line-height:30px;-moz-margin-top:10px;">

          <Button class="ivu-btn_02" @click="gotoPoP">导出通讯录</Button>
          <Button class="set ivu-btn_03" @change='handleAge' @click="setScting">设置所在部门</Button>
          <Modal id="popup" v-model="modal3" :mask-closable="false">
            <secPop :sendSecList='sendSecList' :isToFlag='isToFlag' />
            <div slot="footer">
              <!-- <Button type="error" @click="modal3 = false">取消</Button>
              <Button type="error" @click="savSec">确定</Button> -->
            </div>
          </Modal>
          <Button style="background:#cc0000;height:30px;" @click="judge">
            <Icon type="ios-trash"></Icon>删除</Button>
        </div>
        <Modal v-model="modal4" width="360">
          <div style="text-align:center">
            <p>删除后，成员的企业微信消息记录将完全被清除。</p>
          </div>
          <div slot="footer">
            <Button type="error" size="large" @click="delUser">Delete</Button>
          </div>
        </Modal>
        <h1>{{sectionId}}</h1>
      </div>
      <div v-if="offDe" class="content">
        <table>
          <thead class="th_style_1">
            <tr class="th_style" style="border:none!important;">
              <th class="ww_checkbox"><input style="margin-left:2px;margin-right:14px;" type="checkbox" v-model="checkAll" @click="handleCheckAll" /></th>
              <th class="ww_table">姓名</th>
              <th class="ww_table">职务</th>
              <th class="ww_table">部门</th>
              <th class="ww_table">手机</th>
              <th class="ww_table">邮箱</th>
            </tr>
          </thead>

          <tr class="tr_title">
            <div class="th_style" v-for="(item,index) in data1" :key="index">
              <th class="ww_checkbox"><input type="checkbox" @click="getUserId(item.userId,item.name,item)" :value="item.userId" v-model="checkArr" /></th>
              <th style="margin-left:-2px;">
                <a @click="gotoDetail(item.userId)" href="javascript:;">{{item.name}}</a>
              </th>
              <th class="ellipsis_01">
                <a @click="gotoDetail(item.userId)" href="javascript:;">{{item.position || '未设置'}}</a>
              </th>
              <th>
                <a @click="gotoDetail(item.userId)" v-for="(items,index) in item.department_list" :key='index' href="javascript:;">{{items.name || '未设置' | spliceLength(4)}}</a>
              </th>
              <th>
                <a @click="gotoDetail(item.userId)" href="javascript:;">{{item.mobile || '未设置'}}</a>
              </th>
              <th>
                <a @click="gotoDetail(item.userId)" href="javascript:;">{{item.email || '未设置'}}</a>
              </th>
              <font-awesome-icon @click="showR()" id="redact" :icon="['fas','ellipsis-v']" />

            </div>
            <Modal id="sol" v-model="modal2">
              <div ref="myBox" class="redactpop">
                <ul>
                  <li>编辑</li>
                  <li @click="stick()">置顶</li>
                </ul>
              </div>
              <div slot="footer">
              </div>
            </Modal>
          </tr>

        </table>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import axios from 'axios';
import derive from './derive';
import Vue from 'Vue';
import commHead from './commHead';
import nodata from "./nodata";
import Bus from '../../assets/js/bus';
import secPop from './labelPop'
var num = 0;
export default {
  name: "depage",
  props: ['sectionId'],
  components: { derive, commHead, nodata, secPop },
  data() {
    return {
      sendSecList: '',
      count: 0,
      str: [],
      userBox: '',
      userBox_01: [],
      secNum: '',
      config: '',
      topTitle: '',
      UserNum: 0,
      offDe: true,
      modal2: false,
      modal3: false,
      modal9: false,
      isNodata: false,
      modal4: false,
      userSEC: [],
      data2: [],
      data3: [],
      Id: '',
      UserId: '',
      UUID: [],
      getSetData: '',
      setUser: [],
      showRFlag: false,
      checkAll: false,
      checkArr: [],
      count: 0,
      UserIID: '',
      setList: '',
      deList: [],
      userIdList: [],
      num: 10,
      setSecList: [],
      model1: "",
      data1: []
    };
  },
  methods: {
    goto(id) {
      if (id == 0) {
        this.$router.history.push({ name: "toLead" });
      } else {
        this.modal8 = !this.modal8;
      }
    },
    changTitle() {
      this.$router.history.push({ name: "detail" });
    },
    handleCheckAll() {
      if (!this.checkAll) {
        this.checkArr = this.data1.map(item => {
          this.checkArr = true
          this.setSecList.push(item)
          this.userSEC.length = this.num
          if (item.department_list.length > 1) {
            this.userIdList += item.userId + ','
            var arr = []
            item.department_list.forEach(element => {
              arr.push(element.depId)
              var a = [...new Set(arr)]
              this.setList = a.join(',')
            });
            this.setList = this.setList.split(this.userBox_01).join("");
          } else {
            this.deList += item.id + ','
          }
          return item.userId
        })
      } else {
        this.checkArr = []
      }

    },
    handleAge(evt) {
      console.log(evt.target.value); // 接收从子组件传过来的当前对象
    },
    showR(id) {
      this.UserId = id
      this.modal2 = true
    },
    //置顶
    stick(id) {

      console.log(userId);
      let data = {
        departmentId: this.userBox_01,
        userId: this.UserId
      }
      this.$axiosApi.post('/department/member/stick', data, res => {
        this.data1 = res.data.data
      })
    },
    gotoDetail(id) {
      this.$router.history.push({ name: 'detail', params: { fid: id } })
    },
    getUserId(id, name, item) {
      var isHas = this.setSecList.some((it, i) => {
        if (item.userId == it.userId) {
          this.setSecList.splice(i, 1);
          return true;
        } else {
          return false;
        }
      });
      if (!isHas) {
        this.setSecList.push({ name: name, userId: id });
      }

      if (item.department_list.length > 1) {
        var isHas = this.userIdList.some((it, i) => {
          if (item.userId == it.userId) {
            this.userIdList.splice(i, 1);
            return true;
          } else {
            return false;
          }
        });
        if (!isHas) {
          this.userIdList.push({ userId: id });
        }
        var arr = []
        item.department_list.forEach(element => {
          arr.push(element.depId)
          var a = [...new Set(arr)]
          this.setList = a.join(',')
        });
        this.setList = this.setList.split(this.userBox_01).join("");
      } else {
        var isHas = this.deList.some((it, i) => {
          if (item.userId == it.userId) {
            this.deList.splice(i, 1);
            return true;
          } else {
            return false;
          }
        });
        if (!isHas) {
          this.deList.push({ userId: id });
        }
      }
      this.UserIID += id + ','
      this.userSEC.push(name)
      this.getSetData = [...new Set(this.userSEC)].join(',')
      this.userBox = item
    },
    gotoPoP() {
      this.modal3 = true
    },
    savSec() {
      this.modal3 = false
      this.$refs.getInit.saveSec()
    },
    delUser() {
      var arr = []
      this.userIdList.forEach((item, index) => {
        arr.push(item.userId)
        console.log(arr);
        
      })
      var arr1 = []
      this.deList.forEach((item, index) => {
        arr1.push(item.userId)
      })
      let data = {
        userIds: arr1.join()
      }
      let data1 = {
        departmentId: this.userBox_01,
        userIds: arr.join()
      }
      var token = sessionStorage['token']
      // this.$axiosApi.post('/member/remove', data, res => {
      // })
      if( arr1 != '' ) {
        this.$axiosApi.post('/member/remove', data, res => {
        })
      }
      if( arr != '' ) {
        var token = sessionStorage['token']
          let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }
          axios.post(this.$url_ + '/member/users_dept/del', data1, config).then(res => {
            console.log(res);
          });
        //   this.$axiosApi.post('/member/users_dept/del', data1, res => {
        // })
      }
      
      var config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }
      this.modal4 = false
    },
    judge() {
      if (this.checkArr.length != '') {
        this.modal4 = true
      } else {
        this.$Message.info('未选中任何成员');
      }
    },
    getList(id) {
      let data = {
        departmentId: id,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('/department/member/list', data, res => {
        this.data1 = res.data.data
        this.UserNum = this.data1.length
      })
      let data1 = {
        departmentId: 0,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('department/list_one_level', data1, res => {
        this.theModel = res.data.data
        this.len = res.data.data.length
        console.log(res.data.data[0].name);
        
        this.topTitle = res.data.data[0].name
      })
    },
    setScting() {
      if (this.userSEC.length != 0) {
        this.modal3 = true
        console.log(this.setSecList);
        
        // return
        this.sendSecList = this.setSecList
        console.log(this.sendSecList);
        
      } else {
        this.$Message.info('未选中任何成员');
      }
    },
    getSecName() {
      let data = {
        departmentId: 1,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('department/list_one_level', data, res => {
        return
        this.topTitle = res.data.data.name
      })
    },
    isToFlag() {
      this.modal3 = false
    }
  },
  watch: {
    checkArr() {
      if (this.checkArr.length === this.data1.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
  },
  mounted() {
    Bus.$on('UserName', (name) => {
      this.topTitle = name
      this.UserNum = this.data1.length
    })
    Bus.$on('UserList', (list, name, id) => {
      this.topTitle = name
      this.data1 = list.data.data
      this.data3 = list.data.data
      this.UserNum = this.data3.length
      this.userBox_01 = id
      if (this.data3.length == 0) {
        this.isNodata = true
      } else {
        this.isNodata = false
      }
    })
    this.getList(1)
    this.getSecName()
  },
  created() {
    Bus.$on('UserList', (list, name, id) => {
      this.topTitle = name
      this.data1 = list.data.data
      this.data3 = list.data.data
      this.UserNum = this.data3.length
      this.userBox_01 = id
      if (this.data3.length == 0) {
        this.isNodata = true
      } else {
        this.isNodata = false
      }
    })
  }
};
</script>

<style lang="scss">
.ellipsis_01 {
  width: 184px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
//编辑弹窗
#sol {
  .ivu-modal-content {
    width: 100%;
    height: 56px;
    background-color: rgba(0, 0, 0, 0);
  }
  .ivu-modal-footer {
    display: none;
  }
  .ivu-modal-close {
    display: none;
  }
  .ivu-modal-body {
    width: 100% !important;
    padding: 0;
  }
  .ivu-modal {
    width: 100% !important;
  }
  .redactpop {
    width: 100px;
    background: #fff;
    border-radius: 5px;
    font-size: 12px;
    position: absolute;
    top: 156px;
    right: 10px;
    text-align: center;
  }
}
//导出通讯录弹窗
#popup {
  .ivu-modal {
    top: 20px;
    .ivu-modal-content {
      width: 400px;
      height: 420px;
      .ivu-modal-body {
        padding: 0;
        height: 100%;
        /*滚动条样式*/
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
  }
  .ivu-modal-footer {
    width: 200px;
    position: absolute;
    right: 0;
    border: none;
  }
  .ivu-modal-close {
    display: none;
  }
}
#sele {
  color: red;
  .ivu-select-selected-value {
    background: #f7f7f7 !important;
  }
  .ivu-select-placeholder {
    width: 110px;
    color: #495060;
  }
}

#derive {
  .ivu-modal-content {
    width: 400px;
    height: 420px;
    .ivu-modal-body {
      max-height: 374px;
      padding: 20px 30px;
      overflow-y: auto;
      .pop_left {
        max-width: 270px;
        float: left;
      }
      .pop_right {
        width: 50%;
        float: right;
        background: darkred;
      }
    }

    .ivu-modal-footer {
      position: absolute;
      left: 20px;
      right: 20px;
      bottom: 12px;
    }
  }
}

.con {
  flex: 1;
  .retract {
    box-sizing: border-box;
  }
  .btn {
    margin: 16px 0;
    padding: 6px 10px;
    background: #fff;
    line-height: 44px;
    .ivu-icon {
      font-size: 16px;
      position: relative;
      left: -5px;
      top: 1px;
    }
    .ivu-btn_01:hover {
      border: none;
      background: rgba(170, 3, 3, 1) !important;
    }
    .ivu-btn_02:hover {
      border: none;
      background: rgba(208, 120, 4, 1) !important;
    }
    .ivu-btn_03:hover {
      border: none;
      background: rgba(2, 79, 167, 1) !important;
    }
    button {
      border: none;
    }
    .add_style {
      background: #cc0000 !important;
    }
    .set {
      background: #0060d0 !important;
    }
    .ivu-btn-primary {
      background: #ff9505;
    }
    .ivu-btn {
      color: #fff;
      background: #ff9505;
      height: 30px;
    }
    a {
      margin-right: 6px;
      border-radius: 2px;
      line-height: 30px;
      font-size: 14px;
      background: #fff;
    }
  }
  .ww_checkbox {
    width: 34px !important;
    height: 27px;
  }
  .content {
    height: 100%;
    table {
      width: 100%;
      border-collapse: separate;
      .th_style_1 {
        width: 100%;
        border-bottom: 1px solid #e4e6e9;
        height: 48px !important;
        border-collapse: collapse;
        th,
        tr {
          height: 48px !important;
          margin-bottom: 2px;
        }
      }
      .th_style {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 48px;
        cursor: pointer;
        border-bottom: 1px solid #e4e6e9;
        th {
          font-weight: 400;
          width: 184px;
          height: 48px;
          text-align: left;
          vertical-align: middle;
          line-height: 48px;
          font-size: 12px;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #redact {
          float: right;
          display: none;
        }
        &:hover {
          #redact {
            // display: inline-block;
          }
        }
      }
      thead {
        width: 100%;
        display: block;
        border-color: inherit;
        tr {
          display: table-row;
          vertical-align: inherit;
          border-color: inherit;
        }
      }
      .tr_title {
        span {
          display: inline-block;
          font-weight: 400;
          width: 101px;
          height: 26px;
          text-align: left;
          vertical-align: middle;
          line-height: 18px;
          font-size: 12px;
          padding-left: 10px;
        }
      }
    }
    #redactPop {
      // background: #fff;
      box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.3);
      position: absolute;
      right: 8px;
      top: 254px;
      z-index: 1000;
      li {
        width: 100px;
        height: 26px;
        padding: 0 10px;
        line-height: 26px;
        font-size: 12px;
      }
    }
  }
}
</style>
