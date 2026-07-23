---
name: Screens & Navigation
description: All screen names, flow, and what each screen contains
---

# Screens & Navigation

## Screen type
```ts
type Screen = 'welcome' | 'menu' | 'logic-gates' | 'basic-logic-gates' | 'gears' | 'linkages'
```

## Flow
```
welcome → menu → logic-gates → basic-logic-gates
                → gears
                → linkages
                → coming-soon (toast only, no screen)
```

## Screen descriptions

### welcome
- Green gradient title "BABFT Learning"
- Image placeholder box (logo not provided yet)
- Pulsing "START LEARNING" button → goes to menu

### menu
- 4 buttons: Logic Gates (blue), Gears (amber), Linkages Mechanic (indigo #818cf8), Coming Soon (locked/disabled)
- handleComingSoon() shows a toast notification

### logic-gates
- Block diagram of a logic circuit
- 8 gate cards navigating to basic-logic-gates or showing detail

### basic-logic-gates
- 8 interactive SVG gate cards: AND, OR, NOT, NAND, NOR, XOR, XNOR, WIRE
- Clickable input toggles (A/B), shows output

### gears
- Scrollable list of 36 gear types
- Top bar: Back button (left) + search input (right)
- Search filters name + desc, empty state shown if no match
- Each card calls handleComingSoon() (detail not yet implemented)

### linkages
- Responsive CSS grid of 45 linkage cards
- Top bar: Back button (left) + search input (right)  
- Same search pattern as gears
- Each card calls handleComingSoon()
