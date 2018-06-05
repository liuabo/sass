<template>
  <div class="preview">
      <div class="content">
          <dl>
              <dt>
                  <h3 class="title">{{view.title}}</h3>
                  <span class="timer">{{time | timeFilter(true,"/")}}</span>
              </dt>
              <dd class="con">
                  <span v-if="view.content"  v-html="view.content"></span>
                  <iframe class="ifram" frameboder="0" v-else :src="view.outlink"></iframe>
              </dd>
          </dl>
          <div class="clone" @click="lookPpreview(0,$event)"></div>
      </div>
  </div>
</template>
<script>
export default {
    name:'preview',
    props:['view','lookPpreview'],
    data(){
        return{
            time:""
        }
    },
    mounted(){
        this.time = new Date().getTime()
        
    }
}
</script>
<style lang="scss" scoped>
    .preview{
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100000;
        .content{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            padding: 100px 16px;
            width: 365px;
            height: 720px;
            background-image: url(../../../assets/images/phone.png);
            background-size: 365px 720px;
            dl{
                height: 520px;
                width: 333px;
                background: #fff;
                overflow-x: hidden;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                dt{
                    height: 96px;
                }
                dd{
                    // background: #000;
                    flex: 1;
                }
            }
            .title{
                font-size: 16px;
                line-height: 48px;
                font-weight: 600;
                color: #424242;
            }
            .timer{
                display: inline-block;
                margin-bottom: 28px;
                color: #868686;
            }
            dd{
                color: #444444;
            }
            .clone{
                cursor: pointer;
                height: 52px;
                width: 52px;
                border-radius: 50%;
                background: url(../../../assets/images/clone.png) no-repeat;
                background-size: 55px 55px;
                position: absolute;
                bottom: 25px;
                left: 50%;
                transform: translate(-50%);
            }
        }
    }
    .ifram{
        height: 100%;
        width: 100%;
        border:0;
    }
</style>
