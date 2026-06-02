# Sanguine Hero Block

## Overview

Full-bleed dark hero section for the Sanguine Biosciences storefront. Renders a branded indigo gradient background with a content column (eyebrow badge, heading with accent word highlight, description, dual CTAs, stat strip) and an optional 2×2 live-data card grid on the right at desktop widths.

## Integration

### Block Configuration

Authored as a key-value table in DA.live. Each row: first cell = key, second cell = value.

| Configuration Key | Type | Default | Description | Required |
|---|---|---|---|---|
| `heading` | string | — | Main headline text | Yes |
| `heading-accent` | string | — | Word within heading to highlight in brand orange | No |
| `eyebrow` | string | — | Small badge text above heading | No |
| `description` | rich text | — | Body paragraph below heading | No |
| `cta-primary` | link | — | Primary CTA button (author as a link) | No |
| `cta-secondary` | link | — | Ghost CTA button | No |
| `stat-1` … `stat-N` | string | — | `"Value \| Label"` — populates stat strip | No |
| `card-1-label` … `card-4-mono` | string | — | Data cards on right: label, value, sub, mono per card | No |

### Events

<!-- No events emitted or consumed -->

## Behavior Patterns

### Responsive Layout
- **Mobile**: Content column only, visual card grid hidden
- **Desktop (≥900px)**: Two-column grid — content left, card grid right

### Heading Accent
The value of `heading-accent` is used to find and wrap a substring of `heading` in an `<span>` that renders in brand orange.
