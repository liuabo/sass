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
        topTitle:'分类管理',
       new_:'新建分类',
       listUrl:'web/newsCategory/getLists',
       saveUrl:'web/newsCategory/save',
       delUrl:'web/newsCategory/delete',
       moveUrl:'web/newsCategory/moveNewsCategoryOrder'
    };
  },
}
</script>
