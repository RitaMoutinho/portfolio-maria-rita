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
