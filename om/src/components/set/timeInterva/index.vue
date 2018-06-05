<template>
    <div class="timeInterva">
        <cn-header :topTitle='topTitle'></cn-header>
        <div class="content">
            <Timeline id="it">
                <TimelineItem v-for="item in list" :key="item.id" :color='item.color'>
                    <Icon type="record" slot="dot"></Icon>
                    <h4 class="time" :class="item.color=='#cccccc' ? 'time_' :''"><span>{{item.sendStateTime}}：</span>{{item.sendDate | timeFilter(false,'/')}}</h4>
                    <p class="timer" :class="item.color=='#cccccc' ? 'timer_' :''" v-for="i in item.titleArray" :key="i">《{{i}}》</p>
                </TimelineItem>
            </Timeline>
        </div>

    </div>
</template>
<script>
import cnHeader from '../../news/public/cnHeader'
export default {
    name:'timeInterva',
    components:{cnHeader},
    data() {
        return {
            topTitle:'定时发布',
            list:[],
            limit : 15,
            page : 0,
            more: true,
        }
    },
    methods:{
        getList(){
            let data = {
                limit : this.limit,
                offset : this.page * this.limit
            }
            this.$util.hintShow(this,'正在加载中,请稍等...')
            this.$api.post("/omweb/newsQuartzPush/list",data,r=>{
                    this.$util.hintHide(this)
                    this.list.push(...r.data.rows)
                    this.changeColor()
            })
        },
        changeColor(){
            let date = Date.now()
            this.list.forEach((item,index)=>{
                if(item.sendDate > date){
                    if(item.sendDate - date >= 86400000){
                        this.list[index]['sendStateTime'] = '发布时间'
                        this.list[index]['color'] = '#0060d0'
                    }else if(item.sendDate - date < 86400000 && item.sendDate - date > 3600000){
                        this.list[index]['sendStateTime'] = '发布时间'
                        this.list[index]['color'] = '#ff9505'
                    }else if(item.sendDate - date <= 3600000){
                        this.list[index]['sendStateTime'] = '即将发布'
                        this.list[index]['color'] = '#cc0000'
                    }
                }else{
                    this.list[index]['sendStateTime'] = '已发布'
                    this.list[index]['color'] = '#cccccc'
                }
            })
        }
    },
    mounted(){
        this.getList()
    }
    
}
</script>
<style lang="scss" scoped>
    .timeInterva{
        height: 100%;
        width: 100%;
        display:flex;
        flex-direction: column;
        .content{
            flex:1;
            overflow:auto;
            padding: 16px;
            .time{
                line-height: 1em;
                color: #a8a8a8;
                font-size: 12px;
                font-weight: 300;
                margin-bottom: 12px;
            }
            .timer{
                line-height: 24px;
                cursor: pointer;
                font-size: 12px;
                color: #74a8e5;
            }
            .timer_{
                color:#ddd;
            }
            .time_{
                color: #dddddd;
            }
        }
        
    }

    .ivu-timeline{
        li{
           border-left: 2px solid transparent;
        }
    }
</style>
