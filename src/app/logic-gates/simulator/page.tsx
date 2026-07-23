"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
import { bit, gateDefinitions, getTruthRows, type GateDefinition, type GateKey } from "../data";

function GateShape({ gate, color, active }: { gate: GateKey; color: string; active: boolean }) {
  return (
    <div
      className="grid min-h-48 place-items-center rounded-3xl border bg-background/40 p-6"
      style={{
        borderColor: active ? `${color}88` : "var(--color-border)",
        boxShadow: active ? `0 0 36px ${color}22` : "none",
      }}
    >
      <div className="relative grid h-32 w-full max-w-md place-items-center">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 360 140" className="absolute inset-0 h-full w-full">
          <path d="M10 48H130" stroke="#3a3f48" strokeWidth="4" strokeLinecap="round" />
          <path d="M10 92H130" stroke="#3a3f48" strokeWidth="4" strokeLinecap="round" />
          <path d="M230 70H350" stroke={active ? color : "#3a3f48"} strokeWidth="4" strokeLinecap="round" className={active ? "wire-active" : undefined} />
        </svg>
        <div className="relative z-10 rounded-2xl border border-border bg-surface px-8 py-5 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color }}>{gate}</p>
          <p className="mt-2 text-sm text-muted">logic gate</p>
        </div>
      </div>
    </div>
  );
}

function BitSwitch({
  label,
  value,
  color,
  disabled,
  onToggle,
}: {
  label: string;
  value: boolean;
  color: string;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={value}
      disabled={disabled}
      onClick={onToggle}
      className="rounded-2xl border border-border bg-surface p-4 text-left transition enabled:hover:border-silver disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ outlineColor: color }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted">{label}</span>
      <span className="mt-3 flex items-center justify-between gap-4">
        <span className="text-sm text-muted">{disabled ? "Not used by this gate" : value ? "High signal" : "Low signal"}</span>
        <span
          className="grid size-11 place-items-center rounded-xl border font-mono text-base font-bold"
          style={{
            borderColor: value && !disabled ? color : "var(--color-border)",
            background: value && !disabled ? `${color}22` : "var(--color-surface-raised)",
            color: value && !disabled ? color : "var(--color-muted)",
          }}
        >
          {bit(value)}
        </span>
      </span>
    </button>
  );
}

export default function SimulatorPage() {
  const [selectedGate, setSelectedGate] = useState<GateKey>("AND");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  const definition = useMemo<GateDefinition>(
    () => gateDefinitions.find((item) => item.gate === selectedGate) ?? gateDefinitions[2],
    [selectedGate],
  );
  const out = definition.fn(a, b);
  const activeRow = getTruthRows(definition).find((row) =>
    definition.inputs === 1 ? row.a === a : row.a === a && row.b === b,
  );

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
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-muted">Single gate workbench</p>
          <h1 className="gradient-text text-3xl font-bold sm:text-5xl">Create Logic Gates Simulator</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Pick a gate, change the input bits, and read the active truth-table row as the output changes.
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="gate-card-base p-4">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
              <Play aria-hidden="true" className="size-5 text-neon" />
              Gate type
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {gateDefinitions.map((item) => (
                <button
                  key={item.gate}
                  type="button"
                  aria-pressed={item.gate === selectedGate}
                  onClick={() => setSelectedGate(item.gate)}
                  className="rounded-xl border px-3 py-3 text-left transition hover:border-silver focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{
                    borderColor: item.gate === selectedGate ? item.color : "var(--color-border)",
                    background: item.gate === selectedGate ? `${item.color}16` : "var(--color-surface-raised)",
                    outlineColor: item.color,
                  }}
                >
                  <span className="block text-sm font-semibold">{item.gate}</span>
                  <span className="mt-1 block text-[11px] text-muted">{item.inputs} input{item.inputs === 2 ? "s" : ""}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="gate-card-base overflow-hidden">
            <div className="border-b border-border p-5">
              <p className="font-mono text-xs uppercase tracking-[0.24em]" style={{ color: definition.color }}>
                {definition.rule}
              </p>
              <h2 className="mt-2 text-2xl font-bold">{definition.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{definition.description}</p>
            </div>

            <div className="grid gap-4 p-5 xl:grid-cols-[0.8fr_1.2fr]">
              <div className="space-y-3">
                <BitSwitch label="Input A" value={a} color={definition.color} onToggle={() => setA((value) => !value)} />
                <BitSwitch
                  label="Input B"
                  value={b}
                  color={definition.color}
                  disabled={definition.inputs === 1}
                  onToggle={() => setB((value) => !value)}
                />
                <div className="rounded-2xl border border-border bg-background/35 p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">Result</p>
                  <p className="mt-2 text-4xl font-bold" style={{ color: out ? definition.color : "var(--color-muted)" }}>
                    OUT = {bit(out)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <GateShape gate={definition.gate} color={definition.color} active={out} />
                <div className="rounded-2xl border border-border bg-background/35 p-4">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">Active truth row</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-surface-raised p-3">
                      <p className="font-mono text-[11px] text-muted">A</p>
                      <p className="mt-1 text-2xl font-bold" style={{ color: activeRow?.a ? definition.color : "var(--color-muted)" }}>
                        {bit(Boolean(activeRow?.a))}
                      </p>
                    </div>
                    <div className="rounded-xl bg-surface-raised p-3">
                      <p className="font-mono text-[11px] text-muted">B</p>
                      <p className="mt-1 text-2xl font-bold" style={{ color: activeRow?.b ? definition.color : "var(--color-muted)" }}>
                        {definition.inputs === 1 ? "—" : bit(Boolean(activeRow?.b))}
                      </p>
                    </div>
                    <div className="rounded-xl bg-surface-raised p-3">
                      <p className="font-mono text-[11px] text-muted">OUT</p>
                      <p className="mt-1 text-2xl font-bold" style={{ color: activeRow?.out ? definition.color : "var(--color-muted)" }}>
                        {bit(Boolean(activeRow?.out))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
