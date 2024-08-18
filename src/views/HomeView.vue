<template>
  <main>
    <LandingWelcome @triggerLoginPopup="toggleLoginPopup" />

    <!-- When logged out -->
    <InfoCard v-if="!isLoggedIn" @triggerLoginPopup="toggleLoginPopup" />

    <!-- When logged in -->
    <TaskStatistics v-if="isLoggedIn" />
    <TaskTable v-if="isLoggedIn" :showActions="false" :showTextBox="false" />

    <!-- Login popup -->
    <Login :showPopup="showLoginPopup" @update:showPopup="showLoginPopup = $event" />
  </main>
</template>

<script>
import TaskTable from '../components/TaskTable.vue'
import LandingWelcome from '../components/LandingWelcome.vue'
import TaskStatistics from '../components/TaskStatistics.vue'
import InfoCard from '../components/InfoCard.vue'
import Login from '../components/Login.vue'

export default {
  components: {
    LandingWelcome,
    TaskTable,
    TaskStatistics,
    InfoCard,
    Login
  },
  data() {
    return {
      showLoginPopup: false
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('authToken')
    }
  },
  methods: {
    toggleLoginPopup() {
      // Toggle the login popup visibility
      this.showLoginPopup = !this.showLoginPopup
    }
  }
}
</script>
