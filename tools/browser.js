const puppeteer = require("puppeteer");

async function getBrowser() {
  return await puppeteer.launch({headless: 'new'})
}

async function getPage() {
  const browser = await getBrowser()
  const page = await browser.newPage();
  return {
    page,
    browser
  }
}

module.exports = {
  getPage
}