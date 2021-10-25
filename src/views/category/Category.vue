<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <button @click="clickHandle">按钮</button>
      <li>这是第1个li</li>
      <li>这是第2个li</li>
      <li>这是第3个li</li>
      <li>这是第4个li</li>
      <li>这是第5个li</li>
      <li>这是第6个li</li>
      <li>这是第7个li</li>
      <li>这是第8个li</li>
      <li>这是第9个li</li>
      <li>这是第10个li</li>
      <li>这是第11个li</li>
      <li>这是第12个li</li>
      <li>这是第13个li</li>
      <li>这是第14个li</li>
      <li>这是第15个li</li>
      <li>这是第16个li</li>
      <li>这是第17个li</li>
      <li>这是第18个li</li>
      <li>这是第19个li</li>
      <li>这是第20个li</li>
      <li>这是第21个li</li>
      <li>这是第22个li</li>
      <li>这是第23个li</li>
      <li>这是第24个li</li>
      <li>这是第25个li</li>
      <li>这是第26个li</li>
      <li>这是第27个li</li>
      <li>这是第28个li</li>
      <li>这是第29个li</li>
      <li>这是第30个li</li>
      <li>这是第31个li</li>
      <li>这是第32个li</li>
      <li>这是第33个li</li>
      <li>这是第34个li</li>
      <li>这是第35个li</li>
      <li>这是第36个li</li>
      <li>这是第37个li</li>
      <li>这是第38个li</li>
      <li>这是第39个li</li>
      <li>这是第40个li</li>
      <li>这是第41个li</li>
      <li>这是第42个li</li>
      <li>这是第43个li</li>
      <li>这是第44个li</li>
      <li>这是第45个li</li>
      <li>这是第46个li</li>
      <li>这是第47个li</li>
      <li>这是第48个li</li>
      <li>这是第49个li</li>
      <li>这是第50个li</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";

BScroll.use(Pullup);
export default {
  name: "Category",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      pullUpLoad: true,
    });
    // this.scroll.on("scroll", (position) => {
    //   console.log(position);
    // });
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
  methods: {
    clickHandle() {
      console.log("按钮");
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: tomato;
  overflow: hidden;
}
</style>