<template>
  <h1>find page</h1>
</template>

<script setup>

  function Parent(){
    this.name='dong'
    
  }
  Parent.prototype.getName=function (){
    return this.name
  }

  let child={
    name:'deng',
    __proto__:new Parent()
  }
  console.log(child,'child')

</script>

<style  scoped>

</style>