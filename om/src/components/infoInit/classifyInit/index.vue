<template>
      <set :topTitle='topTitle' :new_='new_' :listUrl='listUrl' :saveUrl='saveUrl' :delUrl='delUrl' :moveUrl='moveUrl'></set>
</template>

<script>
import Set from '../../set/public/index'
export default {
  name: "classify_init",
  components:{Set},
  data() {
    return {
      topTitle:'分类初始化',
      new_:'新建分类',
      listUrl:'omweb/newsCategoryInit/getLists',
      saveUrl:'omweb/newsCategoryInit/save',
      delUrl:'omweb/newsCategoryInit/delete',
      moveUrl:'omweb/newsCategoryInit/moveNewsCategoryInitOrder'
    };
  },
}
</script>
