import Link from "next/link";
import { Cpu, CircuitBoard, ArrowLeft, FlaskConical } from "lucide-react";

export default function LogicGatesPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-lg w-full">
        <Link href="/menu" className="self-start animate-fade-in">
          <div className="back-btn flex items-center gap-2 px-4 py-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </div>
        </Link>

        <h2 className="text-4xl sm:text-5xl font-bold gradient-text text-center animate-fade-in">
          Logic Gates
        </h2>

        <div className="flex flex-col gap-4 w-full">
          <Link href="/logic-gates/basic-gates" className="animate-fade-in animate-fade-in-delay-1">
            <div className="card-btn flex items-center gap-4 px-6 py-6">
              <Cpu className="w-8 h-8 text-neon" />
              <span className="text-xl font-semibold">7 Basic Logic Gates</span>
            </div>
          </Link>

          <Link href="/coming-soon" className="animate-fade-in animate-fade-in-delay-2">
            <div className="card-btn flex items-center gap-4 px-6 py-6">
              <CircuitBoard className="w-8 h-8 text-sky-400" />
              <span className="text-xl font-semibold">Logic Gates Circuit</span>
            </div>
          </Link>

          <Link href="/coming-soon" className="animate-fade-in animate-fade-in-delay-3">
            <div className="card-btn-special flex items-center gap-4 px-6 py-6">
              <FlaskConical className="w-8 h-8 text-neon" />
              <span className="text-xl font-semibold">Create Logic Gates Simulator</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
