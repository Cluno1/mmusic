<template>
    <div class="body">
        <el-menu 
    :default-active=" aside.index.toString() " 
    @select="selected" 
    background-color="#eeb3f2"
    text-color="#def5f2" 
    active-text-color="#a030ca" 

    >
                
               <el-menu-item index="1">
                
                <template #title>
                    <el-icon><House /></el-icon>
                    首页</template>
               </el-menu-item>

               <el-menu-item index="2">
                
                   <template #title>
                    <el-icon><Edit /></el-icon>
                    编辑</template>
               </el-menu-item>
              
           </el-menu>
    </div>
    
   </template>
   
   <script setup>
           
           
           import {useAsideStore} from '@/stores/aside'
           const {aside} = useAsideStore()

           //选中菜单触发的回调
        const selected = (index, indexPath) => {
            //alert(index+';'+indexPath)   // 1;1 拿到下标
            aside.index=index;
            
            
        }

       </script>
   
   <style  >
   .body{
        width: 15rem;
   }
   </style>