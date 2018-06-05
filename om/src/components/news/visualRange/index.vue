<template>
    <div class="Range">
        <div class="content">
            <div class="left">
                <div class="top">
                    <Icon type="ios-search-strong"></Icon>
                    <input type="text" value="搜索部门">    
                    <ul>
                        <li @click="()=>{this.isLabel = true}" :class="[isLabel?'active':'']">组织架构</li>
                        <li @click="()=>{this.isLabel = false}" :class="[!isLabel?'active':'']">标签</li>
                    </ul>
                </div>
                <div class="bottom">
                    <ul v-show="isLabel" class="list" v-for="(item,i) in leftList" :key="item.depId">
                       <range-child :rightList='rightList' :delDepId='delDepId' :leftToRight='leftToRight' :index='i' :data='item'></range-child>
                    </ul>
                    
                    <ul v-show="!isLabel" class="label">
                        <li class="labelItem" v-for="(item) in labels" :key="item.id"  >
                          <span class="icon"><font-awesome-icon :icon="['fas','tag']" /></span>
                            
                            <span class="con" @click.self="leftToRight(item)" >{{item.tagName}}</span>
                            <b class="tick" v-if="item.checked"><img class="img" :src="tick" alt=""></b>
                        </li>
                    </ul>
                </div>
            </div>            
            <div class="right">
                <div class="top">
                    <p>已选择部门和成员</p>
                </div>  
                <div class="center">
                    <ul class="selected" v-for="(item,index) in rightList" :key="item.id">
                        <li class="item ellipsis">
                            <img :src="imgS" alt=""> 
                            <span>{{item.name}}</span>
                            <b class="tick"  @click="del(index,item.id)"><font-awesome-icon style="color:#cc0001;" :icon="['fas','times']" /></b>
                        </li>
                    </ul>    
                </div>  
                <div class="bottom">
                    <Button @click="isRange(rangeDetail)" type="error" size='small'>取消</Button>
                    <Button @click="isRange(rightList)" type="error" size='small'>确认</Button>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
import axios from "axios";
import rangeChild from './rangeChild'
import tick from "../../../assets/images/tick.png";
import imgS from "../../../assets/images/256291310915199138.png";
export default {
  name: "Range",  
  props: ["lRange", "isRange", "rangeDetail"],
  components:{rangeChild},
  data() {
    return {
      imgS,tick,
      leftList: {}, //部门
      labels: [],
      rightList: [], //选择的部门和标签
      isLabel: true, //切换部门和标签
      labelsTick: [],
      delDepId:-1,//
    };
  },
  methods: {
    getDepartment() {
      this.$axiosApi.get('department/listwithmember_one_level?pageNum=1&pageSize=10&departmentId=0',null,res=>{
         this.leftList = res.data.data.department_list;
          this.leftList.forEach((item,index) => {
              this.leftList[index]["classIfy"] = 1;
          });
      })
      this.$axiosApi.get('tags/list?pageNum=1&pageSize=10',null,res=>{
         this.labels = res.data.data
          this.labels.forEach((item,index) => {
              this.labels[index]["classIfy"] = 3;//类型判断  3为标签
              this.labels[index]["checked"] = false;//对勾判断
          });
          this.rightList.forEach((r,i)=>{
            this.labels.forEach((m,n)=>{
              if(r.id == m.id){
                this.labels[n].checked = true
              }
            })
          })
      })
    },
    leftToRight(data) {
      var isHas = this.rightList.some((item, i) => {
        if (data.id == item.id) {
          this.rightList.splice(i,1)
          if(data.tagName){//删除标签对勾
            this.labels.forEach((r,i)=>{
              if(r.id == data.id){
                this.labels[i].checked = false
              }
            })
          }
          return true
        } else {
          return false;
        }
      });
      if (!isHas) {
        this.rightList.push({num:data.classIfy,_id:data.depId || data.userId || data.tagId,id:data.id,name:data.name || data.tagName})
        if(data.tagName){//标签添加对勾
          this.labels.forEach((r,i)=>{
            if(r.id == data.id){
              this.labels[i].checked = true
            }
          })
        }
      }
    },
    del(index,id) {
      this.rightList.splice(index, 1);
      this.delDepId = id
      this.labels.forEach((r,i)=>{
        if(r.id == id){
          this.labels[i].checked = false
        }
      })
    }
  },
  mounted() {
    this.rightList.push(...this.rangeDetail);
    
    this.getDepartment();
  },
};
</script>
<style lang="scss" scoped>
.Range {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  .content {
    height: 400px;
    width: 400px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    .left {
      width: 200px;
      height: 100%;
      background: #eeeeee;
      padding: 8px 16px 16px;
      float: left;
      position: relative;
      display: flex;
      flex-direction: column;
      .top {
        height: 72px;
        width: 100%;
        i {
          position: absolute;
          top: 12px;
          left: 22px;
          color: #cccccc;
        }
        input {
          width: 168px;
          height: 24px;
          line-height: 24px;
          font-size: 12px;
          border-radius: 5px;
          padding-left: 22px;
          color: #cccccc;
        }
        ul {
          width: 166px;
          height: 26px;
          border-radius: 6px;
          border: 1px solid #dddddd;
          margin-top: 8px;
          background: #cccccc;
          overflow: hidden;
          li {
            text-align: center;
            float: left;
            width: 82px;
            height: 24px;
            color: #fcfcfc;
            line-height: 24px;
            cursor: pointer;
            font-size: 12px;
          }
          .active {
            background: #cc0001;
          }
        }
      }
      .bottom {
        flex: 1;
        width: 100%;
        overflow: auto;
        .list{
          margin-left: -10px;
        }
        .label {
          li {
            height: 30px;
            width: 100%;
            line-height: 30px;
            position: relative;
            cursor: pointer;
            display: flex;
            .icon{
              width: 24px;
              height: 30px;
              padding: 0 4px 0 0px;
            }
            .con{
              flex: 1;
            }
            .tick {
              position: absolute;
              right: 0;
            }
          }
        }
      }
    }
    .right {
      float: left;
      width: 200px;
      height: 100%;
      padding: 8px 16px 16px;
      display: flex;
      flex-direction: column;

      .top {
        width: 100%;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        color: #ccc;
      }
      .center {
        width: 100%;
        flex: 1;
        overflow: auto;
        .item {
          line-height: 30px;
          position: relative;
        }
        .tick {
          position: absolute;
          right: 0;
          cursor: pointer;
        }
      }
      .bottom {
        height: 40px;
        width: 100%;
        padding-top: 16px;
        text-align: right;
        button {
          width: 64px;
          &:first-child {
            background: #888888;
            border-color: #888888;
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
</style>
