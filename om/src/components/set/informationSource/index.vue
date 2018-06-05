<template>
      <set :topTitle='topTitle' :new_='new_' :listUrl='listUrl' :saveUrl='saveUrl' :delUrl='delUrl' :moveUrl='moveUrl'></set>
</template>

<script>
import Set from '../public/index'
export default {
  name: "classify_module",
  components:{Set},
  data() {
    return {
        topTitle:'信息来源',
       new_:'新建信息来源',
       listUrl:'omweb/newsSource/getLists',
       saveUrl:'omweb/newsSource/save',
       delUrl:'omweb/newsSource/delete',
       moveUrl:'/omweb/newsSource/moveNewsSourceOrder'
    };
  },
}
</script>
