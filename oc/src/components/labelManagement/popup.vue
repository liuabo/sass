<template>
  <div class="overlay " >
      <div class="content" id="css">
          <div class="con unblur">
                <p>{{classNameLength}}/20</p>
                <div class="text clearfix"><input type="text" v-model="label.tagName"></div>
                <div class="button" >
                    <Button @click="isShowchild()" type="primary" >取消</Button>
                    <Button @click="save()"  type="primary">保存</Button>
                </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: "labePpopup",
    props:['label',"isShowchild",'save'],
    data(){
      return {
        isActive: false,
        classNameLength:0,
        lb:''
      } 
    },
    methods: {
        changeTitle() {
            let length = this.label.tagName.length;
            if (length > 20) {
                this.label.tagName = this.label.tagName.substr(0, 20);
            }
            this.classNameLength = this.label.tagName.length;
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
    .content{
        position: fixed;
        left: 0;
        top: 64px;
        height:100%;
        width: 100%;
        background-color:rgba($color: #000000, $alpha: 0.5);
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
