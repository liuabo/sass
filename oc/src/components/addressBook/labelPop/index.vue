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
			sendSecList: [],
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
			// console.log(this.secList);	
			let data = {
				userIds: this.userIds,
				departmentIds: this.secList
			}
			return
			this.$axiosApi.post('/departments/users_dept/add', data, res => {
				console.log(res);

			})
		},
		sendData(item, index, id) {
			var index = index + 1 || -1
			var isHas = this.rightList.some((it, i) => {
				if (item.depId == it.depId) {
					this.rightList.splice(i, 1);
					var arr = this.labelsTick[index - 1] = false
					// Bus.$emit('flag',arr)
					this.msg = this.labelsTick[index - 1] = false
					// this.leftList[index - 1].delFlag = false
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
				// this.leftList[index - 1].delFlag = true
				this.rightList.push({ name: item.name, depId: item.depId });
			}
			// console.log(this.labelsTick);
			this.Tick = this.labelsTick
			var arr = this.labelsTick
			Bus.$emit('flag', arr)
			this.rightList.forEach((item, index) => {
				// console.log(index);
				this.delIndex = index + 1
			})
			// console.log(this.delIndex);
			this.rightList.forEach((item, index) => {
				this.arr.push(item.depId)
				// console.log(this.arr)
				// this.secList.push(this.arr.join(','))
				// this.secList.push(item.depId)
				// console.log([...new Set(this.secList)]);
				var Array = [...new Set(this.arr)].join(',')
				this.secList = Array
				// console.log(this.secList);

			})
		},
		del(index, id) {
			console.log(index);

			this.rightList.splice(index, 1);
			this.labelsTick[index] = false
			var arr = this.labelsTick
			// console.log(arr);
			this.delLeftId = id
			// Bus.$emit('flag', arr)
		}
	},
	watch: {
		sendSecList(curVal, oldVal) {
			// console.log(1,curVal);
			console.log(curVal);
			return
			console.log(45687);
			
			if( curVal == '' ) {
				return
			} else {
				curVal.forEach(element => {
				// console.log(element.department_list);
				// secList
				console.log(element.department_list);
				
				// return
				this.userIds += element.userId + ','
				element.department_list.forEach((item) => {
					this.secList.push(item.depId)

					// console.log([...new Set(this.secList)]);
					// this.secList.push([...new Set(this.secList)])
					// console.log([...new Set(this.secList)]);
					var msg = [...new Set(this.secList)]
					this.secList = msg
					console.log(this.secList);


				})
			});
			}
			
		}
	},
	mounted() {
		this.callback()
		// console.log(this.sendSecList);

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
