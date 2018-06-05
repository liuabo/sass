<template>
  <li :id="model.depId"  :className='567' :lang='model.order'>
    <div>
      <img :src="pic.imgPic" style="padding-right:6px;margin-bottom:4px;" v-if="model.parentId !=0" alt="">
      <font-awesome-icon @click="toggle(model.depId)" v-if="model.hasUndering" :icon="['fas', open ? 'folder-open': 'folder']" />
      <img style="padding-right:5px;" v-if="!model.hasUndering" :src="pic.filPic" alt="">
      <span @click="updata(model.depId,model.name)">
        {{ model.name | spliceLength(7) }}
      </span>
      <span class="icon" :index='Index' @click="goToPop(Index,len,model.depId,model.name,$event)">
        <font-awesome-icon :icon="['fas','bars']" />
      </span>
      <!-- 操作部门弹窗 -->
      <Modal id="secPop" v-model="modal1" width="100">
        <div id="handle" ref='popUP' style="text-align:center">
          <div class="tril"></div>
          <ul>
            <li @click="addSection">添加子部门</li>
            <li @click="amendSection">修改名称</li>
            <li @click="delSection">
              <font-awesome-icon style="margin-right:4px;" :icon="['fas','trash-alt']" />删除</li>
            <li v-if="this.moveIndex == 'both' ? false : this.moveIndex == 'up' ? false : true" @click="moveUp">
              <font-awesome-icon style="margin-right:4px;" :icon="['fas','arrow-circle-up']" />上移</li>
            <li v-if="this.moveIndex == 'both' ? false : this.moveIndex == 'down' ? false : true" @click="moveDown">
              <font-awesome-icon style="margin-right:4px;" :icon="['fas','arrow-circle-down']" />下移</li>
          </ul>
        </div>
        <div slot="footer">
          <!-- <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button> -->
        </div>
      </Modal>
      <!-- 添加子部门弹窗 -->
      <Modal id="ivu-modal" v-model="modal2" width="360">
        <div style="text-align:center">
          <input type="text" style="margin:20px 0" placeholder="输入部门名称" ref="ipt" id="append">
        </div>
        <div slot="footer">
          <Button type="error" @click="modal2 = false" size="small">取消</Button>
          <Button type="error" size="small" @click="addChild">确定</Button>
        </div>
      </Modal>
      <!-- 修改部门名称弹窗 -->
      <Modal id="ivu" v-model="modal3" width="400" height='100px'>
        <div style="text-align:center">
          <Input v-model="Value" style="width: 300px" />
        </div>
        <div slot="footer">
          <Button type="error" size="small" @click="modal3 = false">取消</Button>
          <Button type="error" size="small" @click="showOverlay">确定</Button>
        </div>
      </Modal>
      <!-- 删除部门弹窗 -->
      <Modal id="ivu" v-model="modal4" width="400" height='100px'>
        <div style="text-align:center">
          <p style="font-size:20px">你确定要删除{{this.Value | spliceLength(7)}}部门吗?</p>
        </div>
        <div slot="footer">
          <Button type="error" size="small" @click="modal4 = false">取消</Button>
          <Button type="error" size="small" @click="affirm(Index)">确定</Button>
        </div>
      </Modal>
    </div>
    <ul style="margin-left:20px;" v-show="open" v-if="isFolder">
      <tree-menu v-for="(item,index)  in modelList" :model="item" :len='len' :Index='index' :key="item"></tree-menu>
    </ul>
  </li>
</template>
 
<script>
import filPic from '../../../assets/images/fil.png';
import axios from 'axios';
import Bus from '../../../assets/js/bus'
import imgPic from '../../../assets/images/img_04.png'

export default {
  name: 'treeMenu',
  props: ['model', 'Index', 'len'],
  data() {
    return {
      modal1: false,//操作部门弹窗
      modal2: false,
      modal3: false,
      modal4: false,
      open: false,
      isFolder: true,
      hasChildren: false,
      pic: { filPic, imgPic },
      modelList: [],
      moveIndex: '',
      parentID: '',
      Value: '',
      event: '',//事件源
      UserNum: 0,
      upSecList: ''
    }
  },
  computed: {
    isFolder() {
      return this.model.hasUndering && this.model.length
    }
  },
  methods: {
    toggle(id) {
      if (this.$el.childNodes[2].childNodes.length == 0) {
        let data = {
          departmentId: id,
          pageNum: 1,
          pageSize: 10
        }
        this.$axiosApi.get('department/list_one_level', data, res => {
          this.modelList = res.data.data
          this.len = res.data.data.length
        })
      }
      if (this.isFolder) {
          this.open = !this.open
        }
    },
    goToPop(num, length, id, name, $event) {
      if (num == length) {
        this.moveIndex = "both"
      } else if (num == 0) {
        this.moveIndex = 'up'
      } else if (num == length - 1) {
        this.moveIndex = 'down'
      } else {
        this.moveIndex = ''
      }

      this.event = $event.path[2]
      if( this.$el.parentNode.parentNode.id == '' ) {
        this.upSecList = 0
      } else{
        this.upSecList = this.$el.parentNode.parentNode.id
      }
      this.Value = name
      this.parentID = id
      this.modal1 = true
      var oDiv = this.$refs.popUP
      var top = event.pageY + 28
      oDiv.style.top = top + "px"
    },
    addSection() {//添加子部门弹窗开启
      this.modal1 = false
      this.modal2 = true;
    },
    addChild() {//添加子部门确定按钮
      let param = {
        name: this.$refs.ipt.value,
        parentId: this.parentID
      }
      console.log(param);
      this.modal2 = false;
      var token = sessionStorage['token']
      let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }
      axios.post(this.$url_ + '/department/add', param, config).then(res => {
        console.log(res);
        this.callback(this.upSecList)
      });
    },
    amendSection() {//修改部门名称弹窗开启
      this.modal3 = true;
      this.modal1 = false;
    },
    // 修改部门数据
    showOverlay() {
      this.modal3 = false

      let data = {
        name: this.Value,
        departmentId: this.parentID
      }
      this.$axiosApi.post('/department/modify', data, res => {
        this.model.name = this.Value
      })
    },
    //删除部门弹窗
    delSection() {
      this.modal4 = true;
      this.modal1 = false;
    },
    //删除部门
    affirm(index) {
      this.modal4 = false
      let data = {
        departmentId: this.parentID,
      }
       this.$forceUpdate()
      this.modelList.forEach(element => {
        console.log(45678);
        
        //  console.log(element.splice(index, 1));
        //  console.log(element);
         
         

        });
        console.log(index);
      // console.log(this.$el.parentNode.removeChild(this.$el[this.$el.parentNode.childNodes["0"]]));
      
      //  this.$el.parentNoderemove(this.$el);
      // console.log(this.$el);
      
      // return
      this.$axiosApi.post('/department/remove', data, res => {
        console.log(this.upSecList);
        
        this.callback(this.$el.parentNode.parentNode.id)
        // console.log(this.$el.parentNode.parentNode.id);
        
      })
    },
    //获取部门成员列表
    updata(id, name) {


      this.$router.history.push({ path: '/app/addressBook/' })
      console.log(name);
      let data = {
        departmentId: id,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('/department/member/list', data, res => {
        console.log(res);
        Bus.$emit('UserList', res, name, id)
        this.UserNum = res.data.data.length
        Bus.$emit('UserNum', this.UserNum, name)
      })
    },
    //上移部门
    moveUp() {
      //deptSrcId  移动的部门id
      //deptTargetId  被移动的部门id
      let data = {
        deptSrcId: this.parentID,
        deptTargetId: this.$el.previousSibling.id,
        srcOrder: this.$el.lang,
        targetOrder: this.$el.previousSibling.lang,
      }
      this.modal1 = false;
      // return
      this.$axiosApi.post('/department/transposition', data, res => {
        this.callback(this.upSecList)
      })
    },
    //下移部门
    moveDown() {
      let data = {
        deptSrcId: this.$el.id,
        deptTargetId: this.$el.nextSibling.id,
        srcOrder: this.$el.lang,
        targetOrder: this.$el.nextSibling.lang
      }
      this.modal1 = false;
      this.$axiosApi.post('/department/transposition', data, res => {
        this.callback(this.upSecList)
      })
    },
    callback(id) {
      let data = {
        departmentId: id,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('department/list_one_level', data, res => {
        this.modelList = res.data.data
        this.len = res.data.data.length
      })
      this.$forceUpdate()
      
    }
  },
  mounted() {
     this.$forceUpdate()
  }
}
</script>
 
<style lang='scss'>
ul {
  list-style: none;
}
i.icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.icon.folder {
  background-image: url(/src/assets/folder.png);
}
.icon.folder-open {
  background-image: url(/src/assets/folder-open.png);
}
.icon.file-text {
  background-image: url(/src/assets/file-text.png);
}
.tree-menu li {
  line-height: 1.5;
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
//操作部门弹窗
#handle {
  width: 98px;
  background: #fff;
  position: fixed;
  z-index: 99999;
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
</style>