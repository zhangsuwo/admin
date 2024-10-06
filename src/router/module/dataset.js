const routes = [
  {
    path: '/dataset',
    name: 'dataset',
    component: 'dataset/category',
    meta: {
      icon: 'el-icon-link',
      title: '数据集',
      type: 'menu',
      isAffix: true,
    },
    children: [
      {
        path: '/dataset/category',
        name: 'category',
        component: 'dataset/category/index',
        meta: {
          icon: 'el-icon-Promotion',
          title: 'category',
          type: 'menu',
        },
      },
      {
        path: '/dataset/fewshots',
        name: 'fewshots',
        component: 'dataset/fewshots/index',
        meta: {
          icon: 'el-icon-Promotion',
          title: 'fewshots',
          type: 'menu',
        },
      },
    ],
  },
]
export default routes
