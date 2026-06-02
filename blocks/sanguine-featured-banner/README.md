# Sanguine Featured Banner Block

## Overview

Full-width dark promotional banner with brand indigo gradient, heading with accent highlight, description, dual CTAs, and a column of stat cards on the right at desktop widths. Used to feature a product line or announcement.

## Integration

### Block Configuration

Authored as a key-value table in DA.live.

| Configuration Key | Type | Description | Required |
|---|---|---|---|
| `eyebrow` | string | Small badge above heading | No |
| `heading` | string | Banner headline | Yes |
| `heading-accent` | string | Substring of heading to highlight in orange | No |
| `description` | rich text | Body paragraph | No |
| `cta-primary` | link | Primary CTA | No |
| `cta-secondary` | link | Ghost CTA | No |
| `stat-1` … `stat-N` | string | `"icon \| value \| label"` — right-column stat cards | No |

### Events

<!-- No events emitted or consumed -->

## Behavior Patterns

- **Mobile**: Single column; stat cards stack below content
- **Desktop (≥900px)**: Two-column flex layout — content left, stat cards right
- The `::before` pseudo-element adds a radial orange glow on the right side
