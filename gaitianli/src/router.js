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


      
    ]
})