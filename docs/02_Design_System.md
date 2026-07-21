# 02 — Design System

## Statut

Ce document décrit le Design System actuellement disponible pendant la Phase 1 — Fondation. Il couvre uniquement les tokens et composants déjà présents dans le projet.

## Philosophie

Le Design System fournit des primitives visuelles simples, cohérentes et réutilisables. Il doit réduire les décisions répétitives dans les interfaces sans introduire de logique métier dans les composants UI.

Ses objectifs sont :

- garantir une identité visuelle cohérente ;
- fournir des APIs proches des éléments HTML natifs ;
- préserver l’accessibilité et la navigation au clavier ;
- permettre la composition sans dupliquer les styles ;
- rester suffisamment simple pour évoluer progressivement.

## Principes de conception

- Les composants UI sont indépendants des domaines métier.
- Les attributs HTML natifs sont préservés autant que possible.
- `className` est fusionné avec les styles par défaut via `cn()`.
- Les refs sont transmises à l’élément HTML racine lorsqu’elles sont utiles.
- Les valeurs visuelles partagées proviennent des design tokens.
- Les valeurs par défaut doivent produire un composant utilisable sans configuration supplémentaire.
- Les composants restent composables plutôt que spécialisés prématurément.

## Design tokens

Les tokens sont définis dans `src/app/globals.css`. Ils constituent la source de vérité des primitives UI.

### Couleurs

| Token | Valeur | Usage |
|---|---:|---|
| `--background` | `#F8FAFC` | Arrière-plan principal |
| `--surface` | `#FFFFFF` | Surfaces et cartes |
| `--primary` | `#5B4DFF` | Actions principales |
| `--primary-hover` | `#4C3FF5` | Survol des actions principales |
| `--primary-soft` | `#EEF2FF` | Accent primaire discret |
| `--text-primary` | `#111827` | Texte principal |
| `--text-secondary` | `#6B7280` | Texte secondaire |
| `--text-muted` | `#9CA3AF` | Texte atténué non essentiel |
| `--border` | `#E5E7EB` | Bordures |
| `--success` | `#22C55E` | États positifs |
| `--warning` | `#F59E0B` | Avertissements |
| `--danger` | `#EF4444` | États destructifs ou erreurs |

Les couleurs de texte doivent conserver un contraste suffisant avec leur arrière-plan. `--text-muted` ne doit pas être utilisé pour une information indispensable ou un texte long de petite taille.

### Typographie

- Police sans-serif : Geist, avec Arial, Helvetica et `sans-serif` en secours.
- Police monospace : Geist Mono.
- La hiérarchie typographique utilise les tailles et graisses Tailwind.
- Les composants ne doivent pas imposer de contenu métier ni modifier arbitrairement la structure éditoriale de la page.

### Espacement

L’espacement suit l’échelle Tailwind. Les composants existants utilisent principalement :

- `gap-3` et `gap-4` pour les groupes compacts ;
- `p-4` et `p-6` pour le contenu ;
- `space-y-*` pour les piles verticales.

Un composant conserve un espacement interne cohérent, tandis que son positionnement externe reste sous le contrôle de son parent.

### Rayons

| Token | Valeur |
|---|---:|
| `--radius-sm` | `8px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `16px` |

`Button` utilise le rayon moyen. `Card` utilise le grand rayon.

### Ombres

| Token | Valeur |
|---|---|
| `--shadow-sm` | Ombre de surface légère |
| `--shadow-md` | Ombre d’élévation moyenne |

Les ombres servent à exprimer une hiérarchie visuelle, pas à remplacer les bordures ou la structure du contenu.

## Philosophie des composants

### API

Les props publiques étendent les attributs HTML de l’élément rendu. Cela permet notamment d’utiliser directement les attributs ARIA, `id`, `name`, `type`, `disabled` et les gestionnaires d’événements natifs.

Les composants acceptent `className`. La fonction `cn()` combine `clsx` et `tailwind-merge` afin de préserver les styles par défaut et de résoudre proprement les classes Tailwind conflictuelles.

### Button

`Button` rend un élément `<button>` natif.

- Son type par défaut est `button` pour éviter les soumissions de formulaire accidentelles.
- Les attributs de bouton natifs sont acceptés.
- La ref cible l’élément `<button>`.
- Les états hover, focus-visible et disabled sont intégrés.
- Un nom accessible doit toujours être fourni par son contenu ou par un attribut ARIA approprié.

### Card

La famille `Card` regroupe :

- `Card` : conteneur racine ;
- `CardHeader` : en-tête ;
- `CardTitle` : titre rendu en `<h3>` ;
- `CardDescription` : description rendue en `<p>` ;
- `CardContent` : contenu principal ;
- `CardFooter` : zone d’actions ou d’informations complémentaires.

Ces composants sont indépendants et composables. Ils ne partagent aucun état implicite et n’imposent aucune donnée métier.

### Input

`Input` rend un élément `<input>` natif.

- Son type par défaut est `text`.
- Tous les attributs d’input natifs et les attributs ARIA sont acceptés.
- La ref cible l’élément `<input>`.
- Les états hover, focus-visible, disabled, invalid et placeholder sont intégrés.
- Un libellé accessible doit être associé avec un élément `<label>` ou un attribut ARIA approprié.

### Textarea

`Textarea` est le champ multiligne natif du Design System.

```tsx
import { Label, Textarea } from "@/components/ui";

<div className="space-y-2">
  <Label htmlFor="legal-analysis">Legal analysis</Label>
  <Textarea
    id="legal-analysis"
    rows={6}
    placeholder="Add the relevant legal analysis"
  />
</div>;
```

- Tous les attributs natifs d’un `<textarea>`, dont `rows`, sont acceptés.
- Le redimensionnement est limité à l’axe vertical.
- L’état invalide utilise `aria-invalid` et peut être décrit avec `aria-describedby`.
- Un nom accessible doit être fourni avec `Label` ou un attribut ARIA.
- L’espacement avec le libellé, l’aide ou l’erreur appartient au conteneur parent.

### Label

`Label` rend un élément `<label>` natif destiné à identifier les champs de formulaire.

```tsx
import { Input, Label } from "@/components/ui";

<div className="space-y-2">
  <Label htmlFor="client-email" requiredIndicator>
    Email
  </Label>
  <Input id="client-email" type="email" required />
</div>;
```

```tsx
<Label htmlFor="disabled-email" disabled>
  Email
</Label>
<Input id="disabled-email" type="email" disabled />
```

- `htmlFor` doit correspondre à l’`id` du champ associé.
- `requiredIndicator` ajoute uniquement une étoile visuelle utilisant le token `--danger` ; il ne rend pas automatiquement le champ obligatoire.
- L’étoile est masquée aux technologies d’assistance et ne modifie pas le nom accessible.
- `disabled` est un état visuel explicite du `Label` ; le champ associé doit recevoir sa propre prop `disabled`.
- `Label` n’infère pas l’état du champ associé et peut rester avant celui-ci dans l’ordre naturel du DOM.
- L’espacement entre le libellé et le champ reste sous la responsabilité du conteneur parent.

## Accessibilité

- Utiliser les éléments HTML natifs avant d’ajouter des rôles ARIA.
- Conserver un nom accessible pour chaque contrôle interactif.
- Préserver un indicateur de focus visible.
- Ne pas simuler une interaction sur un élément désactivé.
- Respecter l’ordre logique des titres lorsque `CardTitle` est utilisé.
- Vérifier le contraste des couleurs, notamment pour les textes secondaires et atténués.
- Tester les composants par leur rôle ou leur nom accessible lorsque cela représente réellement l’expérience utilisateur.

## Conventions de nommage et d’exports

- Composants et types publics : `PascalCase`.
- Props publiques : suffixe `Props`, par exemple `ButtonProps` et `CardProps`.
- Fichiers de composants : `PascalCase.tsx`.
- Tests colocalisés : `Component.test.tsx`.
- Les composants UI publics sont réexportés depuis `src/components/ui/index.ts`.
- Les imports entre dossiers utilisent l’alias `@/`.
- Les imports entre fichiers colocalisés peuvent rester relatifs.

## Composants UI et composants métier

Un composant UI décrit une apparence et un comportement générique. Il ne connaît ni client, ni dossier juridique, ni document, ni permission.

Un composant métier compose les primitives UI et porte le vocabulaire, les données et les règles d’un domaine. Il appartient à la fonctionnalité concernée et ne doit pas être ajouté au dossier `components/ui`.

Cette séparation maintient le Design System réutilisable et empêche les dépendances métier de remonter vers les primitives visuelles.
