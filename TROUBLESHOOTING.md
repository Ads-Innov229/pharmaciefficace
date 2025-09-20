# Dépannage

Ce document fournit des solutions aux problèmes courants que vous pourriez rencontrer lors du développement ou du déploiement de PharmaciEfficace.

## Problèmes d'Installation

### Échec de l'installation des dépendances

**Symptômes** :
- Erreurs lors de l'exécution de `npm install`
- Messages d'erreur liés aux dépendances manquantes

**Solutions** :
1. Vérifiez que vous utilisez la bonne version de Node.js :
   ```bash
   node -v
   # Doit afficher v16.x ou supérieur
   ```
2. Supprimez le dossier `node_modules` et le fichier `package-lock.json` puis réinstallez :
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```
3. Si vous utilisez nvm, assurez-vous d'utiliser la bonne version de Node.js :
   ```bash
   nvm use
   ```

## Problèmes d'Exécution

### L'application ne se lance pas

**Symptômes** :
- Erreurs dans la console du navigateur
- Échec du démarrage du serveur de développement

**Solutions** :
1. Vérifiez les variables d'environnement :
   ```bash
   cp .env.example .env
   # Modifiez les valeurs selon votre configuration
   ```
2. Vérifiez les ports utilisés :
   ```bash
   # Sur Linux/macOS
   lsof -i :3000
   
   # Sur Windows
   netstat -ano | findstr :3000
   ```
3. Redémarrez le serveur de développement :
   ```bash
   npm run dev
   ```

## Problèmes de Construction

### Échec de la construction de production

**Symptômes** :
- Échec de la commande `npm run build`
- Erreurs de type "out of memory"

**Solutions** :
1. Augmentez la mémoire allouée à Node.js :
   ```bash
   export NODE_OPTIONS=--max_old_space_size=4096
   npm run build
   ```
2. Vérifiez les erreurs de syntaxe :
   ```bash
   npm run lint
   ```
3. Nettoyez le cache de Vite :
   ```bash
   rm -rf node_modules/.vite
   ```

## Problèmes de Déploiement

### Échec du déploiement

**Symptômes** :
- Échec du script de déploiement
- Problèmes de permissions

**Solutions** :
1. Vérifiez les permissions des dossiers :
   ```bash
   chmod -R 755 /chemin/vers/le/dossier
   chown -R utilisateur:groupe /chemin/vers/le/dossier
   ```
2. Vérifiez la connexion SSH :
   ```bash
   ssh -T git@github.com
   ```
3. Consultez les logs du serveur :
   ```bash
   journalctl -u votre-service -f
   ```

## Problèmes Courants

### Les styles ne s'appliquent pas

**Solutions** :
1. Videz le cache du navigateur
2. Vérifiez les chemins d'importation des fichiers CSS/SCSS
3. Assurez-vous que Tailwind est correctement configuré

### L'application est lente

**Solutions** :
1. Activez la compression GZIP
2. Optimisez les images
3. Utilisez le chargement paresseux pour les routes
4. Vérifiez les dépendances inutiles

## Obtenir de l'Aide

Si vous ne trouvez pas de solution ici :
1. Vérifiez les [issues GitHub](https://github.com/apollosads/PharmaciEfficace/issues) existantes
2. Créez une nouvelle issue avec les détails de votre problème
3. Incluez les messages d'erreur complets et les étapes pour reproduire le problème
