<template>
  <li :id="model.depId" :lang='model.order'>
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
    </div>
    <ul style="margin-left:20px;" v-show="open" v-if="isFolder">
      <tree-menu :updata='updata' v-for="(item,index)  in modelList" :model="item" :len='len' :Index='index' :key="item"></tree-menu>
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
  props: ['model', 'Index', 'len', 'updata'],
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
      modelList: '',
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
    }
  },
  mounted() {
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