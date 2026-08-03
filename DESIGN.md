---
name: share.codie.co.nz — Engineering Tools
description: A field guide of self-contained interactive tools for engineering growth and team development.
colors:
  ink: "#0F172A"
  slate-body: "#334155"
  slate-muted: "#64748B"
  slate-faint: "#94A3B8"
  paper: "#F8FAFC"
  card: "#FFFFFF"
  panel: "#F1F5F9"
  hairline: "#E2E8F0"
  hairline-strong: "#CBD5E1"
  accent-indigo: "#6366F1"
  accent-indigo-deep: "#4338CA"
  accent-indigo-tint: "#EEF2FF"
  accent-emerald: "#10B981"
  accent-emerald-deep: "#059669"
  accent-emerald-tint: "#ECFDF5"
  spectrum-sky: "#0369A1"
  spectrum-teal: "#0F766E"
  spectrum-amber: "#B45309"
  spectrum-pink: "#BE185D"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "52px"
components:
  button-primary:
    backgroundColor: "{colors.accent-indigo}"
    textColor: "{colors.card}"
    rounded: "{rounded.sm}"
    padding: "9px 20px"
  button-primary-hover:
    backgroundColor: "{colors.accent-indigo-deep}"
    textColor: "{colors.card}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.slate-body}"
    rounded: "{rounded.sm}"
    padding: "9px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.accent-indigo-deep}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  tag:
    backgroundColor: "{colors.accent-indigo-tint}"
    textColor: "{colors.accent-indigo-deep}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  badge:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.pill}"
    padding: "4px 14px"
---

# Design System: share.codie.co.nz — Engineering Tools

## Overview

**Creative North Star: "The Field Guide"**

This is a reference shelf for engineers, and it behaves like a good field guide: a calm, near-monochrome canvas where structure does the talking and colour is used to *organise*, not to decorate. Someone arrives cold from a shared link and should be oriented in seconds — a dark, textured cover (the hero) states what the tool is, then the page opens into an airy, well-lit grid of white surfaces you can scan and work through at your own pace. Nothing on the page is fighting for attention; the hierarchy is obvious, the reading rhythm is generous, and every accent means something.

The palette is disciplined slate neutrals — an ink-dark cover, paper-cool backgrounds, hairline borders — with a single saturated accent per tool that acts like a coloured index tab. The Junior/Intermediate radar runs emerald; the Senior radar and the Behaviour Principles tool run indigo; the homepage cover keeps a neutral ink base and lets each tool's accent glow through its card. Where a tool needs to distinguish many things at once (the six behaviour principles, the senior profile archetypes), it draws from a controlled spectrum — sky, teal, amber, pink, emerald, violet — always as *labels*, never as mood.

Interaction is where the guide turns tactile and confident: surfaces rest with a soft ambient shadow and lift toward you on hover, controls answer clearly, and the one dark hero per page gives each tool a memorable cover. The look is deliberately brand-neutral — no organisation's identity is adopted, so LHV UK content rides in as content, not as a visual world. Anti-references: no dashboard clutter, no gratuitous gradient-on-gradient, no decorative "technical" costume (monospace, hard block shadows) that isn't earned.

**Key Characteristics:**
- Slate-neutral canvas; one accent per tool used as an organising index colour
- Dark, textured hero "cover" per page over a light, scannable body
- White cards with hairline borders, soft ambient depth, and a hover-lift
- Inter throughout, with a strong display-to-body scale and tight display tracking
- Buildless static pages; visual consistency carried by shared tokens, not a framework

## Colors

A near-monochrome slate foundation carries the whole system; saturated colour appears only as a per-tool accent or a categorical label.

### Primary
- **Indigo Signal** (#6366F1): The default brand accent — used on the Senior radar, the Behaviour Principles tool, homepage brand touches, links, primary buttons, and focus rings. Its deep form (#4338CA) is the hover/active state; its tint (#EEF2FF) fills selected chips and soft callouts.
- **Emerald Signal** (#10B981): The alternate tool accent, owned by the Junior & Intermediate Growth Radar. Deep form #059669 for hover; tint #ECFDF5 for chips. Interchangeable in role with Indigo — a tool commits to one.

### Secondary (categorical spectrum)
Used only where a surface must label many distinct things at once (behaviour principles, profile archetypes). These are index colours, not decoration.
- **Sky** (#0369A1), **Teal** (#0F766E), **Amber** (#B45309), **Pink** (#BE185D), plus deep Indigo (#4F46E5) and deep Emerald (#047857). These are the AA-safe index colours the Behaviour Principles tool uses on number chips, tags, and small accent text. The Senior radar's profile palette (Cyan #06B6D4, Violet #7C3AED, Magenta #DB2777, Warm Amber #D97706, Red #DC2626) predates this and is used only for chart strokes on light fills, not behind white text.

### Neutral
- **Ink Slate** (#0F172A): Primary text, and the base of every dark hero cover.
- **Slate Body** (#334155): Secondary body text and card descriptions.
- **Muted Slate** (#64748B): Meta text, captions, muted labels.
- **Faint Slate** (#94A3B8): Hero subtext on dark, footer text, lowest-emphasis type.
- **Paper** (#F8FAFC): The page background — cool, not white.
- **Card White** (#FFFFFF): Card and surface fills; the working plane.
- **Soft Panel** (#F1F5F9): Nested/secondary panels inside a card (e.g. the additive band blocks).
- **Hairline** (#E2E8F0): Default 1px borders and dividers.
- **Hairline Strong** (#CBD5E1): Stronger borders and default (unpressed) control strokes.

### Named Rules
**The Index-Tab Rule.** Saturated colour is an organising signal, never atmosphere. One accent owns a tool; the spectrum only appears where distinct items must be told apart. If a colour isn't labelling or signalling state, it should be slate.

**The Neutral-Identity Rule.** No external organisation's brand colours enter the system. Content can name any company; the palette stays slate-plus-accent.

**The Legible-Index Rule.** Any accent or index colour used as text, or behind white text (number chips, filled tags, small accent labels), must clear 4.5:1 on white. This is why the categorical spectrum uses deep hues (sky-700, teal-700, amber-700, pink-700, indigo/emerald-600) rather than the bright 500-level tints — the bright versions read as decoration and fail contrast.

## Typography

**Display / Body / Label Font:** Inter (with `system-ui, -apple-system, sans-serif` fallback), loaded from Google Fonts at weights 300, 400, 500, 600, 700.

**Character:** One typeface doing everything, earning range through weight and scale rather than contrast of families. Display sizes are tightly tracked and heavy; body is relaxed and readable; labels are small, spaced, and uppercase. The 300 weight appears only as a quiet "light" span inside large hero titles.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3.25rem), line-height 1.15, tracking -0.02em): Homepage hero title. Often pairs a light-weight (300) muted span with a bold span.
- **Headline** (700, clamp(2.2rem, 4.5vw, 3.4rem), line-height 1.08, tracking -0.035em): The large title on individual tool "cover" heroes.
- **Title** (700, ~1.125–1.25rem, line-height 1.25, tracking -0.01em): Card titles, principle titles, section headers.
- **Body** (400, 0.875–1.0625rem, line-height 1.6–1.7): Descriptions, intros, list items. Keep measure ≈ 65–75ch; current containers (900–980px) hold this well.
- **Label** (600, 0.65–0.72rem, letter-spacing 0.08–0.12em, UPPERCASE): Eyebrow badges, card labels, tags, table headers.

### Named Rules
**The One-Family Rule.** Inter carries display, body, and label. Do not introduce a second family — especially not monospace as a "technical" costume. Range comes from weight and size.

**The Tight-Display Rule.** Display and headline sizes track negative (-0.02em to -0.035em) and stay heavy (700). Small labels track wide (+0.1em) and uppercase. The tracking direction flips with size.

## Layout

A centered single-column reading model over a cool paper background. Page containers are generous but bounded: the homepage tool grid caps at **980px**, tool bodies (e.g. Behaviour Principles) at **900px**, and the full radar app pages at **1360px** with 80px bottom padding.

The homepage uses a responsive card grid (`repeat(auto-fill, minmax(420px, 1fr))`, 24px gap) that collapses to one column at 520px. A signature move: the content region pulls **up into the hero** with a negative top margin (~-48px to -56px), so the first cards or control bar overlap the dark cover and establish depth immediately.

Vertical rhythm is deliberate — tight within a group, generous between groups, and more space above a heading than below it. Spacing steps cluster around 6 / 10 / 16 / 24 / 52px. Breakpoints observed: **520px** (homepage grid), **560px** (tool bodies), **1100px** (radar level-card grids). Section padding on heroes runs 48–80px vertical.

## Elevation & Depth

A soft, ambient depth system: surfaces rest on a gentle diffused shadow and **lift toward the reader on hover**. Depth signals "this is a real, interactive surface," and motion on hover confirms it. This is not a flat system and not a hard-edged one — shadows always carry a real offset and a soft blur.

### Shadow Vocabulary
- **Ambient Rest** (`box-shadow: 0 4px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)`): Default resting shadow on cards and standalone panels. (Radar tools use a marginally tighter `0 4px 12px rgba(0,0,0,0.08)` variant.)
- **Ambient Low** (`box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)`): Buttons and small controls at rest.
- **Lifted** (`box-shadow: 0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)`): Cards on hover, and expanded/open states. Paired with `transform: translateY(-3px)`.
- **Accent Cast** (`box-shadow: 0 2px 8px rgba(accent, 0.3)` → `0 4px 12px rgba(accent, 0.4)` on hover): Under primary buttons only, tinted from the tool accent.

### Named Rules
**The Soft-Lift Rule.** Interactive surfaces rest on Ambient depth and rise (bigger shadow + `translateY(-3px)`) on hover, over ~0.2s. The lift is the primary interaction feedback; keep it consistent across cards.

**The Honest-Shadow Rule.** Every shadow has offset and blur. No zero-blur block shadows, no zero-offset coloured halos standing in for depth.

## Shapes

Rounded, friendly geometry with a clear radius scale: **6px** for controls and inner cells (`sm`), **12px** for panels and nested blocks (`md`), **20px** for cards and major containers (`lg`), and full **pill** (999px) for badges, tags, and status chips. (The radar tools predate the current scale and use 10px/16px for their `md`/`lg`; new work should use 12px/20px.)

Heroes round only their bottom corners (`border-radius: 0 0 lg lg`) on inner tool pages, or run full-bleed on the homepage. Borders are hairline (1px) and quiet; the accent never appears as a thick coloured side-border. Dark heroes carry a subtle dotted-dot texture (`radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)` at 28px) and one soft radial accent glow.

## Components

### Buttons
- **Shape:** Small radius (6px, `sm`), 1px border, compact padding (9px 20px), 600 weight, slightly loose tracking (0.01em).
- **Secondary (default `.btn`):** White card fill, Hairline-Strong border, Slate Body text, Ambient Low shadow. Hover shifts background to Paper, border to accent, text to accent-deep.
- **Primary (`.btn-primary`):** Accent fill, white text, Accent Cast shadow. Hover deepens the accent and grows the cast shadow.
- **Focus:** `outline: 2px solid var(--accent); outline-offset: 2px` — a visible accent ring on every control.

### Chips / Tags
- **Tag:** Pill (999px), accent-tint background with accent-deep text, ~11px, 500 weight. Used for categorising cards.
- **Badge / Eyebrow:** Pill, low-contrast label — on dark heroes a translucent white fill (`rgba(255,255,255,0.07–0.10)`) with a hairline border and a small leading accent dot; in light contexts a Soft Panel fill with Muted text. Uppercase, tracked, 600. (This is an established signature of the incumbent covers; it lives on the hero, not scattered above every heading.)

### Cards / Containers
- **Corner Style:** 20px (`lg`).
- **Background:** Card White on Paper.
- **Shadow Strategy:** Ambient Rest → Lifted on hover (see Elevation).
- **Border:** 1px Hairline.
- **Internal Padding:** 24px body; preview/media regions run edge-to-edge above the body.
- **Behavior:** Whole card is a link; hover lifts it (`translateY(-3px)`) and reveals a bottom-right "Open tool →" pill on media cards.

### Signature Component — Accent-Indexed Accordion (Behaviour Principles)
The clearest expression of "The Field Guide." Collapsible principle cards, each carrying a numbered accent chip and a title/summary; expanding reveals paired behaviour blocks (a Card-White "core" block and a Soft-Panel "additive" block), a drift→reset table, and a highlighted "ask yourself" callout. Each principle owns one spectrum colour used consistently across its chip, left accent bar (revealed on hover/open), bullet markers, and callout tint. A left-edge accent bar (`4px`, revealed on hover/open) is the one place a coloured edge is allowed — as an open-state indicator, not a resting decoration.

### Signature Component — Radar Tool
Interactive SVG radar charts (square viewBox so rings stay circular) with concentric rings, 8 axes, a filled user polygon in the tool accent, and dashed reference polygons for archetypes. Decorative snapshot versions appear inside homepage card previews.

## Do's and Don'ts

### Do:
- **Do** commit each tool to one accent (Indigo or Emerald) and use it as an organising index colour — links, primary action, focus ring, selected state.
- **Do** give every tool a dark Ink-Slate hero "cover" with the dotted texture and one soft accent glow, then open into a light, scannable body.
- **Do** rest interactive surfaces on Ambient depth and lift them `translateY(-3px)` with the Lifted shadow on hover.
- **Do** keep type in Inter, with heavy negative-tracked display (-0.02em to -0.035em) and small uppercase tracked labels (+0.1em).
- **Do** pull the first content block up into the hero with a negative top margin for immediate depth.
- **Do** keep the accent scarce — if a colour isn't labelling or signalling state, make it slate.
- **Do** keep new tools self-contained and buildless, inheriting tokens rather than a framework.

### Don't:
- **Don't** adopt any external organisation's brand colours or identity; content names companies, the palette stays neutral.
- **Don't** introduce a second typeface, or use monospace as a "technical" costume.
- **Don't** use gradient text, hard zero-blur block shadows, or a coloured side-border thicker than 1px as resting decoration (the accordion's open-state bar is the single sanctioned exception).
- **Don't** let the categorical spectrum become mood — it exists to distinguish items, not to fill space.
- **Don't** flatten the depth system: shadows must keep offset and soft blur, never a zero-offset coloured halo.
