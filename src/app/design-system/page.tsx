import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
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
