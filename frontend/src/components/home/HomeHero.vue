<script setup lang="ts">
/**
 * HomeHero
 * Título e subtítulo de boas-vindas da tela inicial.
 * Isolado em componente próprio para poder ser reaproveitado
 * (ex.: variação com faixa de avisos, conforme previsto no PDF).
 */
interface Props {
  title: string
  subtitle: string
}

defineProps<Props>()
</script>

<template>
  <div class="home-hero text-center">
    <h1 class="home-hero__title">{{ title }}</h1>
    <p class="home-hero__subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.home-hero {
  padding-block: 48px 32px;
}

.home-hero__title {
  font-size: 3rem;
  font-weight: 800;
  color: rgb(var(--v-theme-primary));
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}

.home-hero__subtitle {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface-variant));
}

@media (max-width: 600px) {
  .home-hero__title {
    font-size: 2.25rem;
  }
}
</style>
