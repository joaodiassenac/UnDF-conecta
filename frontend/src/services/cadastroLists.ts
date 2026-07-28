import { ref, computed } from 'vue'

function formatToday() {
  const today = new Date()
  const day = String(today.getDate()).padStart(2, '0')
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const year = String(today.getFullYear())
  return `${day}/${month}/${year}`
}

export const fornecedores = ref([
  { id: 1, dataCadastro: '01/01/2026', nome: 'Fornecedor A', contratosVigentes: 3, cnpjCpf: '12.345.678/0001-90' },
  { id: 2, dataCadastro: '02/02/2026', nome: 'Fornecedor B', contratosVigentes: 5, cnpjCpf: '98.765.432/0001-90' },
])

export const gestores = ref([
  { id: 1, dataCadastro: '01/01/2026', nome: 'Gestor Y', contratosVigentes: 3 },
  { id: 2, dataCadastro: '02/02/2026', nome: 'Gestor B', contratosVigentes: 5 },
])

export const fiscais = ref([
  { id: 1, dataCadastro: '01/01/2026', nome: 'Fiscal X', contratosVigentes: 3 },
  { id: 2, dataCadastro: '02/02/2026', nome: 'Fiscal Z', contratosVigentes: 5 },
])

export const fornecedoresOptions = computed(() => fornecedores.value.map(item => item.nome))
export const gestoresOptions = computed(() => gestores.value.map(item => item.nome))
export const fiscaisOptions = computed(() => fiscais.value.map(item => item.nome))

export function addFornecedor(nome: string) {
  const value = nome?.trim()
  if (!value) return
  if (!fornecedoresOptions.value.includes(value)) {
    fornecedores.value.push({
      id: fornecedores.value.length + 1,
      dataCadastro: formatToday(),
      nome: value,
      contratosVigentes: 0,
      cnpjCpf: '',
    })
  }
}

export function addGestor(nome: string) {
  const value = nome?.trim()
  if (!value) return
  if (!gestoresOptions.value.includes(value)) {
    gestores.value.push({
      id: gestores.value.length + 1,
      dataCadastro: formatToday(),
      nome: value,
      contratosVigentes: 0,
    })
  }
}

export function addFiscal(nome: string) {
  const value = nome?.trim()
  if (!value) return
  if (!fiscaisOptions.value.includes(value)) {
    fiscais.value.push({
      id: fiscais.value.length + 1,
      dataCadastro: formatToday(),
      nome: value,
      contratosVigentes: 0,
    })
  }
}

export function updateGestor(id: number, nome: string) {
  const value = nome?.trim()
  if (!value) return
  const gestor = gestores.value.find(item => item.id === id)
  if (gestor) gestor.nome = value
}

export function updateFornecedor(id: number, nome: string) {
  const value = nome?.trim()
  if (!value) return
  const fornecedor = fornecedores.value.find(item => item.id === id)
  if (fornecedor) fornecedor.nome = value
}

export function updateFiscal(id: number, nome: string) {
  const value = nome?.trim()
  if (!value) return
  const fiscal = fiscais.value.find(item => item.id === id)
  if (fiscal) fiscal.nome = value
}