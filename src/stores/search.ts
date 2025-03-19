import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUtilStore } from './Utils'

export const useSearchStore = defineStore('search', () => {
  const {netWorkUrl}=useUtilStore()
  type songHead={
    id:number,
    name:string,
    author:string,
    tags:{}
  }

  const search = reactive({
    val:'',
    type:'name', //要搜索的类型 name , singer , tag
    data:[] as songHead[]
  })
  
  const get_search=()=>{

    let url=netWorkUrl.url+'/select?type='

    if(search.type=='name'){
      url=url+'name&search='+search.val;
    }else if(search.type=='singer'){
      url=url+'author&search='+search.val;
    }else if(search.type=='tag'){
      url=url+'tag&search='+search.val;
    }
    
    axios.get(url)
    .then(response => {
      if(response.data.code==200){
        search.data=response.data.data;
      }else{
        alert(response.data.message)
      }

    }).catch(error => {
        console.log("get.error:", error)
    })
  }

  return { search,get_search }
})
