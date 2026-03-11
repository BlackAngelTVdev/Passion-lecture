# Rapport

## Introduction

Notre plateforme est née d'une ambition simple : offrir aux amoureux de la lecture un espace universel pour explorer, partager et évaluer leurs découvertes littéraires. Que vous soyez un lecteur occasionnel ou un bibliophile passionné, notre site vous permet de connecter vos lectures avec celles d'une communauté mondiale, transformant l'acte solitaire de lire en une expérience sociale enrichissante.

### Des fonctionnalités au service de la passion

Le site s'articule autour de trois piliers interactifs :

**Création et Référencement** : Contribuez à notre base de données en ajoutant vos ouvrages favoris.

**Critiques et Notations** : Exprimez votre avis grâce à un système de notation intuitif et laissez des commentaires détaillés pour guider les autres lecteurs.

**Partage Mondial** : Découvrez des pépites littéraires issues de cultures variées et échangez avec des utilisateurs du monde entier.

### Notre Architecture Technique

Pour garantir une expérience utilisateur fluide et réactive, nous avons fait des choix technologiques modernes :

**Frontend** : Nous utilisons Vue.js, un framework progressif qui nous permet de construire une interface dynamique, rapide et parfaitement adaptée à la navigation sur tous les supports.

**Backend (Évolution)** : Actuellement, nos données sont gérées via My JSON Server pour simuler un backend car nous allons le faire lors d'un prochain projet. Cette structure nous permet d'affiner l'architecture de nos données tout en développant activement un backend personnalisé plus robuste, capable de supporter une montée en charge importante et de garantir la sécurité de vos échanges.

## Analyse des maquettes
### Vision et Intention de Design
Le design de Passion Lecture a été pensé pour instaurer une atmosphère de "bibliothèque numérique" chaleureuse. Nous avons opté pour une esthétique néo-rétro :

Palette chromatique : L'utilisation de tons sépia et crème réduit la fatigue oculaire et rappelle le grain du papier, contrastant avec les interfaces souvent trop froides des réseaux sociaux actuels.

Expérience Utilisateur (UX) : L'objectif est la simplicité. L'accès aux fonctionnalités clés (ajout, consultation, profil) est direct, minimisant le nombre de clics pour l'utilisateur.

### Analyse Détaillée de l'Architecture des Pages
#### A. Accueil et Bibliothèque (Interface de Découverte)
Structure en Grille : Nous avons choisi une disposition en "Cards" pour les livres. Chaque carte présente visuellement la couverture, le titre et l'auteur, mais aussi l'utilisateur contributeur, afin de valoriser l'aspect communautaire du site.

<img width="720" height="512" alt="Home" src="https://github.com/user-attachments/assets/1ed22dea-fc03-4c84-b78e-1cdbfb4cd96d" />

Système de Filtrage : La page bibliothèque intègre une barre de catégories horizontale. Ce choix permet un accès rapide aux genres littéraires sans encombrer l'espace visuel principal.

<img width="720" height="512" alt="bibliothèque" src="https://github.com/user-attachments/assets/79af123c-ddb7-4070-9aae-17b4ce3d03d6" />

#### B. Fiche Détail et Engagement
Hiérarchie Informationnelle : La fiche livre sépare clairement le visuel (gauche) des métadonnées (droite). L'intégration d'une note étoilée et d'un résumé court permet une évaluation rapide de l'intérêt de l'ouvrage.

Appels à l'Action : Des liens directs comme "Commencer à lire" (pour les extraits) et "Commentaire" incitent à l'interaction immédiate avec le contenu.

<img width="720" height="512" alt="détail livre" src="https://github.com/user-attachments/assets/7a18fb3a-78a7-4b0c-8153-94cd5837f160" />

#### C. Flux de Gestion (Ajout et Modification)
Formulaires Standardisés : Pour garantir la cohérence des données, nous avons conçu des formulaires identiques pour l'ajout et l'édition. Ils couvrent l'essentiel : métadonnées techniques (pages, éditeur), contenu (résumé) et ressources externes (lien d'extrait, couverture).

<img width="720" height="512" alt="ajouter" src="https://github.com/user-attachments/assets/bb1bd8e8-eacf-4311-b4d6-fbe0b10ea6d6" />

Sécurité et Contrôle : L'interface de modification propose une option de suppression distincte pour éviter les erreurs de manipulation tout en offrant une gestion complète à l'utilisateur.

<img width="720" height="512" alt="modifier" src="https://github.com/user-attachments/assets/17eee588-35b4-4477-915e-38ed00e7495f" />

#### D. Espace Personnel et Authentification
Gamification et Statistiques : Le profil utilisateur ne se limite pas à un nom ; il affiche le volume d'activité (ouvrages partagés, commentaires). Cela encourage l'engagement des membres au sein de la communauté.

<img width="720" height="512" alt="détail user" src="https://github.com/user-attachments/assets/547a17e3-7d1b-4d3d-8707-55de0e2afd90" />

Interface de Connexion : Nous avons privilégié une fenêtre modale épurée avec un arrière-plan flou (blur effect) pour maintenir le contexte visuel de l'utilisateur tout en isolant la tâche de connexion.

<img width="720" height="512" alt="login" src="https://github.com/user-attachments/assets/b0edc564-762b-4cb9-80e1-30c841a14af3" />

## 3. Analyse de la planification

Conformément aux exigences du projet, nous avons utilisé l'outil GitHub Projects pour structurer notre flux de travail. Notre méthodologie de planification s'est déroulée en deux phases distinctes :

### Initialisation basée sur le CDC

La première phase a consisté en une lecture approfondie du cahier des charges. Nous avons traduit les exigences fonctionnelles en tâches techniques concrètes.

**Issues 1 à 12 :** Ces douze premières tâches ont été créées directement à partir des spécifications du document de référence. Elles couvraient les piliers du projet : configuration de Vue.js, mise en place de Vue Router, et l'implémentation de la simulation backend avec JSON Server.

### Adaptation itérative

Dans une seconde phase, nous avons complété notre carnet de produit (backlog) au fur et à mesure de l'avancement. Des issues supplémentaires ont été ouvertes pour adresser des éléments qui n'avaient pas été anticipés lors de la planification initiale ou pour corriger des oublis techniques identifiés lors des phases de tests. Cette approche nous a permis de rester agiles et de garantir que le produit final soit conforme aux attentes professionnelles.

## Critique constructive sur la planification

L'analyse de notre gestion du temps et des tâches révèle plusieurs points d'apprentissage :

**Efficacité du CDC :** Le fait d'avoir basé nos 12 premières issues directement sur le cahier des charges nous a permis de démarrer rapidement avec une vision claire des objectifs SMART du projet. Cela a assuré une couverture complète des fonctionnalités de base dès le début du développement.

- **Gestion des imprévus :** Bien que la planification initiale ait été solide, l'ajout de tâches pour des "oublis" montre que notre analyse préliminaire aurait pu être plus exhaustive. Cependant, la flexibilité offerte par GitHub Projects nous a permis d'intégrer ces ajustements sans désorganiser le reste de l'équipe.

## 1. Architecture Globale
Le projet Passion-lecture adopte une architecture modulaire et composante. Cette approche permet une séparation nette entre la logique métier et l'interface utilisateur. L'organisation du code a été pensée pour favoriser la maintenabilité, l'extensibilité et une prise en main rapide par de nouveaux développeurs.

## 2. Organisation du Code Source 
L'arborescence est segmentée par responsabilités afin de respecter le principe de séparation des préoccupations :

* **`/components`** : Centralise les éléments visuels réutilisables (Header, Footer, formulaires de Login/Register). Cette modularité permet d'éviter la duplication de code et garantit une cohérence graphique sur l'ensemble de l'application.
* **`/pages`** : Contient les vues principales de l'application. Chaque fichier correspond à une route spécifique et intègre les fonctions logiques propres à l'affichage de la page concernée.
* **`/services`** : Regroupe toute la logique de communication avec les sources de données externes. Ce dossier centralise l'ensemble des requêtes, isolant ainsi la complexité technique des composants visuels.
* **`/router`** : Contient la configuration de l'aiguillage de l'application. Ce module gère la navigation entre les différentes pages de manière fluide et sécurisée.
* **`/assets`** : Répertorie les ressources statiques. Actuellement, il centralise les fichiers CSS nécessaires au design de l'interface.

## 3. Fichiers de Configuration et Standards
Les autres dossiers et fichiers présents à la racine sont les fichiers de configuration générés par défaut par l'environnement de développement. Ils assurent la gestion des dépendances, la compilation du code et la compatibilité du projet avec les standards de production actuels.

## 4. Bénéfices de cette Structure
Cette organisation structurée offre plusieurs avantages majeurs :
1. **Lisibilité :** Un développeur peut localiser une fonctionnalité ou un bug instantanément grâce au nommage explicite des dossiers.
2. **Sécurité et Fiabilité :** En isolant les requêtes dans le dossier `/services`, on limite les risques d'erreurs lors des manipulations de données.
3. **Évolutivité :** L'ajout d'une nouvelle fonctionnalité se fait par simple ajout d'un module dans `/pages` et `/services` sans impacter le reste du système.


## Analyse des Fonctionnalités Techniques

Le projet intègre plusieurs briques technologiques essentielles pour répondre aux besoins des lecteurs :

### 1. Système d'Authentification
* **Description :** Permet de sécuriser l'accès à certaines pages.
* **Technique :** la requête à l'api se fait directement dans la page même pour des raisons de simplicité et d'intégration, nous avons choisi de séparer cette partie.

### 2. Gestion du Catalogue
* **Description :** Permet d'ajouter, lire, modifier ou supprimer des livres de sa bibliothèque.
* **Technique :** Les fonctions situées dans `/pages` pilotent les données via les requêtes centralisées. L'utilisateur peut commenter un livre en 1 clic.

### 3. Routage Dynamique
* **Description :** Navigation instantanée entre la bibliothèque et le profil.
* **Technique :** Le module `/router` intercepte les changements d'URL pour charger le contenu sans recharger la page entière.

### 4. Centralisation des Services
* **Description :** Unification de la logique réseau.
* **Technique :** En centralisant les requêtes dans `/services`, la maintenance est simplifiée : une modification sur la source de données s'applique instantanément à tout le projet sans risquer de briser l'interface.

## organisation du groupe 
Pour garantir la réussite de ce projet, notre équipe a adopté une structure de travail rigoureuse dès le lancement. Nous avons débuté par la création d'un Backlog complet, nous permettant de lister et de hiérarchiser l'ensemble des tâches à accomplir.

### Une progression logique et par étapes
Notre flux de travail a suivi une suite logique pour assurer une base technique solide :

**Conception visuelle** : Réalisation des maquettes pour fixer l'identité de la plateforme.

**Architecture Backend** : Mise en place de l'API (actuellement via My JSON Server).

**Composants Structurels** : Développement des éléments globaux, tels que le header et le footer, afin d'unifier l'interface.

Une fois ces fondations posées, chaque membre du groupe a choisi les fonctionnalités à développer selon ses affinités. Nous avons priorisé les pages de base (Accueil et Liste de livres), pour évoluer progressivement vers des vues plus complexes comme les pages de détails, avant de conclure par les modules de gestion des utilisateurs.

### Harmonie visuelle et gestion technique
Le défi esthétique a été relevé grâce à une gestion centralisée du CSS. Pour respecter scrupuleusement les maquettes tout en travaillant de manière décentralisée, nous avons utilisé un fichier var.css. Ce dernier regroupe l'ensemble des variables de couleurs, garantissant une parfaite cohérence visuelle sur toutes les pages, indépendamment du développeur en charge.

### Contrôle qualité et collaboration
Afin d'optimiser le développement et de limiter les conflits de fusion (merges) lors des commits, nous avons appliqué une règle stricte : chaque page est attribuée à une seule personne.

En phase finale, Gianmarco a endossé le rôle de responsable qualité. Il a effectué une vérification croisée entre le Cahier des Charges (CDC), les maquettes et le code produit. Cet audit interne a permis d'identifier les derniers ajustements nécessaires, de redistribuer les ultimes tâches et d'obtenir une vision claire et précise de l'état d'avancement du projet.

## Conclusion Générale

Dans l'ensemble, le projet a été mené avec succès, bien que l'aspect technique relève parfois du "bricolage" par nécessité.

Comme mentionné dans nos bilans personnels, l'absence de backend a considérablement complexifié notre tâche. Nous avons été contraints de redoubler d'ingéniosité pour simuler la gestion des données via des outils tiers et du cache local, ce qui donne au projet un caractère parfois artisanal. Malgré ce manque de structures professionnelles en amont, nous avons réussi à livrer une application fonctionnelle et cohérente qui répond aux objectifs fixés.

## Conclusion personnelle : Projet Passion Lecture

**Par : Damien**

### Retours sur l'expérience technique

Ce projet a été un véritable apprentissage. Bien que j'aie énormément progressé, mon avis sur Vue.js reste mitigé. J'ai trouvé la mise en place du framework particulièrement complexe dans un contexte (sans véritable backend). Devoir simuler la persistance des données et gérer les états sans une base de données ajoute une couche de difficulté qui peut être frustrante.

### Collaboration et transmission

L'absence d'Albert pendant la première semaine a finalement été une opportunité pédagogique. Pour le remettre à niveau, nous avons dû lui expliquer en détail l'intégralité de l'architecture et les choix techniques effectués.

Cet exercice de vulgarisation m'a permis de :

- Valider mes acquis : Transmettre le savoir confirme la maîtrise technique.
- Prendre du recul : Observer mon code via un regard extérieur pour en valider la structure.
- Renforcer la cohésion : Créer un socle de connaissances commun indispensable à la réussite du groupe.

**Par : Gianmarco**

Pour ma part, ce projet a été particulièrement enrichissant. Bien que la séparation technique du frontend et du backend en deux projets distincts m'ait initialement semblé complexe à appréhender, cette expérience m'a permis de mieux comprendre les enjeux d'une architecture découplée. J'ai également noté qu'un cahier des charges (CDC) plus clair aurait été préférable ; cela nous aurait évité de développer certaines fonctionnalités qui, au final, se sont révélées facultatives.

Je tire néanmoins un bilan très positif de cette aventure. Travailler en équipe avec deux camarades a été une excellente expérience, tant sur le plan humain que technique. Ce fut bien plus stimulant que de mener un projet en solitaire. Enfin, ce travail pratique a constitué l'occasion idéale de mettre en application concrète la théorie apprise en amont, consolidant ainsi durablement mes compétences en développement.

**Par : Albert**

Ma participation à ce projet a été marquée par une absence forcée durant la première semaine en raison d'une mononucléose. À mon retour, les fondations structurelles — notamment les maquettes, la majorité des pages et l'architecture de l'API — étaient déjà posées. Grâce à la pédagogie des membres de mon groupe, qui ont pris le temps de m'expliquer les choix techniques, j'ai pu rapidement m'intégrer au flux de travail et apporter ma touche personnelle au projet, notamment sur les fonctionnalités de connexion et le module d'ajout de livres.

Une réflexion sur l'architecture

D'un point de vue technique, j'ai trouvé que la réalisation de cette application sans un véritable backend était paradoxalement plus complexe et souvent contre-intuitive. Devoir simuler la persistance des données et les interactions serveurs uniquement côté client demande une gymnastique d'esprit particulière, alors que faire le backend en premier pour ensuite apprendre à utiliser un outil comme curl est je trouve plus intéressant.
