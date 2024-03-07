import request from '@/utils/request'

export default {
  getCategoryData() {
    return request.get('/category/list')
  }
}