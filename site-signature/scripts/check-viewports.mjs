#!/usr/bin/env node
// Passe une page sur dix tailles d'écran, mesure les défauts de mise en page et enregistre des captures.
// Usage : node check-viewports.mjs <url> [dossier-de-captures]
// Dépendance : playwright (npm i -D playwright). Utilise Chrome s'il est installé, sinon Chromium.
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const url = process.argv[2];
const out = process.argv[3] || 'captures';
if (!url) { console.error('Usage : node check-viewports.mjs <url> [dossier]'); process.exit(2); }

const VIEWPORTS = [
  { name: 'telephone-petit', width: 320, height: 568, touch: true },
  { name: 'telephone', width: 375, height: 812, touch: true },
  { name: 'telephone-paysage', width: 812, height: 375, touch: true },
  { name: 'tablette', width: 768, height: 1024, touch: true },
  { name: 'tablette-paysage', width: 1024, height: 768, touch: true },
  { name: 'portable', width: 1440, height: 900 },
  { name: 'bureau-1080p', width: 1920, height: 1080 },
  { name: 'bureau-1440p', width: 2560, height: 1440 },
  { name: 'ultralarge-21-9', width: 3440, height: 1440 },
  { name: 'tele-4k', width: 3840, height: 2160 },
];

const measure = (touch) => {
  const doc = document.documentElement;
  const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const texts = [...document.querySelectorAll('body *')].filter((el) =>
    visible(el) && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()));
  const sizes = texts.map((el) => parseFloat(getComputedStyle(el).fontSize));
  const inMain = texts.filter((el) => el.closest('main')).map((el) => el.getBoundingClientRect());
  const span = inMain.length ? Math.max(...inMain.map((r) => r.right)) - Math.min(...inMain.map((r) => r.left)) : 0;
  const targets = [...document.querySelectorAll('a, button, [role="button"], input, select')].filter(visible);
  const low = touch ? targets.filter((el) => el.getBoundingClientRect().height < 44).length : 0;
  const h1 = document.querySelector('h1');
  const h1Box = h1 && h1.getBoundingClientRect();
  return {
    overflow: doc.scrollWidth - innerWidth,
    fill: Math.round((Math.min(span, innerWidth) / innerWidth) * 100),
    minFont: sizes.length ? Math.min(...sizes) : 0,
    h1Font: h1 ? parseFloat(getComputedStyle(h1).fontSize) : 0,
    h1Visible: !!h1Box && h1Box.top >= 0 && h1Box.bottom <= innerHeight,
    lowTargets: low,
    targets: touch ? targets.length : 0,
    canvases: document.querySelectorAll('canvas').length,
  };
};

const { chromium } = await import('playwright').catch(() => {
  console.error('Playwright est absent : npm i -D playwright'); process.exit(2);
});
const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
await mkdir(out, { recursive: true });

const rows = [];
let failed = false;
for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    hasTouch: !!vp.touch, isMobile: !!vp.touch && vp.width < 900,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const m = await page.evaluate(measure, !!vp.touch);
  await page.screenshot({ path: join(out, `${vp.name}-${vp.width}x${vp.height}.png`) });
  await page.screenshot({ path: join(out, `${vp.name}-${vp.width}x${vp.height}-page.png`), fullPage: true });
  await context.close();

  const notes = [];
  if (m.overflow > 0) { notes.push(`déborde de ${m.overflow} px`); failed = true; }
  if (m.minFont < 12) notes.push(`texte à ${m.minFont.toFixed(1)} px`);
  if (m.lowTargets) notes.push(`${m.lowTargets}/${m.targets} cibles sous 44 px`);
  if (!m.h1Visible) notes.push('titre hors du premier écran');
  if (vp.width >= 1920 && m.fill < 60) notes.push(`contenu sur ${m.fill} % de la largeur`);
  rows.push({ écran: `${vp.name} ${vp.width}×${vp.height}`, 'h1 (px)': m.h1Font, 'largeur occupée': `${m.fill} %`, constats: notes.join(' ; ') || 'rien à signaler' });
}

// Mouvement réduit : la scène doit montrer une image fixe, aucune animation CSS ne tourne.
const calm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const calmPage = await calm.newPage();
await calmPage.goto(url, { waitUntil: 'networkidle' });
await calmPage.waitForTimeout(600);
const running = await calmPage.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
const shot = () => calmPage.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 900 } });
const a = await shot(); await calmPage.waitForTimeout(1200); const b = await shot();
await calmPage.screenshot({ path: join(out, 'mouvement-reduit-1440x900.png') });
await calm.close();
await browser.close();

console.table(rows);
const still = Buffer.compare(a, b) === 0;
console.log(`Mouvement réduit : ${running} animation(s) en cours, premier écran ${still ? 'fixe' : 'qui change encore'}.`);
console.log(`Captures dans ${out}/`);
process.exit(failed || !still || running ? 1 : 0);
