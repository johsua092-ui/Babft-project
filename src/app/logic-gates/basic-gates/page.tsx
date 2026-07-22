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

  const toggleInput = (index: number) => {
    if (index === 0) {
      setInputs([!inputs[0]]);
    } else {
      setInputB(!inputB);
    }
  };

  return (
    <main className="min-h-dvh px-4 py-6 sm:py-10">
      <div className="max-w-4xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-border bg-surface p-4">
              <h3 className="text-lg font-semibold mb-3 text-center">{currentGate.label}</h3>
              <GateVisualizer
                gate={selectedGate}
                inputs={inputs.length === 1 ? inputs : [inputs[0], inputB]}
                output={output}
              />
            </div>

            <div className="rounded-xl border border-border bg-surface p-4">
              <h3 className="text-lg font-semibold mb-4">Interactive Input</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-muted w-16">Input A:</span>
                  <button
                    onClick={() => toggleInput(0)}
                    className={`w-14 h-8 rounded-lg font-bold text-sm transition-all ${
                      inputs[0]
                        ? "bg-neon text-black shadow-[0_0_15px_var(--color-neon-glow)]"
                        : "bg-border text-muted"
                    }`}
                  >
                    {inputs[0] ? "1" : "0"}
                  </button>
                </div>
                {currentGate.inputs === 2 && (
                  <div className="flex items-center gap-4">
                    <span className="text-muted w-16">Input B:</span>
                    <button
                      onClick={() => toggleInput(1)}
                      className={`w-14 h-8 rounded-lg font-bold text-sm transition-all ${
                        inputB
                          ? "bg-neon text-black shadow-[0_0_15px_var(--color-neon-glow)]"
                          : "bg-border text-muted"
                      }`}
                    >
                      {inputB ? "1" : "0"}
                    </button>
                  </div>
                )}
                <div className="flex items-center gap-4 mt-2 pt-3 border-t border-border">
                  <span className="text-muted w-16">Output:</span>
                  <span
                    className={`w-14 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      output
                        ? "bg-neon text-black shadow-[0_0_15px_var(--color-neon-glow)]"
                        : "bg-border text-muted"
                    }`}
                  >
                    {output ? "1" : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <h3 className="text-lg font-semibold mb-4">Truth Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 px-3 text-left text-muted font-medium">Input A</th>
                    {currentGate.inputs === 2 && (
                      <th className="py-2 px-3 text-left text-muted font-medium">Input B</th>
                    )}
                    <th className="py-2 px-3 text-left text-neon font-medium">Output</th>
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
                        className={`border-b border-border/50 transition-colors ${
                          isActive ? "bg-neon/10" : ""
                        }`}
                      >
                        <td className="py-2 px-3 font-mono">
                          {row.inputs[0] ? "1" : "0"}
                        </td>
                        {currentGate.inputs === 2 && (
                          <td className="py-2 px-3 font-mono">
                            {row.inputs[1] ? "1" : "0"}
                          </td>
                        )}
                        <td className="py-2 px-3 font-mono font-bold text-neon">
                          {row.output ? "1" : "0"}
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
