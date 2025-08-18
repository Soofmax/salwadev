#!/bin/bash

# Script de vérification complète Frontend
# Utilisation: ./check-frontend.sh

echo "🚀 DIAGNOSTIC COMPLET FRONTEND - SALWADEV"
echo "========================================"
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

# Vérifier qu'on est dans le bon dossier
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Fichier package.json non trouvé. Êtes-vous dans le bon dossier ?${NC}"
    exit 1
fi

echo -e "${BLUE}📋 INFORMATIONS DU PROJET${NC}"
echo "========================="
echo "Dossier actuel: $(pwd)"
echo "Projet: $(grep -o '"name": *"[^"]*"' package.json | cut -d'"' -f4)"
echo ""

# 1. Vérification Node.js et npm
echo -e "${BLUE}🔧 ENVIRONNEMENT${NC}"
echo "==============="
node_version=$(node --version 2>/dev/null)
npm_version=$(npm --version 2>/dev/null)
echo "Node.js: $node_version"
echo "npm: $npm_version"
echo ""

# 2. Installation des dépendances
echo -e "${BLUE}📦 DÉPENDANCES${NC}"
echo "=============="
echo "Installation/mise à jour des dépendances..."
npm install --silent
print_status $? "Installation des dépendances"

# Vérifier les vulnérabilités
echo "Audit de sécurité..."
npm audit --audit-level=moderate > /tmp/audit.log 2>&1
audit_result=$?
if [ $audit_result -eq 0 ]; then
    echo -e "${GREEN}✅ Audit de sécurité: Aucune vulnérabilité critique${NC}"
else
    echo -e "${YELLOW}⚠️  Audit de sécurité: Vulnérabilités détectées${NC}"
    echo "Voir: npm audit pour plus de détails"
fi
echo ""

# 3. Vérification TypeScript
echo -e "${BLUE}🔍 VÉRIFICATION TYPESCRIPT${NC}"
echo "=========================="
echo "Vérification des types TypeScript..."
npx tsc --noEmit --pretty > /tmp/tsc.log 2>&1
tsc_result=$?
print_status $tsc_result "Vérification TypeScript"
if [ $tsc_result -ne 0 ]; then
    echo -e "${RED}Erreurs TypeScript détectées:${NC}"
    head -20 /tmp/tsc.log
    echo "..."
fi
echo ""

# 4. Linting
echo -e "${BLUE}📝 LINTING (ESLint)${NC}"
echo "=================="
echo "Vérification du style de code..."
npm run lint > /tmp/lint.log 2>&1 || npx eslint . --ext .ts,.tsx,.js,.jsx > /tmp/lint.log 2>&1
lint_result=$?
print_status $lint_result "ESLint"
if [ $lint_result -ne 0 ]; then
    echo -e "${RED}Problèmes de linting détectés:${NC}"
    head -15 /tmp/lint.log
    echo "..."
fi
echo ""

# 5. Build de production
echo -e "${BLUE}🏗️  BUILD DE PRODUCTION${NC}"
echo "======================"
echo "Build comme sur Netlify/Vercel..."
npm run build > /tmp/build.log 2>&1
build_result=$?
print_status $build_result "Build de production"
if [ $build_result -ne 0 ]; then
    echo -e "${RED}Erreurs de build:${NC}"
    tail -20 /tmp/build.log
fi
echo ""

# 6. Analyse des fichiers problématiques
echo -e "${BLUE}📁 ANALYSE DES FICHIERS${NC}"
echo "======================"

# Fichiers volumineux
echo "🔍 Fichiers volumineux (>1MB):"
find . -type f -size +1M -not -path "./node_modules/*" -not -path "./.next/*" -not -path "./.git/*" | head -10

echo ""
echo "📊 Taille des dossiers principaux:"
du -sh app/ src/ components/ public/ 2>/dev/null | sort -hr

echo ""
echo "🧩 Extensions de fichiers dans le projet:"
find . -type f -not -path "./node_modules/*" -not -path "./.next/*" -not -path "./.git/*" | sed 's/.*\.//' | sort | uniq -c | sort -nr | head -10

echo ""

# 7. Vérifications spécifiques Next.js
echo -e "${BLUE}⚡ VÉRIFICATIONS NEXT.JS${NC}"
echo "======================="

# Config Next.js
if [ -f "next.config.js" ] || [ -f "next.config.mjs" ] || [ -f "next.config.ts" ]; then
    echo -e "${GREEN}✅ Configuration Next.js trouvée${NC}"
else
    echo -e "${YELLOW}⚠️  Aucune configuration Next.js trouvée${NC}"
fi

# Pages et API routes
pages_count=$(find app/ -name "*.tsx" -o -name "*.ts" 2>/dev/null | wc -l)
echo "📄 Pages/composants trouvés: $pages_count"

# API routes
api_count=$(find app/api/ -name "*.ts" 2>/dev/null | wc -l)
echo "🔌 API routes trouvées: $api_count"

echo ""

# 8. Tests (si ils existent)
echo -e "${BLUE}🧪 TESTS${NC}"
echo "======="
if grep -q "test\|jest\|vitest" package.json; then
    echo "Exécution des tests..."
    npm test > /tmp/test.log 2>&1
    test_result=$?
    print_status $test_result "Tests"
else
    echo -e "${YELLOW}⚠️  Aucun framework de test configuré${NC}"
fi
echo ""

# 9. Résumé final
echo -e "${BLUE}📋 RÉSUMÉ FINAL${NC}"
echo "==============="

total_issues=0
if [ $tsc_result -ne 0 ]; then ((total_issues++)); fi
if [ $lint_result -ne 0 ]; then ((total_issues++)); fi
if [ $build_result -ne 0 ]; then ((total_issues++)); fi

echo "Issues TypeScript: $([ $tsc_result -eq 0 ] && echo "0" || echo "❌")"
echo "Issues Linting: $([ $lint_result -eq 0 ] && echo "0" || echo "❌")"  
echo "Issues Build: $([ $build_result -eq 0 ] && echo "0" || echo "❌")"

echo ""
if [ $total_issues -eq 0 ]; then
    echo -e "${GREEN}🎉 TOUT EST BON ! Votre frontend est prêt pour le déploiement !${NC}"
else
    echo -e "${RED}🔧 $total_issues problème(s) détecté(s). Voir les détails ci-dessus.${NC}"
    echo ""
    echo -e "${YELLOW}📝 ACTIONS RECOMMANDÉES:${NC}"
    if [ $tsc_result -ne 0 ]; then
        echo "   • Corriger les erreurs TypeScript (voir /tmp/tsc.log)"
    fi
    if [ $lint_result -ne 0 ]; then
        echo "   • Corriger les problèmes de linting (voir /tmp/lint.log)"
    fi
    if [ $build_result -ne 0 ]; then
        echo "   • Corriger les erreurs de build (voir /tmp/build.log)"
    fi
fi

echo ""
echo "📊 Logs détaillés sauvés dans /tmp/"
echo "   • TypeScript: /tmp/tsc.log"
echo "   • Linting: /tmp/lint.log" 
echo "   • Build: /tmp/build.log"
echo ""
echo -e "${BLUE}Diagnostic terminé !${NC}"
