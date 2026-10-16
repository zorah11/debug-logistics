document.documentElement.classList.add('motion-ready');

if (location.pathname.endsWith('/index.html')) {
  history.replaceState(null, '', location.pathname.slice(0, -'index.html'.length) + location.search + location.hash);
}

const lastSegment = location.pathname.split('/').filter(Boolean).pop() || '';
const activePage = ['about', 'supplies', 'process', 'contact'].includes(lastSegment) ? lastSegment : 'home';
const header = document.querySelector('.site-header');

if (header) {
  const links = [
    ['./', 'Home', 'home'],
    ['about/', 'Company', 'about'],
    ['supplies/', 'Pest services', 'supplies'],
    ['process/', 'Our standards', 'process'],
    ['contact/', 'Contact', 'contact']
  ];
  const navLinks = links.map(([href, label, route]) =>
    '<a' + (activePage === route ? ' class="active"' : '') +
    ' href="' + href + '">' + label + '</a>'
  ).join('');
  header.innerHTML =
    '<div class="container header-inner">' +
      '<a class="brand" href="./" aria-label="Debug Services home">' +
        '<span class="brand-mark">D</span>' +
        '<span class="brand-copy">Debug Services<small>Pest management · Kampala</small></span>' +
      '</a>' +
      '<button class="menu-toggle" aria-expanded="false" aria-label="Open navigation">Menu</button>' +
      '<nav class="nav" aria-label="Main navigation">' + navLinks + '</nav>' +
      '<a class="header-call" href="tel:+256703685952"><small>Speak to us</small>0703 685 952</a>' +
    '</div>';
}

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  const setMenuOpen = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('menu-open', open);
  };
  toggle.addEventListener('click', () => setMenuOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
}

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const form = document.querySelector('#quote-form');
if (form) {
  document.querySelectorAll('[data-pest-select]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      form.elements.category.value = link.dataset.pestSelect;
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', location.pathname + location.search + '#quote-form');
    });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Pest-control request from ' + data.get('name'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\n' +
      'Property address / area: ' + (data.get('organisation') || 'Not provided') + '\n' +
      'Phone: ' + data.get('phone') + '\n' +
      'Email: ' + data.get('email') + '\n' +
      'Pest issue: ' + data.get('category') + '\n\n' +
      'Where seen / details:\n' + data.get('requirements')
    );
    const status = form.querySelector('.form-status');
    status.textContent = 'Opening your email application…';
    window.location.href = 'mailto:debuglogs3@gmail.com?subject=' + subject + '&body=' + body;
  });
}
