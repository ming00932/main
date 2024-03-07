import request from '@/utils/request'

export default {
  getHomeMsg() {
    return request({
      url: '/page/detail',
      method: 'get',
      params: {
        pageId: 0,
      }
    })
  }
}