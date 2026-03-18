const BASE_URL = 'https://my-json-server.typicode.com/BlackAngelTVdev/Passion-lecture'
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes en ms

export default {
  // --- SYSTÈME DE MÉMOIRE LOCALE (CACHE) ---

  // save en local storage avec timestamp pour supp au bon moment
  _saveToCache(key, data) {
    const cacheEntry = {
      timestamp: Date.now(), // timestamp
      payload: data, // donnée
    }
    // object -> texte pour le localstorage
    localStorage.setItem(key, JSON.stringify(cacheEntry))
  },

  // On récupère la donnée, mais seulement si elle n'est pas trop vieille
  _getFromCache(key) {
    // regarde si la clef existe
    const cached = localStorage.getItem(key)

    // si y a rien on passe
    if (!cached) return null

    // on separt le timestamp du contenu qui viens de "_saveToCahe"
    const { timestamp, payload } = JSON.parse(cached)

    // calcule si c'est plus que 15min
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key) // on supp
      return null // et on dis que c'est vide
    }

    // returne l'object si il est pas trop vieux
    return payload
  },

  // Récupérer tous les livres (avec cache)
  async getBooks() {
    const cached = this._getFromCache('all_books')
    if (cached) return cached

    const response = await fetch(`${BASE_URL}/books`)
    if (!response.ok) throw new Error('Erreur de connexion')
    const data = await response.json()

    this._saveToCache('all_books', data)
    return data
  },

  // Récupérer tous les utilisateurs
  async getUsers() {
    const cached = this._getFromCache('all_users')
    if (cached) return cached

    const response = await fetch(`${BASE_URL}/user`)
    if (!response.ok) throw new Error('Erreur de connexion')
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

  // Mise à jour du livre
  async updateBook(id, bookData) {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    })

    if (!response.ok) throw new Error('Échec de la sauvegarde')

    const updatedBook = await response.json()

    // Sécurité comms
    if (!updatedBook.comments) updatedBook.comments = []

    // 1. On met à jour le cache du livre lui-même (toujours)
    this._saveToCache(`book_${id}`, updatedBook)

    // 2. On met à jour la liste globale UNIQUEMENT si elle existe déjà dans le cache
    const allBooks = this._getFromCache('all_books')

    if (allBooks && Array.isArray(allBooks)) {
      // On cherche si le livre est présent dans la liste actuelle
      const exists = allBooks.find((b) => b.id == id)

      if (exists) {
        // S'il est dedans, on le remplace proprement
        const updatedList = allBooks.map((b) => (b.id == id ? updatedBook : b))
        this._saveToCache('all_books', updatedList)
      }
      // Si "exists" est faux, on ne fait rien, on ne veut pas polluer le cache
    }

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
      body: JSON.stringify(book),
    })
    if (!response.ok) throw new Error("Échec de l'ajout du livre")

    const newBook = await response.json()

    // On ajoute le livre dans le cache de la liste
    const cached = this._getFromCache('all_books')
    if (cached) {
      cached.push(newBook)
      this._saveToCache('all_books', cached)
    }

    // On le cache aussi individuellement
    this._saveToCache(`book_${newBook.id}`, newBook)

    return newBook
  },
  // Supprimer un livre
  async deleteBook(id) {
    const response = await fetch(`${BASE_URL}/books/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) throw new Error('Échec de la suppression')

    // NETTOYAGE DU CACHE
    // 1. Supprime le cache individuel du livre
    localStorage.removeItem(`book_${id}`)

    // 2. Supprime le livre de la liste globale en cache
    const allBooks = this._getFromCache('all_books')
    if (allBooks) {
      const updatedList = allBooks.filter((b) => b.id != id)
      this._saveToCache('all_books', updatedList)
    }
  },
}
