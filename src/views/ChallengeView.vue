<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn icon>
          <v-icon @click="goBack()">arrow_back</v-icon>
        </v-btn>
        {{challenges[id].title}}
      </v-card-title>

      <v-card-text class="description">
        {{challenges[id].description}}
        <codemirror class="codemirror" v-model="code" :options="cmOptions" />
      </v-card-text>

      <v-card-actions>
        <v-btn text class="text-btn" v-on:click="run()">Run</v-btn>
      </v-card-actions>
    </v-card>
    <v-scroll-y-transition :hide-on-leave="true">
      <results-card v-if="timesRun > 0" :results="results" :key="timesRun" />
    </v-scroll-y-transition>
  </div>
</template>
<script>
import Store from "../store";
import CInterpreter from "../CInterpreter.js";
import Router from "../router";

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
        failingTests: 0,
        results: Object
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
    goBack() {
      Router.go(-1);
    },

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
        console.log(response);
        if (response == cases[i].output) passed++;
        else failed++;
      }

      this.passingTests = passed;
      this.failingTests = failed;
      this.results = {
        passingTests: this.passingTests,
        failingTests: this.failingTests,
        error: this.error
      };
    }
  },
  mounted() {
    this.cmOptions.mode = this.challenges[this.id].highlighting; // set syntax highlighting to appropriate language
    this.code = this.challenges[this.id].templateCode; // insert template code
  }
};
</script>

<style scoped>
.description {
  text-align: left;
}

.codemirror {
  text-align: left;
}

h4 {
  margin: 2px;
}
</style>