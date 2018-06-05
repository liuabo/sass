<template>
	<div>
		<table>
			<thead>
				<tr class="th_style">
					<th>序号</th>
					<th>标题</th>
					<th>收藏数</th>
					<th>阅读数</th>
					<th>评论数</th>
					<th>点赞数</th>
				</tr>
			</thead>
			<tbody>
				<tr class="th_style" v-for="(item,index) in contentList" :key="item.id">
					<td>{{index+1}}</td>
					<td class="ellipsis">{{item.title}}</td>
					<td class="ellipsis">
						<a href="#">{{item.storeCount}}</a>
					</td>
					<td>
						<a href="#">{{item.readCount}}</a>
					</td>
					<td>
						<a href="#">{{item.contentCount}}</a>
					</td>
					<td>
						<a href="#">{{item.likeCount}}</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		name: "queryList",
		props:["contentList"],
		data() {
			return {}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
		table {
			width: 860px;
			height: auto;
			border-collapse: collapse;
			border: 0;
			.th_style {
				width: 100%;
				height: 48px;
				display: flex;
				border-bottom: 1px solid #e4e6e9;
				th,
				td {
					width: 110px;
					line-height: 48px;
					padding-left: 10px;
					margin-right: 10px;
					text-align: left;
					font-weight: 400;
					font-size: 12px;
					a {
						text-decoration: underline;
					}
				}
				th:nth-child(1),
				td:nth-child(1) {
					width: 75px;
				}
				th:nth-child(2),
				td:nth-child(2) {
					width: 300px;
				}
			}
			thead .th_style th {
				color: darkgray;
			}
			tbody .th_style{
				cursor: pointer;
			}
		}
</style>