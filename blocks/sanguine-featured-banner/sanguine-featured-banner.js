/**
 * Sanguine Featured Banner block
 * Full-width dark promotional banner with heading accent, description,
 * CTAs, and right-side stat cards.
 *
 * Authoring: key-value table rows
 * Supported keys:
 *   eyebrow, heading, heading-accent, description
 *   cta-primary, cta-secondary  (authored as links)
 *   stat-1 … stat-N             ("icon | value | label")
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

  const text = (key) => kv[key]?.textContent?.trim() || '';
  const link = (key) => kv[key]?.querySelector('a');

  // --- Heading: main line (white) + accent line (orange) below ---
  const headingText = text('heading');
  const accentText = text('heading-accent');
  const h2 = document.createElement('h2');
  h2.className = 'sfb-heading';
  if (accentText) {
    h2.innerHTML = `${headingText}<br><span class="sfb-accent">${accentText}</span>`;
  } else {
    h2.textContent = headingText;
  }

  // --- Content column ---
  const content = document.createElement('div');
  content.className = 'sfb-content';

  if (text('eyebrow')) {
    const eyebrow = document.createElement('p');
    eyebrow.className = 'sfb-eyebrow';
    eyebrow.textContent = text('eyebrow');
    content.append(eyebrow);
  }

  content.append(h2);

  if (kv.description) {
    const desc = document.createElement('p');
    desc.className = 'sfb-desc';
    desc.innerHTML = kv.description.innerHTML;
    content.append(desc);
  }

  const ctasEl = document.createElement('div');
  ctasEl.className = 'sfb-ctas';
  ['cta-primary', 'cta-secondary'].forEach((key, i) => {
    const a = link(key);
    if (!a) return;
    const btn = document.createElement('a');
    btn.href = a.href;
    btn.textContent = a.textContent.trim();
    btn.className = i === 0 ? 'sfb-btn sfb-btn-primary' : 'sfb-btn sfb-btn-ghost';
    ctasEl.append(btn);
  });
  content.append(ctasEl);

  // --- Stat cards column ---
  const stats = [];
  for (let i = 1; i <= 8; i += 1) {
    const val = text(`stat-${i}`);
    if (!val) break;
    const parts = val.split('|').map((s) => s.trim());
    stats.push({ icon: parts[0], statVal: parts[1], label: parts[2] });
  }

  // --- Assemble ---
  block.innerHTML = '';
  block.append(content);

  if (stats.length) {
    const visual = document.createElement('div');
    visual.className = 'sfb-visual';
    stats.forEach(({ icon, statVal, label }) => {
      const card = document.createElement('div');
      card.className = 'sfb-stat-card';
      if (icon) card.innerHTML += `<span class="sfb-stat-icon">${icon}</span>`;
      const info = document.createElement('div');
      if (statVal) info.innerHTML += `<span class="sfb-stat-val">${statVal}</span>`;
      if (label) info.innerHTML += `<span class="sfb-stat-label">${label}</span>`;
      card.append(info);
      visual.append(card);
    });
    block.append(visual);
  }
}
