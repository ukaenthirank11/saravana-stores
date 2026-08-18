const PRODUCT_DEFAULTS = { stock: 24, currency: "INR", rating: 4.8, reviews: 24, imageOrientation: "portrait" };
const PUBLIC_ASSET_ROOT = "public";
const product = data => ({ ...PRODUCT_DEFAULTS, ...data, image: `${PUBLIC_ASSET_ROOT}/products/${data.id}.png` });

const PRODUCTS = [
  product({
    id: "brass-lotus-multi-diya-urli-stand", name: "Brass Lotus Multi Diya Urli Stand", price: 8999, category: "Diyas & Lighting", sku: "DC-IN-0001",
    description: "Elegant handcrafted brass urli with lotus candle holder and multiple diyas, perfect for festive décor and pooja rooms.",
    details: { material: "Premium Brass", finish: "Polished Gold", idealFor: "Festivals & Temple Décor" },
    features: ["Handmade", "10 Diya Holders", "Large Urli Bowl"]
  }),
  product({
    id: "brass-lotus-deepam-set-of-3", name: "Brass Lotus Deepam (Set of 3)", price: 2499, category: "Diyas & Lighting", sku: "DC-IN-0002",
    description: "Traditional lotus-shaped brass deepams that add divine elegance to every prayer and celebration.",
    details: { material: "Solid Brass", finish: "Antique Polish", idealFor: "Daily Pooja" },
    features: ["Set of 3", "Stable Base", "Handmade"]
  }),
  product({
    id: "silver-finish-kumkum-haldi-bowls-set-of-2", name: "Silver Finish Kumkum & Haldi Bowls (Set of 2)", price: 1299, category: "Pooja Essentials", sku: "DC-IN-0003",
    description: "Decorative lotus bowls for storing kumkum, turmeric, flowers, and sacred offerings.",
    details: { material: "Metal", finish: "Silver Finish", idealFor: "Pooja Essentials" },
    features: ["Set of 2", "Decorative Lotus Design", "Easy to Clean"]
  }),
  product({
    id: "brass-lotus-urli-bowl", name: "Brass Lotus Urli Bowl", price: 3299, category: "Sacred Décor", sku: "DC-IN-0004",
    description: "Beautiful lotus-inspired brass urli for floating flowers, candles, and festive decorations.",
    details: { material: "Premium Brass", finish: "Antique Gold Finish", idealFor: "Home Entrance" },
    features: ["Heavy-Duty Construction", "Handmade"]
  }),
  product({
    id: "wooden-dhoop-burner-box", name: "Wooden Dhoop Burner Box", price: 2199, category: "Pooja Essentials", sku: "DC-IN-0005",
    description: "Premium handcrafted wooden incense burner with brass lining for a clean aromatic experience.",
    details: { material: "Wood & Brass", finish: "Natural Wood", idealFor: "Dhoop & Sambrani" },
    features: ["Ventilated Lid", "Heat Resistant", "Handmade"]
  }),
  product({
    id: "wooden-temple-diya-stand", name: "Wooden Temple Diya Stand", price: 5499, category: "Diyas & Lighting", sku: "DC-IN-0006",
    description: "Traditional wooden pooja stand with multiple brass diya holders for devotional lighting.",
    details: { material: "Wood & Brass", finish: "Walnut Finish", idealFor: "Home Temple Use" },
    features: ["Decorative Brass Accents", "Handmade"]
  }),
  product({
    id: "decorative-brass-aarti-spoon", name: "Decorative Brass Aarti Spoon", price: 899, category: "Pooja Essentials", sku: "DC-IN-0007",
    description: "Traditional brass aarti spoon for offering ghee during pooja and religious ceremonies.",
    details: { material: "Solid Brass", finish: "Antique Finish", idealFor: "Aarti & Havan" },
    features: ["Comfortable Grip", "Durable Construction"]
  }),
  product({
    id: "antique-brass-temple-bell", name: "Antique Brass Temple Bell", price: 1599, category: "Pooja Essentials", sku: "DC-IN-0008",
    description: "Finely engraved brass temple bell producing a soothing and devotional sound.",
    details: { material: "Premium Brass", finish: "Antique Gold Finish", idealFor: "Temple Use" },
    features: ["Handmade", "Loud Resonance"]
  }),
  product({
    id: "antique-hanging-door-decor-pair", name: "Antique Hanging Door Decor (Pair)", price: 1499, category: "Sacred Décor", sku: "DC-IN-0009",
    description: "Elegant handcrafted hanging décor inspired by traditional Indian palace entrances.",
    details: { material: "Premium Metal", finish: "Antique Gold Finish", idealFor: "Door & Wall Décor" },
    features: ["Set of 2", "Rust Resistant", "Decorative Hanging"]
  }),
  product({
    id: "mahalakshmi-decorative-wall-plate", name: "Mahalakshmi Decorative Wall Plate", price: 1999, category: "Sacred Décor", sku: "DC-IN-0010",
    description: "Embossed Goddess Lakshmi decorative plate symbolizing prosperity and blessings.",
    details: { material: "Metal/Resin", finish: "Antique Bronze Finish", idealFor: "Home Décor" },
    features: ["Display Stand Included", "Premium Decorative Piece"]
  }),
  product({
    id: "wooden-temple-mini-mandir", name: "Wooden Temple (Mini Mandir)", price: 2299, category: "Temples & Altars", sku: "DC-IN-0011",
    description: "Compact handcrafted wooden temple with elegant laser-cut Om design.",
    details: { material: "MDF & Wood", finish: "Walnut Finish", idealFor: "Home & Office" },
    features: ["Lightweight", "Easy Assembly"]
  }),
  product({
    id: "goddess-lakshmi-idol", name: "Goddess Lakshmi Idol", price: 3499, category: "Divine Idols", sku: "DC-IN-0012",
    description: "Beautiful Lakshmi idol seated on a lotus representing wealth and prosperity.",
    details: { material: "Premium Resin", finish: "Metallic Gold Finish", idealFor: "Pooja & Gifting" },
    features: ["Handcrafted Design"]
  }),
  product({
    id: "lord-shiva-meditation-statue", name: "Lord Shiva Meditation Statue", price: 3299, category: "Divine Idols", sku: "DC-IN-0013",
    description: "Divine Lord Shiva sculpture in a peaceful meditative posture.",
    details: { material: "Premium Resin", finish: "Antique Gold Finish", idealFor: "Meditation Rooms" },
    features: ["Decorative Base"]
  }),
  product({
    id: "silver-finish-kalash", name: "Silver Finish Kalash", price: 1799, category: "Pooja Essentials", sku: "DC-IN-0014",
    description: "Traditional decorative Kalash with intricate engravings and Om motif.",
    details: { material: "Metal", finish: "Silver Polish", idealFor: "Religious Ceremonies" },
    features: ["Decorative Hanging Elements"]
  }),
  product({
    id: "elephant-oil-lamp-stand-set-of-2", name: "Elephant Oil Lamp Stand (Set of 2)", price: 2499, category: "Diyas & Lighting", sku: "DC-IN-0015",
    description: "Artistic elephant-shaped diya holders symbolizing wisdom and prosperity.",
    details: { material: "Metal", finish: "Silver Finish with Gold Tusks", idealFor: "Elegant Table Décor" },
    features: ["Set of 2"]
  }),
  product({
    id: "luxury-glass-bottle-tumbler-set", name: "Luxury Glass Bottle & Tumbler Set", price: 2799, category: "Sacred Décor", sku: "DC-IN-0016",
    description: "Premium designer glass bottle with two matching tumblers for elegant serving.",
    details: { material: "Borosilicate Glass", finish: "Premium Finish", idealFor: "Elegant Serving" },
    features: ["Includes Bottle & 2 Glasses", "Decorative Metal Sleeve"]
  }),
  product({
    id: "traditional-brass-pooja-thali-set", name: "Traditional Brass Pooja Thali Set", price: 2999, category: "Pooja Essentials", sku: "DC-IN-0017",
    description: "Complete handcrafted brass pooja thali set for rituals and festive occasions.",
    details: { material: "Pure Brass", finish: "Handmade Finish", idealFor: "Temple Use" },
    features: ["Includes Thali, Kalash, Diyas & Containers"]
  }),
  product({
    id: "brass-incense-stick-holder-with-cover", name: "Brass Incense Stick Holder with Cover", price: 699, category: "Pooja Essentials", sku: "DC-IN-0018",
    description: "Elegant brass incense holder designed to keep ash neatly collected.",
    details: { material: "Premium Brass", finish: "Antique Gold Finish", idealFor: "Incense & Home Temple" },
    features: ["Decorative Perforated Cover", "Holds 4 Incense Sticks", "Easy Cleaning"]
  }),
  product({
    id: "handcrafted-wooden-krishna-jhula", name: "Handcrafted Wooden Krishna Jhula", price: 2499, category: "Temples & Altars", sku: "DC-IN-0019",
    description: "Beautiful carved wooden swing with Bal Krishna idol for Janmashtami celebrations.",
    details: { material: "Solid Wood", finish: "Traditional Carving", idealFor: "Janmashtami Celebrations" },
    features: ["Brass Finish Idol", "Red Velvet Cushion", "Decorative Swing"]
  }),
  product({
    id: "traditional-wooden-decorative-horse", name: "Traditional Wooden Decorative Horse", price: 1299, category: "Sacred Décor", sku: "DC-IN-0020",
    description: "Classic handcrafted wooden horse symbolizing strength, elegance, and prosperity.",
    details: { material: "Premium Wood", finish: "Hand-Polished Finish", idealFor: "Home Décor" },
    features: ["Brass Decorative Accents", "Artisan Craftsmanship"]
  }),
  product({
    id: "kamadhenu-cow-with-calf-statue", name: "Kamadhenu Cow with Calf Statue", price: 1799, category: "Divine Idols", sku: "DC-IN-0021",
    description: "Sacred Kamadhenu cow with calf in antique silver finish symbolizing abundance.",
    details: { material: "Metal Alloy", finish: "Antique Silver Finish", idealFor: "Temple & Home Décor" },
    features: ["Embossed Artwork"]
  }),
  product({
    id: "brass-lord-murugan-statue", name: "Brass Lord Murugan Statue", price: 2999, category: "Divine Idols", sku: "DC-IN-0022",
    description: "Exquisitely crafted Lord Murugan idol with traditional South Indian temple detailing.",
    details: { material: "Pure Brass", finish: "Antique Gold Finish", idealFor: "Spiritual Décor" },
    features: ["Fine Handcrafted Details", "Durable Construction"]
  }),
  product({
    id: "black-lord-vishnu-idol", name: "Black Lord Vishnu Idol", price: 1899, category: "Divine Idols", sku: "DC-IN-0023",
    description: "Elegant black-finish Lord Vishnu statue with intricate craftsmanship.",
    details: { material: "Premium Resin / Poly Stone", finish: "Matte Black Finish", idealFor: "Home Temple Display" },
    features: ["Lightweight", "Detailed Design"]
  }),
  product({
    id: "brass-lord-ganesha-idol", name: "Brass Lord Ganesha Idol", price: 2299, category: "Divine Idols", sku: "DC-IN-0024",
    description: "Premium brass Lord Ganesha idol symbolizing wisdom, prosperity, and success.",
    details: { material: "Solid Brass", finish: "Antique Gold Finish", idealFor: "Home & Office" },
    features: ["Traditional Carvings", "Long-Lasting Quality"]
  })
];

const MAX_CATALOG_PRODUCTS = 24;
const CATALOG_PRODUCT_IDS = Object.freeze(PRODUCTS.map(item => item.id));
const CATALOG_PRODUCTS = Object.freeze([...PRODUCTS]);

if (CATALOG_PRODUCTS.length !== MAX_CATALOG_PRODUCTS) {
  throw new Error(`The storefront catalogue must contain exactly ${MAX_CATALOG_PRODUCTS} products.`);
}

const CATEGORIES = [
  ["Diyas & Lighting", 4, "brass-lotus-multi-diya-urli-stand"],
  ["Pooja Essentials", 7, "traditional-brass-pooja-thali-set"],
  ["Sacred Décor", 5, "mahalakshmi-decorative-wall-plate"],
  ["Temples & Altars", 2, "wooden-temple-mini-mandir"],
  ["Divine Idols", 6, "goddess-lakshmi-idol"]
];

const SITE_BASE_PATH = location.hostname.endsWith(".github.io") ? `/${location.pathname.split("/").filter(Boolean)[0] || ""}` : "";
const sitePath = path => `${SITE_BASE_PATH}${path}`;
const ROUTES = {
  home: "/", categories: "/categories", shop: "/shop", search: "/search",
  wishlist: "/wishlist", cart: "/cart", checkout: "/checkout", success: "/order-success",
  tracking: "/order-tracking", profile: "/profile", orders: "/my-orders", about: "/about",
  contact: "/contact", faq: "/faq", privacy: "/privacy-policy", terms: "/terms-and-conditions",
  returns: "/return-and-refund-policy", login: "/login", register: "/register", admin: "/admin"
};
const PATHS = Object.fromEntries(Object.entries(ROUTES).map(([page, path]) => [page, sitePath(path)]));

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");
const modalLayer = document.querySelector("#modal-layer");
const menu = document.querySelector("#mobile-menu");
const menuToggle = document.querySelector("#menu-toggle");
const networkStatus = document.querySelector("#network-status");
const API_BASE = String(window.DIVINE_API_BASE || "").replace(/\/$/, "");
let installPromptEvent = null;

const state = {
  cart: readStorage("divine-cart", []).filter(item => CATALOG_PRODUCT_IDS.includes(item.id)),
  wishlist: readStorage("divine-wishlist", ["brass-lotus-multi-diya-urli-stand", "brass-lord-ganesha-idol"]).filter(id => CATALOG_PRODUCT_IDS.includes(id)),
  catalog: [...CATALOG_PRODUCTS],
  category: "",
  query: "",
  sort: "popular",
  maxPrice: 9000,
  checkoutStep: 0,
  delivery: "standard",
  payment: "stripe",
  promoApplied: false,
  checkoutBusy: false,
  paymentRuntime: "checking",
  lastOrder: readStorage("divine-last-order", null),
  shippingAddress: {
    full_name: "Ananya Raman",
    email: "ananya.raman@example.in",
    phone: "+91 98765 43210",
    address: "18 Temple Garden Road",
    city: "Chennai",
    state: "Tamil Nadu",
    postal_code: "600004",
    country: "India"
  },
  adminSection: "dashboard",
  loggedIn: true,
  activeTab: "description"
};

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}

function writeStorage() {
  localStorage.setItem("divine-cart", JSON.stringify(state.cart));
  localStorage.setItem("divine-wishlist", JSON.stringify(state.wishlist));
}

function money(value, currency = "INR") {
  if (currency === "INR") return `₹${Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  return `MYR ${Number(value).toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function productCurrency(product) {
  return product?.currency || "INR";
}

function productById(id) {
  return state.catalog.find(product => product.id === id) || state.catalog[0];
}

function image(product, className = "") {
  return `<img class="product-image product-photo ${product.imageOrientation} ${className}" data-product-image="${product.id}" src="${product.image}" alt="${product.name}" loading="lazy" decoding="async">`;
}

function normalizePublicAssetPaths() {
  document.querySelectorAll('[src^="/public/"]').forEach(element => {
    const source = element.getAttribute("src");
    element.setAttribute("src", `${PUBLIC_ASSET_ROOT}/${source.slice("/public/".length)}`);
  });
}

function stars(product) {
  return `<span class="rating" aria-label="${product.rating} out of 5"><b>★</b> ${product.rating} <small>(${product.reviews})</small></span>`;
}

function card(product, quick = true) {
  const saved = state.wishlist.includes(product.id);
  const badge = product.reviews >= 100 ? "Bestseller" : "";
  return `<article class="product-card">
    <div class="card-media">
      <button class="heart ${saved ? "saved" : ""}" data-wishlist="${product.id}" aria-label="${saved ? "Remove from" : "Add to"} wishlist">${saved ? "♥" : "♡"}</button>
      <button class="image-link" data-product="${product.id}" aria-label="View ${product.name}">${image(product)}</button>
      ${quick ? `<button class="quick-link" data-quick="${product.id}">⌕ Quick view</button>` : ""}
    </div>
    <div class="card-copy">
      <div class="card-meta"><span>${product.category}</span>${stars(product)}</div>
      <button class="product-title" data-product="${product.id}">${product.name}</button>
      <span class="stock"><i></i>${product.stock} in stock</span>
      <div class="card-price"><strong>${money(product.price, productCurrency(product))}</strong><button class="card-add" data-add="${product.id}" aria-label="Add ${product.name} to cart"><span>Add to cart</span><b aria-hidden="true">＋</b></button></div>
    </div>
  </article>`;
}

function sectionHeading(kicker, title, text = "", action = "", route = "") {
  return `<div class="section-heading"><div><span class="eyebrow">${kicker}</span><h2>${title}</h2>${text ? `<p>${text}</p>` : ""}</div>${action ? `<button class="text-link" data-nav="${route}">${action} →</button>` : ""}</div>`;
}

function pageHero(kicker, title, text) {
  return `<section class="page-hero"><div class="container"><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${text}</p></div></section>`;
}

function emptyState(icon, title, text, label, route) {
  return `<div class="empty-state"><span>${icon}</span><h2>${title}</h2><p>${text}</p><button class="btn primary" data-nav="${route}">${label}</button></div>`;
}

function trustSection() {
  return `<section class="trust"><div class="container trust-grid">
    <div><span>♧</span><p><strong>Careful Delivery</strong><small>Protective premium packaging</small></p></div>
    <div><span>◇</span><p><strong>Secure Payment</strong><small>Protected Stripe checkout</small></p></div>
    <div><span>✓</span><p><strong>Verified Quality</strong><small>Curated craftsmanship</small></p></div>
    <div><span>↻</span><p><strong>Easy Returns</strong><small>7-day return support</small></p></div>
  </div></section>`;
}

function renderHome() {
  const hero = productById("brass-lord-murugan-statue");
  const bestSellers = ["brass-lotus-multi-diya-urli-stand", "brass-lord-ganesha-idol", "kamadhenu-cow-with-calf-statue", "traditional-brass-pooja-thali-set", "handcrafted-wooden-krishna-jhula", "brass-lotus-deepam-set-of-3"].map(productById);
  const spotlight = productById("handcrafted-wooden-krishna-jhula");
  app.innerHTML = `<section class="hero retail-hero sacred-hero"><div class="container hero-grid">
    <div class="hero-copy">
      <span class="hero-kicker">THE RED DIVINE EDIT</span>
      <h1>Sacred Glow,<br><em>Beautifully Curated</em></h1>
      <p>Discover radiant idols, temple décor and devotional essentials chosen for warm, festive spaces that feel rich, calm and timeless.</p>
      <div class="button-row"><button class="btn primary large hero-cta" data-nav="shop"><span class="cta-icon" aria-hidden="true">✦</span><span>SHOP THE COLLECTION</span></button><button class="hero-text-link browse-categories" data-nav="categories"><span class="browse-icon" aria-hidden="true">☰</span><span>Browse categories</span><span class="browse-arrow">→</span></button></div>
      <div class="hero-proof"><span>4.9</span><p><strong>Loved for rich detail</strong><small>Temple-inspired styling • Secure payment</small></p></div>
    </div>
    <div class="hero-visual"><div class="hero-halo"></div>${image(hero, "hero-image")}<div class="hero-tag"><span>Hero spotlight</span><strong>${hero.name}</strong><small>${money(hero.price, productCurrency(hero))}</small></div><button class="hero-arrow" data-product="${hero.id}" aria-label="View featured product">→</button></div>
    <div class="hero-dots" aria-hidden="true"><i class="active"></i><i></i><i></i></div>
  </div></section>
  ${trustSection()}
  <section class="section home-categories"><div class="container">${sectionHeading("Curated with purpose", "Shop by category", "Explore signature pieces for prayer, décor and meaningful gifting.", "View all", "categories")}<div class="category-grid">${CATEGORIES.map(([name, , id]) => `<button class="category-card" data-category="${name}">${image(productById(id))}<span><strong>${name}</strong><small>Explore collection</small></span></button>`).join("")}</div></div></section>
  <section class="section featured"><div class="container">${sectionHeading("Customer favourites", "Best sellers", "Our most-loved sacred pieces, shown with their original finishes.", "View all products", "shop")}<div class="product-grid home-products">${bestSellers.map(product => card(product)).join("")}</div></div></section>
  <section class="commerce-proof"><div class="container commerce-proof-grid"><div><strong>24</strong><span>Curated products</span></div><div><strong>24</strong><span>Original studio photographs</span></div><div><strong>5</strong><span>Purpose-led categories</span></div><div><strong>7 days</strong><span>Return support</span></div></div></section>
  <section class="section home-spotlight"><div class="container spotlight-grid"><div class="spotlight-media">${image(spotlight)}</div><div class="spotlight-copy"><span class="eyebrow">CRAFTED FOR CELEBRATION</span><h2>Bring devotion into the heart of your home</h2><p>${spotlight.description}</p><ul><li>Original product photography</li><li>Premium materials and careful finishing</li><li>Securely packed for delivery</li></ul><div class="button-row"><button class="btn primary" data-product="${spotlight.id}">View this piece</button><button class="btn outline" data-nav="shop">Explore all products</button></div></div></div></section>
  <section class="section promos"><div class="container"><article class="promo-main"><div class="promo-copy"><span class="eyebrow light">EXCLUSIVE DIVINE EDIT</span><h2>Sacred Spaces,<br>Beautifully Made</h2><p>Discover statement idols and devotional décor selected for enduring beauty.</p><button class="btn promo-button" data-nav="shop">EXPLORE COLLECTION</button></div>${image(productById("black-lord-vishnu-idol"))}</article></div></section>`;
}

function renderCategories() {
  app.innerHTML = `${pageHero("Curated by purpose", "Categories", "Explore pieces for prayer rooms, peaceful interiors and meaningful gifting.")}<section class="section"><div class="container categories-large">${CATEGORIES.map(([name, count, id]) => `<article class="category-large">${image(productById(id))}<div><span>${String(count).padStart(2, "0")} curated ${count === 1 ? "piece" : "pieces"}</span><h2>${name}</h2><button class="btn white" data-category="${name}">View Products →</button></div></article>`).join("")}</div></section>${trustSection()}`;
}

function renderShop() {
  let products = state.catalog.filter(product => (!state.category || product.category === state.category) && product.price <= state.maxPrice && (!state.query || `${product.name} ${product.category}`.toLowerCase().includes(state.query.toLowerCase())));
  products.sort((a, b) => state.sort === "price-low" ? a.price - b.price : state.sort === "price-high" ? b.price - a.price : state.sort === "rating" ? b.rating - a.rating : b.reviews - a.reviews);
  app.innerHTML = `${pageHero("The complete edit", "Shop Saravana Stores", "Premium spiritual accents, photographed in their original finishes and curated for meaningful homes.")}<section class="shop-reassurance"><div class="container"><span>✓ 24 curated products</span><span>◇ Original studio photography</span><span>♧ Securely packed delivery</span><span>↻ 7-day return support</span></div></section><section class="section shop-section"><div class="container shop-layout">
    <aside class="filters"><div class="filter-title"><strong>☷ Filters</strong><button id="reset-filters">Reset</button></div><fieldset><legend>Category</legend>${CATEGORIES.map(([category]) => `<label><input type="radio" name="category-filter" value="${category}" ${state.category === category ? "checked" : ""}>${category}</label>`).join("")}</fieldset><fieldset><legend>Price value</legend><div class="range-label"><span>0</span><span>${Number(state.maxPrice).toLocaleString("en-IN")}</span></div><input id="price-range" type="range" min="100" max="9000" step="100" value="${state.maxPrice}"></fieldset><fieldset><legend>Availability</legend><label><input type="checkbox" checked>In stock only</label></fieldset><fieldset><legend>Rating</legend><label><input type="radio" name="rating-filter">★ 4.5 &amp; above</label><label><input type="radio" name="rating-filter">★ 4.0 &amp; above</label></fieldset></aside>
    <div class="shop-results"><div class="shop-tools"><label class="shop-search">⌕<input id="shop-query" value="${state.query}" placeholder="Search by product or category…" aria-label="Search products"></label><button class="btn filter-button" id="mobile-filter">☷ Filter</button><label class="sort"><small>Sort by</small><select id="sort-select"><option value="popular" ${state.sort === "popular" ? "selected" : ""}>Most popular</option><option value="newest">Newest</option><option value="price-low" ${state.sort === "price-low" ? "selected" : ""}>Price Low to High</option><option value="price-high" ${state.sort === "price-high" ? "selected" : ""}>Price High to Low</option><option value="rating" ${state.sort === "rating" ? "selected" : ""}>Top rated</option></select></label></div><div class="results-line"><span>Showing <strong>${products.length}</strong> of ${state.catalog.length} products</span>${state.category ? `<button id="clear-category">${state.category} ×</button>` : ""}</div>${products.length ? `<div class="product-grid listing">${products.map(product => card(product)).join("")}</div>` : emptyState("⌕", "No pieces found", "Try adjusting your filters to discover more from the collection.", "Reset filters", "shop")}</div>
  </div></section>`;
}

function renderProduct(id) {
  const product = productById(id);
  const saved = state.wishlist.includes(product.id);
  const related = state.catalog.filter(item => item.id !== product.id).slice(0, 3);
  app.innerHTML = `<div class="container breadcrumb"><button data-nav="home">Home</button><span>›</span><button data-nav="shop">Shop</button><span>›</span><b>${product.name}</b></div><section class="container product-layout">
    <div class="gallery"><div class="main-image">${image(product)}<button class="gallery-back" data-nav="shop">‹</button><button class="gallery-heart ${saved ? "saved" : ""}" data-wishlist="${product.id}">${saved ? "♥" : "♡"}</button><button class="zoom-toggle" id="zoom-toggle">⌕ Explore</button></div><div class="photo-source-note"><span>${product.image ? "◇" : "✦"}</span><p><strong>${product.image ? "High-resolution studio photography" : "Photo-free catalogue presentation"}</strong><small>${product.image ? "Original product image shown with true material and finish details" : "Architectural artwork keeps the focus on each product’s identity and details"}</small></p></div></div>
    <div class="product-info"><div class="info-top"><span class="eyebrow">${product.category}</span><button aria-label="Share product">↗</button></div><h1>${product.name}</h1><div class="detail-rating"><span>★★★★★</span>${stars(product)}<small>✓ Verified quality</small></div><strong class="detail-price">${money(product.price, productCurrency(product))}</strong><p class="description">${product.description}</p><div class="quality-cards"><div><b>${product.stock}</b><small>In Stock</small></div><div><b>Premium</b><small>Quality</small></div><div><b>Secure</b><small>Packaging</small></div></div><h3>Why you’ll love it</h3><ul class="feature-list">${product.features.slice(0, 5).map(feature => `<li>✓ ${feature}</li>`).join("")}</ul><div class="purchase"><div><span>Quantity</span><div class="quantity"><button data-detail-minus>−</button><b id="detail-quantity">1</b><button data-detail-plus>＋</button></div></div><div class="button-row"><button class="btn outline flex" data-detail-add="${product.id}">▱ Add to Cart</button><button class="btn primary flex" data-buy="${product.id}">Buy Now →</button></div></div><div class="delivery-note">♧ <span><strong>Carefully packed delivery</strong><small>Delivery timing and available methods are confirmed at checkout</small></span></div><div class="product-assurance"><span><b>◇</b> Secure payment</span><span><b>↻</b> 7-day returns</span><span><b>✓</b> Quality checked</span></div></div>
  </section><section class="section detail-section"><div class="container"><div class="tabs">${["description", "features", "specifications", "reviews", "shipping", "returns"].map(tab => `<button class="${state.activeTab === tab ? "active" : ""}" data-tab="${tab}">${tab[0].toUpperCase() + tab.slice(1)}</button>`).join("")}</div><div class="tab-panel" id="tab-panel">${tabContent(product)}</div></div></section><section class="section related"><div class="container">${sectionHeading("Continue exploring", "Related pieces")}<div class="product-grid related-grid">${related.map(item => card(item, false)).join("")}</div></div></section>`;
}

function tabContent(product) {
  const tab = state.activeTab;
  if (tab === "features") return `<h2>Product features</h2><div class="feature-detail">${product.features.map(feature => `<div>✓ <span>${feature}</span></div>`).join("")}</div>`;
  if (tab === "specifications") return `<h2>Specifications</h2><dl><div><dt>Product code</dt><dd>${product.sku}</dd></div><div><dt>Category</dt><dd>${product.category}</dd></div>${product.details ? `<div><dt>Material</dt><dd>${product.details.material}</dd></div><div><dt>Finish</dt><dd>${product.details.finish}</dd></div><div><dt>Ideal for</dt><dd>${product.details.idealFor}</dd></div>` : `<div><dt>Finish</dt><dd>Premium decorative finish</dd></div>`}<div><dt>Care</dt><dd>Dust gently with a soft, dry cloth</dd></div></dl>`;
  if (tab === "reviews") return `<h2>Customer reviews</h2><div class="review-score"><strong>${product.rating}</strong><span>★★★★★<small>Based on ${product.reviews} verified reviews</small></span></div>`;
  if (tab === "shipping") return `<h2>Shipping information</h2><p>Carefully packed and dispatched throughout India. Standard delivery is 3–5 business days; express delivery is available at checkout.</p>`;
  if (tab === "returns") return `<h2>Return policy</h2><p>Eligible items may be returned within 7 days in their original condition and packaging. Contact our care team before sending an item back.</p>`;
  return `<span class="eyebrow">The story of this piece</span><h2>Craftsmanship with presence</h2><p>${product.description} Every detail has been selected to feel refined, enduring and worthy of a meaningful space.</p>`;
}

function renderSearch() {
  const results = state.query ? state.catalog.filter(product => `${product.name} ${product.category}`.toLowerCase().includes(state.query.toLowerCase())) : [];
  app.innerHTML = `<section class="search-hero"><div class="container"><span class="eyebrow">Discover your next piece</span><h1>What are you looking for?</h1><form id="search-form"><span>⌕</span><input id="search-input" value="${state.query}" placeholder="Search products…" aria-label="Search products"><button class="btn primary">Search</button></form></div></section><section class="section"><div class="container">${state.query ? sectionHeading(`${results.length} results`, `Search results for “${state.query}”`) : `<div class="suggestions"><div><h2>Recent searches</h2><div><button data-search="Divine Idols">◷ Divine Idols</button><button data-search="Pooja Essentials">◷ Pooja Essentials</button></div></div><div><h2>Popular searches</h2><div>${["Lakshmi Idol", "Pooja Thali", "Temple Bell", "Lotus Deepam"].map(term => `<button data-search="${term}">✦ ${term}</button>`).join("")}</div></div></div>`}${state.query ? (results.length ? `<div class="product-grid">${results.map(product => card(product)).join("")}</div>` : emptyState("⌕", "Sorry, we couldn't find anything matching your search.", "Try a different phrase or browse the complete Saravana Stores.", "Browse All Products", "shop")) : ""}</div></section>`;
}

function renderWishlist() {
  const saved = state.catalog.filter(product => state.wishlist.includes(product.id));
  app.innerHTML = `${pageHero("Your curated list", "Wishlist", "Pieces you love, saved together.")}<section class="section"><div class="container">${saved.length ? `<div class="results-line"><span><strong>${saved.length}</strong> saved pieces</span><button id="add-wishlist-cart">Add all to cart →</button></div><div class="product-grid">${saved.map(product => card(product, false)).join("")}</div>` : emptyState("♡", "Your Wishlist is Empty", "Save products you love and find them here.", "Explore Products", "shop")}</div></section>`;
}

function cartItems() {
  return state.cart.map(item => ({ ...item, product: productById(item.id) })).filter(item => item.product);
}

function cartCurrency() {
  return productCurrency(cartItems()[0]?.product);
}

function currencyPricing(currency = "INR") {
  return currency === "INR"
    ? { cartShipping: 99, freeShippingAt: 999, standard: 99, express: 249, promoCap: 500 }
    : { cartShipping: 25, freeShippingAt: 200, standard: 12, express: 35, promoCap: 100 };
}

function cartSubtotal() {
  return cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0);
}

function quantityControl(id, quantity) {
  return `<div class="quantity"><button data-cart-minus="${id}" aria-label="Decrease quantity">−</button><b>${quantity}</b><button data-cart-plus="${id}" aria-label="Increase quantity">＋</button></div>`;
}

function renderCart() {
  const items = cartItems();
  const currency = cartCurrency();
  const pricing = currencyPricing(currency);
  const subtotal = cartSubtotal();
  const shipping = subtotal >= pricing.freeShippingAt ? 0 : pricing.cartShipping;
  app.innerHTML = `${pageHero("Your selection", "Shopping Cart", "Review your pieces before checkout.")}<section class="section"><div class="container cart-layout">${items.length ? `<div class="cart-items"><div class="cart-head"><strong>${items.length} ${items.length === 1 ? "piece" : "pieces"}</strong><button data-nav="shop">Continue shopping →</button></div>${items.map(({ product, quantity }) => `<article class="cart-item">${image(product)}<div><span class="eyebrow">${product.category}</span><h3>${product.name}</h3><small class="stock"><i></i>In stock</small><strong class="mobile-price">${money(product.price, productCurrency(product))}</strong><div class="cart-controls">${quantityControl(product.id, quantity)}<button data-wishlist="${product.id}">♡ Save</button><button class="danger" data-remove="${product.id}">⌫ Remove</button></div></div><strong class="cart-price">${money(product.price * quantity, productCurrency(product))}</strong></article>`).join("")}</div><aside class="summary"><span class="eyebrow">Order summary</span><h2>Your total</h2><dl><div><dt>Subtotal</dt><dd>${money(subtotal, currency)}</dd></div><div><dt>Shipping</dt><dd class="green">${shipping ? money(shipping, currency) : "Complimentary"}</dd></div><div><dt>Discount</dt><dd>${money(0, currency)}</dd></div><div class="total"><dt>Total</dt><dd>${money(subtotal + shipping, currency)}</dd></div></dl><button class="btn primary full" data-nav="checkout">Checkout securely ◇</button><small class="secure">✓ Secure checkout · No card details stored</small><div class="payment-badges"><span>VISA</span><span>Mastercard</span><span>Stripe</span><span>G Pay</span></div></aside>` : emptyState("▱", "Your Cart is Empty", "Discover something meaningful for your space.", "Continue Shopping", "shop")}</div></section>`;
}

function checkoutSteps() {
  const labels = ["Shipping", "Delivery", "Payment", "Confirm"];
  return `<div class="steps">${labels.map((label, index) => `<div class="${index <= state.checkoutStep ? "active" : ""}"><span>${index < state.checkoutStep ? "✓" : index + 1}</span><small>${label}</small>${index < 3 ? "<i></i>" : ""}</div>`).join("")}</div>`;
}

function checkoutStage() {
  const currency = cartCurrency();
  const pricing = currencyPricing(currency);
  if (state.checkoutStep === 1) return `<div class="stage-head"><span>02</span><div><h1>Delivery method</h1><p>Choose the timing that suits you.</p></div></div><div class="choice-list">${[["economy", "Economy", "5–7 business days", 0], ["standard", "Standard", "3–5 business days", pricing.standard], ["express", "Express", "1–2 business days", pricing.express]].map(([id, label, detail, price]) => `<label class="${state.delivery === id ? "selected" : ""}"><input type="radio" name="delivery" value="${id}" ${state.delivery === id ? "checked" : ""}><span class="choice-icon">♧</span><span><strong>${label}</strong><small>${detail}</small></span><b>${price ? money(price, currency) : "Free"}</b></label>`).join("")}</div><div class="promo-box"><div><span>％</span><p><strong>Have a Promo Code?</strong><small>Apply it before continuing.</small></p></div><form id="promo-form"><input required placeholder="Enter promo code"><button>Apply</button></form>${state.promoApplied ? `<small class="promo-ok">✓ DIVINE8 applied — you saved ${money(Math.min(pricing.promoCap, cartSubtotal() * .08), currency)}.</small>` : ""}</div>`;
  if (state.checkoutStep === 2) return `<div class="stage-head"><span>03</span><div><h1>Secure payment</h1><p>Complete payment on Stripe's protected checkout.</p></div></div><div class="choice-list payment-list"><label class="selected stripe-choice"><span class="choice-icon stripe-mark">S</span><span><strong>Stripe secure checkout</strong><small>Cards, FPX and eligible digital wallets are shown securely by Stripe.</small></span><input type="radio" name="payment" value="stripe" checked></label></div><div class="payment-method-row" aria-label="Supported payment types"><span>VISA</span><span>Mastercard</span><span>FPX</span><span>Apple Pay</span><span>G Pay</span></div><div class="payment-runtime ${state.paymentRuntime}"><span></span><p><strong>${state.paymentRuntime === "stripe" ? "Live payment gateway ready" : state.paymentRuntime === "demo" ? "Safe preview mode" : state.paymentRuntime === "offline" ? "Payment service unavailable" : "Checking payment service"}</strong><small>${state.paymentRuntime === "stripe" ? "You will continue to Stripe to authorize payment." : state.paymentRuntime === "demo" ? "Checkout can be tested without making a real charge." : state.paymentRuntime === "offline" ? "Start the FastAPI service to continue checkout." : "Confirming the secure connection…"}</small></p></div><div class="payment-safety">◇ <span><strong>Your payment is protected</strong><small>Prices are recalculated by the server. Saravana Stores never receives or stores raw card details.</small></span></div>`;
  if (state.checkoutStep === 3) return `<div class="stage-head"><span>04</span><div><h1>Review &amp; confirm</h1><p>One last look before opening secure payment.</p></div></div><div class="review-list"><div><b>⌖</b><span><strong>Delivery to</strong><small>${state.shippingAddress.full_name} · ${state.shippingAddress.city}, ${state.shippingAddress.country}</small></span><button data-checkout-edit="0">Edit</button></div><div><b>♧</b><span><strong>${state.delivery[0].toUpperCase() + state.delivery.slice(1)} delivery</strong><small>Estimated arrival: 12–14 August</small></span><button data-checkout-edit="1">Edit</button></div><div><b>▤</b><span><strong>Stripe secure checkout</strong><small>Available methods will be shown on the payment page.</small></span><button data-checkout-edit="2">Edit</button></div></div><label class="terms-check"><input id="checkout-terms" type="checkbox" checked> I agree to the Terms &amp; Conditions and Return Policy.</label>`;
  return `<div class="stage-head"><span>01</span><div><h1>Shipping address</h1><p>Where should we send your collection?</p></div></div><div class="address-tabs"><button class="active" type="button">Saved address</button><button id="show-new-address" type="button">＋ Add new address</button></div><div class="saved-address"><i></i><div><strong>${state.shippingAddress.full_name}</strong><p>${state.shippingAddress.address}<br>${state.shippingAddress.postal_code} ${state.shippingAddress.city}<br>${state.shippingAddress.country} · ${state.shippingAddress.phone}</p><span>Home</span></div><button type="button" aria-label="Edit saved address">✎</button></div><form class="address-form" id="address-form" hidden><label><span>Full Name</span><input name="full_name" required autocomplete="name" value="${state.shippingAddress.full_name}"></label><label><span>Email</span><input name="email" required type="email" autocomplete="email" value="${state.shippingAddress.email}"></label><label><span>Phone</span><input name="phone" required autocomplete="tel" value="${state.shippingAddress.phone}"></label><label class="full-field"><span>Address</span><input name="address" required autocomplete="street-address" value="${state.shippingAddress.address}"></label><label><span>City</span><input name="city" required autocomplete="address-level2" value="${state.shippingAddress.city}"></label><label><span>State</span><select name="state" autocomplete="address-level1"><option ${state.shippingAddress.state === "Tamil Nadu" ? "selected" : ""}>Tamil Nadu</option><option ${state.shippingAddress.state === "Karnataka" ? "selected" : ""}>Karnataka</option><option ${state.shippingAddress.state === "Kerala" ? "selected" : ""}>Kerala</option><option ${state.shippingAddress.state === "Maharashtra" ? "selected" : ""}>Maharashtra</option></select></label><label><span>Postal Code</span><input name="postal_code" required autocomplete="postal-code" value="${state.shippingAddress.postal_code}"></label><label><span>Country</span><select name="country" autocomplete="country-name"><option>India</option></select></label></form>`;
}

function renderCheckout() {
  if (!state.cart.length) {
    app.innerHTML = `<div class="checkout-page"><div class="checkout-brand"><button data-nav="cart">← Back</button><div class="brand"><span class="brand-mark brand-logo-mark" aria-hidden="true"><img class="brand-logo" src="/public/saravana-stores-logo.png" alt=""></span><span><strong>Saravana Stores</strong></span></div><span>◇ Secure checkout</span></div><div class="container checkout-empty">${emptyState("▱", "Your cart is empty", "Add a meaningful piece before starting payment.", "Shop Collection", "shop")}</div></div>`;
    return;
  }
  const items = cartItems().length ? cartItems() : [{ product: productById("brass-lotus-multi-diya-urli-stand"), quantity: 1 }];
  const currency = cartCurrency();
  const pricing = currencyPricing(currency);
  const subtotal = cartSubtotal() || 8999;
  const deliveryFee = state.delivery === "express" ? pricing.express : state.delivery === "standard" ? pricing.standard : 0;
  const discount = state.promoApplied ? Math.min(pricing.promoCap, subtotal * .08) : 0;
  app.innerHTML = `<div class="checkout-page"><div class="checkout-brand"><button data-nav="cart">← Back</button><div class="brand"><span class="brand-mark brand-logo-mark" aria-hidden="true"><img class="brand-logo" src="/public/saravana-stores-logo.png" alt=""></span><span><strong>Saravana Stores</strong></span></div><span>◇ Secure checkout</span></div><div class="container checkout-progress">${checkoutSteps()}</div><div class="container checkout-layout"><section class="checkout-card"><div id="checkout-stage">${checkoutStage()}</div><div class="checkout-actions">${state.checkoutStep ? `<button class="btn white" id="checkout-back" ${state.checkoutBusy ? "disabled" : ""}>Back</button>` : ""}<button class="btn primary" id="checkout-next" ${state.checkoutBusy ? "disabled aria-busy=\"true\"" : ""}>${state.checkoutBusy ? "Opening secure payment…" : state.checkoutStep === 3 ? "Continue to Payment ◇" : "Continue →"}</button></div></section><aside class="checkout-summary"><h2>Order summary <small>${items.length} items</small></h2><div class="checkout-items">${items.map(({ product, quantity }) => `<div>${image(product)}<span><strong>${product.name}</strong><small>Qty ${quantity}</small></span><b>${money(product.price * quantity, productCurrency(product))}</b></div>`).join("")}</div><dl><div><dt>Subtotal</dt><dd>${money(subtotal, currency)}</dd></div><div><dt>Delivery</dt><dd>${deliveryFee ? money(deliveryFee, currency) : "Free"}</dd></div>${state.promoApplied ? `<div class="green"><dt>DIVINE8</dt><dd>− ${money(discount, currency)}</dd></div>` : ""}<div class="total"><dt>Total</dt><dd>${money(subtotal + deliveryFee - discount, currency)}</dd></div></dl><div class="summary-safe">✓ <span><strong>Server-verified total</strong><small>Prices, currency and stock are checked again before payment.</small></span></div></aside></div></div>`;
}

function captureShippingAddress() {
  const form = document.querySelector("#address-form");
  if (!form || form.hidden) return true;
  if (!form.reportValidity()) return false;
  const data = new FormData(form);
  state.shippingAddress = Object.fromEntries(["full_name", "email", "phone", "address", "city", "state", "postal_code", "country"].map(key => [key, String(data.get(key) || "").trim()]));
  return true;
}

function checkoutPayload() {
  return {
    items: state.cart.map(item => ({ product_id: item.id, quantity: item.quantity })),
    delivery: state.delivery,
    promo_code: state.promoApplied ? "DIVINE8" : null,
    customer: state.shippingAddress
  };
}

function apiErrorMessage(payload, fallback) {
  if (typeof payload?.detail === "string") return payload.detail;
  if (Array.isArray(payload?.detail)) return payload.detail.map(item => item.msg).join(" · ");
  return fallback;
}

async function beginPayment() {
  if (state.checkoutBusy) return;
  if (!document.querySelector("#checkout-terms")?.checked) {
    notify("Please accept the checkout terms");
    return;
  }
  state.checkoutBusy = true;
  renderCheckout();
  try {
    const response = await fetch(`${API_BASE}/api/checkout/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkoutPayload())
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(apiErrorMessage(result, "Secure checkout could not be started."));
    state.lastOrder = result;
    localStorage.setItem("divine-last-order", JSON.stringify(result));
    window.location.assign(result.checkout_url);
  } catch (error) {
    state.checkoutBusy = false;
    renderCheckout();
    notify(error.message || "Payment service unavailable");
  }
}

function renderSuccess() {
  app.innerHTML = `<section class="success-page"><div class="success-card success-loading"><span class="success-spinner" aria-hidden="true"></span><span class="eyebrow">Secure checkout</span><h1>Confirming your order</h1><p>We are checking the payment result with the commerce service.</p></div></section>`;
  hydrateOrderSuccess();
}

async function fetchOrderWithRetry(orderId, retries = 3) {
  const response = await fetch(`${API_BASE}/api/orders/${encodeURIComponent(orderId)}`);
  if (!response.ok) throw new Error("Order confirmation could not be loaded.");
  const order = await response.json();
  if (["pending", "awaiting_payment"].includes(order.status) && retries > 0) {
    await new Promise(resolve => window.setTimeout(resolve, 1200));
    return fetchOrderWithRetry(orderId, retries - 1);
  }
  return order;
}

async function hydrateOrderSuccess() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("order_id") || state.lastOrder?.order_id;
  if (!orderId) {
    app.innerHTML = `<section class="success-page"><div class="success-card"><span class="success-check warning">!</span><span class="eyebrow">Order not found</span><h1>We need your order reference</h1><p>Return to your cart and start secure checkout again.</p><button class="btn primary full" data-nav="cart">Return to Cart</button></div></section>`;
    return;
  }
  try {
    const order = await fetchOrderWithRetry(orderId);
    const paid = ["paid", "paid_demo"].includes(order.status);
    if (paid) {
      state.cart = [];
      writeStorage();
    }
    const demo = order.status === "paid_demo";
    app.innerHTML = `<section class="success-page"><div class="success-card"><span class="success-check ${paid ? "" : "warning"}">${paid ? "✓" : "⌛"}</span><span class="eyebrow">${demo ? "Preview payment approved" : paid ? "Payment confirmed" : "Payment processing"}</span><h1>${paid ? "Order Successful!" : "Your payment is processing"}</h1><p>${demo ? "The complete order flow worked. No real charge was made in preview mode." : paid ? "Your payment was verified and your order is now confirmed." : "We have your order and will update it as soon as the payment provider confirms it."}</p>${demo ? `<div class="demo-payment-note">Test mode · No money was charged</div>` : ""}<div class="success-details"><div><span>Order ID</span><strong>${order.id}</strong></div><div><span>Order total</span><strong>${money(Number(order.total || order.total_myr), order.currency || "INR")}</strong></div><div><span>Payment status</span><strong>${order.status.replaceAll("_", " ")}</strong></div></div><button class="btn primary full" data-nav="tracking">View Order →</button><button class="btn white full" data-nav="shop">Continue Shopping</button><button class="share-receipt">↗ Share receipt</button></div><p class="success-note">✦ Thank you for choosing Saravana Stores</p></section>`;
    window.scrollTo({ top: 0, behavior: "auto" });
  } catch (error) {
    app.innerHTML = `<section class="success-page"><div class="success-card"><span class="success-check warning">!</span><span class="eyebrow">Confirmation delayed</span><h1>Your order needs a moment</h1><p>${error.message}</p><button class="btn primary full" data-nav="orders">View My Orders</button><button class="btn white full" data-nav="contact">Contact Support</button></div></section>`;
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function renderTracking() {
  const statuses = [["Order Placed", "8 Aug · 10:14 AM", true], ["Confirmed", "8 Aug · 10:18 AM", true], ["Packed", "8 Aug · 4:30 PM", true], ["Shipped", "9 Aug · 9:00 AM", true], ["Out for Delivery", "Expected 12 Aug", false], ["Delivered", "Expected 12–14 Aug", false]];
  const product = productById("brass-lotus-multi-diya-urli-stand");
  app.innerHTML = `${pageHero("Your order journey", "Track Order", "Follow your collection from our care to your door.")}<section class="section"><div class="container tracking-layout"><article class="tracking-card"><div class="tracking-head"><div><span>Order #DC-240814</span><h2>Arriving 12–14 August</h2></div><b>♧ Shipped</b></div><div class="timeline">${statuses.map(([label, detail, done]) => `<div class="${done ? "done" : ""}"><span>${done ? "✓" : "□"}</span><p><strong>${label}</strong><small>${detail}</small></p></div>`).join("")}</div></article><aside class="tracking-side"><div class="track-product">${image(product)}<span><strong>${product.name}</strong><small>Qty 1 · ${money(product.price, productCurrency(product))}</small></span></div><dl><div><dt>Courier</dt><dd>Delhivery</dd></div><div><dt>Tracking number</dt><dd>DCIN88921458</dd></div><div><dt>Shipping address</dt><dd>18 Temple Garden Road<br>Chennai, Tamil Nadu</dd></div></dl><button class="btn outline full" data-nav="orders">View Order Details</button></aside></div></section>`;
}

function renderProfile() {
  if (!state.loggedIn) {
    app.innerHTML = `<section class="section"><div class="container">${emptyState("○", "Sign in to your account", "Access orders, addresses and your saved pieces.", "Sign In", "login")}</div></section>`;
    return;
  }
  const items = [["▱", "My Orders", "orders"], ["♡", "Wishlist", "wishlist"], ["⌖", "Addresses", "checkout"], ["▤", "Payment Methods", "checkout"], ["⚙", "Settings", "profile"], ["?", "Help & Support", "contact"], ["◇", "Privacy", "privacy"]];
  app.innerHTML = `${pageHero("Your Saravana Stores", "My Account", "Manage your orders, preferences and saved details.")}<section class="section"><div class="container profile-layout"><aside class="profile-card"><span class="avatar">AR<i></i></span><h2>Ananya Raman</h2><p>ananya.raman@example.in</p><small class="member">✦ Saravana Member</small><button class="btn outline full">✎ Edit Profile</button></aside><div><div class="profile-welcome"><div><span class="eyebrow light">Good afternoon</span><h2>Welcome back, Ananya</h2><p>Your next meaningful piece is waiting.</p></div><b>✦</b></div><div class="account-grid">${items.map(([icon, label, route]) => `<button data-nav="${route}"><span>${icon}</span><strong>${label}</strong><b>›</b></button>`).join("")}</div><button class="logout" id="logout">↪ Logout</button></div></div></section>`;
}

function renderOrders() {
  const orders = [["#DC-240814", "8 August 2026", "brass-lotus-multi-diya-urli-stand", 8999, "Shipped"], ["#DC-231109", "19 July 2026", "brass-lord-ganesha-idol", 2299, "Delivered"], ["#DC-221876", "2 June 2026", "traditional-brass-pooja-thali-set", 2999, "Confirmed"]];
  app.innerHTML = `${pageHero("Purchase history", "My Orders", "View, track and revisit your Saravana Stores orders.")}<section class="section"><div class="container"><div class="order-filters"><button class="active">All orders</button><button>Processing</button><button>Shipped</button><button>Delivered</button><button>Cancelled</button></div><div class="orders">${orders.map(([id, date, productId, amount, status]) => { const product = productById(productId); return `<article class="order"><header><div><strong>Order ${id}</strong><small>Placed ${date}</small></div><span class="status ${String(status).toLowerCase()}">${status}</span></header><div class="order-body">${image(product)}<span><strong>${product.name}</strong><small>1 item · ${product.category}</small></span><b>${money(amount, productCurrency(product))}</b></div><footer><button class="btn white" data-nav="tracking">View Order</button>${status !== "Delivered" ? `<button class="btn outline" data-nav="tracking">♧ Track Order</button>` : ""}<button class="btn primary" data-product="${product.id}">Buy Again</button></footer></article>`; }).join("")}</div></div></section>`;
}

const INFO = {
  about: ["Our story", "Objects of devotion, chosen with care", "Saravana Stores brings premium spiritual and decorative craftsmanship to contemporary Indian homes.", [["Meaning in every detail", "We believe a sacred space should feel personal, peaceful and beautifully considered. Our collection balances traditional forms with refined finishes for modern interiors."], ["A thoughtful collection", "Every item is selected for its workmanship, presence and suitability for prayer rooms, offices, gifting and meaningful corners of the home."], ["Care from us to you", "From secure packaging to responsive support, we treat each order with the reverence its purpose deserves."]]],
  faq: ["Help centre", "Frequently Asked Questions", "Quick answers about orders, delivery, products and care.", [["How long does delivery take?", "Standard delivery across India usually takes 3–5 business days. Economy and express options are shown at checkout."], ["Can I return an item?", "Eligible unused items in their original packaging may be returned within 7 days. Contact our care team first."], ["Are the product photos accurate?", "We photograph each product carefully. Handmade and decorative finishes may have small variations that make each piece unique."], ["How should I care for my product?", "Use a soft, dry cloth and avoid abrasive cleaners. Product-specific guidance is included on every detail page."]]],
  privacy: ["Your information", "Privacy Policy", "We collect only the information required to serve you and protect your shopping experience.", [["Information we use", "Contact, delivery and order information is used to process purchases, provide support and improve our service."], ["How we protect it", "Access is restricted, checkout is encrypted and raw payment card details are never stored by Saravana Stores."], ["Your choices", "You may request access, correction or deletion of eligible personal information by contacting our care team."]]],
  terms: ["Shopping with us", "Terms & Conditions", "These terms explain how orders, payments, delivery and use of this website work.", [["Orders and pricing", "All prices are shown in Indian Rupees. Orders are confirmed once payment is authorised and stock is allocated."], ["Product information", "We aim for accurate descriptions and imagery. Decorative finishes and handmade details may vary slightly."], ["Responsible use", "This website may not be misused, copied or interfered with. Indian law governs purchases made through Saravana Stores."]]],
  returns: ["Shop with confidence", "Return & Refund Policy", "We want every Saravana Stores piece to arrive safely and feel right for your space.", [["7-day returns", "Contact us within 7 days of delivery. Items must be unused, complete and in their original secure packaging."], ["Damaged deliveries", "Photograph the outer packaging and item within 24 hours, then contact us so we can resolve the issue quickly."], ["Refund timing", "Approved refunds are returned to the original payment method, usually within 5–10 business days after inspection."]]]
};

function renderInfo(page) {
  const [kicker, title, intro, sections] = INFO[page];
  app.innerHTML = `${pageHero(kicker, title, intro)}<section class="section"><div class="container info-layout"><aside><div class="brand"><span class="brand-mark brand-logo-mark" aria-hidden="true"><img class="brand-logo" src="/public/saravana-stores-logo.png" alt=""></span><span><strong>Saravana Stores</strong></span></div><p>Premium spiritual and decorative products for meaningful Indian spaces.</p><button class="btn primary" data-nav="contact">Talk to our care team</button></aside><div class="${page === "faq" ? "faq-list" : "info-sections"}">${sections.map(([heading, copy], index) => page === "faq" ? `<details ${index === 0 ? "open" : ""}><summary>${heading}<span>＋</span></summary><p>${copy}</p></details>` : `<article><span>${String(index + 1).padStart(2, "0")}</span><h2>${heading}</h2><p>${copy}</p></article>`).join("")}</div></div></section>`;
}

function renderContact() {
  app.innerHTML = `${pageHero("We’re here to help", "Contact Us", "Questions about a piece or an order? Our care team would love to help.")}<section class="section"><div class="container contact-layout"><aside><span class="eyebrow light">Divine care team</span><h2>Let’s find the right answer.</h2><p>We usually respond within one business day.</p><div><b>☎</b><span><strong>Call us</strong><small>+91 44 8892 1418</small></span></div><div><b>✉</b><span><strong>Email us</strong><small>care@divinecollection.in</small></span></div><div><b>⌖</b><span><strong>Visit us</strong><small>Chennai, Tamil Nadu</small></span></div></aside><form class="contact-form" id="contact-form"><label><span>Your name</span><input required placeholder="Full name"></label><label><span>Email address</span><input required type="email" placeholder="you@example.com"></label><label><span>Phone</span><input placeholder="+91"></label><label><span>Topic</span><select><option>Product enquiry</option><option>Order support</option><option>Returns</option><option>Other</option></select></label><label class="full-field"><span>Message</span><textarea required rows="6" placeholder="How can we help?"></textarea></label><button class="btn primary">Send message →</button></form></div></section>`;
}

function renderAuth(mode) {
  const register = mode === "register";
  app.innerHTML = `<section class="auth-page"><div class="auth-art"><button class="brand" data-nav="home"><span class="brand-mark brand-logo-mark" aria-hidden="true"><img class="brand-logo" src="/public/saravana-stores-logo.png" alt=""></span><span><strong>Saravana Stores</strong></span></button><div class="auth-image">${image(productById("goddess-lakshmi-idol"))}</div><blockquote>✦ “Create a space that feels peaceful, personal and divinely yours.”</blockquote></div><div class="auth-panel"><button data-nav="home">← Back to shop</button><div class="auth-form"><span class="eyebrow">${register ? "Join the collection" : "Welcome back"}</span><h1>${register ? "Create your account" : "Sign in to Saravana Stores"}</h1><p>${register ? "Save pieces, track orders and enjoy a smoother checkout." : "Continue to your orders, wishlist and account."}</p><form id="auth-form">${register ? `<label><span>Full name</span><input required placeholder="Your full name"></label>` : ""}<label><span>Email address</span><input required type="email" placeholder="you@example.com"></label>${register ? `<label><span>Phone</span><input required placeholder="+91"></label>` : ""}<label><span>Password</span><input required type="password" minlength="8" placeholder="At least 8 characters"></label>${!register ? `<div class="remember"><label><input type="checkbox"> Remember me</label><button type="button">Forgot password?</button></div>` : ""}<button class="btn primary full">${register ? "Create Account" : "Sign In"} →</button></form><div class="auth-switch">${register ? "Already have an account?" : "New to Saravana Stores?"} <button data-nav="${register ? "login" : "register"}">${register ? "Sign in" : "Create account"}</button></div><small class="auth-safe">◇ Secure, protected account access</small></div></div></section>`;
}

function renderAdmin() {
  const sections = [["dashboard", "▦", "Dashboard"], ["products", "□", "Products"], ["orders", "▱", "Orders"], ["categories", "▦", "Categories"], ["customers", "○", "Customers"], ["discounts", "%", "Discounts"], ["banners", "✦", "Banners"]];
  app.innerHTML = `<section class="admin-shell"><aside class="admin-side"><div class="brand brand-dark"><span class="brand-mark brand-logo-mark" aria-hidden="true"><img class="brand-logo" src="/public/saravana-stores-logo.png" alt=""></span><span><strong>Saravana Stores</strong></span></div><nav>${sections.map(([id, icon, label]) => `<button class="${state.adminSection === id ? "active" : ""}" data-admin="${id}"><span>${icon}</span>${label}${id === "orders" ? "<b>8</b>" : ""}</button>`).join("")}</nav><div class="admin-user"><span>AR</span><p><strong>Aishah R.</strong><small>Administrator</small></p></div></aside><div class="admin-main"><header><div><button class="admin-menu">☰</button><h1>${state.adminSection[0].toUpperCase() + state.adminSection.slice(1)}</h1></div><div><button>⌕ Search</button><button>♢</button><span>AR</span></div></header><div class="admin-content">${adminContent()}</div></div></section>`;
}

function adminContent() {
  if (state.adminSection === "products") return adminProducts();
  if (state.adminSection === "orders") return adminOrders();
  if (["categories", "customers", "discounts", "banners"].includes(state.adminSection)) return adminSimple();
  const metrics = [["Total Revenue", "₹1,28,450", "+12.4%", "◇"], ["Total Orders", "384", "+8.2%", "▱"], ["Total Products", state.catalog.length, "All active", "□"], ["Total Customers", "1,248", "+18.6%", "○"]];
  const bars = [42, 58, 49, 72, 63, 88, 76, 96, 85, 110, 92, 122];
  return `<div class="admin-title"><div><span>Saturday, 9 August</span><h2>Good afternoon, Ananya</h2><p>Here’s what’s happening with Saravana Stores today.</p></div><button class="btn primary" id="admin-add">＋ Add Product</button></div><div class="metrics">${metrics.map(([label, value, trend, icon]) => `<article><div><span>${icon}</span><small>${trend}</small></div><p>${label}</p><strong>${value}</strong></article>`).join("")}</div><div class="admin-grid"><article class="admin-card chart-card"><header><div><h3>Revenue overview</h3><p>Monthly sales performance</p></div><button>Last 12 months</button></header><div class="chart-total"><strong>₹1,28,450</strong><span>+12.4% vs last year</span></div><div class="bar-chart">${bars.map((height, index) => `<div><span style="height:${height}px"></span><small>${["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}</small></div>`).join("")}</div></article><article class="admin-card top-products"><header><div><h3>Top products</h3><p>By revenue this month</p></div><button data-admin="products">View all</button></header>${state.catalog.slice(0, 4).map((product, index) => `<div><b>0${index + 1}</b>${image(product)}<span><strong>${product.name}</strong><small>${18 - index * 3} sold</small></span><em>${money(product.price * (18 - index * 3), productCurrency(product))}</em></div>`).join("")}</article></div><div class="admin-grid lower"><article class="admin-card"><header><div><h3>Recent orders</h3><p>Latest customer activity</p></div><button data-admin="orders">Manage orders</button></header>${adminOrders(true)}</article><article class="admin-card inventory"><header><div><h3>Inventory health</h3><p>Current stock overview</p></div><span>▦</span></header><div class="inventory-ring"><span><strong>${state.catalog.reduce((sum, product) => sum + product.stock, 0)}</strong><small>Total units</small></span></div><p><i class="green-dot"></i>Healthy stock <b>${state.catalog.length}</b></p><p><i class="gold-dot"></i>Low stock <b>0</b></p><p><i class="red-dot"></i>Out of stock <b>0</b></p></article></div>`;
}

function adminProducts() {
  return `<div class="admin-title"><div><span>Catalog management</span><h2>All products</h2><p>Update pricing, stock and product information.</p></div><button class="btn primary" id="admin-add">＋ Add Product</button></div><div class="admin-table"><div class="table-tools"><label>⌕ <input placeholder="Search products"></label><button>☷ Filter</button><button>⇧ Import</button></div><div class="table-scroll"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>${state.catalog.map(product => `<tr><td><div class="table-product">${image(product)}<span><strong>${product.name}</strong><small>${product.sku}</small></span></div></td><td>${product.category}</td><td><strong>${money(product.price, productCurrency(product))}</strong></td><td>${product.stock}</td><td><span class="status delivered">Active</span></td><td><button data-admin-edit="${product.id}">✎</button><button data-admin-delete="${product.id}">⌫</button></td></tr>`).join("")}</tbody></table></div></div>`;
}

function adminOrders(compact = false) {
  const rows = [["#DC-240814", "Ananya Raman", "₹8,999", "Shipped"], ["#DC-240813", "Kavitha M.", "₹3,499", "Processing"], ["#DC-240812", "Meera S.", "₹2,999", "Confirmed"], ["#DC-240811", "Arun Kumar", "₹2,299", "Delivered"]];
  const table = `<div class="table-scroll"><table><thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th>${compact ? "" : "<th>Actions</th>"}</tr></thead><tbody>${rows.map(row => `<tr><td><strong>${row[0]}</strong></td><td>${row[1]}</td><td>${row[2]}</td><td><span class="status ${row[3].toLowerCase()}">${row[3]}</span></td>${compact ? "" : `<td><select><option>${row[3]}</option><option>Processing</option><option>Confirmed</option><option>Shipped</option><option>Delivered</option></select></td>`}</tr>`).join("")}</tbody></table></div>`;
  if (compact) return table;
  return `<div class="admin-title"><div><span>Fulfilment</span><h2>Order management</h2><p>Review orders and keep customers updated.</p></div><button class="btn outline">⇧ Export Orders</button></div><div class="admin-table"><div class="table-tools"><label>⌕ <input placeholder="Search orders"></label><button>☷ Status</button></div>${table}</div>`;
}

function adminSimple() {
  const data = {
    categories: CATEGORIES.map(([name, count]) => [name, `${count} products`]),
    customers: [["Ananya Raman", "3 orders · ₹14,540"], ["Kavitha M.", "2 orders · ₹8,350"], ["Meera S.", "1 order · ₹2,999"]],
    discounts: [["DIVINE8", "8% off · Active"], ["WELCOME500", "₹500 off · Active"], ["FREESHIP", "Free standard delivery · Scheduled"]],
    banners: [["Crafted for Divine Spaces", "Homepage · Active"], ["Bring Tradition Home", "Homepage · Active"], ["Premium Spiritual Collection", "Homepage · Draft"]]
  }[state.adminSection];
  return `<div class="admin-title"><div><span>Saravana Stores</span><h2>Manage ${state.adminSection}</h2><p>Keep this part of the store organised and up to date.</p></div><button class="btn primary">＋ Add new</button></div><div class="simple-grid">${data.map(([title, detail]) => `<article><span>▦</span><div><h3>${title}</h3><p>${detail}</p></div><button>✎</button></article>`).join("")}</div>`;
}

function routeFromLocation() {
  const localPath = SITE_BASE_PATH && location.pathname.startsWith(SITE_BASE_PATH)
    ? location.pathname.slice(SITE_BASE_PATH.length) || "/"
    : location.pathname;
  const parts = localPath.split("/").filter(Boolean);
  if (!parts.length) return ["home"];
  if (parts[0] === "product") return ["product", parts[1]];
  const page = Object.keys(ROUTES).find(key => ROUTES[key].slice(1) === parts[0]);
  return [page || "home"];
}

function go(page, id = "") {
  const path = page === "product" ? sitePath(`/product/${id}`) : PATHS[page] || sitePath("/");
  history.pushState({}, "", path);
  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  const [page, id] = routeFromLocation();
  document.body.dataset.page = page;
  document.querySelector("#site-footer").hidden = ["admin", "login", "register", "success", "checkout"].includes(page);
  document.querySelector("#bottom-nav").hidden = ["admin", "login", "register", "checkout"].includes(page);
  document.querySelectorAll("[data-nav]").forEach(button => button.classList.toggle("active", button.dataset.nav === page));
  const renderers = {
    home: renderHome, categories: renderCategories, shop: renderShop, product: () => renderProduct(id),
    search: renderSearch, wishlist: renderWishlist, cart: renderCart, checkout: renderCheckout,
    success: renderSuccess, tracking: renderTracking, profile: renderProfile, orders: renderOrders,
    about: () => renderInfo("about"), contact: renderContact, faq: () => renderInfo("faq"),
    privacy: () => renderInfo("privacy"), terms: () => renderInfo("terms"), returns: () => renderInfo("returns"),
    login: () => renderAuth("login"), register: () => renderAuth("register"), admin: renderAdmin
  };
  (renderers[page] || renderHome)();
  normalizePublicAssetPaths();
  updateCounts();
}

function updateCounts() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector("#header-cart-count").textContent = count;
  document.querySelector("#mobile-cart-count").textContent = count;
  const catalogCount = document.querySelector("#catalog-cart-count");
  if (catalogCount) catalogCount.textContent = count;
}

let toastTimer;
function notify(message) {
  toast.textContent = `✓ ${message}`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function addToCart(id, quantity = 1) {
  const product = productById(id);
  const targetCurrency = productCurrency(product);
  const currentCurrency = state.cart.length ? cartCurrency() : targetCurrency;
  if (state.cart.length && currentCurrency !== targetCurrency) {
    const switchCart = window.confirm(`Your cart contains ${currentCurrency} products. Start a new ${targetCurrency} cart for ${product.name}?`);
    if (!switchCart) return;
    state.cart = [];
  }
  const item = state.cart.find(entry => entry.id === id);
  if (item) item.quantity += quantity;
  else state.cart.push({ id, quantity });
  writeStorage();
  updateCounts();
  notify("Added to cart");
}

function toggleWishlist(id) {
  const index = state.wishlist.indexOf(id);
  if (index >= 0) {
    state.wishlist.splice(index, 1);
    notify("Product removed");
  } else {
    state.wishlist.push(id);
    notify("Added to wishlist");
  }
  writeStorage();
  render();
}

function openQuickView(id) {
  const product = productById(id);
  modalLayer.hidden = false;
  modalLayer.innerHTML = `<div class="modal-backdrop" data-close-modal><article class="quick-modal" role="dialog" aria-modal="true" aria-label="Quick view ${product.name}"><button class="modal-close" data-close-modal aria-label="Close">×</button>${image(product)}<div><span class="eyebrow">${product.category}</span><h2>${product.name}</h2>${stars(product)}<p>${product.description}</p><strong class="detail-price">${money(product.price, productCurrency(product))}</strong><div class="button-row"><button class="btn outline" data-product="${product.id}">View details</button><button class="btn primary" data-add="${product.id}">▱ Add to cart</button></div></div></article></div>`;
  document.body.classList.add("modal-open");
}

function openProductEditor(id = "") {
  const product = id ? productById(id) : null;
  const categoryOptions = CATEGORIES.map(([category]) => `<option ${product?.category === category ? "selected" : ""}>${category}</option>`).join("");
  modalLayer.hidden = false;
  modalLayer.innerHTML = `<div class="modal-backdrop admin-modal" data-close-modal><form class="editor" id="product-editor"><header><div><span>${product ? "Update catalog" : "New catalog item"}</span><h2>${product ? "Edit Product" : "Add Product"}</h2></div><button type="button" data-close-modal>×</button></header><label class="upload"><b>⇧</b><strong>Upload product images</strong><small>PNG or JPG · Main image and gallery</small><input type="file" accept="image/png,image/jpeg" multiple></label><div class="editor-fields"><label class="full-field"><span>Product name</span><input name="name" required value="${product?.name || ""}"></label><label><span>Category</span><select name="category">${categoryOptions}</select></label><label><span>Price (INR)</span><input name="price" type="number" min="0" step="1" required value="${product?.price || ""}"></label><label><span>Stock</span><input name="stock" type="number" min="0" required value="${product?.stock || ""}"></label><label><span>Status</span><select><option>Active</option><option>Draft</option><option>Archived</option></select></label><label class="full-field"><span>Description</span><textarea name="description" rows="4">${product?.description || ""}</textarea></label></div><footer><button type="button" class="btn white" data-close-modal>Cancel</button><button class="btn primary">${product ? "Save Changes" : "Add Product"}</button></footer><input type="hidden" name="id" value="${product?.id || ""}"></form></div>`;
  document.body.classList.add("modal-open");
}

function closeModal() {
  modalLayer.hidden = true;
  modalLayer.innerHTML = "";
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", event => {
  const installButton = event.target.closest("[data-install]");
  if (installButton) {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      installPromptEvent.userChoice.finally(() => {
        installPromptEvent = null;
        document.querySelectorAll("[data-install]").forEach(button => { button.hidden = true; });
      });
    } else {
      notify("Use your browser menu and choose Add to Home Screen");
    }
    return;
  }
  const nav = event.target.closest("[data-nav]");
  if (nav) { event.preventDefault(); go(nav.dataset.nav); return; }
  const product = event.target.closest("[data-product]");
  if (product) { closeModal(); go("product", product.dataset.product); return; }
  const add = event.target.closest("[data-add]");
  if (add) { addToCart(add.dataset.add); return; }
  const wish = event.target.closest("[data-wishlist]");
  if (wish) { toggleWishlist(wish.dataset.wishlist); return; }
  const quick = event.target.closest("[data-quick]");
  if (quick) { openQuickView(quick.dataset.quick); return; }
  const category = event.target.closest("[data-category]");
  if (category) { state.category = category.dataset.category; state.query = ""; go("shop"); return; }
  const close = event.target.closest("[data-close-modal]");
  if (close && (close === event.target || close.tagName === "BUTTON")) { closeModal(); return; }

  if (event.target.closest("#reset-filters")) { state.category = ""; state.query = ""; state.maxPrice = 9000; render(); }
  if (event.target.closest("#clear-category")) { state.category = ""; render(); }
  if (event.target.closest("#mobile-filter")) document.querySelector(".filters")?.classList.toggle("open");

  const remove = event.target.closest("[data-remove]");
  if (remove) { state.cart = state.cart.filter(item => item.id !== remove.dataset.remove); writeStorage(); notify("Product removed"); render(); }
  const plus = event.target.closest("[data-cart-plus]");
  if (plus) { state.cart.find(item => item.id === plus.dataset.cartPlus).quantity++; writeStorage(); render(); }
  const minus = event.target.closest("[data-cart-minus]");
  if (minus) { const item = state.cart.find(entry => entry.id === minus.dataset.cartMinus); item.quantity = Math.max(1, item.quantity - 1); writeStorage(); render(); }
  if (event.target.closest("#add-wishlist-cart")) { state.wishlist.forEach(id => addToCart(id)); render(); }

  const detailPlus = event.target.closest("[data-detail-plus]");
  if (detailPlus) document.querySelector("#detail-quantity").textContent = Number(document.querySelector("#detail-quantity").textContent) + 1;
  const detailMinus = event.target.closest("[data-detail-minus]");
  if (detailMinus) document.querySelector("#detail-quantity").textContent = Math.max(1, Number(document.querySelector("#detail-quantity").textContent) - 1);
  const detailAdd = event.target.closest("[data-detail-add]");
  if (detailAdd) addToCart(detailAdd.dataset.detailAdd, Number(document.querySelector("#detail-quantity").textContent));
  const buy = event.target.closest("[data-buy]");
  if (buy) { addToCart(buy.dataset.buy, Number(document.querySelector("#detail-quantity").textContent)); state.checkoutStep = 0; go("checkout"); }
  if (event.target.closest("#zoom-toggle")) document.querySelector(".main-image .product-image")?.classList.toggle("zoomed");
  const tab = event.target.closest("[data-tab]");
  if (tab) { state.activeTab = tab.dataset.tab; renderProduct(routeFromLocation()[1]); }

  if (event.target.closest("#show-new-address") || event.target.closest(".saved-address > button")) { document.querySelector(".saved-address").hidden = true; document.querySelector("#address-form").hidden = false; }
  if (event.target.closest("#checkout-back")) { state.checkoutStep = Math.max(0, state.checkoutStep - 1); renderCheckout(); }
  if (event.target.closest("#checkout-next")) {
    if (state.checkoutStep === 0 && !captureShippingAddress()) return;
    if (state.checkoutStep === 3) beginPayment();
    else { state.checkoutStep++; renderCheckout(); }
  }
  const editStep = event.target.closest("[data-checkout-edit]");
  if (editStep) { state.checkoutStep = Number(editStep.dataset.checkoutEdit); renderCheckout(); }

  if (event.target.closest("#logout")) { state.loggedIn = false; go("login"); }
  const searchTerm = event.target.closest("[data-search]");
  if (searchTerm) { state.query = searchTerm.dataset.search; renderSearch(); }

  const admin = event.target.closest("[data-admin]");
  if (admin) { state.adminSection = admin.dataset.admin; renderAdmin(); }
  if (event.target.closest("#admin-add")) openProductEditor();
  const adminEdit = event.target.closest("[data-admin-edit]");
  if (adminEdit) openProductEditor(adminEdit.dataset.adminEdit);
  const adminDelete = event.target.closest("[data-admin-delete]");
  if (adminDelete) { state.catalog = state.catalog.filter(productItem => productItem.id !== adminDelete.dataset.adminDelete); notify("Product removed"); renderAdmin(); }
});

document.addEventListener("change", event => {
  if (event.target.matches("input[name='category-filter']")) { state.category = event.target.value; renderShop(); }
  if (event.target.id === "price-range") { state.maxPrice = Number(event.target.value); renderShop(); }
  if (event.target.id === "sort-select") { state.sort = event.target.value; renderShop(); }
  if (event.target.matches("input[name='delivery']")) { state.delivery = event.target.value; renderCheckout(); }
  if (event.target.matches("input[name='payment']")) { state.payment = event.target.value; renderCheckout(); }
});

document.addEventListener("input", event => {
  if (event.target.id === "shop-query") { state.query = event.target.value; window.clearTimeout(event.target._timer); event.target._timer = window.setTimeout(renderShop, 220); }
});

document.addEventListener("submit", event => {
  if (event.target.id === "search-form") { event.preventDefault(); state.query = new FormData(event.target).get("query") || document.querySelector("#search-input").value.trim(); renderSearch(); }
  if (event.target.id === "promo-form") { event.preventDefault(); state.promoApplied = true; renderCheckout(); notify("Promo code applied"); }
  if (event.target.id === "contact-form") { event.preventDefault(); event.target.outerHTML = `<div class="form-success"><span>✓</span><h2>Message received</h2><p>Thank you. Our care team will be in touch shortly.</p></div>`; }
  if (event.target.id === "auth-form") { event.preventDefault(); state.loggedIn = true; notify("Welcome to Saravana Stores"); go("profile"); }
  if (event.target.id === "newsletter-form") { event.preventDefault(); event.target.reset(); notify("Thank you for subscribing"); }
  if (event.target.id === "product-editor") {
    event.preventDefault();
    const data = new FormData(event.target);
    const id = data.get("id");
    if (id) {
      const product = productById(id);
      product.name = data.get("name"); product.category = data.get("category"); product.price = Number(data.get("price")); product.stock = Number(data.get("stock")); product.description = data.get("description");
      notify("Product updated");
    } else if (state.catalog.length < MAX_CATALOG_PRODUCTS) {
      state.catalog.push({ ...CATALOG_PRODUCTS[0], id: `custom-${Date.now()}`, name: data.get("name"), category: data.get("category"), price: Number(data.get("price")), stock: Number(data.get("stock")), description: data.get("description"), sku: `DC-${Date.now().toString().slice(-4)}` });
      notify("Product added");
    } else {
      notify(`Catalogue limit reached: ${MAX_CATALOG_PRODUCTS} products maximum`);
    }
    closeModal(); renderAdmin();
  }
});

menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

window.addEventListener("popstate", render);
window.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

async function detectPaymentRuntime() {
  try {
    const response = await fetch(`${API_BASE}/api/health`, { headers: { Accept: "application/json" } });
    const health = await response.json();
    state.paymentRuntime = response.ok && health.payment_mode === "stripe" && health.stripe_ready ? "stripe" : response.ok && health.payment_mode === "demo" ? "demo" : "offline";
  } catch {
    state.paymentRuntime = "offline";
  }
  if (routeFromLocation()[0] === "checkout" && state.checkoutStep === 2) renderCheckout();
}

function updateNetworkState() {
  const offline = !navigator.onLine;
  networkStatus.hidden = !offline;
  networkStatus.textContent = offline ? "You are offline — browsing still works, but payment needs a connection." : "";
  document.body.classList.toggle("is-offline", offline);
}

window.addEventListener("beforeinstallprompt", event => {
  event.preventDefault();
  installPromptEvent = event;
  document.querySelectorAll("[data-install]").forEach(button => { button.hidden = false; });
});
window.addEventListener("appinstalled", () => notify("Saravana Stores installed"));
window.addEventListener("online", () => { updateNetworkState(); detectPaymentRuntime(); });
window.addEventListener("offline", updateNetworkState);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("public/sw.js").catch(() => {}));
}

render();
updateNetworkState();
detectPaymentRuntime();
if (routeFromLocation()[0] === "checkout" && new URLSearchParams(location.search).get("payment") === "cancelled") {
  notify("Payment was cancelled — your cart is still saved");
}
