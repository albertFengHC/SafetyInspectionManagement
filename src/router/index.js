import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
    },
    {
        path: '/loginPhone',
        name: 'loginPhone',
        component: () => import('../views/loginPhone.vue')
    },
    {
        path: '/index',
        name: 'index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/index.vue')
    },
    {
        path: '/MHDIList',
        name: 'MHDIList',
        component: () => import('../views/MHDIList.vue')
    },
    {
        path: '/NCOSchedule',
        name: 'NCOSchedule',
        component: () => import('../views/NCOSchedule.vue')
    },
    {
        path: '/LUHDangers',
        name: 'LUHDangers',
        component: () => import('../views/LUHDangers.vue')
    },
    {
        path: '/LHDNCSchedule',
        name: 'LHDNCSchedule',
        component: () => import('../views/LHDNCSchedule.vue')
    },
    {
        path: '/LHDTCancellation',
        name: 'LHDTCancellation',
        component: () => import('../views/LHDTCancellation.vue')
    },
    {
        path: '/LHDTCancellationDetails',
        name: 'LHDTCancellationDetails',
        component: () => import('../views/LHDTCancellationDetails.vue')
    },
    {
        path: '/LHDNCScheduleDetails',
        name: 'LHDNCScheduleDetails',
        component: () => import('../views/LHDNCScheduleDetails.vue')
    },
    {
        path: '/NCOScheduleDetails',
        name: 'NCOScheduleDetails',
        component: () => import('../views/NCOScheduleDetails.vue')
    },
    {
        path: '/LUHDangersDetails',
        name: 'LUHDangersDetails',
        component: () => import('../views/LUHDangersDetails.vue')
    },
    {path: '*', redirect: '/login'}
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
