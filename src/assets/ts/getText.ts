
// 歌词列表类型
type Text = Array<{
	// 时间,单位：秒
	lrcTime: number,
	// 歌词
	value: string
}>

// 匹配歌词时间
const lrcTimeReg: RegExp = /\[.*?\]/g;

export default function getTextArray(lrc: string = ''): Text {
	const arr: Text = [];
    let num=1;

    lrc.split('\n').forEach((item) => {
        
		// 匹配时间
		let time = lrcTimeReg.exec(item);

		// 若不存在时间，则返回
		if (!time) {
           return;
        };

		// 匹配歌词
		let txt: string = item.replace(lrcTimeReg, '');
        
        
		// 过滤空白歌词
		if (txt === '') return;

		arr.push({
			lrcTime: num,
			value:txt
		})
        
        num++

	})

	if(arr[0]==null){
		lrc.split('\n').forEach((item) => {
			arr.push({
				lrcTime: -1,
				value:item,
			})
		})
	}

	return arr;
}

