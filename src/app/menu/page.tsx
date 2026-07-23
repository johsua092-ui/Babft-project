import Link from "next/link";
import { Cpu, Link2, Music, Settings } from "lucide-react";

const menus = [
  {
    label: "Logic Gates",
    description: "Truth tables, circuits, and gate simulator.",
    icon: Cpu,
    href: "/logic-gates",
    color: "text-neon",
  },
  {
    label: "Gears",
    description: "Mechanical motion module in progress.",
    icon: Settings,
    href: "/coming-soon",
    color: "text-amber-400",
  },
  {
    label: "Linkage",
    description: "Joint and lever systems in progress.",
    icon: Link2,
    href: "/coming-soon",
    color: "text-sky-400",
  },
  {
    label: "Music Note",
    description: "Sound and rhythm module in progress.",
    icon: Music,
    href: "/coming-soon",
    color: "text-orange-400",
  },
];

export default function MenuPage() {
  return (
    <main className="center-shell">
      <section className="w-full max-w-4xl space-y-6">
        <div className="panel p-6 text-center sm:p-8 animate-slide-up">
          <p className="kicker">Main menu</p>
          <h1 className="title-text mt-3 text-4xl font-black sm:text-6xl">Choose a module</h1>
          <p className="body-copy mx-auto mt-3 max-w-2xl text-sm sm:text-base">
            Start with Logic Gates. The other learning modules are prepared as separate sections.
          </p>
        </div>

        <nav aria-label="Learning modules" className="grid gap-3 sm:grid-cols-2">
          {menus.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`card-btn flex items-center gap-4 p-5 animate-fade-in animate-fade-in-delay-${index + 1}`}
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-border bg-surface-raised">
                <item.icon aria-hidden="true" className={`size-6 ${item.color}`} />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-bold text-foreground">{item.label}</span>
                <span className="mt-1 block text-sm text-muted">{item.description}</span>
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
