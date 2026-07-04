WINWINIT — Website Project
===========================

HOW TO RUN
----------
No installation, no build tools, no server needed.
Just double-click "index.html" to open the site in your browser.
All 7 pages link to each other normally (index.html, about.html,
services.html, packages.html, portfolio.html, blog.html, contact.html).

FOLDER STRUCTURE
----------------
WINWINIT/
|-- index.html
|-- about.html
|-- services.html
|-- packages.html
|-- portfolio.html
|-- blog.html
|-- contact.html
|-- README.txt
|-- assets/
    |-- css/style.css        (all styling — colours, cards, layout, animations)
    |-- js/partials.js        (shared navbar + mobile menu + footer, injected into every page)
    |-- js/script.js          (menu toggle, scroll reveal, counters, FAQ, filters, forms)
    |-- images/                (logo + all illustrations, SVG format)

SHARED HEADER & FOOTER
-----------------------
The navbar, mobile menu and footer live in ONE place: assets/js/partials.js.
Every page just has an empty <div id="site-header"></div> and
<div id="site-footer"></div> — partials.js fills them in automatically
when the page loads. Edit partials.js once and the change appears on
every page. (This is done via a plain <script> include rather than
fetch(), so it still works when opening index.html directly as a local
file — fetch() is blocked by the browser's CORS policy on file:// pages.)

IMAGES
------
All visuals (logo, hero graphic, service icons, portfolio/blog thumbnails,
case study screenshots) are hand-built SVG files in assets/images/. They
are lightweight, load instantly offline and need no licensing. Before
launching the site live, consider replacing them with real product
photos / team photos / project screenshots — free, commercially-licensed
stock photography is available from sites such as Unsplash or Pexels.
Keep the same filenames (e.g. hero-image.svg -> hero-image.jpg + update
the <img src> in the HTML) or simply swap the file and update the path.

CONTENT NOTES (UK TARGETING)
-----------------------------
- Pricing on packages.html is in GBP (£).
- Phone number, address and working hours use UK formatting/placeholders
  (124 City Road, London, EC1V 2NX — Ofcom-style placeholder, replace
  with your real registered address before going live).
- Copy uses British English spelling throughout (optimise, colour, etc.)
- The contact page map embed points to the placeholder address — update
  the iframe src in contact.html with your real address once known.

CUSTOMISING
-----------
- Colours: edit the CSS variables at the top of assets/css/style.css
  (--blue, --red, --yellow, --green, etc.)
- Card design (default colour, white-on-hover, translateY(-10px)):
  see the ".card" rules in style.css.
- Navigation links / footer content: edit assets/js/partials.js.
- Contact form / newsletter form: currently front-end only (no backend).
  To actually receive submissions, connect the <form> in contact.html
  and the newsletter form to a form service (e.g. Formspree, Netlify
  Forms) or your own backend endpoint.

CONVERTING TO WORDPRESS / ELEMENTOR
------------------------------------
The HTML is written section-by-section (hero, cards, stats, portfolio,
testimonials, CTA, footer, etc.) with plain CSS classes and no JS-driven
layout, so each section maps cleanly onto an Elementor section/column/
widget when you rebuild it there. The only interactive bits — mobile
menu, FAQ accordion, portfolio filters, scroll counters — are handled
in vanilla JS and are cosmetic only; they are not required for the
layout to make sense, so they are safe to leave behind or rebuild using
Elementor's own equivalents (Toggle widget, Accordion widget, etc.).

BROWSER SUPPORT
----------------
Modern evergreen browsers (Chrome, Edge, Firefox, Safari). No IE11 support.
