<template>
  <div id="labUser">
    <commHead id="labHead" :topTitle='topTitle' />
    <div>
      <div v-if="!nodataFlag" class="btn">
        <router-link :to="{ name: '' }">
          <Button @click="isPopPup = true" class="add_style ivu-btn_01">
            <Icon style="margin-right:4px;" type="plus-round"></Icon>添加部门/成员</Button>
        </router-link>
        <Modal id="pop_01" v-model="isPopPup" width="360">
          <!-- <div style="text-align:center"> -->
          <Range ref="childen" class="balPop" :isFlag='isFlag' :isToFlag='isToFlag' v-if="isPopPup" />
          <!-- </div> -->
          <div slot="footer">
            <!-- <Button @click="modal2 = false" type="error">取消</Button>
							<Button @click="savSec" type="error">确定</Button> -->
          </div>
        </Modal>

        <router-link :to="{ name: 'toLead' }">
          <Button class="ivu-btn_02">导入标签</Button>
        </router-link>
        <router-link :to="{ name: 'toLead' }">
          <Button class="ivu-btn_02">导出标签</Button>
        </router-link>
        <a href="javascript:;">
          <Button class="ivu-btn_02" @click="shiftOut">移出</Button>
        </a>
      </div>
      <div v-if="!nodataFlag" style="padding-left:16px;">
        <table>
          <thead class="th_top">
            <tr>
              <th class="th_ww"><input type="checkbox" v-model="checkAll" @click="handleCheckAll" /></th>
              <th class="left">名称</th>
              <th class="right">部门</th>
            </tr>
          </thead>
        </table>
        <ul class="lab_content" v-for="(item,index) in list" :key="item.id">
          <li @click.self="goDetail(item.elementId,index,item.elementType)">
            <div>
              <input @click="check(item.elementId,item.elementType)" type="checkbox" :value="item.elementId" v-model="checkArr" />
              <span>{{item.elementName}}</span>
            </div>
            <div style="width:49%;display:flex;">
              <p v-for="(items,index) in item.departments_list" :key="index">
                {{items.name}}
              </p>
            </div>
          </li>
          <li v-for="item in labelList" @click.self="goDetail(item.elementId,index,item.elementType)" :key="item">
            <div>
              <input @click="check(item.elementId,item.elementType)" type="checkbox" :value="item.elementId" v-model="checkArr" />
              <span>{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div v-if="nodataFlag" id="nodata">
        <div>
          <img style="margin-top:30px;" :src="img.imgSrc" alt="">
          <p class="noUser">当前部门无任何成员</p>
          <button @click="isPopPup = true">
            <Icon style="margin-right:4px;display:inline-block;" type="plus-round"></Icon> 添加成员</button>
          <router-link :to="{ name:'toLead' }">
            <button>批量导入</button>
          </router-link>
          <router-link :to="{ name:'addMembers' }">
            <button>从其他部门导入</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import commHead from './commHead'
import Bus from '../../assets/js/bus';
import imgSrc from "../../assets/images/nodata.png";
import Range from './AddTags';

export default {
  name: 'labUser',
  props: ['tagId'],
  data() {
    return {
      modal1: false,
      checkAll: false,
      isPopPup: false,
      isLabel: false,
      nodataFlag: false,
      config: '',
      arr: '',
      labelList: [],
      list: [],
      data1: '',
      topTitle: '标签',
      labId: 3,
      checkArr: [],
      elementIdBox: [],
      elementTypeBox: [],
      img: { imgSrc },
      userIds: '',
      departmentIds: ''
    }
  },
  components: { commHead, Range },
  methods: {
    getData() {
      this.data1 = this.$route.params.fid
      let data = {
        tagId: this.labId,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('/tags/element/list', data, res => {
        this.list = res.data.data
        if (this.list.length == 0) {
          this.nodataFlag = true
        } else {
          this.nodataFlag = false
        }
      })
    },
    goDetail(id, index, elementType) {
      if (elementType == 2) {
        this.$router.history.push({ path: '/app/addressBook/' })
        this.$forceUpdate()
      } else {
        this.$router.history.push({ name: 'detail', params: { fid: id } })
      }
    },
    getStatus(urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    },
    handleCheckAll() {
      if (!this.checkAll) {
        this.checkArr = this.list.map(item => {
          this.checkArr = true
          let elementId = item.elementId
          let elementType = item.elementType
          this.elementIdBox.push({ elementId })
          this.elementTypeBox.push({ elementType })
          return item.elementId
        })
      } else {
        this.checkArr = []
      }
    },
    check(elementId, elementType) {
      this.elementTypeBox.push({ elementType, elementId })
    },
    shiftOut() {
      let data = {
        tagId: this.labId,
        element_list: this.elementTypeBox
      }
      var token = sessionStorage['token']
      let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }

      axios.post(this.$url_ + '/tags/element/remove', data, config).then(res => {
        this.getData()
      });
    },
    isToFlag(rightList) {
      rightList.forEach((item) => {
        if (item.type == 2) {
          this.userIds += item.depId + ','
        } else {
          this.departmentIds += item.depId + ','
        }
      })
      this.isPopPup = false
      this.labelList = rightList
      this.modal5 = false
      this.modal8 = false
      let data = {
        tagId: this.getStatus(this.$route.path),
        departmentIds: this.departmentIds,
        userIds: this.userIds
      }
      this.$axiosApi.post('/tags/element/add', data, res => {
        this.getlabel()
      })

    },
    fetchDate() {
      this.$router.go(-1)
    },
    //添加标签
    addLabel() {
      this.modal5 = false
      this.modal8 = false
      let data = {
        tagId: this.tagId,
        tagName: this.labelList,
        userCount: 9,
        deptCount: 1
      }
      this.$axiosApi.post('/tags/add', data, res => {
        this.getlabel()
      })
    },
  },
  created() {
    Bus.$on('gogo', (id, name) => {
      this.labId = id
      this.topTitle = name
      this.getData()
    })
  },
  mounted() {
    this.getData()
  },
  watch: {
    '$route'(to, from) {
      console.log(this.getStatus(this.$route.path))
    },
    checkArr() {
      if (this.checkArr.length === this.list.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    },
  },
}
</script>

<style lang="scss">
#pop_01 {
  background: firebrick;
  .ivu-modal-content {
    width: 400px;
    height: 420px;
    .ivu-modal-body {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 4px;
    }
    .ivu-modal-footer {
      width: 200px;
      float: right;
      border: none;
    }
    .ivu-btn-error {
      width: 64px;
      height: 24px;
      line-height: 12px;
      &:first-child {
        background: #888;
        border: none;
      }
    }
  }
}
#labelPop {
  width: 420px;
  height: 200px;

  .ivu-modal-body {
    padding: 0;
  }
  .ivu-modal-content {
    height: 420px;
  }
  .ivu-modal-footer {
    width: 200px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

#labUser {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .btn {
    margin: 16px 0;
    padding: 6px 10px;
    background: #fff;
    display: flex;
    .balPop {
      position: fixed;
      background: #cc0000;
    }
    .ivu-btn_01:hover {
      background: rgba(160, 3, 3, 1) !important;
    }
    .ivu-btn_02:hover {
      background: rgba(167, 98, 4, 1) !important;
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
    }
    a {
      margin-right: 6px;
      border-radius: 2px;
      vertical-align: middle;
      line-height: 30px;
      font-size: 14px;
      background: #fff;
    }
  }
  table {
    width: 100%;
    text-align: left;
    th {
      border-bottom: 1px solid #eee;
    }
    .th_top {
      .th_ww {
        width: 26px;
        padding-left: 2px;
      }
    }
  }
  .lab_content {
    li {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e4e6e9;
      line-height: 40px;
      margin-left: 4px;
      input {
        margin-right: 5px;
        margin-top: 14px;
      }
      h2 {
        width: auto;
      }
    }
  }
  #nodata {
    width: 70%;
    height: 500px;
    text-align: center;
    .noUser {
      margin: 20px 0;
    }
    img {
      display: inline;
      margin: 0 auto;
    }
    button {
      padding: 5px 10px;
      border-radius: 4px;
      background: #cc0000;
      color: #fbe7e6;
      cursor: pointer;
    }
  }
}
</style>
