<template>
    <div class="CombineToPush">
        <div v-if="toPush.length" class="scope_ clearfix">
            <Button  v-if="!rangeDetail.length"  @click="()=>{this.lRange = !this.lRange}" type="primary" size="small">选择发送范围</Button>
            <p v-if="rangeDetail.length"><span>可见范围:</span></p>
            <div v-if="rangeDetail.length" class="range"  >
                <ul class="clearfix">
                    <li v-for="(item,index) in rangeDetail " :key="item.id">
                      <span style="margin-right:5px;" @click="delRangeDetail(index)"><font-awesome-icon style="color:#eee;" :icon="['fas','times']" /></span>
                      {{item.name}}
                  </li>
                </ul>
                <Button type="primary" size="small" @click="()=>{this.lRange = !this.lRange}">修改</Button>
            </div>
        </div>
        <div v-if="toPush.length" class="con">
            <div class="con_">
                <div  class="content">
                    <dl draggable="true" @dragenter="dragenter($event)" @dragend="dragend(item.id)"  :id="[item.id]"  @click="lookPpreview(item.id)" class="clearfix" v-for="(item,index) in toPush" :key="item.id" :class="{first : index===0}">
                        <dt><img :src="item.coverImage" alt=""></dt>
                        <dd :class="[index === 0 ? 'ellipsis' : 'ellipsis2' ]">{{item.description}}</dd>
                    </dl>
                </div>
            </div>
            
            <div class="button">
                <!-- <Button type="primary" size="small">预览</Button> -->
                <Button type="primary" size="small" @click="confirm(false)">发布</Button>
                <Button type="primary" size="small" @click="()=>{this.timeInterval = true}">定时发布</Button> 
                <div class="timeInterval" v-show="timeInterval">
                    <p>定时发布</p>
                    <DatePicker format="yyyy.MM.dd HH:mm:ss" :options='options' v-model="sendDate" size='small' type="datetime"  style="width: 208px"></DatePicker>
                    <div class="btn_">
                        <Button type="primary" @click="()=>{this.timeInterval = false}">取消</Button> 
                        <Button type="primary" @click="confirm(true)">确定</Button> 
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!toPush.length">没有要推送的内容</div>
      <visual-range v-if="lRange" :lRange='lRange' :isRange='isRange' :rangeDetail="rangeDetail"></visual-range>
    </div>
</template>
<script>
import visualRange from '../visualRange'
export default {
    name:'CombineToPush',
  components: { visualRange},
    props:['toPush','lookPpreview','clearToPush'],
    data(){
        return{
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000;
                }
            },
            lRange:false,
            range:true,
            timeInterval:false,
            sendDate:'',
            visibleRange: {deptIds:'',userIds:"",tagIds:''}, 
            rangeDetail: "", //详细范围
            targetId:""
        }
    },
    methods:{
        isRange(data){
          var data = data || []
          this.rangeDetail  = data 
          if(data.length){
            this.range = !this.range
          }
          this.lRange = !this.lRange
          var str =''
          this.visibleRange =  { deptIds: "", userIds: "", tagIds: "" },
          data.forEach(item => {
            if (item.num == 1) {
              this.visibleRange.deptIds += item._id + "|";
            }
            if (item.num == 2) {
              this.visibleRange.userIds += item._id + "|";
            }
            if (item.num == 3) {
              this.visibleRange.tagIds += item._id + "|";
            }
          });
        },
        delRangeDetail(index){
          this.rangeDetail.splice(index, 1);
        },
        confirm(foo){//发布
            let newsIds = ''
            this.toPush.forEach(item => {
                newsIds += item.id + '|'
            });
            newsIds = newsIds.substr(0,newsIds.length-1)
            let data = {} 
            if(foo){
                if(!this.sendDate){
                    this.$Message.info('请选择时间！！！')
                    return
                }
                if(this.sendDate.valueOf()<=Date.now()){
                    this.$Message.info('时间已过期,请选择正确时间！！！');
                    return
                } 
                data =  {
                    newsIds,
                    visibleRange:JSON.stringify(this.visibleRange),
                    rangeDetail:this.rangeDetail.length ? JSON.stringify(this.rangeDetail) : '',
                    allowTiming:'1',
                  
                }
                var str =
                    this.sendDate.getFullYear() +
                    "-" +
                    (this.sendDate.getMonth() + 1) +
                    "-" +
                    this.sendDate.getDate() +
                    " " +
                    this.sendDate.getHours() +
                    ":" +
                    this.sendDate.getMinutes() +
                    ":" +
                    this.sendDate.getSeconds()
                data["sendDate"] = str
                
            }else{
               data =  {
                    newsIds,
                    visibleRange:JSON.stringify(this.visibleRange),
                    rangeDetail:this.rangeDetail.length ? JSON.stringify(this.rangeDetail) : '',
                    allowTiming:'0',
                  
                }
            }
            this.$util.hintShow(this)
            this.$api.post('web/news/combinationPush',data,(r)=>{
                     this.$util.hintHide(this)
                     this.timeInterval = false
                      if(foo){
                       this.$Message.info("定时发布成功！！！");
                     }else{
                       this.$Message.info("发布成功！！！");
                     }
                     this.clearToPush()
                     this.visibleRange =  { deptIds: "", userIds: "", tagIds: "" }
            })
        },
        dragenter(event){
          event.path.forEach((item,index)=>{
            if(item.tagName == "DL"){
                this.targetId = event.path[index].id
            }
          })
        },
        dragend(id){
            let data = {
                currentId:id,targetId:this.targetId
            }
            var  currentIndex,targetIndex
                this.toPush.forEach((item,index)=>{
                  if(item.id == id){
                    currentIndex = index
                  }
                  if(this.targetId  == item.id){
                    targetIndex = index
                  }
                })
                var json = this.toPush[targetIndex]
                this.toPush[targetIndex] = this.toPush[currentIndex]
                this.toPush[currentIndex] = json
                this.$forceUpdate()
        }
    }
}
</script>
<style lang="scss" scoped>
.CombineToPush {
  position: fixed;
  height: 100%;
  width:384px;
  background: #888888;
  padding: 15px 30px;
  font-size: 14px;
  .scope_ {
    position: relative;
    margin-bottom: 8px;
    > Button {
      width: 95px;
    }
    p {
      float: left;
      width: 65px;
      color: #fcfcfc;
      position: absolute;
      top: 50%;
      margin-top: -10px;
    }
    div {
      float: left;
      position: relative;
      left: 65px;
      ul {
        float: left;
        width: 200px;
        padding: 8px 8px 0 0;
        border-radius: 5px;
        background-color: #fff;
        li {
          float: left;
          font-size: 12px;
          line-height: 12px;
          padding: 8px;
          background-color: #888888;
          margin-left: 8px;
          margin-bottom: 8px;
          border-radius: 5px;
          color: #fff;
          span {
            margin-right: 6px;
            cursor: pointer;
          }
        }
      }
      button {
        float: left;
        width: 48px;
        margin-left: 8px;
        position: absolute;
        top: 50%;
        margin-top: -12px;
      }
    }
  }
  .con_ {
    max-height: 480px;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .content {
    font-size: 12px;
    width: 320px;
    border: 1px solid #eeeeee;
    background: #fff;
    dl {
      width: 100%;
      height: 63px;
      padding: 8px;
      border-bottom: 1px solid #eeeeee;
      &:last-child {
        border: 0;
      }
      dt {
        width: 48px;
        height: 48px;
        float: right;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        width: 254px;
        float: left;
        line-height: 24px;
      }
    }
    .first {
      padding: 0;
      border-bottom: 0;
      height: 176px;
      position: relative;
      color: #cccfc6;
      overflow: hidden;
      dt {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba($color: #111, $alpha: 0.4);
        padding: 8px;
        line-height: 18px;
      }
    }
  }
  .button {
    margin-top: 15px;
    position: relative;
    > button {
      width: 80px;
      margin-right: 12px;
      border-color: #cc0001;
      background: #cc0001;
      // &:first-child {
      //   background: #0060d0;
      //   border-color: #0060d0;
      // }
    }
    .timeInterval {
      width: 240px;
      height: 144px;
      position: absolute;
      bottom: 40px;
      left: 32px;
      background: #eeeeee;
      padding: 18px 0 0 16px;
      box-shadow: 0px 0px 60px -10px #666;
      p {
        line-height: 12px;
        font-size: 12px;
        margin-bottom: 10px;
        color: #737373;
      }
      .btn_ {
        margin-top: 16px;
        button {
          width: 96px;
          color: #fff;
          &:first-child {
            background: #cccccc;
            border-color: #ccc;
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