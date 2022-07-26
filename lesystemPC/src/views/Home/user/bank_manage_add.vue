<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      银行卡新增
    </div>
    <el-divider></el-divider>
    <!-- 银行卡新增表单 -->
    <div class="search_content">
      <div class="result_content">
        <el-row>
          <el-col :span="16">
            <el-form :model="info"  label-width="120px">
              <div v-if="userBankCardAmount == true">
                <el-form-item label="开户人姓名" prop="isaddName">
                  <el-input v-model="info.isaddName"></el-input>
                </el-form-item>

                <el-form-item label="银行账号" prop="isaddAccount">
                  <el-input v-model="info.isaddAccount"></el-input>
                  <div class="notice">
                    备注：增加银行卡需提供最近一次绑定的使用中的银行卡信息！
                  </div>
                </el-form-item>
              </div>

              <el-form-item label="提示">
                <div class="tips">
                  *
                  为必填信息，如需删除请联系客服提供银行卡照片和充值截图进行处理！
                </div>
                <div class="notice">
                  绑定支行提醒：如填写支行信息错误会导致出款失败，届时你需联系在线客服为您重新绑定正确信息。
                </div>
              </el-form-item>

              <el-form-item label="开户银行" prop="bank">
                <el-input
                  v-model="info.bank"
                  @focus="openBankList()"
                ></el-input>
              </el-form-item>
              <div v-if="province_visbale==true">
                <el-form-item label="开户银行省份" prop="province">
                  <el-select
                    v-model="info.province"
                    placeholder="请选择省"
                    @change="getProvinceId"
                  >
                    <el-option
                      v-for="item in province_list"
                      :key="item.division_id"
                      :label="item.division_name"
                      :value="item.division_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item
                  label="开户银行城市"
                  @change="getCityList()"
                  prop="city"
                >
                  <el-select
                    v-model="info.city"
                    placeholder="请选择省"
                    @focus="getCity"
                  >
                    <el-option
                      v-for="item in city_list"
                      :key="item.division_id"
                      :label="item.division_name"
                      :value="item.division_name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="支行名称" prop="subbank">
                <el-input v-model="info.subBank"></el-input>
                <div class="notice">
                  支行解释：支行指您最初办理开户手续的营业网点，我们通常称为支行。您可以在银行微信公众号，输入卡号查询开户支行
                </div>
              </el-form-item>

              <el-form-item label="开户人姓名" prop="realname">
                <el-input v-model="info.realName"></el-input>
              </el-form-item>
              <el-form-item label="银行卡号" prop="bankNum">
                <el-input v-model="info.bankNum"></el-input>
              </el-form-item>
              <el-form-item label="确认卡号" prop="confirmBankNum">
                <el-input v-model="info.confirmBankNum"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm(info)"
                  >提交</el-button
                >
                <el-button
                  type="default"
                  @click="$router.push('/user/bank_manage')"
                  >返回</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 银行卡列表  -->
    <el-dialog
      title="银行列表"
      :visible.sync="bank_dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="热门银行" name="hot">
          <el-row>
            <el-col v-for="(value, index) in hot_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel: issel_index === index }"
                @click="sel_bank(value, index)"
              >
                <i class="bank-icon" :class="value.logo"></i><b>{{value.name}}</b>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="ABCDEF" name="first">
          <el-row>
            <el-col v-for="(value,index) in first_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel: issel_index === index }"
                @click="sel_bank(value, index)"
              >
                <i class="bank-icon" :class="value.logo"></i><b>{{value.name}}</b>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="GHI" name="second">
          <el-row>
            <el-col v-for="(value, index) in second_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel: issel_index === index }"
                @click="sel_bank(value, index)"
              >
                <i class="bank-icon" :class="value.logo"></i><b>{{value.name}}</b>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="JKLMN" name="third">
          <el-row>
            <el-col v-for="(value, index) in third_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel: issel_index === index }"
                @click="sel_bank(value, index)"
              >
                <i class="bank-icon" :class="value.logo"></i><b>{{value.name}}</b>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="OPQRST" name="forth">
          <el-row>
            <el-col v-for="(value, index) in forth_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel: issel_index === index }"
                @click="sel_bank(value, index)"
              >
                <i class="bank-icon" :class="value.logo"></i><b>{{value.name}}</b>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="UVWXYZ" name="fifth">
          <el-row>
            <el-col v-for="(value, index) in fifth_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel: issel_index === index }"
                @click="sel_bank(value, index)"
              >
                <i class="bank-icon" :class="value.logo"></i><b>{{value.name}}</b>
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="其他" name="six">
          <el-row>
            <el-col v-for="(value, index) in six_tab" :key="value.index" :span="6">
              <a
                class="bank_box"
                :class="{ is_Sel:issel_index === index }"
                @click="sel_bank(value, index)"
              >
                {{ value }}
              </a>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="bank_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bank_dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 用户绑定手机窗口 -->
    <el-dialog
      title="绑定手机号"
      :visible.sync="phone_dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form label-width="100px" class=" ">
        <el-form-item label="手机号" prop="phonenum">
          <el-input
            type="text"
            v-model="info.phonenum"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="phone_dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bindMobilePhone">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pySort } from "../../../plugins/py-sort";

export default {
  data() {
    return {
	  goback:'',
      bank_card: this.$route.params.banklist,
      info: {
        name: "",
        account: "",
        isaddName: "",
        isaddAccount: "",

        bank: "",
        open_bank: "",
        province: "",
        city: "",
        subBank: "",

        realName: "",
        bankNum: "",
        confirmBankNum: "",

        userBankCard_nums: "",
        phonenum: "",
      },
      hot_tab: [],
      first_tab: [],
      second_tab: [],
      third_tab: [],
      forth_tab: [],
      fifth_tab: [],
      six_tab: [],
      bank_dialogVisible: false,
      userBankCardAmount: false,
      activeName: "hot",
      bank_list: [],
      isNeedOpenAddress: "",
      province_list: [],
      city_list: [],
      current_provinceId: 0,
      issel: false,
      issel_index: "",
      memberInfo: "",
      phone_dialogVisible: false,
      province_visbale:false,
      // rules: {
      //   isaddName: [
      //     { required: true, message: "请输入开户人姓名", trigger: "blur" },
      //     {
      //       min: 1,
      //       max: 40,
      //       message: "长度在 1 到 40 个字符",
      //       trigger: "blur",
      //     },
      //   ],
      //   isaddAccount: [
      //     { required: true, message: "请输入银行账号", trigger: "blur" },
      //     {
      //       min: 16,
      //       max: 19,
      //       message: "长度在 16 到 19 个字符",
      //       trigger: "blur",
      //     },
      //   ],
      //   subbank: [
      //     { required: true, message: "请输入支行名称", trigger: "blur" },
      //   ],
      //   realname: [
      //     { required: true, message: "请输入开户人姓名", trigger: "blur" },
      //   ],
      //   // bank: [{ required: true, message: "请选择银行", trigger: "blur" }],
      //   province: [{ required: true, message: "请选择省份", trigger: "blur" }],
      //   city: [{ required: true, message: "请选择城市", trigger: "blur" }],
      //   bankNum: [
      //     { required: true, message: "银行卡号", trigger: "blur" },
      //     {
      //       min: 16,
      //       max: 19,
      //       message: "长度在 16 到 19 个字符",
      //       trigger: "blur",
      //     },
      //     { required: true, validator: this.validateBankNum, trigger: "blur" },
      //   ],
      //   confirmBankNum: [
      //     { required: true, message: "银行卡号", trigger: "blur" },
      //     {
      //       min: 16,
      //       max: 19,
      //       message: "长度在 16 到 19 个字符",
      //       trigger: "blur",
      //     },
      //     { required: true, validator: this.validateBankNum2, trigger: "blur" },
      //   ],
      //   phonenum: [
      //     { required: true, message: "请输入手机号", trigger: "blur" },
      //     { required: true, validator: this.validatePhone, trigger: "blur" },
      //   ],
      // },
    };
  },
  methods: {
    //初始化
    init_() {
      //判断是否选省市
        this.getisNeedOpenAddress()
      //判断有没有绑定成功过银行卡,获取已绑定数量
      let local_userBankCard_nums = [];
	  if(this.bank_card!=undefined){
      this.bank_card.forEach((item) => {
        if (item.enable == 0) {
          this.userBankCardAmount = true;
          local_userBankCard_nums.push(item);
        }
      });
      this.info.userBankCard_nums = local_userBankCard_nums.length;
	  }
    
    },

    // 获取开户行列表
    getBankList() {
      this.$get("Pc.Member.getBankList").then((res) => {
        if (res.code == 0) {
          this.bank_list = res.data;
          this.sort_bank();
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    //获取是否需要开户行地址
    getisNeedOpenAddress() {
      this.$get("Pc.Member.isNeedOpenAddress").then((res) => {
        if (res.code == 0) {
          this.isNeedOpenAddress = res.data.isNeedOpenAddress;
          if (this.isNeedOpenAddress === "1") {
            this.province_visbale=true
            this.province_list = res.data.division_list;
            //console.log(this.province_list);
          }
        } else {
          return this.$message.error(res.message);
        }
      });
    },

    // 初始化省
    getProvinceId(id) {
		console.log(id);
      this.current_provinceId = id;
      this.info.city = "";
      //console.log(this.current_provinceId);
    },

    //初始化城市
    getCity() {
      this.$get("Pc.Member.getDivisionByParenId", {
        parant_id: this.current_provinceId,
      }).then((res) => {
        if (res.code == 0) {
          this.city_list = res.data;
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 打开银行弹出窗
    openBankList() {
      this.bank_dialogVisible = true;
    },
    // 关闭弹窗
    handleClose(done) {
      done();
    },
    //字母分类排序
    sort_bank() {
      // 字母分类
      let cur_sortList = pySort(this.bank_list, 'logo',);
      //console.log(cur_sortList);

      //组装数据
      let local_hot_data = [];
      this.bank_list.forEach((item) => {
        if (item.is_hot == 1) {
          local_hot_data.push(item);
        }
      });
      this.hot_tab = local_hot_data;

      cur_sortList.forEach((item) => {
        let first = "ABCDEF",
          second = "GHI",
          third = "JKLMN",
          forth = "OPQRST",
          fifth = "UVWXYZ"
        if (first.indexOf(item.letter) != -1) {
          this.first_tab.push(item);
        }

        if (second.indexOf(item.letter) != -1) {
          this.second_tab.push(item);
        }

        if (third.indexOf(item.letter) != -1) {
          this.third_tab.push(item);
        }

        if (forth.indexOf(item.letter) != -1) {
          this.forth_tab.push(item);
        }
        if (fifth.indexOf(item.letter) != -1) {
          this.fifth_tab.push(item);
        }
        if(item.letter=="#"){
          this.six_tab.push(item)
        }
      });
      let first_local_data = [];
      this.first_tab.forEach((ite) => {
		  if(ite.data!=undefined&& ite.data!=null){
			  ite.data.forEach((it) => {
			    first_local_data.push(it);
			    this.first_tab = first_local_data;
			  });
		  }
        
      });
      //console.log(this.first_tab)
      let second_local_data = [];
      this.second_tab.forEach((ite) => {
		  if(ite.data!=undefined&& ite.data!=null){
        ite.data.forEach((it) => {
          second_local_data.push(it);
          this.second_tab = second_local_data;
        });
		}
      });
      let third_local_data = [];
      this.third_tab.forEach((ite) => {
		  if(ite.data!=undefined&& ite.data!=null){
        ite.data.forEach((it) => {
          third_local_data.push(it);
          this.third_tab = third_local_data;
        });
		}
      });
      let forth_local_data = [];
      this.forth_tab.forEach((ite) => {
		  if(ite.data!=undefined&& ite.data!=null){
        ite.data.forEach((it) => {
          forth_local_data.push(it);
          this.forth_tab = forth_local_data;
        });
		}
      });
      let fifth_local_data = [];
      this.fifth_tab.forEach((ite) => {
		  if(ite.data!=undefined&& ite.data!=null){
        ite.data.forEach((it) => {
          fifth_local_data.push(it);
          this.fifth_tab = fifth_local_data;
        });
		}
      });
      let six_local_data = [];
      this.six_tab.forEach((ite) => {
		  if(ite.data!=undefined&& ite.data!=null){
        ite.data.forEach((it) => {
          six_local_data.push(it.name);
          this.six_tab = six_local_data;
        });
		}
      });
    },
    //选择当前银行
    sel_bank(v, index) {
	console.log("...");
      this.info.bank = "";
      this.bank_list.forEach((item) => {
        if (item.logo == v.logo || item.name ==v.name) {
          this.info.bank = item.name;
          this.info.open_bank = item.id;
          this.issel_index = index;
        }
      });
    },

    //tab选择
    handleClick() {
      this.issel_index = "";
    },

    //获取用户信息
    getmemberInfo() {
      this.$get("Pc.Member.memberInfo").then((res) => {
        if (res.code == 0) {
          this.memberInfo = res.data;
          //console.log(this.memberInfo);
          if (this.memberInfo.phoneno == "") {
            this.phone_dialogVisible = true;
          }
        } else {
          return this.$message.error(res.message);
        }
      });
    },

    // 绑定手机号
    bindMobilePhone() {
      this.phone_dialogVisible = false;
      this.$post("Pc.Member.bindMobilePhone", {
        phoneno: this.info.phonenum,
      }).then((res) => {
        if (res.code >= 0) {
          this.$message.success("绑定成功");
        } else {
          return this.$message.error(res.message);
        }
      });
    },

    // 提交表单
    submitForm() {
      if (
        this.info.realName == "" ||
        this.info.bankNum == "" ||
        this.info.confirmBankNum == "" ||
        this.info.bank == "" ||
        this.info.subBank == ""
      ) {
        this.$message.error("请认真填写完信息！");
        return;
      }
      this.getmemberInfo(); //验证用户信息
	  let provinceName='';
	  console.log(this.province_list);
	  if(this.province_list!=undefined&&this.province_list!=null){
		  for(let i=0;i<this.province_list.length;i++){
		  		  let item=this.province_list[i];
		  		  if(item.division_id==this.current_provinceId){
		  		  			  provinceName=item.division_name;
		  		  }
		  }	
	  }
	    
	  
      this.$post("Pc.Member.addBankcard", {
        open_bank: this.info.open_bank,
        real_name: this.info.realName,
        bank_account: this.info.bankNum,
        ok_bank_account: this.info.confirmBankNum,
        addBankSetting: this.isNeedOpenAddress,
        bank_name: this.info.bank,
        province: provinceName,
        city: this.info.city,
        subbranch: this.info.subBank,
        userBankCardAmount: this.info.userBankCard_nums||0,
        last_bank_account: this.info.isaddAccount,
        last_real_name: this.info.isaddName,
      }).then((res) => {
        if (res.code >= 0) {
          this.$message.success(res.message);
		  if(this.goback!=''){
		  	let backurl= decodeURIComponent(this.goback);
		  	this.$router.push(backurl);
		  }else{
			  this.$router.push("/user/bank_manage");
		  }
		  
		  
		  
        } else {
          return this.$message.error(res.message);
        }
      });
    },

    //表单验证
    validateBankNum(rule, value, callback) {
      // 是否包含数字
      if (value === "") {
        callback(new Error("请输入银行卡号"));
      } else {
        if (this.info.confirmBankNum !== "") {
          this.$refs.info.validateField("confirmBankNum");
        }
        callback();
      }
    },
    validateBankNum2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入银行卡号"));
      } else if (value !== this.info.bankNum) {
        callback(new Error("两次输入银行卡号不一致!"));
      } else {
        callback();
      }
    },
    validatePhone(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!/^1[3456789]\d{9}$/.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    },
  },
  // mounted() {
    
   
  // },
  activated() {
	let { goback } = this.$route.query;  
	console.log(goback);
	if(goback!=undefined && goback!=''){
		this.goback=goback;
	}
	  
    this.getBankList(); //初始化银行卡列表
    //this.sort_bank();
    this.init_(); //初始化页面数据
  },
};
</script>

<style lang="scss" scoped>
@import "/bank.css";
.search_content {
  margin: 15px 0;
  .el-input,
  .el-select {
    width: 50%;
  }
}
.notice {
  color: red;
  font-size: 12px;
}
.tips {
  font-size: 12px;
  color: #999;
}
.bank_box {
  display: block;
  width: 164px;
  margin: 0px 0 12px 0;
  text-align: center;
  padding: 5px;
  height: 70px;
  
  border: 1px solid #eee;
}
.bank_box.is_Sel {
  border-color: #ca151e;
}
.bank_box:hover {
  border-color: #ca151e;
}
</style>