<template>
	<div id="labs">
		<div class="content">
			<div class="lab_left">
				<h2>我的标签</h2>
				<p @click="sendData(1,item,index,item.tagId)" v-for="(item,index) in labList" :key="index">
					<img style="position:relative;top:7px;transform:scale(0.7);" :src="pic.labPic" /> {{item.tagName}}
					<img v-if="item.delFlag" style="position:relative;top:-1px" :src="pic.tick" />
				</p>
			</div>
			<div class="lab_right">
				<h2>已选择的标签</h2>
				<div class="lab_ri_con">
					<p @click="del(index,item)" v-for="(item,index) in rightList" :key="index">
						<img style="position:relative;top:7px;transform:scale(0.7);" :src="pic.labPic" /> {{item.name}}
						<font-awesome-icon style="color:#d00; position:absolute; right:14px;margin-top:13px;" :icon="['fas','times']" />
					</p>
				</div>
				<div class="bottom">
					<p @click="isFlag([])">取消</p>
					<p @click="isFlag(rightList)">确认</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import labPic from '../../../assets/images/labPic.png'
import tick from "../../../assets/images/tick.png";
export default {
	name: 'label',
	props: ["isFlag"],
	data() {
		return {
			pic: { labPic, tick },
			labList: [],
			leftData: [],
			rightList: [],
			labelsTick: [],
			tagId: [],
			newTagId: ''
		}
	},
	methods: {
		getlabel() {
			let data = {
				pageNum: 1,
				pageSize: 10
			}
			this.$axiosApi.get('/tags/list', data, res => {
				res.data.data.forEach((items, index) => {
					this.labList.push(items)
			})
			})
		},
		sendData(num, item, index, id) {
			item.delFlag = !item.delFlag
			var index = index + 1 || -1
			var isHas = this.rightList.some((it, i) => {
				if (item.tagId == it.tagId) {
					this.rightList.splice(i, 1);
					return true;
				} else {
					return false;
				}
			});
			if (!isHas) {
				if (num == 1) {
					item.delFlag = true
				}
				this.rightList.push({ name: item.text || item.tagName, tagId: item.tagId });
			}
		},
		del(index, item) {
			this.newTagId = item.tagId
			this.labList.forEach((items, index) => {
				if (items.tagId == item.tagId) {
					items.delFlag = false
				}
			})
			this.rightList.splice(index, 1);
			this.labelsTick = false
		}
	},
	mounted() {
		this.getlabel()
	},
}
</script>
<style lang="scss" scoped>
#labs {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  .content {
    height: 400px;
    width: 400px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    display: flex;
    p {
      line-height: 30px;
    }
    .lab_left,
    .lab_right {
      width: 200px;
      height: 100%;
      background: #fff;
      padding: 8px 16px 16px;
      overflow-y: auto;
      h2 {
        line-height: 40px;
      }
    }
    .lab_left {
      background: #eee;
      h2 {
        line-height: 40px;
      }
    }
    .lab_right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .lab_ri_con {
        flex: 1;
      }
      // button {
      //   width: 64px !important;
      //   height: 22px;
      //   border-radius: 4px;
      //   background: #cc0000;
      //   color: #fff;
      //   &:first-child {
      //     background: #888;
      //     margin-left: 5px;
      //     margin-right: 20px;
      //   }
      // }
    }
  }
	.bottom{
		display: flex;
		p{
				width: 64px !important;
        height: 22px;
				line-height:22px;
        border-radius: 4px;
        background: #cc0000;
        color: #fff;
				font-size: 12px;
				text-align: center;
        &:first-child {
          background: #888;
          margin-left: 5px;
          margin-right: 20px;
        }
		}
	}
}
</style>
