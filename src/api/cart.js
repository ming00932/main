import request from '@/utils/request'

export default {
  //购物车商品总数量
  getGoodsNumberInCart() {
    return request({
      url: '/cart/total'
    })
  },
  //获取购物车列表数据 
  getCartMsg() {
    return request({
      url: '/cart/list'
    })
  },
  //购物车商品更新
  updateCartMsg(goodsId, goodsNum, goodsSkuId) {
    return request({
      url: '/cart/update',
      method: 'post',
      data: {
        goodsId,
        goodsNum,
        goodsSkuId
      }
    })
  },
  //删除购物车商品
  delSelect(cartIds) {
    return request({
      url: '/cart/clear',
      method: 'post',
      data: {
        cartIds,
      }
    })

  }
}