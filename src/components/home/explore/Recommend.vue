<script setup lang="ts">
import { onMounted, ref } from 'vue';
import{useBoxStore} from '../../../../stores/boxStore'


import { getRecommentApi } from '../../../api/project';
import { useIntersectionObserver } from '@vueuse/core';


    interface Song {
                songId:number,
                songName:string,
                songSinger:string,
                songSignature:string,
                songSubmitTime:string,
                songImg:string,//url
                songImgLoad:boolean
            }

const songs=ref([] as Song[])

async function getSongs(){

    let re= await getRecommentApi()
    
    console.log(re.data.data)
    re.data.data.forEach((song)=>{
        let r=Math.random()%100
        let s=`https://picsum.photos/580/460?random=${r}`
        song.songImg=s;
        songs.value.push(song)
    })
}
//节流
function decReFresh(time:number){
    let timer=true  //true ok ; false no and wait until true

    return function refresh(){
        
        if(timer){
            songs.value=[]
            getSongs()
            timer=false
            setTimeout(() => {
                console.log('ok')
                timer=true
                    
            }, time);
        }
    
    }
}

let a=decReFresh(2000)



function handleScroll(event:Event){

   const {target} = event

   
    if(target.scrollHeight-target.scrollTop<=(target.clientHeight)){
        getSongs()
    }
}



onMounted(async()=>{
    getSongs()

})
//box test
const bgStyle=ref<null|Song>(null)
const boxSongs=ref([] as Song[])

function initBoxMessage(){
    
    for(let i=0;i<2;i++){

        let song={

            songId:i,
            songName:'达尔文',
            songSinger:'蔡健雅',
            songSignature:'好听，温柔',
            songSubmitTime:'2024-9-26',
            songImg:`https://picsum.photos/580/460?random=${i}`,//url
            songImgLoad:false
        };

        boxSongs.value.push(song)
        song={

            songId:i+1,
            songName:'人来人往',
            songSinger:'陈奕迅',
            songSignature:'好听，爱听，多来点',
            songSubmitTime:'2024-9-27',
            songImg:`https://picsum.photos/580/460?random=${i+1}`,//url
            songImgLoad:false
        };
        boxSongs.value.push(song)
        
    }
}

function backgroundStyle(song:Song|null){
   if(!song){
    return;
   }
    return {
        backgroundImage:`url(${song.songImg})`,
        backgroundSize:'cover',
    }
}

initBoxMessage()

// const timer 推荐盒子的包装器    防抖
function decorateBox(){

  function check(){
    if(index>=boxSongs.value.length){
        index=0
    }else if(index<0){
        index=boxSongs.value.length-1;
    }
  }
  let index=0;
  let timerId=null;
  function boxChange(turn:null|number|'left'|'right'){
    
    clearTimeout(timerId)
    let turnNull=0;
    for(let i=0;i<boxSongs.value.length;i++){
        if(boxSongs.value[i].songImgLoad){
            turnNull=i+1;
            boxSongs.value[i].songImgLoad=false
        }

    }
  if(turn===null){
    
   index=turnNull;

    check();
    boxSongs.value[index].songImgLoad=true
    timerId=setTimeout(()=>boxChange(null),3000)
  }else if(turn==='left'){
    
    index--;
    check();
    boxSongs.value[index].songImgLoad=true
    timerId=setTimeout(()=>boxChange(null),5000)
  }else if(turn==='right'){
    index++;
    check();
    boxSongs.value[index].songImgLoad=true
    timerId=setTimeout(()=>boxChange(null),5000)
  }else {
    index=turn
    check();
    boxSongs.value[index].songImgLoad=true
    timerId=setTimeout(()=>boxChange(null),5000)
  }
  bgStyle.value=boxSongs.value[index]
  }
return boxChange
}

const boxTurn=decorateBox()
boxTurn(null)

</script>

<template>
    <keep-alive>
    <div class="recommend-layout "> 
        <button class="refresh" @click="a"> 刷新</button>
       
        <div class="box-layout" :style="backgroundStyle(bgStyle)"> 
            <div class="color-blur" >
    
                <div class="box-box"> 
                    <div class="box-button"> 
                        <div class="box-left" @click="boxTurn('left')"> 
                            <el-icon><ArrowLeft /></el-icon>
                        </div>
                        <div class="box-right" @click="boxTurn('right')"> 
                            <el-icon><ArrowRight /></el-icon>
                        </div>                
                    </div>
                    <div class="box-container"> 
                        <div 
                            class="box-img"
                            v-for="song in boxSongs"
                            :key="song.songId"
                            :style="backgroundStyle(song)"
                            v-show="song.songImgLoad"
                        />
                    </div>
        <div  class="box-pointers">
            <span 
            class="box-pointer"
            v-for="(song,index) in boxSongs"
            :key="song.songId"
            @click="boxTurn(index)"
            />
            
        </div>

                </div>
            
                <div class="box-message" >
    <div 
   class="box-message-item" 
   v-for="song in boxSongs"
   :key="song.songId"
   v-show="song.songImgLoad"
   > 
   {{ song.songName }}<br/>
   {{ song.songSinger }}<br/>
   {{ song.songSignature }}<br/>
   {{ song.songSubmitTime }}<br/>
   </div>
                </div>
            </div>
        </div>
        
        <div class="abc "  @scroll="handleScroll"> 

            <div 
                class="abc-item "
                v-for="(song) in songs"
                :key="song.songId"  
            >
                    <img class="abc-item-img" 
                    :src='song.songImg'
                    @load='song.songImgLoad=true'
                    v-show="song.songImgLoad"
                    >
                    <img src="/src/assets/pictureHolder/0.png" v-show="!song.songImgLoad">
                    <div class="abc-item-songMessage"> 
                            {{ song.songName }}<br/>
                            {{ song.songSinger }}<br/>
                            {{ song.songSignature }}<br/>
                            {{ song.songSubmitTime }}<br/>
                            
                    </div>
                    
            </div>
        </div>

        
        
    </div>
    </keep-alive>
       
        
    
</template>

<style scoped  lang="scss">
.recommend-layout{
    .refresh{
    z-index: 3;
    position: absolute;
    right: 1rem;
    top: 20rem;
    border-radius: 10px;
    background-color: #9099ed5e;
}
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 2rem;
    .abc{
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(13rem,1fr));
        overflow: scroll;
        width: 100%;
        height: 40rem;
        
        .abc-item{
            width: 13rem;
            height: 22rem;
            img{
                width: 13rem;
                height: 12rem;
            }
            .abc-item-songMessage{
               text-align: center;
                
            }
        }
        
    }
    .box-layout{
         border-radius: 1rem;
         overflow: hidden;
         display:inline-block;
         max-width: 60rem;
         backdrop-filter: blur(100px);
         background-position: center;

         .color-blur{
            background-color: #ffffff7b;
            
            height: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .box-box{
                box-shadow:5px 5px 10px  2px rgba(38, 38, 66, 0.64);
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;

                overflow: hidden;
                width: 30rem;
                height: 20rem;
                background-color: #d04e4e49;
                .box-button{
                     display: flex;
                     justify-content: space-between;
                     position: absolute;
                     width: 100%;
                     height: 100%;
                     align-items: center;
                     .box-left,.box-right{

                       height: 100%;
                       width: 10%;
                       display: flex;
                       align-items: center;
                       justify-content: center;
                       background-color: #638eaa0f;
                       z-index: 1;
                     }

                     .box-left:hover,.box-right:hover{
                       background-color: #638eaaa9;
                     }
                }
                .box-pointers{
               display: flex;
               position: absolute;
               bottom: 1rem;
               justify-content: center;
               align-items: center;
               gap:1rem;
               .box-pointer{
                 width: 1rem;
                 height: 1rem;
                 background-color: #ffffff6e;
                 border-radius: 50%;
               }
               .box-pointer:hover {
                 background-color:  #fffffff8;
                 border-radius: 40%;
               }
                }

                .box-container{
                    // overflow: hidden;
                    width: 30rem;
                    height: 20rem;
                    display: flex;
                    .box-img{
                        width: 100%;
                        height: 100%;

                    }
                
                }
            
            }
            .box-message{
                width: 20rem;
                height: auto;

                .box-message-item{
                  text-align: center;
                }
            }
        }
    }
}


</style>
