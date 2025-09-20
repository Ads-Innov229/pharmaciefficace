# Guide de Déploiement

Ce document explique comment déployer l'application PharmaciEfficace à l'aide du script `deploy.sh`.

## Prérequis

- Node.js (version 16 ou supérieure)
- npm (version 7 ou supérieure)
- Un accès au dépôt Git du projet

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/ApollosADS/Pharmaciefficace.git
   cd pharmacie-efficace
   ```

2. Rendez le script de déploiement exécutable :
   ```bash
   chmod +x deploy.sh
   ```

## Utilisation du Script de Déploiement

Le script `deploy.sh` fournit plusieurs options pour faciliter le déploiement :

```bash
./deploy.sh [options]
```

### Options disponibles :

- `-h, --help` : Affiche l'aide
- `-e, --env` : Spécifie l'environnement de déploiement (dev, staging, prod)
- `-b, --build` : Construit l'application avant le déploiement
- `-t, --test` : Exécute les tests avant le déploiement
- `-v, --version` : Affiche la version du script

### Exemples d'utilisation :

1. **Déploiement en développement** :
   ```bash
   ./deploy.sh -e dev -b -t
   ```
   - Construit l'application
   - Exécute les tests
   - Déploie en environnement de développement

2. **Déploiement en production** :
   ```bash
   ./deploy.sh -e prod -b
   ```
   - Construit l'application
   - Déploie en environnement de production

3. **Afficher l'aide** :
   ```bash
   ./deploy.sh --help
   ```

## Configuration des environnements

Le script supporte trois environnements :

1. **dev** : Environnement de développement
2. **staging** : Environnement de pré-production
3. **prod** : Environnement de production

Pour chaque environnement, vous pouvez configurer des variables spécifiques dans le script `deploy.sh`.

## Personnalisation

Vous pouvez personnaliser le script `deploy.sh` pour ajouter des étapes spécifiques à votre flux de déploiement, comme :

- Déploiement sur un serveur distant
- Envoi de notifications
- Sauvegarde de la base de données
- Redémarrage des services

## Bonnes pratiques

1. **Toujours tester** avant de déployer en production
2. **Utiliser des branches** pour le développement de nouvelles fonctionnalités
3. **Documenter** les changements importants
4. **Sauvegarder** les données avant les mises à jour majeures

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le dépôt GitHub.
