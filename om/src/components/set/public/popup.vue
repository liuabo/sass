<template>
  <div class="overlay " >
      <div class="content" id="css">
          <div class="con unblur">
                <p>{{classNameLength}}/20</p>
                <div class="text clearfix"><input type="text" v-model="classify.name"></div>
                <div class="button" >
                    <Button @click="changeOverlay()" type="primary" >取消</Button>
                    <Button @click="save(classify)"  type="primary">保存</Button>
                </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: "popup",
    props:['title','classify','save',"changeOverlay"],
    data(){
      return {
        isActive: false,
        classNameLength:0,
      }
    },
    methods: {
        changeTitle() {
            let length = this.classify.name.length;
            if (length > 20) {
                this.classify.name = this.classify.name.substr(0, 20);
            }
            this.classNameLength = this.classify.name.length;
        },
    },
    updated(){
       this.changeTitle()
    },
  }
</script>
<style scoped lang="scss">
    [v-cloak] {
        display: none
    }
    .overlay{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color:rgba($color: #000000, $alpha: 0.5);
    }
    .content{
        .con{
            position: absolute;
            top: 90px;
            left: 320px;
            height: 160px;
            width: 240px;
            background-color: #eeeeee;
            padding: 20px 16px;
            p{
                text-align: right;
            }
            .text{
                padding: 12px 0 20px;
                input{
                    width: 208px;
                    height: 32px;
                    background: #fff;
                    border-radius: 2px;
                    color: #a3a3a3; 
                    padding-left: 6px;
                }
            }
            .button{
                button{
                    width: 96px;
                    &:nth-of-type(1){
                        background: #cccccc;
                        border-color: #cccccc;
                        color: #f5f5f5;
                        margin-right: 12px;
                    }
                     &:nth-of-type(1){
                        background: #cc0001;
                        border-color: #cc0001;
                        color: #f5f5f5;
                    }
                }
            }
        }
    }
</style>
