<script setup lang="ts">
/**
 * AppFooter
 * Rodapé institucional reutilizável em todas as telas.
 */
interface Props {
  institution?: string
  department?: string
  version?: string
}

withDefaults(defineProps<Props>(), {
  institution: 'Universidade do Distrito Federal - UnDF',
  department: 'Diretoria de Tecnologia da Informação e Comunicação',
  version: '1.4.0',
})

const year = new Date().getFullYear()
</script>

<template>
  <v-footer color="background" class="app-footer flex-column py-6">
    <p class="text-caption text-center mb-1 app-footer__line">
      © {{ year }} {{ institution }}. Todos os direitos reservados.
    </p>
    <p class="text-caption text-center app-footer__line app-footer__line--muted">
      {{ department }} · Versão {{ version }}
    </p>
  </v-footer>
</template>

<style scoped>
.app-footer__line {
  color: rgb(var(--v-theme-on-surface-variant));
}

.app-footer__line--muted {
  opacity: 0.7;
}
</style>
