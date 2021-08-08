const { test, expect } = require('@playwright/test');

test('Checks that duckduckgo page can be opened', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');

  expect(isLogoVisible).toBe(true);
});

test('Checks that results page opens and results are correct', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.fill('#search_form_input_homepage', 'Test');
  await page.click('#search_button_homepage');
  const rezultatasTextContent = await page.textContent('#r1-0');
  expect(rezultatasTextContent).toContain('Test');
  
});

test('Inspector demo', async ({ page }) => {
await page.goto('https://duckduckgo.com/');
 await page.fill('[placeholder="Search the web without being tracked"]', 'Test');
 await Promise.all([
   page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&t=h_&ia=web' }*/),
   page.click('input:has-text("S")')
 ]);
 const rezultatasTextContent = await page.textContent('#r1-0');
 expect(rezultatasTextContent).toContain('Test');
});

test(`Search MS word cheatsheets`, async ({ page }) => {
  await page.goto('https://duckduckgo.com');
  await page.fill('#search_form_input_homepage', 'ms word cheat sheet');
  await page.click('#search_button_homepage');
  const textContent = await page.textContent('.c-base__title');
  const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
  expect(isCheatSheetsVisible).toBe(true);
  expect(textContent).toContain("Microsoft Word 2010");
});

test(`Wikipedia short URL`, async ({ page }) => {
  await page.goto('https://duckduckgo.com');
  await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
  await page.click('#search_button_homepage');
  const shortURL = await page.inputValue('#shorten-url');
  await page.goto(shortURL);
  const title = await page.isVisible('#www-wikipedia-org');
  expect(title).toBe(true);
});

test('panda', async ({ page }) => {
  await page.goto('https://duckduckgo.com');
await page.waitForSelector("#search_form_input_homepage");
await page.fill('#search_form_input_homepage', "intitle:panda");
await page.click("#search_button_homepage", { force: true });
await page.waitForNavigation();
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    console.log(results);
results.forEach(result => {
  expect(result.toLowerCase()).toContain("panda");
});
});

const passwordsLengths = [8, 16, 64];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(passwordLength)
    });
  });