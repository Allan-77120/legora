import {
  Check,
  CheckCircle2,
  Clock,
  FileText,
  Info,
  TriangleAlert,
  WifiOff,
  X,
} from "lucide-react";

import {
  Alert,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Container,
  Input,
  Label,
  Radio,
  Select,
  Switch,
  Textarea,
} from "@/components/ui";

export default function UIPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <div className="mx-auto max-w-[1400px] p-12">
        <header className="mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5B4DFF]/80">
            Design System
          </p>

          <h1 className="text-4xl font-semibold text-slate-950">
            Design System
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Tous les composants graphiques de Legora.
          </p>
        </header>

        <div className="space-y-8">
          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Buttons
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="button">Button Primary</Button>

                <Button type="button" disabled>
                  Button Disabled
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Container
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les conteneurs limitent la largeur du contenu et appliquent
                  un espacement horizontal responsive cohérent.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Sizes
                </p>

                <div className="space-y-3 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] py-4">
                  <Container
                    size="sm"
                    padding="sm"
                    className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Small container
                  </Container>
                  <Container
                    size="md"
                    padding="sm"
                    className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Medium container
                  </Container>
                  <Container
                    size="lg"
                    padding="sm"
                    className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Large container
                  </Container>
                  <Container
                    size="xl"
                    padding="sm"
                    className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Extra-large container
                  </Container>
                  <Container
                    size="full"
                    padding="sm"
                    className="rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Full-width container
                  </Container>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Responsive padding
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Container
                    size="full"
                    padding="none"
                    centered={false}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    No horizontal padding
                  </Container>
                  <Container
                    size="full"
                    padding="sm"
                    centered={false}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Small padding
                  </Container>
                  <Container
                    size="full"
                    padding="md"
                    centered={false}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Medium responsive padding
                  </Container>
                  <Container
                    size="full"
                    padding="lg"
                    centered={false}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] py-3 text-center text-sm text-[var(--text-secondary)]"
                  >
                    Large responsive padding
                  </Container>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Alignment
                </p>

                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] py-4">
                  <Container
                    size="sm"
                    padding="sm"
                    centered={false}
                    className="rounded-r-[var(--radius-sm)] bg-[var(--primary-soft)] py-3 text-sm font-medium text-[var(--primary)]"
                  >
                    Non-centered container
                  </Container>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Alert
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les alertes communiquent un événement ou une information qui
                  nécessite l’attention de l’utilisateur.
                </p>
              </div>

              <div className="space-y-4">
                <Alert
                  variant="info"
                  title="AI analysis completed"
                  icon={<Info />}
                >
                  The generated summary is ready for legal review.
                </Alert>

                <Alert
                  variant="success"
                  title="Document saved successfully"
                  icon={<CheckCircle2 />}
                >
                  The latest version is now available to your team.
                </Alert>

                <Alert
                  variant="warning"
                  title="Missing required information"
                  icon={<TriangleAlert />}
                  action={
                    <Button type="button" className="h-8 px-3 text-xs">
                      Review fields
                    </Button>
                  }
                >
                  Add the client reference before submitting this case.
                </Alert>

                <Alert
                  variant="danger"
                  title="Connection lost"
                  icon={<WifiOff />}
                  dismissible
                >
                  Changes cannot be synchronized until the connection is
                  restored.
                </Alert>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Badge
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les badges identifient rapidement un statut ou une catégorie.
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Variants
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="default">Draft</Badge>
                  <Badge variant="primary">Under review</Badge>
                  <Badge variant="success">Paid</Badge>
                  <Badge variant="warning">Pending</Badge>
                  <Badge variant="danger">Rejected</Badge>
                  <Badge variant="neutral">Archived</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Sizes and icons
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="default"
                    size="sm"
                    icon={<FileText />}
                  >
                    Draft
                  </Badge>
                  <Badge variant="warning" size="sm" icon={<Clock />}>
                    Pending
                  </Badge>
                  <Badge variant="success" size="md" icon={<Check />}>
                    Paid
                  </Badge>
                  <Badge variant="danger" size="md" icon={<X />}>
                    Rejected
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Switch
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les interrupteurs activent immédiatement une préférence ou
                  une fonctionnalité binaire.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Switch id="switch-email-notifications" />
                  <Label htmlFor="switch-email-notifications">
                    Email notifications
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch id="switch-security-alerts" defaultChecked />
                  <Label htmlFor="switch-security-alerts">
                    Security alerts
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="switch-controlled-sharing"
                    checked
                    readOnly
                  />
                  <Label htmlFor="switch-controlled-sharing">
                    Controlled document sharing
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch id="switch-disabled-notifications" disabled />
                  <Label htmlFor="switch-disabled-notifications" disabled>
                    Archived case notifications
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="switch-disabled-security"
                    defaultChecked
                    disabled
                  />
                  <Label htmlFor="switch-disabled-security" disabled>
                    Enforced security alerts
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="switch-required-sharing"
                    name="secureSharing"
                    required
                  />
                  <Label
                    htmlFor="switch-required-sharing"
                    requiredIndicator
                  >
                    Secure document sharing
                  </Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Switch
                      id="switch-invalid-sharing"
                      aria-invalid="true"
                      aria-describedby="switch-invalid-sharing-error"
                    />
                    <Label htmlFor="switch-invalid-sharing">
                      External document sharing
                    </Label>
                  </div>
                  <p
                    id="switch-invalid-sharing-error"
                    className="text-sm text-[var(--danger)]"
                  >
                    Review the sharing policy before enabling this setting.
                  </p>
                </div>

                <fieldset className="space-y-4 rounded-[var(--radius-md)] border border-[var(--border)] p-4 md:col-span-2">
                  <legend className="px-1 text-sm font-medium text-[var(--text-primary)]">
                    Communication preferences
                  </legend>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="switch-group-client-updates"
                      name="clientUpdates"
                      defaultChecked
                    />
                    <Label htmlFor="switch-group-client-updates">
                      Client updates
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="switch-group-deadline-reminders"
                      name="deadlineReminders"
                    />
                    <Label htmlFor="switch-group-deadline-reminders">
                      Deadline reminders
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      id="switch-group-document-alerts"
                      name="documentAlerts"
                      defaultChecked
                    />
                    <Label htmlFor="switch-group-document-alerts">
                      Document activity alerts
                    </Label>
                  </div>
                </fieldset>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Radio
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les boutons radio permettent de sélectionner une seule option
                  dans un groupe natif.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Radio
                    id="radio-standard-priority"
                    name="priority-example"
                    value="standard"
                  />
                  <Label htmlFor="radio-standard-priority">
                    Standard priority
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Radio
                    id="radio-urgent-priority"
                    name="default-priority-example"
                    value="urgent"
                    defaultChecked
                  />
                  <Label htmlFor="radio-urgent-priority">
                    Urgent priority
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Radio
                    id="radio-controlled-selection"
                    name="controlled-radio-example"
                    value="selected"
                    checked
                    readOnly
                  />
                  <Label htmlFor="radio-controlled-selection">
                    Controlled selection
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Radio
                    id="radio-disabled-unchecked"
                    name="disabled-unchecked-example"
                    disabled
                  />
                  <Label htmlFor="radio-disabled-unchecked" disabled>
                    Archived matter
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Radio
                    id="radio-disabled-checked"
                    name="disabled-checked-example"
                    defaultChecked
                    disabled
                  />
                  <Label htmlFor="radio-disabled-checked" disabled>
                    Closed matter
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Radio
                    id="radio-required-priority"
                    name="required-priority-example"
                    required
                  />
                  <Label
                    htmlFor="radio-required-priority"
                    requiredIndicator
                  >
                    Case priority
                  </Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Radio
                      id="radio-invalid-priority"
                      name="invalid-priority-example"
                      aria-invalid="true"
                      aria-describedby="radio-invalid-priority-error"
                    />
                    <Label htmlFor="radio-invalid-priority">
                      Urgent priority
                    </Label>
                  </div>
                  <p
                    id="radio-invalid-priority-error"
                    className="text-sm text-[var(--danger)]"
                  >
                    Select a valid case priority.
                  </p>
                </div>

                <fieldset className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] p-4 md:col-span-2">
                  <legend className="px-1 text-sm font-medium text-[var(--text-primary)]">
                    Case priority
                  </legend>

                  <div className="flex items-center gap-3">
                    <Radio
                      id="radio-group-low"
                      name="case-priority"
                      value="low"
                    />
                    <Label htmlFor="radio-group-low">Low</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Radio
                      id="radio-group-standard"
                      name="case-priority"
                      value="standard"
                      defaultChecked
                    />
                    <Label htmlFor="radio-group-standard">Standard</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Radio
                      id="radio-group-urgent"
                      name="case-priority"
                      value="urgent"
                    />
                    <Label htmlFor="radio-group-urgent">Urgent</Label>
                  </div>
                </fieldset>

                <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
                  <fieldset className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] p-4">
                    <legend className="px-1 text-sm font-medium text-[var(--text-primary)]">
                      Client category
                    </legend>

                    <div className="flex items-center gap-3">
                      <Radio
                        id="radio-client-individual"
                        name="client-category"
                        value="individual"
                        defaultChecked
                      />
                      <Label htmlFor="radio-client-individual">
                        Individual
                      </Label>
                    </div>

                    <div className="flex items-center gap-3">
                      <Radio
                        id="radio-client-company"
                        name="client-category"
                        value="company"
                      />
                      <Label htmlFor="radio-client-company">Company</Label>
                    </div>
                  </fieldset>

                  <fieldset className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] p-4">
                    <legend className="px-1 text-sm font-medium text-[var(--text-primary)]">
                      Review language
                    </legend>

                    <div className="flex items-center gap-3">
                      <Radio
                        id="radio-language-english"
                        name="review-language"
                        value="english"
                        defaultChecked
                      />
                      <Label htmlFor="radio-language-english">
                        English
                      </Label>
                    </div>

                    <div className="flex items-center gap-3">
                      <Radio
                        id="radio-language-french"
                        name="review-language"
                        value="french"
                      />
                      <Label htmlFor="radio-language-french">French</Label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Textarea
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les zones de texte permettent de saisir des contenus juridiques
                  multiligne.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="textarea-default-case-description">
                    Case description
                  </Label>
                  <Textarea id="textarea-default-case-description" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-placeholder-internal-note">
                    Internal note
                  </Label>
                  <Textarea
                    id="textarea-placeholder-internal-note"
                    placeholder="Add a note for the legal team"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-labeled-client-observations">
                    Client observations
                  </Label>
                  <Textarea
                    id="textarea-labeled-client-observations"
                    placeholder="Summarize the client’s observations"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-prefilled-legal-analysis">
                    Legal analysis
                  </Label>
                  <Textarea
                    id="textarea-prefilled-legal-analysis"
                    defaultValue="The contractual provisions should be reviewed against the latest supporting documents."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-disabled-internal-note" disabled>
                    Internal note
                  </Label>
                  <Textarea
                    id="textarea-disabled-internal-note"
                    defaultValue="This note is locked while the case is archived."
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-readonly-client-observations">
                    Client observations
                  </Label>
                  <Textarea
                    id="textarea-readonly-client-observations"
                    defaultValue="The client approved the current document draft."
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="textarea-required-case-description"
                    requiredIndicator
                  >
                    Case description
                  </Label>
                  <Textarea
                    id="textarea-required-case-description"
                    required
                    placeholder="Describe the facts and legal context"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea-invalid-legal-analysis">
                    Legal analysis
                  </Label>
                  <Textarea
                    id="textarea-invalid-legal-analysis"
                    defaultValue="Too brief"
                    aria-invalid="true"
                    aria-describedby="textarea-invalid-legal-analysis-error"
                  />
                  <p
                    id="textarea-invalid-legal-analysis-error"
                    className="text-sm text-[var(--danger)]"
                  >
                    Add enough detail to support the legal analysis.
                  </p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="textarea-ai-drafting-instructions">
                    AI drafting instructions
                  </Label>
                  <Textarea
                    id="textarea-ai-drafting-instructions"
                    rows={6}
                    placeholder="Describe the document, tone, and legal points to include"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Label</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les libellés identifient clairement les champs de formulaire.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="label-client-name">Client name</Label>
                  <Input
                    id="label-client-name"
                    placeholder="Enter client name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="label-required-email" requiredIndicator>
                    Email
                  </Label>
                  <Input
                    id="label-required-email"
                    type="email"
                    required
                    placeholder="client@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="label-disabled-case-reference" disabled>
                    Case reference
                  </Label>
                  <Input
                    id="label-disabled-case-reference"
                    defaultValue="LEG-2026-0142"
                    disabled
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="label-search-documents">Search documents</Label>
                  <Input
                    id="label-search-documents"
                    type="search"
                    placeholder="Search by document name or case reference"
                    aria-describedby="label-search-documents-help"
                  />
                  <p
                    id="label-search-documents-help"
                    className="text-sm text-slate-600"
                  >
                    Search across all documents linked to your cases.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Input</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les champs permettent de saisir et consulter des informations.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-default"
                  >
                    Client name
                  </label>
                  <Input id="input-default" defaultValue="Sophie Martin" />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-placeholder"
                  >
                    Client name
                  </label>
                  <Input id="input-placeholder" placeholder="Enter client name" />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-email"
                  >
                    Email
                  </label>
                  <Input
                    id="input-email"
                    type="email"
                    defaultValue="sophie.martin@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-password"
                  >
                    Password
                  </label>
                  <Input
                    id="input-password"
                    type="password"
                    defaultValue="legora-secure"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-disabled"
                  >
                    Case reference
                  </label>
                  <Input
                    id="input-disabled"
                    defaultValue="LEG-2026-0142"
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-invalid"
                  >
                    Email
                  </label>
                  <Input
                    id="input-invalid"
                    type="email"
                    defaultValue="invalid-email"
                    aria-invalid="true"
                    aria-describedby="input-invalid-error"
                  />
                  <p id="input-invalid-error" className="text-sm text-[var(--danger)]">
                    Enter a valid email address.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-readonly"
                  >
                    Case reference
                  </label>
                  <Input
                    id="input-readonly"
                    defaultValue="LEG-2026-0142"
                    readOnly
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-required"
                  >
                    Client name
                  </label>
                  <Input id="input-required" required placeholder="Enter client name" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    className="text-sm font-semibold text-slate-950"
                    htmlFor="input-search"
                  >
                    Search documents
                  </label>
                  <Input
                    id="input-search"
                    type="search"
                    placeholder="Search by document name or case reference"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Select</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les listes natives permettent de sélectionner des valeurs
                  juridiques prédéfinies.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="select-default-case-type">Case type</Label>
                  <Select id="select-default-case-type">
                    <option value="civil">Civil litigation</option>
                    <option value="commercial">Commercial law</option>
                    <option value="employment">Employment law</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-placeholder-jurisdiction">
                    Jurisdiction
                  </Label>
                  <Select
                    id="select-placeholder-jurisdiction"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a jurisdiction
                    </option>
                    <option value="paris">Paris</option>
                    <option value="lyon">Lyon</option>
                    <option value="marseille">Marseille</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-preselected-case-status">
                    Case status
                  </Label>
                  <Select
                    id="select-preselected-case-status"
                    defaultValue="in-review"
                  >
                    <option value="open">Open</option>
                    <option value="in-review">In review</option>
                    <option value="closed">Closed</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-disabled-jurisdiction" disabled>
                    Jurisdiction
                  </Label>
                  <Select
                    id="select-disabled-jurisdiction"
                    defaultValue="paris"
                    disabled
                  >
                    <option value="paris">Paris</option>
                    <option value="lyon">Lyon</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="select-required-client-category"
                    requiredIndicator
                  >
                    Client category
                  </Label>
                  <Select
                    id="select-required-client-category"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      Select a client category
                    </option>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="public-body">Public body</option>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-invalid-task-priority">
                    Task priority
                  </Label>
                  <Select
                    id="select-invalid-task-priority"
                    defaultValue=""
                    aria-invalid="true"
                    aria-describedby="select-invalid-task-priority-error"
                  >
                    <option value="" disabled>
                      Select a priority
                    </option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </Select>
                  <p
                    id="select-invalid-task-priority-error"
                    className="text-sm text-[var(--danger)]"
                  >
                    Select a priority for this task.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-optgroup-document-category">
                    Document category
                  </Label>
                  <Select id="select-optgroup-document-category">
                    <optgroup label="Case documents">
                      <option value="contract">Contract</option>
                      <option value="evidence">Evidence</option>
                      <option value="pleading">Pleading</option>
                    </optgroup>
                    <optgroup label="Communications">
                      <option value="email">Email</option>
                      <option value="letter">Letter</option>
                    </optgroup>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-multiple-team-roles">Team roles</Label>
                  <Select
                    id="select-multiple-team-roles"
                    defaultValue={["owner", "reviewer"]}
                    multiple
                  >
                    <option value="owner">Case owner</option>
                    <option value="lawyer">Lawyer</option>
                    <option value="reviewer">Reviewer</option>
                    <option value="assistant">Legal assistant</option>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="select-sized-document-category">
                    Document category
                  </Label>
                  <Select id="select-sized-document-category" size={5}>
                    <option value="contract">Contract</option>
                    <option value="evidence">Evidence</option>
                    <option value="correspondence">Correspondence</option>
                    <option value="pleading">Pleading</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">
                  Checkbox
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les cases à cocher représentent des choix booléens ou des
                  sélections multiples.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Checkbox id="checkbox-client-consent" />
                  <Label htmlFor="checkbox-client-consent">
                    Client consent obtained
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="checkbox-task-completed"
                    checked
                    readOnly
                  />
                  <Label htmlFor="checkbox-task-completed">
                    Mark task as completed
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="checkbox-email-notifications"
                    defaultChecked
                  />
                  <Label htmlFor="checkbox-email-notifications">
                    Send email notifications
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox id="checkbox-archived-cases" disabled />
                  <Label htmlFor="checkbox-archived-cases" disabled>
                    Include archived cases
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="checkbox-confidential-attachments"
                    defaultChecked
                    disabled
                  />
                  <Label htmlFor="checkbox-confidential-attachments" disabled>
                    Include confidential attachments
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox id="checkbox-processing-terms" required />
                  <Label
                    htmlFor="checkbox-processing-terms"
                    requiredIndicator
                  >
                    Accept data processing terms
                  </Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="checkbox-invalid-consent"
                      aria-invalid="true"
                      aria-describedby="checkbox-invalid-consent-error"
                    />
                    <Label htmlFor="checkbox-invalid-consent">
                      Client consent obtained
                    </Label>
                  </div>
                  <p
                    id="checkbox-invalid-consent-error"
                    className="text-sm text-[var(--danger)]"
                  >
                    Confirm client consent before continuing.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="checkbox-select-all-documents"
                    indeterminate
                  />
                  <Label htmlFor="checkbox-select-all-documents">
                    Select all documents
                  </Label>
                </div>

                <fieldset className="space-y-3 rounded-[var(--radius-md)] border border-[var(--border)] p-4 md:col-span-2">
                  <legend className="px-1 text-sm font-medium text-[var(--text-primary)]">
                    Document selection
                  </legend>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="checkbox-group-contract"
                      defaultChecked
                    />
                    <Label htmlFor="checkbox-group-contract">
                      Contract documents
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox id="checkbox-group-evidence" />
                    <Label htmlFor="checkbox-group-evidence">
                      Evidence documents
                    </Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox id="checkbox-group-correspondence" />
                    <Label htmlFor="checkbox-group-correspondence">
                      Client correspondence
                    </Label>
                  </div>
                </fieldset>
              </div>
            </div>
          </section>

          <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-950">Cards</h2>

                <p className="mt-2 text-sm text-slate-600">
                  Les cartes regroupent des informations et des actions.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex h-full flex-col">
                  <CardHeader className="space-y-2">
                    <CardTitle>Client</CardTitle>

                    <CardDescription>
                      Informations principales du client.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <p className="font-semibold text-slate-950">Jean Dupont</p>
                      <p className="text-sm text-slate-600">
                        jean.dupont@example.com
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto pt-4 border-t border-[#E5E7EB]">
                    <Button type="button">Voir le client</Button>
                  </CardFooter>
                </Card>

                <Card className="flex h-full flex-col">
                  <CardHeader className="space-y-2">
                    <CardTitle>Dossier juridique</CardTitle>

                    <CardDescription>
                      Résumé d’un dossier en cours.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <p className="font-semibold text-slate-950">
                        Dupont contre Société Exemple
                      </p>
                      <p className="text-sm text-slate-600">Statut : en cours</p>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto pt-4 border-t border-[#E5E7EB]">
                    <Button type="button">Ouvrir le dossier</Button>
                  </CardFooter>
                </Card>

                <Card className="flex h-full flex-col">
                  <CardHeader className="space-y-2">
                    <CardTitle>Document</CardTitle>

                    <CardDescription>Dernier document ajouté.</CardDescription>
                  </CardHeader>

                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <p className="font-semibold text-slate-950">
                        Contrat-de-travail.pdf
                      </p>
                      <p className="text-sm text-slate-600">Ajouté aujourd’hui</p>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto pt-4 border-t border-[#E5E7EB]">
                    <Button type="button">Télécharger</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
