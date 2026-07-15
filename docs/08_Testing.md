# 08 - Testing

## Objectif

Les tests garantissent la qualité, la stabilité et la fiabilité de Legora.

Ils permettent de détecter rapidement les régressions et de sécuriser les évolutions du projet.

---

## Principes

- Tester les fonctionnalités importantes.
- Écrire des tests simples et lisibles.
- Automatiser les vérifications.
- Corriger les bugs avant d'ajouter de nouvelles fonctionnalités.

---

## Types de tests

Le projet pourra utiliser plusieurs niveaux de tests :

- tests unitaires ;
- tests d'intégration ;
- tests end-to-end ;
- tests de performance ;
- tests de sécurité.

---

## Tests unitaires

Ils vérifient le fonctionnement d'une fonction ou d'un composant de manière isolée.

Exemples :

- fonctions utilitaires ;
- validations ;
- composants UI ;
- hooks.

---

## Tests d'intégration

Ils vérifient que plusieurs éléments fonctionnent correctement ensemble.

Exemples :

- formulaire + validation ;
- API + base de données ;
- authentification.

---

## Tests end-to-end

Ils reproduisent le parcours réel d'un utilisateur.

Exemples :

- connexion ;
- création d'un dossier ;
- ajout d'un document ;
- recherche ;
- utilisation de l'IA.

---

## Qualité du code

Avant chaque mise en production, il faut vérifier :

- l'absence d'erreurs TypeScript ;
- le respect des conventions ;
- le bon fonctionnement des fonctionnalités principales ;
- la réussite des tests automatiques.

---

## Bonnes pratiques

- Tester uniquement le comportement attendu.
- Éviter les tests inutiles.
- Garder les tests indépendants.
- Donner des noms explicites.
- Mettre à jour les tests lorsque le comportement change.

---

## Intégration continue

Les tests devront être exécutés automatiquement avant chaque déploiement.

Une mise en production ne doit pas être effectuée si des tests critiques échouent.

---

## Évolutivité

La stratégie de tests évoluera avec le projet afin de couvrir progressivement toutes les fonctionnalités importantes.

---

## À préciser plus tard

Cette documentation sera complétée avec :

- les outils utilisés ;
- l'organisation des dossiers de tests ;
- les règles de couverture ;
- les scénarios critiques ;
- les tests de performance ;
- les tests de sécurité ;
- la stratégie d'intégration continue.