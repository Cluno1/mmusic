<template>
<div class="play_body"  >
  <div> 
    <el-button @click="musicList_delete(0)">delete{{ }}</el-button>
    <el-button @click="changePlay">play or pause</el-button>
    <el-button @click="changeListIndex('plus')"> index {{ play.play_index }}</el-button>
  </div>
    
    <div class="yuansu" > 
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
import { ref } from 'vue';
// import { before } from 'node:test';
const { play,changeListIndex,changePlay,musicList_delete }=usePlayStore()





// var oBox=document.getElementsByClassName("play_body")[0] ;
// oBox.style=""
// oBox.style.backgroundImage = "url("+play.current_music.img+")";//设置背景图的的地址
// oBox.style.backgroundRepeat = "no-repeat";//设置背景不平铺
// oBox.style.backgroundPosition = "center";//设置背景图的位置
// oBox.style.backgroundSize = "cover";//设置背景图像的尺寸


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
      border-radius: 2%;
      box-shadow: 10px 5px 5px teal;
      background-color: rgb(107, 196, 231);
      transition-property: all;
      transition-duration: 1s;
      transition-delay: 0.5s;
      overflow: hidden;
    }
    .card :hover{
      border-radius: 10%;
      background-color: rgb(179, 175, 239);
      box-shadow: 2px;
    }
    .yuansu{
        display: grid; 
        place-items: center;
        border-radius: 2%;
        background-color: rgba(141, 163, 234, 0.174);
        
        
        /* align-items: center; */
        /* /* align-content: space-between; */

        /* display: flex;
        justify-content: center;
        align-items: center; */
        
    }
    .lrc :hover {
          box-shadow: 10px;
          background-color: rgb(179, 175, 239);
        }
    .lrc{
      position: relative;
      /* background-color: rgba(255,255,255,0.5); */
        height: 400px;
        width: 100%;
        /* background-color: blue; */
        color: rgb(231, 205, 129);
        /* background-color:  rgb(172, 170, 235); */
        
        /* filter: blur(1px); 调整模糊程度 */
        text-align: center;
        overflow: auto;
    }
    
</style>