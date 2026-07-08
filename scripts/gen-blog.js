/* One-off generator: builds assets/data/blog-posts.js and blog/<slug>.html for all posts.
   Run with: node scripts/gen-blog.js */
const fs = require('fs');
const path = require('path');

const CATS = {
  wordpress: { label: 'WordPress', color: 'var(--blue)', icon: '🌐' },
  shopify: { label: 'Shopify', color: 'var(--green)', icon: '🛍️' },
  woocommerce: { label: 'WooCommerce', color: '#2f6fe0', icon: '🧩' },
  ecommerce: { label: 'Ecommerce', color: 'var(--yellow)', icon: '🛒' },
  graphics: { label: 'Graphics Design', color: 'var(--red)', icon: '🎨' },
};

const POSTS = [
  // ---------------- WORDPRESS ----------------
  { cat: 'wordpress', title: '7 WordPress Tips Every Business Owner Should Know', read: 4,
    intro: 'WordPress powers a huge share of UK business websites because it is flexible and easy to manage once set up correctly. A few good habits early on save hours of troubleshooting later.',
    tips: [
      ['Keep core, themes and plugins updated', 'Outdated software is the single biggest security risk on WordPress sites. Set a weekly reminder to check for updates, or use a maintenance plan that handles it for you.'],
      ['Use a caching plugin', 'Page caching can cut load times dramatically with almost no setup effort, which matters for both visitors and Google rankings.'],
      ['Limit the number of plugins', 'Every plugin adds potential conflicts and security surface. Only install what you actually use, and remove anything inactive.'],
    ],
    conclusion: 'None of this requires deep technical knowledge — just a routine. If you would rather not think about it at all, a managed maintenance package handles updates, backups and monitoring for you.' },
  { cat: 'wordpress', title: 'How to Choose the Right WordPress Theme for Your Business', read: 5,
    intro: 'The theme shapes how your business looks to every visitor before they read a single word. Picking the wrong one can mean a slow site, clunky editing experience, or a redesign within a year.',
    tips: [
      ['Prioritise page speed over visual extras', 'Heavy demo-style themes with sliders and animations often load slowly. A clean, lightweight theme with good code performs better in search and for conversions.'],
      ['Check block editor / page builder compatibility', 'Make sure the theme works cleanly with the WordPress block editor or the page builder you plan to use, so future edits stay simple.'],
      ['Look at real update history', 'A theme last updated years ago is a liability. Check the changelog for regular maintenance and WordPress version compatibility.'],
    ],
    conclusion: 'A custom-built lightweight theme tailored to your content, rather than a generic multipurpose template, usually performs better long-term and is easier to maintain.' },
  { cat: 'wordpress', title: 'WordPress Security Checklist for UK Small Businesses', read: 6,
    intro: 'Small business websites are a common target precisely because owners assume they are too small to be interesting to attackers. A short checklist closes most of the easy entry points.',
    tips: [
      ['Strong, unique admin credentials', 'Never reuse passwords, and rename the default "admin" username if it is still in use. Enable two-factor authentication where possible.'],
      ['Enforce HTTPS everywhere', 'A valid SSL certificate should be applied site-wide, with all HTTP traffic redirected, protecting login forms and customer data in transit.'],
      ['Automated off-site backups', 'Backups stored only on the same server are not real backups. Use a plugin or host feature that stores copies off-site on a daily or weekly schedule.'],
    ],
    conclusion: 'Security is not a one-time task — it is an ongoing routine of updates, monitoring and backups, which is exactly what an ongoing maintenance plan is built to cover.' },
  { cat: 'wordpress', title: 'Speeding Up a Slow WordPress Website: A Practical Guide', read: 6,
    intro: 'A slow website loses visitors before they see what you offer. Most speed problems on WordPress come down to a handful of recurring causes.',
    tips: [
      ['Optimise images before upload', 'Large, uncompressed images are the most common cause of slow load times. Resize to the display dimensions and compress before uploading to the media library.'],
      ['Choose quality hosting', 'Budget shared hosting struggles under real traffic. Managed WordPress hosting or a reputable provider makes a measurable difference.'],
      ['Reduce render-blocking scripts', 'Unnecessary plugins that load scripts on every page, even where unused, slow down every visit. Audit and disable what is not needed.'],
    ],
    conclusion: 'Run a speed test before and after each change so you can see what is actually moving the needle rather than guessing.' },
  { cat: 'wordpress', title: 'WordPress vs Wix vs Squarespace: Which Is Right for You', read: 5,
    intro: 'All three can produce a good-looking website, but they solve different problems. The right choice depends on how much control and growth you expect to need.',
    tips: [
      ['WordPress: maximum flexibility', 'Self-hosted WordPress gives full ownership of your content and code, thousands of plugins, and no platform lock-in — at the cost of needing some setup and maintenance.'],
      ['Wix / Squarespace: fastest to launch', 'Good for a very simple brochure site with minimal ongoing changes, but customisation and scalability are limited, and migrating away later is harder.'],
      ['Think about long-term cost', 'Website builders bundle hosting into a subscription that rises over time; WordPress hosting costs are separate but often cheaper at scale.'],
    ],
    conclusion: 'If you expect your business and website to grow — more pages, ecommerce, custom features — WordPress is almost always the better long-term investment.' },
  { cat: 'wordpress', title: 'Essential WordPress Plugins for Business Websites', read: 5,
    intro: 'The right small set of plugins covers most of what a business website needs without bloating the site.',
    tips: [
      ['An SEO plugin', 'Handles meta titles, descriptions, sitemaps and schema markup so search engines can understand and rank your pages properly.'],
      ['A caching / performance plugin', 'Improves load times with minimal configuration, directly benefiting both user experience and search rankings.'],
      ['A form and security plugin', 'A reliable contact form plugin plus a security/firewall plugin covers lead capture and protects against common attacks.'],
    ],
    conclusion: 'More plugins is not automatically better — a focused, well-maintained set beats a large collection of half-used ones.' },
  { cat: 'wordpress', title: 'How to Write SEO-Friendly Blog Posts in WordPress', read: 5,
    intro: 'Publishing consistently only pays off if each post is structured so search engines and readers can actually find and use it.',
    tips: [
      ['Target one clear keyword per post', 'Use it naturally in the title, first paragraph, and one subheading, without forcing it in unnaturally.'],
      ['Write descriptive subheadings', 'Break content into scannable sections — most readers skim before committing to read in full.'],
      ['Add internal links', 'Link to relevant service or product pages within the post to guide readers toward the next step and help search engines understand site structure.'],
    ],
    conclusion: 'Consistency matters more than volume — a steady stream of well-structured, genuinely useful posts outperforms occasional long ones.' },
  { cat: 'wordpress', title: 'Backing Up Your WordPress Site: Best Practices', read: 4,
    intro: 'A backup strategy is only as good as its weakest link — untested backups, or backups stored in the same place as the live site, offer false confidence.',
    tips: [
      ['Automate the schedule', 'Manual backups get forgotten. Set an automated daily or weekly schedule depending on how often content changes.'],
      ['Store copies off-site', 'Keep backups in cloud storage separate from the hosting account, so a hosting-level issue cannot wipe out both the site and its backups.'],
      ['Test the restore process', 'A backup you have never restored is unverified. Test the restore process at least once so you know it actually works when needed.'],
    ],
    conclusion: 'Treat backups as insurance you hope never to use, but check periodically that the policy is still valid.' },
  { cat: 'wordpress', title: 'WordPress Maintenance: What to Check Every Month', read: 4,
    intro: 'A short monthly routine catches small problems before they become expensive ones.',
    tips: [
      ['Review broken links and 404s', 'Old links break as pages get updated or removed. A quick scan keeps navigation and SEO intact.'],
      ['Check plugin and theme updates', 'Apply updates on a staging copy first if the site is business-critical, then push to the live site.'],
      ['Review site speed and uptime', 'A monthly speed test and uptime report flags gradual degradation before customers notice it.'],
    ],
    conclusion: 'These checks take under an hour a month but prevent most of the emergencies that cost far more time to fix later.' },
  { cat: 'wordpress', title: 'Migrating Your Business Website to WordPress Without Downtime', read: 7,
    intro: 'Moving an established business website to WordPress is mostly a planning problem — the technical migration itself is the easy part if the groundwork is done first.',
    tips: [
      ['Map existing content and URLs first', 'List every page, its URL, and where it should map to on the new site so nothing gets lost and old links keep working via redirects.'],
      ['Build and test on a staging domain', 'Develop the new site privately, test every page and form, then switch DNS only once everything is verified.'],
      ['Set up 301 redirects', 'Redirect old URLs to their new equivalents so search rankings and existing links carry over instead of resetting to zero.'],
    ],
    conclusion: 'Done properly, a migration can happen with effectively zero visible downtime and no loss of existing search visibility.' },

  // ---------------- SHOPIFY ----------------
  { cat: 'shopify', title: 'The Shopify Growth Guide for UK Retailers', read: 6,
    intro: 'A Shopify store becomes a genuine growth channel once the fundamentals — speed, trust signals and checkout flow — are in place, rather than being treated as just an online catalogue.',
    tips: [
      ['Optimise the checkout experience', 'Enable express payment options and keep the checkout as short as possible — every extra field reduces completion rate.'],
      ['Use collections strategically', 'Organise products into clear, well-named collections that match how customers actually search and browse, not just internal categories.'],
      ['Invest in product photography', 'Consistent, high-quality images across the catalogue build trust faster than any amount of copy.'],
    ],
    conclusion: 'Growth on Shopify compounds — small conversion rate improvements across many visitors add up to meaningful revenue over a year.' },
  { cat: 'shopify', title: 'Choosing the Right Shopify Theme for Your Brand', read: 5,
    intro: 'The theme controls both first impressions and how easily you can merchandise products, so it is worth more thought than picking whatever looks nicest in the preview.',
    tips: [
      ['Match the theme to your catalogue size', 'A theme built for a handful of products looks sparse with hundreds, and vice versa — check demo stores with a similar catalogue size to yours.'],
      ['Check mobile performance specifically', 'Most Shopify traffic is mobile. Test the theme demo on an actual phone, not just resizing a desktop browser.'],
      ['Confirm app compatibility', 'Some themes conflict with popular apps like reviews or upsell widgets. Check known compatibility before committing.'],
    ],
    conclusion: 'A tailored theme customisation, built on a solid base theme, usually outperforms an off-the-shelf template trying to do everything.' },
  { cat: 'shopify', title: 'Shopify Apps Every New Store Owner Should Install', read: 5,
    intro: 'The Shopify App Store has thousands of options, but a new store only needs a focused starting set.',
    tips: [
      ['Reviews app', 'Social proof directly affects conversion rate, especially for stores without an established brand reputation yet.'],
      ['Email marketing app', 'Abandoned cart emails alone typically recover a meaningful percentage of otherwise-lost sales.'],
      ['SEO app', 'Handles image alt text, meta descriptions and structured data so products are discoverable in search from day one.'],
    ],
    conclusion: 'Add apps deliberately as specific needs arise — too many installed apps slow the store down and complicate maintenance.' },
  { cat: 'shopify', title: 'How to Reduce Cart Abandonment on Shopify', read: 6,
    intro: 'Cart abandonment is normal, but a large share of it is recoverable with a few targeted fixes rather than accepted as a fixed cost of doing business.',
    tips: [
      ['Show shipping costs early', 'Unexpected costs at the final step are the top reason customers abandon carts. Display estimated shipping before checkout where possible.'],
      ['Enable guest checkout', 'Forcing account creation before purchase adds friction that costs sales, particularly for first-time customers.'],
      ['Send a timed abandoned cart email', 'A reminder email an hour or so after abandonment, sometimes with a small incentive, recovers a meaningful share of lost carts.'],
    ],
    conclusion: 'Track abandonment rate over time after each change so you know which fixes are actually working for your specific customers.' },
  { cat: 'shopify', title: 'Shopify SEO Basics for Better Google Rankings', read: 6,
    intro: 'Shopify handles a lot of technical SEO automatically, but store owners still need to do the on-page work themselves.',
    tips: [
      ['Write unique product descriptions', 'Copying manufacturer descriptions verbatim creates duplicate content across the web, which hurts rankings. Write original copy for each product.'],
      ['Structure collections and URLs cleanly', 'Keep URLs short and descriptive, and avoid deeply nested collection structures that dilute page authority.'],
      ['Build a small content section', 'A blog with genuinely useful buying guides or how-tos gives Google more relevant pages to rank and helps establish topical authority.'],
    ],
    conclusion: 'SEO on Shopify is a long-term investment — consistent effort over months compounds into meaningful organic traffic.' },
  { cat: 'shopify', title: 'Setting Up Shopify Payments and Shipping Correctly', read: 5,
    intro: 'Payment and shipping setup mistakes are invisible until a customer hits them at checkout, so it is worth testing thoroughly before launch.',
    tips: [
      ['Enable the payment methods your customers actually use', 'Beyond cards, consider Shop Pay, PayPal and Apple Pay/Google Pay for faster checkout completion.'],
      ['Set shipping zones accurately', 'Misconfigured zones can block valid customers from checking out entirely or charge the wrong rate — test every region you serve.'],
      ['Test the full order flow yourself', 'Place a real test order end to end, including confirmation emails, before going live.'],
    ],
    conclusion: 'A properly configured checkout is invisible to customers — they simply complete their purchase without friction, which is exactly the goal.' },
  { cat: 'shopify', title: 'Product Photography Tips for Shopify Stores', read: 4,
    intro: 'Photography is one of the highest-leverage investments for a new store, directly shaping how trustworthy and professional the brand looks.',
    tips: [
      ['Use consistent lighting and background', 'A consistent style across the whole catalogue looks far more professional than mixed styles from different sources.'],
      ['Show scale and context', 'Include at least one lifestyle or in-use shot per product alongside the plain product shot, helping customers judge size and fit.'],
      ['Compress before uploading', 'Large image files slow the store down — resize and compress images to the actual display size before uploading.'],
    ],
    conclusion: 'Good photography pays for itself quickly through higher conversion rates and fewer returns from mismatched expectations.' },
  { cat: 'shopify', title: 'Shopify vs WooCommerce: Which Platform Fits Your Business', read: 6,
    intro: 'Both are excellent ecommerce platforms, but they suit different priorities around cost, control and ongoing effort.',
    tips: [
      ['Shopify: managed and hands-off', 'Hosting, security and updates are handled for you, for a predictable monthly fee — ideal if you want to focus purely on the business.'],
      ['WooCommerce: full control on WordPress', 'Runs on your own WordPress hosting with no platform fees, offering more customisation at the cost of more setup and maintenance responsibility.'],
      ['Consider your growth plans', 'If you already have a WordPress site and content, WooCommerce integrates naturally; if starting fresh purely for ecommerce, Shopify often launches faster.'],
    ],
    conclusion: 'Neither platform is universally "better" — the right choice depends on how much control versus convenience your business needs.' },
  { cat: 'shopify', title: 'Building Customer Loyalty on Shopify', read: 5,
    intro: 'Repeat customers are far cheaper to sell to than new ones, making loyalty one of the best returns on effort for an established store.',
    tips: [
      ['Set up a simple rewards programme', 'Even a basic points-per-purchase app encourages repeat visits without heavy development work.'],
      ['Follow up after purchase', 'A post-purchase email checking satisfaction, with a gentle nudge toward a review, keeps the relationship active.'],
      ['Segment your email list', 'Send different messaging to first-time buyers versus repeat customers rather than one generic newsletter to everyone.'],
    ],
    conclusion: 'Loyalty is built through consistent, useful contact over time — not a single clever promotion.' },
  { cat: 'shopify', title: 'Preparing Your Shopify Store for Black Friday', read: 6,
    intro: 'Black Friday traffic spikes expose weaknesses that go unnoticed the rest of the year, so preparation should start well in advance.',
    tips: [
      ['Stress-test site speed', 'Compress images and audit apps for anything unnecessary, since load times matter even more under high traffic.'],
      ['Plan inventory and messaging in advance', 'Decide discounts, bundles and stock levels weeks ahead rather than scrambling the week of the sale.'],
      ['Prepare customer support for volume', 'Have clear FAQs and auto-responses ready so support requests do not pile up during the busiest period.'],
    ],
    conclusion: 'The stores that perform best on Black Friday are the ones that treated the weeks before it as part of the campaign, not just the day itself.' },

  // ---------------- WOOCOMMERCE ----------------
  { cat: 'woocommerce', title: 'WooCommerce Setup Checklist for New Stores', read: 6,
    intro: 'WooCommerce gives full control over a WordPress-powered store, but that flexibility means a proper checklist matters before launch.',
    tips: [
      ['Choose reliable hosting built for WooCommerce', 'Generic shared hosting often struggles under the extra load WooCommerce adds — look for hosting optimised for it.'],
      ['Configure tax and currency correctly for your region', 'Getting this wrong at launch creates accounting headaches later — verify settings match your actual business requirements.'],
      ['Test the full purchase flow', 'Place a real order through every payment method you offer before going live.'],
    ],
    conclusion: 'A methodical launch checklist prevents the embarrassing scenario of discovering a broken checkout after customers arrive.' },
  { cat: 'woocommerce', title: 'Best WooCommerce Plugins for Growing Stores', read: 5,
    intro: 'As a WooCommerce store grows, a small set of well-chosen plugins covers most operational needs without slowing the site down.',
    tips: [
      ['A caching plugin tuned for WooCommerce', 'Standard caching can break cart and checkout functionality if not configured correctly for dynamic ecommerce pages.'],
      ['An SEO plugin with product schema', 'Helps products show rich results (price, stock, ratings) directly in search listings.'],
      ['A backup plugin with database support', 'Order and customer data lives in the database — make sure backups capture that, not just files.'],
    ],
    conclusion: 'Review installed plugins periodically — remove anything no longer used to keep the store fast and secure.' },
  { cat: 'woocommerce', title: 'WooCommerce vs Shopify: Cost and Control Compared', read: 6,
    intro: 'The cost comparison between WooCommerce and Shopify is more nuanced than the headline "no monthly fee" for WooCommerce suggests.',
    tips: [
      ['Hosting and transaction costs still apply', 'WooCommerce needs quality hosting and, unlike a bundled platform fee, you choose your own payment processor rates.'],
      ['Ownership means more responsibility', 'Updates, security and backups are your responsibility (or your developer\'s) rather than handled by the platform.'],
      ['Customisation ceiling is higher', 'Because it runs on WordPress, WooCommerce can be extended almost without limit for specific business needs.'],
    ],
    conclusion: 'For businesses that want maximum long-term control and already use WordPress, WooCommerce is usually the better fit despite the extra setup effort.' },
  { cat: 'woocommerce', title: 'Speeding Up a Slow WooCommerce Store', read: 6,
    intro: 'WooCommerce stores tend to slow down as product catalogues and order history grow, but most causes are fixable without a full rebuild.',
    tips: [
      ['Upgrade hosting if needed', 'A store that has outgrown its hosting plan is the most common cause of slowdowns as traffic and catalogue size increase.'],
      ['Optimise the product database', 'Old transient data and unused order statuses can bloat the database over time — periodic cleanup helps.'],
      ['Compress and lazy-load product images', 'Category pages with dozens of full-size images are a common bottleneck — compression and lazy loading fix this quickly.'],
    ],
    conclusion: 'Run a speed test on both a product page and the cart/checkout flow specifically, since these are the pages that most affect conversion.' },
  { cat: 'woocommerce', title: 'Setting Up Secure Payments in WooCommerce', read: 5,
    intro: 'Payment security is non-negotiable for any store handling card details, and WooCommerce makes it straightforward if set up correctly from the start.',
    tips: [
      ['Use a PCI-compliant payment gateway', 'Reputable gateways like Stripe or PayPal handle card data directly so it never touches your own server.'],
      ['Keep SSL certificates valid site-wide', 'Every page, not just checkout, should be served over HTTPS to protect customer sessions.'],
      ['Enable fraud detection tools', 'Most major gateways include basic fraud screening — make sure it is switched on, not left at default-off.'],
    ],
    conclusion: 'Getting payment security right protects both customers and the business from costly disputes and chargebacks.' },
  { cat: 'woocommerce', title: 'Managing Inventory Efficiently in WooCommerce', read: 5,
    intro: 'Inventory mistakes — overselling out-of-stock items or losing track of variations — are one of the most common operational headaches for growing stores.',
    tips: [
      ['Enable stock management per product', 'Turn on WooCommerce\'s built-in stock tracking rather than managing counts manually outside the system.'],
      ['Set low-stock notifications', 'Get notified before an item actually runs out so reordering happens with enough lead time.'],
      ['Use an inventory plugin for multi-channel selling', 'If you also sell on marketplaces or in-store, sync stock levels to avoid overselling.'],
    ],
    conclusion: 'Accurate inventory builds customer trust — nothing damages it faster than a confirmed order that cannot actually be fulfilled.' },
  { cat: 'woocommerce', title: 'WooCommerce SEO: Getting Product Pages to Rank', read: 6,
    intro: 'Product pages often compete against large marketplaces for the same keywords, so small stores need to be deliberate about SEO.',
    tips: [
      ['Write genuinely unique product copy', 'Avoid using manufacturer descriptions verbatim, which creates duplicate content shared across many other sites.'],
      ['Use structured data for products', 'Schema markup helps Google show price, availability and reviews directly in search results.'],
      ['Build category pages with real content', 'A short intro paragraph on category pages, not just a product grid, gives search engines more to work with.'],
    ],
    conclusion: 'SEO for product-based sites takes longer to show results than a blog, but compounds well once rankings are established.' },
  { cat: 'woocommerce', title: 'Reducing Cart Abandonment in WooCommerce', read: 5,
    intro: 'Like any ecommerce platform, WooCommerce stores lose a share of sales at checkout — usually to fixable friction points.',
    tips: [
      ['Simplify the checkout fields', 'Remove any field not strictly necessary for order fulfilment — every extra field reduces completion rate.'],
      ['Offer multiple payment options', 'Some customers abandon simply because their preferred payment method is not available.'],
      ['Send an automated cart recovery email', 'A follow-up plugin can email customers who leave items in their cart, recovering a portion of otherwise-lost sales.'],
    ],
    conclusion: 'Small checkout friction adds up across thousands of visits — treat abandonment rate as a metric worth actively improving.' },
  { cat: 'woocommerce', title: 'WooCommerce Shipping Settings Explained', read: 5,
    intro: 'Shipping configuration mistakes are one of the most common causes of checkout errors, since rates depend on zones, weight and class settings interacting correctly.',
    tips: [
      ['Define shipping zones clearly', 'Make sure every region you serve has an assigned zone and rate — an unassigned region can silently block checkout for those customers.'],
      ['Use shipping classes for special items', 'Bulky or fragile products often need different rates — shipping classes let you apply this without per-product overrides.'],
      ['Test rates from a customer\'s perspective', 'Add products to a cart from different regions and verify the calculated shipping cost is correct before launch.'],
    ],
    conclusion: 'Shipping setup is easy to get wrong invisibly — a thorough test pass before launch avoids costly surprises later.' },
  { cat: 'woocommerce', title: 'Keeping a WooCommerce Store Secure and Updated', read: 5,
    intro: 'Because WooCommerce runs on WordPress, it inherits both its flexibility and its need for regular security maintenance.',
    tips: [
      ['Update WooCommerce, WordPress and extensions together', 'Test updates on staging first for stores with custom code, since ecommerce sites are more sensitive to breaking changes.'],
      ['Limit admin access', 'Only give store-management access to staff who need it, and use strong, unique passwords for every account.'],
      ['Monitor for suspicious activity', 'A security plugin that logs login attempts and file changes helps catch problems early.'],
    ],
    conclusion: 'A well-maintained WooCommerce store is a moving target for attackers — consistent upkeep is the best defence.' },

  // ---------------- ECOMMERCE ----------------
  { cat: 'ecommerce', title: 'Ecommerce Trends Shaping 2026', read: 5,
    intro: 'Online retail keeps evolving, and UK businesses that adapt early to genuine shifts in customer behaviour — rather than chasing every trend — tend to come out ahead.',
    tips: [
      ['Mobile-first checkout is now the baseline', 'The majority of ecommerce traffic is mobile, so checkout flows designed mobile-first, not adapted from desktop, convert noticeably better.'],
      ['AI-assisted product recommendations', 'Smart recommendation widgets increase average order value by surfacing relevant products at the right moment.'],
      ['Buy-now-pay-later options', 'Flexible payment options at checkout have become an expected feature for higher-value purchases.'],
    ],
    conclusion: 'The common thread across these trends is reducing friction between a customer wanting something and being able to buy it.' },
  { cat: 'ecommerce', title: 'Single Vendor vs Multi-Vendor Ecommerce: Which to Choose', read: 6,
    intro: 'The choice between a single-vendor store and a multi-vendor marketplace shapes almost every other technical and business decision that follows.',
    tips: [
      ['Single vendor: simpler to manage', 'One catalogue, one set of policies, and full control over branding and customer experience.'],
      ['Multi-vendor: scales inventory faster', 'Bringing in third-party sellers grows product range quickly, but requires vendor management, commission handling and quality control.'],
      ['Consider your long-term business model', 'A marketplace is a genuinely different business (you are managing sellers, not just selling), not simply a bigger version of a single store.'],
    ],
    conclusion: 'Most businesses should start single-vendor and prove the model before considering the added complexity of a marketplace.' },
  { cat: 'ecommerce', title: 'Payment Gateway Options for UK Ecommerce Stores', read: 5,
    intro: 'Choosing a payment gateway affects conversion rate, fees and which customers can complete a purchase at all.',
    tips: [
      ['Stripe', 'Widely used, developer-friendly, and supports a broad range of card and digital wallet payments with competitive rates.'],
      ['PayPal', 'Still trusted by many UK shoppers as a familiar, low-friction option, particularly for higher-value purchases.'],
      ['Digital wallets (Apple Pay / Google Pay)', 'One-tap checkout on mobile significantly reduces abandonment for customers who have these set up.'],
    ],
    conclusion: 'Offering more than one payment method, rather than relying on a single gateway, captures customers with different preferences.' },
  { cat: 'ecommerce', title: 'How to Improve Ecommerce Conversion Rates', read: 6,
    intro: 'Conversion rate improvements compound — a small percentage gain applied across all traffic adds up to meaningful revenue over a year.',
    tips: [
      ['Simplify the path to purchase', 'Remove unnecessary steps between a customer deciding to buy and completing checkout.'],
      ['Add trust signals near the buy button', 'Reviews, secure payment badges and clear return policies reduce hesitation at the critical moment.'],
      ['Test one change at a time', 'A/B testing individual changes shows which ones actually move the needle, rather than guessing.'],
    ],
    conclusion: 'Conversion optimisation is a continuous process, not a one-time project — small consistent gains matter more than one big overhaul.' },
  { cat: 'ecommerce', title: 'Building Customer Trust on a New Online Store', read: 5,
    intro: 'New stores without an established reputation need to actively build trust signals that established brands get for free.',
    tips: [
      ['Show real contact information', 'A visible phone number, email and physical address makes a store feel like a real business rather than anonymous.'],
      ['Display clear policies upfront', 'Shipping times, returns and refund policy should be easy to find, not buried in fine print.'],
      ['Collect and display early reviews', 'Even a handful of genuine reviews meaningfully increases buyer confidence for a new store.'],
    ],
    conclusion: 'Trust is built through transparency — the more clearly a store communicates what to expect, the more confident customers feel buying.' },
  { cat: 'ecommerce', title: 'Ecommerce Checkout Optimisation: Reducing Drop-Off', read: 6,
    intro: 'Checkout is where the most valuable traffic on the entire site exists — customers who already decided to buy — so drop-off here is the costliest to lose.',
    tips: [
      ['Show a progress indicator', 'Customers are more likely to complete a multi-step checkout when they can see how many steps remain.'],
      ['Avoid surprise costs', 'Display shipping and any fees as early as possible, ideally before the final payment step.'],
      ['Offer guest checkout', 'Requiring account creation before purchase is one of the most common reasons customers abandon at this stage.'],
    ],
    conclusion: 'Every field and step removed from checkout is one less opportunity for a customer to give up partway through.' },
  { cat: 'ecommerce', title: 'Inventory Management Tips for Growing Online Stores', read: 5,
    intro: 'As product range and order volume grow, manual inventory tracking stops being reliable and starts causing real problems.',
    tips: [
      ['Set reorder points, not just low-stock alerts', 'Know the lead time for restocking and set alerts early enough to avoid actually running out.'],
      ['Sync inventory across all sales channels', 'If selling on multiple platforms, unsynced stock levels lead to overselling and cancelled orders.'],
      ['Review slow-moving stock regularly', 'Identify products that are not selling and adjust pricing or marketing before they tie up capital indefinitely.'],
    ],
    conclusion: 'Good inventory management is invisible to customers when done well, and very visible to them when it fails.' },
  { cat: 'ecommerce', title: 'Mobile Shopping: Optimising Ecommerce for Mobile Users', read: 5,
    intro: 'Mobile now accounts for the majority of ecommerce browsing, so a store that merely "works" on mobile is leaving conversions on the table compared to one designed for it.',
    tips: [
      ['Use large, thumb-friendly tap targets', 'Buttons and links should be sized and spaced for fingers, not just precise mouse clicks.'],
      ['Minimise typing at checkout', 'Autofill support, address lookup and digital wallets reduce the friction of typing on a small keyboard.'],
      ['Test on real devices', 'Browser dev tools approximate mobile, but testing on an actual phone catches issues simulators miss.'],
    ],
    conclusion: 'Treat mobile as the primary design target, with desktop as the secondary experience, rather than the other way round.' },
  { cat: 'ecommerce', title: 'Email Marketing Strategies for Ecommerce Businesses', read: 6,
    intro: 'Email remains one of the highest-return marketing channels for ecommerce, particularly for repeat purchases from an existing customer base.',
    tips: [
      ['Automate abandoned cart emails', 'These are typically the highest-converting automated emails a store can set up, recovering otherwise-lost sales.'],
      ['Segment by purchase behaviour', 'First-time buyers, repeat customers and lapsed customers respond to different messaging — avoid one-size-fits-all campaigns.'],
      ['Keep a consistent sending schedule', 'Irregular sending hurts engagement over time — a predictable, moderate frequency performs better than sporadic bursts.'],
    ],
    conclusion: 'A well-run email programme often outperforms paid advertising on cost-per-sale once a reasonable list size is built.' },
  { cat: 'ecommerce', title: 'Choosing the Right Ecommerce Platform for Your Business', read: 6,
    intro: 'Platform choice affects cost, control and ceiling for growth, and switching later is expensive — worth getting right from the start.',
    tips: [
      ['Match the platform to your catalogue complexity', 'A simple catalogue with few products has very different needs from a large multi-variant inventory.'],
      ['Consider total cost of ownership', 'Include hosting, transaction fees, apps and maintenance, not just the headline platform price.'],
      ['Plan for growth, not just launch', 'Pick a platform that can handle the scale you expect in two to three years, not just what you need on day one.'],
    ],
    conclusion: 'The best platform is the one that fits your specific catalogue, budget and growth plans — not necessarily the most popular one.' },

  // ---------------- GRAPHICS DESIGN ----------------
  { cat: 'graphics', title: 'Graphics Design Ideas That Build Brand Trust', read: 4,
    intro: 'Good design signals professionalism before a customer reads a single word of copy — it is often the deciding factor in whether they trust a small business.',
    tips: [
      ['Consistency across every touchpoint', 'The same colours, fonts and logo usage across website, social media and print builds instant recognition.'],
      ['Whitespace is a design choice', 'Cramming everything onto a page reads as amateur — deliberate spacing makes content easier to read and feel premium.'],
      ['Invest in one strong hero image', 'A single high-quality image often does more for perceived quality than a dozen mediocre graphics.'],
    ],
    conclusion: 'Design consistency compounds over time — every consistent touchpoint reinforces the brand a little more.' },
  { cat: 'graphics', title: 'Logo Design Basics Every Business Owner Should Know', read: 5,
    intro: 'A logo does not need to be complex to be effective — some of the most recognisable logos in the world are extremely simple.',
    tips: [
      ['Design for scalability', 'A logo must work as a tiny favicon and as a large banner — test it at both extremes before finalising.'],
      ['Limit the colour palette', 'Two to three colours, used consistently, are more memorable and versatile than a busy multi-colour design.'],
      ['Avoid trend-chasing fonts', 'Highly trendy typefaces date quickly — a more classic choice keeps the logo relevant for longer.'],
    ],
    conclusion: 'A good logo is simple enough to be instantly recognisable and flexible enough to work everywhere the brand appears.' },
  { cat: 'graphics', title: 'Choosing Brand Colours That Match Your Business', read: 5,
    intro: 'Colour choice affects how a brand is perceived before any conscious thought happens — it is one of the highest-leverage design decisions a business makes.',
    tips: [
      ['Consider industry expectations', 'Certain colours carry associations (trust, energy, luxury) that differ by industry — know the norms before deliberately breaking them.'],
      ['Pick a primary and a small support palette', 'One dominant colour plus two supporting tones is easier to apply consistently than a large arbitrary palette.'],
      ['Test for accessibility', 'Ensure text-on-background colour combinations meet contrast standards so content stays readable for everyone.'],
    ],
    conclusion: 'Once chosen, apply the palette consistently everywhere — inconsistent colour use undermines brand recognition faster than a mediocre palette used consistently.' },
  { cat: 'graphics', title: 'Designing Social Media Graphics That Get Noticed', read: 4,
    intro: 'Social feeds move fast, so graphics need to communicate their point in under a second of scroll time.',
    tips: [
      ['Lead with one clear message', 'A single bold statement per graphic outperforms cramming multiple points into one image.'],
      ['Design for the platform\'s native format', 'A graphic resized awkwardly from another platform looks noticeably worse than one designed for its actual dimensions.'],
      ['Keep brand elements consistent', 'A recognisable colour scheme or layout style across posts helps a feed feel cohesive rather than ad hoc.'],
    ],
    conclusion: 'Consistency and clarity beat cleverness — the graphics that perform best are usually the simplest to understand at a glance.' },
  { cat: 'graphics', title: 'Print vs Digital Design: What Changes and What Stays the Same', read: 5,
    intro: 'The same brand needs to work convincingly in both print and digital contexts, which have different technical requirements but shared design principles.',
    tips: [
      ['Colour modes differ', 'Print uses CMYK while screens use RGB — colours can shift between the two if not converted and checked properly.'],
      ['Resolution requirements are stricter for print', 'Print needs much higher resolution files than web, so always design or export at print-ready specifications.'],
      ['Core brand identity stays constant', 'Logo, colours and typography should remain recognisable across both mediums even as layout adapts.'],
    ],
    conclusion: 'Planning for both mediums from the start avoids costly rework when a digital-first brand later needs a print piece, or vice versa.' },
  { cat: 'graphics', title: 'Building a Brand Identity Kit for a Small Business', read: 6,
    intro: 'A brand identity kit turns one-off design decisions into a reusable system, saving time and keeping everything consistent as the business grows.',
    tips: [
      ['Document logo usage rules', 'Include minimum sizes, clear space requirements and acceptable colour variations so anyone using the logo does so correctly.'],
      ['Define the colour palette with exact codes', 'Provide hex, RGB and CMYK values so colours stay consistent across every tool and printer used.'],
      ['Specify typography choices', 'Name the primary and secondary fonts, with fallback options for platforms where the primary font is unavailable.'],
    ],
    conclusion: 'A documented identity kit means anyone — a new hire, a freelancer, a print shop — can produce on-brand materials without guesswork.' },
  { cat: 'graphics', title: 'Common Logo Design Mistakes to Avoid', read: 4,
    intro: 'Many logo problems are avoidable with a bit of foresight before the design is finalised and rolled out everywhere.',
    tips: [
      ['Overcomplicating the design', 'Too many elements make a logo hard to reproduce small or in a single colour — simplicity ages better.'],
      ['Relying on a trendy effect', 'Gradients, bevels or trendy styles that are popular today often look dated within a few years.'],
      ['Skipping trademark and uniqueness checks', 'A logo too similar to an existing brand creates legal risk and confuses customers.'],
    ],
    conclusion: 'A logo is a long-term asset — it is worth the extra care to get right before it appears on everything the business produces.' },
  { cat: 'graphics', title: 'How Good Design Improves Customer Trust', read: 5,
    intro: 'Customers form an impression of professionalism and reliability within seconds, largely based on visual design, before evaluating the actual product or service.',
    tips: [
      ['Polished design signals attention to detail', 'If a business is careful about its visual presentation, customers reasonably infer it is careful about its actual work too.'],
      ['Inconsistency undermines credibility', 'Mismatched fonts, colours or quality across different materials makes a business look less established than it may actually be.'],
      ['Design should match the price point', 'A premium-priced service with amateur design creates a mismatch that makes customers question the value.'],
    ],
    conclusion: 'Design is not just decoration — it is a direct signal of quality that customers use, consciously or not, to judge a business.' },
  { cat: 'graphics', title: 'Packaging Design Tips for Small Product Businesses', read: 5,
    intro: 'For physical products, packaging is often the first and most tactile brand touchpoint a customer experiences.',
    tips: [
      ['Design for the unboxing moment', 'A thoughtful unboxing experience increases perceived value and encourages social sharing.'],
      ['Keep essential information legible', 'Ingredients, usage instructions or care labels must stay readable even as the design gets creative.'],
      ['Consider shelf and photography impact', 'Packaging needs to stand out both in person on a shelf and as a small thumbnail in online listings.'],
    ],
    conclusion: 'Good packaging pays for itself through higher perceived value and stronger word-of-mouth from a memorable customer experience.' },
  { cat: 'graphics', title: 'Typography Basics for Non-Designers', read: 5,
    intro: 'Typography choices affect readability and perceived professionalism more than most business owners realise, and a few basic rules avoid the most common mistakes.',
    tips: [
      ['Limit yourself to two typefaces', 'One for headings, one for body text — more than that usually looks chaotic rather than intentional.'],
      ['Prioritise readability over style', 'A beautiful font that is hard to read at small sizes will frustrate readers regardless of how it looks.'],
      ['Use consistent hierarchy', 'Headings, subheadings and body text should be clearly distinguished by size and weight, applied consistently throughout.'],
    ],
    conclusion: 'Good typography is often invisible — readers simply absorb the content without friction, which is exactly the point.' },
];

// slug + date assignment
const today = new Date('2026-07-08');
POSTS.forEach((p, i) => {
  p.slug = p.title.toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const d = new Date(today);
  d.setDate(d.getDate() - i * 5);
  p.date = d.toISOString().slice(0, 10);
  p.dateLabel = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
});

// ---------------- write data file for blog.html to render cards from ----------------
const dataJs = `/* Auto-generated by scripts/gen-blog.js — do not hand-edit, regenerate instead. */
window.BLOG_CATEGORIES = ${JSON.stringify(CATS, null, 2)};
window.BLOG_POSTS = ${JSON.stringify(POSTS.map(p => ({
  slug: p.slug, cat: p.cat, title: p.title, excerpt: p.intro, read: p.read, date: p.date, dateLabel: p.dateLabel,
})), null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '../assets/data/blog-posts.js'), dataJs);

// ---------------- write each post page ----------------
const postTemplate = (p) => {
  const c = CATS[p.cat];
  const tipsHtml = p.tips.map(([h, body]) => `      <div class="case-study-block">
        <h5>${h}</h5>
        <p>${body}</p>
      </div>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.title} | WINWINIT Blog</title>
<meta name="description" content="${p.intro.replace(/"/g, '&quot;')}">
<link rel="icon" href="../assets/images/logo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css?v=6">
</head>
<body>

<div id="site-header" data-root=".."></div>

<section class="page-hero">
  <div class="container">
    <span class="section-tag">${c.label}</span>
    <h1 style="font-size:36px;font-weight:800;color:var(--text);max-width:760px;margin:0 auto;">${p.title}</h1>
    <div class="blog-meta" style="justify-content:center;margin-top:14px;"><span>${p.dateLabel}</span><span>${p.read} min read</span></div>
    <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="../blog.html">Blog</a> / <span>${p.title}</span></div>
  </div>
</section>

<section>
  <div class="container prose" style="max-width:760px;">
    <div style="width:100%;height:220px;border-radius:var(--radius);background:${c.color};display:flex;align-items:center;justify-content:center;font-size:64px;margin-bottom:32px;">${c.icon}</div>
    <p>${p.intro}</p>
${tipsHtml}
    <p>${p.conclusion}</p>
  </div>
</section>

<!-- ========== CTA ========== -->
<section style="padding-top:0;">
  <div class="cta-section reveal">
    <div class="cta-icon">${c.icon}</div>
    <h2>Need Help With Your ${c.label} Project?</h2>
    <p>Talk to WINWINIT about turning these ideas into results for your business.</p>
    <div class="cta-actions">
      <a href="../contact.html" class="btn btn-white">Get In Touch →</a>
    </div>
  </div>
</section>

<div id="site-footer" data-root=".."></div>

<script src="../assets/js/partials.js?v=6"></script>
<script src="../assets/js/script.js?v=6"></script>
</body>
</html>
`;
};

const blogDir = path.join(__dirname, '../blog');
POSTS.forEach(p => {
  fs.writeFileSync(path.join(blogDir, `${p.slug}.html`), postTemplate(p));
});

console.log(`Generated ${POSTS.length} blog posts + assets/data/blog-posts.js`);
