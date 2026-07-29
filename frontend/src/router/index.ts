import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/home.vue'
import LoginLayout from '@/loginLayout.vue'
import MainLayout from '../mainLayout.vue'
import Login from '../views/login.vue'
import Calendario from '../views/calendario.vue'
import Forum from '@/views/forum.vue'
import Avaliacao from '../views/avaliacao.vue'


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
            {
                path: 'calendario',
                name: 'calendario',
                component: Calendario
            },
            {
                path: 'forum',
                name: 'forum',
                component: Forum
            },
            {
                path: 'avaliacao',
                name: 'avaliacao',
                component: Avaliacao
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router