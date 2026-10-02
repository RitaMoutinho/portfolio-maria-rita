const navLinks = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('main section[id]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { threshold: 0.45 });

sections.forEach(section => observer.observe(section));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const typingEl = document.getElementById('typingText');
if (typingEl) {
  const typingText = 'Marketing • Engenharia da Computação • Motorsport Projects';
  if (reduceMotion) {
    typingEl.textContent = typingText;
  } else {
    let i = 0;
    (function typeChar() {
      typingEl.textContent = typingText.slice(0, i);
      i++;
      if (i <= typingText.length) setTimeout(typeChar, 38);
    })();
  }
}

const revealEls = document.querySelectorAll('.panel, .photo-frame');
if (reduceMotion) {
  revealEls.forEach(el => el.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
}

// Contador de visitas privado (conta visitas e visitantes únicos; ignora o dono e localhost)
(function () {
  const NS = 'mrp-a63bdeab00199649';
  const base = 'https://abacus.jasoncameron.dev/hit/' + NS + '/';
  try {
    if (location.search.includes('owner')) localStorage.setItem('mr-owner', '1');
    if (localStorage.getItem('mr-owner')) return;
    if (['localhost', '127.0.0.1'].includes(location.hostname)) return;
    if (!sessionStorage.getItem('mr-counted')) {
      sessionStorage.setItem('mr-counted', '1');
      fetch(base + 'visitas', { keepalive: true }).catch(() => {});
    }
    if (!localStorage.getItem('mr-seen')) {
      localStorage.setItem('mr-seen', '1');
      fetch(base + 'unicos', { keepalive: true }).catch(() => {});
    }
  } catch (e) {}
})();
