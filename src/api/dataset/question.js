import config from '@/config'
import http from '@/utils/request'

export default {
  add: {
    url: `${config.API_URL_BASE}/api/llme/question/add`,
    name: 'addQuestion',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  update: {
    url: `${config.API_URL_BASE}/api/llme/question/update`,
    name: 'updateQuestion',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  delete: {
    url: `${config.API_URL_BASE}/api/llme/question/delete`,
    name: 'deleteQuestion',
    post: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  list: {
    url: `${config.API_URL_BASE}/api/llme/question/list`,
    name: 'getQuestionList',
    get: async function (data) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data)
    },
  },
  import: {
    url: `${config.API_URL_BASE}/api/llme/question/import`,
    name: 'importQuestions',
    post: async function (data, config = {}) {
      // eslint-disable-next-line no-return-await
      return await http.post(this.url, data, config)
    },
  },
}
