<template>
  <div ref="scrool">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";
import ObserveImage from "@better-scroll/observe-image";
BScroll.use(ObserveImage);
BScroll.use(Pullup);
BScroll.use(ObserveDOM);
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      saveY: 0,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
  },
  updated() {
    if (!this.scroll) {
      this.init();
    } else {
      this.scroll.refresh();
    }
  },
  methods: {
    init() {
      // 1. 创建 BScroll 对象
      this.scroll = new BScroll(this.$refs.scrool, {
        click: true, // 使点击有效
        observeDOM: true, // 开启 observe-dom 插件
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        observeImage: true, // 开启 observe-image 插件
      });
      // 2. 监听滚动的位置
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.saveY = position.y;
        this.$emit("scrollHeight", position.y);
      });
      // 3. 监听上拉加载
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          // console.log("上拉加载更多");
          this.$emit("loadMore");
        });
      }
    },
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullIp() {
      this.scroll.finishPullUp();
    },
  },
};
</script>

<style>
</style>