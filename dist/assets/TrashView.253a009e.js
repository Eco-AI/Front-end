import{r as h,l as c,o as s,c as r,b as _,t as p,F as f,g,e as u,i as T,d as $,j as k}from"./index.8e29202f.js";import{_ as y}from"./plugin-vue_export-helper.21dcd24c.js";const z={}.VITE_API_HOST||"http://localhost:8080",d=z,v={name:"Trash",props:{org_name:String,plan_id:String},data(){return{listTrash:S(this.org_name,this.plan_id),zone_id:l}}},l=h(0);function S(e,a){let t=h([]);return fetch(d+"/piano_pulizia/organization/"+a,{method:"GET",headers:{"Content-Type":"application/json","x-access-token":c.token}}).then(o=>o.json()).then(function(o){l.value=o.ID_zona,console.log("zone_id: "+l.value),fetch(d+"/rifiuto/toclassify?"+new URLSearchParams({id_zona:o.ID_zona}),{method:"GET",headers:{"Content-Type":"application/json","x-access-token":c.token}}).then(n=>n.json()).then(function(n){console.log(n),t.value=n}).catch(n=>console.error(n))}).catch(o=>console.error(o)),console.log(t),t}const I={key:0};function L(e,a,t,o,n,V){const m=k("RouterLink");return s(),r("div",null,[_("h1",null,"Rifiuti non riconosciuti ("+p(e.$data.listTrash.length)+")",1),_("ul",null,[!Array.isArray(e.$data.listTrash)||!e.$data.listTrash.length?(s(),r("h3",I,"Non ci sono rifiuti da classificare")):(s(!0),r(f,{key:1},g(e.$data.listTrash,i=>(s(),r("li",{key:i},[u(m,{to:"/organisations/"+e.$props.org_name+"/plans/"+e.$props.plan_id+"/toclassify/"+i._id+"?id_zona="+n.zone_id},{default:T(()=>[$(p(i._id),1)]),_:2},1032,["to"])]))),128))])])}var R=y(v,[["render",L]]);const C={__name:"TrashView",setup(e){return(a,t)=>(s(),r("main",null,[u(R,{org_name:a.$route.params.org_name,plan_id:a.$route.params.id},null,8,["org_name","plan_id"])]))}};export{C as default};