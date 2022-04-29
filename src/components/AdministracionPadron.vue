<template>
  <div>
    <div class="container">
      <div class="text-h4"><b>Comite Electoral</b></div>
      <div class="row">
        <div class="col-12">
          <div class="row justify-end items-center">
            <div class="text-subtitle-1 q-mx-sm">Buscar:</div>
            <q-input outlined v-model="search" dense>
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-12">
          <div class="row justify-between q-mt-md">
            <div class="row items-center">
              <q-btn push label="Excel" />
              <q-btn push label="CSV" class="q-mx-sm" />
              <q-btn push label="PDF" />
            </div>
            <div class="row">
              <q-btn
                push
                icon="update"
                to="PadronNuevo"
                label="Agregar nuevo registro"
              />
            </div>
          </div>
        </div>
        <div class="col-12 q-mt-md">
          <q-table :rows="comite" :columns="columns" row-key="name">
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
                <q-td auto-width>
                  <q-btn-group>
                    <q-btn
                      label="ELIMINAR"
                      icon="visibility"
                      @click="borrarDato(props.row.id)"
                      dense
                    ></q-btn>
                    <q-btn label="EDITAR" icon="update" dense></q-btn>
                    <!-- <pre>{{ props.row.id }}</pre>-->
                  </q-btn-group>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { db } from "../boot/db";

export default defineComponent({
  name: "AdministracionPadron",

  data() {
    return {
      search: "Gorgito",
      columns,
      comite: [],
    };
  },
  methods: {
    async leerDatos() {
      this.comite = [];
      try {
        const docRef = await db.collection("comiteelectoral").get();
        docRef.forEach((doc) => {
          let padroncomite = doc.data();
          padroncomite.id = doc.id;
          this.comite.push(padroncomite);
        });
      } catch (error) {
        console.error(error);
      }
    },
    async borrarDato(id) {
      try {
        await db.collection("comiteelectoral").doc(id).delete();
        this.leerDatos();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    await this.leerDatos();
  },
  props: {},
});
const columns = [
  {
    name: "nombre",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.nombre,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "carnet",
    label: "Carnet",
    field: "carnet",
    sortable: true,
    align: "left",
  },
  {
    name: "carrera",
    label: "Carrera",
    field: "carrera",
    sortable: true,
    align: "left",
  },
  { name: "dui", label: "DUI", field: "dui", align: "left" },
  { name: "direccion", label: "Direccion", field: "direccion", align: "left" },
];
</script>
