"use client";

import { useState } from "react";
import Link from "next/link";

type GateKey = "WIRE" | "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";

const themes: Record<GateKey, { color: string; bg: string; label: string }> = {
  WIRE: { color: "#60a5fa", bg: "rgba(96,165,250,0.08)", label: "Basic Wire" },
  NOT: { color: "#ef4444", bg: "rgba(239,68,68,0.08)", label: "NOT Gate" },
  AND: { color: "#22c55e", bg: "rgba(34,197,94,0.08)", label: "AND Gate" },
  NAND: { color: "#f97316", bg: "rgba(249,115,22,0.08)", label: "NAND Gate" },
  OR: { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", label: "OR Gate" },
  NOR: { color: "#a855f7", bg: "rgba(168,85,247,0.08)", label: "NOR Gate" },
  XOR: { color: "#14b8a6", bg: "rgba(20,184,166,0.08)", label: "XOR Gate" },
  XNOR: { color: "#ec4899", bg: "rgba(236,72,153,0.08)", label: "XNOR Gate" },
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

type GateInfo = {
  gate: GateKey;
  index: number;
  inputs: number;
  fn: (a: boolean, b: boolean) => boolean;
};

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
    <div className="flex flex-col items-center gap-1 cursor-pointer select-none" onClick={onClick}>
      <span className="text-[10px] font-medium tracking-wider text-muted">{label}</span>
      <div
        className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200"
        style={{
          borderColor: value ? color : "var(--color-border)",
          background: value ? `${color}20` : "var(--color-surface)",
          boxShadow: value ? `0 0 12px ${color}40` : "none",
        }}
      >
        <span
          className="text-xs font-bold font-mono transition-colors duration-200"
          style={{ color: value ? color : "#666" }}
        >
          {value ? "1" : "Ø"}
        </span>
      </div>
      <span className="text-[9px] font-mono text-muted/60">{value ? "1" : "0"}</span>
    </div>
  );
}

function OutputNode({ value, color }: { value: boolean; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-medium tracking-wider text-muted">OUT</span>
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: value ? `${color}25` : "var(--color-surface)",
          border: `2px solid ${value ? color : "var(--color-border)"}`,
          boxShadow: value ? `0 0 14px ${color}50` : "none",
        }}
      >
        <span
          className="text-xs font-bold font-mono transition-colors duration-200"
          style={{ color: value ? color : "#666" }}
        >
          {value ? "1" : "Ø"}
        </span>
      </div>
    </div>
  );
}

function GateSymbol({ gate, color }: { gate: GateKey; color: string }) {
  const w = 80;
  const h = 52;
  const cx = w / 2;
  const cy = h / 2;

  const renderShape = () => {
    switch (gate) {
      case "WIRE":
        return null;
      case "NOT":
        return (
          <g>
            <polygon points={`${cx - 16},${cy - 14} ${cx + 8},${cy} ${cx - 16},${cy + 14}`} fill="none" stroke={color} strokeWidth="1.8" />
            <circle cx={cx + 10} cy={cy} r="3.5" fill="none" stroke={color} strokeWidth="1.8" />
          </g>
        );
      case "AND":
        return (
          <path
            d={`M${cx - 16},${cy - 14} L${cx - 4},${cy - 14} C${cx + 16},${cy - 14} ${cx + 20},${cy - 6} ${cx + 20},${cy} C${cx + 20},${cy + 6} ${cx + 16},${cy + 14} ${cx - 4},${cy + 14} L${cx - 16},${cy + 14} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1.8"
          />
        );
      case "NAND":
        return (
          <g>
            <path
              d={`M${cx - 16},${cy - 14} L${cx - 4},${cy - 14} C${cx + 14},${cy - 14} ${cx + 18},${cy - 6} ${cx + 18},${cy} C${cx + 18},${cy + 6} ${cx + 14},${cy + 14} ${cx - 4},${cy + 14} L${cx - 16},${cy + 14} Z`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <circle cx={cx + 20} cy={cy} r="3.5" fill="none" stroke={color} strokeWidth="1.8" />
          </g>
        );
      case "OR":
        return (
          <path
            d={`M${cx - 18},${cy - 14} C${cx - 8},${cy - 14} ${cx - 2},${cy - 4} ${cx + 8},${cy} C${cx - 2},${cy + 4} ${cx - 8},${cy + 14} ${cx - 18},${cy + 14} C${cx - 10},${cy + 4} ${cx - 10},${cy - 4} ${cx - 18},${cy - 14} Z`}
            fill="none"
            stroke={color}
            strokeWidth="1.8"
          />
        );
      case "NOR":
        return (
          <g>
            <path
              d={`M${cx - 18},${cy - 14} C${cx - 8},${cy - 14} ${cx - 2},${cy - 4} ${cx + 6},${cy} C${cx - 2},${cy + 4} ${cx - 8},${cy + 14} ${cx - 18},${cy + 14} C${cx - 10},${cy + 4} ${cx - 10},${cy - 4} ${cx - 18},${cy - 14} Z`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <circle cx={cx + 8} cy={cy} r="3.5" fill="none" stroke={color} strokeWidth="1.8" />
          </g>
        );
      case "XOR":
        return (
          <g>
            <path
              d={`M${cx - 18},${cy - 14} C${cx - 8},${cy - 14} ${cx - 2},${cy - 4} ${cx + 8},${cy} C${cx - 2},${cy + 4} ${cx - 8},${cy + 14} ${cx - 18},${cy + 14}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <path
              d={`M${cx - 22},${cy - 14} C${cx - 12},${cy - 14} ${cx - 6},${cy - 4} ${cx + 2},${cy} C${cx - 6},${cy + 4} ${cx - 12},${cy + 14} ${cx - 22},${cy + 14}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <path
              d={`M${cx - 18},${cy - 14} C${cx - 10},${cy - 4} ${cx - 10},${cy + 4} ${cx - 18},${cy + 14}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
          </g>
        );
      case "XNOR":
        return (
          <g>
            <path
              d={`M${cx - 18},${cy - 14} C${cx - 8},${cy - 14} ${cx - 2},${cy - 4} ${cx + 6},${cy} C${cx - 2},${cy + 4} ${cx - 8},${cy + 14} ${cx - 18},${cy + 14}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <path
              d={`M${cx - 22},${cy - 14} C${cx - 12},${cy - 14} ${cx - 6},${cy - 4} ${cx},${cy} C${cx - 6},${cy + 4} ${cx - 12},${cy + 14} ${cx - 22},${cy + 14}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <path
              d={`M${cx - 18},${cy - 14} C${cx - 10},${cy - 4} ${cx - 10},${cy + 4} ${cx - 18},${cy + 14}`}
              fill="none"
              stroke={color}
              strokeWidth="1.8"
            />
            <circle cx={cx + 8} cy={cy} r="3.5" fill="none" stroke={color} strokeWidth="1.8" />
          </g>
        );
    }
  };

  if (gate === "WIRE") {
    return (
      <svg width={w} height={h} className="overflow-visible">
        <line x1={0} y1={cy} x2={w} y2={cy} stroke={color} strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg width={w} height={h} className="overflow-visible">
      {renderShape()}
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
    <table className="w-full text-[11px] border-collapse">
      <thead>
        <tr>
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
              className="transition-colors duration-150"
              style={{
                background: isActive ? `${color}15` : "transparent",
              }}
            >
              <td className="py-0.5 pr-2 font-mono" style={{ color: isActive && row.a ? color : "var(--color-muted)" }}>
                {row.a ? "1" : "0"}
              </td>
              {info.inputs === 2 && (
                <td className="py-0.5 pr-2 font-mono" style={{ color: isActive && (row as any).b ? color : "var(--color-muted)" }}>
                  {(row as any).b ? "1" : "0"}
                </td>
              )}
              <td className="py-0.5 font-mono font-semibold" style={{ color: isActive && row.out ? color : "var(--color-muted)" }}>
                {row.out ? "1" : "0"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function GateCard({ info }: { info: GateInfo }) {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const theme = themes[info.gate];
  const out = info.fn(a, b);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-all duration-200"
      style={{
        borderColor: "var(--color-border)",
        background: "var(--color-surface)",
      }}
    >
      <div className="p-3.5 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-mono text-muted/50 font-medium tracking-wider">
            {String(info.index).padStart(2, "0")}
          </span>
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: theme.color }}
          />
          <span className="text-sm font-semibold">{theme.label}</span>
        </div>

        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-end gap-3">
            <InputNode label="A" value={a} color={theme.color} onClick={() => setA(!a)} />
            {info.inputs === 2 && (
              <InputNode label="B" value={b} color={theme.color} onClick={() => setB(!b)} />
            )}
          </div>

          <div className="flex-1 flex items-center justify-center px-2">
            <div className="relative flex items-center w-full" style={{ height: 58 }}>
              <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                {/* Input A wire */}
                {info.inputs === 1 ? (
                  <line
                    x1="28%"
                    y1="50%"
                    x2={info.gate === "WIRE" ? "72%" : "58%"}
                    y2="50%"
                    stroke={a ? theme.color : "#444"}
                    strokeWidth={a ? "2.5" : "1.5"}
                    style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                  />
                ) : (
                  <>
                    <line
                      x1="28%"
                      y1="36%"
                      x2="57%"
                      y2="36%"
                      stroke={a ? theme.color : "#444"}
                      strokeWidth={a ? "2.5" : "1.5"}
                      style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                    />
                    <line
                      x1="28%"
                      y1="64%"
                      x2="57%"
                      y2="64%"
                      stroke={b ? theme.color : "#444"}
                      strokeWidth={b ? "2.5" : "1.5"}
                      style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                    />
                    {/* OR shape for 2-input merge */}
                    <path
                      d="M57%,36% C60%,36% 62%,40% 62%,50%"
                      fill="none"
                      stroke={a ? theme.color : "#444"}
                      strokeWidth={a ? "2.5" : "1.5"}
                      style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                    />
                    <path
                      d="M57%,64% C60%,64% 62%,60% 62%,50%"
                      fill="none"
                      stroke={b ? theme.color : "#444"}
                      strokeWidth={b ? "2.5" : "1.5"}
                      style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                    />
                  </>
                )}
                {/* Output wire */}
                <line
                  x1={info.gate === "WIRE" ? "72%" : info.gate === "AND" || info.gate === "NAND" ? "76%" : "74%"}
                  y1="50%"
                  x2="80%"
                  y2="50%"
                  stroke={out ? theme.color : "#444"}
                  strokeWidth={out ? "2.5" : "1.5"}
                  style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                />
              </svg>
              <GateSymbol gate={info.gate} color={out ? theme.color : "#555"} />
            </div>
          </div>

          <OutputNode value={out} color={theme.color} />
        </div>

        <div className="text-[11px] font-mono mb-1.5" style={{ color: "var(--color-muted)" }}>
          A=<span style={{ color: a ? theme.color : undefined }}>{a ? "1" : "0"}</span>
          {info.inputs === 2 && (
            <>  B=<span style={{ color: b ? theme.color : undefined }}>{b ? "1" : "0"}</span></>
          )}
          {" -> "}OUT=<span style={{ color: out ? theme.color : undefined }}>{out ? "1" : "0"}</span>
        </div>

        <p className="text-[11px] leading-relaxed mb-2.5" style={{ color: "var(--color-muted)" }}>
          {descriptions[info.gate]}
        </p>
      </div>

      <div className="px-3.5 pb-3.5">
        <TruthTable info={info} a={a} b={b} color={theme.color} />
      </div>
    </div>
  );
}

export default function BasicGatesPage() {
  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
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

        <h2 className="text-3xl sm:text-4xl font-bold gradient-text text-center mb-8">
          7 Basic Logic Gates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {gateDefs.map((info) => (
            <GateCard key={info.gate} info={info} />
          ))}
        </div>
      </div>
    </main>
  );
}
