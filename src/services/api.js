import localDatabase from '../../db.json'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

const fallbackUsers = Array.isArray(localDatabase.user) ? localDatabase.user : []

const toNumberId = (value) => {
  const parsed = Number(value)
  return Number.isNaN(parsed) ? value : parsed
}

const normalizeUser = (user) => ({
  ...user,
  id: toNumberId(user.id),
  admin: user.admin === true,
})

const normalizeComment = (comment) => ({
  id: toNumberId(comment.id),
  userId: toNumberId(comment.userId),
  title: comment.title ?? comment.contenu ?? '',
})

const normalizeRate = (rate) => ({
  id: toNumberId(rate.id),
  userId: toNumberId(rate.userId),
  value: rate.value,
})

const normalizeBook = (book) => {
  const comments = Array.isArray(book.comments)
    ? book.comments.map(normalizeComment)
    : Array.isArray(book.commentaires)
      ? book.commentaires.map(normalizeComment)
      : []

  const rates = Array.isArray(book.rates)
    ? book.rates.map(normalizeRate)
    : Array.isArray(book.ratesList)
      ? book.ratesList.map(normalizeRate)
      : []

  return {
    ...book,
    id: toNumberId(book.id),
    userId: toNumberId(book.userId),
    title: book.title ?? book.titre ?? '',
    author: book.author ?? book.auteur ?? '',
    category: book.category ?? book.categorie ?? '',
    editor: book.editor ?? book.editeur ?? '',
    published:
      book.published ??
      (book.createdAt ? new Date(book.createdAt).getFullYear() : '') ??
      '',
    nbpages: book.nbpages ?? book.nbPages ?? '',
    resume: book.resume ?? '',
    extrait: book.extrait ?? book.extraitPdf ?? '',
    image: book.image ?? book.imageCouverture ?? '',
    comments,
    rates,
    titre: book.titre ?? book.title ?? '',
    auteur: book.auteur ?? book.author ?? '',
    categorie: book.categorie ?? book.category ?? '',
    editeur: book.editeur ?? book.editor ?? '',
    nbPages: book.nbPages ?? book.nbpages ?? null,
    extraitPdf: book.extraitPdf ?? book.extrait ?? '',
    imageCouverture: book.imageCouverture ?? book.image ?? '',
  }
}

const toApiBookPayload = (book) => ({
  titre: book.title ?? book.titre ?? '',
  auteur: book.author ?? book.auteur ?? '',
  categorie: book.category ?? book.categorie ?? '',
  editeur: book.editor ?? book.editeur ?? '',
  epub: book.epub ?? '',
  resume: book.resume ?? '',
  nbPages: Number(book.nbpages ?? book.nbPages) || null,
  extraitPdf: book.extrait ?? book.extraitPdf ?? '',
  imageCouverture: book.image ?? book.imageCouverture ?? '',
  userId: toNumberId(book.userId),
})

const readJson = async (response) => {
  if (response.status === 204) return null
  return await response.json()
}

export default {
  // Récupérer tous les livres
  async getBooks() {
    try {
      const response = await fetch(`${BASE_URL}/books`)
      if (!response.ok) throw new Error('Erreur de connexion')
      return (await response.json()).map(normalizeBook)
    } catch {
      throw new Error('Erreur de connexion')
    }
  },

  // Récupérer tous les utilisateurs
  async getUsers() {
    return fallbackUsers.map(normalizeUser)
  },

  // Récupérer un livre par son ID (Crucial pour tes commentaires !)
  async getBookById(id) {
    try {
      const response = await fetch(`${BASE_URL}/books/${id}`)
      if (!response.ok) throw new Error('Livre introuvable')
      return normalizeBook(await response.json())
    } catch {
      throw new Error('Livre introuvable')
    }
  },

  // Récupérer un utilisateur par son ID
  async getUserById(id) {
    const user = fallbackUsers.find((entry) => toNumberId(entry.id) === toNumberId(id))
    if (!user) throw new Error('User introuvable')

    return normalizeUser(user)
  },

  // Connexion utilisateur via le back
  async login(credentials) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await readJson(response)
    if (!response.ok) {
      throw new Error(data?.message ?? 'Identifiants invalides')
    }

    if (data?.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return {
      ...data,
      user: data?.user ? normalizeUser(data.user) : null,
    }
  },

  // Inscription utilisateur via le back
  async register(payload) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await readJson(response)
    if (!response.ok) {
      throw new Error(data?.message ?? 'Impossible de créer le compte')
    }

    if (data?.token) {
      localStorage.setItem('auth_token', data.token)
    }

    return {
      ...data,
      user: data?.user ? normalizeUser(data.user) : null,
    }
  },

  async logout() {
    const token = localStorage.getItem('auth_token')
    const response = await fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    if (!response.ok) {
      throw new Error('Échec de la déconnexion')
    }

    localStorage.removeItem('auth_token')
  },

  async getProfile() {
    const token = localStorage.getItem('auth_token')
    const response = await fetch(`${BASE_URL}/profile`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })

    const data = await readJson(response)
    if (!response.ok) {
      throw new Error(data?.message ?? 'Profil introuvable')
    }

    return normalizeUser(data)
  },

  // Mise à jour du livre
  async updateBook(id, bookData) {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toApiBookPayload(bookData)),
    })

    const responseData = await readJson(response)

    if (!response.ok) throw new Error(responseData?.message ?? 'Échec de la sauvegarde')

    const updatedBook = normalizeBook({
      ...responseData,
      ...bookData,
      id,
    })

    // Sécurité comms
    if (!updatedBook.comments) updatedBook.comments = []

    return updatedBook
  },

  // Récupérer les stats d'un utilisateur
  async getUserStats(userId) {
    const user = await this.getUserById(userId)
    const allBooks = await this.getBooks()

    const userBooks = allBooks.filter((b) => b.userId == userId)

    let totalComments = 0
    allBooks.forEach((b) => {
      if (b.comments) {
        totalComments += b.comments.filter((c) => c.userId == userId).length
      }
    })

    let totalRates = 0
    allBooks.forEach((b) => {
      if (b.rates) {
        totalRates += b.rates.filter((r) => r.userId == userId).length
      }
    })

    return {
      ...user,
      nblivre: userBooks.length,
      nbcomm: totalComments,
      nbrate: totalRates,
    }
  },
  // Ajouter un nouveau livre
  async addBook(book) {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toApiBookPayload(book)),
    })
    const responseData = await readJson(response)

    if (!response.ok) throw new Error(responseData?.message ?? "Échec de l'ajout du livre")

    const newBook = normalizeBook({
      ...responseData,
      ...book,
    })

    return newBook
  },
  // Supprimer un livre
  async deleteBook(id) {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Échec de la suppression')
  },
}
