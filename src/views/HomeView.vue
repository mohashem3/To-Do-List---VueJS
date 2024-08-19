<template>
  <main>
    <LandingWelcome @triggerSignupPopup="toggleSignupPopup" />

    <!-- When logged out -->
    <InfoCard v-if="!isLoggedIn" @triggerSignupPopup="toggleSignupPopup" />

    <!-- When logged in -->
    <TaskStatistics v-if="isLoggedIn" />
    <TaskTable v-if="isLoggedIn" :showActions="false" :showTextBox="false" />

    <!-- Login popup -->
    <SignUp :showPopup="showSignupPopup" @update:showPopup="showSignupPopup = $event" />
  </main>
</template>

<script>
import TaskTable from '../components/TaskTable.vue'
import LandingWelcome from '../components/LandingWelcome.vue'
import TaskStatistics from '../components/TaskStatistics.vue'
import InfoCard from '../components/InfoCard.vue'

import SignUp from '@/components/SignUp.vue'

export default {
  components: {
    LandingWelcome,
    TaskTable,
    TaskStatistics,
    InfoCard,
    SignUp
  },
  data() {
    return {
      showSignupPopup: false
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('authToken')
    }
  },
  methods: {
    toggleSignupPopup() {
      // Toggle the login popup visibility
      this.showSignupPopup = !this.showSignupPopup
    }
  }
}
</script>
