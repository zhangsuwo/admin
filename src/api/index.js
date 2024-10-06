/* eslint-disable prettier/prettier */
/**
 * @description 自动import导入所有 api 模块
 */

let modules = {
  model: {},
  res: {},
  dataset: {},
}

const model = import.meta.glob('./model/*.js', { eager: true })
Object.keys(model).forEach((key) => {
  modules['model'][key.split('/').pop().split('.')[0]] = model[key].default
})

const res = import.meta.glob('./res/*.js', { eager: true })
Object.keys(res).forEach((key) => {
  modules['res'][key.split('/').pop().split('.')[0]] = res[key].default
})

const dataset = import.meta.glob('./dataset/*.js', { eager: true })
Object.keys(dataset).forEach((key) => {
  modules['dataset'][key.split('/').pop().split('.')[0]] = dataset[key].default
})

export default modules
