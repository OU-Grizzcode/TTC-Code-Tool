<template>
  <div>
    <v-card>
      <v-card-title>{{challenges[id].title}}</v-card-title>

      <v-card-text>
        {{challenges[id].description}}
        <codemirror class="codemirror" v-model="code" :options="cmOptions" />
      </v-card-text>

      <v-card-actions>
        <v-btn text v-on:click="run()">Run</v-btn>
      </v-card-actions>
    </v-card>

    <v-card v-if="timesRun > 0">
      <v-card-title>
        Results
        <v-icon
          large
          style="color: rgb(46,234,0);"
          v-if="failingTests == 0 && error == ''"
        >check_circle_round</v-icon>
        <v-icon large style="color: rgb(255, 25, 75);" v-if="error != ''">error_round</v-icon>
        <v-icon
          large
          style="color: rgb(255,200,0);"
          v-if="failingTests != 0 && error == ''"
        >warning_round</v-icon>
      </v-card-title>
      <v-card-text>
        <textarea v-if="error != ''" class="errorarea" v-model="error" readonly="true" />
        <div v-if="error==''">
          <h4>Passing: {{passingTests}}</h4>
          <h4>Failing: {{failingTests}}</h4>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Store from "../store";
import CInterpreter from "../CInterpreter.js";

export default {
  name: "ChallengeView",
  components: {},
  data() {
    return {
      timesRun: 0,
      code: "",
      error: "",
      cmOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "",
        showCursorWhenSelecting: true,
        passingTests: 0,
        failingTests: 0
      },
      cmErrorBoxOptions: {
        tabSize: 2,
        readOnly: true,
        styleActiveLine: false,
        lineNumbers: false,
        line: true,
        mode: "",
        showCursorWhenSelecting: true,
        passingTests: 0,
        failingTests: 0
      }
    };
  },
  props: ["id"],
  computed: {
    challenges: () => {
      return Store.state.challenges;
    }
  },
  methods: {
    run() {
      this.timesRun++;
      var challenge = this.challenges[this.id];
      var interpreter;

      // set interpreter to the correct language's interpreter
      switch (challenge.lang) {
        case "c":
          interpreter = new CInterpreter();
          break;
      }

      var cases = challenge.testCases;

      var passed = 0;
      var failed = 0;

      // prep hidden code and insert user code
      var splitHidden = this.challenges[this.id].hiddenCode.split(
        "${user-code}$"
      );
      var completeCode = splitHidden[0] + this.code + splitHidden[1];

      // run code on all cases
      for (let i in cases) {
        var input = cases[i].input;
        var response = interpreter.run(completeCode, input);
        // if code errors log the error and break
        if (response.includes("ERROR:")) {
          this.error = 'error on input "' + input + '":\n\n' + response;
          break;
        } else this.error = "";
        if (response == cases[i].output) passed++;
        else failed++;
      }

      this.passingTests = passed;
      this.failingTests = failed;
    }
  },
  mounted() {
    this.cmOptions.mode = this.challenges[this.id].highlighting; // set syntax highlighting to appropriate language
    this.code = this.challenges[this.id].templateCode; // insert template code
  }
};
</script>

<style scoped>
.codemirror {
  text-align: left;
}
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

h4 {
  margin: 2px;
}
</style>