/**
 * Sanguine Trust Bar block
 * Horizontal strip of trust signals.
 *
 * Authoring: one row per item, three cells: icon · label · sub-label
 *
 * @param {Element} block
 */
export default function decorate(block) {
  [...block.querySelectorAll(':scope > div')].forEach((row) => {
    const [iconCell, labelCell, subCell] = [...row.querySelectorAll(':scope > div')];
    row.className = 'stb-item';
    if (iconCell) iconCell.className = 'stb-icon';
    if (labelCell) labelCell.className = 'stb-label';
    if (subCell) subCell.className = 'stb-sub';
  });
}
