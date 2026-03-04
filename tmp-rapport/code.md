## 1. Architecture Globale
Le projet Passion-lecture adopte une architecture modulaire et composante. Cette approche permet une séparation nette entre la logique métier et l'interface utilisateur. L'organisation du code a été pensée pour favoriser la maintenabilité, l'extensibilité et une prise en main rapide par de nouveaux développeurs.

## 2. Organisation du Code Source 
L'arborescence est segmentée par responsabilités afin de respecter le principe de séparation des préoccupations :

* **`/components`** : Centralise les éléments visuels réutilisables (Header, Footer, formulaires de Login/Register). Cette modularité permet d'éviter la duplication de code et garantit une cohérence graphique sur l'ensemble de l'application.
* **`/pages`** : Contient les vues principales de l'application. Chaque  fichier correspond à une route spécifique et intègre les fonctions logiques propres à l'affichage de la page concernée.
* **`/services`** : Regroupe toute la logique de communication avec les sources de données externes. Ce dossier centralise l'ensemble des requêtes, isolant ainsi la complexité technique des composants visuels.
* **`/router`** : Contient la configuration de l'aiguillage de l'application. Ce module gère la navigation entre les différentes pages de manière fluide et sécurisée.
* **`/assets`** : Répertorie les ressources statiques. Actuellement, il centralise les fichiers CSS nécessaires au design de l'interface.

## 3. Fichiers de Configuration et Standards
Les autres dossiers et fichiers présents à la racine sont les fichiers de configuration générés par défaut par l'environnement de développement. Ils assurent la gestion des dépendances, la compilation du code et la compatibilité du projet avec les standards de production actuels.

## 4. Bénéfices de cette Structure
Cette organisation structurée offre plusieurs avantages majeurs :
1.  **Lisibilité :** Un développeur peut localiser une fonctionnalité ou un bug instantanément grâce au nommage explicite des dossiers.
2.  **Sécurité et Fiabilité :** En isolant les requêtes dans le dossier `/services`, on limite les risques d'erreurs lors des manipulations de données.
3.  **Évolutivité :** L'ajout d'une nouvelle fonctionnalité se fait par simple ajout d'un module dans `/pages` et `/services` sans impacter le reste du système.