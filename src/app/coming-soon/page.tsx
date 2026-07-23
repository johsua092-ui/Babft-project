import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="center-shell">
      <section className="w-full max-w-xl space-y-6">
        <Link href="/menu" className="back-btn inline-flex items-center gap-2 px-4 py-2 text-sm">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </Link>

        <div className="panel p-6 text-center sm:p-8">
          <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-surface-raised text-amber-400">
            <Construction aria-hidden="true" className="size-7" />
          </div>
          <p className="kicker mt-5">Module status</p>
          <h1 className="title-text mt-3 text-4xl font-black">Coming soon</h1>
          <p className="body-copy mx-auto mt-3 max-w-md text-sm">
            This module is not active yet. Continue with Logic Gates while the next section is being prepared.
          </p>
          <Link href="/logic-gates" className="primary-btn mt-6 px-5 py-3 text-sm">
            Open Logic Gates
          </Link>
        </div>
      </section>
    </main>
  );
}
