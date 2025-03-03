import { List } from '@element-plus/icons-vue';
import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useHomeStore = defineStore('home', () => {

  type song={
    id:number,
    name:string,
    author:string,
    lrc:string,
    img:string,
    url:string,
    tags:{}
  }
  type songHead={
    id:number,
    name:string,
    author:string,
    tags:{}
  }

  const home = reactive({
    
    data:[] as songHead[]
  })
  
  const get_allData=()=>{
    let url='http://localhost:8090/search/all'
    axios.get(url)
    .then(response => {
      if(response.data.code==200){
        
        home.data=response.data.data;
      }else{
        alert(response.data.message)
      }
       

    }).catch(error => {
        console.log("get.error:", error)
    })
  }

  return { home,get_allData }
})
