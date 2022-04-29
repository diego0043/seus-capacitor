<template>
  <div class="q-pa-md q-gutter-sm w-100 j" style="width: 600px">
    <div class="q-pa-md row items-start">
      <q-card class="my-card" flat bordered>
        <q-toolbar class="justify-between">
          <q-avatar v-if="!showAccess">
            <i class="fas fa-ban" style="color: red"></i>
          </q-avatar>
          <q-item-label style="color: red" v-if="!showAccess">
            Primera verificación pendiente
          </q-item-label>
          <q-avatar v-if="showAccess">
            <i class="fas fa-check-circle" style="color: green"></i>
          </q-avatar>
          <q-item-label v-if="showAccess" style="color: green">
            Primera verificación exitosa
          </q-item-label>

          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>

        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F6c%2F50%2Ffe%2F6c50fedcbd921cb0990e1abdc9c971d7.jpg&f=1&nofb=1"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Solo un paso más!</div>
            <div class="text-h7 q-mt-sm q-mb-xs">Pepe Camote</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>
        </q-card-section>

        <q-card-section class="q-pt-xs">
          <div class="text-h7 q-mt-sm q-mb-xs">Verificación</div>
          <div v-if="!showValidate">
            <div class="text-overline">Telefono</div>
            <q-input
              :autofocus="true"
              filled
              bottom-slots
              v-model="text"
              label="(503) xxxx-xxxx"
              mask="(+503) #### ####"
              lazy-rules
              :rules="[
                (val) =>
                  val.length > 0 ||
                  '¡Introducir un número de telefono, por favor!',
                (val) => val.length == 16 || '¡Número no válido!',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="text = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-btn
              flat
              class="btn-registrar q-mt-md"
              color="primary"
              @click="validar()"
            >
              Registrar Dispositivo
            </q-btn>
          </div>
          <div v-if="showValidate">
            <div class="text-overline">Ingrese el código enviado por SMS</div>

            <q-input
              :autofocus="true"
              filled
              bottom-slots
              v-model="text"
              label="****"
              mask="####"
              lazy-rules
              :rules="[
                (val) => val.length > 0 || '¡Introduzca el código, porfavor!',
                (val) => val.length == 4 || '¡Código no válido!',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="vpn_key" />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click="text = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-btn
              flat
              class="btn-registrar q-mt-md"
              color="primary"
              @click="acceder()"
            >
              Validar código
            </q-btn>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-xs">
          <div class="text-caption text-primary text-center q-mt-sm q-mb-xs">
            <q-icon name="info" />
            ¡Recuerde que una vez válidado su dispositivo, solo podrá votar en
            ese!
          </div>
          <div class="text-h7 q-mt-sm q-mb-xs">Datos del dispositivo</div>

          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-separator />
      </q-card>
    </div>

    <q-inner-loading
      :showing="visible"
      label="Validando Dispositivo..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      toolbar: ref(false),
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      text: ref(""),
      showValidate: ref(false),
      showAccess: ref(false),
      visible: ref(false),

      validar() {
        if (this.text.length > 0 && this.text.length == 16) {
          this.showValidate = true;
          this.text = "";
        }
      },

      acceder() {
        if (this.text.length > 0 && this.text.length == 4) {
          this.visible = true;
          this.showAccess = true;

          setTimeout(() => {
            window.location = "#/home/votar";
          }, 2000);
        }
      },
    };
  },
};
</script>
<style>
.my-card {
  width: 100%;
}

.btn-registrar {
  border: 1px solid #3a89d933;
}
</style>
