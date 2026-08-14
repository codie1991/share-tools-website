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
      "Safe to fail, fast to learn: the smaller and more reversible a change is, the lower the risk and the sooner we learn from it. In a regulated sector, the pace of that learning is set by change control, test and security review, and (for mobile) app store review, not just by our own architecture. Designing around that from the start is how we keep shipping at pace, not despite it.",
    cores: [
      {
        statement: "I ship the smallest useful, reversible slice",
        capability: "Judgement and Decision-Making",
        bullets: [
          "Break work into changes small enough to reason about and roll back on their own, not just small enough to code in a day",
          "Build the rollback path into the change itself, so recovery is fast and boring rather than improvised",
          "Look for the smaller path first: treat a big-bang release as a deliberate choice that earns its place, not the default when slicing feels hard",
        ],
      },
      {
        statement: "I build the approval path into the plan, not onto the end of it",
        capability: "Seek Perspective and Build Alignment",
        bullets: [
          "Treat test, security review and compliance sign-off as partners in the design, not a queue at the end. Loop them in while the approach is still open, and keep momentum by giving them a head start.",
          "Backend, mobile, and test move at different speeds. Size the slice around whichever approval path is slowest, so the whole thing actually ships, not just your part.",
        ],
      },
    ],
    lead: {
      statement: "I make small and reversible the default, and I get the right people in the room before the work is finished, not after",
      capability: "Judgement and Decision-Making",
      bands: {
        others: [
          "Help the team find the smaller, shippable path before reaching for a big-bang plan",
          "Bring change control and test into design early so they're a partner in moving fast, not a surprise at the end",
        ],
        leaders: [
          "Coach leaders to protect small batch sizes under delivery pressure, since that's what keeps momentum predictable",
          "Make \"what does this need approved, and by when\" as normal a planning question as any technical one",
        ],
        business: [
          "Directors back investment in rollout tooling, flags, staged rollout, so pace doesn't depend on improvising it project by project",
          "Where a launch genuinely has to be big-bang, Directors expect early warning and a deliberate change-control and security plan, not a gate discovered late",
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
    ask: "What's the smallest version of this I could ship? Have I told the people who need to approve it, early enough that I'm not surprising them?",
  },

  {
    n: 2,
    title: "We Go Deep on Purpose, Then Move Fast",
    accent: "#0369A1",
    summary:
      "Depth is a judgement call, not a default. Know when a problem actually needs investigation, and make that call on purpose, not out of habit. Never get comfortable with a system behaving in a way nobody can explain, and don't act on an assumption you haven't tested, whether that's a bug's cause, a bottleneck, or a shortcut's real cost. Often the fastest way to find the unknown unknowns isn't more analysis. It's shipping the smallest thing that tests the assumption, and learning from what comes back.",
    cores: [
      {
        statement: "I judge how deep a problem needs, then commit to finding out",
        capability: "Depth and Simplicity",
        bullets: [
          "Decide upfront whether this needs a five-minute check or a real investigation. Say which out loud, rather than defaulting to either.",
          "Tackle the scariest unknowns head-on instead of procrastinating. Find the part of the problem you understand least, and go there first, not last.",
          "Find the actual cause before proposing the fix. Look for the pattern behind anything that recurs. Treat odd behaviour, even when it's harmless, as something to understand, not get used to.",
          "Where shipping something small would answer the question faster than more analysis, do that instead. Delivery is often how you find the unknown unknowns, not a distraction from it.",
        ],
      },
      {
        statement: "I bring options and their tradeoffs, and I own the debt I choose to take on",
        capability: "Judgement and Decision-Making",
        bullets: [
          "Prove correctness before chasing performance. Use telemetry or data to justify complexity, not a hunch that it might matter later.",
          "Once you've gone deep enough to have a view, bring back more than one workable option with its tradeoffs, not just a single fix.",
          "Take on technical debt deliberately when it buys real speed, never by accident or by default. Weigh where it sits: debt in an internal tool is a different call from debt in a compliance-critical path.",
          "Say out loud what it costs, where it lives, and when it's paid back, so someone other than you could pick up the tab knowingly.",
        ],
      },
    ],
    lead: {
      statement: "I make the depth call a normal planning question, not a hero move, and I own the trade-offs the team accepts",
      capability: "Depth and Simplicity",
      bands: {
        others: [
          "Make \"how deep does this need to go\" a normal question in planning and reviews, not just \"is it fixed\"",
          "Protect time to investigate when the answer's \"deep\", and protect pace when it isn't",
          "Make deliberate debt visible on the backlog, with a note on which systems it touches",
        ],
        leaders: [
          "Coach leaders to resist closing incidents on speed alone, and to hold teams to explaining anomalies, not just resolving symptoms",
          "Expect options with tradeoffs on compliance-critical calls, not a single recommendation",
          "Enforce that debt in those paths gets flagged and reviewed differently from debt in internal tooling",
        ],
        business: [
          "Directors treat compliance-critical debt as a genuine trade-off conversation, not a delay waved through under commercial pressure",
          "They know what's been accepted and when it's due back, because it's been raised to them plainly",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Avoiding the hard, unfamiliar part of a problem while looking busy elsewhere", reset: "Name the part you understand least, and go there first, not last" },
      { drift: "Investigating everything to the same depth regardless of risk or reversibility", reset: "Ask what's actually at stake, and size the dig to that, not to habit" },
      { drift: "Treating a recurring alert as background noise", reset: "Ask what's happened the last three times this fired" },
      { drift: "Optimising code that isn't actually a bottleneck", reset: "Profile first, and only touch what the data points at" },
      { drift: "Taking on debt quietly in a path that touches customer data or a compliance-critical system, with no record of it", reset: "Name it explicitly: what it costs, when it's paid back, and who's signed off knowing it's there" },
    ],
    ask: "Is this one of the moments that actually needs depth, or am I defaulting to habit? Would shipping something small teach me faster than thinking about it longer?",
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
          "Directors resource this standard rather than treating it as free",
          "When backend, mobile, or test need time or tooling to meet it, that's a legitimate ask, not a discretionary extra squeezed out under delivery pressure",
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
      "Backend, mobile, and test don't move at the same speed or answer to the same clock: backend deploys in minutes, mobile's release train runs over days or weeks with app store review in the middle, and test's review gates the path rather than sitting alongside it. The seams between these are where things actually break.",
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
          "Pair backend and mobile engineers across a dependency, instead of throwing a spec over the wall",
        ],
        leaders: [
          "Coach leaders to raise cross-discipline blockers before they become a release slip, and to pull test in early rather than as a late blocker",
          "Keep backend, mobile, and test plans visible to each other before commitments are made",
        ],
        business: [
          "Investment in integration platforms or tooling that would remove this friction structurally is a Director-level call",
          "This function keeps making the case for it, and manages the seam through visibility and joint planning in the meantime",
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
    ask: "Who else's cadence, release, or review does this touch? Have I told them, before they found out the hard way?",
  },

  {
    n: 5,
    title: "We Say It Straight, and We Bring a Way Forward",
    accent: "#BE185D",
    summary:
      "Clear, honest communication about how the work's actually going, not just when it's finished or on fire. That takes people feeling safe to say true things out loud, including when something they tried didn't work. In a regulated sector, a late or softened signal costs customers real trust, and often real money too.",
    cores: [
      {
        statement: "I keep Product, Design, and the business genuinely in the loop on how the work's actually going",
        capability: "Communicate Clearly",
        bullets: [
          "Keep the people relying on you aware of where things stand, before they have to ask. A short, regular update, even \"no news,\" builds more trust than a good surprise ever does.",
          "Talk to Product, Design, and other stakeholders about trade-offs and decisions while they're still open, not after the call's already made",
          "Say \"this is behind\" or \"this needs a trade-off\" as plainly and as early as you'd say good news, without waiting to be asked",
          "Bring a recommendation alongside any open trade-off, not just the options. Say what you'd do and why, then let people push back on it.",
          "Keep debating an open decision as long as it's genuinely moving. Once it's made, engage with it, and don't keep relitigating it.",
        ],
      },
      {
        statement: "I raise the risk, incident, or security concern the moment I see it, in plain language",
        capability: "Communicate Clearly",
        bullets: [
          "Flag a production risk, security concern, or likely incident immediately, before it's confirmed, not after",
          "Say the plain version first: what's affected, how badly, what you're doing about it",
          "Say \"I don't know yet\" honestly rather than guessing to sound in control",
          "If you're raising the same concern a second time, bring an option or a decision with it, not just the repeat",
        ],
      },
    ],
    lead: {
      statement: "I build the psychological safety to talk straight, in good times and bad",
      capability: "High Trust and Psychological Safety",
      bands: {
        others: [
          "Make it normal to share routine progress and stakeholder talk openly, not just problems",
          "Treat an honest mistake or failed experiment as something to learn from, not punish. That's what keeps people safe to fail and fast to say so.",
          "Thank people for raising things early, even when it turns out to be nothing",
          "Coach people to pair a concern with a proposed path, and to know when a debate's done its job",
        ],
        leaders: [
          "Model calm, direct communication with stakeholders and in incidents alike, under real pressure",
          "Coach leaders to give the plain version upward and outward, not the version that looks best",
          "Hold this team to honest, early reporting at every level, including when it reflects badly on a call this function made",
        ],
        business: [
          "Directors expect and reward the plain version arriving early, even when it reflects badly on a call this function made. They treat a late escalation as the failure, not the bad news itself.",
          "That trust runs both ways: they expect genuine visibility into significant work in flight, not just an alert once it's gone wrong. Everyday visibility is what makes the bad news credible when it lands.",
        ],
      },
    },
    slipsNote: null,
    slips: [
      { drift: "Only talking to stakeholders, whether Product, Design, or leadership, when there's a decision needed or something's gone wrong", reset: "Bring them into the everyday texture of the work, not just the moments that need them" },
      { drift: "Waiting for certainty before raising a security or production concern", reset: "Raise it as a hypothesis, and let others help confirm or rule it out" },
      { drift: "Softening the severity to avoid alarm", reset: "State the actual customer impact first, then the caveats" },
      { drift: "Going quiet mid-incident because there's nothing new to report", reset: "Say \"still working it, no update yet\" rather than nothing" },
      { drift: "Hiding or downplaying a failed experiment or a mistake because it feels like an admission", reset: "Say what didn't work as plainly as what did. A fast \"that didn't work\" is how the team learns quickest." },
      { drift: "Circling the same debate without ever landing a decision", reset: "Name what's actually being decided and by when, then stop relitigating once it's made" },
      { drift: "Raising a concern without ever bringing an option", reset: "Bring one proposal, even an imperfect one, alongside the problem" },
    ],
    ask: "If this turns out to matter, will I be glad I said it now, to the people who needed to hear it? Have I brought a way forward with it, not just the problem?",
  },

  {
    n: 6,
    title: "We Own the System, Not Just the Ticket",
    accent: "#047857",
    summary:
      "Ownership doesn't stop at your part of the code or the boundary of \"done\": it covers the whole path, from getting the project over the line to owning the system it becomes once it's live.",
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
        statement: "I own the impact of my work on customers and the system, end to end",
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
          "Make it unambiguous who's driving each project end-to-end, and who owns each service, so nothing stalls for lack of a single owner",
          "Protect on-call load, so ownership doesn't become burnout",
        ],
        leaders: [
          "Address ownership that's fallen into a gap between teams, or a stalled project, before it becomes an incident",
          "Coach leaders to devolve ownership rather than absorb it upward",
          "Keep ownership boundaries across backend, mobile, and test explicit, and raise it directly if resourcing forces a gap",
        ],
        business: [
          "Directors back this function's staffing and resourcing asks when an ownership gap is raised",
          "They treat customer data protection and trust as non-negotiable in how this team is staffed, whatever the delivery pressure",
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
    ask: "If this project stalled before it landed, or this system went down at 3am, would it be obvious whose job it was to catch it? Would I be one of them?",
  },
];
