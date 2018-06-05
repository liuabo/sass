<template>
    <div class="commentLook"  >
        <cn-header :topTitle='topTitle'></cn-header>
        <div class="CL_centent" ref="content" @scroll="dropDown()">
            <div class="con" v-if="newsComment.length">
                <div v-for="(item) in newsComment" :key="item.id">
                    <c-l-centent  :item='item' :getNewsCommentReply="getNewsCommentReply"></c-l-centent>
                    <div v-if="referId == item.id" class="revert" :ref="'div'+item.id">
                        <div v-for="(con) in newsCommentReply" :key="con.id">
                            <c-l-centent :reply='item.userName' :item="con"></c-l-centent>    
                        </div>
                    </div> 
                </div>
            </div>
            <div class="" v-else>没有评论内容！！！</div>
        </div>
    </div>
</template>
<script>
import cnHeader from "../common/cnHeader";
import CLCentent from "./CLCentent";

export default {
  name: "commentLook",
  components: { cnHeader, CLCentent },
  data() {
    return {
      topTitle: "评论内容",
      reverf: true,
      newsComment: [],
      newsCommentReply: [],
      stairPage:0,
      secondPage:0,
      limit:15 ,
      page:0,
      onOff:true,
      off:true,
      referId:-1,
      id:-1,
    };
  },
  methods: {
    getNewsComment() {
      let data = {
        limit: this.limit,
        offset: this.stairPage * this.limit,
        newsId: this.$route.params.id
      };
      this.$util.hintShow(this);
      this.$api.post("web/newsComment/list", data, r => {
          this.newsComment = r.data.rows;
          setTimeout(()=>{
              this.$util.hintHide(this);
            },500)
      });
    },
    getNewsCommentReply(id) {
      let data = {
        limit: this.limit,
        offset: this.page * this.limit,
        referId: id
      };
      if(this.id == id){
        this.newsCommentReply = []
        this.id = -1
      }else{
          this.$util.hintShow(this);
          this.$api.post("web/newsCommentReply/list", data, r => {
              this.newsCommentReply = r.data.rows;
              this.isSHow()
              setTimeout(()=>{
                this.$util.hintHide(this);
              },3000)
            this.id = id
          });
      }
    },  
    isSHow(){
        this.newsCommentReply.forEach((item)=>{
            this.referId = item.referId
        })
    },
    dropDown(){//下拉加载
        let scrollTop = this.$refs.content.scrollTop
        let scrollHeight = this.$refs.content.scrollHeight
        let clientHeight =this.$refs.content.clientHeight
        if(scrollHeight-clientHeight - scrollTop <=  45){
            if(this.onOff){
               if(this.off){
                this.off = false
                this.page++
                let data = {
                  limit: this.limit,
                  offset: this.page * this.limit,
                  newsId: this.$route.params.id
                };
                let arr = []
                this.$api.post("web/newsComment/list", data, r => {
                    arr = r.data.rows 
                    this.newsComment.push(...arr)
                    this.off = true
                    arr.length == 0 ? this.onOff = false :  this.onOff = true
                });
               }
            }
        }
    },
  },
  mounted() {
    this.getNewsComment();
  }
};
</script>
<style lang="scss" scoped>
.commentLook {
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .CL_centent {
    flex: 1;
    overflow-x:hidden;
    overflow-y: auto;
    width: 100%;
    padding: 16px 0 0 16px;
    .con {
      width: 640px;
      padding-bottom: 16px;
     
    }
    .revert {
      margin-left: 24px;
    }
  }
}
</style>
