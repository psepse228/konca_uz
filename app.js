/* ===========================
   KONCA UZ — APP JS
   =========================== */

// ── State ──────────────────────────────────────────────
const state = {
  lang: 'en',
  wishlist: [],
  currentFilter: 'all',
};

// ── Product Data ────────────────────────────────────────
const products = [
  {
    id: 1, filter: 'polo',
    name: 'Knit Polo Zip — White', nameRu: 'Поло на молнии — Белый',
    category: 'Polo · Model 689', categoryRu: 'Поло · Модель 689',
    img: 'polo/photo_2026-06-13_14-43-14.jpg',
    isNew: true,
  },
  {
    id: 2, filter: 'polo',
    name: 'Knit Polo Zip — Navy', nameRu: 'Поло на молнии — Синий',
    category: 'Polo · Model 689', categoryRu: 'Поло · Модель 689',
    img: 'polo/photo_2026-06-13_14-43-23.jpg',
    isNew: true,
  },
  {
    id: 3, filter: 'polo',
    name: 'Knit Polo Zip — Ivory', nameRu: 'Поло на молнии — Айвори',
    category: 'Polo · Model 689', categoryRu: 'Поло · Модель 689',
    img: 'polo/photo_2026-06-13_14-43-26.jpg',
    isNew: false,
  },
  {
    id: 4, filter: 'polo',
    name: 'Knit Polo Zip — Plum', nameRu: 'Поло на молнии — Сливовый',
    category: 'Polo · Model 689', categoryRu: 'Поло · Модель 689',
    img: 'polo/photo_2026-06-13_14-43-28.jpg',
    isNew: false,
  },
  {
    id: 5, filter: 'polo',
    name: 'Knit Polo Zip — Terracotta', nameRu: 'Поло на молнии — Терракота',
    category: 'Polo · Model 689', categoryRu: 'Поло · Модель 689',
    img: 'polo/photo_2026-06-13_14-43-30.jpg',
    isNew: true,
  },
  {
    id: 6, filter: 'tricot',
    name: 'Open Collar Polo — Classic', nameRu: 'Поло с воротником — Классик',
    category: 'Knitwear · Model 016', categoryRu: 'Трикотаж · Модель 016',
    img: 'photos/photo_2026-06-13_14-41-41.jpg',
    isNew: true,
  },
  {
    id: 7, filter: 'tricot',
    name: 'Open Collar Polo — Rich Tones', nameRu: 'Поло с воротником — Насыщенные тона',
    category: 'Knitwear · Model 016', categoryRu: 'Трикотаж · Модель 016',
    img: 'photos/photo_2026-06-13_14-41-46.jpg',
    isNew: false,
  },
  {
    id: 8, filter: 'tricot',
    name: 'Open Collar Polo — Earth Tones', nameRu: 'Поло с воротником — Земляные тона',
    category: 'Knitwear · Model 016', categoryRu: 'Трикотаж · Модель 016',
    img: 'photos/photo_2026-06-13_14-41-48.jpg',
    isNew: false,
  },
];

// ── Toast ───────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Language ────────────────────────────────────────────
function setLang(lang) {
  state.lang = lang;
  document.querySelectorAll('.lang-en').forEach(el => {
    el.style.display = lang === 'en' ? '' : 'none';
  });
  document.querySelectorAll('.lang-ru').forEach(el => {
    el.style.display = lang === 'ru' ? '' : 'none';
  });
  document.getElementById('langToggle').textContent = lang.toUpperCase();
  renderProducts();
}

// ── Header scroll ───────────────────────────────────────
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ── Hero Slideshow ──────────────────────────────────────
(function initHero() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.hero-dot')[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    document.querySelectorAll('.hero-dot')[current].classList.add('active');
    clearTimeout(timer);
    timer = setTimeout(next, 5000);
  }

  function next() { goTo((current + 1) % slides.length); }

  timer = setTimeout(next, 5000);
})();

// ── Products Grid ────────────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const filtered = state.currentFilter === 'all'
    ? products
    : products.filter(p => p.filter === state.currentFilter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" data-id="${p.id}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${state.lang === 'ru' ? p.nameRu : p.name}" loading="lazy" />
        <div class="product-overlay">
          <button class="product-action-btn quick-view-btn" data-id="${p.id}" title="Quick View">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="product-action-btn wishlist-btn" data-id="${p.id}" title="Save">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        ${p.isNew ? `<div class="product-new-badge">${state.lang === 'ru' ? 'НОВИНКА' : 'NEW'}</div>` : ''}
      </div>
      <div class="product-info">
        <p class="product-category">${state.lang === 'ru' ? p.categoryRu : p.category}</p>
        <h3 class="product-name">${state.lang === 'ru' ? p.nameRu : p.name}</h3>
        <p class="product-wholesale">${state.lang === 'ru' ? 'Оптом &nbsp;·&nbsp; M — 3XL' : 'Wholesale &nbsp;·&nbsp; M — 3XL'}</p>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(+btn.dataset.id);
    });
  });

  grid.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleWishlist(+btn.dataset.id);
    });
  });

  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.id));
  });

  observeReveal();
}

// ── Filter Buttons ───────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentFilter = btn.dataset.filter;
    renderProducts();
  });
});

// ── Quick View Modal ─────────────────────────────────────
let currentModalProduct = null;

function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentModalProduct = p;

  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').alt = state.lang === 'ru' ? p.nameRu : p.name;
  document.getElementById('modalCategory').textContent = state.lang === 'ru' ? p.categoryRu : p.category;
  document.getElementById('modalName').textContent = state.lang === 'ru' ? p.nameRu : p.name;

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', closeModal);

// ── Wishlist ─────────────────────────────────────────────
function toggleWishlist(id) {
  const idx = state.wishlist.indexOf(id);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(state.lang === 'ru' ? 'Удалено из сохранённых' : 'Removed from saved');
  } else {
    state.wishlist.push(id);
    showToast(state.lang === 'ru' ? 'Сохранено' : 'Saved');
  }
  document.getElementById('wishlistBadge').textContent = state.wishlist.length;
}

document.getElementById('wishlistBtn').addEventListener('click', () => {
  showToast(state.lang === 'ru' ? 'Свяжитесь с менеджером для заказа' : 'Contact a manager to place an order');
});

// ── Mobile Menu ───────────────────────────────────────────
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
  document.body.style.overflow = 'hidden';
});

document.getElementById('menuClose').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Search ────────────────────────────────────────────────
document.getElementById('searchBtn').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('searchInput').focus(), 200);
});

document.getElementById('searchClose').addEventListener('click', () => {
  document.getElementById('searchOverlay').classList.remove('open');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    document.getElementById('searchOverlay').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Language Toggle ────────────────────────────────────────
document.getElementById('langToggle').addEventListener('click', () => {
  setLang(state.lang === 'en' ? 'ru' : 'en');
});

// ── Newsletter ─────────────────────────────────────────────
document.getElementById('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  showToast(state.lang === 'ru' ? 'Вы подписались! Добро пожаловать.' : 'Subscribed! Welcome to the Inner Circle.');
  e.target.reset();
});

// ── Scroll Reveal ──────────────────────────────────────────
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function applyRevealClasses() {
  const selectors = [
    '.collection-card', '.drop-item', '.insta-item',
    '.pillar', '.section-header', '.about-img',
    '.about-text', '.drops-text', '.newsletter-inner',
  ];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
  });
  observeReveal();
}

// ── Init ───────────────────────────────────────────────────
renderProducts();
applyRevealClasses();
