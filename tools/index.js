const https = require('https')
const http = require('http')
const fs = require('fs');
// 第一步，导入必要的模块
const archiver = require('archiver');
const puppeteer = require("puppeteer");
const {getUrlByDy, getUrlByXHS} = require("./getUrl");
const {getPage} = require("./browser");
function isHttps(url) {
  return /^https:\/\//.test(url)
}
function saveFile(url, filePath) {
  const request = isHttps(url) ? https : http
  return new Promise(resolve => {
    request.get(url, async (res) => {
      let imgData = "";
      res.setEncoding("binary");  // 下载图片需要设置为 binary, 否则图片会打不开

      res.on('data', (chunk) => {
        imgData += chunk;
      });

      res.on('end', () => {
        fs.writeFileSync(filePath, imgData, "binary");
        resolve(1)
      });
    });
  })
}




function zipFolder(sourceFolder, destZip, cb, subdir) {
  // init
  const output = fs.createWriteStream(destZip);
  const archive = archiver('zip', {
    zlib: {level: 9}
  });

  // on
  output.on('close', function () {
    cb(null, 'zip folder success!');
  });
  archive.on('error', function (err) {
    cb(err);
  });
  // zip
  archive.pipe(output);
  archive.directory(sourceFolder, subdir || false);
  archive.finalize();
}
// 不同平台获取图片的方式不一样
const fnMap = {
  dy:getUrlByDy,
  xhs:getUrlByXHS,
}
/**
 * @param url{string}
 * @param selector{string}
 * @param type{string}
 * @return Promise<string[]>
 */
async function getImgUrlList({url, selector='.V5BLJkWV', type}) {
  const {page,browser} = await getPage()
  await page.goto(url);
  await sleep()
  const imgList = await fnMap[type](page,selector)
  await browser.close();
  return imgList
}
async function saveImageList(imgList=[], output='images') {
  await exitsFolder(output)
  const promiseList = []
  imgList.forEach((img, index) => {
    promiseList.push(saveFile(img, `${output}/${index+1}.png`))
  })
  await Promise.all(promiseList)
  return output
}
function sleep(timer = 3000) {
  return new Promise(resolve => {
    setTimeout(resolve,timer)
  })
}
async function exitsFolder (reaPath) {
  const absPath = reaPath
  try {
    await fs.promises.stat(absPath)
  } catch (e) {
    // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
    await fs.promises.mkdir(absPath, {recursive: true})
  }
}

module.exports = {
  saveFile,
  zipFolder,
  getImgUrlList,
  saveImageList,
  sleep
}