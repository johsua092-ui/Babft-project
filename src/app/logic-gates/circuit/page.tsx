"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lightbulb, Network } from "lucide-react";
import { bit } from "../data";

type Circuit = {
  id: string;
  title: string;
  formula: string;
  summary: string;
  color: string;
  evaluate: (a: boolean, b: boolean, c: boolean) => {
    steps: { label: string; value: boolean }[];
    out: boolean;
  };
};

const circuits: Circuit[] = [
  {
    id: "alarm",
    title: "Safety alarm",
    formula: "(A OR B) AND NOT C",
    summary: "Alarm turns on when either sensor is active and the override is off.",
    color: "#38bdf8",
    evaluate: (a, b, c) => {
      const sensor = a || b;
      const override = !c;
      return { steps: [{ label: "A OR B", value: sensor }, { label: "NOT C", value: override }], out: sensor && override };
    },
  },
  {
    id: "vote",
    title: "Two-of-three vote",
    formula: "(A AND B) OR (A AND C) OR (B AND C)",
    summary: "Output turns on when at least two inputs agree with value 1.",
    color: "#22c55e",
    evaluate: (a, b, c) => {
      const ab = a && b;
      const ac = a && c;
      const bc = b && c;
      return { steps: [{ label: "A AND B", value: ab }, { label: "A AND C", value: ac }, { label: "B AND C", value: bc }], out: ab || ac || bc };
    },
  },
  {
    id: "parity",
    title: "Odd parity checker",
    formula: "A XOR B XOR C",
    summary: "Output turns on when the number of active inputs is odd.",
    color: "#eab308",
    evaluate: (a, b, c) => {
      const first = a !== b;
      return { steps: [{ label: "A XOR B", value: first }, { label: "(A XOR B) XOR C", value: first !== c }], out: first !== c };
    },
  },
];

function Toggle({
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
      type="button"
      aria-pressed={value}
      onClick={onClick}
      className="rounded-2xl border border-border bg-surface px-4 py-3 text-left transition hover:border-silver focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: color }}
    >
      <span className="block font-mono text-xs tracking-[0.24em] text-muted">{label}</span>
      <span className="mt-2 flex items-center gap-3">
        <span
          className="grid size-9 place-items-center rounded-lg border font-mono font-bold"
          style={{
            borderColor: value ? color : "var(--color-border)",
            background: value ? `${color}22` : "var(--color-surface-raised)",
            color: value ? color : "var(--color-muted)",
          }}
        >
          {bit(value)}
        </span>
        <span className="text-sm text-muted">{value ? "Signal on" : "Signal off"}</span>
      </span>
    </button>
  );
}

export default function CircuitPage() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);
  const [selectedId, setSelectedId] = useState(circuits[0].id);
  const selected = circuits.find((circuit) => circuit.id === selectedId) ?? circuits[0];
  const result = selected.evaluate(a, b, c);

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

        <header className="mb-8 max-w-3xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-muted">Circuit playground</p>
          <h1 className="gradient-text text-3xl font-bold sm:text-5xl">Logic Gates Circuit</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Combine basic gates into useful circuits. Change A, B, and C to see every intermediate signal.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.3fr]">
          <section className="gate-card-base p-4">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Network aria-hidden="true" className="size-5 text-neon" />
              Inputs
            </h2>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <Toggle label="A" value={a} color={selected.color} onClick={() => setA((value) => !value)} />
              <Toggle label="B" value={b} color={selected.color} onClick={() => setB((value) => !value)} />
              <Toggle label="C" value={c} color={selected.color} onClick={() => setC((value) => !value)} />
            </div>
          </section>

          <section className="gate-card-base overflow-hidden">
            <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-3">
              {circuits.map((circuit) => (
                <button
                  key={circuit.id}
                  type="button"
                  aria-pressed={selected.id === circuit.id}
                  onClick={() => setSelectedId(circuit.id)}
                  className="rounded-xl border px-3 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: selected.id === circuit.id ? circuit.color : "var(--color-border)",
                    background: selected.id === circuit.id ? `${circuit.color}16` : "var(--color-surface-raised)",
                    outlineColor: circuit.color,
                  }}
                >
                  <span className="block text-sm font-semibold">{circuit.title}</span>
                  <span className="mt-1 block font-mono text-[11px] text-muted">{circuit.formula}</span>
                </button>
              ))}
            </div>

            <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.22em]" style={{ color: selected.color }}>
                  {selected.formula}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{selected.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{selected.summary}</p>

                <div className="mt-6 space-y-3">
                  {result.steps.map((step, index) => (
                    <div key={step.label} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/30 p-3">
                      <span className="grid size-8 place-items-center rounded-full bg-surface-raised font-mono text-xs text-muted">
                        {index + 1}
                      </span>
                      <span className="flex-1 font-mono text-sm text-silver">{step.label}</span>
                      <span
                        className="grid size-9 place-items-center rounded-lg border font-mono font-bold"
                        style={{
                          borderColor: step.value ? selected.color : "var(--color-border)",
                          color: step.value ? selected.color : "var(--color-muted)",
                          background: step.value ? `${selected.color}20` : "var(--color-surface-raised)",
                        }}
                      >
                        {bit(step.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid min-w-40 place-items-center rounded-3xl border border-border bg-background/40 p-6">
                <Lightbulb
                  aria-hidden="true"
                  className="size-16"
                  style={{
                    color: result.out ? selected.color : "var(--color-muted)",
                    filter: result.out ? `drop-shadow(0 0 18px ${selected.color})` : "none",
                  }}
                />
                <p className="mt-4 font-mono text-xs tracking-[0.24em] text-muted">OUTPUT</p>
                <p className="mt-1 text-5xl font-bold" style={{ color: result.out ? selected.color : "var(--color-muted)" }}>
                  {bit(result.out)}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
