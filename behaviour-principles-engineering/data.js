/* Engineering Behaviour Principles — content data
 * Source: EM Tools/Behaviour Principles (Engineering Variant).md
 * Six principles, each with two or more Core behaviours plus one Lead behaviour,
 * cumulative leadership bands, "when this slips" resets, and a reflective question.
 * The refined engineering variant of /behaviour-principles/.
 */

const CAPABILITIES = [
  "Communicate Clearly",
  "High Trust and Psychological Safety",
  "Be Curious, Learn and Grow",
  "Judgement and Decision-Making",
  "Seek Perspective and Build Alignment",
  "Accountability and Ownership",
  "Depth and Simplicity",
  "Stewardship and Continuous Improvement",
];

const BANDS = [
  { key: "everyone", label: "Everyone",       blurb: "Core behaviours apply to all of us, at every level. Pick a leadership level to see the behaviours that layer on top." },
  { key: "others",   label: "Leads Others",   blurb: "You're responsible for the growth and performance of individuals. These behaviours are additive to the core." },
  { key: "leaders",  label: "Leads Leaders",  blurb: "You're responsible for people who lead people. Cumulative: this includes everything in Leads Others." },
  { key: "business", label: "Leads Business", blurb: "You set direction for a function or the organisation. Cumulative: this includes Leads Others and Leads Leaders." },
];

const PRINCIPLES = [
  {
    n: 1,
    title: "We Ship Small, and We Bring Approval In Early",
    accent: "#4F46E5",
    summary:
      "Safe to fail, fast to learn: the smaller and more reversible a change is, the safer it is to get wrong. In a regulated sector, though, the real constraint on how small you can go isn't your architecture, it's change control, test and security review, and (for mobile) app store review. Design for that constraint, don't pretend it isn't there.",
    cores: [
      {
        statement: "I ship the smallest useful, reversible slice",
        capability: "Judgement and Decision-Making",
        bullets: [
          "Break work into changes small enough to reason about and roll back on their own, not just small enough to code in a day",
          "Design the rollback path before you ship, not after something's gone wrong",
          "Resist \"big bang\" by default; treat it as an exception you have to justify, not a fallback when slicing feels hard",
        ],
      },
      {
        statement: "I build the approval path into the plan, not onto the end of it",
        capability: "Seek Perspective and Build Alignment",
        bullets: [
          "Treat test, security review and compliance sign-off as part of the design conversation, not a queue you throw finished work into, and loop them in before the work's finished, not once it's done",
          "Backend, mobile, and test don't move at the same speed: size your slice around whichever approval path is actually slowest, not the fastest one",
        ],
      },
    ],
    lead: {
      statement: "I make small and reversible the default, and I get the right people in the room before the work is finished, not after",
      capability: "Judgement and Decision-Making",
      bands: {
        others: [
          "Push back on \"big bang\" plans and help the team find the smaller path",
          "Loop change control and test in during design, not at sign-off, so they're a partner rather than a surprise",
        ],
        leaders: [
          "Coach leaders to resist scope and batch-size creep under delivery pressure",
          "Make \"what does this need approved, and by when\" as normal a planning question as any technical one",
        ],
        business: [
          "Back investment in rollout tooling, flags, and staged rollout, rather than leaving it to be improvised project by project",
          "Where a launch genuinely has to be big-bang, expect early warning and a deliberate change-control and security plan, not a gate discovered late",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Batching changes because deploy or approval feels expensive", reset: "Fix the friction (earlier review, staged sign-off), don't route around it with a bigger change" },
      { drift: "Shipping a slice without a way to undo it if it goes wrong", reset: "Design the rollback as part of the change, not something you improvise mid-incident" },
      { drift: "Treating change control, test or security review as a gate to survive", reset: "Bring them into the design while it's still open, not for a rubber stamp" },
      { drift: "Waiting for the \"complete\" version before shipping anything", reset: "Ask what the smallest version is that actually teaches you something, and what it needs approved" },
    ],
    ask: "What's the smallest version of this I could ship, and have I told the people who need to approve it early enough that I'm not surprising them?",
  },

  {
    n: 2,
    title: "We Go Deep Before We Commit",
    accent: "#0369A1",
    summary:
      "Understand deeply before you fix, decide, or optimise, and never get comfortable with a system behaving in a way nobody can explain: don't act on an assumption you haven't tested, whether that's about a bug's cause, a bottleneck, or a shortcut's real cost. Depth is a deliberate choice, not automatic: know when it's worth the time, and say so plainly when you're choosing not to dig in.",
    cores: [
      {
        statement: "I tackle the scariest unknowns head-on, and I refuse to shrug at the unexplained",
        capability: "Depth and Simplicity",
        bullets: [
          "Strong engineers tackle the scariest unknowns head-on instead of procrastinating: find the part of the problem you understand least, and go there first, not last",
          "Find the actual cause before proposing the fix, and look for the pattern behind anything recurring; treat odd behaviour, even when it's harmless, as something to understand, not something to get used to",
          "If the risk is unclear, run a deliberate pass to surface the unknown unknowns, rather than assuming there aren't any",
        ],
      },
      {
        statement: "I take on technical debt deliberately, and I say out loud what it costs",
        capability: "Judgement and Decision-Making",
        bullets: [
          "Prove correctness before chasing performance, and use telemetry or data to justify complexity, not a hunch that it might matter later",
          "Take on technical debt deliberately when it buys real speed, never by accident or by default",
          "Weigh where the debt sits: debt in an internal tool is a different call from debt in a compliance-critical path",
          "Say out loud what it costs, where it lives, and when it's paid back, so someone other than you could pick up the tab knowingly",
        ],
      },
    ],
    lead: {
      statement: "I make going deep the norm, not the hero move, and I own the trade-offs the team accepts",
      capability: "Depth and Simplicity",
      bands: {
        others: [
          "Ask \"do we understand why?\" before \"is it fixed?\"",
          "Protect time to actually investigate rather than patch and move on",
          "Make deliberate debt visible on the backlog with an explicit note on which systems it touches",
        ],
        leaders: [
          "Coach leaders to resist closing incidents on speed alone, and hold teams to explaining anomalies, not just resolving symptoms, especially where customer data or a compliance-critical system is involved",
          "Enforce day to day that debt in those paths gets flagged and reviewed differently from debt in internal tooling",
        ],
        business: [
          "Treat compliance-critical debt as a genuine trade-off conversation, not a delay waved through under commercial pressure",
          "Know what's been accepted and when it's due back, because it's been raised to you plainly",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Avoiding the hard, unfamiliar part of a problem while looking busy elsewhere", reset: "Name the part you understand least, and go there first, not last" },
      { drift: "Treating a recurring alert as background noise", reset: "Ask what's happened the last three times this fired" },
      { drift: "Optimising code that isn't actually a bottleneck", reset: "Profile first, and only touch what the data points at" },
      { drift: "Taking on debt quietly in a path that touches customer data or a compliance-critical system, with no record of it", reset: "Name it explicitly: what it costs, when it's paid back, and who's signed off knowing it's there" },
    ],
    ask: "Am I heading for the part of this I understand least, or avoiding it, and do I actually know why this happens, or have I just gotten used to it?",
  },

  {
    n: 3,
    title: "We Write for the Engineer Who Isn't in the Room",
    accent: "#0F766E",
    summary:
      "Code, systems, and decisions outlive the context in the author's head. In a regulated sector, \"the room\" isn't just the next engineer: it's the auditor reconstructing what happened, the regulator asking why a control fired the way it did, and the on-call engineer at 3am with none of your context.",
    cores: [
      {
        statement: "I write code to be read, not just to work",
        capability: "Depth and Simplicity",
        bullets: [
          "Write code that distils the idea, not code that merely produces the right output",
          "Name things and structure the code so the next reader gets your intent without asking you",
          "Use comments and docs to explain why, not what, and leave enough behind that the next person, or the next audit, doesn't have to ask you",
        ],
      },
      {
        statement: "I build in the exhaust, logs, errors, and telemetry, that let someone reconstruct what happened without me",
        capability: "Stewardship and Continuous Improvement",
        bullets: [
          "Favour approaches with good introspection: meaningful errors, useful logs and telemetry, nothing swallowed silently",
          "Instrument the path an auditor or regulator would need to trace, not just the path you expect to debug yourself",
          "Treat \"no one can tell what happened\" as a bug in the system, not an acceptable gap",
        ],
      },
    ],
    lead: {
      statement: "I hold the standard for what \"readable, operable, and auditable\" mean, and I coach toward it",
      capability: "Stewardship and Continuous Improvement",
      bands: {
        others: [
          "Make review about clarity and operability, not just correctness",
          "Flag complexity that's hiding a bug, not just a bug",
        ],
        leaders: [
          "Coach leaders to value the unglamorous work of good logging, naming, and docs as much as the feature",
          "Hold teams to a standard for what \"done\" includes, including what an auditor or regulator would need to see",
        ],
        business: [
          "Resource this standard rather than treating it as free: when backend, mobile, or test need time or tooling to meet it, that's a legitimate ask, not a discretionary extra squeezed out under delivery pressure",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Writing code that's clever rather than clear", reset: "Ask if a new joiner, or an auditor, could follow this without you in the room" },
      { drift: "Swallowing an error because handling it properly is fiddly", reset: "Surface it: log it, alert on it, or fail loudly" },
      { drift: "Skipping the doc or comment because it's \"obvious\" right now", reset: "Write the one sentence that saves the next debugging session, or the next audit, an hour" },
      { drift: "Instrumenting only the path you expect to debug yourself", reset: "Ask what an auditor or regulator reconstructing this after the fact would actually need to see" },
    ],
    ask: "If this breaks at 3am, or gets picked apart in an audit or regulatory review, have I made it possible for someone who wasn't there to follow what happened?",
  },

  {
    n: 4,
    title: "We Design Across the Seam",
    accent: "#B45309",
    summary:
      "Backend, mobile, and test don't move at the same speed or answer to the same clock: backend deploys in minutes, mobile's release train runs over days or weeks with app store review in the middle, and test's review gates the path rather than sitting alongside it. The seams between these are where things actually break, and this team has never had a principle that names it.",
    cores: [
      {
        statement: "I plan and communicate dependencies across backend, mobile, and test before we hit them at integration",
        capability: "Seek Perspective and Build Alignment",
        bullets: [
          "Flag an API or contract change to the mobile teams it affects before you ship it, not when their build breaks against it",
          "When your work depends on another discipline, plan your own timeline around their cadence, not yours, especially mobile's release train and app store review",
          "Name the dependency out loud in planning, before it becomes a surprise at integration",
        ],
      },
      {
        statement: "I treat review across the seam as a shared resource, not someone else's queue",
        capability: "Accountability and Ownership",
        bullets: [
          "Bring test and security review in as a design partner while the approach is still open, not as a gate encountered at the end",
          "Prioritise reviewing or unblocking someone else's cross-discipline dependency over starting your own next piece of work",
          "A review you're sitting on can block an entire release train, not just one person's day, so treat it with that urgency",
        ],
      },
    ],
    lead: {
      statement: "I make the seams between disciplines someone's explicit job, not a gap nobody owns",
      capability: "Seek Perspective and Build Alignment",
      bands: {
        others: [
          "Make review turnaround a team norm across discipline boundaries, not an individual virtue",
          "Pair backend and mobile engineers across a dependency instead of throwing a spec over the wall",
        ],
        leaders: [
          "Coach leaders to raise cross-discipline blockers before they become a release slip, pull test in early rather than as a late blocker, and keep backend, mobile, and test plans visible to each other before commitments are made",
        ],
        business: [
          "Investment in integration platforms or tooling that would remove this friction structurally is a Director-level call; keep making the case for it, and manage the seam through visibility and joint planning in the meantime",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Shipping a backend change without telling the mobile teams who depend on it", reset: "Flag it in planning or the channel before merge, not after their build breaks" },
      { drift: "Treating test and security review as a blocker to route around", reset: "Bring test in at design, not at sign-off" },
      { drift: "Assuming everyone can move at backend's deploy cadence", reset: "Plan around the slowest link in the chain, usually mobile release and app store review" },
      { drift: "Letting a cross-discipline review queue because your own work feels more urgent", reset: "Do the five-minute review before you open your next ticket" },
    ],
    ask: "Who else's cadence, release, or review does this touch, and have I told them before they found out the hard way?",
  },

  {
    n: 5,
    title: "We Say It Straight, Especially About Risk",
    accent: "#BE185D",
    summary:
      "Clear, honest communication about how the work's actually going, not just when it's finished or on fire, and especially about risk when the news is bad: none of that happens without people feeling safe to say true things out loud, including when something they tried didn't work. In a regulated sector, a late or softened signal costs customers real trust, and often real money too.",
    cores: [
      {
        statement: "I keep Product, Design, and the business genuinely in the loop on how the work's actually going",
        capability: "Communicate Clearly",
        bullets: [
          "Keep the people relying on you aware of where things stand before they have to ask: a short, regular update, even \"no news,\" builds more trust than a good surprise ever does",
          "Talk to Product, Design, and other stakeholders about trade-offs and decisions while they're still open, not as a fait accompli once the call's made",
          "Say \"this is behind\" or \"this needs a trade-off\" as plainly and as early as you'd say good news, without waiting to be asked",
        ],
      },
      {
        statement: "I raise the risk, incident, or security concern the moment I see it, in plain language",
        capability: "Communicate Clearly",
        bullets: [
          "Flag a production risk, security concern, or likely incident immediately, before it's confirmed, not after",
          "Say the plain version first: what's affected, how badly, what you're doing about it",
          "Say \"I don't know yet\" honestly rather than guessing to sound in control",
        ],
      },
    ],
    lead: {
      statement: "I build the psychological safety to talk straight, in good times and bad",
      capability: "High Trust and Psychological Safety",
      bands: {
        others: [
          "Make it normal to share routine progress and stakeholder talk openly, not just problems",
          "Treat an honest mistake or failed experiment as something to learn from, not punish, so people stay safe to fail and fast to say so",
          "Thank people for raising things early, even when it turns out to be nothing",
        ],
        leaders: [
          "Model calm, direct communication with stakeholders and in incidents alike under real pressure",
          "Coach leaders to give the plain version upward and outward, not the version that looks best",
          "Hold this team to honest, early reporting at every level, including when it reflects badly on a call this function made",
        ],
        business: [
          "Expect and reward the plain version arriving early, even when it reflects badly on a call this function made, and treat a late escalation as the failure, not the bad news itself",
          "That trust runs both ways: expect genuine visibility into significant work in flight, not just an alert once it's gone wrong, because everyday visibility is what makes the bad news credible when it lands",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Only talking to stakeholders, whether Product, Design, or leadership, when there's a decision needed or something's gone wrong", reset: "Bring them into the everyday texture of the work, not just the moments that need them" },
      { drift: "Waiting for certainty before raising a security or production concern", reset: "Raise it as a hypothesis, and let others help confirm or rule it out" },
      { drift: "Softening the severity to avoid alarm", reset: "State the actual customer impact first, then the caveats" },
      { drift: "Going quiet mid-incident because there's nothing new to report", reset: "Say \"still working it, no update yet\" rather than nothing" },
      { drift: "Hiding or downplaying a failed experiment or a mistake because it feels like an admission", reset: "Say what didn't work as plainly as what did; a fast \"that didn't work\" is how the team learns quickest" },
    ],
    ask: "If this turns out to matter, will I be glad I said it now, to the people who actually needed to hear it?",
  },

  {
    n: 6,
    title: "We Own the System, Not Just the Ticket",
    accent: "#047857",
    summary:
      "Ownership doesn't stop at your part of the code or the boundary of \"done\": it covers the whole path, from getting the project over the line to owning the system it becomes once it's live, including the 3am page.",
    cores: [
      {
        statement: "I own getting the work over the line, not just my part of building it",
        capability: "Accountability and Ownership",
        bullets: [
          "Hold the whole thing in your head: how it works technically and what it's actually meant to achieve, not just the ticket in front of you",
          "Anticipate the problem nobody's flagged yet, technical or otherwise, rather than waiting for it to surface on its own",
          "As delivery nears, stay light enough to jump on what comes up, and keep asking \"could this ship right now?\" as a live question, not a milestone you're working towards",
        ],
      },
      {
        statement: "I own what my work does to customers and the system, end to end",
        capability: "Accountability and Ownership",
        bullets: [
          "Understand what your change touches downstream, including what it does to customer data and trust",
          "Carry your on-call and incident responsibilities as seriously as your delivery work",
          "Step in on a failing system regardless of whose name is on the commit",
        ],
      },
    ],
    lead: {
      statement: "I make ownership of delivery and of the system clear across boundaries, and I don't let it dilute under pressure",
      capability: "Accountability and Ownership",
      bands: {
        others: [
          "Make it unambiguous who's driving each project end-to-end as well as who owns each service, so nothing stalls for lack of a single owner",
          "Protect on-call load so ownership doesn't become burnout",
        ],
        leaders: [
          "Address ownership that's fallen into a gap between teams, or a stalled project, before it becomes an incident",
          "Coach leaders to devolve ownership rather than absorb it upward",
          "Keep ownership boundaries across backend, mobile, and test explicit, and raise it directly if resourcing forces a gap",
        ],
        business: [
          "Back this function's staffing and resourcing asks when an ownership gap is raised",
          "Treat customer data protection and trust as non-negotiable in how this team is staffed, whatever the delivery pressure",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Treating deployment as the finish line rather than confirming the work actually landed", reset: "Check with whoever asked for this, and whoever's using it, before calling it done" },
      { drift: "Waiting for a problem to surface instead of anticipating it", reset: "Ask what's most likely to break at the last minute, and go looking for it now" },
      { drift: "Treating \"not my service\" as a reason to walk past a failure", reset: "Ask who owns the customer impact, not who owns the code" },
      { drift: "Letting on-call load quietly grow until it's unsustainable", reset: "Name it and raise it before it becomes a resourcing crisis" },
      { drift: "Optimising your service's metrics at the system's expense", reset: "Check what the change does to the thing the customer actually experiences" },
    ],
    ask: "If this project stalled before it landed, or this system went down at 3am, would it be obvious whose job it was to catch it, and would I be one of them?",
  },
];
