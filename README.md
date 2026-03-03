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

**Backend (Évolution)** : Actuellement, nos données sont gérées via My JSON Server pour simuler un backend car nous allons le faire lors d'un prochain projet Cette structure nous permet d'affiner l'architecture de nos données tout en développant activement un backend personnalisé plus robuste, capable de supporter une montée en charge importante et de garantir la sécurité de vos échanges.

## Analyse des maquettes
### Vision et Intention de Design
Le design de Passion Lecture a été pensé pour instaurer une atmosphère de "bibliothèque numérique" chaleureuse. Nous avons opté pour une esthétique néo-rétro :

Palette chromatique : L'utilisation de tons sépia et crème réduit la fatigue oculaire et rappelle le grain du papier, contrastant avec les interfaces souvent trop froides des réseaux sociaux actuels.

Expérience Utilisateur (UX) : L'objectif est la simplicité. L'accès aux fonctionnalités clés (ajout, consultation, profil) est direct, minimisant le nombre de clics pour l'utilisateur.

### Analyse Détaillée de l'Architecture des Pages
A. Accueil et Bibliothèque (Interface de Découverte)
Structure en Grille : Nous avons choisi une disposition en "Cards" pour les livres. Chaque carte présente visuellement la couverture, le titre et l'auteur, mais aussi l'utilisateur contributeur, afin de valoriser l'aspect communautaire du site.

<img width="720" height="512" alt="Home" src="https://github.com/user-attachments/assets/1ed22dea-fc03-4c84-b78e-1cdbfb4cd96d" />

Système de Filtrage : La page bibliothèque intègre une barre de catégories horizontale. Ce choix permet un accès rapide aux genres littéraires sans encombrer l'espace visuel principal.

<img width="720" height="512" alt="bibliothèque" src="https://github.com/user-attachments/assets/79af123c-ddb7-4070-9aae-17b4ce3d03d6" />

B. Fiche Détail et Engagement
Hiérarchie Informationnelle : La fiche livre sépare clairement le visuel (gauche) des métadonnées (droite). L'intégration d'une note étoilée et d'un résumé court permet une évaluation rapide de l'intérêt de l'ouvrage.

Appels à l'Action : Des liens directs comme "Commencer à lire" (pour les extraits) et "Commentaire" incitent à l'interaction immédiate avec le contenu.

<img width="720" height="512" alt="détail livre" src="https://github.com/user-attachments/assets/7a18fb3a-78a7-4b0c-8153-94cd5837f160" />

C. Flux de Gestion (Ajout et Modification)
Formulaires Standardisés : Pour garantir la cohérence des données, nous avons conçu des formulaires identiques pour l'ajout et l'édition. Ils couvrent l'essentiel : métadonnées techniques (pages, éditeur), contenu (résumé) et ressources externes (lien d'extrait, couverture).

<img width="720" height="512" alt="ajouter" src="https://github.com/user-attachments/assets/bb1bd8e8-eacf-4311-b4d6-fbe0b10ea6d6" />

Sécurité et Contrôle : L'interface de modification propose une option de suppression distincte pour éviter les erreurs de manipulation tout en offrant une gestion complète à l'utilisateur.

<img width="720" height="512" alt="modifier" src="https://github.com/user-attachments/assets/17eee588-35b4-4477-915e-38ed00e7495f" />

D. Espace Personnel et Authentification
Gamification et Statistiques : Le profil utilisateur ne se limite pas à un nom ; il affiche le volume d'activité (ouvrages partagés, commentaires). Cela encourage l'engagement des membres au sein de la communauté.

<img width="720" height="512" alt="détail user" src="https://github.com/user-attachments/assets/547a17e3-7d1b-4d3d-8707-55de0e2afd90" />

Interface de Connexion : Nous avons privilégié une fenêtre modale épurée avec un arrière-plan flou (blur effect) pour maintenir le contexte visuel de l'utilisateur tout en isolant la tâche de connexion.

<img width="720" height="512" alt="login" src="https://github.com/user-attachments/assets/b0edc564-762b-4cb9-80e1-30c841a14af3" />
