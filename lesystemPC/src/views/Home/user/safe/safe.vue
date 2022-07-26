<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title">安全中心</div>
    <el-divider></el-divider>
    <div class="user_safe">
      <div class="user_safe_head">
        <el-row :gutter="60">
          <el-col :span="8">
            <div class="content">
              <el-progress
                type="dashboard"
                :format="format"
                :stroke-width="12"
                :percentage="percentage"
                :color="customColorMethod"
              ></el-progress>
              <div class="safe_level" v-if="sercurity_info.securityLevel == 1">
                <p>
                  安全等级：
                  <span>低</span>
                </p>
                <p class="square">
                  <span style="background: #ff2907"></span>
                </p>
              </div>
              <div class="safe_level" v-if="sercurity_info.securityLevel == 2">
                <p>
                  安全等级：
                  <span>中</span>
                </p>
                <p class="square">
                  <span
                    style="background: #ff8b07"
                    v-for="i in 2"
                    :key="i.index"
                  ></span>
                </p>
              </div>
              <div class="safe_level" v-if="sercurity_info.securityLevel == 3">
                <p>
                  安全等级：
                  <span>强</span>
                </p>
                <p class="square">
                  <span
                    style="background: #ffcd07"
                    v-for="i in 3"
                    :key="i.index"
                  ></span>
                </p>
              </div>
              <div class="safe_level" v-if="sercurity_info.securityLevel == 4">
                <p>
                  安全等级：
                  <span>极强</span>
                </p>
                <p class="square">
                  <span
                    style="background: #67c23a"
                    v-for="i in 4"
                    :key="i.index"
                  ></span>
                </p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="content">
              <p class="tit">最近一次登录信息</p>
              <p>登录时间：</p>
              <p>{{ sercurity_info.lastLoginTime }}</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="content lastone">
              <p class="tit">最近一次登录IP</p>
              <p>登录IP：</p>
              <p>{{ sercurity_info.lastLoginIp }}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="user_safe_item">
        <div class="user_safe_icon">
          <i class="font iconfont success">&#xe646;</i>
        </div>
        <div class="user_safe_title">
          登录密码
          <p>登录密码由6-13个数字和字母组成。</p>
        </div>
        <div class="user_safe_btn">
          <el-button
            @click="pwdVisable = true"
            :type="sercurity_info.hasLoginPassword == 1 ? 'primary' : 'warning'"
            >{{
              sercurity_info.hasLoginPassword == 1 ? "修改" : "去设定"
            }}</el-button
          >
        </div>
        <div class="clear"></div>
      </div>

      <div class="user_safe_item">
        <div class="user_safe_icon">
          <i class="font iconfont success">&#xe646;</i>
        </div>
        <div class="user_safe_title">
          资金密码
          <p>
            资金密码由4-6位数字和字母组成，在线取款时需要输入取款密码才能进行取款。
          </p>
        </div>
        <div class="user_safe_btn">
          <el-button
            v-if="sercurity_info.hasWithdrawalsPassword == 1"
            type="primary"
            @click="wthdraw_pwdVisable = true"
          >
            修改
          </el-button>
          <el-button
            v-if="sercurity_info.hasWithdrawalsPassword == 0"
            type="warning"
            @click="wthdraw_pwdVisable_set = true"
          >
            去设定
          </el-button>
        </div>
        <div class="clear"></div>
      </div>

      <div class="user_safe_item">
        <div class="user_safe_icon">
          <i
            class="font iconfont success"
            >&#xe6eb;</i
          >
        </div>
        <div class="user_safe_title">
          密保问题
          <p>密保问题用户找回资金密码，请牢记！</p>
        </div>
        <div class="user_safe_btn">
          <el-button
            v-if="sercurity_info.hasSecurityQuestion == 1"
            type="primary"
            @click="question_visable_yz = true"
            >修改</el-button
          >
          <el-button
            v-if="sercurity_info.hasSecurityQuestion == 0 && sercurity_info.hasWithdrawalsPassword==1"
            type="warning"
            @click="question_visable_set = true"
            >去设定</el-button
          >
           <el-button
            v-if="sercurity_info.hasSecurityQuestion == 0 && sercurity_info.hasWithdrawalsPassword==0"
            type="warning"
            @click="tipsVisible=true"
            >去设定</el-button
          >
        </div>
        <div class="clear"></div>
      </div>

      <div class="user_safe_item">
        <div class="user_safe_icon">
          <i
            class="font iconfont success"
            >&#xe650;</i
          >
        </div> 
        <div class="user_safe_title">
          手机认证
          <p>绑定手机可增加账号安全级别，账户更安全健康。</p>
        </div>
        <div class="user_safe_btn">
           <el-button
            v-if="sercurity_info.hasPhoneNo == 1"
            type="primary"
            @click="hasphoneNo_visable = true"
            >修改</el-button
          >
          <el-button
            v-if="sercurity_info.hasPhoneNo == 0"
            type="warning"
            @click="hasphoneNo_visable_set = true"
            >去设定</el-button
          >
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- 密码修改 -->
    <el-dialog title="密码修改" :visible.sync="pwdVisable">
      <el-form label-width="120px" ref="pwd_info" :model="pwd_info">
        <el-form-item
          label="原登录密码"
          prop="oldPwd"
          :rules="[
            { required: true, message: '原登录密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="pwd_info.oldPwd"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="新登录密码"
          prop="newPwd"
          :rules="[
            { required: true, message: '新密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="6-13个字符（数字和字母）"
            type="password"
            v-model="pwd_info.newPwd"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="确认登录密码"
          prop="okPwd"
          :rules="[
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="pwd_info.okPwd"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitpPassword('pwd_info')"
            >提交</el-button
          >
          <el-button type="danger" @click="cancelPassword()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 设定资金密码 -->
    <el-dialog title="设定资金密码" :visible.sync="wthdraw_pwdVisable_set">
      <el-form
        label-width="120px"
        ref="wthdrawpwd_info_set"
        :model="wthdrawpwd_info_set"
      >
        <el-form-item
          label="资金密码"
          prop="newPwd"
          :rules="[
            { required: true, message: '新密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="wthdrawpwd_info_set.newPwd"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="确认资金密码"
          prop="okPwd"
          :rules="[
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="wthdrawpwd_info_set.okPwd"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitwthdrawpwd_set('wthdrawpwd_info_set')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 资金密码修改 -->
    <el-dialog title="资金密码修改" :visible.sync="wthdraw_pwdVisable">
      <el-form
        label-width="120px"
        ref="wthdrawpwd_info"
        :model="wthdrawpwd_info"
      >
        <el-form-item
          label="原资金密码"
          prop="oldPwd"
          :rules="[
            { required: true, message: '原资金密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="wthdrawpwd_info.oldPwd"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="新资金密码"
          prop="newPwd"
          :rules="[
            { required: true, message: '新密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="4-6个字符（数字和字母）"
            type="password"
            v-model="wthdrawpwd_info.newPwd"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="确认资金密码"
          prop="okPwd"
          :rules="[
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="wthdrawpwd_info.okPwd"
          ></el-input
        ></el-form-item>
        <el-form-item>
         <div v-if='this.sercurity_info.hasSecurityQuestion==1'> 忘记密码？ <el-link @click="withdra_visable_yz=true,wthdraw_pwdVisable=false">去找回</el-link></div>
         <div v-else> 忘记密码？ <el-link @click="openkefu">联系客服</el-link></div>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitwthdrawpwd('wthdrawpwd_info')"
            >提交</el-button
          >
          <el-button type="danger" @click="cancelwthdrawpwd()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 密保问题设定 -->
    <el-dialog title="密保问题设定" :visible.sync="question_visable_set">
      <el-form
        label-width="120px"
        ref="question_info_set"
        :model="question_info_set"
      >
        <el-form-item
          label="输入资金密码"
          prop="withdrawPwd"
          :rules="[
            { required: true, message: '资金密码不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="password"
            v-model="question_info_set.withdrawPwd"
          ></el-input
        ></el-form-item>
        <el-form-item label="问题1">
          <el-select v-model="question_info_set.anwserOne" placeholder="请选择">
            <el-option
              v-for="item in question_list"
              :key="item.id"
              :label="item.question"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="回答1"
          prop="question1Id"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="question_info_set.question1Id"
          ></el-input
        ></el-form-item>
        <el-form-item label="问题2">
          <el-select v-model="question_info_set.anwserTwo" placeholder="请选择">
            <el-option
              v-for="item in question_list"
              :key="item.id"
              :label="item.question"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="回答2"
          prop="question2Id"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="question_info_set.question2Id"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitquestion_set('question_info_set')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

  <!-- 资金密码找回 -->
    <el-dialog title="资金密码找回" v-if="question_yz!=null" :visible.sync="withdra_visable_yz">
      <el-form
        label-width="120px"
        ref="question_info_yz"
        :model="question_info_yz"
      >
        <el-form-item label="问题1">
          {{question_yz.questin1}}
        </el-form-item>
        <el-form-item
          label="答案"
          prop="anwserOne"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="question_info_yz.anwserOne"
          ></el-input
        ></el-form-item>
        <el-form-item label="问题2">
           {{question_yz.questin2}}
        </el-form-item>
        <el-form-item
          label="答案"
          prop="anwserTwo"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="question_info_yz.anwserTwo"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitWithdraw_yz('question_info_yz')"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 密保问题修改验证 -->
    <el-dialog title="密保问题验证" v-if="question_yz!=null" :visible.sync="question_visable_yz">
      <el-form
        label-width="120px"
        ref="question_info_yz"
        :model="question_info_yz"
      >
        <el-form-item label="问题1">
          {{question_yz.questin1}}
        </el-form-item>
        <el-form-item
          label="答案"
          prop="anwserOne"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="question_info_yz.anwserOne"
          ></el-input
        ></el-form-item>
        <el-form-item label="问题2">
           {{question_yz.questin2}}
        </el-form-item>
        <el-form-item
          label="答案"
          prop="anwserTwo"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="question_info_yz.anwserTwo"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitquestion_yz('question_info_yz')"
            >下一步</el-button
          >
          <el-button
            type="primary"
            @click="cancelquestion_yz"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 密保问题修改 -->
    <el-dialog title="密保问题修改" :visible.sync="question_visable_xg">
      <el-form
        label-width="120px"
        ref="question_info_xg"
        :model="question_info_xg"
      >
        <el-form-item label="问题1">
          <el-select v-model="question_info_xg.question1Id" placeholder="请选择">
            <el-option
              v-for="item in question_list"
              :key="item.id"
              :label="item.question"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="回答1"
          prop="anwserOne"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入问题一答案"
            type="text"
            v-model="question_info_xg.anwserOne"
          ></el-input
        ></el-form-item>
        <el-form-item label="问题2">
          <el-select v-model="question_info_xg.question2Id" placeholder="请选择">
            <el-option
              v-for="item in question_list"
              :key="item.id"
              :label="item.question"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="回答2"
          prop="anwserTwo"
          :rules="[
            { required: true, message: '长度最多为25个字符', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入问题二答案"
            type="text"
            v-model="question_info_xg.anwserTwo"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitquestion_xg('question_info_xg')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 设定手机 -->
    <el-dialog title="手机号码设定" :visible.sync="hasphoneNo_visable_set">
        <el-form
          label-width="120px"
          :model="hasphoneno_set"
          ref="hasphoneno_set"
        >
        <el-form-item
          label="手机号码"
          prop="phoneno"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="hasphoneno_set.phoneno"
             :rules="[
                { required: true, message: '手机号不能为空', trigger: 'blur' },
              ]"
          ></el-input
        ></el-form-item>
        <el-form-item>
           <el-button @click="hasphoneNo_visable_set = false">取 消</el-button>
           <el-button type="primary" @click="submit_phone_set('hasphoneno_set')">确 定</el-button>
        </el-form-item>
        </el-form>
    </el-dialog>

    <!-- 修改手机 -->
    <el-dialog title="手机号码设定" :visible.sync="hasphoneNo_visable">
      <el-form label-width="120px" ref="hasphoneno" :model="hasphoneno">
        <el-form-item
          label="原手机号码"
          prop="oldphoneno"
          :rules="[
            { required: true, message: '原手机号不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="hasphoneno.oldphoneno"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="新手机号码"
          prop="phoneno"
          :rules="[
            { required: true, message: '新手机号不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="hasphoneno.phoneno"
          ></el-input
        ></el-form-item>
        <el-form-item
          label="确认手机号码"
          prop="okphoneno"
          :rules="[
            { required: true, message: '确认手机号不能为空', trigger: 'blur' },
          ]"
          ><el-input
            placeholder="请输入内容"
            type="text"
            v-model="hasphoneno.okphoneno"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit_phone('hasphoneno')"
            >提交</el-button
          >
          <el-button type="primary" @click="cancel_phone">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- showtips -->
    <el-dialog title="操作提示" :visible.sync="tipsVisible">
      <p>请先设置资金密码，点击确定设置资金密码！</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tipsVisible = false">取 消</el-button>
          <el-button type="primary" @click="tipsVisible = false,wthdraw_pwdVisable_set=true">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      hasphoneno_set:{
         phoneno: '',
      },
      hasphoneno: {
        oldphoneno:"",
        phoneno:"",
        okphoneno:""
      },
      sercurity_info: {
        // asLoginPassword: 1,
        // hasPhoneNo: 1,
        // hasSecurityQuestion: 0,
        // hasWithdrawalsPassword: 0,
        // lastLoginIp: "",
        // lastLoginTime: "",
        // safetyCount: 4,
        // securityLevel: 1
      },
      pwd_info: {
        oldPwd: "",
        newPwd: "",
        okPwd: "",
      },
      wthdrawpwd_info_set: {
        newPwd: "",
        okPwd: "",
      },
      wthdrawpwd_info: {
        oldPwd: "",
        newPwd: "",
        okPwd: "",
      },
      question_info_set: {
        withdrawPwd:'',
        anwserOne:'',
        anwserTwo:'',
        question1Id:'',
        question2Id:''
      },
      question_info_xg: {
        anwserOne:'',
        anwserTwo:'',
        question1Id:'',
        question2Id:''
      },
      question_list: {},
      question_yz: {},
      question_info_yz:{
        anwserOne:'',
        anwserTwo:'',
      },
      pwdVisable: false,
      wthdraw_pwdVisable: false,
      wthdraw_pwdVisable_set: false,
      question_visable_set: false,
      question_visable_yz: false,
      question_visable_xg: false,
      hasphoneNo_visable_set:false,
      hasphoneNo_visable:false,
      withdra_visable_yz:false,
      kefu_address:'',
      tipsVisible:false
    };
  },
  watch: {},
  computed: {
    percentage: function () {
      let _percentage = 0;
      let _securityLevel = this.sercurity_info.securityLevel;
      if (_securityLevel == 1) {
        _percentage = 25;
      } else if (_securityLevel == 2) {
        _percentage = 50;
      } else if (_securityLevel == 3) {
        _percentage = 75;
      } else if (_securityLevel == 4) {
        _percentage = 100;
      }
      return _percentage;
    },
  },
  methods: {
    // opentips

    // 手机号修改
    submit_phone:function(e){
      let _this = this;
      // 验证手机
      _this.$refs[e].validate(function () {
          if (!/^1[3456789]\d{9}$/.test(_this.hasphoneno.oldphoneno)) {
            return _this.$message.error("请输入正确的原手机号");
          }else if(!/^1[3456789]\d{9}$/.test(_this.hasphoneno.phoneno))
            return _this.$message.error("请输入正确的新手机号");
            else if(!/^1[3456789]\d{9}$/.test(_this.hasphoneno.okphoneno))
            return _this.$message.error("请输入正确的确认新手机号");
            else if(_this.hasphoneno.phoneno != _this.hasphoneno.okphoneno)
            return  _this.$message.error("两次输入手机号码不一致");
         _this.update_mobilePhone();
      });
    },
    cancel_phone(){
      this.hasphoneno.oldphoneno=""
      this.hasphoneno.phoneno=""
      this.hasphoneno.okphoneno=""
    },
    // 手机号修改更新
    update_mobilePhone(){
        this.$post("Pc.Member.updateMobilePhone",
        this.hasphoneno
      ).then((res) => {
        if (res.code == 1) {
          this.$message.success(res.message);
          this.hasphoneNo_visable = false;
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 手机号设定
    submit_phone_set:function(e){
      let _this = this;
      // 验证手机
      _this.$refs[e].validate(function (res) {
        if (res) {
          if (!/^1[3456789]\d{9}$/.test(_this.hasphoneno_set.phoneno)) {
            return _this.$message.error("请输入正确的手机号");
          }
        }
         _this.update_mobilePhone_set();
      });
     
    },
    update_mobilePhone_set(){
        this.$post("Pc.Member.bindMobilePhone",
        this.hasphoneno_set
      ).then((res) => {
        if (res.code == 1) {
          this.$message.success('手机号保存成功');
          this.hasphoneNo_visable_set = false;
          this.$set(this.sercurity_info, 'hasPhoneNo', 1) //修改按钮状态
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 修改密保问题
    submitquestion_xg:function(e){
       let _this = this;
        // 验证表单
       this.$refs[e].validate(function (res) {
        if (res) {
          if (_this.question_info_xg.anwserOne == _this.question_info_xg.anwserTwo) {
            return _this.$message.error("两次密保问题不能为同一问题");
          }
          _this.update_question_xg();
        }
      });
    },
    update_question_xg(){
      this.$post("Pc.MemberPasswordProtection.updateSecretQuestion",
      this.question_info_xg
      ).then((res) => {
        if (res.code == 1) {
          this.$message.success(res.message);
          this.question_visable_xg = false;
          return;
        } else {
          this.question_visable_xg = false;
          this.$message.error(res.message);
        }
      });
    },
    // 资金密码找回
    submitWithdraw_yz:function(){
       let _this = this;
       _this.update_widthdraw_yz();
    },
    // 修改密保问题验证
    submitquestion_yz: function () {
      let _this = this;
       _this.update_question_yz();
    },
    get_question_yz: function () {
      this.$get(
        "Pc.MemberPasswordProtection.getSecretQuestion"
      ).then((res) => {
        if (res.code == 0) {
          this.question_yz= res.data;
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    update_question_yz: function () {
      this.$post("Pc.MemberPasswordProtection.rquestSecuritySettingIsExists",
      this.question_info_yz
      ).then((res) => {
        if (res.code == 1) {
          this.question_visable_yz = false;
          this.question_visable_xg=true //成功后打开密保问题修改
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancelquestion_yz(){
      this.question_info_yz.anwserOne=''
      this.question_info_yz.anwserTwo=''
    },
    update_widthdraw_yz: function () {
      this.$post("Pc.MemberPasswordProtection.rquestSecuritySettingIsExists",
      this.question_info_yz
      ).then((res) => {
        if (res.code == 1) {
          this.withdra_visable_yz = false;
          this.wthdraw_pwdVisable_set=true //打开资金密码设定
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 设定密保
    submitquestion_set: function (e) {
      let _this = this;
      // 验证表单
      this.$refs[e].validate(function (res) {
        if (res) {
          if (_this.question_info_set.anwserOne == _this.question_info_set.anwserTwo) {
            return _this.$message.error("两次密保问题不能为同一问题");
          }
          _this.update_question_set();
        }
      });
    },

    //获取问题列表
    get_question_list: function () {
      this.$get(
        "Pc.MemberPasswordProtection.getMemberPasswordProtectionQuestion"
      ).then((res) => {
        if (res.code == 0) {
          this.question_list = res.data;
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
   // 设定密码问题
    update_question_set: function () {
      this.$post(
        "Pc.MemberPasswordProtection.addSecretQuestion",
        this.question_info_set
      ).then((res) => {
        if (res.code == 1) {
          this.$message.success("密保问题设定成功");
          this.question_visable_set = false;
          this.$set(this.sercurity_info, 'hasSecurityQuestion', 1) //修改按钮状态
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 修改资金密码
    submitwthdrawpwd: function (e) {
      let _this = this;
      // 验证表单
      this.$refs[e].validate(function (res) {
        if (res) {
          if (_this.wthdrawpwd_info.newPwd != _this.wthdrawpwd_info.okPwd) {
            return _this.$message.error("两次密码不一致");
          }
          _this.update_wthdrawpwd();
        }
      });
    },
    update_wthdrawpwd: function () {
      this.$post("Pc.Member.updateWithdrawPwd", this.wthdrawpwd_info).then(
        (res) => {
          if (res.code == 1) {
            this.$message.success("资金密码修改成功");
            this.wthdraw_pwdVisable = false;
            return;
          } else {
            this.$message.error(res.message);
          }
        }
      );
    },
    cancelwthdrawpwd(){
        this.wthdrawpwd_info.oldPwd=""
        this.wthdrawpwd_info.newPwd=""
        this.wthdrawpwd_info.okPwd=""
    },
    // 联系客服
    openkefu:function(){
      this.$get("Pc.CustomerService.getCustomerService").then((res) => {
        if (res.code == 1) {
          this.wthdraw_pwdVisable=false
          this.kefu_address=res.data.kefu_address
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 设定资金密码
    submitwthdrawpwd_set: function (e) {
      let _this = this;
      // 验证表单
      this.$refs[e].validate(function (res) {
        if (res) {
          if (
            _this.wthdrawpwd_info_set.newPwd != _this.wthdrawpwd_info_set.okPwd
          ) {
            return _this.$message.error("两次密码不一致");
          }
          _this.update_wthdrawpwd_set();
        }
      });
    },
    update_wthdrawpwd_set: function () {
      this.$post(
        "Pc.Member.updateWithdrawNewPwd",
        this.wthdrawpwd_info_set
      ).then((res) => {
        if (res.code == 1) {
          this.$set(this.sercurity_info, 'hasWithdrawalsPassword', 1) //修改按钮状态
          this.$message.success("资金密码设定成功");
          this.wthdraw_pwdVisable_set = false;
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 修改密码提交
    submitpPassword: function (e) {
      let _this = this;
      // 验证表单
      this.$refs[e].validate(function (res) {
        if (res) {
          if (_this.pwd_info.newPwd != _this.pwd_info.okPwd) {
            return _this.$message.error("两次密码不一致");
          }
          _this.update_login_pwd();
        }
      });
    },
    update_login_pwd: function () {
      this.$post("Pc.Member.updateLoginPwd", this.pwd_info).then((res) => {
        if (res.code == 1) {
          this.$message.success(res.message);
          this.pwdVisable = false;
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancelPassword(){
      this.pwd_info.oldPwd=""
      this.pwd_info.newPwd=""
      this.pwd_info.okPwd=""
    },
    // 获取用户安全基本信息
    getSercurityInfo() {
      this.$get("Pc.Member.getSercurityInfo").then((res) => {
        if (res.code == 0) {
          this.sercurity_info = res.data;
        } else {
          return this.$message.error(res.message);
        }
      });
    },
    // 密码强度
    format(percentage) {
      if (percentage == 25) {
        return "低";
      } else if (percentage == 50) {
        return "中";
      } else if (percentage == 75) {
        return "强";
      } else if (percentage == 100) {
        return "极强";
      }
    },
    // 密码强度对应颜色
    customColorMethod() {
      if (this.percentage < 30) {
        return "#FF2907";
      } else if (this.percentage < 55) {
        return "#FF8B07";
      } else if (this.percentage < 80) {
        return "#FFCD07";
      } else {
        return "#67C23A";
      }
    },
  },
  created() {
    this.getSercurityInfo(); //初始化用户安全信息
    this.get_question_list(); //获取密码问题
    this.get_question_yz()
  },
  mounted() {},
};
</script>
<style lang="scss" >
.user_safe_phone {
  margin-bottom: 20px;
  label {
    margin-right: 15px;
    width: 90px;
    display: block;
    text-align: right;
    float: left;
    line-height: 30px;
  }
  input {
    outline: none;
    width: 220px;
    border: 1px solid #efefef;
    border-radius: 3px;
    height: 30px;
    padding: 0 5px;
    float: left;
  }
  input.code {
    width: 100px;
  }
  .user_phone_send {
    width: 110px;
    text-align: center;
    color: #fff;
    background: #333;
    line-height: 30px;
    float: left;
    margin-left: 10px;
  }
}
.user_safe {
  .user_safe_item {
    border-bottom: 1px solid #efefef;
    .user_safe_icon {
      line-height: 90px;
      margin-right: 40px;
      margin-left: 15px;
      float: left;
      i {
        font-size: 24px;
        color: #ca151e; //42b983  ca151e
      }
      i.success {
        color: #42b983;
      }
    }
    .user_safe_title {
      float: left;
      font-size: 16px;
      font-weight: bold;
      padding-top: 20px;
      line-height: 25px;
      p {
        font-size: 14px;
        color: #666;
        font-weight: normal;
      }
    }
    .user_safe_btn {
      float: right;
      margin-top: 28px;
      margin-right: 15px;
      div {
        border: 1px solid #efefef;
        width: 100px;
        line-height: 30px;
        background: #fff;
        text-align: center;
      }
      div:hover {
        border-color: #ca151e;
        color: #ca151e;
      }
    }
  }
}
.user_safe_head {
  padding: 0 15px;
  position: relative;
  border-bottom: 1px solid #efefef;
  .content {
    position: relative;
    .el-progress-circle {
      width: 80px !important;
      height: 80px !important;
    }
    .safe_level {
      position: absolute;
      left: 100px;
      top: 20px;
    }
    .tit {
      color: #999;
      font-size: 12px;
      margin-top: 4px;
    }
    .square {
      span {
        display: inline-block;
        width: 24px;
        height: 12px;
        background: #efefef;
        border-radius: 2px;
        margin-right: 4px;
        margin-top: 6px;
      }
    }
  }
  .content:after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 60px;
    width: 1px;
    background: #efefef;
  }
  .lastone.content:after {
    display: none;
  }
}
 .el-dialog {
   .el-select{
      width: 100%;
    }
 }
 
</style>