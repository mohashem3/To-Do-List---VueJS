<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="/">
        <img src="@/assets/img/to-do.svg" alt="Home" class="todo-icon" />
      </a>
      <a class="navbar-brand" href="/"><strong>NAFIS TO-DO</strong></a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
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

          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" @click.prevent="toggleLoginPopup">LOG IN</a>
          </li>

          <li v-if="!isLoggedIn" class="nav-item">
            <a class="nav-link" @click.prevent="toggleSignupPopup">SIGN UP</a>
          </li>

          <li v-if="isLoggedIn" class="nav-item">
            <a class="nav-link" @click.prevent="logout">LOG OUT</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Pass the login logic directly to the Login component -->
    <Login
      :showPopup="showLoginPopup"
      @update:showPopup="showLoginPopup = $event"
      @login-success="handleLoginSuccess"
    />
    <SignUp :showPopup="showSignupPopup" @update:showPopup="showSignupPopup = $event" />
  </nav>
</template>

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
    // Listen for the custom event to show the login popup
    window.addEventListener('show-login-popup', this.toggleLoginPopup)
  },
  beforeUnmount() {
    // Clean up the event listener when the component is destroyed
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
      localStorage.removeItem('authToken') // Remove the token from local storage
      Swal.fire({
        icon: 'success',
        title: 'Logged Out',
        text: 'You have successfully logged out!',
        confirmButtonText: 'OK'
      }).then(() => {
        this.$router.push('/').then(() => {
          window.location.reload() // Force page reload after confirmation
        })
      })
    }
  }
}
</script>

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
.nav-link {
  color: white;
  transition:
    color 0.3s,
    transform 0.3s;
  cursor: pointer;
}
.nav-link:hover {
  color: #41b883;
  transform: scale(1.1);
}
.nav-link.active {
  color: #41b883;
}
</style>
