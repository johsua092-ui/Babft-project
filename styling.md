---
name: Styling Rules
description: Why inline styles with !important are required; CSS variable failure in Replit iframe
---

# Styling Rules

## Rule: Always use inline styles with `!important`
CSS variables (e.g. `var(--color-bg)`) fail silently inside the Replit iframe preview. Colors may not render at all or fall back to browser defaults.

**Why:** The Replit preview pane is a proxied iframe — some CSS cascade layers are stripped or overridden by the host frame's stylesheet.

**How to apply:** Every color, background, border, font, etc. that must be guaranteed → write as inline style with `!important`. Do NOT use CSS custom properties for visual styling. index.css is only used for keyframe animations and layout class helpers (`.linkage-grid`, `.linkage-card`, etc.).

## Color palette
- Background: `#0d1117` (page), `#161b22` (cards), `#1c2128` (inputs)
- Borders: `#2d3f55` default, lighter on hover
- Text: `#e6edf3` primary, `#8b949e` muted
- Accents: green `#4caf50`, blue `#60a5fa`, amber `#f59e0b`, indigo `#818cf8`, red `#f87171`
