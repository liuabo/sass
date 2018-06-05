<template>
	<div id="login">
		<div class="log_head">
			<div class="log_con">
				<h1><img :src="login.smallLogo" alt="logo"><span>管理平台</span></h1>
			</div>
		</div>
		<div style="width:1280px;height:100%;margin:0 auto;background:rgba(0, 0, 0, 0.5)">
			<div class="login_content">
				<img :src="login.bigLogo" alt="">
				<Tabs id="tabs" type="card">
					<TabPane label="企业微信登录">
						<div class="code">
							<img style="padding-top:40px;" :src="login.imgSrc_02" alt="">
							<!-- <button> -->
								<a :href='host' ><img id="imgPic" :src="login.imgSrc_03" alt="">企业微信登录</a>
							<!-- </button> -->
						</div>
					</TabPane>
					<TabPane id="ipt" label="账户登录">
						<!-- <input type="text">
						<input type="text"> -->
						<Form :model="formItem" :label-width="80">
								<Input id="iptt" v-model="formItem.UserId" placeholder=""/>
								<Input  v-model="formItem.passWord" placeholder=""/>
						</Form>
            <div class="commit">
              <span>记住账号</span>
						<a style="margin-left:168px;" href="">忘记密码</a>
             <Button type="error">账户登录</Button>
            </div>
						
					</TabPane>
				</Tabs>
			</div>
		</div>

	</div>
</template>

<script>
import smallLogo from "../../assets/images/smallLogo.png";
import bigLogo from "../../assets/images/bigLogo.png";
import imgSrc_01 from "../../assets/images/loginBG.png";
import imgSrc_02 from "../../assets/images/wechat.png";
import imgSrc_03 from "../../assets/images/wechat1.png";
export default {
	name: "login",
	data() {
		return {
      host:"",
			login: { smallLogo,bigLogo, imgSrc_01, imgSrc_02, imgSrc_03 },
			formItem: {
          UserId: '',
          passWord: '',
      }
		};
	},
  mounted(){
    this.host = process.env.API_ROOT + this.$newsUrl + "/login/weixin"
  }
};
</script>

<style lang="scss">
//密码框样式
#iptt{
	margin:40px 0 32px 0;
}
.ivu-tabs-tab-active {
  background: #fff !important;
}
#ipt {
  box-sizing: border-box;
  padding: 0 16px;
	.ivu-input{
		border-color: #cc0000;
	}
	.ivu-form{
		margin-bottom: 4px;
	}
  .commit{
       text-align: center;
     .ivu-btn-error{
       width:160px;
       height:40px;
       margin-top: 20px;
       background: #cb0101;
       font-size: 14px;
     }
  }
}
#tabs {
  width: 320px;
  height: 328px;
  background: #fff;
  margin: 0 auto;
  margin-top: 16px;
  border-radius: 5px;
  .ivu-tabs-nav-container {
    height: 40px !important;
  }
  .code {
    text-align: center;
    h2 {
      width: 192px;
      height: 192px;
      background: rgba($color: #ccc, $alpha: 0.5);
      display: inline-block;
    }
    p {
      line-height: 32px;
    }
    a {
      width: 200px;
      height: 40px;
      background: #2a85de;
      margin-top: 35px;
      border-radius: 4px;
      position: relative;
      display: inline-block;
      line-height: 40px;
      color: #fff;
      #imgPic{
          position: relative;
          margin-right: 8px;
          top: 4px;
      }
      
    }
  }
  .ivu-tabs-nav {
    width: 100% !important;
  }
  .ivu-tabs-tab {
    width: 50%;
    height: 40px;
    text-align: center;
    border: none !important;
    border-radius: 0 !important;
    // line-height: 40px;
    padding: 10px 0 4px !important;
    margin-right: 0px;
    background: #ccc;
    .ivu-tabs-nav-container {
      height: 40px !important;
    }
  }
}
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url(../../assets/images/loginBG.png) center;
  .log_head {
    width: 100%;
    background: #cc0001;
    .log_con {
      max-width: 1280px;
      height: 64px;
      margin: 0 auto;
      h1 {
        width: 200px;
        height: 64px;
        font-weight: 600;
        
        >img {
          margin-top: 16px;
          float: left;
        }
        span{
            float: left;
            line-height: 28px;
            padding-left: 8px;
            color: #fff;
            font-size: 14px;
             margin-top: 16px;
        }
      }
    }
  }
  .login_content {
    max-width: 1280px;
    margin: 0 auto;
    >img {
      display: block;
      margin: 0 auto;
      padding-top: 60px;
    }
  }
}
</style>
