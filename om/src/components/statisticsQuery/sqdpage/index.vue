<template>
	<div class="statistics-query">
		<div v-for="item in typeArr" :key="item.id">
			<dl @click="$router.push(item.path)">
				<dt><img :src="item.img"/></dt>
				<dd>
					<p>{{item.title}}</p>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
	export default {
		name: "statisticsQuery",
		data() {
			return {
				typeArr: [
					// {
					// 	id: 1,
					// 	title: "栏目管理",
					// 	img: require("../../../assets/images/prograManage.png"),
					// 	path: "/app/statisticsQuery/prograManage"
					// },
					{
						id: 2,
						title: "标签查询",
						img: require("../../../assets/images/lableManage.png"),
						path: "/app/statisticsQuery/lableManage"
					},
					{
						id: 3,
						title: "内容查询",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/statisticsQuery/contentManage"
					}/*,
					{
						id: 4,
						title: "分类管理",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/newsIndex/classifyManage"
					},
					{
						id: 5,
						title: "皮肤管理",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/newsIndex/dermaManage"
					},
					{
						id: 6,
						title: "内容模板",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/newsIndex/contentTemplate"
					},
					{
						id: 7,
						title: "标签管理",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/newsIndex/labelManagement"
					},
					{
						id: 8,
						title: "信息来源",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/newsIndex/informationSource"
					},
					{
						id: 9,
						title: "定时发布",
						img: require("../../../assets/images/contentManage.png"),
						path: "/app/newsIndex/timeInterva"
					}*/
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.statistics-query {
		width: 100%;
		padding: 30px;
		display: flex;
		flex-wrap: wrap;
		dl {
			width: 120px;
			margin-right: 30px;
			margin-bottom: 30px;
			cursor: pointer;
			dt {
				width: 100%;
				height: 120px;
				padding: 20px;
				margin-bottom: 20px;
				background-color: #888888;
				img {
					width: 100%;
					height: 100%;
				}
			}
			dt:hover {
				background-color: #CC0000;
			}
			dd {
				width: 100%;
				text-align: center;
				font-size: 15px;
				color: #7F7F7F;
			}
		}
	}
</style>