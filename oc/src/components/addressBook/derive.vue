<template>
  <div id="pop">
    <div class="tabs_content">
      <div id="menu_list" v-for='item in section' :key="item.name">
        <div style="position:relative">
          <div @click="toggle(item.name)">
            <font-awesome-icon :icon="['fas','folder-open']" />
            <h2 :class="{'active_02':toFlag}" style="display:inline-block;" class="tab">
              {{item.name}}
            </h2>
          </div>
          <ul v-if="no" style="padding-left:16px;margin-top:10px;" v-for='(items,index) in item.children' :key="index">
            <div style="display:inline-block;width:152px;" @click='changeflag(index, items.name)'>
              <font-awesome-icon :icon="['fas','folder-open']" />
              <h3 :class="{'active_02':Ind === index}" style="display:inline-block" class="tab">
                {{items.name}}
              </h3>
            </div>
            <li v-if='items.flag'>
              <a @click='changeName(index1, item1.name)' class="flagS tab" v-for='(item1,index1) in items.children' href="javascript:;" :key="index1">
                <font-awesome-icon :icon="['fas','file-alt']" /> {{item1.name}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: ['getUserId'],
  data() {
    return {
      showde: true,
      labe: false,
      isActive: false,
      no: false,
      flag: -1,
      open: false,
      toFlag: false,
      Index: "",
      Ind: "",
      Inde: "",
      section: []
    }
  },
  methods: {
    changeName(num, name) {
      this.Inde = num;
    },
    changeflag(num, name) {
      this.Ind = num;
      this.toFlag = false;
      this.section[0].children[num].flag = !this.section[0].children[num].flag;

      if (!this.isFolder) {
        // Vue.set(this.model, "children", []);
        // this.addChild();
        this.open = true;
      }
      // console.log(this.section[0].children.length);
    },
    toggle(name) {
      if (this.isFolder) {
        this.toFlag = true;
        this.no = !this.no;
      }
    },
  },
  computed: {
    // menuitemClasses: function() {
    //   return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    // }
    isFolder() {
      return this.section[0].children && this.section[0].children.length;
    }
  }
}
</script>

<style lang="scss" scoped>
#popup {
}
#pop {
  width: 50%;
}
.tabs_content {
  height: 100%;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 2s;
  #menu_list {
  }
  .tab {
    font-weight: 100;
    color: #464646;
    border-radius: 4px;
    padding: 2px 5px;
  }
}
</style>
