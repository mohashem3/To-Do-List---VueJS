<template>
  <main>
    <!-- <h1>Welcome to HOME PAGE</h1> -->
    <LandingWelcome />
    <TaskStatistics />
    <TaskTable :showActions="false" :showTextBox="false" />
  </main>
</template>

<script>
import TaskTable from '../components/TaskTable.vue'
import LandingWelcome from '../components/LandingWelcome.vue'
import TaskStatistics from '../components/TaskStatistics.vue'

export default {
  name: 'App',
  components: {
    LandingWelcome,
    TaskTable,
    TaskStatistics
  }
}
</script>
