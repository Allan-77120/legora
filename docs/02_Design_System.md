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

### Badge

`Badge` affiche un statut, une catégorie ou une information courte dans un élément `<span>` compact. Il reste purement présentationnel et n’ajoute aucun comportement interactif ni rôle ARIA par défaut.

```tsx
import { Check } from "lucide-react";

import { Badge } from "@/components/ui";

<Badge variant="success" icon={<Check />}>
  Paid
</Badge>;
```

#### API

```tsx
type BadgeVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "neutral";

type BadgeSize = "sm" | "md";
```

`BadgeProps` étend les attributs natifs d’un `<span>` et accepte `variant`, `size` et `icon`. Les valeurs par défaut sont `variant="default"` et `size="md"`.

| Variante | Usage recommandé |
|---|---|
| `default` | Information générale ou brouillon |
| `primary` | Statut actif lié à l’action principale |
| `success` | Résultat positif ou paiement effectué |
| `warning` | État en attente ou nécessitant une attention |
| `danger` | Échec, rejet ou état critique |
| `neutral` | État inactif, historique ou archivé |

| Taille | Usage |
|---|---|
| `sm` | Listes denses et tableaux, hauteur compacte et texte de 12 px |
| `md` | Interfaces courantes, hauteur confortable et texte de 14 px |

- Le texte doit rester court, explicite et compréhensible sans dépendre uniquement de la couleur.
- L’icône facultative précède toujours le contenu et est masquée aux technologies d’assistance pour éviter une annonce en double.
- Badge ne remplace pas un bouton ou un lien. Une action doit utiliser un composant interactif sémantique.
- Ne pas ajouter `role="status"` à un état statique. Ce rôle est réservé aux informations réellement mises à jour dynamiquement.
- Choisir une variante selon la signification du statut, pas uniquement selon une préférence visuelle.
- Les hauteurs sont fixes ; le contenu reste sur une ligne afin de préserver l’alignement vertical.
- L’espacement extérieur entre plusieurs badges appartient au conteneur parent.

### Alert

`Alert` communique une information importante, le résultat d’une opération ou un problème nécessitant l’attention de l’utilisateur. Le composant reste contrôlé par son parent et ne masque jamais son propre contenu.

```tsx
import { CheckCircle2 } from "lucide-react";

import { Alert } from "@/components/ui";

<Alert
  variant="success"
  title="Document saved successfully"
  icon={<CheckCircle2 />}
>
  The latest version is now available to your team.
</Alert>;
```

#### API

```tsx
type AlertVariant = "info" | "success" | "warning" | "danger";

interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}
```

Les `children` constituent la description. `variant` vaut `info` par défaut. Le `title` natif du `<div>` est volontairement omis de la signature, car cette prop accueille le titre visuel sous forme de `ReactNode`.

| Variante | Rôle | Usage recommandé |
|---|---|---|
| `info` | `status` | Information contextuelle ou résultat d’un traitement |
| `success` | `status` | Opération terminée avec succès |
| `warning` | `alert` | Information manquante ou action prochainement requise |
| `danger` | `alert` | Échec, perte de connexion ou problème critique |

- Les icônes sont décoratives par défaut et masquées aux technologies d’assistance.
- Le bouton de fermeture possède un nom accessible, accepte le focus et fonctionne au clavier.
- `onDismiss` est facultatif et n’introduit aucun état interne. Le parent décide quand retirer l’alerte du rendu.
- `action` accepte un élément React ; cet élément reste responsable de sa propre sémantique et de son comportement.
- Les variantes `warning` et `danger` utilisent `role="alert"` pour une annonce prioritaire.
- Les variantes `info` et `success` utilisent `role="status"` pour une annonce non interruptive.
- Une alerte déjà présente au chargement ne doit pas être utilisée comme substitut à un titre de page ou à une validation inline de champ.

#### Bonnes pratiques

À faire :

- utiliser un titre court et une description qui explique la prochaine étape ;
- choisir la variante selon la gravité réelle du message ;
- conserver les actions explicites, par exemple « Review fields » ou « Retry » ;
- rendre une alerte dismissible uniquement lorsque l’utilisateur peut raisonnablement l’ignorer.

À éviter :

- utiliser `danger` pour une information non critique ;
- placer plusieurs actions concurrentes dans une même alerte ;
- transmettre une icône contenant la seule information permettant de comprendre le message ;
- attendre du bouton de fermeture qu’il masque automatiquement l’alerte sans mise à jour du parent.

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

### Select

`Select` est le champ de sélection native non recherchable du Design System.

```tsx
import { Label, Select } from "@/components/ui";

<div className="space-y-2">
  <Label htmlFor="case-type">Case type</Label>
  <Select id="case-type" defaultValue="">
    <option value="" disabled>
      Select a case type
    </option>
    <option value="civil">Civil litigation</option>
    <option value="commercial">Commercial law</option>
  </Select>
</div>;
```

- Les consommateurs utilisent directement les éléments natifs `option` et `optgroup`.
- Une option vide et désactivée doit être ajoutée explicitement pour simuler un placeholder.
- `multiple` et `size` conservent le comportement natif de liste.
- Un nom accessible doit être fourni avec `Label` ou un attribut ARIA.
- L’espacement avec le libellé, l’aide ou l’erreur appartient au conteneur parent.

### Checkbox

`Checkbox` est le contrôle booléen natif du Design System.

```tsx
import { Checkbox, Label } from "@/components/ui";

<div className="flex items-center gap-3">
  <Checkbox id="client-consent" defaultChecked />
  <Label htmlFor="client-consent">Client consent obtained</Label>
</div>;
```

- `Checkbox` et `Label` restent deux composants séparés, associés avec `id` et `htmlFor`.
- `defaultChecked` crée un état non contrôlé ; `checked` avec `onChange` crée un état contrôlé.
- Pour un état désactivé visuellement et nativement, `disabled` doit être transmis séparément aux deux composants.
- `indeterminate` pilote uniquement la propriété visuelle native et ne remplace pas `checked`.
- Un groupe utilise `fieldset`, `legend` et plusieurs Checkbox indépendantes.
- Un état invalide utilise `aria-invalid` et `aria-describedby`.
- Checkbox sert aux choix booléens ou multiples ; Select sert à choisir une valeur dans une liste prédéfinie.
- L’espacement et les textes d’aide ou d’erreur appartiennent au conteneur parent.

### Radio

`Radio` est le bouton radio natif du Design System. Son API accepte les attributs d’un `<input>`, à l’exception de `type`, qui reste toujours fixé à `radio`.

```tsx
import { Label, Radio, type RadioProps } from "@/components/ui";

const option: RadioProps = {
  id: "priority-standard",
  name: "case-priority",
  value: "standard",
  defaultChecked: true,
};

<div className="flex items-center gap-3">
  <Radio {...option} />
  <Label htmlFor="priority-standard">Standard priority</Label>
</div>;
```

Les radios d’un même groupe partagent exactement le même attribut `name`. Le navigateur assure alors leur sélection exclusive : sélectionner une option désélectionne automatiquement la précédente, sans contexte React ni logique de groupe supplémentaire.

```tsx
<fieldset className="space-y-3">
  <legend>Case priority</legend>

  <div className="flex items-center gap-3">
    <Radio
      id="priority-low"
      name="case-priority"
      value="low"
    />
    <Label htmlFor="priority-low">Low</Label>
  </div>

  <div className="flex items-center gap-3">
    <Radio
      id="priority-urgent"
      name="case-priority"
      value="urgent"
    />
    <Label htmlFor="priority-urgent">Urgent</Label>
  </div>
</fieldset>;
```

- `defaultChecked` crée un état non contrôlé ; `checked` avec `onChange` crée un état contrôlé par React.
- `name` définit le groupe natif et `value` est la valeur envoyée avec ce nom lors de la soumission du formulaire.
- Seul le Radio sélectionné est inclus dans les données du formulaire ; les options non sélectionnées sont omises.
- `required` utilise la validation native du groupe : une des options partageant le même `name` doit être sélectionnée.
- `disabled` empêche l’interaction native. Pour atténuer également le libellé, transmettre `disabled` séparément à `Label`.
- `readOnly` est transmis, mais HTML ne rend pas les boutons radio en lecture seule ; utiliser `disabled` ou un état contrôlé selon le besoin.
- Un état invalide utilise `aria-invalid` et relie son message avec `aria-describedby`.
- Chaque Radio visible doit recevoir un nom accessible via `Label`, `aria-label` ou `aria-labelledby`.
- Un groupe accessible utilise `fieldset` et `legend`, sans ajouter de rôle ARIA à l’input natif.
- Checkbox représente un choix booléen ou plusieurs choix indépendants ; Radio impose un seul choix dans un groupe ; Select présente une option dans une liste déroulante.
- Les espacements entre Radio, Label, aide et erreur appartiennent au conteneur parent.

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
