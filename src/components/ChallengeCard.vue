<template>
  <md-card v-bind:md-with-hover="true">
    <md-card-header>
      <div class="md-title">{{challenge.title}}</div>
      <div class="md-subhead">
        <md-chip class="md-accent" v-for="tag in challenge.tags" v-bind:key="tag">{{tag}}</md-chip>
      </div>
    </md-card-header>
    <md-card-content>{{challenge.shortDescription}}</md-card-content>
    <md-card-actions>
      <md-button :to="{ name: 'Challenge', params: { id: this.challenge.id } }">Try It!</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
export default {
  props: {
    challenge: Object
  }
};
</script>

<style scoped>
.md-card {
  width: 320px;
  margin: 4px;
  margin-top: 25px;
  display: inline-block;
  vertical-align: top;
  border-radius: 10px;
  cursor: default;
}
.md-chip {
  cursor: pointer;
}
</style>