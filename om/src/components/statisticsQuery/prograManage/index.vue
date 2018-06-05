<template>
	<div class="prograManage">
		<commHead :topTitle='topTitle' />
		<!--操作栏-->
		<div class="input-group">
			<input type="text" v-model="title">
			<Button @click="getCategoryLists()" type="primary" size='small' shape="circle">查询</Button>
		</div>
		<!--内容列表-->
		<table @scroll="dropDown()">
			<thead>
				<tr class="th_style">
					<th>序号</th>
					<th>名称</th>
				</tr>
			</thead>
			<tbody>
				<tr class="th_style" v-for="(item,index) in categoryLists" :key="item.id">
					<td>{{index}}</td>
					<td class="ellipsis">{{item.name}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import axios from 'axios';
	import commHead from "../common/commHead";
	export default {
		name: "prograManage",
		components: {
			commHead
		},
		data() {
			return {
				topTitle: "栏目管理",
				categoryLists: [],
				title: ""
			}
		},
		methods: {
			getCategoryLists() { //获取所有栏目
				let data = {
					name: this.title
				}
				this.$util.hintShow(this,'正在加载中,请稍等...')
				this.$api.post('/omweb/newsStat/getCategoryLists', data, r => {
					this.$util.hintHide(this)
					this.categoryLists = r.data
				})
			},
			dropDown() { //下拉加载
				let scrollTop = this.$refs.content.scrollTop
				let scrollHeight = this.$refs.content.scrollHeight
				let clientHeight = this.$refs.content.clientHeight
				if(scrollHeight - clientHeight - scrollTop <= 45) {
					if(this.onOff) {
						if(this.off) {
							this.off = false
							this.page++
								let data = {
									limit: this.limit,
									offset: this.page * this.limit,
									categoryId: this.categoryId,
									startDate: this.timeFiler(this.startTime),
									endDate: this.timeFiler(this.endTime),
									title: this.demandTitle
								};
							let arr = []
							this.$api.post("omweb/news/list", data, r => {
								arr = r.data.rows
								this.off = true
								this.dynamics.push(...arr)
								this.checkArr1.length = this.dynamics.length
								this.checkArr1.fill(false)
								arr.length == 0 ? this.onOff = false : this.onOff = true
							});
						}

					}
				}
			}
		},
		created() {
			this.getCategoryLists()
		}
	}
</script>
<style lang="scss" scoped>
	.prograManage {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.input-group {
			position: relative;
			width: 240px;
			margin: 15px 25px 0 15px;
			padding: 0 10px;
			input {
				height: 24px;
				width: 200px;
				border: 1px solid #eee;
				line-height: 24px;
				border-radius: 15px;
				outline: none;
				padding-left: 10px;
				padding-right: 34px;
			}
			button {
				width: 58px;
				height: 100%;
				position: absolute;
				right: 0px;
				border: 0;
				background-color: #CC0000;
			}
		}
		table {
			flex: 1;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding-left: 15px;
			border-collapse: collapse;
			border: 0;
			.th_style {
				width: 320px;
				padding-right: 10px;
				display: flex;
				border-bottom: 1px solid #e4e6e9;
				th,
				td {
					width: 140px;
					line-height: 48px;
					padding-left: 10px;
					text-align: left;
					font-weight: 400;
					font-size: 12px;
				}
				th:nth-child(2),
				td:nth-child(2) {
					width: 180px;
				}
			}
			thead .th_style th {
				color: darkgray;
			}
			tbody {
				flex: 1;
				overflow-y: auto;
				overflow-x: hidden;
			}
		}
	}
</style>