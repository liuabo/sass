<template>
    <init :deTelite='deTelite' :getUrl='getUrl' :setUrl="setUrl"></init>
</template>

<script>
import init from '../../set/dermaManage/index';
export default {
    name:'dermaInit',
    components:{init},
    data(){
        return{
            deTelite:'初始化皮肤',
            getUrl :'omweb/newsSkinsInit/getCurrentSkins',
            setUrl :'omweb/newsSkinsInit/enableSkins', 
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
