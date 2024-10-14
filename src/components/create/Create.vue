<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import fabric from "fabric"

let test= async () => {
 
  const canvas = document.getElementById('canvas');
  const canvasCtx = canvas.getContext('2d');

  let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

  // 创建 AudioContext
  var audioCtx = new AudioContext();
  var source = audioCtx.createMediaStreamSource(stream);
  //分析结点
  var analyser = audioCtx.createAnalyser();
  //gainNode
  var gainNode=audioCtx.createGain()
  

  source.connect(gainNode)
  gainNode.connect(analyser)

  //smoothingTimeConstantg
  analyser.smoothingTimeConstant = 1;
  analyser.fftSize = 2048;
  //点 数量
  var bufferLength = analyser.frequencyBinCount;
  //所有点数字
  var dataArray = new Uint8Array(bufferLength);

  // 设置Canvas的宽度和高度
  canvas.width = 400;
  canvas.height = 400; // 假设波形高度为200px

  
  // 绘制函数
function draw() {
  gainNode.gain.setValueAtTime(10, audioCtx.currentTime);
  // 获取当前音频时间域数据，并将其存储在dataArray中
  // dataArray是一个Uint8Array，其值范围从0到255
  analyser.getByteTimeDomainData(dataArray);

  // // 设置画布背景颜色为白色，并填充整个画布
  // canvasCtx.fillStyle = 'rgb(255, 255, 255)';
  // canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);


  // 设置线条宽度为2像素
  canvasCtx.lineWidth = 2;
  // 设置线条颜色为黑色
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  // 开始一个新的路径，用于绘制波形
  canvasCtx.beginPath();

  // 计算每个数据点在画布上的宽度
  var sliceWidth = canvas.width * 1.0 / bufferLength;
  // 初始化x坐标，用于绘制波形
  var x = 0;

  // 遍历dataArray中的每个数据点
  for (var i = 0; i < bufferLength; i++) {
    // 将dataArray中的数据标准化到-1到1的范围内
    var v = dataArray[i] / 128.0 - 1;

    // //自己实现的滤波
    // if(v>-0.01&&v<0.01){
    //   v=0
    // }else if(v>0.9||v<-0.9){
    //   v=0
    // }

    // v=v*3
    // 将标准化后的数据映射到画布的高度上，并放大到画布高度的一半
    var y = (v * canvas.height/2) + canvas.height/2;

    // 对于第一个数据点，使用moveTo方法开始路径
    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      // 对于后续的数据点，使用lineTo方法继续路径
      canvasCtx.lineTo(x, y);
    }
    // 更新x坐标，为下一个数据点做准备
    x += sliceWidth;
  }

  // 从最后一个数据点绘制一条线到画布的右侧中央
  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  // 绘制线条，完成波形的绘制
  canvasCtx.stroke();

  // 使用requestAnimationFrame递归调用draw函数，创建一个动画循环
  requestAnimationFrame(draw);
};


  // 开始绘制
  draw();
}



const recorderItems=ref([] as {
  blob:Blob,
  title:string,
  duration:number
}[])

function changeTitle(index:number){
  let s:string|null=prompt('edit the sound name')
  if(s)
  recorderItems.value[index].title=s

}

function curve(index,audioURL){
  
    let audioELEMENT2 = new Audio(audioURL);
    audioELEMENT2.muted = false; // 如果你想要音频播放，设置为 false

    const canvas = document.querySelector('#record-item-' + index + ' #canvas');
    
    const latestTimeElement = document.querySelector('#record-item-' + index + ' .item-latest-time');
    let now = new Date();
    let startTime=now.getSeconds();
    
    let timeCarcle=null
    let carcle=() => {
      let now2 = new Date();
      
      let t=now2.getSeconds()-startTime;

      latestTimeElement.innerHTML=t;
      if(recorderItems.value[index].duration<=t||t<0){
        return
      }
      
      timeCarcle=setTimeout(carcle, 500);
    }
    timeCarcle=setTimeout(carcle, 500);


    const canvasCtx = canvas.getContext('2d');

    let audioCtx = new AudioContext();
    let source = audioCtx.createMediaElementSource(audioELEMENT2);


    //分析结点
    var analyser = audioCtx.createAnalyser();
    //gainNode
    var gainNode=audioCtx.createGain()
    
    source.connect(gainNode)
    gainNode.connect(analyser)

    //smoothingTimeConstantg
    analyser.smoothingTimeConstant = 1;
    analyser.fftSize = 2048;
    //点 数量
    var bufferLength = analyser.frequencyBinCount;
    //所有点数字
    var dataArray = new Uint8Array(bufferLength);


    // 绘制函数
    function draw() {
      gainNode.gain.setValueAtTime(10, audioCtx.currentTime);
      // 获取当前音频时间域数据，并将其存储在dataArray中
      // dataArray是一个Uint8Array，其值范围从0到255
      analyser.getByteTimeDomainData(dataArray);
    
      // // 设置画布背景颜色为白色，并填充整个画布
      // canvasCtx.fillStyle = 'rgb(255, 255, 255)';
      // canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    
      // 设置线条宽度为2像素
      canvasCtx.lineWidth = 2;
      // 设置线条颜色为黑色
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
    
      // 开始一个新的路径，用于绘制波形
      canvasCtx.beginPath();
    
      // 计算每个数据点在画布上的宽度
      var sliceWidth = canvas.width * 1.0 / bufferLength;
      // 初始化x坐标，用于绘制波形
      var x = 0;
    
      // 遍历dataArray中的每个数据点
      for (var i = 0; i < bufferLength; i++) {
        // 将dataArray中的数据标准化到-1到1的范围内
        var v = dataArray[i] / 128.0 - 1;
      
        // //自己实现的滤波
        // if(v>-0.01&&v<0.01){
        //   v=0
        // }else if(v>0.9||v<-0.9){
        //   v=0
        // }
      
        // v=v*3
        // 将标准化后的数据映射到画布的高度上，并放大到画布高度的一半
        var y = (v * canvas.height/2) + canvas.height/2;
      
        // 对于第一个数据点，使用moveTo方法开始路径
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          // 对于后续的数据点，使用lineTo方法继续路径
          canvasCtx.lineTo(x, y);
        }
        // 更新x坐标，为下一个数据点做准备
        x += sliceWidth;
      }
    
      // 从最后一个数据点绘制一条线到画布的右侧中央
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      // 绘制线条，完成波形的绘制
      canvasCtx.stroke();
    
      // 使用requestAnimationFrame递归调用draw函数，创建一个动画循环
      requestAnimationFrame(draw);
    };
    // 开始绘制
    draw();



    audioELEMENT2.play().catch(error => {
      console.error('Error playing audioELEMENT2:', error);
    });

    
}


function audioPlay(audioBlob, index) {

  let audioURL = URL.createObjectURL(audioBlob);
  let audioELEMENT = new Audio(audioURL);
  audioELEMENT.muted = false; // 如果你想要音频播放，请设置为 false

  curve(index,audioURL)

  audioELEMENT.play().catch(error => {
      console.error('Error playing audioELEMENT:', error);
  });
  audioELEMENT.onended=()=>{
    URL.revokeObjectURL(audioURL)
  }
  
}

function playAll(){
    for(let i=0;i<recorderItems.value.length;i++){
      audioPlay(recorderItems.value[i].blob,i);
    }
}

let audio={
  stream:null,
  audioCtx:null,
  source:null,
  analyserNode:null,
  gainNode:null,
  destinationNode:null,
  mediaRecorder:null,
  chunks:[],

  startTime:0,
  latestTime:ref(0),
  
  clear(){
    this.stream=null
    this.audioCtx=null
    this.source=null
    this.analyserNode=null
    this.gainNode=null
    this.destinationNode=null
    this.mediaRecorder=null
    this.chunks=[]
    
  },
  async recordStart(){
    
    let now = new Date();

    this.startTime=now.getSeconds();
    this.latestTime.value=0;

    let timeCarcle=null
    let carcle=() => {
      let now2 = new Date();
      this.latestTime.value=now2.getSeconds()-this.startTime;
      timeCarcle=setTimeout(carcle, 500);
    }
    timeCarcle=setTimeout(carcle, 500);

    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    this.audioCtx= new AudioContext();
    this.source = this.audioCtx.createMediaStreamSource(this.stream);
    
    //gainNode
    this.gainNode=this.audioCtx.createGain()
    this.source.connect(this.gainNode)
    //分析结点
    this.analyserNode = this.audioCtx.createAnalyser();
    this.gainNode.connect(this.analyserNode)
    
    //destination
    this.destinationNode=this.audioCtx.createMediaStreamDestination();
    this.analyserNode.connect(this.destinationNode);
    //recoder
    this.mediaRecorder=new MediaRecorder(this.destinationNode.stream)
    
    
    this.mediaRecorder.ondataavailable=(event)=>{
      this.chunks.push(event.data)
    }
    this.mediaRecorder.onstop=()=>{
      clearTimeout(timeCarcle);
      
      
      const blob=new Blob(this.chunks,{type:'audio/wav'})

      recorderItems.value.push({
        blob:blob,
        title:'title'+recorderItems.value.length,
        duration:this.latestTime.value
      })
      this.latestTime.value=0;
      // //创建链接并模拟点击下载
      // const audioURL=window.URL.createObjectURL(blob);
      // const link=document.createElement('a');
      // link.href=audioURL;
      // link.download='title'//title
      // document.body.appendChild(link);
      // link.click()
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(audioURL)
    }
    this.mediaRecorder.start()

  },

  recordStop(){
    //source disconnection

    //stop media
    this.stream.getAudioTracks().forEach(track=>track.stop());

    //close context
    this.audioCtx.close()
    this.mediaRecorder.stop()
    this.clear()
    
  }, 

  
}

</script>

<template>
  <div class="create-layout">
    <h2>a cappella Create</h2>
    <div class="create-button"> 
      <el-button @click="()=>audio.recordStart()">添加 </el-button>
      <el-button @click="()=>audio.recordStop()">停止</el-button>
      <el-button @click="console.log('yet to write something')">导出</el-button>
      {{ audio.latestTime }}
    </div>

    <div class="record">
      <div> 
        <el-button @click="playAll"> 全部播放</el-button>
        <el-button>全部静音</el-button>
        <el-button @click="recorderItems=[]">全部删除</el-button>
      </div>
      <div 
      v-for="(item,index) in recorderItems"
      :key="index"
      class=" record-item "
      :id="'record-item-'+index"
      >
        <h4 @click="changeTitle(index)"> {{ item.title}} </h4>
        <div class="item-func"> 
          <el-button @click="audioPlay(item.blob,index)">播放</el-button>
          <el-button @click="recorderItems.splice(index,1)">删除</el-button>
          <el-button>音量</el-button>
          <div class="gain-bar-ready-time">50</div> 
          <div class="item-gain-bar"> 
            <div class="gain-bar-ready"></div>  
          </div>
          <div class="gain-bar-over-time">100</div>
          
        </div>
        <div class="item-context"> 
          <p class="item-latest-time"></p>
          <canvas id="canvas" width="200" height="100"></canvas>
          <p >{{ item.duration }}</p>
        </div>
        
      </div>
    </div>
    
    
  </div>
</template>

<style lang="scss" scoped>
.create-layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  
  gap: 1rem;
}
.create-button{
  display: flex;
  gap: 1rem;
}
.record{
  padding: 1rem;
  background-color: #d75e5e8b;
  min-height: 40rem;
  min-width: 40rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  .record-item{
    display: flex;
    flex-direction: column;
    align-items: center;   
    background-color: #84b0e370;
    .item-func{
      display: flex;
      align-items: center;
      gap: 0.5rem;
      .item-gain-bar{
        height: 0.5rem;
        width: 10rem;
        background-color: #fff;
      }
    }
    .item-context{
      display: flex;
      gap: 1rem;
      align-items: center;

    }
    
  }

}
  
</style>
