import base from "./base.js"
import { request } from "../utils/request.js"

// 获取首页的多项数据
export function getHomeMultidata() {
  return request({
    url: base.HomeMultidata
  })
}

// 获取首页的商品数据
export function getHomeGoods(type, page) {
  return request({
    url: base.HomeGoods,
    params: {
      type,
      page
    }
  })
}
