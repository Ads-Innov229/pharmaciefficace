# Politique de Sécurité

## Signalement des Vulnérabilités

Nous prenons la sécurité de notre projet très au sérieux. Si vous découvrez une vulnérabilité de sécurité dans PharmaciEfficace, nous vous encourageons à nous en faire part de manière responsable.

### Comment signaler une vulnérabilité

Veuillez signaler les vulnérabilités de sécurité par email à : [email de sécurité]

Incluez les détails suivants dans votre rapport :
- Description de la vulnérabilité
- Étapes pour reproduire le problème
- Impact potentiel
- Toute preuve de concept ou code d'exploitation
- Votre nom et affiliation (si vous le souhaitez)

### Notre engagement

- Nous accuserons réception de votre rapport dans les 48 heures
- Nous vous tiendrons informé de l'avancement vers une correction
- Nous publierons un avis de sécurité une fois le problème résolu

## Politique de Divulgation

- Nous nous engageons à corriger les vulnérabilités critiques dans les 30 jours suivant le signalement
- Nous publierons des correctifs de sécurité dans les notes de version
- Nous créditerons les chercheurs qui signalent des vulnérabilités de manière responsable

## Bonnes Pratiques de Sécurité

### Pour les Développeurs
- Ne jamais stocker de secrets dans le code source
- Valider et assainir toutes les entrées utilisateur
- Utiliser des requêtes préparées pour les bases de données
- Implémenter une politique de sécurité du contenu (CSP)
- Mettre en œuvre une protection CSRF

### Pour les Utilisateurs
- Maintenir votre environnement d'exécution à jour
- Ne pas exécuter l'application avec des privilèges élevés
- Protéger vos identifiants d'accès
- Signaler tout comportement suspect

## Mises à Jour de Sécurité

Toutes les mises à jour de sécurité seront documentées dans le fichier [CHANGELOG.md](CHANGELOG.md) avec le préfixe [SECURITY].
