const path = require('path')
const {douyinRWM} = require("./tools/getVideo");
const outPath = path.resolve(__dirname,'video') //保存的路经

const url = '7.97 f@O.Kw 01/15 WMJ:/  王星辰说余慧冰# 王星辰# 余慧冰# 沈彗星# 林乐清  https://v.douyin.com/idTjKhGn/ 复制此链接，打开Dou音搜索，直接观看视频！' //抖音分享的链接
douyinRWM(url,outPath)