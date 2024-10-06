import http from '@/utils/request'

export default {
  captcha: {
    url: `https://cst.gua.com/api/system/captcha`,
    name: '获取验证码',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  login: {
    url: `https://cst.gua.com/api/system/login`,
    name: '用户登录',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data, {
        headers: {},
      })
    },
  },
  changePassword: {
    url: `/api/system/user/changePassword`,
    name: '用户修改密码',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data, {
        headers: {},
      })
    },
  },
  fsLogin: {
    url: `/api/system/fslogin`,
    name: '用户登录',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data, {
        headers: {},
      })
    },
  },
}
