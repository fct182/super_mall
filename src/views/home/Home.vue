<template>
  <div id="home">
    <!-- 标题栏 -->
    <NavBar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </NavBar>
    <!-- 下拉选择栏悬浮组件 -->
    <TabControl
      @tabClick="tabClick"
      :titles="titles"
      ref="TabControl1"
      class="tab-control"
      v-show="isTabFix"
    />
    <!-- 使用 better-scroll 包裹 -->
    <Scroll
      class="content"
      ref="scroll_view"
      :probeType="probeType"
      :pullUpLoad="pullUpLoad"
      @scrollHeight="scrollHeight"
      @loadMore="loadMore"
    >
      <!-- 轮播图 -->
      <Swiper class="home-swiper">
        <SwiperItem v-for="(item, index) in banners" :key="index">
          <a :href="item.link">
            <img class="banner-img" :src="item.image" alt="" />
          </a>
        </SwiperItem>
      </Swiper>
      <!-- 推荐栏目 -->
      <RecommendView :recommends="recommends" />
      <!-- 本周流行 -->
      <FeatureView />
      <!-- 选项栏控制组件 -->
      <TabControl @tabClick="tabClick" :titles="titles" ref="TabControl2" />
      <!-- 商品列表数据 -->
      <GoodsList :goods="goodsList" />
    </Scroll>
    <BackTop @click.native="backTop" v-show="backTopImg" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import { Swiper, SwiperItem } from "@/components/common/swiper/index.js";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import { getHomeMultidata, getHomeGoods } from "@/api/index.js";

export default {
  name: "Home",
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [], //轮播图
      recommends: [], // 推荐
      titles: ["流行", "新款", "精选"], // TabControl的文字
      goods: {
        // 商品数据
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currentType: "pop",
      probeType: 3, // 监听 上拉位置变化
      backTopImg: false, // 是否显示上拉图片
      pullUpLoad: true, //是否上拉加载更多
      tabOffsetTop: 0, //  TabControl相较域父元素的偏移
      isTabFix: false, // 控制 tabcontrol 停靠
      saveY: 0, // 保存当前浏览位置
    };
  },
  computed: {
    goodsList() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 2. 请求第一页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 为 tabOffsetTop 赋值，所有组件都有 $el 属性
    setTimeout(() => {
      // console.log(this.$refs.TabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.TabControl2.$el.offsetTop;
    }, 500);
  },
  activated() {
    // 设置浏览高度
    this.$refs.scroll_view.scrollTo(0, this.saveY, 10);
  },
  deactivated() {
    // 离开首页保存当前浏览高度
    this.saveY = this.$refs.scroll_view.saveY;
  },
  methods: {
    // 获取 轮播图＋推荐信息
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list = [...this.goods[type].list, ...res.data.list];
        this.goods[type].page++;
        this.$refs.scroll_view.finishPullIp();
      });
    },
    // 标签页点击切换
    tabClick(ind) {
      this.currentType = Object.keys(this.goods)[ind];
      // 使前后两个 TabControl 保持一致
      this.$refs.TabControl1.currentIndex = ind;
      this.$refs.TabControl2.currentIndex = ind;
    },
    // 返回顶部
    backTop() {
      this.$refs.scroll_view.scrollTo(0, 0, 500);
      this.backTopImg = false;
    },
    // 监听首页滚动事件
    scrollHeight(val) {
      // 1. 控制 返回顶部（backTop）按钮的显示与隐藏
      this.backTopImg = val < -900;
      // 2. 控制 TabControl 悬浮停靠
      // console.log(val);
      this.isTabFix = -val > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用原生滚动时生效，但此处使用的是Better-Scroll */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}
#home {
  height: 100vh;
  position: relative;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>