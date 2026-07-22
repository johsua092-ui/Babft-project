import Link from "next/link";
import { Cpu, Settings, Link2, Music } from "lucide-react";

export default function MenuPage() {
  const menus = [
    {
      label: "Logic Gates",
      icon: Cpu,
      href: "/logic-gates",
      color: "text-neon",
      glow: "group-hover:shadow-[0_0_20px_var(--color-neon-glow)]",
      animate: "animate-fade-in-delay-1",
    },
    {
      label: "Gears",
      icon: Settings,
      href: "/coming-soon",
      color: "text-amber-400",
      glow: "group-hover:shadow-[0_0_20px_rgba(251,191,36,0.25)]",
      animate: "animate-fade-in-delay-2",
    },
    {
      label: "Linkage",
      icon: Link2,
      href: "/coming-soon",
      color: "text-sky-400",
      glow: "group-hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]",
      animate: "animate-fade-in-delay-3",
    },
    {
      label: "Music Note",
      icon: Music,
      href: "/coming-soon",
      color: "text-purple-400",
      glow: "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.25)]",
      animate: "animate-fade-in-delay-4",
    },
  ];

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-10 max-w-lg w-full">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <h1 className="text-5xl sm:text-6xl font-bold gradient-text text-center">
            Welcome
          </h1>

          <div className="w-56 h-40 sm:w-64 sm:h-44 rounded-2xl border-2 border-dashed border-border bg-surface/50 flex items-center justify-center backdrop-blur-sm">
            <span className="text-muted text-sm text-center px-4">
              Insert your image here
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {menus.map((item) => (
            <Link key={item.label} href={item.href} className={`animate-fade-in ${item.animate}`}>
              <div className={`card-btn group flex items-center gap-4 px-6 py-5 ${item.glow}`}>
                <div className={`p-2 rounded-xl bg-surface ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <span className="text-xl font-semibold">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
