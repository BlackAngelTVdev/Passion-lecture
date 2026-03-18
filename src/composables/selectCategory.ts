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

export const useSelectCategory = (books?: Ref<Book[]>) => {
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
      return ['Tous', ...defaultCategories]
    }

    const allCategories = books.value.map((book) => book.category)
    const uniqueCategories = Array.from(new Set([...defaultCategories, ...allCategories]))

    return ['Tous', ...uniqueCategories.sort()]
  })

  return {
    categories
  }
}