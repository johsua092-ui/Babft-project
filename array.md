---
name: Data Arrays
description: All hardcoded data in App.tsx — gear types, linkage types, logic gates
---

# Data Arrays in App.tsx

All data is hardcoded in `artifacts/logic-gates/src/App.tsx`. No database, no backend.

## GEAR_TYPES — 36 entries
Each entry: `{ id: string, name: string, icon: string, color: string, desc: string }`

| id | name | color |
|----|------|-------|
| spur | Spur Gear | #4caf50 |
| helical | Helical Gear | #2196f3 |
| double-helical | Double Helical/Herringbone | #9c27b0 |
| bevel | Bevel Gear | #ff9800 |
| spiral-bevel | Spiral Bevel Gear | #f44336 |
| zerol-bevel | Zerol Bevel Gear | #e91e63 |
| hypoid | Hypoid Gear | #ff5722 |
| worm | Worm Gear | #795548 |
| worm-wheel | Worm Wheel | #607d8b |
| rack | Rack & Pinion | #009688 |
| internal | Internal/Ring Gear | #3f51b5 |
| planetary | Planetary/Epicyclic | #673ab7 |
| sun | Sun Gear | #ffc107 |
| ring-gear | Ring Gear (Annulus) | #8bc34a |
| compound | Compound Gear | #00bcd4 |
| idler | Idler Gear | #ff9800 |
| miter | Miter Gear | #4caf50 |
| crown | Crown Gear | #ffd700 |
| face | Face Gear | #ff6b35 |
| skew-bevel | Skew Bevel Gear | #da70d6 |
| crossed-helical | Crossed Helical/Screw | #20b2aa |
| harmonic | Harmonic Drive/Flexspline | #7b68ee |
| cycloidal | Cycloidal Drive | #32cd32 |
| noncircular | Non-circular Gear | #ff4500 |
| elliptical | Elliptical Gear | #1e90ff |
| sector | Sector Gear | #ff69b4 |
| segment | Segment Gear | #adff2f |
| lantern | Lantern/Pin Gear | #dda0dd |
| cage | Cage Gear | #f0e68c |
| sprocket | Sprocket/Chain Gear | #b8860b |
| ratchet | Ratchet & Pawl | #cd5c5c |
| geneva | Geneva Drive | #4682b4 |
| globoid | Globoid/Hindley Worm | #2e8b57 |
| straight-bevel | Straight Bevel Gear | #d2691e |
| conical | Conical Involute Gear | #8fbc8f |
| magnetic | Magnetic Gear | #9400d3 |

## LINKAGE_TYPES — 45 entries
Each entry: `{ id: string, name: string, icon: string, color: string, desc: string }`

| id | name | color |
|----|------|-------|
| four-bar | Four-Bar Linkage | #4caf50 |
| slider-crank | Slider-Crank | #2196f3 |
| scotch-yoke | Scotch Yoke | #9c27b0 |
| crank-rocker | Crank-Rocker | #ff9800 |
| double-crank | Double Crank/Drag Link | #f44336 |
| double-rocker | Double Rocker | #009688 |
| pantograph | Pantograph | #3f51b5 |
| watt-1 | Watt's Linkage I | #673ab7 |
| watt-2 | Watt's Linkage II | #e91e63 |
| chebyshev | Chebyshev Linkage | #ff5722 |
| peaucellier | Peaucellier-Lipkin | #795548 |
| roberts | Roberts Linkage | #607d8b |
| hoekens | Hoekens Linkage | #ffc107 |
| stephenson-1 | Stephenson I | #8bc34a |
| stephenson-2 | Stephenson II | #00bcd4 |
| stephenson-3 | Stephenson III | #ff9800 |
| watt-six-1 | Watt Six-Bar I | #4caf50 |
| watt-six-2 | Watt Six-Bar II | #ffd700 |
| toggle | Toggle/Knee Linkage | #ff6b35 |
| oldham | Oldham Coupling | #da70d6 |
| hook | Hook's Joint/Universal | #20b2aa |
| rzeppa | Rzeppa CV Joint | #7b68ee |
| tripode | Tripode CV Joint | #32cd32 |
| double-cardan | Double Cardan Joint | #ff4500 |
| bellcrank | Bell Crank Linkage | #1e90ff |
| rack-link | Rack & Pinion Linkage | #ff69b4 |
| cam-link | Cam-Follower Linkage | #adff2f |
| whitworth | Whitworth Quick-Return | #dda0dd |
| crank-shaper | Crank Shaper Mechanism | #f0e68c |
| grasshopper | Grasshopper Linkage | #b8860b |
| lambda | Lambda Linkage | #cd5c5c |
| sarrus | Sarrus Linkage | #4682b4 |
| kempe | Kempe Linkage | #2e8b57 |
| klann | Klann Linkage (walking) | #d2691e |
| jansen | Jansen Linkage (walking) | #8fbc8f |
| theo-jansen | Theo Jansen Strandbeest | #9400d3 |
| bennett | Bennett Linkage (3D) | #c71585 |
| bricard | Bricard Linkage (3D) | #00ced1 |
| wobble-plate | Wobble Plate Mechanism | #ff8c00 |
| scotch-yoke-var | Scotch Yoke Variant | #6a5acd |
| elliptic-trammel | Elliptic Trammel | #3cb371 |
| drag-link | Drag Link Mechanism | #dc143c |
| quick-return | Quick-Return Mechanism | #4169e1 |
| toggle-clamp | Toggle Clamp Mechanism | #228b22 |
| straight-line | Straight-Line Mechanism | #b22222 |

## Logic Gate Cards — 8 entries
AND, OR, NOT, NAND, NOR, XOR, XNOR, WIRE
Each has interactive input toggles (A/B), truth-table logic, SVG shape rendering.
