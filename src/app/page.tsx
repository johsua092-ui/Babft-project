import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-10 max-w-lg w-full animate-fade-in">
        <div className="flex flex-col items-center gap-2 animate-slide-up">
          <h1 className="text-6xl sm:text-7xl font-bold gradient-text text-center">
            Welcome
          </h1>
          <p className="text-sm font-mono text-muted tracking-widest uppercase">
            Babft Learning Project
          </p>
        </div>

        <div className="w-64 h-44 sm:w-80 sm:h-52 rounded-2xl border-2 border-dashed border-border bg-surface/50 flex items-center justify-center backdrop-blur-sm animate-fade-in animate-fade-in-delay-2">
          <span className="text-muted text-sm text-center px-4">
            Insert your image here
          </span>
        </div>

        <Link href="/menu" className="w-full max-w-xs animate-fade-in animate-fade-in-delay-3">
          <button className="neon-btn w-full py-5 text-lg sm:text-xl animate-glow">
            Start Learning
          </button>
        </Link>
      </div>
    </main>
  );
}