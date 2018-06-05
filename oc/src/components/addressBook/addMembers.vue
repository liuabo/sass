<template>
	<div class="ivu-layout-content" id="add">
		<commHead :topTitle="topTitle" />
		<div class="add_top">
			<router-link :to="{ name: '', params: {} }">
				<Button class="ivu-btn_01" id="save" @click="info">保存并继续添加</Button>
			</router-link>
			<a ref="javascript">
				<Button @click="save" class="ipt ivu-btn_01">保存</Button>
			</a>
			<a href="javascript:;">
				<Button @click="callOff" class="off ivu-btn_02">取消</Button>
			</a>
		</div>
		<div class="add_content">
			<Form id="from" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
				<FormItem label="姓名" prop="name">
					<Input v-model="formValidate.name" placeholder="请输入您的用户名" />
				</FormItem>
				<FormItem label="英文名">
					<input class="ivu-input" @blur="verifyEng" v-model="formValidate.IDd" placeholder="请输入您的英文名" />
					<span class="ivu-form-item-error-tip" v-show="isEng">
						请输入正确英文名
					</span>
				</FormItem>
				<FormItem label="账号" prop="ID">
					<input class="ivu-input" v-model="formValidate.ID" @blur="verifyName" placeholder="请输入您的账号" />
					<span class="ivu-form-item-error-tip" v-show="isUser">
						帐号只能由字母、数字及下划线组成
					</span>
				</FormItem>
				<FormItem label="性别">
					<RadioGroup v-model="formItem.radio">
						<Radio label="male">男</Radio>
						<Radio label="female">女</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="身份证">
					<input type="text" placeholder="请输入您的身份证" id="ID" class="ivu-input" v-model="IDNum" @blur="verifyID">
					<span class="ivu-form-item-error-tip" id="errorMassage" v-show="isID">
						请输入正确身份证
					</span>
				</FormItem>
				<FormItem label="手机" prop="mail">
					<input type="text" placeholder="请输入您的手机号" ref="phone" id="phone" class="ivu-input" v-model="phoneNum" @blur="verifyPhone">
					<span class="ivu-form-item-error-tip" id="errorMassage" v-show="isPhone">
						请输入正确手机号
					</span>
				</FormItem>
				<FormItem label="座机">
					<input type="text" placeholder="请输入您的座机号" id="Plan" class="ivu-input" v-model="PlanNum" @blur="verifyPlan">
					<span class="ivu-form-item-error-tip" id="errorMassage" v-show="isPlan">
						请输入正确座机号
					</span>
				</FormItem>
				<FormItem label="邮箱">
					<input class="ivu-input" ref="email" @blur="verifyEmail" placeholder="请输入您的邮箱" />
					<span class="ivu-form-item-error-tip" v-show="isEmail">
						请输入正确邮箱
					</span>
				</FormItem>
			</Form>

			<div class="member_edit_sec">
				<p>
					<span>部门:</span>&nbsp;&nbsp;&nbsp;&nbsp;
					<span id="dev">
						<span style="background:#cc0000;margin:0 4px; padding:4px 6px;font-size:12px;color:#fff;border-radius:4px;" v-if="show" v-for="(item,index) in userList" :key="item" @click="delle(index)">
							<font-awesome-icon style="margin:0 5px 0 4px;" :icon="['fas','file-alt']" />{{item.name}}</span>
					</span>&nbsp;
					<a @click="modal2 = true" href="javascript:;">修改</a>
					<Modal id="pop_01" v-model="modal2" width="360">
						<secPop :isToFlag='isToFlag' />
						<div slot="footer">
						</div>
					</Modal>

				</p>
				<p>
					<span>标签:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span id="dev">
						<span style="background:#cc0000;margin:0 4px; padding:4px 6px;font-size:12px;color:#fff;border-radius:4px;" v-for="(item,index) in labelList" :key="item.id" @click="del(index)">
							<font-awesome-icon style="margin:0 5px 0 4px;" :icon="['fas','file-alt']" />{{item.name}}</span>
					</span>&nbsp;
					<a class="back" @click="isPopPup = true" href="javascript:;">修改</a>
					<iPop ref="childen" class='p_style' :isFlag='isFlag' v-if="isPopPup" />
				</p>
				<label for="duty">职务:&nbsp;&nbsp;&nbsp;&nbsp;</label>
				<input type="text" id="duty" ref="dut" />
			</div>
			<div class="add_top">
				<router-link :to="{ name: '', params: {} }">
					<Button class="ivu-btn_01" id="save" @click="info">保存并继续添加</Button>
				</router-link>
				<a ref="javascript">
					<Button @click="save" class="ipt ivu-btn_01">保存</Button>
				</a>
				<a href="javascript:;">
					<Button @click="callOff" class="off ivu-btn_02">取消</Button>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
import commHead from './commHead';
import axios from 'axios'
import Bus from '../../assets/js/bus'
import iPop from './labelPop/label';
import secPop from './labelPop'


export default {
	name: "addMembers",
	components: { commHead, iPop, secPop },
	data() {
		return {
			departmentIds: '',//批量设置部门
			userList: [],
			labelList: [],
			topTitle: "添加成员",
			show: true,
			phoneNum: '',
			IDNum: '',
			isPhone: false,
			isPopPup: false,
			isID: false,
			isEng: false,
			isPlan: false,
			modal2: false,
			isUser: false,
			isEmail: false,
			PlanNum: '',
			formItem: {
				input: '',
				select: '',
				radio: 'male',
				checkbox: [],
				switch: true,
				date: '',
				time: '',
				slider: [20, 50],
				textarea: ''
			},
			formValidate: {
				name: '',
				mail: '',
				city: '',
				gender: '',
				interest: [],
				date: '',
				time: '',
				desc: '',
				Id: '',
				Idd: '',
				identification: '',
				department: ''
			},
			ruleValidate: {
				name: [
					{ required: true, message: '用户名不能为空', trigger: 'blur' }
				],
				ID: [
					{ required: true, message: '账号不能为空', trigger: 'blur' }
				],
				IDd: [
					{ required: true, message: '英文名不能为空', trigger: 'blur' }
				],
				identification: [
					{ required: true, message: '请输入正确信息', trigger: 'blur' }
				],
				mail: [
					{ required: true, message: '邮箱不能为空', trigger: 'blur' },
					{ type: 'email', message: '请输入正确信息', trigger: 'blur' }
				],
				city: [
					{ required: true, message: 'Please select the city', trigger: 'change' }
				],
				gender: [
					{ required: true, message: 'Please select gender', trigger: 'change' }
				],
				interest: [
					{ required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
					{ type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
				],
				date: [
					{ required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
				],
				time: [
					{ required: true, type: 'string', message: 'Please select time', trigger: 'change' }
				],
				desc: [
					{ required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
					{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		verifyPhone() {
			const reg = /^1[3|4|5|7|8][0-9]{9}$/;
			if (reg.test(this.phoneNum)) {
				console.log('正确的手机号')
				this.isPhone = false
			} else {
				console.log('手机号错误')
				this.isPhone = true
			}
		},
		verifyID() {
			const reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
			if (reg.test(this.IDNum)) {
				console.log('正确')
				this.isID = false
			} else {
				console.log('错误')
				this.isID = true
			}
		},
		verifyPlan() {
			const reg = /^[0-9-()（）]{7,18}$/;
			if (reg.test(this.PlanNum)) {
				console.log('正确')
				this.isPlan = false
			} else {
				console.log('错误')
				this.isPlan = true
			}
		},
		verifyEng() {
			const reg = /^[A-Za-z]+$/;
			if (reg.test(this.formValidate.IDd)) {
				console.log('正确')
				this.isEng = false
			} else {
				console.log('错误')
				this.isEng = true
			}
		},
		verifyName() {
			console.log(111);

			const reg = /^[a-zA-Z]{1}\w*$/;
			if (reg.test(this.formValidate.ID)) {
				console.log('正确')
				this.isUser = false
			} else {
				console.log('错误')
				this.isUser = true
			}
		},
		verifyEmail() {
			const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
			if (reg.test(this.$refs.email.value)) {
				console.log('正确')
				this.isEmail = false
			} else {
				console.log('错误')
				this.isEmail = true
			}
		},
		info() {
			if (this.phoneNum != '' && this.formValidate.name != '') {
				this.$Message.info("保存成功");
				let data = {
					department: this.departmentIds,
					name: this.formValidate.name,   //用户名字
					userId: this.formValidate.ID,
					englishName: this.formValidate.IDd,          //用户英文名
					mobile: this.phoneNum,                       //手机号
					position: this.$refs.dut.value,              //用户职位
					order: 1,                                    //用户在部门内排序,需要和部门列表个数一致
					gender: null,                                //性别
					email: this.formValidate.mail,               //邮件
					telephone: this.PlanNum,                     //座机
					isleader: null,                              //是否上级
					avatarMediaid: null,                         //头像素材id
					avatar: null,                                //头像
					qr_code: null,                               //用户二维码
					enable: null,                                //用户是否生效
					status: 0,                                   //用户激活状态
					extattr: null,                               //用户自定义状态
					to_invite: null,                             //是否邀请加入
				}
				var token = sessionStorage['token']
				// var token = 'BearereyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJIYW5XZWkiLCJjb3JwSWQiOiJ3d2MwMjYxNWY0YTg4NzNiNDYiLCJuYW1lIjoi6Z-p5LyfIiwiZXhwIjoxNTI2NDYzMjc0fQ.GxbLCcCBZf-Gmcp1OzJcnfaZGFBT-loveGdt1fz2GJBv1f0lmv5ZLX8P6RzfhmqT3Nxxt3jydzApsdVZJLXuZg'
				let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }

				axios.post(this.$url_ + '/member/add', data, config).then(res => {
					console.log(res);

				});
				console.log(this.department);

			} else {
				this.$Message.info("请输入正确信息");
			}

		},
		save() {
			if (this.phoneNum != '' && this.formValidate.name != '') {
				this.info()
				this.$router.go(-1)
				Bus.$emit('flag', true)
				// this.
			} else {
				this.$Message.info("请输入完整信息");
			}
		},
		savSec() {
			this.modal2 = false;
			this.$refs.child.saveSec()
		},
		callOff() {
			Bus.$emit('flag', true)
			this.$router.history.go(-1)
		},
		handleClose(index) {
			console.log(index);
			this.$refs.childen.abc()
			// this.show[index] = false;
		},
		isRange(rightList) {
			this.isPopPup = false
			console.log(rightList);
			this.labelList = rightList


		},
		isToFlag(rightList) {
			this.modal2 = false
			this.isPopPup = false
			console.log(rightList);
			this.userList = rightList
			rightList.forEach((item) => {
				this.departmentIds += item.depId + ','
			})
		},
		del(index) {
			this.labelList.splice(index, 1);
		},
		delle(index) {
			this.userList.splice(index, 1)
		},
		isFlag(rightList) {//标签弹窗
			console.log(rightList);

			rightList.forEach((item) => {
				this.departmentIds += item.id + ','
			})
			this.isPopPup = false
			this.labelList = rightList
			console.log(this.labelList);
		},
	},
	mounted() {
		Bus.$on('sendSecName', (name, id) => {
			this.userList = name
			this.department = id.join(',')
			console.log(id);

		})
	}
}
</script>
<style lang="scss">
#pop_01 {
  background: firebrick;
  .ivu-modal-content {
    width: 400px;
    height: 420px;
    .ivu-modal-body {
      width: 100%;
      height: 100%;
      padding: 0;
      border-radius: 4px;
    }
    .ivu-modal-footer {
      width: 200px;
      float: right;
      border: none;
    }
    .ivu-btn-error {
      width: 64px;
      height: 24px;
      line-height: 12px;
      &:first-child {
        background: #888;
        border: none;
      }
    }
  }
}

#sec {
  background: #fff;
  height: 420px;
}
#from {
  margin-top: 24px;
  .ivu-input {
    width: 208px !important;
  }
}
#add {
  width: 100%;
  flex: 1;
  background: #fff;
  //弹窗样式
  #popup {
    width: 400px;
    height: 420px;
    border-radius: 6px;
    position: fixed;
    top: 100px;
    // background: #ccc;
    .savBtn {
      width: 200px;
      height: 57px;
      background: blue;
      position: absolute;
      bottom: 0;
      right: 0;
      button {
        margin: 12px 16px;
        .ivu-btn {
          padding: 6px 20px;
        }
      }
    }
  }
  input {
    width: 208px;
    height: 24px;
    border: 1px solid #ccc;
  }
  .add_content {
    text-align: left;
    margin-bottom: 100px;
    .adjust {
      input {
        margin-left: 14px;
      }
    }
    .member_edit_sec {
      padding: 20px 36px;
      .back {
        padding: 5px 25px;
        background: #0060d0;
        border-radius: 4px;
        color: #f9dbdb;
      }
      font-size: 12px;
      #dev {
        position: relative;
        bottom: -7px;
        border-radius: 4px;
        display: inline-block;
        font-size: 12px;
        max-width: 294px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #f9dbdb;
        .ivu-tag {
          background: #cc0000;
          .ivu-tag-text {
            color: #fff;
          }
        }
      }
      #duty {
        border-radius: 2px;
        height: 32px;
      }
      p {
        margin-bottom: 10px;
        span {
          display: inline-block;
        }
        a {
          color: #0099cc;
        }
      }
      .p_style {
        p {
          margin: 0;
        }
      }
    }
  }
  .add_top {
    padding-top: 20px;
    padding-left: 32px;
    button {
      border: none;
    }
    .ivu-btn_01:hover {
      border: none;
      background: rgba(170, 3, 3, 1) !important;
    }
    .ivu-btn_02:hover {
      border: none;
      background: rgba(93, 91, 91, 1) !important;
    }
    .ipt {
      background: #cc0000;
      color: #fff;
    }
    .off {
      background: #888;
      color: #fff;
    }
    #save {
      background: #cc0000;
      color: #fff;
    }
    a:first-child {
      background-color: #3a85c3;
      color: #fff;
    }
    a {
      margin-right: 6px;
      border-radius: 2px;
      vertical-align: middle;
      line-height: 24px;
      font-size: 14px;
      background: #fff;
    }
  }
}
</style>
