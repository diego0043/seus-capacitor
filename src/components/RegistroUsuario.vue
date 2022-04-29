<template>
  <div class="q-mx-lg">
    <div class="row justify-center q-mt-lg">
      <p class="text-left text-bold text-h3" style="display: block">Hola,</p>
    </div>
    <div class="row justify-center">
      <p class="text-left text-grey text-bold text-h6" style="display: block">
        Primero Debes Registrarte
      </p>
    </div>

    <q-separator color="dark" size="5px" inset />

    <div class="row justify-center text-left q-mt-lg">
      <p class="text-left text-bold text-h3" style="display: block">SEUS</p>
    </div>
    <div class="row justify-center text-start q-mb-lg">
      <p class="text-left text-grey text-bold text-h6" style="display: block">
        Sistema Electoral
        <q-icon name="inventory" class="q-pl-lg" />
      </p>
    </div>

    <div class="row justify-center q-my-lg">
      <img
        alt="minerva"
        src="~assets/minerva.png"
        style="width: 56px; height: 56px"
        class=""
      />
      <p class="text-left text-bold text-h8 q-mx-sm">
        Esta App es de uso exclusivo
        <span
          class="text-grey text-caption"
          style="display: block; width: 200px"
        >
          para los estudiantes de la Universidad de El Salvador
        </span>
      </p>
    </div>

    <div class="row justify-center">
      <q-btn
        rounded
        v-if="estadoTerminos === true"
        class="q-my-md glossy text-bold"
        @click="registrarseGoogle()"
      >
        <img
          alt="Google logo"
          src="~assets/google.ico"
          style="width: 32px; height: 32px; padding: 5px"
        />
        Registrarse con Google
      </q-btn>
      <p
        style="font-size: small; width: 190px"
        class="text-center text-red text-body"
        v-else
      >
        <q-icon name="warning" class="q-pr-sm" style="font-size: 18px" />¡Debes
        Aceptar los Términos y Condiciones para Registrarte!
      </p>
    </div>

    <div class="row justify-center">
      <q-checkbox
        v-model="estadoTerminos"
        label="Acepto Términos y Condiciones"
        class="text-grey text-bold text-italic q-mt-lg q-mb-lg"
      />
    </div>

    <div class="row justify-center">
      <p>
        ¿Ya tienes una cuenta?
        <a class="text-bold" href="#/login">Inicia Sesion.</a>
      </p>
    </div>
    <!-- temporal -->
    <div class="row justify-center">
      <q-btn class="text-bold" @click="$router.push('/home')" color="primary"
        >Ir a Inicio</q-btn
      >
    </div>

    <!-- loading spinner -->
    <q-inner-loading
      :showing="visible"
      size="70px"
      color="primary"
      label="Cargando ..."
      label-class="text-blue-10"
      label-style="font-size: 1.5em"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import firebase from "firebase";
import { LocalStorage } from "quasar";
import { db } from "src/boot/db";

export default defineComponent({
  name: "RegistroUsuario",

  data() {
    return {
      estadoTerminos: false,
      visible: true,
    };
  },
  methods: {
    alertaCorreoNoValido() {
      this.$q.notify({
        position: "top-right",
        type: "negative",
        classes: "glossy",
        message: `El correo ingresado no pertenece a la Universidad de El Salvador (ejemplo@ues.edu.sv).`,
      });
    },
    registrarseGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithRedirect(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          // console.error("ERROR:", errorMessage);
        });
    },
  },
  props: {},
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      try {
        if (user) {
          var verificarCorreo = user.email.indexOf("@ues.edu.sv");
          //consulta de un documento
          var docRef = db.collection("alumnos").doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                var carnet = user.email.substring(0, user.email.indexOf("@"));
                carnet = carnet.toLowerCase();
                LocalStorage.set("nombre_usuario", user.displayName);
                LocalStorage.set("correo_usuario", user.email);
                LocalStorage.set("url_imagen", user.photoURL);
                LocalStorage.set("carnet_usuario", carnet);

                //aqui esta la info del usuario en firestore
                console.log(doc.data());

                //console.log("Document data:", doc.data());
                console.log("Ya existe el usuario");
                this.$router.push({
                  name: "PageHome",
                });
              } else if (verificarCorreo > -1) {
                // doc.data() will be undefined in this case
                //console.log("No such document!");
                //Para obtener el carnet
                var carnet = user.email.substring(0, user.email.indexOf("@"));
                carnet = carnet.toLowerCase();
                LocalStorage.set("nombre_usuario", user.displayName);
                LocalStorage.set("correo_usuario", user.email);
                LocalStorage.set("url_imagen", user.photoURL);
                LocalStorage.set("carnet_usuario", carnet);
                //object alumno nuevo
                var alumno = {
                  carnet: carnet.toUpperCase(),
                  nombreCompleto: user.displayName,
                  telefono: "",
                  validacion1: false,
                };
                //Firestore coleccion alumnos
                db.collection("alumnos")
                  .doc(user.uid)
                  .set(alumno)
                  .then(console.log("se agrego alumno"))
                  .catch((error) => console.error(error));
                this.$router.push({
                  name: "PageHome",
                });
              } else {
                this.alertaCorreoNoValido();
                user.delete();
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        } else {
          //console.log("No hay usuario");
          this.visible = false;
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
});
</script>
