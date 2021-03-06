import { Main, Guide, Business, Freight, Box, Ticket, HorizontalGuide, TabGuide } from '@/components/main'

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
      access: ['admin', 'teacher'],
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        systemName: 'main',
        meta: {
          access: ['admin', 'teacher'],
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
    systemName: 'main',
    meta: {
      access: ['admin'],
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'teacher-list', name: '老师管理', systemName: 'main', meta: { access: ['admin'], icon: 'ios-navigate', title: '老师管理' }, component: () => import('@/view/management/teacher-list.vue')
      }
    ]
  },
  /* 老师菜单 */
  {
    path: '/teacher/base',
    name: '基础设置',
    systemName: 'main',
    meta: {
      access: ['teacher'],
      icon: 'md-menu',
      title: '基础设置'
    },
    component: Main,
    children: [
      {
        path: 'class-list', name: '班级管理', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '班级管理' }, component: () => import('@/view/management/class-list.vue')
      },
      {
        path: 'student-list', name: '学生管理', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '学生管理' }, component: () => import('@/view/management/student-list.vue')
      },
      {
        path: 'experiment-list', name: '实验管理', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '实验管理' }, component: () => import('@/view/management/experiment-list.vue')
      }
    ]
  },
  {
    path: '/teacher/mock',
    name: '模拟客户操作',
    systemName: 'main',
    meta: {
      access: ['teacher'],
      icon: 'md-menu',
      title: '模拟客户操作'
    },
    component: Main,
    children: [
      {
        path: 'demand-list', name: '分发需求单', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '分发需求单' }, component: () => import('@/view/management/demand-list.vue')
      },
      {
        path: 'receipt-list', name: '分发收货单', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '分发收货单' }, component: () => import('@/view/management/receipt-list.vue')
      }
    ]
  },
  {
    path: '/teacher/stu',
    name: '学生操作',
    systemName: 'main',
    meta: {
      access: ['teacher'],
      icon: 'md-menu',
      title: '模拟客户操作'
    },
    component: Main,
    children: [
      {
        path: 'process-list', name: '学生进度', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '学生进度' }, component: () => import('@/view/management/process-select.vue')
      },
      {
        path: 'score-list', name: '系统评分', systemName: 'main', meta: { access: ['teacher'], icon: 'ios-navigate', title: '系统评分' }, component: () => import('@/view/management/score-list.vue')
      }
    ]
  },
  /*
  {
    path: '/multilevel',
    name: 'multilevel',
    systemName: 'main',
    meta: {
      access: ['admin'],
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        systemName: 'main',
        meta: {
          access: ['admin'],
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        systemName: 'main',
        meta: {
          access: ['admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            systemName: 'main',
            meta: {
              access: ['admin'],
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            systemName: 'main',
            meta: {
              access: ['admin'],
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
        systemName: 'main',
        meta: {
          access: ['admin'],
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  */
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
  {
    path: '/front',
    name: 'front',
    redirect: '/front/home',
    component: Guide,
    systemName: 'main',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/front/home', name: '/front/home', systemName: 'main', meta: { access: ['student'], hideInMenu: true, title: '首页' }, component: () => import('@/view/subsystem/home.vue')
      },
      {
        path: '/front/guide', name: '/front/guide', systemName: 'main', meta: { access: ['student'], hideInMenu: true, title: '导航' }, component: () => import('@/view/subsystem/subsystem-guide.vue')
      }
    ]
  },
  /* 电子商务系统 */
  {
    path: '/business',
    name: 'business',
    redirect: '/business/home',
    component: Business,
    systemName: 'business',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/business/home', name: '/business/home', systemName: 'business', meta: { access: ['student'], hideInMenu: true, title: '首页', notCache: true, icon: 'md-home' }, component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/business/demand/mnt',
    name: '日需求管理',
    component: Business,
    systemName: 'business',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '日需求管理'
    },
    children: [
      /*
      {
        path: 'day-demand-transport', name: '日运输需求', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '日运输需求' }, component: () => import('@/view/subsystem/business/day-demand-transport.vue')
      },
      {
        path: 'day-demand-select', name: '日需求查询', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '日需求查询' }, component: () => import('@/view/subsystem/business/day-demand-select.vue')
      },
      */
      {
        path: 'day-demand-unsub-select', name: '日需求退订查询', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '日需求退订查询' }, component: () => import('@/view/subsystem/business/day-demand-unsub-select.vue')
      },
      {
        path: 'day-demand-sub', name: '日需求预订', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '日需求预订' }, component: () => import('@/view/subsystem/business/day-demand-sub.vue')
      },
      {
        path: 'day-demand-sub-select', name: '日预订查询', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '日预订查询' }, component: () => import('@/view/subsystem/business/day-demand-sub-select.vue')
      }
    ]
  },
  {
    path: '/business/waybill/mnt',
    name: '运单管理',
    component: Business,
    systemName: 'business',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '运单管理'
    },
    children: [
      {
        path: 'waybill-accept', name: '运单受理', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '运单受理' }, component: () => import('@/view/subsystem/business/waybill-accept.vue')
      },
      {
        path: 'waybill-accept-select', name: '运单受理查询', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '运单受理查询' }, component: () => import('@/view/subsystem/business/waybill-accept-select.vue')
      },
      {
        path: 'waybill-match', name: '运单匹配', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '运单匹配' }, component: () => import('@/view/subsystem/business/waybill-match.vue')
      }
    ]
  },
  /* 进出货管理 暂时屏蔽 */
  /*
  {
    path: '/business/inout/mnt',
    name: '进出货管理',
    component: Business,
    systemName: 'business',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '进出货管理'
    },
    children: [
      {
        path: 'waybill-send-select', name: '发货运单查询', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '发货运单查询' }, component: () => import('@/view/subsystem/business/waybill-send-select.vue')
      },
      {
        path: 'waybill-arrive-select', name: '到达运单查询', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '到达运单查询' }, component: () => import('@/view/subsystem/business/waybill-arrive-select.vue')
      },
      {
        path: 'waybill-send-mnt', name: '发货运单管理', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '发货运单管理' }, component: () => import('@/view/subsystem/business/waybill-send-mnt.vue')
      },
      {
        path: 'waybill-arrive-mnt', name: '到达运单管理', systemName: 'business', meta: { access: ['student'], icon: 'md-add', title: '到达运单管理' }, component: () => import('@/view/subsystem/business/waybill-arrive-mnt.vue')
      }
    ]
  },
  */

  /* 货运站系统 */
  {
    path: '/freight',
    name: 'freight',
    redirect: '/freight/home',
    component: Freight,
    systemName: 'freight',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/freight/home', name: '/freight/home', systemName: 'freight', meta: { access: ['student'], hideInMenu: true, title: '首页', notCache: true, icon: 'md-home' }, component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/freight/waybill',
    name: '运单管理',
    component: Freight,
    systemName: 'freight',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '运单管理'
    },
    children: [
      {
        path: 'mnt-waybill-accept', name: 'mnt-waybill-accept', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '运单受理' }, component: () => import('@/view/subsystem/freight/waybill-accept')
      },
      {
        path: 'mnt-waybill-print', name: 'mnt-waybill-print', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '运单打印' }, component: () => import('@/view/subsystem/freight/waybill-print')
      }
    ]
  },
  {
    path: '/freight/goods',
    name: '进出货管理',
    component: Freight,
    systemName: 'freight',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      showAlways: true,
      title: '进出货管理'
    },
    children: [
      {
        path: 'mnt-whole-inout', name: '整车货场进出站', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '整车货场进出站' }, component: () => import('@/view/subsystem/freight/whole-inout')
      }
    ]
  },
  {
    path: '/business/freight',
    name: '货运组织',
    component: Freight,
    systemName: 'freight',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '货运组织'
    },
    children: [
      {
        path: 'pl1', name: '装车计划', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '装车计划' }, component: () => import('@/view/subsystem/freight/plan-1.vue')
      },
      {
        path: 'pl2', name: '卸车计划', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '卸车计划' }, component: () => import('@/view/subsystem/freight/plan-2.vue')
      },
      {
        path: 'wk1', name: '整车装卸', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '整车装卸' }, component: () => import('@/view/subsystem/freight/work-1')
      },
      {
        path: 'wk2', name: '票据确认', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '票据确认' }, component: () => import('@/view/subsystem/freight/ticket-notice')
      }/*,
      {
        path: 'wk2', name: '超限超重记录', systemName: 'freight', meta: { access: ['student'], icon: 'ios-navigate', title: '超限超重记录' }, component: () => import('@/view/management/student-list.vue')
      }
      */
    ]
  },
  {
    path: '/box',
    name: 'box',
    redirect: '/box/home',
    component: Box,
    systemName: 'box',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/box/home', name: '/box/home', systemName: 'box', meta: { access: ['student'], hideInMenu: true, title: '首页', notCache: true, icon: 'md-home' }, component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/box/reserve',
    name: '空箱预定',
    component: Box,
    systemName: 'box',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '空箱预定'
    },
    children: [
      {
        path: 'box-reserve-sub', name: '空箱预定提报', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '空箱预定提报' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      },
      /*
      {
        path: 'box-reserve-handle', name: '空箱预定处理', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '空箱预定处理' }, component: () => import('@/view/subsystem/box/box-reserve-handle.vue')
      },
      {
        path: 'box-reserve-select', name: '空箱预定查询', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '空箱预定查询' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      }
      */
    ]
  },
  {
    path: '/box/send/manage',
    name: '发送管理',
    component: Box,
    systemName: 'box',
    meta: {
      access: ['student'],
      hideInBread: true,
      icon: 'md-menu',
      title: '发送管理'
    },
    children: [
      {
        path: 'box-reserve-sub', name: '安排空箱', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '安排空箱' }, component: () => import('@/view/subsystem/box/box-empty-plan-search.vue')
      },
      {
        path: 'box-reserve-handle', name: '站内空箱', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '站内空箱' }, component: () => import('@/view/subsystem/box/box-reserve-handle.vue')
      },
      {
        path: 'box-reserve-select', name: '检斤验货', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '检斤验货' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      },
      {
        path: 'box-reserve-select', name: '配载', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '配载' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      },
      {
        path: 'box-reserve-select', name: '装配', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '装配' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      },
      {
        path: 'box-reserve-select', name: '按列装车', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '按列装车' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      },
      {
        path: 'box-reserve-select', name: '出线确认', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '出线确认' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      },
      {
        path: 'box-reserve-select', name: '非铁路出发', systemName: 'box', meta: { access: ['student'], icon: 'md-add', title: '非铁路出发' }, component: () => import('@/view/subsystem/box/box-reserve-sub.vue')
      }
    ]
  },
  {
    path: '/ticket',
    name: 'ticket',
    redirect: '/ticket/home',
    component: Ticket,
    systemName: 'ticket',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/ticket/home', name: '/ticket/home', systemName: 'ticket', meta: { access: ['student'], hideInMenu: true, title: '首页', notCache: true, icon: 'md-home' }, component: () => import('@/view/single-page/home')
      },
      {
        path: 'wk1', name: '整车装卸', systemName: 'ticket', meta: { access: ['student'], icon: 'ios-navigate', title: '整车装卸' }, component: () => import('@/view/subsystem/freight/work-1')
      }/*,
      {
        path: 'wk2', name: '超限超重记录', systemName: 'ticket', meta: { access: ['student'], icon: 'ios-navigate', title: '超限超重记录' }, component: () => import('@/view/management/student-list.vue')
      }
      */
    ]
  },
  {
    path: '/ticket/fee-1',
    name: 'ticket-fee-1',
    meta: {
      hideInBread: true
    },
    component: Ticket,
    systemName: 'ticket',
    children: [
      {
        path: 'fee-1-page', name: '制票计费', meta: { icon: 'md-menu', title: '制票计费' }, component: () => import('@/view/subsystem/ticket/fee-1')
      }
    ]
  },
  {
    path: '/ticket/fee-2',
    name: 'ticket-fee-2',
    meta: {
      hideInBread: true
    },
    component: Ticket,
    systemName: 'ticket',
    children: [
      {
        path: 'fee-2-page', name: '杂费核收', meta: { icon: 'md-menu', title: '杂费核收' }, component: () => import('@/view/subsystem/ticket/fee-2')
      }
    ]
  }/*,
  {
    path: '/front',
    name: 'front',
    redirect: '/front/guide',
    component: Guide,
    systemName: 'guide',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/front/guide', name: '/front/guide', systemName: 'guide', meta: { access: ['student'], hideInMenu: true, title: '首页' }, component: () => import('@/view/subsystem/subsystem-guide')
      }
    ]
  },
  {
    path: '/freight/home',
    name: '/freight/home',
    redirect: '/freight/home',
    component: HorizontalGuide,
    systemName: 'horizontal-guide',
    meta: {
      access: ['student'],
      hideInMenu: true
    },
    children: [
      {
        path: '/freight/home', name: '电商系统', systemName: 'horizontal-guide', meta: { access: ['student'], hideInMenu: true, title: '电商系统' }, component: () => import('@/view/stu/welcome')
      }
    ]
  } */
]
