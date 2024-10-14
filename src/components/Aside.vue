<script setup lang="ts">


import { useScreenStore } from '../../stores/screenStore';
import {isCollapse,selected} from '../ts/Aside'
import { useI18n } from 'vue-i18n';

const {t} =useI18n()
const screenStore=useScreenStore()


</script>

<template>
  

<el-radio-group v-model="isCollapse" style="margin-bottom: 1rem" :size=screenStore.screen.size>
    <el-radio-button :value="false" v-if="isCollapse" ><el-icon><Expand /></el-icon></el-radio-button>
    <el-radio-button :value="true" v-if="!isCollapse"><el-icon><Fold /></el-icon></el-radio-button>
</el-radio-group>
    <el-menu
    default-active="explore"
    :collapse="isCollapse"
    @select="selected"
    
  >
    <el-sub-menu index="home">
      <template #title>
        <el-icon><Headset /></el-icon>
        <span>{{ t('message.aside.home') }}</span>
      </template>
      <el-menu-item-group>
        <!-- <template #title><span>Group One</span></template> -->
        <el-menu-item index="explore" > {{ t('message.aside.explore') }}</el-menu-item>
        <el-menu-item index="find">{{ t('message.aside.find') }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="user">
      <template #title >
          <el-icon><User /></el-icon>
          <span>{{ t('message.aside.user') }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="userMessage" >{{ t('message.aside.userMessage') }}</el-menu-item>
        <el-menu-item index="dataAnalyze">{{ t('message.aside.dataAnalyze') }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="create">
      <template #title>
        <el-icon><Lollipop /></el-icon>
        <span>{{ t('message.aside.create') }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="submit" >{{ t('message.aside.submit') }}</el-menu-item>
        <el-menu-item index="create">{{ t('message.aside.create') }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="setting">
      <el-icon><Setting /></el-icon>
      <template #title>{{ t('message.aside.setting') }}</template>
    </el-menu-item>
  </el-menu>

  
 
</template>

<style scoped lang="scss">



</style>