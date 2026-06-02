# Sanguine Product Teaser Block

## Overview

Section header + active filter bar + 3-column responsive product card grid. Each card shows a gradient image area with emoji, status badges, product name, SKU, spec tags, price, and an Add to Cart / Request Quote button.

## Integration

### Block Configuration

Mix of header key-value rows followed by product rows (one row per card, minimum 7 cells).

**Header rows (key | value):**

| Key | Description |
|---|---|
| `title` | Section heading |
| `subtitle` | Subheading text |
| `view-all` | Link — "View full catalog →" |
| `filters` | Pipe-separated filter labels: `All \| Healthy Donors \| Disease State \| ...` |

**Product rows (7+ cells per row):**

| Cell | Content |
|---|---|
| 0 | Emoji icon |
| 1 | Category name (e.g. PBMCs) |
| 2 | Product name |
| 3 | SKU |
| 4 | Badge(s) — "In Stock", "Low Stock", "Best Seller", "GMP Grade", or pipe-combined |
| 5..N-2 | One spec tag per cell |
| N-1 | Price ("$380 / vial") |
| N | Optional CTA label override (defaults to "Add to Cart") |

### Badge variants

| Badge text | Style |
|---|---|
| `In Stock` | Orange background with orange dot |
| `Low Stock` | Red background with red dot |
| `Best Seller` | Dark navy background, white text |
| `GMP Grade` | Purple background, white text |

### Card image backgrounds

Assigned by CSS `nth-child` position (1→light blue, 2→pink, 3→green, 4→purple, 5→amber, 6→indigo). Repeats for additional rows.

## Behavior Patterns

- Filter bar toggles active class on click (visual only — no data filtering in this block)
- Cards lift on hover with shadow
- CTA defaults to "Add to Cart"; author the last cell with different text to override (e.g. "Request Quote")
