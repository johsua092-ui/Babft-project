---
name: Search Feature
description: How search bars work in Gears and Linkages screens
---

# Search Feature

## State
```ts
const [gearSearch, setGearSearch] = useState('')
const [linkSearch, setLinkSearch] = useState('')
```

## Pattern — IIFE in JSX
Both screens use an Immediately Invoked Function Expression to inline filter logic:
```tsx
{(() => {
  const filtered = GEAR_TYPES.filter(g =>
    (g.name + ' ' + g.desc).toLowerCase().includes(gearSearch.toLowerCase())
  );
  if (filtered.length === 0) return <EmptyState />;
  return <div>{filtered.map(g => <Card key={g.id} ... />)}</div>;
})()}
```

## Top bar layout
Flex row: Back button (left) + search input (right), both in same row.

### Back button style
- Font: Orbitron, fontWeight 700, fontSize 13
- Padding: 10px 18px
- Border: 2px solid #2d3f55 (hover → lighter + white text)
- Icon: ArrowLeft size={17} from lucide-react
- On click: resets search state, navigates back to menu

### Search input style
- Border: 2px solid #2d3f55
- Focus glow: green (#4caf50) for Gears, indigo (#818cf8) for Linkages
- × clear button appears when text is present (X icon from lucide-react)
- Searches combined `name + ' ' + desc` string, case-insensitive

## Empty state
Centered div with faded Search icon + "Tidak ada [gear/mekanisme] yang cocok" text.

## Lucide icons used
`Search`, `X`, `ArrowLeft` — all imported from lucide-react
