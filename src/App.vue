<script lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/MainNavBar.vue'
import MainFooter from './components/MainFooter.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    MainFooter
  }
}
</script>

<template>
  <NavBar />

  <RouterView />
  <MainFooter />
</template>

<style scoped></style>
