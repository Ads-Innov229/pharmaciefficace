# Architecture du Projet

Ce document décrit l'architecture technique de l'application PharmaciEfficace.

## 📐 Architecture Globale

L'application suit une architecture basée sur les composants avec les caractéristiques suivantes :

- **Framework** : React 18+ avec TypeScript
- **Bundler** : Vite
- **Styling** : Tailwind CSS avec plugins
- **Gestion d'état** : Zustand
- **Requêtes API** : TanStack Query
- **Validation** : Zod
- **Tests** : Vitest et Testing Library

## 🏗 Structure des Dossiers

```
src/
├── assets/          # Fichiers statiques
│   ├── images/     # Images
│   ├── fonts/      # Polices
│   └── styles/     # Styles globaux
│
├── components/     # Composants partagés
│   ├── ui/        # Composants UI de base
│   ├── forms/     # Composants de formulaire
│   └── layout/    # Composants de mise en page
│
├── config/        # Configuration de l'application
│   ├── routes.ts  # Configuration des routes
│   └── theme.ts   # Thème de l'application
│
├── hooks/         # Hooks personnalisés
├── lib/           # Bibliothèques tierces configurées
├── pages/         # Composants de page
├── services/      # Appels API
│   ├── api.ts    # Instance d'API
│   └── auth.ts   # Service d'authentification
│
├── stores/        # Gestion d'état (Zustand)
│   ├── useAuthStore.ts
│   └── useUIStore.ts
│
└── utils/         # Utilitaires
    ├── helpers.ts
    └── validators.ts
```

## 🔄 Flux de Données

1. **Composants** : Affichent l'UI et déclenchent des actions
2. **Stores (Zustand)** : Gèrent l'état global de l'application
3. **Services** : Effectuent les appels API et gèrent la logique métier
4. **API** : Communiquent avec le backend

## 🚀 Performance

- **Chargement paresseux** des routes avec `React.lazy`
- **Code Splitting** automatique avec Vite
- **Optimisation des images** avec Vite
- **Mémoization** des composants avec `React.memo`
- **Mise en cache** des requêtes avec TanStack Query

## 🔒 Sécurité

- Validation des entrées avec Zod
- Gestion sécurisée des tokens d'authentification
- Protection des routes sensibles
- Headers de sécurité CSP

## 📱 Responsive Design

L'application est conçue avec une approche mobile-first et utilise les utilitaires de Tailwind CSS pour s'adapter à toutes les tailles d'écran.

## 🔄 Gestion des Événements

- Événements utilisateur : Gérés par les gestionnaires d'événements React
- Événements globaux : Gérés par un EventEmitter personnalisé
- Événements d'application : Gérés par les stores Zustand

## 📊 Monitoring et Analyse

- Suivi des erreurs avec Sentry
- Analytics avec Google Analytics
- Logs de performance

## 🔄 Cycle de Vie des Données

1. **Chargement** : Les données sont chargées via des hooks personnalisés
2. **Mise en cache** : Les données sont mises en cache avec TanStack Query
3. **Mise à jour** : Les mises à jour déclenchent des requêtes de mutation
4. **Nettoyage** : Le cache est nettoyé lors de la déconnexion

## 🧠 Bonnes Pratiques

- Un composant = une responsabilité
- Props en lecture seule
- État local pour l'UI, état global pour les données partagées
- Tests unitaires pour la logique métier
- Tests d'intégration pour les flux utilisateur critiques
