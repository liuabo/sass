<template>
      <set :topTitle='topTitle' :new_='new_' :listUrl='listUrl' :saveUrl='saveUrl' :delUrl='delUrl' :moveUrl='moveUrl'></set>
</template>

<script>
import Set from '../set/index'
export default {
  name: "classify_module",
  components:{Set},
  data() {
    return {
        topTitle:'信息来源',
       new_:'新建信息来源',
       listUrl:'web/newsSource/getLists',
       saveUrl:'web/newsSource/save',
       delUrl:'web/newsSource/delete',
       moveUrl:'/web/newsSource/moveNewsSourceOrder'
    };
  },
}
</script>
