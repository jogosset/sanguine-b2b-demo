# Sanguine Trust Bar Block

## Overview

Horizontal strip of trust signals placed below the hero. Renders 5 items (icon + label + sub-label) in a flex row at tablet/desktop and a stacked list on mobile.

## Integration

### Block Configuration

Authored as a grid table in DA.live. Each row = one trust item with three cells.

| Cell | Content | Description |
|---|---|---|
| 1 | Emoji or icon | Displayed in a small rounded icon container |
| 2 | Label text | Bold label line |
| 3 | Sub-label text | Muted sub-label below label |

### Events

<!-- No events emitted or consumed -->

## Behavior Patterns

- **Mobile**: Items stack vertically with padding
- **Tablet/Desktop (≥600px)**: Items arranged horizontally with `justify-content: space-around`
