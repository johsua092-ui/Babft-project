"use client";

import Link from "next/link";
import { Cpu, Settings, Link as LinkIcon, Lock } from "lucide-react";

const menuItems = [
  { label: "Logic Gates", icon: Cpu, color: "#2196f3", href: "/logic-gates" },
  { label: "Gears", icon: Settings, color: "#f59e0b", href: "/gears" },
  { label: "Linkages Mechanic", icon: LinkIcon, color: "#818cf8", href: "/linkages" },
];

export default function MenuPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg space-y-8 animate-fade-in">
        <h1
          className="text-center text-3xl font-bold sm:text-4xl"
          style={{ color: "#e6edf3" }}
        >
          BABFT Learning
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border p-6 transition-all hover:-translate-y-1"
              style={{
                background: "#161b22",
                borderColor: "#2d3f55",
              }}
            >
              <item.icon
                size={36}
                style={{ color: item.color }}
                className="transition-transform group-hover:scale-110"
              />
              <span
                className="text-sm font-bold"
                style={{ color: "#e6edf3" }}
              >
                {item.label}
              </span>
            </Link>
          ))}

          <button
            type="button"
            onClick={() => alert("Coming Soon!")}
            className="flex flex-col items-center gap-3 rounded-2xl border p-6 opacity-50 cursor-not-allowed"
            style={{
              background: "#161b22",
              borderColor: "#2d3f55",
            }}
          >
            <Lock size={36} style={{ color: "#8b949e" }} />
            <span className="text-sm font-bold" style={{ color: "#8b949e" }}>
              Coming Soon
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
