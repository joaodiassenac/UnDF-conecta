<template>
  <AppHeader portal-label="Open Campus" module-label="Avaliação institucional"/>
  <v-main class="w-100 bg-grey-lighten-4">
    <v-container fluid class="pa-0 bg-grey-lighten-4 fill-height align-start">
    
        <v-container fluid class="pa-6">
          <v-row>
            <v-col cols="12" md="3">
              <v-card variant="flat" class="pa-2 mb-6 bg-transparent">
                <v-list density="compact" class="bg-transparent">
                  <v-list-item
                    v-for="(item, index) in menuItems"
                    :key="index"
                    :active="menuAtivo === item.value"
                    color="#0F2A4A"
                    rounded="lg"
                    class="mb-1 text-none font-weight-medium"
                    @click="menuAtivo = item.value"
                  >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-card variant="outlined" color="blue-lighten-4" class="pa-4 rounded-xl bg-blue-lighten-5 border-blue">
                <h4 class="text-subtitle-2 font-weight-bold text-blue-grey-darken-4 mb-3">
                  73% dos alunos do seu curso já avaliaram este semestre
                </h4>
                <v-progress-linear
                  model-value="73"
                  color="#0F2A4A"
                  height="8"
                  rounded
                  class="mb-3"
                ></v-progress-linear>
                <p class="text-caption text-grey-darken-2 line-height-tight mb-0">
                  As respostas individuais não são divulgadas — apenas médias e indicadores agregados.
                </p>
              </v-card>
            </v-col>

            <v-col cols="12" md="9">
              <div class="mb-6">
                <h2 class="text-h5 font-weight-bold text-blue-grey-darken-4 mb-1">
                  Avaliações Pendentes
                </h2>
                <p class="text-body-2 text-grey-darken-1">
                  Selecione as estrelas e envie sua nota para contribuir com o relatório institucional.
                </p>
              </div>

              <v-card
                v-for="item in avaliacoesPendentes"
                :key="item.id"
                class="mb-4 pa-5 rounded-xl elevation-1 bg-white border-sm"
              >
                <div class="d-flex align-center mb-3">
                  <v-avatar color="blue-grey-lighten-5" size="44" class="mr-4">
                    <span class="text-h6 font-weight-bold text-blue-grey-darken-3">
                      {{ item.titulo.charAt(0) }}
                    </span>
                  </v-avatar>

                  <div>
                    <h3 class="text-subtitle-1 font-weight-bold text-blue-grey-darken-4 mb-0">
                      {{ item.titulo }}
                    </h3>
                    <span class="text-caption text-grey-darken-1">
                      {{ item.subtitulo }}
                    </span>
                  </div>
                </div>

                <div class="mb-3">
                  <v-rating
                    v-model="item.nota"
                    color="amber-darken-2"
                    active-color="amber-darken-1"
                    density="compact"
                    size="28"
                    hover
                  ></v-rating>
                </div>

                <v-text-field
                  v-model="item.comentario"
                  :placeholder="item.placeholder || 'Comentário (opcional)...'"
                  variant="outlined"
                  density="compact"
                  hide-details
                  class="bg-grey-lighten-5 rounded-lg mb-4"
                ></v-text-field>

                <div class="d-flex justify-end">
                  <v-btn
                    color="#0F2A4A"
                    size="large"
                    class="text-none rounded-lg font-weight-bold px-6"
                    @click="salvarAvaliacao(item)"
                  >
                    Enviar avaliação
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'

const menuAtivo = ref('pendentes')

const menuItems = ref([
  { title: 'Avaliações pendentes', value: 'pendentes' },
  { title: 'Minhas avaliações', value: 'minhas' },
  { title: 'Enquetes', value: 'enquetes' }
])

const avaliacoesPendentes = ref([
  {
    id: 1,
    titulo: 'Cálculo I — Prof. Marina Duarte',
    subtitulo: 'Disciplina · 2º semestre',
    nota: 4,
    comentario: '',
    placeholder: 'Comentário (opcional)...'
  },
  {
    id: 2,
    titulo: 'Biblioteca Central',
    subtitulo: 'Serviço institucional',
    nota: 0,
    comentario: '',
    placeholder: 'Como avalia a infraestrutura e atendimento da biblioteca?'
  },
  {
    id: 3,
    titulo: 'Restaurante Universitário',
    subtitulo: 'Serviço institucional',
    nota: 5,
    comentario: '',
    placeholder: 'Comentário (opcional)...'
  }
])

function salvarAvaliacao(item: any) {
  console.log('Enviando resposta ao banco:', {
    questionarioId: item.id,
    nota: item.nota,
    comentario: item.comentario
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/avaliacao.scss';
</style>