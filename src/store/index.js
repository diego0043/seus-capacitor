import { createStore } from 'vuex'
import { LocalStorage } from 'quasar'
import { db } from "src/boot/db";

export default createStore({
  state: {
    nombre: LocalStorage.getItem("nombre_usuario"),
    carnet: LocalStorage.getItem("carnet_usuario"),
    candidatos: [],
    data_elecciones: [],
    data_cargada: false,
    isValidate: false,
    id_votacion_seleccionada: ""
  },

  getters: {
    candidatos: state => state.candidatos,
    dataProcesada: state => state.data_elecciones,
    data_cargada: state => state.data_cargada,
    isValidate: state => state.isValidate,
    id_doc_actual: state => state.id_votacion_seleccionada,
    carnet_usuario: state => state.carnet.toUpperCase()
  },

  mutations: {
    setCandidates(state, payload) {
      state.candidatos = payload;
    },
    setControl_Data(state, payload) {
      state.data_cargada = payload;
    },
    setData_elecciones(state, payload) {
      state.data_elecciones = payload;
    },
    setIsvalidate(state, payload) {
      state.isValidate = payload;
    },
    setIdVotacionActual(state, payload) {
      state.id_votacion_seleccionada = payload;
    }
  },

  actions: {

    getCandidates({ commit, state }, id) {
      const filtro = state.data_elecciones.filter(eleccion => eleccion.id_ref.includes(id));
      const [{ candidatos }] = filtro;
      commit("setCandidates", candidatos)
    },

    action_set_id_votacion_actual({ commit }, id_actual) {
      commit("setIdVotacionActual", id_actual)
    },

    async fetch_Data_ordenada_elecciones({ commit, getters }) {


      let elecciones = [];
      let id_documentos = [];
      try {
        const collection = await db.collection("elecciones").get();
        collection.forEach(doc => {
          id_documentos.push(doc.id)
          elecciones.push(doc.data())
        });

      } catch (error) {
        console.log(`${error}`)
      }

      commit("setControl_Data", true);

      let data_procesada = []

      elecciones.forEach((item, index) => {

        let object_item_data = {
          descripcion: item.descripcion,
          fechaDesde: item.fechaDesde,
          fechaHasta: item.fechaHasta,
          nombre: item.nombre,
          ya_vote: item.participantes.includes(getters.carnet_usuario),
          id_ref: id_documentos[index],
          candidatos: item.candidatos
        }

        data_procesada.push(object_item_data)

      })

      commit("setData_elecciones", data_procesada)

    },

    async isValidate_usr({ commit, getters }) {
      let alumnos = [];
      try {
        const collection = await db.collection("alumnos").get();
        collection.forEach(doc => alumnos.push(doc.data()));
      } catch (err) {
        console.log(`${err}`);
      }
      const alumnoUser = alumnos.filter(alumno => alumno.carnet.includes(getters.carnet_usuario));
      const [{ validacion1 }] = alumnoUser;
      if (validacion1) {
        commit("setIsvalidate", true)
      }
    }
  },
  modules: {
  }
})
