<template>
  <li :id="model.depId" :lang='model.order'>
    <div>
      <img :src="imgPic" style="padding-right:6px;margin-bottom:4px;" v-if="model.parentId !=0" alt="">
      <font-awesome-icon @click="toggle(model.depId)" v-if="model.hasUndering" :icon="['fas', open ? 'folder-open': 'folder']" />
      <img v-if="!model.hasUndering" :src="pic.filPic" alt="">
      <span :index='Index' @click="sendData(model,Index,model.depId)">
        <span @click="checkout(Index)">
          {{ model.name }}
          <b v-if="model.delFlag" class="tick"><img :src="tick" alt="" /></b>
        </span>
      </span>
    </div>
    <ul style="margin-left:20px;" v-show="open" v-if="isFolder">
      <tree-menu :delLeftId='delLeftId' :sendData='sendData' :isFlag='isFlag' :Tick='Tick' v-for="(item,index)  in modelList" :model="item" :len='len' :Index='index' :key="item"></tree-menu>
    </ul>
    <div class="bottom">
      <button @click="isFlag([])" type="error" size='small'>取消</button>
      <button @click="isFlag()" type="error" size='small'>确认</button>
    </div>
  </li>
</template>
 
<script>
import filPic from '../../../assets/images/fil.png';
import axios from 'axios';
import Bus from '../../../assets/js/bus'
import labPic from '../../../assets/images/labPic.png'
import tick from "../../../assets/images/tick.png";
import imgPic from '../../../assets/images/img_04.png'
export default {
  name: 'treeMenu',
  props: ['model', 'Index', 'len', 'isFlag', 'sendData', 'rightList', 'Tick', 'delLeftId'],
  data() {
    return {
      tick,
      labPic,
      imgPic,
      open: false,
      isFolder: true,
      hasChildren: false,
      pic: { filPic },
      modelList: [],
      Value: '',
      tickFlag: false,
      labelsTick: [],
      ticIndex: '',
      delLeftId: '',
      flagIndex: '',
      delFlag: false
    }
  },
  computed: {
    isFolder() {
      return this.model.hasUndering && this.model.length
    }
  },
  methods: {
    toggle(id) {
      if (this.isFolder && this.$el.childNodes[2].childNodes.length == 0) {
        this.getData(id)
        this.open = !this.open
      } else if (this.isFolder) {
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
    },
    checkout(index) {
      this.flagIndex = index
      this.model.delFlag = !this.model.delFlag
    },
    getData(id) {
      let data = {
        departmentId: id,
        pageNum: 1,
        pageSize: 10
      }
      this.$axiosApi.get('department/listwithmember_one_level', data, res => {
        var dep = res.data.data.department_list
        var mem = res.data.data.member_list
        dep.forEach((item, index) => {
          dep[index]["type"] = 1;
        });
        mem.forEach((item, index) => {
          mem[index]["type"] = 2;
        });
        this.modelList.push(...dep)
        this.modelList.push(...mem)
        this.len = res.data.data.length
      })
    }
  },
  watch: {
    Tick(curVal, oldVal) {

    },
    delLeftId(curVal, oldVal) {
      if (this.model.depId == this.delLeftId) {
        this.model.delFlag = false
      }
    }
  },
  mounted() {
    Bus.$on('flag', (item, index) => {
      this.$forceUpdate()
    })
  }
}
</script>
 
<style lang='scss'>
.bottom {
  position: absolute;
  right: 24px;
  bottom: 10px;
  line-height: 0;
  button {
    width: 64px !important;
    height: 22px;
    border-radius: 4px;
    background: #cc0000;
    color: #fff;
    &:first-child {
      background: #888;
      margin-left: 5px;
      margin-right: 20px;
    }
  }
}
ul {
  list-style: none;
  overflow-y: auto;
  li {
    div {
      line-height: 30px;
      cursor: pointer;
      b {
        display: inline-block;
        width: 12px;
        height: 8px;
        img {
          display: inline-block;
          width: 12px;
          height: 8px;
        }
      }
    }
  }
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
</style>