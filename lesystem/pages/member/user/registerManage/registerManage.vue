<template>
  <view class="register-wrapper">
    <scroll-view scroll-x class="bg-white nav text-center" style="background-color: #efeded;
    padding: 20rpx 0;
    border-bottom: 1px solid #a09b9b;
    margin-bottom: 20rpx;">
      <view
        class="cu-item"
        :class="0 == TabCur ? 'text-white cur' : ''"
        @tap="tabSelect"
        data-id="0"
      >
        <text class="cuIcon-camerafill"></text>
        手动开户
      </view>
      <view
        class="cu-item"
        :class="1 == TabCur ? 'text-white cur' : ''"
        @tap="tabSelect"
        data-id="1"
      >
        <text class="cuIcon-upstagefill"></text>
        邀请码
      </view>
    </scroll-view>

    <accountOpen v-if="TabCur == '0'" />
    <invitationCode v-if="TabCur == '1'" />
  </view>
</template>

<script>
import accountOpen from "./accountOpen.vue";
import invitationCode from "./invitationCode.vue";
export default {
  data() {
    return {
      TabCur: "0",
      scrollLeft: 10,
    };
  },

  components: {
    accountOpen,
    invitationCode,
  },
  onLoad(data) {
    let tabCur = data.action;
    if (tabCur) {
      this.TabCur = tabCur;
    }
  },
  created() {
     let routes = getCurrentPages()
      let { tabCur } = routes[routes.length - 1].options
    if (tabCur) {
      this.TabCur = tabCur;
    }
  },

  methods: {
    tabSelect(e) {
      this.TabCur = e.currentTarget.dataset.id;
      // this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
    },
  },
};
</script>

<style lang="scss" scoped>
.register-wrapper {
  height: 100vh;
}
.cu-item {
  background-color: #f1f1f1;
  color: rgb(22, 107, 216);
  margin: 0;
  border-radius: 10rpx;
  height: 60rpx;
  line-height: 60rpx;
}
.cur {
  background-color: rgb(22, 107, 216);
  color: #fff;
}
</style>
