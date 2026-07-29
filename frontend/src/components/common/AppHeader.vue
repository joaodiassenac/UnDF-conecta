<script setup lang="ts">
/**
 * AppHeader
 * Cabeçalho fixo usado em todas as telas autenticadas.
 * Exibe o selo do portal à esquerda e o usuário logado à direita.
 */
interface Props {
  portalLabel?: string
  userName: string
  userAvatarUrl?: string
}

withDefaults(defineProps<Props>(), {
  portalLabel: 'Portal de Serviços Acadêmicos',
})
</script>

<template>
  <v-app-bar flat color="background" class="app-header" height="72">
    <v-container class="d-flex align-center justify-space-between">
      <div class="d-flex align-center app-header__badge">
        <span class="app-header__badge-icon" aria-hidden="true" />
        <span class="text-caption font-weight-medium text-uppercase app-header__badge-label">
          {{ portalLabel }}
        </span>
      </div>

      <v-chip class="app-header__user" variant="flat" color="surface" size="large">
        <span class="font-weight-medium mr-2">{{ userName }}</span>
        <v-avatar size="28">
          <v-img v-if="userAvatarUrl" :src="userAvatarUrl" :alt="userName" cover />
          <v-icon v-else icon="mdi-account-circle" size="28" color="primary" />
        </v-avatar>
      </v-chip>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
.app-header__badge-icon {
  width: 10px;
  height: 10px;
  background-color: rgb(var(--v-theme-primary));
  border-radius: 2px;
  margin-right: 8px;
}

.app-header__badge-label {
  color: rgb(var(--v-theme-on-surface-variant));
  letter-spacing: 0.04em;
}

.app-header__user {
  padding-inline: 8px 6px;
}
</style>
