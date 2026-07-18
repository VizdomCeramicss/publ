
const PLACEHOLDER_IMG = 'images/placeholder.svg';
let PAGE_SIZE = 12;
let visibleCount = PAGE_SIZE;
let activeCategory = 'All';
let activeSearch = '';

/* ---------- small helpers ---------- */
function onImgError(img) {
  img.onerror = null;
  img.src = PLACEHOLDER_IMG;
}

function matchesFilters(product) {
  const inCategory = activeCategory === 'All' || product.category === activeCategory;
  const q = activeSearch.trim().toLowerCase();
  const inSearch =
    q === '' ||
    product.name.toLowerCase().includes(q) ||
    product.sku.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q);
  return inCategory && inSearch;
}

/* ---------- card markup ---------- */
function productCardHTML(product) {
  const images = product.images && product.images.length ? product.images : [PLACEHOLDER_IMG];
  const dots = images
    .map((_, i) => `<button aria-label="Photo ${i + 1}" class="${i === 0 ? 'active' : ''}" data-idx="${i}"></button>`)
    .join('');
  const waMsg = encodeURIComponent(`Hello Vizdom Ceramics, I'm interested in ${product.name} — ${product.price || ''}.`);
  const hasHoverShot = images.length > 1;

  return `
    <article class="card" data-id="${product.id}" data-category="${product.category}" onclick="goToProduct(${product.id})">
      <div class="card-gallery" data-imgs='${JSON.stringify(images)}' data-current="0">
        <img class="gallery-img gallery-img-main" src="${images[0]}" alt="${product.name}" loading="lazy" onerror="onImgError(this)">
        ${hasHoverShot ? `
          <img class="gallery-img gallery-img-hover" src="${images[1]}" alt="${product.name} installed" loading="lazy" onerror="onImgError(this)">
          <span class="gallery-hover-badge">See it installed</span>` : ''}
        ${images.length > 1 ? `
          <button class="card-nav prev" aria-label="Previous photo" onclick="event.stopPropagation(); stepGallery(this, -1)">&#8249;</button>
          <button class="card-nav next" aria-label="Next photo" onclick="event.stopPropagation(); stepGallery(this, 1)">&#8250;</button>
          <div class="card-dots">${dots}</div>` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <span class="card-cat">${product.category}</span>
        ${product.price ? `<span class="card-price">${product.price}</span>` : ''}
        <p class="card-desc">${product.description}</p>
        <div class="card-actions">
          <button class="btn btn-outline" onclick="event.stopPropagation(); openLightbox(${product.id})">View photos</button>
          <a class="btn btn-whatsapp" target="_blank" rel="noopener"
             onclick="event.stopPropagation(); this.href = buildWhatsAppLink(decodeURIComponent('${waMsg}'))">Ask on WhatsApp</a>
        </div>
        <div class="cart-controls" data-cart-actions="${product.id}" onclick="event.stopPropagation()">${cartControlsHTML(product.id)}</div>
      </div>
    </article>`;
}

/* ---------- navigate from a catalog/featured card to its own product page ---------- */
function goToProduct(productId) {
  window.location.href = `product.html?id=${productId}`;
}

/* ---------- gallery controls inside a card ---------- */
function stepGallery(btn, dir) {
  const gallery = btn.closest('.card-gallery');
  const imgs = JSON.parse(gallery.dataset.imgs);
  let current = parseInt(gallery.dataset.current, 10);
  current = (current + dir + imgs.length) % imgs.length;
  gallery.dataset.current = current;
  gallery.querySelector('img').src = imgs[current];
  gallery.querySelectorAll('.card-dots button').forEach((d, i) => d.classList.toggle('active', i === current));
}

/* ---------- rendering ---------- */
function renderCategoryChips(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const all = ['All', ...CATEGORIES];
  el.innerHTML = all
    .map(cat => `<a href="catalog.html?category=${encodeURIComponent(cat)}" class="cat-chip">
        <span class="cat-icon">◠</span>${cat}
      </a>`)
    .join('');
}

function renderFeatured(containerId, count = 6) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.classList.add('reveal-grid');
  el.innerHTML = PRODUCTS.slice(0, count).map(productCardHTML).join('');
  initScrollReveal(el);
}

/* Homepage: group products by category, each with its own heading and a
   small grid led by that category's first item as the main thumbnail. */
function renderCategorizedProducts(containerId, perCategory = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = CATEGORIES.map(cat => {
    const items = PRODUCTS.filter(p => p.category === cat).slice(0, perCategory);
    if (!items.length) return '';
    return `
      <div class="cat-section">
        <div class="cat-section-head">
          <h3>${cat}</h3>
          <a href="catalog.html?category=${encodeURIComponent(cat)}" class="cat-section-link">See all →</a>
        </div>
        <div class="product-grid reveal-grid">${items.map(productCardHTML).join('')}</div>
      </div>`;
  }).join('');

  el.querySelectorAll('.reveal-grid').forEach(initScrollReveal);
}

function renderCatalog() {
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('results-count');
  const moreWrap = document.getElementById('load-more-wrap');
  if (!grid) return;

  const filtered = PRODUCTS.filter(matchesFilters);
  const toShow = filtered.slice(0, visibleCount);

  grid.innerHTML = toShow.length
    ? toShow.map(productCardHTML).join('')
    : `<p style="grid-column:1/-1; color:var(--color-ink-soft)">No products match your search yet. Try another keyword or category.</p>`;

  if (countEl) countEl.textContent = `Showing ${toShow.length} of ${filtered.length} items`;
  if (moreWrap) moreWrap.style.display = visibleCount < filtered.length ? 'flex' : 'none';
}

function populateCategorySelect() {
  const select = document.getElementById('category-select');
  if (!select) return;
  select.innerHTML = ['All', ...CATEGORIES].map(c => `<option value="${c}">${c}</option>`).join('');
}

/* ---------- lightbox ---------- */
let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  lightboxImages = product.images && product.images.length ? product.images : [PLACEHOLDER_IMG];
  lightboxIndex = 0;
  document.getElementById('lightbox-title').textContent = `${product.name} — Item #${product.sku}`;
  updateLightboxImage();
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('open'); }
function stepLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightboxImage();
}
function updateLightboxImage() {
  const img = document.getElementById('lightbox-img');
  img.src = lightboxImages[lightboxIndex];
  img.onerror = () => onImgError(img);
}


let pdImages = [];
let pdIndex = 0;

function renderProductDetail() {
  const wrap = document.getElementById('product-detail');
  if (!wrap) return; // not on the product page

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = PRODUCTS.find(p => p.id === id);
  const breadcrumb = document.getElementById('breadcrumb');

  if (!product) {
    wrap.innerHTML = `
      <div class="pd-notfound">
        <p>We couldn't find that item — it may have been removed or the link is out of date.</p>
        <a href="catalog.html" class="btn btn-primary">Back to full catalog</a>
      </div>`;
    if (breadcrumb) breadcrumb.innerHTML = `<a href="index.html">Home</a><span class="sep">/</span><a href="catalog.html">Full Catalog</a>`;
    return;
  }

  document.title = `${product.name} — Vizdom Ceramics`;
  pdImages = product.images && product.images.length ? product.images : [PLACEHOLDER_IMG];
  pdIndex = 0;

  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="index.html">Home</a><span class="sep">/</span>
      <a href="catalog.html">Full Catalog</a><span class="sep">/</span>
      <a href="catalog.html?category=${encodeURIComponent(product.category)}">${product.category}</a><span class="sep">/</span>
      <span class="current">${product.name}</span>`;
  }

  const waMsg = `Hello Vizdom Ceramics, I'm interested in ${product.name} — ${product.price || ''}.`;

  wrap.innerHTML = `
    <div class="pd-gallery">
      <div class="pd-main-frame" id="pd-main-frame">
        <img id="pd-main-img" class="gallery-img gallery-img-main" src="${pdImages[0]}" alt="${product.name}" onerror="onImgError(this)" onclick="openLightbox(${product.id})">
        ${pdImages.length > 1 ? `
          <img class="gallery-img gallery-img-hover" src="${pdImages[1]}" alt="${product.name} installed" onerror="onImgError(this)">
          <span class="gallery-hover-badge">See it installed</span>` : ''}
        <span class="pd-badge-cat">${product.category}</span>
        ${pdImages.length > 1 ? `
          <button class="pd-nav prev" aria-label="Previous photo" onclick="stepProductGallery(-1)">&#8249;</button>
          <button class="pd-nav next" aria-label="Next photo" onclick="stepProductGallery(1)">&#8250;</button>` : ''}
      </div>
      ${pdImages.length > 1 ? `
        <div class="pd-thumbs">
          ${pdImages.map((img, i) => `
            <button class="pd-thumb ${i === 0 ? 'active' : ''}" aria-label="Photo ${i + 1}" onclick="setProductImage(${i})">
              <img src="${img}" alt="${product.name} photo ${i + 1}" onerror="onImgError(this)">
            </button>`).join('')}
        </div>` : ''}
    </div>
    <div class="pd-info">
      <p class="eyebrow">Item #${product.sku}</p>
      <h1 class="pd-title">${product.name}</h1>
      ${product.price ? `<div class="pd-price">${product.price}</div>` : ''}
      <p class="pd-desc">${product.description}</p>
      <div class="pd-actions">
        <a class="btn btn-whatsapp" target="_blank" rel="noopener"
           onclick="this.href = buildWhatsAppLink(decodeURIComponent('${encodeURIComponent(waMsg)}'))">💬 Ask on WhatsApp</a>
      </div>
      <div class="cart-controls pd-cart" data-cart-actions="${product.id}">${cartControlsHTML(product.id)}</div>
      <ul class="pd-meta">
        <li><span>Category</span><strong>${product.category}</strong></li>
        <li><span>Item No.</span><strong>${product.sku}</strong></li>
      </ul>
    </div>`;

  renderRelatedProducts(product);
}

/* ---------- product-page gallery controls ---------- */
function setProductImage(idx) {
  const img = document.getElementById('pd-main-img');
  if (!img) return;
  pdIndex = idx;
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = pdImages[pdIndex];
    img.onerror = () => onImgError(img);
    img.style.opacity = '1';
  }, 160);
  document.querySelectorAll('.pd-thumb').forEach((t, i) => t.classList.toggle('active', i === pdIndex));
}
function stepProductGallery(dir) {
  const next = (pdIndex + dir + pdImages.length) % pdImages.length;
  setProductImage(next);
}

/* ---------- related products (same category, bottom of the page) ---------- */
function renderRelatedProducts(product) {
  const grid = document.getElementById('related-grid');
  const section = document.getElementById('related-section');
  if (!grid) return;
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 8);

  if (!related.length) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';
  grid.innerHTML = related.map(productCardHTML).join('');
  initScrollReveal(grid);
}

/* ---------- gentle scroll-reveal for any grid of cards ---------- */
function initScrollReveal(container) {
  const cards = container.querySelectorAll('.card');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 70);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => observer.observe(c));
}

/* ---------- footer contact row (email + phone, injected automatically) ---------- */
function injectFooterContact() {
  const grid = document.querySelector('.footer-grid');
  if (!grid || document.getElementById('footer-contact')) return;

  const email = (typeof CONTACT_EMAIL !== 'undefined') ? CONTACT_EMAIL : '';
  const phone = (typeof getDisplayPhoneNumber === 'function') ? getDisplayPhoneNumber() : '';
  const telHref = (typeof getWhatsAppNumber === 'function') ? `tel:+${getWhatsAppNumber()}` : '#';

  const row = document.createElement('div');
  row.id = 'footer-contact';
  row.className = 'container footer-contact';
  row.innerHTML = `
    ${email ? `<a href="mailto:${email}"><span class="footer-contact-icon">✉️</span>${email}</a>` : ''}
    ${phone ? `<a href="${telHref}"><span class="footer-contact-icon">📞</span>${phone}</a>` : ''}
  `;
  grid.parentElement.insertBefore(row, grid);
}

/* ---------- nav toggle ---------- */
function toggleNav() {
  document.getElementById('nav-links').classList.toggle('open');
}

/* ---------- go-to-top button (injected automatically on every page) ---------- */
function injectScrollTopButton() {
  if (document.getElementById('scroll-top-btn')) return;
  const btn = document.createElement('button');
  btn.id = 'scroll-top-btn';
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '&#8593;';
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  });
}

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCategoryChips('category-strip');
  renderCategorizedProducts('categorized-products', 4);
  populateCategorySelect();
  injectScrollTopButton();
  injectFooterContact();
  renderProductDetail();

  // read ?category= from the URL (used by the homepage category chips)
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    activeCategory = cat;
    const select = document.getElementById('category-select');
    if (select) select.value = cat;
  }

  renderCatalog();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      activeSearch = e.target.value;
      visibleCount = PAGE_SIZE;
      renderCatalog();
    });
  }
  const categorySelect = document.getElementById('category-select');
  if (categorySelect) {
    categorySelect.addEventListener('change', e => {
      activeCategory = e.target.value;
      visibleCount = PAGE_SIZE;
      renderCatalog();
    });
  }
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += PAGE_SIZE;
      renderCatalog();
    });
  }

  // set every static WhatsApp button/link on the page (built at click-time)
  document.querySelectorAll('[data-wa-generic]').forEach(el => {
    el.addEventListener('click', () => { el.href = buildWhatsAppLink(); });
  });
});
