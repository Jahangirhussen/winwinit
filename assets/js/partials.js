/* =========================================================
   WINWINIT — Shared Header & Footer
   Single source of truth for the navbar, mobile menu and
   footer so every page stays in sync automatically.
   Injected via plain <script src> (not fetch/XHR) so it still
   works when index.html is opened directly as a local file,
   with no server and no build step.
   ========================================================= */

var SITE_HEADER_HTML = `
<header class="navbar">
  <div class="container">
    <button class="hamburger" aria-label="Toggle menu"><span></span><span></span><span></span></button>
    <a href="index.html" class="logo">
      <img src="assets/images/logo.svg" alt="WINWINIT logo" width="38" height="38">
      WIN<span class="dot">WIN</span>IT
    </a>
    <nav class="nav-menu">
      <a href="index.html">Home</a>
      <a href="about.html">About</a>
      <div class="nav-item has-dropdown">
        <a href="services.html">Services</a>
        <div class="dropdown-menu">
          <a href="wordpress-service.html">WordPress Website</a>
          <a href="shopify-service.html">Shopify Store</a>
          <a href="woocommerce-service.html">WooCommerce Store</a>
          <a href="ecommerce-service.html">Ecommerce Website</a>
          <a href="graphics-service.html">Graphics Design</a>
        </div>
      </div>
      <a href="packages.html">Packages</a>
      <div class="nav-item has-dropdown">
        <a href="portfolio.html">Portfolio</a>
        <div class="dropdown-menu">
          <a href="portfolio.html#projects">Projects</a>
          <a href="portfolio.html#case-studies">Case Studies</a>
        </div>
      </div>
      <div class="nav-item has-dropdown">
        <a href="blog.html">Blog</a>
        <div class="dropdown-menu">
          <a href="blog.html#latest">Latest Posts</a>
          <a href="blog.html#categories">Categories</a>
        </div>
      </div>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="nav-actions">
      <a href="contact.html" class="btn btn-primary">Get In Touch →</a>
    </div>
  </div>
</header>

<div class="mobile-menu">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <div class="mobile-accordion">
    <button class="mobile-accordion-toggle" type="button">Services <span class="icon">⌄</span></button>
    <div class="mobile-accordion-panel">
      <a href="wordpress-service.html">WordPress Website</a>
      <a href="shopify-service.html">Shopify Store</a>
      <a href="woocommerce-service.html">WooCommerce Store</a>
      <a href="ecommerce-service.html">Ecommerce Website</a>
      <a href="graphics-service.html">Graphics Design</a>
    </div>
  </div>
  <a href="packages.html">Packages</a>
  <div class="mobile-accordion">
    <button class="mobile-accordion-toggle" type="button">Portfolio <span class="icon">⌄</span></button>
    <div class="mobile-accordion-panel">
      <a href="portfolio.html#projects">Projects</a>
      <a href="portfolio.html#case-studies">Case Studies</a>
    </div>
  </div>
  <div class="mobile-accordion">
    <button class="mobile-accordion-toggle" type="button">Blog <span class="icon">⌄</span></button>
    <div class="mobile-accordion-panel">
      <a href="blog.html#latest">Latest Posts</a>
      <a href="blog.html#categories">Categories</a>
    </div>
  </div>
  <a href="contact.html">Contact</a>
  <a href="contact.html" class="btn btn-primary">Get In Touch →</a>
</div>

<div class="mobile-menu-overlay"></div>
`;

var SITE_FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a href="index.html" class="logo">
          <img src="assets/images/logo.svg" alt="WINWINIT logo" width="38" height="38">
          WINWINIT
        </a>
        <p>We help UK businesses grow faster with modern websites, ecommerce solutions and creative design.</p>
        <div class="social-icons">
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Twitter">t</a>
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Instagram">ig</a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul class="footer-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Services</h4>
        <ul class="footer-links">
          <li><a href="wordpress-service.html">WordPress Development</a></li>
          <li><a href="shopify-service.html">Shopify Stores</a></li>
          <li><a href="woocommerce-service.html">WooCommerce Stores</a></li>
          <li><a href="ecommerce-service.html">Ecommerce Websites</a></li>
          <li><a href="graphics-service.html">Graphics Design</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact Us</h4>
        <ul class="footer-contact">
          <li>📞 +44 20 7946 0958</li>
          <li>✉️ hello@winwinit.co.uk</li>
          <li>📍 124 City Road, London, EC1V 2NX, UK</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 WINWINIT. All rights reserved.</span>
      <span><a href="privacy-policy.html">Privacy Policy</a> · <a href="terms-conditions.html">Terms &amp; Conditions</a> · <a href="cookie-policy.html">Cookie Policy</a></span>
    </div>
  </div>
</footer>
`;

var BACK_TO_TOP_HTML = `<button id="back-to-top" class="back-to-top" aria-label="Back to top">↑</button>`;

var WHATSAPP_BUTTON_HTML = `
<a href="https://wa.me/442079460958" class="whatsapp-button" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" fill="#FFFFFF" aria-hidden="true">
    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.2.6 4.3 1.7 6.1L4 29l8.1-1.7C13.8 28 14.9 28 16 28c6.6 0 12-5.4 12-13S22.6 3 16 3zm0 23.7c-1.5 0-2.9-.4-4.2-1.1l-.3-.2-4.8 1 1-4.7-.2-.3C6.6 20 6 17.5 6 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 11.7-10 11.7zm5.5-7.6c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5C13.9 12.5 13.4 11 13.1 10.4c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z"/>
  </svg>
</a>`;

var GLOBE_BG_HTML = '<iframe src="bangladesh_globe_offline_google.html" class="site-globe-frame" title="Interactive offline Bangladesh globe background" loading="lazy" aria-hidden="true"></iframe>';

(function () {
  var headerSlot = document.getElementById('site-header');
  var footerSlot = document.getElementById('site-footer');
  if (headerSlot) headerSlot.innerHTML = SITE_HEADER_HTML;
  if (footerSlot) footerSlot.innerHTML = SITE_FOOTER_HTML;

  var globeWrap = document.createElement('div');
  globeWrap.innerHTML = GLOBE_BG_HTML;
  document.body.insertBefore(globeWrap.firstElementChild, document.body.firstChild);

  var widgetWrap = document.createElement('div');
  widgetWrap.innerHTML = BACK_TO_TOP_HTML + WHATSAPP_BUTTON_HTML;
  document.body.appendChild(widgetWrap);
})();

/* Bridges drag gestures anywhere on the real page into the background
   globe's rotation, since the globe iframe sits behind normal page
   content (z-index: -1) and never receives mouse/touch events directly
   — regular elements intercept them first even where they look empty. */
(function () {
  var frame = document.querySelector('iframe.site-globe-frame');
  if (!frame) return;

  var ignoreSelectors = [
    'a', 'button', 'input', 'textarea', 'select', 'label', 'iframe',
    '.card', '.price-card', '.portfolio-item', '.blog-card', '.team-card',
    '.testimonial-card', '.subservice-card', '.faq-item', '.filter-pill',
    '.category-card', '.info-card', '.case-study-card', '.dropdown-menu',
    '.mobile-menu', '.mobile-menu-overlay', '.navbar', '.footer',
    '.whatsapp-button', '.back-to-top', '.newsletter-form'
  ].join(', ');

  var dragging = false;
  var lastX = 0, lastY = 0;

  function shouldIgnore(target) {
    return !!(target && target.closest && target.closest(ignoreSelectors));
  }

  function post(phase, dx, dy) {
    if (!frame.contentWindow) return;
    frame.contentWindow.postMessage({ type: 'globe-drag', phase: phase, dx: dx || 0, dy: dy || 0 }, '*');
  }

  window.addEventListener('mousedown', function (e) {
    if (shouldIgnore(e.target)) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    post('start');
  });

  window.addEventListener('mousemove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    post('move', dx, dy);
  });

  window.addEventListener('mouseup', function () {
    if (!dragging) return;
    dragging = false;
    post('end');
  });

  window.addEventListener('touchstart', function (e) {
    if (shouldIgnore(e.target)) return;
    var t = e.touches[0];
    dragging = true;
    lastX = t.clientX;
    lastY = t.clientY;
    post('start');
  }, { passive: true });

  window.addEventListener('touchmove', function (e) {
    if (!dragging) return;
    var t = e.touches[0];
    var dx = t.clientX - lastX;
    var dy = t.clientY - lastY;
    lastX = t.clientX;
    lastY = t.clientY;
    post('move', dx, dy);
  }, { passive: true });

  window.addEventListener('touchend', function () {
    if (!dragging) return;
    dragging = false;
    post('end');
  });
})();
