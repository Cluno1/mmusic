<template>
<div class="modify"> 
  
  <el-form :model="edit" label-width="auto" style="max-width: 600px">
    <div> 
      <!-- 分页标签 -->
      

      <div class="page" v-show="list.total>1?true:false"> 
        <span> 搜索到{{ list.total }}首歌:&nbsp;</span>
        <el-button size="small " @click="changePage('less')"><el-icon><ArrowLeftBold /></el-icon></el-button>
        <span> &nbsp;{{ list.page }}/{{ list.total }} &nbsp;</span>
        <el-button size="small" @click="changePage('plus')"><el-icon><ArrowRightBold /></el-icon></el-button>
        
      </div>
      
    </div>
    <el-form-item label="搜索歌名">
      <el-autocomplete
        v-model="edit.name"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please search music name"
        @select="handleSelect"
      />
      
    </el-form-item>

    <el-form-item label="歌手">
      <el-input v-model="edit.author" style="width: 200px;" clearable />
    </el-form-item>
    
    <el-form-item label="添加标签">
      <div class="flex gap-2">
    <el-tag
      v-for="tag in edit.tags"
      :key="tag"
      effect="dark"
      type="warning"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      round
    >
      {{ tag }}
    </el-tag>
    <el-input
      clearable
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
      round
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput" round>
      + New Tag
    </el-button>
  </div>
  </el-form-item>
  
    <el-form-item label="更新歌曲封面">
      <el-upload
    v-model:file-list="pictureList"
    action=""
    :auto-upload="false"
    :limit="1"
    list-type="picture-card"
    :on-exceed="handleExceedPicture"
    
  >
  <el-icon  class="avatar-uploader-icon"><Plus /></el-icon>
    <template #tip>
      <div >
        this file must be Image format
      </div>
    </template>
  </el-upload>
    </el-form-item>
    <el-form-item label="更新歌词">
      <el-input v-model="edit.lrc" type="textarea" :rows="20" placeholder="歌词每行以\n结尾" />
  </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="song_modify">modify</el-button>
      <el-button type="warning" @click="song_delete">delete</el-button>
    </el-form-item>
  </el-form>
  <el-divider />
  
</div>
</template>


<script setup lang="ts">
import { useEditStore } from '@/stores/edit';
import { useUtilStore } from '@/stores/Utils';
import { onMounted, ref,nextTick } from 'vue'
import axios from 'axios';

const {edit,list,edit_submit,getMessage_byName,edit_delete,changePage}=useEditStore()
const {netWorkUrl}=useUtilStore()


interface RestaurantItem {
  value: string
}

const restaurants = ref<RestaurantItem[]>([])



const querySearch = (queryString: string, cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}



const handleSelect = (item: RestaurantItem) => {
  getMessage_byName()
}

const getName= async  ()=>{
        let url=netWorkUrl.url+'/name/all'
        try{
            const a= await axios.get(url).then((response)=>{
                if(response.data.code==200){

                    let arr:any[]=[]
                    for(let i=0;i<response.data.total;i++){
                        arr.push({
                            'value':response.data.data[i]
                        })
                    }
                    restaurants.value=arr;
    
                }
            })
            

        }catch (err) {
            console.log(err)
            alert('请求出错！')
        }

        
        
}

onMounted(() => {

  
  getName()
  
  
 
  
  
})

//picture区
const pictureList= ref<UploadUserFile[]>([])

const handleExceedPicture: UploadProps['onExceed'] = () => {
  alert('please choose only one picture')
  pictureList.value.shift()
}

//tag区
import { ElInput } from 'element-plus'

const inputValue = ref('')

const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const handleClose = (tag: string) => {
  edit.tags.splice(edit.tags.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    edit.tags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value=''
}

//修改区上传
const song_modify=()=>{
  if(edit.id==-1){
    alert('没有该歌曲资料,请检查歌名是否正确')
    return
  }
  let formData=new FormData();

  pictureList.value.forEach((item)=>{
    formData.append('imgFile',item.raw)
  })
  
  formData.append('name',edit.name)
  formData.append('author',edit.author)
  formData.append('lrc',edit.lrc)
  formData.append('id',edit.id)
  formData.append('type',edit.type)
  formData.append('tags',edit.tags)


  edit_submit(formData)
}

const song_delete=()=>{
  if(edit.id==-1){
    alert('没有该歌曲资料,请检查歌名是否正确')
    return
  }
  edit_delete()
}




</script>

<style  scoped>

</style>