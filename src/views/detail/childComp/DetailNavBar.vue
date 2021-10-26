<template>
  <div>
    <NavBar>
      <template #left class="left">
        <img @click="back" src="@/assets/img/common/back.svg" alt="" />
      </template>
      <template #center>
        <div class="center_content">
          <div
            class="item"
            v-for="(item, index) in navBarTitle"
            :key="index"
            :class="{ active: index === currentIndex }"
            @click="currentIndexChange(index)"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  props: {
    navBarTitle: {
      type: Array,
      default() {
        return [];
      },
    },
    currentNavbar: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    // 改变当前 currentIndex
    currentIndexChange(ind) {
      this.currentIndex = ind;
      this.$emit("detailNavClick", ind);
    },
    // back 返回
    back() {
      this.$router.back();
    },
  },
  watch: {
    // 监听变化
    currentNavbar() {
      this.currentIndex = this.currentNavbar;
    },
  },
};
</script>

<style scoped>
.center_content {
  display: flex;
  font-size: 14px;
}
.center_content .item {
  flex: 1;
}
.center_content .active {
  color: var(--color-high-text);
}
.left {
  position: relative;
}
.left img {
  position: absolute;
  top: 11px;
  left: 19px;
}
</style>