<template>
  <div class="q-pa-md">
    <h4 align="center" class="flex flex-center">
      Candidatos para {{ eleccion.nombre }}
    </h4>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        push
        round
        color="secondary"
        icon="arrow_back_ios_new"
        @click="$router.push({ path: '/desktop/admin' })"
      />
    </q-page-sticky>
    <div align="center" class="flex flex-center"><AdminNuevoCandidato /></div>
  </div>
  <div class="col-2 q-pa-md">
    <q-card
      class="q-pa-md my-card q-my-sm"
      flat
      bordered
      style="heigth: 300px; width: 700px; margin-left: 160px"
      v-if="candidatos.length == 0"
      clickable
      v-ripple
    >
      <q-item horizontal class="q-my-sm">
        <q-item-section>
          <q-item-label style="font-weight: bold"
            >Aun NO hay candidatos en esta elección.</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-card>
    <q-card
      class="q-pa-md my-card q-my-sm"
      flat
      bordered
      style="heigth: 300px; width: 700px; margin-left: 160px"
      v-for="(candidato, key) in candidatos"
      :key="key"
    >
      <q-item horizontal class="q-my-sm">
        <q-item-section>
          <q-img
            style="height: 140px; width: 200px"
            class="col-2 justify-around q-px-md"
            :src="candidato.imagen"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label style="font-weight: bold">{{
            candidato.nombre
          }}</q-item-label>
          <q-item-label>{{ candidato.descripcion }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <EditarCandidato></EditarCandidato>
        </q-item-section>

        <q-separator />
      </q-item>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AdminNuevoCandidato from "components/AdminNuevoCandidato";
import EditarCandidato from "components/EditarCandidato";
import { db } from "../boot/db";
import { ref } from "vue";

export default defineComponent({
  components: {
    AdminNuevoCandidato,
    EditarCandidato,
  },
  setup() {
    return { confirm: ref(false) };
  },
  data() {
    return {
      id: "",
      eleccion: [],
      candidatos: [],
    };
  },
  methods: {
    leerDatos() {
      const docRef = db.collection("elecciones").doc(this.$route.params.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            let eleccion = {
              descripcion: doc.data().descripcion,
              fechaDesde: doc.data().fechaDesde.toDate().toLocaleString(),
              fechaHasta: doc.data().fechaHasta.toDate().toLocaleString(),
              nombre: doc.data().nombre,
            };
            this.eleccion = eleccion;
            this.candidatos = doc.data().candidatos;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
  created() {
    this.leerDatos();
  },
});
</script>

<style></style>
