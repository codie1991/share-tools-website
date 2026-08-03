# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily software engineers and engineering managers, at any organisation, who want a self-serve tool for a specific career-growth or team-development moment: mapping their own skills against a level, calibrating in a review or 1:1, or understanding how their org expects people to behave. They typically arrive via a shared link — someone sends them a specific tool — rather than browsing a catalogue. The audience is general and public, not tied to one company; LHV UK content appears as one worked example, not as the assumed context.

## Product Purpose

A growing, public collection of small, self-contained interactive tools for engineering career growth, team calibration, and engineering craft. Each tool does one thing well and needs no login, install, or setup. It exists so useful engineering-management artefacts (growth radars, behaviour frameworks) can be shared as living, interactive pages instead of static documents or slide decks. Success is that a person sent a link can immediately use the tool, get value in one sitting, and pass it on.

## Positioning

Free, no-friction, single-purpose interactive tools that live at a stable shareable URL. The differentiator is immediacy and focus: no account, no onboarding, no product surface to learn — open the link and the tool is already usable. Where comparable material exists as PDFs, spreadsheets, or slides, these are interactive and self-explanatory.

## Operating Context

- Tools are reached directly by link (`share.codie.co.nz/<tool>/`) and from a homepage card grid at the root.
- Used in the flow of real work: self-assessment, growth planning, review/calibration conversations, and 1:1s.
- Each tool is a standalone page a person can work through alone in a browser, on desktop or mobile, and then share or revisit.

## Capabilities and Constraints

- **Existing tools:** Junior & Intermediate Growth Radar (`/growth-framework/`), Senior Engineer Growth Radar (`/senior-growth-framework/`), and Behaviour Principles (`/behaviour-principles/`).
- **Shared assets:** radar tools use `shared/radar.css` and `shared/radar.js`; per-tool `theme.css` / `data.js` supply content and accents.
- **Stack constraint (from incumbent codebase):** static HTML, CSS, and vanilla JS with no build step or framework, deployed via GitHub Pages with a `CNAME` for `share.codie.co.nz`. Inter is loaded from Google Fonts. New tools should stay self-contained and buildless unless the user decides otherwise.
- **No backend:** no server, database, accounts, or persistence beyond what a single page can do client-side.
- **Terminology:** "tool" = one self-contained page; the root is the "homepage" card grid.

## Brand Commitments

- Name / home: **share.codie.co.nz** — a personal share space, presented as "Tools for Engineering Teams".
- **Binding visual direction: stay brand-neutral.** The clean, neutral system (Inter typeface; slate neutrals with per-tool accent colours; dark hero, light card grid) is the identity. No single organisation's brand is adopted.
- **LHV UK is content, never visual identity.** The Behaviour Principles tool names LHV UK because the framework is theirs; this must not pull the site's design toward LHV branding, and other-org or org-neutral content is expected alongside it.

## Evidence on Hand

- Real, shippable tools already in the repo (the three listed above) with their own content data files.
- Source content for Behaviour Principles lives outside this repo (an external draft the tool mirrors into `behaviour-principles/data.js`); the repo copy is the source of truth for the published tool.
- No testimonials, usage metrics, customer names, or endorsements exist — future work must not fabricate them.

## Product Principles

1. **One tool, one job.** Each page solves a single growth or team-development need and is usable without instructions.
2. **Link-first and self-contained.** A tool must stand on its own for someone who arrives cold via a shared URL, on desktop or mobile.
3. **Neutral by default, org-specific by content.** The visual system stays brand-neutral; organisation-specific material (like LHV UK's) rides in as content, not identity.
4. **Buildless and durable.** Prefer static, dependency-light pages that keep working with no maintenance and deploy straight to GitHub Pages.
5. **Toward a coherent toolkit.** New tools should feel like members of one recognisable engineering-management/growth set — shared chrome, consistent card and hero patterns — not a loose pile of one-offs.

## Accessibility & Inclusion

No formal standard has been set. Given the link-first, general audience, tools should be legible and usable on mobile and desktop and keyboard-operable; treat this as a baseline expectation rather than a certified requirement until the user sets one.
