<script>
import Login from '@/components/Login.vue'
import SignUp from '@/components/SignUp.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    Login,
    SignUp
  },
  data() {
    return {
      showLoginPopup: false,
      showSignupPopup: false
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('authToken')
    }
  },
  created() {
    window.addEventListener('show-login-popup', this.toggleLoginPopup)
  },
  beforeUnmount() {
    window.removeEventListener('show-login-popup', this.toggleLoginPopup)
  },
  methods: {
    toggleLoginPopup() {
      this.showLoginPopup = !this.showLoginPopup
    },
    toggleSignupPopup() {
      this.showSignupPopup = !this.showSignupPopup
    },
    logout() {
      localStorage.removeItem('authToken')
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have successfully logged out!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.$router.push('/').then(() => {
          this.$router.go(0)
        })
      })
    },
    handleLoginSuccess() {
      const intendedRoute = localStorage.getItem('intendedRoute') || '/'
      localStorage.removeItem('intendedRoute')
      this.$router.push(intendedRoute)
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container d-flex justify-content-between align-items-center position-relative">
      <!-- Left section (Logo and Brand) -->
      <div class="navbar-left d-flex align-items-center">
        <a class="navbar-brand" href="/">
          <img src="@/assets/img/to-do.svg" alt="Home" class="todo-icon" />
        </a>
        <a class="navbar-brand" href="/"><strong>NAFIS TO-DO</strong></a>
      </div>

      <!-- Center Links -->
      <div class="navbar-center position-absolute start-50 translate-middle-x">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact-active-class="active">HOME</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/taskview" class="nav-link" exact-active-class="active"
              >TO-DO</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" exact-active-class="active"
              >ABOUT US</router-link
            >
          </li>
        </ul>
      </div>

      <!-- Right Links -->
      <div class="navbar-right d-flex">
        <ul class="navbar-nav ms-auto">
          <li v-if="!isLoggedIn" class="nav-item">
            <a
              class="nav-link custom-nav-link"
              @click.prevent="toggleLoginPopup"
              @click="$emit('open-login')"
              >LOG IN</a
            >
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <a
              class="nav-link custom-nav-link"
              @click.prevent="toggleSignupPopup"
              @click="$emit('open-signup')"
              >SIGN UP</a
            >
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <a class="nav-link custom-nav-link-logout" @click.prevent="logout">
              <span class="material-icons">logout</span> LOG OUT
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Login and SignUp Popups -->
    <Login
      :showPopup="showLoginPopup"
      @update:showPopup="showLoginPopup = $event"
      @login-success="handleLoginSuccess"
    />
    <SignUp :showPopup="showSignupPopup" @update:showPopup="showSignupPopup = $event" />
  </nav>
</template>

<style scoped>
.navbar {
  background-color: rgb(0, 0, 0);
  width: 100%;
}
.todo-icon {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}
.navbar-center {
  text-align: center;
}
.navbar-center ul {
  display: flex;
  justify-content: center;
}
.nav-link {
  color: white;
  cursor: pointer;
}
.nav-link:hover {
  color: #41b883;
  cursor: pointer;
}
.nav-link.active {
  color: #41b883;
}

/* Custom styles for the Sign Up, Login, and Logout links */
.custom-nav-link-logout {
  background-color: #2c8b5f;
  color: white !important;
  padding: 5px 15px;
  border-radius: 5px;
  width: 110px;
  text-align: center;
  margin-right: 10px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.custom-nav-link {
  background-color: #2c8b5f;
  color: white !important;
  padding: 5px 15px;
  border-radius: 5px;
  width: 90px;
  text-align: center;
  margin-right: 10px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.custom-nav-link:hover {
  background-color: #41b883;
  color: white !important;
}

.custom-nav-link-logout:hover {
  background-color: #41b883;
  color: white !important;
}

/* Adjust Logout link icon styling */
.material-icons {
  vertical-align: middle;
  margin-right: 1px;
  font-size: 20px;
}

.navbar-right .nav-item:last-child .custom-nav-link {
  margin-right: 0;
}
</style>
