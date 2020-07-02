<template>
  <div class="home">
    <md-card>
      <md-card-header>
        <div class="md-title">Welcome to Grizzcode!</div>
      </md-card-header>
      <md-card-content>
        Grizzcode is an interactive website from the OU Tutoring Center to
        help students learn programming. You can choose a challenge below, or, if you're new, you can start with a
        <a
          href
        >tutorial</a>.
      </md-card-content>
    </md-card>

    <div class="wrappingRow">
      <challenge-card
        v-for="challenge in challenges"
        v-bind:challenge="challenge"
        v-bind:key="challenge.id"
      ></challenge-card>
    </div>
  </div>
</template>

<script>
import Store from "../store";

export default {
  name: "Home",
  components: {},
  computed: {
    challenges: () => {
      return Store.state.challenges;
    }
  }
};
</script>
