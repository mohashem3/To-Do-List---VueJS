<template>
  <div class="container task-form-container">
    <!-- START Form -->
    <div class="form-container sign-in-container">
      <form>
        <h1>{{ model.task.id ? 'Edit Task' : 'Add Task' }}</h1>
        <p>Fill out the details below</p>

        <!-- Display error list if there are validation errors -->
        <ul class="alert alert-warning" v-if="errorList.length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
            {{ error }}
          </li>
        </ul>

        <input type="text" placeholder="Task Name" v-model="model.task.title" />
        <input type="text" placeholder="Task Description" v-model="model.task.description" />

        <button type="button" @click="submitTask">
          {{ model.task.id ? 'Update' : 'Add' }}
        </button>
      </form>
    </div>
    <!-- END Form -->
  </div>
</template>

<script>
import axios from 'axios'
import { eventBus } from '@/services/EventBus'

export default {
  name: 'TaskForm',
  data() {
    return {
      errorList: [],
      model: {
        task: {
          id: null,
          title: '',
          description: '',
          status: 'pending' // Set default status to "pending"
        }
      }
    }
  },
  mounted() {
    eventBus.value.addEventListener('task-edit', this.loadTask)
  },
  methods: {
    loadTask(event) {
      this.model.task = { ...event.detail }
    },
    submitTask() {
      if (!this.model.task.title || !this.model.task.description) {
        alert('All fields must be filled')
        return
      }

      if (this.model.task.id) {
        this.updateTask()
      } else {
        this.addTask()
      }
    },
    addTask() {
      axios
        .post('https://todo.nafistech.com/api/tasks', this.model.task)
        .then((res) => {
          const message = res.message || 'Task added successfully!'
          alert(message)
          this.clearForm()
          eventBus.value.dispatchEvent(new Event('task-added'))
        })
        .catch((error) => {
          this.handleError(error)
        })
    },
    updateTask() {
      axios
        .patch(`https://todo.nafistech.com/api/tasks/${this.model.task.id}`, this.model.task)
        .then((res) => {
          const message = res.message || 'Task updated successfully!'
          alert(message)
          this.clearForm()
          eventBus.value.dispatchEvent(new Event('task-updated'))
        })
        .catch((error) => {
          this.handleError(error)
        })
    },
    clearForm() {
      this.model.task = {
        id: null,
        title: '',
        description: '',
        status: 'pending' // Reset status to "pending"
      }
      this.errorList = []
    },
    handleError(error) {
      if (error.response) {
        this.errorList = error.response.data.errors || ['An error occurred']
      } else {
        this.errorList = ['An unexpected error occurred']
      }
      console.error('Error:', error)
    }
  },
  beforeUnmount() {
    eventBus.value.removeEventListener('task-edit', this.loadTask)
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

button {
  border-radius: 20px;
  border: 1px solid #2c7865;
  background-color: #2c7865;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  display: inline-flex; /* Change to inline-flex */
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
  transition:
    transform 50ms ease-in,
    background-color 100ms ease-in,
    width 100ms ease-in; /* Faster transitions */
}

button:hover {
  background-color: #a8cd9f; /* Hover background color */
  width: 55px; /* Adjust width as needed */
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

form {
  background: -webkit-linear-gradient(to right, #41b06e, #90d26d);
  background: linear-gradient(to right, #41b06e, #90d26d);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  border-radius: 10px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

input:focus {
  border-color: #fbff00;
  outline: none;
  box-shadow: 0 0 30px rgba(0, 123, 255, 0.5);
}

.container {
  margin-top: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  margin-bottom: 10px;
  margin-top: 0px;
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 100%;
  z-index: 2;
}

.task-form-container.highlight {
  animation: glow 1.5s ease-in-out;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 10px #ff0000;
  }
  50% {
    box-shadow: 0 0 20px #ff0000;
  }
  100% {
    box-shadow: 0 0 10px #ff0000;
  }
}
</style>
