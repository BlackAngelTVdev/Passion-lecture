const BASE_URL = 'https://my-json-server.typicode.com/BlackAngelTVdev/Passion-lecture/'
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes

export default {
  // --- SYSTÈME DE CACHE INTERNE ---
  _saveToCache(key, data) {
    const cacheEntry = {
      timestamp: Date.now(),
      payload: data,
    }
    localStorage.setItem(key, JSON.stringify(cacheEntry))
  },

  _getFromCache(key) {
    const cached = localStorage.getItem(key)
    if (!cached) return null

    const { timestamp, payload } = JSON.parse(cached)
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key) // Trop vieux, on supprime
      return null
    }
    return payload
  },

  // --- MÉTHODES API ---

  // Récupérer tous les livres (avec cache)
  async getBooks() {
    const cached = this._getFromCache('all_books')
    if (cached) return cached

    const response = await fetch(`${BASE_URL}/books`)
    if (!response.ok) throw new Error('Erreur réseau')
    const data = await response.json()

    this._saveToCache('all_books', data)
    return data
  },

  // Récupérer tous les utilisateurs
  async getUsers() {
    const cached = this._getFromCache('all_users')
    if (cached) return cached

    const response = await fetch(`${BASE_URL}/user`)
    if (!response.ok) throw new Error('Erreur réseau lors de la récupération des users')
    const data = await response.json()

    this._saveToCache('all_users', data)
    return data
  },

  // Récupérer un livre par son ID (Crucial pour tes commentaires !)
  async getBookById(id) {
    const cached = this._getFromCache(`book_${id}`)
    if (cached) return cached

    const response = await fetch(`${BASE_URL}/books/${id}`)
    if (!response.ok) throw new Error('Livre introuvable')
    const data = await response.json()

    this._saveToCache(`book_${id}`, data)
    return data
  },

  // Récupérer un utilisateur par son ID
  async getUserById(id) {
    const response = await fetch(`${BASE_URL}/user/${id}`)
    if (!response.ok) throw new Error('User introuvable')
    return await response.json()
  },

  // Mise à jour du livre (POST de commentaires)
  async updateBook(id, bookData) {
    // 1. On met à jour le cache direct pour que l'UI change instantanément
    this._saveToCache(`book_${id}`, bookData)

    // On invalide aussi la liste globale pour qu'elle soit refresh
    localStorage.removeItem('all_books')

    // 2. On fait l'appel fake à l'API
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) throw new Error('Échec de la sauvegarde')
    return await response.json()
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
}
