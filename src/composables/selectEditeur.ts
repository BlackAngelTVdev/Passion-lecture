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

export const useSelectEditeur = (books?: Ref<Book[]>) => {
  const defaultEditeurs = [
'Gallimard',
'Grasset',
'Flammarion',
'Le Seuil',
'Albin Michel',
'Hachette',
'Livre de Poche',
'Pocket',
'Folio',
"J'ai Lu",
'Robert Laffont',
'Fayard',
'Stock',
'Calmann-Lévy',
'Actes Sud',
'Bragelonne',
'Milady',
"L'Atalante",
'Mnémos',
'Les Moutons Électriques',
'Denoël',
'Rivages',
'Points',
'Belfond',
'Plon',
'Presses de la Cité',
'Cherche Midi',
'Michel Lafon',
'Eyrolles',
'Dunod',
'Nathan',
'Bordas',
"L'École des Loisirs",
'Bayard',
'Milan',
'Glénat',
'Dargaud',
'Dupuis',
'Casterman',
'Delcourt',
'Soleil',
'Kana',
'Pika',
'Kurokawa',
'Ki-oon',
'Zulma',
'Minuit',
'Allia',
'Le Dilettante',
'Sabine Wespieser',
  ]

  const editeurs = computed(() => {
    if (!books?.value || books.value.length === 0) {
      return ['Tous', ...defaultEditeurs]
    }

    const allEditeurs = books.value.map((book) => book.editor)
    const uniqueEditeurs = Array.from(new Set([...defaultEditeurs, ...allEditeurs]))

    return ['Tous', ...uniqueEditeurs.sort()]
  })

  return {
    editeurs
  }
}