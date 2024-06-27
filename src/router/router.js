
import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/views/Login.vue";
import Project from "@/components/views/Project.vue";


import Unit from "@/components/views/Unit.vue";
import Manager from "@/components/views/Manager.vue";
import {isLoggedIn} from "@/utils/auth.js";
import Basic from "@/components/views/Basic.vue";


const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/project',
        component: Project
    },
    {
        path: '/unit',
        component: Unit
    },
    {
        path: '/manager',
        component: Manager
    },
    {
        path: '/index',
        name: 'App',
        component: Basic,
        redirect: "/index/project",
        children: [
            {
                path: 'project',
                component: Project, // 项目管理页面组件
            },
            {
                path: 'login',
                component: Login, // 单位管理页面组件
            },
            {
                path: 'unit',
                component: Unit, // 负责人管理页面组件
            },
            {
                path: 'manager',
                component: Manager
            }
            // 可以添加更多的子路由
        ],
    }

]
const router = createRouter(
    {
        history: createWebHistory("/"),
        routes,
    }
)
router.beforeEach(async (to, from, next) => {
    if (to.path !== '/login') {
        try {
            const response = await isLoggedIn();
            if (response.data && response.data.code === 0) {
                console.log("登录了")
                next();
            } else {
                alert("请先登录")
                next('/login');
            }
        } catch (error) {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;