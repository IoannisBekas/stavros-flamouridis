document.documentElement.classList.add('js');
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const progress = document.querySelector('.scroll-progress span');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

let scheduled = false;
function updateScroll() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  header.classList.toggle('scrolled', window.scrollY > 40);
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateScroll);
  }
}, { passive: true });
window.addEventListener('resize', () => {
  updateScroll();
  if (window.innerWidth > 760) closeMenu();
});
window.addEventListener('load', updateScroll);
document.addEventListener('toggle', updateScroll, true);
document.getElementById('year').textContent = new Date().getFullYear();
updateScroll();
