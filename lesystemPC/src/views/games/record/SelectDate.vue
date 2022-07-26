<template>
  <el-date-picker
    class="date-picker"
    v-model="value2"
    type="daterange"
    align="right"
    unlink-panels
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    @change="changeDate"
  >
  </el-date-picker>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        rangeSeparator:'-',
        shortcuts: [
          {
            text: this.$t('common.Today'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime()  );
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t('common.Yesterday'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t('common.Lastweek'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      // value1: "",
      value2: "",
    };
  },

  created(){
    this.initPage()
  },
  methods:{
    changeDate(d){
    },
    initPage(){
      let d = new Date()
      let arr = [d,d]
      this.value2 = arr
    }
  }
};
</script>

<style lang="scss" scoped>
.date-picker {
  width: 220px;
  border-radius: 30px;
  // border:1px solid #7269e6;
}
</style>