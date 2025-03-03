<template>
   <div class="edit-view"> 
    <el-menu
    default-active="1"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
    
  >
  
    <div class="flex-grow" flex-grow="1" >
        <el-text class="mx-1" type="primary" >choose type to edit :</el-text>
    </div>
    
    <el-menu-item index="0" ></el-menu-item>
    <el-menu-item index="1" >
        <template #title>
            <el-icon><EditPen /></el-icon>
                    修改
        </template>
    </el-menu-item>
    
      
    <el-menu-item index="2">
        <template #title>
            <el-icon><CirclePlus /></el-icon>
                    新增</template>
        
        
    </el-menu-item>
      
    
  </el-menu>
    <div> 
        <br/>
        <RouterView/>
    </div>
   </div>
  
</template>

<script setup>
import { useRouter } from 'vue-router'
const router=useRouter()
import { useEditStore } from '@/stores/edit';
import { ref, watchEffect } from 'vue'
const {edit} =useEditStore()

const handleSelect=(index, indexPath)=>{
   
    edit.type=index
       
}

watchEffect(()=>{
    if(edit.type==1){
        router.push('/modify')
    }else if(edit.type==2){
        router.push('/add')
    }
})

</script>

<style  scoped>
.edit-view{
    display: grid;
}
</style>