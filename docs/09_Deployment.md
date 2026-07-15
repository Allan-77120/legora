# 09 - Deployment

## Objectif

Le déploiement de Legora doit être simple, sécurisé, reproductible et fiable.

Chaque mise en production doit pouvoir être vérifiée, suivie et annulée si nécessaire.

---

## Environnements

Le projet utilise plusieurs environnements :

- développement ;
- préproduction ;
- production.

Chaque environnement possède ses propres variables, services et données.

---

## Hébergement

Legora pourra être déployé sur Vercel.

Les services associés peuvent inclure :

- Supabase pour la base de données ;
- un service de stockage pour les fichiers ;
- un fournisseur d’e-mails ;
- un service d’intelligence artificielle ;
- un outil de suivi des erreurs.

---

## Processus de déploiement

Le processus général est le suivant :

```text
Développement local
        ↓
Commit Git
        ↓
Pull Request
        ↓
Tests automatiques
        ↓
Prévisualisation
        ↓
Validation
        ↓
Production