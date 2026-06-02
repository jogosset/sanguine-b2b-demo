# Sanguine Quick Order Block

## Overview

Table-style list of frequently reordered biospecimen products. Each row shows a thumbnail emoji, product name + SKU, availability count, price, and an "Add to Cart" button. The availability, price, and button columns are hidden on mobile and visible at desktop widths.

## Integration

### Block Configuration

Authored as a grid table in DA.live. Each row = one product with four cells.

| Cell | Content | Description |
|---|---|---|
| 1 | Emoji | Thumbnail icon displayed in a rounded container |
| 2 | `"Name \| SKU"` | Pipe-separated — name renders bold, SKU in monospace below |
| 3 | Availability string | e.g. "82 units" — shown with a green dot indicator |
| 4 | Price string | e.g. "$410 / vial" |

### Events

<!-- No events emitted or consumed -->

## Behavior Patterns

- **Mobile**: Only thumbnail and name/SKU column visible
- **Desktop (≥900px)**: Full 5-column grid with availability, price, and add-to-cart button
- The "Add to Cart" button is a `<button type="button">` — wire up cart integration via a script or dropin separately
