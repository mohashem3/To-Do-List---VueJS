<template>
  <div v-if="showPopup" class="overlay" @click.self="closePopup">
    <div class="wrapper animate">
      <div class="title">Login Form</div>
      <form @submit.prevent="login">
        <div class="field">
          <input type="text" required v-model="email" />
          <label>Email Address</label>
        </div>
        <div class="field">
          <input type="password" required v-model="password" />
          <label>Password</label>
        </div>
        <div class="field">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
  <AlertNotifications ref="AlertNotifications" />
</template>

<script>
import axios from 'axios'
import AlertNotifications from './AlertNotifications.vue'

export default {
  props: {
    showPopup: Boolean
  },
  components: {
    AlertNotifications
  },
  data() {
    return {
      email: '',
      password: ''
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

          this.$emit('update:showPopup', false) // Close popup
          this.$emit('login-success') // Notify parent component (NavBar)

          // this.$refs.AlertNotifications.showSuccess('You have successfully logged in.')
          // window.location.reload()
        })
        .catch(() => {
          this.$refs.AlertNotifications.showError('Invalid email or password.')
        })
    },
    closePopup() {
      this.$emit('update:showPopup', false)
    }
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
  background: linear-gradient(-135deg, #c850c0, #4158d0);
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

.field input:focus,
.field input:valid {
  border-color: #4158d0;
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
  color: #4158d0;
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
  color: #4158d0;
}

.field input[type='submit'] {
  width: 100%;
  background: linear-gradient(-135deg, #c850c0, #4158d0);
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
  color: #4158d0;
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
</style>
