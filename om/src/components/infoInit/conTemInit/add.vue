<template>
    <add :coTitle='coTitle' :saveUrl='saveUrl' :updateUrl='updateUrl' :getUrl='getUrl' :infoUrl='infoUrl' :classiifyUrl='classiifyUrl' :path='path'></add>
</template>

<script>
import add from '../../set/contentTemplate/add.vue';
export default {
    name:'addcom',
    components:{add},
    data(){
        return{
            coTitle:'新建模板',
            saveUrl:  this.$newsUrl +  '/omweb/newsTemplateInit/save',
            updateUrl:  this.$newsUrl +  '/omweb/newsTemplateInit/update',
            getUrl:'/omweb/newsTemplateInit/get/',
            infoUrl:'omweb/newsSourceInit/getLists',
            classiifyUrl:'omweb/newsSourceInit/getLists',
            path:'/app/infoInit/conTemInit'
        }
    }
}
</script>
