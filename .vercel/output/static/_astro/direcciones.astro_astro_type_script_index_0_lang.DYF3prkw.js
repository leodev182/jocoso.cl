import{s as m,d as f,g as p}from"./api.Sp4kOQaJ.js";const o=3,a=e=>document.getElementById(e),l=a("addr-list"),r=a("addr-form-wrap"),h=document.querySelector("[data-address-form]"),i=a("addr-error");let n=[];function $(e){return{calle:`${e.calle} ${e.numero}${e.depto?`, ${e.depto}`:""}`,zona:`${e.comuna}, ${e.ciudad}, ${e.region}`}}function u(){a("addr-loading").hidden=!0,l.innerHTML="",n.forEach(e=>{const{calle:d,zona:s}=$(e),t=document.createElement("div");t.className="addr-item"+(e.isDefault?" is-default":""),t.innerHTML=`
        <div class="ai-top">
          <span class="ai-alias">${e.alias}</span>
          ${e.isDefault?'<span class="ai-badge">Predeterminada</span>':""}
        </div>
        <span class="ai-line ai-name">${e.fullName}</span>
        <span class="ai-line">${d}</span>
        <span class="ai-line">${s}</span>
        <span class="ai-line">RUT ${e.rut} · ${e.phone}</span>
        <div class="ai-actions">
          ${e.isDefault?"":`<button class="ai-default" data-id="${e.id}">Hacer predeterminada</button>`}
          <button class="ai-delete" data-id="${e.id}">Eliminar</button>
        </div>`,l.appendChild(t)}),a("addr-empty").hidden=n.length>0,a("addr-max").hidden=n.length<o,a("btn-add").hidden=n.length>=o||!r.hidden}async function c(){try{n=await p(),u()}catch(e){a("addr-loading").hidden=!0,i.textContent=e instanceof Error?e.message:"Error al cargar",i.hidden=!1}}l.addEventListener("click",async e=>{const d=e.target.closest("button[data-id]");if(!d)return;const s=d.dataset.id;try{if(d.classList.contains("ai-default"))await m(s);else if(d.classList.contains("ai-delete")){if(!confirm("¿Eliminar esta dirección?"))return;await f(s)}await c()}catch(t){i.textContent=t instanceof Error?t.message:"Error",i.hidden=!1}});a("btn-add").addEventListener("click",()=>{r.hidden=!1,h.hidden=!1,a("btn-add").hidden=!0});document.addEventListener("address:created",()=>{r.hidden=!0,c()});document.addEventListener("address:cancel",()=>{r.hidden=!0,u()});c();
