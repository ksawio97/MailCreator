import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import FormDataBuilder from './FormDataBuilder.js'

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
const tryToDoWithFirstElement = (elements) => {
  return new Promise((resolve, reject) => {
      if (elements.length < 1) {
        reject(new Error('Array is empty'))
      }
      resolve(elements[0]);
  });
}
/*
const tryTypingEmail = async (confirmButton, emailInput, emailName) => {
  await emailInput.type(emailName);
  try {
    await Promise.all([
      page.waitForNavigation({ timeout: 2500 }),
      confirmButton.click(),
      ]);
  }
  catch (error) {
    return false;
  }
  return true;
}
*/

const fillFormInputs = async (page, formData) => {
  let data = formData.lastInputData;
  while (data != null) {
    const input = await page.$$(data[0]);
    await input[0].type(data[1]);
    data = formData.lastInputData;
  }
}

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}
//max not including
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

(async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./tmp"
    });

    const page = await browser.newPage();
    await page.goto('https://poczta.wp.pl/rejestracja');

    const formData = new FormDataBuilder()
      .addData('#name', 'test')
      .addData('#lastName', 'test')
      .addData('#login', 'test')
      .addData('#sex', ['M', 'K'].random())
      .addData('#date', getRandomInt(1, 26).toString())
      .addData('#month', ['styczeń',
       'luty', 
       'marzec', 
       'kwiecień', 
       'maj', 
       'czerwiec',
       'lipiec',
       'sierpień',
       'wrzesień',
       'październik',
       'listopad',
       'grudzień']
        .random())
      .addData('#year', getRandomInt(1999, 2004).toString());

    fillFormInputs(page, formData);
})();