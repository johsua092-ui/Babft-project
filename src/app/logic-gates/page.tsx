import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const gates = [
  { num: "01", name: "Basic Wire", color: "#60a5fa" },
  { num: "02", name: "NOT Gate", color: "#ef4444" },
  { num: "03", name: "AND Gate", color: "#4caf50" },
  { num: "04", name: "NAND Gate", color: "#ff9800" },
  { num: "05", name: "OR Gate", color: "#2196f3" },
  { num: "06", name: "NOR Gate", color: "#a855f7" },
  { num: "07", name: "XOR Gate", color: "#14b8a6" },
  { num: "08", name: "XNOR Gate", color: "#ec4899" },
];

export default function LogicGatesPage() {
  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          href="/menu"
          className="back-btn inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: "#e6edf3" }}>
            Logic Gates
          </h1>
          <p style={{ color: "#8b949e" }}>
            Explore the fundamental building blocks of digital circuits
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {gates.map((g, i) => (
            <div
              key={g.num}
              className={`gate-card flex flex-col items-center gap-2 p-4 animate-fade-in-d${i + 1}`}
            >
              <span
                className="size-3 rounded-full"
                style={{ background: g.color, boxShadow: `0 0 12px ${g.color}` }}
              />
              <span className="font-mono text-xs" style={{ color: "#8b949e" }}>
                {g.num}
              </span>
              <span className="text-sm font-semibold" style={{ color: "#e6edf3" }}>
                {g.name}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/logic-gates/basic-logic-gates"
          className="mx-auto flex w-fit items-center gap-2 rounded-2xl px-6 py-3 font-bold transition-all hover:-translate-y-0.5"
          style={{
            background: "#4caf50",
            color: "#07100d",
            boxShadow: "0 8px 20px #4caf5033",
          }}
        >
          Try Interactive Simulator
          <ArrowRight size={18} />
        </Link>
      </div>
    </main>
  );
}
