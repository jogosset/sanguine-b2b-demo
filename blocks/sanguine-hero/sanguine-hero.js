/**
 * Sanguine Hero block
 * Full-bleed dark hero with heading, description, dual CTAs, stat strip,
 * and a 2×2 live-data card grid.
 *
 * Authoring: key-value table rows (first cell = key, second = value)
 *
 * @param {Element} block
 */
import { moveInstrumentation } from '../../scripts/ue-utils.js';

export default function decorate(block) {
  // --- Parse key-value rows, preserving original cells for UE instrumentation ---
  const kv = {};
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const [keyCell, valueCell] = [...row.querySelectorAll(':scope > div')];
    if (keyCell && valueCell) {
      kv[keyCell.textContent.trim().toLowerCase()] = valueCell;
    }
  });

  // --- Helpers ---
  const text = (key) => kv[key]?.textContent?.trim() || '';
  const link = (key) => kv[key]?.querySelector('a');

  // --- Heading with accent word highlighted ---
  const headingText = text('heading');
  const accentWord = text('heading-accent');
  const h1 = document.createElement('h1');
  h1.className = 'sh-heading';
  if (accentWord && headingText.includes(accentWord)) {
    h1.innerHTML = headingText.replace(accentWord, `<span>${accentWord}</span>`);
  } else {
    h1.textContent = headingText;
  }
  if (kv.heading) moveInstrumentation(kv.heading, h1);

  // --- Description ---
  const desc = document.createElement('p');
  desc.className = 'sh-desc';
  desc.innerHTML = kv.description?.innerHTML || '';
  if (kv.description) moveInstrumentation(kv.description, desc);

  // --- CTAs ---
  const ctasEl = document.createElement('div');
  ctasEl.className = 'sh-ctas';
  ['cta-primary', 'cta-secondary'].forEach((key, i) => {
    const a = link(key);
    if (!a) return;
    const btn = document.createElement('a');
    btn.href = a.href;
    btn.textContent = a.textContent.trim();
    btn.className = i === 0 ? 'sh-btn sh-btn-primary' : 'sh-btn sh-btn-ghost';
    if (kv[key]) moveInstrumentation(kv[key], btn);
    ctasEl.append(btn);
  });

  // --- Stats strip ---
  const stats = [];
  for (let i = 1; i <= 8; i += 1) {
    const cell = kv[`stat-${i}`];
    if (!cell) break;
    const val = cell.textContent.trim();
    const [statVal, statLabel] = val.split('|').map((s) => s.trim());
    if (statVal) stats.push({ statVal, statLabel, cell });
  }

  const statsEl = document.createElement('div');
  statsEl.className = 'sh-stats';
  stats.forEach(({ statVal, statLabel, cell }) => {
    const stat = document.createElement('div');
    stat.className = 'sh-stat';
    stat.innerHTML = `<span class="sh-stat-val">${statVal}</span><span class="sh-stat-label">${statLabel || ''}</span>`;
    moveInstrumentation(cell, stat);
    statsEl.append(stat);
  });

  // --- Content column ---
  const content = document.createElement('div');
  content.className = 'sh-content';

  if (text('eyebrow')) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'sh-eyebrow';
    eyebrow.textContent = text('eyebrow');
    if (kv.eyebrow) moveInstrumentation(kv.eyebrow, eyebrow);
    content.append(eyebrow);
  }

  content.append(h1, desc, ctasEl);
  if (stats.length) content.append(statsEl);

  // --- Data cards ---
  const cards = [];
  for (let i = 1; i <= 4; i += 1) {
    const labelCell = kv[`card-${i}-label`];
    const valCell = kv[`card-${i}-value`];
    if (!labelCell && !valCell) break;
    cards.push({
      label: labelCell?.textContent?.trim(),
      val: valCell?.textContent?.trim(),
      sub: kv[`card-${i}-sub`]?.textContent?.trim(),
      mono: kv[`card-${i}-mono`]?.textContent?.trim(),
      cells: {
        label: labelCell, val: valCell, sub: kv[`card-${i}-sub`], mono: kv[`card-${i}-mono`],
      },
      featured: i === 1,
    });
  }

  // --- Assemble ---
  block.innerHTML = '';
  if (block.hasAttribute('data-aue-resource')) block.setAttribute('data-aue-type', 'component');

  block.append(content);

  if (cards.length) {
    const visual = document.createElement('div');
    visual.className = 'sh-visual';
    cards.forEach(({
      label, val, sub, mono, cells, featured,
    }) => {
      const card = document.createElement('div');
      card.className = `sh-card${featured ? ' sh-card-featured' : ''}`;
      if (label) {
        const el = document.createElement('span');
        el.className = 'sh-card-label';
        el.textContent = label;
        if (cells.label) moveInstrumentation(cells.label, el);
        card.append(el);
      }
      if (val) {
        const el = document.createElement('span');
        el.className = 'sh-card-val';
        el.textContent = val;
        if (cells.val) moveInstrumentation(cells.val, el);
        card.append(el);
      }
      if (sub) {
        const el = document.createElement('span');
        el.className = 'sh-card-sub';
        el.textContent = sub;
        if (cells.sub) moveInstrumentation(cells.sub, el);
        card.append(el);
      }
      if (mono) {
        const el = document.createElement('span');
        el.className = 'sh-card-mono';
        el.textContent = mono;
        if (cells.mono) moveInstrumentation(cells.mono, el);
        card.append(el);
      }
      visual.append(card);
    });
    block.append(visual);
  }
}
