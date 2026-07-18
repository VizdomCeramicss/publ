
const CART_STORAGE_KEY = 'vizdom_cart_v1';

/* ---------- state ---------- */
function loadCart() {
  try {
    const raw = sessionStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(items) {
  try {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    /* storage unavailable (private browsing etc.) — cart just won't persist */
  }
}

let cartItems = loadCart();

/* ---------- helpers ---------- */
function getCartQty(productId) {
  const item = cartItems.find(i => i.id === productId);
  return item ? item.qty : 0;
}

function cartCount() {
  return cartItems.reduce((sum, i) => sum + i.qty, 0);
}

function addToCart(productId, delta = 1) {
  const existing = cartItems.find(i => i.id === productId);
  if (existing) {
    existing.qty += delta;
    if (existing.qty <= 0) {
      cartItems = cartItems.filter(i => i.id !== productId);
    }
  } else if (delta > 0) {
    cartItems.push({ id: productId, qty: delta });
  }
  saveCart(cartItems);
  refreshCartUI(productId);
}

function removeFromCart(productId) {
  cartItems = cartItems.filter(i => i.id !== productId);
  saveCart(cartItems);
  refreshCartUI(productId);
}

/* ---------- per-card controls (Add to Cart / qty stepper) ---------- */
function cartControlsHTML(productId) {
  const qty = getCartQty(productId);
  if (qty === 0) {
    return `<button class="btn btn-outline btn-cart-add" onclick="addToCart(${productId})">🛒 Add to Cart</button>`;
  }
  return `
    <div class="qty-stepper">
      <button aria-label="Decrease quantity" onclick="addToCart(${productId}, -1)">−</button>
      <span>${qty} in cart</span>
      <button aria-label="Increase quantity" onclick="addToCart(${productId}, 1)">+</button>
    </div>`;
}

function refreshCartUI(productId) {
  // update every card showing this product (it may appear on more than one section/page render)
  document.querySelectorAll(`[data-cart-actions="${productId}"]`).forEach(el => {
    el.innerHTML = cartControlsHTML(productId);
  });
  updateCartBadge();
  renderCartDrawer();
}

/* ---------- nav badge ---------- */
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

/* ---------- drawer contents ---------- */
function renderCartDrawer() {
  const list = document.getElementById('cart-drawer-items');
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const emptyMsg = document.getElementById('cart-empty-msg');
  if (!list) return;

  if (cartItems.length === 0) {
    list.innerHTML = '';
    if (emptyMsg) emptyMsg.style.display = 'block';
    if (checkoutBtn) {
      checkoutBtn.style.pointerEvents = 'none';
      checkoutBtn.style.opacity = '.5';
    }
    return;
  }
  if (emptyMsg) emptyMsg.style.display = 'none';
  if (checkoutBtn) {
    checkoutBtn.style.pointerEvents = 'auto';
    checkoutBtn.style.opacity = '1';
  }

  list.innerHTML = cartItems.map(item => {
    const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === item.id) : null;
    if (!product) return '';
    const thumb = (product.images && product.images[0]) ? product.images[0] : 'images/placeholder.svg';
    return `
      <div class="cart-drawer-row">
        <img src="${thumb}" alt="${product.name}" onerror="onImgError(this)">
        <div class="cart-drawer-row-info">
          <span class="cart-drawer-row-name">${product.name}</span>
          <span class="cart-drawer-row-sku">${product.price || ''}</span>
          <div class="qty-stepper qty-stepper-sm">
            <button aria-label="Decrease quantity" onclick="addToCart(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button aria-label="Increase quantity" onclick="addToCart(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="cart-drawer-remove" aria-label="Remove item" onclick="removeFromCart(${item.id})">&times;</button>
      </div>`;
  }).join('');

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      checkoutBtn.href = buildWhatsAppLink(buildCartMessage());
    };
  }
}

/* ---------- WhatsApp message from cart contents ---------- */
function buildCartMessage() {
  const lines = cartItems.map((item, i) => {
    const product = (typeof PRODUCTS !== 'undefined') ? PRODUCTS.find(p => p.id === item.id) : null;
    const name = product ? product.name : `Item ${item.id}`;
    const price = product && product.price ? ` — ${product.price}` : '';
    return `${i + 1}. ${name}${price} — Qty: ${item.qty}`;
  });
  return `Hi, I'd like to inquire about these items:\n\n${lines.join('\n')}\n\nPlease confirm availability and final price.`;
}

/* ---------- drawer open/close ---------- */
function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (!drawer || !overlay) return;
  const show = open !== undefined ? open : !drawer.classList.contains('open');
  drawer.classList.toggle('open', show);
  overlay.classList.toggle('open', show);
}

/* ---------- inject nav button + drawer markup (no manual HTML edits needed) ---------- */
function injectCartUI() {
  // 1) cart button in the navbar, placed right before the WhatsApp CTA
  const navCta = document.querySelector('.nav-cta');
  if (navCta && !document.getElementById('cart-nav-btn')) {
    const cartBtn = document.createElement('button');
    cartBtn.id = 'cart-nav-btn';
    cartBtn.className = 'cart-btn';
    cartBtn.setAttribute('aria-label', 'View cart');
    cartBtn.setAttribute('onclick', 'toggleCartDrawer(true)');
    cartBtn.innerHTML = '🛒<span class="cart-badge" id="cart-badge">0</span>';
    navCta.insertAdjacentElement('beforebegin', cartBtn);
  }

  // 2) drawer + overlay, appended once to the end of <body>
  if (!document.getElementById('cart-drawer')) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="cart-overlay" id="cart-overlay" onclick="toggleCartDrawer(false)"></div>
      <aside class="cart-drawer" id="cart-drawer">
        <div class="cart-drawer-header">
          <h3>Your Cart</h3>
          <button class="cart-drawer-close" onclick="toggleCartDrawer(false)" aria-label="Close cart">&times;</button>
        </div>
        <div class="cart-drawer-items" id="cart-drawer-items"></div>
        <p id="cart-empty-msg" style="color:var(--color-ink-soft); font-size:.92rem;">Your cart is empty. Add items from the catalog to build a WhatsApp inquiry.</p>
        <div class="cart-drawer-footer">
          <a href="#" id="cart-checkout-btn" class="btn btn-whatsapp" target="_blank" rel="noopener" style="width:100%; justify-content:center;">💬 Checkout via WhatsApp</a>
        </div>
      </aside>`;
    document.body.appendChild(wrapper);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  injectCartUI();
  updateCartBadge();
  renderCartDrawer();
});
