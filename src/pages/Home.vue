<template>
  <q-page class="flex flex-center">
    <verificacion />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Verificacion from "src/components/Verificacion.vue";

export default defineComponent({
  name: "PageHome",
  components: {
    Verificacion,
  },
});
</script>
