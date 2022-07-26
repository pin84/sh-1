<template>
  <div class="switch-audio">
    <div class="list">
      <div class="item pointer" v-for="(item, idx) in typeList" :key="idx">
        <span class="text" @click="switchVoice(item, idx, 1)">{{
          item.type
        }}</span>
        <el-switch
          v-model="item.active"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :width="35"
          @change="switchVoice(item, idx)"
        >
        </el-switch>
      </div>
    </div>

    <div class="btn-box">
      <el-button @click="submit" class="btn" type="danger">确定</el-button>
      <el-button @click="cancel" class="btn" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: ["全部音效", "按键音", "播报音", "背景音乐"],
      typeList: [],

      audio: null,
    };
  },

  mounted() {
    this.initData();
    // let audio = document.getElementById("myAudio");
  },
  methods: {
    submit() {
      localStorage.setItem("soundSetting", JSON.stringify(this.typeList));
      if (this.typeList[1].active) {
        this.$store.commit("click", true);
      } else {
        this.$store.commit("click", false);
      }

      if (this.typeList[2].active) {
        this.$store.commit("tips", true);
      } else {
        this.$store.commit("tips", false);
      }
      if (this.typeList[3].active) {
        this.$store.commit("bgm", true);
      } else {
        this.$store.commit("bgm", false);
      }
      let i = 0;
      for (let obj of this.typeList) {
        if (obj.type == "全部音效") continue;
        if (obj.active) {
          i++;
        }
      }

      if (i != 0) {
        this.$emit("openSound", true);
      } else {
        this.$emit("openSound", false);
      }

      this.startPlay();
      this.cancel();
    },

    startPlay() {
      if (this.typeList[3].active) {
        this.$myAudio.playBgm();
      } else {
        this.$myAudio.pause();
      }
    },

    cancel() {
      this.$emit("close");
    },

    switchVoice(item, index, fromType = 0) {
      if (fromType == 1) {
        item.active = !item.active;
      }

      if (index == 0) {
        if (item.active) {
          this.changeList(true);
        } else {
          this.changeList(false);
        }
      } else {
        let i = 0;
        for (let obj of this.typeList) {
          if (obj.type == "全部音效") continue;
          if (obj.active) {
            i++;
          }
        }
        if (i == 3) {
          this.typeList[0].active = true;
        } else {
          this.typeList[0].active = false;
        }

        if (i != 0) {
          this.$emit("openSound", true);
        } else {
          this.$emit("openSound", false);
        }
      }
    },

    changeList(status) {
      this.typeList.forEach((obj) => {
        obj.active = status;
      });
    },
    initData() {
      let list;
      list = JSON.parse(localStorage.getItem("soundSetting"));
      if (list == null) {
        let tem = [];
        this.type.forEach((type) => {
          tem.push({
            type,
            active: false,
          });
        });

        list = tem;

        localStorage.setItem("soundSetting", JSON.stringify(list));
      }
      this.typeList = list;

      this.submit();
      // this.startPlay()
    },
  },
};
</script>
<style lang="scss" scoped>
.switch-audio {
  width: 150px;
  background-color: #fff;
  font-size: 12px;
  padding: 30px 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 4px gray;
  user-select: none;
  .item {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    .text {
      width: 100%;
    }
  }
  .btn-box {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .btn {
      padding: 7px 15px;
    }
  }
}
</style>