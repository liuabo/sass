<template>
	<div class="tree-menu">
		<ul v-for="(menuItem,index) in theModel" :key="menuItem.id">
			<my-tree :Index='index' :len='len' :model="menuItem"></my-tree>
		</ul>
	</div>
</template>
<script>
import Bus from '../../../assets/js/bus'
import myTree from './treeMenu'
export default {
	components: {
		myTree
	},
	data() {
		return {
			theModel: '',
			Index: '',
			len: ''
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
				Bus.$emit('UserNum', '', res.data.data[0].name)
				this.theModel.forEach((item, index) => {
					this.Index = index
				});
			})
		},
	},
	mounted() {
		this.callback()
	}
}
</script>