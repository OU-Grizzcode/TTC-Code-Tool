<template>
  <md-card>
    <md-card-header>
      <div class="md-title">{{challenges[id].title}}</div>
    </md-card-header>

    <md-card-content>
      {{challenges[id].description}}
      <codemirror class="editor" v-model="code" :options="cmOptions" />
    </md-card-content>

    <md-card-actions>
      <md-button v-on:click="run()">Run</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
import Store from "../store";
import CInterpreter from "../CInterpreter.js";

export default {
  name: "ChallengeView",
  components: {},
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 2,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "",
        showCursorWhenSelecting: true
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
      var challenge = this.challenges[this.id];
      var interpreter;

      switch (challenge.lang) {
        case "c":
          interpreter = new CInterpreter();
          break;
      }

      var cases = challenge.testCases;
      // var passed = 0;
      var failed = 0;

      var splitHidden = this.challenges[this.id].hiddenCode.split(
        "${user-code}$"
      );
      var completeCode = splitHidden[0] + this.code + splitHidden[1];

      for (let i in cases) {
        var input = cases[i].input;
        var response = interpreter.run(completeCode, input);

        if (
          response == cases[i].output // passed++;
        );
        else failed++;
      }

      if (failed > 0) {
        //TODO: fail
        alert("fail");
      } else alert("pass");
    }
  },
  mounted() {
    this.cmOptions.mode = this.challenges[this.id].highlighting; // sets syntax highlighting to appropriate language
    this.code = this.challenges[this.id].templateCode;
  }
};
</script>

<style scoped>
.editor {
  text-align: left;
}
</style>