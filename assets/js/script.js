/* =========================================================
   WINWINIT — Shared Script
   Plain vanilla JS only. Kept intentionally simple (no
   layout logic) since the site may later be rebuilt in
   Elementor — JS here only handles interaction, not structure.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Sticky navbar shadow on scroll ---- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* ---- Back to top button ---- */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile menu toggle ---- */
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

  function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      var opening = !mobileMenu.classList.contains('active');
      hamburger.classList.toggle('active', opening);
      mobileMenu.classList.toggle('active', opening);
      if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('active', opening);
      document.body.style.overflow = opening ? 'hidden' : '';
    });

    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---- Mobile nav accordion (Services / Portfolio / Blog submenus) ---- */
  document.querySelectorAll('.mobile-accordion').forEach(function (item) {
    var toggle = item.querySelector('.mobile-accordion-toggle');
    var panel = item.querySelector('.mobile-accordion-panel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      panel.style.maxHeight = !isOpen ? panel.scrollHeight + 'px' : null;
    });
  });

  /* ---- Highlight active nav link ---- */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

  var serviceDetailPages = ['wordpress-service.html', 'shopify-service.html', 'ecommerce-service.html', 'graphics-service.html'];
  if (serviceDetailPages.indexOf(currentPage) !== -1) {
    var servicesNavLink = document.querySelector('.nav-item > a[href="services.html"]');
    if (servicesNavLink) servicesNavLink.classList.add('active');
  }

  /* ---- Animated stat counters ---- */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        var current = 0;
        var step = Math.max(1, Math.ceil(target / 60));
        var timer = setInterval(function () {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---- Scroll reveal for cards/sections ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---- Portfolio filter pills ---- */
  var filterPills = document.querySelectorAll('.filter-pill');
  var portfolioItems = document.querySelectorAll('#portfolio-grid .portfolio-item');
  if (filterPills.length && portfolioItems.length) {
    filterPills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        filterPills.forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        var filter = pill.getAttribute('data-filter');
        portfolioItems.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-cat') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      item.classList.toggle('open', !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + 'px' : null;
    });
  });

  /* ---- Contact form (front-end only demo submission) ---- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
        status.classList.add('success');
      }
      contactForm.reset();
    });
  }

  /* ---- Newsletter form (front-end only demo submission) ---- */
  var newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = newsletterForm.querySelector('input');
      if (input) {
        input.value = '';
        input.placeholder = 'Subscribed! Thank you.';
      }
    });
  }

  /* ---- Scroll path: zigzag line down the page centre, colour-coded per
     section, drawn progressively with scroll, with a rocket marker that
     travels along it (both scrolling down and back up). ---- */
  (function () {
    var SEGMENT_STEP = 180;
    var AMPLITUDE = 35;
    var COLORS = ['#4285F4', '#0F9D58', '#F4B400', '#DB4437'];

    var wrap = document.createElement('div');
    wrap.id = 'scroll-path-wrap';
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100');
    wrap.appendChild(svg);
    document.body.appendChild(wrap);

    var rocket = document.createElement('div');
    rocket.id = 'scroll-rocket';
    rocket.textContent = '🚀';
    document.body.appendChild(rocket);

    var waypoints = [];
    var segments = []; // { el, y1, y2, length }

    function sectionColorAt(y) {
      var sections = document.querySelectorAll('section');
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        var top = rect.top + window.scrollY;
        var bottom = top + rect.height;
        if (y >= top && y < bottom) return COLORS[i % COLORS.length];
      }
      return COLORS[0];
    }

    function build() {
      var docHeight = document.documentElement.scrollHeight;
      wrap.style.height = docHeight + 'px';
      svg.setAttribute('height', docHeight);
      svg.setAttribute('viewBox', '0 0 100 ' + docHeight);
      svg.innerHTML = '';
      segments = [];

      waypoints = [];
      var x = 50, y = 0, dir = 1;
      waypoints.push([x, y]);
      while (y < docHeight) {
        y += SEGMENT_STEP;
        x = 50 + dir * AMPLITUDE;
        waypoints.push([x, y]);
        dir *= -1;
      }

      for (var i = 1; i < waypoints.length; i++) {
        var a = waypoints[i - 1], b = waypoints[i];
        var midY = (a[1] + b[1]) / 2;
        var d = 'M ' + a[0] + ' ' + a[1] + ' C ' + a[0] + ' ' + midY + ', ' + b[0] + ' ' + midY + ', ' + b[0] + ' ' + b[1];
        var path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', d);
        path.setAttribute('class', 'scroll-path-segment');
        path.style.stroke = sectionColorAt(midY);
        svg.appendChild(path);
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        segments.push({ el: path, y1: a[1], y2: b[1], length: len });
      }
    }

    function update() {
      var revealY = window.scrollY + window.innerHeight * 0.5;

      for (var i = 0; i < segments.length; i++) {
        var seg = segments[i];
        var ratio;
        if (revealY <= seg.y1) ratio = 0;
        else if (revealY >= seg.y2) ratio = 1;
        else ratio = (revealY - seg.y1) / (seg.y2 - seg.y1);
        seg.el.style.strokeDashoffset = seg.length * (1 - ratio);
      }

      for (var j = 0; j < waypoints.length - 1; j++) {
        var a = waypoints[j], b = waypoints[j + 1];
        if (revealY >= a[1] && revealY <= b[1]) {
          var t = (b[1] === a[1]) ? 0 : (revealY - a[1]) / (b[1] - a[1]);
          var localX = a[0] + (b[0] - a[0]) * t;
          rocket.style.left = (window.innerWidth / 2 - 50 + localX) + 'px';
          rocket.style.top = revealY + 'px';
          break;
        }
      }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    });

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { build(); update(); }, 200);
    });

    build();
    update();
  })();

});
