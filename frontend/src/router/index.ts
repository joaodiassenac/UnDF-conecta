import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/home.vue'
import LoginLayout from '@/loginLayout.vue'
import MainLayout from '../mainLayout.vue'
import Login from '../views/login.vue'

const routes = [
    {
        path: '/login',
        component: LoginLayout,
        children: [
            {
                path: '',
                name: 'login',
                component: Login
            }
        ]
    },
    {
        path: '/',
        component: MainLayout, 
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router