import{u,p as v,r as c,o as _,b as p,q as a,e as n,x as i,d as m,w as k,y as l}from"./vendor.299eaf2a.js";import{a as g}from"./index.a5c26f55.js";import{_ as h}from"./index.f5c93a7a.js";const x={name:"admin",setup(){const t=u();return{checkSuccess:v(!1),signout:async()=>{try{await g.auth.logout(),t.push({name:"Login"})}catch(o){alert(o.message)}}}}},w={class:"navbar navbar-expand-lg navbar-dark bg-primary"},$={class:"container-fluid"},N=a("a",{class:"navbar-brand text-secondary",href:"#"},"Navigant",-1),y=a("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbar","aria-controls":"navbar","aria-expanded":"false","aria-label":"Toggle navigation"},[a("span",{class:"navbar-toggler-icon"})],-1),C={class:"collapse navbar-collapse text-white",id:"navbar"},S={class:"navbar-nav"},V=l("\u7522\u54C1"),j=l("\u8A02\u55AE"),B=l("\u512A\u60E0\u5238");function T(t,s,d,o,f,b){const e=c("router-link");return _(),p("nav",w,[a("div",$,[N,y,a("div",C,[a("div",S,[n(e,{to:"/admin/products",class:"nav-link text-white"},{default:i(()=>[V]),_:1}),n(e,{to:"/admin/orders",class:"nav-link text-white"},{default:i(()=>[j]),_:1}),n(e,{to:"/admin/coupons",class:"nav-link text-white"},{default:i(()=>[B]),_:1}),m(' <router-link to="/admin/article" class="nav-link">\u8CBC\u6587</router-link> '),a("a",{href:"#",onClick:s[0]||(s[0]=k((...r)=>t.logout&&t.logout(...r),["prevent"])),class:"nav-link text-white"},"\u767B\u51FA")]),m(` <div class="navbar-nav ms-auto">
          <router-link to="/" class="nav-link text-white">\u524D\u53F0\u9801\u9762</router-link>
          <router-link to="/cart" class="nav-link text-white"
            >\u8CFC\u7269\u8ECA</router-link
          >
        </div> `)])])])}var q=h(x,[["render",T]]);const E={name:"admin",components:{Navbar:q},setup(){return u(),{checkSuccess:v(!1)}}},L={class:"container-fluid mt-3 position-relative"};function M(t,s,d,o,f,b){const e=c("Navbar"),r=c("router-view");return _(),p("div",null,[n(e),a("div",L,[n(r)])])}var D=h(E,[["render",M]]);export{D as default};
