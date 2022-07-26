<template>
  <MyMask>
    <div class="c-w">
      <WHeader leftText="操作提示" v-on="$listeners" />
      <div class="content">
        <div>{{numberOfPeriod}}期已截止</div>
        <div><span class="red">{{Number(numberOfPeriod)+1}}</span>期即将开售</div>
        <div>投注时请注意期号</div>
        <el-button @click="$emit('close')" class="btn" type="danger"
          >确定</el-button
        >
      </div>
    </div>
  </MyMask>
</template>

<script>
import MyMask from "@/views/games/components/mask/index.vue";
import WHeader from "@/views/games/components/widget/WHeader.vue";
export default {
  data(){
    return {
      numberOfPeriod:0,
    }
  },
  components: {
    MyMask,
    WHeader,
  },

  created() {
    this.initData();
  },
  methods: {
    initData() {
     let {numberOfPeriod} =  this.$store.state.gd.latestPriodData;
     this.numberOfPeriod = numberOfPeriod
    },
  },
};
</script>
<style lang="scss" scoped>
.c-w {
  width: 200px;
  height: 200px;
  background-color: #fff;
  border-radius: 5px;
  border: 3px solid rgba(0, 0, 0, 0.2);
  overflow: hidden;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    font-size: 12px;
    .red {
      color: red;
    }
    .btn {
      margin-top: 30px;
    }
  }
}
</style>
