# 03 - Architecture

## Objectif

L'architecture de Legora a pour objectif de fournir une base solide, évolutive et maintenable. Chaque décision technique doit privilégier la simplicité, la lisibilité et la réutilisabilité.

---

## Principes

- Simplicité avant complexité.
- Favoriser la composition plutôt que la duplication.
- Une responsabilité par composant.
- Une fonctionnalité = un dossier.
- Les composants UI restent indépendants de la logique métier.
- Le code doit être facile à tester et à maintenir.

---

## Stack technique

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- PostgreSQL
- OpenAI
- Vercel

---

## Organisation du projet

Le projet est organisé par fonctionnalités.

```text
src/
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── services/
├── styles/
└── types/
```

Chaque dossier possède une responsabilité claire.

---

## Architecture des fonctionnalités

Chaque nouvelle fonctionnalité possède son propre dossier.

Exemple :

```text
features/
└── clients/
    ├── components/
    ├── hooks/
    ├── services/
    ├── types/
    └── utils/
```

Cela permet d'isoler la logique métier et de faciliter la maintenance.

---

## Flux des données

Le flux de données suit toujours le même chemin :

```text
UI
 ↓
Hook / Action
 ↓
Service
 ↓
Base de données
```

La logique métier ne doit jamais être directement placée dans les composants d'interface.

---

## Composants

Les composants doivent être :

- petits ;
- réutilisables ;
- fortement typés ;
- indépendants de la logique métier.

---

## Évolutivité

L'architecture doit permettre d'ajouter facilement :

- Authentification
- Gestion des utilisateurs
- Gestion des dossiers
- Documents
- Calendrier
- Facturation
- Intelligence artificielle
- Notifications

sans devoir réécrire l'organisation du projet.

---

## Conventions

- TypeScript obligatoire.
- Pas de `any`.
- Server Components par défaut.
- Client Components uniquement lorsque nécessaire.
- Nommage cohérent.
- Imports organisés.
- Respect du Design System.

---

## À faire plus tard

Cette documentation sera enrichie au fur et à mesure du développement afin de détailler :

- les choix d'architecture ;
- les conventions de développement ;
- les performances ;
- la sécurité ;
- les optimisations ;
- les exemples de bonnes pratiques.