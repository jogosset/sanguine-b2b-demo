/**
 * Sanguine Categories block
 * Section header (title, subtitle, view-all link) + six-column category card grid.
 *
 * Authoring — optional header rows (key | value), then one category row per card:
 *   title       | Browse by Specimen Type
 *   subtitle    | Standardized, QC-verified biospecimens...
 *   view-all    | [link: View all categories →]
 *   🫀           | PBMCs         | 342 products | [link]
 *   🩸           | Whole Blood   | 218 products | [link]
 *   ...
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const HEADER_KEYS = new Set(['title', 'subtitle', 'view-all']);
  const kv = {};
  const categoryRows = [];

  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const key = cells[0]?.textContent?.trim().toLowerCase();
    if (cells.length === 2 && HEADER_KEYS.has(key)) {
      kv[key] = cells[1];
    } else {
      categoryRows.push(cells);
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
      h2.textContent = kv.title.textContent.trim();
      textGroup.append(h2);
    }

    if (kv.subtitle) {
      const p = document.createElement('p');
      p.className = 'sc-subtitle';
      p.textContent = kv.subtitle.textContent.trim();
      textGroup.append(p);
    }

    header.append(textGroup);

    if (kv['view-all']) {
      const a = kv['view-all'].querySelector('a');
      if (a) {
        const btn = document.createElement('a');
        btn.href = a.href;
        btn.className = 'sc-view-all';
        btn.textContent = a.textContent.trim();
        header.append(btn);
      }
    }

    block.append(header);
  }

  // --- Cards grid ---
  const grid = document.createElement('div');
  grid.className = 'sc-grid';

  categoryRows.forEach((cells) => {
    const [iconCell, nameCell, countCell, linkCell] = cells;
    const icon = iconCell?.textContent?.trim() || '';
    const name = nameCell?.textContent?.trim() || '';
    const count = countCell?.textContent?.trim() || '';
    const href = linkCell?.querySelector('a')?.href || linkCell?.textContent?.trim() || '#';

    const card = document.createElement('a');
    card.href = href;
    card.className = 'sc-card';

    const iconEl = document.createElement('span');
    iconEl.className = 'sc-icon';
    iconEl.textContent = icon;

    const nameEl = document.createElement('span');
    nameEl.className = 'sc-name';
    nameEl.textContent = name;

    const countEl = document.createElement('span');
    countEl.className = 'sc-count';
    countEl.textContent = count;

    card.append(iconEl, nameEl, countEl);
    grid.append(card);
  });

  block.append(grid);
}
