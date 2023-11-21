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

/**
 * 
 * @param {ElementHandle<Node>[]} elements 
 * @param {function(CdpElementHandle): void} fun 
 * @returns 
 */
const tryToDoWithFirstElement = (elements, fun) => {
  if (elements.length < 1)
    return false;
  fun(elements[0])
  return true;
}

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./tmp"
    });

    const page = await browser.newPage();
    await page.goto(`https://konto.onet.pl/en/register`);
    //pass accept button
    const acceptButtons = await page.$x('//*[@id="rasp_cmp"]/div/div[6]/button[2]');
    tryToDoWithFirstElement(acceptButtons, (acceptButton) => {
      acceptButton.click();
    });
    //type email
    const emailInputs = await page.$$('#alias');
    if(!tryToDoWithFirstElement(emailInputs, (emailInput) => {
      emailInput.type('Hello');
    })) {
      console.log('Error trying to handle email input!');
      return;
    }
      
    //confirm button
    const confirmButton = await page.$$('#__next > main > div > div > div > div > div > form > div.sc-bf98a933-0.eHoNhw > div.sc-7b746143-0.cGWXqW > div > button');
    if (confirmButton.length > 0)
      confirmButton[0].click('Hello');
    console.log(confirmButton);
})();