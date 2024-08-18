<template><main></main></template>
<script>
import Swal from 'sweetalert2'

export default {
  methods: {
    showSuccess(message) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 1500,
        showConfirmButton: false
      })
    },
    showError(message) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
      })
    }
  }
}
</script>
