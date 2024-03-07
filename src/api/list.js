import request from '@/utils/request'

export default {
  getListMsg(goodsName, categoryId) {
    return request({
      url: '/goods/list',
      params: {
        categoryId,
        goodsName,
        page: 1
      }
    })
  }
}