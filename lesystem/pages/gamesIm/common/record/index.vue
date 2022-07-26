<template>
  <view class="basket-list">
    <Record
      :isLosdmore="isLosdmore"
      :isShowLoadMore="isShowLoadMore"
      :isShowNoDataIcon="isShowNoDataIcon"
      :recordList="recordList"
      v-if="gameType == 1"
    />
    <RecordCredit
      :isLosdmore="isLosdmore"
      :isShowLoadMore="isShowLoadMore"
      :isShowNoDataIcon="isShowNoDataIcon"
      :recordList="recordList"
      v-if="gameType == 0"
    />
  </view>
</template>

<script>
import Record from "./Record";
import RecordCredit from "./RecordCredit";
export default {
  props: {
    isLimitLine: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      gameType: 0,
      num: 10,
      isShowNoDataIcon: true,
      isShowLoadMore: true,
      isLosdmore: true,
      recordList: [],
      setIntervalId: 0,
      curId: 0,
    };
  },

  components: {
    Record,
    RecordCredit,
  },

  watch: {
    "$store.state.GDV3.v3IndexGame": {
      handler: function (val) {
        this.initData();
      },
      deep: true,
    },

    "$store.state.GDV3.updateRecord": function (val) {
      this.initData();
    },
    "$store.state.GDV3.loadmore": function (val) {
      this.num += this.num;
      console.log("---num-", this.num);
      this.getData();
    },
  },

  created() {
    this.initData();
  },

  mounted() {
    this.loopRequest();
  },
  methods: {
    async initData() {
      let { curGameId, gameType } = this.$store.state.GDV3.v3IndexGameAllData;
      gameType = 0
      this.gameType = gameType;
      this.curId = curGameId;
      await this.getData();
    },

    loopRequest() {
      this.setIntervalId = setInterval(() => {
        this.getData();
      }, 12000);
    },

    async getData() {
      let obj = {
        url: this.$api.getHistoryOrdersForMobile,
        isShowLoading: false,
        data: {
          gameId: this.curId,
          num: this.num,
        },
      };

      let res = await this.$http(obj);

      if (!res.data) return;
      let { data } = res;
      let arr = [];

      if (this.isLimitLine) {
        arr = data.slice(0, 3);
        this.isShowNoDataIcon = false;
        this.isShowLoadMore = false;
      } else {
        arr = data;
        if (arr.length == 0) {
          this.isShowNoDataIcon = true;
          this.isLosdmore = false;
        } else {
          this.isShowNoDataIcon = false;
          if (arr.length < this.num) {
            this.isLosdmore = false;
          } else {
            this.isLosdmore = true;
          }
        }
      }
      this.recordList = arr;

      console.log(arr)
    },
  },

  beforeDestroy() {
    clearInterval(this.setIntervalId);
  },
};
</script>

<style lang="scss" scoped></style>
