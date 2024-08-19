<template>
  <div class="main-container">
    <div class="container">
      <div class="left-section">
        <h1 v-if="isLoggedIn">Welcome, {{ name }}</h1>
        <h1 v-else>Stay Organized with <strong class="nafis">NAFIS TO-DO</strong></h1>

        <h4 v-if="isLoggedIn">Ready to add more tasks?</h4>
        <h4 v-else>Effortlessly manage your tasks—add, edit, and delete with ease.</h4>

        <button @click="handleButtonClick">
          {{ isLoggedIn ? 'ADD MY TASKS' : 'GET STARTED' }}
        </button>
      </div>
      <div class="right-section">
        <img src="@/assets/img/carousel-2.png" alt="Task management illustration" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LandingWelcome',
  data() {
    return {
      name: '' // Will hold the fetched username
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('authToken')
    }
  },
  methods: {
    handleButtonClick() {
      if (this.isLoggedIn) {
        this.$router.push('/taskview') // Redirect to TaskView when logged in
      } else {
        this.$emit('triggerSignupPopup') // Trigger signup popup when logged out
      }
    },
    fetchUserName() {
      const token = localStorage.getItem('authToken')
      if (token) {
        // Make an API request to fetch the user's name
        axios
          .get('https://todo.nafistech.com/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            // Extract the username from the response and set it in data
            this.name = response.data.name
          })
          .catch((error) => {
            console.error('Error fetching user name:', error)
          })
      }
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      this.fetchUserName() // Fetch the user name when mounted if logged in
    }
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.nafis {
  color: #ffffff;
}

.main-container {
  width: 100%;
}
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* Use 100% instead of 100vw */
  background: -webkit-linear-gradient(to right, #41b06e, #90d26d);
  background: linear-gradient(to right, #41b06e, #90d26d);
  padding-left: 120px;
  padding-right: 115px;
  margin: 0;
  box-sizing: initial;
}
.left-section,
.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 50%; /* Constrain the width */
}

.left-section {
  flex-direction: column;
  align-items: flex-start;
}

.left-section h1 {
  margin: 0;
  font-size: 2.3em;
  color: #000;
}

.left-section h4 {
  margin: 10px 0;
  font-size: 1.2em;
  color: #000;
}

.left-section button {
  border-radius: 20px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  color: #41b883;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 50ms ease-in,
    background-color 100ms ease-in;
}

.left-section button:hover {
  background-color: #dadada;
  color: #41b883;
}

.left-section button:active {
  transform: scale(0.95);
}

.left-section button:focus {
  outline: none;
}

.right-section img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
</style>
