import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUSerStore = defineStore('userStore', () => {
  const userMessage = reactive({
    isLogin:false,
    message:{
      userName:'',
      userId:2,
      img:'',
      signature:'我是个性签名',

    }
  })

  interface song{
    songName:string,
    songAuthor:[string,string],
    songSinger:string,
  }

  const historyList=ref([] as song[])

  interface userListenTimeDay{
    id:number  //id也是代表周几
    day:string,  //周几
    listenTime:number //4h-3min-4s=270 min
  }

  const listenTimeWeek=ref([] as userListenTimeDay[])  //数组0-6  index是相离目前日期，index=6即今天

  interface listenRank{
    time:number,
    songMessage:song
  }
  const listenRank=ref([] as listenRank[])

  function initUserMessage(){
    //fetch
    listenRank.value=[
      {
        time:66,
        songMessage:{
          songName:'人来人往',
        songAuthor:["none",'yet'],
        songSinger:'陈奕迅',
        }
      },
      {
        time:62,
        songMessage:{
        songName:'月球上的人',
        songAuthor:["none",'yet'],
        songSinger:'陈奕迅',
        }
      },
      {
        time:6,
        songMessage:{
          songName:'葡萄成熟时',
          songAuthor:["none",'yet'],
          songSinger:'陈奕迅',
        }
      },
      {
        time:166,
        songMessage:{
        songName:'倔强',
        songAuthor:["none",'yet'],
        songSinger:'五月天',
        }
      },
      {
        time:45,
        songMessage:{
        songName:'求神',
        songAuthor:["none",'yet'],
        songSinger:'张国荣',
        }
      },
    ]
    historyList.value=[
      {
        songName:'人来人往',
        songAuthor:["none",'yet'],
        songSinger:'陈奕迅',
      },
      {songName:'飞向月球',
      songAuthor:["none",'yet'],
      songSinger:'test',
      },
      {songName:'music3',
      songAuthor:["none",'yet'],
      songSinger:'陈奕迅',
      },
      {songName:'安静',
      songAuthor:["none",'yet'],
      songSinger:'周杰伦',
      },
    ],
    listenTimeWeek.value=[
      { 
        id:1,
        day:'周一',
        listenTime:270,
      },
      { 
        id:2,
        day:'周二',
        listenTime:130,
      },
      { 
        id:3,
        day:'周三',
        listenTime:240,
      },
      { 
        id:4,
        day:'周四',
        listenTime:1,
      },
      { 
        id:5,
        day:'周五',
        listenTime:4,
      },
      { 
        id:6,
        day:'周六',
        listenTime:0,
      },
      { 
        id:7,
        day:'周日',
        listenTime:50,
      },

    ]

  }





  return { userMessage ,initUserMessage,historyList,listenTimeWeek,listenRank}
})
