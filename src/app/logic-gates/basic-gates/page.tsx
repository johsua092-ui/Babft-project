"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { bit, gateDefinitions, getTruthRows, type GateDefinition, type GateKey } from "../data";

function GateSymbol({ gate, color, active }: { gate: GateKey; color: string; active: boolean }) {
  const stroke = active ? color : "#6b7280";
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (gate === "WIRE") {
    return (
      <svg aria-hidden="true" focusable="false" viewBox="0 0 120 64" className="h-16 w-28">
        <path d="M10 32H110" {...common} />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 120 64" className="h-16 w-28">
      {gate === "NOT" && (
        <g {...common}>
          <path d="M34 16v32l32-16z" />
          <circle cx="74" cy="32" r="5" />
        </g>
      )}
      {gate === "AND" && <path d="M32 16h18a16 16 0 0 1 0 32H32z" {...common} />}
      {gate === "NAND" && (
        <g {...common}>
          <path d="M30 16h18a16 16 0 0 1 0 32H30z" />
          <circle cx="70" cy="32" r="5" />
        </g>
      )}
      {gate === "OR" && <path d="M26 16c18 0 31 6 48 16-17 10-30 16-48 16 8-10 8-22 0-32z" {...common} />}
      {gate === "NOR" && (
        <g {...common}>
          <path d="M24 16c18 0 31 6 48 16-17 10-30 16-48 16 8-10 8-22 0-32z" />
          <circle cx="80" cy="32" r="5" />
        </g>
      )}
      {gate === "XOR" && (
        <g {...common}>
          <path d="M30 16c18 0 31 6 48 16-17 10-30 16-48 16 8-10 8-22 0-32z" />
          <path d="M20 16c8 10 8 22 0 32" />
        </g>
      )}
      {gate === "XNOR" && (
        <g {...common}>
          <path d="M28 16c18 0 31 6 48 16-17 10-30 16-48 16 8-10 8-22 0-32z" />
          <path d="M18 16c8 10 8 22 0 32" />
          <circle cx="84" cy="32" r="5" />
        </g>
      )}
    </svg>
  );
}

function SignalButton({
  label,
  value,
  color,
  onToggle,
}: {
  label: string;
  value: boolean;
  color: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={onToggle}
      className="group flex flex-col items-center gap-1 rounded-xl p-1.5 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: color }}
    >
      <span className="text-[10px] font-mono tracking-[0.2em] text-muted">{label}</span>
      <span
        className="grid size-10 place-items-center rounded-xl border font-mono text-sm font-bold transition"
        style={{
          borderColor: value ? color : "var(--color-border)",
          background: value ? `${color}22` : "var(--color-surface-raised)",
          color: value ? color : "var(--color-muted)",
          boxShadow: value ? `0 0 18px ${color}55, inset 0 0 10px ${color}20` : "inset 0 1px 2px rgba(0,0,0,0.35)",
        }}
      >
        {bit(value)}
      </span>
    </button>
  );
}

function OutputLamp({ value, color }: { value: boolean; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1" aria-label={`Output ${bit(value)}`}>
      <span className="text-[10px] font-mono tracking-[0.2em] text-muted">OUT</span>
      <span
        className="grid size-11 place-items-center rounded-full border-2 font-mono text-sm font-bold transition"
        style={{
          borderColor: value ? color : "var(--color-border)",
          background: value ? `${color}25` : "var(--color-surface-raised)",
          color: value ? color : "var(--color-muted)",
          boxShadow: value ? `0 0 24px ${color}66, inset 0 0 12px ${color}20` : "inset 0 1px 2px rgba(0,0,0,0.35)",
        }}
      >
        {bit(value)}
      </span>
    </div>
  );
}

function WireDiagram({
  definition,
  a,
  b,
  out,
}: {
  definition: GateDefinition;
  a: boolean;
  b: boolean;
  out: boolean;
}) {
  const activeColor = definition.color;
  const offColor = "#3a3f48";
  const wire = (active: boolean) => ({
    stroke: active ? activeColor : offColor,
    strokeWidth: active ? 3 : 2,
    className: active ? "wire-active" : undefined,
  });

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 260 104" className="absolute inset-0 h-full w-full">
      {definition.inputs === 1 ? (
        <path d="M8 52H84" fill="none" {...wire(a)} />
      ) : (
        <>
          <path d="M8 34H78C88 34 92 42 98 52" fill="none" {...wire(a)} />
          <path d="M8 70H78C88 70 92 62 98 52" fill="none" {...wire(b)} />
        </>
      )}
      <path d="M176 52H252" fill="none" {...wire(out)} />
    </svg>
  );
}

function TruthTable({
  definition,
  a,
  b,
}: {
  definition: GateDefinition;
  a: boolean;
  b: boolean;
}) {
  return (
    <table className="w-full border-collapse text-xs">
      <caption className="sr-only">{definition.label} truth table</caption>
      <thead>
        <tr className="border-b border-border">
          <th scope="col" className="py-1.5 pr-2 text-left font-mono text-muted/70">A</th>
          {definition.inputs === 2 && <th scope="col" className="py-1.5 pr-2 text-left font-mono text-muted/70">B</th>}
          <th scope="col" className="py-1.5 text-left font-mono text-muted/70">OUT</th>
        </tr>
      </thead>
      <tbody>
        {getTruthRows(definition).map((row) => {
          const isActive = definition.inputs === 1 ? row.a === a : row.a === a && row.b === b;

          return (
            <tr
              key={`${bit(row.a)}-${bit(Boolean(row.b))}-${bit(row.out)}`}
              className="border-b border-border/30"
              style={{
                background: isActive ? `${definition.color}16` : "transparent",
                boxShadow: isActive ? `inset 2px 0 0 ${definition.color}` : "none",
              }}
            >
              <td className="py-1.5 pr-2 font-mono" style={{ color: row.a ? definition.color : "var(--color-muted)" }}>{bit(row.a)}</td>
              {definition.inputs === 2 && (
                <td className="py-1.5 pr-2 font-mono" style={{ color: row.b ? definition.color : "var(--color-muted)" }}>{bit(Boolean(row.b))}</td>
              )}
              <td className="py-1.5 font-mono font-bold" style={{ color: row.out ? definition.color : "var(--color-muted)" }}>{bit(row.out)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function GateCard({ definition, delayClass }: { definition: GateDefinition; delayClass: string }) {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const out = definition.fn(a, b);

  return (
    <article
      className={`gate-card-base animate-fade-in ${delayClass} overflow-hidden`}
      style={{ borderColor: out ? `${definition.color}66` : "var(--color-border)" }}
    >
      <div className="space-y-4 p-4">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-muted/70">
              {String(definition.index).padStart(2, "0")} / {definition.gate}
            </p>
            <h3 className="mt-1 text-lg font-semibold">{definition.label}</h3>
          </div>
          <span
            className="mt-1 size-2.5 shrink-0 rounded-full"
            style={{ background: definition.color, boxShadow: `0 0 14px ${definition.color}` }}
          />
        </header>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-border/70 bg-background/30 p-3">
          <div className="flex flex-col gap-2">
            <SignalButton label="A" value={a} color={definition.color} onToggle={() => setA((value) => !value)} />
            {definition.inputs === 2 && (
              <SignalButton label="B" value={b} color={definition.color} onToggle={() => setB((value) => !value)} />
            )}
          </div>

          <div className="relative min-h-28">
            <WireDiagram definition={definition} a={a} b={b} out={out} />
            <div className="relative z-10 grid h-28 place-items-center">
              <GateSymbol gate={definition.gate} color={definition.color} active={out} />
            </div>
          </div>

          <OutputLamp value={out} color={definition.color} />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs text-muted">
            A=<span style={{ color: a ? definition.color : undefined }}>{bit(a)}</span>
            {definition.inputs === 2 && <> B=<span style={{ color: b ? definition.color : undefined }}>{bit(b)}</span></>}
            {" "}→ OUT=<span className="font-bold" style={{ color: out ? definition.color : undefined }}>{bit(out)}</span>
          </p>
          <p className="text-sm leading-relaxed text-muted">{definition.description}</p>
          <p className="rounded-lg border border-border/70 bg-background/30 px-3 py-2 font-mono text-xs text-silver">{definition.rule}</p>
        </div>
      </div>

      <div className="border-t border-border/70 px-4 pb-4 pt-3">
        <TruthTable definition={definition} a={a} b={b} />
      </div>
    </article>
  );
}

const delayClasses = [
  "animate-fade-in-delay-1",
  "animate-fade-in-delay-2",
  "animate-fade-in-delay-3",
  "animate-fade-in-delay-4",
  "animate-fade-in-delay-5",
  "animate-fade-in-delay-6",
  "animate-fade-in-delay-7",
  "animate-fade-in-delay-8",
];

export default function BasicGatesPage() {
  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/logic-gates"
          className="back-btn mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </Link>

        <header className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-muted">Interactive truth tables</p>
          <h1 className="gradient-text text-3xl font-bold sm:text-5xl">Basic Logic Gates</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Toggle each input and watch the signal path, output lamp, and truth table update together.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {gateDefinitions.map((definition, index) => (
            <GateCard key={definition.gate} definition={definition} delayClass={delayClasses[index]} />
          ))}
        </div>
      </div>
    </main>
  );
}
