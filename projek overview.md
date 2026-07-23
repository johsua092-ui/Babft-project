---
name: Project Overview
description: High-level summary of the BABFT Learning SPA project
---

# BABFT Learning — Project Overview

**Artifact dir:** `artifacts/logic-gates/`
**Page title:** "Mrtono1977 - BABFT Learning"
**Stack:** React + Vite + TypeScript, pnpm monorepo
**Entry point:** `artifacts/logic-gates/src/App.tsx` (~2230+ lines — entire app in one file)
**Fonts:** Orbitron (headings/buttons) + Inter (body) via Google Fonts in index.html

## Purpose
Dark-themed educational SPA covering engineering/science topics. Mobile + desktop accessible. No backend — all data is hardcoded in App.tsx.

## Key design decisions
- All screens managed by `useState<Screen>` in App.tsx — no router
- No backend, no database — pure frontend
- Image placeholder on Welcome screen (user hasn't provided logo yet)
- Individual gear/linkage detail screens NOT yet implemented — cards call `handleComingSoon()` (toast)
