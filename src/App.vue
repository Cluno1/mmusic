<script setup lang="ts">
// defineProps<{ msg: string }>()  暴露attribute


import { onMounted, ref, watch } from 'vue';
import { useDarkStore } from '../stores/dark';
import { useScreenStore } from '../stores/screenStore';
import { ElLoading } from 'element-plus'
import Aside from './components/Aside.vue';
import Background from './components/background/Background.vue';
import Head from './components/Head.vue';
import Main from './components/Main.vue';
import { useWebSocketStore } from '../stores/webSocketStore';
import AudioPlay from './components/AudioPlay.vue';
import { useAudioStateStore}from '../stores/audioStateStore'
import axios from 'axios';

const audioStateStore=useAudioStateStore()
const darkStore=useDarkStore()
const screenStore=useScreenStore()

let htmlLayout=null



let smQuery =null
let mdQuery = null
let lgQuery = null
onMounted(()=>{

  htmlLayout=document.querySelector('html')
  htmlLayout.style.backgroundColor='#f3bfe3'
  

  //监听屏幕尺寸
 smQuery = window.matchMedia('(max-width: 575px)');
 mdQuery = window.matchMedia('(min-width: 576px) and (max-width: 767px)');
 lgQuery = window.matchMedia('(min-width: 768px)');
 handleChange();
 // 添加监听器
smQuery.addEventListener('change', handleChange);
mdQuery.addEventListener('change', handleChange);
lgQuery.addEventListener('change', handleChange);
})

function handleChange(){
  if(smQuery.matches){
    screenStore.screen.screen='phone'
    screenStore.screen.size='small'
    
  }else if(mdQuery.matches){
    screenStore.screen.screen='tablet'
    screenStore.screen.size='default'
    
  }else if(lgQuery.matches){
    screenStore.screen.screen='desktop'
    screenStore.screen.size='default'
    
  }
}



watch(()=>darkStore.dark,(newVal)=>{
  if(newVal)
    htmlLayout.style.backgroundColor='#484e5b'
  else   
    htmlLayout.style.backgroundColor='#f3bfe3'
})

watch(()=>audioStateStore.playState.isShowList,(newVal)=>{

  if(newVal)
    loadingInstance=loading("Main");
  else 
    loadingInstance?.close()
})

let loadingInstance=null
let loading=(target:string)=>{
  const loadingInstance=ElLoading.service({
    target:target
  })
  return loadingInstance
}




</script>

<template>
<div class="app-layout" id="app-layout">
  <Background/>
    <el-container>
      <el-header>
        <Head/>
      </el-header>
      <el-container>
        <el-aside width="10rem">
          <div class="aside-box"> 
            <Aside />
          </div>
        </el-aside>
        <el-main ><Main/></el-main>
      </el-container>
      
        
      
    </el-container>
    
   
    

</div>

<div class="footer"> 
      <AudioPlay/>
</div>

</template>

<style scoped lang="scss">
  .footer {
    position: fixed; 
    bottom: 0;
    left: 10rem; // 确保左侧对齐
    width: 100%; // 确保宽度填满整个屏幕宽度
    z-index: 2000; 
  }

  .aside-box{
    position: fixed;
    top: 6rem;
    left: 0rem;
    z-index: 20;
  }
</style>
