<template>
  <div id="nodata">
    <div>
      <img :src="img.imgSrc" alt="">
      <p>当前部门无任何成员</p>
      <router-link :to="{ name:'addMembers' }">
        <button>添加成员</button>
      </router-link>
      <router-link :to="{ name:'toLead' }">
        <button>批量导入</button>
      </router-link>
      <router-link :to="{ name:'addMembers' }">
        <button>从其他部门导入</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import imgSrc from "../../assets/images/nodata.png";
import labUser from './labUser'
export default {
  name: 'nodata',
  data() {
    return {
      img: { imgSrc }
    }
  },
  components: { labUser }
}
</script>

<style lang="scss" scoped>
#nodata {
  width: 70%;
  height: 500px;
  text-align: center;
  p {
    margin: 20px 0;
  }
  img {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  button {
    padding: 5px 10px;
    border-radius: 4px;
    background: #cc0000;
    color: #fbe7e6;
    cursor: pointer;
  }
}
</style>
