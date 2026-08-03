---
target: behaviour-principles
total_score: 24
max_score: 32
na_heuristics: 5,9
p0_count: 1
p1_count: 1
timestamp: 2026-08-03T14-28-24Z
slug: behaviour-principles-index-html
---
Method: dual-agent (A: design review · B: deterministic detector)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Band switch silently mutates content; no announcement/count of what changed |
| 2 | Match System / Real World | 4 | Plain, human, domain-true language ("Say it straight", "When this slips") |
| 3 | User Control and Freedom | 3 | Expand/collapse/reset all reversible; no deep-link or hash reset |
| 4 | Consistency and Standards | 3 | Strong token adherence, but the mandated focus ring is not implemented |
| 5 | Error Prevention | n/a | No data entry or destructive actions on this Read/Operate surface |
| 6 | Recognition Rather Than Recall | 3 | Everything on-screen; but the additive/cumulative band model must be recalled |
| 7 | Flexibility and Efficiency | 2 | No keyboard path to the accordion; no per-principle deep links |
| 8 | Aesthetic and Minimalist Design | 4 | Calm, scannable, generous rhythm; nothing decorative fights the content |
| 9 | Error Recovery | n/a | No error states possible on this surface |
| 10 | Help and Documentation | 3 | Good inline blurbs; the cumulative mechanic itself is unexplained |
| **Total** | | **24/32** | **Good (75%)** |

Two heuristics (5, 9) are genuinely n/a for a read/operate reference; total renormalised to /32.

## Design Specificity Verdict

**LLM assessment:** Authored for this product, not category-interchangeable — the strongest single expression of "The Field Guide" in the system. DESIGN.md names this accordion as the signature component and the build delivers: numbered spectrum chip, per-principle index colour carried across chip / open-bar / bullets / callout, Core (card-white) vs Lead (soft-panel) contrast, and the drift→reset table are all content-shaped. The dark ink hero with dotted-glow cover pulling the control bar up over it (`margin: -56px`) is the exact house move. Drift toward generic: the hero carries **both** indigo and emerald radial glows, violating the one-accent "Index-Tab Rule" for an indigo-owned tool; and the per-principle spectrum means the singular indigo signature is diluted (the `--accent` changes per card).

**Deterministic scan:** 20 findings — `design-system-font-size`×17, `side-tab`×1 (L257), `overused-font`×1 (L9), `design-system-radius`×1 (L218, 3px). `side-tab` and `overused-font` are false-positives-in-context: both are explicitly sanctioned in DESIGN.md (the accordion open-state bar; Inter as the binding brand face). Font-size is mixed: 17px/18px/14px fall inside documented rem ranges (FP-in-context); the 13/13.5/12.5/12px small-label cluster sits off-ramp between the Label (~10.4–11.5px) and Body (14px) steps (genuine minor drift); the `clamp(30px…)` hero endpoint is slightly under the Display clamp. The 3px radius (a 5×14px accent tick) matches no token — trivial off-scale value.

**Visual overlays:** not injected — the CLI scan was the deterministic deliverable and browser overlay added no value here. No user-visible overlay is available.

## Overall Impression

This is a genuinely good, on-brand tool with one serious problem hiding under a polished surface: **it is the best-designed thing in the toolkit and simultaneously the least accessible.** The content design (drift→reset framing, cumulative bands, Core/Lead contrast) is excellent and specific. But the accordion — the tool's entire reason to exist — is a click-only `<div>` with no keyboard or screen-reader operability. The single biggest opportunity is to make the interaction match the quality of the content: fix the a11y foundation, then surface the warm "not a list of failings" voice that's currently buried.

## What's Working

1. **The drift→reset framing — data and design together.** A non-judgmental preamble + two-column drift→reset table + reflective "Ask yourself" question turns a compliance-flavoured topic into a coaching tool. The `→` accent prefix makes the fix scannable. This is the tool earning its existence.
2. **Disciplined, spec-true accordion visuals.** Per-principle spectrum colour applied consistently to chip, open-bar, bullets, and callout; Core-vs-Lead conveyed purely through white-vs-soft-panel fill. It reads as one authored system, not a template.
3. **The cumulative band filter works and is honest.** Verified: Leads Business reveals Others + Leaders + Business; the whole Lead block hides in "Everyone." Correct logic, legible labelled sub-groups.

## Priority Issues

**[P0] The accordion is not keyboard- or screen-reader-operable.**
- *Why it matters:* `.p-head` is a `<div>` with no `tabindex`/`role`/`aria-expanded` and a click-only handler. The primary interaction of a public, link-first, everyone-in-the-org tool is locked behind a mouse — a hard WCAG 2.1 failure (2.1.1 Keyboard, 4.1.2 Name/Role/Value). Assessment A verified `headFocusable: false`.
- *Fix:* Make headers real `<button>`s (or `role="button"` + `tabindex="0"` + `aria-expanded` + Enter/Space handlers); tie the body via `aria-controls`; add an `aria-live="polite"` status so band changes are announced. Give band tabs `role="tablist"`/`tab` + `aria-selected` semantics or equivalent.
- *Suggested command:* /impeccable harden

**[P1] The design-system focus ring is missing.**
- *Why it matters:* DESIGN.md mandates `outline: 2px solid var(--accent); outline-offset: 2px` on every control. Nothing sets it; controls show only default UA outlines (verified amber ring on "Expand all"). Fails the system's own rule and compounds the P0 for keyboard users.
- *Fix:* Add `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` to `.band-tab`, `.link-btn`, and the newly-focusable `.p-head`.
- *Suggested command:* /impeccable harden

**[P2] Contrast failures on muted/faint text.**
- *Why it matters:* Footer #94A3B8 on #F8FAFC = **2.45:1** (fails AA) and holds the tool's best line ("patterns of behaviour, not a promotion checklist"). Soft-panel muted #64748B = **4.34:1** and lead-tag indigo on white = **4.47:1** both miss AA for small text — and they carry the capability anchoring the framework hinges on.
- *Fix:* Darken footer to ≥#64748B on paper; bump soft-panel muted text to #475569; darken the lead tag to the accent's deep form or add a tint fill so the pair clears 4.5:1.
- *Suggested command:* /impeccable harden

**[P3] Empty/confusing Lead block in the default "Everyone" state.**
- *Why it matters:* In "Everyone" mode each Lead block shows tag + statement + capability but zero bullets and no cue — the default landing state shows content that looks broken. First-timers may not connect it to the band tabs.
- *Fix:* Hide the Lead statement too in "Everyone" mode, or replace the empty bullets with a one-line hint ("Switch band above to see how this layers for leaders").
- *Suggested command:* /impeccable clarify

**[P3] No per-principle deep links.**
- *Why it matters:* No `id`/anchor per principle and no auto-expand from hash. For a link-first tool whose real distribution job may be "someone sends you principle 4 in Slack," you can't share a single principle.
- *Fix:* Add an `id` per card, open on matching hash, and expose a copy-link affordance.
- *Suggested command:* /impeccable harden

## Persona Red Flags

**Sam (accessibility-dependent):** Blocked outright. Cannot expand principles by keyboard (`div` headers, P0); no `aria-expanded`/live region so open state and band changes are imperceptible to a screen reader; missing focus ring (P1); footer and capability text below AA (P2). Effectively cannot use the tool.

**Jordan (first-timer):** Lands in "Everyone" and hits the empty Lead block (P3) — looks broken. The cumulative/additive model is never explained, so the relationship between band tabs and appearing/disappearing sub-groups is left to inference. The reassuring "not a promotion checklist" framing they'd benefit from is hidden in a sub-AA footer.

**Casey (distracted mobile):** Mostly well served — control bar overlaps hero, band tabs wrap to two rows, slips table restacks to one column. Flags: band-tab tap targets ~37px tall (under the 44px guideline); "Expand all" on mobile produces a very long scroll with no sticky band control or back-to-top.

## Minor Observations

- Hero carries both indigo and emerald glows — violates the one-accent Index-Tab Rule for an indigo-owned tool.
- Band-tab height ~37px is below the 44px touch-target minimum.
- After "Expand all," "Collapse all" is the only escape from a very long page; no "some open" awareness.
- The ask callout's gradient-to-transparent tint is near-invisible on some principle colours (e.g. teal).
- `design-system-radius` 3px (L218) is a 5×14px accent tick — off-scale but trivial.

## Questions to Consider

- The warmest, most differentiating idea — "drift→reset, not a list of failings" — is buried three levels deep inside an expanded card. Should that reframing be surfaced once at the top so every reader gets the reassurance before the scrutiny?
- Is a per-principle spectrum colour helping the reader, or is it decoration wearing an index-colour costume? Six colours the user never filters by may spend the "colour = meaning" budget without a payoff. Would a single indigo accent read as more disciplined and more on-North-Star?
- For a link-first artefact, the inability to link to one principle contradicts the distribution model. Is browsing all six the primary job, or is "someone sends you principle 4" the real one?
