import{r as f,f as m,o as n,c as a,b as s,u as e,F as l,g as z,d as i,h as u,R as _,l as k,e as h,t as y}from"./index.efd97428.js";const T=s("h1",null,"Organisations",-1),x={key:0},O=h("Crea un'organizzazione"),A={setup(d){const c={}.VITE_API_HOST||"http://localhost:8080";let o=f([]);function p(){fetch(c+"/utente/organisations",{method:"GET",headers:{"Content-Type":"application/json","x-access-token":k.token}}).then(t=>t.json()).then(function(t){o.value=t.nomi_organizzazioni}).catch(t=>console.error(t))}return m(()=>{p()}),(t,N)=>(n(),a(l,null,[s("div",null,[T,s("ul",null,[!Array.isArray(e(o))||!e(o).length?(n(),a("h3",x,"Non sei ancora iscritto a nessuna organizzazione")):(n(!0),a(l,{key:1},z(e(o),r=>(n(),a("li",{key:r},[i(e(_),{to:"/organisations/"+r+"/info"},{default:u(()=>[h(y(r),1)]),_:2},1032,["to"])]))),128))])]),s("div",null,[i(e(_),{to:"/organisations/create"},{default:u(()=>[O]),_:1})])],64))}},V={setup(d){return(g,c)=>(n(),a("main",null,[i(A)]))}};export{V as default};
