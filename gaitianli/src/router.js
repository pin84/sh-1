import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/room-3rd',
            name: 'Room-3rd',
            component: ()=>import('@/views/room-3rd/index.vue')
        },
        {
            path: '/room-4th',
            name: 'Room-4th',
            component: ()=>import('@/views/room-4th/index.vue')
        },
        {
            path: '/room-mj',
            name: 'Room-mj',
            component: ()=>import('@/views/room-mj/index.vue')
        },
        {
            path: '/room-jz',
            name: 'Room-jz',
            component: ()=>import('@/views/room-jz/index.vue')
        },
        {
            path: '/room-jz-2',
            name: 'Room-jz-2',
            component: ()=>import('@/views/room-jz-2/index.vue')
        },
        {
            path: '/room-cs',
            name: 'Room-cs',
            component: ()=>import('@/views/room-cs/index.vue')
        },
      
    ]
})