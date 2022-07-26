// PC端蓝色主题界面
const bluetheme = [{
        path: '/',
        name: 'index',
        component: () =>
            import (`@/views/NewHome/index.vue`)
    },
    {
        path: '/user/login',
        name: 'user_login',
        component: () =>
            import ('./views/Home/login.vue')
    },
    {
        path: '/user/register',
        name: 'user_register',
        component: () =>
            import ('./views/Home/register.vue')
    }
]

export default bluetheme