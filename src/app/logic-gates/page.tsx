import Link from "next/link";
import { ArrowLeft, CircuitBoard, Cpu, FlaskConical } from "lucide-react";

const lessons = [
  {
    title: "Basic Logic Gates",
    description: "Toggle inputs and inspect each truth table.",
    href: "/logic-gates/basic-gates",
    icon: Cpu,
    accent: "text-neon",
  },
  {
    title: "Logic Gates Circuit",
    description: "Combine gates into useful multi-input circuits.",
    href: "/logic-gates/circuit",
    icon: CircuitBoard,
    accent: "text-sky-400",
  },
  {
    title: "Create Logic Gates Simulator",
    description: "Pick one gate and test its input-output behavior.",
    href: "/logic-gates/simulator",
    icon: FlaskConical,
    accent: "text-amber-400",
    featured: true,
  },
];

export default function LogicGatesPage() {
  return (
    <main className="center-shell">
      <section className="w-full max-w-4xl space-y-6">
        <Link href="/menu" className="back-btn inline-flex items-center gap-2 px-4 py-2 text-sm">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </Link>

        <div className="panel p-6 sm:p-8 animate-slide-up">
          <p className="kicker">Digital logic</p>
          <h1 className="title-text mt-3 text-4xl font-black sm:text-6xl">Logic Gates</h1>
          <p className="body-copy mt-3 max-w-2xl text-sm sm:text-base">
            Follow the path from individual gates to practical circuits. Each page is interactive.
          </p>
        </div>

        <div className="grid gap-3">
          {lessons.map((lesson, index) => (
            <Link
              key={lesson.title}
              href={lesson.href}
              className={`${lesson.featured ? "card-btn-special" : "card-btn"} flex items-center gap-4 p-5 animate-fade-in animate-fade-in-delay-${index + 1}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-surface-raised">
                <lesson.icon aria-hidden="true" className={`size-6 ${lesson.accent}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-bold">{lesson.title}</span>
                <span className="mt-1 block text-sm text-muted">{lesson.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
