<template>
  <div class="q-pa-md">
    <h4 align="center" class="flex flex-center">
      Editar Elección: {{ $route.params.id }}
    </h4>
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn
        push
        round
        color="primary"
        icon="arrow_back_ios_new"
        @click="$router.push({ path: '/desktop/admin' })"
      />
    </q-page-sticky>
  </div>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Nombre de Elección</div>
          </div>
          <div class="col">
            <q-input
              outlined
              v-model="text"
              color="green"
              :label="eleccion.nombre"
              counter
              maxlength="12"
            >
              <template v-slot:hint> Maximo 12 letras. </template>
            </q-input>
          </div>
        </div>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Fecha de habilitación</div>
          </div>
          <div class="col">
            <q-input
              v-model="date"
              color="green"
              outlined
              mask="date"
              :rules="['date']"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    ref="qDateProxy"
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" color="green">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="green" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato año/mes/día</template>
            </q-input>
          </div>
        </div>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Hora de Inicio</div>
          </div>
          <div class="col">
            <q-input
              color="green"
              outlined
              v-model="timeWithSeconds"
              mask="fulltime"
              :rules="['fulltime']"
              with-seconds
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="timeWithSeconds"
                      with-seconds
                      format24h
                      color="green"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat color="green" />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato de 24 hrs.</template>
            </q-input>
          </div>
        </div>
        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Hora de cierre</div>
          </div>
          <div class="col">
            <q-input
              color="green"
              outlined
              v-model="time2WithSeconds"
              mask="fulltime"
              :rules="['fulltime1']"
              with-seconds
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer" color="green">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time
                      v-model="time2WithSeconds"
                      with-seconds
                      format24h
                      color="green"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" flat color="green" />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:hint>Formato de 24 hrs.</template>
            </q-input>
          </div>
        </div>

        <div class="row" justify-center>
          <div class="col" style="margin-top: 20px">
            <div class="text-subtitle1">Descripción</div>
          </div>
          <div class="col">
            <div class="q-pa-xs" style="max-width: 700px">
              <q-input
                outlined
                v-model="textDes"
                color="green"
                :label="eleccion.descripcion"
                counter
                maxlength="200"
                autogrow
              >
                <template v-slot:hint> Maximo 200 letras. </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card-actions align="right">
      <q-btn
        flat
        icon="save_alt"
        style="background: green; color: white"
        label="GUARDAR"
      />
      <q-btn
        flat
        icon="cleaning_services"
        style="background: indigo; color: white"
        label="LIMPIAR"
      />
      <q-btn
        flat
        icon="cancel"
        style="background: red; color: white"
        label="CANCELAR"
        @click="
          $router.push({
            path: '/desktop/admin',
          })
        "
      />
    </q-card-actions>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "../boot/db";
export default {
  setup() {
    return {
      date: ref("2022/06/22"),
      timeWithSeconds: ref("10:56:00"),
      time2WithSeconds: ref("20:56:00"),
      text: ref(""),
      textDes: ref(""),
    };
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
};
</script>

<style>
h4 {
  margin-top: 0px;
}
.q-pa-md {
  margin-left: 20px;
  margin-right: 20px;
}
.row {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
