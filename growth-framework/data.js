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
    desc: "Ability to apply solid technical knowledge, exercise sound judgement, and work through complexity.",
    levels: [
      "Completes tasks in a familiar area with guidance. Understands the solution path when explained, but relies on senior engineers to define approaches for unfamiliar problems.",
      "Solves well-scoped problems independently within your domain. Recognises when a problem exceeds your knowledge and asks targeted, well-formed questions. Begins to understand trade-offs between approaches.",
      "Tackles technically complex problems within your domain without assistance. Makes sound architectural and implementation decisions. Can explain your reasoning clearly to peers and less experienced engineers.",
      "Solves hard problems across a broader surface than your immediate domain. Your technical judgement is sought by teammates. Evaluates trade-offs with the wider system in mind, not just the nearest component."
    ]
  },
  {
    label: "Delivery Excellence", short: "Delivery",
    desc: "Reliability in shipping valuable work with quality, clarity, and follow-through — including how you handle blockers and uncertainty.",
    levels: [
      "Completes well-defined tasks within expected timeframes when given clear direction. May need reminders or check-ins to stay on track. Communicates progress when asked.",
      "Delivers work independently within a sprint or milestone. Communicates blockers or risks without waiting to be asked. Work generally doesn't need significant rework after handoff.",
      "Delivers reliably across work with some ambiguity. Scopes tasks appropriately, updates estimates when they change, and helps the team maintain momentum through complexity. Quality is consistent.",
      "Navigates genuinely complex delivery — multiple dependencies, unclear requirements, or high uncertainty — without losing momentum or needing close oversight. Helps prevent problems before they escalate."
    ]
  },
  {
    label: "Ownership", short: "Ownership",
    desc: "Willingness to take responsibility for outcomes — not just tasks — and to drive things to completion even when it is difficult.",
    levels: [
      "Takes responsibility for the tasks you've been assigned. Follows through on commitments when the path is clear. May wait for direction when ambiguity arises.",
      "Owns your work end-to-end, including quality and follow-through. Picks up loose ends without waiting to be asked. Treats small problems as yours to fix.",
      "Treats team outcomes as your outcomes. Steps up when something is going wrong, even if it isn't technically your responsibility. Handles ambiguity without needing permission.",
      "Proactively identifies problems at the team or domain level and takes action. Holds yourself accountable for the impact of your work on others, not just whether it was technically complete."
    ]
  },
  {
    label: "Systems Thinking", short: "Systems",
    desc: "Ability to think beyond the immediate task and understand how your work connects to adjacent systems, teams, and downstream effects.",
    levels: [
      "Focuses primarily on the task in front of you. Understands the system you're working in when someone explains it, but doesn't yet naturally consider effects beyond the immediate component.",
      "Considers the effect of your changes on adjacent systems or teammates before making decisions. Asks about context, dependencies, and second-order effects. Avoids creating problems downstream.",
      "Proactively maps dependencies and constraints before starting complex work. Spots risks at the integration or system level. Includes wider context in your design and implementation decisions.",
      "Models and communicates complex system interactions clearly to others. Shapes technical decisions based on a broad view of constraints, risks, and trade-offs across the system."
    ]
  },
  {
    label: "Collaboration & Communication", short: "Collab",
    desc: "How well you work with others, share information, communicate clearly, and contribute to a productive team environment.",
    levels: [
      "Participates in team conversations and ceremonies. Communicates progress and blockers when asked. Receives feedback receptively.",
      "Communicates proactively — shares updates, raises concerns, and flags decisions without being prompted. Reviews others' work with useful, specific feedback.",
      "Improves the quality of team discussions and decisions through how you contribute. Communicates technical decisions clearly in writing and verbally. Feedback you give is sought out, not just tolerated.",
      "Moves technical conversations forward. Your contributions to discussions, design reviews, and code reviews raise the quality of team output. Others grow from working with you."
    ]
  },
  {
    label: "Learning & Adaptability", short: "Learning",
    desc: "How deliberately you invest in your own growth, apply feedback, and develop new skills when the work demands it.",
    levels: [
      "Learning primarily happens through the work you're assigned. Applies feedback when given directly, but doesn't actively seek it. Tends to stick to familiar approaches.",
      "Actively seeks feedback on your own work. Takes initiative to fill knowledge gaps that are blocking you. Reflects on what went well and what didn't at the end of projects.",
      "Has a clear sense of where your knowledge gaps are and invests deliberately to close them. Applies new skills and feedback consistently, not just in the moment. Growth is visible to others over time.",
      "Brings new knowledge back to the team. Seeks feedback beyond your manager — from peers, other teams, and production failures. Your learning is self-directed and applied at scale."
    ]
  },
  {
    label: "Mentoring & Multiplying Others", short: "Mentoring",
    desc: "The extent to which your presence and work makes others on the team more effective.",
    levels: [
      "Helps teammates with questions when asked. Willing to share knowledge but doesn't take initiative to do so proactively.",
      "Actively supports less experienced teammates. Shares knowledge proactively — explains reasoning, documents decisions, helps onboard new team members.",
      "Your involvement measurably improves the work or capability of others. Code reviews you give create learning, not just correctness. You are a useful resource for teammates navigating unfamiliar problems.",
      "Others grow noticeably from working with you. You create leverage — documentation, patterns, shared understanding — that benefits the team beyond your direct involvement."
    ]
  },
  {
    label: "Business & Product Awareness", short: "Business",
    desc: "Your understanding of why you're building what you're building — customer, product context, and how your decisions connect to outcomes.",
    levels: [
      "Understands the immediate feature or task you're working on. Needs context about the wider product or customer goals to be provided rather than sought.",
      "Understands the product area you're working in and why it matters. Asks questions about customer impact, product priorities, and the reason behind requirements.",
      "Business and customer understanding regularly informs your technical decisions. You can articulate why a piece of work matters beyond its technical definition and contribute meaningfully in planning conversations.",
      "Proactively deepens knowledge of customers, commercial context, and product direction. Business understanding improves the quality of your technical proposals and trade-off decisions."
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
    editable: false, defaults: [3,4,4,3,4,3,3,3],
    hint: "The minimum solid-Senior profile on all eight dimensions. This is the shape you are working toward.", on: true
  }
];
