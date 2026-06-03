/**
 * Sanguine CTA Banner block
 * Full-width red call-to-action strip.
 *
 * Authoring: key-value table rows
 *
 * @param {Element} block
 */
import { moveInstrumentation } from '../../scripts/ue-utils.js';

export default function decorate(block) {
  if (block.hasAttribute('data-aue-resource')) block.setAttribute('data-aue-type', 'component');

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
    if (kv.heading) moveInstrumentation(kv.heading, h2);
    copyEl.append(h2);
  }

  if (kv.description) {
    const desc = document.createElement('p');
    desc.className = 'scb-desc';
    desc.innerHTML = kv.description.innerHTML;
    moveInstrumentation(kv.description, desc);
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
    if (kv[key]) moveInstrumentation(kv[key], btn);
    actionsEl.append(btn);
  });

  block.innerHTML = '';
  block.append(copyEl, actionsEl);
}
