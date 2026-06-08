import{c as o,i as h,b as y}from"./cart.DH8b0xN_.js";import{b as $,i as g,g as E}from"./api.Sp4kOQaJ.js";const u=e=>`$ ${e.toLocaleString("es-CL")}`,a=e=>document.getElementById(e),L=a("summary-items"),b=a("summary-subtotal"),r=a("address-list"),c=a("btn-add-addr"),m=document.querySelector("[data-address-form]"),s=a("create-order"),i=a("order-hint");let n=[],d=null;function p(){const e=o.get();L.innerHTML=e.map(t=>`
        <div class="so-item">
          <div>
            <div class="so-name">${t.nombre}</div>
            <div class="so-meta">${[t.sku,`x${t.cantidad}`].filter(Boolean).join(" · ")}</div>
          </div>
          <span class="so-price">${u(t.precio*t.cantidad)}</span>
        </div>`).join(""),b.textContent=u(y()),l()}function v(){a("addr-loading").hidden=!0,n.length===0?r.innerHTML=`
        <div class="address-empty">
          <p class="ae-title">No tienes direcciones guardadas</p>
          <p class="ae-sub">Agrega una dirección de envío para continuar</p>
        </div>`:(r.innerHTML=n.map(e=>`
          <label class="addr-opt${e.id===d?" selected":""}" data-id="${e.id}">
            <input type="radio" name="addr" value="${e.id}" ${e.id===d?"checked":""} />
            <div>
              <span class="ao-alias">${e.alias}${e.isDefault?" · Predeterminada":""}</span>
              <div class="ao-line">${e.fullName} — ${e.calle} ${e.numero}${e.depto?`, ${e.depto}`:""}</div>
              <div class="ao-line">${e.comuna}, ${e.ciudad}, ${e.region}</div>
            </div>
          </label>`).join(""),r.querySelectorAll(".addr-opt").forEach(e=>{e.addEventListener("click",()=>{d=e.dataset.id,r.querySelectorAll(".addr-opt").forEach(t=>t.classList.remove("selected")),e.classList.add("selected"),e.querySelector("input").checked=!0,l()})})),c.hidden=!m.hidden}c.addEventListener("click",()=>{m.hidden=!1,c.hidden=!0});document.addEventListener("address:created",e=>{const t=e.detail;n.push(t),d=t.id,v(),l()});document.addEventListener("address:cancel",()=>{c.hidden=!1});function l(){const e=o.get().length>0,t=e&&!!d;s.disabled=!t,e?d?i.textContent="":i.textContent="Elige una dirección para continuar.":i.textContent="Tu carrito está vacío."}s.addEventListener("click",async()=>{const e=o.get().map(t=>({variantId:t.variantId,quantity:t.cantidad}));if(!(!e.length||!d)){s.disabled=!0,s.textContent="Procesando…";try{const t=await $({items:e,addressId:d}),f=await g(t.id);location.href=f.checkoutUrl}catch(t){i.textContent=t instanceof Error?t.message:"Error al crear el pedido",s.textContent="Crear Pedido",s.disabled=!1}}});document.querySelectorAll(".pay-option").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".pay-option").forEach(t=>t.classList.remove("selected")),e.classList.add("selected")})});h();p();o.subscribe(()=>p());async function C(){try{n=await E(),d=n.find(e=>e.isDefault)?.id??n[0]?.id??null,v(),l()}catch{a("addr-loading").textContent="No se pudieron cargar las direcciones."}}C();
