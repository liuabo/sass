<template>
    <div class="lead">
        <commHead :topTitle="topTitle" />
        <div style="padding-left:16px;">
            <div class="hint">
                <p>温馨提示:导入的文件必须为xls 或 xlsx </p>
                <Button type="error">下载文件模板</Button>
            </div>
            <div class="hi_con">
                <Upload type="drag" :on-success='uploadCallback' :on-preview='preview' action="//jsonplaceholder.typicode.com/posts/">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>将文件拖拽至此区域或点击上传</p>
                    </div>
                </Upload>
                <div class="upd">
                    <p>文件中的成员将被导入至:</p>
                    <span><img style="padding-right:5px;" :src="pic.filPic" alt="">{{upList}}</span>
                    <a href="javascript:;">修改</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commHead from './commHead';
import filPic from '../../assets/images/up.png';  
export default {
    name: 'toLead',
    data() {
        return {
            topTitle: "批量导入",
            upList: '开发组',
            pic: {filPic}
        }
    },
    components: { commHead },
    methods: {
        uploadCallback(response, file, fileList) {
        },
        preview(file) {
            console.log(file.response);
        }
    }
}
</script>

<style lang="scss">
#upload {
  background-color: #ed3f14;
  color: #fff;
  margin-top: 8px;
}
.lead {
  width: 100%;
  height: 400px;
  background: #fff;
  position: absolute;
  top: 64px;
  .hint {
    line-height: 56px;
    font-size: 12px;
    p {
      display: inline-block;
      color: #d73838;
    }
    button {
      width: 96px !important;
      height: 24px;
      margin-left: 18px;
      padding: 0;
    }
  }
  .hi_con {
    width: 344px;
    height: 120px;
    text-align: center;
    .icon {
      margin-top: 16px;
      font-size: 32px;
      color: #888;
    }
    .ivu-upload {
      .ivu-upload-drag {
        background: #eee !important;
      }
    }
    .upd{
        width:342px;
        display: flex;
        justify-content: center;
        span{
            margin: 0 16px;
            padding: 2px 10px;
            background: #cc0000;
            border-radius: 4px;
            color: #f9dbdb;
        }
        a{
            color: #cc0000;
            // border-bottom: 1px solid #cc0000;
            text-decoration: underline;
            line-height: 25px;
        }
        p{
            line-height: 25px;
        }
    }
  }
}
</style>
