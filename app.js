const scenarios = {
  corporate: {
    title: "Corporate · diligence issue extraction",
    short: "Corporate diligence",
    summary: "Surface agreement issues across a deal-room corpus for attorney verification and drafting decisions.",
    fact: "A transaction team needs faster issue spotting across contracts without surrendering relevance, materiality, or negotiating judgment.",
    factShort: "Issue spotting across deal documents",
    knowledge: "Approved matter corpus, clause taxonomy, document lineage, access controls, and a named knowledge owner.",
    knowledgeShort: "Approved corpus, taxonomy, provenance",
    authority: "Deal attorneys determine legal relevance, materiality, escalation, and the final drafting or negotiating position.",
    authorityShort: "Lawyers retain legal judgment",
    evaluation: "Attorney-reviewed issue set; citation completeness; omission and hallucination review; repeatability across representative documents.",
    evaluationShort: "Citations, omissions, repeatability",
    adoption: "Matter kickoff pattern, embedded examples, office hours, feedback capture, and practice KM ownership.",
    adoptionShort: "Embedded workflow and named owners",
    value: "Measured cycle time, rework, issue coverage, repeat use, and client-response speed.",
    valueShort: "Cycle time, rework, coverage, reuse",
    context: {
      practice: "Corporate",
      matter: "transaction matter",
      matterPlural: "transaction matters",
      receivingPractice: "another transactional practice",
      decision: "drafting or negotiating position",
      sources: "deal-room documents",
      consequence: "materiality, risk, and negotiating judgment"
    }
  },
  litigation: {
    title: "Litigation · discovery synthesis",
    short: "Litigation discovery",
    summary: "Build chronology and theme support from a large review set while preserving privilege and strategy authority.",
    fact: "A litigation team needs a defensible synthesis of documents, chronology, actors, and emerging themes under time pressure.",
    factShort: "Chronology and themes under time pressure",
    knowledge: "Matter-authorized collection, privilege boundaries, review coding, document citations, and chain-of-custody context.",
    knowledgeShort: "Authorized collection and review coding",
    authority: "Litigators decide responsiveness, privilege, factual significance, theory of the case, and what reaches the client or court.",
    authorityShort: "Litigators retain strategy and privilege authority",
    evaluation: "Citation validity; factual consistency; privilege leakage tests; theme coverage; reviewer agreement on sampled outputs.",
    evaluationShort: "Citation, privilege, theme, reviewer agreement",
    adoption: "Reviewer playbook, escalation path, matter-specific training, and continuous feedback from senior litigators.",
    adoptionShort: "Reviewer playbook and escalation path",
    value: "Measured review effort, chronology build time, rework, factual coverage, and team confidence.",
    valueShort: "Review effort, chronology time, coverage",
    context: {
      practice: "Litigation",
      matter: "litigation matter",
      matterPlural: "litigation matters",
      receivingPractice: "another disputes practice",
      decision: "case strategy or client-facing conclusion",
      sources: "authorized review collections",
      consequence: "privilege, factual significance, and litigation strategy"
    }
  },
  regulatory: {
    title: "Regulatory · monitoring to advisory",
    short: "Regulatory monitoring",
    summary: "Turn changing regulatory sources into a traceable attorney-ready update with accountable interpretation.",
    fact: "A regulatory team must detect change, understand client relevance, and produce timely advice across fast-moving sources.",
    factShort: "Detect change and determine client relevance",
    knowledge: "Approved primary sources, jurisdiction taxonomy, effective dates, client context, and source-refresh ownership.",
    knowledgeShort: "Primary sources, jurisdictions, effective dates",
    authority: "Regulatory lawyers interpret applicability, uncertainty, materiality, and the advice delivered to clients.",
    authorityShort: "Lawyers retain applicability and advice authority",
    evaluation: "Source freshness; citation coverage; change-detection recall; jurisdiction accuracy; attorney correction patterns.",
    evaluationShort: "Freshness, coverage, recall, jurisdiction accuracy",
    adoption: "Practice alerts, client-context prompts, review checkpoints, and shared KM stewardship.",
    adoptionShort: "Practice alerts and shared KM stewardship",
    value: "Measured monitoring effort, time to attorney-ready draft, corrections, coverage, and client-response speed.",
    valueShort: "Monitoring effort, draft time, coverage",
    context: {
      practice: "Regulatory",
      matter: "regulatory advisory workflow",
      matterPlural: "regulatory advisory workflows",
      receivingPractice: "another regulatory practice",
      decision: "applicability or client advice",
      sources: "approved primary authorities",
      consequence: "jurisdiction, applicability, and client impact"
    }
  },
  whitecollar: {
    title: "White Collar · investigation chronology",
    short: "White Collar investigation",
    summary: "Organize evidence and chronology for sensitive investigations with heightened confidentiality and human control.",
    fact: "An investigation team needs to connect communications, events, actors, and allegations without compromising privilege or investigative strategy.",
    factShort: "Connect evidence, events, actors, allegations",
    knowledge: "Matter-specific access, approved evidence set, privilege and export-control boundaries, provenance, and investigation taxonomy.",
    knowledgeShort: "Restricted evidence, provenance, taxonomy",
    authority: "Investigation counsel decides scope, credibility, privilege, legal characterization, escalation, and disclosure.",
    authorityShort: "Counsel retains scope, privilege, disclosure authority",
    evaluation: "Evidence citation accuracy; entity and date consistency; privilege controls; access tests; omission review on high-consequence facts.",
    evaluationShort: "Citations, entities, access, privilege, omissions",
    adoption: "Small authorized cohort, scenario-based training, named escalation owner, and deliberate expansion only after evidence.",
    adoptionShort: "Authorized cohort and named escalation owner",
    value: "Measured chronology effort, correction burden, issue coverage, response speed, and defensibility signals.",
    valueShort: "Chronology effort, corrections, defensibility",
    context: {
      practice: "White Collar",
      matter: "sensitive investigation",
      matterPlural: "sensitive investigations",
      receivingPractice: "another investigations practice",
      decision: "scope, privilege, escalation, or disclosure",
      sources: "restricted investigation evidence",
      consequence: "privilege, credibility, confidentiality, and disclosure"
    }
  }
};

const treatmentStages = {
  prototype: {
    label: "Matter prototype",
    short: "Prototype",
    caption: "One bounded matter",
    ordinal: "01",
    intent: "Learn safely inside one bounded matter before asking the workflow to travel.",
    scalePermission: "No reuse beyond the named matter",
    proofBurden: "Show task viability, traceability, and harmful-failure detection on a bounded evidence set.",
    owner: (scenario) => `${scenario.context.practice} matter sponsor + delivery lead`,
    nextDecision: "Repair, hold, or prove on representative matter work.",
    decisionVerb: "Bound and learn",
    progress: 1
  },
  practice: {
    label: "Practice pattern",
    short: "Practice",
    caption: "Representative matters",
    ordinal: "02",
    intent: "Prove repeatable value inside one practice while documenting legitimate exceptions.",
    scalePermission: "Practice-wide use within defined eligibility rules",
    proofBurden: "Demonstrate reliable performance across representative matters and record where the pattern should not apply.",
    owner: (scenario) => `${scenario.context.practice} practice lead + KM owner`,
    nextDecision: "Continue proving, repair exceptions, or nominate a transfer trial.",
    decisionVerb: "Prove and embed",
    progress: 2
  },
  candidate: {
    label: "Cross-practice candidate",
    short: "Transfer",
    caption: "Controlled transfer trial",
    ordinal: "03",
    intent: "Test whether the reusable mechanics survive another practice context without exporting local legal assumptions.",
    scalePermission: "Limited transfer to a named receiving practice",
    proofBurden: "Demonstrate reliability in another practice context with comparison evidence, variance review, and explicit stopping rules.",
    owner: (scenario) => `${scenario.context.practice} + receiving practice + KM`,
    nextDecision: "Validate transfer, adapt the pattern, or hold it local.",
    decisionVerb: "Compare and transfer",
    progress: 3
  },
  standard: {
    label: "Firm standard",
    short: "Standard",
    caption: "Governed firm capability",
    ordinal: "04",
    intent: "Operate a maintained firm capability with lifecycle controls and local exception rights.",
    scalePermission: "Firm-wide use for an approved workflow class",
    proofBurden: "Sustain evaluation, ownership, change control, support, exception handling, and retirement evidence over time.",
    owner: () => "Firm AI + KM + practice stewards",
    nextDecision: "Maintain, revalidate after change, repair degradation, or retire.",
    decisionVerb: "Standardize and maintain",
    progress: 4
  }
};

const stageOrder = ["prototype", "practice", "candidate", "standard"];
const layerOrder = ["fact", "knowledge", "authority", "evaluation", "adoption", "value"];

let currentScenario = "corporate";
let currentStage = "practice";
let activeTransition = 0;
let transitionTimers = [];

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function clearTransitionTimers() {
  transitionTimers.forEach((timer) => window.clearTimeout(timer));
  transitionTimers = [];
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function addExperienceStyles() {
  if (document.querySelector('link[data-precedent-enhancement="true"]')) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "treatment.css";
  link.dataset.precedentEnhancement = "true";
  document.head.appendChild(link);
}

function stageLayers(scenario, stageKey) {
  const context = scenario.context;
  const common = {
    fact: {
      hero: scenario.factShort,
      headline: scenario.fact,
      details: [
        ["Workflow", scenario.factShort],
        ["Decision consequence", context.consequence],
        ["Human decision", context.decision]
      ]
    },
    knowledge: {
      hero: scenario.knowledgeShort,
      headline: scenario.knowledge,
      details: [
        ["Source universe", context.sources],
        ["Control", "Approved access + provenance"],
        ["Knowledge owner", "Named and accountable"]
      ]
    },
    authority: {
      hero: scenario.authorityShort,
      headline: scenario.authority,
      details: [
        ["Retained authority", context.decision],
        ["Escalation", "Uncertainty or high consequence"],
        ["Record", "Decision and override captured"]
      ]
    },
    evaluation: {
      hero: scenario.evaluationShort,
      headline: scenario.evaluation,
      details: [
        ["Quality", "Citations + omissions"],
        ["Reliability", "Representative task evidence"],
        ["Failure review", "Known modes + new signals"]
      ]
    },
    adoption: {
      hero: scenario.adoptionShort,
      headline: scenario.adoption,
      details: [
        ["Workflow insertion", "Inside the attorney task"],
        ["Enablement", "Examples + coaching"],
        ["Support", "Named feedback path"]
      ]
    },
    value: {
      hero: scenario.valueShort,
      headline: scenario.value,
      details: [
        ["Operating signal", "Cycle time + rework"],
        ["Quality signal", "Coverage + corrections"],
        ["Adoption signal", "Repeat use + abandonment"]
      ]
    }
  };

  if (stageKey === "prototype") {
    return {
      fact: {
        hero: `Bound ${scenario.factShort.toLowerCase()}`,
        headline: `${scenario.fact} Bound the first release to one eligible ${context.matter} and a named user cohort.`,
        details: [["Scope", `One ${context.matter}`], ["Eligibility", "Named documents and tasks"], ["Out of scope", "Consequential autonomous action"]]
      },
      knowledge: {
        hero: "Matter-approved sources and trace",
        headline: `${scenario.knowledge} Use only matter-approved sources with explicit access, provenance, and expiry.`,
        details: [["Source status", "Matter-approved"], ["Access", "Named cohort only"], ["Provenance", "Document-level trace"]]
      },
      authority: {
        hero: "Review every consequential output",
        headline: `${scenario.authority} Every consequential output is reviewed before it changes legal work.`,
        details: [["Review model", "Attorney-in-the-loop"], ["Decision owner", "Matter lead"], ["Escalation", "Uncertain or high consequence"]]
      },
      evaluation: {
        hero: "Bounded proof and failure log",
        headline: `${scenario.evaluation} Prove traceability and harmful-failure detection on a bounded evidence set.`,
        details: [["Proof set", "Curated representative sample"], ["Failure review", "Logged by type"], ["Release gate", "No critical unknowns"]]
      },
      adoption: {
        hero: "Small cohort and rapid repair",
        headline: `${scenario.adoption} Train a small cohort and keep support close enough to repair the workflow quickly.`,
        details: [["Cohort", "Named pilot users"], ["Owner", "Matter sponsor + delivery lead"], ["Support", "Office hours + rapid repair"]]
      },
      value: {
        hero: "Baseline signal, not broad ROI",
        headline: `${scenario.value} Establish a baseline signal without claiming practice-wide or firm-wide value.`,
        details: [["Measure", "Cycle time + rework"], ["Horizon", "Pilot window"], ["Reuse signal", "Learning only"]]
      }
    };
  }

  if (stageKey === "practice") {
    return {
      fact: {
        hero: `Representative ${context.matterPlural}`,
        headline: `${scenario.fact} Define the representative matter variations and explicit eligibility rules the practice pattern must cover.`,
        details: [["Scope", `${context.practice} practice`], ["Variation", "Representative matter types"], ["Exceptions", "Documented and reviewable"]]
      },
      knowledge: {
        hero: "Maintained practice corpus and taxonomy",
        headline: `${scenario.knowledge} Move from a one-matter corpus to maintained practice knowledge with named stewardship.`,
        details: [["Source status", "Practice-approved"], ["Taxonomy", "Versioned practice schema"], ["Stewardship", "Practice KM owner"]]
      },
      authority: {
        hero: "Tiered review and practice escalation",
        headline: `${scenario.authority} Define review tiers, escalation triggers, and the decisions that always remain with lawyers.`,
        details: [["Review model", "Risk-tiered attorney review"], ["Decision owner", `${context.practice} lawyer`], ["Escalation", "Materiality + exceptions"]]
      },
      evaluation: {
        hero: "Representative matters and exceptions",
        headline: `${scenario.evaluation} Prove repeatability across representative matters and record legitimate failure and exception patterns.`,
        details: [["Proof set", `Representative ${context.matterPlural}`], ["Reliability", "Repeatable within practice"], ["Exceptions", "Named and maintained"]]
      },
      adoption: {
        hero: "Practice playbook and named owners",
        headline: `${scenario.adoption} Embed the workflow in practice routines with training, support, and an accountable owner.`,
        details: [["Rollout", "Practice-wide by eligibility"], ["Owner", `${context.practice} + KM`], ["Support", "Playbook + office hours"]]
      },
      value: {
        hero: "Sustained use, quality, and rework",
        headline: `${scenario.value} Show sustained use and operating improvement across representative work, not a single successful demonstration.`,
        details: [["Measure", "Cycle time + rework + quality"], ["Horizon", "Across representative matters"], ["Reuse signal", "Repeat use within practice"]]
      }
    };
  }

  if (stageKey === "candidate") {
    return {
      fact: {
        hero: "Invariant workflow vs local judgment",
        headline: `${scenario.fact} Separate the reusable workflow mechanics from practice-specific legal judgment before transfer.`,
        details: [["Origin", `${context.practice} pattern`], ["Receiving context", context.receivingPractice], ["Transfer hypothesis", "Mechanics portable; judgment local"]]
      },
      knowledge: {
        hero: "Shared schema and source equivalence",
        headline: `${scenario.knowledge} Test whether the receiving practice has equivalent authoritative sources, taxonomy, access, and stewardship.`,
        details: [["Schema fit", "Shared fields identified"], ["Source equivalence", "Compared, not assumed"], ["Provenance", "Preserved across transfer"]]
      },
      authority: {
        hero: "Cross-practice co-review",
        headline: `${scenario.authority} Preserve receiving-practice judgment through co-review, named escalation, and local exception rights.`,
        details: [["Review pair", `${context.practice} ↔ receiving practice`], ["Decision owner", "Receiving-practice lawyer"], ["Escalation", "Cross-practice variance"]]
      },
      evaluation: {
        hero: "Holdout comparison and variance review",
        headline: `${scenario.evaluation} Compare performance in another practice context and investigate variance before broader reuse.`,
        details: [["Transfer test", "Holdout work in receiving practice"], ["Comparison", "Origin vs receiving context"], ["Stopping rule", "Material reliability or risk drift"]]
      },
      adoption: {
        hero: "Receiving owner and controlled cohort",
        headline: `${scenario.adoption} Name a receiving-practice owner, train a controlled cohort, and capture adaptation cost.`,
        details: [["Cohort", "Defined transfer trial"], ["Owners", "Origin + receiving + KM"], ["Enablement", "Toolkit + training + support"]]
      },
      value: {
        hero: "Comparable gain and transfer burden",
        headline: `${scenario.value} Measure both comparable benefit and the cost of adaptation, governance, and support.`,
        details: [["Benefit", "Comparable operating signal"], ["Variance", "Expected range documented"], ["Transfer cost", "Adaptation + enablement burden"]]
      }
    };
  }

  if (stageKey === "standard") {
    return {
      fact: {
        hero: "Firm eligibility and exception contract",
        headline: `${scenario.fact} Publish a firm eligibility contract that defines where the standard applies and where practice discretion remains.`,
        details: [["Scope", "Approved workflow class"], ["Eligibility", "Explicit firm criteria"], ["Exceptions", "Local rights preserved"]]
      },
      knowledge: {
        hero: "Versioned source registry and stewardship",
        headline: `${scenario.knowledge} Operate a versioned source registry with firm and practice stewardship, freshness, and change triggers.`,
        details: [["Registry", "Firm-approved and versioned"], ["Stewardship", "Firm KM + practice owners"], ["Change trigger", "Source, policy, or model change"]]
      },
      authority: {
        hero: "Firm minimum controls, local legal authority",
        headline: `${scenario.authority} Standardize minimum control requirements while preserving local legal judgment and escalation.`,
        details: [["Minimum control", "Firm-wide baseline"], ["Decision owner", "Responsible practice lawyer"], ["Escalation", "Firm + practice governance"]]
      },
      evaluation: {
        hero: "Regression suite and lifecycle gates",
        headline: `${scenario.evaluation} Maintain a regression suite, change-control gates, and explicit repair, hold, and retirement criteria.`,
        details: [["Evaluation", "Maintained regression suite"], ["Change control", "Revalidate after material change"], ["Lifecycle", "Repair / hold / retire"]]
      },
      adoption: {
        hero: "Firm enablement and service ownership",
        headline: `${scenario.adoption} Provide firm enablement, support, telemetry, and named service ownership across practices.`,
        details: [["Enablement", "Firm playbook + local guidance"], ["Owners", "Firm AI + KM + stewards"], ["Support", "Service path + lifecycle notices"]]
      },
      value: {
        hero: "Portfolio evidence and lifecycle value",
        headline: `${scenario.value} Track operating value, quality, adoption, support burden, and lifecycle health at portfolio level.`,
        details: [["Outcome", "Operating + client-service value"], ["Quality", "Reliability + correction trends"], ["Lifecycle", "Use, support, degradation, retirement"]]
      }
    };
  }

  return common;
}

function ensureEnhancements() {
  addExperienceStyles();

  document.querySelectorAll(".stage-btn").forEach((button) => {
    const stage = treatmentStages[button.dataset.stage];
    if (!stage || button.querySelector("small")) return;
    const label = button.textContent.trim();
    button.textContent = "";
    const strong = document.createElement("strong");
    strong.textContent = label;
    const small = document.createElement("small");
    small.textContent = stage.caption;
    button.append(strong, small);
  });

  const stageControls = document.querySelector(".stage-controls");
  if (stageControls && !document.querySelector(".stage-explainer")) {
    const explainer = document.createElement("div");
    explainer.className = "stage-explainer";
    explainer.innerHTML = '<span>Selected treatment</span><strong id="stageExplainerTitle"></strong><p id="stageExplainerText"></p>';
    stageControls.insertAdjacentElement("afterend", explainer);
  }

  document.querySelectorAll("[data-record-layer]").forEach((layer) => {
    if (layer.querySelector(".layer-details")) return;
    const details = document.createElement("div");
    details.className = "layer-details";
    details.setAttribute("aria-label", `${layer.querySelector("h4")?.textContent || "Layer"} treatment requirements`);
    layer.appendChild(details);
  });

  const recordHeader = document.querySelector(".record-header");
  if (recordHeader && !recordHeader.querySelector(".record-stage-chip")) {
    const chip = document.createElement("div");
    chip.className = "record-stage-chip";
    chip.innerHTML = '<span>Evidence treatment</span><strong id="recordStageChip"></strong>';
    recordHeader.appendChild(chip);
  }

  const labShell = document.querySelector(".lab-shell");
  if (labShell && !labShell.querySelector(".treatment-summary")) {
    labShell.classList.add("lab-shell-enhanced");
    const summary = document.createElement("aside");
    summary.className = "treatment-summary";
    summary.setAttribute("aria-label", "Evidence treatment summary");
    summary.innerHTML = `
      <header>
        <span>Treatment summary</span>
        <strong id="summaryTreatment"></strong>
        <div class="treatment-progress" aria-label="Treatment progression">
          ${stageOrder.map((key, index) => `<i data-progress-stage="${key}" aria-label="${index + 1}. ${treatmentStages[key].label}"></i>`).join("")}
        </div>
      </header>
      <section class="summary-block" data-summary="permission"><span>Scale permission</span><strong id="summaryPermission"></strong></section>
      <section class="summary-block" data-summary="proof"><span>Proof burden</span><strong id="summaryProof"></strong></section>
      <section class="summary-block" data-summary="owner"><span>Named ownership</span><strong id="summaryOwner"></strong></section>
      <section class="summary-block summary-next" data-summary="decision"><span>Next decision</span><strong id="summaryDecision"></strong></section>
    `;
    labShell.appendChild(summary);
  }

  const hero = document.getElementById("heroEngine");
  if (hero && !hero.querySelector(".engine-stage-rail")) {
    const rail = document.createElement("div");
    rail.className = "engine-stage-rail";
    rail.setAttribute("aria-label", "Current evidence treatment progression");
    rail.innerHTML = stageOrder.map((key) => `<span data-engine-stage="${key}"><i>${treatmentStages[key].ordinal}</i>${treatmentStages[key].short}</span>`).join("");
    hero.appendChild(rail);
  }

  if (hero && !hero.querySelector(".engine-decision-card")) {
    const card = document.createElement("div");
    card.className = "engine-decision-card";
    card.innerHTML = '<span>Scale permission</span><strong data-field="scalePermissionShort"></strong><small data-field="proofBurdenShort"></small>';
    hero.appendChild(card);
  }
}

function updateLayerDetails(layerKey, layerState) {
  const details = document.querySelector(`[data-record-layer="${layerKey}"] .layer-details`);
  if (!details) return;
  details.innerHTML = layerState.details.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
}

function writeState(scenarioKey, stageKey) {
  const scenario = scenarios[scenarioKey];
  const treatment = treatmentStages[stageKey];
  const layers = stageLayers(scenario, stageKey);

  document.body.dataset.treatment = stageKey;
  document.getElementById("heroEngine")?.setAttribute("data-treatment", stageKey);
  document.querySelector(".precedent-record")?.setAttribute("data-treatment", stageKey);
  document.querySelector(".lab-shell")?.setAttribute("data-treatment", stageKey);

  const fields = {
    scenarioShort: scenario.short,
    factShort: layers.fact.hero,
    knowledgeShort: layers.knowledge.hero,
    authorityShort: layers.authority.hero,
    evaluationShort: layers.evaluation.hero,
    adoptionShort: layers.adoption.hero,
    valueShort: layers.value.hero,
    disposition: treatment.label,
    scalePermissionShort: treatment.scalePermission,
    proofBurdenShort: treatment.decisionVerb
  };

  Object.entries(fields).forEach(([field, value]) => setText(`[data-field="${field}"]`, value));

  const idValues = {
    scenarioTitle: scenario.title,
    scenarioSummary: `${scenario.summary} ${treatment.intent}`,
    fact: layers.fact.headline,
    knowledge: layers.knowledge.headline,
    authority: layers.authority.headline,
    evaluation: layers.evaluation.headline,
    adoption: layers.adoption.headline,
    value: layers.value.headline,
    labDisposition: treatment.label,
    nextDecision: treatment.nextDecision,
    stageExplainerTitle: treatment.label,
    stageExplainerText: treatment.intent,
    recordStageChip: `${treatment.ordinal} · ${treatment.label}`,
    summaryTreatment: treatment.label,
    summaryPermission: treatment.scalePermission,
    summaryProof: treatment.proofBurden,
    summaryOwner: treatment.owner(scenario),
    summaryDecision: treatment.nextDecision
  };

  Object.entries(idValues).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  layerOrder.forEach((key) => updateLayerDetails(key, layers[key]));

  document.querySelectorAll(".scenario-btn").forEach((button) => {
    const selected = button.dataset.scenario === scenarioKey;
    button.setAttribute("aria-selected", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  document.querySelectorAll(".stage-btn").forEach((button) => {
    const selected = button.dataset.stage === stageKey;
    button.setAttribute("aria-pressed", String(selected));
    button.tabIndex = selected ? 0 : -1;
  });

  document.querySelectorAll("[data-progress-stage]").forEach((node) => {
    const index = stageOrder.indexOf(node.dataset.progressStage);
    node.classList.toggle("is-complete", index < treatment.progress);
    node.classList.toggle("is-current", node.dataset.progressStage === stageKey);
  });

  document.querySelectorAll("[data-engine-stage]").forEach((node) => {
    const index = stageOrder.indexOf(node.dataset.engineStage);
    node.classList.toggle("is-complete", index < treatment.progress);
    node.classList.toggle("is-current", node.dataset.engineStage === stageKey);
  });

  const announcement = document.getElementById("stateAnnouncement");
  if (announcement) {
    announcement.textContent = `${scenario.title}. ${treatment.label}. Scale permission: ${treatment.scalePermission}. Proof burden: ${treatment.proofBurden}. Next decision: ${treatment.nextDecision}`;
  }
}

function settleLayers(token, animate) {
  const hero = document.getElementById("heroEngine");
  const record = document.querySelector(".precedent-record");
  const lab = document.querySelector(".lab-shell");
  const heroLayers = [...document.querySelectorAll("[data-engine-layer]")];
  const recordLayers = [...document.querySelectorAll("[data-record-layer]")];
  const supporting = [...document.querySelectorAll(".summary-block, .stage-explainer, .engine-decision-card")];
  const allLayers = [...heroLayers, ...recordLayers, ...supporting];

  if (!hero || !record) return;

  heroLayers.forEach((layer) => layer.classList.remove("is-active"));
  recordLayers.forEach((layer) => layer.classList.remove("is-resolved"));
  supporting.forEach((item) => item.classList.remove("is-resolved"));

  if (!animate || reduceMotion()) {
    heroLayers.forEach((layer) => layer.classList.add("is-active"));
    recordLayers.forEach((layer) => layer.classList.add("is-resolved"));
    supporting.forEach((item) => item.classList.add("is-resolved"));
    hero.dataset.state = "settled";
    record.classList.remove("is-transitioning");
    lab?.classList.remove("is-switching");
    return;
  }

  allLayers.forEach((layer, index) => {
    const timer = window.setTimeout(() => {
      if (token !== activeTransition) return;
      if (layer.hasAttribute("data-engine-layer")) layer.classList.add("is-active");
      if (layer.hasAttribute("data-record-layer")) layer.classList.add("is-resolved");
      if (layer.matches(".summary-block, .stage-explainer, .engine-decision-card")) layer.classList.add("is-resolved");
    }, 70 + index * 34);
    transitionTimers.push(timer);
  });

  const settleTimer = window.setTimeout(() => {
    if (token !== activeTransition) return;
    hero.dataset.state = "settled";
    record.classList.remove("is-transitioning");
    lab?.classList.remove("is-switching");
  }, 70 + allLayers.length * 34 + 220);
  transitionTimers.push(settleTimer);
}

function renderState({ scenario = currentScenario, stage = currentStage, animate = true } = {}) {
  currentScenario = scenario;
  currentStage = stage;
  activeTransition += 1;
  const token = activeTransition;
  clearTransitionTimers();

  const hero = document.getElementById("heroEngine");
  const record = document.querySelector(".precedent-record");
  const lab = document.querySelector(".lab-shell");
  const shouldAnimate = animate && !reduceMotion();
  if (hero) hero.dataset.state = shouldAnimate ? "transitioning" : "settled";
  if (record) record.classList.toggle("is-transitioning", shouldAnimate);
  if (lab) lab.classList.toggle("is-switching", shouldAnimate);

  writeState(currentScenario, currentStage);
  settleLayers(token, animate);
}

function moveFocus(buttons, currentIndex, direction) {
  const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
  buttons[nextIndex].focus();
  buttons[nextIndex].click();
}

function wireRovingControls(selector) {
  const buttons = [...document.querySelectorAll(selector)];
  buttons.forEach((button, index) => {
    button.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") return buttons[0].focus(), buttons[0].click();
      if (event.key === "End") return buttons.at(-1).focus(), buttons.at(-1).click();
      const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
      moveFocus(buttons, index, direction);
    });
  });
}

function setupRevealObserver() {
  document.documentElement.classList.add("js");
  const elements = [...document.querySelectorAll(".reveal")];
  if (reduceMotion() || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  elements.forEach((element) => observer.observe(element));
  window.setTimeout(() => elements.forEach((element) => element.classList.add("is-visible")), 1200);
}

function setupNavigation() {
  const menuButton = document.getElementById("menuBtn");
  const nav = document.querySelector(".nav-shell");
  if (!menuButton || !nav) return;
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  document.querySelectorAll("#siteMenu a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }));
}

function setup() {
  ensureEnhancements();

  document.querySelectorAll(".scenario-btn").forEach((button) => {
    button.addEventListener("click", () => renderState({ scenario: button.dataset.scenario, stage: currentStage, animate: true }));
  });
  document.querySelectorAll(".stage-btn").forEach((button) => {
    button.addEventListener("click", () => renderState({ scenario: currentScenario, stage: button.dataset.stage, animate: true }));
  });
  document.getElementById("resetLab")?.addEventListener("click", () => renderState({ scenario: "corporate", stage: "practice", animate: true }));

  wireRovingControls(".scenario-btn");
  wireRovingControls(".stage-btn");
  setupNavigation();
  setupRevealObserver();
  renderState({ scenario: "corporate", stage: "practice", animate: true });

  window.__precedentEngine = {
    renderState,
    getState: () => ({ scenario: currentScenario, stage: currentStage })
  };
}

setup();
