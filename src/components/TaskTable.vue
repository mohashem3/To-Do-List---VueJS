<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { eventBus } from '@/services/EventBus'

export default {
  name: 'TaskTable',
  props: {
    showActions: {
      type: Boolean,
      default: true
    },
    showAddTaskbtn: {
      type: Boolean,
      default: true
    },
    showTextBox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tasks: [],
      checkedTasks: new Set(JSON.parse(localStorage.getItem('checkedTasks')) || [])
    }
  },
  mounted() {
    this.getTasks()
    eventBus.value.addEventListener('task-added', this.getTasks)
    eventBus.value.addEventListener('task-updated', this.getTasks)
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
        .then((res) => {
          this.tasks = res.data
          this.tasks.forEach((task) => {
            if (this.checkedTasks.has(task.id) && task.status !== 'done') {
              this.setTaskStatus(task, 'done')
            }
          })
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error)
        })
    },

    setTaskStatus(task, status) {
      const token = localStorage.getItem('authToken')
      axios
        .patch(
          `https://todo.nafistech.com/api/tasks/${task.id}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(() => {
          task.status = status
          if (status === 'done') {
            this.checkedTasks.add(task.id)
          } else {
            this.checkedTasks.delete(task.id)
          }
          localStorage.setItem('checkedTasks', JSON.stringify([...this.checkedTasks]))
        })
        .catch((error) => {
          console.error('Error updating task status:', error)
        })
    },
    toggleTaskStatus(task) {
      const statusMap = {
        pending: 'in_progress',
        in_progress: 'done',
        done: 'pending'
      }
      const newStatus = statusMap[task.status]
      this.setTaskStatus(task, newStatus)
    },
    toggleCheckbox(task) {
      const newStatus = task.status === 'done' ? 'pending' : 'done'
      this.setTaskStatus(task, newStatus)
    },
    toggleAll(event) {
      const isChecked = event.target.checked
      this.tasks.forEach((task) => {
        if (task.status !== 'done' && isChecked) {
          this.setTaskStatus(task, 'done')
        } else if (task.status === 'done' && !isChecked) {
          this.setTaskStatus(task, 'pending')
        }
      })
    },
    editTask(task) {
      eventBus.value.dispatchEvent(new CustomEvent('task-edit', { detail: task }))
      this.scrollToForm()
    },
    deleteTask(taskId) {
      const token = localStorage.getItem('authToken')
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#41b883',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://todo.nafistech.com/api/tasks/${taskId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(() => {
              this.tasks = this.tasks.filter((task) => task.id !== taskId)
              Swal.fire('Deleted!', 'Your task has been deleted.', 'success')
            })
            .catch((error) => {
              console.error('Error deleting task:', error)
              Swal.fire('Error!', 'There was an error deleting your task.', 'error')
            })
        }
      })
    },
    scrollToForm() {
      const formElement = document.querySelector('.task-form-container')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' })
        // Add a class to trigger the glow effect
        formElement.classList.add('highlight')
        setTimeout(() => {
          formElement.classList.remove('highlight')
        }, 1500) // Remove the highlight after 1.5 seconds
      }
    },
    beforeUnmount() {
      eventBus.value.removeEventListener('task-added', this.getTasks)
      eventBus.value.removeEventListener('task-updated', this.getTasks)
    }
  }
}
</script>

<template>
  <div class="container task-table-container">
    <div class="content">
      <div class="container">
        <div class="table-responsive custom-table-responsive">
          <table class="table custom-table">
            <thead>
              <tr>
                <th scope="col">
                  <label class="control control--checkbox">
                    <input type="checkbox" class="js-check-all" @click="toggleAll" />
                    <div class="control__indicator" v-if="showTextBox"></div>
                  </label>
                </th>
                <th scope="col">Task No.</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th v-if="showActions" scope="col"></th>
                <th v-if="showActions" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(task, index) in tasks"
                :key="index"
                :class="{ active: task.status === 'done' }"
                :style="{ marginBottom: '10px', borderBottom: '2px solid #41b883' }"
              >
                <th scope="row">
                  <label class="control control--checkbox">
                    <input
                      type="checkbox"
                      @click="toggleCheckbox(task)"
                      :checked="task.status === 'done'"
                    />
                    <div class="control__indicator" v-if="showTextBox"></div>
                  </label>
                </th>

                <td
                  :style="{
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    color: task.status === 'done' ? '#41b883' : '#777'
                  }"
                >
                  {{ task.id }}
                </td>
                <td
                  :style="{
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    color: task.status === 'done' ? '#41b883' : '#777'
                  }"
                >
                  {{ task.title }}
                </td>
                <td
                  :style="{
                    textDecoration: task.status === 'done' ? 'line-through' : 'none',
                    color: task.status === 'done' ? '#41b883' : '#777'
                  }"
                >
                  {{ task.description }}
                </td>
                <td>
                  <span
                    class="badge"
                    :class="{
                      'bg-danger': task.status === 'pending',
                      'bg-warning': task.status === 'in_progress',
                      'bg-success': task.status === 'done'
                    }"
                    @click="toggleTaskStatus(task)"
                    style="cursor: pointer"
                  >
                    {{
                      task.status === 'pending'
                        ? 'Pending'
                        : task.status === 'in_progress'
                          ? 'In Progress'
                          : 'Done'
                    }}
                  </span>
                </td>

                <td v-if="showActions">
                  <img
                    @click="editTask(task)"
                    width="26"
                    height="26"
                    src="https://img.icons8.com/metro/26/000000/edit.png"
                    alt="edit"
                    class="edit-icon"
                  />
                </td>

                <td v-if="showActions">
                  <img
                    @click="deleteTask(task.id)"
                    width="32"
                    height="32"
                    src="https://img.icons8.com/windows/32/000000/trash.png"
                    alt="trash"
                    class="edit-icon"
                  />
                </td>
              </tr>
              <tr class="spacer">
                <td colspan="100"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.bg-warning {
  background-color: #f0ad4e; /* Example color for in_progress */
  color: #fff; /* Example text color */
}

h1 {
  text-align: center;
}

.container {
  margin-bottom: 50px;
}

.content {
  padding: 7rem 0;
}

.custom-table-responsive {
  background-color: #91d9b9;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px; /* Margin to prevent sticking to footer */
}

.custom-table {
  min-width: 900px;
  margin-bottom: 15px; /* Margin at the bottom of the table */
}

.custom-table thead tr,
.custom-table thead th {
  border-top: none;
  border-color: #41b883;
  border-bottom: none !important;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-weight: bold; /* Stronger font for header */
}

.custom-table tbody th,
.custom-table tbody td {
  color: #777;
  font-weight: 400;
  padding-bottom: 20px;
  padding-top: 20px;
  font-weight: 300;
}

.custom-table tbody tr:not(.spacer) {
  border-radius: 7px;
  overflow: hidden;
  transition: 0.3s all ease;
  margin-bottom: 10px; /* Spacing between rows */
  border-bottom: 2px solid #41b883; /* Border color */
}

.custom-table tbody tr:not(.spacer):hover {
  box-shadow: 0 2px 10px -5px rgba(0, 0, 0, 0.1);
}

.custom-table tbody tr th,
.custom-table tbody tr td {
  background: #fff;
  border: none;
}

.custom-table tbody tr.spacer td {
  padding: 0 !important;
  height: 10px;
  border-radius: 0 !important;
  background: transparent !important;
}

.custom-table tbody tr.active {
  opacity: 0.4;
}

/* Custom Checkbox */
.control {
  display: block;
  position: relative;
  margin-bottom: 25px;
  cursor: pointer;
  font-size: 18px;
  margin-right: 10px;
}

.control input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.control__indicator {
  position: absolute;
  top: 0;
  bottom: 5px;

  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 4px;
  border: 2px solid #ccc;
  background: transparent;
}

.control input:checked ~ .control__indicator {
  border: 2px solid #41b883; /* Checkbox color */
  background: #41b883; /* Checkbox color */
}

.control__indicator:after {
  font-family: 'icomoon';
  content: '\2714'; /* Checkmark symbol */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  font-size: 14px; /* Adjust size as needed */
  color: white; /* Color of the checkmark */
  width: 100%; /* Ensure full width */
  height: 100%; /* Ensure full height */
  text-align: center; /* Center horizontally */
  line-height: 20px; /* Center vertically based on the checkbox height */
}

.control input:checked ~ .control__indicator:after {
  display: block;
  color: #fff;
}

.edit-icon {
  cursor: pointer; /* Change cursor to pointer */
  transition: transform 0.3s ease; /* Smooth transition for hover effect */
}

.edit-icon:hover {
  transform: scale(1.1); /* Slightly enlarge on hover */
}
</style>
