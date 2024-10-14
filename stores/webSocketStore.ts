import { ref, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import { useUSerStore } from './userStore'
import { nextTick } from 'process'

export const useWebSocketStore = defineStore('webSocket', () => {
  const socket = ref(null);
  let user:{
    userId:number,
    userName:string
  };
  const messageRespond=reactive({
    on:false,
    fromUser:{   //来自的用户
      userName:'',
      userId:0
    },
    message:{
      service:'',
      data:'',
      from:'', //数据来源
      to:''  //数据要发给谁  ，谁去监听该数据
    }
  })

  type  Message={  //进程里面的数据，这里不管
    service:String,
    to:String,
    data:String,
    from:String
  }

  function initWebSocket(){
    
    const url = 'ws://localhost:8887';
    //获取用户cookie信息 ...
    let userStore=useUSerStore()
    
    user=userStore.userMessage.message

    //创建一个url和查询参数
    const urlWithParams = new URL(url);
    
     
        // 创建 WebSocket 实例
        
        
        urlWithParams.searchParams.append('userId', String(user.userId));
        urlWithParams.searchParams.append('userName', String(user.userName));
  
        socket.value = new WebSocket(urlWithParams.href);
    
        // 监听打开事件
        socket.value.onopen = () => {
            console.log('WebSocket connection established');
        };
      
        // 监听消息事件
        socket.value.onmessage = (event) => {
  
          let m={
            from:{
              userId:0,
              userName:''
            },
            message:{
              service:'',
              to:'',
              data:'',
              from:''
            }
          }
          m= JSON.parse(event.data) //解析出信息
  
          messageRespond.fromUser=m.from
          messageRespond.message=m.message
          messageRespond.on=true
          
        };
        
        // 监听错误事件
        socket.value.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      
        // 监听关闭事件
        socket.value.onclose = () => {
          console.log('WebSocket connection closed');
        };
      
    
   
  }

  function sendMessage(message:Message,to:Array<{}>){
      if(message){
        
        let m={
            from:user,
            message:message,
            to:to,
        }

        //发送。。。
        socket.value.send(JSON.stringify(m));
    
      }else{
        alert('不能发送空消息')
      }
  }

  function sendWSMessage(service,data){
    let m={
      from:user,
      message:{  
        service:service,
        to:"",
        data:data,
        from:""
      },
      to:[{userName:'webSocket',userId:1}],
    }
    socket.value.send(JSON.stringify(m));
  }

  
    

  return { initWebSocket,sendMessage,messageRespond,sendWSMessage,socket }
})