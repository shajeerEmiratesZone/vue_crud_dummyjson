import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// options api
// export const useCounterStore = defineStore('counter', {
//   state() {
//     return {
//       count: 0,
//     }
//   },
// getters:{
//     doubleCount: (state) => state.count*2
// },
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

// composition api
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return {
    count,
    doubleCount,
    increment,
  }
})
