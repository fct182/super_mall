import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: [], //存储购物车数据
  },
  mutations: {
    pushGoods(state, product) {
      state.cartList.push(product);
    },
    addGoodsNum(state, product) {
      product.count++;
    }
  },
  actions: {
    addCart({ state, commit }, product) {
      return new Promise((resolve, reject) => {
        let flag = false;
        for (let item of state.cartList) {
          if (item.iid === product.iid) {
            commit("addGoodsNum", item);
            flag = true;
            resolve("当前的商品数量加1");
            break;
          }
        }
        if (!flag) {
          commit("pushGoods", product);
          resolve("商品添加购物车成功！");
        }
      })
    }
  },
  modules: {
  },
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList
    }
  }
})
