# Guide du Développeur

Ce guide fournit des informations essentielles pour les développeurs travaillant sur le projet PharmaciEfficace.

## 🏗 Structure du Projet

```
src/
├── assets/          # Fichiers statiques (images, polices, etc.)
├── components/      # Composants réutilisables
├── config/         # Fichiers de configuration
├── hooks/          # Hooks personnalisés
├── layouts/        # Mises en page de l'application
├── lib/            # Bibliothèques et utilitaires
├── pages/          # Composants de page
├── services/       # Appels API et services
├── stores/         # Gestion d'état (Zustand)
├── styles/         # Styles globaux et thèmes
├── types/          # Définitions de types TypeScript
└── utils/          # Fonctions utilitaires
```

## 🛠 Configuration de l'Environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
VITE_API_URL=https://api.pharmacie-efficace.bj
VITE_APP_ENV=development
VITE_GOOGLE_MAPS_API_KEY=votre_cle_api
```

## 🚀 Commandes Utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Construit l'application pour la production |
| `npm run preview` | Prévoyez la version de production localement |
| `npm run lint` | Exécute le linter |
| `npm run format` | Formate le code avec Prettier |
| `npm test` | Exécute les tests unitaires |
| `npm run test:coverage` | Exécute les tests avec couverture de code |

## 🧪 Tests

Les tests sont organisés comme suit :

- `__tests__/` : Dossier racine pour tous les tests
  - `unit/` : Tests unitaires
  - `integration/` : Tests d'intégration
  - `e2e/` : Tests de bout en bout

Pour exécuter les tests :

```bash
# Tous les tests
npm test

# Tests en mode watch
npm test -- --watch

# Couverture de code
npm run test:coverage
```

## 🔄 Workflow Git

1. Créez une branche à partir de `main`
2. Nommez votre branche : `feature/nom-de-la-fonctionnalité` ou `fix/nom-du-correctif`
3. Soumettez une Pull Request vers `main`
4. Assurez-vous que tous les tests passent
5. Obtenez au moins une approbation avant de fusionner

## 🛠 Outils Recommandés

- [VS Code](https://code.visualstudio.com/)
  - Extensions recommandées :
    - ESLint
    - Prettier
    - Tailwind CSS IntelliSense
    - GitLens

## 📚 Ressources

- [Documentation React](https://reactjs.org/docs/getting-started.html)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Guide Tailwind CSS](https://tailwindcss.com/docs)
- [Guide Vite](https://vitejs.dev/guide/)
