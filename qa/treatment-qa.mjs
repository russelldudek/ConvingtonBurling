import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const target = process.env.QA_TARGET || 'http://127.0.0.1:4173/index-direct.html';
const prefix = process.env.QA_PREFIX || 'local';
const outDir = 'qa-output';
await fs.mkdir(outDir, { recursive: true });

const results = {
  target,
  prefix,
  started_at: new Date().toISOString(),
  checks: [],
  console_errors: [],
  screenshots: []
};

function check(name, condition, detail = '') {
  results.checks.push({ name, pass: Boolean(condition), detail });
  if (!condition) throw new Error(`${name}: ${detail}`);
}

async function stateSnapshot(page) {
  return page.evaluate(() => ({
    state: window.__precedentEngine?.getState(),
    treatment: document.body.dataset.treatment,
    summaryTreatment: document.querySelector('#summaryTreatment')?.textContent.trim(),
    permission: document.querySelector('#summaryPermission')?.textContent.trim(),
    proof: document.querySelector('#summaryProof')?.textContent.trim(),
    owner: document.querySelector('#summaryOwner')?.textContent.trim(),
    decision: document.querySelector('#summaryDecision')?.textContent.trim(),
    fact: document.querySelector('#fact')?.textContent.trim(),
    knowledge: document.querySelector('#knowledge')?.textContent.trim(),
    authority: document.querySelector('#authority')?.textContent.trim(),
    evaluation: document.querySelector('#evaluation')?.textContent.trim(),
    adoption: document.querySelector('#adoption')?.textContent.trim(),
    value: document.querySelector('#value')?.textContent.trim(),
    heroFact: document.querySelector('[data-engine-layer="fact"] [data-field="factShort"]')?.textContent.trim(),
    details: [...document.querySelectorAll('.layer-details')].map((node) => node.children.length),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
  }));
}

const browser = await chromium.launch({ headless: true });
try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await desktop.newPage();
  page.on('console', (message) => {
    if (message.type() === 'error') results.console_errors.push(message.text());
  });
  page.on('pageerror', (error) => results.console_errors.push(error.message));
  await page.goto(target, { waitUntil: 'networkidle' });
  await page.waitForSelector('.treatment-summary');
  await page.waitForFunction(() => window.__precedentEngine?.getState().stage === 'practice');

  let snapshot = await stateSnapshot(page);
  check('default state is Corporate / Practice pattern', snapshot.state?.scenario === 'corporate' && snapshot.state?.stage === 'practice', JSON.stringify(snapshot.state));
  check('six evidence layers expose three treatment requirements', snapshot.details.length === 6 && snapshot.details.every((count) => count === 3), JSON.stringify(snapshot.details));
  check('default treatment summary is present', snapshot.summaryTreatment === 'Practice pattern', snapshot.summaryTreatment);
  check('desktop has no horizontal overflow', snapshot.overflow <= 1, String(snapshot.overflow));

  await page.locator('[data-stage="candidate"]').click();
  await page.waitForFunction(() => window.__precedentEngine?.getState().stage === 'candidate');
  await page.waitForTimeout(1200);
  snapshot = await stateSnapshot(page);
  check('candidate treatment updates scale permission', snapshot.permission.includes('Limited transfer'), snapshot.permission);
  check('candidate treatment updates proof burden', snapshot.proof.includes('another practice context'), snapshot.proof);
  check('candidate treatment updates ownership', snapshot.owner.includes('receiving practice'), snapshot.owner);
  check('candidate treatment rewrites fact pattern', snapshot.fact.includes('reusable workflow mechanics'), snapshot.fact);
  check('candidate treatment rewrites knowledge record', snapshot.knowledge.includes('equivalent authoritative sources'), snapshot.knowledge);
  check('candidate treatment rewrites human authority', snapshot.authority.includes('co-review'), snapshot.authority);
  check('candidate treatment rewrites evaluation', snapshot.evaluation.includes('Compare performance'), snapshot.evaluation);
  check('candidate treatment rewrites adoption', snapshot.adoption.includes('receiving-practice owner'), snapshot.adoption);
  check('candidate treatment rewrites value evidence', snapshot.value.includes('cost of adaptation'), snapshot.value);
  check('candidate treatment updates hero evidence tower', snapshot.heroFact.includes('Invariant workflow'), snapshot.heroFact);

  const desktopShot = path.join(outDir, `${prefix}-candidate-desktop.png`);
  await page.screenshot({ path: desktopShot, fullPage: false });
  results.screenshots.push(desktopShot);

  await page.locator('[data-stage="standard"]').click();
  await page.waitForTimeout(1000);
  snapshot = await stateSnapshot(page);
  check('firm standard introduces lifecycle governance', snapshot.evaluation.includes('regression suite') && snapshot.decision.includes('revalidate'), `${snapshot.evaluation} | ${snapshot.decision}`);

  await page.locator('[data-stage="prototype"]').click();
  await page.locator('[data-stage="standard"]').click();
  await page.locator('[data-stage="candidate"]').click();
  await page.waitForTimeout(1400);
  snapshot = await stateSnapshot(page);
  check('rapid selection leaves final request authoritative', snapshot.state?.stage === 'candidate' && snapshot.summaryTreatment === 'Cross-practice candidate', JSON.stringify(snapshot.state));

  await page.locator('[data-stage="practice"]').focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(900);
  snapshot = await stateSnapshot(page);
  check('keyboard arrow advances treatment state', snapshot.state?.stage === 'candidate', JSON.stringify(snapshot.state));

  await page.locator('[data-scenario="whitecollar"]').click();
  await page.locator('[data-stage="prototype"]').click();
  await page.waitForTimeout(1000);
  snapshot = await stateSnapshot(page);
  check('workflow and treatment compose atomically', snapshot.state?.scenario === 'whitecollar' && snapshot.state?.stage === 'prototype' && snapshot.fact.includes('sensitive investigation') && snapshot.permission.includes('named matter'), JSON.stringify(snapshot.state));
  check('no relevant console errors on desktop', results.console_errors.length === 0, results.console_errors.join(' | '));
  await desktop.close();

  for (const viewport of [
    { width: 1280, height: 900, name: 'laptop' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 390, height: 844, name: 'mobile390' },
    { width: 320, height: 800, name: 'mobile320' }
  ]) {
    const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
    const responsivePage = await context.newPage();
    const errors = [];
    responsivePage.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    responsivePage.on('pageerror', (error) => errors.push(error.message));
    await responsivePage.goto(target, { waitUntil: 'networkidle' });
    await responsivePage.waitForSelector('.treatment-summary');
    await responsivePage.locator('[data-stage="candidate"]').click();
    await responsivePage.waitForTimeout(1100);
    const responsive = await stateSnapshot(responsivePage);
    check(`${viewport.name} has no horizontal overflow`, responsive.overflow <= 1, String(responsive.overflow));
    check(`${viewport.name} renders treatment summary`, responsive.summaryTreatment === 'Cross-practice candidate', responsive.summaryTreatment);
    check(`${viewport.name} keeps all six layer requirement groups`, responsive.details.length === 6 && responsive.details.every((count) => count === 3), JSON.stringify(responsive.details));
    check(`${viewport.name} has no relevant console errors`, errors.length === 0, errors.join(' | '));
    if (viewport.name === 'mobile390' || viewport.name === 'mobile320') {
      const shot = path.join(outDir, `${prefix}-${viewport.name}.png`);
      await responsivePage.screenshot({ path: shot, fullPage: false });
      results.screenshots.push(shot);
    }
    await context.close();
  }

  const reduced = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const reducedPage = await reduced.newPage();
  await reducedPage.goto(target, { waitUntil: 'networkidle' });
  await reducedPage.waitForSelector('.treatment-summary');
  await reducedPage.locator('[data-stage="standard"]').click();
  const reducedState = await reducedPage.evaluate(() => ({
    state: window.__precedentEngine?.getState(),
    unresolvedLayers: document.querySelectorAll('[data-record-layer]:not(.is-resolved)').length,
    unresolvedSummary: document.querySelectorAll('.summary-block:not(.is-resolved)').length,
    heroState: document.querySelector('#heroEngine')?.dataset.state
  }));
  check('reduced motion resolves complete state immediately', reducedState.state?.stage === 'standard' && reducedState.unresolvedLayers === 0 && reducedState.unresolvedSummary === 0 && reducedState.heroState === 'settled', JSON.stringify(reducedState));
  await reduced.close();

  results.outcome = 'success';
} catch (error) {
  results.outcome = 'failure';
  results.error = error.stack || error.message;
  throw error;
} finally {
  results.finished_at = new Date().toISOString();
  await fs.writeFile(path.join(outDir, `${prefix}-report.json`), JSON.stringify(results, null, 2));
  await browser.close();
}
