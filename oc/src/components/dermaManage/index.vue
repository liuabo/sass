<template>
  <div class="dermaManage">
    <cn-header :topTitle='topTitle'></cn-header>
    <div class="content">
        <ul>
            <li v-for="item in list" :key="item.id">
                <Button @click="startDerma(item.id)" type="primary" size="small" :class="[item.start ? 'start' : '']">{{item.start ? '启动' : '未启动'}}</Button>
                <div class="img">
                    <img :src="item.img" alt="" @click="startDerma(item.id)">
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import cnHeader from '../new/common/cnHeader'
import have_2_img from '../../assets/images/have_2_Img.png'
import haveImg from '../../assets/images/haveImg.png'
import notHaveImg from '../../assets/images/notHaveImg.png'
export default {
    name:'dermaManage',
    components:{cnHeader},
    data() {
        return {
            topTitle:'皮肤管理',
            list:[
                {id:1,start:false,name:'have_big_img',img:have_2_img},
                {id:2,start:false,name:'have_small_img',img:haveImg},
                {id:3,start:false,name:'notHaveImg',img:notHaveImg},
            ],
        }
    },
    methods:{
        startDerma(id){
            this.list.forEach((item) => {
                item.start = false
            });
            this.list.forEach((item) => {
                if(item.id === id){
                    let data = {
                        name : item.name,
                        template:item.name,
                    }
                    this.$util.hintShow(this,'正在启动' + item.name + '皮肤！！！');
                    
                    this.$api.post('/web/newsSkins/enableSkins',data,r=>{
                        setTimeout(() => {
                            this.$util.hintHide(this);
                            item.start = true
                        }, 1000);
                    })
                }
            });
        },
        getCurrentSkins(){
            this.$api.post('/web/newsSkins/getCurrentSkins',null,r=>{
                this.list.forEach((item,index)=>{
                    if(item.name == r.data.template){
                        this.list[index].start = true
                    }
                })
            }) 
        }
    },
    mounted(){
        this.getCurrentSkins()
    }   
}
</script>
<style lang="scss" scoped>
    .dermaManage{
        height: 100%;
        width: 100%;
        display:flex;
        flex-direction: column;
        .content{
            flex:1;
            overflow:auto;
            padding-top: 16px;
            ul{
                margin-left: 32px;
                li{
                    float: left;
                    margin-left: -32px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    button{
                        width: 80px;
                        background-color: #cccccc;
                        border-color: #ccc;
                        color: #fff;
                        transition: all 0.8s;
                        margin-left: 32px;  
                    }
                    .start{
                        background-color: #cc0001;
                        border-color: #cc0001;
                    }
                    .img{
                        margin-top: 16px;
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
