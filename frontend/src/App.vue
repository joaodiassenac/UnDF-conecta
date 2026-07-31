<template>
  <v-app>
    <AppSidebar />
    <router-view />
  </v-app>
</template>

<script setup lang="ts">
import AppSidebar from '@/components/common/AppSidebar.vue'
</script>