/**
 * Biospecimens Nav block
 * Horizontal top navigation bar for Biospecimen category pages.
 *
 * Authoring — one row per link:
 *   [link: Biospecimens → /products/biospecimens]
 *   [link: PBMCs → /products/pbmcs]
 *   ...
 *
 * @param {Element} block
 */
export default function decorate(block) {
  const links = [...block.querySelectorAll('div > div a')].map((a) => ({
    href: a.getAttribute('href'),
    label: a.textContent.trim(),
  }));

  const nav = document.createElement('nav');
  nav.className = 'bn-bar';
  nav.setAttribute('aria-label', 'Biospecimens categories');

  const ul = document.createElement('ul');

  links.forEach(({ href, label }, i) => {
    const li = document.createElement('li');
    if (i === 0) li.classList.add('bn-parent');

    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;

    const currentPath = window.location.pathname.replace(/\/$/, '');
    const linkPath = href.replace(/\/$/, '');
    if (currentPath === linkPath || currentPath.startsWith(`${linkPath}/`)) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }

    li.append(a);
    ul.append(li);
  });

  nav.append(ul);
  block.textContent = '';
  block.append(nav);
}
