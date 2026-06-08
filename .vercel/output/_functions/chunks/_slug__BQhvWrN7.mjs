import { c as createComponent } from './astro-component_CD7NgbUw.mjs';
import { s as renderComponent, v as renderTemplate, q as maybeRenderHead, j as addAttribute } from './entrypoint_QWSr6fnu.mjs';
import { b as getProductBySlug, m as minPrice, t as totalStock, i as isMainTag, a as $$Base, r as renderScript, $ as $$Badge } from './Badge_CiqhhtHy.mjs';

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return Astro2.redirect("/productos");
  }
  const price = minPrice(product.variants);
  const stock = totalStock(product.variants);
  const mainTags = product.tags.filter(isMainTag);
  const hashTags = product.tags.filter((t) => !isMainTag(t));
  const images = product.images?.length ? product.images : [];
  const multiVariant = product.variants.length > 1;
  const metaDesc = product.description?.replace(/\s+/g, " ").trim().slice(0, 155) ?? "";
  const diffAttrNames = /* @__PURE__ */ new Set();
  {
    const byName = /* @__PURE__ */ new Map();
    for (const v of product.variants) {
      for (const a of v.attributes ?? []) {
        if (!byName.has(a.name)) byName.set(a.name, /* @__PURE__ */ new Set());
        byName.get(a.name).add(a.value);
      }
    }
    for (const [name, values] of byName) if (values.size > 1) diffAttrNames.add(name);
  }
  const isColorVariant = [...diffAttrNames].some((n) => n.toLowerCase() === "color");
  function toColorHex(val) {
    const map = {
      blanco: "#f0f0f0",
      negro: "#1a1a1a",
      azul: "#2563eb",
      rojo: "#dc2626",
      verde: "#16a34a",
      amarillo: "#eab308",
      naranja: "#f97316",
      morado: "#7c3aed",
      rosado: "#ec4899",
      gris: "#6b7280",
      plateado: "#94a3b8",
      dorado: "#d97706",
      cyan: "#2EE6FF",
      celeste: "#38bdf8",
      cafe: "#92400e",
      beige: "#d4b483",
      white: "#f0f0f0",
      black: "#1a1a1a",
      blue: "#2563eb",
      red: "#dc2626",
      green: "#16a34a",
      gray: "#6b7280",
      silver: "#94a3b8",
      gold: "#d97706"
    };
    return map[val.toLowerCase()] ?? val;
  }
  const variantsWithLabel = product.variants.map((v) => {
    const distinguishing = (v.attributes ?? []).filter((a) => diffAttrNames.has(a.name)).map((a) => a.value);
    const colorVal = (v.attributes ?? []).find((a) => a.name.toLowerCase() === "color")?.value ?? null;
    return {
      v,
      label: distinguishing.length ? distinguishing.join(" · ") : v.sku,
      colorHex: colorVal ? toColorHex(colorVal) : null,
      colorLabel: colorVal ?? null
    };
  });
  const firstVarImages = product.variants[0]?.images ?? [];
  const galleryImages = firstVarImages.length ? firstVarImages : images;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": product.title, "description": metaDesc, "data-astro-cid-gputwutb": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="detail" data-astro-cid-gputwutb> <nav class="breadcrumb" data-astro-cid-gputwutb> <a href="/" data-astro-cid-gputwutb>Inicio</a> <span data-astro-cid-gputwutb>/</span> <a href="/productos" data-astro-cid-gputwutb>Catálogo</a> <span data-astro-cid-gputwutb>/</span> <span class="current" data-astro-cid-gputwutb>${product.title}</span> </nav> <div class="detail-grid" data-astro-cid-gputwutb> <!-- ── Galería ── --> <div class="gallery"${addAttribute(JSON.stringify(images), "data-fallback")} data-astro-cid-gputwutb> <div class="main-image" data-astro-cid-gputwutb> ${galleryImages.length > 0 ? renderTemplate`<img id="main-img"${addAttribute(galleryImages[0], "src")}${addAttribute(product.title, "alt")} data-astro-cid-gputwutb>` : renderTemplate`<div class="no-image" data-astro-cid-gputwutb> <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-gputwutb> <rect x="2" y="3" width="20" height="14" rx="2" data-astro-cid-gputwutb></rect><path d="M8 21h8M12 17v4" data-astro-cid-gputwutb></path> </svg> </div>`} </div> <div class="thumbs" id="thumbs"${addAttribute(galleryImages.length <= 1, "hidden")} data-astro-cid-gputwutb> ${galleryImages.length > 1 && galleryImages.map((img, i) => renderTemplate`<button${addAttribute(["thumb", { active: i === 0 }], "class:list")}${addAttribute(img, "data-src")}${addAttribute(`Imagen ${i + 1}`, "aria-label")} data-astro-cid-gputwutb> <img${addAttribute(img, "src")}${addAttribute(`${product.title} ${i + 1}`, "alt")} loading="lazy" data-astro-cid-gputwutb> </button>`)} </div> </div> <!-- ── Info ── --> <div class="info" data-astro-cid-gputwutb> ${product.brand && renderTemplate`<p class="brand" data-astro-cid-gputwutb>${product.brand}</p>`} <h1 class="title" data-astro-cid-gputwutb>${product.title}</h1> ${mainTags.length > 0 && renderTemplate`<div class="tags" data-astro-cid-gputwutb> ${mainTags.map((t) => renderTemplate`${renderComponent($$result2, "Badge", $$Badge, { "color": t.color, "data-astro-cid-gputwutb": true }, { "default": async ($$result3) => renderTemplate`${t.name}` })}`)} </div>`} <div class="price-row" data-astro-cid-gputwutb> <span class="price" id="price-display" data-astro-cid-gputwutb>$ ${price.toLocaleString("es-CL")}</span> ${stock > 0 ? renderTemplate`${renderComponent($$result2, "Badge", $$Badge, { "variant": "success", "data-astro-cid-gputwutb": true }, { "default": async ($$result3) => renderTemplate`En stock` })}` : renderTemplate`${renderComponent($$result2, "Badge", $$Badge, { "variant": "danger", "data-astro-cid-gputwutb": true }, { "default": async ($$result3) => renderTemplate`Sin stock` })}`} </div> ${multiVariant && renderTemplate`<div class="variants" data-astro-cid-gputwutb> <div${addAttribute(["variant-list", { "variant-list--color": isColorVariant }], "class:list")} data-astro-cid-gputwutb> ${variantsWithLabel.map(({ v, label, colorHex, colorLabel }, i) => renderTemplate`<button${addAttribute(["variant", { active: i === 0, "variant--color": isColorVariant }], "class:list")}${addAttribute(v.id, "data-id")}${addAttribute(v.price, "data-price")}${addAttribute(v.sku, "data-sku")}${addAttribute(v.stock, "data-stock")}${addAttribute(JSON.stringify(v.images ?? []), "data-images")}${addAttribute(JSON.stringify(v.attributes ?? []), "data-attributes")}${addAttribute(v.stock === 0, "disabled")}${addAttribute(label, "title")}${addAttribute(label, "aria-label")} data-astro-cid-gputwutb> ${isColorVariant && colorHex ? renderTemplate`<span class="color-swatch"${addAttribute(`background:${colorHex}`, "style")} data-astro-cid-gputwutb></span>` : label} </button>`)} </div> ${isColorVariant && renderTemplate`<p class="variant-label" id="variant-label" data-astro-cid-gputwutb>${variantsWithLabel[0]?.label}</p>`} </div>`} <div class="actions" data-astro-cid-gputwutb> <div class="qty" data-astro-cid-gputwutb> <button class="qty-btn" id="qty-minus" aria-label="Quitar uno" data-astro-cid-gputwutb>−</button> <span id="qty-value" data-astro-cid-gputwutb>1</span> <button class="qty-btn" id="qty-plus" aria-label="Agregar uno" data-astro-cid-gputwutb>+</button> </div> <button class="btn-cart" id="add-cart"${addAttribute(stock === 0, "disabled")}${addAttribute(product.id, "data-product-id")}${addAttribute(product.title, "data-nombre")}${addAttribute(images[0] ?? "", "data-imagen")}${addAttribute(product.slug ?? "", "data-slug")}${addAttribute(product.variants[0]?.id ?? "", "data-variant-id")}${addAttribute(price, "data-precio")}${addAttribute(product.variants[0]?.sku ?? "", "data-sku")} data-astro-cid-gputwutb> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-gputwutb> <circle cx="8" cy="21" r="1" data-astro-cid-gputwutb></circle><circle cx="19" cy="21" r="1" data-astro-cid-gputwutb></circle> <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" data-astro-cid-gputwutb></path> </svg> <span id="cart-label" data-astro-cid-gputwutb>${stock === 0 ? "Sin stock" : "Agregar al carrito"}</span> </button> <button class="btn-wish" id="add-wish" aria-label="Agregar a wishlist" data-astro-cid-gputwutb> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-gputwutb> <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" data-astro-cid-gputwutb></path> </svg> </button> </div> ${hashTags.length > 0 && renderTemplate`<div class="hashtags" data-astro-cid-gputwutb> ${hashTags.map((t) => renderTemplate`<span class="hashtag"${addAttribute(`--c: ${t.color}`, "style")} data-astro-cid-gputwutb>${t.name}</span>`)} </div>`} <!-- Atributos de la variante activa — se actualiza por JS al cambiar variante --> ${(product.variants[0]?.attributes?.length ?? 0) > 0 && renderTemplate`<div class="attrs-panel" id="attrs-panel" data-astro-cid-gputwutb> ${product.variants[0].attributes.map((a) => renderTemplate`<div class="attr-row" data-astro-cid-gputwutb> <span class="attr-name" data-astro-cid-gputwutb>${a.name}</span> <span class="attr-value" data-astro-cid-gputwutb>${a.value}</span> </div>`)} </div>`} </div> </div> <!-- Descripción larga al fondo --> ${product.description && renderTemplate`<div class="description-full" data-astro-cid-gputwutb> <h2 data-astro-cid-gputwutb>Descripción</h2> <p data-astro-cid-gputwutb>${product.description}</p> </div>`} </article> ` })}  ${renderScript($$result, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/pages/productos/[slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/pages/productos/[slug].astro", void 0);

const $$file = "/home/none/dev/projects/jocoso.cl/jocoso.cl/src/pages/productos/[slug].astro";
const $$url = "/productos/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
