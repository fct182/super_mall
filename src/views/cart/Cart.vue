<template>
  <div class="cart">
    <!-- 头部标题栏 -->
    <NavBar class="cartNav">
      <template #center> 购物车({{ cartLength }}) </template>
    </NavBar>
    <!-- 购物车数据列表 -->
    <CartList />
    <!-- 底部汇总 -->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import CartList from "./childCopmp/CartList.vue";
import CartBottomBar from "./childCopmp/CartBottomBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.cartNav {
  background: var(--color-tint);
  color: #fff;
}
</style>
