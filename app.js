const CART_KEY = "woodnest_cart";

function readCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency", currency: "INR", maximumFractionDigits: 0
  }).format(value);
}
function updateCartCount() {
  const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cart-count").forEach(el => el.textContent = count);
}
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function addToCart(productId) {
  const cart = readCart();
  const found = cart.find(item => item.id === productId);
  if (found) found.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  saveCart(cart);
  showToast("Added to your cart");
}
function productCard(product) {
  const tag = product.tag ? `<span class="product-tag">${product.tag}</span>` : "";
  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <a href="product.html?id=${product.id}" aria-label="View ${product.name}">
          <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
        ${tag}
        <button class="add-cart-button" type="button" data-add-cart="${product.id}">＋ Add to cart</button>
      </div>
      <a class="product-name" href="product.html?id=${product.id}">${product.name}</a>
      <p class="product-category">${product.category}</p>
      <div class="product-price-row"><span>${formatINR(product.price)}</span>${product.oldPrice ? `<span class="old-price">${formatINR(product.oldPrice)}</span>` : ""}</div>
    </article>`;
}
async function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;
  try {
    const response = await fetch("products.json");
    if (!response.ok) throw new Error("Could not load products.json");
    const products = await response.json();
    container.innerHTML = products.slice(0, 4).map(productCard).join("");
    container.addEventListener("click", event => {
      const button = event.target.closest("[data-add-cart]");
      if (button) addToCart(Number(button.dataset.addCart));
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "";
    document.getElementById("product-error")?.classList.remove("hidden");
  }
}
function setupNavigation() {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileNav = document.getElementById("mobile-nav");
  menuButton?.addEventListener("click", () => {
    const isHidden = mobileNav.classList.toggle("hidden");
    menuButton.setAttribute("aria-expanded", String(!isHidden));
  });
  mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mobileNav.classList.add("hidden");
    menuButton?.setAttribute("aria-expanded", "false");
  }));

  const searchToggle = document.getElementById("search-toggle");
  const searchPanel = document.getElementById("search-panel");
  searchToggle?.addEventListener("click", () => searchPanel.classList.toggle("hidden"));
  document.getElementById("search-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query) window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
  });
}
function setupNewsletter() {
  document.getElementById("newsletter-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const email = document.getElementById("newsletter-email").value.trim();
    document.getElementById("newsletter-message").textContent =
      `Thanks! ${email} has been added to this demo newsletter list.`;
    event.target.reset();
  });
}
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  loadFeaturedProducts();
  setupNavigation();
  setupNewsletter();
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
});
