import { setInfo, getInfo } from "@/utils/storage";

export default {
  namespaced: true,
  state: {
    // 个人权证相关
    userInfo: getInfo()
  },
  mutations: {
    updateUserInfo(state, newObj) {
      state.userInfo = newObj
      setInfo(newObj)
    }
  },
  getters: {

  },
  actions: {
    logout(context) {
      // 个人信息要重置
      context.commit('updateUserInfo', {})

      // 购物车信息要重置 (跨模块调用 mutation)  cart/setCartList
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}