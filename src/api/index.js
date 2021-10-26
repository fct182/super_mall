import base from "./base.js"
import { request } from "../utils/request.js"

//====================首页请求========================
/**
 * 获取首页的多项数据
 * @returns axios请求的Promise
 */
export function getHomeMultidata() {
  return request({
    url: base.HomeMultidata
  })
}

/**
 * 获取首页的商品数据
 * @param {*} type 商品类型
 * @param {*} page 商品页数
 * @returns axios请求的Promise
 */
export function getHomeGoods(type, page) {
  return request({
    url: base.HomeGoods,
    params: {
      type,
      page
    }
  })
}
//==================详情页请求========================
/**
 * 请求 商品详情页 数据
 * @param {*} iid 商品详情的 id 
 * @returns axios请求的Promise
 */
export function getDetail(iid) {
  return request({
    url: base.Detail,
    params: {
      iid
    }
  })
}
/**
 * 获取 推荐商品 数据
 * @returns axios请求的Promise
 */
export function getRecommend() {
  return request({
    url: base.Recommend
  })
}
