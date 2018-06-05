<template>
	<div class="lableManage">
		<commHead :topTitle='topTitle' />
		<!--操作栏部分-->
		<div id="change-default">
			<div class="input-group">
				<label>发送时间：</label>
				<DatePicker @on-change="getTime" size="small" type="datetimerange" placeholder="请选择发送的日期和时间" style="width: 260px"></DatePicker>
			</div>
			<div class="input-group">
				<label>一级标签：</label>
				<Select size="small" v-model="firstIds" multiple style="width:160px">
					<Option v-for="item in firstLevelTagsList" :value="item.id" :key="item.id">{{ item.tagName }}</Option>
				</Select>
			</div>
			<div class="input-group">
				<label>二级标签：</label>
				<Select size="small" v-model="secondIds" multiple style="width:160px">
					<Option v-for="item in subTagsList" :value="item.id" :key="item.id">{{ item.tagName }}</Option>
				</Select>
			</div>
			<button class="btn" @click="getContentList()">筛选</button>
		</div>
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
		name: "lableManage",
		components: {
			commHead,
			queryList
		},
		data() {
			return {
				topTitle: "标签管理",
				dateValue: "",
				firstLevelTagsList: [],
				subTagsList: [],
				contentList: [],
				firstIds: [],
				secondIds: []

			}
		},
		methods: {
			getTime(timer) { //获取时间
				this.dateValue = timer;
			},
			getFirstLevelTags() { //获取所有一級标签
				this.$api.post('/omweb/newsStat/getFirstLevelTags', null, r => {
					this.firstLevelTagsList = r.data
				})
			},
			getSubTags() { //获取所有对应的二級标签
				let parIds = this.firstIds.toString()
				let data = {
					parentIds: parIds
				}
				/*if(!data.parentIds.length){
					this.$Message.info('请选择一级标签');
					return;
				}*/
				this.$api.post('/omweb/newsStat/getSubTags', data, r => {
					this.subTagsList = r.data
					console.log(r.data)
				})
			},
			getContentList() { //获取筛选结果
				let oneIds = this.firstIds.toString()
				let twoIds = this.secondIds.toString()
				let data = {
					limit: 20,
					offset: 0,
					firstTagIds: oneIds,
					secondTagIds: twoIds,
					startDate: this.dateValue[0],
					endDate: this.dateValue[1],
					title: "",
					categoryIds: ""
				}
				this.$util.hintShow(this, '正在加载中,请稍等...')
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
			this.getFirstLevelTags()
			this.getSubTags()
			this.getContentList()
		}
	}
</script>
<style lang="scss" scoped>
	.lableManage {
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
			align-items: center;
			.input-group {
				margin-right: 15px;
				display: flex;
				align-items: center;
				label {
					color: #CC0000;
					font-size: 14px;
					white-space: nowrap;
				}
			}
			.btn {
				margin-left: 20px;
				display: block;
				width: 55px;
				height: 22px;
				border: 0;
				border-radius: 4px;
				background: #CC0000;
				color: white;
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