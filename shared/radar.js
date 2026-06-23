/* ── SHARED RADAR ENGINE ─────────────────────────────────────
   Requires globals from data.js loaded first:
     DIMS, PROFILES, LEVEL_LABELS, FRAMEWORK_CONFIG
   Exposes globals consumed by exercise.js:
     S, radarGeo, drawRadar, buildControls, buildDimTabs,
     buildDimDefs, renderLevelCards, syncStickyBar, announce,
     buildStickyUI, updateScoreStrip
   Calls buildInfoPanel() if defined by exercise.js.
───────────────────────────────────────────────────────────── */
"use strict";

var ML = FRAMEWORK_CONFIG.maxLevel;

var S = {
  profiles: {},
  points:   [],
  activeDim: 0,
  hovered:  null,
  drag:     null
};

var radarGeo = { cx: 0, cy: 0, r: 0 };
var _statusTimer = null;

var _canvas     = document.getElementById("radarCanvas");
var _ctx        = _canvas.getContext("2d");
var _tooltip    = document.getElementById("radarTooltip");
var _profList   = document.getElementById("profileList");
var _dimTabs    = document.getElementById("dimTabs");
var _levelCards = document.getElementById("levelCards");
var _statusMsg  = document.getElementById("statusMsg");

/* ── INIT ────────────────────────────────────────────────── */
function _init() {
  PROFILES.forEach(function(p) {
    S.profiles[p.id] = { visible: p.on, values: p.defaults.slice() };
  });
  buildControls();
  buildDimTabs();
  buildDimDefs();
  if (typeof buildInfoPanel === "function") buildInfoPanel();
  renderLevelCards(0);
  _resizeCanvas();

  document.getElementById("exportBtn").addEventListener("click", _exportPNG);
  document.getElementById("copyBtn").addEventListener("click", _copySummary);
  document.getElementById("resetBtn").addEventListener("click", _reset);

  _canvas.addEventListener("mousedown", _onMouseDown);
  _canvas.addEventListener("mousemove", _onMouseMove);
  _canvas.addEventListener("mouseleave", function() { if (!S.drag) _hideTooltip(); });
  window.addEventListener("mouseup", _onMouseUp);

  _canvas.addEventListener("touchstart", function(e) {
    var t = e.touches[0];
    _onMouseDown({ button: 0, clientX: t.clientX, clientY: t.clientY, preventDefault: function() { e.preventDefault(); } });
  }, { passive: false });
  _canvas.addEventListener("touchmove", function(e) {
    if (!S.drag) return;
    e.preventDefault();
    var t = e.touches[0];
    _applyDrag(t.clientX, t.clientY);
  }, { passive: false });
  _canvas.addEventListener("touchend", _onMouseUp);

  window.addEventListener("resize", _resizeCanvas);
}

/* ── CONTROLS ────────────────────────────────────────────── */
function buildControls() {
  _profList.innerHTML = "";
  PROFILES.forEach(function(p) {
    var card = document.createElement("div");
    card.className = "profile-card " + (S.profiles[p.id].visible ? "active" : "disabled");
    card.style.setProperty("--card-color", p.color);
    card.dataset.id = p.id;

    var hdr = document.createElement("div");
    hdr.className = "profile-card-header";

    var lbl = document.createElement("label");
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = S.profiles[p.id].visible;
    cb.setAttribute("aria-label", "Show " + p.name);
    cb.addEventListener("change", function() {
      S.profiles[p.id].visible = cb.checked;
      card.classList.toggle("active", cb.checked);
      card.classList.toggle("disabled", !cb.checked);
      drawRadar();
    });

    var swatch = document.createElement("span");
    swatch.className = "color-swatch";

    var nameEl = document.createElement("span");
    nameEl.className = "profile-name";
    nameEl.textContent = p.name;

    lbl.append(cb, swatch, nameEl);
    hdr.appendChild(lbl);
    card.appendChild(hdr);

    var hint = document.createElement("div");
    hint.className = "profile-hint";
    hint.textContent = p.hint;
    if (p.editable) hint.textContent += " Drag points on the radar to adjust.";
    card.appendChild(hint);

    if (p.editable) {
      var sg = document.createElement("div");
      sg.className = "slider-group";
      DIMS.forEach(function(dim, di) {
        var row = document.createElement("div");
        row.className = "slider-row";
        var inner = document.createElement("div");
        var lbl2 = document.createElement("label");
        lbl2.className = "slider-label";
        lbl2.textContent = dim.label;
        lbl2.htmlFor = p.id + "-s" + di;
        var slider = document.createElement("input");
        slider.type = "range"; slider.min = 1; slider.max = ML; slider.step = 1;
        slider.value = S.profiles[p.id].values[di];
        slider.id = p.id + "-s" + di;
        var out = document.createElement("output");
        out.className = "score-out";
        out.id = p.id + "-s" + di + "-out";
        out.textContent = slider.value;
        slider.addEventListener("input", function() {
          S.profiles[p.id].values[di] = Number(slider.value);
          out.textContent = slider.value;
          drawRadar();
          syncStickyBar();
        });
        inner.append(lbl2, slider);
        row.append(inner, out);
        sg.appendChild(row);
      });
      card.appendChild(sg);
    }
    _profList.appendChild(card);
  });
}

/* ── DIM TABS ────────────────────────────────────────────── */
function buildDimTabs() {
  _dimTabs.innerHTML = "";
  DIMS.forEach(function(dim, i) {
    var btn = document.createElement("button");
    btn.className = "dim-tab " + (i === 0 ? "active" : "");
    btn.textContent = dim.short;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", String(i === 0));
    btn.addEventListener("click", function() { _switchDim(i); });
    _dimTabs.appendChild(btn);
  });
}

function _switchDim(i) {
  S.activeDim = i;
  document.querySelectorAll(".dim-tab").forEach(function(t, ti) {
    t.classList.toggle("active", ti === i);
    t.setAttribute("aria-selected", String(ti === i));
  });
  renderLevelCards(i);
}

/* ── LEVEL CARDS ─────────────────────────────────────────── */
function renderLevelCards(dimIdx) {
  var dim = DIMS[dimIdx];
  _levelCards.innerHTML = "";

  var scoreColors = {};
  PROFILES.forEach(function(p) {
    if (S.profiles[p.id].visible) {
      scoreColors[S.profiles[p.id].values[dimIdx]] = p.color;
    }
  });

  dim.levels.forEach(function(desc, lvl) {
    var score = lvl + 1;
    var card = document.createElement("div");
    card.className = "level-card";

    var isActive = scoreColors[score] !== undefined;
    if (isActive) {
      card.classList.add("active-score");
      card.style.setProperty("--hl-color", scoreColors[score]);
    }

    var numEl = document.createElement("div");
    numEl.className = "level-card-num";
    numEl.textContent = score;

    var labelEl = document.createElement("span");
    labelEl.className = "level-card-label";
    labelEl.textContent = LEVEL_LABELS[lvl];

    var descEl = document.createElement("p");
    descEl.className = "level-card-desc";
    descEl.textContent = desc;

    card.append(numEl, labelEl, descEl);
    _levelCards.appendChild(card);
  });
}

/* ── DIM DEFS ────────────────────────────────────────────── */
function buildDimDefs() {
  var container = document.getElementById("dimDefs");
  if (!container) return;
  DIMS.forEach(function(dim) {
    var row = document.createElement("div");
    row.className = "dim-def-row";
    var lbl = document.createElement("span");
    lbl.className = "dim-def-label";
    lbl.textContent = dim.label;
    var txt = document.createElement("span");
    txt.className = "dim-def-text";
    txt.textContent = dim.desc;
    row.append(lbl, txt);
    container.appendChild(row);
  });
}

/* ── CANVAS ──────────────────────────────────────────────── */
function _resizeCanvas() {
  var dpr = window.devicePixelRatio || 1;
  var frame = _canvas.parentElement;
  var w = frame.clientWidth, h = frame.clientHeight;
  _canvas.width = Math.round(w * dpr);
  _canvas.height = Math.round(h * dpr);
  _canvas.style.width = w + "px";
  _canvas.style.height = h + "px";
  _ctx.setTransform(1, 0, 0, 1, 0, 0);
  _ctx.scale(dpr, dpr);
  _hideTooltip();
  drawRadar();
}

/* ── GEOMETRY ────────────────────────────────────────────── */
function _pt(cx, cy, r, i, v) {
  var a = -Math.PI / 2 + i * (2 * Math.PI / DIMS.length);
  var sr = (v / ML) * r;
  return { x: cx + Math.cos(a) * sr, y: cy + Math.sin(a) * sr };
}

/* ── DRAW ────────────────────────────────────────────────── */
function drawRadar() {
  var W = _canvas.clientWidth, H = _canvas.clientHeight;
  _ctx.clearRect(0, 0, W, H);
  S.points = [];

  var sidePad = Math.min(136, W * 0.17);
  var r = Math.min(W - sidePad * 2, H - 64 - 72) / 2;
  var cx = W / 2, cy = H / 2 + 6;
  radarGeo = { cx: cx, cy: cy, r: r };

  _drawRings(cx, cy, r);
  _drawAxes(cx, cy, r);
  _drawLabels(cx, cy, r);
  PROFILES.forEach(function(p) {
    if (S.profiles[p.id].visible) _drawProfile(p, cx, cy, r);
  });
  _drawLegend(W);
}

function _drawRings(cx, cy, r) {
  var accentRgb = FRAMEWORK_CONFIG.accentRgb;
  for (var lv = ML; lv >= 1; lv--) {
    _ctx.beginPath();
    DIMS.forEach(function(_, i) {
      var p = _pt(cx, cy, r, i, lv);
      i === 0 ? _ctx.moveTo(p.x, p.y) : _ctx.lineTo(p.x, p.y);
    });
    _ctx.closePath();
    _ctx.fillStyle = lv % 2 === 0
      ? "rgba(" + accentRgb + ",0.04)"
      : "rgba(255,255,255,0.90)";
    _ctx.strokeStyle = "rgba(" + accentRgb + ",0.10)";
    _ctx.lineWidth = 1;
    _ctx.fill(); _ctx.stroke();
  }
  _ctx.fillStyle = "#94A3B8";
  _ctx.font = "500 11px 'Inter', system-ui, sans-serif";
  _ctx.textAlign = "center"; _ctx.textBaseline = "middle";
  for (var lv2 = 1; lv2 <= ML; lv2++) {
    _ctx.fillText(String(lv2), cx, cy - (r * lv2 / ML) - 9);
  }
  _ctx.beginPath(); _ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  _ctx.fillStyle = "#CBD5E1"; _ctx.fill();
}

function _drawAxes(cx, cy, r) {
  var accentRgb = FRAMEWORK_CONFIG.accentRgb;
  DIMS.forEach(function(_, i) {
    var p = _pt(cx, cy, r, i, ML);
    _ctx.beginPath(); _ctx.moveTo(cx, cy); _ctx.lineTo(p.x, p.y);
    _ctx.strokeStyle = "rgba(" + accentRgb + ",0.12)";
    _ctx.lineWidth = 1; _ctx.stroke();
  });
}

function _wrap(text, max) {
  var words = text.split(" "), lines = [], cur = "";
  words.forEach(function(w) {
    var next = cur ? cur + " " + w : w;
    if (next.length > max && cur) { lines.push(cur); cur = w; } else cur = next;
  });
  if (cur) lines.push(cur);
  return lines;
}

function _drawLabels(cx, cy, r) {
  _ctx.fillStyle = "#0F172A";
  _ctx.font = "600 11px 'Inter', system-ui, sans-serif";
  _ctx.textBaseline = "middle";
  DIMS.forEach(function(dim, i) {
    var op = _pt(cx, cy, r + 24, i, ML);
    var lines = _wrap(dim.label, 16);
    _ctx.textAlign = Math.abs(op.x - cx) < 8 ? "center" : op.x < cx ? "right" : "left";
    lines.forEach(function(line, li) {
      _ctx.fillText(line, op.x, op.y + (li - (lines.length - 1) / 2) * 14);
    });
  });
}

function _drawProfile(p, cx, cy, r) {
  var vals = S.profiles[p.id].values;
  _ctx.beginPath();
  vals.forEach(function(v, i) {
    var pp = _pt(cx, cy, r, i, v);
    i === 0 ? _ctx.moveTo(pp.x, pp.y) : _ctx.lineTo(pp.x, pp.y);
  });
  _ctx.closePath();
  _ctx.fillStyle = _hexA(p.color, 0.10);
  _ctx.strokeStyle = p.color;
  _ctx.lineWidth = p.editable ? 2.5 : 1.5;
  _ctx.setLineDash(p.editable ? [] : [4, 3]);
  _ctx.fill(); _ctx.stroke();
  _ctx.setLineDash([]);

  vals.forEach(function(v, i) {
    var pp = _pt(cx, cy, r, i, v);
    var dotR = p.editable ? 5 : 4;
    if (p.editable) {
      _ctx.beginPath(); _ctx.arc(pp.x, pp.y, dotR + 5, 0, Math.PI * 2);
      _ctx.strokeStyle = _hexA(p.color, 0.22); _ctx.lineWidth = 1.5;
      _ctx.stroke();
    }
    _ctx.beginPath(); _ctx.arc(pp.x, pp.y, dotR, 0, Math.PI * 2);
    _ctx.fillStyle = p.color;
    _ctx.strokeStyle = "#ffffff"; _ctx.lineWidth = 2;
    _ctx.fill(); _ctx.stroke();

    S.points.push({
      id: p.id, name: p.name, color: p.color,
      dimIdx: i, dimLabel: DIMS[i].label,
      score: v, x: pp.x, y: pp.y, hit: 14
    });
  });
}

function _drawLegend(W) {
  var active = PROFILES.filter(function(p) { return S.profiles[p.id].visible; });
  if (!active.length) {
    _ctx.fillStyle = "#94A3B8";
    _ctx.font = "400 12px 'Inter', system-ui, sans-serif";
    _ctx.textAlign = "left"; _ctx.textBaseline = "middle";
    _ctx.fillText("Select a profile to display.", 20, 22);
    return;
  }
  _ctx.font = "500 11px 'Inter', system-ui, sans-serif";
  _ctx.textBaseline = "middle";
  var x = 20, y = 22;
  active.forEach(function(p) {
    var tw = _ctx.measureText(p.name).width;
    var bw = tw + 28;
    if (x + bw > W - 20) { x = 20; y += 20; }
    _ctx.beginPath(); _ctx.arc(x + 5, y, 4, 0, Math.PI * 2);
    _ctx.fillStyle = p.color; _ctx.fill();
    _ctx.fillStyle = "#334155"; _ctx.textAlign = "left";
    _ctx.fillText(p.name, x + 14, y);
    x += bw + 12;
  });
}

/* ── DRAG ────────────────────────────────────────────────── */
function _onMouseDown(e) {
  if (e.button !== 0) return;
  var rect = _canvas.getBoundingClientRect();
  var px = e.clientX - rect.left, py = e.clientY - rect.top;

  var editableIds = new Set(PROFILES.filter(function(p) { return p.editable; }).map(function(p) { return p.id; }));
  var hit = S.points.reduce(function(best, p) {
    if (!editableIds.has(p.id)) return best;
    var d = Math.hypot(p.x - px, p.y - py);
    return d <= p.hit && d < (best ? best.dist : Infinity) ? Object.assign({}, p, { dist: d }) : best;
  }, null);

  if (!hit) return;
  e.preventDefault();
  S.drag = { profileId: hit.id, dimIdx: hit.dimIdx };
  _canvas.style.cursor = "grabbing";
  _hideTooltip();
}

function _onMouseUp() {
  if (!S.drag) return;
  S.drag = null;
  _canvas.style.cursor = "default";
}

function _applyDrag(clientX, clientY) {
  if (!S.drag) return;
  var profileId = S.drag.profileId, dimIdx = S.drag.dimIdx;
  var rect = _canvas.getBoundingClientRect();
  var px = clientX - rect.left, py = clientY - rect.top;
  var cx = radarGeo.cx, cy = radarGeo.cy, r = radarGeo.r;
  var angle = -Math.PI / 2 + dimIdx * (2 * Math.PI / DIMS.length);
  var dx = px - cx, dy = py - cy;
  var dot = dx * Math.cos(angle) + dy * Math.sin(angle);
  var score = Math.max(1, Math.min(ML, Math.round(dot / r * ML)));

  S.profiles[profileId].values[dimIdx] = score;

  var sliderEl = document.getElementById(profileId + "-s" + dimIdx);
  var outputEl = document.getElementById(profileId + "-s" + dimIdx + "-out");
  if (sliderEl) sliderEl.value = score;
  if (outputEl) outputEl.textContent = score;

  drawRadar();
  syncStickyBar();
}

/* ── TOOLTIP ─────────────────────────────────────────────── */
function _onMouseMove(e) {
  if (S.drag) { _applyDrag(e.clientX, e.clientY); return; }

  var rect = _canvas.getBoundingClientRect();
  var px = e.clientX - rect.left, py = e.clientY - rect.top;
  var editableIds = new Set(PROFILES.filter(function(p) { return p.editable; }).map(function(p) { return p.id; }));
  var hit = S.points.reduce(function(best, p) {
    var d = Math.hypot(p.x - px, p.y - py);
    return d <= p.hit && d < (best ? best.dist : Infinity) ? Object.assign({}, p, { dist: d }) : best;
  }, null);

  if (!hit) { _canvas.style.cursor = "default"; _hideTooltip(); return; }

  _canvas.style.cursor = editableIds.has(hit.id) ? "grab" : "pointer";
  S.hovered = hit;

  var dim = DIMS[hit.dimIdx];
  _tooltip.innerHTML =
    '<div class="tt-eyebrow">' + dim.label + '</div>' +
    '<div class="tt-profile" style="color:' + hit.color + '">' + hit.name + '</div>' +
    '<div class="tt-score-row">' +
      '<span class="tt-score-big" style="color:' + hit.color + '">' + hit.score + '</span>' +
      '<span class="tt-score-denom">/ ' + ML + '</span>' +
    '</div>' +
    '<div class="tt-badge">' + LEVEL_LABELS[hit.score - 1] + '</div>' +
    '<p class="tt-desc">' + dim.levels[hit.score - 1] + '</p>';

  var fr = _canvas.parentElement.getBoundingClientRect();
  var ttW = _tooltip.offsetWidth || 280, ttH = _tooltip.offsetHeight || 160;
  var l = px + 18, t = py - ttH - 12;
  if (l + ttW > fr.width - 8) l = px - ttW - 18;
  if (t < 8) t = py + 18;
  l = Math.max(8, l); t = Math.max(8, Math.min(t, fr.height - ttH - 8));
  _tooltip.style.left = l + "px"; _tooltip.style.top = t + "px";
  _tooltip.classList.add("visible");
  _tooltip.setAttribute("aria-hidden", "false");

  if (hit.dimIdx !== S.activeDim) {
    S.activeDim = hit.dimIdx;
    document.querySelectorAll(".dim-tab").forEach(function(tab, ti) {
      tab.classList.toggle("active", ti === hit.dimIdx);
      tab.setAttribute("aria-selected", String(ti === hit.dimIdx));
    });
  }
  renderLevelCards(hit.dimIdx);
}

function _hideTooltip() {
  S.hovered = null;
  _tooltip.classList.remove("visible");
  _tooltip.setAttribute("aria-hidden", "true");
  renderLevelCards(S.activeDim);
}

/* ── EXPORT PNG ──────────────────────────────────────────── */
function _exportPNG() {
  var dpr = window.devicePixelRatio || 1;
  var rW = _canvas.clientWidth, rH = _canvas.clientHeight;
  var vis = PROFILES.filter(function(p) { return S.profiles[p.id].visible; });
  var summH = vis.length ? 56 + DIMS.length * 22 + 16 : 0;
  var totalH = 56 + rH + summH;

  var ec = document.createElement("canvas");
  ec.width = Math.round(rW * dpr); ec.height = Math.round(totalH * dpr);
  var ectx = ec.getContext("2d");
  ectx.scale(dpr, dpr);

  var grad = ectx.createLinearGradient(0, 0, rW, 0);
  grad.addColorStop(0, FRAMEWORK_CONFIG.pngGradientStart);
  grad.addColorStop(1, FRAMEWORK_CONFIG.pngGradientEnd);
  ectx.fillStyle = grad;
  ectx.fillRect(0, 0, rW, 56);
  ectx.fillStyle = "#ffffff";
  ectx.font = "600 13px 'Inter', system-ui, sans-serif";
  ectx.textAlign = "left"; ectx.textBaseline = "middle";
  ectx.fillText(FRAMEWORK_CONFIG.exportTitle, 20, 28);

  ectx.fillStyle = "#ffffff";
  ectx.fillRect(0, 56, rW, totalH - 56);
  ectx.drawImage(_canvas, 0, 56, rW, rH);

  if (vis.length) {
    var sy = 56 + rH + 24;
    var colW = rW / Math.max(vis.length, 1);
    vis.forEach(function(p, pi) {
      var cx2 = pi * colW + 20;
      ectx.fillStyle = p.color;
      ectx.font = "700 10px 'Inter', system-ui, sans-serif";
      ectx.textAlign = "left";
      ectx.fillText(p.name.toUpperCase(), cx2, sy);
      S.profiles[p.id].values.forEach(function(v, di) {
        var ry = sy + 18 + di * 20;
        ectx.fillStyle = "#64748B";
        ectx.font = "400 10px 'Inter', system-ui, sans-serif";
        ectx.fillText(DIMS[di].short + ": ", cx2, ry);
        var tw = ectx.measureText(DIMS[di].short + ": ").width;
        ectx.fillStyle = p.color;
        ectx.font = "600 10px 'Inter', system-ui, sans-serif";
        ectx.fillText(v + "/" + ML + " — " + LEVEL_LABELS[v - 1], cx2 + tw, ry);
      });
    });
  }

  var a = document.createElement("a");
  a.href = ec.toDataURL("image/png");
  a.download = FRAMEWORK_CONFIG.exportFile;
  a.click();
  announce("Radar exported as PNG.");
}

/* ── COPY SUMMARY ────────────────────────────────────────── */
async function _copySummary() {
  var cur = S.profiles.current.values;
  var fut = S.profiles.future.values;
  var lines = [FRAMEWORK_CONFIG.copyTitle, "",
    "CURRENT SELF-ASSESSMENT",
    ...DIMS.map(function(d, i) { return "  " + d.label + ": " + cur[i] + "/" + ML + " — " + LEVEL_LABELS[cur[i] - 1]; }),
    "", "DESIRED FUTURE SHAPE",
    ...DIMS.map(function(d, i) { return "  " + d.label + ": " + fut[i] + "/" + ML + " — " + LEVEL_LABELS[fut[i] - 1]; }),
    "", "GROWTH GAPS",
    ...DIMS.map(function(d, i) { return { dim: d.label, gap: fut[i] - cur[i], c: cur[i], f: fut[i] }; })
      .filter(function(x) { return x.gap > 0; })
      .sort(function(a, b) { return b.gap - a.gap; })
      .map(function(x) { return "  " + x.dim + ": " + x.c + " → " + x.f + " (+" + x.gap + ")"; })
  ];
  try {
    await navigator.clipboard.writeText(lines.join("\n"));
    announce("Summary copied to clipboard.");
  } catch (_) { announce("Clipboard blocked — use Export PNG instead."); }
}

/* ── RESET ───────────────────────────────────────────────── */
function _reset() {
  PROFILES.forEach(function(p) {
    S.profiles[p.id].visible = p.on;
    S.profiles[p.id].values = p.defaults.slice();
  });
  buildControls();
  renderLevelCards(S.activeDim);
  drawRadar();
  syncStickyBar();
  announce("Defaults restored.");
}

/* ── UTILS ───────────────────────────────────────────────── */
function _hexA(hex, a) {
  var n = parseInt(hex.replace("#", ""), 16);
  return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
}

function announce(msg) {
  _statusMsg.textContent = msg;
  clearTimeout(_statusTimer);
  _statusTimer = setTimeout(function() { _statusMsg.textContent = ""; }, 3000);
}

/* ── STICKY RADAR BAR ────────────────────────────────────── */
var _stickyCanvas = null;
var _stickyCtx    = null;
var _stickyActive = false;

function buildStickyUI() {
  _buildStickyBar();
  _buildScoreStrip();
  _setupStickyObserver();
  document.getElementById("profileList").addEventListener("input", function() {
    requestAnimationFrame(syncStickyBar);
  });
  window.addEventListener("resize", function() {
    if (_stickyActive) requestAnimationFrame(_drawStickyRadar);
  });
}

function _buildStickyBar() {
  var bar = document.createElement("div");
  bar.id = "stickyRadarBar";
  bar.className = "sticky-radar-bar";
  bar.innerHTML =
    '<div class="sticky-bar-inner">' +
      '<div class="sticky-canvas-wrap" id="stickyCanvasWrap">' +
        '<canvas id="stickyCanvas"></canvas>' +
      '</div>' +
      '<div class="sticky-scores-grid" id="stickyScoresGrid"></div>' +
    '</div>';
  document.body.prepend(bar);
  _stickyCanvas = document.getElementById("stickyCanvas");
  _stickyCtx    = _stickyCanvas.getContext("2d");
}

function _buildScoreStrip() {
  var strip = document.createElement("div");
  strip.id = "scoreStrip";
  strip.className = "score-strip";
  var pills = document.createElement("div");
  pills.className = "strip-pills";
  DIMS.forEach(function(dim, di) {
    var pill = document.createElement("div");
    pill.className = "strip-pill";
    pill.id = "strip-pill-" + di;
    pill.innerHTML =
      '<span class="strip-dim">' + dim.short + '</span>' +
      '<span class="strip-score" id="strip-score-' + di + '">—</span>';
    pills.appendChild(pill);
  });
  strip.appendChild(pills);
  var meta = document.querySelector(".exercise-meta");
  if (meta) meta.insertAdjacentElement("afterend", strip);
}

function _setupStickyObserver() {
  var mainGrid = document.querySelector(".main-grid");
  if (!mainGrid || !window.IntersectionObserver) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      _stickyActive = !entry.isIntersecting;
      var bar = document.getElementById("stickyRadarBar");
      if (!bar) return;
      bar.classList.toggle("visible", _stickyActive);
      if (_stickyActive) requestAnimationFrame(function() { _drawStickyRadar(); _updateStickyScores(); });
    });
  }, { threshold: 0 });
  observer.observe(mainGrid);
}

function syncStickyBar() {
  if (!_stickyActive) return;
  _drawStickyRadar();
  _updateStickyScores();
}

function _sPt(cx, cy, r, i, v) {
  var a = -Math.PI / 2 + i * (2 * Math.PI / DIMS.length);
  return { x: cx + Math.cos(a) * (v / ML) * r, y: cy + Math.sin(a) * (v / ML) * r };
}

function _drawStickyRadar() {
  if (!_stickyCanvas || !_stickyCtx) return;
  var wrap = document.getElementById("stickyCanvasWrap");
  if (!wrap) return;
  var dpr = window.devicePixelRatio || 1;
  var w = wrap.clientWidth, h = wrap.clientHeight;
  if (!w || !h) return;

  _stickyCanvas.width  = Math.round(w * dpr);
  _stickyCanvas.height = Math.round(h * dpr);
  _stickyCanvas.style.width  = w + "px";
  _stickyCanvas.style.height = h + "px";
  _stickyCtx.setTransform(1, 0, 0, 1, 0, 0);
  _stickyCtx.scale(dpr, dpr);
  _stickyCtx.clearRect(0, 0, w, h);

  var pad = 10;
  var r   = Math.min(w - pad * 2, h - pad * 2) / 2;
  var cx  = w / 2, cy = h / 2;

  for (var lv = ML; lv >= 1; lv--) {
    _stickyCtx.beginPath();
    DIMS.forEach(function(_, i) {
      var p = _sPt(cx, cy, r, i, lv);
      i === 0 ? _stickyCtx.moveTo(p.x, p.y) : _stickyCtx.lineTo(p.x, p.y);
    });
    _stickyCtx.closePath();
    _stickyCtx.fillStyle   = lv % 2 === 0 ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.8)";
    _stickyCtx.strokeStyle = "rgba(0,0,0,0.08)";
    _stickyCtx.lineWidth   = 0.75;
    _stickyCtx.fill(); _stickyCtx.stroke();
  }

  DIMS.forEach(function(_, i) {
    var p = _sPt(cx, cy, r, i, ML);
    _stickyCtx.beginPath();
    _stickyCtx.moveTo(cx, cy); _stickyCtx.lineTo(p.x, p.y);
    _stickyCtx.strokeStyle = "rgba(0,0,0,0.08)";
    _stickyCtx.lineWidth   = 0.75;
    _stickyCtx.stroke();
  });

  PROFILES.forEach(function(p) {
    if (!S.profiles[p.id].visible) return;
    var vals = S.profiles[p.id].values;
    _stickyCtx.beginPath();
    vals.forEach(function(v, i) {
      var pp = _sPt(cx, cy, r, i, v);
      i === 0 ? _stickyCtx.moveTo(pp.x, pp.y) : _stickyCtx.lineTo(pp.x, pp.y);
    });
    _stickyCtx.closePath();
    _stickyCtx.fillStyle   = _hexA(p.color, 0.12);
    _stickyCtx.strokeStyle = p.color;
    _stickyCtx.lineWidth   = p.editable ? 1.5 : 1;
    _stickyCtx.setLineDash(p.editable ? [] : [3, 2]);
    _stickyCtx.fill(); _stickyCtx.stroke();
    _stickyCtx.setLineDash([]);
    vals.forEach(function(v, i) {
      var pp = _sPt(cx, cy, r, i, v);
      _stickyCtx.beginPath();
      _stickyCtx.arc(pp.x, pp.y, p.editable ? 3 : 2, 0, Math.PI * 2);
      _stickyCtx.fillStyle   = p.color;
      _stickyCtx.strokeStyle = "#fff";
      _stickyCtx.lineWidth   = 1;
      _stickyCtx.fill(); _stickyCtx.stroke();
    });
  });
}

function _updateStickyScores() {
  var grid = document.getElementById("stickyScoresGrid");
  if (!grid) return;
  grid.innerHTML = "";
  DIMS.forEach(function(dim, di) {
    var sc  = (typeof EX !== "undefined" && EX.dimScores) ? EX.dimScores[di] : S.profiles["current"].values[di];
    var row = document.createElement("div");
    row.className = "sticky-score-row";
    row.innerHTML =
      '<span class="sticky-dim-name">' + dim.short + '</span>' +
      '<span class="sticky-dim-val' + (sc !== null && sc !== undefined ? ' scored' : '') + '">' +
        (sc !== null && sc !== undefined ? sc : '—') +
      '</span>';
    grid.appendChild(row);
  });
}

function updateScoreStrip(di, sc) {
  var pill  = document.getElementById("strip-pill-" + di);
  var score = document.getElementById("strip-score-" + di);
  if (pill)  pill.classList.toggle("scored", sc !== null);
  if (score) score.textContent = sc !== null ? sc : "—";
}

/* ── BOOTSTRAP ───────────────────────────────────────────── */
_init();
