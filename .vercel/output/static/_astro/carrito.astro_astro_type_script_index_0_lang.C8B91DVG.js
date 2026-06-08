import{i as g,c as d,b as f,u as l,r as v}from"./cart.DH8b0xN_.js";const r=document.getElementById("cart-root"),b=document.getElementById("tpl-filled"),$=document.getElementById("tpl-empty"),c=t=>`$ ${t.toLocaleString("es-CL")}`,u=t=>`/productos/${t.slug??t.productId}`;function E(t){const e=document.createElement("div");return e.className="cart-item",e.dataset.variant=t.variantId,e.innerHTML=`
      <a class="ci-image" href="${u(t)}">
        ${t.imagen?`<img src="${t.imagen}" alt="${t.nombre}">`:""}
      </a>
      <div class="ci-info">
        <a class="ci-name" href="${u(t)}">${t.nombre}</a>
        ${t.sku?`<span class="ci-sku">${t.sku}</span>`:""}
        <span class="ci-unit">${c(t.precio)} c/u</span>
      </div>
      <div class="ci-right">
        <span class="ci-line">${c(t.precio*t.cantidad)}</span>
        <div class="ci-qty">
          <button data-act="dec" aria-label="Quitar uno">−</button>
          <span>${t.cantidad}</span>
          <button data-act="inc" aria-label="Agregar uno">+</button>
        </div>
        <button class="ci-remove" data-act="remove">Eliminar</button>
      </div>`,e}function m(){const t=d.get();if(r.innerHTML="",t.length===0){r.appendChild($.content.cloneNode(!0));return}r.appendChild(b.content.cloneNode(!0));const e=document.getElementById("cart-items");t.forEach(s=>e.appendChild(E(s)));const i=f();document.getElementById("sum-subtotal").textContent=c(i),document.getElementById("sum-total").textContent=c(i),e.addEventListener("click",s=>{const a=s.target.closest("[data-act]");if(!a)return;const n=a.closest(".cart-item")?.dataset.variant;if(!n)return;const o=d.get().find(p=>p.variantId===n);o&&(a.dataset.act==="inc"?l(n,o.cantidad+1):a.dataset.act==="dec"?l(n,o.cantidad-1):a.dataset.act==="remove"&&v(n))})}g();m();d.subscribe(()=>m());
