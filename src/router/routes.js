const routes = [
  {
    path: "/home",
    component: () => import("layouts/principal.vue"),
    children: [
      {
        path: "/home",
        name: "PageHome",
        component: () => import("pages/Home.vue"),
      },
      {
        path: "/home/comovotar",
        component: () => import("pages/ComoVotar.vue"),
      },
      {
        path: "/home/resultado",
        component: () => import("pages/Resultado.vue"),
      },
      {
        path: "/home/votar",
        name: "home",
        component: () => import("pages/Votar.vue"),
      },
      {
        path: "/home/votacionActiva",
        name: "eleccionVoto",
        component: () => import("pages/EleccionVoto.vue"),
      },
      {
        path: "/home/detalleMiVoto",
        name: "detalle",
        component: () => import("src/pages/DetalleMiVoto.vue"),
      },
    ],
  },
  {
    path: "/desktop",
    component: () => import("layouts/desktop.vue"),
    children: [
      {
        path: "/desktop",
        name: "PageDesktop",
        component: () => import("pages/Desktop.vue"),
      },
      { path: "/desktop/admin", name: "adminElecciones", component: () => import("pages/admin.vue") },
      {
        path: "/desktop/administracionCandidatos/:id",
        name: "admincandidatos",
        component: () => import("src/pages/AdministracionCandidatos.vue"),
      },
      {
        path: "/desktop/editarEleccion/:id",
        name: "editareleccion",
        component: () => import("src/pages/EditarEleccion.vue"),
      },
      {
        path: "/desktop/verEleccion/:id",
        name: "vereleccion",
        component: () => import("src/pages/VerEleccion.vue"),
      },
      {
        path: "/desktop/padron",
        name: "padron"
        , component: () => import("pages/padron.vue")
      },
      {
        path: "/desktop/padronNuevo",
        name: "nuevoRegistro",
        component: () => import("pages/padronNuevo.vue"),
      },
    ],
  },
  {
    path: "/blockchain",
    component: () => import("layouts/blockchain.vue"),
    children: [
      { path: "index", component: () => import("pages/indexBlockchain.vue") },
      {
        path: "/blockchain/blocks",
        component: () => import("pages/blocks.vue"),
      },
      { path: "/blockchain/block", component: () => import("pages/hash.vue") },
      {
        path: "/blockchain/about",
        component: () => import("pages/aboutBlockchain.vue"),
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/login.vue"),
    children: [
      { path: "", component: () => import("pages/Registrarse.vue") },
      { path: "/login", component: () => import("pages/Index.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it.

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
