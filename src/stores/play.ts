import { ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import getOffset from '@/assets/ts/getOffset';
import parseLrc from '@/assets/ts/parseLrc';
import axios from 'axios'
import getTextArray from '@/assets/ts/getText';
import { useUtilStore } from './Utils';


export const usePlayStore = defineStore('play', () => {
  const {netWorkUrl}=useUtilStore()
  const music={
		id:1,
		name: 'select your favourite song',
		author: 'zhangld',
    tags:['skateboard','guitar'],
		// url: 'https://music.163.com/song/media/outer/url?id=1430583016.mp3',
		url:'null',
		img: 'null',
		lrc: 'null'
	}
	
	
	// 歌词列表类型
type Text = Array<{
	// 时间,单位：秒
	lrcTime: number,
	// 歌词
	value: string
}>

  const play = reactive({
    musicList:[] as any[] , //播放列表
    current_music:music,//当前播放的歌曲信息
    current_music_textArray:getTextArray(music.lrc),
    play:false,
    play_index:0
  })

  const changePlay=()=>{
    play.play=!play.play
  }

  const changeListIndex=(s:String)=>{
    if(s=='plus'){
      play.play_index++
    }else{
      play.play_index--
    }
  }

  const musicList_delete=(index:number)=>{
    if(play.musicList){
      if(play.musicList.splice(index,1)){	
	  }

    }
  }

  const musicList_input=(id:number)=>{
    for( let i=0;i<play.musicList.length;i++){
      if(play.musicList[i].id==id){
          play.play_index=i
        return ;
      }
    }

	//通过id获取该歌词全部信息
    let url=netWorkUrl.url+'/search/id/'+id
    axios.get(url)
    .then(response => {
		if(response.data.code==200){
			console.log(response.data.data)
			play.musicList.unshift(response.data.data)
      //更新playview的歌词
	    play.current_music_textArray=getTextArray(play.musicList[0]?.lrc)
	    //更新当前歌曲
	    play.current_music=play.musicList[0]
			
		}else{
			alert(response.data.message+'-- play.ts -118')
		}
             
    }).catch(error => {
        console.log("get.error:", error)
    })
  }
  return { play,musicList_delete,musicList_input,changePlay,changeListIndex }
})
