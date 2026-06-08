import { c as createComponent } from './astro-component_CD7NgbUw.mjs';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, j as addAttribute } from './entrypoint_QWSr6fnu.mjs';
import { g as getAllStorefrontProducts, d as getStorefrontTags, i as isMainTag, a as $$Base, r as renderScript } from './Badge_CiqhhtHy.mjs';
import { $ as $$ProductCard } from './ProductCard_BjfzhLH8.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [products, tags] = await Promise.all([
    getAllStorefrontProducts(),
    getStorefrontTags()
  ]);
  const mainTags = tags.filter(isMainTag);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "Catálogo", "data-astro-cid-d326op7z": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="catalog" data-astro-cid-d326op7z> <header class="catalog-head" data-astro-cid-d326op7z> <h1 id="catalog-title" data-astro-cid-d326op7z>Catálogo</h1> <div class="search-box" data-astro-cid-d326op7z> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-d326op7z> <circle cx="11" cy="11" r="8" data-astro-cid-d326op7z></circle><path d="m21 21-4.3-4.3" data-astro-cid-d326op7z></path> </svg> <input type="search" id="catalog-search" placeholder="Buscar productos..." autocomplete="off" data-astro-cid-d326op7z> </div> </header> <div class="filters" data-astro-cid-d326op7z> <button class="chip active" data-tag="" data-astro-cid-d326op7z>Todos</button> ${mainTags.map((t) => renderTemplate`<button class="chip"${addAttribute(t.slug, "data-tag")} data-astro-cid-d326op7z> <span class="dot"${addAttribute(`--c: ${t.color}`, "style")} data-astro-cid-d326op7z></span> ${t.name} </button>`)} </div> <p class="count" id="catalog-count" data-astro-cid-d326op7z></p> <div class="catalog-grid" id="catalog-grid" data-astro-cid-d326op7z> ${products.map((p) => renderTemplate`<div class="catalog-item"${addAttribute(p.tags.map((t) => t.slug).join(","), "data-tags")}${addAttribute(p.title.toLowerCase(), "data-title")}${addAttribute(String(p.featured), "data-featured")} data-astro-cid-d326op7z> ${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": p, "data-astro-cid-d326op7z": true })} </div>`)} </div> <p class="empty" id="catalog-empty" hidden data-astro-cid-d326op7z>No se encontraron productos con esos filtros.</p> <div class="more-wrap" data-astro-cid-d326op7z> <button class="btn-more" id="load-more" hidden data-astro-cid-d326op7z>Cargar más</button> </div> </section> ` })}  ${renderScript($$result, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/pages/productos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/pages/productos/index.astro", void 0);

const $$file = "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/pages/productos/index.astro";
const $$url = "/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
