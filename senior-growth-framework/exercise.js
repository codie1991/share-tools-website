"use strict";

/* ── SENIOR EXERCISE — Parts 1–4 ──────────────────────────── */

var LEVEL_LABELS_EX = ["Solid baseline","Developing","Consistent strength","Elevated impact","Staff+ impact"];

var DIM_PROMPTS = [
  ["What's a recent example where your technical depth made a meaningful difference to an outcome?",
   "Where in your technical knowledge are you most confident, and what sits at the edge of that confidence?"],
  ["What's an example where you helped a complex piece of work get across the line — what made the difference?",
   "Where do you find delivery hardest — ambiguity, dependencies, scope, something else?"],
  ["Where have you stepped up to own something that wasn't strictly your responsibility? What happened?",
   "Are there areas where you'd like to take on more ownership but feel uncertain how to start?"],
  ["Describe a time you identified a problem or risk that wasn't visible at the task level — how did you see it?",
   "What system interactions in your current work do you feel you understand least well?"],
  ["Who on your team has grown noticeably in the past year, and what role did you play in that?",
   "How do you currently create leverage for others — and where might there be more opportunity?"],
  ["Where have you changed the direction of a decision, design, or plan through how you communicated your perspective?",
   "Which relationships — inside or outside engineering — would you most like to develop?"],
  ["Describe a decision you made differently because of something you understood about the customer or business.",
   "What would you most like to understand better about how the business operates, its customers, or its market?"],
  ["When did you last contribute to a direction or priority decision rather than just executing one?",
   "Where do you want more visibility into how product and engineering strategy gets made?"]
];

var ARCHETYPES_EX = [
  { id: "tech",       name: "Technical Specialist",  color: "#7C3AED", hint: "High on Technical Depth and Systems Thinking. Deep expertise; solves the hardest technical problems with authority." },
  { id: "multiplier", name: "Team Multiplier",        color: "#DB2777", hint: "High on Mentoring & Multiplication and Influence. Focused on raising the effectiveness of the people and delivery around them." },
  { id: "product",    name: "Product Engineer",       color: "#D97706", hint: "High on Business Context, Strategy & Product Thinking, and Delivery. Combines delivery with deep product and commercial insight." },
  { id: "platform",   name: "Platform Architect",     color: "#DC2626", hint: "High on Technical Depth, Systems Thinking, and Strategy. Architecture, leverage, and platform-level thinking." },
  { id: "staff",      name: "Emerging Staff Shape",   color: "#059669", hint: "Broadly strong across Ownership, Systems Thinking, and Influence. A well-rounded profile associated with Staff+ growth." }
];

var FOCUS_PROMPTS_EX = [
  { id: "why",   label: "Why this area matters to me right now",
    ph: "e.g. I'm hitting the edges of what I can solve alone and want to develop cross-team influence…" },
  { id: "looks", label: "What growth in this area would look like in practice",
    ph: "e.g. Leading a cross-team design review, owning a production incident end-to-end…" },
  { id: "build", label: "What I already know or do well here that I can build on",
    ph: "e.g. I'm confident writing RFCs; I need to get better at driving alignment on them…" }
];

var EX = {
  dimScores:       Array(8).fill(null),
  dimNotes:        Array(8).fill(null).map(function() { return ["",""]; }),
  archetypeChoice: null,
  archQ:           ["","","",""],
  focusAreas:      [0,1,2].map(function() { return { dim:"", why:"", looks:"", build:"" }; }),
  okrs:            [0,1].map(function() { return { objective:"", krs:["","",""], quarter:"", year:"", tracking:"", support:"" }; })
};

/* ── INFO PANEL ──────────────────────────────────────────── */
function buildInfoPanel() {
  var container = document.getElementById("archetypeRows");
  if (!container) return;
  PROFILES.filter(function(p) { return !p.editable; }).forEach(function(p) {
    var row    = document.createElement("div"); row.className    = "archetype-row";
    row.style.setProperty("--row-color", p.color);
    var accent = document.createElement("div"); accent.className = "archetype-accent";
    var body   = document.createElement("div"); body.className   = "archetype-body";
    var name   = document.createElement("div"); name.className   = "archetype-name"; name.textContent = p.name;
    var desc   = document.createElement("div"); desc.className   = "archetype-desc"; desc.textContent = p.hint;
    body.append(name, desc);
    row.append(accent, body);
    container.appendChild(row);
  });
}

/* ── STORAGE ─────────────────────────────────────────────── */
var STORAGE_KEY = FRAMEWORK_CONFIG.storageKey;

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      profiles: S.profiles,
      meta: {
        name:    document.getElementById("meta-name")?.value    || "",
        manager: document.getElementById("meta-manager")?.value || "",
        date:    document.getElementById("meta-date")?.value    || ""
      },
      ex: EX
    }));
  } catch (_) {}
}

function clearStorage() {
  if (!confirm("Clear all saved data? This will erase your scores, notes, and reflections and cannot be undone.")) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function restoreExerciseUI() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    var saved = JSON.parse(raw);

    var nameEl = document.getElementById("meta-name");
    var mgrEl  = document.getElementById("meta-manager");
    var dateEl = document.getElementById("meta-date");
    if (nameEl) nameEl.value = saved.meta?.name    || "";
    if (mgrEl)  mgrEl.value  = saved.meta?.manager || "";
    if (dateEl) dateEl.value = saved.meta?.date    || "";

    EX.dimScores.forEach(function(sc, di) {
      if (sc === null) return;
      document.querySelectorAll('.ex-score-pill[data-di="' + di + '"]').forEach(function(p) {
        p.classList.toggle("selected", Number(p.dataset.sc) === sc);
      });
      var badge   = document.getElementById("ex-badge-" + di);
      var descBox = document.getElementById("ex-desc-"  + di);
      if (badge)   { badge.textContent = sc + "/5 — " + LEVEL_LABELS_EX[sc-1]; badge.classList.add("scored"); }
      if (descBox) { descBox.textContent = DIMS[di].levels[sc-1]; descBox.classList.add("visible","scored"); }
      S.profiles["current"].values[di] = sc;
      var slider = document.getElementById("current-s" + di);
      var output = document.getElementById("current-s" + di + "-out");
      if (slider) slider.value = sc;
      if (output) output.textContent = sc;
      updateScoreStrip(di, sc);
    });
    document.querySelectorAll("#part1Dims .dim-accordion").forEach(function(det, di) {
      det.querySelectorAll("textarea").forEach(function(ta, qi) { ta.value = EX.dimNotes[di]?.[qi] || ""; });
    });

    if (EX.archetypeChoice) selectArchetype(EX.archetypeChoice);
    ["arch-q1","arch-q2","arch-q3","arch-q4"].forEach(function(id, i) {
      var el = document.getElementById(id);
      if (el) el.value = EX.archQ[i] || "";
    });

    var p3Keys = ["why","looks","build"];
    document.querySelectorAll("#part3Areas .focus-block").forEach(function(block, fi) {
      var fa = EX.focusAreas[fi]; if (!fa) return;
      var sel = document.getElementById("focus-dim-" + fi);
      if (sel) sel.value = fa.dim || "";
      block.querySelectorAll("textarea").forEach(function(ta, ki) { ta.value = fa[p3Keys[ki]] || ""; });
    });

    document.querySelectorAll("#part4OKRs .okr-block").forEach(function(block, oi) {
      var okr = EX.okrs[oi]; if (!okr) return;
      var tas = block.querySelectorAll("textarea");
      if (tas[0]) tas[0].value = okr.objective || "";
      if (tas[1]) tas[1].value = okr.tracking  || "";
      if (tas[2]) tas[2].value = okr.support   || "";
      block.querySelectorAll(".okr-kr-row input").forEach(function(inp, ki) { inp.value = okr.krs[ki] || ""; });
      var tl = block.querySelectorAll(".okr-row-2 input");
      if (tl[0]) tl[0].value = okr.quarter || "";
      if (tl[1]) tl[1].value = okr.year    || "";
    });

    buildControls();
    drawRadar();
    syncStickyBar();
  } catch(_) {}
}

/* ── PART 1 ──────────────────────────────────────────────── */
function buildPart1() {
  var container = document.getElementById("part1Dims");
  if (!container) return;
  container.innerHTML = "";
  DIMS.forEach(function(dim, di) {
    var det = document.createElement("details"); det.className = "dim-accordion";

    var sum = document.createElement("summary");
    sum.innerHTML = '<svg class="ex-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var idx   = document.createElement("span"); idx.className = "dim-idx"; idx.textContent = di + 1;
    var title = document.createElement("span"); title.className = "dim-acc-title"; title.textContent = dim.label;
    var badge = document.createElement("span");
    badge.className = "dim-score-tag"; badge.id = "ex-badge-" + di; badge.textContent = "Not scored";
    sum.append(idx, title, badge);
    det.appendChild(sum);

    var body = document.createElement("div"); body.className = "dim-accordion-body";

    var pillWrap  = document.createElement("div"); pillWrap.className  = "score-pills-wrap";
    var pillLabel = document.createElement("div"); pillLabel.className = "score-pills-label"; pillLabel.textContent = "Your score";
    var pills     = document.createElement("div"); pills.className     = "score-pills";
    for (var sc = 1; sc <= 5; sc++) {
      var pill = document.createElement("button");
      pill.type = "button"; pill.className = "ex-score-pill";
      pill.dataset.di = di; pill.dataset.sc = sc;
      pill.innerHTML = '<span class="pill-n">' + sc + '</span><span class="pill-l">' + LEVEL_LABELS_EX[sc-1] + '</span>';
      (function(s) { pill.addEventListener("click", function() { selectDimScore(di, s); }); })(sc);
      pills.appendChild(pill);
    }
    var descBox = document.createElement("div");
    descBox.className = "score-desc-box"; descBox.id = "ex-desc-" + di;
    pillWrap.append(pillLabel, pills, descBox);
    body.appendChild(pillWrap);

    var reflWrap = document.createElement("div"); reflWrap.className = "reflection-prompts";
    DIM_PROMPTS[di].forEach(function(prompt, qi) {
      var field = document.createElement("div"); field.className = "refl-field";
      var lbl   = document.createElement("label"); lbl.textContent = prompt;
      var ta    = document.createElement("textarea"); ta.placeholder = "Your notes…"; ta.rows = 3;
      (function(q) { ta.addEventListener("input", function() { EX.dimNotes[di][q] = ta.value; }); })(qi);
      field.append(lbl, ta); reflWrap.appendChild(field);
    });
    body.appendChild(reflWrap);
    det.appendChild(body);
    container.appendChild(det);
  });
}

function selectDimScore(di, sc) {
  EX.dimScores[di] = sc;
  document.querySelectorAll('.ex-score-pill[data-di="' + di + '"]').forEach(function(p) {
    p.classList.toggle("selected", Number(p.dataset.sc) === sc);
  });
  var badge   = document.getElementById("ex-badge-" + di);
  var descBox = document.getElementById("ex-desc-"  + di);
  if (badge)   { badge.textContent = sc + "/5 — " + LEVEL_LABELS_EX[sc-1]; badge.classList.add("scored"); }
  if (descBox) { descBox.textContent = DIMS[di].levels[sc-1]; descBox.classList.add("visible","scored"); }
  S.profiles["current"].values[di] = sc;
  var slider = document.getElementById("current-s" + di);
  var output = document.getElementById("current-s" + di + "-out");
  if (slider) slider.value = sc;
  if (output) output.textContent = sc;
  drawRadar();
  updateScoreStrip(di, sc);
  syncStickyBar();
}

/* ── PART 2 ──────────────────────────────────────────────── */
function buildPart2() {
  var grid = document.getElementById("archetypeGrid");
  if (!grid) return;
  grid.innerHTML = "";
  ARCHETYPES_EX.forEach(function(arch) {
    var card = document.createElement("div");
    card.className = "arch-card"; card.dataset.id = arch.id;
    card.style.setProperty("--arch-color", arch.color);
    card.innerHTML =
      '<input type="radio" name="ex-archetype" value="' + arch.id + '" />' +
      '<div class="arch-card-name">' + arch.name + '</div>' +
      '<div class="arch-card-desc">' + arch.hint + '</div>';
    card.addEventListener("click", function() { selectArchetype(arch.id); });
    grid.appendChild(card);
  });
  ["arch-q1","arch-q2","arch-q3","arch-q4"].forEach(function(id, i) {
    var el = document.getElementById(id);
    if (el) (function(idx) { el.addEventListener("input", function() { EX.archQ[idx] = el.value; }); })(i);
  });
}

function selectArchetype(id) {
  EX.archetypeChoice = id;
  document.querySelectorAll(".arch-card").forEach(function(c) {
    c.classList.toggle("selected", c.dataset.id === id);
    c.querySelector("input").checked = c.dataset.id === id;
  });
  PROFILES.filter(function(p) { return !p.editable; }).forEach(function(p) {
    S.profiles[p.id].visible = p.id === id;
  });
  buildControls();
  document.getElementById("profileList")?.addEventListener("input", function() {
    requestAnimationFrame(syncStickyBar);
  });
  drawRadar();
  syncStickyBar();
}

/* ── PART 3 ──────────────────────────────────────────────── */
function buildPart3() {
  var container = document.getElementById("part3Areas");
  if (!container) return;
  container.innerHTML = "";
  ["Focus Area 1","Focus Area 2","Focus Area 3 (optional)"].forEach(function(titleText, fi) {
    var block = document.createElement("div"); block.className = "focus-block";
    var hdr   = document.createElement("div"); hdr.className   = "focus-block-header";
    hdr.innerHTML = '<span class="focus-tag">Focus ' + (fi+1) + '</span>' +
      '<span class="focus-block-title">' + titleText + '</span>' +
      (fi === 2 ? '<span class="focus-optional">Optional</span>' : '');
    block.appendChild(hdr);
    var body = document.createElement("div"); body.className = "focus-block-body";
    var dimF = document.createElement("div"); dimF.className = "dim-select-field";
    dimF.innerHTML = '<label for="focus-dim-' + fi + '">Dimension</label>';
    var sel  = document.createElement("select"); sel.id = "focus-dim-" + fi;
    sel.innerHTML = '<option value="">— Select a dimension —</option>' +
      DIMS.map(function(d) { return '<option value="' + d.label + '">' + d.label + '</option>'; }).join("");
    (function(i) { sel.addEventListener("change", function() { EX.focusAreas[i].dim = sel.value; }); })(fi);
    dimF.appendChild(sel); body.appendChild(dimF);
    FOCUS_PROMPTS_EX.forEach(function(fp) {
      var f   = document.createElement("div"); f.className = "refl-field";
      var lbl = document.createElement("label"); lbl.textContent = fp.label;
      var ta  = document.createElement("textarea"); ta.placeholder = fp.ph; ta.rows = 3;
      (function(i, id) { ta.addEventListener("input", function() { EX.focusAreas[i][id] = ta.value; }); })(fi, fp.id);
      f.append(lbl, ta); body.appendChild(f);
    });
    block.appendChild(body); container.appendChild(block);
  });
}

/* ── PART 4 ──────────────────────────────────────────────── */
function buildPart4() {
  var container = document.getElementById("part4OKRs");
  if (!container) return;
  container.innerHTML = "";
  [0,1].forEach(function(oi) {
    var block = document.createElement("div"); block.className = "okr-block";
    var hdr   = document.createElement("div"); hdr.className   = "okr-header";
    hdr.innerHTML = '<span class="okr-num-tag">OKR ' + (oi+1) + '</span>' +
      '<span class="okr-title">Objective ' + (oi+1) + '</span>' +
      (oi === 1 ? '<span class="okr-optional">Optional</span>' : '');
    block.appendChild(hdr);
    var body = document.createElement("div"); body.className = "okr-body";

    var objF  = document.createElement("div"); objF.className = "okr-field";
    objF.innerHTML = '<label>Objective</label>';
    var objTa = document.createElement("textarea");
    objTa.placeholder = "What do I want to achieve, and why does it matter?"; objTa.rows = 2;
    (function(i) { objTa.addEventListener("input", function() { EX.okrs[i].objective = objTa.value; }); })(oi);
    objF.appendChild(objTa); body.appendChild(objF);

    var krG = document.createElement("div"); krG.className = "okr-kr-group";
    krG.innerHTML = '<div class="okr-kr-label">Key Results</div>';
    ["KR1","KR2","KR3 (optional)"].forEach(function(tag, ki) {
      var row   = document.createElement("div"); row.className = "okr-kr-row";
      var tagEl = document.createElement("span"); tagEl.className = "kr-tag"; tagEl.textContent = tag;
      var inp   = document.createElement("input"); inp.type = "text";
      inp.placeholder = ki < 2 ? "Describe an outcome, not a task…" : "Optional third key result…";
      (function(i, k) { inp.addEventListener("input", function() { EX.okrs[i].krs[k] = inp.value; }); })(oi, ki);
      row.append(tagEl, inp); krG.appendChild(row);
    });
    body.appendChild(krG);

    var tlRow = document.createElement("div"); tlRow.className = "okr-row-2";
    [["quarter","Quarter","Q1 / Q2 / Q3 / Q4"],["year","Year","e.g. 2026"]].forEach(function(tuple) {
      var key = tuple[0], lbl = tuple[1], ph = tuple[2];
      var f   = document.createElement("div"); f.className = "okr-field";
      f.innerHTML = '<label>' + lbl + '</label>';
      var inp = document.createElement("input"); inp.type = "text"; inp.placeholder = ph;
      (function(i, k) { inp.addEventListener("input", function() { EX.okrs[i][k] = inp.value; }); })(oi, key);
      f.appendChild(inp); tlRow.appendChild(f);
    });
    body.appendChild(tlRow);

    [["tracking","How we'll know this is on track","e.g. We review KR progress in fortnightly 1:1s"],
     ["support","Support I need","e.g. Introductions to X team, budget for Y course…"]
    ].forEach(function(tuple) {
      var key = tuple[0], lbl = tuple[1], ph = tuple[2];
      var f   = document.createElement("div"); f.className = "okr-field";
      f.innerHTML = '<label>' + lbl + '</label>';
      var ta  = document.createElement("textarea"); ta.placeholder = ph; ta.rows = 2;
      (function(i, k) { ta.addEventListener("input", function() { EX.okrs[i][k] = ta.value; }); })(oi, key);
      f.appendChild(ta); body.appendChild(f);
    });

    block.appendChild(body); container.appendChild(block);
  });
}

/* ── MARKDOWN EXPORT ─────────────────────────────────────── */
function generateMarkdown() {
  var name    = document.getElementById("meta-name")?.value.trim()    || "—";
  var manager = document.getElementById("meta-manager")?.value.trim() || "—";
  var date    = document.getElementById("meta-date")?.value.trim()    || "—";
  var lines = [];
  lines.push("# Senior Engineer Growth Reflection","");
  lines.push("**Engineer:** " + name + "  ","**Manager:** " + manager + "  ","**Date:** " + date,"","---","");

  lines.push("## Part 1: Growth Radar Baseline","");
  lines.push("| Dimension | Score | Level |","|-----------|-------|-------|");
  DIMS.forEach(function(dim, di) {
    var sc = EX.dimScores[di];
    lines.push("| " + dim.label + " | " + (sc !== null ? sc + "/5" : "—") + " | " + (sc !== null ? LEVEL_LABELS_EX[sc-1] : "—") + " |");
  });
  lines.push("");
  DIMS.forEach(function(dim, di) {
    var sc = EX.dimScores[di];
    lines.push("### " + (di+1) + ". " + dim.label);
    if (sc !== null) lines.push("**Score:** " + sc + "/5 — " + LEVEL_LABELS_EX[sc-1]);
    lines.push("");
    DIM_PROMPTS[di].forEach(function(prompt, qi) {
      if (EX.dimNotes[di][qi]) { lines.push("**" + prompt + "**","",EX.dimNotes[di][qi],""); }
    });
    lines.push("---","");
  });

  lines.push("## Part 2: Archetype Exploration","");
  var chosen = ARCHETYPES_EX.find(function(a) { return a.id === EX.archetypeChoice; });
  lines.push("**Archetype direction:** " + (chosen ? chosen.name : "—"), "");
  ["Which archetype resonated most, and what specifically stood out?",
   "Which feels furthest from how you currently work? What does that tell you?",
   "An archetype you're drawn to but uncertain about?",
   "If there's a shape you'd like to grow toward, which one and why?"
  ].forEach(function(q, i) {
    if (EX.archQ[i]) { lines.push("**" + q + "**","",EX.archQ[i],""); }
  });
  lines.push("---","");

  lines.push("## Part 3: Growth Focus Areas","");
  EX.focusAreas.forEach(function(fa, fi) {
    if (!fa.dim && !fa.why && !fa.looks && !fa.build) return;
    lines.push("### Focus Area " + (fi+1) + ": " + (fa.dim || "—"), "");
    if (fa.why)   { lines.push("**Why this area matters to me right now**","",fa.why,""); }
    if (fa.looks) { lines.push("**What growth here would look like in practice**","",fa.looks,""); }
    if (fa.build) { lines.push("**What I already do well that I can build on**","",fa.build,""); }
  });
  lines.push("---","");

  lines.push("## Part 4: OKRs","");
  EX.okrs.forEach(function(okr, oi) {
    if (!okr.objective && !okr.krs.some(function(k) { return k; })) return;
    lines.push("### OKR " + (oi+1), "");
    if (okr.objective) { lines.push("**Objective:** " + okr.objective, ""); }
    okr.krs.filter(function(k) { return k.trim(); }).forEach(function(kr, ki) { lines.push("**KR" + (ki+1) + ":** " + kr); });
    if (okr.krs.some(function(k) { return k.trim(); })) lines.push("");
    var q = [okr.quarter, okr.year].filter(Boolean).join(" / ");
    if (q)            { lines.push("**Timeline:** " + q, ""); }
    if (okr.tracking) { lines.push("**How we'll know this is on track:** " + okr.tracking, ""); }
    if (okr.support)  { lines.push("**Support needed:** " + okr.support, ""); }
  });

  var blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement("a");
  a.href = url;
  a.download = "growth-reflection-" + (name.replace(/\s+/g,"-").toLowerCase() || "engineer") + ".md";
  a.click();
  URL.revokeObjectURL(url);
  announce("Reflection exported as Markdown.");
}

/* ── BOOTSTRAP ───────────────────────────────────────────── */
(function() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    var stored = JSON.parse(raw);
    if (stored?.profiles) {
      PROFILES.forEach(function(p) {
        if (stored.profiles[p.id]) S.profiles[p.id] = Object.assign({}, stored.profiles[p.id]);
      });
    }
    if (stored?.ex) Object.assign(EX, stored.ex);
  } catch(_) {}
})();

buildInfoPanel();
buildPart1();
buildPart2();
buildPart3();
buildPart4();
restoreExerciseUI();
buildStickyUI();

document.getElementById("generateMdBtn").addEventListener("click", generateMarkdown);
document.getElementById("clearStorageBtn").addEventListener("click", clearStorage);

var _saveTimer;
document.addEventListener("input",  function() { clearTimeout(_saveTimer); _saveTimer = setTimeout(saveState, 400); });
document.addEventListener("change", function() { clearTimeout(_saveTimer); _saveTimer = setTimeout(saveState, 400); });
document.addEventListener("click",  function() { clearTimeout(_saveTimer); _saveTimer = setTimeout(saveState, 400); });
