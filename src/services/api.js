// Ta base URL My JSON Server
const BASE_URL = 'https://my-json-server.typicode.com/BlackAngelTVdev/Passion-lecture/'

export default {
  // Récupérer tous les livres
  async getBooks() {
    const response = await fetch(`${BASE_URL}/books`)
    if (!response.ok) throw new Error('Erreur réseau')
    return await response.json()
  },

  // Récupérer tous les utilisateurs
  async getUsers() {
    const response = await fetch(`${BASE_URL}/user`)
    if (!response.ok) throw new Error('Erreur réseau lors de la récupération des users')
    return await response.json()
  },

  // Récupérer un livre par son ID
  async getBookById(id) {
    const response = await fetch(`${BASE_URL}/books/${id}`)
    if (!response.ok) throw new Error('Livre introuvable')
    return await response.json()
  },

  // Récupérer un utilisateur par son ID
  async getUserById(id) {
    const response = await fetch(`${BASE_URL}/user/${id}`)
    if (!response.ok) throw new Error('User introuvable')
    return await response.json()
  },

  // Récupérer les stat d'un utilisateur
  async getUserStats(userId) {
    // On appelle les méthodes existantes ci-dessus
    const user = await this.getUserById(userId)
    const allBooks = await this.getBooks()

    // 1. Compter les livres dont cet utilisateur est l'auteur
    // On utilise == au lieu de === car l'ID de l'URL est souvent une string "1" 
    // alors que dans le JSON c'est un nombre 1
    const userBooks = allBooks.filter(b => b.userId == userId)

    // 2. Compter les commentaires laissés par cet utilisateur
    let totalComments = 0
    allBooks.forEach(b => {
      if (b.comments) {
        totalComments += b.comments.filter(c => c.userId == userId).length
      }
    })

    // 3. Compter les notes laissées par cet utilisateur
    let totalRates = 0
    allBooks.forEach(b => {
      if (b.rates) {
        totalRates += b.rates.filter(r => r.userId == userId).length
      }
    })

    return {
      ...user,
      nblivre: userBooks.length,
      nbcomm: totalComments,
      nbrate: totalRates
    }
  }
}