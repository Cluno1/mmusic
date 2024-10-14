<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useUSerStore } from '../../../stores/userStore';

import router from '../../router';
import { useCookieStore } from '../../../stores/cookieStore';

let userStore=useUSerStore()
let cookieStore=useCookieStore()
//退出登录函数
function withdraw(){
    cookieStore.deleteCookie('userName')
    cookieStore.deleteCookie('password')
    userStore.userMessage.isLogin=false
    userStore.userMessage.message.userName=''
}

</script>

<template>
    <div class="user-message-unlogin" v-show="!userStore.userMessage.isLogin"> 
        还没有登录，请先<RouterLink to="/login">登录</RouterLink>
        没有账号？<RouterLink to="/sign">注册</RouterLink>
    </div>
    <div class="user-message-layout"  v-show="userStore.userMessage.isLogin">
        <div>头像</div>
        <div>{{ userStore.userMessage.message.userName }}</div>
        <div>{{ userStore.userMessage.message.signature }}</div>
        <el-button @click="withdraw"> 退出当前账号</el-button>
        
    </div>

</template>

<style scoped>

</style>
