---
name: SVG Components
description: GearIconSVG and LinkageIconSVG — how they work and their coordinate helpers
---

# SVG Components

## GearIconSVG
Switch/case component that renders a unique SVG icon for each of the 36 gear types.
Uses a `gearPath()` helper function for common gear tooth path generation.
Each case returns an `<svg>` with the gear's characteristic visual shape.

## LinkageIconSVG
Switch/case component that renders kinematic stick-figure SVG for each of the 45 linkage types.

### Coordinate helpers (normalized 0–1 space, maps to viewBox 0 0 100 100):
- `B(x, y)` — draws a bar/link (line segment between two points)
- `J(x, y)` — draws a joint (small filled circle)
- `FP(x, y)` — draws a fixed pivot (triangle pointing down, grounded)
- `Rail(x1, x2, y)` — draws a horizontal rail/guide
- `Slider(x, y)` — draws a sliding block on a rail
- `colorToRgb(hex)` — converts hex color to "r,g,b" string for SVG drop-shadow filter

### Visual conventions:
- Bars = `<line>` elements (links/cranks/rockers)
- Joints = `<circle>` elements (pin joints, revolute pairs)
- Fixed pivots = `<polygon>` triangle elements (grounded pivots)
- Rails = `<rect>` elements (prismatic guides)
- Sliders = `<rect>` elements (sliding blocks)
