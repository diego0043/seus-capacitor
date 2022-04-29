<template>
  <div class="flex flex-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section class="">
            <p class="text-h3 q-py-md text-dark glossy">
              <q-icon name="person" color="dark"></q-icon> INGRESO
            </p>
          </q-card-section>
          <q-card-actions class="justify-center q-my-sm">
            <img
              alt="minerva"
              src="~assets/minerva.png"
              style="width: 56px; height: 56px"
              class="q-mb-md"
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
          </q-card-actions>
          <q-card-actions class="q-px-md justify-center">
            <q-btn
              rounded
              class="q-mb-md glossy text-bold"
              @click="loginGoogle()"
            >
              <img
                alt="Google logo"
                src="~assets/google.ico"
                style="width: 32px; height: 32px; padding: 5px"
              />Iniciar Sesión con Google</q-btn
            >
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <a href="https://github.com/diseno2022/seus" class=""
              >Sitio Web del Proyecto</a
            >
            <p class="text-grey-6 q-py-md text-center" style="width: 300px">
              Bienvenidos al sistema de elecciones de la Universidad de El
              Salvador.
            </p>
            <p class="text-grey-6 q-py-md">
              ¿No estas registrado? <a href="#/">Crea una cuenta</a>
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
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
import firebase from "firebase";
import { db } from "src/boot/db";

export default {
  data() {
    return {
      visible: true,
    };
  },

  methods: {
    alertaUsuarioNoRegistrado() {
      this.$q.notify({
        position: "top-right",
        type: "warning",
        classes: "glossy",
        message: `Tienes que registrarte Primero`,
      });
    },
    alertaCorreoNoValido() {
      this.$q.notify({
        position: "top-right",
        type: "negative",
        classes: "glossy",
        message: `El correo ingresado no pertenece a la Universidad de El Salvador (ejemplo@ues.edu.sv).`,
      });
    },
    loginGoogle() {
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
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      try {
        if (user) {
          //comprobar correo
          var verificarCorreo = user.email.indexOf("@ues.edu.sv");
          //consulta de un documento
          var docRef = db.collection("alumnos").doc(user.uid);
          docRef
            .get()
            .then((doc) => {
              if (doc.exists) {
                //aqui esta la info del usuario en firestore
                console.log(doc.data());

                this.$router.push({
                  name: "PageHome",
                });
              } else if (verificarCorreo > -1) {
                user.delete();
                this.alertaUsuarioNoRegistrado();
              } else {
                user.delete();
                this.alertaCorreoNoValido();
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
};
</script>
