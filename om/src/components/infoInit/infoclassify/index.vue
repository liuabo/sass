<template>
	<div class="infoclassify">
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
                    {
						id: 1,
						title: "分类初始化",
						img: require("../../../assets/images/prograManage.png"),
						path: "/app/infoInit/classifyInit"
					},
					{
						id: 2,
						title: "标签初始化",
						img: require("../../../assets/images/lableManage.png"),
						path: "/app/infoInit/labelInit"
					},
					{
						id: 3,
						title: "内容模板初始化",
						img: require("../../../assets/images/temp.png"),
						path: "/app/infoInit/conTemInit"
					},
					{
						id: 4,
						title: "皮肤初始化",
						img: require("../../../assets/images/skin.png"),
						path: "/app/infoInit/dermaInit"
					},
					{
						id: 5,
						title: "信息来源初始化",
						img: require("../../../assets/images/info.png"),
						path: "/app/infoInit/infomanInit"
					},
				]
			}
		}
	}
</script>

<style scoped lang="scss">
	.infoclassify{
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