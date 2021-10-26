<template>
  <div id="detail">
    <!-- 导航栏 -->
    <DetailNavBar
      :navBarTitle="navBarTitle"
      class="detail_nav"
      @detailNavClick="detailNavClick"
      :currentNavbar="currentNavbar"
    />
    <Scroll
      class="detail_content"
      ref="detail_scroll"
      :probeType="3"
      @scrollHeight="scrollHeight"
    >
      <!-- 轮播图 -->
      <DetailSwiper :detailBanner="detailBanner" />
      <!-- 商品基础信息展示 -->
      <DetailBaseInfo :baseInfo="goods" />
      <!-- 商家信息展示 -->
      <DetailShopInfo :shopInfo="shopInfo" />
      <!-- 商品的详细信息 -->
      <DetailGoodsInfo :goodsInfo="detailInfo" />
      <!-- 商品参数 -->
      <DetailGoodsParams ref="params" :paramInfo="paramsInfo" />
      <!-- 商品评论信息 -->
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
      <!-- 推荐商品 -->
      <GoodsList ref="recommend" :goods="recommendInfo" />
    </Scroll>
    <!-- 底部工具栏 -->
    <DetailBottomBar />
  </div>
</template>

<script>
import DetailNavBar from "./childComp/DetailNavBar.vue";
import DetailSwiper from "./childComp/DetailSwiper.vue";
import DetailBaseInfo from "./childComp/DetailBaseInfo.vue";
import DetailShopInfo from "./childComp/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComp/DetailGoodsInfo.vue";
import DetailGoodsParams from "./childComp/DetailGoodsParams.vue";
import DetailCommentInfo from "./childComp/DetailCommentInfo.vue";
import DetailBottomBar from "./childComp/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";

import { getDetail, getRecommend } from "@/api/index.js";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: "",
      navBarTitle: ["商品", "参数", "评论", "推荐"],
      detailBanner: [], //顶部轮播数据
      goods: {}, // 商品的基础信息
      shopInfo: {}, // 详情页商家信息
      detailInfo: {}, // 商品详情数据
      paramsInfo: {}, // 商品c参数数据
      commentInfo: {}, // 评论信息
      recommendInfo: [], // 推荐商品
      themeTopY: [], // NavBar 各个主题对应的高度
      currentNavbar: 0,
    };
  },
  created() {
    // 1. 保存 id
    this.iid = this.$route.params.id;
    // 2. 请求数据
    getDetail(this.iid).then((res) => {
      // console.log(res.result);
      const data = res.result;
      // 2.1 保存轮播图信息
      this.detailBanner = data.itemInfo.topImages;
      // 2.2 保存商品基础信息
      this.goods = this.dealGoods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 2.3 保存商家基本信息
      this.shopInfo = this.dealShop(data.shopInfo);
      // 2.4 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 2.5 商品的参数信息
      this.paramsInfo = this.dealGoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 2.6 评论信息
      if (data.rate.cRate > 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3. 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommendInfo = res.data.list;
    });
  },
  mounted() {
    setTimeout(() => {
      // 设置 头部点击导航
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      console.log(this.themeTopY);
    }, 1500);
  },
  methods: {
    // 处理商品基础信息
    dealGoods(itemInfo, columns, services) {
      return {
        title: itemInfo.title,
        desc: itemInfo.desc,
        newPrice: itemInfo.price,
        oldPrice: itemInfo.oldPrice,
        discount: itemInfo.discountDesc,
        columns,
        services,
        realPrice: itemInfo.lowNowPrice,
      };
    },
    // 处理详情页商家信息
    dealShop(shopInfo) {
      return {
        logo: shopInfo.shopLogo,
        name: shopInfo.name,
        fans: shopInfo.cFans,
        sells: shopInfo.cSells,
        score: shopInfo.score,
        goodsCount: shopInfo.cGoods,
      };
    },
    // 处理商品的参数
    dealGoodsParams(info, rule) {
      return {
        image: info.image ? info.image[0] : "",
        infos: info.set,
        sizes: rule.tables,
      };
    },
    // 头部控制，快捷滚动
    detailNavClick(val) {
      this.$refs.detail_scroll.scrollTo(0, -this.themeTopY[val], 500);
    },
    // 设置 NavBar 随着页面滚动 动态使标题变红
    scrollHeight(y) {
      const positionY = -y;
      for (let i in this.themeTopY) {
        if (
          (i < this.themeTopY.length - 1 &&
            positionY >= this.themeTopY[+i] &&
            positionY < this.themeTopY[+i + 1]) ||
          (i == this.themeTopY.length - 1 && positionY >= this.themeTopY[+i])
        ) {
          if (i != this.currentNavbar) {
            this.currentNavbar = +i;
            // console.log(i);
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
  padding-bottom: 58px;
}
.detail_nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.detail_content {
  height: calc(100% - 44px);
}
</style>