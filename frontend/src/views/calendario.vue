<template>
  <v-container fluid class="pa-6 bg-grey-lighten-4 fill-height align-start">
    <v-row>
      
      
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

       
        <v-card variant="outlined" class="pa-3 mb-6 bg-white rounded-lg border">
          <div class="d-flex align-center justify-space-between mb-1">
            <span class="font-weight-bold text-subtitle-2">{{ currentMonthYear }}</span>
            <div>
              <v-btn icon="mdi-chevron-left" variant="text" density="compact" @click="prevMonth"></v-btn>
              <v-btn icon="mdi-chevron-right" variant="text" density="compact" @click="nextMonth"></v-btn>
            </div>
          </div>
          <span class="text-caption text-grey-darken-1">8 eventos agendados este mês.</span>
        </v-card>

      
        <div class="text-caption font-weight-bold text-grey-darken-1 mb-2">CATEGORIAS</div>
        <v-checkbox v-model="categories.academico" label="Acadêmico" color="blue" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.administrativo" label="Administrativo" color="orange" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.auditorios" label="Auditórios" color="teal" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.eventos" label="Eventos" color="grey" hide-details density="compact"></v-checkbox>
        <v-checkbox v-model="categories.palestras" label="Palestras" color="purple" hide-details density="compact"></v-checkbox>
      </v-col>

      
      <v-col cols="12" md="7">
        <v-card class="pa-4 rounded-lg elevation-1 bg-white">
          <!-- Cabeçalho do Calendário -->
          <div class="d-flex align-center justify-space-between mb-4">
            <div class="d-flex align-center gap-2">
              <h2 class="text-h5 font-weight-bold mr-2">{{ currentMonthYear }}</h2>
              <v-btn size="small" variant="outlined" color="primary" @click="goToToday">Hoje</v-btn>
              <div class="ml-2">
                <v-btn icon="mdi-chevron-left" variant="text" density="compact" @click="prevMonth"></v-btn>
                <v-btn icon="mdi-chevron-right" variant="text" density="compact" @click="nextMonth"></v-btn>
              </div>
            </div>
            
            <v-btn-toggle v-model="viewType" mandatory color="primary" density="compact">
              <v-btn value="mes">Mês</v-btn>
              <v-btn value="semana">Semana</v-btn>
              <v-btn value="dia">Dia</v-btn>
            </v-btn-toggle>
          </div>

         
          <v-sheet border class="rounded-lg">
            <div class="calendar-grid">
              <!-- Dias da Semana -->
              <div v-for="day in weekDays" :key="day" class="weekday-header">
                {{ day }}
              </div>

              
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                :class="[
                  'calendar-day',
                  { 'other-month': !day.isCurrentMonth },
                  { 'today': day.isToday },
                  { 'selected': day.isSelected }
                ]"
                @click="selectDate(day)"
              >
                <span class="day-number">{{ day.dateNumber }}</span>
                
               
                <div v-if="day.events && day.events.length" class="event-list">
                  <span
                    v-for="event in day.events"
                    :key="event.id"
                    class="event-badge"
                    :style="{ backgroundColor: event.color || '#1867C0' }"
                  >
                    {{ event.title }}
                  </span>
                </div>
              </div>
            </div>
          </v-sheet>
        </v-card>
      </v-col>

      
      <v-col cols="12" md="3">
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="font-weight-bold text-subtitle-1">Próximos Eventos</span>
          <v-btn variant="text" color="primary" density="compact" class="text-none">Ver todos</v-btn>
        </div>

      
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
import { ref, computed } from 'vue'

interface CalendarEvent {
  id: number
  title: string
  color?: string
}

interface CalendarDay {
  date: Date
  dateNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  events: CalendarEvent[]
}

const viewType = ref('mes')

const categories = ref({
  academico: true,
  administrativo: true,
  auditorios: true,
  eventos: false,
  palestras: true
})

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(new Date())


const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  }).replace(/^\w/, (c) => c.toUpperCase())
})


const calendarDays = computed(() => {
  const days: CalendarDay[] = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)

  const startDayOfWeek = firstDayOfMonth.getDay()
  const totalDays = lastDayOfMonth.getDate()
  const today = new Date()


  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i)
    days.push(createDayObject(date, false, today))
  }

 
  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month, d)
    days.push(createDayObject(date, true, today))
  }

  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push(createDayObject(date, false, today))
  }

  return days
})

function createDayObject(date: Date, isCurrentMonth: boolean, today: Date): CalendarDay {
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()

  return {
    date,
    dateNumber: date.getDate(),
    isCurrentMonth,
    isToday: isSameDay(date, today),
    isSelected: selectedDate.value ? isSameDay(date, selectedDate.value) : false,
    events: []
  }
}

function prevMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

function nextMonth() {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

function goToToday() {
  currentDate.value = new Date()
  selectedDate.value = new Date()
}

function selectDate(day: CalendarDay) {
  selectedDate.value = day.date
}
</script>

<style lang="scss" scoped>
@import '@/styles/calendar.scss';
</style>