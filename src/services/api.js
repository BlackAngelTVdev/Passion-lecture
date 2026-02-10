// Ta base URL My JSON Server
const BASE_URL = 'https://my-json-server.typicode.com/BlackAngelTVdev/Passion-lecture/';

export default {
  // Récupérer tous les livres
  async getBooks() {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) throw new Error('Erreur réseau');
    return await response.json();
  }
};