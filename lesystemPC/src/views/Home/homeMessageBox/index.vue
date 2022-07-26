<template>
  <MyMask @hiddenMask="isShowMask = false" v-if="isShowMask">
    <div class="hmb">
      <div class="content">
        <div>通知</div>
        <hr />
        <div class="tip-list">
          <div class="item">
            <div class="title-box">
              <span class="title">{{ curTips.title }}</span>
              <span>{{ curTips.create_time }}</span>
            </div>
            <div class="tip-con">
              {{ curTips.content }}
            </div>
          </div>
        </div>
      </div>

      <div class="btn-box">
        <el-checkbox v-model="checked">今日不要再提示</el-checkbox>
        <el-button plain @click="toNext" v-if="list.length > 1">下一则</el-button>
        <el-button plain @click="closeTips">关闭</el-button>
      </div>
    </div>
  </MyMask>
</template>

<script>
import MyMask from "@/views/games/components/mask/index.vue";
export default {
  data() {
    return {
      isShowMask: true,
      checked: false,
      list: [],
      curTips: {},
      curTipIndex: 0
    };
  },
  components: {
    MyMask,
  },

  created() {
    this.initPage();
  },

  methods: {
    async initPage() {
      let homeMessageBoxExpiration = new Date(
        localStorage.getItem("homeMessageBoxExpiration")
      ).toLocaleDateString();
      let d = new Date().toLocaleDateString();
      if (homeMessageBoxExpiration == d) {
        this.isShowMask = false;
      } else {
        this.isShowMask = true;
        let res = await this.$get(this.$gapi.getNoticeList, {
          page: 1,
          page_size: 20,
        });

        let { items, page_count, total_count } = res.data
        this.list = items
        this.curTips = items[this.curTipIndex]
        console.log(items);
      }
    },

    async toNext() {
      // let res = await this.$get(this.$gapi.getNoticeInfo, { id: 1 });
      let index = this.curTipIndex += 1
      let obj = this.list[index]
      if (!obj) return
      this.curTips = obj
    },
    closeTips() {
      if (this.checked) {
        localStorage.setItem("homeMessageBoxExpiration", new Date());
      }
      this.isShowMask = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.hmb {
  background-color: #fff;
  width: 650px;
  height: 450px;
  padding: 10px;
  border-radius: 5px;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    .tip-list {
      .item {
        .title-box {
          // border: 1px solid ;
          display: flex;
          justify-content: space-between;

          .title {
            font-weight: 600;
          }
        }
        .tip-con{
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
  }
}
</style>