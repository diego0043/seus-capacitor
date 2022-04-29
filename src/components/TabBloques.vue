<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 1010px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="bloques" label="Bloques" />
          <q-tab name="transacciones" label="Transacciones" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated virtual-scroll>
          <q-tab-panel name="bloques">
            <div class="q-pa-md">
              <h5>
                <b>Últimos Bloques</b>
              </h5>
              <q-markup-table>
                <thead class="bg-grey-1 text-h4">
                  <tr>
                    <th class="text-left">Altura</th>
                    <th class="text-left">Hash</th>
                    <th class="text-left">Tamaño</th>
                    <th class="text-left">Total de votos</th>
                    <th class="text-left">Fecha y hora</th>
                  </tr>
                </thead>
                <tbody class="bg-grey-1 text-h4">
                  <tr>
                    <td class="text-left">
                      <a href="#/blockchain/block" style="text-decoration: none">111</a>
                    </td>
                    <td class="text-left">
                      <a
                        href="#/blockchain/block"
                        style="text-decoration: none"
                      >000000000000000000058e0b6d07b22fa46bd3bc194eb27272548ae0b19b9f4c</a>
                    </td>
                    <td class="text-left">463.571 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <a href="#/blockchain/block" style="text-decoration: none">110</a>
                    </td>
                    <td class="text-left">
                      <a
                        href="#/blockchain/block"
                        style="text-decoration: none"
                      >000000000000000000060a0f51ca96cabf9aab7c08f554d9d87c9626ca58f59e</a>
                    </td>
                    <td class="text-left">574.009 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <a href="#/blockchain/block" style="text-decoration: none">109</a>
                    </td>
                    <td class="text-left">
                      <a
                        href="#/blockchain/block"
                        style="text-decoration: none"
                      >00000000000000000005c37b748f029de26f74eaeff9e7e0c7b1adc4120e6c04</a>
                    </td>
                    <td class="text-left">256.020 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <a href="#/blockchain/block" style="text-decoration: none">108</a>
                    </td>
                    <td class="text-left">
                      <a
                        href="#/blockchain/block"
                        style="text-decoration: none"
                      >000000000000000000021d806e8ae89b2656b8b6c4cea694e4e5812b1ab2fec2</a>
                    </td>
                    <td class="text-left">260.020 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <a href="#/blockchain/block" style="text-decoration: none">107</a>
                    </td>
                    <td class="text-left">
                      <a
                        href="#/blockchain/block"
                        style="text-decoration: none"
                      >000000000000000000035edbc39edc3b78f7f839b90b248fdd167dcb221f9fce</a>
                    </td>
                    <td class="text-left">225.229 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <a href="#/blockchain/block" style="text-decoration: none">106</a>
                    </td>
                    <td class="text-left">
                      <a
                        href="#/blockchain/block"
                        style="text-decoration: none"
                      >000000000000000000019180645299cce07b81a8e32e3d5aef8c653f97bddef0</a>
                    </td>
                    <td class="text-left">75.400 bytes</td>
                    <td class="text-left">10</td>
                    <td class="text-left">2022-03-19 15:50</td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
            <br />
            <q-btn
              outline
              color="primary"
              label="Ver todos los bloques"
              style="margin-left: 15px"
              href="#/blockchain/blocks"
              icon-right="arrow_right_alt"
            ></q-btn>
          </q-tab-panel>

          <q-tab-panel name="transacciones">
            <div class="q-pa-md">
              <h5>
                <b>Últimas Transacciones</b>
              </h5>
              <q-table
                title
                :rows="rows"
                :columns="columns"
                row-key="correlativo"
                hide-bottom
                class="bg-grey-1 text-h4"
              />
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

const columns = [
  {
    name: "correlativo",
    align: "left",
    label: "Correlativo",
    field: "correlativo",
    sortable: true,
  },
  {
    name: "hash",
    align: "left",
    label: "Hash",
    field: "hash",
    sortable: true,
  },
  {
    name: "fecha",
    align: "left",
    label: "Fecha de realización",
    field: "fecha",
    sortable: true,
  },
];

const rows = [
  {
    correlativo: 10,
    hash: "e0036db91b88dc0617b42a8e960858bcbfbed3d8a11def10748d8522d9e673c7",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 9,
    hash: "bb8bfe732fc5e8318839d9feef3b487434e817a96584d0accc954102e0c904d3",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 8,
    hash: "8757d92093a69904967c5fb2d5a067cd3be387117ced4e9aa4a2a4ab4dda8d7b",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 7,
    hash: "3e0dd40e8a403782a40dcf0fcafc9a33bc95f17bc2bb528c66bdc912f30034ef",
    fecha: "2022-03-19 15:50",
  },
  {
    correlativo: 6,
    hash: "e8a70bd982a3ca0d3b873a9f88141a0ecaf0593236c659eb7ae08110aee41c75",
    fecha: "2022-03-19 15:50",
  },
];

export default {
  setup() {
    return {
      tab: ref("bloques"),
      columns,
      rows,
    };
  },
};
</script>
