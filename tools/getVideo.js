
const download = require('download')
const {sleep} = require("./index");
const {getPage} = require("./browser");
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
}
function httpString(s) {
  const reg = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
  s = s.match(reg);
  return s[0]
}
async function douyinRWM (url,outPath) {
  url = httpString(url) || url
  const {page,browser} = await getPage()
  await page.goto(url);
  await sleep()
  const videoSrc = await page.$eval('.xg-video-container', function (el) {
    return el.querySelector('video source').src
  })
  const title = await page.title()
  await browser.close()
  download(videoSrc, outPath, {
    filename: title + '.mp4',
    headers,
  }).then(() => {
    console.log(`Download Completed`)
  })
}


module.exports = {
  douyinRWM
}
