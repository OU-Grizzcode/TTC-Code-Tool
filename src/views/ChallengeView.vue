<template>
  <div>
    <md-card>
      <md-card-header>
        <div class="md-title">{{challenges[id].title}}</div>
      </md-card-header>

      <md-card-content>
        {{challenges[id].description}}
        <codemirror class="codemirror" v-model="code" :options="cmOptions" />
      </md-card-content>

      <md-card-actions>
        <md-button v-on:click="run()">Run</md-button>
      </md-card-actions>
    </md-card>

    <md-card v-if="timesRun > 0">
      <md-card-header>
        <div class="md-title">
          Results
          <md-icon
            style="color: rgb(150,255,100);"
            class="md-size-2x"
            v-if="failingTests == 0 && error == ''"
          >check_circle</md-icon>
          <md-icon style="color: rgb(255, 25, 75);" class="md-size-2x" v-if="error != ''">error</md-icon>
          <md-icon
            style="color: rgb(255,200,0);"
            class="md-size-2x"
            v-if="failingTests != 0 && error == ''"
          >warning</md-icon>
        </div>
      </md-card-header>
      <md-card-content>
        <textarea v-if="error != ''" class="errorarea" v-model="error" readonly="true" />
        <div v-if="error==''">
          <h4>Passing: {{passingTests}}</h4>
          <h4>Failing: {{failingTests}}</h4>
        </div>
      </md-card-content>
    </md-card>
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