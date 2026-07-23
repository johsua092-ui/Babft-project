import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WelcomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-10 text-center animate-fade-in">
        <h1
          className="text-5xl font-extrabold tracking-tight sm:text-7xl"
          style={{
            background: "linear-gradient(135deg, #4caf50, #81c784)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          BABFT Learning
        </h1>

        <div
          className="flex h-48 w-full max-w-md items-center justify-center rounded-2xl border-2 border-dashed"
          style={{ borderColor: "#2d3f55", background: "#161b22" }}
        >
          <span style={{ color: "#8b949e" }}>Image Placeholder</span>
        </div>

        <Link
          href="/menu"
          className="inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-lg font-bold transition-all hover:-translate-y-0.5"
          style={{
            background: "#4caf50",
            color: "#07100d",
            boxShadow: "0 10px 24px #4caf5044",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        >
          START LEARNING
          <ArrowRight size={20} />
        </Link>
      </div>
    </main>
  );
}
