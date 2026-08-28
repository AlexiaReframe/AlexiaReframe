/* ====================================================================
   ALEXIA REFRAME — script.js (vanilla, sans dépendance)
   1. Header : transition transparent -> fond plein au scroll
   2. Menu burger mobile
   3. Fade-in au scroll (Intersection Observer)
   4. Formulaire de contact -> lien mailto
   ==================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Header au scroll ---------- */
  var header = document.getElementById('site-header');
  var scrollThreshold = 40;

  function updateHeader() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- 2. Menu burger mobile ---------- */
  var burgerBtn = document.getElementById('burger-btn');
  var navLinks = document.getElementById('main-nav');

  burgerBtn.addEventListener('click', function () {
    var isOpen = navLinks.classList.toggle('open');
    burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  /* Ferme le menu mobile après clic sur un lien d'ancre */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });

  /* ---------- 3. Fade-in au scroll ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 4. Formulaire de contact -> mailto ---------- */
  var form = document.getElementById('contact-form');
  var errorBox = document.getElementById('form-error');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      errorBox.textContent = 'Merci de remplir tous les champs avant d\'envoyer.';
      errorBox.hidden = false;
      return;
    }
    errorBox.hidden = true;

    var subject = encodeURIComponent('Contact depuis alexiareframe.com');
    var body = encodeURIComponent(
      'Nom : ' + name + '\n' +
      'Email : ' + email + '\n\n' +
      message
    );

    window.location.href = 'mailto:hello@alexiareframe.com?subject=' + subject + '&body=' + body;
  });

});
