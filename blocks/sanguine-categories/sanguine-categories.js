/**
 * Sanguine Categories block
 * Section header (title, subtitle, view-all link) + six-column category card grid.
 *
 * Authoring — optional header rows (key | value), then one category row per card:
 *   title       | Browse by Specimen Type
 *   subtitle    | Standardized, QC-verified biospecimens...
 *   view-all    | [link: View all categories →]
 *   🫀           | PBMCs         | 342 products | [link]
 *
 * @param {Element} block
 */
import { moveInstrumentation } from '../../scripts/ue-utils.js';

const HEADER_KEYS = new Set(['title', 'subtitle', 'view-all']);

export default function decorate(block) {
  if (block.hasAttribute('data-aue-resource')) block.setAttribute('data-aue-type', 'component');

  const kv = {};
  const categoryRows = [];

  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const key = cells[0]?.textContent?.trim().toLowerCase();
    if (cells.length === 2 && HEADER_KEYS.has(key)) {
      kv[key] = { cell: cells[1], row };
    } else {
      categoryRows.push({ cells, row });
    }
  });

  block.innerHTML = '';

  // --- Section header ---
  const hasHeader = kv.title || kv.subtitle || kv['view-all'];
  if (hasHeader) {
    const header = document.createElement('div');
    header.className = 'sc-header';

    const textGroup = document.createElement('div');
    textGroup.className = 'sc-header-text';

    if (kv.title) {
      const h2 = document.createElement('h2');
      h2.className = 'sc-title';
      h2.textContent = kv.title.cell.textContent.trim();
      moveInstrumentation(kv.title.cell, h2);
      textGroup.append(h2);
    }

    if (kv.subtitle) {
      const p = document.createElement('p');
      p.className = 'sc-subtitle';
      p.textContent = kv.subtitle.cell.textContent.trim();
      moveInstrumentation(kv.subtitle.cell, p);
      textGroup.append(p);
    }

    header.append(textGroup);

    if (kv['view-all']) {
      const a = kv['view-all'].cell.querySelector('a');
      if (a) {
        const btn = document.createElement('a');
        btn.href = a.href;
        btn.className = 'sc-view-all';
        btn.textContent = a.textContent.trim();
        moveInstrumentation(kv['view-all'].cell, btn);
        header.append(btn);
      }
    }

    block.append(header);
  }

  // --- Cards grid ---
  const grid = document.createElement('div');
  grid.className = 'sc-grid';

  categoryRows.forEach(({ cells, row }) => {
    const [iconCell, nameCell, countCell, linkCell] = cells;
    const icon = iconCell?.textContent?.trim() || '';
    const name = nameCell?.textContent?.trim() || '';
    const count = countCell?.textContent?.trim() || '';
    const href = linkCell?.querySelector('a')?.href || linkCell?.textContent?.trim() || '#';

    const card = document.createElement('a');
    card.href = href;
    card.className = 'sc-card';
    moveInstrumentation(row, card);

    const iconEl = document.createElement('span');
    iconEl.className = 'sc-icon';
    iconEl.textContent = icon;
    if (iconCell) moveInstrumentation(iconCell, iconEl);

    const nameEl = document.createElement('span');
    nameEl.className = 'sc-name';
    nameEl.textContent = name;
    if (nameCell) moveInstrumentation(nameCell, nameEl);

    const countEl = document.createElement('span');
    countEl.className = 'sc-count';
    countEl.textContent = count;
    if (countCell) moveInstrumentation(countCell, countEl);

    card.append(iconEl, nameEl, countEl);
    grid.append(card);
  });

  block.append(grid);
}
