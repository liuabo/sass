<template>
    <div class="cnHeader">
        <div class="_heder">
            {{topTitle}}
               <span type="ghost" @click="()=>{this.$router.go(-1)}">返回</span>
        </div>
    </div>
</template>
<script>
export default {
  name:'cnHeader',
  props:['topTitle'],
  data(){
      return{

      }
  }
}
</script>
<style lang="scss" scoped>
.cnHeader{
    height: 48px;
    background: #eeeeee;
    padding-left: 16px;
    line-height: 48px;
    ._heder{
        height: 100%;
        color: #767676;
        font-size: 14px;
        span{
            margin-left: 8px;
            color: #a6a6a6;
            font-size: 11px;
            cursor: pointer;
        }
    }
}
</style>
