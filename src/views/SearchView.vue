<template>
    
<div >
  
  
    <el-container>
      <el-header>
        <div class="type">
          <div @click="change_type('name')" class="type">
            <div class="dot1"></div>
            <span>name</span>
          </div>
          <div @click="change_type('singer')" class="type">
            <div class="dot2"></div>
            <span>singer</span>
          </div>
          <div @click="change_type('tag')" class="type">
            <div class="dot3"></div>
            <span>tag</span>
          </div>
        
        
        </div>
        
      </el-header>
      <el-main>

      


    <!-- 表格 -->
    <el-table
    height="500"
    :data="input.data"
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
    
    min-width="120">
      
      <template v-slot="scope">
        <el-button @click="handleSwitch(scope)" > 
          播放
        </el-button>
        
        
      </template>
      
    </el-table-column>
    
  </el-table>
    </el-main>
    </el-container>
     
</div>

</template>
<script setup>
import { ref } from 'vue';

import {useSearchStore} from '@/stores/search'
import {usePlayStore} from '@/stores/play'
  const {play,musicList_input} =usePlayStore()
    //要搜索的数据
    const {search: input,get_search} = useSearchStore()


const handleSwitch=(scope)=>{
  
    musicList_input(scope.row.id)
}

const change_type=(type)=>{
input.type=type
}

</script>

<style  scoped>
.type{
  display: inline-flex;
  align-items: center;
  margin-right:16px;
}
.dot1 {
  width: 30px;
  height: 30px;
  background-color: rgb(190, 129, 230);
  border-radius: 50%;
  margin-right:6px;
}
.dot2 {
  width: 30px;
  height: 30px;
  background-color: rgb(226, 185, 123);
  border-radius: 50%;
  margin-right:6px;
}
.dot3 {
  width: 30px;
  height: 30px;
  background-color: rgb(143, 243, 156);
  border-radius: 50%;
  margin-right:6px;
}
</style>