<template>
  <div class="row">
    <!-- <h1>Statistics</h1> -->
    <div class="flex-container">
      <div class="report-card-pending">
        <div class="report-dashboard-label"><strong>Pending Tasks</strong></div>
        <div class="report-dashboard-number">
          <span class="dollar-unit"></span>{{ pendingCount }}
        </div>
      </div>
      <!-- /.report-card -->
      <div class="report-card-inprogress">
        <div class="report-dashboard-label"><strong>In-Progress Tasks</strong></div>
        <div class="report-dashboard-number">
          <span class="dollar-unit"></span>{{ inProgressCount }}
        </div>
      </div>
      <!-- /.report-card -->
      <div class="report-card-done">
        <div class="report-dashboard-label"><strong>Finished Tasks</strong></div>
        <div class="report-dashboard-number"><span class="dollar-unit"></span>{{ doneCount }}</div>
      </div>
      <!-- /.report-card -->
    </div>
    <!-- /.flex-container -->
  </div>
  <!-- /.row -->
</template>

<script>
import axios from 'axios'

export default {
  name: 'TaskStatistics',
  data() {
    return {
      tasks: [],
      pendingCount: 0,
      inProgressCount: 0,
      doneCount: 0
    }
  },
  mounted() {
    this.getTasks()
  },
  methods: {
    getTasks() {
      const token = localStorage.getItem('authToken')
      axios
        .get('https://todo.nafistech.com/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          this.tasks = response.data
          this.calculateTaskCounts()
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error)
        })
    },
    calculateTaskCounts() {
      this.pendingCount = this.tasks.filter((task) => task.status === 'pending').length
      this.inProgressCount = this.tasks.filter((task) => task.status === 'in_progress').length
      this.doneCount = this.tasks.filter((task) => task.status === 'done').length
    }
  }
}
</script>

<style scoped>
/* Color Definitions */
:root {
  --color-primary: #d60c8c;
  --color-body-background: #eee;
  --color-item-background: #41b883; /* Update background color */
  --color-border: #ebeff6;
  --color-label: #fff; /* White color for text on the card */
  --color-number: #fff; /* White color for numbers on the card */
}

h1 {
  text-align: center;
}
/* Flex Container */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Add space between cards */
  justify-content: center; /* Center the cards horizontally */
  align-items: center;
}

/* Reporting Styles */
.report-card-pending {
  background: #df0000;
  border-radius: 10px;
  width: 50%;
  text-align: center;
  padding: 10px;
  margin-top: 50px;

  flex-basis: calc(33.333% - 200px); /* Adjust width of each card */
  box-sizing: border-box;
}

.report-card-inprogress {
  background: rgb(226, 226, 5);
  border-radius: 10px;
  width: 50%;
  text-align: center;
  padding: 10px;
  margin-top: 50px;

  flex-basis: calc(33.333% - 200px); /* Adjust width of each card */
  box-sizing: border-box;
}

.report-card-done {
  background: rgb(30, 195, 30);
  border-radius: 10px;
  width: 50%;
  text-align: center;
  padding: 10px;
  margin-top: 50px;

  flex-basis: calc(33.333% - 200px); /* Adjust width of each card */
  box-sizing: border-box;
}

/* Add this to your CSS file */
.report-dashboard-label {
  color: #fff;
  display: block;
  font-size: 1.2rem;
  margin-bottom: 0.675rem;
  font-family: sans-serif;
  font-weight: 400;
}

.report-dashboard-number {
  color: #fff;
  font-size: 2.25rem;
  font-family: sans-serif;
  font-weight: 600;
}
</style>
