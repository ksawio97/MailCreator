import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin());
/**
 * 
 * @param {number} ms 
 * @returns 
 */
const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./tmp"
    });

    const page = await browser.newPage();
    await page.goto(`https://konto.onet.pl/en/register`);
    //pass accept button
    const acceptButton = await page.$x('//*[@id="rasp_cmp"]/div/div[6]/button[2]');
    if (acceptButton.length > 0)
        acceptButton[0].click()
    //type emailname
})();