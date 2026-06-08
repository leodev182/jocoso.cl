import{i as g}from"./auth.BsPoC6n0.js";import{e as u}from"./api.Sp4kOQaJ.js";g();const n=document.getElementById("orders-loading"),s=document.getElementById("orders-empty"),d=document.getElementById("orders-list"),i=document.getElementById("pagination"),c=document.getElementById("btn-prev"),l=document.getElementById("btn-next"),m=document.getElementById("pg-info"),h={PENDING:"Pendiente",CONFIRMED:"Confirmado",SHIPPED:"Enviado",DELIVERED:"Entregado",CANCELLED:"Cancelado"};function E(t){return new Date(t).toLocaleDateString("es-CL",{day:"2-digit",month:"short",year:"numeric"})}function v(t){const e=t.id.split("-")[0].toUpperCase(),p=t.trackingCode?`<span class="order-tracking">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          ${t.trackingCode}
        </span>`:"";return`
      <div class="order-card">
        <div class="order-top">
          <div class="order-meta">
            <span class="order-id">#${e}</span>
            <span class="order-date">${E(t.createdAt)}</span>
          </div>
          <span class="status-badge status-${t.status}">${h[t.status]??t.status}</span>
        </div>
        <div class="order-bottom">
          <div class="order-details">
            ${t.items[0]?.productName?t.items.map(o=>`<span class="order-items-count">${o.productName} <span class="order-item-qty">× ${o.quantity}</span></span>`).join(""):`<span class="order-items-count">${t.items.length} ${t.items.length===1?"producto":"productos"}</span>`}
            ${p}
          </div>
          <span class="order-total">$ ${t.totalAmount.toLocaleString("es-CL")}</span>
        </div>
      </div>
    `}let a=1;const f=10;async function r(t){n.hidden=!1,s.hidden=!0,d.hidden=!0,i.hidden=!0;try{const e=await u(t,f);if(n.hidden=!0,!e?.data?.length&&t===1){s.hidden=!1;return}s.hidden=!0,d.innerHTML=e.data.map(v).join(""),d.hidden=!1,e.totalPages>1&&(m.textContent=`Página ${e.page} de ${e.totalPages}`,c.disabled=e.page<=1,l.disabled=e.page>=e.totalPages,i.hidden=!1),a=e.page}catch{n.hidden=!1,n.textContent="No se pudieron cargar los pedidos.",s.hidden=!0}}c.addEventListener("click",()=>r(a-1));l.addEventListener("click",()=>r(a+1));r(1);
