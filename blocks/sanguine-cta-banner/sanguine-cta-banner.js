/**
 * Sanguine CTA Banner block
 * Full-width red call-to-action strip with heading, description, and buttons.
 *
 * Authoring: key-value table rows
 * Supported keys:
 *   heading, description, cta-primary, cta-secondary  (links in cells)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const kv = {};
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const [keyCell, valueCell] = [...row.querySelectorAll(':scope > div')];
    if (keyCell && valueCell) {
      kv[keyCell.textContent.trim().toLowerCase()] = valueCell;
    }
  });

  const text = (key) => kv[key]?.textContent?.trim() || '';
  const link = (key) => kv[key]?.querySelector('a');

  const copyEl = document.createElement('div');
  copyEl.className = 'scb-copy';

  if (text('heading')) {
    const h2 = document.createElement('h2');
    h2.className = 'scb-heading';
    h2.textContent = text('heading');
    copyEl.append(h2);
  }

  if (kv.description) {
    const desc = document.createElement('p');
    desc.className = 'scb-desc';
    desc.innerHTML = kv.description.innerHTML;
    copyEl.append(desc);
  }

  const actionsEl = document.createElement('div');
  actionsEl.className = 'scb-actions';

  ['cta-primary', 'cta-secondary'].forEach((key, i) => {
    const a = link(key);
    if (!a) return;
    const btn = document.createElement('a');
    btn.href = a.href;
    btn.textContent = a.textContent.trim();
    btn.className = i === 0 ? 'scb-btn scb-btn-white' : 'scb-btn scb-btn-ghost';
    actionsEl.append(btn);
  });

  block.innerHTML = '';
  block.append(copyEl, actionsEl);
}
