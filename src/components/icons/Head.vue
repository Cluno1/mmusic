<template>
    <el-row>
    <el-col :span="6">
        <div class="search"
        @mousedown="onsearch" >
            
            <el-input 
            
            id="search"
            v-model="input.val"
            style="width: 240px"
            
            placeholder="Please input" prefix-icon="Search" />

            
            <el-button type="primary" @click="get_search">
            <el-icon><Search /></el-icon>
            <span> 搜索 {{ input.type }}</span>
            </el-button>
            
        </div>
    </el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6">
        <div >
            <span >mMusic for ihope</span>
        </div>
    </el-col>
    <el-col :span="6">
        <!-- 设置头像 -->
        <div class="user" />
           
    </el-col>
  </el-row>
</template>

<script setup>

    import {useAsideStore} from '@/stores/aside'
    const {aside} = useAsideStore()

    import {useSearchStore} from '@/stores/search'
    //要搜索的数据
    const { search : input,get_search } = useSearchStore()
    //获取鼠标按下事件
    const onsearch=()=>{
        aside.index=3
        if(!input.type){
            input.type='name'
        }
        
    };
    // //按钮按下事件，请求数据，返回值
    // import axios from 'axios';
    // const search_button=()=>{
    //     // alert(input.type)
    //     // alert(input.val)
    //     const url='https://apifoxmock.com/m1/4874726-4530691-default/mMusic/v1.1/'+input.type+'?search='+input.val
    //     axios.get(url)
    //     .then(response => {
    //         console.log("get.data:", response.data)
    //         input.data=response.data

    //     }).catch(error => {
    //         console.log("get.error:", error)
    //     })
    // }
   
</script>

<style  scoped>
   .search {
    display: flex;
   }
   .user{
    display: flex;
    
    float: right;
    
    
    border-radius: 30px;
  width:30px;
  height:30px; 
  background: url("@/assets/user.jpg") no-repeat center;
  background-size:50px;

    
   }



</style>