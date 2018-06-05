<template>
	<div class="detail">
		<commHead :topTitle="topTitle" />
		<div class="cont_top">
			<dl>
				<dt><img :src='list.avatar || pic.head' /></dt>
				<dd class="top_">
					<p>{{list.name}}</p>
					<p class="widlen">
						<span>账号:</span>
						{{ list.userId }}
						</p>
				</dd>
				<dd>
					<p class="widlen">
						<span>部门:</span>
						<span v-for="item in deData" :key="item.corpId">{{item.name}} </span>
					</p>
					<p>
						<span>职务:</span>{{list.position || '未设置'}}</p>
				</dd>
			</dl>
		</div>
		<div class="con_cen">
			<div class="top_">
				<p>
					<span>手机:</span>{{list.mobile}}</p>
				<p>
					<span>座机:</span>{{list.telephone || '未设置'}}</p>
			</div>
			<div>
				<p>
					<span>邮箱:</span>{{list.email || '未设置'}}</p>
				<p>
					<span>微信:</span>{{list.extattr || '未设置'}}</p>
			</div>
		</div>
		<div class="btn_">
			<a href="javascript:;">
				<Button @click="stick(list.userId,list.department)" type="primary"><img class="ivu-icon" :src="pic.stick" />置顶</Button>
				<Button @click="gotoD(list.userId)" type="primary"><img class="ivu-icon" :src="pic.edit" />编辑</Button>
				<Button @click="modal9 = true" type="primary"><img class="ivu-icon" :src="pic.del" />删除</Button>
			</a>
			<Modal title="删除成员" v-model="modal9" :styles="{top: '100px'}">
				<p>删除后{{name}}的企业微信消息记录将全部清除。</p>
				<div slot="footer">
					<Button type="error" size="large" long @click="delUser()">Delete</Button>
				</div>
			</Modal>
		</div>
	</div>
</template>

<script>
import commHead from './commHead'
import axios from 'axios'
import head from '../../assets/images/headPor.png'
import stick from '../../assets/images/Stick.png'
import edit from '../../assets/images/edit.png'
import del from '../../assets/images/del_.png'
export default {
	name: "detail",
	data() {
		return {
			pic: { head, stick, edit, del },
			topTitle: "成员详情",
			modal9: false,
			config: '',
			name: '张三',
			list: [],
			deData: [],
			ID: ''
		};
	},
	components: { commHead },
	methods: {
		gotoD(id) {
			console.log(id);

			// this.$router.history.push({ name: 'edit' })
			this.$router.history.push({ name: 'edit', params: { fid: id } })
		},
		getdata() {
			let userId = this.ID
			console.log(userId);

			let data = {
				userId,
			}
			// console.log(userId);
			this.$axiosApi.get('/member/detail', data, res => {
				console.log(res);
				this.list = res.data.data
				console.log(this.list);
				res.data.data.department_list.forEach(element => {
					this.deData.push(element)
					console.log(this.deData);

				});
				this.name = res.data.data.name
			})
		},
		forbidden() {

			let data = {
				userId: this.$route.params.fid,
			}
			this.$axiosApi.post('/member/lock', data, res => {
				alert("已禁用")
				this.getdata()
			})
		},
		delUser() {
			this.modal9 = false
			let data = {
				userId: this.$route.params.fid,
			}
			this.$axiosApi.post('/member/remove', data, res => {

			})
		},    //置顶
		stick(id, departmentId) {
			// console.log("test" + id);

			let data = {
				userId: id,
			}
			this.$axiosApi.post('/department/member/stick', data, res => {
				console.log(res);
				this.$Message.success('置顶成功');
				
			})
		},
	},
	created() {
		this.ID = this.$route.params.fid
	},
	mounted() {
		this.getdata()
	}
};
</script>

<style lang="scss">
.detail {
	flex: 1;
	.widlen{
		width:360px;
		overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
	}
  span {
    color: #989898;
  }
  .ivu-icon {
    font-size: 16px;
    position: relative;
    left: -5px;
    top: 1px;
  }
  .cont_top {
    padding: 32px 32px 32px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    margin-left: 32px;
		img{
			width:64px;
			height:64px;
			border-radius: 50%;
		}
    dl {
      height: 80px;
      display: flex;
      align-items: center;
      dd {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        &:first-child {
        }
      }
      .top_ {
				width:140px;
        margin: 0 30px;
      }
    }
  }
  .con_cen {
    width: 500px;
    height: 145px;
    padding: 32px 32px 32px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    margin-left: 32px;
    display: flex;
    align-items: center;
    div {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .top_ {
      margin-right: 150px;
    }
  }
  .btn_ {
    padding-left: 32px;
    margin-top: 32px;
    button {
      background: #cc0000;
      border: none;
      span {
        color: #fff;
      }
      &:hover {
        background: rgba(167, 4, 4, 1);
      }
    }
    button:nth-of-type(2) {
      margin: 0 32px;
    }
  }
}
</style>
