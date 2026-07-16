"use strict";

var FRAMEWORK_CONFIG = {
  maxLevel:         4,
  storageKey:       "lhv-growth-framework-v1",
  exportTitle:      "Junior & Intermediate Engineer Growth Radar",
  exportFile:       "junior-growth-radar.png",
  copyTitle:        "Junior & Intermediate Engineer Growth Radar",
  pngGradientStart: "#065f46",
  pngGradientEnd:   "#0F172A",
  accentRgb:        "16,185,129"
};

var DIMS = [
  {
    label: "Technical Depth", short: "Technical",
    desc: "Your ability to apply solid technical knowledge, exercise sound judgement, and work through complexity in your domain.",
    levels: [
      "Completes tasks in a familiar part of the codebase with guidance. Follows a solution once it's explained, but stalls on unfamiliar problems until a more senior engineer defines the approach.",
      "Solves well-scoped problems in your own domain without help. Spots when a problem is beyond your current knowledge and asks targeted, well-formed questions rather than going quiet or guessing. Starts to weigh trade-offs between approaches.",
      "Works through genuinely complex problems in your own domain unaided, including ones with no obvious path. Makes sound implementation and design choices and can defend the reasoning to peers and to less experienced engineers. Stays with a hard problem instead of routing around it.",
      "Takes on hard, unfamiliar problems across your own domain and makes progress where the approach isn't clear at the outset. Teammates seek out your technical judgement. Chooses between competing solutions on their merits, not just the one you already know."
    ]
  },
  {
    label: "Delivery Excellence", short: "Delivery",
    desc: "Your reliability in shipping valuable work with quality, clarity, and follow-through — including how you handle blockers, scope, and uncertainty.",
    levels: [
      "Completes well-defined tasks in the expected timeframe when the direction is clear. Needs reminders or check-ins to stay on track. When something blocks you, the work tends to stall until someone steps in.",
      "Delivers your own work independently within a sprint or milestone. Raises blockers and risks early, without waiting to be asked. When something unexpected comes up, you find a way forward on your own piece and escalate what you genuinely can't resolve. Work rarely needs significant rework after handoff.",
      "Delivers reliably across work that carries real ambiguity. Scopes appropriately, updates estimates as they change, and keeps momentum through complexity rather than losing the thread when plans shift. Quality holds up under pressure, not just when things are calm.",
      "Carries genuinely complex delivery — multiple dependencies, unclear requirements, high uncertainty — without losing momentum or needing close oversight. Absorbs disruption so the wider effort keeps moving, and heads off problems before they escalate."
    ]
  },
  {
    label: "Ownership", short: "Ownership",
    desc: "Your willingness to take responsibility for outcomes — not just tasks — and to drive things to completion even when it is difficult or uncomfortable.",
    levels: [
      "Takes responsibility for the tasks you're assigned and follows through when the path is clear. When ambiguity or a setback arises, you tend to wait for direction.",
      "Owns your own work end-to-end, including quality and follow-through. Picks up loose ends near your work without being asked, and treats small problems as yours to fix rather than passing them on.",
      "Treats your team's outcomes as your own, not just your slice. Steps up when something is going wrong in the team's work as it happens, even when it isn't strictly your responsibility, and keeps going when it's uncomfortable.",
      "Actively looks for problems at the team or domain level before they surface, and takes them on. Holds yourself accountable for the impact of your work on others — including when it goes wrong — not just whether your part was technically complete."
    ]
  },
  {
    label: "Systems Thinking", short: "Systems",
    desc: "Your ability to think beyond the immediate task — understanding how your work connects to adjacent systems, teams, and downstream effects.",
    levels: [
      "Focuses on the component in front of you. Follows how the broader system fits together once it's explained, but doesn't yet consider effects beyond the immediate change.",
      "Considers the effect of your changes on adjacent systems and teammates before acting. Asks about context, dependencies, and second-order effects, and avoids creating problems downstream.",
      "Maps dependencies and constraints before starting complex work. Spots risks at the integration and system level, and thinks through how your change behaves when something upstream or downstream fails — not just the happy path.",
      "Models and communicates how complex parts of the system interact, so others can reason about them. Shapes technical decisions around system-wide trade-offs, constraints, and failure modes, designing so problems stay contained rather than cascade."
    ]
  },
  {
    label: "Mentoring & Multiplying Others", short: "Mentoring",
    desc: "The extent to which your presence and work makes others on the team more effective — through sharing knowledge, reviewing work, and helping unblock teammates.",
    levels: [
      "Answers teammates' questions when asked and is willing to share what you know, but doesn't yet offer help proactively.",
      "Actively supports less experienced teammates. Shares knowledge without being asked — explains your reasoning, documents decisions, and helps onboard new joiners.",
      "Teammates learn from working with you. The code reviews you give teach something, not just catch defects, and people come to you when they're stuck on an unfamiliar problem.",
      "Your involvement measurably lifts the capability of the people around you, and you're a trusted resource the team relies on for unfamiliar problems."
    ]
  },
  {
    label: "Collaboration & Communication", short: "Collab",
    desc: "How well you work with others, share information, communicate clearly, and contribute to a productive team environment.",
    levels: [
      "Takes part in team conversations and ceremonies. Shares status when prompted, and takes feedback on board without getting defensive.",
      "Communicates proactively — shares updates, raises concerns, and flags decisions without being prompted. Gives specific, useful feedback on others' work, and stays clear and level-headed when a discussion gets tense.",
      "Raises the quality of team discussions and decisions through how you contribute. Explains technical decisions clearly in writing and out loud, and can hold a differing view constructively rather than either backing down or digging in.",
      "Moves technical conversations forward and helps the team reach a decision. Earns buy-in through clear reasoning, navigates disagreement without it turning personal, and communicates calmly and clearly when things are going wrong."
    ]
  },
  {
    label: "Learning & Adaptability", short: "Learning",
    desc: "How deliberately you invest in your own growth, apply feedback, and develop new skills when the work demands it.",
    levels: [
      "Learning happens mostly through the work you're handed. You apply feedback when it's given directly, but tend to fall back on familiar approaches when the work calls for something new.",
      "Actively seeks feedback on your own work and fills the knowledge gaps blocking you. Adjusts your approach when something isn't working instead of pushing the same method harder, and reflects on what went well and badly after a piece of work.",
      "Has a clear read on where your gaps are and invests deliberately to close them. Applies feedback and new skills consistently, not just in the moment, and treats setbacks and mistakes as information to adjust from. Growth is visible to others over time.",
      "Brings new knowledge back to the team. Seeks feedback beyond your manager — from peers, other teams, and production failures — and turns things going wrong into durable improvements. Learning is self-directed and applied broadly."
    ]
  },
  {
    label: "Business & Product Awareness", short: "Business",
    desc: "Your understanding of why you're building what you're building — the customer, the product context, and how your engineering decisions connect to outcomes.",
    levels: [
      "Understands the immediate feature or task you're working on. Relies on others to supply the wider product and customer context.",
      "Understands the product area you work in and why it matters. Asks about customer impact, priorities, and the reason behind requirements.",
      "Customer and business understanding regularly shapes your technical decisions. You can explain why your team's work matters beyond its technical definition, and contribute meaningfully to planning and prioritisation.",
      "Proactively deepens your grasp of customers, commercial context, and product direction beyond your team's immediate roadmap. That understanding sharpens your technical proposals and trade-off calls."
    ]
  }
];

var LEVEL_LABELS = [
  "Building foundations",
  "Developing independence",
  "Consistently independent",
  "Demonstrating Senior behaviours"
];

var PROFILES = [
  {
    id: "current", name: "Current Self-Assessment", color: "#10b981",
    editable: true, defaults: [2,2,2,2,2,2,2,2],
    hint: "Your honest view of where your strengths land today.", on: true
  },
  {
    id: "future", name: "Desired Future Shape", color: "#06B6D4",
    editable: true, defaults: [3,3,3,3,3,3,3,3],
    hint: "The shape you want to grow toward over the next 12 months.", on: true
  },
  {
    id: "seniorRef", name: "Senior Engineer Baseline", color: "#6366F1",
    editable: false, defaults: [3,4,4,3,3,4,3,3],
    hint: "The minimum solid-Senior profile on all eight dimensions. This is the shape you are working toward.", on: true
  }
];
