// 此处用于存放所有登录相关的接口请求
import request from '@/utils/request'

export default {
  // 1. 获取图形验证码
  getPicCode() {
    return request.get('/captcha/image')
  },
  // 2. 获取短信验证码
  getMsgCode(captchaCode, captchaKey, mobile) {
    return request({
      url: '/captcha/sendSmsCaptcha',
      method: 'post',
      data: {
        form: {
          captchaCode,
          captchaKey,
          mobile
        }

      }
    })
  },
  //3.登录
  logIn(mobile, smsCode) {
    return request({
      url: '/passport/login',
      method: 'post',
      data: {
        form: {
          isParty: false,
          partyData: {},
          mobile,
          smsCode
        }
      }
    })
  }

}