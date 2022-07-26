<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      用户列表
    </div>
    <el-divider></el-divider>

    <div class="search_content">
      <div class="result_content">
        <div class="head_tit">
          <span>用户账号：{{ memberInfo.userName }}</span>
          <span>用户昵称：{{ memberInfo.nickname }}</span>
        </div>
        <div  class="form_box">
          <el-form label-width="100px" ref="info">
            <div class="list-play1">
              <div>
                <el-form-item>
                  <p>
                    请先为下级设置彩票返点：
                    <el-button type="success" size="mini" @click="one_set()"
                      >一键设置</el-button
                    >
                  </p>
                </el-form-item>
                <div>
                  <el-form-item
                    v-for="item in userKickback"
                    :key="item.index"
                    :label="item.name"
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
                      >可为账号设置返点范围（{{ Number(item.minKickback) }}-{{
                        accMul(item.maxKickback, 100)
                      }}）</span
                    >
                  </el-form-item>
                </div>
              </div>
              <!-- <el-form-item>
              <el-button type="primary" @click="submit_info()">提交</el-button>
              <el-button type="default" @click="$router.go(-1)">返回</el-button>
            </el-form-item> -->
              <!-- </el-form> -->

              <!-- <el-form label-width="100px" ref="info"> -->
              <!-- <el-form-item>
              <p>
                <el-button type="success" size="mini" @click="one_set()"
                  >一键设置</el-button
                >
              </p>
            </el-form-item> -->

              <div>
                <el-form-item>
                  <p>
                    请先为下级设置第三方游戏返点：
                    <!-- <el-button type="success" size="mini" @click="one_set()"
                      >一键设置</el-button
                    > -->
                  </p>
                </el-form-item>

                <div>
                  <el-form-item
                    v-for="item in userKickback"
                    :key="item.index"
                    :label="item.name"
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
                      >可为账号设置返点范围（{{ Number(item.minKickback) }}-{{
                        accMul(item.maxKickback, 100)
                      }}）</span
                    >
                  </el-form-item>
                </div>
              </div>
            </div>
            <el-form-item class="btn-box">
              <el-button type="primary" @click="submit_info()">提交</el-button>
              <el-button type="default" @click="$router.go(-1)">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
	  canEditKickback:true,//是否可以编辑游戏返点
      info: {},
      accountID: this.$route.query.accountID,
      userKickback: [],
      cur_Kickback: [],
      memberInfo: "",
      cur_one: null,
    };
  },
  methods: {
    accMul(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      let result =
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m);
      let y = String(result).indexOf(".") + 1; //获取小数点的位置
      if (y > 0) {
        return Math.round(result * Math.pow(10, 1)) / Math.pow(10, 1);
      } else {
        return result;
      }
    },
    getUserKickback() {
      // 初始化最大，最小值
      this.$get("Pc.Agent.getUserKickback").then((res) => {
        if (res.code == 0) {
          let local_typeSetting = res.data;
          local_typeSetting.forEach((k) => {
            this.$set(k, "kickback", null); //添加空值动态绑定input

            k.minKickback = k.minKickback * 100;
          });

          //console.log(local_typeSetting);

          this.userKickback = local_typeSetting;

        } else {
          return this.$message.error(res.message);
        }
        this.getMemberInfo(); //绑定input数据
      });
    },
    getMemberInfo() {
      // if(this.userKickback.length>0)
      this.$get("Pc.Agent.getMemberInfo", {
        accountID: this.accountID,
      }).then((res) => {
        if (res.code == 0) {
          this.memberInfo = res.data;
          let _cur_Kickback = res.data.userKickback;
          
		 console.log(this.memberInfo);
		let canEditKickbackValue=res.canEditKickback;
		if(canEditKickbackValue!=undefined&& canEditKickbackValue==1){
			this.canEditKickback=false;
		}

          this.userKickback.forEach((k, index) => {
            if (k.fid == _cur_Kickback[index].fid) {
              let _lick = this.accMul(_cur_Kickback[index].maxKickback, 100);
              this.$set(k, "kickback", _lick); //添加maxKickback动态绑定input
            }
          });
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    one_set() {
      let _typeSetting = this.userKickback.slice();
      _typeSetting.forEach((item) => {
        if(item.play_type ==0){
          item.kickback = this.cur_one;
        }
      });
    },
    // 获取输入款值
    changeInput(value, min, max) {
      if (value !== null) {
        if (Number(value) >= min && value <= this.accMul(max, 100)) {
          this.cur_one = value; //存下当前最近修改的值
        } else {
          this.$message.error("返点值填写不正确");
        }
      }
    },
    update_userKickback(kackdata) {
      this.$post("Pc.Agent.editUserKickback", {
        accountID: this.accountID,
        kickBack: kackdata,
      }).then((res) => {
        if (res.code == 1) {
          this.userKickback = res.data;
          this.$message.success("提交成功");
          this.getUserKickback();
        } else {
          this.getUserKickback();
          return this.$message.error(res.message);
        }
      });
    },
    // 提交数据
    submit_info() {
      // 提取数据
      let update_kickback = this.userKickback.slice();
      for (var i = 0; i < update_kickback.length; i++) {
        if (update_kickback[i].kickback !== null) {
          delete update_kickback[i].add_date;
          delete update_kickback[i].edit_date;
          delete update_kickback[i].maxKickback;
          delete update_kickback[i].minKickback;
          delete update_kickback[i].name;
        } else {
			update_kickback[i].kickback=0;//默认设为0
          //this.$message.error("返点不能为空");
          //return;
        }
      }
      let _userKickbacks = JSON.stringify(update_kickback).replace(
        /fid/g,
        "typeId"
      );
      // console.log(_userKickbacks)
      this.update_userKickback(_userKickbacks);
    },
  },
  watch: {
    $route: {
      async handler(to, from) {
        this.accountID = this.$route.query.accountID;
        this.getUserKickback();
        //  this.getMemberInfo();
      },
      immediate: true,
    },
  },
};
</script>

<style lang='scss' >
.btn-box{
  margin-left: 400px;
}
.list-play1 {
  display: flex;
}
.el-form-item__content {
  width: 420px;
  display: flex;
}
.right_on {
  padding: 10px 0;
  font-size: 12px;
  color: #333;
}
.result_content {
  .head_tit {
    font-size: 14px;
    display: inline-block;
    span {
      padding: 0 10px;
    }
  }
}
.form_box {
  display: flex;
  width: 800px;
  margin-top: 10px;
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