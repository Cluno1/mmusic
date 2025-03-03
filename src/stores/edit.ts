import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { List } from '@element-plus/icons-vue'
export const useEditStore = defineStore('edit', () => {
  
    
    type song={
        id:number,
        name:string,
        author:string,
        lrc:string,
        img:string,
        url:string,
        tags:string[]
    }
  
    type musicItem = {
        type:number,
        id: number,
        name: string,
        author: string,
        tags: string[],//标签

        musicFile: '',//音乐文件 二进制文件
        imgFile:'', //图片二进制文件
        lrc: string//歌词字符串
        submitAuthor:string
    };

    

    const edit = reactive({
        type:1,//1是新增,2是修改
        id:-1,
        name: '',
        author: '',
        tags: ['tag1', ],//标签
        lrc: '',//歌词字符串
        submitAuthor:'',
        
    })

    const list=reactive({
        songs_list:[] as song[],
        page:0,
        total:0
    })
    const changePage=(type:string)=>{
        if(type=='plus'){
            if(list.page<list.total){
                list.page+=1
            }else if(list.page==list.total&&list.total>1){
                list.page=1
            }
        }else if(type=='less'){
            if(list.page>1){
                list.page-=1
            }else if(list.page==1&&list.total>1){
                list.page=list.total
            }
        }
    }

    watch(()=>list.page,(newValue, oldValue)=>{
        if(newValue==1){
            return
        }
        if(list.songs_list[newValue-1]!=null){
            let song=list.songs_list[newValue-1];
            edit.id=song.id;
            edit.name=song.name;
            edit.author=song.author
            edit.lrc=song.lrc
            edit.tags=song.tags
        }
    })

    watch(()=>edit.type,()=>{
        edit.id=-1,
        edit.name= '',
        edit.author= '',
        edit.tags= ['tag1', ],//标签
        edit.lrc= '',//歌词字符串
        edit.submitAuthor=''
    })

    watch(()=>list.songs_list,()=>{
        if(list.page==0){
            return
        }
        if(list.songs_list[list.page-1]!=null){
            let song=list.songs_list[list.page-1];
            edit.id=song.id;
            edit.name=song.name;
            edit.author=song.author
            edit.lrc=song.lrc
            edit.tags=song.tags
        }
    })

    
    const edit_submit=(formData:FormData)=>{
       
        let url='http://localhost:8090/submit'
        axios.post(url, formData,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(response => {
                alert("成功")
                
                console.log(response.data)
           }).catch(error => {
           console.log("post.error:", error)
           })
    }
    const edit_delete=()=>{
        var r=confirm('目前版本删除不可逆，请问是否确认删除?')
        if(r){
            axios.get(`http://localhost:8090/delete/id/${edit.id}`)
            .then(response => {
                if(response.data.code==200){
                        alert(response.data.message)

                }else{
                    alert(response.data.message)
                }


            }).catch(error => {
                console.log("get.error:", error)
            })
            
        }
    }
    const getMessage_byName=()=>{
        //通过name获取该歌词全部信息
    
    
    axios.get(`http://localhost:8090/search/name/${edit.name}`)
    .then(response => {
        
        if(response.data.code==200){

                var a:any[] =response.data.data

                console.log('name list')
                console.log(a)
                list.songs_list=a;
                list.total=a.length
                alert('list.total:'+list.total)
                
                list.page=1;
                


            // alert(response.data.data)
            // console.log('get data from edit:'+response.data.data)
            // var data=response.data.data
            // edit.id=data.id
            // edit.author=data.author
            // edit.lrc=data.lrc
            // edit.tags=data.tags 
        }else{
            alert(response.data.message)
        }
        
		
             
    }).catch(error => {
        console.log("get.error:", error)
    })
    }

   

  return { edit,list,edit_submit,getMessage_byName,edit_delete,changePage }
})
