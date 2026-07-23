"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gateDefinitions, getTruthRows, bit, type GateDefinition, type GateKey } from "@/data/gates";

function GateSymbol({ gate, color, active }: { gate: GateKey; color: string; active: boolean }) {
  const stroke = active ? color : "#8b949e";
  const common = { fill: "none", stroke, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

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

function SignalButton({ label, value, color, onToggle }: { label: string; value: boolean; color: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={onToggle}
      className="flex flex-col items-center gap-1 rounded-xl p-1.5 transition"
      style={{ outlineColor: color }}
    >
      <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "#8b949e" }}>{label}</span>
      <span
        className="grid size-10 place-items-center rounded-xl border font-mono text-sm font-bold transition"
        style={{
          borderColor: value ? color : "#2d3f55",
          background: value ? `${color}22` : "#1c2128",
          color: value ? color : "#8b949e",
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
      <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: "#8b949e" }}>OUT</span>
      <span
        className="grid size-11 place-items-center rounded-full border-2 font-mono text-sm font-bold transition"
        style={{
          borderColor: value ? color : "#2d3f55",
          background: value ? `${color}25` : "#1c2128",
          color: value ? color : "#8b949e",
          boxShadow: value ? `0 0 24px ${color}66, inset 0 0 12px ${color}20` : "inset 0 1px 2px rgba(0,0,0,0.35)",
        }}
      >
        {bit(value)}
      </span>
    </div>
  );
}

function WireDiagram({ definition, a, b, out }: { definition: GateDefinition; a: boolean; b: boolean; out: boolean }) {
  const offColor = "#2d3f55";
  const wire = (active: boolean) => ({
    stroke: active ? definition.color : offColor,
    strokeWidth: active ? 4 : 2.5,
    fill: "none" as const,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  });

  const node = (x: number, y: number, active: boolean, label: string) => (
    <g>
      <circle
        cx={x}
        cy={y}
        r="5.5"
        fill={active ? definition.color : "#1c2128"}
        stroke={active ? definition.color : offColor}
        strokeWidth="2"
      />
      <text x={x} y={y - 12} textAnchor="middle" fill="#8b949e" fontSize="9" fontFamily="monospace">
        {label}
      </text>
    </g>
  );

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 260 112" className="absolute inset-0 h-full w-full">
      <path d="M12 56H248" fill="none" stroke="#1c2128" strokeWidth="18" strokeLinecap="round" opacity="0.5" />
      {definition.inputs === 1 ? (
        <>
          <path d="M16 56H88" {...wire(a)} />
          {node(16, 56, a, "A")}
        </>
      ) : (
        <>
          <path d="M16 34H72C88 34 92 46 102 56" {...wire(a)} />
          <path d="M16 78H72C88 78 92 66 102 56" {...wire(b)} />
          {node(16, 34, a, "A")}
          {node(16, 78, b, "B")}
        </>
      )}
      <path d="M172 56H244" {...wire(out)} />
      {node(244, 56, out, "OUT")}
    </svg>
  );
}

function TruthTable({ definition, a, b }: { definition: GateDefinition; a: boolean; b: boolean }) {
  return (
    <table className="w-full border-collapse text-xs">
      <caption className="sr-only">{definition.label} truth table</caption>
      <thead>
        <tr style={{ borderBottom: "1px solid #2d3f55" }}>
          <th className="py-1.5 pr-2 text-left font-mono" style={{ color: "#8b949e" }}>A</th>
          {definition.inputs === 2 && <th className="py-1.5 pr-2 text-left font-mono" style={{ color: "#8b949e" }}>B</th>}
          <th className="py-1.5 text-left font-mono" style={{ color: "#8b949e" }}>OUT</th>
        </tr>
      </thead>
      <tbody>
        {getTruthRows(definition).map((row) => {
          const isActive = definition.inputs === 1 ? row.a === a : row.a === a && row.b === b;
          return (
            <tr
              key={`${bit(row.a)}-${bit(Boolean(row.b))}-${bit(row.out)}`}
              style={{
                borderBottom: "1px solid #2d3f5533",
                background: isActive ? `${definition.color}16` : "transparent",
                boxShadow: isActive ? `inset 2px 0 0 ${definition.color}` : "none",
              }}
            >
              <td className="py-1.5 pr-2 font-mono" style={{ color: row.a ? definition.color : "#8b949e" }}>{bit(row.a)}</td>
              {definition.inputs === 2 && (
                <td className="py-1.5 pr-2 font-mono" style={{ color: row.b ? definition.color : "#8b949e" }}>{bit(Boolean(row.b))}</td>
              )}
              <td className="py-1.5 font-mono font-bold" style={{ color: row.out ? definition.color : "#8b949e" }}>{bit(row.out)}</td>
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
      className={`gate-card overflow-hidden animate-fade-in ${delayClass}`}
      style={{ borderColor: out ? `${definition.color}66` : "#2d3f55" }}
    >
      <div className="space-y-4 p-4">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em]" style={{ color: "#8b949e" }}>
              {String(definition.index).padStart(2, "0")} ● {definition.gate}
            </p>
            <h3 className="mt-1 text-lg font-semibold" style={{ color: "#e6edf3" }}>{definition.label}</h3>
          </div>
          <span
            className="mt-1 size-2.5 shrink-0 rounded-full"
            style={{ background: definition.color, boxShadow: `0 0 14px ${definition.color}` }}
          />
        </header>

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl p-3" style={{ border: "1px solid #2d3f5588", background: "#0d111788" }}>
          <div className="flex flex-col gap-2">
            <SignalButton label="A" value={a} color={definition.color} onToggle={() => setA((v) => !v)} />
            {definition.inputs === 2 && (
              <SignalButton label="B" value={b} color={definition.color} onToggle={() => setB((v) => !v)} />
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
          <p className="font-mono text-xs" style={{ color: "#8b949e" }}>
            A=<span style={{ color: a ? definition.color : undefined }}>{bit(a)}</span>
            {definition.inputs === 2 && (
              <> B=<span style={{ color: b ? definition.color : undefined }}>{bit(b)}</span></>
            )}
            {" "}→ OUT=<span className="font-bold" style={{ color: out ? definition.color : undefined }}>{bit(out)}</span>
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#8b949e" }}>{definition.description}</p>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3" style={{ borderTop: "1px solid #2d3f5588" }}>
        <TruthTable definition={definition} a={a} b={b} />
      </div>
    </article>
  );
}

const delayClasses = [
  "animate-fade-in-d1",
  "animate-fade-in-d2",
  "animate-fade-in-d3",
  "animate-fade-in-d4",
  "animate-fade-in-d5",
  "animate-fade-in-d6",
  "animate-fade-in-d7",
  "animate-fade-in-d8",
];

export default function BasicGatesPage() {
  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/logic-gates" className="back-btn mb-6 inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back
        </Link>

        <header className="mx-auto mb-8 max-w-3xl text-center animate-fade-in">
          <h1
            className="text-3xl font-bold sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #e6edf3, #8b949e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            7 Basic Logic Gates
          </h1>
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
