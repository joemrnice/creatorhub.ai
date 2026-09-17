/**
 * CreatorHub Core Engine & Backend Mock Services
 *
 * Future Production Integrations Architecture:
 * - Authentication: Supabase Auth / NextAuth / Clerk
 * - Database: PostgreSQL with Prisma ORM / Supabase DB
 * - File Storage: AWS S3 / Cloudflare R2 / UploadThing
 * - Payment Gateway: Stripe Checkout & Webhooks / Lemon Squeezy
 * - Email Service: Resend API / SendGrid
 * - AI Engine: OpenAI API (GPT-4o) / Anthropic Claude API
 * - Analytics: PostHog / Plausible Analytics
 */

// Application State Store
const state = {
  creator: { ...INITIAL_CREATOR },
  products: [...INITIAL_PRODUCTS],
  customers: [...INITIAL_CUSTOMERS],
  orders: [...INITIAL_ORDERS],
  analytics: { ...INITIAL_ANALYTICS },
  cart: [],
  currentView: 'storefront', // 'storefront' | 'dashboard'
  dashboardTab: 'analytics', // 'analytics' | 'products' | 'create-product' | 'ai-copilot' | 'customers'
  selectedCategory: 'All',
  searchQuery: '',
  theme: localStorage.getItem('creatorhub-theme') || 'dark',
  activeCoupon: null
};

/* ==========================================================================
   BACKEND MOCK FUNCTIONS (SIMULATED API LAYER)
   ========================================================================== */

/**
 * BACKEND: Connect Database API (e.g., Supabase / Prisma `prisma.product.findMany()`)
 * Fetches product catalog filtered by category or search term.
 */
async function fetchProducts(category = 'All', search = '') {
  // Simulate API network latency
  await new Promise(resolve => setTimeout(resolve, 80));

  return state.products.filter(product => {
    const matchesCategory = category === 'All' || product.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = !search ||
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

/**
 * BACKEND: Connect Database & File Storage API
 * Creates a new product record in PostgreSQL and uploads media assets to Cloudflare R2 / S3.
 */
async function createProduct(productData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const newProduct = {
    id: `prod-${Date.now()}`,
    featured: false,
    title: productData.title || "Untitled Product",
    type: productData.type || "Digital Product",
    category: productData.category || "Design System",
    price: parseFloat(productData.price) || 29,
    originalPrice: parseFloat(productData.price) ? Math.round(parseFloat(productData.price) * 1.3) : 39,
    discountPercent: 25,
    rating: 5.0,
    reviewCount: 1,
    salesCount: 0,
    coverImage: productData.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    shortDescription: productData.shortDescription || "No description provided.",
    fullDescription: productData.fullDescription || "Full details coming soon.",
    features: productData.features || ["Instant digital download", "Lifetime updates"],
    whatsIncluded: productData.whatsIncluded || ["Main file assets", "Documentation PDF"],
    gallery: [
      productData.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
    ],
    reviews: [],
    faq: productData.faq || [{ q: "How do I access my purchase?", a: "Direct download link sent to your email immediately." }]
  };

  state.products.unshift(newProduct);
  showToast(`Product "${newProduct.title}" published successfully!`, 'success');
  return newProduct;
}

/**
 * BACKEND: Connect Orders Database API
 * Retrieves sales orders history.
 */
async function fetchOrders() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return state.orders;
}

/**
 * BACKEND: Connect Customer Management API
 * Fetches customer profiles and purchasing history.
 */
async function fetchCustomers() {
  await new Promise(resolve => setTimeout(resolve, 50));
  return state.customers;
}

/**
 * BACKEND: Connect Generative AI API (e.g., OpenAI API / Anthropic Claude 3.5 Sonnet)
 * Simulates streaming AI response generation for marketing & product copy.
 */
async function generateAIContent(mode, promptText) {
  await new Promise(resolve => setTimeout(resolve, 300));

  const modeResponses = {
    title: [
      `Nexus UI — Enterprise Tailwind & React Component System`,
      `SaaS Accelerator Pro — Fullstack Next.js 14 Launch Template`,
      `The Design Engineer's Handbook — Modern Token Architecture`
    ],
    description: `Crafted for high-growth tech teams, this package provides modular, accessible UI patterns that integrate directly into modern Next.js and Tailwind workflows. Includes full Figma token sync, dark mode support, and TypeScript definitions out of the box.`,
    headline: `🚀 Ship your next digital product 10x faster with production-tested design tokens and clean React code.`,
    seo: `Meta Title: Apex Design System — Figma & React UI Kit\nMeta Description: Accelerate development with 2,500+ accessibility-checked Figma components and matching Tailwind CSS React code.\nKeywords: design system, figma UI kit, react tailwind template, design tokens`,
    social: `Excited to release Apex Design System 3.0! 🎨⚡️\n\nOver 2,500+ Figma components, auto-layout 5.0, full light/dark mode tokens, and matching Next.js code.\n\nGrab your copy now with 35% launch discount: creatorhub.ai/alexvance #DesignSystem #WebDev`,
    email: `Subject: Introducing Apex 3.0 — The Ultimate UI Kit for Creators\n\nHey {{FirstName}},\n\nI just dropped Apex Design System 3.0! It's our biggest update ever, packed with 2,500+ Figma components and production-ready Next.js code.\n\nGet 35% off for the next 48 hours.\n\nCheers,\nAlex Vance`
  };

  if (mode === 'title') {
    const arr = modeResponses.title;
    return arr[Math.floor(Math.random() * arr.length)];
  }
  return modeResponses[mode] || modeResponses['description'];
}

/**
 * BACKEND: Connect Stripe Gateway API / PaymentIntents API
 * Processes checkout order, calculates discounts, updates analytics & sends confirmation email.
 */
async function processCheckout(customerInfo, cartItems, couponCode) {
  await new Promise(resolve => setTimeout(resolve, 600));

  let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  let discount = couponCode === 'CREATOR20' ? subtotal * 0.20 : 0;
  let total = Math.max(0, subtotal - discount);

  // Register order
  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: customerInfo.name,
    customerEmail: customerInfo.email,
    productTitle: cartItems.map(i => i.title).join(', '),
    amount: Math.round(total),
    status: 'Completed',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Credit Card (•••• 4242)'
  };

  state.orders.unshift(newOrder);

  // Update customer CRM record
  let existingCustomer = state.customers.find(c => c.email.toLowerCase() === customerInfo.email.toLowerCase());
  if (existingCustomer) {
    existingCustomer.totalSpend += Math.round(total);
    existingCustomer.ordersCount += 1;
    existingCustomer.productsOwned.push(...cartItems.map(i => i.title));
  } else {
    state.customers.unshift({
      id: `cust-${Date.now()}`,
      name: customerInfo.name,
      email: customerInfo.email,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150`,
      totalSpend: Math.round(total),
      ordersCount: 1,
      segment: 'New Customer',
      joinedDate: new Date().toISOString().split('T')[0],
      productsOwned: cartItems.map(i => i.title)
    });
  }

  // Update overall metrics
  state.analytics.totalRevenue += Math.round(total);
  state.analytics.productsSold += cartItems.length;

  // Clear cart
  state.cart = [];
  updateCartUI();

  return { success: true, order: newOrder };
}

/**
 * BACKEND: Connect Transactional Email API (e.g. Resend / SendGrid)
 * Sends newsletter or direct customer emails.
 */
async function sendNewsletter(email) {
  await new Promise(resolve => setTimeout(resolve, 150));
  showToast(`Subscribed ${email} to creator updates!`, 'success');
  return { success: true };
}


/* ==========================================================================
   UI CONTROLLERS & EVENT HANDLERS
   ========================================================================== */

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  renderApp();
});

// Theme Management
function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('creatorhub-theme', theme);
  const html = document.documentElement;

  if (theme === 'dark') {
    html.classList.add('dark');
    html.setAttribute('data-theme', 'dark');
  } else {
    html.classList.remove('dark');
    html.setAttribute('data-theme', 'light');
  }

  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

// Toast Notification System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast border-l-4 ${
    type === 'success' ? 'border-emerald-500 text-emerald-400' :
    type === 'danger' ? 'border-red-500 text-red-400' :
    'border-indigo-500 text-indigo-400'
  }`;

  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : type === 'danger' ? 'alert-triangle' : 'info'}" class="w-5 h-5 flex-shrink-0"></i>
    <span class="text-xs font-semibold text-[var(--text-primary)]">${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Navigation & View Switching
function switchView(viewName) {
  state.currentView = viewName;

  const navStorefront = document.getElementById('nav-tab-storefront');
  const navDashboard = document.getElementById('nav-tab-dashboard');

  if (navStorefront && navDashboard) {
    if (viewName === 'storefront') {
      navStorefront.className = 'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all text-white bg-indigo-600 shadow-sm';
      navDashboard.className = 'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)]';
    } else {
      navDashboard.className = 'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all text-white bg-indigo-600 shadow-sm';
      navStorefront.className = 'flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)]';
    }
  }

  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileNav() {
  const menu = document.getElementById('mobile-nav-menu');
  if (menu) menu.classList.toggle('hidden');
}

// Global Render Router
function renderApp() {
  const container = document.getElementById('app-content');
  if (!container) return;

  if (state.currentView === 'storefront') {
    renderStorefront(container);
  } else {
    renderDashboardView(container);
  }

  lucide.createIcons();
}

/* ==========================================================================
   PUBLIC STOREFRONT RENDERER
   ========================================================================== */

function renderStorefront(container) {
  const creator = state.creator;
  const categories = ['All', 'Design System', 'Boilerplate', 'Course', 'Coaching', 'Ebook', 'Notion'];

  container.innerHTML = `
    <!-- Creator Hero Header -->
    <div class="relative rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-surface)] mb-10 shadow-xl">
      <!-- Cover Banner -->
      <div class="h-48 sm:h-64 md:h-80 w-full relative bg-cover bg-center" style="background-image: url('${creator.coverImage}');">
        <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-black/30 to-transparent"></div>
      </div>

      <!-- Profile Details Overlay -->
      <div class="px-6 sm:px-10 pb-8 pt-0 relative -mt-16 sm:-mt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-end gap-5">
          <img src="${creator.avatar}" alt="${creator.name}" class="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-[var(--bg-surface)] shadow-2xl relative z-10">

          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h1 class="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] tracking-tight">${creator.name}</h1>
              ${creator.verified ? `<i data-lucide="check-circle-2" class="w-5 h-5 text-indigo-400 fill-indigo-500/20" title="Verified Creator"></i>` : ''}
            </div>
            <p class="text-sm font-medium text-indigo-400">${creator.title}</p>
            <p class="text-xs text-[var(--text-secondary)] flex items-center gap-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5"></i> ${creator.location} • <span class="text-emerald-400 font-semibold">${creator.followersCount.toLocaleString()} Followers</span>
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <!-- Follow Button -->
          <button onclick="toggleFollowCreator()" id="follow-btn" class="flex-1 md:flex-none px-6 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
            creator.isFollowing ? 'bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)]' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
          }">
            <i data-lucide="${creator.isFollowing ? 'user-check' : 'user-plus'}" class="w-4 h-4"></i>
            <span>${creator.isFollowing ? 'Following' : 'Follow Creator'}</span>
          </button>

          <!-- Social Links -->
          <div class="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
            ${creator.socials.map(s => `
              <a href="${s.url}" target="_blank" class="p-2 rounded-lg hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-indigo-400 transition-colors" title="${s.name}">
                <i data-lucide="${s.icon}" class="w-4 h-4"></i>
              </a>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Bio & Stats Bar -->
      <div class="px-6 sm:px-10 py-4 border-t border-[var(--border-color)] bg-[var(--bg-subtle)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p class="text-[var(--text-secondary)] max-w-2xl leading-relaxed">${creator.bio}</p>

        <div class="flex items-center gap-6 text-center border-t md:border-t-0 border-[var(--border-color)] pt-3 md:pt-0 w-full md:w-auto justify-around">
          <div>
            <div class="font-bold text-sm text-[var(--text-primary)]">${creator.stats.totalSales.toLocaleString()}+</div>
            <div class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Sales</div>
          </div>
          <div>
            <div class="font-bold text-sm text-[var(--text-primary)] flex items-center justify-center gap-1">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i> ${creator.stats.rating}
            </div>
            <div class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Rating</div>
          </div>
          <div>
            <div class="font-bold text-sm text-[var(--text-primary)]">${creator.stats.productsCount}</div>
            <div class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Products</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Spotlight Featured Product Banner -->
    ${renderFeaturedProductBanner()}

    <!-- Main Products Catalog Section -->
    <div class="space-y-6">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 class="text-2xl font-display font-bold text-[var(--text-primary)]">Digital Products & Resources</h2>
          <p class="text-xs text-[var(--text-secondary)]">Explore courses, Figma templates, starter kits and 1-on-1 services</p>
        </div>

        <!-- Filter Controls -->
        <div class="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <!-- Search Input -->
          <div class="relative flex-grow sm:flex-grow-0 sm:w-64">
            <i data-lucide="search" class="w-4 h-4 absolute left-3 top-2.5 text-[var(--text-muted)]"></i>
            <input type="text" id="store-search-input" value="${state.searchQuery}" oninput="handleSearchInput(event)" placeholder="Search products..." class="w-full pl-9 pr-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500">
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        ${categories.map(cat => `
          <button onclick="filterCategory('${cat}')" class="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            state.selectedCategory === cat
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
            : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-indigo-500/50'
          }">
            ${cat}
          </button>
        `).join('')}
      </div>

      <!-- Product Cards Grid -->
      <div id="product-grid-container" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Rendered dynamically -->
      </div>
    </div>

    <!-- Testimonials Section -->
    <div class="mt-16 pt-12 border-t border-[var(--border-color)]">
      <div class="text-center max-w-xl mx-auto mb-10 space-y-2">
        <span class="text-xs font-bold uppercase tracking-widest text-indigo-400">Wall of Love</span>
        <h3 class="text-2xl font-display font-bold text-[var(--text-primary)]">Loved by designers & engineers</h3>
      </div>

      <div class="swiper testimonials-swiper">
        <div class="swiper-wrapper py-4">
          ${renderTestimonialsSlides()}
        </div>
        <div class="swiper-pagination mt-6"></div>
      </div>
    </div>

    <!-- Creator Newsletter Section -->
    <div class="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-[var(--bg-surface)] border border-indigo-500/20 relative overflow-hidden">
      <div class="max-w-2xl mx-auto text-center space-y-4">
        <div class="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto">
          <i data-lucide="mail-check" class="w-6 h-6"></i>
        </div>
        <h3 class="text-2xl font-display font-bold text-[var(--text-primary)]">Join the Design Engineering Dispatch</h3>
        <p class="text-xs text-[var(--text-secondary)] leading-relaxed">Weekly insights on Figma variable architectures, Next.js UI performance, and digital creator monetization. Zero spam.</p>

        <form onsubmit="handleNewsletterSubmit(event)" class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <input type="email" required id="newsletter-email" placeholder="Enter your email..." class="flex-grow px-4 py-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-indigo-500">
          <button type="submit" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all">
            Subscribe Free
          </button>
        </form>
      </div>
    </div>
  `;

  // Render product grid items
  renderProductGrid();

  // Initialize Swiper for testimonials
  setTimeout(() => {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }, 100);
}

function renderFeaturedProductBanner() {
  const featured = state.products.find(p => p.featured) || state.products[0];
  if (!featured) return '';

  return `
    <div class="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[var(--bg-surface)] to-[var(--bg-surface)] border border-indigo-500/30 shadow-2xl relative overflow-hidden group">
      <div class="absolute top-4 right-4">
        <span class="badge bg-gradient-to-r from-amber-500 to-pink-500 text-white font-bold tracking-wider shadow-md">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> FEATURED RELEASE
        </span>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="flex items-center gap-2 text-xs text-indigo-400 font-semibold">
            <span class="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20">${featured.category}</span>
            <span>•</span>
            <span class="flex items-center gap-1 text-amber-400">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${featured.rating} (${featured.reviewCount} reviews)
            </span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)] leading-tight group-hover:text-indigo-400 transition-colors">
            ${featured.title}
          </h3>

          <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            ${featured.shortDescription}
          </p>

          <div class="flex items-center gap-4 pt-2">
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-bold font-display text-indigo-400">$${featured.price}</span>
              ${featured.originalPrice ? `<span class="text-sm text-[var(--text-muted)] line-through">$${featured.originalPrice}</span>` : ''}
            </div>

            <div class="flex items-center gap-2">
              <button onclick="openProductModal('${featured.id}')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center gap-2 transition-all">
                <i data-lucide="eye" class="w-4 h-4"></i> Preview
              </button>
              <button onclick="addToCart('${featured.id}')" class="px-5 py-2.5 bg-[var(--bg-surface-elevated)] hover:bg-indigo-600 hover:text-white border border-[var(--border-color)] text-xs font-bold rounded-xl flex items-center gap-2 transition-all">
                <i data-lucide="shopping-cart" class="w-4 h-4"></i> Buy Now
              </button>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5">
          <div class="relative rounded-2xl overflow-hidden border border-[var(--border-color)] aspect-video shadow-xl cursor-pointer" onclick="openProductModal('${featured.id}')">
            <img src="${featured.coverImage}" alt="${featured.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function renderProductGrid() {
  const container = document.getElementById('product-grid-container');
  if (!container) return;

  const products = await fetchProducts(state.selectedCategory, state.searchQuery);

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center space-y-3 bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl">
        <i data-lucide="folder-open" class="w-10 h-10 text-[var(--text-muted)] mx-auto"></i>
        <h4 class="text-base font-bold text-[var(--text-primary)]">No products found</h4>
        <p class="text-xs text-[var(--text-secondary)]">Try adjusting your search or category filter.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="group rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden card-hover-effect flex flex-col h-full">
      <!-- Product Cover Image -->
      <div class="relative aspect-video overflow-hidden bg-[var(--bg-subtle)] cursor-pointer" onclick="openProductModal('${p.id}')">
        <img src="${p.coverImage}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">

        <div class="absolute top-3 left-3">
          <span class="badge badge-neutral shadow-md backdrop-blur-md">${p.category}</span>
        </div>

        ${p.discountPercent ? `
          <div class="absolute top-3 right-3">
            <span class="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">${p.discountPercent}% OFF</span>
          </div>
        ` : ''}
      </div>

      <!-- Card Body -->
      <div class="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span class="flex items-center gap-1 text-amber-400 font-semibold">
              <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i> ${p.rating} (${p.reviewCount})
            </span>
            <span>${p.salesCount.toLocaleString()} sales</span>
          </div>

          <h3 class="text-base font-bold text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors line-clamp-2 cursor-pointer" onclick="openProductModal('${p.id}')">
            ${p.title}
          </h3>

          <p class="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            ${p.shortDescription}
          </p>
        </div>

        <!-- Footer Pricing & Action Buttons -->
        <div class="pt-3 border-t border-[var(--border-color)] flex items-center justify-between gap-2">
          <div class="flex items-baseline gap-1.5">
            <span class="text-lg font-bold font-display text-[var(--text-primary)]">$${p.price}</span>
            ${p.originalPrice ? `<span class="text-xs text-[var(--text-muted)] line-through">$${p.originalPrice}</span>` : ''}
          </div>

          <div class="flex items-center gap-1.5">
            <button onclick="openProductModal('${p.id}')" class="px-3 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-indigo-600 hover:text-white text-xs font-semibold border border-[var(--border-color)] transition-colors" title="Quick Preview">
              Preview
            </button>
            <button onclick="addToCart('${p.id}')" class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i> Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function renderTestimonialsSlides() {
  const testimonials = [
    { name: "Sarah Jenkins", role: "Design Lead @ Vercel", text: "Apex Design System saved our front-end team months of work. Cleanest Figma-to-Tailwind tokens I've ever used.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
    { name: "David Chen", role: "CTO @ SaaSify", text: "The Next.js 14 SaaS boilerplate is ridiculously complete. Stripe billing worked in minutes.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
    { name: "Elena Rostova", role: "Product Designer @ Spotify", text: "Alex's design token course completely elevated how our design system operates across Web & iOS.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" }
  ];

  return testimonials.map(t => `
    <div class="swiper-slide h-auto">
      <div class="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] h-full flex flex-col justify-between space-y-4">
        <p class="text-xs text-[var(--text-secondary)] italic leading-relaxed">"${t.text}"</p>
        <div class="flex items-center gap-3 pt-2 border-t border-[var(--border-color)]">
          <img src="${t.avatar}" alt="${t.name}" class="w-9 h-9 rounded-full object-cover">
          <div>
            <div class="text-xs font-bold text-[var(--text-primary)]">${t.name}</div>
            <div class="text-[10px] text-[var(--text-muted)]">${t.role}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterCategory(cat) {
  state.selectedCategory = cat;
  renderApp();
}

function handleSearchInput(e) {
  state.searchQuery = e.target.value;
  renderProductGrid();
}

function toggleFollowCreator() {
  state.creator.isFollowing = !state.creator.isFollowing;
  state.creator.followersCount += state.creator.isFollowing ? 1 : -1;
  showToast(state.creator.isFollowing ? 'You are now following Alex Vance!' : 'Unfollowed creator');
  renderApp();
}

function handleNewsletterSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('newsletter-email');
  if (emailInput && emailInput.value) {
    sendNewsletter(emailInput.value);
    emailInput.value = '';
  }
}

/* ==========================================================================
   PRODUCT DETAIL MODAL RENDERER
   ========================================================================== */

function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const modalBackdrop = document.getElementById('product-modal-backdrop');
  const modalContent = document.getElementById('product-modal-content');
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative p-6 sm:p-8 space-y-8">
      <!-- Close Button -->
      <button onclick="closeProductModal()" class="absolute top-4 right-4 p-2 rounded-xl hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left Column: Gallery & Info -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Gallery Swiper -->
          <div class="swiper product-gallery-swiper rounded-2xl overflow-hidden border border-[var(--border-color)] aspect-video">
            <div class="swiper-wrapper">
              ${product.gallery.map(img => `
                <div class="swiper-slide">
                  <img src="${img}" alt="${product.title}" class="w-full h-full object-cover">
                </div>
              `).join('')}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="badge badge-primary">${product.category}</span>
              <span class="badge badge-neutral">${product.type}</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-display font-bold text-[var(--text-primary)]">${product.title}</h2>
            <p class="text-xs sm:text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">${product.fullDescription}</p>
          </div>

          <!-- Key Features Checklist -->
          <div class="space-y-3 pt-4 border-t border-[var(--border-color)]">
            <h4 class="text-sm font-bold text-[var(--text-primary)] font-display">Key Features</h4>
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
              ${product.features.map(f => `
                <li class="flex items-center gap-2">
                  <i data-lucide="check" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- What's Included -->
          <div class="space-y-3 pt-4 border-t border-[var(--border-color)]">
            <h4 class="text-sm font-bold text-[var(--text-primary)] font-display">What's Included</h4>
            <div class="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-2 text-xs">
              ${product.whatsIncluded.map(item => `
                <div class="flex items-center gap-2 text-[var(--text-primary)]">
                  <i data-lucide="file-text" class="w-4 h-4 text-indigo-400"></i>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Customer Reviews -->
          <div class="space-y-4 pt-4 border-t border-[var(--border-color)]">
            <h4 class="text-sm font-bold text-[var(--text-primary)] font-display">Customer Reviews (${product.reviews.length})</h4>
            <div class="space-y-3">
              ${product.reviews.map(rev => `
                <div class="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] space-y-2">
                  <div class="flex items-center justify-between text-xs">
                    <div class="flex items-center gap-2">
                      <img src="${rev.avatar}" class="w-6 h-6 rounded-full object-cover">
                      <span class="font-bold text-[var(--text-primary)]">${rev.author}</span>
                      <span class="text-[var(--text-muted)]">• ${rev.role}</span>
                    </div>
                    <span class="text-[var(--text-muted)]">${rev.date}</span>
                  </div>
                  <div class="flex items-center gap-1 text-amber-400">
                    ${Array(rev.rating).fill(0).map(() => `<i data-lucide="star" class="w-3 h-3 fill-amber-400"></i>`).join('')}
                  </div>
                  <p class="text-xs text-[var(--text-secondary)]">${rev.comment}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- FAQ Accordions -->
          <div class="space-y-3 pt-4 border-t border-[var(--border-color)]">
            <h4 class="text-sm font-bold text-[var(--text-primary)] font-display">Frequently Asked Questions</h4>
            <div class="space-y-2">
              ${product.faq.map((faqItem, idx) => `
                <div class="rounded-xl border border-[var(--border-color)] bg-[var(--bg-subtle)] overflow-hidden">
                  <button onclick="toggleAccordion('faq-${idx}')" class="w-full p-3.5 text-left text-xs font-semibold text-[var(--text-primary)] flex justify-between items-center">
                    <span>${faqItem.q}</span>
                    <i data-lucide="chevron-down" class="w-4 h-4 text-[var(--text-muted)] transition-transform" id="faq-icon-${idx}"></i>
                  </button>
                  <div id="faq-${idx}" class="accordion-content px-3.5 pb-3.5 text-xs text-[var(--text-secondary)]">
                    ${faqItem.a}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right Sticky Purchase Card -->
        <div class="lg:col-span-5 sticky top-6 space-y-6 p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-color)]">
          <div class="space-y-2">
            <span class="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Instant Download</span>
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold font-display text-indigo-400">$${product.price}</span>
              ${product.originalPrice ? `<span class="text-base text-[var(--text-muted)] line-through">$${product.originalPrice}</span>` : ''}
            </div>
          </div>

          <div class="space-y-3">
            <button onclick="addToCart('${product.id}'); closeProductModal();" class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all">
              <i data-lucide="shopping-bag" class="w-4 h-4"></i> Add to Cart
            </button>
            <button onclick="quickBuyDirect('${product.id}')" class="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all">
              <i data-lucide="zap" class="w-4 h-4"></i> Buy Now Directly
            </button>
          </div>

          <div class="space-y-2 pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
            <div class="flex items-center gap-2">
              <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400"></i> 100% Money Back Guarantee (14 Days)
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="download" class="w-4 h-4 text-indigo-400"></i> Instant File Access via Email
            </div>
            <div class="flex items-center gap-2">
              <i data-lucide="refresh-cw" class="w-4 h-4 text-purple-400"></i> Free Lifetime Updates
            </div>
          </div>

          <!-- Creator Mini Card -->
          <div class="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center gap-3">
            <img src="${state.creator.avatar}" class="w-10 h-10 rounded-full object-cover">
            <div>
              <div class="text-xs font-bold text-[var(--text-primary)]">${state.creator.name}</div>
              <div class="text-[10px] text-[var(--text-muted)]">Created by lead architect</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  modalBackdrop.classList.remove('hidden');
  lucide.createIcons();

  // Init Gallery Swiper
  setTimeout(() => {
    new Swiper('.product-gallery-swiper', {
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  }, 100);
}

function closeProductModal() {
  const modalBackdrop = document.getElementById('product-modal-backdrop');
  if (modalBackdrop) modalBackdrop.classList.add('hidden');
}

function toggleAccordion(id) {
  const content = document.getElementById(id);
  if (content) content.classList.toggle('open');
}

/* ==========================================================================
   CART & CHECKOUT CONTROLLERS
   ========================================================================== */

function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.cart.push(product);
  updateCartUI();
  showToast(`Added "${product.title}" to cart!`, 'success');
  openCartDrawer();
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge-count');
  if (badge) badge.innerText = state.cart.length;

  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 space-y-2 text-[var(--text-muted)]">
        <i data-lucide="shopping-bag" class="w-10 h-10 mx-auto opacity-40"></i>
        <p class="text-xs">Your cart is empty</p>
      </div>
    `;
    updateCartTotals();
    lucide.createIcons();
    return;
  }

  container.innerHTML = state.cart.map((item, idx) => `
    <div class="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between gap-3">
      <img src="${item.coverImage}" class="w-12 h-12 rounded-lg object-cover">
      <div class="flex-grow space-y-0.5">
        <h4 class="text-xs font-bold text-[var(--text-primary)] line-clamp-1">${item.title}</h4>
        <div class="text-[11px] font-semibold text-indigo-400">$${item.price}</div>
      </div>
      <button onclick="removeFromCart(${idx})" class="p-1 rounded-lg hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-red-400">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `).join('');

  updateCartTotals();
  lucide.createIcons();
}

function updateCartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price, 0);
  const discount = state.activeCoupon === 'CREATOR20' ? subtotal * 0.20 : 0;
  const total = Math.max(0, subtotal - discount);

  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');
  const checkoutTotalDisplay = document.getElementById('checkout-total-display');

  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  if (discountEl) discountEl.innerText = `-$${discount.toFixed(2)}`;
  if (totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
  if (checkoutTotalDisplay) checkoutTotalDisplay.innerText = `$${total.toFixed(2)}`;
}

function applyCoupon() {
  const couponInput = document.getElementById('coupon-input');
  if (couponInput && couponInput.value.trim().toUpperCase() === 'CREATOR20') {
    state.activeCoupon = 'CREATOR20';
    showToast('Applied 20% discount coupon!', 'success');
  } else {
    showToast('Invalid promo code', 'danger');
  }
  updateCartTotals();
}

function openCartDrawer() {
  document.getElementById('cart-drawer-backdrop')?.classList.add('active');
  document.getElementById('cart-drawer')?.classList.add('active');
}

function closeCartDrawer() {
  document.getElementById('cart-drawer-backdrop')?.classList.remove('active');
  document.getElementById('cart-drawer')?.classList.remove('active');
}

function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!', 'danger');
    return;
  }
  closeCartDrawer();
  document.getElementById('checkout-modal-backdrop')?.classList.remove('hidden');
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal-backdrop')?.classList.add('hidden');
}

function quickBuyDirect(productId) {
  addToCart(productId);
  openCheckoutModal();
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('checkout-name')?.value;
  const email = document.getElementById('checkout-email')?.value;

  const btn = document.getElementById('pay-submit-btn');
  if (btn) btn.innerText = 'Processing Order...';

  const res = await processCheckout({ name, email }, state.cart, state.activeCoupon);

  if (res.success) {
    closeCheckoutModal();
    showToast(`Order #${res.order.id} confirmed! Sent access link to ${email}`, 'success');
    if (btn) btn.innerText = 'Complete Purchase';
    renderApp();
  }
}

/* ==========================================================================
   CREATOR DASHBOARD RENDERER
   ========================================================================== */

function renderDashboardView(container) {
  container.innerHTML = `
    <div class="space-y-8">
      <!-- Dashboard Top Header Bar -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 class="text-2xl font-display font-bold text-[var(--text-primary)]">Creator Business OS</h1>
          <p class="text-xs text-[var(--text-secondary)]">Manage catalog, sales analytics, customers, and AI marketing copy</p>
        </div>

        <!-- Dashboard Sub-Tabs -->
        <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] w-full md:w-auto">
          <button onclick="switchDashboardTab('analytics')" class="dash-tab-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${state.dashboardTab === 'analytics' ? 'bg-indigo-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'}">
            <i data-lucide="bar-chart-2" class="w-3.5 h-3.5"></i> Analytics
          </button>
          <button onclick="switchDashboardTab('products')" class="dash-tab-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${state.dashboardTab === 'products' ? 'bg-indigo-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'}">
            <i data-lucide="package" class="w-3.5 h-3.5"></i> Catalog
          </button>
          <button onclick="switchDashboardTab('create-product')" class="dash-tab-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${state.dashboardTab === 'create-product' ? 'bg-indigo-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'}">
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i> Publish Product
          </button>
          <button onclick="switchDashboardTab('customers')" class="dash-tab-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${state.dashboardTab === 'customers' ? 'bg-indigo-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'}">
            <i data-lucide="users" class="w-3.5 h-3.5"></i> Customers
          </button>
          <button onclick="switchDashboardTab('ai-copilot')" class="dash-tab-btn flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold ${state.dashboardTab === 'ai-copilot' ? 'bg-indigo-600 text-white shadow-sm' : 'text-[var(--text-secondary)] hover:text-white'}">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-purple-400"></i> AI Workspace
          </button>
        </div>
      </div>

      <!-- Dashboard Active Tab Content -->
      <div id="dashboard-tab-content">
        ${renderDashboardTabContent()}
      </div>
    </div>
  `;

  lucide.createIcons();

  if (state.dashboardTab === 'analytics') {
    initChartJS();
  } else if (state.dashboardTab === 'create-product') {
    initSortableJS();
  }
}

function switchDashboardTab(tabName) {
  state.dashboardTab = tabName;
  renderApp();
}

function renderDashboardTabContent() {
  switch (state.dashboardTab) {
    case 'analytics':
      return renderAnalyticsTab();
    case 'products':
      return renderProductsCatalogTab();
    case 'create-product':
      return renderProductPublisherTab();
    case 'customers':
      return renderCustomersTab();
    case 'ai-copilot':
      return renderAICopilotTab();
    default:
      return renderAnalyticsTab();
  }
}

/* ==========================================================================
   ANALYTICS TAB & CHART.JS
   ========================================================================== */

function renderAnalyticsTab() {
  const analytics = state.analytics;

  return `
    <div class="space-y-8">
      <!-- KPI Stat Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
          <div class="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Total Revenue</span>
            <i data-lucide="dollar-sign" class="w-4 h-4 text-emerald-400"></i>
          </div>
          <div class="text-2xl font-bold font-display text-[var(--text-primary)]">$${analytics.totalRevenue.toLocaleString()}</div>
          <div class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> ${analytics.revenueChange} vs last month
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
          <div class="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Products Sold</span>
            <i data-lucide="shopping-bag" class="w-4 h-4 text-indigo-400"></i>
          </div>
          <div class="text-2xl font-bold font-display text-[var(--text-primary)]">${analytics.productsSold.toLocaleString()}</div>
          <div class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> ${analytics.salesChange} growth
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
          <div class="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Total Customers</span>
            <i data-lucide="users" class="w-4 h-4 text-purple-400"></i>
          </div>
          <div class="text-2xl font-bold font-display text-[var(--text-primary)]">${analytics.totalCustomers.toLocaleString()}</div>
          <div class="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> ${analytics.customersChange} new users
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
          <div class="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Store Conversion</span>
            <i data-lucide="percent" class="w-4 h-4 text-amber-400"></i>
          </div>
          <div class="text-2xl font-bold font-display text-[var(--text-primary)]">${analytics.conversionRate}</div>
          <div class="text-[11px] text-[var(--text-muted)]">From ${analytics.totalTraffic} total visits</div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Revenue & Traffic Line Chart -->
        <div class="lg:col-span-8 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-bold font-display text-[var(--text-primary)]">Revenue & Traffic Over Time</h3>
              <p class="text-xs text-[var(--text-secondary)]">Monthly growth analytics breakdown</p>
            </div>
            <div class="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-color)] text-[11px]">
              <button class="px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold">12M</button>
              <button class="px-2.5 py-1 rounded text-[var(--text-secondary)] hover:text-white">30D</button>
              <button class="px-2.5 py-1 rounded text-[var(--text-secondary)] hover:text-white">7D</button>
            </div>
          </div>
          <div class="h-64 sm:h-80 w-full">
            <canvas id="revenueChart"></canvas>
          </div>
        </div>

        <!-- Sales Distribution Doughnut Chart -->
        <div class="lg:col-span-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4 flex flex-col justify-between">
          <div>
            <h3 class="text-base font-bold font-display text-[var(--text-primary)]">Sales by Category</h3>
            <p class="text-xs text-[var(--text-secondary)]">Percentage distribution</p>
          </div>
          <div class="h-64 w-full flex items-center justify-center">
            <canvas id="categoryChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold font-display text-[var(--text-primary)]">Recent Store Transactions</h3>
          <span class="text-xs text-[var(--text-muted)]">// BACKEND: Sync with Stripe Webhooks API</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th class="py-3 px-4">Order ID</th>
                <th class="py-3 px-4">Customer</th>
                <th class="py-3 px-4">Product</th>
                <th class="py-3 px-4">Amount</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
              ${state.orders.map(ord => `
                <tr class="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td class="py-3 px-4 font-mono font-bold text-indigo-400">${ord.id}</td>
                  <td class="py-3 px-4">
                    <div class="font-semibold">${ord.customerName}</div>
                    <div class="text-[10px] text-[var(--text-muted)]">${ord.customerEmail}</div>
                  </td>
                  <td class="py-3 px-4 text-[var(--text-secondary)] line-clamp-1 max-w-xs">${ord.productTitle}</td>
                  <td class="py-3 px-4 font-bold">$${ord.amount}</td>
                  <td class="py-3 px-4"><span class="badge badge-success">${ord.status}</span></td>
                  <td class="py-3 px-4 text-[var(--text-muted)]">${ord.date}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function initChartJS() {
  const revCanvas = document.getElementById('revenueChart');
  const catCanvas = document.getElementById('categoryChart');
  if (!revCanvas || !catCanvas) return;

  const isDark = state.theme === 'dark';
  const gridColor = isDark ? '#1f2937' : '#e2e8f0';
  const textColor = isDark ? '#9ca3af' : '#475569';

  // Line Chart
  new Chart(revCanvas, {
    type: 'line',
    data: {
      labels: state.analytics.monthlyData.labels,
      datasets: [
        {
          label: 'Revenue ($)',
          data: state.analytics.monthlyData.revenue,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Traffic (Visits)',
          data: state.analytics.monthlyData.traffic,
          borderColor: '#8b5cf6',
          borderDash: [5, 5],
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor, font: { family: 'Plus Jakarta Sans' } } }
      },
      scales: {
        x: { grid: { color: gridColor }, ticks: { color: textColor } },
        y: { grid: { color: gridColor }, ticks: { color: textColor } }
      }
    }
  });

  // Doughnut Chart
  new Chart(catCanvas, {
    type: 'doughnut',
    data: {
      labels: state.analytics.categoryBreakdown.labels,
      datasets: [{
        data: state.analytics.categoryBreakdown.data,
        backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: textColor, font: { size: 10 } } }
      }
    }
  });
}

/* ==========================================================================
   PRODUCTS CATALOG MANAGEMENT TAB
   ========================================================================== */

function renderProductsCatalogTab() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-lg font-bold font-display text-[var(--text-primary)]">Manage Catalog</h3>
          <p class="text-xs text-[var(--text-secondary)]">Edit, feature or manage active store products</p>
        </div>
        <button onclick="switchDashboardTab('create-product')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2">
          <i data-lucide="plus" class="w-4 h-4"></i> Add New Product
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${state.products.map(p => `
          <div class="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between space-y-4">
            <div class="flex gap-4">
              <img src="${p.coverImage}" class="w-16 h-16 rounded-xl object-cover flex-shrink-0">
              <div class="space-y-1">
                <span class="badge badge-neutral text-[10px]">${p.category}</span>
                <h4 class="text-sm font-bold text-[var(--text-primary)] line-clamp-1">${p.title}</h4>
                <div class="text-xs font-bold text-indigo-400">$${p.price}</div>
              </div>
            </div>

            <div class="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>${p.salesCount} sales</span>
              <button onclick="deleteProduct('${p.id}')" class="text-red-400 hover:underline flex items-center gap-1">
                <i data-lucide="trash" class="w-3.5 h-3.5"></i> Remove
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function deleteProduct(id) {
  state.products = state.products.filter(p => p.id !== id);
  showToast('Product removed from catalog', 'info');
  renderApp();
}

/* ==========================================================================
   PRODUCT CREATOR WORKFLOW TAB & SORTABLEJS
   ========================================================================== */

function renderProductPublisherTab() {
  return `
    <div class="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-8">
      <div>
        <h3 class="text-xl font-bold font-display text-[var(--text-primary)]">Publish Digital Product</h3>
        <p class="text-xs text-[var(--text-secondary)]">Create a new storefront listing with custom pricing, media, and FAQs</p>
      </div>

      <form onsubmit="handleProductPublishSubmit(event)" class="space-y-6">
        <!-- Product Type Selector Cards -->
        <div>
          <label class="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">1. Select Product Type</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label class="cursor-pointer">
              <input type="radio" name="prodType" value="Template" checked class="peer sr-only">
              <div class="p-3 rounded-xl border border-[var(--border-color)] peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 text-center space-y-1">
                <i data-lucide="layout" class="w-5 h-5 mx-auto text-indigo-400"></i>
                <div class="text-xs font-bold text-[var(--text-primary)]">Template</div>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="prodType" value="Course" class="peer sr-only">
              <div class="p-3 rounded-xl border border-[var(--border-color)] peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 text-center space-y-1">
                <i data-lucide="video" class="w-5 h-5 mx-auto text-purple-400"></i>
                <div class="text-xs font-bold text-[var(--text-primary)]">Course</div>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="prodType" value="Ebook" class="peer sr-only">
              <div class="p-3 rounded-xl border border-[var(--border-color)] peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 text-center space-y-1">
                <i data-lucide="book-open" class="w-5 h-5 mx-auto text-emerald-400"></i>
                <div class="text-xs font-bold text-[var(--text-primary)]">Ebook</div>
              </div>
            </label>
            <label class="cursor-pointer">
              <input type="radio" name="prodType" value="Service" class="peer sr-only">
              <div class="p-3 rounded-xl border border-[var(--border-color)] peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 text-center space-y-1">
                <i data-lucide="calendar" class="w-5 h-5 mx-auto text-amber-400"></i>
                <div class="text-xs font-bold text-[var(--text-primary)]">Service</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Basic Information -->
        <div class="space-y-4">
          <label class="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">2. Product Details</label>

          <div>
            <div class="flex justify-between items-center mb-1">
              <label class="text-xs text-[var(--text-secondary)]">Product Title</label>
              <button type="button" onclick="quickGenerateAITitle()" class="text-[11px] text-purple-400 hover:underline flex items-center gap-1">
                <i data-lucide="wand-2" class="w-3 h-3"></i> AI Suggest
              </button>
            </div>
            <input type="text" id="new-prod-title" required placeholder="e.g. Apex Design System 3.0" class="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500">
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs text-[var(--text-secondary)] mb-1">Category</label>
              <select id="new-prod-category" class="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]">
                <option value="Design System">Design System</option>
                <option value="Boilerplate">Boilerplate</option>
                <option value="Course">Course</option>
                <option value="Coaching">Coaching</option>
                <option value="Ebook">Ebook</option>
                <option value="Notion">Notion Template</option>
              </select>
            </div>

            <div>
              <label class="block text-xs text-[var(--text-secondary)] mb-1">Price ($ USD)</label>
              <input type="number" id="new-prod-price" required placeholder="99" class="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500">
            </div>
          </div>

          <div>
            <label class="block text-xs text-[var(--text-secondary)] mb-1">Short Tagline Description</label>
            <input type="text" id="new-prod-short" required placeholder="Concise value proposition for product cards..." class="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]">
          </div>

          <div>
            <label class="block text-xs text-[var(--text-secondary)] mb-1">Full Description</label>
            <textarea id="new-prod-full" rows="4" placeholder="Detailed product overview..." class="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]"></textarea>
          </div>
        </div>

        <!-- Drag & Drop Media Upload Area -->
        <div class="space-y-2">
          <label class="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">3. Product Media & Gallery</label>
          <div class="drag-drop-zone p-8 rounded-2xl text-center space-y-2 bg-[var(--bg-subtle)] cursor-pointer" id="media-drop-zone">
            <i data-lucide="upload-cloud" class="w-8 h-8 text-indigo-400 mx-auto"></i>
            <div class="text-xs font-bold text-[var(--text-primary)]">Drag and drop cover image or click to select</div>
            <p class="text-[10px] text-[var(--text-muted)]">PNG, JPG, WEBP up to 10MB • // BACKEND: Uploads to AWS S3 / R2</p>
          </div>
          <input type="text" id="new-prod-cover" placeholder="Or enter image URL..." value="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" class="w-full px-3 py-2 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
        </div>

        <!-- Sortable FAQ Builder -->
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <label class="block text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">4. FAQs (Drag to Reorder)</label>
            <button type="button" onclick="addFAQRow()" class="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add FAQ
            </button>
          </div>

          <div id="sortable-faq-container" class="space-y-2">
            <div class="faq-item-row p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center gap-3">
              <i data-lucide="grip-vertical" class="w-4 h-4 text-[var(--text-muted)] cursor-grab"></i>
              <input type="text" placeholder="Question" value="How do I get access?" class="flex-1 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
              <input type="text" placeholder="Answer" value="Instant download after payment." class="flex-1 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
            </div>
          </div>
        </div>

        <!-- Publish Trigger -->
        <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all">
          <i data-lucide="rocket" class="w-4 h-4"></i> Publish Product Live
        </button>
      </form>
    </div>
  `;
}

function initSortableJS() {
  const container = document.getElementById('sortable-faq-container');
  if (container) {
    new Sortable(container, {
      animation: 150,
      handle: '.cursor-grab'
    });
  }
}

function addFAQRow() {
  const container = document.getElementById('sortable-faq-container');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'faq-item-row p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] flex items-center gap-3';
  div.innerHTML = `
    <i data-lucide="grip-vertical" class="w-4 h-4 text-[var(--text-muted)] cursor-grab"></i>
    <input type="text" placeholder="Question" class="flex-1 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
    <input type="text" placeholder="Answer" class="flex-1 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]">
  `;
  container.appendChild(div);
  lucide.createIcons();
}

async function quickGenerateAITitle() {
  const titleInput = document.getElementById('new-prod-title');
  if (titleInput) {
    const generated = await generateAIContent('title');
    titleInput.value = generated;
    showToast('AI title generated!', 'success');
  }
}

async function handleProductPublishSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('new-prod-title')?.value;
  const category = document.getElementById('new-prod-category')?.value;
  const price = document.getElementById('new-prod-price')?.value;
  const shortDescription = document.getElementById('new-prod-short')?.value;
  const fullDescription = document.getElementById('new-prod-full')?.value;
  const coverImage = document.getElementById('new-prod-cover')?.value;

  await createProduct({ title, category, price, shortDescription, fullDescription, coverImage });
  switchDashboardTab('products');
}

/* ==========================================================================
   CUSTOMER MANAGEMENT TAB & EMAIL MODAL
   ========================================================================== */

function renderCustomersTab() {
  return `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 class="text-lg font-bold font-display text-[var(--text-primary)]">Customer Database</h3>
          <p class="text-xs text-[var(--text-secondary)]">Track customer lifetime value, segments, and send direct emails</p>
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="border-b border-[var(--border-color)] text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th class="py-3 px-4">Customer</th>
                <th class="py-3 px-4">Segment</th>
                <th class="py-3 px-4">Total Spend</th>
                <th class="py-3 px-4">Orders</th>
                <th class="py-3 px-4">Products Owned</th>
                <th class="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)] text-[var(--text-primary)]">
              ${state.customers.map(c => `
                <tr class="hover:bg-[var(--bg-subtle)] transition-colors">
                  <td class="py-3 px-4">
                    <div class="flex items-center gap-3">
                      <img src="${c.avatar}" class="w-8 h-8 rounded-full object-cover">
                      <div>
                        <div class="font-bold">${c.name}</div>
                        <div class="text-[10px] text-[var(--text-muted)]">${c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td class="py-3 px-4">
                    <span class="badge ${c.segment === 'VIP Customer' ? 'badge-primary' : 'badge-neutral'}">${c.segment}</span>
                  </td>
                  <td class="py-3 px-4 font-bold text-emerald-400">$${c.totalSpend}</td>
                  <td class="py-3 px-4 font-semibold">${c.ordersCount}</td>
                  <td class="py-3 px-4 text-[var(--text-secondary)]">${c.productsOwned.join(', ')}</td>
                  <td class="py-3 px-4">
                    <button onclick="openEmailModal('${c.email}')" class="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-indigo-600 hover:text-white border border-[var(--border-color)] text-[11px] font-semibold flex items-center gap-1 transition-colors">
                      <i data-lucide="mail" class="w-3.5 h-3.5"></i> Email
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function openEmailModal(email) {
  const recipientInput = document.getElementById('email-modal-recipient');
  if (recipientInput) recipientInput.value = email;
  document.getElementById('email-modal-backdrop')?.classList.remove('hidden');
}

function closeEmailModal() {
  document.getElementById('email-modal-backdrop')?.classList.add('hidden');
}

async function handleSendEmailSubmit(e) {
  e.preventDefault();
  const recipient = document.getElementById('email-modal-recipient')?.value;
  closeEmailModal();
  showToast(`Email sent to ${recipient}!`, 'success');
}

/* ==========================================================================
   AI COPILOT WORKSPACE TAB & MODAL
   ========================================================================== */

function renderAICopilotTab() {
  return `
    <div class="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
          <i data-lucide="sparkles" class="w-5 h-5"></i>
        </div>
        <div>
          <h3 class="text-xl font-bold font-display text-[var(--text-primary)]">AI Generative Copywriter</h3>
          <p class="text-xs text-[var(--text-secondary)]">Generate high-converting headlines, descriptions, emails and social posts</p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Prompt Topic</label>
          <textarea id="ai-tab-input" rows="3" class="w-full p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-indigo-500" placeholder="e.g. Next.js SaaS starter kit with Stripe and Tailwind CSS..."></textarea>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button onclick="runTabAIGeneration('title')" class="py-2 px-3 rounded-xl border border-[var(--border-color)] hover:border-indigo-500 text-xs font-medium text-[var(--text-primary)] flex items-center justify-center gap-1.5">
            <i data-lucide="heading" class="w-4 h-4"></i> Title
          </button>
          <button onclick="runTabAIGeneration('description')" class="py-2 px-3 rounded-xl border border-[var(--border-color)] hover:border-indigo-500 text-xs font-medium text-[var(--text-primary)] flex items-center justify-center gap-1.5">
            <i data-lucide="align-left" class="w-4 h-4"></i> Description
          </button>
          <button onclick="runTabAIGeneration('headline')" class="py-2 px-3 rounded-xl border border-[var(--border-color)] hover:border-indigo-500 text-xs font-medium text-[var(--text-primary)] flex items-center justify-center gap-1.5">
            <i data-lucide="zap" class="w-4 h-4"></i> Headline
          </button>
        </div>

        <div id="ai-tab-output" class="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-color)] font-mono text-xs text-[var(--text-primary)] min-h-[100px] whitespace-pre-wrap">
          AI generated output will appear here...
        </div>
      </div>
    </div>
  `;
}

async function runTabAIGeneration(mode) {
  const input = document.getElementById('ai-tab-input')?.value;
  const outputBox = document.getElementById('ai-tab-output');
  if (!outputBox) return;

  outputBox.innerText = "Generating with AI model...";
  const result = await generateAIContent(mode, input);
  outputBox.innerText = result;
}

// Global AI Modal Functions
let currentAIMode = 'title';

function toggleAIAssistantModal() {
  document.getElementById('ai-modal-backdrop')?.classList.toggle('hidden');
}

function selectAIMode(btnElement, mode) {
  currentAIMode = mode;
  document.querySelectorAll('.ai-mode-btn').forEach(btn => {
    btn.classList.remove('active', 'border-indigo-500', 'bg-indigo-500/10', 'text-indigo-400');
    btn.classList.add('border-[var(--border-color)]', 'text-[var(--text-secondary)]');
  });
  if (btnElement) {
    btnElement.classList.add('active', 'border-indigo-500', 'bg-indigo-500/10', 'text-indigo-400');
    btnElement.classList.remove('border-[var(--border-color)]', 'text-[var(--text-secondary)]');
  }
}

async function runAIGeneration() {
  const promptInput = document.getElementById('ai-prompt-input')?.value;
  const outputBox = document.getElementById('ai-output-box');
  const container = document.getElementById('ai-result-container');

  if (container) container.classList.remove('hidden');
  if (outputBox) outputBox.innerText = 'Consulting Generative AI Engine...';

  const res = await generateAIContent(currentAIMode, promptInput);
  if (outputBox) outputBox.innerText = res;
}

function copyAIResult() {
  const text = document.getElementById('ai-output-box')?.innerText;
  if (text) {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  }
}
