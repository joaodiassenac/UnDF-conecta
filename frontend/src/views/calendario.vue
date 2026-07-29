<template>
  <v-container fluid class="pa-6 bg-grey-lighten-4 fill-height align-start">
    <v-row>
      
      <!-- 1. SIDEBAR ESQUERDA (Filtros e Ações) -->
      <v-col cols="12" md="2">
        <v-btn
          color="primary"
          block
          size="large"
          prepend-icon="mdi-plus"
          class="text-none mb-6 rounded-lg elevation-2"
        >
          Solicitar Auditório
        </v-btn>

        <!-- Mini Card Seletor de Mês -->
        <v-card variant="outlined" class="pa-3 mb-6 bg-white rounded-lg border">
          <div class="d-flex align-center justify-space-between mb-1">
            <span class="font-weight-bold text-subtitle-2">Julho 2026</span>
            <div>
              <v-btn icon="mdi-chevron-left" variant="text" density="compact"></v-btn>
              <v-btn icon="mdi-chevron-right" variant="text" density="compact"></v-btn>
            </div>
          </div>
          <span class="text-caption text-grey-darken-1">8 eventos agendados este mês.</span>
        </v-card>

        <!-- Filtros de Categoria -->
        <div class="text-caption font-weight-bold text-grey-darken-1 mb-2">CATEGORIAS</div>
        <v-checkbox v-model="categories.academico" label="Acadêmico" color="blue" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.administrativo" label="Administrativo" color="orange" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.auditorios" label="Auditórios" color="teal" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.eventos" label="Eventos" color="grey" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.palestras" label="Palestras" color="purple" hide-details density="compact"></v-checkbox>
      </v-col>

      <!-- 2. ÁREA CENTRAL (Grid do Calendário) -->
      <v-col cols="12" md="7">
        <v-card class="pa-4 rounded-lg elevation-1 bg-white">
          <!-- Cabeçalho do Calendário -->
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center gap-2">
              <h2 class="text-h5 font-weight-bold mr-2">Julho 2026</h2>
              <v-btn size="small" variant="outlined" color="grey">Hoje</v-btn>
            </div>
            
            <v-btn-toggle v-model="viewType" mandatory color="primary" density="compact">
              <v-btn value="mes">Mês</v-btn>
              <v-btn value="semana">Semana</v-btn>
              <v-btn value="dia">Dia</v-btn>
            </v-btn-toggle>
          </div>

          <!-- Componente do Calendário (ou representação em tabela) -->
          <v-sheet border class="rounded-lg pa-2">
            <!-- Estrutura simplificada de visualização -->
            <div class="text-center text-grey my-12">
              <v-icon size="48" color="primary">mdi-calendar-month</v-icon>
              <p class="mt-2 text-body-1 font-weight-medium text-grey-darken-2">
                Visualização do Calendário (Mês de Julho)
              </p>
            </div>
          </v-sheet>
        </v-card>
      </v-col>

      <!-- 3. SIDEBAR DIREITA (Próximos Eventos) -->
      <v-col cols="12" md="3">
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="font-weight-bold text-subtitle-1">Próximos Eventos</span>
          <v-btn variant="text" color="primary" density="compact" class="text-none">Ver todos</v-btn>
        </div>

        <!-- Card de Evento 1 -->
        <v-card class="mb-3 pa-3 rounded-lg border elevation-0 bg-white">
          <v-chip color="blue" size="x-small" label class="mb-2 font-weight-bold">ACADÊMICO</v-chip>
          <div class="font-weight-bold text-subtitle-2 mb-1">Defesa de TCC - Engenharia Civil</div>
          <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
            <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon> 08 Julho, 14:00 - 16:00
          </div>
          <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
            <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon> Auditório B, Prédio Central
          </div>
          <div class="text-caption text-grey-darken-1 d-flex align-center">
            <v-icon size="14" class="mr-1">mdi-account-outline</v-icon> Prof. Carlos Eduardo
          </div>
        </v-card>

        <!-- Card de Evento 2 -->
        <v-card class="mb-3 pa-3 rounded-lg border elevation-0 bg-white">
          <v-chip color="orange" size="x-small" label class="mb-2 font-weight-bold">ADMINISTRATIVO</v-chip>
          <div class="font-weight-bold text-subtitle-2 mb-1">Reunião Conselho Administrativo</div>
          <div class="text-caption text-grey-darken-1 d-flex align-center mb-1">
            <v-icon size="14" class="mr-1">mdi-clock-outline</v-icon> 08 Julho, 09:30 - 12:00
          </div>
          <div class="text-caption text-grey-darken-1 d-flex align-center">
            <v-icon size="14" class="mr-1">mdi-map-marker-outline</v-icon> Sala de Reuniões, Reitoria
          </div>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viewType = ref('mes')

const categories = ref({
  academico: true,
  administrativo: true,
  auditorios: true,
  eventos: false,
  palestras: true
})
</script>