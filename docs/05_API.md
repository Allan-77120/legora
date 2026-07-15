# 05 - API

## Objectif

L’API de Legora permet de faire communiquer l’interface, la base de données et les services externes.

Elle doit être simple, sécurisée, prévisible et facile à faire évoluer.

---

## Principes

- Utiliser les Server Actions lorsque cela suffit.
- Utiliser des routes API pour les besoins spécifiques.
- Valider toutes les données entrantes.
- Vérifier les droits côté serveur.
- Retourner des réponses cohérentes.
- Ne jamais exposer de données sensibles.
- Centraliser la logique métier importante.

---

## Organisation

Les routes API peuvent être organisées par domaine métier.

```text
api/
├── auth/
├── clients/
├── cases/
├── documents/
├── billing/
├── notifications/
└── ai/