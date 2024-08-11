<script>
export default {
  name: 'NavBar'
}
</script>
<!-- END Script -->

<!-- START Template -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <!-- Logo -->
      <a class="navbar-brand" href="/">
        <img src="@/assets/img/to-do.svg" alt="Home" class="todo-icon" />
      </a>
      <a class="navbar-brand" href="/">Nafis To-Do</a>

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
          <!-- Home -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
          </li>

          <!-- Tasks -->
          <li class="nav-item">
            <router-link to="/taskview" class="nav-link" exact-active-class="active"
              >To-Do</router-link
            >
          </li>

          <!-- About Us -->
          <li class="nav-item">
            <router-link to="/about" class="nav-link" exact-active-class="active"
              >About Us</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<!-- END Template -->

<!-- START Styles -->
<style scoped>
.navbar {
  background-color: rgb(0, 0, 0);
}

.todo-icon {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}

.nav-link {
  color: white; /* Initial color */
  transition:
    color 0.3s,
    transform 0.3s; /* Smooth transition */
}

.nav-link:hover {
  color: #41b883; /* Color on hover */
  transform: scale(1.1); /* Slightly enlarge on hover */
}

.nav-link.active {
  color: #41b883; /* Color for active link */
  transform: scale(1); /* Ensure no scaling on active state */
}
</style>

<!-- END Styles -->
