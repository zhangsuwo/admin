import config from '@/config'
import http from '@/utils/request'

export default {
  add: {
    url: `${config.API_URL_BASE}/api/v0/res/device/add`,
    name: 'addDevice',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  update: {
    url: `${config.API_URL_BASE}/api/v0/res/device/update`,
    name: 'updateDevice',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  delete: {
    url: `${config.API_URL_BASE}/api/v0/res/device/delete`,
    name: 'deleteDevice',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  list: {
    url: `${config.API_URL_BASE}/api/v0/res/device/list`,
    name: 'getDeviceList',
    get: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
}
