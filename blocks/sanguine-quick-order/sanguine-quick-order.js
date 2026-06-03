/**
 * Sanguine Quick Order block
 * Optional section header + table-style list of frequently reordered products.
 *
 * Authoring — optional header rows (key | value), then one product row per item:
 *   title        | Quick Order
 *   subtitle     | Frequently reordered biospecimens
 *   icon · "Name | SKU" · availability · "price / unit"
 *
 * @param {Element} block
 */
import { moveInstrumentation } from '../../scripts/ue-utils.js';

const HEADER_KEYS = new Set(['title', 'subtitle']);

export default function decorate(block) {
  if (block.hasAttribute('data-aue-resource')) block.setAttribute('data-aue-type', 'component');

  const kv = {};
  const productRows = [];

  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const cells = [...row.querySelectorAll(':scope > div')];
    const key = cells[0]?.textContent?.trim().toLowerCase();
    if (cells.length === 2 && HEADER_KEYS.has(key)) {
      kv[key] = { cell: cells[1], row };
    } else {
      productRows.push(row);
    }
  });

  block.innerHTML = '';

  // --- Section header ---
  if (kv.title || kv.subtitle) {
    const header = document.createElement('div');
    header.className = 'sqo-header';
    if (kv.title) {
      const h2 = document.createElement('h2');
      h2.className = 'sqo-title';
      h2.textContent = kv.title.cell.textContent.trim();
      moveInstrumentation(kv.title.cell, h2);
      header.append(h2);
    }
    if (kv.subtitle) {
      const p = document.createElement('p');
      p.className = 'sqo-subtitle';
      p.textContent = kv.subtitle.cell.textContent.trim();
      moveInstrumentation(kv.subtitle.cell, p);
      header.append(p);
    }
    block.append(header);
  }

  productRows.forEach((row) => {
    const [iconCell, nameCell, availCell, priceCell] = [...row.querySelectorAll(':scope > div')];

    const icon = iconCell?.textContent?.trim() || '';
    const nameFull = nameCell?.textContent?.trim() || '';
    const [productName, sku] = nameFull.split('|').map((s) => s.trim());
    const avail = availCell?.textContent?.trim() || '';
    const price = priceCell?.textContent?.trim() || '';

    const item = document.createElement('div');
    item.className = 'sqo-row';
    moveInstrumentation(row, item);

    const thumb = document.createElement('div');
    thumb.className = 'sqo-thumb';
    thumb.textContent = icon;
    if (iconCell) moveInstrumentation(iconCell, thumb);

    const nameEl = document.createElement('div');
    nameEl.className = 'sqo-name-col';
    nameEl.innerHTML = `<span class="sqo-name">${productName || ''}</span>${sku ? `<span class="sqo-sku">${sku}</span>` : ''}`;
    if (nameCell) moveInstrumentation(nameCell, nameEl);

    const availEl = document.createElement('div');
    availEl.className = 'sqo-avail';
    availEl.textContent = avail;
    if (availCell) moveInstrumentation(availCell, availEl);

    const priceEl = document.createElement('div');
    priceEl.className = 'sqo-price';
    priceEl.textContent = price;
    const priceUnitEl = document.createElement('span');
    priceUnitEl.className = 'sqo-price__unit';
    priceEl.append(priceUnitEl);
    if (priceCell) moveInstrumentation(priceCell, priceEl);

    const btn = document.createElement('button');
    btn.className = 'sqo-btn';
    btn.type = 'button';
    btn.textContent = 'Add to Cart';

    item.append(thumb, nameEl, availEl, priceEl, btn);
    block.append(item);
  });
}
