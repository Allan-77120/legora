import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
