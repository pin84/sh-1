<template>
  <view class="team-account">
    <ScreenBar ref="screenBar" />
    <TabBar :tabs="tabList" @chanageTabItem="chanageTabItem" />

    <block v-if="tabCur == 'CPYX'">
      <scroll-view class="bg-white nav" scroll-x>
        <view class="flex text-center">
          <view
            class="cu-item flex-sub"
            :class="lotteryTabClassSet(index)"
            v-for="(item, index) in lotteryTabList"
            :key="index"
            @tap="lotteryTabCur = index"
          >
            <text class="text-lg">{{ item }}</text>
            <view v-if="index == 0" class="text-gray text-sm sub-style">
              (不包括六合)
            </view>
          </view>
        </view>
      </scroll-view>
      <scroll-view scroll-y class="lottery-list-box bg-white">
        <view class="cu-list menu">
          <block v-for="(item, index) in lotteryGameDataComp" :key="index">
            <view class="cu-item" @tap="showGameInfoList(item.sourceIndex)">
              <view class="action">
                <text
                  @tap.stop="GameCategoryTap(item.sourceIndex)"
                  class="iconfont iconsize margin-right-xs"
                  :class="
                    item.selectAll[lotteryTabCur]
                      ? 'text-green icon-zhengque'
                      : 'text-gray icon-circle'
                  "
                ></text>
                <text class="text-lg">{{ item.categoryName }}</text>
              </view>
              <view class="action">
                <text
                  class="iconfont iconsize text-gray icon-xiangyou"
                  :class="
                    lotteryGameList[item.sourceIndex].isShowInfo
                      ? 'arrow-bottom'
                      : ''
                  "
                ></text>
              </view>
            </view>
            <view
              class="grid col-3 text-center bg-white border-bottom grid-style"
              v-show="lotteryGameList[item.sourceIndex].isShowInfo"
            >
              <view
                class=""
                v-for="(game, gIndex) in item.gameInfoList"
                :key="gIndex"
                @tap="changeGameSelect(game.gameId, item.sourceIndex)"
              >
                <view class="bg-gray position-relative margin-xs radius">
                  <view class="flex justify-center">
                    <view class="text-cut">
                      {{ game.gameName }}
                    </view>

                    <view class="">
                      <text v-if="game.groupId == 1"> [官] </text>
                      <text v-else-if="game.groupId == 0"> [信] </text>
                    </view>
                  </view>
                  <view
                    class="cu-tag badge round"
                    v-if="lotteryGameSelected[game.gameId]"
                  >
                    <text
                      class="
                        iconfont
                        iconsize
                        icon-zhengque
                        text-green
                        margin-right-xs
                      "
                    ></text>
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
      </scroll-view>

      <view class="flex flex-direction justify-center bottom-bar">
        <button class="cu-btn text-white bg-red lg shadow-blur" @tap="submit">
          查询
        </button>
      </view>
    </block>
  </view>
</template>

<script>
import http from "common/js/http.js";
import ScreenBar from "./ScreenBar";
import TabBar from "./TabBar";
export default {
  created() {
    //初始化数据
    this.init();
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      accountName: "",
      tabCur: "CPYX", //游戏分类tab
      tabList: [],
      tabChannelCodes: ["CPYX", "ZRSX"], //游戏分类码记录，注意顺序一致
      lotteryTabCur: 0, //彩票游戏tab记录
      lotteryTabList: ["全部", "官方", "信用", "六合"],
      lotteryGameList: [],
      lotteryGameSelected: {}, //选中的游戏项目
      ZrsxList: [],
    };
  },
  components: {
    ScreenBar,
    TabBar,
  },
  computed: {
    lotteryGameDataComp() {
      //根据tab不同使用不同的数据
      let tabCur = this.lotteryTabCur;
      let copyData = [...this.lotteryGameList]; //复制数组
      let resultArr = [];
      for (let i = 0; i < copyData.length; i++) {
        let item = copyData[i];
        let copyItem = Object.assign({}, item);
        copyItem.sourceIndex = i; //记录在原数组中的位置，方便修改原数组的状态
        let gameInfoList = item.gameInfoList;
        let key = item.key;
        switch (tabCur) {
          case 0: //全部
            if (key != "LHC") {
              //六合剔除
              resultArr.push(copyItem);
            }
            break;
          case 1: //官方
            let guanArr = [];
            for (let g = 0; g < gameInfoList.length; g++) {
              let gameItem = gameInfoList[g];
              let copyGameItem = Object.assign({}, gameItem);
              let groupId = gameItem.groupId;
              if (groupId == 1) {
                //非官方剔除
                guanArr.push(copyGameItem);
              }
            }
            if (guanArr.length > 0) {
              copyItem.gameInfoList = guanArr;
              resultArr.push(copyItem);
            }
            break;
          case 2: //信用
            let xinArr = [];
            for (let g = 0; g < gameInfoList.length; g++) {
              let gameItem = gameInfoList[g];
              let copyGameItem = Object.assign({}, gameItem);
              let groupId = gameItem.groupId;
              if (groupId == 0) {
                //非信用剔除
                xinArr.push(copyGameItem);
              }
            }
            if (xinArr.length > 0) {
              copyItem.gameInfoList = xinArr;
              resultArr.push(copyItem);
            }
            break;
          case 3: //六合
            if (key == "LHC") {
              resultArr.push(copyItem);
            }
            break;
        }
      }
      return resultArr;
    },
  },
  methods: {
    init() {
      //请求游戏数据
      this.requestData("System.HomePage.getAllGameCategory", {}, (res) => {
        this.tabList = res.data;
        console.log(this.tabList);
        
      });

      //请求彩票游戏数据
      this.requestData("System.HomePage.getCpGameList", {}, (res) => {
        if (res.data) {
          console.log(res.data);
          let gameList = this.gameListSort(res.data);
          this.lotteryGameList = gameList;
          this.selectAllDefault();
        }
      });
    },
    // /pages/member/index/teamAccount/TeamAccount
    chanageTabItem(v, ide) {
      this.tabCur = v.code;
      // let postData = this.setZrsxPostData();
      if (this.tabCur == "ZRSX") {
        uni.navigateTo({
          url: "/pages/member/index/ZrsxTeamAccountDetail/TeamAccountDetail",
        });
      } else if (this.tabCur == "DZYX") {
        uni.navigateTo({
          url: "/pages/member/index/DzyxTeamAccountDetail/TeamAccountDetail",
        });
      } else if (this.tabCur == "TYJJ") {
        uni.navigateTo({
          url: "/pages/member/index/TyssTeamAccountDetail/TeamAccountDetail",
        });
      } else if (this.tabCur == "QPYX") {
        uni.navigateTo({
          url: "/pages/member/index/QpyxTeamAccountDetail/TeamAccountDetail",
        });
      } else if (this.tabCur == "BYYX") {
        uni.navigateTo({
          url: "/pages/member/index/ByyxTeamAccountDetail/TeamAccountDetail",
        });
      } else if (this.tabCur == "FBD") {
        uni.navigateTo({
          url: "/pages/member/index/FbdTeamAccountDetail/TeamAccountDetail",
        });
      } else if (this.tabCur == "JJYX") {
        uni.navigateTo({
          url: "/pages/member/index/JjyxTeamAccountDetail/TeamAccountDetail",
        });
      } else if(this.tabCur == "YYZB"){
        location.reload()
      }
    },
    lotteryTabClassSet(index) {
      //计算class的值
      let classArr = [];
      let curClass;
      curClass = index == this.lotteryTabCur ? "text-red cur" : "";
      let subClass = index == 0 ? "has-sub-style" : "";
      if (curClass != "") {
        classArr.push(curClass);
      }
      if (subClass != "") {
        classArr.push(subClass);
      }
      return classArr.join(" ");
    },
    gameListSort(data) {
      //对列表数据进行筛选过滤
      let channelCodeCur = this.tabChannelCodes[this.lotteryTabCur]; //游戏种类过滤
      let resultArr = [];
      let keyObject = {}; //临时记录key
      let _data = Object.values(data);
      for (let i = 0; i < _data.length; i++) {
        let categoryList = _data[i].gameCateList;
        for (let g = 0; g < categoryList.length; g++) {
          let categoryItem = categoryList[g];
          let channelCode = categoryItem.channelCode;
          if (channelCode != channelCodeCur) {
            //游戏种类不匹配，直接跳到下一次循环
            continue;
          }
          let categoryCode = categoryItem.categoryCode;
          let categoryName = categoryItem.categoryName;
          let gameInfoList = categoryItem.gameInfoList;

          let key = categoryCode.split("_")[1];
          if (!keyObject[key]) {
            //初始化
            keyObject[key] = {};
            let index = resultArr.length;
            keyObject[key]["index"] = index; //记录存在数组的位置
            resultArr[index] = {};
            resultArr[index].key = key;
            resultArr[index].selectAll = {
              //是否全选,默认全选
              0: true,
              1: true,
              2: true,
              3: true,
            };
            resultArr[index].categoryName = categoryName;
            resultArr[index].gameInfoList = gameInfoList;
          } else {
            let index = keyObject[key]["index"];
            resultArr[index].gameInfoList.push(...gameInfoList);
          }
        }
      }
      return resultArr;
    },
    showGameInfoList(sourceIndex) {
      let gameList = this.lotteryGameList;
      for (let i = 0; i < gameList.length; i++) {
        let item = gameList[i];
        if (i == sourceIndex) {
          let value = item.isShowInfo;
          value = value ? true : false;
          item.isShowInfo = !value;
        } else {
          item.isShowInfo = false;
        }
      }
      this.$forceUpdate();
    },
    changeGameSelect(gameId, sourceIndex) {
      let value = this.lotteryGameSelected[gameId];
      value = value ? true : false;
      this.lotteryGameSelected[gameId] = !value;
      let item = this.lotteryGameList[sourceIndex];
      let gameInfoList = item.gameInfoList;
      let key = item.key;
      //检测是否已经全选，并更改相应的全选值
      this.syncSelectAll(item);
      this.$forceUpdate();
    },
    GameCategoryTap(sourceIndex) {
      //点击全选或取消全选
      let gameList = this.lotteryGameList;
      let game = gameList[sourceIndex];
      let tabCur = this.lotteryTabCur;
      let value = game.selectAll[tabCur];
      value = value ? true : false;

      let gameInfoList = game.gameInfoList;
      for (let i = 0; i < gameInfoList.length; i++) {
        let gameInfo = gameInfoList[i];
        let groupId = gameInfo.groupId;
        let gameId = gameInfo.gameId;
        let key = gameInfo.categoryCode.split("_")[1];
        switch (tabCur) {
          case 0: //全部
            if (key != "LHC") {
              this.lotteryGameSelected[gameId] = !value;
            }
            break;
          case 1: //官方
            if (groupId == 1) {
              this.lotteryGameSelected[gameId] = !value;
            }
            break;
          case 2: //信用
            if (groupId == 0) {
              this.lotteryGameSelected[gameId] = !value;
            }
            break;
          case 3: //六合
            if (key == "LHC") {
              this.lotteryGameSelected[gameId] = !value;
            }
            break;
        }
      }
      this.syncSelectAll(game);
      this.$forceUpdate();
    },
    selectAllDefault() {
      //初始化默认全选
      for (let i = 0; i < this.lotteryGameList.length; i++) {
        let gameInfoList = this.lotteryGameList[i].gameInfoList;
        for (let g = 0; g < gameInfoList.length; g++) {
          let gameId = gameInfoList[g].gameId;
          this.lotteryGameSelected[gameId] = true;
        }
      }
    },
    syncSelectAll(item) {
      //选择后同步全选状态
      let gameInfoList = item.gameInfoList;
      let allLength = 0;
      let allSelectLength = 0;
      let guanLength = 0;
      let guanSelectLength = 0;
      let xinLength = 0;
      let xinSelectLength = 0;
      let liuheLength = 0;
      let liuheSelectLength = 0;
      for (let i = 0; i < gameInfoList.length; i++) {
        let gameInfo = gameInfoList[i];
        let gameKey = gameInfo.categoryCode.split("_")[1];
        let gameGroupId = gameInfo.groupId;
        let gId = gameInfo.gameId;
        if (gameKey != "LHC") {
          allLength++;
        } else {
          liuheLength++;
        }
        if (gameGroupId == 1) {
          guanLength++;
        }
        if (gameGroupId == 0) {
          xinLength++;
        }
        for (let l in this.lotteryGameSelected) {
          if (l == gId && this.lotteryGameSelected[l]) {
            //选中状态,且gameId相等

            if (gameKey != "LHC") {
              allSelectLength++;
            } else {
              liuheSelectLength++;
            }
            if (gameGroupId == 1) {
              guanSelectLength++;
            }
            if (gameGroupId == 0) {
              xinSelectLength++;
            }
          }
        }
      }

      if (allLength == allSelectLength) {
        item.selectAll[0] = true;
      } else {
        item.selectAll[0] = false;
      }

      if (guanLength == guanSelectLength) {
        item.selectAll[1] = true;
      } else {
        item.selectAll[1] = false;
      }

      if (xinLength == xinSelectLength) {
        item.selectAll[2] = true;
      } else {
        item.selectAll[2] = false;
      }

      if (liuheLength == liuheSelectLength) {
        item.selectAll[3] = true;
      } else {
        item.selectAll[3] = false;
      }
    },
    submit() {
      let url = `/pages/member/index/teamAccountDetail/TeamAccountDetail`;
      let postData = this.setPostData();
      if (postData.types == "") {
        this.$util.showToast({
          title: "请选择一个游戏类型",
        });
        return;
      }

      uni.setStorageSync("teamPostData", postData);
      uni.navigateTo({
        url: url,
      });
    },
    roterToZrsx() {
      let url = `/pages/member/index/ZrsxTeamAccountDetail/TeamAccountDetail`;
      uni.navigateTo({
        url: url,
      });
    },
    roterToDzyx() {
      let url = `/pages/member/index/DzyxTeamAccountDetail/TeamAccountDetail`;
      uni.navigateTo({
        url: url,
      });
    },
    roterToTyss() {
      let url = `/pages/member/index/TyssTeamAccountDetail/TeamAccountDetail`;
      uni.navigateTo({
        url: url,
      });
    },
    setPostData() {
      //生成发送数据
      let postData = {};
      postData.startTime = this.$refs.screenBar.startTime;
      postData.endTime = this.$refs.screenBar.endTime;
      postData.accountName = this.$refs.screenBar.accountName.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      let types = [];
      for (let gameId in this.lotteryGameSelected) {
        if (this.lotteryGameSelected[gameId]) {
          types.push(gameId);
        }
      }
      if (types.length == 0) {
        //没有选择则默认选择所有
        for (let i = 0; i < this.lotteryGameList.length; i++) {
          let gameInfoList = this.lotteryGameList[i].gameInfoList;
          for (let g = 0; g < gameInfoList.length; g++) {
            let gId = gameInfoList[g].gameId;
            types.push(gId);
          }
        }
      }
      postData.types = types.join(",");
      return postData;
    },
    setZrsxPostData() {
      //生成真人视讯发送数据
      let postData = {};
      postData.startTime = this.$refs.screenBar.startTime;
      postData.endTime = this.$refs.screenBar.endTime;
      return postData;
    },
    requestData(url, data, callback, failCallback) {
      uni.showLoading({
        title: "加载中...",
      });
      this.sendRequest({
        //游戏订单请求
        url: url,
        data: data,
        success: (res) => {
          console.log(res);
          if (res.code == 0) {
            //成功返回
            if (callback) callback(res);
          } else {
            this.$util.showToast({
              title: res.message,
            });
          }
        },
        fail: () => {
          if (failCallback) {
            failCallback();
          }
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
  },
  mixins: [http],
};
</script>

<style lang="scss" scoped>
.team-account {
  .has-sub-style {
    padding-top: 9px;
    line-height: 1;

    .sub-style {
      line-height: 1;
    }
  }

  .badge {
    background: none;
    padding: 0;
    right: -10px;
  }

  .margin-xs {
    margin: 7px;
  }

  .padding-lr-xs {
    padding-left: 5px;
    padding-right: 5px;
  }

  .border-bottom {
    border-bottom: 0.5px solid #ddd;
  }

  .grid-style {
    position: relative;
    margin-top: -1px;
    padding: 2px 5px 5px;
  }

  .lottery-list-box {
    height: calc(100vh - 364rpx - var(--status-bar-height) - var(--window-top));
    padding-bottom: 60px;
  }

  .bottom-bar {
    position: fixed;
    width: 100%;
    bottom: 10px;
  }

  .icon-xiangyou {
    display: inline-block;
    transition: transform 0.2s ease-in-out;
  }

  .arrow-bottom {
    transform: rotateZ(90deg);
  }
}
</style>
