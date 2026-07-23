import Link from "next/link";

export default function Home() {
  return (
    <main className="center-shell">
      <section className="panel w-full max-w-5xl p-6 sm:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-3">
              <p className="kicker">Babft Learning Project</p>
              <h1 className="title-text text-5xl font-black sm:text-7xl">Build logic from signals.</h1>
              <p className="body-copy max-w-xl text-base sm:text-lg">
                Learn digital logic through compact visual lessons, live truth tables, and small circuit experiments.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Basic gates"],
                ["02", "Circuits"],
                ["03", "Simulator"],
              ].map(([number, label]) => (
                <div key={number} className="rounded-2xl border border-border bg-surface-raised p-4">
                  <p className="font-mono text-sm tabular-nums text-neon">{number}</p>
                  <p className="mt-2 text-sm font-semibold text-silver">{label}</p>
                </div>
              ))}
            </div>

            <Link href="/menu" className="primary-btn w-full px-6 py-4 text-base sm:w-auto">
              Start learning
            </Link>
          </div>

          <div className="flex justify-center animate-fade-in animate-fade-in-delay-2">
            <div className="hero-mark" aria-label="Logic gate circuit illustration" />
          </div>
        </div>
      </section>
    </main>
  );
}
