<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <ui-switch :value="switchValue" @changeSwitch="changeSwitch"></ui-switch>

    <div class="echarts-wrap">
      <mpvue-echarts :echarts="echarts" :onInit="initChart" />
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
// import mpvueEcharts from "mpvue-echarts";
// import * as echarts from "echarts";
import uiSwitch from "@/components/uiSwitch";

export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {},
      echarts,
      resdata: [],
      switchValue: true
    };
  },

  components: {
    card,
    mpvueEcharts,
    uiSwitch
  },

  methods: {
    bindViewTap() {
      const url = "../logs/main";
      wx.navigateTo({ url });
    },
    getUserInfo() {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo;
            }
          });
        }
      });
    },
    clickHandle(msg, ev) {
      console.log("clickHandle:", msg, ev);
    },
    // 这里只是做一个测试，方法里可以调用接口，获取到的数据赋值给resdata
    test() {
      const res = [8000, 12000, 10000, 16000, 14000, 18000, 16000];
      this.resdata = res;
    },
    initChart(canvas, width, height) {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        backgroundColor: "#fff",
        color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          data: ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00", "24:00"]
        },
        yAxis: {
          x: "center",
          type: "value",
          min: 8000, // 坐标轴最小值
          max: 20000,
          scale: true,
          // 坐标轴的颜色
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          }
        },
        series: [
          {
            name: "",
            type: "line",
            smooth: false, // true是曲线，false是直线
            data: this.resdata,
            // 设置折线区域颜色
            areaStyle: { normal: {} },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "skyblue" }
                ])
              }
            }
          }
        ]
      };
      chart.setOption(option);
      return chart;
    },
    changeSwitch(e){
      console.log(e);
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  },

  onShow() {
    this.test();
  }
};
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.echarts-wrap {
  width: 100%;
  height: 300px;
}
</style>
