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
  }
}
</script>
