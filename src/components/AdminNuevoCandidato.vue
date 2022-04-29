<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      label="Agregar Nuevo Candidato"
      color="secondary"
      icon="person_add"
      @click="fixed = true"
    />

    <q-dialog v-model="fixed">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section class="bg-light-green-8">
          <div class="text-white text-h5">Nuevo Candidato</div>
        </q-card-section>

        <q-separator />

        <q-card-section
          style="max-height: 50vh bg-light-green-3"
          class="scroll"
        >
          <div class="row" justify-center>
            <div class="col" style="margin-top: 20px; margin-left: 30px">
              <div class="col">
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
                    label="Agregue Una Foto"
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
                    v-model="nombrecandidato"
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
                  v-model="editor"
                  :definitions="{
                    bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' },
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
export default {
  data() {
    return {
      basic: false,
      fixed: false,
    };
  },
  data() {
    return {
      model: null,
      options: ["Nueva Minerva", "FMLUES", "Partido UES"],
      text: "",
      descripcion: "",
      propietario: "",
      editor: "Agregue nombre de suplente y propietario/a",
    };
  },
};
</script>
