<template>
	<div class="tree-menu">
		<ul v-for="(menuItem,index) in theModel" :key="menuItem.id">
			<my-tree :Index='index' :len='len' :delLeftId='delLeftId' :isFlag='isFlag' :sendData='sendData' :Tick='Tick' :model="menuItem"></my-tree>
		</ul>
		<div class="popRight">
			<p v-for='(item,index) in rightList' :key="item.depId">
				{{item.name}}
				<font-awesome-icon @click="del(index,item.depId)" style="color:#d00; position:absolute; right:38px;margin-top:6px;" :icon="['fas','times']" />
			</p>
		</div>
	</div>
</template>
 
<script>
import Bus from '../../../assets/js/bus'
import myTree from './treeMenu'
import labPic from '../../../assets/images/labPic.png'
import tick from "../../../assets/images/tick.png";
export default {
	props: ['isToFlag', 'sendSecList'],
	components: {
		myTree
	},
	data() {
		return {
			pic: { tick, labPic },
			theModel: '',
			Index: '',
			len: '',
			sendList: "",
			delLeftId: '',
			rightList: [],
			labelsTick: [],
			rightListId: [],
			leftList: [],
			flag: [],
			msg: '',
			Tick: '',
			delIndex: '',
			sendSecList: '',
			secList: [],
			arr: [],
			userIds: ''
		}
	},
	methods: {
		callback() {
			let data = {
				departmentId: 0,
				pageNum: 1,
				pageSize: 10
			}
			this.$axiosApi.get('department/list_one_level', data, res => {
				this.theModel = res.data.data
				this.len = res.data.data.length
				this.theModel.forEach((item, index) => {
					this.Index = index
				});
			})
		},
		isFlag() {
			this.isToFlag(this.rightList)
			let data = {
				userIds: this.userIds,
				departmentIds: this.secList
			}
			return
			this.$axiosApi.post('/departments/users_dept/add', data, res => {
			})
		},
		sendData(item, index, id) {
			var index = index + 1 || -1
			var isHas = this.rightList.some((it, i) => {
				if (item.depId == it.depId) {
					this.rightList.splice(i, 1);
					var arr = this.labelsTick[index - 1] = false
					this.msg = this.labelsTick[index - 1] = false
					this.theModel.forEach((item, index) => {
						item.delFlag = false
					})
					return true;
				} else {
					return false;
				}
			});
			if (!isHas) {
				this.labelsTick[index - 1] = true
				this.msg = this.labelsTick[index - 1] = true
				this.rightList.push({ name: item.name, depId: item.depId });
			}
			this.Tick = this.labelsTick
			var arr = this.labelsTick
			Bus.$emit('flag', arr)
			this.rightList.forEach((item, index) => {
				this.delIndex = index + 1
			})
			this.rightList.forEach((item, index) => {
				this.arr.push(item.depId)
				var Array = [...new Set(this.arr)].join(',')
				this.secList = Array
			})
		},
		del(index, id) {
			this.rightList.splice(index, 1);
			this.labelsTick[index] = false
			var arr = this.labelsTick
			this.delLeftId = id
		}
	},
	watch: {
		sendSecList(curVal, oldVal) {
			curVal.forEach(element => {
				this.userIds += element.userId + ','
				element.department_list.forEach((item) => {
					this.secList.push(item.depId)
					var msg = [...new Set(this.secList)]
					this.secList = msg
				})
			});
		}
	},
	mounted() {
		this.callback()
	}
}
</script>
<style lang="scss" scoped>
.tree-menu {
  height: 100%;
  display: flex;
  text-align: left;
  .popRight {
    padding: 16px;
    p {
      line-height: 24px;
    }
  }
  ul {
    background: #eee;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 15px;
    overflow-y: auto li {
      text-align: left;
    }
  }
  ul,
  div {
    width: 50%;
  }
}
</style>
