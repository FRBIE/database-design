
import {createRouter, createWebHistory} from 'vue-router'
import Login from "@/components/views/Login.vue";
import Project from "@/components/views/Project.vue";


import Unit from "@/components/views/Unit.vue";
import Manager from "@/components/views/Manager.vue";


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

]
const router = createRouter(
    {
        history: createWebHistory("/"),
        routes,
    }
)
export default router;