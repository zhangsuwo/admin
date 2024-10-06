import config from '@/config'
import http from '@/utils/request'

export default {
  update: {
    url: `${config.API_URL_BASE}/api/v0/res/docker/update`,
    name: 'updateDocker',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  delete: {
    url: `${config.API_URL_BASE}/api/v0/res/docker/delete`,
    name: 'deleteDocker',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  list: {
    url: `${config.API_URL_BASE}/api/v0/res/docker/list`,
    name: 'getDockerList',
    get: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
}
