"use strict";

var FRAMEWORK_CONFIG = {
  maxLevel:         5,
  storageKey:       "lhv-senior-growth-framework-v1",
  exportTitle:      "Engineering Growth Radar",
  exportFile:       "engineering-growth-radar.png",
  copyTitle:        "Engineering Growth Radar",
  pngGradientStart: "#3730A3",
  pngGradientEnd:   "#1E1B4B",
  accentRgb:        "99,102,241"
};

var DIMS = [
  {
    label: "Technical Depth", short: "Technical Depth",
    desc: "Your ability to solve technically hard problems and exercise sound engineering judgment.",
    levels: [
      "Solves technically hard problems across your own domain without guidance, including unfamiliar ones with no clear path. Your technical judgement is sound and sought by peers. Weighs trade-offs with the wider system in mind, and holds up on the highest-stakes problems rather than deferring them.",
      "Tackles hard problems across a broader surface than your own domain. Begins to shape technical decisions beyond your immediate team. Knows when to bring in specialist knowledge versus own the problem.",
      "Deep mastery in at least one area; your technical judgement is actively sought by peers and cross-team engineers. Prototypes and evaluates new approaches independently, and stays sound under sustained technical uncertainty.",
      "Defines technical standards and patterns that other teams adopt. Identifies technical risk at a system level. Leads resolution of the most complex, highest-stakes problems, holding the line when the pressure is on.",
      "Shapes the organisation's technical direction. Introduces new technical capability ahead of need. Technical authority is recognised across the entire engineering function."
    ]
  },
  {
    label: "Delivery Excellence", short: "Delivery",
    desc: "Your reliability in shipping valuable work with quality, clarity, and follow-through.",
    levels: [
      "Delivers reliably through genuinely complex work — multiple dependencies, unclear requirements, real uncertainty — without losing momentum or needing close oversight. Absorbs disruption so the work keeps moving, and heads off problems before they escalate.",
      "Designs delivery approaches that reduce risk and improve predictability. Spots and clears team-level bottlenecks before they become problems, and keeps delivery steady when a plan falls apart.",
      "Shapes how your team delivers. Introduces process improvements the team adopts, and leads delivery through genuinely novel or high-risk situations.",
      "Shapes how multiple teams deliver. Improvements you introduce are adopted across teams, and you hold the effort together under sustained, cross-team pressure.",
      "Defines delivery practices at an organisational level. Sets the standard for how engineering ships across the function."
    ]
  },
  {
    label: "Ownership", short: "Ownership",
    desc: "Your willingness to drive outcomes, handle ambiguity, and take end-to-end responsibility.",
    levels: [
      "Owns problems at a team or domain level, not just your own tickets. Accountable for the quality, reliability, and health of your area — including when it's uncomfortable, and including when things go wrong.",
      "Expands ownership across team boundaries. Picks up problems the wider group needs solved and drives them to resolution without waiting for formal authority.",
      "Takes on systemic problems spanning multiple teams or a platform area as yours to fix, and stays with them through the messy middle.",
      "Drives resolution of organisation-level issues. Holds accountability for outcomes well beyond your own area, and keeps others steady when the problem is ambiguous and high-stakes.",
      "Creates the conditions for an ownership culture across engineering. Defines what end-to-end accountability looks like at organisational scale."
    ]
  },
  {
    label: "Systems Thinking", short: "Systems",
    desc: "Your ability to connect components, constraints, and tradeoffs across a broader system.",
    levels: [
      "Models and communicates complex system interactions clearly. Shapes technical decisions around system-wide constraints, trade-offs, and failure modes, so problems stay contained rather than cascade.",
      "Maps dependencies and risks across a broad surface, and spots architectural patterns and failure modes that peers miss. Informs cross-team and cross-platform decisions.",
      "Architects solutions at a platform scale, and guides how systems evolve over the longer term.",
      "Sets architectural direction across multiple teams. Develops systems thinking in others through design reviews and mentoring, and holds the line on sound architecture under delivery pressure.",
      "Defines architectural direction for the engineering organisation. Creates frameworks others use to reason about large-scale system problems."
    ]
  },
  {
    label: "Mentoring & Multiplication", short: "Mentoring",
    desc: "The growth you create in others through coaching, feedback, enablement, and raising team effectiveness.",
    levels: [
      "Your involvement measurably lifts the capability of those around you. The feedback and reviews you give teach, not just correct, and you're a trusted resource for teammates navigating unfamiliar problems.",
      "Raises the capability of your whole team through coaching, documentation, and knowledge sharing. The team doesn't become less capable when you're unavailable.",
      "Builds enabling artefacts — standards, runbooks, frameworks — that keep working long after you've moved on, creating leverage well beyond your direct involvement.",
      "Multiplies effectiveness across multiple teams. What you build is adopted and sustained by teams independently of you.",
      "Develops other senior engineers. Creates organisational capability, not just individual growth. Your impact on others' careers is visible at scale."
    ]
  },
  {
    label: "Influence", short: "Influence",
    desc: "Your ability to align people, shape decisions, and move work forward without relying on formal authority.",
    levels: [
      "Communicates technical positions clearly and earns buy-in within your team. Navigates disagreement constructively and stays calm and clear when things are going wrong. Your opinions are heard and considered.",
      "Shapes decisions beyond your immediate team through sound reasoning, examples, and trusted relationships. Builds credibility with stakeholders outside engineering.",
      "Consistently moves important decisions forward across functions. Aligns people with competing priorities. Recognised as a voice worth including in cross-functional conversations.",
      "Shapes organisational direction through influence rather than authority. Builds coalitions. Brings large or complex stakeholder groups to productive outcomes.",
      "Trusted to represent the engineering perspective at the highest levels. Creates alignment across the organisation on topics that matter to the business."
    ]
  },
  {
    label: "Learning & Adaptability", short: "Learning",
    desc: "How deliberately you invest in your own growth, adapt to change, and turn setbacks and new demands into capability — for yourself and the team.",
    levels: [
      "Learning is self-directed. You seek feedback beyond your manager — peers, other teams, production incidents — and turn things going wrong into durable improvements. Adapts your approach as the work changes rather than defaulting to what's worked before.",
      "Deliberately broadens beyond your core craft — adjacent domains, product, ways of working — and brings what you learn back to the team.",
      "Anticipates where the team will need new capability and builds it ahead of time. Adapts confidently when priorities or technology shift.",
      "Broadens into organisational dynamics, product strategy, and commercial context in service of a cross-team remit. Introduces new capability to multiple teams before it becomes urgent.",
      "At the forefront of your domain, calibrated against the industry, not just your own organisation. Introduces new technical capability ahead of need, and your learning informs architectural and strategic direction."
    ]
  },
  {
    label: "Strategy & Product Thinking", short: "Strategy",
    desc: "Your skill in connecting engineering work to longer-term direction, product outcomes, and prioritisation.",
    levels: [
      "Proactively contributes to product direction. Asks good questions about priorities, constraints, and alternatives, and shapes near-term roadmap choices.",
      "Brings an engineering perspective to product strategy discussions. Identifies opportunities and constraints that shape medium-term direction, and is recognised as a strategic contributor by product partners.",
      "Co-owns product strategy for your domain. Proposes and defends long-term technical investment with clear product rationale.",
      "Shapes product and engineering strategy across more than your own domain, aligning technical investment with where the business is heading.",
      "Shapes multi-year product and engineering strategy. Recognised as a strategic thinker beyond engineering — trusted in business-level investment decisions."
    ]
  },
  {
    label: "Business Context", short: "Business",
    desc: "Your understanding of customer, commercial, and operational context, and how it informs your engineering choices.",
    levels: [
      "Proactively deepens your knowledge of the product, customers, and commercial context, and it regularly sharpens your technical decisions and trade-off calls.",
      "Makes better engineering decisions than peers because of your business understanding. Bridges engineering and business language naturally, and spots misaligned priorities early.",
      "Shapes engineering priorities using business insight. Translates commercial and regulatory context into engineering strategy for your domain.",
      "Influences priorities beyond your own domain, aligning engineering investment with commercial and regulatory realities across teams.",
      "Provides strategic input on business direction from an engineering perspective. A trusted business partner to product, commercial, and risk leadership."
    ]
  }
];

var LEVEL_LABELS = [
  "Solid baseline",
  "Developing",
  "Consistent strength",
  "Elevated impact",
  "Staff+ impact"
];

var PROFILES = [
  {
    id: "current", name: "Current Self-Assessment", color: "#6366F1",
    editable: true, defaults: [3,3,3,3,3,3,3,3,3],
    hint: "Your honest view of where your strengths land today.", on: true
  },
  {
    id: "future", name: "Desired Future Shape", color: "#06B6D4",
    editable: true, defaults: [4,4,4,4,4,4,4,4,4],
    hint: "The shape you want to grow toward over the next 12 months.", on: true
  },
  {
    id: "tech", name: "Technical Specialist", color: "#7C3AED",
    editable: false, defaults: [5,4,3,4,2,2,4,1,1],
    hint: "Deep technical mastery; solves the hardest problems with authority.", on: false
  },
  {
    id: "multiplier", name: "Team Multiplier", color: "#DB2777",
    editable: false, defaults: [3,4,4,3,5,5,4,2,3],
    hint: "Amplifies people and delivery; a force-multiplier for the team.", on: false
  },
  {
    id: "staff", name: "Emerging Staff Shape", color: "#059669",
    editable: false, defaults: [4,4,5,5,4,4,4,4,4],
    hint: "Broad, leveraged profile associated with Staff+ growth.", on: false
  },
  {
    id: "product", name: "Product Engineer", color: "#D97706",
    editable: false, defaults: [3,4,5,3,2,4,3,5,5],
    hint: "Combines strong delivery with deep product and business insight.", on: false
  },
  {
    id: "platform", name: "Platform Architect", color: "#DC2626",
    editable: false, defaults: [5,3,4,5,3,3,4,4,3],
    hint: "Architecture, system leverage, and platform-level thinking.", on: false
  }
];
