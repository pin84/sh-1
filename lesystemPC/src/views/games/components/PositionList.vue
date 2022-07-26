<template>
  <div class="p-wrapper">
    <div>选择位置：</div>
    <div class="checkbox" v-for="(item, index) in listArr" :key="index">
      <i @click="toggleCheck(item)" class="iconfont icon-duoxuanyidong" v-if="item.isChecked"></i>
      <i @click="toggleCheck(item)" class="iconfont icon-duoxuan" v-else></i>
      <span class="name">{{ item.name }}</span>
    </div>

    <div style="padding: 0 10px;">
      <span class="span-xs">
        (温馨提示：你选择了
        <span class="red">{{ len }}</span> 个位置,系统会自动根据位置组合成
        <span class="red">{{ c }}</span> 个方案)
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    limitLen: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      listArr: [
        { name: "万", isChecked: true },
        { name: "千", isChecked: true },
        { name: "百", isChecked: true },
        { name: "十", isChecked: true },
        { name: "个", isChecked: true },
      ],
      len: 0,
      c: 0,
    };
  },
  created() {
    this.toggleCheck();
  },
  methods: {
    toggleCheck(item) {
      if (item) {
        item.isChecked ? (item.isChecked = false) : (item.isChecked = true);
      }
      let temArr = [];
      this.listArr.forEach((obj) => {
        if (obj.isChecked) {
          temArr.push(obj.name);
        }
      });

			let arr = this.$BDH.getCombine(temArr,this.limitLen)
			this.len = temArr.length
      this.c = arr.length
      
      

    
      this.$emit("toggleCheck", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.p-wrapper {
  display: flex;
  width: 100%;
  .checkbox {
    display: flex;
    align-items: flex-end;
    margin-right: 10px;
    .iconfont {
      font-size: 20px;
      font-weight: 600;
    }
    .icon-duoxuanyidong {
      color: #b62929;
    }
    .name {
      margin-left: 5px;
    }
  }
    .red {
      color: #b62929;
    }
}
</style>
