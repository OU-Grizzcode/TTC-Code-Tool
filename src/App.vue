<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons"
    />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme(
  "default",
  (
    primary: md-get-palette-color(blue, A200),
    // The primary color of your application
      accent: md-get-palette-color(red, A200) // The accent or secondary color
  )
);

@import "~vue-material/dist/theme/all"; // Apply the theme

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

.md-card {
  margin: 20px;
}
</style>
