const { executablePath } = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config();

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    ignoreDefaultArgs: ['--disable-extensions', '--start-fullscreen'],
    userDataDir: 'C:/Users/lealo/AppData/Local/Google/Chrome/User Data',
    // args: ['--proxy-server=http://162.23.125.34:8080'],
  });
  const page = await browser.newPage();

  // Navigate to the login page
  await page.goto('https://www.pinterest.com/login/');

  await page.waitForSelector('#email');
  await page.type('#email', process.env.PINTEREST_EMAIL);
  await page.waitForSelector('#password');
  await page.type('#password', process.env.PINTEREST_PASSWORD);

  await new Promise((resolve) => setTimeout(resolve, 3000));
  await page.click('.RCK');

  await page.waitForNavigation({ waitUntil: 'networkidle0' }); // Ensuring the page has fully loaded

  await page.goto('https://www.pinterest.com/OsWorld214/_created/');

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await page.click('.tBJ');
  // await page.waitForSelector(selector);

  // await page.$eval(selector, (button) => button.click());

  // Optionally, proceed to checkout and complete the purchase

  // Close the browser
  // await browser.close();
}

run().catch((error) => console.log('Error:', error));
