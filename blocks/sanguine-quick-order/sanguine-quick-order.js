/**
 * Sanguine Quick Order block
 * Table-style list of frequently reordered products.
 *
 * Authoring: one row per product, four cells:
 *   icon · "Name | SKU" · availability · "price / unit"
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.innerHTML = '';

  rows.forEach((row) => {
    const [iconCell, nameCell, availCell, priceCell] = [...row.querySelectorAll(':scope > div')];

    const icon = iconCell?.textContent?.trim() || '';
    const nameFull = nameCell?.textContent?.trim() || '';
    const [productName, sku] = nameFull.split('|').map((s) => s.trim());
    const avail = availCell?.textContent?.trim() || '';
    const price = priceCell?.textContent?.trim() || '';

    const item = document.createElement('div');
    item.className = 'sqo-row';

    const thumb = document.createElement('div');
    thumb.className = 'sqo-thumb';
    thumb.textContent = icon;

    const nameEl = document.createElement('div');
    nameEl.className = 'sqo-name-col';
    nameEl.innerHTML = `<span class="sqo-name">${productName || ''}</span>${sku ? `<span class="sqo-sku">${sku}</span>` : ''}`;

    const availEl = document.createElement('div');
    availEl.className = 'sqo-avail';
    availEl.textContent = avail;

    const priceEl = document.createElement('div');
    priceEl.className = 'sqo-price';
    priceEl.textContent = price;

    const btn = document.createElement('button');
    btn.className = 'sqo-btn';
    btn.type = 'button';
    btn.textContent = 'Add to Cart';

    item.append(thumb, nameEl, availEl, priceEl, btn);
    block.append(item);
  });
}
