<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h4>Login Form</h4>
          </div>
          <div class="card-body">
            <div class="alert alert-info">
              Username: emilys <br />
              Password: emilyspass
            </div>
            <form @submit.prevent>
              <div class="form-group mb-3">
                <label for="email"> Username </label>
                <input
                  type="text"
                  v-model="username"
                  class="form-control"
                  placeholder="Username"
                  required
                />
              </div>
              <div class="form-group mb-3">
                <label for="password"> Password </label>
                <input
                  type="password"
                  v-model="password"
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>
              <button class="btn btn-primary" @click="handleLogin">
                <i class="bi bi-box-arrow-right"></i> Login
              </button>
            </form>
            <!-- <p class="mt-3">
              Not registered?
              <a href="#">Create an account</a>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
const auth = useAuthStore()
const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  const credentials = { username: username.value, password: password.value }
  await auth
    .login(credentials)
    .then((res) => {
      router.push('/users')
    })
    .catch(function (error) {
      //   if (error.response.status == 400) {
      alert(error.response.data.message)
      //   }
    })
}
</script>