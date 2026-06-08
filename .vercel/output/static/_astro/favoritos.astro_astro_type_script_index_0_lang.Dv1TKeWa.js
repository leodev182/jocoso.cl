import{i as l}from"./auth.BsPoC6n0.js";import{f as c}from"./api.Sp4kOQaJ.js";import{w as h,t as g}from"./wishlist.CVX6xehq.js";l();const r=document.getElementById("fav-loading"),d=document.getElementById("fav-empty"),o=document.getElementById("fav-grid");function f(s){const t=s.product,i=t.slug?`/productos/${t.slug}`:`/productos/${t.id}`,a=t.images?.[0]??null,e=document.createElement("div");return e.className="fav-card",e.dataset.productId=t.id,e.innerHTML=`
      <a href="${i}" class="fav-img-wrap">
        ${a?`<img src="${a}" alt="${t.title}" loading="lazy" />`:'<div class="fav-no-img"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>'}
        <button class="fav-remove" aria-label="Quitar de favoritos">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </a>
      <a href="${i}" class="fav-body">
        ${t.brand?`<p class="fav-brand">${t.brand}</p>`:""}
        <p class="fav-title">${t.title}</p>
        ${t.minPrice!==null?`<span class="fav-price">$ ${t.minPrice.toLocaleString("es-CL")}</span>`:""}
      </a>
    `,e.querySelector(".fav-remove")?.addEventListener("click",async n=>{n.preventDefault(),n.stopPropagation(),e.style.opacity="0.4";try{await g(t.id),e.remove(),o.children.length===0&&(o.hidden=!0,d.hidden=!1)}catch{e.style.opacity=""}}),e}async function p(){try{const s=await c();if(r.hidden=!0,s.length===0){d.hidden=!1;return}const t=new Set(s.map(i=>i.product.id));h.set(t),sessionStorage.setItem("wishlist_ids",JSON.stringify([...t])),s.forEach(i=>o.appendChild(f(i))),o.hidden=!1}catch{r.textContent="No se pudieron cargar los favoritos."}}p();
