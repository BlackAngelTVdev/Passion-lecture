import { computed, type Ref } from 'vue'

interface Book {
  id: number
  title: string
  author: string
  category: string
  published: number
  nbpages: number
  editor: string
  resume: string
  extrait: string
  image: string
  comments?: any[]
  rates?: any[]
  userId: number
}

export const useSelectCategory = (books?: Ref<Book[]>, useDefaults: boolean = true) => {
  const defaultCategories = [
    'Fantasy',
    'Science-Fiction',
    'Romance',
    'Thriller',
    'Policier',
    'Horreur',
    'Historique',
    'Biographie',
    'Conte',
    'Dystopie',
    'Autre'
  ]

  const categories = computed(() => {
    if (!books?.value || books.value.length === 0) {
      return useDefaults ? ['Tous', ...defaultCategories] : ['Tous']
    }

    const allCategories = books.value.map((book) => book.category)
    const uniqueCategories = Array.from(new Set(allCategories))

    if (useDefaults) {
      // Fusion avec les catégories par défaut
      const mergedCategories = Array.from(new Set([...defaultCategories, ...uniqueCategories]))
      return ['Tous', ...mergedCategories.sort()]
    } else {
      // Uniquement les catégories des livres existants
      return ['Tous', ...uniqueCategories.sort()]
    }
  })

  return {
    categories
  }
}