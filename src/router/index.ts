import { onMounted } from 'vue';
import { useUSerStore } from './../../stores/userStore';
import { useCookieStore } from './../../stores/cookieStore';
import { createRouter, createWebHistory } from 'vue-router'
import { useWebSocketStore } from '../../stores/webSocketStore';

let userStore=null
let cookieStore=null


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/explore',
        name: 'explore',
        alias:'/',
        component:  () => import("../components/home/Explore.vue"),
        children:[
          {
            path: 'search',
            name: 'search',
            component:  () => import("../components/Search.vue"),
          },
          {
            path: 'recommend',
            name: 'recommend',
            component:  () => import("../components/home/explore/Recommend.vue"),
          },
          {
            path: 'rank',
            name: 'rank',
            component:  () => import("../components/home/explore/Rank.vue"),
          },
          {
            path: 'songList',
            name: 'song-list',
            component:  () => import("../components/home/explore/SongList.vue"),
          },
          {
            path: 'radio',
            name: 'radio',
            component:  () => import("../components/home/explore/radio/Radio.vue"),
          },
          {
            path: 'singer',
            name: 'singer',
            component:  () => import("../components/home/explore/Singer.vue"),
          },
         
        ],
      },
      {
        path: '/find',
        name: 'find',
        component: ()=> import('../components/home/Find.vue')
      },
      {
        path: '/userMessage',
        name: 'userMessage',
        component: ()=> import('../components/user/UserMessage.vue'),
        
      },
      {
        path: '/dataAnalyze',
        name: 'dataAnalyze',
        component: ()=> import('../components/user/DataAnalyze.vue'),
        beforeEnter:(to,from,next)=>{
          userStore=useUSerStore();
            if(userStore.userMessage.isLogin){
              next()
            }else{
              if(confirm('当前尚未进行注册或者登录，是否需要现在进行登录？')){
                next('/login')
              }else{
                next(from.path)
              }
            }
        }
      },
      {
        path: '/login',
        name: 'login',
        component: ()=> import('../components/user/Login.vue')
      },
      {
        path: '/sign',
        name: 'sign',
        component: ()=> import('../components/user/Sign.vue')
      },
      {
        path:'/call-center',
        name:'call-center',
        component:()=> import('../components/CallCenter.vue')
      },
      {
        path: '/mail',
        name: 'mail',
        component: ()=> import('../components/mail/Mail.vue')
      },
      {
        path: '/radio-live',
        name: 'radioLive',
        component:  () => import('../components/home/explore/radio/RadioLive.vue'),
      },
      {
        path: '/create',
        name: 'create',
        component: ()=> import('../components/create/Create.vue')
      },
        
     
    ]
  })
  

  router.beforeEach((to,from,next)=>{
    userStore=useUSerStore()
    cookieStore=useCookieStore()
    
    if(!userStore.userMessage.isLogin){
      let name=cookieStore.getCookie('userName')
      let password=cookieStore.getCookie('password')
      if(name!=null&&password!=null){
          //后台验证
          
            userStore.userMessage.isLogin=true;
            userStore.userMessage.message.userName=name
            userStore.userMessage.message.userId=2
          
      }
      
  
    }else{
      
    //登录websocket  用户已经登陆并且没有链接socket时
    let webSocketStore= useWebSocketStore()
    if(!webSocketStore.socket){
      webSocketStore.initWebSocket()
    }
    
    }
    next()
      
    
  })
  export default router