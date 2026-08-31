document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    var isOpen = mobileNav.hasAttribute('hidden') === false;
    if (isOpen) {
      mobileNav.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileNav.removeAttribute('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.setAttribute('hidden', '');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
