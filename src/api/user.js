import request from '@/utils/request'

// 获取个人信息
export default {
  getUserInfoDetail() {
    return request.get('/user/info')
  }
}
