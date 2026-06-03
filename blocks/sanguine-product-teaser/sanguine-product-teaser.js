/**
 * Sanguine Product Teaser block
 * Section header + filter bar + 3-column × N-row product card grid.
 *
 * Authoring — header key-value rows, then one product row per card (7+ cells):
 *   title     | Featured Products
 *   subtitle  | Top-ordered biospecimens...
 *   view-all  | [link: View full catalog →]
 *   filters   | All | Healthy Donors | ...
 *   emoji | category | name | sku | badge | spec… | price | [optional CTA]
 *
 * @param {Element} block
 */
import { moveInstrumentation } from '../../scripts/ue-utils.js';

const HEADER_KEYS = new Set(['title', 'subtitle', 'view-all', 'filters']);

function badgeClass(label) {
  const l = label.toLowerCase();
  if (l.includes('low stock')) return 'spt-badge spt-badge--low';
  if (l.includes('in stock')) return 'spt-badge spt-badge--instock';
  if (l.includes('best seller')) return 'spt-badge spt-badge--seller';
  if (l.includes('gmp')) return 'spt-badge spt-badge--gmp';
  return 'spt-badge';
}

function buildHeader(kv) {
  const header = document.createElement('div');
  header.className = 'spt-header';

  const textGroup = document.createElement('div');
  textGroup.className = 'spt-header-text';
  if (kv.title) {
    const h2 = document.createElement('h2');
    h2.className = 'spt-title';
    h2.textContent = kv.title.cell.textContent.trim();
    moveInstrumentation(kv.title.cell, h2);
    textGroup.append(h2);
  }
  if (kv.subtitle) {
    const p = document.createElement('p');
    p.className = 'spt-subtitle';
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
      btn.className = 'spt-view-all';
      btn.textContent = a.textContent.trim();
      moveInstrumentation(kv['view-all'].cell, btn);
      header.append(btn);
    }
  }
  return header;
}

function buildFilters(filterCell) {
  const options = filterCell.textContent.trim().split('|').map((f) => f.trim()).filter(Boolean);
  if (!options.length) return null;

  const bar = document.createElement('div');
  bar.className = 'spt-filters';

  const label = document.createElement('span');
  label.className = 'spt-filter-label';
  label.textContent = 'Filter:';
  bar.append(label);

  options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `spt-filter${i === 0 ? ' active' : ''}`;
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.spt-filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
    bar.append(btn);
  });
  return bar;
}

function buildCard(cells) {
  const emoji = cells[0]?.textContent?.trim() || '';
  const category = cells[1]?.textContent?.trim() || '';
  const name = cells[2]?.textContent?.trim() || '';
  const sku = cells[3]?.textContent?.trim() || '';
  const badgeRaw = cells[4]?.textContent?.trim() || '';

  const last = cells.length - 1;
  const priceText = cells[last]?.textContent?.trim() || '';
  const isCtaOverride = priceText && !priceText.startsWith('$') && !priceText.includes('€');
  const ctaLabel = isCtaOverride ? priceText : 'Add to Cart';
  const priceIdx = isCtaOverride ? last - 1 : last;
  const price = cells[priceIdx]?.textContent?.trim() || '';
  const specCells = cells.slice(5, priceIdx);

  const imgArea = document.createElement('div');
  imgArea.className = 'spt-card-img';

  const emojiEl = document.createElement('span');
  emojiEl.className = 'spt-emoji';
  emojiEl.textContent = emoji;
  if (cells[0]) moveInstrumentation(cells[0], emojiEl);
  imgArea.append(emojiEl);

  if (badgeRaw) {
    const badgesEl = document.createElement('div');
    badgesEl.className = 'spt-badges';
    badgeRaw.split('|').map((b) => b.trim()).filter(Boolean).forEach((badge) => {
      const el = document.createElement('span');
      el.className = badgeClass(badge);
      el.textContent = badge;
      badgesEl.append(el);
    });
    if (cells[4]) moveInstrumentation(cells[4], badgesEl);
    imgArea.append(badgesEl);
  }

  const body = document.createElement('div');
  body.className = 'spt-card-body';

  if (category) {
    const catEl = document.createElement('p');
    catEl.className = 'spt-category';
    catEl.textContent = category;
    if (cells[1]) moveInstrumentation(cells[1], catEl);
    body.append(catEl);
  }

  const nameEl = document.createElement('h3');
  nameEl.className = 'spt-name';
  nameEl.textContent = name;
  if (cells[2]) moveInstrumentation(cells[2], nameEl);
  body.append(nameEl);

  if (sku) {
    const skuEl = document.createElement('p');
    skuEl.className = 'spt-sku';
    skuEl.textContent = `SKU: ${sku}`;
    if (cells[3]) moveInstrumentation(cells[3], skuEl);
    body.append(skuEl);
  }

  if (specCells.length) {
    const specs = document.createElement('div');
    specs.className = 'spt-specs';
    specCells.forEach((cell) => {
      const specText = cell.textContent.trim();
      if (specText) {
        const tag = document.createElement('span');
        tag.className = 'spt-spec';
        tag.textContent = specText;
        moveInstrumentation(cell, tag);
        specs.append(tag);
      }
    });
    body.append(specs);
  }

  const footer = document.createElement('div');
  footer.className = 'spt-card-footer';

  const priceEl = document.createElement('span');
  priceEl.className = 'spt-price';
  const slashIdx = price.indexOf('/');
  if (slashIdx !== -1) {
    priceEl.innerHTML = `${price.slice(0, slashIdx).trim()} <span class="spt-price-unit">/ ${price.slice(slashIdx + 1).trim()}</span>`;
  } else {
    priceEl.textContent = price;
  }
  if (cells[priceIdx]) moveInstrumentation(cells[priceIdx], priceEl);
  footer.append(priceEl);

  const cta = document.createElement('button');
  cta.type = 'button';
  cta.className = 'spt-cta';
  cta.textContent = ctaLabel;
  footer.append(cta);

  body.append(footer);

  const card = document.createElement('div');
  card.className = 'spt-card';
  card.append(imgArea, body);
  return card;
}

export default function decorate(block) {
  if (block.hasAttribute('data-aue-resource')) block.setAttribute('data-aue-type', 'component');

  const kv = {};
  const productRows = [];

  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const key = cells[0]?.textContent?.trim().toLowerCase();
    if (cells.length === 2 && HEADER_KEYS.has(key)) {
      kv[key] = { cell: cells[1], row };
    } else if (cells.length >= 7) {
      productRows.push(cells);
    }
  });

  block.innerHTML = '';

  if (kv.title || kv.subtitle || kv['view-all']) block.append(buildHeader(kv));
  if (kv.filters) {
    const bar = buildFilters(kv.filters.cell);
    if (bar) block.append(bar);
  }

  const grid = document.createElement('div');
  grid.className = 'spt-grid';
  productRows.forEach((cells) => grid.append(buildCard(cells)));
  block.append(grid);
}
