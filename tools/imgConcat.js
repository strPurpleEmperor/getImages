const ImgConcat = require('@jyeontu/img-concat');
const path = require("path");
const ImgConcatClass = new ImgConcat();
const basePath = path.resolve(__dirname,'../images-zcy')
const shape = new Array(4).fill(0)
  .map(() => new Array(25).fill(0))

shape.forEach((arr,index) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = basePath + `/${(i+1)*(index+1)}.png`
  }
})
const p = {
  shape,
  target:'./longImg'
};
//自定义矩阵拼接图片
ImgConcatClass.conCatByMaxit(p).then(res=>{
  console.log(`拼接完成,图片路径为${res}`);
});