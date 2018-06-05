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
      topTitle:'分类管理',
      new_:'新建分类',
      listUrl:'omweb/newsCategory/getLists',
      saveUrl:'omweb/newsCategory/save',
      delUrl:'omweb/newsCategory/delete',
      moveUrl:'omweb/newsCategory/moveNewsCategoryOrder'
    };
  },
}
</script>
