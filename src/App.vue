<template>
  <v-app id="app">
    <header id="header">
      <navbar></navbar>
    </header>
    <main role="main">
      <router-view/>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('users/initialLocalUser');
  },
  mounted() {
    // document.querySelector('#app').classList.remove('theme--light');
    this.$store.dispatch('users/checkUserToken');
  },
};
</script>

<style lang="scss">
main {
  margin-bottom: $spacing-xl;
}
</style>
