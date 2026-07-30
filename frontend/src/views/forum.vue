<template>
  <v-container fluid class="pa-0 bg-grey-lighten-4 fill-height align-start">
    <v-app-bar flat color="white" border="b">
      <div class="d-flex align-center px-6 w-100 justify-space-between">
        <div class="d-flex align-center">
          <v-icon color="#0F2A4A" class="mr-2">mdi-square</v-icon>
          <span class="font-weight-bold text-h6 text-blue-grey-darken-4">Open Campus</span>
          <span class="text-caption text-grey ml-2">| Fórum de Discussão</span>
        </div>

        <v-sheet class="d-flex align-center px-4 py-2 bg-white rounded-lg elevation-1">
            <span class="text-body-2 font-weight-medium text-grey-darken-4 mr-2">Ana Silva Santos</span>
            <v-icon color="#0F2A4A" size="24">mdi-account-circle</v-icon>
            </v-sheet>
      </div>
    </v-app-bar>
    <v-dialog v-model="dialogNovaPublicacao" max-width="600px">
  <v-card class="rounded-xl pa-2">
    <v-card-title class="d-flex justify-space-between align-center pa-4">
      <span class="text-h6 font-weight-bold text-blue-grey-darken-4">Criar nova publicação</span>
      <v-btn icon="mdi-close" variant="text" density="compact" @click="dialogNovaPublicacao = false"></v-btn>
    </v-card-title>

    <v-card-text class="pa-4">
      <!-- Título -->
      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Título da Publicação</label>
      <v-text-field
        v-model="novaPublicacao.titulo"
        placeholder="Ex: Ar condicionado do auditório com defeito"
        variant="outlined"
        density="compact"
        class="mb-3 rounded-lg"
      ></v-text-field>

      <!-- Categoria -->
      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Categoria</label>
      <v-select
        v-model="novaPublicacao.categoria"
        :items="['Infraestrutura', 'Ensino', 'RU', 'Tecnologia', 'Eventos']"
        placeholder="Selecione uma categoria"
        variant="outlined"
        density="compact"
        class="mb-3 rounded-lg"
      ></v-select>

      <!-- Conteúdo/Texto -->
      <label class="text-caption font-weight-bold text-grey-darken-2 mb-1 d-block">Conteúdo</label>
      <v-textarea
        v-model="novaPublicacao.conteudo"
        placeholder="Descreva detalhadamente a sua publicação ou problema..."
        variant="outlined"
        rows="4"
        class="rounded-lg"
      ></v-textarea>
    </v-card-text>

    <v-card-actions class="pa-4 pt-0 d-flex justify-end gap-2">
      <v-btn variant="text" class="text-none" @click="dialogNovaPublicacao = false">
        Cancelar
      </v-btn>
      <v-btn
        color="#0F2A4A"
        variant="flat"
        class="text-none font-weight-bold rounded-lg px-6"
        :disabled="!novaPublicacao.titulo || !novaPublicacao.conteudo || !novaPublicacao.categoria"
        @click="publicarPost"
      >
        Publicar
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
    <v-main class="w-100">
      <!-- TABS DE NAVEGAÇÃO PRINCIPAL -->
       <!--
      <v-sheet color="#0F2A4A" class="d-flex justify-center">
        <div class="d-flex w-100 max-width-content">
          <v-btn variant="flat" color="#0F2A4A" rounded="0" class="flex-1 text-none font-weight-bold py-6 text-white border-b-lg">
            Fórum
          </v-btn>
          <v-btn variant="text" color="white" rounded="0" class="flex-1 text-none py-6 opacity-70">
            Calendário
          </v-btn>
          <v-btn variant="text" color="white" rounded="0" class="flex-1 text-none py-6 opacity-70">
            Avaliação Institucional
          </v-btn>
        </div>
      </v-sheet>
    -->
      <v-container class="max-width-content py-6">
        <v-card class="pa-4 mb-6 rounded-lg elevation-1 bg-white">
          <div class="d-flex align-center gap-4">
            <v-text-field
              v-model="searchQuery"
              placeholder="Buscar no fórum ou por tags relevantes..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              density="compact"
              hide-details
              class="bg-grey-lighten-5 rounded-lg flex-grow-1"
            ></v-text-field>

            <v-btn
              color="#0F2A4A"
              size="large"
              prepend-icon="mdi-plus"
              class="text-none rounded-lg font-weight-bold"
              @click="dialogNovaPublicacao = true"
            >
              Nova publicação
            </v-btn>
          </div>
        </v-card>

        <v-card class="mb-6 rounded-lg elevation-1 bg-white pa-0 overflow-hidden">
          <div class="d-flex">
            <v-btn
              v-for="cat in categorias"
              :key="cat"
              variant="flat"
              :color="categoriaSelecionada === cat ? '#0F2A4A' : 'white'"
              :class="['text-none flex-1 py-4 font-weight-bold', categoriaSelecionada === cat ? 'text-white' : 'text-grey-darken-2']"
              rounded="0"
              @click="categoriaSelecionada = cat"
            >
              {{ cat }}
            </v-btn>
          </div>
        </v-card>

        <div class="d-flex justify-space-between align-center mb-4">
          <span class="font-weight-bold text-subtitle-1 text-grey-darken-3">
            Discussões Recentes ({{ publicacoesFiltradas.length }})
          </span>
          <span class="text-caption text-grey-darken-2 font-weight-medium">
            Ordenar por: <strong class="text-blue-grey-darken-4">Mais Recentes</strong>
          </span>
        </div>

        <v-card
          v-for="post in publicacoesFiltradas"
          :key="post.id"
          class="mb-4 pa-5 rounded-lg elevation-1 bg-white border-sm"
        >
          <div class="d-flex">
            <v-avatar color="blue-grey-lighten-4" size="44" class="mr-4">
              <span class="text-h6 font-weight-bold text-blue-grey-darken-3">
                {{ post.autor.charAt(0) }}
              </span>
            </v-avatar>

            <div class="flex-grow-1">
              <div class="text-caption text-grey-darken-1 mb-1">
                <strong class="text-blue-grey-darken-4">{{ post.autor }}</strong> • {{ post.dataCriacao }}
              </div>

              <h3 class="text-h6 font-weight-bold text-blue-grey-darken-4 mb-2">
                {{ post.titulo }}
              </h3>

              <p class="text-body-2 text-grey-darken-2 mb-3">
                {{ post.conteudo }}
              </p>

              <div class="d-flex align-center justify-space-between">
                <div class="d-flex gap-2">
                  <v-chip size="small" variant="flat" color="grey-lighten-3" class="text-caption font-weight-bold text-grey-darken-2">
                    {{ post.categoria }}
                  </v-chip>
                  <v-chip
                    v-if="post.status"
                    size="small"
                    variant="flat"
                    :color="post.status === 'EM ANÁLISE' ? 'amber-lighten-4' : 'blue-lighten-4'"
                    :class="post.status === 'EM ANÁLISE' ? 'text-amber-darken-4' : 'text-blue-darken-4'"
                    class="text-caption font-weight-bold"
                  >
                    {{ post.status }}
                  </v-chip>
                </div>

                <div class="d-flex align-center gap-4">
                  <v-btn
                    variant="text"
                    density="compact"
                    prepend-icon="mdi-heart-outline"
                    class="text-caption text-grey-darken-1"
                    @click="votar(post.id)"
                  >
                    {{ post.votos }}
                  </v-btn>
                  <v-btn
                    variant="text"
                    density="compact"
                    prepend-icon="mdi-comment-outline"
                    class="text-caption text-grey-darken-1"
                  >
                    {{ post.comentariosCount }}
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const categoriaSelecionada = ref('Todas')
const dialogNovaPublicacao = ref(false)
const novaPublicacao = ref({
  titulo: '',
  categoria: null,
  conteudo: ''
})

const categorias = ref(['Todas', 'Infraestrutura', 'Ensino', 'RU', 'Tecnologia', 'Eventos'])

const publicacoes = ref([
  {
    id: 1,
    autor: 'Camila R.',
    dataCriacao: 'há 2h',
    titulo: 'WiFi instável no bloco C há uma semana',
    conteudo: 'Sinal cai constantemente durante as aulas práticas no segundo andar do bloco. Inviabiliza o uso de ferramentas de programação.',
    categoria: 'Infraestrutura',
    status: 'EM ANÁLISE',
    votos: 18,
    comentariosCount: 6
  },
  {
    id: 2,
    autor: 'Grêmio Acadêmico',
    dataCriacao: 'há 1 dia',
    titulo: 'Proposta: ampliar horário da biblioteca em período de provas',
    conteudo: 'Solicitamos a abertura até as 22h nas duas semanas que antecedem as avaliações finais para melhor acolhimento dos estudantes.',
    categoria: 'Ensino',
    status: 'PLANEJADA',
    votos: 42,
    comentariosCount: 15
  },
  {
    id: 3,
    autor: 'Mateus Santana',
    dataCriacao: 'há 2 dias',
    titulo: 'Ar condicionado do auditório principal com defeito',
    conteudo: 'Equipamento está desligando sozinho no meio das palestras, deixando o ambiente abafado e desconfortável para eventos longos.',
    categoria: 'Infraestrutura',
    status: 'EM ANÁLISE',
    votos: 28,
    comentariosCount: 4
  }
])

const publicacoesFiltradas = computed(() => {
  return publicacoes.value.filter(post => {
    const bateCategoria = categoriaSelecionada.value === 'Todas' || post.categoria === categoriaSelecionada.value
    const bateBusca = post.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                      post.conteudo.toLowerCase().includes(searchQuery.value.toLowerCase())
    return bateCategoria && bateBusca
  })
})

function votar(postId: number) {
  const post = publicacoes.value.find(p => p.id === postId)
  if (post) post.votos++
}

function publicarPost() {
  if (!novaPublicacao.value.titulo || !novaPublicacao.value.conteudo || !novaPublicacao.value.categoria) return

  // Adiciona no topo do array local (simulando a resposta do banco)
  publicacoes.value.unshift({
    id: Date.now(),
    autor: 'Ana Silva Santos',
    dataCriacao: 'agora mesmo',
    titulo: novaPublicacao.value.titulo,
    conteudo: novaPublicacao.value.conteudo,
    categoria: novaPublicacao.value.categoria,
    status: 'EM ANÁLISE',
    votos: 0,
    comentariosCount: 0
  })

  // Limpa o formulário e fecha o modal
  novaPublicacao.value = { titulo: '', categoria: null, conteudo: '' }
  dialogNovaPublicacao.value = false
}
</script>

<style lang="scss" scoped>
@import '@/styles/forum.scss';
</style>
