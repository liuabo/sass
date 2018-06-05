<template>
    <div class="app">
        <header><s-header :active='active' :goto="goto"></s-header></header>
        <section  id="blur">
            <aside><Boadside :active='active' :goto="goto"></Boadside></aside>
            <section><router-view></router-view></section>
        </section>
    </div>
</template>
<script>
import sHeader from './header'
import Boadside from './broadside'
export default {
    name:'index',
    components:{sHeader,Boadside},
    data(){
        return{
            active: 1
        }
    },
    methods:{
        goto(id,path){
            this.active = id
            sessionStorage['index'] = id
            this.$router.push({path})
        }
    },
    mounted(){
        this.active = sessionStorage["index"]
    }
}
</script>
<style lang="scss" scoped>
    .app{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        header{
            padding: 0;
            height: 64px;
            width: 100%;
            background-color: #fff;
        }
        >section{
            width: 100%;
            display: flex;
            flex:1;
            overflow-y: auto;
            position: relative;
            aside{
                width: 160px ;
                min-width: 160px;
                max-width: 160px;
                height: 100%;
            }
            section{
                flex: 1;
                height: 100%;
                // overflow-x: hidden;
            }
           
        }
        .blur {	
            -webkit-filter: blur(3px); 
            -moz-filter: blur(3px);
                -ms-filter: blur(3px);    
                    filter: blur(3px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=3, MakeShadow=false);
        }
    }


</style>
