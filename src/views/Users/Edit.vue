<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit User</h4>
      </div>
      <div class="card-body">
        <ul class="alert alert-danger" v-if="Object.keys(errorList).length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
            {{ error[0] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="">First Name</label>
          <input type="text" v-model="user.firstName" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Last Name</label>
          <input type="text" v-model="user.lastName" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Maiden Name</label>
          <input type="text" v-model="user.maidenName" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Age</label>
          <input type="number" v-model="user.age" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Gender</label>
          <select v-model="user.gender" class="form-control">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" v-model="user.email" class="form-control" />
        </div>
        <div class="mb-3">
          <button type="button" @click="updateUser" class="btn btn-primary">
            <i class="bi bi-floppy"></i> Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/axios.js'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params?.id
const user = ref({
  firstName: '',
  lastName: '',
  maidenName: '',
  age: '',
  gender: 'Female',
  email: '',
})

const errorList = ref({})

const updateUser = async () => {
  api
    .put(`/users/${id}`, user.value)
    .then((res) => {
      console.log(res)
      if (res.data?.id) {
        alert('User updated successfully!')
        getUserData()
        // user.value = {
        //   firstName: '',
        //   lastName: '',
        //   maidenName: '',
        //   age: '',
        //   gender: 'Female',
        //   email: '',
        // }
        errorList.value = {}
        router.push('/users')
      } else {
        alert('Something went wrong!')
      }
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 422) {
          errorList.value = error.response.data.errors
        }
        if (error.response.status == 404) {
          alert(error.response.data.message)
        }
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
}

const getUserData = async () => {
  api
    .get(`/users/${id}`)
    .then((res) => {
      user.value = res.data
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 404) {
          alert(error.response.data.message)
          router.push('/users')
        }
      }
    })
}

onMounted(async () => {
  getUserData()
})
</script>