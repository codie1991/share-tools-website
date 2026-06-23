"use strict";

/* ── JUNIOR EXERCISE — Parts 1–5 ──────────────────────────── */

var LEVEL_LABELS_EX = [
  "Building foundations",
  "Developing independence",
  "Consistently independent",
  "Demonstrating Senior behaviours"
];

var DIM_PROMPTS = [
  ["What's a recent problem where you had to figure out the approach yourself, without being told what to do? How did it go?",
   "Where in your technical knowledge do you feel most uncertain or likely to avoid problems you don't yet know how to solve?"],
  ["Can you think of a time when something unexpected threatened a piece of work you were responsible for? How did you handle it?",
   "Where in your delivery do you most often need reminders, support, or check-ins from your manager or teammates?"],
  ["When have you done something that was technically outside your scope because it needed doing? What happened?",
   "Are there problems on the team you're aware of but haven't tried to improve? What has held you back?"],
  ["Can you describe a time you thought about the wider effect of your work and changed your approach as a result?",
   "Where in your current work do you think you have the least visibility into what your changes affect?"],
  ["When was the last time you gave feedback on someone else's work that genuinely helped them? What made it useful?",
   "Are there things you notice but don't raise — in code reviews, in planning, in team discussions? What holds you back?"],
  ["What's something you've genuinely learned in the past 6 months — not just done, but understood differently?",
   "Where have you received feedback but not yet applied it consistently? What's got in the way?"],
  ["Who on the team have you most actively helped recently, and what did you help them with?",
   "Are there ways you could share knowledge or context that you haven't made time for? What gets in the way?"],
  ["Can you describe a recent decision where understanding the customer or product context changed how you approached the work?",
   "What do you understand least well about why your team's work matters to the business or to customers?"]
];

var CONSISTENCY_BEHAVIOURS = [
  "Communicate blockers before they become problems",
  "Update your estimates when they change",
  "Ask why a piece of work matters, not just what to build",
  "Review others' code with specific, useful feedback",
  "Read and understand adjacent code, not just the file you're editing",
  "Take initiative when you see a problem rather than waiting",
  "Apply feedback within the same quarter you receive it",
  "Write clear commit messages, PR descriptions, and technical comments",
  "Speak up in planning or design discussions with a concrete perspective",
  "Follow through on self-directed growth (reading, practice, experiments)"
];

var FOCUS_PROMPTS_EX = [
  { id: "why",   label: "Why this area is the right priority right now",
    ph: "e.g. I'm hitting the edge of what I can solve alone and want to develop…" },
  { id: "looks", label: "What level 4 in this dimension would look like in my daily work",
    ph: "e.g. I'd be raising design concerns in reviews, not just fixing code…" },
  { id: "build", label: "What I already do well here that I can build from",
    ph: "e.g. I'm confident writing RFCs; I need to get better at driving alignment on them…" },
  { id: "habit", label: "The specific habit or behaviour I need to change or add",
    ph: "e.g. Start asking 'who else does this affect?' before every PR…" }
];

var EX = {
  dimScores:      Array(8).fill(null),
  dimNotes:       Array(8).fill(null).map(function() { return ["",""]; }),
  p2_capability:  "",
  p2_feedback:    ["","",""],
  p2_consistency: Array(10).fill(null),
  p2_comfort:     "",
  focusAreas:     [0,1,2].map(function() { return { dim:"", why:"", looks:"", build:"", habit:"" }; }),
  commitments:    Array(5).fill(null).map(function() { return { behaviour:"", practice:"", howToKnow:"", derail:"" }; }),
  okrs:           [0,1].map(function() { return { objective:"", krs:["","",""], quarter:"", year:"", tracking:"", support:"" }; })
};

/* ── INFO PANEL ──────────────────────────────────────────── */
function buildInfoPanel() {
  var container = document.getElementById("profileRows");
  if (!container) return;
  PROFILES.forEach(function(p) {
    var row = document.createElement("div");
    row.className = "profile-ref-row";
    row.style.setProperty("--row-color", p.color);
    var accent = document.createElement("div"); accent.className = "profile-ref-accent";
    var body   = document.createElement("div"); body.className   = "profile-ref-body";
    var name   = document.createElement("div"); name.className   = "profile-ref-name"; name.textContent = p.name;
    var desc   = document.createElement("div"); desc.className   = "profile-ref-desc"; desc.textContent = p.hint;
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
      if (badge)   { badge.textContent = sc + "/4 — " + LEVEL_LABELS_EX[sc-1]; badge.classList.add("scored"); }
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

    var p2Fields = [
      ["p2-capability",    function() { return EX.p2_capability; }],
      ["p2-feedback-agree",  function() { return EX.p2_feedback[0]; }],
      ["p2-feedback-resist", function() { return EX.p2_feedback[1]; }],
      ["p2-feedback-truth",  function() { return EX.p2_feedback[2]; }],
      ["p2-comfort",       function() { return EX.p2_comfort; }]
    ];
    p2Fields.forEach(function(pair) {
      var el = document.getElementById(pair[0]);
      if (el) el.value = pair[1]() || "";
    });
    EX.p2_consistency.forEach(function(val, bi) {
      if (val === null) return;
      var btn = document.querySelector('.toggle-pill[data-bi="' + bi + '"][data-val="' + val + '"]');
      if (btn) btn.classList.add("active");
      btn?.closest(".consistency-row")?.classList.add("has-value-" + val);
    });

    var p3Keys = ["why","looks","build","habit"];
    document.querySelectorAll("#part3Areas .focus-block").forEach(function(block, fi) {
      var fa = EX.focusAreas[fi]; if (!fa) return;
      var sel = document.getElementById("focus-dim-" + fi);
      if (sel) sel.value = fa.dim || "";
      block.querySelectorAll("textarea").forEach(function(ta, ki) { ta.value = fa[p3Keys[ki]] || ""; });
    });

    var p4Keys = ["behaviour","practice","howToKnow","derail"];
    document.querySelectorAll("#part4Commitments .commitment-block").forEach(function(block, ci) {
      var c = EX.commitments[ci]; if (!c) return;
      block.querySelectorAll("textarea").forEach(function(ta, ki) { ta.value = c[p4Keys[ki]] || ""; });
    });

    document.querySelectorAll("#part5OKRs .okr-block").forEach(function(block, oi) {
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
    var det = document.createElement("details");
    det.className = "dim-accordion";

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
    for (var sc = 1; sc <= 4; sc++) {
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
      var ta    = document.createElement("textarea");
      ta.placeholder = "Your notes…"; ta.rows = 3;
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
  if (badge)   { badge.textContent = sc + "/4 — " + LEVEL_LABELS_EX[sc-1]; badge.classList.add("scored"); }
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
  var container = document.getElementById("part2ConsistencyRows");
  if (!container) return;
  container.innerHTML = "";
  CONSISTENCY_BEHAVIOURS.forEach(function(behaviour, bi) {
    var row = document.createElement("div"); row.className = "consistency-row";
    var bDiv = document.createElement("div"); bDiv.className = "consistency-behaviour"; bDiv.textContent = behaviour;
    var toggles = document.createElement("div"); toggles.className = "consistency-toggles";

    [["0","Consistently"],["1","Sometimes"],["2","Rarely / Not yet"]].forEach(function(pair) {
      var val = pair[0], label = pair[1];
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "toggle-pill";
      btn.dataset.val = val; btn.dataset.bi = bi; btn.textContent = label;
      btn.addEventListener("click", function() {
        var current = EX.p2_consistency[bi];
        var newVal  = Number(val);
        document.querySelectorAll('.toggle-pill[data-bi="' + bi + '"]').forEach(function(p) { p.classList.remove("active"); });
        row.classList.remove("has-value-0","has-value-1","has-value-2");
        if (current === newVal) {
          EX.p2_consistency[bi] = null;
        } else {
          btn.classList.add("active");
          row.classList.add("has-value-" + newVal);
          EX.p2_consistency[bi] = newVal;
        }
      });
      toggles.appendChild(btn);
    });

    row.append(bDiv, toggles);
    container.appendChild(row);
  });

  function wire(id, key, idx) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", function() {
      if (idx !== undefined) EX.p2_feedback[idx] = el.value;
      else EX[key] = el.value;
    });
  }
  wire("p2-capability",    "p2_capability");
  wire("p2-feedback-agree",  null, 0);
  wire("p2-feedback-resist", null, 1);
  wire("p2-feedback-truth",  null, 2);
  wire("p2-comfort",       "p2_comfort");
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
  var container = document.getElementById("part4Commitments");
  if (!container) return;
  container.innerHTML = "";
  [0,1,2,3,4].forEach(function(ci) {
    var block = document.createElement("div"); block.className = "commitment-block";
    var hdr   = document.createElement("div"); hdr.className   = "commitment-header";
    hdr.innerHTML = '<span class="commitment-tag">Commitment ' + (ci+1) + '</span>' +
      (ci >= 2 ? '<span class="focus-optional">Optional</span>' : '');
    block.appendChild(hdr);
    var body = document.createElement("div"); body.className = "commitment-body";
    [["behaviour",  "Behaviour",                              "e.g. Communicate blockers proactively…"],
     ["practice",   "What it looks like in practice",         "e.g. I raise blockers in standup before they delay anyone else…"],
     ["howToKnow",  "How I'll know I'm doing it consistently", "e.g. I haven't been chased for a status update in 6 weeks…"],
     ["derail",     "What might derail it",                   "e.g. When I'm rushed and assume the problem will resolve itself…"]
    ].forEach(function(tuple) {
      var key = tuple[0], labelText = tuple[1], ph = tuple[2];
      var f   = document.createElement("div"); f.className = "okr-field";
      var lbl = document.createElement("label"); lbl.textContent = labelText;
      var ta  = document.createElement("textarea"); ta.placeholder = ph; ta.rows = 2;
      (function(i, k) { ta.addEventListener("input", function() { EX.commitments[i][k] = ta.value; }); })(ci, key);
      f.append(lbl, ta); body.appendChild(f);
    });
    block.appendChild(body); container.appendChild(block);
  });
}

/* ── PART 5 ──────────────────────────────────────────────── */
function buildPart5() {
  var container = document.getElementById("part5OKRs");
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
  lines.push("# Junior & Intermediate Engineer Growth Reflection","");
  lines.push("**Engineer:** " + name + "  ", "**Manager:** " + manager + "  ", "**Date:** " + date,"","---","");

  lines.push("## Part 1: Growth Radar","");
  lines.push("| Dimension | Score | Level |","|-----------|-------|-------|");
  DIMS.forEach(function(dim, di) {
    var sc = EX.dimScores[di];
    lines.push("| " + dim.label + " | " + (sc !== null ? sc + "/4" : "—") + " | " + (sc !== null ? LEVEL_LABELS_EX[sc-1] : "—") + " |");
  });
  lines.push("");
  DIMS.forEach(function(dim, di) {
    var sc = EX.dimScores[di];
    lines.push("### " + (di+1) + ". " + dim.label);
    if (sc !== null) lines.push("**Score:** " + sc + "/4 — " + LEVEL_LABELS_EX[sc-1]);
    lines.push("");
    DIM_PROMPTS[di].forEach(function(prompt, qi) {
      if (EX.dimNotes[di][qi]) { lines.push("**" + prompt + "**","",EX.dimNotes[di][qi],""); }
    });
    lines.push("---","");
  });

  lines.push("## Part 2: Patterns & Blockers","");
  lines.push("### Q1: Capability vs Habit","");
  if (EX.p2_capability) lines.push(EX.p2_capability,"");
  lines.push("### Q2: Feedback","");
  if (EX.p2_feedback[0]) lines.push("**Feedback you agreed with immediately:**","",EX.p2_feedback[0],"");
  if (EX.p2_feedback[1]) lines.push("**Feedback you initially resisted:**","",EX.p2_feedback[1],"");
  if (EX.p2_feedback[2]) lines.push("**What truth might there have been in feedback you pushed back on:**","",EX.p2_feedback[2],"");
  lines.push("### Q3: Consistency Check","");
  lines.push("| Behaviour | Assessment |","|-----------|------------|");
  var cMap = [null,"✅ Consistently","⚠️ Sometimes","❌ Rarely / Not yet"];
  CONSISTENCY_BEHAVIOURS.forEach(function(b, bi) {
    var v = EX.p2_consistency[bi];
    lines.push("| " + b + " | " + (v !== null ? cMap[v+1] : "—") + " |");
  });
  lines.push("");
  lines.push("### Q4: Comfort Zone","");
  if (EX.p2_comfort) lines.push(EX.p2_comfort,"");
  lines.push("---","");

  lines.push("## Part 3: Growth Focus Areas","");
  EX.focusAreas.forEach(function(fa, fi) {
    if (!fa.dim && !fa.why && !fa.looks && !fa.build && !fa.habit) return;
    lines.push("### Focus Area " + (fi+1) + ": " + (fa.dim || "—"), "");
    if (fa.why)   lines.push("**Why this area is the right priority right now**","",fa.why,"");
    if (fa.looks) lines.push("**What level 4 in this dimension would look like in my daily work**","",fa.looks,"");
    if (fa.build) lines.push("**What I already do well here that I can build from**","",fa.build,"");
    if (fa.habit) lines.push("**The specific habit or behaviour I need to change or add**","",fa.habit,"");
  });
  lines.push("---","");

  lines.push("## Part 4: Consistency Commitments","");
  lines.push("| Behaviour | In practice | How I'll know | What might derail it |","|-----------|-------------|---------------|----------------------|");
  EX.commitments.forEach(function(c) {
    if (!c.behaviour && !c.practice && !c.howToKnow && !c.derail) return;
    lines.push("| " + (c.behaviour||"—") + " | " + (c.practice||"—") + " | " + (c.howToKnow||"—") + " | " + (c.derail||"—") + " |");
  });
  lines.push("","---","");

  lines.push("## Part 5: OKRs","");
  EX.okrs.forEach(function(okr, oi) {
    if (!okr.objective && !okr.krs.some(function(k) { return k; })) return;
    lines.push("### OKR " + (oi+1), "");
    if (okr.objective) lines.push("**Objective:** " + okr.objective, "");
    okr.krs.filter(function(k) { return k.trim(); }).forEach(function(kr, ki) { lines.push("**KR" + (ki+1) + ":** " + kr); });
    if (okr.krs.some(function(k) { return k.trim(); })) lines.push("");
    var q = [okr.quarter, okr.year].filter(Boolean).join(" / ");
    if (q)            lines.push("**Timeline:** " + q, "");
    if (okr.tracking) lines.push("**How we'll know this is on track:** " + okr.tracking, "");
    if (okr.support)  lines.push("**Support needed:** " + okr.support, "");
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
buildPart5();
restoreExerciseUI();
buildStickyUI();

document.getElementById("generateMdBtn").addEventListener("click", generateMarkdown);
document.getElementById("clearStorageBtn").addEventListener("click", clearStorage);

var _saveTimer;
document.addEventListener("input",  function() { clearTimeout(_saveTimer); _saveTimer = setTimeout(saveState, 400); });
document.addEventListener("change", function() { clearTimeout(_saveTimer); _saveTimer = setTimeout(saveState, 400); });
document.addEventListener("click",  function() { clearTimeout(_saveTimer); _saveTimer = setTimeout(saveState, 400); });
