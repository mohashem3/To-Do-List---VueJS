<template>
  <div v-if="showPopup" class="overlay" @click.self="closePopup">
    <div class="wrapper animate">
      <div class="title">SIGN UP</div>
      <form ref="form" @submit.prevent="validateForm">
        <div class="field">
          <input
            type="text"
            v-model="name"
            required
            pattern=".+"
            title="Please fill out this field."
          />
          <label>Full Name</label>
        </div>
        <div class="field">
          <input
            type="email"
            v-model="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address."
          />
          <label>Email Address</label>
        </div>
        <div class="field">
          <input
            type="password"
            v-model="password"
            required
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}"
            title="Password must be at least 8 characters, including uppercase and lowercase letters, a number, and a special character."
          />
          <label>Password</label>
        </div>
        <div class="field">
          <input
            type="password"
            v-model="confirmpassword"
            required
            :pattern="password"
            title="Passwords must match."
          />
          <label>Confirm Password</label>
        </div>
        <div>
          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            <span v-else>Create an account</span>
          </button>
        </div>
        <!-- <div class="signup-link">
          Already a member? <a href="#" @click.prevent="openLogin">Log In now</a>
        </div> -->
      </form>
    </div>
  </div>
  <AlertNotifications ref="AlertNotifications" />
</template>

<script>
import axios from 'axios'
import AlertNotifications from './AlertNotifications.vue'

export default {
  components: {
    AlertNotifications
  },
  props: {
    showPopup: Boolean
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      loading: false
    }
  },
  methods: {
    validateForm() {
      const form = this.$refs.form
      if (form.checkValidity()) {
        // Additional check for password match
        if (this.password !== this.confirmpassword) {
          this.$refs.AlertNotifications.showError('Passwords do not match.')
          return
        }
        this.signup()
      } else {
        form.reportValidity() // Show validation messages
      }
    },
    async signup() {
      this.loading = true

      try {
        const requestData = {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmpassword
        }

        const response = await axios.post('https://todo.nafistech.com/api/register', requestData)
        const token = response.data.token
        localStorage.setItem('authToken', token)

        this.$emit('update:showPopup', false)
        this.$refs.AlertNotifications.showSuccess('Account created successfully!')

        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } catch (error) {
        let errorMessage = 'Failed to create account.'
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message
          }
        }
        this.$refs.AlertNotifications.showError(errorMessage)
      } finally {
        this.loading = false
      }
    },
    closePopup() {
      this.$emit('update:showPopup', false)
    }
    // openLogin() {
    //   this.$emit('update:showPopup', false)
    //   this.$emit('open-login') // Ensure this matches the event name in App.vue
    // }
  }
}
</script>

<style scoped>
/* Remove custom error message styles */

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
  margin-bottom: 20px;
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
  padding-bottom: 17px;
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

.submit-btn {
  width: 100%;
  background: linear-gradient(-135deg, #41b06e, #90d26d);
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 1s ease;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #41b06e, #90d26d);
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

.submit-btn:hover {
  background-color: #36a373;
}

.submit-btn[disabled] {
  cursor: not-allowed;
  opacity: 0.7;
}

.loading-spinner {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #41b883;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
  display: inline-block;
  margin-right: 8px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
