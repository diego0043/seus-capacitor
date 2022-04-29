<template>
  <div>
    <AlertaVerificacion ref="AlertaVerificacion" />

    <!--Loader mientras la data no esta cargada-->

    <div class="row" v-if="data_cargada != true">
      <div class="col">
        <q-card class="my-card2" flat>
          <q-card-section>
            <q-img
              class="img-loading"
              width="300px"
              src="../assets/loading.svg"
            >
            </q-img>
          </q-card-section>
          <q-card-section> </q-card-section>
          <q-card-section class="text-grey text-h4 q-ml-md">
            <div class="row container">
              <div class="col-1 circular-item">
                <q-circular-progress
                  indeterminate
                  size="20px"
                  color="blue"
                  class="q-ma-md"
                />
              </div>
              <div class="col text-h5 q-mt-sm q-ml-md">
                <span class="text-loading">Cargando elecciones...</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Titulo -->
    <div v-if="data_cargada != false" aling="center" class="flex flex-center">
      <h1 id="titulo">Elecciones Universitarias</h1>
    </div>

    <!--Card eleccion -->
    <div v-if="data_cargada != false" class="flex flex-center">
      <q-card
        v-for="(item, index) in dataProcesada"
        :key="(item, index)"
        class="my-card q-mb-lg q-mt-sm card-style shadow-5"
        style="width: 360px"
      >
        <q-card-section class="text-grey-10">
          <!-- Nombre de la eleccion -->
          <div align="center" class="text-h5 titulo-card q-mb-sm">
            {{ item.nombre }}
          </div>
          <div align="center" class="text-caption text-grey-5 q-mb-sm">
            {{ item.descripcion }}
          </div>

          <!-- Fecha de inicio de la eleccion -->

          <div class="text-subtitle2">
            <!-- Inicia -->
            <span
              v-show="Date.parse(item.fechaDesde.toDate()) > Date.parse(Date())"
              class="flex flex-center"
            >
              <q-icon name="event_available" size="20px" />
              Inicia el:
              <strong>{{ item.fechaDesde.toDate().toLocaleString() }}</strong>
            </span>
            
            <!-- Fecha de finalizacion -->
            <span
              v-show="Date.parse(Date()) > Date.parse(item.fechaDesde.toDate()) & Date.parse(item.fechaHasta.toDate()) > Date.parse(Date())"
              class="flex flex-center"
            >
              <q-icon name="event" size="20px" />
              Finaliza el:
              <strong>{{ item.fechaHasta.toDate().toLocaleString() }}</strong>
            </span>

            <!-- Elecciones terminadas -->

            <span
              v-show="Date.parse(Date()) > Date.parse(item.fechaHasta.toDate())"
              class="flex flex-center"
            >
              <u> Elecciones terminadas </u>
            </span>
            
          </div>
        </q-card-section>

        <!-- Boton participar -->
        <q-card-actions
          align="center"
          class=""
          v-show="Date.parse(Date()) > Date.parse(item.fechaDesde.toDate()) & Date.parse(item.fechaHasta.toDate()) > Date.parse(Date())"
        >
          <!-- Boton Participar de mi voto: Solo se muestra si aun no ha votado -->
          <button
            v-if="item.ya_vote == false"
            @click="participarEleccion(isValidate, item.nombre, item.id_ref)"
            class="btn-style"
          >
            PARTICIPAR
          </button>

          <!-- Boton detalle de mi voto: Solo se muestra si ya ha votado -->
          <button
            v-if="item.ya_vote == true"
            @click="
              $router.push({
                name: 'detalle',
                params: { nameVotacion: item.nombre },
              })
            "
            class="btn-style"
          >
            DETALLE DE MI VOTO
          </button>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import AlertaVerificacion from "./AlertaVerificacion.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { AlertaVerificacion },
  data() {
    return {};
  },

  computed: {
    ...mapGetters([
      "dataProcesada",
      "data_cargada",
      "isValidate",
      "update_idVotacionActual",
    ]),
  },

  methods: {
    ...mapActions([
      "getCandidates",
      "fetch_Data_ordenada_elecciones",
      "isValidate_usr",
      "action_set_id_votacion_actual",
    ]),

    participarEleccion(isValidate, name, id) {
      if (isValidate) {
        this.getCandidates(id);
        this.action_set_id_votacion_actual(id);
        this.$router.push({
          name: "eleccionVoto",
          params: { nameVotacion: name },
        });
      } else {
        this.$refs.AlertaVerificacion.show();
      }
    },
  },

  created() {
    this.fetch_Data_ordenada_elecciones();
    this.isValidate_usr();
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Raleway:400,700,900,400italic,700italic,900italic);
@import "../css/titulo.css";

.btn-style {
  border-radius: 15px;
  min-width: 140px;
  width: 80%;
  background-color: white;
  color: #699bf7;
  border: 1px solid #699bf7;
  padding-bottom: 5px;
  position: absolute;
  bottom: 15px;
  padding-top: 5px;
}

.my-card2 {
  margin-top: 100px;
}

.img-loading {
  margin-left: 70px;
  height: 360px;
}

.btn-style:hover {
  background-color: rgba(105, 155, 247, 0.06);
}

.circular-item {
  width: 20px;
}

.btn-style:active {
  color: white;
  background-color: #699bf7;
}

#titulo {
  color: #699bf7;
  padding: 10px;
}

.card-style {
  width: 300px;
  border-radius: 16px;
  padding: 10px;
  height: 260px;
}

.text-loading {
  margin-left: 30px;
}

.titulo-card {
  color: grey;
  font-weight: bold;
}

span {
  margin-left: 5px;
}
strong {
  margin-left: 5px;
}
</style>
