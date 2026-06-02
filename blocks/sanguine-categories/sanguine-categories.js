/**
 * Sanguine Categories block
 * Six-column category card grid.
 *
 * Authoring: one row per category, four cells:
 *   icon · name · count · href (link or plain text URL)
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  block.innerHTML = '';

  rows.forEach((row) => {
    const [iconCell, nameCell, countCell, linkCell] = [...row.querySelectorAll(':scope > div')];
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
    block.append(card);
  });
}
