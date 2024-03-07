import request from '@/utils/request'

export default {
  //获取商品详情数据
  getGoodsMsg(goodsId) {
    return request({
      url: '/goods/detail',
      params: {
        goodsId,
      }
    })
  },
  //获取评论数据
  getCommentsMsg(goodsId, limit) {
    return request({
      url: '/comment/listRows',
      params: {
        goodsId,
        limit,
      }
    })
  },
  //加入购物车操作
  addInCart(goodsId, goodsNum, goodsSkuId) {
    return request({
      url: '/cart/add',
      method: 'post',
      data: {
        goodsId,
        goodsNum,
        goodsSkuId,
      }
    })
  }
}