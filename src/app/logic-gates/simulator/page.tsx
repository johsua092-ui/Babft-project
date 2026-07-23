"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Cable, Plus, Trash2 } from "lucide-react";
import { bit, gateDefinitions, type GateDefinition, type GateKey } from "../data";

type LeverKey = "A" | "B" | "C";
type SourceKey = `lever:${LeverKey}` | `gate:${number}`;
type PlacedGate = {
  id: number;
  gate: GateKey;
  inputA: SourceKey;
  inputB: SourceKey;
};
type GatePosition = { x: number; y: number };

const levers: { key: LeverKey; label: string; y: number }[] = [
  { key: "A", label: "Lever A", y: 86 },
  { key: "B", label: "Lever B", y: 142 },
  { key: "C", label: "Lever C", y: 198 },
];
const boardWidth = 820;
const gateWidth = 224;
const gateHeight = 124;
const startX = 264;
const startY = 72;
const columnGap = 272;
const rowGap = 164;
const signalColor = "#32d583";
const offColor = "#41524c";

const getDefinition = (gate: GateKey): GateDefinition =>
  gateDefinitions.find((definition) => definition.gate === gate) ?? gateDefinitions[2];

const sourceLabel = (source: SourceKey, gates: PlacedGate[]) => {
  if (source.startsWith("lever:")) return source.replace("lever:", "Lever ");
  const id = Number(source.replace("gate:", ""));
  const gate = gates.find((item) => item.id === id);
  return gate ? `${gate.gate} ${gate.id}` : "Missing gate";
};

const gatePosition = (index: number): GatePosition => ({
  x: startX + (index % 2) * columnGap,
  y: startY + Math.floor(index / 2) * rowGap,
});

const connectorPath = (from: { x: number; y: number }, to: { x: number; y: number }) => {
  const midX = from.x + Math.max(42, (to.x - from.x) * 0.48);
  return `M${from.x} ${from.y} C${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
};

function LeverSwitch({
  leverKey,
  value,
  onToggle,
}: {
  leverKey: LeverKey;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={value}
      onClick={onToggle}
      className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-left transition hover:border-border-light focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <span>
        <span className="block font-mono text-xs text-muted">Lever {leverKey}</span>
        <span className="mt-1 block text-sm text-silver">{value ? "Signal high" : "Signal low"}</span>
      </span>
      <span
        className="grid size-11 place-items-center rounded-xl border font-mono text-base font-bold tabular-nums"
        style={{
          borderColor: value ? signalColor : "var(--color-border)",
          background: value ? `${signalColor}22` : "var(--color-surface-raised)",
          color: value ? signalColor : "var(--color-muted)",
        }}
      >
        {bit(value)}
      </span>
    </button>
  );
}

function GateIcon({ gate, active }: { gate: GateKey; active: boolean }) {
  const color = active ? signalColor : offColor;
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 92 54" className="h-14 w-24">
      <path d="M2 18H22M2 36H22M70 27H90" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {gate === "WIRE" && <path d="M20 27H72" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />}
      {gate === "NOT" && (
        <g fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round">
          <path d="M26 12v30l30-15z" />
          <circle cx="62" cy="27" r="4" />
        </g>
      )}
      {gate === "AND" && <path d="M26 12h18a15 15 0 0 1 0 30H26z" fill="none" stroke={color} strokeWidth="2.4" />}
      {gate === "NAND" && (
        <g fill="none" stroke={color} strokeWidth="2.4">
          <path d="M24 12h18a15 15 0 0 1 0 30H24z" />
          <circle cx="62" cy="27" r="4" />
        </g>
      )}
      {gate === "OR" && <path d="M22 12c18 0 31 7 45 15-14 8-27 15-45 15 8-10 8-20 0-30z" fill="none" stroke={color} strokeWidth="2.4" />}
      {gate === "NOR" && (
        <g fill="none" stroke={color} strokeWidth="2.4">
          <path d="M20 12c18 0 31 7 45 15-14 8-27 15-45 15 8-10 8-20 0-30z" />
          <circle cx="72" cy="27" r="4" />
        </g>
      )}
      {gate === "XOR" && (
        <g fill="none" stroke={color} strokeWidth="2.4">
          <path d="M24 12c18 0 31 7 45 15-14 8-27 15-45 15 8-10 8-20 0-30z" />
          <path d="M16 12c8 10 8 20 0 30" />
        </g>
      )}
      {gate === "XNOR" && (
        <g fill="none" stroke={color} strokeWidth="2.4">
          <path d="M22 12c18 0 31 7 45 15-14 8-27 15-45 15 8-10 8-20 0-30z" />
          <path d="M14 12c8 10 8 20 0 30" />
          <circle cx="74" cy="27" r="4" />
        </g>
      )}
    </svg>
  );
}

function SourceSelect({
  id,
  label,
  value,
  gates,
  currentIndex,
  onChange,
}: {
  id: string;
  label: string;
  value: SourceKey;
  gates: PlacedGate[];
  currentIndex: number;
  onChange: (value: SourceKey) => void;
}) {
  const availableGates = gates.slice(0, currentIndex);

  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 block font-mono text-[11px] text-muted">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as SourceKey)}
        className="w-full rounded-lg border border-border bg-background px-2 py-2 text-xs text-silver focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {levers.map((lever) => (
          <option key={lever.key} value={`lever:${lever.key}`}>Lever {lever.key}</option>
        ))}
        {availableGates.map((gate) => (
          <option key={gate.id} value={`gate:${gate.id}`}>{gate.gate} {gate.id} output</option>
        ))}
      </select>
    </label>
  );
}

function BoardWires({
  gates,
  values,
  leverValues,
}: {
  gates: PlacedGate[];
  values: Map<number, boolean>;
  leverValues: Record<LeverKey, boolean>;
}) {
  const sourcePoint = (source: SourceKey): { x: number; y: number; active: boolean } => {
    if (source.startsWith("lever:")) {
      const key = source.replace("lever:", "") as LeverKey;
      const lever = levers.find((item) => item.key === key) ?? levers[0];
      return { x: 118, y: lever.y, active: leverValues[key] };
    }

    const id = Number(source.replace("gate:", ""));
    const index = gates.findIndex((gate) => gate.id === id);
    if (index === -1) return { x: 118, y: 254, active: false };
    const position = gatePosition(index);
    return { x: position.x + gateWidth, y: position.y + gateHeight / 2, active: Boolean(values.get(id)) };
  };

  const finalGate = gates.at(-1);
  const finalPosition = finalGate ? gatePosition(gates.length - 1) : undefined;
  const finalActive = finalGate ? Boolean(values.get(finalGate.id)) : false;

  return (
    <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${boardWidth} 520`} className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <filter id="wire-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>
      {gates.flatMap((gate, index) => {
        const definition = getDefinition(gate.gate);
        const position = gatePosition(index);
        const targets = definition.inputs === 1
          ? [{ source: gate.inputA, x: position.x, y: position.y + gateHeight / 2 }]
          : [
              { source: gate.inputA, x: position.x, y: position.y + 43 },
              { source: gate.inputB, x: position.x, y: position.y + 82 },
            ];

        return targets.map((target, targetIndex) => {
          const source = sourcePoint(target.source);
          return (
            <g key={`${gate.id}-${targetIndex}`} filter="url(#wire-shadow)">
              <path d={connectorPath(source, target)} fill="none" stroke="#20302b" strokeWidth="10" strokeLinecap="round" />
              <path
                d={connectorPath(source, target)}
                fill="none"
                stroke={source.active ? signalColor : offColor}
                strokeWidth={source.active ? 4 : 2.5}
                strokeLinecap="round"
                className={source.active ? "wire-active" : undefined}
              />
              <circle cx={target.x} cy={target.y} r="5" fill={source.active ? signalColor : "var(--color-surface-raised)"} stroke={source.active ? signalColor : offColor} strokeWidth="2" />
            </g>
          );
        });
      })}
      {finalGate && finalPosition && (
        <g filter="url(#wire-shadow)">
          <path
            d={connectorPath({ x: finalPosition.x + gateWidth, y: finalPosition.y + gateHeight / 2 }, { x: boardWidth - 76, y: 86 })}
            fill="none"
            stroke="#20302b"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={connectorPath({ x: finalPosition.x + gateWidth, y: finalPosition.y + gateHeight / 2 }, { x: boardWidth - 76, y: 86 })}
            fill="none"
            stroke={finalActive ? signalColor : offColor}
            strokeWidth={finalActive ? 4 : 2.5}
            strokeLinecap="round"
            className={finalActive ? "wire-active" : undefined}
          />
        </g>
      )}
    </svg>
  );
}

function GateCard({
  gate,
  index,
  gates,
  value,
  onTypeChange,
  onSourceChange,
  onRemove,
}: {
  gate: PlacedGate;
  index: number;
  gates: PlacedGate[];
  value: boolean;
  onTypeChange: (gate: GateKey) => void;
  onSourceChange: (input: "A" | "B", source: SourceKey) => void;
  onRemove: () => void;
}) {
  const definition = getDefinition(gate.gate);

  return (
    <article
      className="absolute rounded-2xl border bg-surface p-3 shadow-lg"
      style={{
        left: gatePosition(index).x,
        top: gatePosition(index).y,
        width: gateWidth,
        height: gateHeight,
        borderColor: value ? signalColor : "var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <label className="min-w-0 flex-1">
          <span className="mb-1 block font-mono text-[11px] text-muted">Gate {gate.id}</span>
          <select
            value={gate.gate}
            onChange={(event) => onTypeChange(event.target.value as GateKey)}
            className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-sm font-bold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {gateDefinitions.map((definition) => (
              <option key={definition.gate} value={definition.gate}>{definition.gate}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          aria-label={`Remove gate ${gate.id}`}
          onClick={onRemove}
          className="grid size-9 shrink-0 place-items-center rounded-lg border border-border text-muted transition hover:border-border-light hover:text-foreground"
        >
          <Trash2 aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="mt-2 grid grid-cols-[1fr_auto] items-end gap-2">
        <div className="space-y-2">
          <SourceSelect
            id={`gate-${gate.id}-input-a`}
            label="Input A"
            value={gate.inputA}
            gates={gates}
            currentIndex={index}
            onChange={(source) => onSourceChange("A", source)}
          />
          {definition.inputs === 2 && (
            <SourceSelect
              id={`gate-${gate.id}-input-b`}
              label="Input B"
              value={gate.inputB}
              gates={gates}
              currentIndex={index}
              onChange={(source) => onSourceChange("B", source)}
            />
          )}
        </div>
        <div className="text-center">
          <GateIcon gate={gate.gate} active={value} />
          <span
            className="mx-auto mt-1 grid size-8 place-items-center rounded-lg border font-mono text-xs font-bold tabular-nums"
            style={{
              borderColor: value ? signalColor : "var(--color-border)",
              color: value ? signalColor : "var(--color-muted)",
              background: value ? `${signalColor}22` : "var(--color-surface-raised)",
            }}
          >
            {bit(value)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function SimulatorPage() {
  const [selectedGate, setSelectedGate] = useState<GateKey>("AND");
  const [nextId, setNextId] = useState(3);
  const [leverValues, setLeverValues] = useState<Record<LeverKey, boolean>>({ A: true, B: false, C: true });
  const [gates, setGates] = useState<PlacedGate[]>([
    { id: 1, gate: "AND", inputA: "lever:A", inputB: "lever:B" },
    { id: 2, gate: "NOT", inputA: "gate:1", inputB: "lever:C" },
  ]);

  const gateValues = useMemo(() => {
    const outputs = new Map<number, boolean>();
    const readSource = (source: SourceKey) => {
      if (source.startsWith("lever:")) {
        const key = source.replace("lever:", "") as LeverKey;
        return leverValues[key];
      }

      return outputs.get(Number(source.replace("gate:", ""))) ?? false;
    };

    gates.forEach((gate) => {
      const definition = getDefinition(gate.gate);
      outputs.set(gate.id, definition.fn(readSource(gate.inputA), readSource(gate.inputB)));
    });

    return outputs;
  }, [gates, leverValues]);

  const finalGate = gates.at(-1);
  const finalOutput = finalGate ? Boolean(gateValues.get(finalGate.id)) : false;
  const boardHeight = Math.max(420, startY + Math.ceil(Math.max(gates.length, 1) / 2) * rowGap + 120);

  const addGate = () => {
    setGates((current) => [
      ...current,
      {
        id: nextId,
        gate: selectedGate,
        inputA: current.length === 0 ? "lever:A" : (`gate:${current[current.length - 1].id}` as SourceKey),
        inputB: "lever:B",
      },
    ]);
    setNextId((value) => value + 1);
  };

  const updateGate = (id: number, patch: Partial<PlacedGate>) => {
    setGates((current) => current.map((gate) => gate.id === id ? { ...gate, ...patch } : gate));
  };

  const removeGate = (id: number) => {
    setGates((current) =>
      current
        .filter((gate) => gate.id !== id)
        .map((gate) => ({
          ...gate,
          inputA: gate.inputA === `gate:${id}` ? "lever:A" : gate.inputA,
          inputB: gate.inputB === `gate:${id}` ? "lever:B" : gate.inputB,
        })),
    );
  };

  const loadExample = () => {
    setGates([
      { id: 1, gate: "AND", inputA: "lever:A", inputB: "lever:B" },
      { id: 2, gate: "OR", inputA: "gate:1", inputB: "lever:C" },
      { id: 3, gate: "NOT", inputA: "gate:2", inputB: "lever:B" },
    ]);
    setNextId(4);
  };

  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/logic-gates"
          className="back-btn mb-6 inline-flex items-center gap-2 px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </Link>

        <header className="mb-8 max-w-3xl">
          <p className="kicker">Logic builder</p>
          <h1 className="title-text mt-2 text-3xl font-black sm:text-5xl">Create Logic Gates Simulator</h1>
          <p className="body-copy mt-3 text-sm sm:text-base">
            Build your own circuit. Add gates to the board, switch the levers, then wire each gate input to a lever or another gate output.
          </p>
        </header>

        <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <section className="gate-card-base p-4">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                <Cable aria-hidden="true" className="size-5 text-neon" />
                Parts bin
              </h2>
              <label className="block">
                <span className="mb-2 block text-sm text-muted">Gate to place</span>
                <select
                  value={selectedGate}
                  onChange={(event) => setSelectedGate(event.target.value as GateKey)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {gateDefinitions.map((definition) => (
                    <option key={definition.gate} value={definition.gate}>{definition.gate} gate</option>
                  ))}
                </select>
              </label>
              <button type="button" onClick={addGate} className="primary-btn mt-3 w-full gap-2 px-4 py-3 text-sm">
                <Plus aria-hidden="true" className="size-4" />
                Place gate on board
              </button>
              <button
                type="button"
                onClick={loadExample}
                className="mt-2 w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-sm font-semibold text-silver transition hover:border-border-light hover:text-foreground"
              >
                Load sample circuit
              </button>
            </section>

            <section className="gate-card-base p-4">
              <h2 className="mb-3 text-lg font-semibold">Levers</h2>
              <div className="space-y-3">
                {levers.map((lever) => (
                  <LeverSwitch
                    key={lever.key}
                    leverKey={lever.key}
                    value={leverValues[lever.key]}
                    onToggle={() => setLeverValues((current) => ({ ...current, [lever.key]: !current[lever.key] }))}
                  />
                ))}
              </div>
            </section>
          </aside>

          <section className="gate-card-base overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Circuit board</h2>
                <p className="mt-1 text-sm text-muted">Wires update live based on the source selected in each gate input.</p>
              </div>
              <div className="rounded-2xl border border-border bg-background/50 px-4 py-3">
                <p className="font-mono text-[11px] text-muted">Final output</p>
                <p className="mt-1 text-3xl font-black tabular-nums" style={{ color: finalOutput ? signalColor : "var(--color-muted)" }}>
                  {gates.length === 0 ? "—" : bit(finalOutput)}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="relative min-w-[820px] bg-background/30" style={{ width: boardWidth, height: boardHeight }}>
                <BoardWires gates={gates} values={gateValues} leverValues={leverValues} />

                <div className="absolute left-4 top-8 w-32 rounded-2xl border border-border bg-surface/95 p-3">
                  <p className="mb-2 font-mono text-[11px] text-muted">INPUT RAIL</p>
                  <div className="space-y-3">
                    {levers.map((lever) => (
                      <div key={lever.key} className="flex items-center justify-between gap-2 rounded-xl bg-surface-raised px-3 py-2">
                        <span className="font-mono text-sm text-silver">{lever.key}</span>
                        <span
                          className="grid size-7 place-items-center rounded-lg border font-mono text-xs font-bold tabular-nums"
                          style={{
                            borderColor: leverValues[lever.key] ? signalColor : "var(--color-border)",
                            color: leverValues[lever.key] ? signalColor : "var(--color-muted)",
                          }}
                        >
                          {bit(leverValues[lever.key])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute right-5 top-8 w-28 rounded-2xl border border-border bg-surface/95 p-3 text-center">
                  <p className="font-mono text-[11px] text-muted">OUTPUT</p>
                  <p className="mt-3 text-4xl font-black tabular-nums" style={{ color: finalOutput ? signalColor : "var(--color-muted)" }}>
                    {gates.length === 0 ? "—" : bit(finalOutput)}
                  </p>
                </div>

                {gates.length === 0 && (
                  <div className="absolute left-56 top-28 w-96 rounded-3xl border border-dashed border-border bg-surface/80 p-6 text-center">
                    <h3 className="text-xl font-bold">Board is empty</h3>
                    <p className="body-copy mt-2 text-sm">Choose a gate from the parts bin, then place it on the board.</p>
                  </div>
                )}

                {gates.map((gate, index) => (
                  <GateCard
                    key={gate.id}
                    gate={gate}
                    index={index}
                    gates={gates}
                    value={Boolean(gateValues.get(gate.id))}
                    onTypeChange={(nextGate) => updateGate(gate.id, { gate: nextGate })}
                    onSourceChange={(input, source) => updateGate(gate.id, input === "A" ? { inputA: source } : { inputB: source })}
                    onRemove={() => removeGate(gate.id)}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-border p-4">
              <h2 className="text-lg font-semibold">Connection list</h2>
              <div className="mt-3 grid gap-2 lg:grid-cols-2">
                {gates.map((gate) => {
                  const definition = getDefinition(gate.gate);
                  return (
                    <div key={gate.id} className="rounded-2xl border border-border bg-background/35 p-3 text-sm text-muted">
                      <span className="font-semibold text-silver">{gate.gate} {gate.id}</span>: A from {sourceLabel(gate.inputA, gates)}
                      {definition.inputs === 2 && <>; B from {sourceLabel(gate.inputB, gates)}</>}
                      <span className="font-mono text-silver">; OUT {bit(Boolean(gateValues.get(gate.id)))}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
