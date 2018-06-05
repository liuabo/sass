<template>
    <inita :coTitle='coTitle' :listUrl='listUrl' :delUrl='delUrl' :path='path' :getUrl='getUrl'></inita>
</template>

<script>
import inita from '../../set/contentTemplate/index.vue';
export default {
    name:'cont',
    components:{inita},
    data(){
        return{
            coTitle:'初始化内容模板',
            listUrl:'/omweb/newsTemplateInit/list',
            delUrl:'/omweb/newsTemplateInit/remove',
            getUrl:'/omweb/newsTemplateInit/get/',
            path:'addConTemInit',
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
