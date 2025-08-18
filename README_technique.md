# Architecture Technique et Données (Mock)

Ce document décrit l'architecture de données mise en place pour la simulation (mocking) du backend, ainsi que les fichiers de service qui devront être adaptés lors de l'intégration d'un véritable backend.

## Architecture de Données (Mocking)

Pour permettre le développement et la démonstration du frontend sans dépendre d'un backend réel, toutes les données sont actuellement simulées localement. Ces données sont centralisées dans le répertoire `src/data/mocks`.

Chaque entité (utilisateurs, tickets, articles, etc.) possède son propre fichier de mock, exportant un tableau d'objets JavaScript représentant les données. Les composants et pages du frontend appellent directement ces fichiers de mock au lieu de faire des requêtes réseau.

Exemple de structure :

```
src/data/mocks/
├── mockUsers.ts
├── mockTickets.ts
├── mockArticles.ts
└── ... (autres fichiers de mock)
```

## Fichiers de Service à Modifier pour le Backend Réel

Lors de l'intégration d'un backend réel, les fichiers suivants (ou des fichiers similaires si la structure évolue) devront être modifiés pour remplacer les appels aux données mockées par de véritables requêtes API (fetch, axios, etc.) :

*   `src/services/userService.ts` (à créer si inexistant, pour la gestion des utilisateurs)
*   `src/services/ticketService.ts` (à créer si inexistant, pour la gestion des tickets)
*   `src/services/articleService.ts` (à créer si inexistant, pour la gestion des articles de blog)
*   `src/app/api/auth/[...nextauth]/route.ts` (pour l'intégration de l'authentification réelle avec le backend)

**Note importante** : Actuellement, ces fichiers de service peuvent ne pas exister ou être très rudimentaires. L'objectif est de les créer ou de les adapter pour qu'ils gèrent les interactions avec le backend, en remplaçant les appels directs aux fichiers de mock. Il sera nécessaire de définir les endpoints API et les méthodes de requête appropriées (GET, POST, PUT, DELETE).


