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
    treatments: {
      prototype: ["Matter prototype", "Bound the pilot and retain attorney review on every output."],
      practice: ["Practice pattern", "Prove across representative matters and document the legitimate exceptions."],
      candidate: ["Cross-practice candidate", "Test reusable components against another practice fact pattern before standardizing."],
      standard: ["Firm standard", "Maintain evaluation, knowledge ownership, exception rules, and retirement criteria."]
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
    treatments: {
      prototype: ["Matter prototype", "Use inside a bounded review lane with heightened supervision."],
      practice: ["Practice pattern", "Separate reusable synthesis mechanics from matter-specific privilege and strategy rules."],
      candidate: ["Cross-practice candidate", "Reuse citation and chronology controls; do not export matter strategy assumptions."],
      standard: ["Firm standard", "Standardize the control pattern, not the legal judgment."]
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
    treatments: {
      prototype: ["Matter prototype", "Test source coverage and change detection before drafting assistance."],
      practice: ["Practice pattern", "Define jurisdiction limits, source ownership, and attorney review rules."],
      candidate: ["Cross-practice candidate", "Reuse monitoring mechanics where source taxonomies and authority rules align."],
      standard: ["Firm standard", "Maintain the source registry and revalidate when law, policy, or models change."]
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
    treatments: {
      prototype: ["Matter prototype", "Use heightened controls, narrow access, and no autonomous consequential action."],
      practice: ["Practice pattern", "Capture the technical pattern while keeping matter-specific access and strategy local."],
      candidate: ["Cross-practice candidate", "Transfer provenance and chronology controls, not investigative assumptions."],
      standard: ["Firm standard", "Standardize only the controls that remain defensible across sensitive matters."]
    }
  }
};

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

function writeState(scenarioKey, stageKey) {
  const scenario = scenarios[scenarioKey];
  const [disposition, nextDecision] = scenario.treatments[stageKey];
  const fields = {
    scenarioShort: scenario.short,
    factShort: scenario.factShort,
    knowledgeShort: scenario.knowledgeShort,
    authorityShort: scenario.authorityShort,
    evaluationShort: scenario.evaluationShort,
    adoptionShort: scenario.adoptionShort,
    valueShort: scenario.valueShort,
    disposition
  };

  Object.entries(fields).forEach(([field, value]) => setText(`[data-field="${field}"]`, value));

  const idValues = {
    scenarioTitle: scenario.title,
    scenarioSummary: scenario.summary,
    fact: scenario.fact,
    knowledge: scenario.knowledge,
    authority: scenario.authority,
    evaluation: scenario.evaluation,
    adoption: scenario.adoption,
    value: scenario.value,
    labDisposition: disposition,
    nextDecision
  };

  Object.entries(idValues).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  document.querySelectorAll(".scenario-btn").forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.scenario === scenarioKey));
    button.tabIndex = button.dataset.scenario === scenarioKey ? 0 : -1;
  });

  document.querySelectorAll(".stage-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.stage === stageKey));
    button.tabIndex = button.dataset.stage === stageKey ? 0 : -1;
  });

  const announcement = document.getElementById("stateAnnouncement");
  if (announcement) announcement.textContent = `${scenario.title}. ${disposition}. ${nextDecision}`;
}

function settleLayers(token, animate) {
  const hero = document.getElementById("heroEngine");
  const record = document.querySelector(".precedent-record");
  const heroLayers = [...document.querySelectorAll("[data-engine-layer]")];
  const recordLayers = [...document.querySelectorAll("[data-record-layer]")];
  const allLayers = [...heroLayers, ...recordLayers];

  if (!hero || !record) return;

  heroLayers.forEach((layer) => layer.classList.remove("is-active"));
  recordLayers.forEach((layer) => layer.classList.remove("is-resolved"));

  if (!animate || reduceMotion()) {
    heroLayers.forEach((layer) => layer.classList.add("is-active"));
    recordLayers.forEach((layer) => layer.classList.add("is-resolved"));
    hero.dataset.state = "settled";
    record.classList.remove("is-transitioning");
    return;
  }

  allLayers.forEach((layer, index) => {
    const timer = window.setTimeout(() => {
      if (token !== activeTransition) return;
      if (layer.hasAttribute("data-engine-layer")) layer.classList.add("is-active");
      if (layer.hasAttribute("data-record-layer")) layer.classList.add("is-resolved");
    }, 90 + index * 42);
    transitionTimers.push(timer);
  });

  const settleTimer = window.setTimeout(() => {
    if (token !== activeTransition) return;
    hero.dataset.state = "settled";
    record.classList.remove("is-transitioning");
  }, 90 + allLayers.length * 42 + 260);
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
  if (hero) hero.dataset.state = animate && !reduceMotion() ? "transitioning" : "settled";
  if (record) record.classList.toggle("is-transitioning", animate && !reduceMotion());

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
}

setup();
