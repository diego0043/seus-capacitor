<template>
  <div class="flex flex-center">
    <h1 id="titulo">Resultados de Elecciones</h1>
  </div>
  <div aling="center" class="flex flex-center">
    <h5
      id="Indica"
      style="font-family: fantasy, 'Courier New', Courier, monospace"
    >
      Ver datos generales acerca de:
    </h5>

    <q-card style="min-width: 280px; width: 75%">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="usuarios" label="Usuarios" />
        <q-tab name="elecciones" label="Elecciones Registradas" />
        <q-tab name="blockchain" label="Blockchain" />
        <q-tab name="votos" label="Votos" />
      </q-tabs>

      <q-separator />

      <!-- pestañas -->

      <q-tab-panels v-model="tab" animated>
        <!-- pestaña usuarios -->

        <q-tab-panel name="usuarios">
          <div class="row flex-center">
            <div class="col-10 qfield">
              <q-field
                rounded
                outlined
                label="Usuarios Registrados"
                stack-label
                style="font-size: large"
              >
                <template v-slot:prepend>
                  <span
                    class="material-icons text-primary"
                    style="font-size: 3rem"
                  >
                    person
                  </span>
                </template>

                <template v-slot:label>
                  <span
                    class="text-weight-bold text-deep"
                    style="font-size: large"
                    >Usuarios Registrados</span
                  >
                </template>

                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    2398
                  </div>
                </template>
              </q-field>
            </div>
          </div>

          <div class="row flex-center">
            <div class="col-10 qfield">
              <q-field
                rounded
                outlined
                label="Usuarios Verificados"
                stack-label
                style="font-size: large"
              >
                <template v-slot:label>
                  <span
                    class="text-weight-bold text-deep"
                    style="font-size: large"
                    >Usuarios Verificados</span
                  >
                </template>
                <template v-slot:prepend>
                  <span
                    class="material-icons text-primary"
                    style="font-size: 3rem"
                    >account_circle</span
                  >
                </template>

                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    1230
                  </div>
                </template>
              </q-field>
            </div>
          </div>
        </q-tab-panel>

        <!-- Pestaña elecciones -->

        <q-tab-panel name="elecciones">
          <div class="q-pa-xs row items-start q-gutter-md flex flex-center">
            <q-card
              v-for="item in elecciones"
              :key="(item, index)"
              class="mycard"
            >
              <div class="row">
                <span
                  class="material-icons"
                  style="font-size: 250%; color: #5c5c5c"
                >
                  how_to_vote
                </span>
                <div
                  class="text-h6 q-mb-xs"
                  style="
                    font-size: large;
                    font-family: fantasy;
                    font-weight: 45;
                    font-style: oblique;
                    color: #001a57;
                  "
                >
                  {{ item.eleccion }}
                </div>
              </div>

              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <span
                      class="material-icons text-primary"
                      style="font-size: 200%"
                    >
                      today
                    </span>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Realizada</q-item-label>
                    <q-item-label caption>{{ item.fecha }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <span
                      class="material-icons text-primary"
                      style="font-size: 200%"
                    >
                      groups
                    </span>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Candidatos</q-item-label>
                    <q-item-label caption>{{
                      item.Nuncandidatos
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-tab-panel>
        <!-- Pestaña votos -->

        <q-tab-panel name="votos">
          <div class="row flex flex-center">
            <div class="col-10 qfield">
              <q-field
                rounded
                outlined
                label="Usuarios Registrados"
                stack-label
                style="font-size: large"
              >
                <template v-slot:prepend>
                  <span
                    class="material-icons text-primary"
                    style="font-size: 250%; margin-right: 15px"
                  >
                    how_to_vote
                  </span>
                </template>

                <template v-slot:label>
                  <span
                    class="text-weight-bold text-deep"
                    style="font-size: large"
                    >Total de Votos registrados</span
                  >
                </template>

                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">
                    3903
                  </div>
                </template>
              </q-field>
            </div>
          </div>
          <!-- targetas de votos en cada eleccion -->

          <div class="q-pa-md row items-start q-gutter-md flex flex-center">
            <q-card
              v-for="item in elecciones"
              :key="(item, index)"
              class="mycard2"
            >
              <div class="row">
                <span
                  class="material-icons text-primary"
                  style="font-size: 250%"
                >
                  how_to_vote
                </span>
                <div
                  class="text-h6 q-mb-xs"
                  style="
                    font-size: large;
                    font-family: fantasy;
                    font-weight: 45;
                    font-style: oblique;
                    color: #001a57;
                  "
                >
                  {{ item.eleccion }}
                </div>
              </div>

              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <span
                      class="material-icons"
                      style="font-size: 200%; color: #a3a3a3"
                    >
                      poll
                    </span>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>Votos:</q-item-label>
                    <q-item-label caption style="font-size: medium">{{
                      item.votos
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </q-tab-panel>
        <!-- Pestaña blockchain -->
        <q-tab-panel name="blockchain">
          <q-banner class="bg-grey-3">
            <template v-slot:avatar>
              <q-icon name="file_present" color="blue" />
            </template>
            <div
              class="text-subtitle1 text-weight-medium"
              style="
                font-size: large;
                font-family: fantasy;
                font-weight: 45;
                font-style: oblique;
                color: #001a57;
              "
            >
              Visualice información de las votaciones través <br />de la base de
              datos Blockchain
            </div>

            <template v-slot:action>
              <q-btn
                outline
                rounded
                color="primary"
                label="blockchain"
                href="#/blockchain/index"
              />
            </template>
          </q-banner>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>

  <!--fin de tab -->

  <br />
  <br />
  <!-- Pestaña desplegables -->
  <div class="flex flex-center">
    <h5
      id="Indica"
      style="font-family: fantasy, 'Courier New', Courier, monospace"
    >
      Datos de resultados:
    </h5>
    <div class="q-pa-md" style="min-width: 280px; width: 79%">
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          expand-separator
          v-for="item in elecciones"
          :key="(item, index)"
          ><q-separator />
          <template v-slot:header>
            <q-item-section avatar>
              <q-avatar
                icon="how_to_vote"
                color="primary"
                text-color="white"
                size="3em"
              />
            </q-item-section>

            <q-item-section
              style="
                font-size: large;
                font-family: fantasy;
                font-weight: 45;
                font-style: oblique;
                color: #001a57;
              "
              >{{ item.eleccion }}</q-item-section
            >

            <q-item-section side>
              <div class="row items-center">
                <q-icon name="insights" color="primary" size="24px" />
              </div>
            </q-item-section>
          </template>

          <q-card>
            <q-card-section>
              <div class="row">
                <div class="col">
                  <q-card>
                    <q-table
                      class="q-mt-md"
                      title="Resultados"
                      :columns="colums"
                      :rows="rows"
                    >
                    </q-table>
                  </q-card>
                </div>
              </div>
              <q-card>
                <img
                  alt="minerva"
                  src="~assets/Graficas.png"
                  style="width: 600px; height: 400px"
                  class=""
                />
                <q-table title="" no-data-label="Gracias por consultar">
                </q-table>
                <q-card-section> </q-card-section>
              </q-card>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
  <!--fin de tab -->
</template>

<script>
const colums = [
  {
    name: "planilla",
    required: true,
    label: "Planilla",
    align: "left",
    field: "Planilla",
    sortable: true,
  },
  {
    name: "Voto",
    required: true,
    label: "Voto",
    align: "left",
    sortable: true,
    field: "Voto",
  },

  {
    name: "Porcentaje",
    required: true,
    label: "Porcentaje(%)",
    align: "left",
    sortable: true,
    field: "Porcentaje",
  },
];

const rows = [
  {
    Planilla: "planilla 1",
    Voto: "140",
    Porcentaje: "35%",
  },

  {
    Planilla: "Planilla 2",
    Voto: "200",
    Porcentaje: "35%",
  },

  {
    Planilla: "Planilla 3",
    Voto: "140",
    Porcentaje: "35%",
  },

  {
    Planilla: "Nulos",
    Voto: "140",
    Porcentaje: "35%",
  },

  {
    Planilla: "Abstenciones",
    Voto: "140",
    Porcentaje: "35%",
  },
];

export default {
  data() {
    return {
      tab: "usuarios",
      colums,
      rows,

      //para elecciones registradas
      elecciones: [
        {
          eleccion: "Elección A",
          fecha: "12/03/2022",
          Nuncandidatos: "6",
          votos: "234",
        },
        {
          eleccion: "Elección B",
          fecha: "13/03/2022",
          Nuncandidatos: "4",
          votos: "634",
        },
        {
          eleccion: "Elección C",
          fecha: "12/03/2022",
          Nuncandidatos: "5",
          votos: "734",
        },
      ],
      iteraciones: ["Elección A", "Elección B"],
      //fin script elecciones registradas
    };
  },
};
</script>
<!-- Aca agregue -->

<style>
@import "../css/titulo.css";

.qfield {
  margin-right: 10%;
  margin-left: 10%;
  margin-top: 5px;
}

/*style de tarjetas de elecciones*/
.mycard {
  width: 100%;
  max-width: 200px;
  min-height: 150px;
  max-height: 400px;
}
.mycard2 {
  width: 100%;
  max-width: 200px;
  min-height: 100px;
  max-height: 300px;
}
</style>
