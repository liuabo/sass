<template>
    <li class="item ellipsis">
        <div class="itemDep">
            <img class="imgL" v-if="data.parentId!=0" :src="imgL" alt="">
            <span class="icon" @click="toggle(data.depId,data.hasUndering)">
                <font-awesome-icon   v-if="data.hasUndering"  :icon="['fas',open ? 'folder-open': 'folder']" />
                <img v-else :src="imgS" alt="">
            </span>
            <span @click="isChecked(data)" class="con">{{data.name}}</span>
            <span class="tick" v-if="checked"><img class="img" :src="tick" alt=""></span>
        </div>
        <ul class="childItem" v-show="open" v-if="data.hasUndering">
            <range-child :rightList='rightList' :delDepId='delDepId'  :leftToRight='leftToRight'   v-for="item in children" :key="item.depId" :data="item"></range-child>
        </ul>
    </li>
</template>
<script>
import imgS from "../../../assets/images/256291310915199138.png";
import imgL from "../../../assets/images/img_04.png";
import tick from "../../../assets/images/tick.png";
import axios from "axios";

export default {
    name:'rangeChild',
    props:['data','leftToRight','delDepId','rightList'],
    data(){
        return{
            imgS,imgL,tick,
            open:false,//是否打开
            children:[],
            checked:false,//是否添加对勾
        }
    },
    methods:{
        toggle(id,hasChild){
            if(hasChild){
                this.open = !this.open
                 if(this.children.length == 0){
                    this.getDataChildren(id)
                }
            }
        },
        getDataChildren(id){
            this.$axiosApi.get('department/listwithmember_one_level?pageNum=1&pageSize=10&departmentId='+id,null,res=>{
                var dep = res.data.data.department_list
                var mem = res.data.data.member_list
                dep.forEach((item,index) => {
                    dep[index]["classIfy"] = 1;
                });
                mem.forEach((item,index) => {
                    mem[index]["classIfy"] = 2;
                });
                this.children.push(...dep)
                this.children.push(...mem)
            });
        },   
        isChecked(data){
          this.leftToRight(data)  
          this.checked = !this.checked
        }
    },
    mounted(){
        this.rightList.forEach((r,i)=>{
            if(r.id == this.data.id){
                this.checked = true
            }
        })
    },
    watch:{
        delDepId(newval,oldval){
            if(this.data.id == newval){
                this.checked = false
            }
        },
       
    }
    
}
</script>

<style lang="scss" scoped>
        .item{
            cursor: pointer;
            // height: 32px;
            .itemDep{
                position: relative;
                line-height: 30px;
                display: flex;
                line-height: 30px;
                .imgL{
                    width: 9px;
                    height: 9px;
                    position: relative;
                    top: 5px;
                    left: 2px;
                }
                .icon{
                    width: 28px;    
                    height: 30px;
                    padding:0 4px 0 10px;
                }
                .con{
                    flex: 1;
                }
                .tick{
                    position: absolute;
                    right: 0;
                    height: 30px;
                    background: #eee;
                }
            }
            
            .childItem{
                padding-left: 12px;
            }
            
        }
</style>
