# ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

## Salwadev

Salwadev est une application web moderne construite avec Next.js et React, offrant une interface utilisateur intuitive pour la gestion des utilisateurs, des factures, des tickets de support et d'autres fonctionnalités essentielles pour les entreprises. Ce projet vise à simplifier les interactions entre les clients et les services, tout en fournissant des outils d'analyse et de gestion.

### Fonctionnalités clés

- **Gestion des utilisateurs** : Inscription, connexion, et gestion des profils utilisateurs.
- **Facturation** : Suivi des factures et des méthodes de paiement.
- **Support client** : Système de tickets pour la gestion des demandes de support.
- **Analytique** : Outils d'analyse pour suivre les performances des services.
- **Interface utilisateur réactive** : Conçue avec Tailwind CSS pour une expérience utilisateur fluide.

## Tech Stack

| Technologie    | Description                                   |
|----------------|-----------------------------------------------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)  | Environnement d'exécution JavaScript côté serveur. |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)         | Bibliothèque JavaScript pour construire des interfaces utilisateur. |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | Framework React pour le rendu côté serveur et la génération de sites statiques. |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white) | Framework CSS utilitaire pour des conceptions modernes. |

## Instructions d'installation

### Prérequis

- Node.js (version 14 ou supérieure)
- npm (ou yarn)

### Étapes d'installation

1. **Clonez le dépôt**
   ```bash
   git clone https://github.com/Soofmax/salwadev.git
   cd salwadev
   ```

2. **Installez les dépendances**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement**
   - Renommez le fichier `.env.example` en `.env` et configurez les variables d'environnement selon vos besoins.

4. **Démarrez le serveur de développement**
   ```bash
   npm run dev
   ```

5. **Accédez à l'application**
   Ouvrez votre navigateur et allez à [http://localhost:3000](http://localhost:3000).

## Utilisation

Après avoir démarré le serveur, vous pouvez naviguer dans l'application pour explorer les différentes fonctionnalités. Les principales pages incluent :

- **Tableau de bord** : Vue d'ensemble des statistiques et des performances.
- **Gestion des utilisateurs** : Créer, modifier et supprimer des utilisateurs.
- **Facturation** : Gérer les factures et les méthodes de paiement.
- **Support** : Soumettre et gérer des tickets de support.

## Structure du projet

Voici un aperçu de la structure du projet :

```
salwadev/
├── app/                     # Contient les pages et composants de l'application
│   ├── (admin)/             # Pages et composants pour les administrateurs
│   ├── (app)/               # Pages et composants pour les utilisateurs
│   ├── (marketing)/         # Pages de marketing
│   ├── api/                 # API pour l'authentification
│   ├── components/          # Composants réutilisables
│   ├── globals.css          # Styles globaux
│   ├── layout.tsx           # Mise en page principale
│   ├── page.tsx             # Page d'accueil
│   └── providers.tsx        # Fournisseurs de contexte
├── hooks/                   # Hooks personnalisés
├── lib/                     # Logique métier et constantes
├── public/                  # Fichiers publics (images, favicon)
├── .env.example             # Exemple de fichier d'environnement
├── package.json             # Dépendances et scripts du projet
└── README.md                # Documentation du projet
```

### Explication des fichiers principaux

- `app/layout.tsx` : Définit la mise en page générale de l'application.
- `app/page.tsx` : Point d'entrée de l'application.
- `components/` : Contient tous les composants réutilisables de l'application.
- `lib/` : Contient la logique métier, les actions et les constantes.

## Contribuer

Les contributions sont les bienvenues ! Pour contribuer, veuillez suivre ces étapes :

1. Forkez le projet.
2. Créez une nouvelle branche (`git checkout -b feature/YourFeature`).
3. Apportez vos modifications et validez (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`).
4. Poussez vos modifications (`git push origin feature/YourFeature`).
5. Ouvrez une Pull Request.

Nous apprécions toutes les contributions, qu'elles soient grandes ou petites !
