<template>
  <div class="user_content_blcok">
    <div class="user_content_blcok_title" style="position: relative">
      推广注册
    </div>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24">
        <el-radio-group
          v-model="labelPosition"
          @change="changeGroup"
          size="small"
        >
          <el-radio-button label="tglj">推广链接</el-radio-button>
          <el-radio-button label="tggl">推广管理</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <div class="search_content">
      <div class="result_content">
        <!-- 推广链接 -->
        <div class="form_box" v-if="labelPosition == 'tglj'">
          <el-form label-width="240px" :model="info" ref="info">
            <el-form-item v-if="s_hierarchy" label="用户类型">
              <el-select v-model="info.customerType" placeholder="请选择">
                <el-option
                  v-for="item in user_type_list"
                  :key="item.id"
                  :label="item.text"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推广域名">
              <el-select v-model="info.createLink" placeholder="请选择">
                <el-option
                  v-for="(item, index) in local_createLink"
                  :key="index"
                  :label="item"
                  :value="index + 1"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="链接有效期">
              <el-select v-model="info.linkValidityPeriod" placeholder="请选择">
                <el-option
                  v-for="(item, index) in arr_PeriodValue"
                  :key="index"
                  :label="item"
                  :value="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="邀请码"
              prop="invitationCode"
              :rules="[
                {
                  required: true,
                  min: 4,
                  max: 11,
                  message: '长度为4-11个字符（数字+字母）',
                  trigger: 'blur',
                },
              ]"
              ><el-input
                :placeholder="info_list.invitationCodeTip"
                type="text"
                @change="check_used"
                v-model="info.invitationCode"
              ></el-input>
              <span style="color: red">（ 必填 ）</span>
            </el-form-item>
            <el-divider></el-divider>

            <div class="type-setting-list1">
              <div>
                <el-form-item class="play-item1">
                  <p>
                    请先为下级设置彩票返点：
                    <el-button type="success" size="mini" @click="one_set()"
                      >一键设置</el-button
                    >
                  </p>
                </el-form-item>

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

              <div>
                <el-form-item class="play-item1">
                  <p>
                    请先为下级设置第三方游戏返点：
                    <!-- <el-button type="success" size="mini" @click="one_set()"
                      >一键设置</el-button
                    > -->
                  </p>
                </el-form-item>

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
                    v-model="item.kickback"
                    :disabled="canEditKickback"
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

            <el-form-item class="btn-btn">
              <el-button type="primary" @click="submit_info('info')"
                >生成链接</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <!-- 推广管理 -->
        <div v-if="labelPosition == 'tggl'">
          <el-table
            :data="info_list_m.list"
            border
            style="width: 100%"
            empty-text="没有符合查询条件的数据！"
          >
            <el-table-column
              label="推广渠道链接"
              width="340px"
            >
			<template scope="scope">
			  <div>{{ scope.row.createLink }}</div>
			  <div>{{ scope.row.createLink2 }}</div>
			</template>
            </el-table-column>
            <el-table-column label="邀请码" width="" prop="invitationCode">
            </el-table-column>
            <el-table-column label="访问量" width="" prop="visitedAmout">
            </el-table-column>
            <el-table-column label="注册人数" width="" prop="registeredCount">
              <template scope="scope">
                <div class="pointer" @click="toDetail(scope.row)">
                  {{ scope.row.registeredCount }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="开户类型" width="" prop="customerValue">
            </el-table-column>
            <el-table-column
              label="状态"
              width=""
              prop="linkValidityPeriodValue"
            >
            </el-table-column>
            <el-table-column label="生成时间" width="140px" prop="add_time">
            </el-table-column>
            <el-table-column label="操作" width="120px">
              <template slot-scope="scope">
                <el-link
                  @click="showdialog_detail(scope.row)"
                  class="pd2"
                  type="primary"
                  >详情</el-link
                >
                <el-link
                  @click="showdialog_detail_edit(scope.row)"
                  class="pd2"
                  type="primary"
                  >编辑</el-link
                >
                <el-link
                  @click="open_dialogVisible(scope.row)"
                  class="pd2"
                  type="primary"
                  >删除</el-link
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="page-box">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="page_sizes"
              :page-size="page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total_count"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog :visible.sync="dialog_detailVisible">
      <el-form :model="detail_list" class="dialog-form">
        <el-form-item label="推广渠道链接" label-width="120px">
          <div>{{ this.cur_detail_list.createLink }}</div>
		  <div>{{ this.cur_detail_list.createLink2 }}</div>
        </el-form-item>
        <el-form-item label="邀请码" label-width="120px">
          {{ this.cur_detail_list.invitationCode }}
        </el-form-item>
        <el-form-item label="访问量" label-width="120px">
          {{ this.cur_detail_list.visitedAmout }}
        </el-form-item>
        <el-form-item label="注册人数" label-width="120px">
          {{ this.cur_detail_list.registeredCount }}
        </el-form-item>
        <el-form-item v-if="s_hierarchy" label="开户类型" label-width="120px">
          {{ this.cur_detail_list.customerValue }}
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          {{ this.cur_detail_list.linkValidityPeriodValue }}
        </el-form-item>
        <el-form-item label="生成时间" label-width="120px">
          {{ this.cur_detail_list.add_time }}
        </el-form-item>
        <el-form-item label="返点率" label-width="120px">
          <div
            class="bor-bottom"
            v-for="item in cur_typeSetting_list"
            :key="item.index"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.kickback }}</span>
          </div>
        </el-form-item>
        <el-form-item label="二维码" label-width="120px">
          <img :src="this.qrcode_img" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_detailVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog :visible.sync="dialog_detailVisible_edit">
      <el-form :model="detail_list_edit" class="dialog-form">
        <el-form-item label="推广渠道链接" label-width="120px">
          <div>{{ this.cur_detail_list_edit.createLink }}</div>
		 
		  <div>{{ this.cur_detail_list_edit.createLink2 }}</div>
        </el-form-item>
        <el-form-item label="邀请码" label-width="120px">
          {{ this.cur_detail_list_edit.invitationCode }}
        </el-form-item>
        <el-form-item label="访问量" label-width="120px">
          {{ this.cur_detail_list_edit.visitedAmout }}
        </el-form-item>
        <el-form-item label="注册人数" label-width="120px">
          {{ this.cur_detail_list_edit.registeredCount }}
        </el-form-item>
        <el-form-item v-if="s_hierarchy" label="开户类型" label-width="120px">
          <el-select
            v-model="cur_detail_list_edit.customerType"
            placeholder="请选择"
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
        <el-form-item label="状态" label-width="120px">
          <el-select
            v-model="cur_detail_list_edit.link_valid_period"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in arr_PeriodValue"
              :key="index"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生成时间" label-width="120px">
          {{ this.cur_detail_list_edit.add_time }}
        </el-form-item>
        <el-form-item label="返点率" label-width="120px">
          <el-button type="success" size="mini" @click="one_set_edit()"
            >一键设置</el-button
          >
          <div
            class="bor-bottom"
            v-for="item in cur_typeSetting_list_edit"
            :key="item.index"
          >
            <span>{{ item.name }}</span>
            <span
              ><el-input
                v-model="item.kickback"
                @change="
                  changeInput_edit(
                    item.kickback,
                    item.minKickback,
                    item.maxKickback
                  )
                "
              ></el-input>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="二维码" label-width="120px">
          <img :src="qrcode_img_edit" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog_detailVisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="update_detail">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确认删除该信息！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="delete_list">确 定</el-button>
      </span>
    </el-dialog>

    <TableDetail title='注册人员详情' v-if="isShowDialog" :list='dialogList' @cloesDialog="isShowDialog = false" :page_count='page_count' :total_count='total_count' />
  </div>
</template>

<script>
import TableDetail from "@/views/games/components/table/Table_detail.vue";
export default {
  data() {
    return {
      dialogList: [],
      isShowDialog: false,
      s_hierarchy: false,
      canEditKickback: true, //是否可以编辑游戏返点
      info: {
        createLink: 1,
        customerType: 0,
        linkValidityPeriod: 0,
        invitationCode: "",
        kickBack: "",
      },
      local_createLink: [],
      info_list: {
        invitationCode: 0,
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
      local_hierarchy: null,
      typeSetting: "",
      cur_one: null,
      labelPosition: "tglj",
      info_m: {},
      info_list_m: {},
      currentPage: 1,
      page_size: 10,
      page_sizes: [10, 20, 30, 40, 50],
      page_count: 0,
      total_count: 0,

      // dialaog
      dialog_detailVisible: false,
      cur_detail_list: "",
      cur_typeSetting_list: [],
      detail_list: {},
      qrcode_cur_kickback: {},
      qrcode_img: "",

      // edit dialog
      dialog_detailVisible_edit: false,
      cur_detail_list_edit: {},
      cur_typeSetting_list_edit: [],
      detail_list_edit: {},
      qrcode_cur_kickback_edit: {},
      qrcode_img_edit: "",
      cur_one_edit: null,
      update_kickback: [],
      dialogVisible: false,
      cur_row: "",
      arr_PeriodValue: [],
    };
  },
  components: {
    TableDetail,
  },

  methods: {
    async toDetail(obj) {
      let { registeredCount, invitationCode } = obj;
      if (registeredCount) {
        console.log("-----sdf--", obj);
        let d = {
          inviteCode: invitationCode,
          page: 1,
          page_size: 1,
        };
        let res = await this.$get("Pc.Agent.getMemberListByInviteCode", d);
        console.log("-----sdf11--", res);
        let { list, page_count, total_count } = res.data;
        this.dialogList = list;
        this.page_count = page_count;
        this.total_count = total_count;
        this.isShowDialog = true;
      }
    },
    change_edit(e) {
      this.$set(this.cur_detail_list_edit, "link_valid_period", e);
    },
    changeGroup(e) {
      if (e == "tggl") {
        this.get_init_tggl(); //更新表格数据
      }
    },
    // 提交更新编辑
    update_detail() {
      this.init_edit_data();
      this.$post("Pc.MemberAdregister.editMemberAdregister", {
        id: this.cur_detail_list_edit.id,
        createLink: this.cur_detail_list_edit.createLink,
        customerType: this.cur_detail_list_edit.customerType,
        linkValidityPeriod: this.cur_detail_list_edit.link_valid_period,
        kickBack: this.update_kickback,
      }).then((res) => {
        if (res.code == 1) {
          this.$message.success("更新成功");
          this.dialog_detailVisible_edit = false;
          this.get_init_tggl();
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    open_dialogVisible(row) {
      this.cur_row = row;
      this.dialogVisible = true;
    },

    delete_list() {
      this.$get("Pc.MemberAdregister.deleteMemberAdregister", {
        id: this.cur_row.id,
      }).then((res) => {
        if (res.code == -1) {
          this.get_init_tggl();
          this.dialogVisible = false;
          //this.$message.success(res.message);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 初始化推广管理
    get_init_tggl() {
      this.$get("Pc.MemberAdregister.getMemberAdregisterList", {
        page: this.currentPage,
        page_size: this.page_size,
      }).then((res) => {
        if (res.code == 0) {
          this.info_list_m = res.data;
          this.page_count = res.data.page_count;
          this.total_count = res.data.total_count;
          // console.log(this.info_list_m);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 编辑弹窗
    showdialog_detail_edit(row) {
      let _detail_data_edit = row; //拿到当前数据
      this.cur_detail_list_edit = _detail_data_edit;
      this.dialog_detailVisible_edit = true;
      let cur_kickback_edit = JSON.parse(_detail_data_edit.kickback);
      this.qrcode_cur_kickback_edit = cur_kickback_edit;
      let cur_typeSetting_edit = this.typeSetting;
      //console.log(this.cur_detail_list_edit);
      cur_typeSetting_edit.forEach((item, index) => {
        //组装name进入数据
        if (item.fid == cur_kickback_edit[index].typeId) {
          cur_kickback_edit[index].name = item.name;
          cur_kickback_edit[index].maxKickback = item.maxKickback;
          cur_kickback_edit[index].minKickback = item.minKickback;
        }
      });
      this.cur_typeSetting_list_edit = cur_kickback_edit;
      //console.log(this.cur_typeSetting_list_edit);
      this.getQrcode_edit();
    },

    // 生成编辑二维码
    getQrcode_edit() {
      this.$get("Pc.MemberAdregister.getQrcode", {
        createLink: this.cur_detail_list_edit.createLink,
        invitationCode: this.cur_detail_list_edit.invitationCode,
        visitedAmout: this.cur_detail_list_edit.visitedAmout,
        LinkValidityPeriodValue:
          this.cur_detail_list_edit.LinkValidityPeriodValue,
        kickback: JSON.stringify(this.qrcode_cur_kickback_edit),
        registeredCount: this.cur_detail_list_edit.registeredCount,
      }).then((res) => {
        if (res.code == 0) {
          this.qrcode_img_edit = res.data;
          //console.log(res.data);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    one_set_edit() {
      let _typeSetting = this.cur_typeSetting_list_edit;
      _typeSetting.forEach((item) => {
        item.kickback = this.cur_one_edit;
      });
    },
    // 获取输入款值
    changeInput_edit(value, min, max) {
      if (value !== null) {
        if (Number(value) >= Number(min) && value <= Number(max)) {
          this.cur_one_edit = value; //存下当前最近修改的值
        } else {
          this.$message.error("返点值填写不正确");
        }
      }
    },

    // 打开详情弹窗
    showdialog_detail(row) {
      let _detail_data = row; //拿到当前数据
      this.cur_detail_list = _detail_data;
      this.dialog_detailVisible = true;

      let cur_kickback = JSON.parse(_detail_data.kickback);
      this.qrcode_cur_kickback = cur_kickback;
      let cur_typeSetting = this.typeSetting;
      cur_typeSetting.forEach((item, index) => {
        //组装name进入数据
        // if (item.fid == cur_kickback[index].typeId) {
        //   cur_kickback[index].name = item.name;
        // }
        let obj = cur_kickback.find(o=>o.typeId == item.fid)

        if(obj){
          obj['name']=item.name
        } else {
          console.log(item);
        }

      });
      
      this.cur_typeSetting_list = cur_kickback;
     
      this.getQrcode();
    },

    // 组装数据
    init_edit_data() {
      let _update_kickback = this.cur_typeSetting_list_edit;

      _update_kickback.forEach((item) => {
        item.FKickback = Number(item.Kickback);
        delete item.minKickback;
        delete item.maxKickback;
        delete item.name;
      });
      this.update_kickback = JSON.stringify(_update_kickback);
      //console.log(this.update_kickback);
    },
    // 生成二维码
    getQrcode() {
      this.$get("Pc.MemberAdregister.getQrcode", {
        createLink: this.cur_detail_list.createLink,
        invitationCode: this.cur_detail_list.invitationCode,
        visitedAmout: this.cur_detail_list.visitedAmout,
        LinkValidityPeriodValue: this.cur_detail_list.LinkValidityPeriodValue,
        kickback: JSON.stringify(this.qrcode_cur_kickback),
        registeredCount: this.cur_detail_list.registeredCount,
      }).then((res) => {
        if (res.code == 0) {
          this.qrcode_img = res.data;
          //console.log(res.data);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.page_size = val;
      this.get_init_tggl();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.get_init_tggl();
    },
    // local_PeriodValue
    init_local_PeriodValue() {},

    // 推广链接
    // 初始化推广链接页面
    get_init_tglj() {
      this.$get("Pc.MemberAdregister.getPageData").then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.info_list = res.data;
          this.s_hierarchy = res.data.agencyBelowDisabledUserTypeUpdate;
          let local_PeriodValue = res.data.linkValidityPeriod;
          let local_createLink = res.data.generalizeDomain;
          console.log("--s_hierarchy--", this.s_hierarchy);
          //   组装数据
          this.arr_PeriodValue = Object.values(local_PeriodValue);
          this.local_createLink = Object.values(local_createLink);

          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },


    //  一键设置
    one_set() {
      let _typeSetting = this.typeSetting;
      _typeSetting.forEach((item) => {
        if (item.play_type == 0) {
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
    // 验证是否可用
    check_used() {
      //console.log()
      this.$get("Pc.MemberAdregister.checkInviteCode", {
        inviteCode: this.info.invitationCode,
      }).then((res) => {
        if (res.code == -1) {
          this.$message.error(res.message);
          return;
        }
        return;
      });
    },
    // 生成链接
    submit_info() {
      //提取数据
      let lockl_userKickbacks = JSON.parse(JSON.stringify(this.typeSetting));
      for (var i = 0; i < lockl_userKickbacks.length; i++) {
        if (lockl_userKickbacks[i].kickback !== null) {
          delete lockl_userKickbacks[i].add_date;
          delete lockl_userKickbacks[i].edit_date;
          delete lockl_userKickbacks[i].maxKickback;
          delete lockl_userKickbacks[i].minKickback;
          delete lockl_userKickbacks[i].name;
        } else {
          lockl_userKickbacks[i].kickback = 0; //默认等于0
        }
      }
      let _userKickbacks = JSON.stringify(lockl_userKickbacks).replace(
        /fid/g,
        "typeId"
      );
      this.info.kickBack = _userKickbacks;
      this.add_member();
      //  console.log(this.info.kickBack)
    },

    add_member() {
      // console.log(this.info);
      // return
      this.$post("Pc.MemberAdregister.addMemberAdregister", this.info).then(
        (res) => {
          if (res.code == 1) {
            setTimeout(this.$router.go(0), 2000);
            this.$message.success("添加成功");
            return;
          } else {
            this.$message.error(res.message);
          }
        }
      );
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
          this.typeSetting = local_typeSetting;
          //console.log(this.typeSetting);
          return;
        } else {
          this.$message.error(res.message);
        }
      });
    },

    // 获取代理
    loadHierarchy() {
      var hierarchy = JSON.parse(localStorage.getItem("hierarchy"));
      if (hierarchy) {
        this.local_hierarchy = hierarchy.data;
      }
    },
  },

  mounted() {
    // this.type_visable();
  },

  created() {
    this.get_init_tglj(); //初始化页面信息
    this.get_gametypeSetting();
    this.loadHierarchy(); //加载Hierarchy
    this.get_init_tggl();
  },
};
</script>




<style lang="scss">
.pointer:hover {
  background-color: #f1f1f1;
}
.btn-btn {
  margin-left: 230px;
}
.type-setting-list1 {
  display: flex;

  .play-item1 {
    .el-form-item__content {
      width: 400px !important;
      margin-left: 100px !important;
      display: flex;
    }
  }
  .play-item {
    display: flex;
    .el-form-item__label {
      width: 100px !important;
    }
    .el-form-item__content {
      width: 400px !important;
      margin-left: 10px !important;
      display: flex;
    }
  }
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
.pd2 {
  padding: 0 2px;
}
.page-box {
  margin: 20px auto;
}
.dialog-form {
  border: 1px solid #eee;
  .el-form-item {
    border-bottom: 1px solid #eee;
    margin-bottom: 0;
    line-height: 24px;
    .el-form-item__label {
      padding: 10px;
    }
    .el-form-item__content {
      border-left: 1px solid #eee;
      padding: 10px 0 0 10px;
    }
    .bor-bottom {
      border-bottom: 1px solid #eee;
      span {
        display: inline-block;
        width: 200px;
      }
      .el-input__inner {
        height: 24px;
        line-height: 24px;
      }
    }
    .bor-bottom:last-of-type {
      border: 0 none;
    }
    img {
      margin: 10px auto;
    }
  }
}
</style>