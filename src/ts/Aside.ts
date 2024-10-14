import { ref } from 'vue';
import router from '../router';

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

//选中菜单触发的回调
const selected = (index, indexPath) => {
    // alert(index+';'+indexPath)   // 1;1 拿到下标
    if(index=='explore'){
        router.push('/explore/recommend')
    }else 
    router.push(`/${index}`)
    
    
}

export {isCollapse,handleClose,handleOpen,selected}