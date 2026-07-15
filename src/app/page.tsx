export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 py-10">
        <section className="w-full rounded-3xl bg-white/80 p-10 shadow-[0_20px_120px_rgba(91,77,255,0.12)] backdrop-blur-sm md:p-16">
          <div className="space-y-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#5B4DFF]/80">
              Legora
            </p>
            <h1 className="text-5xl font-semibold text-[#5B4DFF] sm:text-6xl">
              Legora
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-700">
              L&apos;assistant intelligent des cabinets d&apos;avocats
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
