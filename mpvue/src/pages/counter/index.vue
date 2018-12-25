<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
    <a href="/pages/userInfo/main" class="home">去往首页</a>
    <div class="item row" v-for="(item,index) in list" :key="item" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" :data-type="item.type">
      <div class="col">{{item.name}}</div>
      <div class="btn-delete">删除</div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from "@/store/index";

export default {
  data() {
    return {
      list: [
        { name: "张三", type: 0 },
        { name: "张三", type: 0 },
        { name: "张三", type: 0 },
        { name: "张三", type: 0 },
        { name: "张三", type: 0 },
        { name: "张三", type: 0 },
        { name: "张三", type: 0 },
        { name: "张三", type: 0 }
      ]
    };
  },
  computed: {
    count() {
      return store.state.test.count;
    }
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    },
    touchStart(e, index) {
      console.log(e, index);
      this.startX = e.mp.changedTouches[0].clientX;
    },
    touchEnd(e, index) {
      console.log(e, index);
      this.endX = e.mp.changedTouches[0].clientX;
      if (this.startX - this.endX > 10) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].type = 0;
        }
        this.list[index].type = 1;
      } else if (this.startX - this.endX < -10) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].type = 0;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.item {
  line-height: 44px;
  font-size: 20px;
  border: 1px solid #cccccc;
  width: calc(100vw + 130rpx);

  .btn-delete {
    background: #ff0000;
    color: #ffffff;
    padding: 0px 12px;
  }
}
div[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
div[data-type="1"] {
  transform: translate3d(-130rpx, 0, 0);
}
</style>
