import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'openCampusTheme',
    themes: {
      openCampusTheme: {
        dark: false,
        colors: {
          primary: '#1B3358', // Azul-marinho institucional (título, ícones, texto de destaque)
          secondary: '#4A7FE8', // Azul mais claro (fundo dos ícones, acentos)
          background: '#F5F6FA', // Cinza claro de fundo da página
          surface: '#FFFFFF', // Fundo dos cards e da app-bar
          'on-surface-variant': '#6B7280', // Cinza médio (textos secundários)
        },
      },
    },
  },
  defaults: {
    VCard: { rounded: 'lg' },
    VChip: { rounded: 'lg' },
  },
})
