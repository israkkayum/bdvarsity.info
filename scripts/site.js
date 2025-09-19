(function () {
  const nav = document.querySelector('[data-nav]');
  const navToggle = nav ? nav.querySelector('[data-nav-toggle]') : null;
  const navMenu = nav ? nav.querySelector('[data-nav-menu]') : null;
  const dropdownGroup = nav ? nav.querySelector('[data-nav-group]') : null;
  const dropdownToggle = dropdownGroup ? dropdownGroup.querySelector('[data-dropdown-toggle]') : null;

  const closeDropdown = () => {
    if (!dropdownGroup || !dropdownToggle) return;
    dropdownGroup.classList.remove('is-open');
    dropdownToggle.setAttribute('aria-expanded', 'false');
  };

  if (nav && navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) {
        closeDropdown();
      }
    });

    navMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        closeDropdown();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        closeDropdown();
      }
    });
  }

  if (dropdownGroup && dropdownToggle) {
    const dropdownMenu = dropdownGroup.querySelector('[data-dropdown-menu]');
    dropdownToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdownGroup.classList.toggle('is-open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen && dropdownMenu) {
        const firstLink = dropdownMenu.querySelector('a');
        if (firstLink) {
          firstLink.focus({ preventScroll: true });
        }
      }
    });

    document.addEventListener('click', (event) => {
      if (!dropdownGroup.contains(event.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
        if (nav && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
          }
        }
      }
    });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleVisibility = () => {
      if (window.scrollY > 240) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    };

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }

  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const adUnits = document.querySelectorAll('.ad-slot ins');
  if (adUnits.length && window.adsbygoogle) {
    adUnits.forEach(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.warn('adsbygoogle push failed', error);
      }
    });
  }
})();
