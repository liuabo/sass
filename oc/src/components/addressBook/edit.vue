<template>
  <div class="ivu-layout-content" id="edit">
    <commHead :topTitle="topTitle" />
    <div class="ed_hed">
      <a href="javascript:history.go(-1)">
        <Button type="primary" @click="info"> 保存</Button>
      </a>
      <a href="javascript:history.go(-1)">
        <Button>取消</Button>
        <i></i>
      </a>
    </div>
    <div id="ed_top">
      <div class="avatar">
        <img class="img_001" width="80" height="80" :src="imgPic.head || ''" />
        <div class="information">
          <input type="text" ref="name" id="user" :value="list.name">
          <input type="text" ref="englishName" id="user" placeholder="英文名" v-model="list.englishName" @blur="verifyName">
          <span style="display:block; color: #ed3f14;" v-show="isUser">
            必须以字母开头，且以字母、数字、下划线(_)随意组合
          </span>
        </div>
        <div class="ed_content">
          <label for="ID">
            <span></span>账号:</label>
          <div class="inp">
            {{list.userId}}
          </div>
        </div>
        <Form id="from" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="性别">
            <RadioGroup v-model="formValidate.gender">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
          <div class="ed_cen">
            <FormItem label="手机 :">
              <input class="ivu-input" id="ipt" ref="mobile" v-model="list.mobile" @blur="verifyPhone" placeholder="请输入您的手机号" />
              <span class="ivu-form-item-error-tip" id="errorMassage" v-show="isPhone">
                请输入正确手机号
              </span>
            </FormItem>
            <FormItem label="座机 :">
              <input ref="telephone" class="ivu-input" id="ipt" :value="list.telephone" @blur="verifyPlan" placeholder="请输入您的座机号" />
              <span class="ivu-form-item-error-tip" id="errorMassage" v-show="isPlan">
                请输入正确座机号
              </span>
            </FormItem>
            <FormItem label="邮箱 :">
              <input class="ivu-input" id="ipt" ref="email" :value="list.email" @blur="verifyEmail" placeholder="请输入您的邮箱" />
              <span class="ivu-form-item-error-tip" v-show="isEmail">
                请输入正确邮箱
              </span>
            </FormItem>
          </div>
          <div class="member_edit_sec">
            <div class="sec_style">
              <p class="hid_style">
                <span>部门 :</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="tab_" @click="delle(index,item)" v-for="(item,index) in deData" :key="item.id">{{item.name}}</span>
                <span class="tab_" v-for="(item,index) in userList" @click="delle(index)" :key="item">
                  <font-awesome-icon style="margin:0 5px 0 4px;" :icon="['fas','file-alt']" /> {{item.name}}
                </span>
              </p>
              <Modal id="pop_01" v-model="modal2" width="360">
                <div style="text-align:center;height:100%">
                  <secPop :isToFlag='isToFlag' />
                </div>
                <div slot="footer">
                  <!-- <Button @click="modal2 = false" type="error">取消</Button>
                  <Button @click="savSec" type="error">确定</Button> -->
                </div>
              </Modal>
              <a @click="modal2 = true" href="javascript:;">修改</a>
            </div>
            <div class="sec_style">

              <p class="hid_style">
                <span>标签:</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="tab_" v-for="(item, index) in list.tag_list" @click="del(index)" :key="item">{{item.tagName}}</span>
                <span class="tab_" v-for="(item,index) in labelList" :key="item.id" @click="del(index)">
                  <font-awesome-icon style="margin:0 5px 0 4px;" :icon="['fas','file-alt']" />{{item.name}}</span>
                <labPop :isFlag='isFlag' v-if="isPopPup" />
              </p>
              <a @click="isPopPup=true" href="javascript:;">修改</a>
            </div>
            <p>
              <label for="duty">职务:&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <input ref="position" :value="list.position" type="text" id="duty" />
            </p>
          </div>
          <RadioGroup class="ed" v-model="phone">
            <span>身份:</span>
            <Radio label="普通职员">
              <span>普通职员</span>
            </Radio>
            <Radio label="上级">
              <span>上级</span>
            </Radio>
          </RadioGroup>
        </Form>
      </div>
    </div>
    <div class="ed_hed">
      <a href="javascript:history.go(-1)">
        <Button type="primary" @click="info"> 保存</Button>
      </a>
      <a href="javascript:history.go(-1)">
        <Button>取消</Button>
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import commHead from './commHead'
import labPop from './labelPop/label';
import Bus from '../../assets/js/bus'
import head from '../../assets/images/headPor.png'
import secPop from './TreeControl_'
export default {
  name: "edit",
  components: { commHead, labPop, secPop },
  data() {
    return {
      imgPic: { head },
      deDataId:[],
      deData: [],
      departmentIds: '',
      tagId: '',
      isPopPup: false,
      secUserList: '',
      userList: [],
      config: '',
      labelList: [],
      modal2: false,
      list: '',
      disposeData: [],
      phone: "apple",
      topTitle: "编辑成员信息",
      isPhone: false,
      isPlan: false,
      isUser: false,
      isEmail: false,
      formValidate: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        date: "",
        time: "",
        desc: "",
        Id: "",
        identification: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        ID: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        identification: [
          { required: true, message: "身份证不能为空", trigger: "blur" }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "Please select the city",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    info() {
      if (!this.isPhone && !this.isPlan && !this.isUser) {
        this.$Message.info("保存成功");
        let data = {
          userId: this.$route.params.fid,
          name: this.$refs.name.value,            //用户名字
          englishName: null,                      //用户英文名
          mobile: this.$refs.mobile.value,        //手机号
          department: this.secUserList || this.deDataId.join(),           // 部门id列表
          position: this.$refs.position.value,    //用户职位
          order: 7,                               //用户在部门内排序,需要和部门列表个数一致
          gender: null,                           //性别
          email: this.$refs.email.value,          //邮件
          telephone: this.$refs.telephone.value,  //座机
          isleader: null,                         //是否上级 
          avatarMediaid: null,                    //头像素材id
          avatar: null,                           //头像
          qr_code: null,                          //用户二维码
          enable: true,                           //用户是否生效
          status: 0,                              //用户激活状态
          extattr: null,                          //用户自定义状态
          to_invite: false,
        }
        var token = sessionStorage['token']
        let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }
        axios.post(this.$url_ + '/member/modify', data, config).then(res => {
          console.log(res);
        });
        let userId = this.$route.params.fid
        let data_01 = {
          departmentIds: this.departmentIds,
          userIds: this.$route.params.fid
        }
        // this.$axiosApi.post('/tags/element/add', data_01, res => {
        //   console.log(res);
        // })
      }
    },
    verifyPhone() {
      const reg = /^1[3|4|5|7|8][0-9]{9}$/;
      if (reg.test(this.list.mobile)) {
        console.log('正确的手机号')
        this.isPhone = false
      } else {
        console.log('手机号错误')
        this.isPhone = true
      }
    },
    verifyPlan() {
      const reg = /[0-9-()（）]{7,18}/;
      if (reg.test(this.$refs.telephone.value)) {
        console.log('身份证号正确')
        this.isPlan = false
      } else {
        console.log('身份错误')
        this.isPlan = true
      }
    },
    verifyName() {
      const reg = /^[a-zA-Z]{1}\w*$/;
      if (reg.test(this.englishName)) {
        console.log('正确')
        this.isUser = false
      } else {
        console.log('错误')
        this.isUser = true
      }
    },
    verifyEmail() {
      const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (reg.test(this.$refs.email.value)) {
        console.log('正确')
        this.isEmail = false
      } else {
        console.log('错误')
        this.isEmail = true
      }
    },
    isFlag(rightList) {
      console.log(67890);

      console.log(rightList);

      rightList.forEach((item) => {
        this.departmentIds += item.id + ','
      })
      this.isPopPup = false
      this.labelList = rightList
      console.log(this.labelList);
    },
    del(index) {
      this.labelList.splice(index, 1);
      this.list.tag_list.splice(index, 1)
    },
    delle(index,item) {
      this.userList.splice(index, 1)
      this.deData.splice(index, 1)
       this.deDataId.splice(index, 1)
       console.log(this.deDataId.join());
       
      // this.deData.forEach((item,index)=>{
      //   console.log(item.depId);
      //   this.deDataId +=item.depId
      // })
      
    },
    savSec() {
      this.modal2 = false;
      this.$refs.child.getSecNane()
    },
    shiftOut() {
      let data = {
        tagId: this.labId,
        element_list: this.elementTypeBox
      }
      console.log(data);
      var token = sessionStorage['token']
      let config = { headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": token } }

      axios.post(this.$url_ + '/tags/element/remove', data, config).then(res => {
        console.log(res);
      });
    },
    isToFlag(item) {
      console.log(item);
      this.userList = item
      this.modal2 = false
      console.log(34567890);

    }
  },
  created() {
    this.list = this.$route.params.fid

  },
  mounted() {
    Bus.$on('sendSecName', (name, id) => {
      // console.log(name);
      // console.log(id);


      this.secUserList = id.join(',')
      // console.log(this.secUserList);
      // console.log(1,id);

      this.userList = name
      this.deData.push(id)
      // console.log(this.deData);
    })
    let userId = this.$route.params.fid
    let data = {
      userId,
    }
    this.$axiosApi.get('/member/detail', data, res => {
      this.list = res.data.data
      this.deData = this.list.department_list
     
      this.deData.forEach(element => {
         this.deDataId.push(element.depId)
         console.log( this.deDataId);
         
      });
    })
  }
};
</script>

<style lang="scss">
.ivu-modal-close {
  display: none;
}
#from {
  margin-left: 20px;
  .ed_cen {
    border-bottom: 1px dashed #e4e6e9;
  }
}
.tab_ {
  background: #cc0000;
  margin: 0 7px;
  padding: 4px 6px;
  font-size: 12px;
  color: #fff;
  border-radius: 4px;
  line-height: 26px;
}
.tab_par {
  height: 26px;
  display: inline-block;
  font-size: 12px;
  max-width: 294px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
}
#ipt {
  width: 252px;
}
#edit {
  width: 100%;
  // padding-left: 16px;
  // z-index: 9999;
  .ed {
    margin-top: 20px;
    padding-left: 30px;
  }
  .inp {
    display: inline-block;
    padding: 3px 6px;
    width: 252px;
    border-radius: 2px;
    background-color: transparent;
    border: 1px solid #c7c7c7;
  }
  input {
    padding: 3px 6px;
    width: 252px;
    border-radius: 2px;
    background-color: transparent;
    border: 1px solid #c7c7c7;
  }
  .ed_hed {
    width: 100%;
    height: 38px;
    line-height: 35px;
    padding: 0 10px;
    margin: 25px 0;
    margin-left: 25px;
  }
  #ed_top {
    margin-left: 16px;
    .avatar {
      min-height: 300px;
      .img_001 {
        width: 60px;
        height: 60px;
        float: left;
        margin-right: 38px;
      }
      .information {
        width: 318px;
        overflow: hidden;

        input:first-child {
          margin-bottom: 16px;
        }
      }
      .member_edit_sec {
        padding-left: 30px;
        .hid_style {
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sec_style {
          display: flex;
          align-items: center;
          height: 52px;
        }
      }
    }
    .ed_content {
      padding: 20px 0 20px 64px;
      border-bottom: 1px dashed #e4e6e9;
    }
  }
}
#pop_01 {
  background: firebrick;
  .ivu-modal-content {
    width: 400px !important;
    height: 420px !important;
    // background: rgba(0, 0, 0, 0);
    .ivu-modal-body {
      width: 100%;
      height: 100%;
      padding: 0;
    }
    .ivu-modal-footer {
      width: 200px;
      float: right;
      border: none;
    }
  }
}
</style>
