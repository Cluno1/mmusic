<template>
<div class="add">  
   
    <el-form :model="edit" label-width="auto" style="max-width: 600px">
    <el-form-item label="歌名">
      <el-input v-model="edit.name" style="width: 200px;" clearable/>
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
    <el-form-item label="歌词文本">
      <el-input v-model="edit.lrc" type="textarea" :rows="20" placeholder="歌词每行以\n结尾" />
    </el-form-item>
    <el-form-item label="歌曲文件">
      <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action=""
    :auto-upload="false"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    drag
  >
  <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        this file must be Audio format
      </div>
    </template>
  </el-upload>
    </el-form-item>
    <el-form-item label="歌曲封面">
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
    <el-form-item label="上传者名字(real name)">
      <el-input v-model="edit.submitAuthor" style="width: 200px;" clearable/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">submit</el-button>
      <el-button type="warning" @click="clearAll">reset</el-button>
    </el-form-item>

    </el-form>
</div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useEditStore } from '@/stores/edit';
const {edit,edit_submit}=useEditStore()
import type { UploadProps, UploadUserFile } from 'element-plus'

//这里是file 和picture 定义区
const fileList = ref<UploadUserFile[]>([])
const pictureList= ref<UploadUserFile[]>([])
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  alert('please choose only one file')
  fileList.value.shift()
}

const handleExceedPicture: UploadProps['onExceed'] = (files, uploadFiles) => {
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

//clear
const clearAll=()=>{
  edit.name=''
  edit.author=''
  edit.lrc=''
  edit.tags=[]
  fileList.value.shift()
  pictureList.value.shift()
}

//submit 上传
const onSubmit=()=>{

  let formData=new FormData();

  fileList.value.forEach((item)=>{
    formData.append('musicFile',item.raw)
  })

  pictureList.value.forEach((item)=>{
    formData.append('imgFile',item.raw)
  })
  
  formData.append('name',edit.name)
  formData.append('author',edit.author)
  formData.append('lrc',edit.lrc)
  formData.append('id',edit.id)
  formData.append('type',edit.type)
  formData.append('tags',edit.tags)
  formData.append('submitAuthor',edit.submitAuthor)

  edit_submit(formData)
  
}
</script>

<style  scoped>

</style>