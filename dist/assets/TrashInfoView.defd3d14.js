import{r as c,l,o as _,c as h,b as n,t as e,d as u}from"./index.efd97428.js";import{_ as f}from"./plugin-vue_export-helper.21dcd24c.js";const d={name:"TrashInfo",props:{plan_id:Number,trash_id:Number,zone_id:Number},data(){return{trash_info:g(this.plan_id,this.trash_id,this.zone_id)}}},p={}.VITE_API_HOST||"http://localhost:8080",m=p;function g(r,t,s){console.log(t);let a=c({});return fetch(m+"/rifiuto/toclassify?"+new URLSearchParams({id_zona:s}),{method:"GET",headers:{"Content-Type":"application/json","x-access-token":l.token}}).then(o=>o.json()).then(function(o){Array.isArray(o)||(o=[o]),console.log(o);for(let i=0;i<o.length;i++)o[i]._id===t&&(a.value=o[i])}).catch(o=>console.error(o)),console.log(a),l.currentTrash=t,a}const z=n("h1",null,"Dettagli rifiuto non riconosciuto",-1),T=n("h2",null,"Foto",-1),$=["src"];function I(r,t,s,a,o,i){return _(),h("form",null,[z,n("ul",null,[n("li",null,"ID: "+e(this.trash_info._id),1),n("li",null,"Zona: "+e(this.trash_info.id_zona),1),n("li",null,"Stato classificazione: "+e(this.trash_info.classificazione),1),n("li",null,"Posizione rilevata: "+e(this.trash_info.posizione),1),n("button",{onClick:t[0]||(t[0]=b=>r.classifyTrash(this.trash_info._id))},"Classifica"),T,n("img",{src:this.trash_info.URL_foto,width:"500",height:"400"},null,8,$)])])}var y=f(d,[["render",I]]);const S={setup(r){return(t,s)=>(_(),h("main",null,[u(y,{org_name:t.$route.params.org_name,plan_id:t.$route.params.plan_id,trash_id:t.$route.params.trash_id,zone_id:t.$route.query.id_zona},null,8,["org_name","plan_id","trash_id","zone_id"])]))}};export{S as default};
