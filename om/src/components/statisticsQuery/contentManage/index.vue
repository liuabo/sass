<template>
	<div class="contentManag">
		<!--头部-->
		<commHead :topTitle='topTitle' />
		<!-- 操作栏 -->
		<div id="change-default">
			<div class="input-group">
				<label>发送时间：</label>
				<DatePicker @on-change="getTime" size="small" type="datetimerange" placeholder="请选择发送的日期和时间" style="width: 290px"></DatePicker>
			</div>
			<div class="input-group">
				<label>栏目：</label>
				<Select size="small" v-model="item.categoryId" style="width:115px">
					<Option v-for="item in categoryLists" :value="item.id" :key="item.id">{{ item.name }}</Option>
				</Select>
			</div>
			<div class="input-group">
				<label>标题：</label>
				<p>
					<input type="text" v-model="title" />
					<button @click="getContentList()">搜索</button>
				</p>
			</div>
		</div>
		<!-- 内容 -->
		<div class="list">
			<query-list :contentList="contentList" @scroll="dropDown()"></query-list>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import commHead from "../common/commHead";
	import queryList from "../common/queryList";
	export default {
		name: "contentManage",
		components: {
			commHead,
			queryList
		},
		data() {
			return {
				topTitle: "内容管理",
				dateValue: "",
				categoryLists: [],
				item: {
					categoryId: ''
				},
				model1: '',
				title: "",
				contentList: []

			}
		},
		methods: {
			getTime(timer) { //获取时间
				this.dateValue = timer;
			},

			getCategoryLists() { //获取所有栏目
				let data = {
					title: this.title
				}
				this.$api.post('/omweb/newsStat/getCategoryLists', data, r => {
					this.categoryLists = r.data
				})
			},
			getContentList() { //获取筛选结果
				let data = {
					limit: 20,
					offset: 0,
					firstTagIds: "",
					secondTagIds: "",
					startDate: this.dateValue[0],
					endDate: this.dateValue[1],
					title: this.title,
					categoryIds: this.item.categoryId
				}
				this.$util.hintShow(this,'正在加载中,请稍等...')
				this.$api.post('/omweb/newsStat/getContentList', data, r => {
					this.$util.hintHide(this)
					this.contentList = r.data.rows
					console.log(r.data.rows)
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
			this.getContentList()
		}
	}
</script>
<style lang="scss" scoped>
	.contentManag {
		width: 100%;
		height: 100%;
		font-size: 12px;
		display: flex;
		flex-direction: column;
		#change-default {
			width: 100%;
			height: 30px;
			margin: 15px 0;
			padding-left: 15px;
			display: flex;
			.input-group {
				display: flex;
				align-items: center;
				label {
					color: #CC0000;
					font-size: 15px;
					white-space: nowrap;
				}
				p {
					height: 24px;
					white-space: nowrap;
					border-radius: 4px;
					border: solid 1px #CC0000;
					display: flex;
					input {
						display: block;
						height: 22px;
						padding: 0 5px;
						border-radius: 4px 0 0 4px;
					}
					button {
						display: block;
						width: 56px;
						height: 24px;
						line-height: 24px;
						background-color: #CC0000;
						color: white;
						border-radius: 0 4px 4px 0;
					}
				}
			}
			.input-group:nth-of-type(2) {
				margin: 0 45px;
			}
		}
		.list {
			flex: 1;
			overflow-x: hidden;
			overflow-y: auto;
			padding-left: 15px;
		}
	}
</style>