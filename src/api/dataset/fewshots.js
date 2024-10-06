import config from '@/config'
import http from '@/utils/request'

export default {
  add: {
    url: `${config.API_URL_BASE}/api/llme/fewshots/add`,
    name: 'addFewshots',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  update: {
    url: `${config.API_URL_BASE}/api/llme/fewshots/update`,
    name: 'updateFewshots',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  delete: {
    url: `${config.API_URL_BASE}/api/llme/fewshots/delete`,
    name: 'deleteFewshots',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  list: {
    url: `${config.API_URL_BASE}/api/llme/fewshots/list`,
    name: 'getFewshotsList',
    get: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
}
