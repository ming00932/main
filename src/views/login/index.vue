<template>
  <div class="login">
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          >
        </div>
        <div class="form-item">
          <input
            v-model="picCode"
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
          >
          <img
            v-if="picUrl"
            :src="picUrl"
            alt=""
            @click="getPicCode"
          >
        </div>
        <div class="form-item">
          <input
            v-model="msgCode"
            class="inp"
            placeholder="请输入短信验证码"
            type="text"
          >
          <button @click="secondRunning">{{ nowSecond === totalSecond ? '获取验证码' : nowSecond + '秒后重新发送'}}</button>
        </div>
      </div>

      <div
        class="login-btn"
        @click="logIn"
      >登录</div>
    </div>
  </div>
</template>

<script>
import AxiosMethods from "@/api/login";
import { Toast } from "vant";

export default {
  name: "loginIndex",
  data() {
    return {
      picKey: "", // 图形验证码唯一标识
      picUrl: "", // 存储请求渲染的图片地址
      totalSecond: 60, //倒计时初始数
      nowSecond: 60, //当下剩余秒数
      timer: null, //计时器id
      mobile: "", //手机号
      picCode: "", //二维码
      msgCode: "", //短信验证码
    };
  },
  methods: {
    // 校验 手机号 和 图形验证码 是否合法
    validFn() {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast("请输入正确的图形验证码");
        return false;
      }
      return true;
    },
    //获取图形验证码
    async getPicCode() {
      const res = await AxiosMethods.getPicCode();
      this.picKey = res.data.key;
      this.picUrl = res.data.base64;
    },
    //获取短信验证码
    async secondRunning() {
      if (!this.timer && this.validFn()) {
        await AxiosMethods.getMsgCode(this.picCode, this.picKey, this.mobile);
        Toast("手机验证码已发送");
        this.timer = setInterval(() => {
          this.nowSecond--;
          if (this.nowSecond == 0) {
            clearInterval(this.timer);
            this.nowSecond = 60;
            return;
          }
        }, 1000);
      }
    },
    //登录
    async logIn() {
      if (!this.validFn()) {
        return;
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast("请输入正确的手机验证码");
        return;
      }
      const res = await AxiosMethods.logIn(this.mobile, this.msgCode);
      //把个人凭证传入vuex
      this.$store.commit("user/updateUserInfo", res.data);

      Toast("登录成功");

      // 进行判断，看地址栏有无回跳地址
      // 1. 如果有   => 说明是其他页面，拦截到登录来的，需要回跳
      // 2. 如果没有 => 正常去首页
      const url = this.$route.query.backUrl || "/";
      this.$router.replace(url);
    },
  },
  created() {
    this.getPicCode();
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>