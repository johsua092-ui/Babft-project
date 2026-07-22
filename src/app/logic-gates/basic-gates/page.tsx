"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GateVisualizer from "@/components/GateVisualizer";

type GateType = "WIRE" | "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";

interface GateInfo {
  type: GateType;
  label: string;
  inputs: number;
  fn: (a: boolean, b: boolean) => boolean;
}

const gates: GateInfo[] = [
  { type: "WIRE", label: "Basic Wire", inputs: 1, fn: (a) => a },
  { type: "NOT", label: "NOT Gate", inputs: 1, fn: (a) => !a },
  { type: "AND", label: "AND Gate", inputs: 2, fn: (a, b) => a && b },
  { type: "NAND", label: "NAND Gate", inputs: 2, fn: (a, b) => !(a && b) },
  { type: "OR", label: "OR Gate", inputs: 2, fn: (a, b) => a || b },
  { type: "NOR", label: "NOR Gate", inputs: 2, fn: (a, b) => !(a || b) },
  { type: "XOR", label: "XOR Gate", inputs: 2, fn: (a, b) => a !== b },
  { type: "XNOR", label: "XNOR Gate", inputs: 2, fn: (a, b) => a === b },
];

function getTruthTable(gate: GateInfo): { inputs: boolean[]; output: boolean }[] {
  if (gate.inputs === 1) {
    return [
      { inputs: [false], output: gate.fn(false, false) },
      { inputs: [true], output: gate.fn(true, false) },
    ];
  }
  return [
    { inputs: [false, false], output: gate.fn(false, false) },
    { inputs: [false, true], output: gate.fn(false, true) },
    { inputs: [true, false], output: gate.fn(true, false) },
    { inputs: [true, true], output: gate.fn(true, true) },
  ];
}

function LeverSwitch({ isOn, onClick, label }: { isOn: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 group"
    >
      <div className="relative w-16 h-28 rounded-xl border border-border bg-surface flex flex-col items-center justify-between py-3 transition-all duration-300 group-hover:border-border-light">
        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          isOn ? "bg-neon shadow-[0_0_12px_var(--color-neon-glow)]" : "bg-border-light"
        }`} />

        <div className="relative w-5 h-12 bg-background rounded-md border border-border overflow-hidden">
          <div
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
              isOn
                ? "top-1 bg-neon shadow-[0_0_10px_var(--color-neon-glow)]"
                : "top-auto bottom-1 bg-muted"
            }`}
          />
        </div>

        <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          isOn ? "bg-neon shadow-[0_0_12px_var(--color-neon-glow)]" : "bg-border-light"
        }`} />
      </div>

      <div className="flex flex-col items-start gap-1">
        <span className="text-xs text-muted font-medium tracking-wider uppercase">{label}</span>
        <span className={`text-2xl font-bold font-mono transition-colors ${
          isOn ? "text-neon" : "text-muted"
        }`}>
          {isOn ? "1" : "0"}
        </span>
      </div>
    </button>
  );
}

export default function BasicGatesPage() {
  const [selectedGate, setSelectedGate] = useState<GateType>("WIRE");
  const [inputs, setInputs] = useState<boolean[]>([false]);
  const [inputB, setInputB] = useState<boolean>(false);

  const currentGate = gates.find((g) => g.type === selectedGate)!;
  const output = currentGate.fn(inputs[0], inputB);
  const truthTable = getTruthTable(currentGate);

  const handleGateSelect = (gate: GateInfo) => {
    setSelectedGate(gate.type);
    setInputs(gate.inputs === 1 ? [false] : [false, false]);
    setInputB(false);
  };

  const toggleA = () => setInputs([!inputs[0]]);
  const toggleB = () => setInputB(!inputB);

  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/logic-gates" className="inline-block mb-6">
          <div className="back-btn flex items-center gap-2 px-4 py-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </div>
        </Link>

        <h2 className="text-3xl sm:text-4xl font-bold gradient-text text-center mb-8">
          7 Basic Logic Gates
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {gates.map((gate) => (
            <button
              key={gate.type}
              onClick={() => handleGateSelect(gate)}
              className={`gate-card px-4 py-3 text-sm sm:text-base font-medium ${
                selectedGate === gate.type ? "active" : ""
              }`}
            >
              {gate.label}
            </button>
          ))}
        </div>

        <div className="glass-panel p-5 sm:p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">{currentGate.label}</h3>
          <GateVisualizer
            gate={selectedGate}
            inputs={inputs.length === 1 ? inputs : [inputs[0], inputB]}
            output={output}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-5 flex flex-col items-center gap-2">
            <h3 className="text-sm font-medium text-muted tracking-wider uppercase mb-2">Controls</h3>
            <div className="flex items-end gap-8">
              <LeverSwitch isOn={inputs[0]} onClick={toggleA} label="Input A" />
              {currentGate.inputs === 2 && (
                <LeverSwitch isOn={inputB} onClick={toggleB} label="Input B" />
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border w-full flex items-center justify-center gap-4">
              <span className="text-sm text-muted font-medium tracking-wider uppercase">Output</span>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-bold font-mono transition-all duration-300 ${
                output
                  ? "bg-neon/15 text-neon border border-neon shadow-[0_0_20px_var(--color-neon-glow)]"
                  : "bg-surface text-muted border border-border"
              }`}>
                {output ? "1" : "0"}
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 lg:col-span-2">
            <h3 className="text-sm font-medium text-muted tracking-wider uppercase mb-4">Truth Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2.5 px-4 text-left text-muted font-medium">Input A</th>
                    {currentGate.inputs === 2 && (
                      <th className="py-2.5 px-4 text-left text-muted font-medium">Input B</th>
                    )}
                    <th className="py-2.5 px-4 text-left text-neon font-medium">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {truthTable.map((row, i) => {
                    const isActive =
                      row.inputs[0] === inputs[0] &&
                      (currentGate.inputs === 1 || row.inputs[1] === inputB);
                    return (
                      <tr
                        key={i}
                        className={`border-b border-border/30 transition-all duration-200 ${
                          isActive
                            ? "bg-neon/8 border-l-2 border-l-neon"
                            : "hover:bg-surface-hover"
                        }`}
                      >
                        <td className="py-3 px-4 font-mono text-lg">
                          <span className={`inline-block w-6 text-center ${row.inputs[0] ? "text-neon" : "text-muted"}`}>
                            {row.inputs[0] ? "1" : "0"}
                          </span>
                        </td>
                        {currentGate.inputs === 2 && (
                          <td className="py-3 px-4 font-mono text-lg">
                            <span className={`inline-block w-6 text-center ${row.inputs[1] ? "text-neon" : "text-muted"}`}>
                              {row.inputs[1] ? "1" : "0"}
                            </span>
                          </td>
                        )}
                        <td className="py-3 px-4 font-mono text-lg font-bold">
                          <span className={`inline-block w-6 text-center ${row.output ? "text-neon" : "text-muted"}`}>
                            {row.output ? "1" : "0"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
