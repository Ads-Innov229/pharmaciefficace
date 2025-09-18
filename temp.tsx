// Fichier temporaire pour la vérification TypeScript
import React from 'react';

// Vérification des types pour les composants modifiés
const TestAppContainer: React.FC<{ children?: React.ReactNode }> = () => null;
const TestAuthLayout: React.FC<{ children?: React.ReactNode }> = () => null;

// Test d'utilisation des composants
const TestComponent = () => (
  <TestAppContainer>
    <div>Test</div>
  </TestAppContainer>
);

const TestAuthComponent = () => (
  <TestAuthLayout>
    <div>Test</div>
  </TestAuthLayout>
);
