# 04 - Database

## Objectif

La base de données de Legora doit permettre de stocker les informations de manière sécurisée, structurée et évolutive.

Elle doit être adaptée à une application SaaS destinée aux cabinets d’avocats.

---

## Technologie

Legora utilise :

- PostgreSQL ;
- Supabase pour l’accès à la base de données ;
- les migrations pour suivre les évolutions du schéma.

---

## Principales entités

La base de données devra notamment gérer :

- les utilisateurs ;
- les cabinets ;
- les membres d’un cabinet ;
- les clients ;
- les dossiers juridiques ;
- les documents ;
- les tâches ;
- les échéances ;
- les notes ;
- les factures ;
- les notifications ;
- les conversations avec l’intelligence artificielle ;
- les journaux d’activité.

---

## Organisation générale

Chaque donnée métier importante possède sa propre table.

Exemple :

```text
users
organizations
organization_members
clients
cases
documents
tasks
deadlines
notes
invoices
notifications
ai_conversations
audit_logs