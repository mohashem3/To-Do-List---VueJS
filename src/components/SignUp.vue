<template>
  <div v-if="showPopup" class="overlay" @click.self="closePopup">
    <div class="wrapper animate">
      <div class="title">SignUp Form</div>
      <form @submit.prevent="validateForm">
        <div :class="['field', { invalid: nameError }]">
          <input type="text" v-model="name" @keyup="checkName" required />
          <label>Full Name</label>
          <span v-if="nameError" class="error-message">Name is required</span>
        </div>
        <div :class="['field', { invalid: emailError }]">
          <input type="text" v-model="email" @keyup="checkEmail" required />
          <label>Email Address</label>
          <span v-if="emailError" class="error-message">Invalid Email</span>
        </div>
        <div :class="['field', { invalid: passwordError }]">
          <input type="password" v-model="password" @keyup="validatePassword" required />
          <label>Password</label>
          <span v-if="passwordError" class="error-message">Invalid Password</span>
        </div>
        <div :class="['field', { invalid: confirmPasswordError }]">
          <input
            type="password"
            v-model="confirmpassword"
            @keyup="validateConfirmPassword"
            required
          />
          <label>Confirm Password</label>
          <span v-if="confirmPasswordError" class="error-message">Passwords do not match</span>
        </div>
        <div>
          <button type="submit" class="submit-btn" :disabled="loading">
            <span v-if="loading" class="loading-spinner"></span>
            <span v-else>Create an account</span>
          </button>
        </div>
        <div class="signup-link">Already have an account? <a href="#">Log In</a></div>
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
      nameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      loading: false
    }
  },
  methods: {
    checkName() {
      this.nameError = !this.name
    },
    checkEmail() {
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
      this.emailError = !emailPattern.test(this.email)
    },
    validatePassword() {
      const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      this.passwordError = !passPattern.test(this.password)
    },
    validateConfirmPassword() {
      this.confirmPasswordError = this.password !== this.confirmpassword || !this.confirmpassword
    },
    validateForm() {
      this.checkName()
      this.checkEmail()
      this.validatePassword()
      this.validateConfirmPassword()

      if (
        !this.nameError &&
        !this.emailError &&
        !this.passwordError &&
        !this.confirmPasswordError
      ) {
        this.signup()
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
        // localStorage.setItem('userName', user.name)

        this.$emit('update:showPopup', false)
        this.$refs.AlertNotifications.showSuccess('Account created successfully!')

        // Force page reload after showing success message
        setTimeout(() => {
          window.location.reload()
        }, 1500) // Adjust timing if needed
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

/* Add the invalid class to input fields for error handling */
.field.invalid input {
  border-color: red;
}

/* Error message styling */
.error-message {
  color: red;
  font-size: 0.8em;
  position: absolute;
  top: 100%;
  left: 20px;
  transform: translateY(5px);
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

.submit-btn {
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
