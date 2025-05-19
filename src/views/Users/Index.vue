<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>
          Users
          <RouterLink to="/users/create" class="btn btn-primary btn-sm float-end"
            ><i class="bi bi-trash3"></i> Add User</RouterLink
          >
        </h4>
      </div>
      <div class="card-body table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Maiden Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-if="users.length > 0">
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ user.id }}</td>
              <td>{{ user.firstName }}</td>
              <td>{{ user.lastName }}</td>
              <td>{{ user.maidenName }}</td>
              <td>{{ user.age }}</td>
              <td>{{ employeeGenderForDisplay(user.gender) }}</td>
              <td>{{ user.email }}</td>
              <td>
                <RouterLink :to="{ path: `/users/edit/${user.id}` }" class="btn btn-success btn-sm"
                  ><i class="bi bi-pencil-square"></i
                ></RouterLink>
                <button
                  type="button"
                  @click="deleteUser(user.id)"
                  class="mx-1 btn btn-danger btn-sm"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <th colspan="8" class="text-center">Loading...</th>
            </tr>
          </tbody>
        </table>
        <TablePagination :pagination="paginationDetails" @page-change="handlePageChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import api from '@/api/axios.js'
import TablePagination from '@/components/TablePagination.vue'

const users = ref([])
const currentPage = ref(1)
const limit = ref(50)
const total = ref(0)

const paginationDetails = computed(() => {
  return {
    currentPage: currentPage.value,
    totalPages: Math.ceil(total.value / limit.value),
  }
})

const employeeGenderForDisplay = (gender) => {
  return gender === 'female' ? 'Female' : 'Male'
}

const getUsers = async () => {
  const skip = (currentPage.value - 1) * limit.value
  const res = await api.get(`/users?limit=${limit.value}&skip=${skip}`)
  users.value = res.data.users
  total.value = res.data.total
}

const deleteUser = async function (id) {
  if (confirm('Are you sure to delete this user?')) {
    try {
      await api.delete(`/users/${id}`)
      alert('User deleted successfully!')
      getUsers()
    } catch (error) {
      if (error.response?.status === 404) {
        alert(error.response.data.message)
      } else {
        console.error(error)
      }
    }
  }
}

const handlePageChange = (page) => {
  currentPage.value = page
}

onMounted(getUsers)

// Re-fetch users when page changes
watch(currentPage, getUsers)
</script>
