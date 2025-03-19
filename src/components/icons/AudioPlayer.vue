
<template>
	
	<div class="player"  >

		<lbAudio
        class="music-player"
        :musicList="play.musicList"
        :index="0"
        :lyrics="false"
    	>
    	</lbAudio>
		
	</div>
	
</template>
<script setup lang="ts">
// @ts-ignore
import lbAudio from '@/components/icons/Audio/index.vue';
import { usePlayStore } from '@/stores/play';
import { pl } from 'element-plus/es/locales.mjs';
import { ref,reactive, handleError, watch,nextTick } from 'vue';

const {play}=usePlayStore()

</script>
<style>
.player{
	width: auto;
	height: 100px;
}
.music-player {
	width: 100%;
	height: 100%;
}
</style>

