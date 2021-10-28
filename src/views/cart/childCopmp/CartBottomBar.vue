<template>
  <div class="cartBottomBar">
    <div class="bottomBar-check">
      <div class="collectAll">
        <CheckButton
          class="check-button"
          @checkBtnClick="checkBtnClick"
          :isChecked="isAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="totalPrice">合计：{{ totalPrice }} 元</div>
      <div class="calculate" @click="toPay">去结算({{ checkLength }})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 是否是全选状态
    isAllChecked() {
      if (this.cartList.length === 0) return false;
      return this.cartList.every((item) => {
        return item.checked === true;
      });
    },
    // 计算 购物车 选中商品的价格
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((pre, cur) => {
          return pre + +cur.price * cur.count;
        }, 0)
        .toFixed(2);
    },
    // 返回当前选中商品个数
    checkLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
  },
  methods: {
    // 实现全选按钮点击
    checkBtnClick() {
      if (this.isAllChecked) {
        for (let item of this.cartList) {
          if (item.checked) {
            item.checked = false;
          }
        }
      } else {
        for (let item of this.cartList) {
          if (!item.checked) {
            item.checked = true;
          }
        }
      }
    },
    // 去结算
    toPay() {
      if (this.cartList.length === 0) {
        this.$toast.show("购物车空空的，快去选购商品！");
      } else if (this.checkLength === 0) {
        this.$toast.show("您还没选择需要结算的商品！");
      } else {
        this.$toast.show("去结账咯！");
      }
    },
  },
};
</script>

<style scoped>
.cartBottomBar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  line-height: 40px;
  background: #eee;
}
.bottomBar-check {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
}
.collectAll {
  display: flex;
}
.collectAll .check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 10px 5px;
}
.totalPrice {
  flex: 1;
}
.calculate {
  background: rgb(241, 94, 49);
  color: #fff;
  width: 90px;
}
</style>