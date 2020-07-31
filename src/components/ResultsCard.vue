<template>
  <v-card>
    <v-card-title>
      Results
      <v-icon
        id="status-icon"
        large
        style="color: rgb(46,234,0);"
        v-if="results.failingTests == 0 && results.error == ''"
      >check_circle_round</v-icon>
      <v-icon
        id="status-icon"
        large
        style="color: rgb(255, 25, 75);"
        v-if="results.error != ''"
      >error_round</v-icon>
      <v-icon
        id="status-icon"
        large
        style="color: rgb(255,200,0);"
        v-if="results.failingTests != 0 && results.error == ''"
      >warning_round</v-icon>
    </v-card-title>
    <v-card-text>
      <textarea
        v-if="results.error != ''"
        class="errorarea"
        id="errors"
        v-model="results.error"
        readonly="true"
      />
      <div id="status" v-if="results.error==''">
        <h4>Passing: {{results.passingTests}}</h4>
        <h4>Failing: {{results.failingTests}}</h4>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    results: Object,
  },
};
</script>

<style scoped>
.errorarea {
  width: 90%;
  height: 20vh;
  resize: none;
  outline: 0px;
  border: none;
  border-radius: 5px;
  background: whitesmoke;
  padding: 10px;
}
</style>