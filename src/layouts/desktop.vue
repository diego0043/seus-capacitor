<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Panel de Administracion
          <!--<q-btn color="primary" label="Votacion" href="#/desktop" />-->
        </q-toolbar-title>

        <!--<q-separator dark vertical />

        <q-btn stretch flat label href="#/desktop">
          <q-fab v-model="fab1" label="Inicio" color="blue" icon="home">
          </q-fab>
        </q-btn>

        <q-separator dark vertical />

        <q-btn stretch flat label href="#/votar">
          <q-fab v-model="fab1" label="Votar" color="blue" icon="assignment">
          </q-fab>
        </q-btn>

        <q-separator dark vertical />

        <q-btn stretch flat label href="#/resultado">
          <q-fab v-model="fab1" label="Resultado" color="blue" icon="timeline">
          </q-fab>
        </q-btn>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="300"
      :breakpoint="400"
    >
      <q-img
        class="absolute-top"
        src="https://fondosmil.com/fondo/3041.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img
              src="https://thumbs.dreamstime.com/b/icono-del-var%C3%B3n-del-usuario-ninguna-cara-43652345.jpg"
            />
          </q-avatar>
          <div class="text-weight-bold">Administrador</div>
          <div>@ues.edu.sv</div>
        </div>
      </q-img>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item-label header> Menú del Panel Administración </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Home",

    icon: "home",
    link: "/#/desktop",
  },
  {
    title: "Administrar Elecciones",
    icon: "how_to_vote",
    link: "#/desktop/admin",
  },
  {
    title: "Administrar Comite Electoral",

    icon: "manage_accounts",
    link: "#/desktop/padron",
  },
  {
    title: "Cerrar Sesion",

    icon: "logout",
    link: "#/",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
