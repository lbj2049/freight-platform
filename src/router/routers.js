import { Main, Student } from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    systemName: 'main',
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        systemName: 'main',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  /*
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  */
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  /*
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  */
  /* 管理员菜单 */
  {
    path: '/admin',
    name: 'admin',
    meta: {
      access: ['admin'],
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'teacher-list', name: '老师管理', meta: { icon: 'ios-navigate', title: '老师管理' }, component: () => import('@/view/management/teacher-list.vue')
      }
    ]
  },
  /* 老师菜单 */
  {
    path: '/teacher/base',
    name: '基础设置',
    meta: {
      access: ['teacher'],
      icon: 'md-menu',
      title: '基础设置'
    },
    component: Main,
    children: [
      {
        path: 'class-list', name: '班级管理', access: ['teacher'], meta: { icon: 'ios-navigate', title: '班级管理' }, component: () => import('@/view/management/class-list.vue')
      },
      {
        path: 'student-list', name: '学生管理', access: ['teacher'], meta: { icon: 'ios-navigate', title: '学生管理' }, component: () => import('@/view/management/student-list.vue')
      },
      {
        path: 'experiment-list', name: '实验管理', access: ['teacher'], meta: { icon: 'ios-navigate', title: '实验管理' }, component: () => import('@/view/management/experiment-list.vue')
      }
    ]
  },
  {
    path: '/teacher/mock',
    name: '模拟客户操作',
    meta: {
      access: ['teacher'],
      icon: 'md-menu',
      title: '模拟客户操作'
    },
    component: Main,
    children: [
      {
        path: 'demand-list', name: '分发需求单', access: ['teacher'], meta: { icon: 'ios-navigate', title: '分发需求单' }, component: () => import('@/view/management/demand-list.vue')
      },
      {
        path: 'receipt-list', name: '分发收货单', access: ['teacher'], meta: { icon: 'ios-navigate', title: '分发收货单' }, component: () => import('@/view/management/receipt-list.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  /* 学生菜单 */
  /* 货运系统菜单 */
  /* {
    path: '/business',
    name: '_business',
    redirect: '/business/home',
    component: Business,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/business/home',
        name: 'home',
        systemName: 'business',
        meta: {
          hideInMenu: true,
          title: '业务首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  } */

  {
    path: '/student/welcome',
    name: 'student-welcome',
    redirect: '/student/welcome',
    component: Student,
    systemName: 'student',
    meta: {
      access: ['student'],
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/student/welcome',
        name: '实验选择',
        systemName: 'student',
        meta: {
          access: ['student'],
          hideInMenu: true,
          title: '实验选择',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/stu/welcome')
      }
    ]
  },
  {
    path: '/student/index/:id',
    name: 'student-index',
    redirect: '/student/index:id',
    component: Student,
    systemName: 'student',
    meta: {
      access: ['student'],
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/student/index/:id',
        name: '系统选择',
        systemName: 'student',
        meta: {
          access: ['student'],
          hideInMenu: true,
          title: '系统选择',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/stu/index')
      }
    ]
  }
]
