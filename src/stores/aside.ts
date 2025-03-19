import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAsideStore = defineStore('aside', () => {
  const aside = reactive({
    index: 1
  })
  

  return { aside }
})
