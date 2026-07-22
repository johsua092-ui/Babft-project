import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-lg w-full">
        <Link href="/logic-gates" className="self-start animate-fade-in">
          <div className="back-btn flex items-center gap-2 px-4 py-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </div>
        </Link>

        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-muted">
            Coming Soon
          </h2>
          <p className="text-muted text-center text-lg">
            This feature is under development.
          </p>
        </div>
      </div>
    </main>
  );
}
