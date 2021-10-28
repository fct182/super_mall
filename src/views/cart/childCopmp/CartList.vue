<template>
  <div class="cartList">
    <Scroll class="content">
      <CartListItem
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      />
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "@/components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    CartListItem,
  },
};
</script>

<style scoped>
.cartList {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>