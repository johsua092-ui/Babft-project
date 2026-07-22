import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-lg w-full animate-fade-in">
        <h1 className="text-6xl sm:text-7xl font-bold gradient-text text-center">
          Welcome
        </h1>

        <div className="w-64 h-48 sm:w-80 sm:h-56 rounded-2xl border-2 border-dashed border-border bg-surface flex items-center justify-center">
          <span className="text-muted text-sm text-center px-4">
            Insert your image here
          </span>
        </div>

        <Link href="/menu" className="w-full max-w-xs">
          <button className="neon-btn w-full py-4 text-lg sm:text-xl animate-glow">
            Start Learning
          </button>
        </Link>
      </div>
    </main>
  );
}
