"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bell,
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  CreditCard,
  Edit3,
  Eye,
  Facebook,
  Filter,
  Flower2,
  Gift,
  Heart,
  Home,
  Instagram,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Minus,
  Package,
  PackageCheck,
  Percent,
  Phone,
  Plus,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Trash2,
  Truck,
  Upload,
  UserRound,
  Users,
  WalletCards,
  X,
  Youtube,
} from "lucide-react";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { categories, formatMYR, Product, products as initialProducts } from "./products";

type Page =
  | "home"
  | "categories"
  | "shop"
  | "product"
  | "search"
  | "wishlist"
  | "cart"
  | "checkout"
  | "shipping"
  | "payment"
  | "success"
  | "tracking"
  | "profile"
  | "orders"
  | "about"
  | "contact"
  | "faq"
  | "privacy"
  | "terms"
  | "returns"
  | "login"
  | "register"
  | "admin";

type CartItem = { id: string; quantity: number };

const pagePaths: Record<Exclude<Page, "product">, string> = {
  home: "/",
  categories: "/categories",
  shop: "/shop",
  search: "/search",
  wishlist: "/wishlist",
  cart: "/cart",
  checkout: "/checkout",
  shipping: "/shipping-address",
  payment: "/payment",
  success: "/order-success",
  tracking: "/order-tracking",
  profile: "/profile",
  orders: "/my-orders",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  returns: "/return-and-refund-policy",
  login: "/login",
  register: "/register",
  admin: "/admin",
};

function getRoute(pathname: string): { page: Page; productId?: string } {
  const parts = pathname.split("/").filter(Boolean);
  if (!parts.length) return { page: "home" };
  if (parts[0] === "product") return { page: "product", productId: parts[1] };
  const entry = Object.entries(pagePaths).find(([, path]) => path.slice(1) === parts[0]);
  return { page: (entry?.[0] as Page) || "home" };
}

function ProductImage({
  product,
  className = "",
  zoomed = false,
}: {
  product: Product;
  className?: string;
  zoomed?: boolean;
}) {
  const { x, y, w, h } = product.crop;
  return (
    <div
      className={`product-visual ${className} ${zoomed ? "is-zoomed" : ""}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {/* Product photography is cropped from the user-supplied reference sheet. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/divine-products-reference.png"
        alt={product.name}
        draggable={false}
        style={{
          width: `${(1023 / w) * 100}%`,
          left: `${(-x / w) * 100}%`,
          top: `${(-y / h) * 100}%`,
        }}
      />
      <span className="image-sheen" aria-hidden="true" />
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-mark"><Flower2 size={compact ? 18 : 23} /></span>
      <span className="brand-copy">
        <strong>Divine Collection</strong>
        {!compact && <small>Premium Spiritual &amp; Decorative Products</small>}
      </span>
    </span>
  );
}

function Rating({ product }: { product: Product }) {
  return (
    <span className="rating" aria-label={`${product.rating} out of 5 from ${product.reviews} reviews`}>
      <Star size={14} fill="currentColor" /> {product.rating} <span>({product.reviews})</span>
    </span>
  );
}

function Quantity({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="quantity" aria-label="Quantity selector">
      <button aria-label="Decrease quantity" onClick={() => onChange(Math.max(1, value - 1))}><Minus size={15} /></button>
      <span>{value}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(value + 1)}><Plus size={15} /></button>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  message,
  action,
  onAction,
}: {
  icon: ReactNode;
  title: string;
  message: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon}</span>
      <h2>{title}</h2>
      <p>{message}</p>
      <button className="btn btn-primary" onClick={onAction}>{action}</button>
    </div>
  );
}

export default function Storefront() {
  const [page, setPage] = useState<Page>("home");
  const [selectedId, setSelectedId] = useState(initialProducts[0].id);
  const [catalog, setCatalog] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([
    { id: "3-fit-lion-divine", quantity: 1 },
    { id: "standed-steel-accessories", quantity: 1 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(["lion-divine-home", "usb-stone-lighting"]);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const sync = () => {
      const route = getRoute(window.location.pathname);
      setPage(route.page);
      if (route.productId && initialProducts.some((p) => p.id === route.productId)) {
        setSelectedId(route.productId);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = (next: Page, productId?: string) => {
    const path = next === "product" ? `/product/${productId || selectedId}` : pagePaths[next];
    window.history.pushState({}, "", path);
    setPage(next);
    if (productId) setSelectedId(productId);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartProducts = cart
    .map((item) => ({ ...item, product: catalog.find((p) => p.id === item.id)! }))
    .filter((item) => item.product);
  const subtotal = cartProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (id: string, quantity = 1) => {
    setCart((current) => {
      const match = current.find((item) => item.id === id);
      return match
        ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { id, quantity }];
    });
    setToast("Added to cart");
  };

  const updateCart = (id: string, quantity: number) => {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity } : item));
  };

  const toggleWishlist = (id: string) => {
    const exists = wishlist.includes(id);
    setWishlist((current) => exists ? current.filter((item) => item !== id) : [...current, id]);
    setToast(exists ? "Product removed" : "Added to wishlist");
  };

  const openProduct = (id: string) => navigate("product", id);

  let content: ReactNode;
  const shared = { navigate, addToCart, toggleWishlist, wishlist, openProduct };
  switch (page) {
    case "categories":
      content = <CategoriesPage {...shared} />;
      break;
    case "shop":
      content = <ShopPage {...shared} catalog={catalog} filterOpen={filterOpen} setFilterOpen={setFilterOpen} setQuickView={setQuickView} />;
      break;
    case "product":
      content = <ProductPage product={catalog.find((p) => p.id === selectedId) || catalog[0]} {...shared} />;
      break;
    case "search":
      content = <SearchPage {...shared} catalog={catalog} setQuickView={setQuickView} />;
      break;
    case "wishlist":
      content = <WishlistPage {...shared} catalog={catalog} />;
      break;
    case "cart":
      content = <CartPage navigate={navigate} items={cartProducts} subtotal={subtotal} updateCart={updateCart} remove={(id) => { setCart((c) => c.filter((i) => i.id !== id)); setToast("Product removed"); }} toggleWishlist={toggleWishlist} />;
      break;
    case "checkout":
    case "shipping":
    case "payment":
      content = <CheckoutPage page={page} navigate={navigate} items={cartProducts} subtotal={subtotal} onSuccess={() => { setCart([]); setToast("Order placed successfully"); navigate("success"); }} />;
      break;
    case "success":
      content = <SuccessPage navigate={navigate} total={subtotal || 2040} />;
      break;
    case "tracking":
      content = <TrackingPage navigate={navigate} />;
      break;
    case "profile":
      content = <ProfilePage navigate={navigate} loggedIn={loggedIn} onLogout={() => { setLoggedIn(false); navigate("login"); }} />;
      break;
    case "orders":
      content = <OrdersPage navigate={navigate} />;
      break;
    case "about":
    case "contact":
    case "faq":
    case "privacy":
    case "terms":
    case "returns":
      content = <InformationPage page={page} navigate={navigate} />;
      break;
    case "login":
    case "register":
      content = <AuthPage mode={page} navigate={navigate} onLogin={() => { setLoggedIn(true); setToast(page === "login" ? "Welcome back" : "Account created"); navigate("profile"); }} />;
      break;
    case "admin":
      content = <AdminPage products={catalog} setProducts={setCatalog} notify={setToast} />;
      break;
    default:
      content = <HomePage {...shared} setQuickView={setQuickView} />;
  }

  return (
    <div className="app-shell">
      <Header page={page} navigate={navigate} cartCount={cartCount} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <main>{content}</main>
      {!(["admin", "login", "register", "success"].includes(page)) && <Footer navigate={navigate} />}
      {!(["admin", "login", "register"].includes(page)) && <MobileNav page={page} navigate={navigate} cartCount={cartCount} />}
      {toast && <div className="toast" role="status"><Check size={17} /> {toast}</div>}
      {quickView && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuickView(null); }}>
          <div className="quick-modal" role="dialog" aria-modal="true" aria-label={`Quick view ${quickView.name}`}>
            <button className="icon-btn modal-close" onClick={() => setQuickView(null)} aria-label="Close quick view"><X /></button>
            <ProductImage product={quickView} className="quick-image" />
            <div className="quick-copy">
              <span className="eyebrow">{quickView.category}</span>
              <h2>{quickView.name}</h2>
              <Rating product={quickView} />
              <p>{quickView.description}</p>
              <strong className="price large">{formatMYR(quickView.price)}</strong>
              <div className="button-row">
                <button className="btn btn-outline" onClick={() => { setQuickView(null); openProduct(quickView.id); }}>View details</button>
                <button className="btn btn-primary" onClick={() => addToCart(quickView.id)}><ShoppingBag size={18} /> Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type SharedActions = {
  navigate: (page: Page, productId?: string) => void;
  addToCart: (id: string, quantity?: number) => void;
  toggleWishlist: (id: string) => void;
  wishlist: string[];
  openProduct: (id: string) => void;
};

function Header({ page, navigate, cartCount, mobileMenu, setMobileMenu }: { page: Page; navigate: SharedActions["navigate"]; cartCount: number; mobileMenu: boolean; setMobileMenu: (open: boolean) => void }) {
  const navItems: [string, Page][] = [["Home", "home"], ["Categories", "categories"], ["Shop", "shop"], ["About", "about"], ["Contact", "contact"]];
  return (
    <>
      <div className="announcement"><span>Complimentary delivery across Malaysia on orders over MYR 200</span><span className="announcement-side"><ShieldCheck size={14} /> Secure checkout &nbsp; · &nbsp; 7-day easy returns</span></div>
      <header className="site-header">
        <div className="container header-main">
          <button className="logo-button" onClick={() => navigate("home")} aria-label="Divine Collection home"><Logo /></button>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, route]) => <button key={route} className={page === route ? "active" : ""} onClick={() => navigate(route)}>{label}</button>)}
          </nav>
          <div className="header-actions">
            <button className="header-search" onClick={() => navigate("search")} aria-label="Search products"><Search size={19} /><span>Search divine pieces</span></button>
            <button className="icon-btn" onClick={() => navigate("wishlist")} aria-label="Wishlist"><Heart size={21} /></button>
            <button className="icon-btn badge-wrap" onClick={() => navigate("cart")} aria-label={`Cart with ${cartCount} items`}><ShoppingBag size={21} />{cartCount > 0 && <span className="badge">{cartCount}</span>}</button>
            <button className="icon-btn" onClick={() => navigate("profile")} aria-label="Profile"><UserRound size={21} /></button>
            <button className="icon-btn menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open menu">{mobileMenu ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {mobileMenu && <nav className="mobile-menu" aria-label="Mobile navigation">{navItems.map(([label, route]) => <button key={route} onClick={() => navigate(route)}>{label}<ArrowRight size={17} /></button>)}<button onClick={() => navigate("admin")}>Admin portal<ArrowRight size={17} /></button></nav>}
      </header>
    </>
  );
}

function MobileNav({ page, navigate, cartCount }: { page: Page; navigate: SharedActions["navigate"]; cartCount: number }) {
  const items: [string, Page, ReactNode][] = [
    ["Home", "home", <Home key="home" />],
    ["Categories", "categories", <Boxes key="categories" />],
    ["Wishlist", "wishlist", <Heart key="wishlist" />],
    ["Cart", "cart", <ShoppingCart key="cart" />],
    ["Profile", "profile", <UserRound key="profile" />],
  ];
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      {items.map(([label, route, icon]) => <button key={route} className={page === route ? "active" : ""} onClick={() => navigate(route)}><span className="bottom-icon">{icon}{route === "cart" && cartCount > 0 && <b>{cartCount}</b>}</span><small>{label}</small></button>)}
    </nav>
  );
}

function ProductCard({ product, wishlist, toggleWishlist, addToCart, openProduct, setQuickView }: { product: Product; setQuickView?: (product: Product) => void } & Omit<SharedActions, "navigate">) {
  const saved = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <div className="card-image-wrap">
        <button className={`heart-button ${saved ? "saved" : ""}`} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} onClick={() => toggleWishlist(product.id)}><Heart size={19} fill={saved ? "currentColor" : "none"} /></button>
        <button className="image-button" onClick={() => openProduct(product.id)} aria-label={`View ${product.name}`}><ProductImage product={product} /></button>
        {setQuickView && <button className="quick-view" onClick={() => setQuickView(product)}><Eye size={16} /> Quick view</button>}
      </div>
      <div className="product-card-body">
        <div className="product-meta"><span>{product.category}</span><Rating product={product} /></div>
        <button className="product-name" onClick={() => openProduct(product.id)}>{product.name}</button>
        <div className="stock"><span className="stock-dot" /> {product.stock} in stock</div>
        <div className="card-bottom"><strong className="price">{formatMYR(product.price)}</strong><button className="add-circle" onClick={() => addToCart(product.id)} aria-label={`Add ${product.name} to cart`}><Plus size={20} /></button></div>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, text, action, onAction }: { eyebrow?: string; title: string; text?: string; action?: string; onAction?: () => void }) {
  return (
    <div className="section-heading">
      <div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>
      {action && <button className="text-link" onClick={onAction}>{action}<ArrowRight size={17} /></button>}
    </div>
  );
}

function HomePage({ navigate, ...actions }: SharedActions & { setQuickView: (product: Product) => void }) {
  const heroProduct = initialProducts[2];
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-kicker"><Sparkles size={15} /> Curated spiritual craftsmanship</span>
            <h1>Bring Divine Beauty <em>Into Your Space</em></h1>
            <p>Discover premium spiritual, temple and decorative products crafted to create beautiful and peaceful spaces.</p>
            <div className="hero-actions"><button className="btn btn-primary btn-large" onClick={() => navigate("shop")}>Shop Collection <ArrowRight size={18} /></button><button className="btn btn-ghost btn-large" onClick={() => navigate("categories")}>Explore Categories</button></div>
            <div className="hero-proof">
              <div className="proof-avatars"><span>DC</span><span><Flower2 size={15} /></span><span>MY</span></div>
              <p><strong>4.9 / 5</strong><br />Loved by spiritual homes across Malaysia</p>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-arch">
              <ProductImage product={heroProduct} className="hero-product-image" />
              <div className="hero-tag"><span>Collector’s choice</span><strong>Lion Divine Home</strong><small>{formatMYR(heroProduct.price)}</small></div>
            </div>
            <div className="hero-floating hero-floating-one"><ShieldCheck size={18} /><span><strong>Premium quality</strong><small>Hand-finished details</small></span></div>
            <div className="hero-floating hero-floating-two"><Truck size={18} /><span><strong>Malaysia-wide</strong><small>Safe, secure delivery</small></span></div>
          </div>
        </div>
      </section>

      <section className="category-strip section">
        <div className="container">
          <SectionHeading eyebrow="Find your piece" title="Shop by category" text="Meaningful décor for every sacred corner." action="View all categories" onAction={() => navigate("categories")} />
          <div className="category-grid">
            {categories.map((category, index) => {
              const product = initialProducts.find((item) => item.id === category.productId)!;
              return <button className={`category-card category-${index + 1}`} key={category.name} onClick={() => navigate("shop")}><ProductImage product={product} /><span><small>Explore</small><strong>{category.name}</strong><b><ArrowRight size={17} /></b></span></button>;
            })}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <SectionHeading eyebrow="Divine essentials" title="Featured collection" text="Six signature pieces, chosen for craftsmanship, presence and purpose." action="Shop all products" onAction={() => navigate("shop")} />
          <div className="product-grid featured-grid">
            {initialProducts.map((product) => <ProductCard key={product.id} product={product} {...actions} setQuickView={actions.setQuickView} />)}
          </div>
        </div>
      </section>

      <section className="promo-section section">
        <div className="container promo-grid">
          <div className="promo-main">
            <span className="eyebrow light">The signature edit</span>
            <h2>Crafted for Divine Spaces</h2>
            <p>Premium traditional pieces that bring devotion, warmth and quiet grandeur home.</p>
            <button className="btn btn-light" onClick={() => navigate("shop")}>Discover the collection <ArrowRight size={18} /></button>
            <ProductImage product={initialProducts[0]} />
          </div>
          <div className="promo-small"><Sparkles /><span><small>Premium Spiritual Collection</small><strong>Timeless details. Sacred meaning.</strong></span></div>
          <div className="promo-small gold"><Gift /><span><small>Bring Tradition Home</small><strong>Gifts with lasting significance.</strong></span></div>
        </div>
      </section>

      <TrustSection />
    </>
  );
}

function TrustSection() {
  const benefits = [
    [<Truck key="truck" />, "Free Delivery", "Orders above MYR 200"],
    [<ShieldCheck key="shield" />, "Secure Payment", "Protected checkout"],
    [<BadgeCheck key="badge" />, "Premium Quality", "Curated craftsmanship"],
    [<PackageCheck key="package" />, "Easy Returns", "7-day return policy"],
  ];
  return <section className="trust-section"><div className="container trust-grid">{benefits.map(([icon, title, text]) => <div className="trust-item" key={String(title)}><span>{icon}</span><div><strong>{title}</strong><small>{text}</small></div></div>)}</div></section>;
}

function CategoriesPage({ navigate }: SharedActions) {
  return (
    <div className="page-wrap">
      <PageHero eyebrow="Curated by purpose" title="Categories" text="Explore pieces for prayer rooms, peaceful interiors and meaningful gifting." />
      <section className="container section">
        <div className="categories-page-grid">
          {categories.map((category, index) => {
            const product = initialProducts.find((item) => item.id === category.productId)!;
            return <article className={`category-large category-large-${index + 1}`} key={category.name}><ProductImage product={product} /><div className="category-large-copy"><span>{String(category.count).padStart(2, "0")} curated {category.count === 1 ? "piece" : "pieces"}</span><h2>{category.name}</h2><button className="btn btn-light" onClick={() => navigate("shop")}>View Products <ArrowRight size={17} /></button></div></article>;
          })}
        </div>
      </section>
      <TrustSection />
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;
}

type FilterState = { categories: string[]; available: boolean; rating: number; maxPrice: number };

function FilterPanel({ filters, setFilters, onClose }: { filters: FilterState; setFilters: (filters: FilterState) => void; onClose?: () => void }) {
  const toggleCategory = (category: string) => setFilters({ ...filters, categories: filters.categories.includes(category) ? filters.categories.filter((item) => item !== category) : [...filters.categories, category] });
  return (
    <aside className="filters">
      <div className="filter-heading"><div><SlidersHorizontal size={19} /><strong>Filters</strong></div>{onClose && <button className="icon-btn" onClick={onClose} aria-label="Close filters"><X size={20} /></button>}</div>
      <div className="filter-group"><h3>Category <ChevronDown size={16} /></h3>{["Divine Home", "Temples", "Accessories", "Lighting"].map((category) => <label className="check-row" key={category}><input type="checkbox" checked={filters.categories.includes(category)} onChange={() => toggleCategory(category)} /><span>{category}</span></label>)}</div>
      <div className="filter-group"><h3>Price range <ChevronDown size={16} /></h3><div className="range-values"><span>MYR 0</span><span>{formatMYR(filters.maxPrice)}</span></div><input className="range" type="range" min="190" max="3000" step="50" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })} /></div>
      <div className="filter-group"><h3>Availability <ChevronDown size={16} /></h3><label className="check-row"><input type="checkbox" checked={filters.available} onChange={(e) => setFilters({ ...filters, available: e.target.checked })} /><span>In stock only</span></label></div>
      <div className="filter-group"><h3>Rating <ChevronDown size={16} /></h3>{[4.5, 4].map((rating) => <label className="check-row" key={rating}><input type="radio" name="rating" checked={filters.rating === rating} onChange={() => setFilters({ ...filters, rating })} /><span className="rating-filter"><Star size={14} fill="currentColor" /> {rating} &amp; above</span></label>)}</div>
      <div className="filter-actions"><button className="btn btn-ghost" onClick={() => setFilters({ categories: [], available: true, rating: 0, maxPrice: 3000 })}>Reset</button>{onClose && <button className="btn btn-primary" onClick={onClose}>Apply Filters</button>}</div>
    </aside>
  );
}

function ShopPage({ catalog, filterOpen, setFilterOpen, setQuickView, ...actions }: SharedActions & { catalog: Product[]; filterOpen: boolean; setFilterOpen: (open: boolean) => void; setQuickView: (product: Product) => void }) {
  const [filters, setFilters] = useState<FilterState>({ categories: [], available: true, rating: 0, maxPrice: 3000 });
  const [sort, setSort] = useState("popular");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const result = catalog.filter((product) => (!filters.categories.length || filters.categories.includes(product.category)) && product.price <= filters.maxPrice && product.rating >= filters.rating && (!query || product.name.toLowerCase().includes(query.toLowerCase())));
    return [...result].sort((a, b) => sort === "price-low" ? a.price - b.price : sort === "price-high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : b.reviews - a.reviews);
  }, [catalog, filters, query, sort]);
  return (
    <div className="page-wrap">
      <PageHero eyebrow="The complete edit" title="Shop Divine Collection" text="Premium spiritual accents, crafted for homes with soul." />
      <section className="container shop-layout section">
        <div className="desktop-filter"><FilterPanel filters={filters} setFilters={setFilters} /></div>
        <div className="shop-results">
          <div className="shop-toolbar">
            <label className="shop-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" /></label>
            <button className="btn btn-filter" onClick={() => setFilterOpen(true)}><Filter size={17} /> Filter</button>
            <label className="sort-select"><span>Sort by</span><select value={sort} onChange={(e) => setSort(e.target.value)}><option value="popular">Popular</option><option value="newest">Newest</option><option value="price-low">Price Low to High</option><option value="price-high">Price High to Low</option><option value="rating">Rating</option></select><ChevronDown size={16} /></label>
          </div>
          <div className="results-meta"><p><strong>{filtered.length}</strong> pieces found</p><span>Thoughtfully selected for your sacred spaces</span></div>
          {filtered.length ? <div className="product-grid listing-grid">{filtered.map((product) => <ProductCard key={product.id} product={product} {...actions} setQuickView={setQuickView} />)}</div> : <EmptyState icon={<Search />} title="No pieces found" message="Try adjusting your filters to discover more from the collection." action="Reset filters" onAction={() => setFilters({ categories: [], available: true, rating: 0, maxPrice: 3000 })} />}
        </div>
      </section>
      {filterOpen && <div className="filter-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFilterOpen(false); }}><div className="filter-sheet"><span className="sheet-handle" /><FilterPanel filters={filters} setFilters={setFilters} onClose={() => setFilterOpen(false)} /></div></div>}
    </div>
  );
}

function ProductPage({ product, navigate, addToCart, toggleWishlist, wishlist, openProduct }: SharedActions & { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("description");
  const [zoomed, setZoomed] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);
  const saved = wishlist.includes(product.id);
  const variants = ["Front view", "Craft detail", "Room view"];
  const related = initialProducts.filter((item) => item.id !== product.id).slice(0, 3);
  const cycleGallery = (direction: number) => setGalleryIndex((current) => (current + direction + variants.length) % variants.length);
  return (
    <div className="page-wrap product-page">
      <div className="container breadcrumb"><button onClick={() => navigate("home")}>Home</button><ChevronRight size={14} /><button onClick={() => navigate("shop")}>Shop</button><ChevronRight size={14} /><span>{product.name}</span></div>
      <section className="container product-detail-grid">
        <div className="gallery">
          <div className={`main-gallery gallery-variant-${galleryIndex}`} onTouchStart={(e) => setTouchX(e.touches[0].clientX)} onTouchEnd={(e) => { if (touchX !== null && Math.abs(e.changedTouches[0].clientX - touchX) > 45) cycleGallery(e.changedTouches[0].clientX < touchX ? 1 : -1); setTouchX(null); }}>
            <ProductImage product={product} zoomed={zoomed} />
            <button className="gallery-back" onClick={() => navigate("shop")} aria-label="Back to products"><ChevronLeft /></button>
            <button className={`gallery-heart ${saved ? "saved" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist"><Heart fill={saved ? "currentColor" : "none"} /></button>
            <button className="zoom-button" onClick={() => setZoomed(!zoomed)}><Search size={16} /> {zoomed ? "Reset" : "Zoom"}</button>
            <div className="gallery-arrows"><button onClick={() => cycleGallery(-1)} aria-label="Previous image"><ChevronLeft /></button><button onClick={() => cycleGallery(1)} aria-label="Next image"><ChevronRight /></button></div>
          </div>
          <div className="thumbnail-row">{variants.map((label, index) => <button className={galleryIndex === index ? "active" : ""} key={label} onClick={() => setGalleryIndex(index)} aria-label={label}><ProductImage product={product} /><span>{label}</span></button>)}</div>
        </div>
        <div className="product-info">
          <div className="product-title-line"><span className="eyebrow">{product.category}</span><button className="share-button" aria-label="Share product"><Share2 size={19} /></button></div>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span className="stars">★★★★★</span><Rating product={product} /><span className="verified"><BadgeCheck size={15} /> Verified quality</span></div>
          <strong className="price detail-price">{formatMYR(product.price)}</strong>
          <p className="detail-description">{product.description}</p>
          <div className="info-cards"><div><Package size={20} /><span><strong>{product.stock}</strong><small>In Stock</small></span></div><div><Sparkles size={20} /><span><strong>Premium</strong><small>Quality</small></span></div><div><ShieldCheck size={20} /><span><strong>Secure</strong><small>Packaging</small></span></div></div>
          <div className="features"><h3>Why you’ll love it</h3><ul>{product.features.slice(0, 5).map((feature) => <li key={feature}><Check size={16} />{feature}</li>)}</ul></div>
          <div className="purchase-box"><div className="purchase-quantity"><span>Quantity</span><Quantity value={quantity} onChange={setQuantity} /></div><div className="button-row purchase-buttons"><button className="btn btn-outline" onClick={() => addToCart(product.id, quantity)}><ShoppingBag size={18} /> Add to Cart</button><button className="btn btn-primary" onClick={() => { addToCart(product.id, quantity); navigate("checkout"); }}>Buy Now <ArrowRight size={18} /></button></div></div>
          <div className="delivery-note"><Truck size={19} /><p><strong>Complimentary Malaysia delivery</strong><br /><span>Estimated arrival in 3–5 business days</span></p></div>
        </div>
      </section>

      <section className="container detail-tabs section">
        <div className="tab-list" role="tablist">{[["description", "Description"], ["features", "Features"], ["specifications", "Specifications"], ["reviews", "Reviews"], ["shipping", "Shipping"], ["returns", "Returns"]].map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}>{label}</button>)}</div>
        <div className="tab-panel">
          {tab === "description" && <><span className="eyebrow">The story of this piece</span><h2>Craftsmanship with presence</h2><p>{product.description} Every detail has been selected to feel refined, enduring and worthy of a meaningful space.</p></>}
          {tab === "features" && <><h2>Product features</h2><div className="feature-detail-grid">{product.features.map((feature) => <div key={feature}><Check size={17} /><span>{feature}</span></div>)}</div></>}
          {tab === "specifications" && <><h2>Specifications</h2><dl className="spec-list"><div><dt>Product code</dt><dd>{product.sku}</dd></div><div><dt>Category</dt><dd>{product.category}</dd></div><div><dt>Finish</dt><dd>Premium decorative finish</dd></div><div><dt>Care</dt><dd>Dust gently with a soft, dry cloth</dd></div></dl></>}
          {tab === "reviews" && <><h2>Customer reviews</h2><div className="review-summary"><strong>{product.rating}</strong><div><span className="stars">★★★★★</span><p>Based on {product.reviews} verified reviews</p></div></div></>}
          {tab === "shipping" && <><h2>Shipping information</h2><p>Carefully packed and dispatched throughout Malaysia. Standard delivery is 3–5 business days; express delivery is available at checkout.</p></>}
          {tab === "returns" && <><h2>Return policy</h2><p>Eligible items may be returned within 7 days in their original condition and packaging. Contact our care team before sending an item back.</p></>}
        </div>
      </section>
      <section className="container section related-section"><SectionHeading eyebrow="Continue exploring" title="Related pieces" /><div className="product-grid related-grid">{related.map((item) => <ProductCard key={item.id} product={item} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} openProduct={openProduct} />)}</div></section>
    </div>
  );
}

function SearchPage({ catalog, setQuickView, ...actions }: SharedActions & { catalog: Product[]; setQuickView: (product: Product) => void }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const popular = ["Lion Divine", "Golden Temple", "Temple accessories", "USB lighting"];
  const results = catalog.filter((product) => !submitted || `${product.name} ${product.category}`.toLowerCase().includes(submitted.toLowerCase()));
  const submit = (event: FormEvent) => { event.preventDefault(); setSubmitted(query.trim()); };
  return (
    <div className="page-wrap search-page">
      <section className="search-hero"><div className="container"><span className="eyebrow">Discover your next piece</span><h1>What are you looking for?</h1><form className="search-large" onSubmit={submit}><Search size={22} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" aria-label="Search products" />{query && <button type="button" className="clear-search" onClick={() => { setQuery(""); setSubmitted(""); }}><X size={18} /></button>}<button className="btn btn-primary" type="submit">Search</button></form></div></section>
      <section className="container search-content section">
        {!submitted ? <div className="search-suggestions"><div><h2>Recent searches</h2><div className="search-chips"><button onClick={() => { setQuery("Divine Home"); setSubmitted("Divine Home"); }}><Clock3 size={15} /> Divine Home</button><button onClick={() => { setQuery("Accessories"); setSubmitted("Accessories"); }}><Clock3 size={15} /> Accessories</button></div></div><div><h2>Popular searches</h2><div className="search-chips">{popular.map((term) => <button key={term} onClick={() => { setQuery(term); setSubmitted(term); }}><Sparkles size={15} /> {term}</button>)}</div></div></div> : <SectionHeading eyebrow={`${results.length} results`} title={`Search results for “${submitted}”`} />}
        {submitted && !results.length ? <EmptyState icon={<Search />} title="Sorry, we couldn't find anything matching your search." message="Try a different phrase or browse the complete Divine Collection." action="Browse All Products" onAction={() => actions.navigate("shop")} /> : submitted && <div className="product-grid listing-grid">{results.map((product) => <ProductCard key={product.id} product={product} {...actions} setQuickView={setQuickView} />)}</div>}
      </section>
    </div>
  );
}

function WishlistPage({ catalog, wishlist, ...actions }: SharedActions & { catalog: Product[] }) {
  const saved = catalog.filter((product) => wishlist.includes(product.id));
  return (
    <div className="page-wrap"><PageHero eyebrow="Your curated list" title="Wishlist" text="Pieces you love, saved together." /><section className="container section">{saved.length ? <><div className="results-meta"><p><strong>{saved.length}</strong> saved pieces</p><button className="text-link" onClick={() => saved.forEach((item) => actions.addToCart(item.id))}>Add all to cart <ShoppingBag size={17} /></button></div><div className="product-grid listing-grid">{saved.map((product) => <ProductCard key={product.id} product={product} wishlist={wishlist} {...actions} />)}</div></> : <EmptyState icon={<Heart />} title="Your Wishlist is Empty" message="Save products you love and find them here." action="Explore Products" onAction={() => actions.navigate("shop")} />}</section></div>
  );
}

function CartPage({ navigate, items, subtotal, updateCart, remove, toggleWishlist }: { navigate: SharedActions["navigate"]; items: Array<CartItem & { product: Product }>; subtotal: number; updateCart: (id: string, quantity: number) => void; remove: (id: string) => void; toggleWishlist: (id: string) => void }) {
  const shipping = subtotal >= 200 ? 0 : 25;
  return (
    <div className="page-wrap"><PageHero eyebrow="Your selection" title="Shopping Cart" text="Review your pieces before checkout." /><section className="container cart-layout section">{items.length ? <><div className="cart-items"><div className="cart-header"><strong>{items.length} {items.length === 1 ? "piece" : "pieces"}</strong><button onClick={() => navigate("shop")}>Continue shopping <ArrowRight size={16} /></button></div>{items.map(({ product, quantity }) => <article className="cart-item" key={product.id}><ProductImage product={product} /><div className="cart-item-copy"><span>{product.category}</span><h3>{product.name}</h3><div className="stock"><span className="stock-dot" /> In stock</div><div className="cart-mobile-price">{formatMYR(product.price)}</div><div className="cart-controls"><Quantity value={quantity} onChange={(value) => updateCart(product.id, value)} /><button onClick={() => toggleWishlist(product.id)}><Heart size={16} /> Save</button><button className="remove" onClick={() => remove(product.id)}><Trash2 size={16} /> Remove</button></div></div><strong className="cart-item-price">{formatMYR(product.price * quantity)}</strong></article>)}</div><aside className="cart-summary"><span className="eyebrow">Order summary</span><h2>Your total</h2><dl><div><dt>Subtotal</dt><dd>{formatMYR(subtotal)}</dd></div><div><dt>Shipping</dt><dd className="free">{shipping ? formatMYR(shipping) : "Complimentary"}</dd></div><div><dt>Discount</dt><dd>MYR 0.00</dd></div><div className="summary-total"><dt>Total</dt><dd>{formatMYR(subtotal + shipping)}</dd></div></dl><button className="btn btn-primary checkout-button" onClick={() => navigate("checkout")}>Checkout securely <LockKeyhole size={17} /></button><div className="secure-line"><ShieldCheck size={16} /> Secure checkout · No card details stored</div><div className="payment-logos"><span>VISA</span><span>Mastercard</span><span>PayPal</span><span>G Pay</span></div></aside></> : <EmptyState icon={<ShoppingBag />} title="Your Cart is Empty" message="Discover something meaningful for your space." action="Continue Shopping" onAction={() => navigate("shop")} />}</section></div>
  );
}

function CheckoutSteps({ step }: { step: number }) {
  const steps = ["Shipping", "Delivery", "Payment", "Confirm"];
  return <div className="checkout-steps">{steps.map((label, index) => <div key={label} className={index <= step ? "active" : ""}><span>{index < step ? <Check size={14} /> : index + 1}</span><small>{label}</small>{index < steps.length - 1 && <i />}</div>)}</div>;
}

function CheckoutPage({ page, navigate, items, subtotal, onSuccess }: { page: Page; navigate: SharedActions["navigate"]; items: Array<CartItem & { product: Product }>; subtotal: number; onSuccess: () => void }) {
  const initialStep = page === "payment" ? 2 : page === "shipping" ? 0 : 0;
  const [step, setStep] = useState(initialStep);
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("wallet");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [addressMode, setAddressMode] = useState<"saved" | "new">("saved");
  const deliveryFee = delivery === "express" ? 35 : delivery === "standard" ? 12 : 0;
  const discount = promoApplied ? Math.min(100, subtotal * 0.08) : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);
  const nextStep = () => {
    const next = Math.min(3, step + 1);
    setStep(next);
    if (next === 2) window.history.pushState({}, "", "/payment");
  };
  const prevStep = () => setStep(Math.max(0, step - 1));
  return (
    <div className="checkout-page">
      <section className="checkout-top"><div className="container"><button className="back-link" onClick={() => step ? prevStep() : navigate("cart")}><ArrowLeft size={17} /> Back</button><Logo compact /><span className="secure-checkout"><LockKeyhole size={16} /> Secure checkout</span></div></section>
      <div className="container checkout-progress"><CheckoutSteps step={step} /></div>
      <section className="container checkout-layout">
        <div className="checkout-form-card">
          {step === 0 && <div className="checkout-stage"><div className="stage-heading"><span>01</span><div><h1>Shipping address</h1><p>Where should we send your collection?</p></div></div><div className="address-tabs"><button className={addressMode === "saved" ? "active" : ""} onClick={() => setAddressMode("saved")}>Saved address</button><button className={addressMode === "new" ? "active" : ""} onClick={() => setAddressMode("new")}><Plus size={16} /> Add new address</button></div>{addressMode === "saved" ? <div className="saved-address selected"><span className="radio-dot" /><div><strong>Aishah Rahman</strong><p>18, Jalan Damai Perdana 3<br />Bandar Damai Perdana, 56000 Kuala Lumpur<br />Malaysia · +60 12-345 6789</p><span className="address-label">Home</span></div><div className="address-actions"><button aria-label="Edit address"><Edit3 size={16} /></button><button aria-label="Delete address"><Trash2 size={16} /></button></div></div> : <AddressForm />}</div>}
          {step === 1 && <div className="checkout-stage"><div className="stage-heading"><span>02</span><div><h1>Delivery method</h1><p>Choose the timing that suits you.</p></div></div><div className="delivery-options">{[["economy", "Economy", "5–7 business days", 0], ["standard", "Standard", "3–5 business days", 12], ["express", "Express", "1–2 business days", 35]].map(([id, label, estimate, price]) => <label className={delivery === id ? "selected" : ""} key={String(id)}><input type="radio" name="delivery" checked={delivery === id} onChange={() => setDelivery(String(id))} /><span className="delivery-icon"><Truck /></span><span><strong>{label}</strong><small>{estimate}</small></span><b>{Number(price) === 0 ? "Free" : formatMYR(Number(price))}</b></label>)}</div><div className="promo-box"><div><Percent size={20} /><span><strong>Have a Promo Code?</strong><small>Apply it before continuing.</small></span></div><div className="promo-input"><input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Enter promo code" /><button onClick={() => promo && setPromoApplied(true)}>Apply</button></div>{promoApplied && <p className="promo-success"><Check size={15} /> DIVINE8 applied — you saved {formatMYR(discount)}.</p>}</div></div>}
          {step === 2 && <div className="checkout-stage"><div className="stage-heading"><span>03</span><div><h1>Payment</h1><p>Select a secure payment method.</p></div></div><div className="payment-options">{[["wallet", <WalletCards key="wallet" />, "My Wallet", `Balance: ${formatMYR(3210)}`], ["paypal", <span className="pay-logo paypal" key="paypal">P</span>, "PayPal", "Fast, protected checkout"], ["gpay", <span className="pay-logo google" key="gpay">G</span>, "Google Pay", "Use your saved payment"], ["apple", <span className="pay-logo apple" key="apple">●</span>, "Apple Pay", "Pay from your Apple device"], ["card", <CreditCard key="card" />, "Mastercard / Visa", "Credit or debit card"]].map(([id, icon, label, detail]) => <label className={payment === id ? "selected" : ""} key={String(id)}><span className="payment-icon">{icon}</span><span><strong>{label}</strong><small>{detail}</small></span><input type="radio" name="payment" checked={payment === id} onChange={() => setPayment(String(id))} /></label>)}</div><div className="payment-safety"><LockKeyhole size={18} /><p><strong>Your payment is protected</strong><br /><span>Payment information is encrypted and card details are never stored.</span></p></div></div>}
          {step === 3 && <div className="checkout-stage"><div className="stage-heading"><span>04</span><div><h1>Review &amp; confirm</h1><p>One last look before placing your order.</p></div></div><div className="review-block"><div><MapPin size={18} /><span><strong>Delivery to</strong><small>Aishah Rahman · Kuala Lumpur, Malaysia</small></span><button onClick={() => setStep(0)}>Edit</button></div><div><Truck size={18} /><span><strong>{delivery[0].toUpperCase() + delivery.slice(1)} delivery</strong><small>Estimated arrival: 12–14 August</small></span><button onClick={() => setStep(1)}>Edit</button></div><div><CreditCard size={18} /><span><strong>{payment === "wallet" ? "My Wallet" : payment === "card" ? "Mastercard / Visa" : payment}</strong><small>Secure payment</small></span><button onClick={() => setStep(2)}>Edit</button></div></div><label className="terms-check"><input type="checkbox" defaultChecked /> I agree to the Terms &amp; Conditions and Return Policy.</label></div>}
          <div className="checkout-actions">{step > 0 && <button className="btn btn-ghost" onClick={prevStep}>Back</button>}<button className="btn btn-primary" onClick={step === 3 ? onSuccess : nextStep}>{step === 3 ? <>Place Order <LockKeyhole size={17} /></> : <>Continue <ArrowRight size={17} /></>}</button></div>
        </div>
        <aside className="checkout-summary"><h2>Order summary <span>{items.length} items</span></h2><div className="checkout-items">{items.length ? items.map(({ product, quantity }) => <div key={product.id}><ProductImage product={product} /><span><strong>{product.name}</strong><small>Qty {quantity}</small></span><b>{formatMYR(product.price * quantity)}</b></div>) : <div className="checkout-demo-item"><ProductImage product={initialProducts[0]} /><span><strong>{initialProducts[0].name}</strong><small>Qty 1</small></span><b>{formatMYR(initialProducts[0].price)}</b></div>}</div><dl><div><dt>Subtotal</dt><dd>{formatMYR(subtotal || 1850)}</dd></div><div><dt>Delivery</dt><dd>{deliveryFee ? formatMYR(deliveryFee) : "Free"}</dd></div>{promoApplied && <div className="discount-row"><dt>DIVINE8</dt><dd>− {formatMYR(discount)}</dd></div>}<div className="summary-total"><dt>Total</dt><dd>{formatMYR(total || 1850)}</dd></div></dl><div className="summary-trust"><ShieldCheck size={18} /><span><strong>Protected purchase</strong><small>Secure payment &amp; careful packaging</small></span></div></aside>
      </section>
    </div>
  );
}

function AddressForm() {
  return <form className="address-form"><label><span>Full Name</span><input required placeholder="Your full name" /></label><label><span>Phone</span><input required type="tel" placeholder="+60 12-345 6789" /></label><label className="full"><span>Address</span><input required placeholder="Street address" /></label><label><span>City</span><input required placeholder="Kuala Lumpur" /></label><label><span>State</span><select defaultValue="Kuala Lumpur"><option>Kuala Lumpur</option><option>Selangor</option><option>Johor</option><option>Penang</option><option>Perak</option></select></label><label><span>Postal Code</span><input required inputMode="numeric" placeholder="56000" /></label><label><span>Country</span><select defaultValue="Malaysia"><option>Malaysia</option></select></label></form>;
}

function SuccessPage({ navigate, total }: { navigate: SharedActions["navigate"]; total: number }) {
  return <div className="success-page"><div className="success-card"><div className="success-icon"><Check /></div><span className="eyebrow">Payment confirmed</span><h1>Order Successful!</h1><p>Your order has been placed successfully.</p><div className="success-order"><div><span>Order ID</span><strong>#DC-240814</strong></div><div><span>Order total</span><strong>{formatMYR(total)}</strong></div><div><span>Estimated delivery</span><strong>12–14 August 2026</strong></div></div><div className="button-stack"><button className="btn btn-primary" onClick={() => navigate("tracking")}>View Order <ArrowRight size={17} /></button><button className="btn btn-ghost" onClick={() => navigate("shop")}>Continue Shopping</button></div><button className="receipt-link"><Share2 size={15} /> Share receipt</button></div><div className="success-note"><Flower2 /><span>Thank you for choosing Divine Collection</span></div></div>;
}

function TrackingPage({ navigate }: { navigate: SharedActions["navigate"] }) {
  const statuses = [["Order Placed", "8 Aug · 10:14 AM", true], ["Confirmed", "8 Aug · 10:18 AM", true], ["Packed", "8 Aug · 4:30 PM", true], ["Shipped", "9 Aug · 9:00 AM", true], ["Out for Delivery", "Expected 12 Aug", false], ["Delivered", "Expected 12–14 Aug", false]];
  return <div className="page-wrap"><PageHero eyebrow="Your order journey" title="Track Order" text="Follow your collection from our care to your door." /><section className="container tracking-layout section"><div className="tracking-card"><div className="tracking-head"><div><span>Order #DC-240814</span><h2>Arriving 12–14 August</h2></div><span className="status-pill shipped"><Truck size={15} /> Shipped</span></div><div className="timeline">{statuses.map(([label, date, done], index) => <div className={done ? "done" : ""} key={String(label)}><span className="timeline-icon">{done ? <Check size={15} /> : index === 4 ? <Truck size={16} /> : <Package size={16} />}</span><p><strong>{label}</strong><small>{date}</small></p></div>)}</div></div><aside className="tracking-side"><div className="tracking-product"><ProductImage product={initialProducts[0]} /><span><strong>3 FIT LION DIVINE</strong><small>Qty 1 · {formatMYR(1850)}</small></span></div><dl><div><dt>Courier</dt><dd>J&amp;T Express</dd></div><div><dt>Tracking number</dt><dd>MYDC88921458</dd></div><div><dt>Shipping address</dt><dd>18, Jalan Damai Perdana 3<br />Kuala Lumpur, Malaysia</dd></div></dl><button className="btn btn-outline" onClick={() => navigate("orders")}>View Order Details</button></aside></section></div>;
}

function ProfilePage({ navigate, loggedIn, onLogout }: { navigate: SharedActions["navigate"]; loggedIn: boolean; onLogout: () => void }) {
  if (!loggedIn) return <EmptyState icon={<UserRound />} title="Sign in to your account" message="Access orders, addresses and your saved pieces." action="Sign In" onAction={() => navigate("login")} />;
  const menu = [[<Package key="orders" />, "My Orders", "orders" as Page], [<Heart key="wish" />, "Wishlist", "wishlist" as Page], [<MapPin key="address" />, "Addresses", "shipping" as Page], [<CreditCard key="payment" />, "Payment Methods", "payment" as Page], [<Settings key="settings" />, "Settings", "profile" as Page], [<CircleHelp key="help" />, "Help & Support", "contact" as Page], [<ShieldCheck key="privacy" />, "Privacy", "privacy" as Page]];
  return <div className="profile-page page-wrap"><PageHero eyebrow="Your Divine Collection" title="My Account" text="Manage your orders, preferences and saved details." /><section className="container profile-layout section"><aside className="profile-card"><div className="profile-avatar">AR<span /></div><h2>Aishah Rahman</h2><p>aishah.rahman@example.my</p><span className="member-pill"><Sparkles size={14} /> Divine Member</span><button className="btn btn-outline"><Edit3 size={16} /> Edit Profile</button></aside><div className="profile-menu"><div className="profile-welcome"><div><span className="eyebrow">Good afternoon</span><h2>Welcome back, Aishah</h2><p>Your next meaningful piece is waiting.</p></div><Flower2 /></div><div className="account-grid">{menu.map(([icon, label, route]) => <button key={String(label)} onClick={() => navigate(route as Page)}><span>{icon}</span><strong>{label}</strong><ChevronRight size={18} /></button>)}</div><button className="logout-button" onClick={onLogout}><LogOut size={18} /> Logout</button></div></section></div>;
}

function OrdersPage({ navigate }: { navigate: SharedActions["navigate"] }) {
  const orders = [
    { id: "#DC-240814", date: "8 August 2026", product: initialProducts[0], amount: 1850, status: "Shipped" },
    { id: "#DC-231109", date: "19 July 2026", product: initialProducts[3], amount: 190, status: "Delivered" },
    { id: "#DC-221876", date: "2 June 2026", product: initialProducts[4], amount: 1500, status: "Confirmed" },
  ];
  return <div className="page-wrap"><PageHero eyebrow="Purchase history" title="My Orders" text="View, track and revisit your Divine Collection orders." /><section className="container orders-section section"><div className="order-filters"><button className="active">All orders</button><button>Processing</button><button>Shipped</button><button>Delivered</button><button>Cancelled</button></div><div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}><div className="order-card-head"><div><span>Order {order.id}</span><small>Placed {order.date}</small></div><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></div><div className="order-card-body"><ProductImage product={order.product} /><div><strong>{order.product.name}</strong><small>1 item · {order.product.category}</small></div><b>{formatMYR(order.amount)}</b></div><div className="order-card-actions"><button className="btn btn-ghost" onClick={() => navigate("tracking")}>View Order</button>{order.status !== "Delivered" && <button className="btn btn-outline" onClick={() => navigate("tracking")}><Truck size={16} /> Track Order</button>}<button className="btn btn-primary" onClick={() => navigate("product", order.product.id)}>Buy Again</button></div></article>)}</div></section></div>;
}

const infoContent: Record<"about" | "faq" | "privacy" | "terms" | "returns", { eyebrow: string; title: string; intro: string; sections: Array<[string, string]> }> = {
  about: { eyebrow: "Our story", title: "Objects of devotion, chosen with care", intro: "Divine Collection brings premium spiritual and decorative craftsmanship to contemporary Malaysian homes.", sections: [["Meaning in every detail", "We believe a sacred space should feel personal, peaceful and beautifully considered. Our collection balances traditional forms with refined finishes for modern interiors."], ["A thoughtful collection", "Every item is selected for its workmanship, presence and suitability for prayer rooms, offices, gifting and meaningful corners of the home."], ["Care from us to you", "From secure packaging to responsive support, we treat each order with the reverence its purpose deserves."]] },
  faq: { eyebrow: "Help centre", title: "Frequently Asked Questions", intro: "Quick answers about orders, delivery, products and care.", sections: [["How long does delivery take?", "Standard delivery across Malaysia usually takes 3–5 business days. Economy and express options are shown at checkout."], ["Can I return an item?", "Eligible unused items in their original packaging may be returned within 7 days. Contact our care team first."], ["Are the product photos accurate?", "We photograph each product carefully. Handmade and decorative finishes may have small variations that make each piece unique."], ["How should I care for my product?", "Use a soft, dry cloth and avoid abrasive cleaners. Product-specific guidance is included on every detail page."]] },
  privacy: { eyebrow: "Your information", title: "Privacy Policy", intro: "We collect only the information required to serve you and protect your shopping experience.", sections: [["Information we use", "Contact, delivery and order information is used to process purchases, provide support and improve our service."], ["How we protect it", "Access is restricted, checkout is encrypted and raw payment card details are never stored by Divine Collection."], ["Your choices", "You may request access, correction or deletion of eligible personal information by contacting our care team."]] },
  terms: { eyebrow: "Shopping with us", title: "Terms & Conditions", intro: "These terms explain how orders, payments, delivery and use of this website work.", sections: [["Orders and pricing", "All prices are shown in Malaysian Ringgit. Orders are confirmed once payment is authorised and stock is allocated."], ["Product information", "We aim for accurate descriptions and imagery. Decorative finishes and handmade details may vary slightly."], ["Responsible use", "This website may not be misused, copied or interfered with. Malaysian law governs purchases made through Divine Collection."]] },
  returns: { eyebrow: "Shop with confidence", title: "Return & Refund Policy", intro: "We want every Divine Collection piece to arrive safely and feel right for your space.", sections: [["7-day returns", "Contact us within 7 days of delivery. Items must be unused, complete and in their original secure packaging."], ["Damaged deliveries", "Photograph the outer packaging and item within 24 hours, then contact us so we can resolve the issue quickly."], ["Refund timing", "Approved refunds are returned to the original payment method, usually within 5–10 business days after inspection."]] },
};

function InformationPage({ page, navigate }: { page: Page; navigate: SharedActions["navigate"] }) {
  if (page === "contact") return <ContactPage />;
  const info = infoContent[page as keyof typeof infoContent];
  return <div className="page-wrap info-page"><PageHero eyebrow={info.eyebrow} title={info.title} text={info.intro} /><section className="container info-layout section"><aside><Logo /><p>Premium spiritual and decorative products for meaningful Malaysian spaces.</p><button className="btn btn-primary" onClick={() => navigate("contact")}>Talk to our care team</button></aside><div className={page === "faq" ? "accordion-list" : "info-sections"}>{info.sections.map(([title, body], index) => page === "faq" ? <details key={title} open={index === 0}><summary>{title}<Plus size={18} /></summary><p>{body}</p></details> : <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{body}</p></article>)}</div></section></div>;
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return <div className="page-wrap info-page"><PageHero eyebrow="We’re here to help" title="Contact Us" text="Questions about a piece or an order? Our care team would love to help." /><section className="container contact-layout section"><div className="contact-details"><span className="eyebrow">Divine care team</span><h2>Let’s find the right answer.</h2><p>We usually respond within one business day.</p><div><Phone /><span><strong>Call us</strong><small>+60 3-8892 1418</small></span></div><div><Mail /><span><strong>Email us</strong><small>care@divinecollection.my</small></span></div><div><MapPin /><span><strong>Visit us</strong><small>Kuala Lumpur, Malaysia</small></span></div></div>{sent ? <div className="form-success"><span><Check /></span><h2>Message received</h2><p>Thank you. Our care team will be in touch shortly.</p></div> : <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label><span>Your name</span><input required placeholder="Full name" /></label><label><span>Email address</span><input required type="email" placeholder="you@example.com" /></label><label><span>Phone</span><input type="tel" placeholder="+60" /></label><label><span>Topic</span><select><option>Product enquiry</option><option>Order support</option><option>Returns</option><option>Other</option></select></label><label className="full"><span>Message</span><textarea required rows={5} placeholder="How can we help?" /></label><button className="btn btn-primary" type="submit">Send message <ArrowRight size={17} /></button></form>}</section></div>;
}

function AuthPage({ mode, navigate, onLogin }: { mode: "login" | "register"; navigate: SharedActions["navigate"]; onLogin: () => void }) {
  const register = mode === "register";
  return <div className="auth-page"><div className="auth-visual"><button className="auth-logo" onClick={() => navigate("home")}><Logo /></button><div className="auth-art"><ProductImage product={initialProducts[2]} /></div><div className="auth-quote"><Sparkles /><p>“Create a space that feels peaceful, personal and divinely yours.”</p></div></div><div className="auth-panel"><button className="back-link" onClick={() => navigate("home")}><ArrowLeft size={17} /> Back to shop</button><div className="auth-form-wrap"><span className="eyebrow">{register ? "Join the collection" : "Welcome back"}</span><h1>{register ? "Create your account" : "Sign in to Divine Collection"}</h1><p>{register ? "Save pieces, track orders and enjoy a smoother checkout." : "Continue to your orders, wishlist and account."}</p><form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>{register && <label><span>Full name</span><input required placeholder="Your full name" /></label>}<label><span>Email address</span><input required type="email" placeholder="you@example.com" /></label>{register && <label><span>Phone</span><input required type="tel" placeholder="+60" /></label>}<label><span>Password</span><input required type="password" minLength={8} placeholder="At least 8 characters" /></label>{!register && <div className="forgot-row"><label><input type="checkbox" /> Remember me</label><button type="button">Forgot password?</button></div>}<button className="btn btn-primary auth-submit" type="submit">{register ? "Create Account" : "Sign In"} <ArrowRight size={17} /></button></form><div className="auth-switch">{register ? "Already have an account?" : "New to Divine Collection?"} <button onClick={() => navigate(register ? "login" : "register")}>{register ? "Sign in" : "Create account"}</button></div><div className="auth-security"><ShieldCheck size={16} /> Secure, protected account access</div></div></div></div>;
}

type AdminSection = "dashboard" | "products" | "orders" | "categories" | "customers" | "discounts" | "banners";

function AdminPage({ products, setProducts, notify }: { products: Product[]; setProducts: (products: Product[]) => void; notify: (message: string) => void }) {
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [editor, setEditor] = useState<Product | "new" | null>(null);
  const nav: Array<[AdminSection, string, ReactNode]> = [["dashboard", "Dashboard", <LayoutDashboard key="dashboard" />], ["products", "Products", <Package key="products" />], ["orders", "Orders", <ShoppingBag key="orders" />], ["categories", "Categories", <Boxes key="categories" />], ["customers", "Customers", <Users key="customers" />], ["discounts", "Discounts", <Percent key="discounts" />], ["banners", "Banners", <Sparkles key="banners" />]];
  const removeProduct = (id: string) => { setProducts(products.filter((product) => product.id !== id)); notify("Product removed"); };
  const saveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (editor === "new") {
      const newProduct: Product = { ...initialProducts[0], id: `custom-${Date.now()}`, name: String(data.get("name") || "NEW DIVINE PIECE"), price: Number(data.get("price")) || 0, stock: Number(data.get("stock")) || 0, category: String(data.get("category")) as Product["category"], sku: `DC-${Date.now().toString().slice(-4)}` };
      setProducts([...products, newProduct]);
      notify("Product added");
    } else if (editor) {
      setProducts(products.map((product) => product.id === editor.id ? { ...product, name: String(data.get("name")), price: Number(data.get("price")), stock: Number(data.get("stock")), category: String(data.get("category")) as Product["category"] } : product));
      notify("Product updated");
    }
    setEditor(null);
  };
  return <div className="admin-shell"><aside className="admin-sidebar"><Logo compact /><nav>{nav.map(([id, label, icon]) => <button key={id} className={section === id ? "active" : ""} onClick={() => setSection(id)}>{icon}<span>{label}</span>{id === "orders" && <b>8</b>}</button>)}</nav><div className="admin-sidebar-bottom"><div className="admin-user"><span>AR</span><p><strong>Aishah R.</strong><small>Administrator</small></p></div><button aria-label="Sign out"><LogOut /></button></div></aside><main className="admin-main"><header className="admin-header"><div><button className="admin-mobile-menu"><Menu /></button><h1>{section[0].toUpperCase() + section.slice(1)}</h1></div><div><button className="admin-search"><Search size={17} /> Search</button><button className="icon-btn badge-wrap"><Bell size={20} /><span className="badge">3</span></button><button className="admin-avatar">AR</button></div></header><div className="admin-content">
    {section === "dashboard" && <AdminDashboard products={products} setSection={setSection} />}
    {section === "products" && <AdminProducts products={products} onEdit={setEditor} onRemove={removeProduct} onAdd={() => setEditor("new")} />}
    {section === "orders" && <AdminOrders />}
    {section === "categories" && <AdminSimple title="Manage categories" text="Organise products into customer-friendly collections." cards={categories.map((category) => [category.name, `${category.count} products`])} button="Add category" />}
    {section === "customers" && <AdminSimple title="Customers" text="View customer profiles and purchase activity." cards={[["Aishah Rahman", "3 orders · MYR 3,540"], ["Kavitha M.", "2 orders · MYR 4,350"], ["Nur Hana", "1 order · MYR 1,500"]]} button="Export customers" />}
    {section === "discounts" && <AdminSimple title="Discounts & coupons" text="Create and manage promotions for your collection." cards={[["DIVINE8", "8% off · Active"], ["WELCOME50", "MYR 50 off · Active"], ["FREESHIP", "Free standard delivery · Scheduled"]]} button="Create discount" />}
    {section === "banners" && <AdminSimple title="Promotional banners" text="Manage home page stories and seasonal campaigns." cards={[["Crafted for Divine Spaces", "Homepage · Active"], ["Bring Tradition Home", "Homepage · Active"], ["Premium Spiritual Collection", "Homepage · Draft"]]} button="Add banner" />}
  </div></main>{editor && <AdminProductEditor product={editor === "new" ? undefined : editor} onClose={() => setEditor(null)} onSubmit={saveProduct} />}</div>;
}

function AdminDashboard({ products, setSection }: { products: Product[]; setSection: (section: AdminSection) => void }) {
  const cards = [["Total Revenue", "MYR 128,450", "+12.4%", <CircleDollarSign key="revenue" />], ["Total Orders", "384", "+8.2%", <ShoppingBag key="orders" />], ["Total Products", String(products.length), "All active", <Package key="products" />], ["Total Customers", "1,248", "+18.6%", <Users key="customers" />]];
  const bars = [42, 58, 49, 72, 63, 88, 76, 96, 85, 110, 92, 122];
  return <><div className="admin-page-heading"><div><span>Saturday, 8 August</span><h2>Good afternoon, Aishah</h2><p>Here’s what’s happening with Divine Collection today.</p></div><button className="btn btn-primary" onClick={() => setSection("products")}><Plus size={17} /> Add Product</button></div><div className="metric-grid">{cards.map(([label, value, trend, icon]) => <article key={String(label)}><div><span>{icon}</span><small>{trend}</small></div><p>{label}</p><strong>{value}</strong></article>)}</div><div className="admin-grid"><section className="chart-card"><div className="admin-card-head"><div><h3>Revenue overview</h3><p>Monthly sales performance</p></div><select><option>Last 12 months</option><option>Last 6 months</option></select></div><div className="chart-total"><strong>MYR 128,450</strong><span>+12.4% vs last year</span></div><div className="bar-chart" aria-label="Monthly revenue bar chart">{bars.map((height, index) => <div key={index}><span style={{ height }} /><small>{["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][index]}</small></div>)}</div></section><section className="top-products-card"><div className="admin-card-head"><div><h3>Top products</h3><p>By revenue this month</p></div><button onClick={() => setSection("products")}>View all</button></div>{initialProducts.slice(0, 4).map((product, index) => <div className="top-product" key={product.id}><span className="rank">0{index + 1}</span><ProductImage product={product} /><p><strong>{product.name}</strong><small>{18 - index * 3} sold</small></p><b>{formatMYR(product.price * (18 - index * 3))}</b></div>)}</section></div><div className="admin-grid lower"><section className="orders-mini"><div className="admin-card-head"><div><h3>Recent orders</h3><p>Latest customer activity</p></div><button onClick={() => setSection("orders")}>Manage orders</button></div><AdminOrders compact /></section><section className="inventory-card"><div className="admin-card-head"><div><h3>Inventory health</h3><p>Current stock overview</p></div><Boxes /></div><div className="inventory-ring"><span><strong>{products.reduce((sum, product) => sum + product.stock, 0)}</strong><small>Total units</small></span></div><div className="inventory-legend"><p><span className="green" />Healthy stock <b>5</b></p><p><span className="gold" />Low stock <b>1</b></p><p><span className="red" />Out of stock <b>0</b></p></div></section></div></>;
}

function AdminProducts({ products, onEdit, onRemove, onAdd }: { products: Product[]; onEdit: (product: Product) => void; onRemove: (id: string) => void; onAdd: () => void }) {
  return <><div className="admin-page-heading"><div><span>Catalog management</span><h2>All products</h2><p>Update pricing, stock and product information.</p></div><button className="btn btn-primary" onClick={onAdd}><Plus size={17} /> Add Product</button></div><div className="admin-table-card"><div className="table-tools"><label><Search size={17} /><input placeholder="Search products" /></label><button><Filter size={16} /> Filter</button><button><Upload size={16} /> Import</button></div><div className="responsive-table"><table><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td><div className="table-product"><ProductImage product={product} /><span><strong>{product.name}</strong><small>{product.sku}</small></span></div></td><td>{product.category}</td><td><strong>{formatMYR(product.price)}</strong></td><td>{product.stock}</td><td><span className="status-pill active">Active</span></td><td><div className="table-actions"><button onClick={() => onEdit(product)} aria-label="Edit product"><Edit3 size={16} /></button><button onClick={() => onRemove(product.id)} aria-label="Delete product"><Trash2 size={16} /></button></div></td></tr>)}</tbody></table></div></div></>;
}

function AdminOrders({ compact = false }: { compact?: boolean }) {
  const rows = [["#DC-240814", "Aishah Rahman", "MYR 1,850", "Shipped"], ["#DC-240813", "Kavitha M.", "MYR 3,000", "Processing"], ["#DC-240812", "Nur Hana", "MYR 1,500", "Confirmed"], ["#DC-240811", "Arun Kumar", "MYR 2,200", "Delivered"]];
  const table = <div className="responsive-table"><table><thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th>{!compact && <th>Actions</th>}</tr></thead><tbody>{rows.slice(0, compact ? 4 : rows.length).map((row) => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td><span className={`status-pill ${row[3].toLowerCase()}`}>{row[3]}</span></td>{!compact && <td><select defaultValue={row[3]}><option>Processing</option><option>Confirmed</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></td>}</tr>)}</tbody></table></div>;
  if (compact) return table;
  return <><div className="admin-page-heading"><div><span>Fulfilment</span><h2>Order management</h2><p>Review orders and keep customers updated.</p></div><button className="btn btn-outline"><Upload size={17} /> Export Orders</button></div><div className="admin-table-card"><div className="table-tools"><label><Search size={17} /><input placeholder="Search orders" /></label><button><Filter size={16} /> Status</button></div>{table}</div></>;
}

function AdminSimple({ title, text, cards, button }: { title: string; text: string; cards: string[][]; button: string }) {
  return <><div className="admin-page-heading"><div><span>Divine Collection</span><h2>{title}</h2><p>{text}</p></div><button className="btn btn-primary"><Plus size={17} /> {button}</button></div><div className="simple-admin-grid">{cards.map(([titleText, detail]) => <article key={titleText}><span><Store /></span><div><h3>{titleText}</h3><p>{detail}</p></div><button><Edit3 size={17} /></button></article>)}</div></>;
}

function AdminProductEditor({ product, onClose, onSubmit }: { product?: Product; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="modal-backdrop admin-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><form className="product-editor" onSubmit={onSubmit}><div className="editor-head"><div><span>{product ? "Update catalog" : "New catalog item"}</span><h2>{product ? "Edit Product" : "Add Product"}</h2></div><button type="button" onClick={onClose}><X /></button></div><label className="upload-zone"><Upload /><strong>Upload product images</strong><span>PNG or JPG · Main image and gallery</span><input type="file" accept="image/png,image/jpeg" multiple /></label><div className="editor-fields"><label className="full"><span>Product name</span><input name="name" required defaultValue={product?.name} /></label><label><span>Category</span><select name="category" defaultValue={product?.category || "Divine Home"}><option>Divine Home</option><option>Temples</option><option>Accessories</option><option>Lighting</option></select></label><label><span>Price (MYR)</span><input name="price" type="number" min="0" step="0.01" required defaultValue={product?.price} /></label><label><span>Stock</span><input name="stock" type="number" min="0" required defaultValue={product?.stock} /></label><label><span>Status</span><select><option>Active</option><option>Draft</option><option>Archived</option></select></label><label className="full"><span>Description</span><textarea rows={4} defaultValue={product?.description} /></label></div><div className="editor-actions"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-primary" type="submit">{product ? "Save Changes" : "Add Product"}</button></div></form></div>;
}

function Footer({ navigate }: { navigate: SharedActions["navigate"] }) {
  return <footer className="footer"><div className="container footer-top"><div className="footer-brand"><Logo /><p>Premium spiritual and decorative pieces for peaceful, meaningful spaces.</p><div className="social-links"><button aria-label="Instagram"><Instagram /></button><button aria-label="Facebook"><Facebook /></button><button aria-label="YouTube"><Youtube /></button></div></div><div><h3>Explore</h3><button onClick={() => navigate("shop")}>Shop Collection</button><button onClick={() => navigate("categories")}>Categories</button><button onClick={() => navigate("wishlist")}>Wishlist</button><button onClick={() => navigate("about")}>About Us</button></div><div><h3>Categories</h3><button onClick={() => navigate("shop")}>Divine Home</button><button onClick={() => navigate("shop")}>Temples</button><button onClick={() => navigate("shop")}>Accessories</button><button onClick={() => navigate("shop")}>Lighting</button></div><div><h3>Customer care</h3><button onClick={() => navigate("contact")}>Contact Us</button><button onClick={() => navigate("faq")}>FAQ</button><button onClick={() => navigate("tracking")}>Order Tracking</button><button onClick={() => navigate("returns")}>Returns &amp; Refunds</button></div><div className="footer-contact"><h3>Stay inspired</h3><p>Receive new collection stories and thoughtful offers.</p><label><input type="email" placeholder="Your email address" aria-label="Email address" /><button aria-label="Subscribe"><ArrowRight /></button></label><small><MapPin size={14} /> Kuala Lumpur, Malaysia</small></div></div><div className="container footer-bottom"><span>© 2026 Divine Collection. All rights reserved.</span><div><button onClick={() => navigate("privacy")}>Privacy Policy</button><button onClick={() => navigate("terms")}>Terms &amp; Conditions</button><button onClick={() => navigate("returns")}>Returns</button><button onClick={() => navigate("admin")}>Admin</button></div></div></footer>;
}
