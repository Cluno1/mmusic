<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Aside from '@/components/icons/Aside.vue'
import Head from '@/components/icons/Head.vue'

import AudioPlayer from '@/components/icons/AudioPlayer.vue';

import {useAsideStore} from '@/stores/aside'
import { usePlayStore } from './stores/play';
import { watch, watchEffect,nextTick } from 'vue';

//引入play仓库
const {play} =usePlayStore()
// 移除组件
const update=ref(true)
watch(()=>play.musicList,()=>{
	update.value = false
            // 在组件移除后，重新渲染组件
            // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
            nextTick(() => {
                update.value = true
            })

})

// import path from 'path';
const {aside} = useAsideStore()

import { useRouter } from 'vue-router'
const router=useRouter()


import { ref } from 'vue'

import { ArrowDown } from '@element-plus/icons-vue'
const display=ref(false)
const play_button=()=>{
  
  if(!display.value){
    aside.index=4
    router.push('/play')
    
  }else{
    router.go(-1)
  }
  display.value=!display.value
  
  
}

watchEffect(()=>{
  
  if(aside.index==3){
    router.push('/search')
    display.value=false
  }else if(aside.index==2){
    router.push('/edit')
    display.value=false
  }else if(aside.index==1){
    router.push('/home')
    display.value=false
  }
  

})

</script>

<template>
 
  <div class="common-layout">
    <el-container>
      <el-header >
        <Head/>
      </el-header>
      <el-container>
        <el-aside >
          <Aside/>
        </el-aside>
        <el-main>
          <!-- <RouterLink to="/">hone</RouterLink>
          <RouterLink to="/search">search</RouterLink> -->
          <div class="main">

            <RouterView />
          </div>
          
        </el-main>
        
      </el-container>
      <el-footer>
          <div class="foot" >
            <div class="showPlay" @click="play_button">
              <div class="dot1"/>
              <div class="dot2"/>
              <div class="dot3"/>
              <div class="showspan" >
                <span>

                <el-icon  v-show="display" color="#3E16A5" size="30px"><ArrowDown /></el-icon>
                <el-icon  v-show="!display" color="#3E16A5" size="30px"><ArrowUp /></el-icon>
              </span>
              </div>
              
              
            </div>
            <div class="play_music" v-if="update">
              <AudioPlayer/>
            </div>
            
          </div>
        </el-footer>
    </el-container>
  </div>



  
</template>

<style scoped>

.common-layout{
  height: 600px;
  overflow:visible;
  display: grid;
}

.main{
  max-height: 100px;
}

.foot{
  width: 100%;
  /* height: ; */
  background-color: #d8b5c7;
  
  display: flex;
  align-items: center;
  align-content: center
  
}
.play_music{
  width: 100%;
}
.showPlay{
  /* width: 100px; */
  /* color: rgb(188, 19, 92); */
  /* background-color: beige; */
  /* text-align:left ; */
  display: flex;
  /* height: 100%; */
  align-items: center;
  border-right: 500px;
  overflow: hidden;
  
}

.dot1 {
  width: 20px;
  height: 20px;
  background-color: rgb(230, 129, 184);
  border-radius: 50%;
  margin-right:6px;
  
  animation: fulldown 0.8s forwards ease-in infinite alternate;
}
.dot2 {
  width: 20px;
  height: 20px;
  background-color: rgb(125, 226, 123);
  border-radius: 50%;
  margin-right:6px;
  /* animation-delay: .1s; */
  animation: fulldown 0.9s forwards ease-in infinite alternate;
}
.dot3 {
  width: 20px;
  height: 20px;
  background-color: rgb(143, 201, 243);
  border-radius: 50%;
  margin-right:6px;
  /* animation-delay: .2s; */
  animation: fulldown 1s forwards ease-in infinite alternate;
}
@keyframes fulldown {
   from {
        margin-top:0%;
    }
    to{
        margin-top:50%;
    }
}

.showspan{
  margin-right:10px;
}
.main{
  min-height: 600px;
}

</style>
