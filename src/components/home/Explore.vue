<script setup lang="ts">
import { RouterView,RouterLink } from 'vue-router'
import router from '../../router';
import { onMounted } from 'vue';
import { useScreenStore } from '../../../stores/screenStore';

const screenStore=useScreenStore()

onMounted(()=>router.push('/explore/recommend'))

</script>

<template>
    <div class="explore-layout">
        <div class="explore-layout-head">
            <RouterLink to="/explore/recommend"><el-button :size=screenStore.screen.size>推荐</el-button></RouterLink>
            <RouterLink to="/explore/rank"><el-button :size=screenStore.screen.size>排行</el-button></RouterLink>
            <RouterLink to="/explore/songList"> <el-button :size=screenStore.screen.size>歌单</el-button></RouterLink>
            <RouterLink to="/explore/radio"><el-button :size=screenStore.screen.size>电台</el-button></RouterLink>
            <RouterLink to="/explore/singer"><el-button :size=screenStore.screen.size>歌手</el-button></RouterLink>

            
        </div>
        <div class="explore-layout-main">
            
            <RouterView/>
        </div>
    </div>
</template>

<style scoped lang="scss">
    

</style>
