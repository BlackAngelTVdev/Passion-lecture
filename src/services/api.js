// Ta base URL My JSON Server
const BASE_URL = 'https://my-json-server.typicode.com/BlackAngelTVdev/Passion-lecture/';

export default {
  // Récupérer tous les livres
  async getBooks() {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) throw new Error('Erreur réseau');
    return await response.json();
  },

  // Récupérer un livre par ID
  async getBook(id) {
    const response = await fetch(`${BASE_URL}/books/${id}`);
    if (!response.ok) throw new Error('Livre introuvable');
    return await response.json();
  },

  // Simuler un POST (ajout)
  async addBook(bookData) {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    return await response.json();
  }
};