// some Vue file // remember this is simply an example; // only look at how we
use the API described in the plugin's page; // the rest of things here are of no
importance

<template>
  <div>
    GPS position: <strong>{{ position }}</strong>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Geolocation } from "@capacitor/geolocation";

export default {
  setup() {
    const position = ref("determining...");

    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      let objet_coordenadas = {
        latitud: coordinates.coords.latitude,
        longitud: coordinates.coords.longitude,
      };
      position.value = objet_coordenadas;
    };

    let geoId;

    onMounted(() => {
      printCurrentPosition();
    });

    return {
      position,
    };
  },
};
</script>
