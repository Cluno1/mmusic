<template>
  <div class="layout">
    <div class="left"></div>
    <div class="middle"> </div>
    <div class="right"></div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue';




console.log(1)

let f=async function(){
  console.log(2)
  await console.log(3)
  console.log(4)
}
f()
setTimeout(() => {
    console.log(5)
    
}, 0);

new Promise((resolve,reject)=>{
  console.log(6)
  return resolve()
}).then(()=>{
  console.log(7)
})
nextTick(()=>console.log(8))

</script>

<style  scoped lang="scss">
.layout{
  display: grid;
  grid-template-columns: 200px 1fr 20rem;
  width: 100%;
  height: auto;
  .left{
    
    height: 40rem;
    background-color: #975bcf;
  }
  .middle{
    
    height: 40rem;
    border-color: black;
    border: 2px;
    background-color: #c66565;
  }
  .right{
    
    height: 40rem;
    background-color: #71d841;
  }

}
</style>