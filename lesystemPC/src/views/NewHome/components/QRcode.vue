<template>
  <div class="home-mobile width_center_1190">
    <div class="title">
      <img
        src="../assets/indexappbg.png"
      />
    </div>
    <div class="qrCodeHome">
    
        <div
          class="qr-left"
          v-for="(item, index) in tabList"
          :key="index"
          v-show="activeIndex == index"
        >
          <transition name="slide-fade">
          <div class="imgbox">
            <img :src="item.img" />
          </div>
          </transition>
        </div>
      <div class="qr-right">
        <div class="tabs-box">
          <a
            v-for="(item, index) in tabList"
            :key="index"
            class="default-btn"
            :class="activeIndex == index ? 'active' : ''"
            @click="activeIndex = index"
            >{{ item.name }}</a
          >
        </div>
        <div
          class="info"
          v-show="activeIndex == index"
          v-for="(item, index) in tabList"
          :key="index"
        >
          <h3>{{ item.name }}</h3>
          <p>{{ item.text }}</p>
          <div class="qrimg">
            <div class="qrimg-box"><img :src="item.qrimg" /></div>
          </div>
          <div class="qrtips">
            <h4 v-if="item.name == '全站App'">扫码下载</h4>
            <h4 v-if="item.name == 'H5App'">扫码进入</h4>
            <p>{{ item.tips }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabList: [
          {
            name: "全站App",
            text: "全球首家一体化娱乐原生APP，尽显流畅，完美操作。海量体育，电竞顶尖赛事，真人娱乐，彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！",
            qrimg: require("../assets/appqrcode.png"),
            tips: "支持iOS&Android",
            img: require("../assets/common-download.png"),
          },
          {
            name: "H5App",
            text: "全球首家一体化娱乐H5APP，尽显流畅，完美操作。海量体育，电竞顶尖赛事，真人娱乐，彩票投注及电子游艺等，最新最全娱乐项目尽在掌中体验扫码下载，即刻拥有！",
            qrimg: require("../assets/zhqrcode.png"),
            tips: "支持H5",
            img: require("../assets/common-download.png"),
          },
        ],
        activeIndex: "0",
      };
    },
  };
</script>

<style lang="scss" scoped>
  .home-mobile {
    .title {
      width: 100%;
      height: 110px;
      margin: 40px 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .qrCodeHome {
      display: flex;
      justify-content: space-between;
      position: relative;
      margin-top: 30px;
      .qr-left {
        width: calc(100% - 456px);
        img {
          width: 100%;
        }
        transform: translateX(0);
      }
      .qr-right {
        width: 456px;
        min-width: 456px;
        height: 500px;
        box-shadow: 0 20px 30px -10px #cdd2dd;
        position: relative;
        border-radius: 24px;
        background-image: url("../assets/common-card-background-download-2@2x-be397c398226719eed3f43e75dcb9e9e.png");
        background-size: cover;
        .tabs-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 15px;
          margin-top: 20px;
        }
        .default-btn {
          display: block;
          width: 120px;
          height: 40px;
          margin: 0 15px;
          color: #595859;
          line-height: 40px;
          text-align: center;
          border-radius: 30px;
          box-shadow: 0 4px 8px 0 rgba(194, 211, 222, 0.5);
          cursor: pointer;
          background: url(data:image/png;base64,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)
            no-repeat;
          background-size: 100% 100%;
          position: relative;
          &.active {
            color: #fff;
            background: url("../assets/indexappdownloadbg.png")
              no-repeat 0 0 / cover;
            box-shadow: 0 2px 4px 0 rgba(247, 195, 138, 0.7);
          }
        }
        .info {
          padding: 5px 40px;
          h3 {
            height: 30px;
            line-height: 30px;
            margin-bottom: 0;
            font-size: 25px;
            color: #595859;
            font-weight: 700;
          }
          p {
            line-height: 1.56;
            margin-top: 12px;
            font-size: 15px;
            color: #595859;
            text-align: left;
            min-height: 112px;
          }
          .qrimg {
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 168px;
            height: 168px;
            border-radius: 12px;
            border: 2px solid #fff;
            background-image: -webkit-linear-gradient(top, #f7fafc 1%, #ebf0f5);
            background-image: linear-gradient(180deg, #f7fafc 1%, #ebf0f5);
            .qrimg-box {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 128px;
              height: 130px;
              background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEEAQMAAAD9LXgzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABlBMVEVHcExGS2Syb0asAAAAAnRSTlMAMr5EnLgAAABLSURBVHja7drBCQAhEATBhQvc1C4yVwMQfQmKVe+OYJgo2f0x8GVXI+dB3hHUmCoCgUCwMQAAAAAAgAMcsZkLBIJngyuuBctgdbFoI+n9S7GsruwAAAAASUVORK5CYII=)
                no-repeat;
              background-size: cover;
            }
            img {
              display: block;
              width: 106px;
              height: 106px;
            }
          }
          .qrtips {
            text-align: center;
            width: 170px;
            h4 {
              margin-top: 10px;
              font-size: 15px;
              font-weight: 700;
              line-height: 25px;
              color: #595859;
            }
            p {
              margin-top: 1px;
              font-size: 13px;
              line-height: 22px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(300px);
  }
</style>