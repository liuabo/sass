<template>
    <div class="cnHeader">
        <div class="_heder">
            <p>{{topTitle}}</p><span>{{UserNum}}</span>
               <span type="ghost" @click="()=>{this.$router.go(-1)}">返回</span>
        </div>
    </div>
</template>
<script>
export default {
  name:'commHead',
  props:['topTitle','UserNum'],
  data(){
      return{
          
      }
  }
}
</script>
<style lang="scss" scoped>
.cnHeader{
    height: 48px;
    background: #eee;
    box-sizing: border-box;
    padding-left: 16px;
    line-height: 48px;
    ._heder{
        height: 100%;
        color: #767676;
        font-size: 14px;
        p{
            display: inline-block;
        }
        span{
            margin-left: 8px;
            color: #a6a6a6;
            font-size: 11px;
            cursor: pointer;
        }
    }
}
</style>
