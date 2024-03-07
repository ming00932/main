import request from '@/utils/request'
export default {
  //渲染订单
  getMyOrder(mode, obj) {
    return request({
      url: '/checkout/order',
      params: {
        delivery: 10,
        couponId: 0,
        isUsePoints: 0,
        remark: '233',
        //需要传值的
        mode,
        ...obj,
      }
    })
  },
  //提交订单
  submitOrder(mode, obj) {
    return request.post('/checkout/submit', {
      mode,
      delivery: 10, // 10 快递配送
      couponId: 0,
      isUsePoints: 0,
      payType: 10, // 余额支付
      ...obj
    })
  },
  // 订单列表
  getMyOrderList(dataType, page) {
    return request.get('/order/list', {
      params: {
        dataType,
        page
      }
    })
  }
}