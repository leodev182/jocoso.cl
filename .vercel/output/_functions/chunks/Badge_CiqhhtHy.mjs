import { c as createComponent } from './astro-component_CD7NgbUw.mjs';
import { k as createRenderInstruction, q as maybeRenderHead, v as renderTemplate, s as renderComponent, j as addAttribute, u as renderSlot, t as renderHead } from './entrypoint_QWSr6fnu.mjs';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$ThemeSwitch = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<label class="switch" aria-label="Cambiar tema" title="Cambiar tema" data-astro-cid-ahjb3ehz> <input type="checkbox" id="theme-input" data-astro-cid-ahjb3ehz> <!-- Moon: active in dark mode (left side) --> <svg class="sw-icon sw-moon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ahjb3ehz> <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" data-astro-cid-ahjb3ehz></path> </svg> <span class="track" data-astro-cid-ahjb3ehz> <span class="thumb" data-astro-cid-ahjb3ehz></span> </span> <!-- Sun: active in light mode (right side) --> <svg class="sw-icon sw-sun" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ahjb3ehz> <circle cx="12" cy="12" r="4" data-astro-cid-ahjb3ehz></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" data-astro-cid-ahjb3ehz></path> </svg> </label>  ${renderScript($$result, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/layout/ThemeSwitch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/layout/ThemeSwitch.astro", void 0);

const BASE = `${"https://backend.jocoso.cl"}/api/v1`;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function get(path, retries = 3) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(`${BASE}${path}`);
      if (res.status === 429 && attempt < retries) {
        const retryAfter = Number(res.headers.get("retry-after"));
        await sleep(retryAfter > 0 ? retryAfter * 1e3 : 300 * 2 ** attempt);
        continue;
      }
      if (!res.ok) {
        console.warn(`[api] ${res.status} ${res.statusText} en ${path}`);
        return null;
      }
      return res.json();
    } catch (err) {
      if (attempt < retries) {
        await sleep(300 * 2 ** attempt);
        continue;
      }
      console.warn(`[api] fetch falló en ${path}:`, err instanceof Error ? err.message : err);
      return null;
    }
  }
}
async function getStorefrontProducts(params) {
  const qs = new URLSearchParams();
  if (params.featured !== void 0) qs.set("featured", String(params.featured));
  if (params.tag) qs.set("tag", params.tag);
  if (params.search) qs.set("search", params.search);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  const result = await get(`/products/storefront?${qs}`);
  return result ?? { data: [], total: 0, page: 1, limit: 12, totalPages: 0 };
}
async function getProductBySlug(slugOrId) {
  const direct = await get(`/products/storefront/${encodeURIComponent(slugOrId)}`);
  if (direct) return direct;
  const result = await get(`/products/storefront?limit=100`);
  return result?.data.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null;
}
async function getAllStorefrontProducts(params = {}) {
  const limit = 100;
  const all = [];
  let page = 1;
  while (true) {
    const res = await getStorefrontProducts({ ...params, page, limit });
    all.push(...res.data);
    if (res.data.length === 0 || page >= res.totalPages) break;
    page++;
  }
  return all;
}
async function getStorefrontTags() {
  const result = await get("/tags/storefront");
  return result ?? [];
}
function minPrice(variants) {
  if (!variants.length) return 0;
  return Math.min(...variants.map((v) => v.price));
}
function totalStock(variants) {
  return variants.reduce((acc, v) => acc + v.stock, 0);
}
function isMainTag(tag) {
  return !tag.name.startsWith("#");
}

const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const categories = (await getStorefrontTags()).filter(isMainTag);
  const navLinks = [
    { label: "Catálogo", href: "/productos" },
    { label: "Contacto", href: "/contacto" },
    { label: "Mayoristas", href: "/mayoristas" }
  ];
  return renderTemplate`${maybeRenderHead()}<header id="navbar" data-astro-cid-jp2pq5zm> <!-- ── Barra principal ── --> <div class="main-bar" data-astro-cid-jp2pq5zm> <div class="main-bar-inner" data-astro-cid-jp2pq5zm> <!-- Logo --> <a href="/" class="logo" data-astro-cid-jp2pq5zm> <img src="/images/brand/logoJocoso.svg" alt="jocoso.cl" class="logo-img" data-astro-cid-jp2pq5zm> </a> <!-- Buscador (desktop) --> <div class="search-wrap" data-astro-cid-jp2pq5zm> <div class="search-box" data-astro-cid-jp2pq5zm> <input type="search" id="search-input" class="search-input" placeholder="Buscar productos..." autocomplete="off" data-astro-cid-jp2pq5zm> <button class="search-btn" aria-label="Buscar" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <circle cx="11" cy="11" r="8" data-astro-cid-jp2pq5zm></circle><path d="m21 21-4.3-4.3" data-astro-cid-jp2pq5zm></path> </svg> </button> </div> </div> <!-- Acciones --> <div class="nav-actions" data-astro-cid-jp2pq5zm> <!-- Icono de búsqueda solo en mobile --> <button class="icon-btn mobile-search-toggle" id="mobile-search-btn" aria-label="Buscar" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <circle cx="11" cy="11" r="8" data-astro-cid-jp2pq5zm></circle><path d="m21 21-4.3-4.3" data-astro-cid-jp2pq5zm></path> </svg> </button> ${renderComponent($$result, "ThemeSwitch", $$ThemeSwitch, { "data-astro-cid-jp2pq5zm": true })} <a href="/cuenta" class="icon-btn" id="user-btn" aria-label="Mi cuenta" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <circle cx="12" cy="8" r="4" data-astro-cid-jp2pq5zm></circle><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" data-astro-cid-jp2pq5zm></path> </svg> </a> <a href="/cuenta/favoritos" class="icon-btn" id="wish-btn" aria-label="Mi wishlist" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" data-astro-cid-jp2pq5zm></path> </svg> </a> <a href="/carrito" class="icon-btn" id="cart-btn" aria-label="Ver carrito" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <circle cx="8" cy="21" r="1" data-astro-cid-jp2pq5zm></circle><circle cx="19" cy="21" r="1" data-astro-cid-jp2pq5zm></circle> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" data-astro-cid-jp2pq5zm></path> </svg> <span id="cart-count" class="cart-count hidden" data-astro-cid-jp2pq5zm>0</span> </a> <button class="hamburger" id="hamburger" aria-label="Menú" aria-expanded="false" data-astro-cid-jp2pq5zm> <span data-astro-cid-jp2pq5zm></span> <span data-astro-cid-jp2pq5zm></span> <span data-astro-cid-jp2pq5zm></span> </button> </div> </div> <!-- Buscador mobile (expandible) --> <div class="mobile-search-bar" id="mobile-search-bar" data-astro-cid-jp2pq5zm> <div class="search-box" data-astro-cid-jp2pq5zm> <input type="search" class="search-input" placeholder="Buscar productos..." autocomplete="off" data-astro-cid-jp2pq5zm> <button class="search-btn" aria-label="Buscar" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <circle cx="11" cy="11" r="8" data-astro-cid-jp2pq5zm></circle><path d="m21 21-4.3-4.3" data-astro-cid-jp2pq5zm></path> </svg> </button> </div> </div> </div> <!-- ── Sub-barra de navegación ── --> <div class="category-bar" data-astro-cid-jp2pq5zm> <div class="category-inner" data-astro-cid-jp2pq5zm> <div class="cat-dropdown" data-astro-cid-jp2pq5zm> <button class="cat-toggle" id="cat-toggle" aria-expanded="false" aria-controls="cat-panel" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-jp2pq5zm></line><line x1="3" y1="12" x2="21" y2="12" data-astro-cid-jp2pq5zm></line><line x1="3" y1="18" x2="21" y2="18" data-astro-cid-jp2pq5zm></line> </svg>
Categorías
<svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <path d="m6 9 6 6 6-6" data-astro-cid-jp2pq5zm></path> </svg> </button> <!-- Panel desplegable: cae justo debajo del botón, sobre el hero --> <div class="cat-panel" id="cat-panel" hidden data-astro-cid-jp2pq5zm> <ul data-astro-cid-jp2pq5zm> <li data-astro-cid-jp2pq5zm><a href="/productos" class="cat-item all" data-astro-cid-jp2pq5zm>Todos los productos</a></li> ${categories.map((c) => renderTemplate`<li data-astro-cid-jp2pq5zm> <a${addAttribute(`/productos?tag=${c.slug}`, "href")} class="cat-item" data-astro-cid-jp2pq5zm> <span class="dot"${addAttribute(`--c: ${c.color}`, "style")} data-astro-cid-jp2pq5zm></span> ${c.name} </a> </li>`)} </ul> </div> </div> <nav class="sub-links" data-astro-cid-jp2pq5zm> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="cat-tag" data-astro-cid-jp2pq5zm>${link.label}</a>`)} </nav> <!-- Redes sociales al final del subnavbar --> <div class="social-links" data-astro-cid-jp2pq5zm> <a href="https://www.facebook.com/marketplace/profile/1012281954/?ref=permalink&mibextid=dXMIcH" class="social-link" target="_blank" rel="noopener" aria-label="Facebook" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" data-astro-cid-jp2pq5zm> <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" data-astro-cid-jp2pq5zm></path> </svg> </a> <a href="https://www.instagram.com/jocoso83" class="social-link" target="_blank" rel="noopener" aria-label="Instagram" data-astro-cid-jp2pq5zm> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-jp2pq5zm> <rect x="2" y="2" width="20" height="20" rx="5" ry="5" data-astro-cid-jp2pq5zm></rect> <circle cx="12" cy="12" r="4" data-astro-cid-jp2pq5zm></circle> <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" data-astro-cid-jp2pq5zm></circle> </svg> </a> <a href="https://listado.mercadolibre.cl/_CustId_468900091" class="social-link" target="_blank" rel="noopener" aria-label="MercadoLibre" style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.3px;" data-astro-cid-jp2pq5zm>
Mercado Libre
</a> </div> </div> </div> </header> <!-- Drawer mobile --> <div class="mobile-menu" id="mobile-menu" aria-hidden="true" data-astro-cid-jp2pq5zm> ${navLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} data-astro-cid-jp2pq5zm>${link.label}</a>`)} <div class="mobile-divider" data-astro-cid-jp2pq5zm></div> <a href="/cuenta" data-astro-cid-jp2pq5zm>Mi cuenta</a> </div>  ${renderScript($$result, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/layout/Navbar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/layout/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const cols = [
    {
      title: "Tienda",
      links: [
        { label: "Productos", href: "/productos" },
        { label: "Ofertas", href: "/ofertas" },
        { label: "Marcas", href: "/marcas" }
      ]
    },
    {
      title: "Mi cuenta",
      links: [
        { label: "Perfil", href: "/cuenta" },
        { label: "Mis pedidos", href: "/cuenta/pedidos" },
        { label: "Direcciones", href: "/cuenta/direcciones" }
      ]
    },
    {
      title: "Ayuda",
      links: [
        { label: "Envíos", href: "/envios" },
        { label: "Devoluciones", href: "/devoluciones" },
        { label: "Contacto", href: "/contacto" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="footer" data-astro-cid-35ed7um5> <div class="footer-inner" data-astro-cid-35ed7um5> <div class="footer-brand" data-astro-cid-35ed7um5> <a href="/" class="logo" data-astro-cid-35ed7um5><span class="logo-accent" data-astro-cid-35ed7um5>jocoso</span>.cl</a> <p class="tagline" data-astro-cid-35ed7um5>Equipos gamers y periféricos al mejor precio.</p> </div> <nav class="footer-cols" data-astro-cid-35ed7um5> ${cols.map((col) => renderTemplate`<div class="footer-col" data-astro-cid-35ed7um5> <h3 data-astro-cid-35ed7um5>${col.title}</h3> <ul data-astro-cid-35ed7um5> ${col.links.map((l) => renderTemplate`<li data-astro-cid-35ed7um5><a${addAttribute(l.href, "href")} data-astro-cid-35ed7um5>${l.label}</a></li>`)} </ul> </div>`)} </nav> </div> <div class="footer-bottom" data-astro-cid-35ed7um5> <span data-astro-cid-35ed7um5>© ${year} jocoso.cl — Todos los derechos reservados</span> </div> </footer>`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/layout/Footer.astro", void 0);

const $$GameController = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$GameController;
  const { size = 220 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg class="ctrl-svg"${addAttribute(size, "width")} viewBox="0 0 260 185" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-g55dfvwm> <!-- ── Cuerpo principal — path continuo para el neon trace ── --> <path class="ctrl-body" d="
      M 82,42 L 62,42
      C 44,42 30,52 24,68
      L 17,92
      C 13,107 14,122 20,136
      L 29,152
      C 35,164 49,171 63,169
      L 83,167
      C 95,165 104,157 111,146
      L 117,136
      L 143,136
      L 149,146
      C 156,157 165,165 177,167
      L 197,169
      C 211,171 225,164 231,152
      L 240,136
      C 246,122 247,107 243,92
      L 236,68
      C 230,52 216,42 198,42
      L 178,42
      C 173,34 165,29 157,29
      L 103,29
      C 95,29 87,34 82,42
      Z
    " stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" data-astro-cid-g55dfvwm></path> <!-- Bumper izquierdo --> <path class="ctrl-detail" d="M 64,42 C 56,33 47,28 40,30 C 33,32 26,39 24,47" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" data-astro-cid-g55dfvwm></path> <!-- Bumper derecho --> <path class="ctrl-detail" d="M 196,42 C 204,33 213,28 220,30 C 227,32 234,39 236,47" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" data-astro-cid-g55dfvwm></path> <!-- D-pad horizontal --> <rect class="ctrl-detail" x="57" y="90" width="32" height="11" rx="3" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></rect> <!-- D-pad vertical --> <rect class="ctrl-detail" x="68" y="79" width="10" height="33" rx="3" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></rect> <!-- Analog stick izquierdo --> <circle class="ctrl-detail" cx="88" cy="128" r="15" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> <!-- Analog stick derecho --> <circle class="ctrl-detail" cx="172" cy="128" r="15" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> <!-- Botones de acción --> <circle class="ctrl-detail" cx="185" cy="86" r="6.5" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> <circle class="ctrl-detail" cx="198" cy="73" r="6.5" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> <circle class="ctrl-detail" cx="198" cy="99" r="6.5" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> <circle class="ctrl-detail" cx="211" cy="86" r="6.5" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> <!-- Start / Select --> <rect class="ctrl-detail" x="111" y="80" width="13" height="7" rx="3.5" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></rect> <rect class="ctrl-detail" x="136" y="80" width="13" height="7" rx="3.5" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></rect> <!-- Botón home central --> <circle class="ctrl-detail" cx="130" cy="104" r="9" stroke="var(--accent)" stroke-width="1.5" data-astro-cid-g55dfvwm></circle> </svg>`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/ui/GameController.astro", void 0);

const $$LoadingScreen = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="loading-screen" class="loader-overlay" aria-hidden="true" data-astro-cid-4crqydnf> <div class="loader-box" data-astro-cid-4crqydnf> ${renderComponent($$result, "GameController", $$GameController, { "size": 200, "data-astro-cid-4crqydnf": true })} </div> </div>  ${renderScript($$result, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/ui/LoadingScreen.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/ui/LoadingScreen.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Base;
  const { title, description = "Equipos gamers y periféricos al mejor precio — jocoso.cl" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"', '><link rel="icon" type="image/svg+xml" href="/images/brand/favicon.svg"><title>', " | jocoso.cl</title><!-- Previene flash de modo claro: aplica tema antes del primer paint --><script>\n      const saved = localStorage.getItem('theme');\n      const theme = saved ?? 'dark';\n      document.documentElement.setAttribute('data-theme', theme);\n    <\/script>", "</head> <body> ", ' <!-- Fondo animado de luces difuminadas --> <div class="scene" aria-hidden="true"> <div class="scene__blob scene__blob--1"></div> <div class="scene__blob scene__blob--2"></div> <div class="scene__blob scene__blob--3"></div> </div> ', ' <main class="page"> ', " </main> ", "</body></html>"])), addAttribute(description, "content"), title, renderHead(), renderComponent($$result, "LoadingScreen", $$LoadingScreen, {}), renderComponent($$result, "Navbar", $$Navbar, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/layouts/Base.astro", void 0);

const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Badge;
  const { variant = "neutral", color, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["badge", variant, className], "class:list")}${addAttribute(color ? `--badge-color: ${color}` : void 0, "style")} data-astro-cid-35zd7xm4> ${renderSlot($$result, $$slots["default"])} </span>`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/components/ui/Badge.astro", void 0);

export { $$Badge as $, $$Base as a, getProductBySlug as b, getStorefrontProducts as c, getStorefrontTags as d, getAllStorefrontProducts as g, isMainTag as i, minPrice as m, renderScript as r, totalStock as t };
