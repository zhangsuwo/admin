import config from '@/config'
import http from '@/utils/request'

export default {
  add: {
    url: `${config.API_URL_BASE}/api/v0/res/alb/add`,
    name: 'addALB',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  update: {
    url: `${config.API_URL_BASE}/api/v0/res/alb/update`,
    name: 'updateALB',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  delete: {
    url: `${config.API_URL_BASE}/api/v0/res/alb/delete`,
    name: 'deleteALB',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  list: {
    url: `${config.API_URL_BASE}/api/v0/res/alb/list`,
    name: 'getALBList',
    get: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
}
