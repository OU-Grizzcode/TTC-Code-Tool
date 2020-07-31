<template>
  <div class="tutorial">
    <ChallengeView id="0"></ChallengeView>
    <v-tour name="tutorial" :steps="steps" :options="options"></v-tour>
  </div>
</template>

<script>
import ChallengeView from "./ChallengeView.vue";
export default {
  name: "Tutorial",
  data() {
    return {
      options: {},
      steps: [
        {
          target: "#description",
          content:
            "Hello and welcome to the GrizzCode tutorial! In this guided tour you'll learn how to complete challenges on GrizzCode!",
          params: { placement: "top" },
        },
        {
          target: "#description",
          content:
            'This is the description box, it will explain the challenge to you. The goal of this challenge is to write some code in C that prints "hello world".',
          params: {
            highlight: true,
          },
        },
        {
          target: "#code",
          content:
            "This colorful box is where you will write your program to complete the challenge. For this challenge there is some template code, but know that this isn't always the case. Try and complete this challenge now, and when you're done hit the \"next\" button.",
          params: {
            highlight: true,
          },
        },
        {
          target: "#run-btn",
          content:
            "This is the stylish run button, when you press it a few tests will be run on your code to determine if it completes the challenge. Now that your code is done, press it!",
          params: {
            highlight: true,
          },
        },
        {
          target: "#results-card",
          content:
            "This big slightly-rounded-box is the results card, it's replaced every time you press the run button. If your code compiles, the results card will show the number of tests your code is passing and the number it is failing. If your code doesn't compile, it will show the errors the compiler outputs.",
          params: {
            highlight: true,
          },
        },
        {
          target: "#back-btn",
          content:
            "This circle-y thing is the back button, pressing it will return you to the home screen.",
          params: {
            highlight: true,
          },
        },
        {
          target: "#description",
          content:
            "That's the end of the tour, you can stay here and continue to play with the challenge, or you can press the back button to go to back to the home screen.",
          params: {},
        },
      ],
    };
  },
  components: { ChallengeView },
  mounted: function () {
    this.$tours["tutorial"].start();
  },
};
</script>

<style scoped>
</style>