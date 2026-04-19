document.addEventListener("DOMContentLoaded", () => {
  // Navigation functionality
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      const icon = navToggle.querySelector('.nav-icon');
      if (icon) {
        icon.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
      }
    });
  }

  // Smooth scroll
  const sections = document.querySelectorAll('section[id]');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (mobileNav) {
        mobileNav.classList.remove('active');
        const icon = navToggle?.querySelector('.nav-icon');
        if (icon) icon.textContent = '☰';
      }
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      if (target) {
        scrollToSection(target.substring(1));
      }
    });
  });

  // Intersection Observer (sections + active nav)
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-50px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Progress bars animation
  const progressBars = document.querySelectorAll('.progress-fill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        if (width) {
          bar.style.width = width;
        }
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => progressObserver.observe(bar));
});