# Guide de Style

Ce document définit les conventions de codage pour le projet PharmaciEfficace.

## 🎨 Conventions Générales

- **Indentation** : 2 espaces
- **Guillemets** : Simple (`'`) pour le JavaScript/TypeScript, double (`"`) pour le JSX
- **Point-virgule** : Oui
- **Encodage** : UTF-8
- **Fin de ligne** : LF (Unix)

## 📝 Conventions de Nommage

- **Composants** : `PascalCase` (`UserProfile.tsx`)
- **Fonctions/Variables** : `camelCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Fichiers** : `kebab-case` pour les fichiers non-composants
- **Interfaces/Types** : `PascalCase` avec préfixe `I` pour les interfaces (`IUser`)
- **Hooks personnalisés** : Préfixe `use` (`useAuth`)

## 🏗 Structure des Fichiers

Un composant typique devrait être organisé comme suit :

```typescript
// 1. Imports externes
import React from 'react';

// 2. Imports internes
import { Button } from '@/components/ui/Button';

// 3. Types/Interfaces
interface IUserProfileProps {
  name: string;
  age: number;
  onUpdate: (data: UserData) => void;
}

// 4. Constantes
const MAX_NAME_LENGTH = 50;

// 5. Composant
const UserProfile: React.FC<IUserProfileProps> = ({ name, age, onUpdate }) => {
  // 6. Hooks
  const [isEditing, setIsEditing] = React.useState(false);
  
  // 7. Handlers
  const handleUpdate = () => {
    // Logique de mise à jour
  };
  
  // 8. Rendu
  return (
    <div className="user-profile">
      <h2>{name}</h2>
      <p>Âge: {age}</p>
      <Button onClick={handleUpdate}>
        Mettre à jour
      </Button>
    </div>
  );
};

export default UserProfile;
```

## 🎭 JSX/TSX

- Une seule balise racine par composant
- Props sur plusieurs lignes si plus de 2 props
- Utilisez des fragments (`<>...</>`) pour éviter les divs inutiles
- Utilisez des composants nommés pour les éléments JSX complexes

```jsx
// Bien
<Button
  variant="primary"
  size="large"
  onClick={handleClick}
  aria-label="Sauvegarder"
>
  Sauvegarder
</Button>

// À éviter
<Button variant="primary" size="large" onClick={handleClick} aria-label="Sauvegarder">Sauvegarder</Button>
```

## 🎨 Styling

- Utilisez Tailwind CSS pour le styling
- Évitez les styles en ligne sauf si absolument nécessaire
- Extrayez les styles complexes dans des composants dédiés
- Utilisez `@apply` avec parcimonie

## 📝 Documentation

- Documentez les props des composants avec des commentaires JSDoc
- Expliquez la logique complexe
- Utilisez des commentaires pour les parties non évidentes
- Mettez à jour la documentation lors des modifications

## 🧪 Tests

- Un fichier de test par composant/fonction
- Nommez les fichiers de test avec le suffixe `.test.tsx`
- Utilisez des descriptions claires pour les tests
- Testez les cas limites et les erreurs

## 🔄 Gestion d'État

- Utilisez Zustand pour l'état global
- Gardez l'état local avec `useState` quand c'est possible
- Évitez le prop drilling excessif
- Utilisez des sélecteurs pour optimiser les rendus

## 🚀 Bonnes Pratiques

- Écrivez des composants purs quand c'est possible
- Évitez les effets secondaires dans le rendu
- Utilisez des clés uniques pour les listes
- Optimisez les performances avec `React.memo` et `useMemo`
- Gérez correctement les abonnements et les nettoyages

## 🔍 Linting et Formatage

- ESLint pour le linting
- Prettier pour le formatage
- Utilisez `// eslint-disable-next-line` avec parcimonie
- Corrigez tous les avertissements de l'éditeur
