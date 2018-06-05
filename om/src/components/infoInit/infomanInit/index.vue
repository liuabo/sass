<template>
      <set :topTitle='topTitle' :new_='new_' :listUrl='listUrl' :saveUrl='saveUrl' :delUrl='delUrl' :moveUrl='moveUrl'></set>
</template>

<script>
import Set from '../../set/public/index'
export default {
  name: "info_init",
  components:{Set},
  data() {
    return {
        topTitle:'信息来源初始化',
        new_:'新建信息来源',
        listUrl:'omweb/newsSourceInit/getLists',
        saveUrl: 'omweb/newsSourceInit/save',
        delUrl:'omweb/newsSourceInit/delete',
        moveUrl:'/omweb/newsSourceInit/moveNewsSourceInitOrder'
    };
  },
}
</script>
