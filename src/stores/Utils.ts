import { ref, reactive } from "vue";
import { defineStore } from "pinia";
export const useUtilStore = defineStore("util", () => {
  const netWorkUrl = reactive({
    // url:"http://8.138.0.201:8090" //on-line
    url: "http://localhost:8091",
  });

  return { netWorkUrl };
});
