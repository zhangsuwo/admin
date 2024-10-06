const routes = [
  {
    path: '/res',
    name: 'res',
    component: 'res/server',
    meta: {
      icon: 'el-icon-Monitor',
      title: '资源管理',
      type: 'menu',
      isAffix: true,
    },
    children: [
      {
        path: '/res/alb',
        name: 'lb',
        component: 'res/alb/index',
        meta: {
          icon: 'el-icon-Operation',
          title: '负载均衡管理',
          type: 'menu',
        },
      },
      {
        path: '/res/server',
        name: 'server',
        component: 'res/server/index',
        meta: {
          icon: 'el-icon-MessageBox',
          title: '服务器管理',
          type: 'menu',
        },
      },
      {
        path: '/res/docker',
        name: 'docker',
        component: 'res/docker/index',
        meta: {
          icon: 'el-icon-MessageBox',
          title: 'Docker管理',
          type: 'menu',
        },
      },
      {
        path: '/res/device',
        name: 'device',
        component: 'res/device/index',
        meta: {
          icon: 'el-icon-Notification',
          title: '设备管理',
          type: 'menu',
        },
      },
    ],
  },
]
export default routes
