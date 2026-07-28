import {createRouter, createWebHistory} from 'vue-router'

import Contratos from '../views/contratos.vue'
import ContratosDados from '@/views/contratosDados.vue'
import Login from '@/views/login.vue'
import LoginLayout from '@/LoginLayout.vue'
import Gestores from '@/views/gestores.vue'
import Fiscais from '@/views/fiscais.vue'
import Log from '@/views/log.vue'
import Dashboard from '@/views/dashboard.vue'
import Usuarios from '@/views/gerenciamentoUsuarios.vue'
import Fornecedores from '@/views/fornecedores.vue'
import Perfil from '@/views/perfil.vue'
import MainLayout from '@/MainLayout.vue'   


const routes = [
    {
        path: '/',
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
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'contratos',
                name: 'contratos',
                component: Contratos
            },
            {
                path: 'gestores',
                name: 'gestores',
                component: Gestores
            },
            {
                path: 'fiscais',
                name: 'fiscais',
                component: Fiscais
            },
            {
                path: 'log',
                name: 'log',
                component: Log
            },
            {
                path: 'fornecedores',
                name: 'fornecedores',
                component: Fornecedores
            },
            {
                path: 'usuarios',
                name: 'usuarios',
                component: Usuarios
            },
            {
                path: 'perfil',
                name: 'perfil',
                component: Perfil
            },
            {
                path: 'contratosDados/:id',
                name: 'contratosDados',
                component: ContratosDados
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to) => {
    const publicPages = ['/'] 
    const authRequired = !publicPages.includes(to.path)
    const token = localStorage.getItem('token')

    if (authRequired && !token) {
        return '/'
    }

    if (!authRequired && token) {
        return '/dashboard'
    }
})

export default router