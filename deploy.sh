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

# Fonction pour déployer l'application PharmaciEfficace
deploy_app() {
    local timestamp=$(date +%Y%m%d%H%M%S)
    local build_dir="dist"
    local backup_dir="backup_${timestamp}"
    
    log "Démarrage du déploiement pour l'environnement $ENV..."
    
    # Créer un fichier de version
    echo "Version: $VERSION" > "$build_dir/version.txt"
    echo "Environnement: $ENV" >> "$build_dir/version.txt"
    echo "Date: $(date)" >> "$build_dir/version.txt"
    
    case $ENV in
        dev)
            log "Configuration pour l'environnement de développement"
            
            # Vérifier si le dossier de destination existe
            local dev_dir="/var/www/pharmacie-efficace-dev"
            
            # Créer un backup de l'ancienne version
            if [ -d "$dev_dir" ]; then
                log "Création d'un backup de l'ancienne version..."
                mkdir -p "$backup_dir"
                cp -r "$dev_dir" "./$backup_dir/"
            fi
            
            # Copier les fichiers de l'application
            log "Déploiement de la nouvelle version..."
            mkdir -p "$dev_dir"
            rsync -av --delete "$build_dir/" "$dev_dir/"
            
            # Définir les permissions
            chmod -R 755 "$dev_dir"
            chown -R www-data:www-data "$dev_dir"
            
            log "Déploiement en développement terminé avec succès!"
            log "URL: https://dev.pharmacie-efficace.com"
            ;;
            
        staging)
            log "Configuration pour l'environnement de staging"
            
            # Configuration pour le déploiement sur un serveur distant via SSH
            local staging_server="staging.pharmacie-efficace.com"
            local ssh_user="deploy"
            local remote_dir="/var/www/pharmacie-efficace-staging"
            
            # Vérifier la connexion SSH
            if ! ssh -q -o BatchMode=yes -o ConnectTimeout=5 $ssh_user@$staging_server exit 2>/dev/null; then
                log "ERREUR: Impossible de se connecter au serveur de staging"
                exit 1
            fi
            
            # Créer un backup distant
            log "Création d'un backup sur le serveur de staging..."
            ssh $ssh_user@$staging_server "mkdir -p $remote_dir/../backups/$backup_dir && \
                                         cp -r $remote_dir/* $remote_dir/../backups/$backup_dir/ 2>/dev/null || true"
            
            # Synchroniser les fichiers
            log "Synchronisation des fichiers avec le serveur de staging..."
            rsync -avz --delete -e ssh "$build_dir/" "$ssh_user@$staging_server:$remote_dir/"
            
            # Redémarrer le service si nécessaire
            log "Redémarrage des services..."
            ssh $ssh_user@$staging_server "chown -R $ssh_user:www-data $remote_dir && \
                                         chmod -R 755 $remote_dir && \
                                         systemctl reload nginx || true"
            
            log "Déploiement en staging terminé avec succès!"
            log "URL: https://staging.pharmacie-efficace.com"
            ;;
            
        prod)
            log "Configuration pour l'environnement de production"
            
            # Configuration pour le déploiement en production
            local prod_servers=("prod1.pharmacie-efficace.com" "prod2.pharmacie-efficace.com")
            local ssh_user="deploy"
            local remote_dir="/var/www/pharmacie-efficace"
            
            for server in "${prod_servers[@]}"; do
                log "Déploiement sur le serveur: $server"
                
                # Vérifier la connexion SSH
                if ! ssh -q -o BatchMode=yes -o ConnectTimeout=5 $ssh_user@$server exit 2>/dev/null; then
                    log "ERREUR: Impossible de se connecter au serveur $server"
                    continue
                fi
                
                # Mettre en maintenance
                log "Activation du mode maintenance sur $server..."
                ssh $ssh_user@$server "mkdir -p $remote_dir/maintenance && \
                                     echo 'Maintenance en cours. Merci de votre patience.' > $remote_dir/maintenance/index.html"
                
                # Créer un backup
                log "Création d'un backup sur $server..."
                ssh $ssh_user@$server "mkdir -p $remote_dir/../backups/$backup_dir && \
                                     cp -r $remote_dir/* $remote_dir/../backups/$backup_dir/ 2>/dev/null || true"
                
                # Synchroniser les fichiers
                log "Synchronisation des fichiers avec $server..."
                rsync -avz --delete -e ssh "$build_dir/" "$ssh_user@$server:$remote_dir/"
                
                # Mettre à jour les permissions
                log "Mise à jour des permissions sur $server..."
                ssh $ssh_user@$server "chown -R $ssh_user:www-data $remote_dir && \
                                     chmod -R 755 $remote_dir && \
                                     find $remote_dir -type f -exec chmod 644 {} \;"
                
                # Redémarrer les services
                log "Redémarrage des services sur $server..."
                ssh $ssh_user@$server "systemctl reload nginx || true"
                
                # Désactiver le mode maintenance
                log "Désactivation du mode maintenance sur $server..."
                ssh $ssh_user@$server "rm -rf $remote_dir/maintenance"
                
                log "Déploiement sur $server terminé avec succès!"
            done
            
            log "Déploiement en production terminé avec succès sur tous les serveurs!"
            log "URL: https://www.pharmacie-efficace.com"
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
