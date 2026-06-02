# Sanguine Categories Block

## Overview

Clickable category card grid for navigating specimen types (PBMCs, Leukopaks, Plasma, etc.). Renders 2 columns on mobile, 3 on tablet, 6 on desktop. Each card is an `<a>` element.

## Integration

### Block Configuration

Authored as a grid table in DA.live. Each row = one category with four cells.

| Cell | Content | Description |
|---|---|---|
| 1 | Emoji or icon | Displayed in a rounded icon container |
| 2 | Category name | Bold name text |
| 3 | Product count | Muted count string (e.g. "342 products") |
| 4 | Link | Authored as a hyperlink — provides the `href` for the card |

### Events

<!-- No events emitted or consumed -->

## Behavior Patterns

- Each category row becomes a fully-clickable `<a>` card
- Hover: border turns orange, card lifts 2px with shadow
