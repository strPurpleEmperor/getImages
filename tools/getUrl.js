
function getUrlByDy(page, selector) {
  return page.$$eval(selector, async (els) => {
    const res = [];
    els.forEach((e) => {
      res.push(e.src);
    });
    return res;
  });
}

function getUrlByXHS(page, selector) {
  return page.$$eval(selector, async (els) => {
    function getBackgroundUrl(background){
      let regBackgroundUrl = /url\("?'?.*"?'?\)/g;
      let regReplace = /"|'|url|\(|\)/g;
      return background.match(regBackgroundUrl)[0].replace(regReplace,'')
    }
    const res = [];
    els.forEach((e) => {
      res.push(getBackgroundUrl(e.style.backgroundImage));
    });
    return res;
  })
}
module.exports = {
  getUrlByDy,
  getUrlByXHS
}