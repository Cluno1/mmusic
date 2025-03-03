<template>
<div class="play_body" >
    
    <div class="yuansu"> 
      <div class="card"> 
        <el-card  
        
        shadow="hover" 
        style=" text-align:center;min-width:40rem;background-color:transparent">
    <template #header>
      <div class="card-header" style="text-align:center">
        <span>{{ play.current_music.name }}</span>

      </div>
    </template>
                         
    <span>--&emsp; {{ play.current_music.author }}</span>
    <template #footer>
        
        <el-tag type="primary" 
        v-for="tag in play.current_music.tags" 
        :key="tag" 
        hit="true"
        color="#f0cec8"
        round>{{ tag }}</el-tag>
    </template>
  </el-card>
      </div>
        
  <div class="lrc" >
    <!-- <span> {{ play.current_music_textArray }}</span> -->
    <div v-for="text in play.current_music_textArray" :key="text.lrcTime">{{ text.value }}<br/> </div>
  </div>
  
    </div>
    
    
</div>
</template>

<script setup>

import {usePlayStore} from '@/stores/play'
// import { before } from 'node:test';
const { play }=usePlayStore()

// const imageContainer=document.querySelector('.play_body');
// imageContainer.style.backgroundImage=`url($${play.current_music.img})`;

</script>

<style  scoped>
    .play_body{
      
       /* width: 85rem; */
       height: 40rem;
       /* background-color: rgb(222, 222, 238); */
       display: grid;
       overflow:auto;
       position: relative;
                          
       
        /* align-content:initial; */
        /* align-items: center; */
        /* justify-content: center; */
        
    }
    .card{
      width: 40rem;
      background-color: rgb(153, 234, 173);
      transition-property: all;
      transition-duration: 10s;
      transition-delay: 0.5s;
      overflow: hidden;
    }
    .card :hover{
      border-radius: 30%;
      background-color: rgb(245, 125, 191);
      box-shadow: 20px;
    }
    .yuansu{
        display: grid; 
        place-items: center;
        /* align-items: center; */
        /* /* align-content: space-between; */

        /* display: flex;
        justify-content: center;
        align-items: center; */
        
    }
    .lrc :hover {
          box-shadow: 10px;
          background-color: rgb(226, 78, 160);
        }
    .lrc{
      position: relative;
      /* background-color: rgba(255,255,255,0.5); */
        height: 400px;
        width: 100%;
        /* background-color: blue; */
        color: rgb(21, 212, 62);
        /* background-color:  rgb(172, 170, 235); */
        background-image: url('');
        /* filter: blur(1px); 调整模糊程度 */
        text-align: center;
        overflow: auto;
    }
    
</style>