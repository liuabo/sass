<template>
    <div class="CLCentent">
        <dl class="clearfix" ref= 'dl'>
            <dt class="clearfix" :class="{'reverf' : reply}">    
                <div class="clearfix">
                    <img :src="item.userPhoto" alt="">
                    <h6 class="name" :class="[reply ? 'name_' : '']">
                        <span>{{item.userName}}</span>
                        <span v-if="reply">
                            <i>回复</i>
                            {{reply}}  
                        </span> :
                    </h6>   
                </div>
               
            </dt>
            <dd>
                <div class="content"><p class="">{{item.content}}</p></div> 
                <div v-if="item.replyCount" class="reply" @click="say(item.id)">回复内容<span :ref="'span'+item.id"></span></div>
                <div class="timer">{{item.createTime | timeFilter(true)}}</div>
            </dd>
        </dl>
    </div>
</template>
<script>
import img from '../../../../assets/images/logo.png'
export default {
    name:'CLCentent',
    props:['reverf','item','getNewsCommentReply','reply'],
    data(){
        return{
            img,
        }
    },
   methods:{
        say(id){
            this.getNewsCommentReply(id)
            if(this.$refs['span'+id].className){
                this.$refs['span'+id].className = ''
            }else{
                this.$refs['span'+id].className = 'active'
            }
        }
   },
   mounted(){
        this.$refs.dl.childNodes[0].style.height  = this.$refs.dl.clientHeight + 'px'  
   }
}
</script>
<style lang="scss" scoped>
    .CLCentent{
        dl{
            font-size: 12px;
            display: flex;
            dt{
                height: 100%;
                min-width: 80px;
                line-height: 48px;
                border-bottom: 1px solid #eeeeee;
                float: left;
                position: relative;
                div{
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%)
                }
                img{
                    margin-top: 12px;
                    height: 24px;
                    width: 24px;
                    float: left;
                    border-radius: 50%;
                }
                .name{
                    margin-left:  8px;
                    float: left;
                    color: #888888;
                    >span{
                        float: left;
                    }
                    i{
                        color: #1169d3;
                    }
                }
                .name_{
                    width: 120px;
                }

            }
            dd{
                float: left;
                border-bottom: 1px solid #eeeeee;
                height: 100%;
                position: relative;
                min-width: 464px;
                .content{
                    height: 100%;
                    float: left;
                    width: 320px;
                    
                    padding:  4px 0;
                    color: #737373;
                    p{
                        line-height: 20px;
                    }
                }
                .timer{
                    width: 144px;
                    text-align: right;
                    line-height: 48px;
                    float: right;
                    color: #e5e5e5;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
                .reply{
                    float: right;
                    color: #0060d0;
                    position: relative;
                    line-height: 48px;
                    padding-right: 16px;
                    padding-left: 24px;
                    
                    cursor: pointer;
                    span{
                        position: absolute;
                        top: 45%;
                        right: 4px;
                        height: 0;
                        width: 0;
                        border: 4px solid;
                        border-color: transparent;
                        border-top-color: #3b85da;
                        transition:  all 0.8s;
                    }
                    .active{
                        transform: rotate(180deg);
                        transform-origin: center 20%;
                    }

                }
            }
        }
    }
</style>
