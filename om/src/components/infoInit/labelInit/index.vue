<template>
    <init :labTitle='labTitle' :listUrl='listUrl' :saveUrl='saveUrl' :delUrl='delUrl' :moveUrl='moveUrl'></init>
</template>

<script>
import init from '../../set/labelManagement/index';
export default {
    name:'dermaInit',
    components:{init},
    data(){
        return{
            labTitle:'标签初始化',
            listUrl:'/omweb/newsTagsInit/list',
            saveUrl:'/omweb/newsTagsInit/save',
            delUrl:'/omweb/newsTagsInit/delete',
            moveUrl:'/omweb/newsTagsInit/moveNewsTagsInitOrder'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
