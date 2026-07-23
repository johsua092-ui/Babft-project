export type GateKey = "WIRE" | "NOT" | "AND" | "NAND" | "OR" | "NOR" | "XOR" | "XNOR";

export type GateDefinition = {
  gate: GateKey;
  index: number;
  inputs: 1 | 2;
  label: string;
  color: string;
  description: string;
  rule: string;
  fn: (a: boolean, b: boolean) => boolean;
};

export type TruthRow = {
  a: boolean;
  b?: boolean;
  out: boolean;
};

export const gateDefinitions: GateDefinition[] = [
  {
    gate: "WIRE",
    index: 1,
    inputs: 1,
    label: "Basic Wire",
    color: "#60a5fa",
    description: "Output EXACTLY follows input",
    rule: "OUT = A",
    fn: (a) => a,
  },
  {
    gate: "NOT",
    index: 2,
    inputs: 1,
    label: "NOT Gate",
    color: "#ef4444",
    description: "Output is INVERTED from input",
    rule: "OUT = NOT A",
    fn: (a) => !a,
  },
  {
    gate: "AND",
    index: 3,
    inputs: 2,
    label: "AND Gate",
    color: "#22c55e",
    description: "Output is 1 only if BOTH inputs are 1",
    rule: "OUT = A AND B",
    fn: (a, b) => a && b,
  },
  {
    gate: "NAND",
    index: 4,
    inputs: 2,
    label: "NAND Gate",
    color: "#f97316",
    description: "Output is 0 only if BOTH inputs are 1",
    rule: "OUT = NOT (A AND B)",
    fn: (a, b) => !(a && b),
  },
  {
    gate: "OR",
    index: 5,
    inputs: 2,
    label: "OR Gate",
    color: "#3b82f6",
    description: "Output is 1 if AT LEAST ONE input is 1",
    rule: "OUT = A OR B",
    fn: (a, b) => a || b,
  },
  {
    gate: "NOR",
    index: 6,
    inputs: 2,
    label: "NOR Gate",
    color: "#a855f7",
    description: "Output is 0 if AT LEAST ONE input is 1",
    rule: "OUT = NOT (A OR B)",
    fn: (a, b) => !(a || b),
  },
  {
    gate: "XOR",
    index: 7,
    inputs: 2,
    label: "XOR Gate",
    color: "#14b8a6",
    description: "Output is 1 if inputs are DIFFERENT",
    rule: "OUT = A XOR B",
    fn: (a, b) => a !== b,
  },
  {
    gate: "XNOR",
    index: 8,
    inputs: 2,
    label: "XNOR Gate",
    color: "#ec4899",
    description: "Output is 1 if inputs are SAME",
    rule: "OUT = NOT (A XOR B)",
    fn: (a, b) => a === b,
  },
];

export const getTruthRows = (definition: GateDefinition): TruthRow[] => {
  if (definition.inputs === 1) {
    return [
      { a: false, out: definition.fn(false, false) },
      { a: true, out: definition.fn(true, false) },
    ];
  }

  return [
    { a: false, b: false, out: definition.fn(false, false) },
    { a: false, b: true, out: definition.fn(false, true) },
    { a: true, b: false, out: definition.fn(true, false) },
    { a: true, b: true, out: definition.fn(true, true) },
  ];
};

export const bit = (value: boolean) => (value ? "1" : "0");
