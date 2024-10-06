import config from '@/config'
import http from '@/utils/request'

export default {
  add: {
    url: `${config.API_URL_BASE}/api/v0/res/server/add`,
    name: 'addServer',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  update: {
    url: `${config.API_URL_BASE}/api/v0/res/server/update`,
    name: 'updateServer',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  delete: {
    url: `${config.API_URL_BASE}/api/v0/res/server/delete`,
    name: 'deleteServer',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  list: {
    url: `${config.API_URL_BASE}/api/v0/res/server/list`,
    name: 'getServerList',
    get: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  createDocker: {
    url: `${config.API_URL_BASE}/api/v0/res/server/createDocker`,
    name: 'createDocker',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
}
