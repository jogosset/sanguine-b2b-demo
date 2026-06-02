/**
 * Sanguine Product Teaser block
 * Section header + filter bar + 3-column × N-row product card grid.
 *
 * Authoring — header key-value rows, then one product row per card:
 *
 *   title     | Featured Products
 *   subtitle  | Top-ordered biospecimens...
 *   view-all  | [link: View full catalog →]
 *   filters   | All | Healthy Donors | Disease State | Autoimmune | Oncology | Rare Disease | In Stock
 *   🧬        | PBMCs | Crohn's Disease PBMCs — Cryopreserved | SNG-PBMC-CROHN-A | In Stock | ≥95% viability | ≥10×10⁶ cells | HLA-typed | Cryo | $380 / vial
 *
 * Product row cells:
 *   [0] emoji
 *   [1] category
 *   [2] name
 *   [3] sku
 *   [4] badge  ("In Stock", "Low Stock", "Best Seller", "GMP Grade", or pipe-combined "In Stock | Best Seller")
 *   [5..N-2] spec tags (one cell per spec)
 *   [N-1] price ("$380 / vial")
 *   [N] optional CTA label override (defaults to "Add to Cart")
 *
 * @param {Element} block
 */

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
    h2.textContent = kv.title.textContent.trim();
    textGroup.append(h2);
  }
  if (kv.subtitle) {
    const p = document.createElement('p');
    p.className = 'spt-subtitle';
    p.textContent = kv.subtitle.textContent.trim();
    textGroup.append(p);
  }
  header.append(textGroup);

  if (kv['view-all']) {
    const a = kv['view-all'].querySelector('a');
    if (a) {
      const btn = document.createElement('a');
      btn.href = a.href;
      btn.className = 'spt-view-all';
      btn.textContent = a.textContent.trim();
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

  // Last cell is price (or 2nd-to-last if CTA override present)
  // Cells 5..end-2 are specs, end-1 is price, end is optional CTA
  const last = cells.length - 1;
  const priceText = cells[last]?.textContent?.trim() || '';
  const isCtaOverride = priceText && !priceText.startsWith('$') && !priceText.includes('€') && !priceText.includes('£');
  const ctaLabel = isCtaOverride ? priceText : 'Add to Cart';
  const priceIdx = isCtaOverride ? last - 1 : last;
  const price = cells[priceIdx]?.textContent?.trim() || '';
  const specCells = cells.slice(5, priceIdx);

  // --- Image area ---
  const imgArea = document.createElement('div');
  imgArea.className = 'spt-card-img';

  const emojiEl = document.createElement('span');
  emojiEl.className = 'spt-emoji';
  emojiEl.textContent = emoji;
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
    imgArea.append(badgesEl);
  }

  // --- Body ---
  const body = document.createElement('div');
  body.className = 'spt-card-body';

  if (category) {
    const catEl = document.createElement('p');
    catEl.className = 'spt-category';
    catEl.textContent = category;
    body.append(catEl);
  }

  const nameEl = document.createElement('h3');
  nameEl.className = 'spt-name';
  nameEl.textContent = name;
  body.append(nameEl);

  if (sku) {
    const skuEl = document.createElement('p');
    skuEl.className = 'spt-sku';
    skuEl.textContent = `SKU: ${sku}`;
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
        specs.append(tag);
      }
    });
    body.append(specs);
  }

  // Price + CTA
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
  const kv = {};
  const productRows = [];

  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const key = cells[0]?.textContent?.trim().toLowerCase();
    if (cells.length === 2 && HEADER_KEYS.has(key)) {
      kv[key] = cells[1];
    } else if (cells.length >= 7) {
      productRows.push(cells);
    }
  });

  block.innerHTML = '';

  if (kv.title || kv.subtitle || kv['view-all']) block.append(buildHeader(kv));
  if (kv.filters) {
    const bar = buildFilters(kv.filters);
    if (bar) block.append(bar);
  }

  const grid = document.createElement('div');
  grid.className = 'spt-grid';
  productRows.forEach((cells) => grid.append(buildCard(cells)));
  block.append(grid);
}
