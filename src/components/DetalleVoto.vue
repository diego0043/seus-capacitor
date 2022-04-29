<template>
  <div class="col-12 bg-white">
    <q-page>
      <div class="flex flex-center">
        <h1 id="titulo">DETALLE DE TU VOTO</h1>
      </div>

      <div class="flex flex-center q-mb-xl">
        <div class="contenedor">
          <!-- foto y info del candidato-->
          <div class="row bg-white shadow-5 card-principal">
            <div class="col-4">
              <q-img
                class="image container-img"
                src="../assets/personal_info2.svg"
              />
            </div>
            <!-- Informacion de la eleccion -->
            <div class="col q-mt-md q-ml-md">
              <div class="titulo">DATOS DE LA ELECCIÓN</div>

              <div class="q-ml-lg q-mt-sm q-mb-sm sub-principal">
                NOMBRE DE LA ELECCIÓN<br />
                <span class="text-weight-regular text-grey-8">{{
                  nameVotacion
                }}</span>
              </div>
              <div class="q-ml-lg q-mt-xs q-mb-sm sub-principal">
                INICIO EL DÍA<br />
                <span class="text-weight-regular text-grey-8">22/03/2022</span>
              </div>
              <div class="q-ml-lg q-mt-xs sub-principal">
                TERMINO EL DÍA<br />
                <span class="text-weight-regular text-grey-8">01/04/2022</span>
              </div>
            </div>
          </div>

          <!-- DIA -->
          <div class="row q-mt-xl bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/date.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row">DÍA</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8">
                {{ datos.dia }}
              </div>
            </div>
          </div>

          <!-- HORA -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/watch.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row">HORA</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8">
                {{ datos.hora }}
              </div>
            </div>
          </div>

          <!-- GPS -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/gps.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row">GPS</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8">
                {{ datos.gps }}
              </div>
            </div>
          </div>

          <!-- ID BLOCKCHAIN -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/server.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row">
                <div class="col-9">
                  <div class="row">ID BLOQUE</div>

                  <div class="row q-mt-sm text-weight-regular text-grey-8">
                    {{ datos.id_block }}
                  </div>
                </div>
                <div class="col">
                  <button class="btn-style-copy">
                    <q-icon class="icon-copy" name="content_copy" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- DISPOSITIVO -->
          <div class="row q-mt-lg bg-white card-info shadow-5">
            <div class="col text-informacion text-grey-8">
              <q-img
                class="img-info"
                src="../assets/assets_detalleVoto/phone.svg"
              >
              </q-img>
            </div>

            <div class="col-8 q-ml-md mt sub-titulos">
              <div class="row">DISPOSITIVO</div>

              <div class="row q-mt-sm text-weight-regular text-grey-8">
                {{ datos.dispositivo }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  props: {
    nameVotacion: String,
    url_imagen: String,
  },
  data() {
    return {
      iteraciones: [
        "Elección A",
        "Elección B",
        "Elección C",
        "Elección D",
        "",
        "",
      ],
      datos: {
        dia: null,
        hora: null,
        gps: null,
        id_block: null,
        dispositivo: null,
      },
    };
  },
  mounted() {
    let date = new Date();
    let dia =
      String(date.getDate()).padStart(2, "0") +
      "/" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "/" +
      date.getFullYear();

    let hora =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let gps = "Santa Ana, Santa Ana";
    let id_block = "cdc5de3302a3c0b0ef1";
    let dispositivo = "Poco X4 pro";

    this.datos.dia = dia;
    this.datos.hora = hora;
    this.datos.gps = gps;
    this.datos.id_block = id_block;
    this.datos.dispositivo = dispositivo;
  },

  methods: {
    toastMenssageCopy() {
      this.$q.notify({
        type: "positive",
        message: `Bloque copiado`,
      });
    },
  },
};
</script>

<style scoped>
@import "../css/titulo.css";

.contenedor {
  min-width: 80%;
  width: 90%;
  min-height: 55vh;
}

.titulo {
  display: inline-block;
  margin-left: -50px;
  font-weight: bold;
  font-size: 1.3rem;
  color: #699bf7;
}

#titulo {
  color: #699bf7;
  padding: 10px;
}

.sub-titulos {
  font-weight: bold;
  font-size: 1rem;
  margin-top: 5%;
  color: #699bf7;
}

.text-informacion {
  margin-top: 5%;
}

.card-info {
  height: 100px;
  border-radius: 18px;
}

.card-principal {
  border-radius: 20px;
  height: 240px;
}

.img-info {
  width: 70%;
  margin-top: -8px;
  margin-left: 15px;
}

.subtitulos-color {
  color: #699bf7;
  font-weight: bold;
}

.sub-principal {
  color: #699bf7;
  font-weight: bold;
}

.mt {
  margin-top: 20px !important;
}

.container-img {
  margin-left: 5px;
  margin-top: 60px;
  width: 135px;
}

.btn-style-copy {
  background-color: white;
  border: none;
  width: 50px;
  padding: 10px;
}

.icon-copy {
  color: grey;
  font-size: 2em;
}

.icon-copy:active {
  color: #699bf7;
}

@media (min-width: 500px) {
  .container-img {
    margin-left: 20px;
    margin-bottom: 0px;
    margin-top: 20px;
    width: 80%;
  }
}

@media (max-width: 350px) {
  .ml {
    margin-left: 13px;
  }
}
</style>
