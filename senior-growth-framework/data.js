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
    desc: "Strength in solving technically hard problems and exercising sound engineering judgment.",
    levels: [
      "Solves technically complex problems within your own domain. Understands tradeoffs for common architectural patterns. Rarely needs guidance on technical decisions in your area.",
      "Tackles hard problems across a broader surface. Begins to shape technical decisions beyond your immediate team. Recognises when to bring in specialist knowledge vs. own the problem.",
      "Deep mastery in at least one area; technical judgment actively sought by peers and cross-team engineers. Able to prototype and evaluate new approaches independently.",
      "Defines technical standards and patterns that other teams adopt. Identifies technical risk at a system level. Leads resolution of the most complex, highest-stakes technical problems.",
      "Shapes the organisation's technical direction. Introduces new technical capability. Technical authority recognised across the entire engineering function."
    ]
  },
  {
    label: "Delivery Excellence", short: "Delivery",
    desc: "Reliability in shipping valuable work with quality, clarity, and follow-through.",
    levels: [
      "Ships reliable work within sprint or milestone boundaries. Communicates blockers early. Work rarely needs significant rework after handoff.",
      "Navigates ambiguity and delivers across multiple dependencies. Helps the team maintain momentum when things get complex or uncertain.",
      "Designs delivery approaches that reduce risk and improve predictability. Identifies and addresses team-level bottlenecks before they become problems.",
      "Shapes how the team — or multiple teams — deliver. Introduces process improvements that others adopt. Leads delivery through genuinely novel or high-risk situations.",
      "Defines delivery practices at an organisational level. Sets the standard for how engineering ships across the function."
    ]
  },
  {
    label: "Ownership", short: "Ownership",
    desc: "Willingness to drive outcomes, handle ambiguity, and take end-to-end responsibility.",
    levels: [
      "Takes full responsibility for the outcomes of your own work. Drives to completion without close supervision. Handles ambiguity within your own scope comfortably.",
      "Expands ownership beyond assigned tasks. Picks up problems the team needs solved. Treats team outcomes as your outcomes.",
      "Owns problems at a team or domain level — not just individual tickets. Accountable for quality, reliability, and health of your area, including when it's uncomfortable.",
      "Drives resolution of cross-team or organisational issues. Takes on systemic problems as yours to fix, even without formal authority.",
      "Creates the conditions for an ownership culture across engineering. Defines what end-to-end accountability looks like at organisational scale."
    ]
  },
  {
    label: "Systems Thinking", short: "Systems",
    desc: "Ability to connect components, constraints, and trade-offs across a broader system.",
    levels: [
      "Understands how your work connects to adjacent systems and teams. Considers second-order effects of technical decisions. Avoids local optimisations that create wider problems.",
      "Proactively maps dependencies and constraints across a broader surface. Shapes decisions with the larger system in mind rather than the nearest unit of work.",
      "Models and communicates complex system interactions clearly. Spots architectural patterns and risks that peers miss. Informs cross-team and cross-platform decisions.",
      "Architects solutions at a platform or organisational scale. Guides long-term system evolution. Helps others develop systems thinking through mentoring and design reviews.",
      "Defines architectural direction for the engineering organisation. Creates frameworks others use to reason about large-scale system problems."
    ]
  },
  {
    label: "Mentoring & Multiplication", short: "Mentoring",
    desc: "Growth created through coaching, feedback, enablement, and raising others' effectiveness.",
    levels: [
      "Actively supports less experienced teammates. Provides useful, specific feedback. Makes time for technical questions and collaborative working.",
      "Helps teammates grow in more structured ways. Identifies development opportunities for others. Your involvement makes teammates measurably more capable over time.",
      "Raises the capability of your whole team through coaching, documentation, and knowledge sharing. The team doesn't become less capable when you're unavailable.",
      "Multiplies effectiveness across teams. Builds enabling artefacts — standards, runbooks, frameworks — that keep working long after you've moved on.",
      "Develops other senior engineers. Creates organisational capability, not just individual growth. Your impact on others' careers is visible at scale."
    ]
  },
  {
    label: "Influence", short: "Influence",
    desc: "Ability to align people, shape decisions, and move work forward without relying on formal authority.",
    levels: [
      "Communicates technical positions clearly and earns buy-in within your team. Navigates disagreement constructively. Your opinions are heard and considered.",
      "Shapes decisions beyond your immediate team through sound reasoning and trusted relationships. Builds credibility with stakeholders outside engineering.",
      "Consistently moves important decisions forward across functions. Aligns people with competing priorities. Recognised as a voice worth including in cross-functional conversations.",
      "Shapes organisational direction through influence rather than authority. Builds coalitions. Brings large or complex stakeholder groups to productive outcomes.",
      "Trusted to represent the engineering perspective at the highest levels. Creates alignment across the organisation on topics that matter to the business."
    ]
  },
  {
    label: "Business Context", short: "Business",
    desc: "Understanding of customer, commercial, and operational context behind engineering choices.",
    levels: [
      "Understands how your work connects to customer outcomes and business metrics. Can articulate why a piece of work matters beyond its technical definition.",
      "Proactively deepens knowledge of the product, customers, and commercial context. Business understanding regularly improves the quality of your technical decisions.",
      "Makes better engineering decisions than peers because of your business understanding. Bridges engineering and business language naturally. Spots misaligned priorities early.",
      "Shapes engineering priorities using business insight. Translates commercial and regulatory context into engineering strategy for your domain.",
      "Provides strategic input on business direction from an engineering perspective. Trusted business partner to product, commercial, and risk leadership."
    ]
  },
  {
    label: "Strategy & Product Thinking", short: "Strategy",
    desc: "Skill in connecting engineering work to longer-term direction, product outcomes, and prioritisation.",
    levels: [
      "Understands the roadmap beyond the current sprint. Connects daily work to product goals. Can contribute meaningfully in planning conversations.",
      "Proactively contributes to product direction. Asks good questions about priorities, constraints, and alternatives. Shapes near-term roadmap choices.",
      "Brings an engineering perspective to product strategy discussions. Identifies opportunities and constraints shaping medium-term direction. Recognised as a strategic contributor by product partners.",
      "Co-owns product strategy for your domain. Proposes and defends long-term technical investment with clear product rationale.",
      "Shapes multi-year product and engineering strategy. Recognised as a strategic thinker beyond engineering — trusted in business-level investment decisions."
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
    editable: true, defaults: [3,3,3,3,3,3,3,3],
    hint: "Your honest view of where your strengths land today.", on: true
  },
  {
    id: "future", name: "Desired Future Shape", color: "#06B6D4",
    editable: true, defaults: [4,4,4,4,4,4,4,4],
    hint: "The shape you want to grow toward over the next 12 months.", on: true
  },
  {
    id: "tech", name: "Technical Specialist", color: "#7C3AED",
    editable: false, defaults: [5,4,3,4,2,2,1,1],
    hint: "Deep technical mastery; solves the hardest problems with authority.", on: false
  },
  {
    id: "multiplier", name: "Team Multiplier", color: "#DB2777",
    editable: false, defaults: [3,4,4,3,5,5,3,2],
    hint: "Amplifies people and delivery; a force-multiplier for the team.", on: false
  },
  {
    id: "staff", name: "Emerging Staff Shape", color: "#059669",
    editable: false, defaults: [4,4,5,5,4,4,4,4],
    hint: "Broad, leveraged profile associated with Staff+ growth.", on: false
  },
  {
    id: "product", name: "Product Engineer", color: "#D97706",
    editable: false, defaults: [3,4,5,3,2,4,5,5],
    hint: "Combines strong delivery with deep product and business insight.", on: false
  },
  {
    id: "platform", name: "Platform Architect", color: "#DC2626",
    editable: false, defaults: [5,3,4,5,3,3,3,4],
    hint: "Architecture, system leverage, and platform-level thinking.", on: false
  }
];
