<script setup >
import {useHomeStore} from '@/stores/home'

import {usePlayStore} from '@/stores/play'
import { once } from 'events';

  const { home,get_allData } = useHomeStore()
  const {musicList_input}=usePlayStore()
  import { onMounted } from 'vue';
  
  onMounted(()=>{
    get_allData()
  })
  

</script>

<template>
  <!-- <div style="background-color:burlywood"> 
    {{ home.data }}
  </div> -->
  <el-table
    height="600"
    :data="home.data"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="歌名"
      width="180">
    </el-table-column>
    
    <el-table-column
      prop="author"
      label="歌手"
      width="180">
    </el-table-column>

    <el-table-column
      
      label="标签"
      max-width="300">
      <template v-slot="scope">
        <div class="flex gap-2">
    <el-tag type="primary" v-for="tag in scope.row.tags" :key="tag">{{ tag }}</el-tag>
    
  </div>
      </template>
    </el-table-column>
    
    <el-table-column  
    label="播放"
    min-width="120">
      
      <template v-slot="scope">
        <el-button type="success" 
        @click="musicList_input(scope.row.id)"
        >play</el-button>
        
        
      </template>
      
    </el-table-column>
    
  </el-table>
  
</template>




