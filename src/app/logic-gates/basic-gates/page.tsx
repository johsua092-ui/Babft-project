"use client";

import { useState } from "react";
import Link from "next/link";

type GateKey = "WIRE" | "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";

const themes: Record<GateKey, { color: string; label: string }> = {
  WIRE: { color: "#60a5fa", label: "Basic Wire" },
  NOT: { color: "#ef4444", label: "NOT Gate" },
  AND: { color: "#22c55e", label: "AND Gate" },
  NAND: { color: "#f97316", label: "NAND Gate" },
  OR: { color: "#3b82f6", label: "OR Gate" },
  NOR: { color: "#a855f7", label: "NOR Gate" },
  XOR: { color: "#14b8a6", label: "XOR Gate" },
  XNOR: { color: "#ec4899", label: "XNOR Gate" },
};

const descriptions: Record<GateKey, string> = {
  WIRE: "Output EXACTLY follows input",
  NOT: "Output is INVERTED from input",
  AND: "Output is 1 only if BOTH inputs are 1",
  NAND: "Output is 0 only if BOTH inputs are 1",
  OR: "Output is 1 if AT LEAST ONE input is 1",
  NOR: "Output is 0 if AT LEAST ONE input is 1",
  XOR: "Output is 1 if inputs are DIFFERENT",
  XNOR: "Output is 1 if inputs are SAME",
};

interface GateInfo {
  gate: GateKey;
  index: number;
  inputs: number;
  fn: (a: boolean, b: boolean) => boolean;
}

const gateDefs: GateInfo[] = [
  { gate: "WIRE", index: 1, inputs: 1, fn: (a) => a },
  { gate: "NOT", index: 2, inputs: 1, fn: (a) => !a },
  { gate: "AND", index: 3, inputs: 2, fn: (a, b) => a && b },
  { gate: "NAND", index: 4, inputs: 2, fn: (a, b) => !(a && b) },
  { gate: "OR", index: 5, inputs: 2, fn: (a, b) => a || b },
  { gate: "NOR", index: 6, inputs: 2, fn: (a, b) => !(a || b) },
  { gate: "XOR", index: 7, inputs: 2, fn: (a, b) => a !== b },
  { gate: "XNOR", index: 8, inputs: 2, fn: (a, b) => a === b },
];

function GateSymbol({ gate, color }: { gate: GateKey; color: string }) {
  const sw = 1.8;

  if (gate === "WIRE") {
    return (
      <svg width="100" height="40" className="overflow-visible">
        <line x1="0" y1="20" x2="100" y2="20" stroke={color} strokeWidth="2.5" />
      </svg>
    );
  }

  return (
    <svg width="100" height="56" className="overflow-visible">
      {(() => {
        const cx = 50;
        const cy = 28;

        switch (gate) {
          case "NOT":
            return (
              <g fill="none" stroke={color} strokeWidth={sw}>
                <path d={`M${cx - 20},${cy - 16} L${cx + 12},${cy} L${cx - 20},${cy + 16} Z`} />
                <circle cx={cx + 16} cy={cy} r="4" />
              </g>
            );
          case "AND":
            return (
              <path
                d={`M${cx - 20},${cy - 16} L${cx - 6},${cy - 16} C${cx + 18},${cy - 16} ${cx + 22},${cy - 8} ${cx + 22},${cy} C${cx + 22},${cy + 8} ${cx + 18},${cy + 16} ${cx - 6},${cy + 16} L${cx - 20},${cy + 16} Z`}
                fill="none"
                stroke={color}
                strokeWidth={sw}
              />
            );
          case "NAND":
            return (
              <g fill="none" stroke={color} strokeWidth={sw}>
                <path d={`M${cx - 20},${cy - 16} L${cx - 6},${cy - 16} C${cx + 16},${cy - 16} ${cx + 20},${cy - 8} ${cx + 20},${cy} C${cx + 20},${cy + 8} ${cx + 16},${cy + 16} ${cx - 6},${cy + 16} L${cx - 20},${cy + 16} Z`} />
                <circle cx={cx + 24} cy={cy} r="4" />
              </g>
            );
          case "OR":
            return (
              <path
                d={`M${cx - 22},${cy - 16} C${cx - 10},${cy - 16} ${cx - 2},${cy - 6} ${cx + 10},${cy} C${cx - 2},${cy + 6} ${cx - 10},${cy + 16} ${cx - 22},${cy + 16} C${cx - 14},${cy + 6} ${cx - 14},${cy - 6} ${cx - 22},${cy - 16} Z`}
                fill="none"
                stroke={color}
                strokeWidth={sw}
              />
            );
          case "NOR":
            return (
              <g fill="none" stroke={color} strokeWidth={sw}>
                <path d={`M${cx - 22},${cy - 16} C${cx - 10},${cy - 16} ${cx - 2},${cy - 6} ${cx + 8},${cy} C${cx - 2},${cy + 6} ${cx - 10},${cy + 16} ${cx - 22},${cy + 16} C${cx - 14},${cy + 6} ${cx - 14},${cy - 6} ${cx - 22},${cy - 16} Z`} />
                <circle cx={cx + 12} cy={cy} r="4" />
              </g>
            );
          case "XOR":
            return (
              <g fill="none" stroke={color} strokeWidth={sw}>
                <path d={`M${cx - 22},${cy - 16} C${cx - 10},${cy - 16} ${cx - 2},${cy - 6} ${cx + 10},${cy} C${cx - 2},${cy + 6} ${cx - 10},${cy + 16} ${cx - 22},${cy + 16} C${cx - 14},${cy + 6} ${cx - 14},${cy - 6} ${cx - 22},${cy - 16} Z`} />
                <path d={`M${cx - 26},${cy - 16} C${cx - 14},${cy - 16} ${cx - 6},${cy - 6} ${cx + 6},${cy} C${cx - 6},${cy + 6} ${cx - 14},${cy + 16} ${cx - 26},${cy + 16}`} />
              </g>
            );
          case "XNOR":
            return (
              <g fill="none" stroke={color} strokeWidth={sw}>
                <path d={`M${cx - 22},${cy - 16} C${cx - 10},${cy - 16} ${cx - 2},${cy - 6} ${cx + 8},${cy} C${cx - 2},${cy + 6} ${cx - 10},${cy + 16} ${cx - 22},${cy + 16} C${cx - 14},${cy + 6} ${cx - 14},${cy - 6} ${cx - 22},${cy - 16} Z`} />
                <path d={`M${cx - 26},${cy - 16} C${cx - 14},${cy - 16} ${cx - 6},${cy - 6} ${cx + 4},${cy} C${cx - 6},${cy + 6} ${cx - 14},${cy + 16} ${cx - 26},${cy + 16}`} />
                <circle cx={cx + 12} cy={cy} r="4" />
              </g>
            );
          default:
            return null;
        }
      })()}
    </svg>
  );
}

function InputNode({
  label,
  value,
  color,
  onClick,
}: {
  label: string;
  value: boolean;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-0.5 cursor-pointer select-none focus:outline-none"
      aria-label={`Toggle input ${label}`}
    >
      <span className="text-[9px] text-[10px] font-medium tracking-wider text-muted">{label}</span>
      <div
        className="size-8 size-9 rounded-lg border flex items-center justify-center transition-all duration-200"
        style={{
          borderColor: value ? color : "var(--color-border)",
          background: value ? `${color}20` : "var(--color-surface-raised)",
          boxShadow: value ? `0 0 14px ${color}50, inset 0 0 8px ${color}20` : "inset 0 1px 2px rgba(0,0,0,0.3)",
          transform: value ? "scale(1.05)" : "scale(1)",
        }}
      >
        <span
          className="text-xs text-sm font-bold font-mono transition-colors duration-200"
          style={{ color: value ? color : "#555" }}
        >
          {value ? "1" : "Ø"}
        </span>
      </div>
      <span className="text-[8px] text-[9px] font-mono text-muted/50">{value ? "1" : "0"}</span>
    </button>
  );
}

function OutputNode({ value, color }: { value: boolean; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[9px] text-[10px] font-medium tracking-wider text-muted">OUT</span>
      <div
        className="size-8 size-9 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: value ? `${color}25` : "var(--color-surface-raised)",
          border: `2px solid ${value ? color : "var(--color-border)"}`,
          boxShadow: value ? `0 0 16px ${color}60, inset 0 0 8px ${color}20` : "inset 0 1px 2px rgba(0,0,0,0.3)",
          transform: value ? "scale(1.05)" : "scale(1)",
        }}
      >
        <span
          className="text-xs text-sm font-bold font-mono transition-colors duration-200"
          style={{ color: value ? color : "#555" }}
        >
          {value ? "1" : "Ø"}
        </span>
      </div>
    </div>
  );
}

function Wires({ gate, a, b, out, color }: { gate: GateKey; a: boolean; b: boolean; out: boolean; color: string }) {
  const wireOff = "#3a3f48";
  const wireProps = (active: boolean) => ({
    stroke: active ? color : wireOff,
    strokeWidth: active ? "2.5" : "1.5",
    className: active ? "wire-active" : "",
    style: { transition: "stroke 0.2s, stroke-width 0.2s" },
  });

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
      {gate === "WIRE" ? (
        <line x1="20%" y1="50%" x2="80%" y2="50%" {...wireProps(a)} />
      ) : (
        <>
          <line x1="22%" y1="36%" x2="55%" y2="36%" {...wireProps(a)} />
          <line x1="22%" y1="64%" x2="55%" y2="64%" {...wireProps(b)} />
          <path
            d="M55%,36% C58%,36% 60%,42% 60%,50%"
            fill="none"
            {...wireProps(a)}
          />
          <path
            d="M55%,64% C58%,64% 60%,58% 60%,50%"
            fill="none"
            {...wireProps(b)}
          />
        </>
      )}
      <line x1="72%" y1="50%" x2="80%" y2="50%" {...wireProps(out)} />
    </svg>
  );
}

function TruthTable({
  info,
  a,
  b,
  color,
}: {
  info: GateInfo;
  a: boolean;
  b: boolean;
  color: string;
}) {
  const rows = info.inputs === 1
    ? [{ a: false, out: info.fn(false, false) }, { a: true, out: info.fn(true, false) }]
    : [
        { a: false, b: false, out: info.fn(false, false) },
        { a: false, b: true, out: info.fn(false, true) },
        { a: true, b: false, out: info.fn(true, false) },
        { a: true, b: true, out: info.fn(true, true) },
      ];

  return (
    <table className="w-full text-[11px] text-xs border-collapse">
      <thead>
        <tr className="border-b border-border">
          <th className="py-1 pr-2 text-left font-medium text-muted/60">A</th>
          {info.inputs === 2 && <th className="py-1 pr-2 text-left font-medium text-muted/60">B</th>}
          <th className="py-1 text-left font-medium text-muted/60">OUT</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => {
          const isActive = info.inputs === 1
            ? row.a === a
            : row.a === a && (row as any).b === b;
          return (
            <tr
              key={i}
              className="border-b border-border/30 transition-colors duration-150"
              style={{
                background: isActive ? `${color}15` : "transparent",
                boxShadow: isActive ? `inset 2px 0 0 ${color}` : "none",
              }}
            >
              <td className="py-1 pr-2 font-mono" style={{ color: isActive && row.a ? color : "var(--color-muted)" }}>
                {row.a ? "1" : "0"}
              </td>
              {info.inputs === 2 && (
                <td className="py-1 pr-2 font-mono" style={{ color: isActive && (row as any).b ? color : "var(--color-muted)" }}>
                  {(row as any).b ? "1" : "0"}
                </td>
              )}
              <td className="py-1 font-mono font-bold" style={{ color: isActive && row.out ? color : "var(--color-muted)" }}>
                {row.out ? "1" : "0"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function GateCard({ info, delayClass }: { info: GateInfo; delayClass: string }) {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const theme = themes[info.gate];
  const out = info.fn(a, b);
  const gateColor = out ? theme.color : "#555";

  return (
    <div
      className={`gate-card-base animate-fade-in ${delayClass} overflow-hidden`}
      style={{ borderColor: out ? `${theme.color}50` : "var(--color-border)" }}
    >
      <div className="p-4 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-mono text-muted/50 font-medium tracking-wider">
            {String(info.index).padStart(2, "0")}
          </span>
          <span
            className="size-2 rounded-full"
            style={{
              background: theme.color,
              boxShadow: `0 0 8px ${theme.color}80`,
            }}
          />
          <span className="text-sm font-semibold">{theme.label}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-end gap-2 gap-3">
            <InputNode label="A" value={a} color={theme.color} onClick={() => setA(!a)} />
            {info.inputs === 2 && (
              <InputNode label="B" value={b} color={theme.color} onClick={() => setB(!b)} />
            )}
          </div>

          <div className="flex-1 flex items-center justify-center px-1">
            <div className="relative flex items-center w-full" style={{ height: 56 }}>
              <Wires gate={info.gate} a={a} b={b} out={out} color={theme.color} />
              <div className="relative z-10 mx-auto">
                <GateSymbol gate={info.gate} color={gateColor} />
              </div>
            </div>
          </div>

          <OutputNode value={out} color={theme.color} />
        </div>

        <div className="text-[11px] text-xs font-mono mb-1.5" style={{ color: "var(--color-muted)" }}>
          A=<span style={{ color: a ? theme.color : undefined, fontWeight: a ? 700 : 400 }}>{a ? "1" : "0"}</span>
          {info.inputs === 2 && (
            <>  B=<span style={{ color: b ? theme.color : undefined, fontWeight: b ? 700 : 400 }}>{b ? "1" : "0"}</span></>
          )}
          {" → "}OUT=<span style={{ color: out ? theme.color : undefined, fontWeight: out ? 700 : 400 }}>{out ? "1" : "0"}</span>
        </div>

        <p className="text-[11px] text-xs leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
          {descriptions[info.gate]}
        </p>
      </div>

      <div className="px-4 pb-4">
        <TruthTable info={info} a={a} b={b} color={theme.color} />
      </div>
    </div>
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
    <main className="min-h-dvh px-3 px-4 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/logic-gates"
          className="back-btn inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back
        </Link>

        <h2 className="text-2xl text-3xl sm:text-4xl font-bold gradient-text text-center mb-6 sm:mb-8">
          7 Basic Logic Gates
        </h2>

        <div className="grid grid-cols-1 grid-cols-2 gap-3 gap-4">
          {gateDefs.map((info, i) => (
            <GateCard key={info.gate} info={info} delayClass={delayClasses[i]} />
          ))}
        </div>
      </div>
    </main>
  );
}