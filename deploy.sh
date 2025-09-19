#!/bin/bash

# Script de déploiement pour PharmaciEfficace
# Ce script peut être utilisé pour déployer l'application sur différents environnements

# Fonction pour afficher l'aide
show_help() {
    echo "Utilisation: $0 [options]"
    echo "Options:"
    echo "  -h, --help      Affiche ce message d'aide"
    echo "  -e, --env       Environnement de déploiement (dev, staging, prod)"
    echo "  -b, --build     Construit l'application avant le déploiement"
    echo "  -t, --test      Exécute les tests avant le déploiement"
    echo "  -v, --version   Affiche la version"
    exit 0
}

# Variables par défaut
ENV="dev"
BUILD=false
TEST=false
VERSION="1.0.0"

# Traitement des arguments
while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -h|--help)
            show_help
            ;;
        -e|--env)
            ENV="$2"
            shift # past argument
            shift # past value
            ;;
        -b|--build)
            BUILD=true
            shift # past argument
            ;;
        -t|--test)
            TEST=true
            shift # past argument
            ;;
        -v|--version)
            echo "Version: $VERSION"
            exit 0
            ;;
        *)
            echo "Option non reconnue: $1"
            show_help
            ;;
    esac
done

# Fonction pour afficher des messages formatés
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Vérification des dépendances
check_dependencies() {
    local missing_deps=()
    
    # Vérifier si Node.js est installé
    if ! command -v node &> /dev/null; then
        missing_deps+=("Node.js")
    fi
    
    # Vérifier si npm est installé
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    fi
    
    # Afficher les dépendances manquantes
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log "ERREUR: Dépendances manquantes:"
        for dep in "${missing_deps[@]}"; do
            echo "  - $dep"
        done
        exit 1
    fi
}

# Fonction pour exécuter les tests
run_tests() {
    log "Exécution des tests..."
    if npm test; then
        log "Tests réussis!"
    else
        log "ERREUR: Les tests ont échoué!"
        exit 1
    fi
}

# Fonction pour construire l'application
build_app() {
    log "Construction de l'application pour l'environnement $ENV..."
    
    # Définir les variables d'environnement
    export VITE_APP_ENV=$ENV
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        log "Installation des dépendances..."
        npm ci || npm install
    fi
    
    # Construire l'application
    if npm run build; then
        log "Construction terminée avec succès!"
    else
        log "ERREUR: Échec de la construction de l'application!"
        exit 1
    fi
}

# Fonction pour déployer l'application
deploy_app() {
    log "Démarrage du déploiement pour l'environnement $ENV..."
    
    case $ENV in
        dev)
            # Configuration pour l'environnement de développement
            log "Configuration pour l'environnement de développement"
            # Ajoutez ici les commandes spécifiques pour le déploiement en dev
            ;;
        staging)
            # Configuration pour l'environnement de staging
            log "Configuration pour l'environnement de staging"
            # Ajoutez ici les commandes spécifiques pour le déploiement en staging
            ;;
        prod)
            # Configuration pour l'environnement de production
            log "Configuration pour l'environnement de production"
            # Ajoutez ici les commandes spécifiques pour le déploiement en production
            ;;
        *)
            log "ERREUR: Environnement non reconnu: $ENV"
            exit 1
            ;;
    esac
    
    log "Déploiement terminé avec succès pour l'environnement $ENV!"
}

# Point d'entrée principal
main() {
    log "=== Script de déploiement PharmaciEfficace v$VERSION ==="
    
    # Vérifier les dépendances
    check_dependencies
    
    # Exécuter les tests si demandé
    if [ "$TEST" = true ]; then
        run_tests
    fi
    
    # Construire l'application si demandé
    if [ "$BUILD" = true ]; then
        build_app
    fi
    
    # Démarrer le déploiement
    deploy_app
    
    log "=== Fin du script de déploiement ==="
}

# Exécuter le script
main "$@"
