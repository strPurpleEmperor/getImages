const {getImgUrlList, saveImageList, zipFolder} = require("./tools");
const path = require("path");
const url = 'https://www.xiaohongshu.com/explore/6451ee29000000001300afbc'
const selectorMap = {
  dy:'.V5BLJkWV',
  xhs:'.swiper-slide'
}

// const type = 'dy'
const type = 'xhs'
getImgUrlList({url, selector:selectorMap[type],type})
  .then(imgList => {
    return saveImageList(imgList, path.resolve(__dirname, 'images-jj'))
  })
  .then(output => {
    zipFolder(path.resolve(__dirname,output),path.resolve(__dirname,`${output}.zip`),()=>{})
  })
