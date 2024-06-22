const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    ignoreDefaultArgs: ['--disable-extensions'],
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto(
    'https://www.amazon.com/NAHARO-Moss-Artificial-Centerpiece-Decoration/dp/B0CPPPRM9H?pd_rd_w=7SJoq&content-id=amzn1.sym.95edfd55-02e8-43e1-844b-1dfc0a647d70&pf_rd_p=95edfd55-02e8-43e1-844b-1dfc0a647d70&pf_rd_r=8RAKHDDVQZETTNYKMTMR&pd_rd_wg=nGRBC&pd_rd_r=63526e59-4fb6-42aa-8161-9e0a6807c52b&pd_rd_i=B0CPPPRM9H&ref_=ShopHSP_B0CPPPRM9H'
  );

  let selector = '#add-to-cart-button';

  await page.waitForSelector(selector);

  await page.evaluate((selector) => {
    document.querySelector(selector).click();
  }, selector);
}

run().catch((error) => console.log('Error:', error));
