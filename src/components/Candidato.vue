<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card shadow-5">
      <q-card-section horizontal>
        <q-card-section class="col-4 flex flex-center">
          <q-img class="rounded-borders image" :src="candidato.imagen" />
        </q-card-section>
        <q-card-section class="q-pt-xs">
          <div class="text-overline">
            {{ candidato.partido }}
          </div>
          <div class="text-h5 container-name-candidato q-mt-sm q-mb-xs">
            <span class="name-candidato">
              {{ candidato.nombre }}
            </span>
          </div>
          <div class="text-caption text-grey">
            {{ candidato.descripcion }}
          </div>
        </q-card-section>
      </q-card-section>

      <q-card-actions>
        <button unelevated rounded class="btn-style" @click="persistent = true">
          <div class="q-ml-sm">Votar por {{ candidato.nombre }}</div>
        </button>
        <q-dialog
          v-model="persistent"
          persistent
          transition-show="jump-up"
          transition-hide="jump-down"
        >
          <q-card class="bg-white text-primary" style="width: 300px">
            <q-card-section>
              <q-card-section class="col-4 flex flex-center">
                <q-img class="rounded-borders image" :src="candidato.imagen" />
              </q-card-section>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">
                  {{ candidato.partido }}
                </div>
                <div class="text-h5 q-mt-sm q-mb-xs">
                  {{ candidato.nombre }}
                </div>
                <div class="text-caption text-grey">
                  {{ candidato.descripcion }}
                </div>
              </q-card-section>
            </q-card-section>

            <q-card-section
              class="q-pt-xs flex flex-center modal-style"
              style="font-size: 1.5em; font-weight: 900"
              >¿Estas seguro de tu voto?</q-card-section
            >

            <q-card-actions class="q-mb-lg bg-white text-teal">
              <div class="row">
                <div class="col">
                  <button
                    v-close-popup
                    class="btn-modal-primary"
                    @click="showCustom()"
                  >
                    SI, CONFIRMAR
                  </button>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col">
                  <button v-close-popup class="btn-modal-secondary">
                    CANCELAR
                  </button>
                </div>
              </div>
            </q-card-actions>
            <DispositivoTest />
          </q-card>
        </q-dialog>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { QSpinnerGears } from "quasar";
import { db } from "src/boot/db";
import { mapGetters } from "vuex";
import DispositivoTest from "./DispositivoTest.vue";

export default {
  data() {
    return {
      persistent: false,
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  components: {
    DispositivoTest,
  },
  computed: {
    ...mapGetters(["id_doc_actual", "carnet_usuario"]),
  },
  props: ["candidato", "nameVotacion", "index_candidato"],
  methods: {
    async updateParticipantes() {
      const id_doc = this.id_doc_actual;
      const doc = await db.collection("elecciones").doc(id_doc).get();
      const docRef = db.collection("elecciones").doc(id_doc);
      const doc_data = doc.data();
      let arrayParticipantes = doc_data.participantes;
      let votos_candidato = doc_data.candidatos;
      votos_candidato[this.index_candidato].votos =
        votos_candidato[this.index_candidato].votos + 1;
      arrayParticipantes.push(this.carnet_usuario);
      await docRef.update({
        candidatos: votos_candidato,
        participantes: arrayParticipantes,
      });
    },
    showCustom() {
      const dialog = this.$q.dialog({
        src: "../assets/guardando_voto",
        title: "Guardando voto en Blockchain...",
        dark: false,
        message: "0%",
        progress: {
          spinner: QSpinnerGears,
          color: "primary",
        },
        persistent: true,
        ok: false, // we want the user to not be able to close it
      });
      this.updateParticipantes();
      // we simulate some progress here...
      let percentage = 0;
      const interval = setInterval(() => {
        percentage = Math.min(100, percentage + Math.floor(Math.random() * 22));
        // we update the dialog
        dialog.update({
          message: `${percentage}%`,
        });
        // if we are done...
        if (percentage === 100) {
          clearInterval(interval);
          dialog.update({
            title: "Hecho!",
            message: `Se guardo su voto exitosamente`,
            progress: false,
            ok: true,
          });
          this.$router.push({
            name: "detalle",
            params: { nameVotacion: this.nameVotacion },
          });
        }
      }, 500);
    },
  },
  components: { DispositivoTest },
};
</script>

<style lang="scss" scoped>
.my-card {
  width: 90%;
  margin-left: 7%;
  padding: 10px;
  border-radius: 16px;
  height: 220px;
}

.image {
  max-height: 250px;
}

.container-name-candidato {
  width: 220px;
}

.name-candidato {
  color: #699bf7;
  font-size: 1em;
  font-weight: bold;
}

.btn-style {
  border-radius: 15px;
  min-width: 140px;
  width: 70%;
  background-color: white;
  color: #699bf7;
  border: 1px solid #699bf7;
  padding-bottom: 5px;
  padding-top: 5px;
  position: absolute;
  bottom: 20px;
  right: 50px;
}

.btn-modal-primary {
  border: none;
  border-radius: 15px;
  width: 130px;
  background-color: #699bf7;
  color: white;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-left: 5px;
}

.btn-modal-secondary {
  border: 1px solid #699bf7;
  border-radius: 15px;
  width: 130px;
  background-color: white;
  color: #699bf7;
  padding-bottom: 5px;
  padding-top: 5px;
  margin-left: 15px;
}

.modal-style {
  width: 300px;
}

.btn-style:hover {
  background-color: rgba(105, 155, 247, 0.06);
}

.btn-style:active {
  color: white;
  background-color: #699bf7;
}
</style>
