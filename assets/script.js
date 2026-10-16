const page = location.pathname.split('/').pop() || 'index.html';
const activePage = page === '' ? 'index.html' : page;
const header = document.querySelector('.site-header');

if (header) {
  const links = [
    ['index.html', 'Home'],
    ['about.html', 'Company'],
    ['supplies.html', 'Pest services'],
    ['process.html', 'Our standards'],
    ['contact.html', 'Contact']
  ];
  const navLinks = links.map(([href, label]) =>
    '<a' + (activePage === href ? ' class="active"' : '') +
    ' href="' + href + '">' + label + '</a>'
  ).join('');
  header.innerHTML =
    '<div class="container header-inner">' +
      '<a class="brand" href="index.html" aria-label="Debug Services home">' +
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
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Close' : 'Menu';
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  }));
}

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('#quote-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Pest-control request from ' + data.get('name'));
    const body = encodeURIComponent(
      'Name: ' + data.get('name') + '\\n' +
      'Property address / city: ' + (data.get('organisation') || 'Not provided') + '\\n' +
      'Phone: ' + data.get('phone') + '\\n' +
      'Email: ' + data.get('email') + '\\n' +
      'Service type: ' + data.get('category') + '\\n\\n' +
      'Pest issue / details:\\n' + data.get('requirements')
    );
    const status = form.querySelector('.form-status');
    status.textContent = 'Opening your email application…';
    window.location.href = 'mailto:debuglogs3@gmail.com?subject=' + subject + '&body=' + body;
  });
}
