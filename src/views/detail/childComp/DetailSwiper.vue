<template>
  <swiper class="detailSwiper">
    <swiper-item v-for="(item, index) in detailBanner" :key="index">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper/index.js";
export default {
  name: "DetailSwiper",
  props: {
    detailBanner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
.detailSwiper {
  height: 300px;
  overflow: hidden;
}
</style>