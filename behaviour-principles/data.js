/* Behaviour Principles — content data
 * Source: EM Tools/Behaviour Principles (Layered Draft).md
 * Six principles, each with two paired behaviours (Core + Lead),
 * cumulative leadership bands, "when this slips" resets, and a reflective question.
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
  { key: "everyone", label: "Everyone",       blurb: "Core behaviours apply to all of us, at every level." },
  { key: "others",   label: "Leads Others",   blurb: "You're responsible for the growth and performance of individuals." },
  { key: "leaders",  label: "Leads Leaders",  blurb: "You're responsible for people who lead people." },
  { key: "business", label: "Leads Business", blurb: "You set direction for a function or the organisation." },
];

const PRINCIPLES = [
  {
    n: 1,
    title: "We Say It Straight, Say It Early",
    accent: "#6366F1",
    summary:
      "Clear, honest, timely communication, especially when it's uncomfortable. Banking is complex, and a late or hedged message increases risk for our customers, our colleagues, and the business.",
    pairs: [
      {
        core: {
          statement: "I say what needs saying, in plain language, in good time",
          capability: "Communicate Clearly",
          bullets: [
            "Lead with the point, then the detail, and pitch the language to the audience rather than the topic",
            "Ask the clarifying question instead of working from an assumption",
            "Name the uncomfortable thing when it's relevant to the outcome, including upwards",
          ],
        },
        lead: {
          statement: "I make it safe to be straight, and I stay straight when the pressure is on",
          capability: "High Trust and Psychological Safety",
          bands: {
            others: [
              "Invite challenge, and respond well when you get it",
              "Deal with issues while they're small",
              "Thank people for the message you didn't want to hear",
            ],
            leaders: [
              "Equip leaders to hold difficult conversations rather than routing them upwards",
              "Model calm, direct communication when the situation is tense or ambiguous",
              "Notice where information is being filtered on its way up, and address it",
            ],
            business: [
              "Set direction and be open about the trade-offs behind it, not just the outcome",
              "Make truth-telling expected across the organisation, regardless of hierarchy",
              "Address avoidance in senior people directly",
            ],
          },
        },
      },
      {
        core: {
          statement: "I raise risks and concerns as soon as I see them, and I give and take feedback well",
          capability: "Communicate Clearly",
          bullets: [
            "Flag risks and blockers as they surface, without waiting to be asked",
            "Give feedback directly and respectfully, including to peers and upwards",
            "Take feedback without defending, and act on it visibly",
          ],
        },
        lead: {
          statement: "I build feedback into how we work, and I coach people to do it well",
          capability: "Be Curious, Learn and Grow",
          bands: {
            others: [
              "Give timely, specific feedback rather than saving it for a review cycle",
              "Coach people through hard conversations rather than having them on their behalf",
              "Ask for feedback on yourself, regularly and genuinely",
            ],
            leaders: [
              "Coach leaders on giving developmental feedback, not just performance feedback",
              "Hold leaders to account for the feedback their people are receiving",
              "Seek feedback on your own leadership and act on it publicly",
            ],
            business: [
              "Ensure feedback frameworks exist and are actually used, not just published",
              "Share your own development gaps openly",
              "Treat quality of feedback as a measure of leadership health",
            ],
          },
        },
      },
    ],
    slipsNote: null,
    slips: [
      { drift: "Softening a message so much the point gets lost", reset: "Lead with the headline, then the context" },
      { drift: "Sitting on a misalignment hoping it resolves itself", reset: "Name it today, in writing or a five minute call" },
      { drift: "Using process, hierarchy, or jargon as cover", reset: "Say the plain version first, then add the detail" },
      { drift: "Talking around someone rather than to them", reset: "Go direct, and offer the conversation early" },
      { drift: "Saving feedback for a review cycle", reset: "Say it within the week, while it's still useful" },
    ],
    ask: "Have I said what needs to be said, clearly and in time?",
  },

  {
    n: 2,
    title: "We Are Curious, Then Commit",
    accent: "#0EA5E9",
    summary:
      "Understand deeply, then commit decisively. Rushing without understanding leads to poor outcomes. Endless exploration leads to inertia.",
    pairs: [
      {
        core: {
          statement: "I seek to understand before I act",
          capability: "Be Curious, Learn and Grow",
          bullets: [
            "Ask the questions that make the problem clearer, not just the ones that fill your own gaps",
            "Go after feedback and input rather than waiting for it to arrive",
            "Close the gaps in your own knowledge deliberately, and reflect once the work is done",
          ],
        },
        lead: {
          statement: "I protect curiosity without letting it become a stall",
          capability: "Be Curious, Learn and Grow",
          bands: {
            others: [
              "Create stretch and coaching opportunities, not just work people can already do",
              "Help people move from exploring to deciding",
              "Ask curious questions rather than supplying the answer",
            ],
            leaders: [
              "Expect leaders to learn quickly and commit clearly, and coach them when they don't",
              "Create the conditions for reflective practice rather than hoping for it",
              "Challenge leaders who are hiding indecision behind more analysis",
            ],
            business: [
              "Invest in how the organisation learns: pathways, development, the systems that make it stick",
              "Encourage intelligent risk-taking that's grounded in insight",
              "Balance long-term exploration against near-term execution",
            ],
          },
        },
      },
      {
        core: {
          statement: "I decide once I understand enough, and I own the outcome either way",
          capability: "Judgement and Decision-Making",
          bullets: [
            "Make timely decisions with incomplete information, and be clear about what you're still unsure of",
            "Take the reversible option when certainty isn't coming, and review it later",
            "Own the result, including what you'd do differently, without distancing yourself from it",
          ],
        },
        lead: {
          statement: "I raise the quality of decision-making around me, and hold people to account in a way that develops them",
          capability: "Judgement and Decision-Making",
          bands: {
            others: [
              "Coach rather than dictate: help people reach the decision themselves",
              "Give people decisions to make that are genuinely theirs",
              "Hold people to the outcome fairly, separating judgement from luck",
            ],
            leaders: [
              "Coach decision quality rather than reviewing decisions",
              "Build leaders' confidence to decide without seeking cover",
              "Use reflective practice after significant calls, good and bad",
            ],
            business: [
              "Push decisions to the people closest to the problem, and remove the blockages that prevent it",
              "Set the expectation that a decision comes with its trade-offs stated",
              "Make it survivable to have made a reasonable call that didn't work",
            ],
          },
        },
      },
    ],
    slipsNote: null,
    slips: [
      { drift: "Exploring past the point of usefulness", reset: "Set a decision date, and decide on what you know then" },
      { drift: "Acting on an assumption you haven't checked", reset: "Write the assumption down, find the cheapest way to test it" },
      { drift: "Waiting for certainty that isn't coming", reset: "Name the risk, take the reversible option, review it later" },
      { drift: "Distancing yourself from a decision that didn't land", reset: "Say what you'd do differently, out loud, and move on" },
      { drift: "Learning the lesson privately", reset: "Share it while it's still fresh and still costly" },
    ],
    ask: "Do I understand this well enough to commit, and am I owning the outcome?",
  },

  {
    n: 3,
    title: "We Design With Many Minds",
    accent: "#14B8A6",
    summary:
      "Deliberately include different perspectives, across our own team, other functions, and the external parties whose processes shape our work. Better answers, and genuine buy-in, come from combining different experience and interests.",
    pairs: [
      {
        core: {
          statement: "I seek out perspectives that aren't mine, and change my position when they're better",
          capability: "Seek Perspective and Build Alignment",
          bullets: [
            "Invite input from people with different skills and experience, including other functions and partners",
            "Check your own assumptions and biases, and listen for what you'd rather not hear",
            "Change your position when the information warrants it, and say why",
          ],
        },
        lead: {
          statement: "I make sure the range of voices in the room is deliberate, not accidental",
          capability: "High Trust and Psychological Safety",
          bands: {
            others: [
              "Design discussions so contribution and challenge are the default, not an act of courage",
              "Notice who isn't speaking, and create the route in",
              "Address exclusionary behaviour quickly and constructively",
            ],
            leaders: [
              "Hold leaders accountable for inclusive practice, and coach it explicitly",
              "Challenge groupthink in leadership forums, including your own",
              "Ensure leaders seek input before offering an opinion",
            ],
            business: [
              "Embed inclusion into strategy, governance, and how senior decisions get made",
              "Sponsor work that broadens representation and perspective",
              "Treat diversity as a lever for resilience and innovation, not a compliance exercise",
            ],
          },
        },
      },
      {
        core: {
          statement: "I build genuine buy-in beyond my own team, rather than just consulting",
          capability: "Seek Perspective and Build Alignment",
          bullets: [
            "Bring other functions and partners in while the answer is still genuinely open",
            "Give input from outside your team the same weight you'd give any hard constraint",
            "Test for real agreement rather than reading silence as alignment",
          ],
        },
        lead: {
          statement: "I build the relationships and forums that make alignment across boundaries possible",
          capability: "Seek Perspective and Build Alignment",
          bands: {
            others: [
              "Connect your people directly to their counterparts elsewhere",
              "Build teams with complementary strengths rather than familiar ones",
              "Recognise the work of building alignment, not just the work of delivering",
            ],
            leaders: [
              "Model collaboration across functions, particularly where incentives differ",
              "Coach leaders through conflict with peers rather than arbitrating it",
              "Build the forums where alignment happens before escalation is needed",
            ],
            business: [
              "Break down silos structurally, not just by encouraging collaboration",
              "Own the senior relationships that unblock work for teams below you",
              "Make cross-functional accountability explicit rather than assumed",
            ],
          },
        },
      },
    ],
    slipsNote: null,
    slips: [
      { drift: "Asking for input once the decision is effectively made", reset: "Bring people in while the answer is still genuinely open" },
      { drift: "Taking up most of the airtime", reset: "Ask a question, then wait longer than feels comfortable" },
      { drift: "Reading silence as agreement", reset: "Ask directly: \"what would make you uncomfortable about this?\"" },
      { drift: "Treating input from another function or partner as a box to tick", reset: "Give it the same weight you'd give any hard constraint" },
      { drift: "Only asking the people who tend to agree with you", reset: "Go to the person whose answer you can't predict" },
    ],
    ask: "Whose perspective am I missing, and have I actually brought them along, or just informed them?",
  },

  {
    n: 4,
    title: "We Act Like Owners",
    accent: "#F59E0B",
    summary:
      "Responsibility for outcomes, not just tasks. Raising a problem is the start of ownership, not the end of it.",
    pairs: [
      {
        core: {
          statement: "I own the outcome, not just my part of it",
          capability: "Accountability and Ownership",
          bullets: [
            "Follow through reliably, and pick up the loose ends nobody assigned",
            "Understand how your work affects customers and the business, end to end",
            "Step in when something is going wrong, regardless of whose name is on it",
          ],
        },
        lead: {
          statement: "I make ownership clear, and empower people to act within it",
          capability: "Accountability and Ownership",
          bands: {
            others: [
              "Make ownership legible: who owns what, and what good looks like",
              "Empower people to decide within clear guardrails rather than routing decisions through you",
              "Address missing accountability directly and fairly",
            ],
            leaders: [
              "Ensure ownership is unambiguous at the boundaries between teams",
              "Coach leaders to empower rather than absorb",
              "Address a leader who is holding accountability they should be devolving",
            ],
            business: [
              "Set clear accountability across the organisation, and resource it properly",
              "Allocate for long-term value rather than local optimisation",
              "Act decisively when risk or opportunity appears",
            ],
          },
        },
      },
      {
        core: {
          statement: "I bring a proposal, not just a problem",
          capability: "Accountability and Ownership",
          bullets: [
            "Raise anything that needs raising, always: this is about what you bring alongside it",
            "Pair a concern with a proposed action or a clear ask, even an imperfect one",
            "Have the direct conversation before you escalate",
          ],
        },
        lead: {
          statement: "I coach toward proposals, and I stay calm when things are hard",
          capability: "Accountability and Ownership",
          bands: {
            others: [
              "Coach toward a proposal when frustration arrives without one",
              "Manage your own energy and regulation, and be honest about it",
              "Protect the team from noise that isn't theirs to carry",
            ],
            leaders: [
              "Equip leaders to hold pressure without passing it downwards",
              "Call out blame dynamics between teams",
              "Coach leaders who bring you problems without a view",
            ],
            business: [
              "Balance customer outcomes against commercial reality, and be explicit about the trade-off",
              "Create a culture where concerns arrive with options rather than as complaints",
              "Model composure when the pressure is visible to everyone",
            ],
          },
        },
      },
    ],
    slipsNote:
      "To be clear, because this is the principle most easily misread: raising a problem you can't solve is always welcome, and always will be. This is about what comes next.",
    slips: [
      { drift: "Treating something as outside your remit", reset: "Ask what the smallest useful thing you could do is" },
      { drift: "Escalating before you've engaged", reset: "Have the direct conversation first, escalate if it doesn't land" },
      { drift: "Optimising your part at the expense of the whole", reset: "Check who inherits the consequence of this decision" },
      { drift: "Raising the same frustration repeatedly without a proposal", reset: "Bring one option next time, even an imperfect one" },
      { drift: "Absorbing pressure and passing it downwards", reset: "Name what's actually urgent, and protect the rest" },
    ],
    ask: "If this were my business, what would I do, and what am I proposing to do about it?",
  },

  {
    n: 5,
    title: "We Go Deep, Create, Then Simplify",
    accent: "#EC4899",
    summary:
      "Get to root causes and generate real options before accepting constraints, then land on the simplest workable answer. Our constraints are real: regulation, partners, inherited process. They should shape the thinking, not shortcut it.",
    pairs: [
      {
        core: {
          statement: "I get to the cause and generate real options before I settle",
          capability: "Depth and Simplicity",
          bullets: [
            "Find the cause before proposing the fix, and look for the pattern behind recurring issues",
            "Generate more than one option, with honest trade-offs, before settling",
            "Take the constrained answer only once the alternatives have genuinely been considered",
          ],
        },
        lead: {
          statement: "I create the room to explore before constraints get accepted",
          capability: "Depth and Simplicity",
          bands: {
            others: [
              "Encourage root-cause thinking rather than rewarding pace alone",
              "Create space to explore, and protect it when delivery pressure arrives",
              "Help the team prioritise the improvements with the most impact",
            ],
            leaders: [
              "Challenge \"we can't\" when it arrives before the work has been done",
              "Coach critical thinking and root-cause analysis in leaders",
              "Hold the balance between depth and momentum, and be explicit about which you're choosing",
            ],
            business: [
              "Take on the systemic complexity that slows LHV down",
              "Balance regulatory, risk, and innovation priorities openly",
              "Make genuine exploration an expectation of leadership, not a nice-to-have",
            ],
          },
        },
      },
      {
        core: {
          statement: "I make it simpler for the people who come after me",
          capability: "Depth and Simplicity",
          bullets: [
            "Translate complexity into something others can act on",
            "Understand context and dependencies before you change something, so you don't create problems downstream",
            "Check what the next person has to understand to use your work, and reduce it",
          ],
        },
        lead: {
          statement: "I simplify what we've made complicated",
          capability: "Depth and Simplicity",
          bands: {
            others: [
              "Shield the team from complexity that isn't theirs to solve",
              "Make priorities unambiguous, especially when they shift",
              "Recognise work that made something simpler, not just work that added something",
            ],
            leaders: [
              "Cascade messages that are clear enough to act on without translation",
              "Coach leaders to communicate complexity simply rather than impressively",
              "Guide process improvement rather than adding process",
            ],
            business: [
              "Simplify strategy, structures, and how decisions get made",
              "Remove process that no longer earns its cost",
              "Balance the big picture with the detail that actually matters",
            ],
          },
        },
      },
    ],
    slipsNote: null,
    slips: [
      { drift: "Treating a recurring issue as a fresh one each time", reset: "Look for the pattern across the last three occurrences" },
      { drift: "Making something more elaborate than the problem requires", reset: "Ask what you'd cut if you had half the time" },
      { drift: "Solving your part and handing the complexity on", reset: "Check what the next person has to understand to use this" },
      { drift: "Reaching for \"we can't\" before you've looked", reset: "Give it one honest pass at alternatives, then say no with reasons" },
      { drift: "Adding process to solve a problem process caused", reset: "Ask what you could remove instead" },
    ],
    ask: "What's really causing this, what else could we do about it, and what's the simplest version of that once we've properly looked?",
  },

  {
    n: 6,
    title: "We Leave It Better Than We Found It",
    accent: "#10B981",
    summary:
      "Responsibility for improving LHV over time, through our work, our relationships, and our decisions. Sustainable success depends on stewardship.",
    pairs: [
      {
        core: {
          statement: "I leave my work, and the people around it, in better shape",
          capability: "Stewardship and Continuous Improvement",
          bullets: [
            "Act on the improvement opportunities you spot, rather than logging them and moving on",
            "Share what you learn, and explain your reasoning rather than just your answer",
            "Improve others' work through how you review and challenge it",
          ],
        },
        lead: {
          statement: "I build the learning loops rather than relying on them happening",
          capability: "Stewardship and Continuous Improvement",
          bands: {
            others: [
              "Create space to reflect on what worked and what didn't",
              "Turn setbacks into learning without turning them into blame",
              "Recognise the behaviour that improves the system, not only the behaviour that delivers",
            ],
            leaders: [
              "Coach reflective practice, and hold leaders to using it after failure as well as success",
              "Make learning transferable between teams rather than trapped inside them",
              "Grow the leaders who will replace you",
            ],
            business: [
              "Embed continuous improvement into strategy and culture",
              "Measure success beyond the current quarter",
              "Develop leaders who leave something behind",
            ],
          },
        },
      },
      {
        core: {
          statement: "I invest in the answer that lasts",
          capability: "Stewardship and Continuous Improvement",
          bullets: [
            "Choose long-term quality over the quick win, and where you can't, be explicit about the cost and when it gets paid back",
            "Deal with the known issue rather than walking past it",
            "Leave standards and practices behind that hold once you've moved on",
          ],
        },
        lead: {
          statement: "I protect and grow what LHV will need next",
          capability: "Stewardship and Continuous Improvement",
          bands: {
            others: [
              "Invest in your people's growth beyond what the current role requires",
              "Make the case for the improvement work, and defend the time for it",
              "Take pride in the team's lasting impact, and say so",
            ],
            leaders: [
              "Hold leaders to the long-term consequence of short-term choices",
              "Build capability ahead of the need rather than in response to it",
              "Make succession and depth a standing conversation",
            ],
            business: [
              "Protect and grow LHV's long-term capability and reputation",
              "Resource sustainable improvement rather than repeated quick fixes",
              "Take pride publicly in the impact, and connect people to it",
            ],
          },
        },
      },
    ],
    slipsNote: null,
    slips: [
      { drift: "Taking the quick win that costs more later", reset: "Write down the cost, and when you'll pay it back" },
      { drift: "Walking past a known issue because it isn't yours", reset: "Log it properly, or fix it if it's a ten minute job" },
      { drift: "Leaving the problem for whoever's next", reset: "Leave a note, a task, or a conversation behind you" },
      { drift: "Learning something useful and keeping it to yourself", reset: "Share it with the team, in the review, or in a short write-up" },
      { drift: "Cutting the improvement work first when time gets tight", reset: "Protect one piece of it, and say why it's protected" },
    ],
    ask: "Will this leave LHV stronger than before?",
  },
];
