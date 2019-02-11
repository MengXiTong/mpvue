<template>
  <div class="weui-div"
       :style="{'color':color}"
       @click.stop="toggle">
    <div class="weui-switch"
         :style="{borderColor: colorValue,backgroundColor: colorValue}">
      <div class="weui-switch-b"></div>
      <div class="weui-switch-a"
           :class="{'weui-switch-on' : me_checked}"></div>
    </div>
    <div v-if="me_checked"
         class="weui-div-1">{{actionText}}</div>
    <div v-else
         class="weui-div-2">{{unactionText}}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    value: {
      type: Boolean,
      default: true
    },
    handle: {
      type: Boolean,
      default: true
    },
    actionText: {
      type: String,
      default: "开"
    },
    unactionText: {
      type: String,
      default: "关"
    },
    color: {
      type: String,
      default: "#fff"
    },
    actionColor: {
      type: String,
      default: "#fe7eb1"
    },
    unactionColor: {
      type: String,
      default: "#55E3C2"
    }
  },
  data() {
    return {
      me_checked: this.value
    };
  },
  computed: {
    colorValue() {
      return this.me_checked ? this.actionColor : this.unactionColor;
    }
  },
  watch: {
    value() {
      this.me_checked = this.value;
    }
  },
  methods: {
    toggle() {
      // 是否可点击
      if (this.handle === true) {
        this.me_checked = !this.me_checked;
        this.$emit("changeSwitch", {
          value: this.me_checked,
          id: this.id
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.weui-div {
  position: relative;
  font-weight: bold;
  cursor: pointer;
  width: 82px;
  height: 32px;
}

.weui-div-1 {
  position: absolute;
  left: 15px;
  top: 0;
  line-height: 32px;
  font-size: 14px;
}

.weui-div-2 {
  position: absolute;
  right: 15px;
  top: 0;
  line-height: 32px;
  font-size: 14px;
}

.weui-switch {
  display: block;
  position: relative;
  width: 82px;
  height: 32px;
  border: 1px solid;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}

.weui-switch-b {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 30px;
  border-radius: 15px;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}

.weui-switch-a {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}

.weui-switch-on {
  transform: translateX(50px);
}
</style>
