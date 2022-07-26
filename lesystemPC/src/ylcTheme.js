// PC端ylc主题界面
const ylctheme = [{
        path: '/',
        name: 'ylchome',
        component: () =>
            import ('./views/Home/index_ylc.vue')
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

export default ylctheme