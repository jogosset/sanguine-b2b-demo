/**
 * Sanguine Trust Bar block
 * Horizontal strip of trust signals.
 *
 * Authoring: one row per item, three cells: icon · label · sub-label
 *
 * @param {Element} block
 */
import { moveInstrumentation } from '../../scripts/ue-utils.js';

export default function decorate(block) {
  if (block.hasAttribute('data-aue-resource')) block.setAttribute('data-aue-type', 'component');

  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const [iconCell, labelCell, subCell] = [...row.querySelectorAll(':scope > div')];

    const newRow = document.createElement('div');
    newRow.className = 'stb-item';
    moveInstrumentation(row, newRow);

    if (iconCell) { iconCell.className = 'stb-icon'; newRow.append(iconCell); }
    if (labelCell) { labelCell.className = 'stb-label'; newRow.append(labelCell); }
    if (subCell) { subCell.className = 'stb-sub'; newRow.append(subCell); }

    row.replaceWith(newRow);
  });
}
