<template>
  <div>
    <!--Boton para editar candidato-->
    <q-item-label align="right">
      <q-btn
        round
        color="secondary"
        icon="edit"
        size="md"
        glossy
        @click="confirm = true"
      />
    </q-item-label>
    <!--Boton para eliminar candidato-->
    <q-item-label align="right">
      <q-btn round color="red" icon="delete" size="md" glossy />
    </q-item-label>
    <q-dialog v-model="confirm" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="bg-secondary">
          <div class="text-white text-h5">
            <q-icon name="edit" size="md"></q-icon>Editar Candidato
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh bg-light-green-3"
          class="scroll"
        >
          <div class="row" justify-center>
            <div class="col" style="margin-top: 20px; margin-left: 30px">
              <div class="col">
                <p class="text-subtitle1">Imagen actual</p>
                <q-img
                  style="height: 140px; width: 200px"
                  class="col-2 justify-around q-px-md"
                  src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_960_720.png"
                />
              </div>
            </div>
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-sm row items-start">
                  <q-uploader
                    url="http://localhost:4444/upload"
                    label="Cambiar fotografía"
                    color="teal"
                    flat
                    bordered
                    style="max-width: 300px"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col">
              <div class="q-pa-md text-h6">Nombre:</div>
            </div>
            <div class="col">
              <div class="q-pa-md">
                <div class="q-gutter-md" style="max-width: 300px">
                  <q-input
                    standout="bg-teal text-white"
                    v-model="nombre"
                    label="Nombre de Partido"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row" justify-center>
            <div class="col">
              <div class="q-pa-md text-h6">Descripción:</div>
            </div>
            <div class="col">
              <div class="q-pa-md q-gutter-sm">
                <q-editor
                  v-model="descripcion"
                  :definitions="{
                    bold: {
                      label: 'Bold',
                      icon: null,
                      tip: 'My bold tooltip',
                    },
                  }"
                />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Salir" color="secondary" v-close-popup />
          <q-btn flat label="Guardar" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return { confirm: ref(false) };
  },
  data() {
    return {
      descripcion: "",
      nombre: "",
      imagen: "",
    };
  },
});
</script>
