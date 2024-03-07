import AxiosMethods from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state() {
    return {
      cartList: []
    }
  },
  mutations: {
    //获取cartList值
    setCartList(state, newValue) {
      state.cartList = newValue
    },
    toggleCheck(state, goodsId) {
      // 让对应的 id 的项 状态取反
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck(state, flag) {
      // 让所有的小选框，同步设置
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeInStore(state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartMsg(context) {
      const res = await AxiosMethods.getCartMsg()
      res.data.list.forEach(element => {
        element.isChecked = true
      });
      context.commit('setCartList', res.data.list)
    },
    async changeCountAction(context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先本地修改
      context.commit('changeInStore', { goodsId, goodsNum })
      //上传后端
      await AxiosMethods.updateCartMsg(goodsId, goodsNum, goodsSkuId)
    },
    // 删除购物车数据
    async delSelect(context) {
      const selCartList = context.getters.selCartList
      const selCartId = selCartList.map(item => item.id)
      await AxiosMethods.delSelect(selCartId)
      Toast('删除成功')
      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartMsg')
    },

  },
  getters: {
    // 求所有的商品累加总数
    cartTotal(state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList(state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的总数
    selCount(state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice(state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    // 是否全选
    isAllChecked(state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}