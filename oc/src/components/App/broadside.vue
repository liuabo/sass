<template>
  <div class="broadside">
    <ul class="app_list">
        <!-- <router-link tag="li" :to="app.path" :class="{active : active == app.path}" v-for="app in apps" :key="app.id" >
            {{app.name}}
        </router-link> -->     
        <li @click="goto(app.id,app.path)" :class="{act : active == app.id}" v-for="app in apps" :key="app.id" >{{app.name}}</li>

    </ul>
  </div>
</template>


<script>
import SHeader from './header'
export default {
  name:'broadside', 
  props:['active','goto'],
  data() {
    return {
      active:'',
      apps:[
        {id:111,name:'新闻动态',path:"/app/newsIndex"},
        // {id:112,name:'协同办公',path:"/app/coopetactiveWork"},
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.broadside{
  background-color: #888888;
  height:100%;
  width: 100%;
  .app_list{
    width: 100%;
    li{
      width: 100%;
      height: 63px;
      font-size: 16px;
      font-weight: 400;
      border-bottom: 1px solid #808080;
      text-align: center;
      line-height: 64px;
      color: #fff;
       &:hover{
                background: #666;
            }
    }
    // .router-link-exact-active{
    //   background-color:#cc0001 !important;
    // }
    .act{
       background-color:#cc0001 !important;
    }
  }
}
    li{
      cursor: pointer;
    }
</style>
