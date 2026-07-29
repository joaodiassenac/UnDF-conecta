<script setup lang="ts">
/**
 * Home
 * Tela inicial (dashboard) do Open Campus.
 * Responsabilidade única: definir os dados dos módulos e montar o layout.
 * Toda a apresentação visual fica delegada aos componentes filhos.
 */
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import ModuleCard from '@/components/home/ModuleCard.vue'

interface HomeModule {
  key: string
  title: string
  description: string
  icon: string
  to: string
  badge?: string
  badgeColor?: string
}

// Fonte única dos módulos exibidos na Home.
// Novos módulos (ex.: Editais, Oportunidades) entram aqui como abas
// dentro das telas de Calendário/Avaliação, conforme definido no
// Plano de Escopo — não como novos cards na Home.
const modules: HomeModule[] = [
  {
    key: 'forum',
    title: 'Fórum',
    description: 'Participe de discussões acadêmicas, tire dúvidas e conecte-se com sua turma.',
    icon: 'mdi-forum-outline',
    to: '/forum',
    badge: 'NOVO',
    badgeColor: 'primary',
  },
  {
    key: 'calendario',
    title: 'Calendário',
    description: 'Acompanhe datas de provas, entregas de trabalhos e eventos institucionais.',
    icon: 'mdi-calendar-blank-outline',
    to: '/calendario',
  },
  {
    key: 'avaliacao',
    title: 'Avaliação Institucional',
    description: 'Sua opinião constrói a nossa universidade. Responda aos questionários pendentes.',
    icon: 'mdi-clipboard-check-outline',
    to: '/avaliacao',
    badge: 'PENDENTE',
    badgeColor: 'grey-lighten-1',
  },
]

// TODO: substituir por dado real do usuário autenticado (store de auth)
// quando o módulo de autenticação for retomado.
const currentUser = {
  name: 'Ana Silva Santos',
  avatarUrl: undefined,
}
</script>

<template>
  <div class="home-view">
    <AppHeader :user-name="currentUser.name" :user-avatar-url="currentUser.avatarUrl" />

    <v-main class="bg-background">
      <v-container class="home-view__content" max-width="1100">
        <HomeHero
          title="Open Campus"
          subtitle="Universidade do Distrito Federal Jorge Amaury (UnDF)"
        />

        <v-row justify="center">
          <v-col
            v-for="module in modules"
            :key="module.key"
            cols="12"
            sm="6"
            md="4"
          >
            <ModuleCard
              :title="module.title"
              :description="module.description"
              :icon="module.icon"
              :to="module.to"
              :badge="module.badge"
              :badge-color="module.badgeColor"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <AppFooter />
  </div>
</template> 