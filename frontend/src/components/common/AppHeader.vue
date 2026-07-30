<script setup lang="ts">
import { toggleSidebar } from '@/stores/sidebar'

defineEmits(['toggle-menu'])

interface Props {
  portalLabel?: string
  moduleLabel?: string
  userName?: string
  userAvatarUrl?: string
}

withDefaults(defineProps<Props>(), {
  portalLabel: 'Open Campus',
  moduleLabel: 'Calendário de Eventos',
  userName: 'Ana Silva Santos'
})

</script>

<template>
  <v-app-bar app flat color="background" class="app-header px-8" height="72">
    <div class="d-flex align-center gap-2">
      <v-btn icon="mdi-menu" variant="text" color="#0F2A4A" class="mr-1" @click="toggleSidebar"></v-btn>
      <span class="font-weight-bold text-subtitle-1 text-grey-darken-4">{{ portalLabel }}</span>
      
      <template v-if="moduleLabel">
        <span class="text-grey-lighten-1">|</span>
        <span class="text-subtitle-2 text-grey-darken-1 font-weight-regular">{{ moduleLabel }}</span>
      </template>
    </div>

    <v-spacer></v-spacer>

    <v-chip variant="outlined" color="grey-lighten-1" class="text-grey-darken-3 font-weight-medium rounded-lg px-3">
      <span class="mr-2">{{ userName }}</span>
      <v-avatar size="24">
        <v-img v-if="userAvatarUrl" :src="userAvatarUrl" :alt="userName" cover />
        <v-icon v-else icon="mdi-account-circle" size="24" color="blue-grey-darken-4" />
      </v-avatar>
    </v-chip>
  </v-app-bar>
</template>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>