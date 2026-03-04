
## Analyse des Fonctionnalités Techniques

Le projet intègre plusieurs briques technologiques essentielles pour répondre aux besoins des lecteurs :

### 1. Système d'Authentification
* **Description :** Permet de sécuriser l'accès a sertaine pages
* **Technique :** la requet a l'api se fait directemet dans la page meme pour des raison de simplicité et d'intgration, nous avons choisi de séparé cette parite.

### 2. Gestion du Catalogue
* **Description :** Permet d'ajouter, lire, modifier ou supprimer des livres de sa bibliothèque.
* **Technique :** Les fonctions situées dans `/pages` pilotent les données via les requêtes centralisées. L'utilisateur peut commanter un livre en 1 clic.

### 3. Routage Dynamique
* **Description :** Navigation instantanée entre la bibliothèque et le profil.
* **Technique :** Le module `/router` intercepte les changements d'URL pour charger le contenu sans recharger la page entière.

### 4. Centralisation des Services
* **Description :** Unification de la logique réseau.
* **Technique :** En centralisant les requêtes dans `/services`, la maintenance est simplifiée : une modification sur la source de données s'applique instantanément à tout le projet sans risquer de briser l'interface.