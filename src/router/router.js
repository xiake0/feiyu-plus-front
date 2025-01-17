import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录 - Feiyu教研后台管理 '
    },
    component: () => import('@/views/login.vue')
};

export const registRouter = {
    path: '/regist',
    name: 'regist',
    meta: {
        title: '注册 - X-Boot前后端分离开发平台'
    },
    component: () => import('@/views/regist.vue')
};

export const registResult = {
    path: '/regist-result',
    name: 'regist-result',
    meta: {
        title: '注册结果 - X-Boot前后端分离开发平台'
    },
    component: () => import('@/views/regist-result.vue')
};

export const reset = {
    path: '/reset',
    name: 'reset',
    meta: {
        title: '重置密码 - X-Boot前后端分离开发平台'
    },
    component: () => import('@/views/reset.vue')
};

export const relateRouter = {
    path: '/relate',
    name: 'relate',
    meta: {
        title: '绑定账号 - X-Boot前后端分离开发平台 '
    },
    component: () => import('@/views/relate.vue')
};

// export const page404 = {
//     path: '/*',
//     name: 'error-404',
//     meta: {
//         title: '404-页面不存在'
//     },
//     component: () => import('@/views/error-page/404.vue')
// };

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'ownspace-old', title: '个人中心(旧)', name: 'ownspace_old', component: () => import('@/views/own-space/own-space-old.vue') },
        { path: 'change-pass', title: '修改密码', name: 'change_pass', component: () => import('@/views/change-pass/change-pass.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },
        { path: 'add-edit-message', title: '消息详情', name: 'add_edit_message', component: () => import('@/views/sys/message-manage/addOrEditMessage.vue') },
        { path: 'message-send-detail', title: '消息发送详情', name: 'message_send_detail', component: () => import('@/views/sys/message-manage/messageSendDetail.vue') },
        { path: 'process-node-edit', title: '流程节点设置', name: 'process_node_edit', component: () => import('@/views/activiti/process-manage/processNodeEdit.vue') },
        { path: 'leave', title: '请假申请', name: 'leave', component: () => import('@/views/activiti/business/leave.vue') },
        { path: 'historic-detail', title: '流程进度历史详情', name: 'historic_detail', component: () => import('@/views/activiti/historic-detail/historicDetail.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
// export const appRouter = [
//     {
//         path: '/form',
//         icon: 'ios-gear',
//         name: 'sys',
//         title: '系统管理',
//         component: Main,
//         children: [
//             { path: 'user-manage', title: '用户管理', name: 'user-manage', icon: 'android-person', component: () => import('@/views/sys/user-manage/userManage') },
//             { path: 'role-manage', title: '角色管理', name: 'role-manage', icon: 'android-contacts', component: () => import('@/views/sys/role-manage/roleManage.vue') },
//             { path: 'menu-manage', title: '菜单管理', name: 'menu-manage', icon: 'navicon-round', component: () => import('@/views/sys/menu-manage/menuManage.vue') },
//             { path: 'log-manage', title: '日志管理', name: 'log-manage', icon: 'android-list', component: () => import('@/views/sys/log-manage/logManage.vue') }
//         ]
//     }
// ];

export const appRouter = [];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    registRouter,
    registResult,
    reset,
    relateRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403
];
