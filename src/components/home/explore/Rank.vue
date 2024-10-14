<script setup lang="ts">
import { ref } from 'vue';


const isshow=ref(true)
function handle(){
    isshow.value=!isshow.value
}
</script>

<template>
 <div style="background-color:black;height:600px"> 
    <div> i am box 1111111111</div>
    <div v-show="isshow"> i am box <span>askdfj</span></div>
    <div> i am box 333333333 </div>
 </div>
 <button  @click="handle">{{ isshow }}</button>
</template>

<style scoped>
div{
    width: 200px;
    height: 100px;
    background-color: #b17e7e;
}
</style>
