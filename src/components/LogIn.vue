<template>
  <div v-if="showPopup" class="overlay" @click.self="closePopup">
    <div class="wrapper animate">
      <div class="title">LOG IN</div>
      <form @submit.prevent="login">
        <div class="field">
          <input type="text" required v-model="email" />
          <label>Email Address</label>
        </div>
        <div class="field">
          <input type="password" required v-model="password" />
          <label>Password</label>
        </div>
        <div class="field login-button">
          <input type="submit" :disabled="loading" value="Login" />
        </div>
        <!-- <div class="signup-link">
          Not a member? <a href="#" @click.prevent="openSignUp">Sign Up now</a>
        </div> -->
      </form>
    </div>
  </div>
  <AlertNotifications ref="AlertNotifications" />
</template>

<script>
import axios from 'axios'
import AlertNotifications from './AlertNotifications.vue'
import Swal from 'sweetalert2'

export default {
  props: {
    showPopup: Boolean
    // showSignUpPopup: Boolean
  },
  beforeRouteEnter(to, from, next) {
    const isLoggedIn = !!localStorage.getItem('authToken')
    if (isLoggedIn) {
      // Show SweetAlert notification if the user is logged in and tries to access the signup page
      Swal.fire({
        title: 'Already Logged In',
        text: 'You are already logged in.',
        icon: 'info',
        confirmButtonText: 'OK'
      }).then(() => {
        next(false) // Prevent navigation to the signup page
        history.back() // Navigate back to the previous page
      })
    } else {
      next() // Allow navigation if not logged in
    }
  },
  components: {
    AlertNotifications
  },
  data() {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login() {
      axios
        .post('https://todo.nafistech.com/api/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          const { token } = response.data
          localStorage.setItem('authToken', token) // Save token

          this.$emit('update:showPopup', false) // Close login popup
          this.$emit('login-success') // Notify parent component (NavBar)

          Swal.fire({
            title: 'Login Successful',
            text: 'You have successfully logged in.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.go(0) // Refresh the page after clicking OK
          })
        })
        .catch(() => {
          this.$refs.AlertNotifications.showError('Invalid email or password.')
        })
    },
    closePopup() {
      this.$emit('update:showPopup', false)
    }
    // openSignUp() {
    //   this.$emit('update:showPopup', false)
    //   this.$emit('open-signup') // Ensure this matches the event name in App.vue
    // }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

button {
  padding: 10px 20px;
  background-color: #4158d0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure the overlay is on top */
}

.wrapper {
  width: 380px;
  background: transparent; /* Remove the white background */
  border-radius: 15px;
  box-shadow: none; /* Remove box shadow */
  padding: 20px;
  position: relative;
  z-index: 10000; /* Ensure the wrapper is on top of the overlay */
}

.wrapper .title {
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  color: #fff;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(-135deg, #41b06e, #90d26d);
}

form {
  background-color: white; /* Keep form background white for contrast */
  padding: 10px 30px 50px 30px;
  border-radius: 0px 0px 15px 15px;
}

.field {
  margin-top: 20px;
  position: relative;
}

.field input {
  width: 100%;
  padding-left: 20px;
  font-size: 17px;
  height: 50px;
  border: 1px solid lightgrey;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.field input[type='submit']:hover {
  background: linear-gradient(135deg, #41b06e, #90d26d);
}

.login-button input {
  padding-left: 0px;
}

.field input:focus,
.field input:valid {
  border-color: #41b883;
}

.field label {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  color: #999999;
  font-weight: 400;
  font-size: 17px;
  transition: all 0.3s ease;
}

.field input:focus ~ label,
.field input:valid ~ label {
  top: 0;
  font-size: 16px;
  color: #41b883;
  background: white;
  padding: 0 5px;
  transform: translateY(-50%);
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.checkbox {
  display: flex;
  align-items: center;
}

.pass-link a {
  text-decoration: none;
  color: #41b883;
}

.field input[type='submit'] {
  width: 100%;
  background: linear-gradient(-135deg, #41b06e, #90d26d);
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 25px;
  cursor: pointer;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: #41b883;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Animation */
.animate {
  animation: popup 0.4s ease;
}

@keyframes popup {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.spinner {
  width: 25px;
  height: 25px;
  border: 4px solid white;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
