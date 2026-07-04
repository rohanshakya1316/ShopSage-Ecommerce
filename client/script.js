const HOME_PAGE = "home.html";
const LOGIN_PAGE = "index.html";

const PRODUCT_CATALOG = [
  {
    id: "tshirt",
    name: "Stylish T-Shirt",
    category: "Fashion",
    price: 29,
    oldPrice: 39,
    badge: "Best Seller",
    rating: "4.8",
    stock: 42,
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    description:
      "Soft cotton tee with a clean everyday fit and durable stitching.",
  },
  {
    id: "shoes",
    name: "Running Shoes",
    category: "Shoes",
    price: 59,
    oldPrice: 79,
    badge: "Deal",
    rating: "4.7",
    stock: 24,
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    description:
      "Lightweight trainers with breathable mesh and cushioned soles.",
  },
  {
    id: "phone",
    name: "Smartphone",
    category: "Electronics",
    price: 399,
    oldPrice: 459,
    badge: "Popular",
    rating: "4.9",
    stock: 18,
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    description:
      "Fast daily driver with a crisp display, strong battery, and 128GB storage.",
  },
  {
    id: "watch",
    name: "Smart Watch",
    category: "Accessories",
    price: 89,
    oldPrice: 109,
    badge: "New",
    rating: "4.6",
    stock: 30,
    featured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    description:
      "Fitness tracking, notifications, and a polished everyday strap.",
  },
  {
    id: "backpack",
    name: "Travel Backpack",
    category: "Accessories",
    price: 49,
    oldPrice: 65,
    badge: "Deal",
    rating: "4.5",
    stock: 55,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    description:
      "Roomy carry bag with laptop storage and water-resistant fabric.",
  },
  {
    id: "headphones",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129,
    oldPrice: 169,
    badge: "Deal",
    rating: "4.8",
    stock: 21,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description: "Noise-isolating audio with a comfortable over-ear build.",
  },
  {
    id: "jacket",
    name: "Urban Jacket",
    category: "Fashion",
    price: 94,
    oldPrice: 119,
    badge: "Limited",
    rating: "4.7",
    stock: 13,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=900&q=80",
    description:
      "Layer-ready outerwear with a structured silhouette and soft lining.",
  },
  {
    id: "sneaker-cleaner",
    name: "Sneaker Care Kit",
    category: "Shoes",
    price: 19,
    oldPrice: 29,
    badge: "Saver",
    rating: "4.4",
    stock: 80,
    featured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=900&q=80",
    description:
      "Brush, cloth, and cleaner set for keeping shoes fresh longer.",
  },
];

const DEMO_ORDERS = [
  {
    id: "SS-109284",
    date: "Jun 10, 2026",
    items: [
      { id: "shoes", name: "Running Shoes", quantity: 2, price: 59 },
      { id: "watch", name: "Smart Watch", quantity: 1, price: 89 },
    ],
    total: 234.91,
    status: "Processing",
  },
  {
    id: "SS-109131",
    date: "Jun 9, 2026",
    items: [{ id: "phone", name: "Smartphone", quantity: 1, price: 399 }],
    total: 450.87,
    status: "Packed",
  },
];

const API_BASE = "/api";
const SUPER_ADMIN_ROLES = ["ADMIN"];
const BUSINESS_ROLES = ["VENDOR", "ADMIN"];

function normalizeRole(role) {
  if (Array.isArray(role)) {
    return role;
  }

  if (!role) {
    return ["CUSTOMER"];
  }

  return [role];
}

function getAccessToken() {
  return localStorage.getItem("accessToken") || "";
}

function saveSession(authData) {
  const user = {
    ...authData.user,
    role: normalizeRole(authData.user?.role),
  };

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("accessToken", authData.accessToken || "");
  localStorage.setItem("refreshToken", authData.refreshToken || "");
  writeJson("user", user);
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const token = getAccessToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : "Request failed";
    throw new Error(message);
  }

  return data;
}

function hasRole(role) {
  return normalizeRole(getStoredUser()?.role).includes(role);
}

function isSuperAdmin() {
  return SUPER_ADMIN_ROLES.some((role) => hasRole(role));
}

function isBusinessAccount() {
  return BUSINESS_ROLES.some((role) => hasRole(role));
}

function getBusinessRequests() {
  return readJson("businessRequests", []);
}

function saveBusinessRequests(requests) {
  writeJson("businessRequests", requests);
}

function getLocalUsers() {
  return readJson("localUsers", []);
}

function saveLocalUser(user) {
  const users = getLocalUsers().filter(
    (item) => item.email.toLowerCase() !== user.email.toLowerCase(),
  );
  users.unshift({
    ...user,
    role: normalizeRole(user.role),
  });
  writeJson("localUsers", users);
}

function findLocalUser(email, password) {
  const users = getLocalUsers();
  const storedUser = getStoredUser();
  const allUsers = storedUser ? [storedUser, ...users] : users;

  return allUsers.find(
    (user) =>
      user.email?.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  );
}

function currentPageName() {
  return window.location.pathname.split("/").pop() || HOME_PAGE;
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getBusinessProducts() {
  return readJson("businessProducts", []);
}

function getAllProducts() {
  return [...PRODUCT_CATALOG, ...getBusinessProducts()];
}

function isLoggedIn() {
  return (
    localStorage.getItem("loggedIn") === "true" || Boolean(getAccessToken())
  );
}

function getStoredUser() {
  return readJson("user", null);
}

function getRedirectTarget() {
  const redirect = new URLSearchParams(window.location.search).get("redirect");
  const allowedPages = [
    HOME_PAGE,
    "products.html",
    "categories.html",
    "deals.html",
    "cart.html",
    "checkout.html",
    "orders.html",
    "product.html",
    "admin.html",
    "business-dashboard.html",
  ];

  if (allowedPages.some((page) => redirect && redirect.startsWith(page))) {
    return redirect;
  }

  return HOME_PAGE;
}

function loginUrl(target = currentPageName()) {
  return `${LOGIN_PAGE}?redirect=${encodeURIComponent(target)}`;
}

function requireLogin(message, redirectTarget = currentPageName()) {
  if (isLoggedIn()) {
    return true;
  }

  alert(message);
  window.location.href = loginUrl(redirectTarget);
  return false;
}

function formatMoney(amount) {
  return `$${Number(amount || 0).toFixed(2)}`;
}

function getCart() {
  return readJson("cart", []);
}

function saveCart(cart) {
  writeJson("cart", cart);
  renderCartCount();
  renderCartPage();
  renderCheckoutPage();
}

function getOrders() {
  return readJson("orders", []);
}

function saveOrders(orders) {
  writeJson("orders", orders);
}

function findProduct(productId) {
  return getAllProducts().find((product) => product.id === productId);
}

function updateAuthControls() {
  const user = getStoredUser();
  const roleLabel = normalizeRole(user?.role).join(", ");
  const label =
    isLoggedIn() && user
      ? `Hi, ${user.name}${roleLabel ? ` (${roleLabel})` : ""}`
      : "";
  const target = currentPageName() + window.location.search;

  document.querySelectorAll("[data-user-name], #userName").forEach((el) => {
    el.textContent = label;
  });

  document.querySelectorAll("[data-login-link], #loginLink").forEach((el) => {
    el.setAttribute("href", loginUrl(target));
    el.hidden = isLoggedIn();
  });

  document
    .querySelectorAll("[data-logout-button], #logoutButton")
    .forEach((el) => {
      el.hidden = !isLoggedIn();
    });
}

function setActiveNav() {
  const page = currentPageName();

  document.querySelectorAll("[data-nav]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === page);
  });
}

function renderCartCount() {
  const totalItems = getCart().reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll("[data-cart-count], #cartCount").forEach((el) => {
    el.textContent = totalItems;
  });
}

function buildProductCard(product) {
  const oldPrice = product.oldPrice
    ? `<span class="old-price">${formatMoney(product.oldPrice)}</span>`
    : "";
  const detailUrl = `product.html?id=${encodeURIComponent(product.id)}`;

  return `
    <article data-product-card data-id="${product.id}" data-name="${product.name}" data-category="${product.category}" class="product-card">
      <a href="${detailUrl}" aria-label="View details for ${product.name}">
        <img src="${product.imageUrl}" alt="${product.name}">
      </a>
      <div class="product-card-body">
        <div class="product-meta">
          <span class="badge">${product.badge || "New"}</span>
          <span class="category-label">${product.rating || "4.5"} rating</span>
        </div>
        <p class="category-label">${product.category}</p>
        <h3><a href="${detailUrl}">${product.name}</a></h3>
        <p class="product-description">${product.description}</p>
        <div class="price-row">
          <div>
            <p class="price">${formatMoney(product.price)}</p>
            ${oldPrice}
          </div>
          <div class="action-row">
            <a href="${detailUrl}" class="secondary-btn">View</a>
            <button type="button" onclick="addToCart(this)" class="primary-btn">Add</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function productsForGrid(grid) {
  const mode = grid.dataset.productGrid || "all";
  const category = grid.dataset.category;
  const currentProductId = new URLSearchParams(window.location.search).get(
    "id",
  );
  const products = getAllProducts();

  if (mode === "featured") {
    return products.filter((product) => product.featured).slice(0, 4);
  }

  if (mode === "deals") {
    return products.filter((product) => product.oldPrice);
  }

  if (mode === "category" && category) {
    return products.filter((product) => product.category === category);
  }

  if (mode === "related") {
    return products
      .filter((product) => product.id !== currentProductId)
      .slice(0, 4);
  }

  return products;
}

function renderProductGrids() {
  document.querySelectorAll("[data-product-grid]").forEach((grid) => {
    grid.innerHTML = productsForGrid(grid).map(buildProductCard).join("");
  });
}

function setActiveCategory(category) {
  document.querySelectorAll("[data-category-filter]").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.categoryFilter === category,
    );
  });
}

function applyProductFilters() {
  const params = new URLSearchParams(window.location.search);
  const queryFromUrl = params.get("search") || "";
  const categoryFromUrl = params.get("category") || "all";
  const searchInput = document.querySelector("[data-search-input]");
  const query = (searchInput?.value || queryFromUrl).trim().toLowerCase();
  const activeCategory =
    document.body.dataset.activeCategory || categoryFromUrl;
  const cards = [...document.querySelectorAll("[data-product-card]")];
  let visibleCount = 0;

  if (searchInput && !searchInput.value && queryFromUrl) {
    searchInput.value = queryFromUrl;
  }

  document.body.dataset.activeCategory = activeCategory;
  setActiveCategory(activeCategory);

  cards.forEach((card) => {
    const searchableText =
      `${card.dataset.name} ${card.dataset.category} ${card.textContent}`.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const matchesCategory =
      activeCategory === "all" || card.dataset.category === activeCategory;

    card.hidden = !(matchesSearch && matchesCategory);
    if (!card.hidden) {
      visibleCount += 1;
    }
  });

  document.querySelectorAll("[data-results-count]").forEach((el) => {
    el.textContent = `Showing ${visibleCount} product${visibleCount === 1 ? "" : "s"}`;
  });

  document.querySelectorAll("[data-empty-state]").forEach((el) => {
    el.hidden = visibleCount !== 0;
  });
}

function setupSearch() {
  document.querySelectorAll("[data-search-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("[data-search-input]");
      const query = input?.value.trim() || "";

      if (currentPageName() === "products.html") {
        const params = new URLSearchParams(window.location.search);
        query ? params.set("search", query) : params.delete("search");
        window.history.replaceState(
          {},
          "",
          `products.html?${params.toString()}`,
        );
        applyProductFilters();
        return;
      }

      window.location.href = `products.html${
        query ? `?search=${encodeURIComponent(query)}` : ""
      }`;
    });
  });

  document.querySelectorAll("[data-search-input]").forEach((input) => {
    input.addEventListener("input", applyProductFilters);
  });

  document.querySelectorAll("[data-category-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.categoryFilter || "all";
      const params = new URLSearchParams(window.location.search);

      document.body.dataset.activeCategory = category;
      category === "all"
        ? params.delete("category")
        : params.set("category", category);
      window.history.replaceState(
        {},
        "",
        `products.html${params.toString() ? `?${params.toString()}` : ""}`,
      );
      applyProductFilters();
    });
  });
}

function addProductToCart(product) {
  const cart = getCart();
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  }

  saveCart(cart);
}

function addToCart(button) {
  if (
    !requireLogin("Please log in to add items to your cart.", currentPageName())
  ) {
    return;
  }

  const productCard = button.closest("[data-product-card]");
  const product = findProduct(productCard?.dataset.id);

  if (!product) {
    return;
  }

  addProductToCart(product);
  alert(`${product.name} added to cart.`);
}

function buyNow(productId) {
  if (
    !requireLogin(
      "Please log in to buy this item.",
      `product.html?id=${productId}`,
    )
  ) {
    return;
  }

  const product = findProduct(productId);

  if (!product) {
    return;
  }

  addProductToCart(product);
  window.location.href = "checkout.html";
}

function removeFromCart(productId) {
  saveCart(getCart().filter((item) => item.id !== productId));
}

function updateCartQuantity(productId, change) {
  const cart = getCart();
  const item = cart.find((product) => product.id === productId);

  if (!item) {
    return;
  }

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
}

function cartTotals() {
  const subtotal = getCart().reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.13 * 100) / 100;
  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}

function renderCartPage() {
  const cartList = document.getElementById("cartList");

  if (!cartList) {
    return;
  }

  const cart = getCart();
  const totals = cartTotals();

  if (!cart.length) {
    cartList.innerHTML =
      '<div class="panel">Your cart is empty. Start with the featured products.</div>';
  } else {
    cartList.innerHTML = cart
      .map(
        (item) => `
        <article class="cart-item panel">
          <img src="${item.imageUrl}" alt="${item.name}">
          <div>
            <h3>${item.name}</h3>
            <p>Ready to ship from the ShopSage warehouse.</p>
            <div class="qty-control">
              <button type="button" data-action="dec" data-id="${item.id}">-</button>
              <span>${item.quantity}</span>
              <button type="button" data-action="inc" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="price-row">
            <strong class="price">${formatMoney(item.price * item.quantity)}</strong>
            <button type="button" class="danger-btn" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </article>
      `,
      )
      .join("");
  }

  document.querySelectorAll("[data-subtotal], #subtotal").forEach((el) => {
    el.textContent = formatMoney(totals.subtotal);
  });
  document.querySelectorAll("[data-tax], #tax").forEach((el) => {
    el.textContent = formatMoney(totals.tax);
  });
  document.querySelectorAll("[data-total], #total").forEach((el) => {
    el.textContent = formatMoney(totals.total);
  });
}

function renderProductDetail() {
  const detail = document.querySelector("[data-product-detail]");

  if (!detail) {
    return;
  }

  const productId = new URLSearchParams(window.location.search).get("id");
  const product = findProduct(productId) || getAllProducts()[0];
  const oldPrice = product.oldPrice
    ? `<span class="text-lg font-semibold text-[#94A3B8] line-through">${formatMoney(product.oldPrice)}</span>`
    : "";
  const savings = product.oldPrice
    ? Math.max(Number(product.oldPrice) - Number(product.price), 0)
    : 0;
  const relatedCategoryUrl = `products.html?category=${encodeURIComponent(product.category)}`;

  detail.innerHTML = `
    <div class="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
      <section class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
        <div class="relative bg-[#F8FAFC]">
          <img class="h-full min-h-[360px] w-full object-cover lg:min-h-[560px]" src="${product.imageUrl}" alt="${product.name}">
          <div class="absolute left-5 top-5 flex flex-wrap gap-2">
            <span class="rounded-full bg-[#FBBF24] px-3 py-1 text-xs font-extrabold uppercase text-[#0F172A]">${product.badge || "Featured"}</span>
            <span class="rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold uppercase text-[#4F46E5]">${product.rating || "4.5"} rating</span>
          </div>
        </div>
      </section>
      <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
        <nav class="mb-6 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#94A3B8]" aria-label="Breadcrumb">
          <a class="text-[#4F46E5] hover:text-[#4338CA]" href="products.html">Products</a>
          <span>/</span>
          <a class="text-[#4F46E5] hover:text-[#4338CA]" href="${relatedCategoryUrl}">${product.category}</a>
          <span>/</span>
          <span class="text-[#475569]">${product.name}</span>
        </nav>

        <p class="mb-3 text-xs font-extrabold uppercase text-[#4F46E5]">${product.category}</p>
        <h1 class="text-4xl font-extrabold leading-tight text-[#0F172A] md:text-5xl">${product.name}</h1>
        <p class="mt-5 text-lg leading-8 text-[#475569]">${product.description}</p>

        <div class="mt-7 flex flex-wrap items-end gap-3">
          <strong class="text-4xl font-extrabold text-[#EF4444]">${formatMoney(product.price)}</strong>
          ${oldPrice}
          ${
            savings
              ? `<span class="mb-2 rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-[#EF4444]">Save ${formatMoney(savings)}</span>`
              : ""
          }
        </div>

        <div class="mt-8 grid gap-3 sm:grid-cols-3">
          <div class="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
            <p class="text-xs font-bold uppercase text-[#94A3B8]">Stock</p>
            <p class="mt-1 text-lg font-extrabold text-[#22C55E]">${product.stock || 0} available</p>
          </div>
          <div class="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
            <p class="text-xs font-bold uppercase text-[#94A3B8]">Shipping</p>
            <p class="mt-1 text-lg font-extrabold text-[#0F172A]">Fast dispatch</p>
          </div>
          <div class="rounded-lg border border-slate-200 bg-[#F8FAFC] p-4">
            <p class="text-xs font-bold uppercase text-[#94A3B8]">Returns</p>
            <p class="mt-1 text-lg font-extrabold text-[#0F172A]">7 day easy</p>
          </div>
        </div>

        <div data-product-card data-id="${product.id}" data-name="${product.name}" data-category="${product.category}" class="mt-8 flex flex-wrap gap-3">
          <button type="button" onclick="buyNow('${product.id}')" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#4F46E5] px-6 py-3 font-extrabold text-white hover:bg-[#4338CA]">Buy Now</button>
          <button type="button" onclick="addToCart(this)" class="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#0F172A] px-6 py-3 font-extrabold text-white hover:bg-[#1E293B]">Add to Cart</button>
          <a href="cart.html" class="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 font-extrabold text-[#0F172A] hover:border-[#4F46E5] hover:text-[#4F46E5]">View Cart</a>
        </div>

        <div class="mt-8 rounded-lg bg-[#0F172A] p-5 text-white">
          <p class="text-sm font-bold uppercase text-[#FBBF24]">ShopSage Promise</p>
          <p class="mt-2 text-sm leading-6 text-slate-300">Secure checkout, verified stock, and customer support from browsing to delivery.</p>
        </div>
      </section>
    </div>
  `;
}

function renderCheckoutPage() {
  const checkoutContent = document.querySelector("[data-checkout-content]");
  const checkoutLocked = document.querySelector("[data-checkout-locked]");
  const checkoutItems = document.querySelector("[data-checkout-items]");

  if (!checkoutContent || !checkoutItems) {
    return;
  }

  if (!isLoggedIn()) {
    checkoutContent.hidden = true;
    if (checkoutLocked) checkoutLocked.hidden = false;
    return;
  }

  checkoutContent.hidden = false;
  if (checkoutLocked) checkoutLocked.hidden = true;

  const cart = getCart();
  const totals = cartTotals();

  checkoutItems.innerHTML = cart.length
    ? cart
        .map(
          (item) => `
          <div class="price-row">
            <div>
              <strong>${item.name}</strong>
              <p>Qty ${item.quantity}</p>
            </div>
            <strong>${formatMoney(item.price * item.quantity)}</strong>
          </div>
        `,
        )
        .join("")
    : "<p>Your cart is empty.</p>";

  document.querySelectorAll("[data-checkout-subtotal]").forEach((el) => {
    el.textContent = formatMoney(totals.subtotal);
  });
  document.querySelectorAll("[data-checkout-tax]").forEach((el) => {
    el.textContent = formatMoney(totals.tax);
  });
  document.querySelectorAll("[data-checkout-total]").forEach((el) => {
    el.textContent = formatMoney(totals.total);
  });
}

function renderOrdersPage() {
  const ordersList = document.querySelector("[data-orders-list]");
  const locked = document.querySelector("[data-orders-locked]");
  const empty = document.querySelector("[data-orders-empty]");

  if (!ordersList) {
    return;
  }

  if (!isLoggedIn()) {
    ordersList.hidden = true;
    if (empty) empty.hidden = true;
    if (locked) locked.hidden = false;
    return;
  }

  if (locked) locked.hidden = true;
  const orders = getOrders();

  if (!orders.length) {
    ordersList.hidden = true;
    if (empty) empty.hidden = false;
    return;
  }

  if (empty) empty.hidden = true;
  ordersList.hidden = false;
  ordersList.innerHTML = orders.map(buildOrderCard).join("");
}

function buildOrderCard(order) {
  return `
    <article class="order-card">
      <div class="price-row">
        <div>
          <p class="category-label">Order ${order.id}</p>
          <h3>${order.status}</h3>
        </div>
        <strong class="price">${formatMoney(order.total)}</strong>
      </div>
      <p>${order.items.length} item${order.items.length === 1 ? "" : "s"} placed on ${order.date}</p>
    </article>
  `;
}

function renderBusinessDashboard() {
  const stats = document.querySelector("[data-business-stats]");
  const ordersTable = document.querySelector("[data-business-orders]");
  const locked = document.querySelector("[data-business-locked]");
  const requestPanel = document.querySelector("[data-business-request-panel]");
  const dashboardContent = document.querySelector(
    "[data-business-dashboard-content]",
  );

  if (!stats && !ordersTable && !locked) {
    return;
  }

  const canViewDashboard = isLoggedIn() && isBusinessAccount();

  if (locked) {
    locked.hidden = canViewDashboard;
  }

  if (requestPanel) {
    requestPanel.hidden = canViewDashboard;
  }

  if (dashboardContent) {
    dashboardContent.hidden = !canViewDashboard;
  }

  if (!canViewDashboard) {
    return;
  }

  const products = getAllProducts();
  const orders = getOrders().length ? getOrders() : DEMO_ORDERS;
  const revenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
  const lowStock = products.filter(
    (product) => Number(product.stock || 0) < 20,
  ).length;

  if (stats) {
    stats.innerHTML = `
      <article class="stat-card"><h3>Revenue</h3><strong>${formatMoney(revenue)}</strong><p>From active orders</p></article>
      <article class="stat-card"><h3>Orders</h3><strong>${orders.length}</strong><p>Customer purchases</p></article>
      <article class="stat-card"><h3>Products</h3><strong>${products.length}</strong><p>Live catalog items</p></article>
      <article class="stat-card"><h3>Low Stock</h3><strong>${lowStock}</strong><p>Needs restock soon</p></article>
    `;
  }

  if (ordersTable) {
    ordersTable.innerHTML = orders
      .map(
        (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.items.map((item) => item.name).join(", ")}</td>
          <td>${order.status}</td>
          <td>${formatMoney(order.total)}</td>
        </tr>
      `,
      )
      .join("");
  }
}

function renderBusinessRequests() {
  const requestTable = document.querySelector("[data-business-requests]");
  const backendStatus = document.querySelector("[data-admin-backend-status]");

  if (!requestTable) {
    return;
  }

  if (backendStatus) {
    backendStatus.textContent = isSuperAdmin()
      ? "Super admin mode is active. Accepting a request will try to create an approved VENDOR account through /api/user."
      : "Login as an ADMIN user to sync approvals with the backend. Local approvals still work for frontend demo mode.";
  }

  const requests = getBusinessRequests();

  if (!requests.length) {
    requestTable.innerHTML =
      '<tr><td colspan="5">No business account requests yet.</td></tr>';
    return;
  }

  requestTable.innerHTML = requests
    .map((request) => {
      const reviewedLabel = request.tempPassword
        ? `Temp password: ${request.tempPassword}${
            request.backendSynced ? " · backend synced" : " · local demo"
          }`
        : "Reviewed";

      return `
      <tr>
        <td>${request.businessName}</td>
        <td>${request.ownerName}</td>
        <td>${request.email}</td>
        <td><span class="role-chip status-${request.status}">${request.status}</span></td>
        <td>
          ${
            request.status === "pending"
              ? `<button class="primary-btn" type="button" data-business-action="approve" data-id="${request.id}">Accept</button>
                 <button class="danger-btn" type="button" data-business-action="reject" data-id="${request.id}">Reject</button>`
              : reviewedLabel
          }
        </td>
      </tr>
    `;
    })
    .join("");
}

function setupBusinessRequestForm() {
  const form = document.getElementById("businessRequestForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const requests = getBusinessRequests();
    const email = formData.get("email").trim().toLowerCase();
    const existing = requests.find(
      (request) =>
        request.email.toLowerCase() === email && request.status === "pending",
    );
    const message = document.querySelector("[data-business-request-message]");

    if (existing) {
      message.style.color = "#c8102e";
      message.textContent = "This business already has a pending request.";
      return;
    }

    requests.unshift({
      id: `BR-${Date.now()}`,
      ownerName: formData.get("ownerName").trim(),
      email,
      businessName: formData.get("businessName").trim(),
      phone: formData.get("phone").trim(),
      note: formData.get("note").trim(),
      status: "pending",
      createdAt: new Date().toLocaleDateString(),
    });

    saveBusinessRequests(requests);
    form.reset();
    message.style.color = "#16724d";
    message.textContent =
      "Request sent. A super admin can review it from the admin panel.";
    renderBusinessRequests();
  });
}

async function reviewBusinessRequest(requestId, status) {
  const requests = getBusinessRequests();
  const request = requests.find((item) => item.id === requestId);

  if (!request) {
    return;
  }

  request.status = status;

  if (status === "approved") {
    request.tempPassword =
      request.tempPassword || `Business@${String(Date.now()).slice(-4)}`;
    saveLocalUser({
      name: request.ownerName,
      email: request.email,
      password: request.tempPassword,
      phone: request.phone,
      role: ["VENDOR"],
      businessName: request.businessName,
    });

    if (isSuperAdmin()) {
      try {
        await apiRequest("/user", {
          method: "POST",
          body: JSON.stringify({
            name: request.ownerName,
            email: request.email,
            password: request.tempPassword,
            phone: request.phone,
            role: ["VENDOR"],
            status: "active",
          }),
        });
        request.backendSynced = true;
      } catch (error) {
        request.backendError = error.message;
      }
    }
  }

  saveBusinessRequests(requests);
  renderBusinessRequests();
}

function setupBusinessRequestActions() {
  const requestTable = document.querySelector("[data-business-requests]");

  if (!requestTable) {
    return;
  }

  requestTable.addEventListener("click", (event) => {
    const button = event.target.closest("[data-business-action]");

    if (!button) {
      return;
    }

    const status =
      button.dataset.businessAction === "approve" ? "approved" : "rejected";
    reviewBusinessRequest(button.dataset.id, status);
  });
}

function renderAdminPanel() {
  const productTable = document.querySelector("[data-admin-products]");
  const orderTable = document.querySelector("[data-admin-orders]");

  if (productTable) {
    const businessProductIds = new Set(
      getBusinessProducts().map((product) => product.id),
    );

    productTable.innerHTML = getAllProducts()
      .map((product) => {
        const isEditable = businessProductIds.has(product.id);
        const actions = isEditable
          ? `
            <button type="button" class="secondary-btn" data-edit-product="${product.id}">Edit</button>
            <button type="button" class="danger-btn" data-delete-product="${product.id}">Delete</button>
          `
          : `<span class="category-label">Demo item</span>`;

        return `
        <tr>
          <td><img class="table-thumb" src="${product.imageUrl}" alt="${product.name}"></td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>${formatMoney(product.price)}</td>
          <td>${product.stock || 0}</td>
          <td><span class="badge">${product.badge || "Live"}</span></td>
          <td class="table-actions">${actions}</td>
        </tr>
      `;
      })
      .join("");
  }

  if (orderTable) {
    const orders = getOrders().length ? getOrders() : DEMO_ORDERS;
    orderTable.innerHTML = orders
      .map(
        (order) => `
        <tr>
          <td>${order.id}</td>
          <td>${order.items.length}</td>
          <td>${order.status}</td>
          <td>${formatMoney(order.total)}</td>
        </tr>
      `,
      )
      .join("");
  }

  renderBusinessRequests();
}

const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });
}

function setAdminMessage(text) {
  const message = document.querySelector("[data-admin-message]");
  if (message) {
    message.textContent = text;
  }
}

function setupAdminForm() {
  const form = document.getElementById("adminProductForm");

  if (!form) {
    return;
  }

  const productTable = document.querySelector("[data-admin-products]");
  const imageFileInput = form.querySelector("#productImageInput");
  const imageUrlInput = form.querySelector("[name='imageUrl']");
  const previewImg = form.querySelector("[data-image-preview-img]");
  const previewPlaceholder = form.querySelector(
    "[data-image-preview-placeholder]",
  );
  const removeImageBtn = form.querySelector("[data-remove-image]");
  const formTitle = document.querySelector("[data-form-title]");
  const submitBtn = form.querySelector("[data-form-submit]");
  const cancelBtn = form.querySelector("[data-form-cancel]");
  const productIdField = form.querySelector("[name='productId']");

  let currentImageData = "";

  function showPreview(src) {
    if (src) {
      previewImg.src = src;
      previewImg.hidden = false;
      previewPlaceholder.hidden = true;
      removeImageBtn.hidden = false;
    } else {
      previewImg.src = "";
      previewImg.hidden = true;
      previewPlaceholder.hidden = false;
      removeImageBtn.hidden = true;
    }
  }

  function resetToAddMode() {
    form.reset();
    productIdField.value = "";
    currentImageData = "";
    showPreview("");
    formTitle.textContent = "Add Product";
    submitBtn.textContent = "Add Product";
    cancelBtn.hidden = true;
  }

  function enterEditMode(product) {
    productIdField.value = product.id;
    form.name.value = product.name;
    form.category.value = product.category;
    form.price.value = product.price;
    form.oldPrice.value = product.oldPrice || "";
    form.stock.value = product.stock || 0;
    form.description.value = product.description || "";
    imageUrlInput.value = "";
    currentImageData = product.imageUrl || "";
    showPreview(currentImageData);
    formTitle.textContent = "Edit Product";
    submitBtn.textContent = "Update Product";
    cancelBtn.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  imageFileInput.addEventListener("change", async () => {
    const file = imageFileInput.files[0];
    if (!file) {
      return;
    }
    try {
      currentImageData = await fileToBase64(file);
      imageUrlInput.value = "";
      showPreview(currentImageData);
    } catch {
      setAdminMessage(
        "Could not read that image file. Please try another one.",
      );
    }
  });

  imageUrlInput.addEventListener("input", () => {
    if (imageUrlInput.value.trim()) {
      imageFileInput.value = "";
      currentImageData = imageUrlInput.value.trim();
      showPreview(currentImageData);
    }
  });

  removeImageBtn.addEventListener("click", () => {
    currentImageData = "";
    imageFileInput.value = "";
    imageUrlInput.value = "";
    showPreview("");
  });

  cancelBtn.addEventListener("click", resetToAddMode);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const editingId = productIdField.value;
    const businessProducts = getBusinessProducts();

    const productData = {
      name: formData.get("name").trim(),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      oldPrice: Number(formData.get("oldPrice")) || null,
      stock: Number(formData.get("stock")) || 0,
      imageUrl: currentImageData || DEFAULT_PRODUCT_IMAGE,
      description:
        formData.get("description").trim() ||
        "Business listed product ready for customer orders.",
    };

    if (editingId) {
      const index = businessProducts.findIndex(
        (product) => product.id === editingId,
      );
      if (index !== -1) {
        businessProducts[index] = {
          ...businessProducts[index],
          ...productData,
        };
      }
      setAdminMessage("Product updated.");
    } else {
      businessProducts.unshift({
        id: `business-${Date.now()}`,
        badge: "Business",
        rating: "4.5",
        featured: false,
        ...productData,
      });
      setAdminMessage("Product added to the business catalog.");
    }

    writeJson("businessProducts", businessProducts);
    resetToAddMode();
    renderProductGrids();
    renderAdminPanel();
    renderBusinessDashboard();
  });

  if (productTable) {
    productTable.addEventListener("click", (event) => {
      const editButton = event.target.closest("[data-edit-product]");
      const deleteButton = event.target.closest("[data-delete-product]");

      if (editButton) {
        const product = getBusinessProducts().find(
          (item) => item.id === editButton.dataset.editProduct,
        );
        if (product) {
          enterEditMode(product);
        }
      }

      if (deleteButton) {
        const productId = deleteButton.dataset.deleteProduct;
        const product = getBusinessProducts().find(
          (item) => item.id === productId,
        );
        const confirmed = window.confirm(
          `Delete "${product ? product.name : "this product"}"? This cannot be undone.`,
        );
        if (!confirmed) {
          return;
        }
        const remaining = getBusinessProducts().filter(
          (item) => item.id !== productId,
        );
        writeJson("businessProducts", remaining);
        if (productIdField.value === productId) {
          resetToAddMode();
        }
        renderProductGrids();
        renderAdminPanel();
        renderBusinessDashboard();
        setAdminMessage("Product deleted.");
      }
    });
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  updateAuthControls();
  renderCheckoutPage();
  renderOrdersPage();
  renderBusinessDashboard();
  renderBusinessRequests();
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  const accountType = document.getElementById("accountType");
  const businessName = document.getElementById("businessName");
  const businessPhone = document.getElementById("businessPhone");

  accountType?.addEventListener("change", () => {
    const isBusiness = accountType.value === "BUSINESS";
    businessName.hidden = !isBusiness;
    businessPhone.hidden = !isBusiness;
    businessName.required = isBusiness;
    businessPhone.required = isBusiness;
  });

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("registerMessage");
    const selectedType = accountType?.value || "CUSTOMER";

    if (password !== confirmPassword) {
      message.style.color = "#c8102e";
      message.textContent = "Passwords do not match";
      return;
    }

    if (selectedType === "BUSINESS") {
      const requests = getBusinessRequests();
      requests.unshift({
        id: `BR-${Date.now()}`,
        ownerName: name,
        email,
        businessName: businessName.value.trim(),
        phone: businessPhone.value.trim(),
        note: "Submitted from registration page",
        status: "pending",
        createdAt: new Date().toLocaleDateString(),
      });
      saveBusinessRequests(requests);
      message.style.color = "#16724d";
      message.textContent =
        "Business request submitted. A super admin must approve it before dashboard access.";
      registerForm.reset();
      accountType.dispatchEvent(new Event("change"));
      return;
    }

    try {
      const response = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          role: ["CUSTOMER"],
          roleId: ["CUSTOMER"],
        }),
      });
      saveSession(response.data);
      message.style.color = "#16724d";
      message.textContent = "Registration successful";
      setTimeout(() => {
        window.location.href = getRedirectTarget();
      }, 700);
    } catch (error) {
      saveLocalUser({ name, email, password, role: ["CUSTOMER"] });
      writeJson("user", { name, email, password, role: ["CUSTOMER"] });
      localStorage.setItem("loggedIn", "true");
      message.style.color = "#936600";
      message.textContent = `Backend unavailable, using local demo account. ${error.message}`;
      setTimeout(() => {
        window.location.href = HOME_PAGE;
      }, 900);
    }
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const storedUser = getStoredUser();
    const message = document.getElementById("loginMessage");

    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      saveSession(response.data);
      message.style.color = "#16724d";
      message.textContent = "Login successful";
      setTimeout(() => {
        window.location.href = getRedirectTarget();
      }, 700);
      return;
    } catch (error) {
      const localUser = findLocalUser(email, password);

      if (localUser) {
        writeJson("user", localUser);
        localStorage.setItem("loggedIn", "true");
        message.style.color = "#936600";
        message.textContent = `Backend unavailable, using local demo login. ${error.message}`;
        setTimeout(() => {
          window.location.href = getRedirectTarget();
        }, 700);
        return;
      }

      message.style.color = "#c8102e";
      message.textContent = error.message || "Invalid email or password";
    }
  });
}

const cartList = document.getElementById("cartList");

if (cartList) {
  cartList.addEventListener("click", (event) => {
    const target = event.target;
    const action = target.getAttribute("data-action");
    const id = target.getAttribute("data-id");

    if (action === "inc") updateCartQuantity(id, 1);
    if (action === "dec") updateCartQuantity(id, -1);
    if (action === "remove") removeFromCart(id);
  });
}

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (!getCart().length) {
      alert("Your cart is empty.");
      return;
    }

    if (!requireLogin("Please log in to proceed to checkout.", "cart.html")) {
      return;
    }

    window.location.href = "checkout.html";
  });
}

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!requireLogin("Please log in to place your order.", "checkout.html")) {
      return;
    }

    const cart = getCart();

    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    const totals = cartTotals();
    const orders = getOrders();
    const order = {
      id: `SS-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      items: cart,
      total: totals.total,
      status: "Processing",
    };

    orders.unshift(order);
    saveOrders(orders);
    localStorage.removeItem("cart");
    alert("Order placed successfully.");
    window.location.href = "orders.html";
  });
}

renderProductGrids();
renderProductDetail();
setupSearch();
applyProductFilters();
setActiveNav();
updateAuthControls();
renderCartCount();
renderCartPage();
renderCheckoutPage();
renderOrdersPage();
renderBusinessDashboard();
renderAdminPanel();
setupAdminForm();
setupBusinessRequestForm();
setupBusinessRequestActions();
