<template>
  <v-navigation-drawer
    v-model="isSidebarOpen"
    temporary
    color="#0F2A4A"
    theme="dark"
    width="280"
    class="elevation-10"
  >
    <!-- Topo da Sidebar -->
    <v-list-item class="py-4 px-4" nav>
      <template #prepend>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          @click="isSidebarOpen = false"
        ></v-btn>
      </template>

      <v-list-item-title class="font-weight-bold text-subtitle-1 ml-2">
        Menu Principal
      </v-list-item-title>
    </v-list-item>

    <v-divider class="border-opacity-25 mb-2"></v-divider>

    <!-- Itens do Menu -->
    <v-list density="compact" nav class="pa-3">
      <v-list-item
        v-for="item in menuItems"
        :key="item.value"
        :to="item.to"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        active-color="amber-lighten-2"
        rounded="lg"
        class="mb-2 py-2"
        @click="isSidebarOpen = false"
      ></v-list-item>
    </v-list>

    <!-- Rodapé: Retorno para Home -->
    <template #append>
      <v-divider class="border-opacity-25 mb-2"></v-divider>
      <v-list density="compact" nav class="pa-3">
        <v-list-item
          to="/"
          prepend-icon="mdi-home-outline"
          title="Início"
          value="home"
          rounded="lg"
          @click="isSidebarOpen = false"
        ></v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { isSidebarOpen } from '@/stores/sidebar'

const menuItems = ref([
  {
    title: 'Fórum',
    icon: 'mdi-forum-outline',
    value: 'forum',
    to: '/forum'
  },
  {
    title: 'Calendário',
    icon: 'mdi-calendar-month-outline',
    value: 'calendario',
    to: '/calendario'
  },
  {
    title: 'Avaliação Institucional',
    icon: 'mdi-clipboard-check-outline',
    value: 'avaliacao',
    to: '/avaliacao'
  }
])
</script>