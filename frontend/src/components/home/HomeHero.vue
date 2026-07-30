<script setup lang="ts">
// Importa a NOVA imagem com fundo transparente
import simboloLogo from '@/assets/simbolo-logo-transparente.png'

interface Props {
  title: string     // Recebe "Open Campus"
  subtitle: string  // Recebe a legenda institucional
}

defineProps<Props>()
</script>

<template>
  <!-- Container centralizado -->
  <div class="home-hero text-center d-flex flex-column align-center">
    
    <!-- 1. Símbolo dos Triângulos (No Topo, agora Transparente) -->
    <v-img
  :src="simboloLogo"
  alt="Símbolo UnDF"
  width="400"
  max-width="100%"
  contain
  class="mb-0"
></v-img>

    <!-- 2. Título "Open Campus" (Em Código, abaixo do símbolo) -->
    <h1 class="home-hero__title">{{ title }}</h1>

    <!-- 3. Legenda Institucional (Em Código, no final) -->
    <p class="home-hero__subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.home-hero {
  /* Mantém o padding do seu componente original */
  padding-block: 48px 32px;
}

.home-hero__title {
  /* Estilo do título Open Campus */
  font-size: 3.25rem; /* Grande e imponente */
  font-weight: 800;
  color: #0F2A4A; /* Azul escuro da identidade */
  letter-spacing: -0.01em;
  margin-bottom: 8px; /* Espaço para a legenda */
}

.home-hero__subtitle {
  /* Estilo da legenda cinza */
  font-size: 1.1rem;
  color: rgb(var(--v-theme-on-surface-variant)); /* Cor cinza do tema */
  font-weight: 500;
  max-width: 650px; /* Limita a largura para melhor leitura */
}

/* Responsividade para celulares */
@media (max-width: 600px) {
  .home-hero__title {
    font-size: 2.25rem;
  }
}
</style>