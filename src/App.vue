<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons|Material+Icons+Round"
      rel="stylesheet"
    />
    <link href="https://cdn.jsdelivr.net/npm/vuetify@1.x/dist/vuetify.min.css" rel="stylesheet" />
    <v-scroll-x-transition :hide-on-leave="true">
      <router-view />
    </v-scroll-x-transition>
    <info-bar />
  </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
export default {
  mounted() {
    // var challengeNames = [];
    axios.get("/challenges/").then((response) => {
      for (var n of response.data) {
        axios.get("/challenges/" + n).then((response) => {
          store.commit("addChallenge", response.data);
        });
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Roboto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

.wrappingRow {
  display: flex;
  direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.v-card {
  margin: 20px;
}

.text-btn:before {
  opacity: 0 !important;
}
</style>
