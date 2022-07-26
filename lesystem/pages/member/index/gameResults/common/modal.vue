<template>
  <view class="cu-modal" :class="showModal ? 'show' : ''">
    <view class="cu-dialog">
      <view class="cu-bar bg-white justify-start">
        <view class="content">走势图设置</view>
      </view>
      <view>
        <view
          class="flex solid-bottom justify-center"
          v-for="(item, index) in radiosZX"
          :key="index"
        >
          <view class="flex-sub padding-sm margin-xs text-right"
            >{{ item.name }}:
          </view>
          <view class="flex-twice padding-sm margin-xs">
            <radio-group
              :data-action="item.name"
              class="block"
              @change="RadioChange"
            >
              <view class="text-left flex">
                <view class="">
                  <label class="flex justify-between align-center">
                    <view class="flex-sub">显示</view>
                    <radio
                      class="margin-left-xs"
                      :class="radio == '1' ? 'checked' : ''"
                      :checked="item.ischecked"
                      value="1"
                    ></radio>
                  </label>
                </view>
                <view class="">
                  <label class="flex justify-between align-center">
                    <view class="flex-sub">隐藏</view>
                    <radio
                      class="margin-left-xs"
                      :class="radio == '2' ? 'checked' : ''"
                      :checked="!item.ischecked"
                      value="2"
                    ></radio>
                  </label>
                </view>
              </view>
            </radio-group>
          </view>
        </view>
      </view>
      <view class="cu-bar bg-white justify-center">
        <view class="action">
          <button class="cu-btn line-red text-red" @tap="hideModal">
            取消
          </button>
          <button class="cu-btn bg-red margin-left" @tap="getvlues">
            确定
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      zxState: "1", //1=显示，2=隐藏
      ylState: "1",
      tjState: "1",
      missLevelState: "1",
      radiosZX: [
        {
          id: "zhexian",
          name: "折线",
          ischecked: true,
        },
        {
          id: "yilou",
          name: "遗漏",
          ischecked: true,
        },
        {
          id: "tongji",
          name: "统计",
          ischecked: true,
        },
        {
          id: "misslevel",
          name: "遗漏分层",
          ischecked: true,
        },
      ],
    };
  },
  props: ["showModal"],

  created(){
    //   console.log('aa');
    // this.zxState = '2'
    // let arr = [2,2,2,2]
    // arr.forEach((n,index) =>{
    //   this.radiosZX[index].ischecked = n
    // })
  },
  methods: {
    hideModal() {
      this.$emit("hideModal");
    },
    RadioChange(e) {
      var action = e.currentTarget.dataset.action;
      console.log(e.detail.value);
      if (action == "折线") {
        this.zxState = e.detail.value;
      } else if (action == "遗漏") {
        this.ylState = e.detail.value;
      } else if (action == "统计") {
        this.tjState = e.detail.value;
      } else if (action == "遗漏分层") {
        this.missLevelState = e.detail.value;
      }
    },
    getvlues() {
      this.hideModal();
      let obj = {
        zx: this.zxState,
        yl: this.ylState,
        tj: this.tjState,
        ylfc: this.missLevelState,
      };
      this.$emit("settingChangeNotice", obj);
    },
  },
};
</script>

<style lang="scss">
uni-radio::before,
uni-checkbox::before {
  content: "●";
  font-family: "iconfont";
  line-height: 16px;
}

uni-button {
  margin: 0 20px;
}
</style>
