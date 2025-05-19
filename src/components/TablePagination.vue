<template>
  <nav aria-label="Page navigation example" v-if="pagination.totalPages > 1">
    <ul class="pagination justify-content-center">
      <li
        class="page-item"
        :class="{ disabled: pagination.currentPage === 1 }"
        @click="changePage(pagination.currentPage - 1)"
      >
        <a class="page-link" href="#">Previous</a>
      </li>

      <li
        class="page-item"
        v-for="page in pagination.totalPages"
        :key="page"
        :class="{ active: page === pagination.currentPage }"
        @click="changePage(page)"
      >
        <a class="page-link" href="#">{{ page }}</a>
      </li>

      <li
        class="page-item"
        :class="{ disabled: pagination.currentPage === pagination.totalPages }"
        @click="changePage(pagination.currentPage + 1)"
      >
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const props = defineProps(['pagination'])
const emit = defineEmits(['page-change'])

const changePage = (page) => {
  if (page >= 1 && page <= props.pagination.totalPages) {
    emit('page-change', page)
  }
}
</script>
