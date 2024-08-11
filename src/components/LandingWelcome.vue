<template>
  <div class="main-container">
    <div class="container">
      <div class="left-section">
        <h1>Stay Organized with Nafis To-Do</h1>
        <h4>Effortlessly manage your tasks—add, edit, and delete with ease.</h4>
        <router-link to="/taskview" class="nav-link">
          <button>Add My Tasks</button>
        </router-link>
      </div>
      <div class="right-section">
        <img src="@/assets/img/carousel-2.png" alt="Task management illustration" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingWelcome'
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
  padding-left: 100px;
  padding-right: 100px;
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
  background-color: #a8cd9f;
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
