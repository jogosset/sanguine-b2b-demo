# Sanguine CTA Banner Block

## Overview

Full-width red call-to-action strip placed at the bottom of content sections. Renders a heading, short description, and up to two action buttons (white primary + ghost secondary).

## Integration

### Block Configuration

Authored as a key-value table in DA.live.

| Configuration Key | Type | Description | Required |
|---|---|---|---|
| `heading` | string | Banner headline | Yes |
| `description` | rich text | Supporting copy | No |
| `cta-primary` | link | White primary button | No |
| `cta-secondary` | link | Ghost secondary button | No |

### Events

<!-- No events emitted or consumed -->

## Behavior Patterns

- **Mobile**: Copy and actions stacked vertically
- **Desktop (≥900px)**: Copy on left, action buttons on right (flex row)
