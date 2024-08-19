<template>
  <main>
    <!-- <h1 >Welcome to TO DO PAGE</h1> -->
    <TaskForm />
    <TaskTable :showActions="true" :showAddTaskbtn="false" :showTextBox="true" />
  </main>
</template>

<script>
import TaskForm from '../components/TaskForm.vue'
import TaskTable from '../components/TaskTable.vue'

export default {
  name: 'TaskView',
  components: {
    TaskForm,
    TaskTable
  },
  beforeRouteEnter(to, from, next) {
    const isLoggedIn = !!localStorage.getItem('authToken')
    if (!isLoggedIn) {
      // Trigger login popup instead of showing an alert
      window.dispatchEvent(new CustomEvent('show-login-popup'))

      // Store the intended route
      localStorage.setItem('intendedRoute', to.fullPath)

      next(false) // Prevent navigation
    } else {
      next() // Allow navigation if the user is logged in
    }
  }
}
</script>
