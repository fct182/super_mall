<template>
  <div id="home">
    <!-- 标题栏 -->
    <NavBar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </NavBar>
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
      <TabControl @tabClick="tabClick" class="tab-control" :titles="titles" />
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
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
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
      probeType: 2, // 监听 上拉位置变化
      backTopImg: false, // 是否显示上拉图片
      pullUpLoad: true, //是否上拉加载更多
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
    },
    // 返回顶部
    backTop() {
      this.$refs.scroll_view.scrollTo(0, 0, 500);
      this.backTopImg = false;
    },
    // 控制 返回顶部 按钮的显示与隐藏
    scrollHeight(val) {
      this.backTopImg = val < -900;
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
#home {
  height: 100vh;
  position: relative;
}
.tab-control {
  position: sticky;
  top: 44px;
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