/**
 * Sanguine Hero block
 * Full-bleed dark hero with heading, description, dual CTAs, stat strip,
 * and a 2×2 live-data card grid on the right.
 *
 * Authoring: key-value table rows (first cell = key, second = value)
 * Supported keys:
 *   eyebrow, heading, heading-accent, description
 *   cta-primary, cta-secondary  (authored as links in the cell)
 *   stat-1 … stat-N             ("Value | Label")
 *   card-1-label … card-4-mono  (label, value, sub, mono per card)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  // --- Parse key-value rows ---
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

  // --- Description ---
  const desc = document.createElement('p');
  desc.className = 'sh-desc';
  desc.innerHTML = kv.description?.innerHTML || '';

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
    ctasEl.append(btn);
  });

  // --- Stats strip ---
  const stats = [];
  for (let i = 1; i <= 8; i += 1) {
    const val = text(`stat-${i}`);
    if (!val) break;
    const [statVal, statLabel] = val.split('|').map((s) => s.trim());
    if (statVal) stats.push({ statVal, statLabel });
  }

  const statsEl = document.createElement('div');
  statsEl.className = 'sh-stats';
  stats.forEach(({ statVal, statLabel }) => {
    const stat = document.createElement('div');
    stat.className = 'sh-stat';
    stat.innerHTML = `<span class="sh-stat-val">${statVal}</span><span class="sh-stat-label">${statLabel || ''}</span>`;
    statsEl.append(stat);
  });

  // --- Content column ---
  const content = document.createElement('div');
  content.className = 'sh-content';

  if (text('eyebrow')) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'sh-eyebrow';
    eyebrow.textContent = text('eyebrow');
    content.append(eyebrow);
  }

  content.append(h1, desc, ctasEl);
  if (stats.length) content.append(statsEl);

  // --- Data cards (right visual column) ---
  const cards = [];
  for (let i = 1; i <= 4; i += 1) {
    const cardLabel = text(`card-${i}-label`);
    const cardVal = text(`card-${i}-value`);
    if (!cardLabel && !cardVal) break;
    cards.push({
      label: cardLabel,
      val: cardVal,
      sub: text(`card-${i}-sub`),
      mono: text(`card-${i}-mono`),
      featured: i === 1,
    });
  }

  // --- Assemble block ---
  block.innerHTML = '';
  block.append(content);

  if (cards.length) {
    const visual = document.createElement('div');
    visual.className = 'sh-visual';
    cards.forEach(({
      label, val, sub, mono, featured,
    }) => {
      const card = document.createElement('div');
      card.className = `sh-card${featured ? ' sh-card-featured' : ''}`;
      if (label) card.innerHTML += `<span class="sh-card-label">${label}</span>`;
      if (val) card.innerHTML += `<span class="sh-card-val">${val}</span>`;
      if (sub) card.innerHTML += `<span class="sh-card-sub">${sub}</span>`;
      if (mono) card.innerHTML += `<span class="sh-card-mono">${mono}</span>`;
      visual.append(card);
    });
    block.append(visual);
  }
}
