window.quizzes = {};

// Helper functions for classification
function getSortedScores(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1]);
}

function isHighest(scores, code) {
  const max = Math.max(...Object.values(scores));
  return scores[code] === max;
}

function isHighestOrSecond(scores, code) {
  const sorted = getSortedScores(scores);
  if (sorted.length < 2) return true;
  return sorted[0][0] === code || sorted[1][0] === code;
}

function topTwoScores(scores) {
  return getSortedScores(scores).slice(0, 2);
}

function topTwoIncludes(scores, code) {
  const topTwo = topTwoScores(scores).map(([key]) => key);
  return topTwo.includes(code);
}

window.quizzes["central-bank-bird"] = {
  id: "central-bank-bird",
  title: "Which Central Bank Bird Are You?",
  subtitle: "A serious, sarcastic quiz about monetary-policy preferences, institutional self-image, and whether your emergency acronym deserves to exist.",
  description: "Find out if you are a Hawk, Dove, Pigeon, Eagle, Parrot, or Crow.",
  icon: "🦅",
  outcomes: {
    H: { name: "Hawk", shortName: "Hawk", icon: "🦅", tag: "The Credibility Guardian", description: "You are the guardian of price stability. Expectations must remain anchored, preferably with industrial equipment.", policy: "Pre-emptive tightening, strong anti-inflation communication, and institutional discipline. You would rather be accused of being harsh than unserious.", strength: "Credibility. Markets understand that when you say price stability, you are not doing interpretive theatre.", weakness: "You may discover the real economy only after stepping on it. Elegantly, of course. In a footnote." },
    D: { name: "Dove", shortName: "Dove", icon: "🕊️", tag: "The Employment Defender", description: "You care about unemployment, output losses, and avoiding recessions that exist mainly to prove toughness.", policy: "Patience, support for labor markets, gradual disinflation, and skepticism toward crushing demand just to impress bond markets.", strength: "Macroeconomic empathy. You remember that households are not a residual in the model.", weakness: "You may wait too long and then have to explain why inflation has developed a lease and put its name on the mailbox." },
    P: { name: "Pigeon", shortName: "Pigeon", icon: "🐦", tag: "The Prudent Central Banker", description: "You are cautious, incremental, and emotionally committed to the phrase ‘incoming data.’", policy: "Gradualism, data dependence, careful communication, and a deep suspicion of dramatic people with policy proposals.", strength: "Restraint under uncertainty. You know that data are revised and overconfidence is how central banks end up in case studies.", weakness: "By the time you are fully convinced, the economy may already be on fire, underwater, or both." },
    E: { name: "Eagle", shortName: "Eagle", icon: "🦉", tag: "The Visionary Central Banker", description: "You see structural shifts, regime changes, and the humiliating possibility that the inherited framework is not enough.", policy: "Framework reviews, long-horizon analysis, attention to technology, demographics, geopolitics, and regime change.", strength: "Perspective. You notice when the map no longer resembles the territory.", weakness: "You may interpret a bad quarterly forecast as the collapse of the old macroeconomic order." },
    R: { name: "Parrot", shortName: "Parrot", icon: "🦜", tag: "The Holistic Central Banker", description: "You believe monetary policy is connected to inequality, climate, housing, finance, fiscal policy, and legitimacy.", policy: "Cross-domain analysis, broader institutional awareness, stakeholder sensitivity, and a mandate that keeps developing side quests.", strength: "Systems thinking. You understand that monetary policy does not happen in a vacuum, because apparently society exists.", weakness: "Your central bank is now responsible for everything except perhaps airport security, and even that is under review." },
    C: { name: "Crow", shortName: "Crow", icon: "🐦‍⬛", tag: "The Crisis Innovator", description: "When the standard toolkit fails, you build another one, name it, defend it legally, and call it temporary with a straight face.", policy: "Unconventional tools, emergency liquidity, balance-sheet creativity, swap lines, forward guidance, and acronyms with emotional baggage.", strength: "Adaptability. You can move fast when the institutional furniture is already on fire.", weakness: "No one is completely sure whether you saved the system or taught it to expect rescue." }
  },
  questions: [
    {
      text: "Inflation is above target and rising. What do you do first?",
      answers: [
        { letter: "A", text: "Raise rates decisively. Credibility is not a decorative accessory.", points: { H: 3, P: 1 } },
        { letter: "B", text: "Wait for more evidence on persistence, wage dynamics, and expectations.", points: { P: 3 } },
        { letter: "C", text: "Avoid overtightening until you know whether the shock is supply-driven.", points: { D: 3, P: 1 } },
        { letter: "D", text: "Ask whether the inflation process has structurally changed.", points: { E: 3 } },
        { letter: "E", text: "Ask which households and sectors are absorbing the shock.", points: { R: 3 } },
        { letter: "F", text: "Create a temporary liquidity tool while adjusting rates separately.", points: { C: 3, P: 1 } }
      ]
    },
    {
      text: "Unemployment rises sharply, but inflation is still uncomfortable. Your instinct?",
      answers: [
        { letter: "A", text: "Stay tight. Price stability comes first. The economy may file a complaint later.", points: { H: 3 } },
        { letter: "B", text: "Slow the tightening path but avoid a dramatic pivot.", points: { P: 3, D: 1 } },
        { letter: "C", text: "Cut or pause. A recession is not a credibility strategy.", points: { D: 3 } },
        { letter: "D", text: "Reassess whether the Phillips curve still describes the economy.", points: { E: 3 } },
        { letter: "E", text: "Examine the distributional impact of unemployment across groups.", points: { R: 3, D: 1 } },
        { letter: "F", text: "Use targeted credit or liquidity measures instead of relying only on rates.", points: { C: 3, R: 1 } }
      ]
    },
    {
      text: "Your relationship with the Taylor Rule is closest to:",
      answers: [
        { letter: "A", text: "A useful discipline. Possibly scripture.", points: { H: 2, P: 1 } },
        { letter: "B", text: "A benchmark, not a personality.", points: { P: 3 } },
        { letter: "C", text: "Too contractionary when slack is large.", points: { D: 2 } },
        { letter: "D", text: "Historically useful, but insufficient under structural change.", points: { E: 3 } },
        { letter: "E", text: "Too narrow unless embedded in social and financial context.", points: { R: 3 } },
        { letter: "F", text: "Adorable. Does it include emergency swap lines?", points: { C: 3 } }
      ]
    },
    {
      text: "Markets panic after your policy announcement. You think:",
      answers: [
        { letter: "A", text: "Good. They should understand we are serious.", points: { H: 3 } },
        { letter: "B", text: "The communication was probably too abrupt. Adjust the message.", points: { P: 3 } },
        { letter: "C", text: "We may be imposing excessive real-economy costs.", points: { D: 3 } },
        { letter: "D", text: "Market reaction reveals a deeper shift in expectations.", points: { E: 2, P: 1 } },
        { letter: "E", text: "Market stress will affect households, firms, and financial inequality differently.", points: { R: 3 } },
        { letter: "F", text: "Time for a facility with a name no normal person can pronounce.", points: { C: 3 } }
      ]
    },
    {
      text: "The government is pressuring the central bank. Your reaction?",
      answers: [
        { letter: "A", text: "Defend independence aggressively. The mandate is price stability.", points: { H: 2, P: 1 } },
        { letter: "B", text: "Preserve independence through cautious, rule-like behavior.", points: { P: 3 } },
        { letter: "C", text: "Remind everyone that recessions have political consequences too.", points: { D: 2, R: 1 } },
        { letter: "D", text: "Explain that independence must evolve with new macroeconomic realities.", points: { E: 3 } },
        { letter: "E", text: "Argue that central-bank legitimacy requires broader accountability.", points: { R: 3 } },
        { letter: "F", text: "Keep independence, but use every legal tool available in a crisis.", points: { C: 3, P: 1 } }
      ]
    },
    {
      text: "A financial crisis starts over the weekend. What are you doing?",
      answers: [
        { letter: "A", text: "Prevent moral hazard. Support must be limited and disciplined.", points: { H: 2, P: 1 } },
        { letter: "B", text: "Provide liquidity, but only after verifying the plumbing.", points: { P: 3, C: 1 } },
        { letter: "C", text: "Ease policy to prevent a collapse in employment and demand.", points: { D: 3 } },
        { letter: "D", text: "Identify whether this crisis signals a new financial regime.", points: { E: 3 } },
        { letter: "E", text: "Coordinate with supervisors, fiscal authorities, and social-policy institutions.", points: { R: 3, C: 1 } },
        { letter: "F", text: "Announce emergency facilities before breakfast. Legal can catch up emotionally.", points: { C: 4 } }
      ]
    },
    {
      text: "What sentence would you most likely say in a speech?",
      answers: [
        { letter: "A", text: "Inflation expectations must remain firmly anchored.", points: { H: 3 } },
        { letter: "B", text: "Future decisions will depend on incoming data.", points: { P: 3 } },
        { letter: "C", text: "We must avoid unnecessary damage to employment.", points: { D: 3 } },
        { letter: "D", text: "The global economy may be entering a new regime.", points: { E: 3 } },
        { letter: "E", text: "Monetary policy operates within a broader social context.", points: { R: 3 } },
        { letter: "F", text: "The toolkit must adapt to extraordinary circumstances.", points: { C: 3 } }
      ]
    },
    {
      text: "The model forecast fails badly. What is your conclusion?",
      answers: [
        { letter: "A", text: "The model failed, but inflation discipline remains necessary.", points: { H: 2, P: 1 } },
        { letter: "B", text: "Revise the model carefully and avoid sudden moves.", points: { P: 3 } },
        { letter: "C", text: "The model underestimated labor-market fragility.", points: { D: 3 } },
        { letter: "D", text: "The model belongs to the previous regime.", points: { E: 4 } },
        { letter: "E", text: "The model excluded too many relevant social and financial channels.", points: { R: 3, E: 1 } },
        { letter: "F", text: "The model did not include the new thing I invented, which is rude.", points: { C: 3 } }
      ]
    },
    {
      text: "What is the greatest central-bank sin?",
      answers: [
        { letter: "A", text: "Letting inflation expectations become unanchored.", points: { H: 4 } },
        { letter: "B", text: "Overreacting to noisy data.", points: { P: 4 } },
        { letter: "C", text: "Creating unemployment unnecessarily.", points: { D: 4 } },
        { letter: "D", text: "Missing a structural transformation.", points: { E: 4 } },
        { letter: "E", text: "Pretending monetary policy is distributionally neutral.", points: { R: 4 } },
        { letter: "F", text: "Being trapped by an obsolete toolkit during a crisis.", points: { C: 4 } }
      ]
    },
    {
      text: "Extraordinary times require:",
      answers: [
        { letter: "A", text: "Even stronger commitment to discipline.", points: { H: 3 } },
        { letter: "B", text: "Maximum caution and clear communication.", points: { P: 3 } },
        { letter: "C", text: "Protection of employment and demand.", points: { D: 3 } },
        { letter: "D", text: "A new framework for a changed world.", points: { E: 3 } },
        { letter: "E", text: "Coordination across policy domains.", points: { R: 3 } },
        { letter: "F", text: "Extraordinary measures, obviously. Try to keep up.", points: { C: 3 } }
      ]
    }
  ],
  tieBreaker: {
    text: "Your Hawk and Dove scores are close. Choose the statement that feels more painful to disagree with.",
    answers: [
      { letter: "A", text: "A central bank that loses inflation credibility loses everything.", tieValue: "H" },
      { letter: "B", text: "A central bank that causes avoidable unemployment has failed too.", tieValue: "D" }
    ]
  },
  classify: function(scores, appearances, tieChoice) {
    const order = getSortedScores(scores).map(s => s[0]);
    const highest = scores[order[0]];
    const second = scores[order[1]];

    if (isHighest(scores, "C") && appearances.C >= 4) {
      return { code: "C", rule: "Crow rule: highest score plus repeated crisis-tool choices." };
    }
    if (isHighestOrSecond(scores, "R") && appearances.R >= 4 && scores.R > scores.H && scores.R > scores.D) {
      return { code: "R", rule: "Parrot rule: broad-policy choices repeatedly outweighed pure Hawk/Dove instincts." };
    }
    if (isHighestOrSecond(scores, "E") && appearances.E >= 4 && scores.E > scores.P) {
      return { code: "E", rule: "Eagle rule: structural-change choices repeatedly exceeded prudence." };
    }
    if (isHighest(scores, "P") || (highest - second <= 2 && [order[0], order[1]].includes("P"))) {
      return { code: "P", rule: "Pigeon rule: prudence either led outright or stabilized a close result." };
    }
    if (scores.H - scores.D >= 3) {
      return { code: "H", rule: "Hawk/Dove separation: inflation credibility clearly outweighed employment stabilization." };
    }
    if (scores.D - scores.H >= 3) {
      return { code: "D", rule: "Hawk/Dove separation: employment stabilization clearly outweighed inflation toughness." };
    }
    
    if (!tieChoice) {
      return { needsTie: true, rule: "Tie-breaker needed: Hawk and Dove are too close." };
    }

    return {
      code: tieChoice,
      rule: tieChoice === "H"
        ? "Tie-breaker: you chose credibility over avoidable unemployment. Firm, tidy, alarming."
        : "Tie-breaker: you chose avoidable unemployment as the greater failure. Soft-hearted, or simply literate in welfare loss."
    };
  }
};

window.quizzes["central-bank-instrument"] = {
  id: "central-bank-instrument",
  title: "Which Central Bank Instrument Are You?",
  subtitle: "Are you the blunt elegance of the policy rate, the balance-sheet extroversion of QE, or a legally temporary facility that somehow became permanent?",
  description: "Find out which monetary-policy instrument matches your institutional personality. Some answers are more macroprudential than they first appear.",
  icon: "📈",
  outcomes: {
    R: { name: "Policy Rate", shortName: "Policy Rate", icon: "📈", tag: "The Classic Instrument", description: "You are the classic instrument. Direct, visible, and impossible to ignore. Your strength is clarity. Your weakness is that you hit the entire economy because one sector misbehaved." },
    V: { name: "Reserve Requirements", shortName: "Reserve Requirements", icon: "🏦", tag: "The Monetary Plumbing", description: "You are monetary plumbing with authoritarian tendencies. Your strength is control over bank liquidity. Your weakness is that nobody at dinner knows what you are talking about." },
    Q: { name: "Quantitative Easing", shortName: "QE", icon: "🖨️", tag: "The Balance-Sheet Extrovert", description: "You are the balance-sheet extrovert. Your strength is power at the lower bound. Your weakness is that everyone will argue forever about whether you mostly helped the economy or asset prices." },
    G: { name: "Forward Guidance", shortName: "Guidance", icon: "🔮", tag: "The Expectations Manager", description: "You are expectations management in a suit. Your strength is influence without immediate action. Your weakness is that credibility is a rental contract, not a birthright." },
    S: { name: "Standing Facility", shortName: "Facility", icon: "🚪", tag: "The Backstop", description: "You are the backstop. Calm, useful, and underappreciated until the pipes start exploding. Your weakness is that people only love you during liquidity stress." },
    X: { name: "FX Intervention", shortName: "FX Intervention", icon: "💱", tag: "The Currency Bouncer", description: "You are the currency bouncer. Your strength is defending external stability. Your weakness is that markets may decide to test how committed you really are." },
    M: { name: "Macroprudential Buffer", shortName: "Macroprudential", icon: "🛡️", tag: "The Adult in the Credit Cycle", description: "You are the adult in the credit cycle. Your strength is targeted restraint. Your weakness is that everyone hates you right before you turn out to have been necessary." }
  },
  questions: [
    {
      text: "Inflation is above target. What is your instinct?",
      answers: [
        { letter: "A", text: "Move the main rate. Obvious tool, obvious problem, let’s not make this a TED Talk.", points: { R: 3 } },
        { letter: "B", text: "Tighten liquidity conditions through required reserves. Quietly, because plumbing is where power lives.", points: { V: 3 } },
        { letter: "C", text: "Shrink the balance sheet or stop asset purchases. The portfolio channel has entered the chat.", points: { Q: 3 } },
        { letter: "D", text: "Signal future tightening so expectations behave before rates do.", points: { G: 3 } },
        { letter: "E", text: "Make sure banks can access liquidity if stress appears.", points: { S: 2, M: 1 } },
        { letter: "F", text: "Support the currency if depreciation is feeding inflation.", points: { X: 3 } },
        { letter: "G", text: "Tighten macroprudential settings if credit is overheating.", points: { M: 3 } }
      ]
    },
    {
      text: "Markets are confused after your meeting. You:",
      answers: [
        { letter: "A", text: "Raise or cut the policy rate. Nothing says clarity like an actual number.", points: { R: 3 } },
        { letter: "B", text: "Adjust liquidity requirements. The market will understand eventually. Maybe.", points: { V: 2, S: 1 } },
        { letter: "C", text: "Announce asset purchases or sales. Subtle? No. Effective? Possibly.", points: { Q: 3 } },
        { letter: "D", text: "Give a carefully worded path for future policy.", points: { G: 3 } },
        { letter: "E", text: "Open or clarify a facility so no one panics unnecessarily.", points: { S: 3 } },
        { letter: "F", text: "Intervene in FX markets to stop the currency from doing performance art.", points: { X: 3 } },
        { letter: "G", text: "Explain that financial stability requires borrower- and lender-side constraints. Everyone pretends to understand.", points: { M: 3 } }
      ]
    },
    {
      text: "Your favorite transmission channel is:",
      answers: [
        { letter: "A", text: "Interest rates affecting consumption and investment. Clean, classic, occasionally real.", points: { R: 3 } },
        { letter: "B", text: "Bank balance sheets and loan creation.", points: { V: 3, M: 1 } },
        { letter: "C", text: "Asset prices, yields, duration, and portfolio rebalancing.", points: { Q: 3 } },
        { letter: "D", text: "Expectations. The cheapest instrument, until nobody believes you.", points: { G: 3 } },
        { letter: "E", text: "Liquidity insurance and stigma reduction.", points: { S: 3 } },
        { letter: "F", text: "Exchange rates and imported inflation.", points: { X: 3 } },
        { letter: "G", text: "Leverage, credit cycles, and systemic risk.", points: { M: 3 } }
      ]
    },
    {
      text: "The financial system is overheating. You reach for:",
      answers: [
        { letter: "A", text: "Higher rates. Broad, blunt, and very central-bank-coded.", points: { R: 2, M: 1 } },
        { letter: "B", text: "Higher reserve requirements. Make banks less excitable.", points: { V: 3 } },
        { letter: "C", text: "Slower asset purchases or balance-sheet reduction.", points: { Q: 2, R: 1 } },
        { letter: "D", text: "Warnings about the future path of policy.", points: { G: 2 } },
        { letter: "E", text: "A standing facility to keep liquidity orderly if tightening bites.", points: { S: 3 } },
        { letter: "F", text: "FX measures if capital flows are destabilizing the currency.", points: { X: 3 } },
        { letter: "G", text: "Countercyclical capital buffers, LTV caps, DTI caps. The fun acronyms.", points: { M: 4 } }
      ]
    },
    {
      text: "The economy is weak, but banks are nervous. You prefer:",
      answers: [
        { letter: "A", text: "Cut the policy rate. Simple. Elegant. Immediately overinterpreted.", points: { R: 3 } },
        { letter: "B", text: "Reduce reserve requirements to support lending.", points: { V: 3 } },
        { letter: "C", text: "Buy assets to compress yields.", points: { Q: 3 } },
        { letter: "D", text: "Commit to keeping policy accommodative.", points: { G: 3 } },
        { letter: "E", text: "Provide liquidity through a facility. Calmly, preferably before everyone starts screaming.", points: { S: 4 } },
        { letter: "F", text: "Stabilize the currency if depreciation threatens confidence.", points: { X: 2, S: 1 } },
        { letter: "G", text: "Ease buffers temporarily so credit can keep flowing.", points: { M: 3 } }
      ]
    },
    {
      text: "Your greatest weakness is probably:",
      answers: [
        { letter: "A", text: "You are too blunt.", points: { R: 2 } },
        { letter: "B", text: "Nobody outside bank regulation knows what you do.", points: { V: 2 } },
        { letter: "C", text: "People accuse you of distorting markets.", points: { Q: 2 } },
        { letter: "D", text: "Your entire personality depends on credibility.", points: { G: 2 } },
        { letter: "E", text: "People only remember you during crises. Rude, but fair.", points: { S: 2 } },
        { letter: "F", text: "You are vulnerable to accusations of manipulating the currency.", points: { X: 2 } },
        { letter: "G", text: "Everyone supports you until house prices stop rising.", points: { M: 2 } }
      ]
    }
  ],
  classify: function(scores, appearances) {
    if (scores.M >= 10 && appearances.M >= 3) return { code: "M", rule: "Macroprudential dominance detected." };
    if (scores.S >= 9 && appearances.S >= 3) return { code: "S", rule: "Standing Facility dominance detected." };
    if (scores.X >= 9 && scores.X > scores.R && scores.X > scores.Q) return { code: "X", rule: "FX Intervention selected over other tools." };
    if (scores.Q >= 9 && scores.Q > scores.G) return { code: "Q", rule: "Quantitative Easing strongly preferred." };
    if (scores.G >= 9 && appearances.G >= 3) return { code: "G", rule: "Forward Guidance used repeatedly." };
    if (scores.V >= 8 && scores.V > scores.R) return { code: "V", rule: "Reserve Requirements favored over pure rates." };
    return { code: "R", rule: "Fallback: Policy Rate. Classic central banking." };
  }
};

window.quizzes["crisis-mood"] = {
  id: "crisis-mood",
  title: "Which Central Bank Crisis Mood Are You?",
  subtitle: "When the system starts wobbling, do you provide liquidity, invent a facility, defend moral hazard, whisper to markets, or hold a press conference about confidence?",
  description: "A crisis-personality quiz for people who know the phrase “temporary emergency facility” is doing a lot of work.",
  icon: "🚨",
  outcomes: {
    L: { name: "Calm Liquidity Provider", shortName: "Liquidity Provider", icon: "💧", tag: "The Fire Extinguisher", description: "You are the central-bank equivalent of a fire extinguisher with a law degree. Useful, restrained, and deeply committed to collateral." },
    A: { name: "Panic-Acronym Inventor", shortName: "Acronym Inventor", icon: "🔠", tag: "The Extraordinarily Measured", description: "You were born for extraordinary measures. You do not panic; you operationalize panic into a facility." },
    P: { name: "Moral-Hazard Purist", shortName: "Moral-Hazard Purist", icon: "⚖️", tag: "The Disciplinarian", description: "You believe crises are not an excuse to rescue everyone from consequences. You may be right, but you are not getting invited to the emergency group chat." },
    W: { name: "Market-Whisperer", shortName: "Market-Whisperer", icon: "🗣️", tag: "The Listener", description: "You listen to spreads, volatility, funding pressure, and dealer balance sheets like they are trying to tell you a secret. Annoyingly, they often are." },
    C: { name: "Emergency Press-Conference Philosopher", shortName: "Philosopher", icon: "🎙️", tag: "The Confidence Builder", description: "You turn crisis communication into institutional therapy. Your strength is legitimacy. Your weakness is using the word “confidence” seventeen times before lunch." }
  },
  questions: [
    {
      text: "A bank fails over the weekend. You:",
      answers: [
        { letter: "A", text: "Provide liquidity against good collateral. Calmly. Like someone who has read Bagehot and owns a kettle.", points: { L: 3 } },
        { letter: "B", text: "Invent a new facility before sunrise. The acronym is ugly, but so is systemic collapse.", points: { A: 3 } },
        { letter: "C", text: "Refuse broad support unless losses are imposed. Moral hazard did not take the weekend off.", points: { P: 3 } },
        { letter: "D", text: "Call market participants and figure out where the panic actually is.", points: { W: 3 } },
        { letter: "E", text: "Prepare a speech about confidence, institutions, and the meaning of stability.", points: { C: 3 } }
      ]
    },
    {
      text: "Your biggest fear in a crisis is:",
      answers: [
        { letter: "A", text: "Solvent institutions losing liquidity.", points: { L: 3 } },
        { letter: "B", text: "Being too slow to design the emergency tool.", points: { A: 3 } },
        { letter: "C", text: "Rewarding reckless behavior.", points: { P: 3 } },
        { letter: "D", text: "A self-fulfilling market panic.", points: { W: 3 } },
        { letter: "E", text: "Losing public trust.", points: { C: 3 } }
      ]
    },
    {
      text: "The public asks if deposits are safe. You say:",
      answers: [
        { letter: "A", text: "“The system has ample liquidity.”", points: { L: 3 } },
        { letter: "B", text: "“We have created a temporary mechanism to ensure orderly functioning.” Temporary, naturally.", points: { A: 3 } },
        { letter: "C", text: "“Protection must not eliminate accountability.” Comforting, in the least comforting way.", points: { P: 3 } },
        { letter: "D", text: "“Market functioning is being closely monitored.”", points: { W: 3 } },
        { letter: "E", text: "“Confidence rests on credible institutions and transparent action.”", points: { C: 3 } }
      ]
    },
    {
      text: "Your crisis spreadsheet is mostly:",
      answers: [
        { letter: "A", text: "Collateral, haircuts, maturities, eligible counterparties.", points: { L: 3 } },
        { letter: "B", text: "Facility names, legal authorities, and whether the acronym is pronounceable.", points: { A: 3 } },
        { letter: "C", text: "Loss allocation, bail-in hierarchy, and accountability.", points: { P: 3 } },
        { letter: "D", text: "Spreads, volatility, funding stress, dealer balance sheets.", points: { W: 3 } },
        { letter: "E", text: "Talking points, public confidence, institutional legitimacy.", points: { C: 3 } }
      ]
    },
    {
      text: "A minister asks for “whatever it takes.” You respond:",
      answers: [
        { letter: "A", text: "“Liquidity support, yes. Blank cheque, no.”", points: { L: 2, P: 1 } },
        { letter: "B", text: "“Define ‘whatever’ and give me three lawyers.”", points: { A: 3 } },
        { letter: "C", text: "“Absolutely not if it socializes losses.”", points: { P: 3 } },
        { letter: "D", text: "“First we need to know what markets think ‘whatever’ means.”", points: { W: 3 } },
        { letter: "E", text: "“The phrase itself has communicative power.”", points: { C: 3 } }
      ]
    },
    {
      text: "After the crisis, you want to be remembered as:",
      answers: [
        { letter: "A", text: "The one who kept the system liquid.", points: { L: 3 } },
        { letter: "B", text: "The one who built the tool that stopped the panic.", points: { A: 3 } },
        { letter: "C", text: "The one who prevented rescue culture.", points: { P: 3 } },
        { letter: "D", text: "The one who restored market confidence.", points: { W: 3 } },
        { letter: "E", text: "The one who explained why the institution still mattered.", points: { C: 3 } }
      ]
    }
  ],
  classify: function(scores, appearances) {
    if (scores.A >= 10 && appearances.A >= 3) return { code: "A", rule: "Consistent preference for novel facilities." };
    if (scores.P >= 10 && scores.P >= scores.L + 2) return { code: "P", rule: "Strong moral-hazard purity over simple liquidity." };
    if (scores.L >= 10 && scores.L > scores.A) return { code: "L", rule: "Calm liquidity provisioning preferred." };
    if (scores.W >= 9 && scores.W > scores.C) return { code: "W", rule: "Market awareness prioritized." };
    if (scores.C >= 9 || topTwoIncludes(scores, "C")) return { code: "C", rule: "Communication and philosophy highly rated." };
    return { code: "L", rule: "Fallback: Calm Liquidity Provider." };
  }
};

window.quizzes["macro-shock"] = {
  id: "macro-shock",
  title: "Which Macro Shock Are You?",
  subtitle: "Are you a textbook demand shock, a financial-system trauma, or the kind of geopolitical mess that makes central bankers learn about shipping routes?",
  description: "Find out what kind of macroeconomic disturbance best matches your personality. Unfortunately, several options are stagflationary.",
  icon: "⚡",
  outcomes: {
    O: { name: "Oil Shock", shortName: "Oil Shock", icon: "🛢️", tag: "The Stagflationary Nightmare", description: "You are the macroeconomic equivalent of pouring crude oil into the inflation forecast. Your strength is importance. Your weakness is making central banks choose between bad options and worse press conferences." },
    T: { name: "Productivity Shock", shortName: "Productivity Shock", icon: "⚙️", tag: "The Unmeasurable Force", description: "You change the economy’s capacity, which means everyone has to pretend they know potential output. Your weakness is being impossible to measure cleanly in real time." },
    D: { name: "Demand Shock", shortName: "Demand Shock", icon: "🛒", tag: "The Textbook Classic", description: "You are the textbook shock. Too much spending, too little spending, multiplier discourse, output gaps, the whole syllabus. Almost comforting, in a nerdy way." },
    F: { name: "Financial Shock", shortName: "Financial Shock", icon: "💥", tag: "The Balance-Sheet Trauma", description: "You are balance-sheet trauma. You do not merely reduce demand; you break the machinery through which demand is financed." },
    P: { name: "Pandemic Shock", shortName: "Pandemic Shock", icon: "🦠", tag: "The Model Breaker", description: "You are the macro shock that made every model look like it had been assembled during a power cut. You combine supply, demand, uncertainty, and public health into one institutional migraine." },
    G: { name: "Geopolitical Shock", shortName: "Geopolitics", icon: "🌍", tag: "The Non-Economic Variable", description: "You are the reason central bankers suddenly need to understand sanctions, trade routes, energy dependency, and military risk. Very considerate of you." }
  },
  questions: [
    {
      text: "You enter the economy by:",
      answers: [
        { letter: "A", text: "Making energy prices everyone’s problem.", points: { O: 3 } },
        { letter: "B", text: "Changing how much the economy can produce.", points: { T: 3 } },
        { letter: "C", text: "Making households and firms suddenly spend too much or too little.", points: { D: 3 } },
        { letter: "D", text: "Breaking credit, balance sheets, and trust.", points: { F: 3 } },
        { letter: "E", text: "Freezing normal activity because biology has joined macroeconomics.", points: { P: 3 } },
        { letter: "F", text: "Turning borders, alliances, sanctions, and supply chains into macro variables.", points: { G: 3 } }
      ]
    },
    {
      text: "Your preferred form of chaos is:",
      answers: [
        { letter: "A", text: "Stagflation discourse returning like a cursed heirloom.", points: { O: 3 } },
        { letter: "B", text: "Economists arguing about potential output.", points: { T: 3 } },
        { letter: "C", text: "Output gaps swinging around like they have no supervision.", points: { D: 3 } },
        { letter: "D", text: "Liquidity evaporating while everyone says “contained.”", points: { F: 3 } },
        { letter: "E", text: "Lockdowns, reopening, bottlenecks, and vibes-based forecasting.", points: { P: 3 } },
        { letter: "F", text: "Risk premia, sanctions, and commodities behaving badly.", points: { G: 3 } }
      ]
    },
    {
      text: "Central banks hate you because:",
      answers: [
        { letter: "A", text: "You raise inflation while hurting growth. Very tasteful.", points: { O: 3 } },
        { letter: "B", text: "You make the neutral rate and potential output look mysterious.", points: { T: 3 } },
        { letter: "C", text: "You look easy to fix until expectations start moving.", points: { D: 3 } },
        { letter: "D", text: "Rate cuts may not repair broken credit channels.", points: { F: 3 } },
        { letter: "E", text: "Historical data become decorative.", points: { P: 3 } },
        { letter: "F", text: "You mix economics with security policy, which is everyone’s favorite nightmare.", points: { G: 3 } }
      ]
    },
    {
      text: "Your signature chart is:",
      answers: [
        { letter: "A", text: "Oil prices and headline inflation.", points: { O: 3 } },
        { letter: "B", text: "Productivity growth and unit labor costs.", points: { T: 3 } },
        { letter: "C", text: "Consumption, investment, and output gap estimates.", points: { D: 3 } },
        { letter: "D", text: "Credit spreads and bank lending standards.", points: { F: 3 } },
        { letter: "E", text: "Mobility, services inflation, and supply bottlenecks.", points: { P: 3 } },
        { letter: "F", text: "Trade exposure, commodity dependence, and defense-risk premia.", points: { G: 3 } }
      ]
    },
    {
      text: "Your policy response usually requires:",
      answers: [
        { letter: "A", text: "Patience, credibility, and pretending second-round effects are not terrifying.", points: { O: 3 } },
        { letter: "B", text: "Structural analysis and a humiliating amount of uncertainty.", points: { T: 3 } },
        { letter: "C", text: "Classic stabilization policy. Finally, the textbook gets a turn.", points: { D: 3 } },
        { letter: "D", text: "Liquidity support, capital repair, and financial supervision.", points: { F: 3 } },
        { letter: "E", text: "Fiscal-monetary coordination, health policy, and luck. Mostly luck.", points: { P: 3 } },
        { letter: "F", text: "Energy strategy, trade policy, sanctions analysis, and central bankers looking tired.", points: { G: 3 } }
      ]
    },
    {
      text: "Your most sarcastic self-description is:",
      answers: [
        { letter: "A", text: "“I am supply-side inflation with geopolitical seasoning.”", points: { O: 2, G: 1 } },
        { letter: "B", text: "“I am the reason potential output is not a number, it is a cry for help.”", points: { T: 3 } },
        { letter: "C", text: "“I am aggregate demand doing too much or too little.”", points: { D: 3 } },
        { letter: "D", text: "“I am what happens when leverage discovers gravity.”", points: { F: 3 } },
        { letter: "E", text: "“I am the entire macro model asking for sick leave.”", points: { P: 3 } },
        { letter: "F", text: "“I am foreign policy with a CPI pass-through.”", points: { G: 3 } }
      ]
    }
  ],
  classify: function(scores, appearances) {
    if (scores.P >= 10 && appearances.P >= 3) return { code: "P", rule: "Consistent pandemic shock behavior." };
    if (scores.F >= 10 && scores.F > scores.D) return { code: "F", rule: "Financial trauma outweighed pure demand shocks." };
    if (scores.G >= 9 && scores.G >= scores.O - 2) return { code: "G", rule: "Geopolitics scored high relative to standard oil shocks." };
    if (scores.O >= 9 && scores.O > scores.T) return { code: "O", rule: "Stagflationary oil shock dominance." };
    if (scores.T >= 9 && scores.T > scores.D) return { code: "T", rule: "Productivity shifts beat demand shocks." };
    return { code: "D", rule: "Fallback: Demand Shock. The textbook classic." };
  }
};

window.quizzes["exchange-rate-attachment"] = {
  id: "exchange-rate-attachment",
  title: "Which Exchange Rate Regime Matches Your Attachment Style?",
  subtitle: "Do you float freely, manage volatility, commit too hard, outsource your currency, or attempt the impossible trinity and call it a policy framework?",
  description: "A quiz about exchange-rate regimes, monetary sovereignty, and the macroeconomic consequences of wanting everything at once.",
  icon: "💱",
  outcomes: {
    F: { name: "Free Float", shortName: "Free Float", icon: "🌊", tag: "The Independent", description: "You value autonomy and flexibility. You let the exchange rate absorb shocks because repressing volatility is expensive and, frankly, emotionally unhealthy." },
    M: { name: "Managed Float", shortName: "Managed Float", icon: "🏄", tag: "The Smoother", description: "You say you believe in flexibility, but you also keep a very close eye on the currency. You are not controlling. You are “smoothing disorderly conditions.” Sure." },
    C: { name: "Crawling Peg", shortName: "Crawling Peg", icon: "🐌", tag: "The Predictable", description: "You like commitment, but with scheduled adjustments. You are predictable, gradual, and exactly the kind of person who would put depreciation into a calendar invite." },
    B: { name: "Currency Board", shortName: "Currency Board", icon: "🧱", tag: "The Hard Commitment", description: "You are hard commitment with institutional architecture. Strong, credible, and slightly terrifying. Your weakness is that adjustment happens through the real economy, which tends to complain." },
    D: { name: "Dollarization", shortName: "Dollarization", icon: "💵", tag: "The Outsourcer", description: "You are done pretending domestic monetary credibility can be built overnight. You choose external discipline. Your strength is commitment. Your weakness is having outsourced your monetary personality." },
    I: { name: "Impossible Trinity Breakdown", shortName: "Impossible Trinity", icon: "⚠️", tag: "The Situationship", description: "You wanted exchange-rate stability, capital mobility, and independent monetary policy all at once. This is not an attachment style. This is a macroeconomic situationship." }
  },
  questions: [
    {
      text: "Your ideal relationship with the exchange rate is:",
      answers: [
        { letter: "A", text: "Let it move. I respect independence and volatility.", points: { F: 3 } },
        { letter: "B", text: "Let it move, but intervene when it starts embarrassing everyone.", points: { M: 3 } },
        { letter: "C", text: "Adjust gradually according to a rule. Predictable, but not clingy.", points: { C: 3 } },
        { letter: "D", text: "Fix it hard and back it with reserves. Commitment issues? Never heard of her.", points: { B: 3 } },
        { letter: "E", text: "Adopt someone else’s currency. Radical? Maybe. Clean? Also maybe.", points: { D: 3 } },
        { letter: "F", text: "Promise fixed rates, free capital movement, and independent monetary policy. What could go wrong?", points: { I: 4 } }
      ]
    },
    {
      text: "Capital flows suddenly reverse. You:",
      answers: [
        { letter: "A", text: "Let the currency absorb the shock. Character-building.", points: { F: 3 } },
        { letter: "B", text: "Intervene to smooth volatility. Not control. Smooth. Very different.", points: { M: 3 } },
        { letter: "C", text: "Adjust the crawl or band. Slowly, because drama is expensive.", points: { C: 3 } },
        { letter: "D", text: "Defend the peg with reserves and credibility. Mostly reserves.", points: { B: 3 } },
        { letter: "E", text: "Feel relieved you outsourced the currency problem.", points: { D: 3 } },
        { letter: "F", text: "Discover that the trinity was, in fact, impossible.", points: { I: 4 } }
      ]
    },
    {
      text: "Your emotional attachment style is closest to:",
      answers: [
        { letter: "A", text: "Secure independence. I float because I trust myself.", points: { F: 3 } },
        { letter: "B", text: "Anxious but practical. I intervene, but I call it smoothing.", points: { M: 3 } },
        { letter: "C", text: "Slow adjustment. I need predictability with scheduled movement.", points: { C: 3 } },
        { letter: "D", text: "Deep commitment. Very deep. Legally deep.", points: { B: 3 } },
        { letter: "E", text: "Full merger. Your currency is our currency now.", points: { D: 3 } },
        { letter: "F", text: "I want everything at once and resent constraints.", points: { I: 4 } }
      ]
    },
    {
      text: "Inflation is high. The exchange rate is under pressure. You prefer:",
      answers: [
        { letter: "A", text: "Let depreciation happen and tighten if needed.", points: { F: 2, M: 1 } },
        { letter: "B", text: "Intervene selectively while adjusting policy.", points: { M: 3 } },
        { letter: "C", text: "Crawl more slowly or recalibrate the path.", points: { C: 3 } },
        { letter: "D", text: "Defend the fixed rate to import credibility.", points: { B: 3 } },
        { letter: "E", text: "Use a hard external anchor by adopting another currency.", points: { D: 3 } },
        { letter: "F", text: "Announce all objectives are still compatible, despite evidence developing a personality.", points: { I: 4 } }
      ]
    },
    {
      text: "Your favorite phrase is:",
      answers: [
        { letter: "A", text: "“Shock absorber.”", points: { F: 3 } },
        { letter: "B", text: "“Disorderly market conditions.”", points: { M: 3 } },
        { letter: "C", text: "“Pre-announced adjustment path.”", points: { C: 3 } },
        { letter: "D", text: "“Fully backed monetary base.”", points: { B: 3 } },
        { letter: "E", text: "“Credibility through monetary union or substitution.”", points: { D: 3 } },
        { letter: "F", text: "“Policy autonomy, exchange-rate stability, and open capital markets.”", points: { I: 4 } }
      ]
    },
    {
      text: "Your greatest weakness is:",
      answers: [
        { letter: "A", text: "You may pass too much volatility into prices and balance sheets.", points: { F: 2 } },
        { letter: "B", text: "You may become a float with commitment issues.", points: { M: 2 } },
        { letter: "C", text: "Speculators can see your path and bring snacks.", points: { C: 2 } },
        { letter: "D", text: "A hard peg is only as strong as reserves, credibility, and political pain tolerance. Fun.", points: { B: 2 } },
        { letter: "E", text: "You lose monetary sovereignty so thoroughly it needs a forwarding address.", points: { D: 2 } },
        { letter: "F", text: "You are not a regime. You are a crisis arc.", points: { I: 3 } }
      ]
    },
    {
      text: "Choose your preferred nightmare:",
      answers: [
        { letter: "A", text: "Exchange-rate volatility.", points: { F: 2 } },
        { letter: "B", text: "Being accused of manipulation.", points: { M: 2 } },
        { letter: "C", text: "A slow-motion speculative attack.", points: { C: 2 } },
        { letter: "D", text: "Running out of reserves while pretending everything is fine.", points: { B: 2 } },
        { letter: "E", text: "Discovering the anchor country’s monetary policy does not care about you personally.", points: { D: 2 } },
        { letter: "F", text: "Simultaneously defending the currency, keeping rates independent, and allowing free capital movement.", points: { I: 4 } }
      ]
    }
  ],
  classify: function(scores, appearances) {
    if (scores.I >= 10 || isHighest(scores, "I")) return { code: "I", rule: "The Impossible Trinity broke down." };
    if (scores.D >= 9 && scores.D > scores.B) return { code: "D", rule: "Dollarization preferred over a simple board." };
    if (scores.B >= 9 && scores.B > scores.M) return { code: "B", rule: "Hard peg preferred over management." };
    if (scores.C >= 9 && appearances.C >= 3) return { code: "C", rule: "Consistent crawling peg choice." };
    if (scores.M >= 9 && scores.M >= scores.F - 2) return { code: "M", rule: "Management heavily preferred over free floating." };
    return { code: "F", rule: "Fallback: Free Float." };
  }
};
