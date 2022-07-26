<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      注册管理
    </div>
    <el-divider></el-divider>

    <div class="search_content">
      <div v-if="this.info_list.hierarchy >= 1" class="form_box">
        <el-form label-width="240px" :model="info" ref="“info”">
          <el-form-item v-if="type_visable" label="用户类型">
            <el-select
              v-model="info.isAgent"
              placeholder="请选择"
              @change="changeAgent($event)"
            >
              <el-option
                v-for="item in user_type_list"
                :key="item.id"
                :label="item.text"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="用户昵称"
            prop="nickName"
            :rules="[
              {
                required: true,
                min: 2,
                max: 6,
                message: '长度为2-6个字符',
                trigger: 'blur',
              },
            ]"
            ><el-input
              placeholder="2-6个字符"
              type="text"
              v-model="info.nickName"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="登录账户"
            prop="accountName"
            :rules="[
              {
                required: true,
                min: 3,
                max: 15,
                message: '长度为3-15个字符（数字+字母）',
                trigger: 'blur',
              },
            ]"
            ><el-input
              placeholder="3-15个字符（数字+字母）"
              type="text"
              v-model="info.accountName"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="登录密码"
            prop="password"
            :rules="[
              {
                required: true,
                min: 6,
                max: 15,
                message: '长度为6-15个字符（数字+字母）',
                trigger: 'blur',
              },
            ]"
            ><el-input
              placeholder="6-15个字符（数字+字母）"
              type="password"
              v-model="info.password"
            ></el-input
          ></el-form-item>
          <el-form-item
            label="重复密码"
            prop="okpassword"
            :rules="[
              {
                required: true,
                min: 6,
                max: 15,
                message: '长度为6-15个字符（数字+字母）',
                trigger: 'blur',
              },
            ]"
            ><el-input
              placeholder="请输入内容"
              type="password"
              v-model="info.okpassword"
            ></el-input
          ></el-form-item>
          <el-form-item label="该下级及其下线出款是否需要通知">
            <el-radio-group v-model="info.fismsghigherups">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-divider></el-divider>

          <div class="play-list">
            <el-form-item   class="play-item1">
              <p>
                请先为下级设置彩票返点：
                <el-button type="success" size="mini" @click="one_set()"
                  >一键设置</el-button
                >
              </p>
            </el-form-item>
            <el-form-item class="play-item1">
              <p>
                请先为下级设置第三方游戏返点：
                <!-- <el-button type="success" size="mini" @click="one_set()"
                  >一键设置</el-button
                > -->
              </p>
            </el-form-item>
          </div>

          <div class="play-list">
            <div class="play-item-box">
              <el-form-item
                v-for="item in typeSetting"
                :key="item.index"
                :label="item.name"
                class="play-item"
                v-show="item.play_type == 0"
              >
                <el-input
                  placeholder=""
                  type="text"
                  v-model="item.kickback"
                  @change="
                    changeInput(
                      item.kickback,
                      item.minKickback,
                      item.maxKickback
                    )
                  "
                ></el-input>
                <span class="tips"
                  >可设置返点（{{ item.minKickback }}-{{
                    item.maxKickback
                  }}）</span
                >
              </el-form-item>
            </div>
            <div class="play-item-box">
              <el-form-item
                v-for="item in typeSetting"
                :key="item.index"
                :label="item.name"
                class="play-item"
                v-show="item.play_type == 1"
              >
                <el-input
                  placeholder=""
                  type="text"
				   :disabled="canEditKickback"
                  v-model="item.kickback"
                  @change="
                    changeInput(
                      item.kickback,
                      item.minKickback,
                      item.maxKickback
                    )
                  "
                ></el-input>
                <span class="tips"
                  >可设置返点（{{ item.minKickback }}-{{
                    item.maxKickback
                  }}）</span
                >
              </el-form-item>
            </div>
          </div>

          <el-form-item class="sub-box">
            <el-button type="primary" @click="submit_info('info')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
		canEditKickback:true,//是否可以编辑游戏返点
      info: {
        accountName: "",
        nickName: "",
        password: "",
        okpassword: "",
        isAgent: 1,
        fismsghigherups: 1,
        userKickbacks: "",
      },
      user_type_list: [
        {
          text: "会员",
          id: 0,
        },
        {
          text: "代理",
          id: 1,
        },
      ],
      info_list: "",
      typeSetting: "",
      type_sel: [],
      cur_one: null,
      local_hierarchy: 0,
      s_hierarchy: 0,
    };
  },
  coumputed: {},
  methods: {
    //  一键设置
    one_set() {
      let _typeSetting = this.typeSetting;
      console.log(_typeSetting);
      _typeSetting.forEach((item) => {

        if(item.play_type == 0){

          item.kickback = this.cur_one;
        }
      });
    },
    // 获取输入款值
    changeInput(value, min, max) {
      if (value !== null) {
        if (Number(value) >= Number(min) && value <= Number(max)) {
          this.cur_one = value; //存下当前最近修改的值
        } else {
          this.$message.error("返点值填写不正确");
        }
      }
    },
    // 提交数据
    submit_info() {
      if (
        this.info.accountName == "" ||
        this.info.nickName == "" ||
        this.info.password == "" ||
        this.info.okpassword == ""
      ) {
        this.$message.error("认真填写信息");
        return;
      }
      //提取数据
      let lockl_userKickbacks = JSON.parse(JSON.stringify(this.typeSetting));
	  console.log(lockl_userKickbacks);
      for (var i = 0; i < lockl_userKickbacks.length; i++) {
        if (lockl_userKickbacks[i].kickback !== null) {
          delete lockl_userKickbacks[i].add_date;
          delete lockl_userKickbacks[i].edit_date;
          delete lockl_userKickbacks[i].maxKickback;
          delete lockl_userKickbacks[i].minKickback;
          delete lockl_userKickbacks[i].name;
        } else {
			lockl_userKickbacks[i].kickback=0;//默认都设为0
          //this.$message.error("返点不能为空");
          //return;
        }
      }

      let _userKickbacks = JSON.stringify(lockl_userKickbacks).replace(
        /fid/g,
        "typeId"
      );

      this.info.userKickbacks = _userKickbacks;
      //console.log(this.info.userKickbacks);
      //提交数据
      this.add_member();
    },
    add_member() {
      this.$post("Pc.Member.addMember", this.info).then((res) => {
        if (res.code == 1) {
          this.$message.success(res.message);
          setTimeout(this.$router.go(0), 2000);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 判断是否显示类型
    type_visable() {
      if (this.info_list.hierarchy > 1) {
        this.get_agency();
        if (this.s_hierarchy == 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    // getatent
    get_agency() {
      this.$get("Pc.Member.getAgencyBelowDisabledUserTypeUpdate").then(
        (res) => {
          if (res.code == 0) {
            this.s_hierarchy = res.data.agencyBelowDisabledUserTypeUpdate;
            return;
          } else {
            this.$message.error(res.message);
          }
        }
      );
    },
    // 获取用户信息
    get_memberInfo() {
      this.$get("Pc.Member.memberInfo").then((res) => {
        if (res.code == 0) {
          this.info_list = res.data;
		  let canEditKickbackValue=res.data.canEditKickback;
		  if(canEditKickbackValue!=undefined&& canEditKickbackValue==1){
		  	this.canEditKickback=false;
		  }
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 获取代理返点
    get_gametypeSetting() {
      this.$get("Pc.Member.getGameTypeSetting").then((res) => {
        let local_typeSetting = [];
        if (res.code == 0) {
          local_typeSetting = res.data;
          local_typeSetting.forEach((k) => {
            this.$set(k, "kickback", null); //添加空值动态绑定input
          });

          local_typeSetting.forEach((item) => {
            console.log(item.play_type);
          });

          this.typeSetting = local_typeSetting;
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 获取代理
    loadHierarchy() {
      var hierarchy = JSON.parse(localStorage.getItem("hierarchy"));
      this.local_hierarchy = hierarchy.data;
    },
  },
  created() {
    this.get_memberInfo();
    // this.loadHierarchy();
    this.get_gametypeSetting();
    this.get_agency();
  },
};
</script>




<style lang="scss" >
.play-item1{
    .el-form-item__content {
    width: 400px !important;
    margin-left: 130px !important;
    display: flex;
  }
}
.play-item {
  display: flex;
  .el-form-item__label {
    width: 130px !important;
  }
  .el-form-item__content {
    width: 400px !important;
    margin-left: 10px !important;
    display: flex;
  }
}

.sub-box{
  margin-left: 300px;
}
</style>

<style lang="scss" scoped>
.play-list {
  display: flex;

}
.search_content {
  margin: 15px 0;
}
.form_box {
  width: 800px;
  .el-select {
    width: 240px;
  }
  .el-input {
    width: 240px;
  }
  .tips {
    display: inline-block;
    font-size: 12px;
    color: #999;
    margin-left: 15px;
  }
}
</style>