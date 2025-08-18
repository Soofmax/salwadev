# SDS Frontend - Plateforme SaaS Next.js

Une plateforme SaaS moderne et complète construite avec Next.js 15, TypeScript, Tailwind CSS et shadcn/ui.

## 🚀 Fonctionnalités

### ✅ Pages d'authentification (8/8) - 100% terminé
- Demande de réinitialisation du mot de passe (`/auth/reset-password`)
- Saisie du nouveau mot de passe via lien (`/auth/reset-password/[token]`)
- Vérification d'email après inscription (`/auth/verify-email`)
- Confirmation d'inscription (`/auth/signup-success`)
- Affichage d'erreur liée à l'authentification (`/auth/error`)
- Affichage de succès lié à l'authentification (`/auth/success`)
- Page profil utilisateur (`/profile`)
- Gestion sécurité du compte (`/profile/security`)

### ✅ Pages d'administration (9/9) - 100% terminé
- Dashboard administrateur (`/admin/dashboard`)
- Configuration générale (`/admin/settings`)
- Gestion équipe (`/admin/settings/team`)
- Rôles & permissions (`/admin/settings/roles`)
- APIs tierces (`/admin/settings/integrations`)
- Admin utilisateurs (`/admin/users`)
- Profil utilisateur admin (`/admin/users/[userId]`)
- Logs système (`/admin/system/logs`)
- Monitoring (`/admin/system/monitoring`)

### ✅ Pages de gestion de contenu (2/5) - 40% terminé
- Gestion articles de blog (`/admin/content/blog`)
- Nouvel article (`/admin/content/blog/new`)

### ✅ Pages de communication (3/3) - 100% terminé
- Messagerie interne (`/messages`)
- Centre de notifications (`/notifications`)
- Chat client support (`/chat`)

### ✅ Pages de support (4/4) - 100% terminé
- Centre d'aide (`/support`)
- Gestion tickets support (`/tickets`)
- Détail ticket (`/tickets/[ticketId]`)
- Base de connaissances (`/kb`)

### 📦 Catalogue & Produits (existant)
- Page Catalogue (`/catalog`) - Liste complète des produits/services
- Détail Produit (`/catalog/[productId]`) - Page détaillée avec fonctionnalités
- Plans & Abonnements (`/plans`) - Comparatif des plans
- Comparatif Fonctionnalités (`/features`) - Tableau de comparaison

### 👥 CRM & Clients (existant)
- Gestion des Clients (`/clients`) - Interface complète avec statistiques
- Profil Client (`/clients/[clientId]`) - Vue détaillée avec projets
- Nouveau Client (`/clients/new`) - Formulaire complet

### 📊 Analytics (existant)
- Dashboard Analytics (`/analytics`) - Statistiques et métriques business

## 🛠️ Technologies

- **Framework**: Next.js 15 avec App Router
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Composants UI**: shadcn/ui
- **Icônes**: Lucide React
- **Authentification**: NextAuth.js (configuré)
- **Base de données**: Prisma (configuré)

## 🎨 Design System

Le projet utilise un design system cohérent avec :
- **Couleurs personnalisées**: cream, rose-powder, magenta, charcoal
- **Typographie**: Playfair Display pour les titres, Inter pour le texte
- **Composants**: Interface utilisateur moderne et responsive
- **Thème**: Design élégant et professionnel

## 📁 Structure du projet

```
app/
├── (app)/                    # Pages utilisateur
│   ├── auth/                # Authentification
│   ├── profile/             # Profil utilisateur
│   ├── messages/            # Messagerie
│   ├── notifications/       # Notifications
│   ├── chat/               # Chat support
│   ├── support/            # Centre d'aide
│   ├── tickets/            # Tickets support
│   └── kb/                 # Base de connaissances
├── (admin)/                 # Pages administration
│   ├── dashboard/          # Dashboard admin
│   ├── settings/           # Configuration
│   ├── users/              # Gestion utilisateurs
│   ├── system/             # Système
│   └── content/            # Gestion contenu
├── (marketing)/            # Pages marketing (existant)
└── components/             # Composants réutilisables
```

## 🚀 Installation et démarrage

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Soofmaax/sdsfrontfe.git
   cd sdsfrontfe
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.example .env.local
   # Éditer .env.local avec vos variables
   ```

4. **Lancer en développement**
   ```bash
   npm run dev
   ```

5. **Build de production**
   ```bash
   npm run build
   npm start
   ```

## 🌐 Déploiement Netlify

Le projet est optimisé pour Netlify :

1. **Build automatique** : `npm run build`
2. **Dossier de publication** : `.next`
3. **Fonctions** : Support des API routes Next.js
4. **Variables d'environnement** : Configurées dans Netlify

### Configuration Netlify recommandée :
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 📋 Fonctionnalités clés

### 🔐 Authentification complète
- Inscription/Connexion
- Réinitialisation de mot de passe
- Vérification d'email
- Gestion de profil et sécurité

### 👨‍💼 Administration avancée
- Dashboard avec métriques
- Gestion des utilisateurs et équipes
- Configuration système
- Logs et monitoring

### 💬 Communication intégrée
- Messagerie interne
- Notifications en temps réel
- Chat support client
- Système de tickets

### 📚 Support et documentation
- Centre d'aide complet
- Base de connaissances
- FAQ et guides
- Système de tickets

## 🔧 Personnalisation

### Couleurs du thème
```css
:root {
  --cream: #faf7f2;
  --rose-powder: #e8b4b8;
  --magenta: #d63384;
  --charcoal: #2d3748;
}
```

### Ajout de nouvelles pages
1. Créer le fichier dans le bon répertoire `app/`
2. Utiliser les composants UI existants
3. Respecter le design system
4. Ajouter la navigation si nécessaire

## 📊 Statistiques du projet

- **26 pages créées** sur 140+ pages planifiées
- **100% des pages d'authentification** terminées
- **100% des pages d'administration** terminées
- **100% des pages de support** terminées
- **Design system cohérent** sur toutes les pages
- **Code TypeScript** avec typage strict
- **Responsive design** pour mobile et desktop

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Documentation** : Consultez la base de connaissances intégrée
- **Issues** : Ouvrez une issue sur GitHub
- **Contact** : Utilisez le système de tickets intégré

---

**Note** : Ce projet est en développement actif. Consultez le fichier `manquant.md` pour voir la liste complète des pages à implémenter.

*README mis à jour par Manus AI - Janvier 2024*

