# 07 - Security

## Objectif

La sécurité est une priorité de Legora. L'application manipule des données sensibles appartenant aux cabinets d'avocats et à leurs clients.

L'objectif est de garantir la confidentialité, l'intégrité et la disponibilité des données.

---

## Principes

- Sécurité dès la conception (Security by Design).
- Vérification systématique des permissions.
- Principe du moindre privilège.
- Validation de toutes les données.
- Aucune confiance dans les données provenant du client.
- Protection des informations sensibles.

---

## Authentification

L'authentification est gérée par Clerk.

Chaque utilisateur possède une identité unique.

Les sessions doivent être sécurisées et vérifiées côté serveur.

---

## Autorisation

Chaque action doit vérifier :

- que l'utilisateur est authentifié ;
- qu'il appartient au bon cabinet ;
- qu'il possède les droits nécessaires.

Les permissions ne doivent jamais être contrôlées uniquement côté client.

---

## Protection des données

Les données doivent être :

- chiffrées lorsque nécessaire ;
- accessibles uniquement aux personnes autorisées ;
- séparées entre les différents cabinets.

Aucune donnée d'un cabinet ne doit être accessible par un autre.

---

## Validation

Toutes les données doivent être validées :

- côté client pour améliorer l'expérience utilisateur ;
- côté serveur pour garantir la sécurité.

---

## Gestion des fichiers

Les fichiers envoyés doivent être :

- contrôlés ;
- limités en taille ;
- vérifiés avant stockage ;
- accessibles uniquement aux utilisateurs autorisés.

---

## Journalisation

Les actions importantes doivent pouvoir être enregistrées.

Exemples :

- connexion ;
- suppression ;
- modification ;
- téléchargement ;
- accès à un dossier.

Les journaux doivent faciliter les audits et le diagnostic des incidents.

---

## Secrets

Les clés API et informations sensibles ne doivent jamais être stockées dans le code source.

Les secrets sont gérés via les variables d'environnement.

---

## Sécurité de l'IA

Les fonctionnalités d'intelligence artificielle doivent respecter les mêmes règles de sécurité que le reste de l'application.

Seules les données nécessaires doivent être transmises au modèle.

---

## Bonnes pratiques

- Utiliser HTTPS.
- Maintenir les dépendances à jour.
- Limiter les permissions.
- Vérifier toutes les entrées utilisateur.
- Protéger les routes sensibles.
- Éviter toute fuite d'informations techniques.

---

## Évolutivité

La stratégie de sécurité sera enrichie avec :

- audit des accès ;
- gestion avancée des rôles ;
- détection des activités suspectes ;
- limitation des requêtes ;
- surveillance des incidents.

---

## À préciser plus tard

Cette documentation sera complétée avec :

- les rôles et permissions ;
- les politiques RLS de Supabase ;
- la gestion des secrets ;
- les audits ;
- les sauvegardes ;
- le plan de reprise après incident.