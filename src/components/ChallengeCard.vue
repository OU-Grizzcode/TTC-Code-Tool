<template>
  <!-- Yeah, I know vuetify has a hover component, this is honestly easier. -->
  <v-card
    :class="`elevation-${hover ? 10 : 1}`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <v-card-title>{{ challenge.title }}</v-card-title>
    <div>
      <v-chip v-for="tag in challenge.tags" v-bind:key="tag">{{ tag }}</v-chip>
    </div>
    <v-card-text>{{ challenge.shortDescription }}</v-card-text>
    <v-card-actions>
      <v-btn text :to="{ name: 'Challenge', params: { id: this.challenge.id } }"
        >Try It!</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return { hover: false };
  },
  props: {
    challenge: Object
  }
};
</script>

<style scoped>
.v-card {
  width: 320px;
  margin: 4px;
  margin-top: 25px;
  display: inline-block;
  vertical-align: top;
  border-radius: 10px;
  cursor: default;
}
.v-chip {
  cursor: pointer;
  margin: 0 5px 0 5px;
}
.v-btn:before {
  opacity: 0;
}
</style>
